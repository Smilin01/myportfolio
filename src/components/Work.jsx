import { projects } from "../data/content";
import Reveal from "./Reveal";
import AnswerDemo from "./AnswerDemo";

export default function Work() {
  return (
    <section id="work" className="border-b border-ink">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <Reveal>
          <h2 className="font-serif text-5xl md:text-7xl tracking-[-0.03em] leading-none mb-16">Selected work</h2>
        </Reveal>
        <div className="divide-y divide-neutral-300">
          {projects.map((p, i) => (
            <Reveal key={p.title} as="article" className="py-12 grid md:grid-cols-[120px_1fr] gap-6">
              <span className="font-serif text-6xl text-neutral-300">0{i + 1}</span>
              <div>
                <p className="text-sm text-neutral-500 mb-2">{p.tag} · {p.date}</p>
                <h3 className="font-serif text-3xl md:text-5xl tracking-tight leading-tight">{p.title}</h3>
                <p className="text-lg md:text-xl text-neutral-700 mt-4 max-w-2xl leading-relaxed">{p.summary}</p>
                <ul className="mt-5 space-y-1.5 text-neutral-700 list-disc pl-5 marker:text-leaf max-w-2xl">
                  {p.points.map((pt) => <li key={pt}>{pt}</li>)}
                </ul>
                <div className="flex flex-wrap gap-2 mt-6">
                  {p.stack.map((s) => <span key={s} className="rounded-full bg-white border border-neutral-300 text-sm px-3 py-1">{s}</span>)}
                </div>
                {p.title === "Aetheron" && <div className="mt-8 max-w-2xl"><AnswerDemo /></div>}
                {p.link && (
                  <a href={p.link} className="inline-block mt-6 text-leaf hover:underline underline-offset-4">{p.linkLabel} →</a>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
