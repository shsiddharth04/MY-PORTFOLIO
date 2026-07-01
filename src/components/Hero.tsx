import { motion } from "motion/react";
import DecryptedText from "./DecryptedText";

export default function Hero() {
  return (
    <section id="section-resting" className="section-container !justify-start pt-48 md:pt-64">
      <div className="content-column">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="label-eyebrow">Based in Gurugram, India</span>
          <h1 className="text-4xl sm:text-5xl md:text-[8rem] mb-12 leading-[0.8] tracking-[-0.04em] mix-blend-multiply">
            <DecryptedText text="Siddharth" className="block" />
            <DecryptedText text="Sharma." className="block opacity-20" />
          </h1>
          <p className="text-xl md:text-3xl text-ink-secondary max-w-2xl leading-tight font-medium px-1 md:px-0">
            Founder and growth operator with a rare technical range. 
            Designing campaigns, building products, and reading markets — often all at once.
          </p>
          
          <div className="mt-16">
            <a 
              href="https://www.linkedin.com/in/siddharthsharm04" 
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-4 bg-ink-primary text-white px-10 py-5 rounded-full font-bold overflow-hidden transition-all hover:scale-105"
            >
              <span className="relative z-10">LinkedIn</span>
              <div className="absolute inset-0 bg-accent-signal translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.22, 1, 0.36, 1]" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
