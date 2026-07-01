import { motion } from "motion/react";

export default function BackgroundSection() {
  return (
    <section id="section-background" className="section-container min-h-[80vh]">
      <div className="content-column">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="label-eyebrow">Academic Foundation</span>
          <h2 className="text-4xl md:text-8xl mb-16">Background</h2>
          
          <div className="space-y-16">
            <div className="group">
              <h3 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-accent-signal transition-colors">Masters' Union, Gurugram</h3>
              <p className="text-xl text-ink-secondary mb-2">PGP in Technology & Business Management (Young Leaders Cohort)</p>
              <p className="text-sm font-bold uppercase tracking-widest opacity-40">2025 – 2027</p>
            </div>
            
            <div className="group">
              <h3 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-accent-signal transition-colors">Jain School of Commerce, Bengaluru</h3>
              <p className="text-xl text-ink-secondary mb-2">Bachelor of Commerce (Honors), Finance & Business Analytics</p>
              <p className="text-sm font-bold uppercase tracking-widest opacity-40">2022 – 2025</p>
            </div>
            
            <div className="group">
              <h3 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-accent-signal transition-colors">The Heritage School, Dehradun</h3>
              <p className="text-xl text-ink-secondary mb-2">Schooled & Early Foundations</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
