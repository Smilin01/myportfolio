import { Link, NavLink } from "react-router-dom";
import { profile } from "../data/content";

const links = [
  ["Work", "/#work"],
  ["Skills", "/#skills"],
  ["Contact", "/#contact"],
];

export default function Header() {
  return (
    <header className="sticky top-0 z-30 bg-cream/90 backdrop-blur border-b border-ink">
      <div className="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between">
        <Link to="/" className="font-serif font-bold text-2xl tracking-tight">
          Smilin<span className="text-leaf">.</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          {links.map(([label, to]) => (
            <Link key={to} to={to} className="hidden md:inline text-neutral-700 hover:text-ink transition-colors">
              {label}
            </Link>
          ))}
          <NavLink
            to="/blog"
            className={({ isActive }) => `transition-colors ${isActive ? "text-ink font-medium" : "text-neutral-700 hover:text-ink"}`}
          >
            Blog
          </NavLink>
          <a href={profile.resume} className="rounded-full bg-ink text-white px-4 py-2 hover:bg-neutral-700 transition-colors">
            Resume
          </a>
        </nav>
      </div>
    </header>
  );
}
