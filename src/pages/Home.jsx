import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import Pipeline from "../components/Pipeline";
import Work from "../components/Work";
import Skills from "../components/Skills";
import BlogTeaser from "../components/BlogTeaser";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <Pipeline />
      <Work />
      <Skills />
      <BlogTeaser />
      <Contact />
    </main>
  );
}
