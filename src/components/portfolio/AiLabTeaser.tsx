import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { Bot, FileCheck, Terminal, ShieldAlert, Cpu } from "lucide-react";

export default function AiLabTeaser({ isOs = false }: { isOs?: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const features = [
    {
      icon: Bot,
      title: "Ava AI Guide",
      desc: "An intelligent guide loaded with my resume context. Ask about my tech stack, project roles, or availability.",
    },
    {
      icon: FileCheck,
      title: "Dynamic CV Matcher",
      desc: "Paste a job description to instantly analyze alignment, match scores, and highlighted skills in real time.",
    },
    {
      icon: ShieldAlert,
      title: "Interactive Code Auditor",
      desc: "Paste a code block and run a security audit check to scan for OWASP vulnerabilities and generate safe refactors.",
    },
  ];

  return (
    <div id="ai-lab-teaser" ref={ref} className={isOs ? "p-4 md:p-8 max-h-[75vh] overflow-y-auto" : "py-28 px-6 bg-gradient-to-b from-transparent to-navy-surface/20"}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 items-center">
          
          {/* Header/Promo Block */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="md:col-span-1 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan border-opacity-30 bg-cyan bg-opacity-5 text-cyan text-xs font-semibold">
              <Cpu size={14} className="animate-spin-slow" />
              <span>Ava AI Lab</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
              Interactive <br />
              <span className="text-gradient">AI Heuristics</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
              To prove my work in <strong>LangChain</strong>, <strong>RAG models</strong>, and <strong>Agent Architectures</strong>, I built an online sandbox where you can test live LLM integrations directly against my resume.
            </p>
            <div className="pt-2">
              <Link
                to="/ai-lab"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan hover:bg-cyan/90 text-white font-display font-semibold text-sm tracking-wide transition-opacity shadow-lg shadow-cyan/15 cursor-pointer"
              >
                <Terminal size={16} />
                Open Ava AI Lab
              </Link>
            </div>
          </motion.div>

          {/* Cards Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-2 grid sm:grid-cols-3 gap-4"
          >
            {features.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-navy-surface border border-navy-border hover:border-cyan hover:border-opacity-40 hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-navy-elevated flex items-center justify-center border border-navy-border text-cyan mb-4 group-hover:bg-cyan group-hover:bg-opacity-10 transition-colors">
                      <Icon size={20} />
                    </div>
                    <h3 className="font-display font-bold text-base mb-2 text-foreground group-hover:text-cyan transition-colors">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>

        </div>
      </div>
    </div>
  );
}
