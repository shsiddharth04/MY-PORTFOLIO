import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import Magnetic from "./Magnetic";

export default function Hero() {
  const lineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = lineRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;
    path.style.strokeDashoffset = `${len}`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          path.style.animation = `drawLine 2.2s ease-out 1s forwards`;
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(path);
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
            <span className="mono-label text-amber">Available</span>
          </span>
        </motion.div>

        {/* Main positioning statement */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-[2.4rem] sm:text-[3.2rem] md:text-[4rem] lg:text-[4.8rem] leading-[1.05] tracking-[-0.03em] text-text mb-8 max-w-3xl"
        >
          I started by reading
          <br />
          price action. Now I
          <br />
          build the platforms
          <br />
          <span className="text-text/30">that create it.</span>
        </motion.h1>

        {/* Descriptor */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="font-mono text-sm text-muted mb-10 tracking-wide"
        >
          Founder&nbsp;&nbsp;·&nbsp;&nbsp;Growth operator&nbsp;&nbsp;·&nbsp;&nbsp;Solo builder
        </motion.p>

        {/* Amber price-action line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-12"
        >
          <svg
            viewBox="0 0 560 60"
            className="w-full max-w-lg h-12 overflow-visible"
            fill="none"
          >
            <path
              ref={lineRef}
              d="M 0,48 L 40,48 L 55,12 L 75,42 L 95,30 L 120,30 L 145,8 L 168,38 L 195,22 L 225,22 L 252,42 L 278,14 L 308,32 L 340,18 L 372,18 L 400,36 L 428,10 L 458,30 L 490,20 L 520,20 L 560,6"
              stroke="#F0B429"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Terminal dot */}
            <circle cx="560" cy="6" r="3" fill="#F0B429" opacity="0.7" />
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
