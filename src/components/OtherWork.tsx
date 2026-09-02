import { useRef } from "react";
import { motion, useInView } from "motion/react";

const work = [
  {
    company: "Omnibiz Africa",
    role: "Growth intern",
    period: "Mar – Jun 2026",
    type: "Remote",
    metric: "Designed trigger-based lifecycle journeys for 170K retailers. 30L revenue in one week.",
    highlight: true,
  },
  {
    company: "Funding Pips",
    role: "Funded trader",
    period: "Jan 2024 – Jan 2025",
    type: "Bengaluru",
    metric: "High-stakes decision-making under strict risk parameters. Passed a two-stage evaluation.",
    highlight: false,
  },
  {
    company: "Nurture Nest",
    role: "Co-founder",
    period: "Jul – Sep 2025",
    type: "Gurugram",
    metric: "End-to-end operations: sourcing, marketing, fulfillment. 25K gross in 2 months.",
    highlight: false,
  },
  {
    company: "Carpooling Research",
    role: "Independent researcher",
    period: "2022 – 2023",
    type: "India",
    metric: "User research on adoption barriers across major Indian cities.",
    highlight: false,
  },
  {
    company: "Fitness Delusion",
    role: "Writer",
    period: "2020",
    type: "Online",
    metric: "Evidence-based health writing. Grew organic traffic through structured SEO.",
    highlight: false,
  },
];

export default function OtherWork() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="section-otherwork" className="section-wrap">
      <div className="w-full max-w-4xl z-10" ref={ref}>
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="mono-label mb-6 block"
        >
          04 — Other experience
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl md:text-5xl mb-12 leading-[1.1]"
        >
          More context
          <br />
          <span className="text-text/25">on how I think.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="hidden md:grid grid-cols-[1fr_1fr_1.6fr] gap-6 pb-3 border-b border-text/8 mb-2"
        >
          <span className="mono-label">Company</span>
          <span className="mono-label">Role · Period</span>
          <span className="mono-label">What it shows</span>
        </motion.div>

        {work.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.22 + i * 0.06 }}
            className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1.6fr] gap-1 md:gap-6 py-5 border-b border-text/6 group hover:border-text/14 transition-colors duration-300"
          >
            <div>
              <p className={`text-sm font-medium transition-colors duration-300 ${item.highlight ? "text-text group-hover:text-amber" : "text-text/70 group-hover:text-text"}`}>
                {item.company}
              </p>
              <p className="mono-label md:hidden mt-0.5">{item.role} · {item.period}</p>
            </div>
            <div className="hidden md:block">
              <p className="text-muted text-sm">{item.role}</p>
              <p className="font-mono text-[10px] text-muted/50 mt-0.5">{item.period} · {item.type}</p>
            </div>
            <p className={`font-mono text-[11px] leading-relaxed md:pt-0.5 ${item.highlight ? "text-text/70" : "text-muted/70"}`}>
              {item.metric}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
