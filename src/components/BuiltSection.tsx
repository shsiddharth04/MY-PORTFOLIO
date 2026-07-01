import { motion } from "motion/react";

export default function BuiltSection() {
  return (
    <>
      <section id="section-postg8" className="section-container">
        <div className="content-column">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <span className="label-eyebrow" style={{ color: "#2F2BB0" }}>Current Focus</span>
            <h2 className="text-4xl md:text-8xl mb-10">PostG8</h2>
            
            <div className="space-y-12 text-xl text-ink-secondary leading-relaxed">
              <p className="text-2xl font-medium text-ink-primary">
                An AI-powered LinkedIn content and growth platform. 
              </p>
              <p>
                Conceived, designed, and built an entire SaaS product solo — from the AI content engine to the payments system to the multi-account social integrations — taking it from a blank page to a fully working, monetized platform.
              </p>
              
              {/* Bento Grid Treatment */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8">
                <div className="md:col-span-2 card-surface bg-[#2F2BB0]/5 border-[#2F2BB0]/20 p-8">
                  <h3 className="text-xl font-bold text-[#2F2BB0] mb-3">Solo Architect</h3>
                  <p className="text-base">Designed the entire experience: research, database architecture, and user interface from scratch.</p>
                </div>
                <div className="card-surface p-8 flex flex-col justify-center text-center">
                  <span className="text-4xl font-bold text-[#2F2BB0] mb-2">100%</span>
                  <p className="text-xs uppercase tracking-widest font-bold">Code Ownership</p>
                </div>
                <div className="card-surface p-8">
                  <h3 className="text-lg font-bold mb-2">AI Engine</h3>
                  <p className="text-sm">Proprietary content generation layer for professional personal brands.</p>
                </div>
                <div className="md:col-span-2 card-surface p-8">
                  <h3 className="text-lg font-bold mb-2">Full-Stack Scale</h3>
                  <p className="text-sm">Integrated global payment gateways and secure multi-account OAuth systems for LinkedIn automation.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="section-gigculture" className="section-container">
        <div className="content-column">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <span className="label-eyebrow" style={{ color: "#A79ED1" }}>Gig Culture India</span>
            <h2 className="text-3xl md:text-6xl mb-8">Booking Marketplace</h2>
            <p className="text-lg font-medium text-ink-secondary mb-12 italic">2025 • Past Project</p>
            
            <div className="space-y-8 text-xl text-ink-secondary leading-relaxed">
              <p>
                A marketplace for booking performance artists. Designed the end-to-end discovery and booking experience for artists and the people who hire them.
              </p>
              <div className="card-surface border-dashed">
                <p>Built a working version of the product from the ground up, framed as a successful past chapter in platform design.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-container">
        <div className="content-column">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="label-eyebrow">D2C Operations</span>
            <h2 className="text-4xl md:text-6xl mb-8">Nurture Nest</h2>
            <p className="text-lg font-medium text-ink-secondary mb-12 italic">Jul 2025 – Sep 2025</p>
            
            <div className="space-y-10 text-xl text-ink-secondary leading-relaxed">
              <p>
                Co-founded and ran daily operations across sourcing, marketing, and fulfillment; generated ₹25,000 in revenue within 2 months through focused campaigns.
              </p>
              <div className="card-surface p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <span className="text-5xl font-bold text-ink-primary">₹25K</span>
                  <p className="text-sm font-bold uppercase tracking-widest text-ink-secondary mt-2">Gross Revenue</p>
                </div>
                <div className="h-px w-full md:h-16 md:w-px bg-border-subtle" />
                <div className="flex-1">
                  <p className="text-lg font-medium">Built lightweight systems to track sales and margins, optimizing for rapid sourcing-to-delivery loops.</p>
                </div>
              </div>
            </div>
            
            <div className="mt-32 pt-12 border-t border-border-subtle">
              <p className="text-base text-ink-secondary leading-relaxed">
                <span className="font-bold text-ink-primary block mb-2 underline decoration-accent-signal">Earlier Endeavors</span>
                Independent market research into carpooling app adoption across Indian cities (2022-2023), and a wellness blog built through evidence-based writing and organic SEO growth (2020).
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
