import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { Code2, TestTube2, Building2, Shield, Wrench, X, Check, ExternalLink } from "lucide-react";
import { usePortfolioData } from "@/hooks/use-portfolio-data";

const iconMap: Record<string, any> = {
  Code2,
  Shield,
  Building2,
  TestTube2,
  Wrench,
};

const techMetadata: Record<string, {
  yoe: string;
  desc: string;
  repos: string[];
  features: string[];
}> = {
  "React": {
    yoe: "3+ Years",
    desc: "Main framework for building responsive user dashboards and interactive single-page application systems.",
    repos: ["e-Foleni Booking Scheduler", "RemboGlow beauty portal"],
    features: ["Virtual DOM rendering", "Framer Motion animations", "State Hook management"]
  },
  "TypeScript": {
    yoe: "2+ Years",
    desc: "Applied across React frontends and Node/Express backend layers to secure compile-time type validation.",
    repos: ["e-Foleni Booking Scheduler", "Portfolio sync agent"],
    features: ["Interface modeling", "Null-safety validation", "Generics mapping"]
  },
  "Node.js": {
    yoe: "3+ Years",
    desc: "Used to develop asynchronous backend APIs, M-Pesa automated transaction triggers, and LLM integrations.",
    repos: ["e-Foleni transaction backend", "AI Lab parser scripts"],
    features: ["Express microservices", "JSON Schema verification", "API token authorization"]
  },
  "MySQL": {
    yoe: "3+ Years",
    desc: "Employed for structured relational data systems, queuing logic transaction support, and data synchronization.",
    repos: ["e-Foleni database schemas", "QA mock tests dataset"],
    features: ["Transactional locks", "Indexed queries optimization", "Stored routines validation"]
  },
  "PostgreSQL": {
    yoe: "2+ Years",
    desc: "Deployed for scalable relational database instances requiring JSON columns and advanced aggregate functions.",
    repos: ["Annex Technologies internal tools", "AI sync history log store"],
    features: ["JSONB indexes", "Relational foreign constraints", "Concurrent transaction logs"]
  },
  "Postman": {
    yoe: "3+ Years",
    desc: "Primary automation and validation tool for checking API endpoint compliance, status codes, and payload schema limits.",
    repos: ["REST endpoints testing collections"],
    features: ["Pre-request scripts", "Post-response assert pipelines", "Environment variables sync"]
  },
  "Jest": {
    yoe: "2+ Years",
    desc: "Core unit and integration automation framework used to run sweeps and assertion checks against utilities.",
    repos: ["Annex Tech test collections"],
    features: ["Mock function asserts", "Snapshot assertion testing", "Async code validations"]
  },
  "Jira": {
    yoe: "3+ Years",
    desc: "Employed daily for tracking software sprint progress, authoring bug tickets, and updating QA task checkboards.",
    repos: ["Annex Technologies sprints"],
    features: ["Jira sprint reports", "Ticket traceability", "QA release sign-off logs"]
  }
};

export default function Skills() {
  const { skills: skillGroups } = usePortfolioData();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  const getTechDetails = (techName: string) => {
    return techMetadata[techName] || {
      yoe: "2+ Years",
      desc: `Experienced in using ${techName} across various testing workflows, IT consultant setups, and web projects.`,
      repos: ["e-Foleni Web Scheduler", "RemboGlow portal"],
      features: ["SLA release support", "Responsive query check", "API integration support"]
    };
  };

  return (
    <section id="skills" ref={ref} className="py-28 px-6 bg-navy-surface/30 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-cyan text-xs tracking-widest uppercase font-medium">02 / Skills</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-6">
            Core Skills &{" "}
            <span className="text-gradient">Expertise</span>
          </h2>
          <div className="section-divider" />
        </motion.div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {skillGroups.map((group, i) => {
            const IconComponent = iconMap[group.iconName] || Code2;
            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`card-glass rounded-2xl p-6 hover-glow group cursor-default ${i === 4 ? "md:col-span-2 xl:col-span-1" : ""
                  }`}
              >
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-11 h-11 rounded-xl bg-cyan/10 border border-cyan/20 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan/20 transition-colors">
                    <IconComponent size={20} className="text-cyan" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground text-sm leading-tight">{group.category}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{group.tagline}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <button
                      key={skill}
                      onClick={() => setSelectedTech(skill)}
                      className="px-2.5 py-1 rounded-md bg-navy-elevated border border-navy-border hover:border-cyan text-xs text-muted-foreground hover:text-cyan transition-all duration-150 cursor-pointer"
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* TECH DETAILS SLIDE-OUT OVERLAY SHEET */}
      <AnimatePresence>
        {selectedTech && (() => {
          const details = getTechDetails(selectedTech);
          return (
            <div className="fixed inset-0 z-50 flex items-center justify-end p-4 md:p-6">
              {/* Dark overlay backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedTech(null)}
                className="absolute inset-0 bg-[#06080e]/75 backdrop-blur-sm"
              />

              {/* Side sheet card */}
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="relative w-full max-w-sm h-full bg-[#0a0f1d] border border-white/10 rounded-2xl shadow-2xl p-6 flex flex-col justify-between overflow-y-auto"
              >
                <div className="space-y-6">
                  {/* Close button */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan animate-pulse" />
                      <span className="text-xs font-bold text-foreground uppercase tracking-widest font-mono">Tech Analyzer</span>
                    </div>
                    <button
                      onClick={() => setSelectedTech(null)}
                      className="p-1 rounded bg-white/5 text-muted-foreground hover:text-foreground border border-white/5"
                    >
                      <X size={14} />
                    </button>
                  </div>

                  {/* Tech specs header */}
                  <div className="space-y-2">
                    <span className="px-2.5 py-0.5 rounded bg-cyan/15 border border-cyan/30 text-cyan text-[10px] font-bold uppercase tracking-wider font-mono">
                      {details.yoe} Experience
                    </span>
                    <h3 className="font-display font-black text-2xl text-foreground mt-1">
                      {selectedTech}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-2">
                      {details.desc}
                    </p>
                  </div>

                  {/* Matched features */}
                  <div className="space-y-2.5 pt-4 border-t border-white/5">
                    <p className="text-[10px] font-bold text-foreground uppercase tracking-widest">Key Paradigms Used:</p>
                    <div className="space-y-2">
                      {details.features.map((feat) => (
                        <div key={feat} className="flex items-center gap-2.5 text-xs text-muted-foreground">
                          <Check size={12} className="text-cyan flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Ingested projects */}
                  <div className="space-y-2.5 pt-4 border-t border-white/5">
                    <p className="text-[10px] font-bold text-foreground uppercase tracking-widest">Projects Implemented In:</p>
                    <div className="space-y-2">
                      {details.repos.map((repo) => (
                        <div
                          key={repo}
                          className="flex items-center justify-between p-2 rounded bg-white/5 border border-white/5 text-xs text-muted-foreground hover:text-cyan hover:border-cyan/20 transition-all cursor-pointer"
                          onClick={() => {
                            setSelectedTech(null);
                            document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                          }}
                        >
                          <span className="font-semibold">{repo}</span>
                          <ExternalLink size={11} className="text-muted-foreground/60" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer specs */}
                <div className="pt-6 border-t border-white/5 mt-8 flex justify-between text-[10px] text-muted-foreground">
                  <span>Authorized Profile Sync ✓</span>
                  <span>v3.2.1</span>
                </div>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>
    </section>
  );
}
