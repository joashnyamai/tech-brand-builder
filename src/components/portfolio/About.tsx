import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
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

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

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
      </div>
    </section>
  );
}
