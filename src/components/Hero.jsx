import { profile } from "../data/content";

export default function Hero() {
  return (
    <section id="top" className="pt-16 sm:pt-24 pb-14 border-b border-neutral-200">
      <p className="text-sm text-neutral-500 mb-5">
        {profile.role} at {profile.company}
      </p>
      <h1 className="font-serif font-bold text-[2.5rem] sm:text-[3.5rem] leading-[1.1] tracking-tight">
        {profile.headline}
      </h1>
      <p className="font-serif text-xl sm:text-[1.35rem] leading-relaxed text-neutral-600 mt-7">
        {profile.intro}
      </p>
      <div className="flex flex-wrap items-center gap-4 mt-9 text-sm">
        <a
          href="#contact"
          className="rounded-full bg-black text-white px-5 py-2.5 hover:bg-neutral-700 transition-colors"
        >
          Get in touch
        </a>
        <a href={profile.github} className="text-neutral-600 hover:text-black underline underline-offset-4">
          GitHub
        </a>
        <a href={profile.linkedin} className="text-neutral-600 hover:text-black underline underline-offset-4">
          LinkedIn
        </a>
      </div>
    </section>
  );
}
