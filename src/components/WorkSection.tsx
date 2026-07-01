import { motion } from "motion/react";

export default function WorkSection() {
  return (
    <>
      <section id="section-omnibiz" className="section-container">
        <div className="content-column">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <span className="label-eyebrow" style={{ color: "#1B2A63" }}>Omnibiz Africa</span>
            <h2 className="text-4xl md:text-7xl mb-8">Growth Marketing Intern</h2>
            <p className="text-lg font-medium text-ink-secondary mb-12 italic">Mar 2026 – Jun 2026 • Remote</p>
            
            <div className="space-y-8 text-xl text-ink-secondary leading-relaxed">
              <p>
                Owned retention and reactivation across a base of ~170,000 retailer customers on Omnibiz's B2B ordering platform.
              </p>
              <div className="card-surface p-10">
                <ul className="space-y-6">
                  <li>Designed trigger-based in-app banner campaigns (time-on-app, cart-add triggers) to drive upsell at the right moment.</li>
                  <li>Ran app push, WhatsApp, and SMS campaigns against overstocked inventory to convert stock into orders.</li>
                  <li>Built multi-day, multi-branch journey campaigns with conditional logic across the customer lifecycle.</li>
                  <li className="text-ink-primary font-bold text-2xl pt-4 border-t border-border-subtle">
                    ₹30L in tracked campaign revenue generated in a single week.
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="section-bluelotus" className="section-container">
        <div className="content-column">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <span className="label-eyebrow" style={{ color: "#2247D6" }}>Blue Lotus Value Tradelink</span>
            <h2 className="text-4xl md:text-7xl mb-8">Co-Founder & Director</h2>
            <p className="text-lg font-medium text-ink-secondary mb-12 italic">Aug 2024 – Present • Gurugram</p>
            
            <div className="space-y-8 text-xl text-ink-secondary leading-relaxed">
              <p>
                Raised ₹10L in early-stage funding, pitching investors on business value without prior revenue. Co-founded and shipped a B2B SaaS MVP within 2 months, targeting inventory inefficiencies in manufacturing.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card-surface p-8 group hover:border-[#2247D6] transition-colors">
                  <span className="block text-5xl font-display font-bold text-[#2247D6] mb-4">₹10L</span>
                  <p className="text-base font-medium">Raised in seed funding by pitching pure business value.</p>
                </div>
                <div className="card-surface p-8 group hover:border-[#2247D6] transition-colors">
                  <span className="block text-5xl font-display font-bold text-[#2247D6] mb-4">15+</span>
                  <p className="text-base font-medium">Manufacturing companies secured for onboarding.</p>
                </div>
              </div>
              <p>Led product design, tech strategy, and business development, engaging industry CXOs for validation.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="section-fundingpips" className="section-container">
        <div className="content-column">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <span className="label-eyebrow" style={{ color: "#2E8B57" }}>Funding Pips</span>
            <h2 className="text-4xl md:text-7xl mb-8">Funded Forex Trader</h2>
            <p className="text-lg font-medium text-ink-secondary mb-12 italic">Jan 2024 – Jan 2025 • Bengaluru</p>
            
            <div className="space-y-10 text-xl text-ink-secondary leading-relaxed">
              <div className="card-surface p-10 border-l-8 border-l-[#2E8B57] bg-[#2E8B57]/5">
                <p className="mb-6">Managed a $5,000 funded trading account independently under a 60% profit-sharing model. Passed a 2-stage evaluation delivering 8% and 5% returns with disciplined risk management.</p>
                
                {/* Visual Flourish: Animated Line Chart */}
                <div className="h-24 w-full relative overflow-hidden opacity-30 mt-8">
                  <svg viewBox="0 0 400 100" className="w-full h-full">
                    <path 
                      d="M 0,80 Q 50,70 100,50 T 200,60 T 300,20 T 400,10" 
                      fill="none" 
                      stroke="#2E8B57" 
                      strokeWidth="3"
                      strokeDasharray="1000"
                      strokeDashoffset="1000"
                      className="animate-[draw_2s_ease-out_forwards]"
                    />
                  </svg>
                  <style>{`
                    @keyframes draw {
                      to { stroke-dashoffset: 0; }
                    }
                  `}</style>
                </div>
              </div>
              <p>Earned 2 profit payouts and an advanced trading certificate for consistency. Focused on mechanical execution and strict drawdown control.</p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
