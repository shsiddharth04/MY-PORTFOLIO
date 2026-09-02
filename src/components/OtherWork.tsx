import { useRef } from "react";
import { motion, useInView } from "motion/react";

const work = [
  {
    company: "Omnibiz Africa",
    role: "Growth Marketing Intern",
    period: "Mar – Jun 2026",
    type: "Remote",
    metric: "₹30L campaign revenue in one week",
    metricColor: "text-amber",
  },
  {
    company: "Funding Pips",
    role: "Funded Forex Trader",
    period: "Jan 2024 – Jan 2025",
    type: "Bengaluru",
    metric: "$5K account · 60% profit share · 2 payouts",
    metricColor: "text-emerald-400/70",
  },
  {
    company: "Nurture Nest",
    role: "Co-founder, D2C Operations",
    period: "Jul – Sep 2025",
    type: "Gurugram",
    metric: "₹25K gross revenue in 2 months",
    metricColor: "text-amber",
  },
  {
    company: "Carpooling Research",
    role: "Independent market study",
    period: "2022 – 2023",
    type: "India",
    metric: "Adoption & feasibility across major cities",
    metricColor: "text-muted",
  },
  {
    company: "Fitness Delusion",
    role: "Writer & SEO strategist",
    period: "2020",
    type: "Online",
    metric: "Evidence-based wellness · Organic SEO growth",
    metricColor: "text-muted",
  },
];

export default function OtherWork() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="section-otherwork" className="section-wrap border-t border-white/5">
      <div className="w-full max-w-4xl z-10" ref={ref}>
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="mono-label mb-6 block"
        >
          04 — Other work
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl md:text-5xl mb-12 leading-[1.1]"
        >
          Before the
          <br />
          <span className="text-text/30">flagships.</span>
        </motion.h2>

        {/* Table header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden md:grid grid-cols-[1fr_1fr_1.4fr] gap-6 pb-3 border-b border-white/8 mb-2"
        >
          <span className="mono-label">Company / Project</span>
          <span className="mono-label">Role · Period</span>
          <span className="mono-label">Highlight</span>
        </motion.div>

        {work.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 + i * 0.07 }}
            className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1.4fr] gap-1 md:gap-6 py-5 border-b border-white/5 group hover:border-white/10 transition-colors duration-300"
          >
            <div>
              <p className="text-text text-sm font-medium group-hover:text-amber transition-colors duration-300">
                {item.company}
              </p>
              <p className="mono-label md:hidden mt-0.5">{item.role} · {item.period}</p>
            </div>
            <div className="hidden md:block">
              <p className="text-muted text-sm">{item.role}</p>
              <p className="font-mono text-[10px] text-muted/50 mt-0.5">
                {item.period} · {item.type}
              </p>
            </div>
            <p className={`text-sm ${item.metricColor} font-mono text-[11px] leading-relaxed md:pt-0.5`}>
              {item.metric}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
