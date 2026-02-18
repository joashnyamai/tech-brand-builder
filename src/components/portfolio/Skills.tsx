import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, TestTube2, Building2, Shield, Wrench } from "lucide-react";

const skillGroups = [
  {
    icon: Code2,
    category: "Full-Stack Development",
    tagline: "Building end-to-end web solutions that scale",
    skills: ["React", "TypeScript", "JavaScript (ES6+)", "Svelte / SvelteKit", "Tailwind CSS", "ASP.NET Core / C#", "Node.js", "PostgreSQL", "Firebase", "Docker", "WebPack"],
  },
  {
    icon: TestTube2,
    category: "QA & Testing",
    tagline: "Ensuring quality before every release",
    skills: ["Jest", "Cypress", "Manual Test Case Design", "Automated Test Scripting", "Load Testing", "Bug Tracking & Debugging", "Performance Optimization", "Post-Release Monitoring"],
  },
  {
    icon: Building2,
    category: "IT Consulting & Digital Transformation",
    tagline: "Modernizing operations for SMEs and NGOs",
    skills: ["Digital Workflow Design", "MS Excel Automation", "Payroll & Financial Dashboards", "CRM Systems", "User Onboarding", "Instructional Design", "Training Documentation", "Remote & On-site Support"],
  },
  {
    icon: Shield,
    category: "Networking & Cybersecurity",
    tagline: "Securing systems and networks at every layer",
    skills: ["CCNA: Enterprise Networking", "Network Troubleshooting (LAN/Wi-Fi)", "Wireshark", "Penetration Testing Fundamentals", "Phishing Awareness", "Endpoint Protection", "Password Security Policy", "Cybersecurity Best Practices"],
  },
  {
    icon: Wrench,
    category: "Tools & Platforms",
    tagline: "The tech stack powering my daily work",
    skills: ["Git / GitHub", "Jira", "AWS", "Docker", "Langchain", "n8n", "RAG / Agent Architectures", "SAP", "Microsoft Office Suite", "Oracle DB / SQL", "PHP"],
  },
];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" ref={ref} className="py-28 px-6 bg-navy-surface/30">
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
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`card-glass rounded-2xl p-6 hover-glow group cursor-default ${
                i === 4 ? "md:col-span-2 xl:col-span-1" : ""
              }`}
            >
              <div className="flex items-start gap-4 mb-5">
                <div className="w-11 h-11 rounded-xl bg-cyan/10 border border-cyan/20 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan/20 transition-colors">
                  <group.icon size={20} className="text-cyan" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground text-sm leading-tight">{group.category}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{group.tagline}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-md bg-navy-elevated border border-navy-border text-xs text-muted-foreground hover:border-cyan/40 hover:text-cyan transition-all duration-150"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
