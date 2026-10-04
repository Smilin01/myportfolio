import { projects } from "../data/content";

export default function Work() {
  return (
    <section id="work" className="py-14 border-b border-neutral-200">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-neutral-500 mb-10">Selected work</h2>
      <div className="space-y-14">
        {projects.map((p) => (
          <article key={p.title}>
            <div className="flex items-center gap-2 text-sm text-neutral-500 mb-2">
              <span>{p.tag}</span>
              <span aria-hidden>·</span>
              <span>{p.date}</span>
            </div>
            <h3 className="font-serif font-bold text-3xl leading-tight tracking-tight">{p.title}</h3>
            <p className="font-serif text-lg leading-relaxed text-neutral-700 mt-3">{p.summary}</p>
            <ul className="font-serif text-lg text-neutral-700 mt-4 space-y-1.5 list-disc pl-6 marker:text-neutral-400">
              {p.points.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2 mt-5">
              {p.stack.map((s) => (
                <span key={s} className="rounded-full bg-neutral-100 text-neutral-700 text-sm px-3 py-1">
                  {s}
                </span>
              ))}
            </div>
            {p.link && (
              <a
                href={p.link}
                className="inline-block mt-5 text-sm text-green-700 hover:text-green-900 underline underline-offset-4"
              >
                {p.linkLabel} →
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
