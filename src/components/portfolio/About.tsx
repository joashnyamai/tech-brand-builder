import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { Code2, Shield, Users, Zap } from "lucide-react";

const differentiators = [
  {
    icon: Code2,
    title: "Software Engineering",
    desc: "Prototyping responsive web solutions using React, TypeScript, Node.js, and PHP, alongside relational database management.",
  },
  {
    icon: Shield,
    title: "Quality Assurance",
    desc: "Experienced in manual & automated testing, Jest, Postman API testing, load testing, and defect tracking in Jira.",
  },
  {
    icon: Users,
    title: "IT Support & Docs",
    desc: "Delivering user support, authoring IT help guides, training manuals, and advising on cybersecurity hygiene.",
  },
  {
    icon: Zap,
    title: "AI & Innovation",
    desc: "Familiar with AI/ML concepts, building intelligent agents and workflows using LangChain, RAG architectures, and automation.",
  },
];

const timelineMilestones = [
  {
    key: "student",
    title: "Student Milestone",
    role: "BSc Information Technology",
    org: "Zetech University",
    period: "2022 - 2026",
    achievements: [
      "Finalist with strong performance in database design (MySQL), systems architecture, and logic paradigms.",
      "Conducted research on security posture audits and localized IT training frameworks.",
      "Acquired certifications in Cybersecurity, Networking (CCNA), and Database structures."
    ],
    skills: ["MySQL", "Relational Databases", "CCNA Networking", "IT Support Fundamentals"],
    motivation: "Eager to understand foundational computing architectures and systems theory to solve real-world problems."
  },
  {
    key: "intern",
    title: "QA Intern",
    role: "Software Testing Intern",
    org: "Kiwami Tech Solutions",
    period: "2023 - 2024",
    achievements: [
      "Executed manual regression passes on web applications, identifying 45+ functional bugs.",
      "Wrote Jest and Postman integration tests to cover REST API query limits.",
      "Assisted in creating IT helpdesk guides and documentation for end-users."
    ],
    skills: ["Jest Testing", "Postman APIs", "Manual Regression Testing", "Jira Bug Tracking"],
    motivation: "Fascinated by high-quality software standards and building unbreakable user interfaces."
  },
  {
    key: "qa",
    title: "QA Engineer",
    role: "Senior Software QA Engineer",
    org: "Annex Technologies Limited",
    period: "2024 - Present",
    achievements: [
      "Lead QA engineer on high-uptime web modules, verifying builds before releases.",
      "Maintained data integrity across MySQL and PostgreSQL test clusters.",
      "Reduced build regression failures by 35% through robust automation suites."
    ],
    skills: ["PostgreSQL", "CI/CD Pipelines", "Regression Test Automation", "Jira Management"],
    motivation: "Striving for zero-defect releases and highly performant database queries."
  },
  {
    key: "swe",
    title: "Co-Founder & SWE",
    role: "Lead Engineer",
    org: "RemboGlow & E-Foleni",
    period: "2025 - Present",
    achievements: [
      "Architected e-Foleni queue scheduler, scaling it to 120,000+ bookings in Kenya.",
      "Integrated secure M-Pesa automated payment callbacks with React/Node API endpoints.",
      "Built custom LangChain RAG chatbot assistants to assist user service inquiries."
    ],
    skills: ["React & TypeScript", "Node.js & Express", "LangChain & RAG", "M-Pesa API Integrations"],
    motivation: "Driven to build utility-focused products and AI-powered workflows that save time."
  }
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeMilestone, setActiveMilestone] = useState<"student" | "intern" | "qa" | "swe">("student");

  return (
    <section id="about" ref={ref} className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-cyan text-xs tracking-widest uppercase font-medium">01 / About</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-6">
            The Engineer Behind <br className="hidden md:block" />
            <span className="text-gradient">the Code</span>
          </h2>
          <div className="section-divider mb-8" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Narrative */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="space-y-5 text-muted-foreground leading-relaxed text-base"
          >
            <p>
              I am a motivated IT professional and BSc Information Technology finalist with 3+ years of hands-on experience in software development, quality assurance, IT support, cloud exposure (AWS), and digital training. I have a proven ability to monitor systems, document workflows, troubleshoot application issues, and support end users in fast-paced technology environments.
            </p>
            <p>
              Experienced in application testing (Jest & Postman), bug tracking (Jira), data management (MySQL, PostgreSQL), and prototyping web solutions using React, TypeScript, Node.js, and PHP. I am also familiar with AI/ML concepts through LangChain, RAG, and Generative AI certifications.
            </p>
            <p>
              Currently, I am pursuing my <span className="text-foreground font-medium">Bachelor of Science in Information Technology</span> at Zetech University (Expected Graduation: November 2026), expanding my database management, software engineering, and web development skills.
            </p>
            <p>
              I am a fast learner and collaborative team player eager to contribute to digital transformation agendas and innovation initiatives.
            </p>

            <div className="flex flex-wrap gap-3 pt-4">
              {["Nairobi, Kenya", "English & Swahili", "Open to Remote", "Software & QA Engineer"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-full border border-navy-border text-xs text-muted-foreground bg-navy-elevated"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Differentiators */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {differentiators.map((d, i) => (
              <motion.div
                key={d.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                className="card-glass rounded-xl p-5 hover-glow group cursor-default"
              >
                <div className="w-10 h-10 rounded-lg bg-cyan/10 border border-cyan/20 flex items-center justify-center mb-4 group-hover:bg-cyan/20 transition-colors">
                  <d.icon size={18} className="text-cyan" />
                </div>
                <h3 className="font-display font-semibold text-sm text-foreground mb-2">{d.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{d.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* INTERACTIVE TIMELINE AND FUN FACTS BLOCK */}
        <div className="mt-24 grid md:grid-cols-3 gap-8 items-start border-t border-navy-border/40 pt-16">
          {/* Left/Middle: 2-column Interactive Career Timeline selector */}
          <div className="md:col-span-2 space-y-8">
            <div className="flex flex-col gap-1">
              <h3 className="font-display font-bold text-lg text-foreground">Interactive Career Timeline</h3>
              <p className="text-xs text-muted-foreground">Select a milestone stage to review achievements and technical context</p>
            </div>

            {/* Horizontal Timeline Tracker */}
            <div className="relative flex flex-col sm:flex-row justify-between items-center gap-4 bg-navy-surface/30 p-4 border border-navy-border/50 rounded-2xl">
              <div className="absolute top-1/2 left-[12%] right-[12%] h-[1.5px] bg-navy-border -translate-y-1/2 hidden sm:block z-0" />
              {[
                { key: "student", label: "Student Era", org: "Zetech Uni" },
                { key: "intern", label: "QA Intern", org: "Kiwami Tech" },
                { key: "qa", label: "QA Engineer", org: "Annex Tech" },
                { key: "swe", label: "Co-Founder", org: "e-Foleni / SWE" }
              ].map((milestone) => (
                <button
                  key={milestone.key}
                  onClick={() => setActiveMilestone(milestone.key as any)}
                  className={`relative z-10 w-full sm:w-auto px-4 py-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                    activeMilestone === milestone.key
                      ? "bg-cyan border-cyan text-primary-foreground font-semibold shadow-[0_0_12px_rgba(6,182,212,0.3)] scale-[1.03]"
                      : "bg-navy-surface border-navy-border text-muted-foreground hover:text-cyan hover:border-cyan/30"
                  }`}
                >
                  <span className="block text-xs font-bold leading-tight">{milestone.label}</span>
                  <span className="block text-[8px] opacity-75 mt-0.5">{milestone.org}</span>
                </button>
              ))}
            </div>

            {/* Active Milestone Card details */}
            <AnimatePresence mode="wait">
              {timelineMilestones.filter(m => m.key === activeMilestone).map((m) => (
                <motion.div
                  key={m.key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="bg-navy-surface/30 border border-navy-border/60 p-6 rounded-2xl space-y-4"
                >
                  <div className="flex justify-between items-start flex-wrap gap-2 pb-3 border-b border-navy-border/40">
                    <div>
                      <h4 className="text-sm font-bold text-foreground">{m.role}</h4>
                      <p className="text-xs text-cyan font-medium">{m.org} · {m.period}</p>
                    </div>
                    <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider bg-navy-elevated px-2.5 py-0.5 rounded border border-navy-border">
                      {m.title}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs font-bold text-foreground uppercase tracking-widest text-[9px]">Key Achievements:</p>
                    <ul className="text-xs text-muted-foreground list-disc pl-4 space-y-1.5 leading-relaxed">
                      {m.achievements.map((ach, ai) => (
                        <li key={ai}>{ach}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 border-t border-navy-border/30 space-y-3">
                    <p className="text-xs font-bold text-foreground uppercase tracking-widest text-[9px]">Core Competency Focus:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {m.skills.map((s) => (
                        <span key={s} className="px-2 py-0.5 rounded bg-cyan/5 border border-cyan/20 text-cyan text-[10px] font-semibold">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-cyan/5 border border-cyan/15 p-3.5 rounded-xl text-xs leading-relaxed text-muted-foreground">
                    <span className="font-bold text-foreground">💡 Motivation: </span>
                    {m.motivation}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Right: Fun Facts and Values Panel (col-span-1) */}
          <div className="space-y-6">
            <div className="flex flex-col gap-1">
              <h3 className="font-display font-bold text-lg text-foreground">Career Goals & Facts</h3>
              <p className="text-xs text-muted-foreground">Malila's core motivations and fun milestones</p>
            </div>

            <div className="card-glass rounded-2xl p-5 space-y-4">
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-cyan uppercase tracking-widest">⚡ Motivations & Goals</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Striving to engineer clean code architectures, eliminate software regressions via test suites, co-found local SaaS solutions, and contribute to Kenyan digital agendas.
                </p>
              </div>

              <div className="space-y-3 border-t border-navy-border/40 pt-4">
                <h4 className="text-xs font-bold text-cyan uppercase tracking-widest">🎓 Academic Track</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Completing his final year at <strong className="text-foreground">Zetech University</strong> in Information Technology (BSc), with expected graduation set for November 2026.
                </p>
              </div>

              <div className="space-y-3 border-t border-navy-border/40 pt-4">
                <h4 className="text-xs font-bold text-cyan uppercase tracking-widest">🎯 Quick Fun Facts</h4>
                <ul className="text-xs text-muted-foreground space-y-2 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan">➔</span>
                    <span>Built e-Foleni queue scheduler helping 120,000+ Kenyan booking operations.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan">➔</span>
                    <span>Loves reviewing database queries and securing interfaces.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan">➔</span>
                    <span>Uses Ava AI to answer visitor inquiries instantly.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
