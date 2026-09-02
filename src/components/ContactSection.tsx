import { useRef } from "react";
import { motion, useInView } from "motion/react";
import Magnetic from "./Magnetic";

const contacts = [
  {
    label: "Email",
    value: "sh.siddharthsharma04@gmail.com",
    href: "mailto:sh.siddharthsharma04@gmail.com",
  },
  {
    label: "Phone",
    value: "+91 8077 504 664",
    href: "tel:+918077504664",
  },
  {
    label: "LinkedIn",
    value: "siddharthsharm04",
    href: "https://www.linkedin.com/in/siddharthsharm04",
  },
];

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="section-contact" className="section-wrap border-t border-white/5">
      <div className="content-col" ref={ref}>
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="mono-label mb-6 block"
        >
          05 — Contact
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-[-0.03em] mb-14"
        >
          Let's
          <br />
          <span className="text-amber">work.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="space-y-6 mb-16"
        >
          {contacts.map((c, i) => (
            <a
              key={i}
              href={c.href}
              target={c.label === "LinkedIn" ? "_blank" : undefined}
              rel={c.label === "LinkedIn" ? "noopener noreferrer" : undefined}
              className="group flex items-center justify-between py-4 border-b border-white/6 hover:border-white/14 transition-colors duration-300"
            >
              <span className="mono-label">{c.label}</span>
              <span className="text-muted text-sm font-mono group-hover:text-amber transition-colors duration-400">
                {c.value}
              </span>
            </a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Magnetic strength={0.35}>
            <a
              href="mailto:sh.siddharthsharma04@gmail.com"
              className="group inline-flex items-center gap-3 bg-amber/10 hover:bg-amber/15 border border-amber/20 hover:border-amber/40 text-amber px-8 py-4 rounded-full transition-all duration-400"
            >
              <span className="mono-label !text-amber">Send a message</span>
              <svg className="w-3 h-3 -rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </Magnetic>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="mt-28 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <span className="mono-label">© 2026 Siddharth Sharma</span>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse" />
          <span className="mono-label text-amber">Available for collaborations</span>
        </div>
        <span className="mono-label">Gurugram, India</span>
      </motion.footer>
    </section>
  );
}
