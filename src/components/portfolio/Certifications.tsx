import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, GraduationCap, BookOpen } from "lucide-react";
import { usePortfolioData } from "@/hooks/use-portfolio-data";

export default function Certifications({ isOs = false }: { isOs?: boolean }) {
  const { certifications, education } = usePortfolioData();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div
      id="certifications"
      ref={ref}
      className={isOs ? "p-4 md:p-8 max-h-[75vh] overflow-y-auto" : "py-16 sm:py-28 px-4 sm:px-6 bg-navy-surface/30"}
    >
      <div className="max-w-6xl mx-auto">
        {!isOs && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-10 sm:mb-16"
          >
            <span className="text-cyan text-xs tracking-widest uppercase font-medium">06 / Credentials</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mt-2 sm:mt-3 mb-4 sm:mb-6">
              Education &{" "}
              <span className="text-gradient">Certifications</span>
            </h2>
            <div className="section-divider" />
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
          {/* Education */}
          <div>
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <GraduationCap size={18} className="text-cyan" />
              <h3 className="font-display font-semibold text-foreground text-base sm:text-lg">Education</h3>
            </div>
            <div className="space-y-3 sm:space-y-4">
              {education.map((edu, i) => (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="card-glass rounded-xl p-4 sm:p-5 border-l-2 border-l-cyan"
                >
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <span
                      className={`text-[10px] sm:text-xs px-2 py-0.5 rounded-full ${edu.status === "Completed"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-cyan/10 text-cyan border border-cyan/20"
                        }`}
                    >
                      {edu.status}
                    </span>
                  </div>
                  <h4 className="font-display font-semibold text-sm text-foreground mt-2">{edu.degree}</h4>
                  <p className="text-cyan text-xs sm:text-sm mt-1">{edu.institution}</p>
                  <p className="text-xs text-muted-foreground mt-1">{edu.period}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <Award size={18} className="text-cyan" />
              <h3 className="font-display font-semibold text-foreground text-base sm:text-lg">Certifications</h3>
            </div>
            <div className="space-y-2.5 sm:space-y-3">
              {certifications.map((cert, i) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="card-glass rounded-xl p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4 hover-glow group"
                >
                  <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                    <span className="text-xl sm:text-2xl flex-shrink-0">{cert.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground leading-snug">{cert.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{cert.issuer}</p>
                    </div>
                  </div>
                  <span className="self-start sm:self-auto flex-shrink-0 px-2 py-0.5 rounded text-[10px] sm:text-xs bg-navy-elevated border border-navy-border text-muted-foreground">
                    {cert.category}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Interests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 sm:mt-12 card-glass rounded-2xl p-4 sm:p-6"
        >
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <BookOpen size={16} className="text-cyan" />
            <h3 className="font-display font-semibold text-sm text-foreground">Beyond Code</h3>
          </div>
          <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
            When I step away from the terminal, I channel the same analytical mind into other pursuits:
            writing about emerging technology, playing chess, exploring AI innovations, and mentoring
            the next generation of Kenyan engineers into the industry.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
