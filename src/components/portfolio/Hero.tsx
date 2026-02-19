import { motion } from "framer-motion";
import type { Easing } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, Download } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const EASE: Easing = "easeOut";
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: EASE, delay },
});

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/70 to-background" />

      {/* Animated glow orbs */}
      <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-cyan/5 blur-3xl animate-pulse-glow pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/5 w-56 h-56 rounded-full bg-primary/8 blur-3xl animate-float pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div {...fadeUp(0.1)} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan/30 bg-cyan/5 text-cyan text-xs tracking-widest uppercase font-medium mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
          Available for Opportunities
        </motion.div>

        {/* Profile Image */}
        <motion.div
          {...fadeUp(0.2)}
          className="relative inline-block mb-10 group"
        >
          {/* Animated Gradient Ring */}
          <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-cyan/40 via-blue-500/40 to-purple-500/40 opacity-70 blur-sm group-hover:opacity-100 group-hover:blur-md transition-all duration-500" />

          {/* Image Container */}
          <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-[6px] border-background shadow-2xl mx-auto">
            <img
              src="/profile.jpg"
              alt="Malila Nyamai"
              className="w-full h-full object-cover object-[center_15%] transform transition-transform duration-700 group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement?.classList.add('bg-muted');
              }}
            />
          </div>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          {...fadeUp(0.3)}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-6"
        >
          <span className="text-foreground">Malila</span>{" "}
          <span className="text-gradient">Nyamai</span>
        </motion.h1>

        {/* Title */}
        <motion.p
          {...fadeUp(0.65)}
          className="font-display text-lg md:text-2xl text-muted-foreground font-light tracking-wide mb-6"
        >
          Full Stack Engineer | QA Specialist | IT Consultant
        </motion.p>

        {/* Value proposition */}
        <motion.p
          {...fadeUp(0.55)}
          className="max-w-2xl mx-auto text-base md:text-lg text-muted-foreground leading-relaxed mb-10"
        >
          I build scalable web applications, automate quality assurance pipelines, and transform
          organizations through targeted digital training, delivering real, measurable impact
          across Kenya's tech ecosystem and beyond.
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.65)} className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <a
            href="#projects"
            className="px-7 py-3.5 rounded-xl font-display font-semibold text-sm tracking-wide gradient-accent text-primary-foreground hover:opacity-90 transition-all duration-200 animate-pulse-glow shadow-lg"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-7 py-3.5 rounded-xl font-display font-semibold text-sm tracking-wide border border-navy-border text-foreground hover:border-cyan hover:text-cyan transition-all duration-200"
          >
            Get In Touch
          </a>
          <a
            href="/Malila_Nyamai_Resume.pdf"
            download
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-display font-semibold text-sm tracking-wide border border-cyan/40 text-cyan hover:bg-cyan/10 transition-all duration-200"
          >
            <Download size={16} />
            Download CV
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div {...fadeUp(0.75)} className="flex items-center justify-center gap-6 mb-16">
          <a
            href="mailto:jamesmnyamai9@gmail.com"
            className="text-muted-foreground hover:text-cyan transition-colors duration-200"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/malila-nyamai-0b2711221"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-cyan transition-colors duration-200"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="https://github.com/joashnyamai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-cyan transition-colors duration-200"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col items-center gap-2 text-muted-foreground/50"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowDown size={16} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
