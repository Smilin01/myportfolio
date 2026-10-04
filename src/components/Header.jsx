import { profile } from "../data/content";

const links = [
  ["Work", "#work"],
  ["Skills", "#skills"],
  ["Earlier", "#earlier"],
  ["Contact", "#contact"],
];

export default function Header() {
  return (
    <header className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-neutral-200">
      <div className="mx-auto max-w-[700px] px-5 h-14 flex items-center justify-between">
        <a href="#top" className="font-serif font-bold text-xl tracking-tight">
          {profile.name.split(" ").slice(0, 2).join(" ")}
        </a>
        <nav className="flex items-center gap-5 text-sm text-neutral-600">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="hidden sm:inline hover:text-black transition-colors">
              {label}
            </a>
          ))}
          <a
            href={profile.resume}
            className="rounded-full bg-black text-white px-4 py-1.5 hover:bg-neutral-700 transition-colors"
          >
            Resume
          </a>
        </nav>
      </div>
    </header>
  );
}
