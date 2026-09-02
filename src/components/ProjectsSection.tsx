import { useRef, useEffect, useState, type ReactNode } from "react";
import { motion, useInView } from "motion/react";

/* ─── PostG8 Terminal (stays dark for contrast) ─── */
const terminalLines = [
  { delay: 0,   text: "> Problem: professionals cannot turn expertise into consistent content", color: "text-white/40" },
  { delay: 1.0, text: "> Solution: content engine + publishing + outreach in one product", color: "text-amber" },
  { delay: 2.2, text: "> Shipped: Free / Pro 999/mo / Growth tier", color: "text-emerald-400/80" },
  { delay: 3.2, text: "> Result: pre-launch. Built solo. Done.", color: "text-emerald-400/90" },
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
      }, 18);
      return () => clearInterval(interval);
    }, delay * 1000);
    return () => clearTimeout(t);
  }, [inView, text, delay]);

  return (
    <div ref={ref} className={`font-mono text-[11px] leading-6 ${color} ${visible ? "opacity-100" : "opacity-0"}`}>
      {typed}
      {visible && typed.length < text.length && (
        <span
          className="inline-block w-1.5 h-3 bg-amber ml-0.5 align-middle"
          style={{ animation: "blink 0.8s step-end infinite" }}
        />
      )}
    </div>
  );
}

function PostG8Visual() {
  return (
    <div className="card-terminal overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
        <div className="w-2 h-2 rounded-full bg-white/8" />
        <div className="w-2 h-2 rounded-full bg-white/8" />
        <div className="w-2 h-2 rounded-full bg-white/8" />
        <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-white/20 ml-3">
          PostG8 — Product log
        </span>
      </div>
      <div className="p-5 space-y-0.5 min-h-[130px]">
        {terminalLines.map((l, i) => (
          <div key={i}>
            <TerminalLine text={l.text} color={l.color} delay={l.delay} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Blue Lotus Validation Visual ─── */
function BlueLotusVisual() {
  const steps = [
    { label: "Market gap\nfound", note: "Manufacturers hold surplus" },
    { label: "CXO\nvalidation", note: "Before any code" },
    { label: "MVP\nscoped", note: "Sub-MOQ marketplace" },
    { label: "10L\nraised", note: "Pre-revenue pitch" },
    { label: "15+\nonboarded", note: "Manufacturer pilot" },
  ];

  return (
    <div className="card-light p-6 overflow-hidden">
      <span className="mono-label mb-6 block">Validation sequence before building</span>
      <div className="relative">
        <div className="absolute top-[18px] left-4 right-4 h-px bg-text/6" />
        <div className="absolute top-[18px] left-4 h-px bg-[#2247D6]/40" style={{ right: "16px" }} />
        <div className="relative flex justify-between">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.12, duration: 0.4 }}
              className="flex flex-col items-center gap-2"
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center z-10 bg-surface"
                style={{ border: "1px solid rgba(34,71,214,0.35)" }}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="#2247D6" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="font-mono text-[9px] tracking-wide text-muted text-center whitespace-pre-line leading-4">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── GCI Product Map ─── */
function GCIVisual() {
  const products = [
    { name: "Academy", color: "#9B8EC4", items: ["Masterclass booking", "Curriculum management", "Student LMS", "Admin portal"] },
    { name: "Marketplace", color: "#9B8EC4", items: ["Artist onboarding", "Host onboarding", "Genre Wheel UI", "Discovery flow"] },
  ];

  return (
    <div className="card-light p-6 overflow-hidden">
      <span className="mono-label mb-5 block">Products shipped</span>
      <div className="grid grid-cols-2 gap-6">
        {products.map((p) => (
          <div key={p.name}>
            <p className="font-mono text-[10px] tracking-[0.15em] uppercase mb-3" style={{ color: p.color }}>{p.name}</p>
            <div className="space-y-2">
              {p.items.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-text/20 shrink-0" />
                  <span className="font-mono text-[10px] text-muted">{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Stat block ─── */
function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="card-light p-5 rounded-xl">
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
  highlights?: string[];
  visual: ReactNode;
  pastWork?: boolean;
  tech?: string[];
}

function Project({ id, index, tag, tagColor, title, subtitle, body, links, stats, highlights, visual, pastWork, tech }: ProjectProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id={id} className="section-wrap">
      <div className="w-full z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="mono-label">{index}</span>
          <span className="w-6 h-px bg-text/12" />
          <span className="mono-label" style={{ color: tagColor }}>{tag}</span>
          {pastWork && (
            <span className="ml-auto font-mono text-[9px] tracking-[0.2em] uppercase text-muted border border-text/10 px-2 py-0.5 rounded-full">
              Past work
            </span>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-6xl mb-3 leading-[1.05]"
            >
              {title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="mono-label mb-8"
            >
              {subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.22 }}
              className="space-y-4 text-muted text-base leading-relaxed mb-8"
            >
              {body.map((p, i) => <p key={i}>{p}</p>)}
            </motion.div>

            {highlights && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.28 }}
                className="space-y-2.5 mb-8"
              >
                {highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-1 h-1 rounded-full bg-amber shrink-0 mt-2" />
                    <p className="text-sm text-muted/80">{h}</p>
                  </div>
                ))}
              </motion.div>
            )}

            {stats && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.33 }}
                className="grid grid-cols-2 gap-3 mb-8"
              >
                {stats.map((s, i) => <div key={i}><Stat value={s.value} label={s.label} /></div>)}
              </motion.div>
            )}

            {tech && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap gap-2 mb-8"
              >
                {tech.map(t => (
                  <span key={t} className="font-mono text-[10px] tracking-wide text-muted border border-text/8 px-2.5 py-1 rounded-full">
                    {t}
                  </span>
                ))}
              </motion.div>
            )}

            {links && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="flex flex-wrap gap-6"
              >
                {links.map(l => (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-sm font-medium text-text border-b border-text/25 hover:border-text pb-0.5 transition-colors duration-200"
                  >
                    {l.label}
                    <svg className="w-3 h-3 -rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                ))}
              </motion.div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {visual}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function ProjectsSection() {
  return (
    <>
      <Project
        id="section-postg8"
        index="01"
        tag="PostG8 · postg8.com"
        tagColor="#6366F1"
        title="PostG8"
        subtitle="AI LinkedIn growth platform · Product lead and sole builder · Active"
        body={[
          "Identified a real problem: professionals who know their expertise but cannot consistently put it into a LinkedIn presence. Went from problem to paid product solo.",
          "Designed and shipped four interconnected product areas: content generation, native LinkedIn publishing, an outreach engine with ICP scoring, and Razorpay subscription billing. Every product decision made independently.",
        ]}
        highlights={[
          "Defined scope and prioritized across 4 product areas with no team",
          "Designed the full onboarding, free-to-paid conversion, and subscription flow",
          "Made architecture tradeoffs solo: chose Supabase Edge Functions over a Node server to cut ops overhead",
          "Shipped 3 pricing tiers based on user value analysis, not guesswork",
        ]}
        stats={[
          { value: "4", label: "Product areas shipped" },
          { value: "3", label: "Pricing tiers, monetized" },
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
        subtitle="B2B marketplace for surplus raw materials · Co-founder and product director · Active"
        body={[
          "Identified a structural gap: manufacturers sitting on surplus raw material inventory with no efficient sell-off channel; buyers needing sub-MOQ quantities with no reliable source. Validated the problem directly with manufacturing CXOs before any product was scoped.",
          "Led product design, tech strategy, and business development. Raised 10 lakh in early-stage funding by leading every pitch with the user problem, not the product features.",
        ]}
        highlights={[
          "Ran discovery interviews with manufacturing CXOs before committing to any solution",
          "Defined MVP scope around the highest-pain, fastest-to-validate use case: sub-MOQ spot buying",
          "Led cross-functional execution: product decisions, engineering oversight, investor conversations simultaneously",
          "Shipped MVP in 2 months with 15+ manufacturers onboarded for the pilot",
        ]}
        stats={[
          { value: "10L", label: "Raised pre-revenue" },
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
        subtitle="Two-sided booking marketplace · Product builder · Past work · 2025"
        body={[
          "Designed and shipped two distinct products while involved with GCI: an Academy for DJ education with masterclass booking, a full curriculum, student LMS with enrollment-gated auth, and an admin portal for scheduling and cohort management.",
          "The Marketplace included the Genre Wheel, a taste-mapping UI to match artists to events based on vibe rather than genre labels. The company continues independently. I am no longer part of it.",
        ]}
        highlights={[
          "Designed the student LMS product end-to-end: enrollment flow, content structure, progress tracking",
          "Defined the Genre Wheel UX, a novel discovery mechanism replacing keyword search with taste mapping",
          "Managed product scope across two separate products simultaneously with shared infrastructure",
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
