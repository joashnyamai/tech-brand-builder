import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, TestTube2, Building2, Shield, Wrench } from "lucide-react";

const skillGroups = [
  {
    icon: Shield,
    category: "Cybersecurity & Threat Mitigation",
    tagline: "Identifying, analyzing, and mitigating cyber threats",
    skills: ["Incident Response", "Threat Intelligence", "Security Auditing", "Vulnerability Detection", "CCNA: Enterprise Networking", "Endpoint Protection", "Network Security", "Compliance & Logging", "The Complete Cyber Security Course", "Cyberthreats by Malware"],
  },
  {
    icon: Code2,
    category: "Frontend Development & Usability",
    tagline: "Building secure, responsive, and user-centric interfaces",
    skills: ["React", "TypeScript", "JavaScript (ES6+)", "HTML / CSS", "Tailwind CSS", "Usability Design", "Responsive Web Design", "UI Debugging", "Mobile UI Testing"],
  },
  {
    icon: Building2,
    category: "Project & Operations Implementation",
    tagline: "Executing technology strategies and managing Agile workflows",
    skills: ["Project Implementation", "Agile / Scrum Sprints", "QA Test Planning", "Manual/Automated Testing", "Test Case Management", "Defect Tracking (Jira)", "Post-release Checklist"],
  },
  {
    icon: TestTube2,
    category: "AI/ML & Data Operations",
    tagline: "Annotating data and integrating smart systems",
    skills: ["Data Annotation", "Quality Assurance (QA)", "Image Processing", "Object Detection & Segmentation", "Generative AI at SAP", "n8n / Automations"],
  },
  {
    icon: Wrench,
    category: "Tools, Platforms & Databases",
    tagline: "The tech stack powering my engineering work",
    skills: ["Git / GitHub", "Postman", "MySQL", "Oracle DB / SQL", "PHP", "Node.js", "Microsoft Excel Automation", "Digital Literacy"],
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
              className={`card-glass rounded-2xl p-6 hover-glow group cursor-default ${i === 4 ? "md:col-span-2 xl:col-span-1" : ""
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
