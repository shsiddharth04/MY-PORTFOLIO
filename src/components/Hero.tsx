import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import Magnetic from "./Magnetic";

const milestones = ["Discover", "Define", "Build", "Ship", "Measure"];

export default function Hero() {
  const lineRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    const line = lineRef.current;
    if (!line) return;
    line.style.strokeDasharray = "440";
    line.style.strokeDashoffset = "440";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting)
          line.style.animation = "drawLine 1.8s ease-out 0.9s forwards";
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
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-center gap-3 mb-12"
        >
          <span className="mono-label">Siddharth Sharma</span>
          <span className="w-4 h-px bg-text/15" />
          <span className="mono-label">Gurugram, India</span>
          <span className="w-4 h-px bg-text/15" />
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse" />
            <span className="mono-label text-amber">Open to opportunities</span>
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="text-[2.4rem] sm:text-[3rem] md:text-[3.8rem] lg:text-[4.4rem] leading-[1.06] tracking-[-0.03em] text-text mb-7 max-w-2xl"
        >
          I find the problem
          <br />
          worth solving.
          <br />
          <span className="text-text/25">Then I ship it.</span>
        </motion.h1>

        {/* Descriptor */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="font-mono text-sm text-muted mb-10 tracking-wide"
        >
          Product thinking&nbsp;&nbsp;·&nbsp;&nbsp;Technical depth&nbsp;&nbsp;·&nbsp;&nbsp;Shipped products
        </motion.p>

        {/* Product lifecycle SVG */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="mb-12"
        >
          <svg viewBox="0 0 480 48" className="w-full max-w-md h-12 overflow-visible" fill="none">
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
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 + i * 0.12, duration: 0.35 }}
                >
                  <circle
                    cx={x} cy={18}
                    r={i === 2 ? 5 : 3.5}
                    fill={i === 2 ? "#B87020" : "#F4F3EF"}
                    stroke="#B87020"
                    strokeWidth="1.5"
                  />
                  <text
                    x={x} y={38}
                    textAnchor="middle"
                    fill="rgba(21,21,19,0.35)"
                    fontSize="7.5"
                    fontFamily="JetBrains Mono, monospace"
                    letterSpacing="0.06em"
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
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <Magnetic strength={0.4}>
            <a
              href="https://www.linkedin.com/in/siddharthsharm04"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 border border-text/12 hover:border-text/30 px-7 py-3.5 rounded-full transition-all duration-400 hover:bg-text/3"
            >
              <span className="mono-label group-hover:text-text transition-colors duration-300">
                LinkedIn
              </span>
              <svg className="w-3 h-3 text-muted group-hover:text-text transition-colors duration-300 -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        transition={{ delay: 1.3, duration: 0.7 }}
        className="absolute bottom-10 left-6 md:left-14 lg:left-20 flex items-center gap-3"
      >
        <div className="w-px h-10 bg-gradient-to-b from-text/20 to-transparent" />
        <span className="mono-label">Scroll</span>
      </motion.div>
    </section>
  );
}
