import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronDown, MapPin, Calendar } from "lucide-react";

const experiences = [
  {
    role: "Freelance Software Engineer",
    company: "Kiwami Tech Solutions",
    location: "Nairobi, Kenya",
    period: "Aug 2025 – Present",
    type: "Part-Time",
    overview: "Building and maintaining the frontend of Kiwami TestCloud — a professional software testing platform used by QA teams across Kenya.",
    highlights: [
      "Developed reusable, modular React + TypeScript components for test case management, execution, and reporting workflows.",
      "Integrated frontend with backend APIs to surface real-time test logs, results, and analytics dashboards.",
      "Implemented secure authentication flows and role-based UI controls for enterprise access management.",
      "Conducted frontend performance optimization, cutting load times and improving application stability.",
      "Collaborated cross-functionally with backend engineers, QA teams, and product stakeholders in Agile sprints.",
    ],
    tech: ["React", "TypeScript", "Vite", "REST APIs", "Cypress"],
  },
  {
    role: "Software Engineer",
    company: "Tari Africa Platforms",
    location: "Nairobi, Kenya",
    period: "Jan 2025 – Aug 2025",
    type: "Contract",
    overview: "Designed and implemented digital tax and payment infrastructure for East African SMEs, automating compliance workflows and connecting critical business systems.",
    highlights: [
      "Analyzed SME tax and payment workflows to design digital optimization solutions that automated VAT submissions.",
      "Implemented API-driven automation connecting tax systems, inventory platforms, and mobile payments.",
      "Built real-time financial and compliance dashboards, centralizing reporting for business owners.",
      "Managed Agile sprint delivery to ensure reliable system performance during peak transaction periods.",
      "Developed client onboarding guides and training sessions, increasing adoption while reducing support load.",
    ],
    tech: ["API Integration", "Dashboard Development", "Agile", "Financial Systems", "Mobile Payments"],
  },
  {
    role: "Quality Assurance Engineer",
    company: "Kiwami Tech Solutions",
    location: "Nairobi, Kenya",
    period: "Jun 2025 – Aug 2025",
    type: "Full-Time Attaché",
    overview: "Embedded QA engineer responsible for preventing defects, ensuring system stability, and protecting end-user experience across mobile and web platforms.",
    highlights: [
      "Designed comprehensive manual test cases for a mobile banking app, ensuring compliance with financial security standards.",
      "Created automated test scripts for recurring QA tasks — cutting testing time by 35%.",
      "Identified and documented critical bugs in mobile UI flows, preventing a flawed release to 10,000+ users.",
      "Conducted load testing on a healthcare app, validating system capacity for 500 concurrent users.",
      "Participated in sprint reviews and presented QA findings to stakeholders, directly influencing release decisions.",
    ],
    tech: ["Jest", "Cypress", "Manual Testing", "Load Testing", "Bug Tracking"],
  },
  {
    role: "Freelance IT Consultant & Trainer",
    company: "Malila Tech Consultancy",
    location: "Nairobi, Kenya",
    period: "Jan 2022 – Present",
    type: "Full-Time",
    overview: "End-to-end digital transformation consultant, web developer, and trainer — helping SMEs, NGOs, and youth communities modernize their operations and careers.",
    highlights: [
      "Designed customized MS Excel solutions — automated trackers, payroll calculators, and financial dashboards — for SMEs and NGOs.",
      "Built full-stack web applications using React (frontend) and ASP.NET Core with C# (backend) for client operational workflows.",
      "Supported organizations in migrating manual records to digital systems, reducing processing time by up to 40%.",
      "Conducted hands-on digital literacy workshops for rural youth and women's groups across Kenya.",
      "Created step-by-step learning manuals, video tutorials, and demo projects to sustain independent learning post-training.",
      "Advised clients on cybersecurity best practices including phishing awareness, password policies, and endpoint protection.",
      "Mentored high school and university students on IT career pathways with emphasis on full-stack development.",
    ],
    tech: ["React", "ASP.NET Core", "C#", "MS Excel", "Cybersecurity", "Instructional Design"],
  },
  {
    role: "IT Attaché",
    company: "JKUAT (Jomo Kenyatta University)",
    location: "Juja, Kenya",
    period: "Sep 2023 – Nov 2023",
    type: "Attachment",
    overview: "Provided first-line IT support to a 300+ person university community, improved system infrastructure, and contributed to campus-wide cybersecurity initiatives.",
    highlights: [
      "Resolved daily technical issues for 300+ staff and students across Microsoft Office, email, and network systems.",
      "Assisted in upgrading computer lab systems, improving boot-up times and stability by 50%.",
      "Authored IT support guides that significantly reduced repeat service requests.",
      "Supported lecturers in deploying e-learning platforms for smooth hybrid classroom delivery.",
      "Participated in a campus-wide password security rollout and system log auditing for unauthorized access.",
    ],
    tech: ["IT Support", "LAN/Wi-Fi", "Microsoft Office", "E-Learning Platforms", "Cybersecurity"],
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
