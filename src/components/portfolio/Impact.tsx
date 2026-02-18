import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 40, suffix: "%", label: "Reduction in processing time achieved for SME clients through digital migration." },
  { value: 35, suffix: "%", label: "Decrease in QA testing time through automated test scripting at Kiwami Tech." },
  { value: 10000, suffix: "+", label: "End users protected from a defective mobile app release through proactive QA." },
  { value: 500, suffix: "+", label: "Concurrent users successfully load tested on a healthcare platform." },
  { value: 300, suffix: "+", label: "University staff and students supported with daily first line IT assistance." },
  { value: 50, suffix: "%", label: "Improvement in system boot and stability during JKUAT computer lab upgrades." },
];

function Counter({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span className="font-display text-4xl md:text-5xl font-bold text-gradient">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

const achievements = [
  {
    title: "Automated VAT Compliance",
    desc: "Engineered API driven workflows that eliminated manual VAT submissions for SMEs, reducing compliance risk and processing overhead.",
  },
  {
    title: "QA Pipeline Automation",
    desc: "Transformed manual QA cycles into automated test suites, cutting testing time by 35% and enabling faster, safer release cadences.",
  },
  {
    title: "Community Digital Training",
    desc: "Led hands on workshops for rural youth and women's groups across Kenya, building practical IT skills and opening career pathways in tech.",
  },
  {
    title: "Legacy System Migration",
    desc: "Guided SMEs from paper based records to digital platforms, improving data accuracy, reducing errors, and saving hours of weekly admin time.",
  },
];

export default function Impact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="impact" ref={ref} className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-cyan text-xs tracking-widest uppercase font-medium">05 / Impact</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-6">
            Professional{" "}
            <span className="text-gradient">Impact</span>
          </h2>
          <div className="section-divider" />
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-20">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-glass rounded-2xl p-6 text-center"
            >
              <Counter target={stat.value} suffix={stat.suffix} inView={inView} />
              <p className="text-xs text-muted-foreground mt-3 leading-relaxed">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Achievements */}
        <div className="grid md:grid-cols-2 gap-6">
          {achievements.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
              className="flex gap-4 card-glass rounded-xl p-5"
            >
              <div className="w-1 flex-shrink-0 rounded-full gradient-accent" />
              <div>
                <h3 className="font-display font-semibold text-foreground text-sm mb-2">{a.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{a.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
