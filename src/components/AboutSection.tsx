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
          Product thinker
          <br />
          <span className="text-text/30">who ships.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-5 text-base md:text-lg text-muted leading-relaxed max-w-2xl"
        >
          <p>
            Before writing a line of code for Blue Lotus, I spent weeks with manufacturing
            CXOs — understanding exactly why surplus raw material inventory was a problem worth
            solving, and why existing solutions missed the mark. That instinct — understand the
            problem before committing to the solution — has shaped everything I've built since.
          </p>
          <p>
            PostG8 started the same way: a real pain I'd seen professionals struggle with, turned
            into a product I designed and shipped solo — four product areas, three pricing tiers,
            full technical execution, monetized. Not a side project. A working product.
          </p>
          <p>
            At Omnibiz Africa, I designed retention and reactivation systems for 170,000 B2B
            retailer customers across Africa. Trigger-based in-app journeys, multi-channel lifecycle
            campaigns, conditional logic across branches — campaign design treated as{" "}
            <span className="text-text font-medium">product design.</span> The output: ₹30L in
            tracked revenue in a single week.
          </p>
          <p>
            I understand how engineering works. I can write specs that engineers don't rewrite.
            I can make tradeoff calls without escalating every decision. Currently deepening the
            business and strategy side at Masters' Union, Gurugram.
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
