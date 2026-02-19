import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Linkedin, Github, Phone, MapPin, ArrowUpRight, Download } from "lucide-react";

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: "jamesmnyamai9@gmail.com",
    href: "mailto:jamesmnyamai9@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+254 745 806 761",
    href: "tel:+254745806761",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "malila-nyamai",
    href: "https://www.linkedin.com/in/malila-nyamai-0b2711221",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "joashnyamai",
    href: "https://github.com/joashnyamai",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Nairobi, Kenya",
    href: null,
  },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" ref={ref} className="py-28 px-6 bg-navy-surface/30">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-cyan text-xs tracking-widest uppercase font-medium">08 / Contact</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-6">
            Let's Build{" "}
            <span className="text-gradient">Together</span>
          </h2>
          <div className="section-divider mx-auto mb-8" />
          <p className="max-w-xl mx-auto text-muted-foreground leading-relaxed">
            Whether you're looking for a full stack engineer, a QA specialist, an IT consultant,
            or a digital trainer, I'd love to hear about what you're building. Let's make it happen.
          </p>
        </motion.div>

        {/* Contact card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="card-glass rounded-3xl p-8 md:p-12 border border-cyan/10"
        >
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {contactLinks.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
              >
                {link.href ? (
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-4 p-4 rounded-xl border border-navy-border hover:border-cyan/40 hover:bg-cyan/5 transition-all duration-200 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-navy-elevated border border-navy-border flex items-center justify-center flex-shrink-0 group-hover:border-cyan/30 group-hover:bg-cyan/10 transition-all">
                      <link.icon size={16} className="text-cyan" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground">{link.label}</p>
                      <p className="text-sm text-foreground font-medium truncate">{link.value}</p>
                    </div>
                    <ArrowUpRight size={14} className="text-muted-foreground group-hover:text-cyan transition-colors flex-shrink-0" />
                  </a>
                ) : (
                  <div className="flex items-center gap-4 p-4 rounded-xl border border-navy-border">
                    <div className="w-10 h-10 rounded-lg bg-navy-elevated border border-navy-border flex items-center justify-center flex-shrink-0">
                      <link.icon size={16} className="text-cyan" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{link.label}</p>
                      <p className="text-sm text-foreground font-medium">{link.value}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 border-t border-navy-border">
            <motion.a
              href="mailto:jamesmnyamai9@gmail.com"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.7 }}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl gradient-accent text-primary-foreground font-display font-semibold text-sm tracking-wide hover:opacity-90 transition-opacity animate-pulse-glow"
            >
              <Mail size={16} />
              Send Me a Message
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/malila-nyamai-0b2711221"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.8 }}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border border-navy-border text-foreground font-display font-semibold text-sm tracking-wide hover:border-cyan hover:text-cyan transition-all duration-200"
            >
              <Linkedin size={16} />
              Connect on LinkedIn
            </motion.a>
            <motion.a
              href="/Malila_Nyamai_Resume.pdf"
              download
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.9 }}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border border-cyan/40 text-cyan font-display font-semibold text-sm tracking-wide hover:bg-cyan/10 transition-all duration-200"
            >
              <Download size={16} />
              Download CV
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
