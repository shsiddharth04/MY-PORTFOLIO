import { useEffect } from "react";
import Lenis from "lenis";
import SecondBrain from "./components/SecondBrain";
import GrainOverlay from "./components/GrainOverlay";
import CustomCursor from "./components/CustomCursor";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import OtherWork from "./components/OtherWork";
import ContactSection from "./components/ContactSection";

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
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
      <CustomCursor />
      <SecondBrain />
      <GrainOverlay />

      <Nav />

      <div className="relative z-10">
        <Hero />
        <AboutSection />
        <ProjectsSection />
        <OtherWork />
        <ContactSection />
      </div>
    </main>
  );
}
