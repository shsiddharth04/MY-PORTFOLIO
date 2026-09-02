import { useEffect, useRef } from "react";
import { motion } from "motion/react";

const milestones = ["Discover", "Define", "Build", "Ship", "Measure"];

export default function Hero() {
  const lineRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    const line = lineRef.current;
    if (!line) return;
    line.style.strokeDasharray = "440";
    line.style.strokeDashoffset = "440";
    const t = setTimeout(() => {
      line.style.transition = "stroke-dashoffset 1.8s ease-out";
      line.style.strokeDashoffset = "0";
    }, 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="section-hero"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-14 lg:px-20 pt-24 pb-20"
    >
      <div className="max-w-5xl w-full">

        {/* Top meta */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center gap-3 mb-12"
        >
          <span className="mono-label">SS</span>
          <span className="w-3 h-px bg-text/15" />
          <span className="mono-label">Gurugram, India</span>
          <span className="w-3 h-px bg-text/15" />
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse" />
            <span className="mono-label text-amber">Open to opportunities</span>
          </span>
        </motion.div>

        {/* Name — the visual anchor */}
        <div className="mb-8 overflow-hidden">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-bold leading-none tracking-[-0.04em]"
            style={{ fontSize: "clamp(3.2rem, 10vw, 10rem)" }}
          >
            Siddharth
            <br />
            <span className="text-text/22">Sharma.</span>
          </motion.h1>
        </div>

        {/* Role */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mono-label mb-8"
        >
          Product Manager
        </motion.p>

        {/* Bio — short, direct */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="text-base md:text-lg text-muted leading-relaxed max-w-lg mb-12"
        >
          I find real problems, scope the right solution, and ship it.
          Built three products from scratch, ran growth for 170,000 users,
          and understand engineering well enough to not slow teams down.
        </motion.p>

        {/* Product lifecycle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-12"
        >
          <svg viewBox="0 0 480 48" className="w-full max-w-sm h-12 overflow-visible" fill="none">
            <line x1="20" y1="18" x2="460" y2="18" stroke="rgba(21,21,19,0.08)" strokeWidth="1" />
            <line
              ref={lineRef}
              x1="20" y1="18" x2="460" y2="18"
              stroke="#B87020"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {milestones.map((label, i) => {
              const x = 20 + i * 110;
              return (
                <motion.g
                  key={label}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.0 + i * 0.1, duration: 0.3 }}
                >
                  <circle
                    cx={x} cy={18} r={i === 2 ? 5 : 3.5}
                    fill={i === 2 ? "#B87020" : "#F4F3EF"}
                    stroke="#B87020" strokeWidth="1.5"
                  />
                  <text
                    x={x} y={38} textAnchor="middle"
                    fill="rgba(21,21,19,0.4)"
                    fontSize="7.5"
                    fontFamily="JetBrains Mono, monospace"
                    letterSpacing="0.05em"
                  >
                    {label.toUpperCase()}
                  </text>
                </motion.g>
              );
            })}
          </svg>
        </motion.div>

        {/* LinkedIn CTA — no magnetic */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.75 }}
        >
          <a
            href="https://www.linkedin.com/in/siddharthsharm04"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-text border-b border-text/25 hover:border-text pb-0.5 transition-colors duration-200"
          >
            LinkedIn
            <svg className="w-3 h-3 -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-10 left-6 md:left-14 lg:left-20 flex items-center gap-3"
      >
        <div className="w-px h-10 bg-gradient-to-b from-text/20 to-transparent" />
        <span className="mono-label">Scroll</span>
      </motion.div>
    </section>
  );
}
