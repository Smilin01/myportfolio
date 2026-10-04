import { motion } from "framer-motion";
import { skillGroups, earlier } from "../data/content";
import Reveal from "./Reveal";

export default function Skills() {
  return (
    <section id="skills" className="border-b border-ink">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <Reveal>
          <h2 className="font-serif text-5xl md:text-7xl tracking-[-0.03em] leading-none mb-16">What I work with</h2>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-x-14 gap-y-12">
          {skillGroups.map((g) => (
            <div key={g.name}>
              <Reveal as="h3" className="font-serif text-2xl mb-4 border-b border-ink pb-2">{g.name}</Reveal>
              <motion.div
                className="flex flex-wrap gap-2"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                transition={{ staggerChildren: 0.06 }}
              >
                {g.items.map((i) => (
                  <motion.span key={i} variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
                    className="rounded-full bg-white border border-neutral-300 text-sm px-4 py-1.5 hover:border-ink transition-colors">
                    {i}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          ))}
        </div>

        <Reveal className="mt-24">
          <h3 className="font-serif text-3xl mb-2">Earlier, in DevOps</h3>
          <p className="text-neutral-600 mb-6">Where I learned to run things in production. It still shapes how I ship AI.</p>
          <ul className="divide-y divide-neutral-300 border-y border-neutral-300">
            {earlier.map((e) => (
              <li key={e.title}>
                <a href={e.link} className="flex items-baseline justify-between gap-4 py-4 group">
                  <span>
                    <span className="font-serif text-xl group-hover:underline underline-offset-4">{e.title}</span>
                    <span className="block text-neutral-600 text-sm">{e.text}</span>
                  </span>
                  <span className="text-leaf opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
