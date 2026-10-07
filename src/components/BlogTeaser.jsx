import { Link } from "react-router-dom";
import { posts, formatDate } from "../data/posts";
import Reveal from "./Reveal";

export default function BlogTeaser() {
  return (
    <section className="border-b border-ink bg-white">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <Reveal className="flex items-end justify-between mb-12">
          <h2 className="font-serif text-5xl md:text-7xl tracking-[-0.03em] leading-none">Writing</h2>
          <Link to="/blog" className="text-leaf hover:underline underline-offset-4">All stories →</Link>
        </Reveal>
        <div className="divide-y divide-neutral-200 max-w-3xl">
          {posts.slice(0, 3).map((p) => (
            <Reveal key={p.slug}>
              <Link to={`/blog/${p.slug}`} className="block py-7 group">
                <p className="text-sm text-neutral-500">{p.tag} · {formatDate(p.date)} · {p.readTime} min read</p>
                <h3 className="font-serif text-2xl md:text-3xl mt-1 leading-snug group-hover:underline underline-offset-4">{p.title}</h3>
                <p className="text-neutral-600 mt-1">{p.subtitle}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
