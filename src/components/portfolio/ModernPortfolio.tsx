import { useState, useEffect } from "react";
import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Skills from "@/components/portfolio/Skills";
import Experience from "@/components/portfolio/Experience";
import Projects from "@/components/portfolio/Projects";
import Impact from "@/components/portfolio/Impact";
import Certifications from "@/components/portfolio/Certifications";
import Articles from "@/components/portfolio/Articles";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";
import GlobalAvaChat from "@/components/portfolio/GlobalAvaChat";
import CommandPalette from "@/components/portfolio/CommandPalette";
import { AnimatePresence, motion } from "framer-motion";
import { X, Download, FileText, Printer } from "lucide-react";

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
        <Articles isOs={false} />
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-background/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-3xl max-h-[90vh] sm:max-h-[85vh] overflow-y-auto rounded-2xl bg-card border border-border p-4 sm:p-6 md:p-8 shadow-2xl relative text-card-foreground"
            >
              <div className="flex items-center justify-between border-b border-border pb-4 mb-4 sm:mb-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground">Malila Nyamai</h3>
                  <p className="text-xs text-cyan font-mono">Curriculum Vitae</p>
                </div>
                <button
                  onClick={() => setResumeOpen(false)}
                  className="p-1.5 sm:p-2 rounded-lg bg-muted text-muted-foreground hover:text-foreground cursor-pointer"
                  aria-label="Close CV Modal"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Resume Body */}
              <div className="space-y-4 sm:space-y-6 text-sm text-muted-foreground">
                <div className="p-3.5 sm:p-4 rounded-xl bg-muted/40 border border-border">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-cyan font-bold mb-2">Professional Summary</h4>
                  <p className="text-xs text-foreground/80 leading-relaxed">
                    Results-driven Software Engineer, QA Specialist, and IT Consultant with 3+ years of hands-on experience engineering scalable web platforms, automated testing frameworks, and cloud-backed systems. Finalist in BSc Information Technology with demonstrated expertise in React, TypeScript, Node.js, and relational databases (MySQL, PostgreSQL). Proven track record in API and end-to-end testing (Postman, Jest), CI/CD integration, and cloud environments (AWS/Azure). Passionate about building reliable digital products, implementing secure AI agent workflows (LangChain, RAG), and delivering high-impact solutions.
                  </p>
                </div>

                {/* Technical Skills Overview */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-cyan font-bold mb-3">Core Technical Proficiencies</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-muted/30 border border-border">
                      <strong className="text-foreground block text-[11px] mb-0.5">Cloud & Infrastructure</strong>
                      <span className="text-muted-foreground text-[11px]">AWS (exposure), Azure (exposure), Docker, CI/CD Pipelines</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-muted/30 border border-border">
                      <strong className="text-foreground block text-[11px] mb-0.5">Testing & Quality Assurance</strong>
                      <span className="text-muted-foreground text-[11px]">Postman (API), Jira, Jest, Manual & Automated, UAT, Load Testing</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-muted/30 border border-border">
                      <strong className="text-foreground block text-[11px] mb-0.5">Frontend & Backend Engineering</strong>
                      <span className="text-muted-foreground text-[11px]">React, TypeScript, Node.js, PostgreSQL, MySQL, Tailwind CSS, REST APIs</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-muted/30 border border-border">
                      <strong className="text-foreground block text-[11px] mb-0.5">AI Workflows & Security</strong>
                      <span className="text-muted-foreground text-[11px]">LangChain, RAG, Cisco CCNA Networking, Endpoint Security</span>
                    </div>
                  </div>
                </div>

                {/* Experience & Flagship Projects */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-cyan font-bold mb-3">Key Experience & Flagship Projects</h4>
                  <div className="space-y-3 text-xs">
                    <div className="p-3 rounded-lg bg-muted/30 border border-border">
                      <div className="flex flex-col sm:flex-row sm:justify-between font-bold text-foreground mb-1 gap-0.5 sm:gap-2">
                        <span>Senior Software QA Engineer — Annex Technologies</span>
                        <span className="text-cyan font-mono text-[11px] sm:text-xs">Jan 2024 – Present</span>
                      </div>
                      <p className="text-muted-foreground">Validated REST API backend functionality with Postman & SQL queries; led automation testing reducing manual QA turnaround by 35% across CI/CD quality pipelines.</p>
                    </div>

                    <div className="p-3 rounded-lg bg-muted/30 border border-border">
                      <div className="flex flex-col sm:flex-row sm:justify-between font-bold text-foreground mb-1 gap-0.5 sm:gap-2">
                        <span>Co-Founder & Full-Stack Engineer — E-Foleni</span>
                        <span className="text-cyan font-mono text-[11px] sm:text-xs">Sep 2025 – Present</span>
                      </div>
                      <p className="text-muted-foreground">Engineered an M-Pesa native queue-free booking platform replacing manual lines. Built slot scheduling logic and Daraja STK Push integrations, serving 120,000+ bookings with 99.9% uptime.</p>
                    </div>

                    <div className="p-3 rounded-lg bg-muted/30 border border-border">
                      <div className="flex flex-col sm:flex-row sm:justify-between font-bold text-foreground mb-1 gap-0.5 sm:gap-2">
                        <span>Software Testing Intern — Kiwami Tech Solutions</span>
                        <span className="text-cyan font-mono text-[11px] sm:text-xs">Aug 2025 – Present</span>
                      </div>
                      <p className="text-muted-foreground">Designed reusable test case management components and live execution analytics dashboards for Kiwami TestCloud.</p>
                    </div>

                    <div className="p-3 rounded-lg bg-muted/30 border border-border">
                      <div className="flex flex-col sm:flex-row sm:justify-between font-bold text-foreground mb-1 gap-0.5 sm:gap-2">
                        <span>Co-Founder & Lead Engineer — RemboGlow</span>
                        <span className="text-cyan font-mono text-[11px] sm:text-xs">Aug 2025 – Present</span>
                      </div>
                      <p className="text-muted-foreground">Engineered beauty-tech e-commerce platform owning system architecture, pilot deployment, and usability flows.</p>
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

              <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-4 sm:pt-6 border-t border-border mt-6">
                <button
                  onClick={() => window.print()}
                  className="w-full sm:w-auto justify-center px-4 py-2.5 rounded-xl border border-border hover:border-cyan/40 bg-muted/30 hover:bg-muted text-foreground font-semibold text-xs flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Printer size={14} />
                  <span>Print CV</span>
                </button>
                <a
                  href="/Malila_Nyamai_Resume.pdf"
                  download="Malila_Nyamai_Resume.pdf"
                  className="w-full sm:w-auto justify-center px-4 py-2.5 rounded-xl bg-cyan hover:bg-cyan-glow text-primary-foreground font-bold text-xs flex items-center gap-2 cursor-pointer"
                >
                  <Download size={14} />
                  <span>Download PDF</span>
                </a>
                <button
                  onClick={() => setResumeOpen(false)}
                  className="w-full sm:w-auto justify-center px-4 py-2.5 rounded-xl bg-secondary hover:bg-secondary/80 text-secondary-foreground text-xs font-semibold cursor-pointer"
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
