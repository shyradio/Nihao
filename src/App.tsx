import { About } from "./components/About";
import { BackToTop } from "./components/BackToTop";
import { FindMe } from "./components/FindMe";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Nav } from "./components/Nav";
import { Projects } from "./components/Projects";
import { site } from "./config";
import { useLanyard } from "./hooks/useLanyard";

export default function App() {
  const presence = useLanyard(site.discordId);

  return (
    <div id="top" className="relative">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
      >
        skip to content
      </a>

      <Nav presence={presence} />

      <main id="main">
        <Hero />
        <About presence={presence} />
        <Projects />
        <FindMe />
      </main>

      <Footer />
      <BackToTop />
      <div className="grain" aria-hidden="true" />
    </div>
  );
}
