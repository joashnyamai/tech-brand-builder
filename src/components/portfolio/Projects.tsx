import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, ArrowUpRight } from "lucide-react";

const projects = [
  {
    name: "E-Foleni",
    period: "Sep 2025 to Present",
    url: "https://efoleni.co.ke/",
    objective: "A queue-free booking platform replacing walk-in lines, WhatsApp threads, and double-booked spreadsheets with an M-Pesa native time-slot scheduler.",
    stack: ["React", "TypeScript", "Tailwind CSS", "M-Pesa API (Daraja)", "Role-Aware Dashboards"],
    summary: "Co-founded and engineered a booking platform serving schools, clinics, and banks. Built multi-person back-to-back booking logic, M-Pesa STK push integration, and fast mobile-first web views for low-bandwidth networks.",
    value: "Saved an average of 42 minutes of queue time per visitor, with over 120,000+ slots booked locally and 99.9% uptime.",
    highlight: true,
  },
  {
    name: "Kiwami TestCloud",
    period: "Aug 2025 to Present",
    url: "https://www.kiwamitestcloud.com",
    objective: "A professional software testing platform for QA teams, supporting test case management, execution, reporting, and analytics.",
    stack: ["React", "TypeScript", "REST APIs", "Test Case Management", "Agile Sprints", "Analytics Dashboards"],
    summary: "Designed and maintained reusable test case management components, execution workflow interfaces, and real-time analytics dashboards to support performance monitoring.",
    value: "Protected 10,000+ users from faulty releases. Reduced manual testing effort by 35% through automated workflows.",
    highlight: false,
  },
  {
    name: "Kodii & Tari Socials",
    period: "Jan 2025 to Jun 2025",
    url: null,
    objective: "Full-stack web applications automating operations and integrating critical national payment and tax submission platforms.",
    stack: ["HTML", "CSS", "JavaScript", "Node.js", "PHP", "MySQL", "M-Pesa API", "KRA eTIMS"],
    summary: "Developed key platform features, integrated KRA eTIMS and M-Pesa APIs for transactions, designed relational database schemas, and secured authentication using role-based access control.",
    value: "Enabled seamless tax compliance and payments, enhancing reliability and transactional throughput for SME platforms.",
    highlight: false,
  },
  {
    name: "RemboGlow SKIN",
    period: "Aug 2025 to Present",
    url: "https://remboglow.com",
    objective: "A beauty, skincare, and e-commerce portal delivering customized beauty routines and product matching.",
    stack: ["React", "TypeScript", "Usability Design", "Security Best Practices"],
    summary: "Co-founded and engineered the responsive frontend, implementing interactive skincare quiz systems and role-based admin controls for product catalog management.",
    value: "Established secure authentication mechanisms and a highly accessible interface to support customer onboarding.",
    highlight: false,
  },
];

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" ref={ref} className="py-28 px-6 bg-navy-surface/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-cyan text-xs tracking-widest uppercase font-medium">04 / Projects</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-6">
            Featured{" "}
            <span className="text-gradient">Work</span>
          </h2>
          <div className="section-divider" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`card-glass rounded-2xl p-6 hover-glow group cursor-default flex flex-col ${project.highlight ? "md:col-span-2 border border-cyan/20" : ""
                }`}
            >
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

              <div className="mt-auto">
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
        </div>
      </div>
    </section>
  );
}
