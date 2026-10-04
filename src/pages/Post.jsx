import { Link, useParams, Navigate } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import { posts, formatDate } from "../data/posts";
import { profile } from "../data/content";
import { diagrams } from "../components/blog/Diagrams";

function Block({ b }) {
  switch (b.type) {
    case "h2":
      return <h2 className="font-sans font-bold text-2xl mt-12 mb-3 tracking-tight">{b.text}</h2>;
    case "h3":
      return <h3 className="font-sans font-bold text-xl mt-8 mb-2">{b.text}</h3>;
    case "callout":
      return <aside className="my-8 rounded-xl bg-cream border border-neutral-200 px-5 py-4 text-[1.1rem] leading-relaxed font-sans text-neutral-800">{b.text}</aside>;
    case "diagram": {
      const D = diagrams[b.name];
      return D ? <div className="lg:-mx-[90px]"><D /></div> : null;
    }
    case "quote":
      return <blockquote className="border-l-[3px] border-ink pl-6 my-8 text-[1.6rem] leading-snug italic">{b.text}</blockquote>;
    case "ul":
      return <ul className="list-disc pl-6 my-6 space-y-2">{b.items.map((i) => <li key={i}>{i}</li>)}</ul>;
    case "code":
      return <pre className="my-8 overflow-x-auto rounded-lg bg-neutral-100 p-5 text-[13.5px] leading-relaxed font-mono"><code>{b.text}</code></pre>;
    default:
      return <p className="my-6">{b.text}</p>;
  }
}

export default function Post() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  if (!post) return <Navigate to="/blog" replace />;

  return (
    <main className="bg-white">
      <motion.div style={{ scaleX: width }} className="fixed top-16 left-0 right-0 h-0.5 bg-leaf origin-left z-20" />
      <article className="mx-auto max-w-[680px] px-5 pt-14 pb-24">
        <Link to="/blog" className="text-sm text-neutral-600 hover:text-ink">← All stories</Link>
        <h1 className="font-serif font-bold text-4xl md:text-[2.8rem] leading-[1.1] tracking-tight mt-6">{post.title}</h1>
        <p className="font-serif text-xl md:text-2xl text-neutral-600 mt-4 leading-snug">{post.subtitle}</p>
        <div className="flex items-center gap-3 mt-8 pb-8 border-b border-neutral-200">
          <span className="w-11 h-11 rounded-full bg-ink text-white text-sm flex items-center justify-center">JS</span>
          <div className="text-sm">
            <p className="text-ink">{profile.name}</p>
            <p className="text-neutral-500">{post.readTime} min read · {formatDate(post.date)}</p>
          </div>
        </div>
        <div className="font-serif text-[1.3rem] leading-[1.6] text-[#242424] mt-10">
          {post.body.map((b, i) => <Block key={i} b={b} />)}
        </div>
        <div className="mt-14 pt-8 border-t border-neutral-200 flex items-center justify-between">
          <span className="rounded-full bg-neutral-100 text-sm px-3 py-1.5">{post.tag}</span>
          <Link to="/blog" className="text-leaf hover:underline underline-offset-4">More stories →</Link>
        </div>
      </article>
    </main>
  );
}
