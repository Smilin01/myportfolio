import { Link } from "react-router-dom";
import { posts, formatDate } from "../data/posts";
import { profile } from "../data/content";

export default function Blog() {
  const tags = [...new Set(posts.map((p) => p.tag))];
  return (
    <main className="bg-white min-h-[80vh]">
      <div className="mx-auto max-w-[680px] px-5 pt-14 pb-20">
        <h1 className="font-serif text-5xl md:text-6xl tracking-tight">Stories</h1>
        <p className="text-neutral-600 text-lg mt-3">Notes on building agents, RAG systems and LLM products, by {profile.name}.</p>
        <div className="flex flex-wrap gap-2 mt-6">
          {tags.map((t) => <span key={t} className="rounded-full bg-neutral-100 text-sm px-3 py-1.5">{t}</span>)}
        </div>
        <div className="mt-10 divide-y divide-neutral-200 border-t border-neutral-200">
          {posts.map((p) => (
            <article key={p.slug} className="py-8">
              <Link to={`/blog/${p.slug}`} className="block group">
                <p className="text-sm text-neutral-600 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-ink text-white text-[11px] flex items-center justify-center">JS</span>
                  {profile.name} · {formatDate(p.date)}
                </p>
                <h2 className="font-serif font-bold text-2xl md:text-[1.7rem] leading-tight mt-3 group-hover:underline underline-offset-4">{p.title}</h2>
                <p className="font-serif text-lg text-neutral-600 mt-2 leading-snug">{p.subtitle}</p>
                <p className="text-sm text-neutral-500 mt-4 flex items-center gap-3">
                  <span className="rounded-full bg-neutral-100 px-3 py-1 text-neutral-700">{p.tag}</span>
                  {p.readTime} min read
                </p>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
