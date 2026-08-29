import { useState, useEffect } from "react";
import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Skills from "@/components/portfolio/Skills";
import Experience from "@/components/portfolio/Experience";
import Projects from "@/components/portfolio/Projects";
import Impact from "@/components/portfolio/Impact";
import Certifications from "@/components/portfolio/Certifications";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";
import GlobalAvaChat from "@/components/portfolio/GlobalAvaChat";
import CommandPalette from "@/components/portfolio/CommandPalette";
import { AnimatePresence, motion } from "framer-motion";
import { X, Download, FileText } from "lucide-react";

export default function ModernPortfolio() {
  const [cmdOpen, setCmdOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCmdOpen(prev => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans select-text relative overflow-x-hidden transition-colors duration-300">
      {/* Hidden button for Navbar search trigger */}
      <button
        id="trigger-command-palette"
        onClick={() => setCmdOpen(true)}
        className="hidden"
        aria-hidden="true"
      />

      {/* Main Navbar */}
      <Navbar />

      {/* Main Page Flow */}
      <main className="flex-1 w-full relative z-10 pt-16">
        <Hero onViewResume={() => setResumeOpen(true)} />
        <About isOs={false} />
        <Skills isOs={false} />
        <Experience isOs={false} />
        <Projects isOs={false} />
        <Impact />
        <Certifications isOs={false} />
        <Contact onViewResume={() => setResumeOpen(true)} isOs={false} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Ava Chat */}
      <GlobalAvaChat onOpenResume={() => setResumeOpen(true)} />

      {/* Command Palette */}
      <CommandPalette
        isOpen={cmdOpen}
        onClose={() => setCmdOpen(false)}
        onTriggerResume={() => setResumeOpen(true)}
        onTriggerAva={() => {
          const btn = document.querySelector('[aria-label="Toggle Ava Assistant"]') as HTMLButtonElement;
          btn?.click();
        }}
      />

      {/* Resume Viewer Modal */}
      <AnimatePresence>
        {resumeOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl bg-card border border-border p-6 md:p-8 shadow-2xl relative text-card-foreground"
            >
              <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-foreground">Malila Nyamai</h3>
                  <p className="text-xs text-cyan font-mono">Curriculum Vitae</p>
                </div>
                <button
                  onClick={() => setResumeOpen(false)}
                  className="p-2 rounded-lg bg-muted text-muted-foreground hover:text-foreground"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Resume Body */}
              <div className="space-y-6 text-sm text-muted-foreground">
                <div className="p-4 rounded-xl bg-muted/40 border border-border">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-cyan font-bold mb-2">Executive Summary</h4>
                  <p className="text-xs text-foreground/80 leading-relaxed">
                    Software Quality Assurance Engineer and Full-Stack Developer with 3+ years of experience building resilient React/Node web platforms, executing automated Postman/Jest regression suites, managing MySQL/PostgreSQL databases, and advising on enterprise network security (CCNA certified).
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-cyan font-bold mb-3">Key Experience Highlights</h4>
                  <div className="space-y-3 text-xs">
                    <div className="p-3 rounded-lg bg-muted/30 border border-border">
                      <div className="flex justify-between font-bold text-foreground mb-1">
                        <span>Senior Software QA Engineer — Annex Technologies</span>
                        <span className="text-cyan font-mono">2024 – Present</span>
                      </div>
                      <p className="text-muted-foreground">Validated REST API backend functionality with Postman & SQL queries; led automation sweeps cutting regression rates by 35%.</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/30 border border-border">
                      <div className="flex justify-between font-bold text-foreground mb-1">
                        <span>Software Testing Intern — Kiwami Tech Solutions</span>
                        <span className="text-cyan font-mono">2025 – Present</span>
                      </div>
                      <p className="text-muted-foreground">Designed reusable test case management components and analytics dashboards for Kiwami TestCloud.</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/30 border border-border">
                      <div className="flex justify-between font-bold text-foreground mb-1">
                        <span>Co-Founder & Lead Engineer — RemboGlow</span>
                        <span className="text-cyan font-mono">2025 – Present</span>
                      </div>
                      <p className="text-muted-foreground">Engineered beauty-tech e-commerce platform owning system architecture and usability flows.</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-cyan font-bold mb-2">Certifications</h4>
                    <ul className="text-xs space-y-1 text-foreground/80">
                      <li>• Cisco CCNA: Enterprise Networking & Security</li>
                      <li>• SAP Generative AI Certified</li>
                      <li>• Cybersecurity Fundamentals (Q1 Masterclass)</li>
                      <li>• Microsoft .NET Fundamentals</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-cyan font-bold mb-2">Education</h4>
                    <ul className="text-xs space-y-1 text-foreground/80">
                      <li>• BSc Information Technology — Zetech Univ. (Finalist)</li>
                      <li>• Diploma Software Engineering — Zetech Univ.</li>
                      <li>• Software Cert. — Power Learn Project</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-border mt-6">
                <a
                  href="/resume.pdf"
                  download="Malila_Nyamai_Resume.pdf"
                  className="px-4 py-2.5 rounded-xl bg-cyan hover:bg-cyan-glow text-primary-foreground font-bold text-xs flex items-center gap-2"
                >
                  <Download size={14} />
                  <span>Download PDF</span>
                </a>
                <button
                  onClick={() => setResumeOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-secondary hover:bg-secondary/80 text-secondary-foreground text-xs font-semibold"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
