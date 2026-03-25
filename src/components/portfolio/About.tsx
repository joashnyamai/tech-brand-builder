import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Shield, Users, Zap } from "lucide-react";

const differentiators = [
  {
    icon: Code2,
    title: "Full Stack Depth",
    desc: "From React frontends to ASP.NET Core backends, I architect end to end solutions with production grade quality.",
  },
  {
    icon: Shield,
    title: "Quality-First Mindset",
    desc: "QA is built into my development DNA. Every product I touch is tested, secured, and optimized before it ships.",
  },
  {
    icon: Users,
    title: "Digital Empowerment",
    desc: "I've trained hundreds of entrepreneurs, students, and youth groups, turning technology into lasting opportunity.",
  },
  {
    icon: Zap,
    title: "Automation & Efficiency",
    desc: "I identify workflow bottlenecks and eliminate them, reducing processing time by up to 40% for organizations I serve.",
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
              My journey in technology began not in a classroom, but in curiosity, a relentless drive to understand how systems work and how they can be made better. Today, I operate at the intersection of software engineering, quality assurance, and digital transformation as a practitioner who has seen both the code and the people it serves.
            </p>
            <p>
              With over <span className="text-foreground font-medium">3 years of hands on experience</span>, I've shipped production applications at Kiwami Tech Solutions, architected digital tax infrastructure at Tari Africa Platforms, and independently consulted dozens of SMEs and NGOs across Kenya, helping them escape spreadsheet chaos and embrace scalable digital workflows.
            </p>
            <p>
              I hold a <span className="text-foreground font-medium">BSc in Information Technology</span> from Zetech University, complemented by Cisco CCNA, Cybersecurity, and Generative AI certifications. But what defines my career isn't credentials, it's the measurable impact I create for every team, client, and community I engage with.
            </p>
            <p>
              When I'm not building software, I'm mentoring the next generation of Kenyan engineers, writing instructional content, or exploring the frontier of AI powered automation.
            </p>

            <div className="flex flex-wrap gap-3 pt-4">
              {["Nairobi, Kenya", "English & Swahili", "Open to Remote", "Cisco CCNA Certified"].map((tag) => (
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
