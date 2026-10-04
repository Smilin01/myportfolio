import Header from "./components/Header";
import Hero from "./components/Hero";
import Work from "./components/Work";
import Skills from "./components/Skills";
import Earlier from "./components/Earlier";
import Contact from "./components/Contact";
import { profile } from "./data/content";

export default function App() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans">
      <Header />
      <main className="mx-auto max-w-[700px] px-5">
        <Hero />
        <Work />
        <Skills />
        <Earlier />
        <Contact />
      </main>
      <footer className="mx-auto max-w-[700px] px-5 py-10 text-sm text-neutral-500 border-t border-neutral-200">
        © {new Date().getFullYear()} {profile.name}
      </footer>
    </div>
  );
}
