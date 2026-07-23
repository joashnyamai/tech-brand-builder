import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronDown, MapPin, Calendar } from "lucide-react";
import { usePortfolioData, type Experience as ExperienceType } from "@/hooks/use-portfolio-data";

function ExperienceCard({ exp, index, inView }: { exp: ExperienceType; index: number; inView: boolean }) {
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

export default function Experience({ isOs = false }: { isOs?: boolean }) {
  const { experiences } = usePortfolioData();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div
      id="experience"
      ref={ref}
      className={isOs ? "p-4 md:p-8 max-h-[75vh] overflow-y-auto" : "py-28 px-6"}
    >
      <div className="max-w-4xl mx-auto">
        {!isOs && (
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
        )}

        <div className="space-y-6">
          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.company + exp.role} exp={exp} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </div>
  );
}
