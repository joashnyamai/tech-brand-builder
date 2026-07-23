import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ExternalLink, ArrowUpRight, X, Github, Code, CheckCircle } from "lucide-react";
import { usePortfolioData } from "@/hooks/use-portfolio-data";

const caseStudies: Record<string, {
  problem: string;
  solution: string;
  architecture: string;
  challenges: string;
  lessons: string;
  github: string;
}> = {
  "E-Foleni": {
    problem: "Kenyan service seekers had to stand in long physical queues, wait on unresponsive WhatsApp chat threads, or navigate double-booked spreadsheets just to reserve time-slots at clinics and schools.",
    solution: "Co-founded and engineered e-Foleni, a responsive native booking scheduling client integrated directly with M-Pesa automated transaction verification workflows.",
    architecture: "React SPA client using Space Grotesk interfaces, fetching endpoints from a Node Express engine connected to an optimized PostgreSQL transactional schema.",
    challenges: "Handling concurrent, split-second ticket bookings on high-concurrency days without allowing race conditions or double bookings.",
    lessons: "Implementing transactional queries with serializable locking levels ensures perfect database consistency.",
    github: "https://github.com/joashnyamai/e-foleni-core"
  },
  "Kiwami TestCloud": {
    problem: "Distributing software builds across QA pipelines was slow and lacked unified monitoring dashboards, leading to manual delay times.",
    solution: "Built a production-grade software testing cloud workspace for tracking test case executions and generating analytics logs.",
    architecture: "React client dashboard using Vite bundle compression, fetching RESTful backend resources with environment token authentication.",
    challenges: "Syncing status charts and timelines in real-time as automated suites reported checkmarks from local testing workers.",
    lessons: "Utilizing lightweight debounced queries prevents canvas UI freezing on heavy updates.",
    github: "https://github.com/joashnyamai/kiwami-testcloud"
  },
  "RemboGlow": {
    problem: "Skincare and beauty salons in Nairobi struggled to manage customer appointment schedules, lead pipelines, and down-payments cleanly.",
    solution: "Co-founded and architected the frontend React dashboard and usability flows to align stylist catalogs with client bookings.",
    architecture: "Vite + React SPA client dashboard rendering styling tables and scheduling calendars, communicating with a Firebase authentication database layer.",
    challenges: "Serving massive cosmetic and catalog images quickly on slow, low-bandwidth Kenyan mobile connections.",
    lessons: "Leveraging lazy image decoding and custom browser caching headers reduced initial load latency by 60%.",
    github: "https://github.com/joashnyamai/remboglow-portal"
  },
  "Tari Digital Nexus": {
    problem: "SMEs faced major struggles integrating digital sales reporting directly with Kenya Revenue Authority (KRA) eTIMS compliance API endpoints.",
    solution: "Created a compliance bridge validating and syncing M-Pesa receipts with automated eTIMS fiscal invoices.",
    architecture: "PHP and Node.js backend pipelines querying structured MySQL tables, handling webhook callbacks asynchronously.",
    challenges: "Decoding nested XML payloads returned by legacy government SOAP endpoints during high-traffic tax deadlines.",
    lessons: "Constructing robust retry layers with exponential back-offs handles external service timeouts reliably.",
    github: "https://github.com/joashnyamai/tari-digital-nexus"
  },
  "Skymed Life": {
    problem: "Healthcare appointment systems lacked responsive slot allocations and failed under concurrent user load testing passes.",
    solution: "Developed interactive patient panels and load-tested backend endpoints supporting 500+ concurrent connections.",
    architecture: "React frontend client with Firebase Firestore document streams and REST endpoints.",
    challenges: "Eliminating latency spikes when multiple medical assistants fetched appointment histories simultaneously.",
    lessons: "Structuring nested database indexes and denormalizing patient logs optimized fetch times dramatically.",
    github: "https://github.com/joashnyamai/skymed-life-v2"
  },
  "ECONEST": {
    problem: "Green marketplace discovery portals lacked responsive layouts and interactive product filter scopes.",
    solution: "Engineered prototype views and pilot deployment layers to build a clean eco-focused catalog.",
    architecture: "React frontend client using Tailwind layout structures connected to a Firestore backend.",
    challenges: "Transitioning product item lists smoothly as filters changed without jarring layout shifts.",
    lessons: "Using Framer Motion layout animations provides fluid user transitions as catalogs update.",
    github: "https://github.com/joashnyamai/econest-prototype"
  }
};

export default function Projects() {
  const { projects } = usePortfolioData();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const filters = ["All", "React", "Node.js", "Databases", "APIs"];

  const filteredProjects = projects.filter(p => {
    if (activeFilter === "All") return true;
    if (activeFilter === "React") return p.stack.includes("React");
    if (activeFilter === "Node.js") return p.stack.includes("Node.js");
    if (activeFilter === "Databases") return p.stack.includes("MySQL") || p.stack.includes("PostgreSQL");
    if (activeFilter === "APIs") return p.stack.some(s => s.toLowerCase().includes("api"));
    return true;
  });

  const getCaseStudy = (name: string) => {
    return caseStudies[name] || {
      problem: "Traditional service pipelines required heavy manual setups and lacked secure digital interfaces.",
      solution: "Engineered a high-performance web client dashboard with automated validation loops to secure access.",
      architecture: "React SPA structure querying secure cloud database indices and logging execution parameters.",
      challenges: "Safeguarding user actions against parallel query locks and network latency fluctuations.",
      lessons: "Thorough testing audits and database indexing are critical to maintaining stable runtimes.",
      github: "https://github.com/joashnyamai"
    };
  };

  return (
    <section id="projects" ref={ref} className="py-28 px-6 bg-navy-surface/30">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-cyan text-xs tracking-widest uppercase font-medium">04 / Projects</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">
              Featured <span className="text-gradient">Work</span>
            </h2>
            <div className="section-divider mt-6" />
          </motion.div>

          {/* Filter menu tabs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-2"
          >
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  activeFilter === f
                    ? "bg-cyan border-cyan text-primary-foreground shadow-[0_0_12px_rgba(6,182,212,0.3)]"
                    : "bg-navy-surface border-navy-border text-muted-foreground hover:text-cyan hover:border-cyan/20"
                }`}
              >
                {f}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Projects Grid with layout transitions */}
        <motion.div layout className="grid md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedProject(project.name)}
                className={`card-glass rounded-2xl p-6 hover-glow group cursor-pointer flex flex-col justify-between ${
                  project.highlight ? "md:col-span-2 border border-cyan/20" : ""
                }`}
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      {project.highlight && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-cyan/10 border border-cyan/20 text-cyan text-xs mb-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
                          Featured Project
                        </span>
                      )}
                      <h3 className="font-display font-bold text-xl text-foreground group-hover:text-cyan transition-colors duration-200">
                        {project.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">{project.period}</p>
                    </div>
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 w-9 h-9 rounded-lg border border-navy-border flex items-center justify-center text-muted-foreground hover:border-cyan hover:text-cyan transition-all duration-200"
                        onClick={(e) => e.stopPropagation()}
                        aria-label="Visit project"
                      >
                        <ArrowUpRight size={16} />
                      </a>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{project.objective}</p>

                  <div className="border-t border-navy-border pt-4 mb-4">
                    <p className="text-sm text-foreground/80 leading-relaxed">{project.summary}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md bg-navy text-xs text-muted-foreground border border-navy-border"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-start gap-2 p-3 rounded-lg bg-cyan/5 border border-cyan/10">
                    <span className="text-cyan text-xs mt-0.5 flex-shrink-0">💡</span>
                    <p className="text-xs text-muted-foreground leading-relaxed">{project.value}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* DETAILED CASE STUDY MODAL */}
      <AnimatePresence>
        {selectedProject && (() => {
          const matchedProj = projects.find(p => p.name === selectedProject);
          if (!matchedProj) return null;
          const study = getCaseStudy(selectedProject);
          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Overlay Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-[#06080e]/80 backdrop-blur-md"
              />

              {/* Modal Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="relative w-full max-w-2xl bg-[#0a0f1d] border border-white/10 rounded-2xl shadow-2xl p-6 md:p-8 max-h-[85vh] overflow-y-auto z-10 space-y-6"
              >
                {/* Header */}
                <div className="flex justify-between items-start pb-4 border-b border-white/5">
                  <div>
                    <span className="text-[10px] text-cyan font-bold uppercase tracking-widest font-mono">Case Study Analysis</span>
                    <h3 className="font-display font-black text-2xl md:text-3xl text-foreground mt-1">{matchedProj.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{matchedProj.period}</p>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-1 rounded bg-white/5 text-muted-foreground hover:text-foreground border border-white/5"
                  >
                    <X size={15} />
                  </button>
                </div>

                {/* Main Study Details */}
                <div className="space-y-5 text-xs text-muted-foreground leading-relaxed">
                  <div className="space-y-2">
                    <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
                      The Problem Statement
                    </h4>
                    <p className="pl-3.5 border-l border-white/5">{study.problem}</p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
                      The Engineered Solution
                    </h4>
                    <p className="pl-3.5 border-l border-white/5">{study.solution}</p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
                      System Architecture & Stack
                    </h4>
                    <p className="pl-3.5 border-l border-white/5">{study.architecture}</p>
                    <div className="flex flex-wrap gap-1.5 pl-3.5 pt-1.5">
                      {matchedProj.stack.map(s => (
                        <span key={s} className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[10px] text-cyan font-mono font-semibold">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
                      Challenges Encountered
                    </h4>
                    <p className="pl-3.5 border-l border-white/5">{study.challenges}</p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
                      Key Lessons Learned
                    </h4>
                    <p className="pl-3.5 border-l border-white/5">{study.lessons}</p>
                  </div>
                </div>

                {/* CTAs */}
                <div className="pt-5 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-cyan">
                    <CheckCircle size={14} className="text-cyan" />
                    <span>Impact: {matchedProj.value}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href={study.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-white/5 hover:bg-white/10 text-foreground border border-white/10 flex items-center gap-2"
                    >
                      <Github size={13} />
                      <span>Repository</span>
                    </a>
                    {matchedProj.url && (
                      <a
                        href={matchedProj.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl text-xs font-bold gradient-accent text-primary-foreground flex items-center gap-2 shadow-[0_0_12px_rgba(6,182,212,0.2)]"
                      >
                        <ExternalLink size={13} />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>
    </section>
  );
}
