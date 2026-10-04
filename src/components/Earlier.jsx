import { earlier } from "../data/content";

export default function Earlier() {
  return (
    <section id="earlier" className="py-14 border-b border-neutral-200">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-neutral-500 mb-3">Earlier, in DevOps</h2>
      <p className="font-serif text-lg text-neutral-600 mb-8">
        Where I learned to run things in production. It still shapes how I ship AI.
      </p>
      <ul className="divide-y divide-neutral-200">
        {earlier.map((e) => (
          <li key={e.title}>
            <a href={e.link} className="block py-5 group">
              <h3 className="font-serif font-bold text-xl group-hover:underline underline-offset-4">{e.title}</h3>
              <p className="font-serif text-neutral-600 mt-1">{e.text}</p>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
