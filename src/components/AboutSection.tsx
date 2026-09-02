import { useRef } from "react";
import { motion, useInView } from "motion/react";

const education = [
  {
    school: "Masters' Union",
    location: "Gurugram",
    degree: "PGP in Technology & Business Management",
    cohort: "Young Leaders Cohort",
    years: "2025 – 2027",
  },
  {
    school: "Jain School of Commerce",
    location: "Bengaluru",
    degree: "B.Com (Honors), Finance & Business Analytics",
    cohort: null,
    years: "2022 – 2025",
  },
  {
    school: "The Heritage School",
    location: "Dehradun",
    degree: "Early foundations",
    cohort: null,
    years: null,
  },
];

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="section-about" className="section-wrap border-t border-white/5">
      <div className="content-col" ref={ref}>
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="mono-label mb-6 block"
        >
          00 — About
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl md:text-5xl mb-12 leading-[1.1]"
        >
          Trader. Operator.
          <br />
          <span className="text-text/30">Builder.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-5 text-base md:text-lg text-muted leading-relaxed max-w-2xl"
        >
          <p>
            Started in Bengaluru with a commerce degree and a funded forex account — learning to read
            markets before I ever touched a product. Passed a two-stage evaluation and managed a $5K
            account under a 60% profit-share model. Learned when to move, when to hold, and how much
            to risk.
          </p>
          <p>
            Moved into growth at scale. At Omnibiz Africa, I ran retention and reactivation campaigns
            for 170,000 B2B retailers across Africa — trigger-based in-app flows, multi-channel
            lifecycle journeys, and a single week that generated{" "}
            <span className="text-text font-medium">₹30L in tracked campaign revenue.</span>
          </p>
          <p>
            Now I build. PostG8 is an AI-powered LinkedIn growth platform built solo, end to end.
            Blue Lotus is a B2B marketplace for surplus manufacturing inventory, co-founded and seeded
            at ₹10L pre-revenue. Earlier, I built the Academy and Marketplace for Gig Culture India —
            a chapter I'm proud of, now running without me.
          </p>
          <p>
            Currently at Masters' Union in Gurugram, studying Technology and Business Management.
          </p>
        </motion.div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 pt-10 border-t border-white/5"
        >
          <span className="mono-label mb-8 block">Education</span>
          <div className="space-y-6">
            {education.map((e, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-8">
                <span className="font-mono text-[11px] text-muted/50 sm:w-24 shrink-0 pt-0.5">
                  {e.years ?? "—"}
                </span>
                <div>
                  <p className="text-text text-sm font-medium">
                    {e.school}
                    <span className="text-muted font-normal">, {e.location}</span>
                  </p>
                  <p className="text-muted text-sm">
                    {e.degree}
                    {e.cohort && <span className="text-amber/60"> · {e.cohort}</span>}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
