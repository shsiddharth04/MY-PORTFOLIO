import { useEffect } from "react";
import Lenis from "lenis";
import GrainOverlay from "./components/GrainOverlay";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import ProjectsSection from "./components/ProjectsSection";
import OtherWork from "./components/OtherWork";
import ContactSection from "./components/ContactSection";

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <main className="relative bg-bg min-h-screen overflow-x-hidden">
      <GrainOverlay />

      {/* Subtle dot grid, top-right only */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(21,21,19,0.09) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          WebkitMaskImage: "radial-gradient(ellipse 65% 65% at 78% 12%, black 0%, transparent 100%)",
          maskImage: "radial-gradient(ellipse 65% 65% at 78% 12%, black 0%, transparent 100%)",
        }}
      />

      <Nav />

      <div className="relative z-10">
        <Hero />
        <ProjectsSection />
        <OtherWork />
        <ContactSection />
      </div>
    </main>
  );
}
