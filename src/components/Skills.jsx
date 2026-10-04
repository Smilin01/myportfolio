import { skillGroups } from "../data/content";

export default function Skills() {
  return (
    <section id="skills" className="py-14 border-b border-neutral-200">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-neutral-500 mb-10">Skills</h2>
      <div className="space-y-8">
        {skillGroups.map((g) => (
          <div key={g.name}>
            <h3 className="font-serif font-bold text-xl mb-3">{g.name}</h3>
            <div className="flex flex-wrap gap-2">
              {g.items.map((i) => (
                <span key={i} className="rounded-full border border-neutral-300 text-neutral-700 text-sm px-3 py-1">
                  {i}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
