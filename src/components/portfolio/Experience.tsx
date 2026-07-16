import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronDown, MapPin, Calendar } from "lucide-react";

const experiences = [
  {
    role: "Senior Software Quality Assurance Engineer",
    company: "Annex Technologies Limited",
    location: "Kenya",
    period: "Jan 2024 – Present",
    type: "Hybrid",
    overview: "Performed API testing using Postman and validated backend functionality with SQL queries, ensuring data integrity and system compliance.",
    highlights: [
      "Performed API testing using Postman and validated backend functionality with SQL queries, ensuring data integrity and system compliance.",
      "Assisted in automation testing, reducing manual testing effort and contributing to CI/CD quality pipelines.",
      "Provided first-line application support to internal users, escalating complex incidents through proper channels.",
      "Documented workflows, test procedures, and QA processes to support knowledge retention and operational continuity."
    ],
    tech: ["Postman", "SQL Database Testing", "Automation Testing", "Jira", "CI/CD Pipelines", "Technical Support"],
  },
  {
    role: "Software Testing Intern",
    company: "Kiwami Tech Solutions",
    location: "Nairobi, Kenya",
    period: "Aug 2025 – Present",
    type: "Part-time",
    overview: "Designed and maintained reusable test case management components, execution workflow interfaces, and real-time analytics dashboards to support performance monitoring.",
    highlights: [
      "Designed and maintained reusable test case management components, execution workflow interfaces, and real-time analytics dashboards to support performance monitoring.",
      "Collaborated with backend engineers to validate REST API integrations, verifying accurate display of live test execution results, logs, and dashboards.",
      "Performed frontend testing, debugging, and defect reporting; participated in Agile sprints to ensure quality across iterative releases."
    ],
    tech: ["React", "TypeScript", "REST APIs", "Test Case Management", "Agile Sprints", "Analytics Dashboards"],
  },
  {
    role: "Co-Founder & Lead Engineer",
    company: "RemboGlow",
    location: "Nairobi, Kenya",
    period: "Aug 2025 – Present",
    type: "Full-time",
    overview: "Co-founded and engineered a beauty-tech digital platform owning architecture design, frontend development, deployment, and monitoring of pilot solutions.",
    highlights: [
      "Co-founded and engineered a beauty-tech digital platform owning architecture design, frontend development, deployment, and monitoring of pilot solutions.",
      "Conducted user research and feedback collection to iterate UI/UX and align product development with user needs.",
      "Documented learnings, case studies, and operational processes to support knowledge transfer and future scaling."
    ],
    tech: ["React", "TypeScript", "Node.js", "PostgreSQL", "System Architecture", "UI/UX Research"],
  },
  {
    role: "Software Engineer",
    company: "Tari Africa Platforms",
    location: "Nairobi, Kenya",
    period: "Jan 2025 – Jun 2025",
    type: "Contract",
    overview: "Designed and managed relational databases in MySQL, supporting data entry, cleanup, and migration tasks.",
    highlights: [
      "Designed and managed relational databases in MySQL, supporting data entry, cleanup, and migration tasks.",
      "Built real-time dashboards centralizing compliance and financial reporting supporting performance monitoring responsibilities.",
      "Maintained configuration and integration documentation ensuring compliance and knowledge continuity.",
      "Managed Agile sprint delivery during peak transaction periods, contributing to parallel project execution."
    ],
    tech: ["MySQL", "Node.js", "PHP", "Agile Sprint", "KRA eTIMS", "M-Pesa API"],
  },
  {
    role: "Freelance IT Consultant & Software Developer",
    company: "Malila Tech Consultancies",
    location: "Kenya",
    period: "Apr 2023 – Oct 2025",
    type: "Full-time",
    overview: "Provided remote and on-site IT support, handling low-to-medium complexity technical issues and escalating complex incidents appropriately.",
    highlights: [
      "Provided remote and on-site IT support, handling low-to-medium complexity technical issues and escalating complex incidents appropriately.",
      "Supported SMEs in data migration from manual to digital systems, improving data accuracy and cutting processing time by up to 40%.",
      "Advised clients on cybersecurity best practices password policies, phishing awareness, and endpoint protection.",
      "Delivered digital literacy workshops for community groups and NGOs, building capacity in IT tools and web technologies.",
      "Researched and recommended emerging technologies and digital tools aligned with client operational needs."
    ],
    tech: ["IT Support", "Data Migration", "Cybersecurity", "Digital Literacy", "Emerging Tech"],
  },
  {
    role: "Quality Assurance Attaché",
    company: "Kiwami Tech Solutions",
    location: "Nairobi, Kenya",
    period: "Jun 2025 – Aug 2025",
    type: "Attachment",
    overview: "Conducted manual and automated testing, defect reporting, and release readiness planning for mobile banking applications.",
    highlights: [
      "Designed manual test cases for a mobile banking app and created automated test scripts, cutting QA task time by 35%.",
      "Identified and documented critical bugs in mobile UI flows, preventing a flawed release to 10,000+ users.",
      "Participated in sprint reviews, presenting QA findings and contributing to technology roadmap and release decisions.",
      "Developed a post-release monitoring checklist enabling early detection of post-launch issues."
    ],
    tech: ["Manual Testing", "Automated Scripting", "Mobile UI Testing", "Jira", "Roadmap Decisions"],
  },
  {
    role: "Image Annotator & AI Data Specialist",
    company: "Remotasks",
    location: "Nairobi, Kenya",
    period: "Jun 2021 – Apr 2024",
    type: "Freelance",
    overview: "Applied data annotation, QA, and image processing skills to support AI/ML model training contributing to machine learning pipelines at scale.",
    highlights: [
      "Applied data annotation, QA, and image processing skills to support AI/ML model training contributing to machine learning pipelines at scale.",
      "Maintained high accuracy across object detection, segmentation, and classification tasks relevant to AI/ML knowledge advantage."
    ],
    tech: ["Data Annotation", "QA", "Image Processing", "Object Detection", "Machine Learning Pipelines"],
  },
  {
    role: "IT Attaché",
    company: "JKUAT (Jomo Kenyatta University)",
    location: "Juja, Kenya",
    period: "Sep 2023 – Nov 2023",
    type: "Attachment",
    overview: "Assisted in upgrading computer lab infrastructure, improving system stability and boot-up times by 50%.",
    highlights: [
      "Assisted in upgrading computer lab infrastructure, improving system stability and boot-up times by 50%.",
      "Conducted digital literacy training sessions; authored IT support guides that reduced repeat service requests.",
      "Audited system logs for unauthorized access attempts and reported vulnerabilities supporting compliance and security documentation."
    ],
    tech: ["Infrastructure Upgrades", "Digital Literacy", "IT Support Guides", "Security Audit", "Compliance Docs"],
  },
];

function ExperienceCard({ exp, index, inView }: { exp: typeof experiences[0]; index: number; inView: boolean }) {
  const [expanded, setExpanded] = useState(index === 0);

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="relative"
    >
      {/* Timeline line */}
      <div className="absolute left-5 top-12 bottom-0 w-px bg-navy-border hidden md:block" />

      <div className="md:pl-16 relative">
        {/* Timeline dot */}
        <div className="absolute left-3.5 top-4 w-3 h-3 rounded-full border-2 border-cyan bg-background hidden md:block" />

        <div className="card-glass rounded-2xl p-6 hover:border-cyan/20 transition-colors duration-300">
          <div
            className="flex items-start justify-between cursor-pointer gap-4"
            onClick={() => setExpanded(!expanded)}
          >
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded text-xs bg-cyan/10 text-cyan border border-cyan/20">
                  {exp.type}
                </span>
              </div>
              <h3 className="font-display font-bold text-lg text-foreground">{exp.role}</h3>
              <p className="text-cyan font-medium text-sm">{exp.company}</p>
              <div className="flex flex-wrap gap-4 mt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar size={12} />
                  {exp.period}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin size={12} />
                  {exp.location}
                </span>
              </div>
            </div>
            <motion.div
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="flex-shrink-0 text-muted-foreground mt-1"
            >
              <ChevronDown size={18} />
            </motion.div>
          </div>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="pt-5 space-y-4 border-t border-navy-border mt-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">{exp.overview}</p>
                  <ul className="space-y-2">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                        <span className="text-cyan mt-1 flex-shrink-0">▸</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {exp.tech.map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-md bg-navy text-xs text-muted-foreground border border-navy-border">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" ref={ref} className="py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-cyan text-xs tracking-widest uppercase font-medium">03 / Experience</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-6">
            Professional{" "}
            <span className="text-gradient">Journey</span>
          </h2>
          <div className="section-divider" />
        </motion.div>

        <div className="space-y-6">
          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.company + exp.role} exp={exp} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
