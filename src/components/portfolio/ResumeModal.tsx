import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ZoomIn,
  ZoomOut,
  Download,
  Maximize2,
  Minimize2,
  Send,
  Cpu,
  Bot,
  Sparkles,
  Printer,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github
} from "lucide-react";
import { queryGeminiWithRetry, getMockChatResponse, RESUME_CONTEXT } from "../../pages/AiLab";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  // Viewer state
  const [scale, setScale] = useState<number>(1.0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(true);
  const [scrollPercent, setScrollPercent] = useState<number>(0);

  // Chat state
  const [messages, setMessages] = useState<Array<{ sender: "user" | "bot"; text: string }>>([
    {
      sender: "bot",
      text: "Hi, I'm Ava 👋\nI'm Malila's portfolio guide. Ask me anything about his CV, skills, or projects!"
    }
  ]);
  const [inputVal, setInputVal] = useState<string>("");
  const [chatLoading, setChatLoading] = useState<boolean>(false);

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Setup auto-fit on load
  const fitWidth = () => {
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.clientWidth;
      if (containerWidth < 640) {
        setScale(0.7);
      } else if (containerWidth < 1024) {
        setScale(0.9);
      } else {
        setScale(1.0);
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(fitWidth, 300);
      window.addEventListener("resize", fitWidth);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("resize", fitWidth);
    };
  }, [isOpen]);

  // Keyboard navigation & zoom shortcuts
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowUp") {
        scrollContainerRef.current?.scrollBy({ top: -40, behavior: "smooth" });
      } else if (e.key === "ArrowDown") {
        scrollContainerRef.current?.scrollBy({ top: 40, behavior: "smooth" });
      } else if ((e.ctrlKey || e.metaKey) && (e.key === "=" || e.key === "+")) {
        e.preventDefault();
        setScale(s => Math.min(s + 0.1, 2.0));
      } else if ((e.ctrlKey || e.metaKey) && e.key === "-") {
        e.preventDefault();
        setScale(s => Math.max(s - 0.1, 0.5));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Fullscreen support
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        console.error("Error enabling fullscreen:", err);
      });
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Track scroll position
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const totalHeight = target.scrollHeight - target.clientHeight;
    if (totalHeight > 0) {
      setScrollPercent((target.scrollTop / totalHeight) * 100);
    }
  };

  // Open print preview in new window
  const handlePrint = () => {
    window.open("/resume", "_blank");
  };

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Mini-chatbot query
  const handleSendChat = async (textToSend?: string) => {
    const text = textToSend || inputVal;
    if (!text.trim() || chatLoading) return;

    setMessages(prev => [...prev, { sender: "user", text }]);
    if (!textToSend) setInputVal("");
    setChatLoading(true);

    const savedKey = localStorage.getItem("GEMINI_API_KEY") || import.meta.env.VITE_GEMINI_API_KEY || "";

    try {
      if (savedKey) {
        const prompt = `You are Ava, Malila Nyamai's personal guide and assistant.
Answer the user's question completely, accurately, and concisely. Speak about Malila in the third person ("he", "him", "his").
Do NOT state that you are an AI, a large language model, or a chatbot. Keep your tone completely human, friendly, and professional.
Avoid robotic phrase templates (such as "Based on the provided context..."). Just answer naturally.
Make sure the response is well-structured, complete, and always ends with a finished sentence. Do not cut off mid-sentence.

Resume Context:
${RESUME_CONTEXT}

User inquiry about Malila's CV: "${text}"`;

        const response = await queryGeminiWithRetry(prompt, savedKey);
        setMessages(prev => [...prev, { sender: "bot", text: response }]);
      } else {
        throw new Error("No Gemini API key configured.");
      }
    } catch (err: any) {
      console.error("Mini-chatbot API failed:", err.message);
      setMessages(prev => [
        ...prev,
        {
          sender: "bot",
          text: `⚠️ Chatbot error: ${err.message}. Please check your connection or API key settings.`
        }
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  const suggestionChips = [
    "Summarize his experience.",
    "What AI skills does he have?",
    "What Rails projects has he built?",
    "Tell me about his education."
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6 bg-navy/80 backdrop-blur-md overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Main Modal container with glassmorphism */}
          <motion.div
            ref={containerRef}
            className="relative w-full h-full md:h-[90vh] md:max-w-6xl md:rounded-3xl border border-white/10 bg-navy-surface/30 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row overflow-hidden"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
          >
            {/* Scroll Indicator Progress Bar */}
            <div className="absolute top-[65px] left-0 right-0 h-0.5 bg-white/5 z-20">
              <div
                className="h-full bg-cyan transition-all duration-75"
                style={{ width: `${scrollPercent}%` }}
              />
            </div>

            {/* LEFT AREA: HTML CV VIEWER */}
            <div className="flex-1 flex flex-col h-full overflow-hidden border-r border-white/5">
              {/* Header inside viewer */}
              <div className="px-6 py-4 flex items-center justify-between border-b border-white/5 bg-navy-elevated/40 backdrop-blur-sm z-10">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan animate-pulse" />
                  <h2 className="font-display font-bold text-base tracking-wide text-foreground">
                    Malila Nyamai - Curriculum Vitae
                  </h2>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrint}
                    className="p-2 rounded-xl border border-white/5 text-muted-foreground hover:text-cyan hover:bg-white/5 transition-all text-xs flex items-center gap-1.5"
                    title="Print CV"
                  >
                    <Printer size={15} />
                    <span className="hidden sm:inline">Print / Save PDF</span>
                  </button>

                  <a
                    href="/Malila_Nyamai_Resume.pdf"
                    download="Malila_Nyamai_Resume.pdf"
                    className="p-2 rounded-xl border border-white/5 text-muted-foreground hover:text-cyan hover:bg-white/5 transition-all text-xs flex items-center gap-1.5"
                    title="Download precompiled PDF"
                  >
                    <Download size={15} />
                    <span className="hidden sm:inline">Download</span>
                  </a>

                  <button
                    onClick={toggleFullscreen}
                    className="p-2 rounded-xl border border-white/5 text-muted-foreground hover:text-cyan hover:bg-white/5 transition-all"
                    title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                  >
                    {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
                  </button>

                  <button
                    onClick={() => setIsChatOpen(!isChatOpen)}
                    className={`p-2 rounded-xl border transition-all flex items-center gap-1.5 ${
                      isChatOpen
                        ? "border-cyan/30 text-cyan bg-cyan/5"
                        : "border-white/5 text-muted-foreground hover:text-cyan hover:bg-white/5"
                    }`}
                    title="Ask Ava AI"
                  >
                    <Cpu size={15} />
                    <span className="hidden sm:inline">Ask Ava</span>
                  </button>

                  <button
                    onClick={onClose}
                    className="p-2 rounded-xl border border-white/5 text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-all"
                    title="Close Viewer"
                  >
                    <X size={15} />
                  </button>
                </div>
              </div>

              {/* HTML CV Render Viewport */}
              <div
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="flex-1 overflow-y-auto p-4 sm:p-8 bg-navy/20 scroll-smooth"
              >
                <div
                  className="mx-auto origin-top transition-all duration-100 ease-out"
                  style={{ zoom: scale }}
                >
                  <article className="max-w-4xl mx-auto bg-navy-surface/40 border border-navy-border rounded-3xl p-6 sm:p-12 shadow-2xl text-foreground">
                    {/* Header Block */}
                    <header className="border-b border-navy-border pb-8 mb-8">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div>
                          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight font-display text-gradient">
                            Malila Nyamai
                          </h1>
                          <p className="text-lg sm:text-xl text-cyan mt-2 font-medium tracking-wide">
                            Software Engineer · QA Engineer · IT Consultant
                          </p>
                        </div>

                        {/* Contact Details */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2.5 text-xs text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Mail size={14} className="text-cyan" />
                            <a href="mailto:jamesmnyamai9@gmail.com" className="hover:text-cyan transition-colors">
                              jamesmnyamai9@gmail.com
                            </a>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone size={14} className="text-cyan" />
                            <a href="tel:+254745806761" className="hover:text-cyan transition-colors">
                              0745 806 761
                            </a>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin size={14} className="text-cyan" />
                            <span>Nairobi, Kenya</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Linkedin size={14} className="text-cyan" />
                            <a
                              href="https://www.linkedin.com/in/malila-nyamai-0b2711221"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-cyan transition-colors"
                            >
                              linkedin.com/in/malila-nyamai-0b2711221
                            </a>
                          </div>
                          <div className="flex items-center gap-2">
                            <Github size={14} className="text-cyan" />
                            <a
                              href="https://github.com/joashnyamai"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-cyan transition-colors"
                            >
                              github.com/joashnyamai
                            </a>
                          </div>
                        </div>
                      </div>
                    </header>

                    {/* Professional Summary */}
                    <section className="mb-8">
                      <h2 className="text-sm font-semibold tracking-widest text-cyan uppercase mb-3">
                        Professional Summary
                      </h2>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        Motivated IT professional and BSc Information Technology finalist with 3+ years of hands-on experience in software development, quality assurance, IT support, cloud exposure (AWS), and digital training. Proven ability to monitor systems, document workflows, troubleshoot application issues, and support end users in fast-paced technology environments. Experienced in application testing (Jest & Postman), bug tracking (Jira), data management (MySQL, PostgreSQL), and prototyping web solutions using React, TypeScript, Node.js, and PHP. Familiar with AI/ML concepts through LangChain, RAG, and Generative AI certifications. A fast learner and collaborative team player eager to contribute to Jubilee Life Insurance's digital transformation agenda and J-Hub innovation initiatives.
                      </p>
                    </section>

                    {/* Two-Column Grid for Skills / Experience */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {/* Left Column: Skills, Education, Certifications */}
                      <div className="md:col-span-1 space-y-8">
                        {/* Core Skills */}
                        <section>
                          <h2 className="text-sm font-semibold tracking-widest text-cyan uppercase mb-4">
                            Technical Skills
                          </h2>
                          <div className="space-y-4 text-xs">
                            <div>
                              <h3 className="font-bold text-foreground mb-1 uppercase tracking-wider text-[10px]">
                                Cloud & Infrastructure
                              </h3>
                              <p className="text-muted-foreground leading-normal">
                                AWS · Azure · Cloud provisioning · Performance monitoring · Docker · CI/CD
                              </p>
                            </div>
                            <div>
                              <h3 className="font-bold text-foreground mb-1 uppercase tracking-wider text-[10px]">
                                Testing & QA
                              </h3>
                              <p className="text-muted-foreground leading-normal">
                                Manual & Automated Testing · Postman (API) · Jira · UAT · Load Testing · TDD
                              </p>
                            </div>
                            <div>
                              <h3 className="font-bold text-foreground mb-1 uppercase tracking-wider text-[10px]">
                                Frontend Development
                              </h3>
                              <p className="text-muted-foreground leading-normal">
                                React · TypeScript · JavaScript · HTML5 · CSS3 · Tailwind CSS · Vite
                              </p>
                            </div>
                            <div>
                              <h3 className="font-bold text-foreground mb-1 uppercase tracking-wider text-[10px]">
                                Backend & Databases
                              </h3>
                              <p className="text-muted-foreground leading-normal">
                                Node.js · PHP · ASP.NET Core / C# · MySQL · PostgreSQL · Firebase · REST APIs
                              </p>
                            </div>
                            <div>
                              <h3 className="font-bold text-foreground mb-1 uppercase tracking-wider text-[10px]">
                                Architecture & Systems
                              </h3>
                              <p className="text-muted-foreground leading-normal">
                                System design · Technical docs · Workflow mapping · Tech roadmaps
                              </p>
                            </div>
                            <div>
                              <h3 className="font-bold text-foreground mb-1 uppercase tracking-wider text-[10px]">
                                AI, ML & Automation
                              </h3>
                              <p className="text-muted-foreground leading-normal">
                                LangChain · RAG · Agent Architectures · Generative AI (SAP) · n8n Automation
                              </p>
                            </div>
                          </div>
                        </section>

                        {/* Education */}
                        <section>
                          <h2 className="text-sm font-semibold tracking-widest text-cyan uppercase mb-4">
                            Education
                          </h2>
                          <div className="space-y-4 text-xs text-muted-foreground">
                            <div className="relative pl-3 border-l border-navy-border">
                              <h3 className="font-semibold text-foreground">BSc Information Technology</h3>
                              <p>Zetech University</p>
                              <p className="text-[10px] text-muted-foreground/75 mt-0.5">Jan 2023 – Dec 2025 (Graduation: Nov 2026)</p>
                            </div>
                            <div className="relative pl-3 border-l border-navy-border">
                              <h3 className="font-semibold text-foreground">Diploma — Computer Software Engineering</h3>
                              <p>Zetech University</p>
                              <p className="text-[10px] text-muted-foreground/75 mt-0.5">Jan 2022 – Nov 2023</p>
                            </div>
                            <div className="relative pl-3 border-l border-navy-border">
                              <h3 className="font-semibold text-foreground">Software Development Certification</h3>
                              <p>Power Learn Project (PLP Africa)</p>
                              <p className="text-[10px] text-muted-foreground/75 mt-0.5">Mar 2025 – Aug 2025</p>
                            </div>
                          </div>
                        </section>

                        {/* Certifications */}
                        <section>
                          <h2 className="text-sm font-semibold tracking-widest text-cyan uppercase mb-4">
                            Certifications
                          </h2>
                          <ul className="space-y-2 text-xs text-muted-foreground list-disc pl-4">
                            <li>CCNA: Enterprise Networking, Security & Automation (Cisco)</li>
                            <li>Cybersecurity Fundamentals (Q1 Masterclass)</li>
                            <li>The Complete Cyber Security Course (Udemy)</li>
                            <li>Generative AI (SAP)</li>
                            <li>Hashgraph Developer (Hedera / Attendance)</li>
                            <li>Software Engineering (Power Learn Africa)</li>
                            <li>.NET Fundamentals (Microsoft Student Learn)</li>
                          </ul>
                        </section>
                      </div>

                      {/* Right Column: Experience & Projects */}
                      <div className="md:col-span-2 space-y-6">
                        <h2 className="text-sm font-semibold tracking-widest text-cyan uppercase mb-2">
                          Work Experience
                        </h2>

                        <div className="space-y-6">
                          {/* Annex Technologies */}
                          <div>
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-sm font-bold text-foreground">Senior Software Quality Assurance Engineer</h3>
                                <p className="text-xs text-cyan">Annex Technologies Limited · Kenya · Hybrid</p>
                              </div>
                              <span className="text-[10px] text-muted-foreground bg-navy-elevated px-2 py-0.5 rounded border border-navy-border">
                                Jan 2024 – Present
                              </span>
                            </div>
                            <ul className="mt-2 text-xs text-muted-foreground list-disc pl-4 space-y-1">
                              <li>Performed API testing using Postman and validated backend functionality with SQL queries, ensuring data integrity and system compliance.</li>
                              <li>Assisted in automation testing, reducing manual testing effort and contributing to CI/CD quality pipelines.</li>
                              <li>Provided first-line application support to internal users, escalating complex incidents through proper channels.</li>
                              <li>Documented workflows, test procedures, and QA processes to support knowledge retention and operational continuity.</li>
                            </ul>
                          </div>

                          {/* Kiwami Intern */}
                          <div>
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-sm font-bold text-foreground">Software Testing Intern</h3>
                                <p className="text-xs text-cyan">Kiwami Tech Solutions · Nairobi, Kenya · Part-time</p>
                              </div>
                              <span className="text-[10px] text-muted-foreground bg-navy-elevated px-2 py-0.5 rounded border border-navy-border">
                                Aug 2025 – Present
                              </span>
                            </div>
                            <ul className="mt-2 text-xs text-muted-foreground list-disc pl-4 space-y-1">
                              <li>Designed and maintained reusable test case management components, execution workflow interfaces, and real-time analytics dashboards to support performance monitoring.</li>
                              <li>Collaborated with backend engineers to validate REST API integrations, verifying accurate display of live test execution results, logs, and dashboards.</li>
                              <li>Performed frontend testing, debugging, and defect reporting; participated in Agile sprints to ensure quality across iterative releases.</li>
                            </ul>
                          </div>

                          {/* RemboGlow */}
                          <div>
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-sm font-bold text-foreground">Co-Founder & Lead Engineer</h3>
                                <p className="text-xs text-cyan">RemboGlow · Nairobi, Kenya</p>
                              </div>
                              <span className="text-[10px] text-muted-foreground bg-navy-elevated px-2 py-0.5 rounded border border-navy-border">
                                Aug 2025 – Present
                              </span>
                            </div>
                            <ul className="mt-2 text-xs text-muted-foreground list-disc pl-4 space-y-1">
                              <li>Co-founded and engineered a beauty-tech digital platform owning architecture design, frontend development, deployment, and monitoring of pilot solutions.</li>
                              <li>Conducted user research and feedback collection to iterate UI/UX and align product development with user needs.</li>
                              <li>Documented learnings, case studies, and operational processes to support knowledge transfer and future scaling.</li>
                            </ul>
                          </div>

                          {/* Tari Africa */}
                          <div>
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-sm font-bold text-foreground">Software Engineer</h3>
                                <p className="text-xs text-cyan">Tari Africa Platforms · Nairobi, Kenya · Contract</p>
                              </div>
                              <span className="text-[10px] text-muted-foreground bg-navy-elevated px-2 py-0.5 rounded border border-navy-border">
                                Jan 2025 – Jun 2025
                              </span>
                            </div>
                            <ul className="mt-2 text-xs text-muted-foreground list-disc pl-4 space-y-1">
                              <li>Designed and managed relational databases in MySQL, supporting data entry, cleanup, and migration tasks.</li>
                              <li>Built real-time dashboards centralizing compliance and financial reporting supporting performance monitoring responsibilities.</li>
                              <li>Maintained configuration and integration documentation ensuring compliance and knowledge continuity.</li>
                            </ul>
                          </div>

                          {/* Malila Tech Consultancies */}
                          <div>
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-sm font-bold text-foreground">Freelance IT Consultant & Developer</h3>
                                <p className="text-xs text-cyan">Malila Tech Consultancies · Kenya · Full-time</p>
                              </div>
                              <span className="text-[10px] text-muted-foreground bg-navy-elevated px-2 py-0.5 rounded border border-navy-border">
                                Apr 2023 – Oct 2025
                              </span>
                            </div>
                            <ul className="mt-2 text-xs text-muted-foreground list-disc pl-4 space-y-1">
                              <li>Provided remote and on-site IT support, handling low-to-medium complexity technical issues and escalating complex incidents appropriately.</li>
                              <li>Supported SMEs in data migration from manual to digital systems, improving data accuracy and cutting processing time by up to 40%.</li>
                              <li>Advised clients on cybersecurity best practices password policies, phishing awareness, and endpoint protection.</li>
                            </ul>
                          </div>
                        </div>

                        {/* Key Projects */}
                        <section className="pt-6 border-t border-navy-border">
                          <h2 className="text-sm font-semibold tracking-widest text-cyan uppercase mb-4">
                            Key Projects
                          </h2>
                          <div className="space-y-4 text-xs text-muted-foreground">
                            <div>
                              <h3 className="font-bold text-foreground">
                                E-Foleni <span className="font-normal text-muted-foreground/80">· React · TypeScript · M-Pesa API</span>
                              </h3>
                              <p className="mt-1">Queue-free booking scheduler built for Kenyan organizations. Co-founded and engineered the platform end-to-end, integrating M-Pesa payment validation and facilitating 120,000+ bookings.</p>
                            </div>
                            <div>
                              <h3 className="font-bold text-foreground">
                                Kiwami TestCloud <span className="font-normal text-muted-foreground/80">· React · TypeScript · Vite</span>
                              </h3>
                              <p className="mt-1">Production cloud-based software testing platform. Built full frontend with real-time dashboards, secure auth flows, and API integration.</p>
                            </div>
                            <div>
                              <h3 className="font-bold text-foreground">
                                RemboGlow <span className="font-normal text-muted-foreground/80">· React · Node.js · PostgreSQL</span>
                              </h3>
                              <p className="mt-1">Beauty-tech e-commerce platform — co-founded and engineered end-to-end, including architecture design, pilot deployment, and user research iteration.</p>
                            </div>
                            <div>
                              <h3 className="font-bold text-foreground">
                                Tari Digital Nexus <span className="font-normal text-muted-foreground/80">· Node.js · PHP · MySQL · KRA eTIMS</span>
                              </h3>
                              <p className="mt-1">Full-stack platform integrating KRA eTIMS and M-Pesa for SME digital tax compliance — included data migration, dashboard build, and compliance documentation.</p>
                            </div>
                          </div>
                        </section>
                      </div>
                    </div>
                  </article>
                </div>
              </div>

              {/* Bottom Viewer Navigation Controls */}
              <div className="px-6 py-4 flex flex-wrap gap-4 items-center justify-between border-t border-white/5 bg-navy-elevated/40 backdrop-blur-sm z-10">
                {/* Zoom buttons */}
                <div className="flex items-center gap-1 bg-white/5 rounded-xl p-0.5 border border-white/5">
                  <button
                    onClick={() => setScale(s => Math.max(s - 0.1, 0.5))}
                    className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all"
                    disabled={scale <= 0.5}
                  >
                    <ZoomOut size={14} />
                  </button>
                  <span className="text-xs font-semibold px-2 min-w-[50px] text-center select-none text-muted-foreground">
                    {Math.round(scale * 100)}%
                  </span>
                  <button
                    onClick={() => setScale(s => Math.min(s + 0.1, 2.0))}
                    className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all"
                    disabled={scale >= 2.0}
                  >
                    <ZoomIn size={14} />
                  </button>
                  <button
                    onClick={fitWidth}
                    className="text-[10px] uppercase font-bold text-cyan px-2 py-1 rounded hover:bg-cyan/10 transition-all border border-cyan/20 ml-1"
                  >
                    Reset Zoom
                  </button>
                </div>

                {/* Keyboard tip */}
                <div className="hidden sm:block text-[10px] text-muted-foreground">
                  Press <kbd className="bg-white/10 px-1 py-0.5 rounded text-[9px] border border-white/10">Esc</kbd> to close · Use <kbd className="bg-white/10 px-1 py-0.5 rounded text-[9px] border border-white/10">↑ / ↓</kbd> to scroll
                </div>
              </div>
            </div>

            {/* RIGHT AREA: COLLAPSIBLE AVA CHAT DRAWER */}
            <AnimatePresence>
              {isChatOpen && (
                <motion.div
                  className="w-full md:w-80 border-t md:border-t-0 md:border-l border-white/5 h-[350px] md:h-full flex flex-col bg-navy-elevated/40 backdrop-blur-md relative overflow-hidden"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{
                    width: window.innerWidth >= 768 ? 320 : "100%",
                    opacity: 1
                  }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ type: "spring", damping: 30, stiffness: 300 }}
                >
                  {/* Chat header */}
                  <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between bg-navy-surface/50">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-cyan/10 border border-cyan/20">
                        <Bot size={16} className="text-cyan animate-pulse" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-sm tracking-wide text-foreground">
                          Ava - CV Assistant
                        </h3>
                        <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                          Online Guidance
                        </p>
                      </div>
                    </div>
                    {/* Minimize drawer */}
                    <button
                      onClick={() => setIsChatOpen(false)}
                      className="p-1 rounded hover:bg-white/5 text-muted-foreground transition-all"
                      title="Hide Chat"
                    >
                      <X size={15} />
                    </button>
                  </div>

                  {/* Chat messages viewport */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex gap-2.5 max-w-[85%] ${
                          msg.sender === "user" ? "ml-auto flex-row-reverse" : ""
                        }`}
                      >
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] shrink-0 ${
                            msg.sender === "user"
                              ? "bg-cyan text-primary-foreground font-bold"
                              : "bg-navy-border border border-white/10"
                          }`}
                        >
                          {msg.sender === "user" ? "U" : <Bot size={12} className="text-cyan" />}
                        </div>
                        <div
                          className={`p-3 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap ${
                            msg.sender === "user"
                              ? "bg-cyan/10 text-cyan border border-cyan/20 rounded-tr-none"
                              : "bg-navy-surface border border-white/5 text-muted-foreground rounded-tl-none"
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}
                    {chatLoading && (
                      <div className="flex gap-2.5 max-w-[85%]">
                        <div className="w-6 h-6 rounded-full bg-navy-border border border-white/10 flex items-center justify-center shrink-0">
                          <Bot size={12} className="text-cyan" />
                        </div>
                        <div className="p-3 bg-navy-surface border border-white/5 rounded-2xl rounded-tl-none flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan/60 animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>

                  {/* Suggestion Chips */}
                  <div className="p-3 border-t border-white/5 bg-navy/20 flex gap-2 overflow-x-auto no-scrollbar scroll-smooth">
                    {suggestionChips.map((chip, i) => (
                      <button
                        key={i}
                        onClick={() => handleSendChat(chip)}
                        disabled={chatLoading}
                        className="px-3 py-1.5 rounded-xl border border-white/5 bg-navy-surface/60 hover:bg-cyan/10 hover:border-cyan/30 text-muted-foreground hover:text-cyan text-[10px] font-medium transition-all duration-200 shrink-0 flex items-center gap-1"
                      >
                        <Sparkles size={9} />
                        {chip}
                      </button>
                    ))}
                  </div>

                  {/* Chat input form */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendChat();
                    }}
                    className="p-3 border-t border-white/5 bg-navy-elevated/40 flex items-center gap-2"
                  >
                    <input
                      type="text"
                      value={inputVal}
                      onChange={(e) => setInputVal(e.target.value)}
                      placeholder="Ask Ava about this CV..."
                      disabled={chatLoading}
                      className="flex-1 bg-navy-surface/80 border border-white/10 rounded-xl px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-cyan/60 transition-colors"
                    />
                    <button
                      type="submit"
                      disabled={chatLoading || !inputVal.trim()}
                      className="p-2 rounded-xl bg-cyan text-primary-foreground font-bold hover:opacity-90 transition-opacity disabled:opacity-40"
                    >
                      <Send size={13} />
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* FLOATING ACTION TRIGGER IF CHAT COLLAPSED */}
            <AnimatePresence>
              {!isChatOpen && (
                <motion.button
                  key="chat-trigger"
                  onClick={() => setIsChatOpen(true)}
                  className="absolute right-4 bottom-20 md:bottom-24 z-40 p-4 rounded-full bg-cyan text-primary-foreground shadow-2xl flex items-center gap-2 font-display font-bold text-xs tracking-wide hover:scale-105 active:scale-95 transition-transform"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <Cpu size={16} className="animate-spin-slow" />
                  <span>Ask Ava about this Resume</span>
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
