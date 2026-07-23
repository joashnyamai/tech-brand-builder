import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import type { Easing } from "framer-motion";
import { ArrowDown, FileText, Cpu, Bot, Play } from "lucide-react";

const EASE: Easing = "easeOut";
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: EASE, delay },
});

interface HeroProps {
  onViewResume: () => void;
}

export default function Hero({ onViewResume }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tagline, setTagline] = useState("");
  const fullTagline = "Building Premium Software · Engineering Automated Quality · Architecting AI Workflows";

  // Typewriter effect
  useEffect(() => {
    let currentIdx = 0;
    const typingInterval = setInterval(() => {
      setTagline(fullTagline.slice(0, currentIdx));
      currentIdx++;
      if (currentIdx > fullTagline.length) {
        clearInterval(typingInterval);
      }
    }, 35);
    return () => clearInterval(typingInterval);
  }, []);

  // Particle background logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
    }> = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(Math.floor(window.innerWidth / 15), 80);
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 2 + 1,
          color: `rgba(6, 182, 212, ${Math.random() * 0.15 + 0.05})`
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Connect particles close to each other
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${0.1 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    drawParticles();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const openAva = () => {
    const btn = document.querySelector('[aria-label="Toggle Ava Assistant"]') as HTMLButtonElement;
    btn?.click();
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#05080e]"
    >
      {/* Interactive canvas backdrop */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0"
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#05080e]/40 via-[#05080e]/60 to-[#05080e] z-1" />

      {/* Glow orbs */}
      <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full bg-cyan/5 blur-3xl animate-pulse pointer-events-none z-1" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-cyan/5 blur-3xl animate-pulse pointer-events-none z-1" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Available Badge */}
        <motion.div
          {...fadeUp(0.1)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan/20 bg-cyan/5 text-cyan text-[10px] tracking-widest uppercase font-semibold mb-8 select-none"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
          Available for Opportunities
        </motion.div>

        {/* Profile Image with Ring Interaction */}
        <motion.div
          {...fadeUp(0.25)}
          className="relative inline-block mb-10 group cursor-pointer"
        >
          <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-cyan/50 via-blue-500/30 to-purple-500/50 opacity-70 blur group-hover:opacity-100 group-hover:blur-md transition-all duration-700" />
          <div className="relative w-44 h-44 md:w-52 md:h-52 rounded-full overflow-hidden border-[6px] border-[#070b13] shadow-2xl mx-auto">
            <img
              src="/profile.jpg"
              alt="Malila Nyamai"
              className="w-full h-full object-cover object-[center_15%] transform transition-transform duration-700 group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.parentElement?.classList.add("bg-navy-surface");
              }}
            />
          </div>
        </motion.div>

        {/* Title Stagger Reveal */}
        <motion.h1
          {...fadeUp(0.4)}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tight mb-6"
        >
          <span className="text-foreground">Malila</span>{" "}
          <span className="text-gradient">Nyamai</span>
        </motion.h1>

        {/* Typewriter Tagline */}
        <div className="h-8 md:h-10 mb-6 flex items-center justify-center">
          <p className="font-display text-xs md:text-lg text-cyan font-bold tracking-wider uppercase font-mono">
            {tagline}
            <span className="inline-block w-1.5 h-4 bg-cyan ml-1 animate-pulse" />
          </p>
        </div>

        {/* Concise Description */}
        <motion.p
          {...fadeUp(0.55)}
          className="max-w-2xl mx-auto text-sm md:text-base text-muted-foreground leading-relaxed mb-10"
        >
          I am a Software Engineer, QA Specialist, and IT Consultant with 3+ years of experience building secure React/Node frameworks, engineering Cypress/Postman automation pipelines, and co-founding utility products.
        </motion.p>

        {/* Interactive CTA Controls */}
        <motion.div {...fadeUp(0.7)} className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-display font-semibold text-xs tracking-wider uppercase gradient-accent text-primary-foreground hover:opacity-95 hover:scale-[1.02] active:scale-95 transition-all duration-200 shadow-[0_0_15px_rgba(6,182,212,0.25)]"
          >
            <Play size={12} fill="currentColor" />
            Explore Projects
          </a>
          <button
            onClick={onViewResume}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-display font-semibold text-xs tracking-wider uppercase bg-navy-surface hover:bg-navy-elevated text-cyan hover:text-cyan-glow border border-cyan/20 hover:border-cyan/40 hover:scale-[1.02] active:scale-95 transition-all duration-200"
          >
            <FileText size={12} />
            View Resume
          </button>
          <button
            onClick={openAva}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-display font-semibold text-xs tracking-wider uppercase bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground border border-white/5 hover:border-white/10 hover:scale-[1.02] active:scale-95 transition-all duration-200"
          >
            <Bot size={12} className="animate-pulse" />
            Talk to Ava
          </button>
        </motion.div>

        {/* Scroll down mouse indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col items-center gap-2 text-muted-foreground/30 select-none cursor-pointer"
          onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        >
          <span className="text-[9px] tracking-widest uppercase font-mono font-bold">Scroll Down</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          >
            <ArrowDown size={14} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
