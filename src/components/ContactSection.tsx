import { motion } from "motion/react";
import { Mail, Phone, Linkedin, ArrowRight } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="section-contact" className="section-container pb-32">
      <div className="content-column">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="label-eyebrow">Connect</span>
          <h2 className="text-6xl md:text-9xl mb-20 leading-[0.85] tracking-tighter">
            Let's build<br />something real.
          </h2>
          
          <div className="flex flex-col gap-12">
            <a 
              href="mailto:sh.siddharthsharma04@gmail.com" 
              className="group flex flex-col md:flex-row md:items-center gap-4 text-2xl sm:text-3xl md:text-5xl hover:text-accent-signal transition-colors font-display break-all sm:break-normal"
            >
              <span className="opacity-40 group-hover:opacity-100 transition-opacity">Email</span>
              <span className="hidden md:inline opacity-20">—</span>
              sh.siddharthsharma04@gmail.com
            </a>
            
            <a 
              href="tel:+918077504664" 
              className="group flex flex-col md:flex-row md:items-center gap-4 text-3xl md:text-5xl hover:text-accent-signal transition-colors font-display"
            >
              <span className="opacity-40 group-hover:opacity-100 transition-opacity">Phone</span>
              <span className="hidden md:inline opacity-20">—</span>
              +91-8077504664
            </a>

            <div className="flex gap-8 mt-4">
              <a 
                href="https://www.linkedin.com/in/siddharthsharm04" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 rounded-full border border-border-subtle flex items-center justify-center hover:bg-ink-primary hover:text-white hover:border-ink-primary transition-all duration-500"
                aria-label="LinkedIn"
              >
                <Linkedin size={28} />
              </a>
            </div>
          </div>

          <div className="mt-48 pt-12 border-t border-border-subtle flex flex-col md:flex-row justify-between text-xs font-bold uppercase tracking-[0.2em] text-ink-secondary gap-8">
            <p>© 2026 Siddharth Sharma</p>
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-signal animate-pulse" />
              Available for collaborations
            </p>
            <p>Gurugram, India</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
