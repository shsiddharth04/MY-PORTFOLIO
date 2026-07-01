import SecondBrain from "./components/SecondBrain";
import GrainOverlay from "./components/GrainOverlay";
import Hero from "./components/Hero";
import WorkSection from "./components/WorkSection";
import BuiltSection from "./components/BuiltSection";
import BackgroundSection from "./components/BackgroundSection";
import ContactSection from "./components/ContactSection";

export default function App() {
  return (
    <main className="relative selection:bg-accent-signal selection:text-white bg-[#F1F0F5] min-h-screen overflow-x-hidden">
      {/* Signature 3D Element */}
      <SecondBrain />
      <GrainOverlay />

      {/* Content Layer */}
      <div className="relative z-10">
        <Hero />
        <WorkSection />
        <BuiltSection />
        <BackgroundSection />
        <ContactSection />
      </div>

      {/* Brand Identity Accent */}
      <div className="fixed top-12 left-12 z-50 pointer-events-none hidden md:block">
        <span className="text-[10px] font-display font-bold tracking-[0.4em] uppercase text-ink-primary/30">
          Siddharth Sharma // 2026
        </span>
      </div>
    </main>
  );
}

