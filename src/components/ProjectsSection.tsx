import { useRef, useEffect, useState, type ReactNode } from "react";
import { motion, useInView } from "motion/react";

/* ─── PostG8 Terminal Visual ─── */
const terminalLines = [
  { delay: 0, text: "> Analyzing LinkedIn profile...", color: "text-muted" },
  { delay: 0.8, text: "> ICP identified: B2B SaaS founders", color: "text-amber/70" },
  { delay: 1.6, text: "> Generating content strategy...", color: "text-muted" },
  { delay: 2.4, text: "> Draft ready: 3 hook variations", color: "text-emerald-400/70" },
  { delay: 3.2, text: "> Scheduled: Tomorrow, 9:00 AM IST ✓", color: "text-emerald-400/80" },
];

function TerminalLine({ text, color, delay }: { text: string; color: string; delay: number }) {
  const [visible, setVisible] = useState(false);
  const [typed, setTyped] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => {
      setVisible(true);
      let i = 0;
      const interval = setInterval(() => {
        setTyped(text.slice(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, 22);
      return () => clearInterval(interval);
    }, delay * 1000);
    return () => clearTimeout(t);
  }, [inView, text, delay]);

  return (
    <div ref={ref} className={`font-mono text-xs leading-6 ${color} ${visible ? "opacity-100" : "opacity-0"}`}>
      {typed}
      {visible && typed.length < text.length && (
        <span className="inline-block w-1.5 h-3.5 bg-amber/70 ml-0.5 align-middle" style={{ animation: "blink 0.8s step-end infinite" }} />
      )}
    </div>
  );
}

function PostG8Visual() {
  return (
    <div className="card-dark rounded-xl overflow-hidden">
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
        <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
        <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
        <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
        <span className="mono-label ml-3 text-white/20">PostG8 — Content Engine</span>
      </div>
      <div className="p-5 space-y-0.5 min-h-[140px]">
        {terminalLines.map((l, i) => (
          <div key={i}>
            <TerminalLine text={l.text} color={l.color} delay={l.delay} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Blue Lotus Node Graph Visual ─── */
function BlueLotusVisual() {
  const nodes = [
    { x: 50, y: 50, label: "Manufacturer" },
    { x: 50, y: 150, label: "Marketplace" },
    { x: 50, y: 250, label: "Buyer" },
  ];

  return (
    <div className="card-dark rounded-xl p-6 overflow-hidden">
      <svg viewBox="0 0 280 300" className="w-full h-full max-h-56" fill="none">
        {/* Connection lines */}
        <line x1="140" y1="55" x2="140" y2="145" stroke="rgba(34,71,214,0.3)" strokeWidth="1" />
        <line x1="140" y1="165" x2="140" y2="245" stroke="rgba(34,71,214,0.3)" strokeWidth="1" />

        {/* Animated data packets */}
        {[0, 1].map(i => (
          <circle key={i} r="3" fill="#2247D6" opacity="0.7">
            <animateMotion
              dur={`${1.8 + i * 0.4}s`}
              repeatCount="indefinite"
              begin={`${i * 0.9}s`}
              path={i === 0 ? "M140,55 L140,145" : "M140,165 L140,245"}
            />
          </circle>
        ))}

        {/* Nodes */}
        {[
          { cx: 140, cy: 50, label: "Manufacturer", sub: "Lists surplus stock" },
          { cx: 140, cy: 150, label: "Marketplace", sub: "AI matching engine", highlight: true },
          { cx: 140, cy: 250, label: "Buyer", sub: "Procures sub-MOQ" },
        ].map((n, i) => (
          <g key={i} style={{ animation: `nodePulse ${2 + i * 0.3}s ease-in-out infinite`, animationDelay: `${i * 0.4}s` }}>
            <circle
              cx={n.cx}
              cy={n.cy}
              r="18"
              fill={n.highlight ? "rgba(34,71,214,0.15)" : "rgba(245,244,240,0.03)"}
              stroke={n.highlight ? "#2247D6" : "rgba(245,244,240,0.12)"}
              strokeWidth="1"
            />
            <text x={n.cx} y={n.cy - 2} textAnchor="middle" className="font-mono" fill={n.highlight ? "#2247D6" : "rgba(245,244,240,0.6)"} fontSize="7" fontWeight="600">
              {n.label}
            </text>
            <text x={n.cx} y={n.cy + 8} textAnchor="middle" fill="rgba(245,244,240,0.25)" fontSize="5.5">
              {n.sub}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ─── GCI Waveform Visual ─── */
function GCIVisual() {
  const bars = Array.from({ length: 24 }, (_, i) => ({
    height: 20 + Math.random() * 80,
    delay: (i * 0.08) % 1.2,
    duration: 0.8 + Math.random() * 0.6,
  }));

  return (
    <div className="card-dark rounded-xl p-6 overflow-hidden">
      <div className="flex items-end justify-center gap-1 h-28">
        {bars.map((b, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm bg-gradient-to-t from-[#9B8EC4]/60 to-[#9B8EC4]/20"
            style={{
              height: `${b.height}%`,
              animation: `waveBar ${b.duration}s ease-in-out infinite`,
              animationDelay: `${b.delay}s`,
            }}
          />
        ))}
      </div>
      <div className="flex items-center justify-between mt-4">
        <span className="mono-label text-[#9B8EC4]/60">GIG CULTURE INDIA</span>
        <span className="mono-label text-white/20">PAST WORK · 2025</span>
      </div>
    </div>
  );
}

/* ─── Stat counter ─── */
function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="card-dark p-5 rounded-xl">
      <p className="font-display text-3xl font-bold text-text mb-1">{value}</p>
      <p className="mono-label">{label}</p>
    </div>
  );
}

/* ─── Project template ─── */
interface ProjectProps {
  id: string;
  index: string;
  tag: string;
  tagColor: string;
  title: string;
  subtitle: string;
  body: string[];
  links?: { label: string; href: string }[];
  stats?: { value: string; label: string }[];
  visual: ReactNode;
  pastWork?: boolean;
  tech?: string[];
}

function Project({ id, index, tag, tagColor, title, subtitle, body, links, stats, visual, pastWork, tech }: ProjectProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id={id} className="section-wrap border-t border-white/5">
      <div className="w-full z-10" ref={ref}>
        {/* Top meta */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="mono-label">{index}</span>
          <span className="w-6 h-px bg-white/10" />
          <span className="mono-label" style={{ color: tagColor }}>{tag}</span>
          {pastWork && (
            <span className="ml-auto font-mono text-[9px] tracking-[0.2em] uppercase text-white/20 border border-white/10 px-2 py-0.5 rounded-full">
              Past work
            </span>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Content */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-6xl mb-3 leading-[1.05]"
            >
              {title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mono-label mb-8"
            >
              {subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="space-y-4 text-muted text-base leading-relaxed mb-8"
            >
              {body.map((p, i) => <p key={i}>{p}</p>)}
            </motion.div>

            {stats && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.35 }}
                className="grid grid-cols-2 gap-3 mb-8"
              >
                {stats.map((s, i) => <div key={i}><Stat value={s.value} label={s.label} /></div>)}
              </motion.div>
            )}

            {tech && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="flex flex-wrap gap-2 mb-8"
              >
                {tech.map(t => (
                  <span key={t} className="font-mono text-[10px] tracking-wide text-muted border border-white/8 px-2.5 py-1 rounded-full">
                    {t}
                  </span>
                ))}
              </motion.div>
            )}

            {links && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                {links.map(l => (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 mono-label hover:text-text transition-colors duration-300"
                  >
                    {l.label}
                    <svg className="w-2.5 h-2.5 -rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                ))}
              </motion.div>
            )}
          </div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {visual}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Exported section ─── */
export default function ProjectsSection() {
  return (
    <>
      <Project
        id="section-postg8"
        index="01"
        tag="PostG8 · postg8.com"
        tagColor="#6366F1"
        title="PostG8"
        subtitle="AI-powered LinkedIn growth · Active · Solo-built"
        body={[
          "An AI-powered LinkedIn content and growth platform, built solo from a blank page to a paying product. Every layer — content engine, publishing, outreach automation, Razorpay billing — designed, architected, and shipped by one person.",
          "Quick Post, Content Strategy pipeline, Carousel Studio, Trending Topics, multi-account LinkedIn publishing, an Apify-backed outreach engine with ICP scoring, and a pipeline tracker from first connect to booked call.",
        ]}
        stats={[
          { value: "100%", label: "Code ownership" },
          { value: "3 tiers", label: "Free · Pro · Growth" },
        ]}
        tech={["React", "Supabase", "Gemini 2.5 Flash", "Razorpay", "LinkedIn OAuth", "Unipile", "Apify"]}
        links={[
          { label: "postg8.com", href: "https://postg8.com" },
          { label: "app.postg8.com", href: "https://app.postg8.com" },
        ]}
        visual={<PostG8Visual />}
      />

      <Project
        id="section-bluelotus"
        index="02"
        tag="Blue Lotus Value Tradelink · bluelotusvalue.com"
        tagColor="#2247D6"
        title="Blue Lotus"
        subtitle="B2B surplus materials marketplace · Co-founded · Active"
        body={[
          "A B2B marketplace where manufacturers list surplus raw material inventory and buyers procure it in flexible quantities — below typical minimum order size. Co-founded and directed, leading product design, tech strategy, and business development.",
          "Raised ₹10L in early-stage funding pitched pre-revenue. Shipped the MVP within two months. Validated directly with manufacturing CXOs.",
        ]}
        stats={[
          { value: "₹10L", label: "Raised pre-revenue" },
          { value: "15+", label: "Manufacturers onboarded" },
        ]}
        tech={["React", "Tailwind", "Supabase", "Vercel"]}
        links={[{ label: "bluelotusvalue.com", href: "https://bluelotusvalue.com" }]}
        visual={<BlueLotusVisual />}
      />

      <Project
        id="section-gigculture"
        index="03"
        tag="Gig Culture India"
        tagColor="#9B8EC4"
        title="Gig Culture India"
        subtitle="Artist booking marketplace · Past work · 2025"
        body={[
          "Built the Academy and Marketplace for Gig Culture India while I was involved. The Academy covers DJ education: masterclass slot booking, a full curriculum, admin portal, and a student LMS with magic-link enrollment-gated auth.",
          "The Marketplace is a two-sided artist/host booking platform with a Genre Wheel taste-mapping UI and an AI vibe-matching concept. The company continues independently — I'm no longer part of it.",
        ]}
        tech={["React", "Tailwind", "Supabase", "Resend", "Vercel"]}
        links={[
          { label: "Academy", href: "https://academy.gigcultureindia.com" },
          { label: "Marketplace", href: "https://marketplace.gigcultureindia.com" },
        ]}
        pastWork
        visual={<GCIVisual />}
      />
    </>
  );
}
