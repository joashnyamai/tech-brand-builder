import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Shield, Users, Zap } from "lucide-react";

const differentiators = [
  {
    icon: Shield,
    title: "Cybersecurity Analyst",
    desc: "Passion for identifying, analyzing, and mitigating threats. Proactively detecting and responding to security incidents.",
  },
  {
    icon: Code2,
    title: "Frontend & Usability",
    desc: "Designing and building secure, responsive web and mobile interfaces with a focus on usability and modern aesthetics.",
  },
  {
    icon: Users,
    title: "Co-Founder & Leader",
    desc: "Co-founder of RemboGlow.com and Facefit-ke, driving product quality, Agile execution, and business operations.",
  },
  {
    icon: Zap,
    title: "AI & Data Operations",
    desc: "2+ years of experience in data annotation, quality assurance, and image processing supporting ML pipelines at scale.",
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
              I am a Freelance IT Consultant and Cybersecurity Analyst with a passion for identifying, analyzing, and mitigating cyber threats. As an Incident Response Specialist and Threat Intelligence Expert, I excel in proactively detecting and responding to security incidents, safeguarding critical systems and data from malicious actors.
            </p>
            <p>
              With hands-on experience spanning software engineering, security analysis, and co-founding ventures like <span className="text-foreground font-medium">RemboGlow.com</span> and <span className="text-foreground font-medium">Facefit-ke</span>, I operate at the intersection of robust security practices and high-fidelity frontend development.
            </p>
            <p>
              I am currently pursuing a <span className="text-foreground font-medium">Bachelor of Science in Information Technology</span> at Zetech University, expanding my expertise in software engineering, database management, and web development. I also leverage over two years of experience as an Image Annotator at Remotasks supporting ML pipelines.
            </p>
            <p>
              When I'm not auditing system logs or refining frontend interfaces, I contribute to technology roadmaps, mentor peers, and monitor the threat landscape to share actionable intelligence with stakeholders.
            </p>

            <div className="flex flex-wrap gap-3 pt-4">
              {["Juja, Kiambu, Kenya", "English & Swahili", "Open to Remote", "CCNA Certified"].map((tag) => (
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
