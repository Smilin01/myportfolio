import { profile } from "../data/content";

export default function Footer() {
  return (
    <footer className="border-t border-ink">
      <div className="mx-auto max-w-6xl px-5 py-8 flex flex-wrap items-center justify-between gap-4 text-sm text-neutral-600">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <div className="flex gap-5">
          <a href={profile.github} className="hover:text-ink">GitHub</a>
          <a href={profile.linkedin} className="hover:text-ink">LinkedIn</a>
          <a href={`mailto:${profile.email}`} className="hover:text-ink">Email</a>
        </div>
      </div>
    </footer>
  );
}
