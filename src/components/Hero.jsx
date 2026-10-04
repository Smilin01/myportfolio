import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { profile } from "../data/content";
import HeroGraph from "./HeroGraph";

const words = ["AI", "agents,", "built", "to", "ship."];

export default function Hero() {
  return (
    <section id="top" className="border-b border-ink">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-24 grid md:grid-cols-[1.25fr_1fr] gap-10 items-center">
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-sm text-neutral-600 mb-6"
          >
            {profile.name} · {profile.role} at {profile.company}
          </motion.p>
          <h1 className="font-serif font-medium tracking-[-0.035em] leading-[0.98] text-[clamp(3.4rem,10vw,7.5rem)]">
            {words.map((w, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.22em]">
                <motion.span
                  className="inline-block"
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.15 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.7 }}
            className="text-xl md:text-2xl text-neutral-700 mt-8 max-w-xl leading-snug"
          >
            {profile.intro}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="flex flex-wrap gap-3 mt-9"
          >
            <a href="#how" className="rounded-full bg-ink text-white px-7 py-3.5 text-lg hover:bg-neutral-700 transition-colors">
              See how it works
            </a>
            <Link to="/blog" className="rounded-full border border-ink px-7 py-3.5 text-lg hover:bg-ink hover:text-white transition-colors">
              Read the blog
            </Link>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-md w-full mx-auto"
        >
          <HeroGraph />
        </motion.div>
      </div>
    </section>
  );
}
