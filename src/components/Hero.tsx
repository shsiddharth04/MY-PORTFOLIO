import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import Magnetic from "./Magnetic";

const milestones = ["Discover", "Define", "Build", "Ship", "Measure"];

export default function Hero() {
  const lineRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    const line = lineRef.current;
    if (!line) return;
    const len = line.getTotalLength ? line.getTotalLength() : 400;
    line.style.strokeDasharray = `${len}`;
    line.style.strokeDashoffset = `${len}`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          line.style.animation = `drawLine 1.8s ease-out 0.8s forwards`;
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(line);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="section-hero"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-14 lg:px-20 pt-28 pb-20"
    >
      <div className="content-col">
        {/* Identity label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 mb-10"
        >
          <span className="mono-label">Siddharth Sharma</span>
          <span className="w-4 h-px bg-white/15" />
          <span className="mono-label">Gurugram, India</span>
          <span className="w-4 h-px bg-white/15" />
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse" />
            <span className="mono-label text-amber">Open to opportunities</span>
          </span>
        </motion.div>

        {/* Main positioning statement */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-[2.4rem] sm:text-[3.2rem] md:text-[4rem] lg:text-[4.8rem] leading-[1.05] tracking-[-0.03em] text-text mb-8 max-w-3xl"
        >
          I find the problem
          <br />
          worth solving.
          <br />
          <span className="text-text/30">Then I ship it.</span>
        </motion.h1>

        {/* Descriptor */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="font-mono text-sm text-muted mb-10 tracking-wide"
        >
          Product thinking&nbsp;&nbsp;·&nbsp;&nbsp;Technical depth&nbsp;&nbsp;·&nbsp;&nbsp;Shipped products
        </motion.p>

        {/* Product lifecycle visual */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-12"
        >
          <svg viewBox="0 0 480 48" className="w-full max-w-lg h-12 overflow-visible" fill="none">
            {/* Base line */}
            <line x1="20" y1="18" x2="460" y2="18" stroke="rgba(245,244,240,0.06)" strokeWidth="1" />
            {/* Animated amber line */}
            <line
              ref={lineRef}
              x1="20" y1="18" x2="460" y2="18"
              stroke="#F0B429"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* Milestone nodes + labels */}
            {milestones.map((label, i) => {
              const x = 20 + i * 110;
              return (
                <motion.g
                  key={label}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + i * 0.15, duration: 0.4 }}
                >
                  <circle cx={x} cy={18} r={i === 2 ? 5 : 3.5} fill={i === 2 ? "#F0B429" : "#09090B"} stroke="#F0B429" strokeWidth="1.5" />
                  <text
                    x={x}
                    y={38}
                    textAnchor="middle"
                    fill="rgba(245,244,240,0.3)"
                    fontSize="8"
                    fontFamily="JetBrains Mono, monospace"
                    letterSpacing="0.08em"
                  >
                    {label.toUpperCase()}
                  </text>
                </motion.g>
              );
            })}
          </svg>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75 }}
        >
          <Magnetic strength={0.4}>
            <a
              href="https://www.linkedin.com/in/siddharthsharm04"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 border border-white/10 hover:border-amber/50 px-7 py-3.5 rounded-full transition-all duration-500 hover:bg-amber/5"
            >
              <span className="mono-label text-text/60 group-hover:text-amber transition-colors duration-300">
                LinkedIn
              </span>
              <svg className="w-3 h-3 text-muted group-hover:text-amber transition-colors duration-300 -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </Magnetic>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-10 left-6 md:left-14 lg:left-20 flex items-center gap-3"
      >
        <div className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent" />
        <span className="mono-label">Scroll</span>
      </motion.div>
    </section>
  );
}
