import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, ArrowUpRight } from "lucide-react";

const projects = [
  {
    name: "Kiwami TestCloud",
    period: "Sep 2025 – Jan 2026",
    url: "https://www.kiwamitestcloud.com",
    objective: "A professional software testing platform for QA teams — supporting test case management, execution, reporting, and analytics.",
    stack: ["React", "TypeScript", "Vite", "REST APIs", "Role-based Auth"],
    summary: "Built the complete frontend architecture of a cloud-based QA platform, implementing modular components, real-time dashboards, and secure authentication flows for enterprise users.",
    value: "Protected 10,000+ users from faulty releases. Reduced manual testing effort by 35% through automated workflows.",
    highlight: true,
  },
  {
    name: "Tari Digital Nexus",
    period: "Jan 2025 – Jun 2025",
    url: null,
    objective: "Digital tax automation infrastructure for East African SMEs — connecting tax systems, inventory platforms, and mobile payment gateways.",
    stack: ["API Integration", "Dashboard Dev", "Agile", "Mobile Payments", "VAT Automation"],
    summary: "Architected scalable tax compliance infrastructure that automated VAT submissions and integrated multi-platform payment workflows. Built real-time dashboards centralizing financial data for business owners.",
    value: "Improved SME compliance efficiency, reduced manual tax processing, and enabled business growth through automated regulatory workflows.",
    highlight: false,
  },
  {
    name: "EcoNest",
    period: "Jun 2025 – Sep 2025",
    url: null,
    objective: "A sustainability-focused digital platform built to connect eco-conscious consumers with green product providers.",
    stack: ["React", "TypeScript", "Backend APIs", "PostgreSQL"],
    summary: "Designed and built a clean, user-first web application featuring product discovery, listings, and environmental impact tracking.",
    value: "Delivered a production-ready green-tech marketplace prototype, demonstrating full-stack capability from concept to deployment.",
    highlight: false,
  },
  {
    name: "Skymed Life",
    period: "Mar 2025 – Jun 2025",
    url: null,
    objective: "Healthcare management platform designed to streamline patient onboarding, appointment scheduling, and health records management.",
    stack: ["React", "ASP.NET Core", "C#", "PostgreSQL", "Load Testing"],
    summary: "Built key frontend features and conducted rigorous load testing, validating system capacity for 500+ concurrent users across critical healthcare workflows.",
    value: "Ensured platform reliability for healthcare users at scale, identifying and resolving performance bottlenecks before launch.",
    highlight: false,
  },
  {
    name: "Paid Freelancer Ledger",
    period: "Jan 2025 – Mar 2025",
    url: null,
    objective: "A financial tracking and invoicing tool for freelancers — automating income recording, expense tracking, and invoice generation.",
    stack: ["React", "TypeScript", "Firebase", "Tailwind CSS"],
    summary: "Built a single-page application enabling freelancers to manage client projects, log payments, generate invoices, and track income trends over time.",
    value: "Replaced error-prone spreadsheet workflows with a clean, purpose-built financial management tool tailored to freelance professionals.",
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
              className={`card-glass rounded-2xl p-6 hover-glow group cursor-default flex flex-col ${
                project.highlight ? "md:col-span-2 border border-cyan/20" : ""
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
