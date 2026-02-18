import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Heart, Users, BookOpen, Trophy } from "lucide-react";

const initiatives = [
  {
    icon: Users,
    title: "Rural Digital Literacy Workshops",
    period: "Aug 2022 to Present",
    desc: "Facilitated community based digital literacy workshops for youth and women's groups across Kenya, covering everything from basic computer skills to programming fundamentals and employable IT skills.",
  },
  {
    icon: BookOpen,
    title: "Student Mentorship & Career Guidance",
    period: "Ongoing",
    desc: "Actively mentoring high school and university students on pathways into IT, from choosing the right certifications to building their first full stack projects in React and ASP.NET Core.",
  },
  {
    icon: Trophy,
    title: "University Examination Invigilator",
    period: "Dec 2021 to Present | JKUAT, COHRED",
    desc: "Supporting academic integrity at Jomo Kenyatta University's College of Human Resource Development, ensuring fair, orderly, and transparent examination environments for hundreds of students.",
  },
  {
    icon: Heart,
    title: "SME Digital Transformation Advocate",
    period: "2022 to Present",
    desc: "Going beyond software delivery, actively training business owners to understand and independently manage their digital tools, creating lasting capability rather than dependency.",
  },
];

export default function Community() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="community" ref={ref} className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-cyan text-xs tracking-widest uppercase font-medium">07 / Community</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-6">
            Leadership &{" "}
            <span className="text-gradient">Giving Back</span>
          </h2>
          <div className="section-divider mb-6" />
          <p className="max-w-2xl text-muted-foreground leading-relaxed">
            Technology becomes meaningful when it empowers people. Beyond building software,
            I invest in communities, training the underserved, mentoring the ambitious,
            and helping organizations build digital confidence from the ground up.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {initiatives.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="card-glass rounded-2xl p-6 hover-glow group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-cyan/10 border border-cyan/20 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan/20 transition-colors">
                  <item.icon size={20} className="text-cyan" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground text-sm leading-tight">{item.title}</h3>
                  <p className="text-xs text-cyan mt-1">{item.period}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mt-4">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
