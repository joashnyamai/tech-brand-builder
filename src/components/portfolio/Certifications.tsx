import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, GraduationCap, BookOpen } from "lucide-react";

const certifications = [
  {
    name: "CCNA: Enterprise Networking, Security & Automation",
    issuer: "Cisco Academy",
    icon: "🔐",
    category: "Networking",
  },
  {
    name: "Cybersecurity Fundamentals",
    issuer: "Q1 Masterclass / Cisco",
    icon: "🛡️",
    category: "Security",
  },
  {
    name: "The Complete Cyber Security Course",
    issuer: "Udemy",
    icon: "🛡️",
    category: "Security",
  },
  {
    name: ".NET Developer Certification",
    issuer: "Microsoft Student Learn",
    icon: "⚡",
    category: "Development",
  },
  {
    name: "Software Engineering",
    issuer: "Power Learn Africa",
    icon: "💻",
    category: "Development",
  },
  {
    name: "Generative AI",
    issuer: "SAP",
    icon: "🤖",
    category: "AI/ML",
  },
  {
    name: "Microsoft Office Specialist",
    issuer: "Microsoft",
    icon: "📊",
    category: "Productivity",
  },
];

const education = [
  {
    degree: "Bachelor of Science, Information Technology",
    institution: "Zetech University",
    period: "Jan 2024 to Nov 2026 (Expected)",
    status: "Awaiting Graduation",
  },
  {
    degree: "Software Development",
    institution: "Power Learn Project",
    period: "Feb 2025 to Jun 2025",
    status: "Completed",
  },
  {
    degree: "Diploma in Software Engineering",
    institution: "Zetech University",
    period: "Jan 2022 to Nov 2023",
    status: "Completed",
  },
];

export default function Certifications() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="certifications" ref={ref} className="py-28 px-6 bg-navy-surface/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-cyan text-xs tracking-widest uppercase font-medium">06 / Credentials</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-6">
            Education &{" "}
            <span className="text-gradient">Certifications</span>
          </h2>
          <div className="section-divider" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Education */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <GraduationCap size={18} className="text-cyan" />
              <h3 className="font-display font-semibold text-foreground">Education</h3>
            </div>
            <div className="space-y-4">
              {education.map((edu, i) => (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="card-glass rounded-xl p-5 border-l-2 border-l-cyan"
                >
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${edu.status === "Completed"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-cyan/10 text-cyan border border-cyan/20"
                        }`}
                    >
                      {edu.status}
                    </span>
                  </div>
                  <h4 className="font-display font-semibold text-sm text-foreground mt-2">{edu.degree}</h4>
                  <p className="text-cyan text-sm mt-1">{edu.institution}</p>
                  <p className="text-xs text-muted-foreground mt-1">{edu.period}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Award size={18} className="text-cyan" />
              <h3 className="font-display font-semibold text-foreground">Certifications</h3>
            </div>
            <div className="space-y-3">
              {certifications.map((cert, i) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="card-glass rounded-xl p-4 flex items-center gap-4 hover-glow group"
                >
                  <span className="text-2xl">{cert.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground leading-tight">{cert.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{cert.issuer}</p>
                  </div>
                  <span className="flex-shrink-0 px-2 py-0.5 rounded text-xs bg-navy-elevated border border-navy-border text-muted-foreground">
                    {cert.category}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Interests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 card-glass rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <BookOpen size={16} className="text-cyan" />
            <h3 className="font-display font-semibold text-sm text-foreground">Beyond Code</h3>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            When I step away from the terminal, I channel the same analytical mind into other pursuits:
            writing about emerging technology, playing chess, exploring AI innovations, and mentoring
            the next generation of Kenyan engineers into the industry.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
