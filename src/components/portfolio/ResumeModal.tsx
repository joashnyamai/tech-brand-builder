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
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Search,
  Award,
  BookOpen,
  Terminal,
  Sliders,
  Calendar,
  ChevronDown,
  ChevronUp,
  Monitor,
  PlayCircle,
  User,
  TrendingUp,
  Briefcase,
  FolderGit
} from "lucide-react";
import { queryGeminiWithRetry, getMockChatResponse, RESUME_CONTEXT } from "../../pages/AiLab";
import { usePortfolioData } from "@/hooks/use-portfolio-data";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  // Load dynamic resume data from the reactive store
  const { projects, experiences, skills: skillGroups, certifications, education } = usePortfolioData();

  // Interactive CV highlighting & filtering states
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [careerFocus, setCareerFocus] = useState<"all" | "swe" | "qa" | "it">("all");
  
  // Dynamic visual parameters
  const [cvTheme, setCvTheme] = useState<"dark" | "light" | "terminal" | "minimal">("dark");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [expandedRoles, setExpandedRoles] = useState<Record<string, boolean>>({});
  
  // Count-up stats indicators
  const [projectsCount, setProjectsCount] = useState(0);
  const [yearsCount, setYearsCount] = useState(0);
  const [techCount, setTechCount] = useState(0);
  const [uptimeCount, setUptimeCount] = useState(0);

  // Easter eggs & shortcut state
  const [konamiActive, setKonamiActive] = useState(false);
  const [konamiIndex, setKonamiIndex] = useState(0);
  const [showShortcutsHelp, setShowShortcutsHelp] = useState(false);
  const [downloadToastActive, setDownloadToastActive] = useState(false);

  // Local logger helper for interactive events
  const addLog = (message: string) => {
    const timestamp = new Date().toTimeString().split(" ")[0];
    const logText = `[${timestamp} INFO] [Interactive CV] ${message}`;
    // Dispatch event to log it in n8n live console if currently open
    window.dispatchEvent(new CustomEvent("n8n-live-log", { detail: logText }));
  };

  // Viewer state
  const [scale, setScale] = useState<number>(1.0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(true);
  const [scrollPercent, setScrollPercent] = useState<number>(0);

  // Chat state
  const [messages, setMessages] = useState<Array<{ sender: "user" | "bot"; text: string }>>([
    {
      sender: "bot",
      text: "Hi, I'm Ava 👋\nI'm Malila's CV Assistant. Ask me anything about his credentials, or try clicking on any skill badge or career filter on the CV to see how it highlights relevant work experience and projects in real-time!"
    }
  ]);
  const [inputVal, setInputVal] = useState<string>("");
  const [chatLoading, setChatLoading] = useState<boolean>(false);

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Matching logic for CV highlighting
  const isExperienceMatched = (exp: any) => {
    let focusMatch = true;
    if (careerFocus === "swe") {
      focusMatch = ["Software Engineer", "Lead Engineer", "Developer", "Co-Founder"].some(r => exp.role.includes(r));
    } else if (careerFocus === "qa") {
      focusMatch = ["QA", "Quality Assurance", "Testing", "Annotator", "Attaché"].some(r => exp.role.includes(r));
    } else if (careerFocus === "it") {
      focusMatch = ["IT", "Consultant", "Network", "Support", "Attaché"].some(r => exp.role.includes(r));
    }

    let skillMatch = true;
    if (selectedSkill) {
      skillMatch = exp.tech.some((t: string) => t.toLowerCase() === selectedSkill.toLowerCase()) ||
                   exp.role.toLowerCase().includes(selectedSkill.toLowerCase()) ||
                   exp.company.toLowerCase().includes(selectedSkill.toLowerCase());
    }

    return focusMatch && skillMatch;
  };

  const isProjectMatched = (proj: any) => {
    let focusMatch = true;
    if (careerFocus === "swe") {
      focusMatch = !proj.name.toLowerCase().includes("test") && !proj.name.toLowerCase().includes("compliance");
    } else if (careerFocus === "qa") {
      focusMatch = proj.stack.some((s: string) => ["test", "qa", "cypress", "playwright", "jest"].some(k => s.toLowerCase().includes(k))) || proj.name.toLowerCase().includes("test");
    } else if (careerFocus === "it") {
      focusMatch = proj.stack.some((s: string) => ["network", "security", "infra", "cloud", "etims", "compliance"].some(k => s.toLowerCase().includes(k)));
    }

    let skillMatch = true;
    if (selectedSkill) {
      skillMatch = proj.stack.some((t: string) => t.toLowerCase() === selectedSkill.toLowerCase()) ||
                   proj.name.toLowerCase().includes(selectedSkill.toLowerCase());
    }

    return focusMatch && skillMatch;
  };

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
      const activeEl = document.activeElement;
      const isTyping = activeEl && (activeEl.tagName === "INPUT" || activeEl.tagName === "TEXTAREA");

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
      } else if (!isTyping) {
        if (e.key.toLowerCase() === "a") {
          e.preventDefault();
          setIsChatOpen(prev => !prev);
          addLog("Toggled chatbot panel via keyboard hotkey.");
        } else if (e.key.toLowerCase() === "d") {
          e.preventDefault();
          addLog("Initiated resume download file via hotkey.");
          document.getElementById("download-cv-btn")?.click();
        } else if (e.key.toLowerCase() === "t") {
          e.preventDefault();
          const themes: Array<"dark" | "light" | "terminal" | "minimal"> = ["dark", "light", "terminal", "minimal"];
          setCvTheme(curr => {
            const nextIdx = (themes.indexOf(curr) + 1) % themes.length;
            addLog(`Cycled resume visual theme to: ${themes[nextIdx].toUpperCase()} via hotkey.`);
            return themes[nextIdx];
          });
        } else if (e.key.toLowerCase() === "h") {
          e.preventDefault();
          setShowShortcutsHelp(curr => !curr);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Konami Code sequence tracker
  const konamiSequence = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
  useEffect(() => {
    if (!isOpen) return;
    const handleKonami = (e: KeyboardEvent) => {
      const key = e.key;
      const expectedKey = konamiSequence[konamiIndex];
      if (key.toLowerCase() === expectedKey.toLowerCase()) {
        if (konamiIndex + 1 === konamiSequence.length) {
          setKonamiActive(prev => !prev);
          setKonamiIndex(0);
          addLog("Matrix digital rain easter egg activated!");
        } else {
          setKonamiIndex(prev => prev + 1);
        }
      } else {
        setKonamiIndex(0);
      }
    };
    window.addEventListener("keydown", handleKonami);
    return () => window.removeEventListener("keydown", handleKonami);
  }, [isOpen, konamiIndex]);

  // Statistics Count-Up Animation
  useEffect(() => {
    if (isOpen) {
      const duration = 1500;
      const startTime = performance.now();
      let animationFrameId: number;

      const animate = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const ease = progress * (2 - progress);

        setProjectsCount(Math.floor(ease * 15));
        setYearsCount(Math.floor(ease * 3));
        setTechCount(Math.floor(ease * 25));
        setUptimeCount(parseFloat((ease * 99.9).toFixed(1)));

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animate);
        }
      };

      animationFrameId = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrameId);
    } else {
      setProjectsCount(0);
      setYearsCount(0);
      setTechCount(0);
      setUptimeCount(0);
    }
  }, [isOpen]);

  // Matrix code rain canvas effect renderer
  useEffect(() => {
    if (!konamiActive || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
    canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;

    const columns = Math.floor(canvas.width / 20);
    const yPositions = Array(columns).fill(0);

    let animationFrameId: number;

    const render = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#06b6d4"; // Cyan digital rain
      ctx.font = "12px monospace";

      for (let i = 0; i < yPositions.length; i++) {
        const char = String.fromCharCode(33 + Math.floor(Math.random() * 93));
        const x = i * 20;
        const y = yPositions[i];

        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          yPositions[i] = 0;
        } else {
          yPositions[i] = y + 15;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [konamiActive]);

  // Real-time text search high-lighting helper
  const highlightText = (text: string) => {
    if (!searchTerm.trim()) return text;
    try {
      const escapedTerm = searchTerm.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      const regex = new RegExp(`(${escapedTerm})`, "gi");
      const parts = text.split(regex);
      return parts.map((part, index) => 
        regex.test(part) ? (
          <mark key={index} className="bg-cyan/40 text-foreground font-bold rounded px-0.5 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.3)]">
            {part}
          </mark>
        ) : (
          part
        )
      );
    } catch (e) {
      return text;
    }
  };

  // Visual Theme CSS styling helpers
  const getThemeClasses = () => {
    switch (cvTheme) {
      case "light":
        return "bg-white border border-slate-200 text-slate-800 font-sans shadow-lg p-6 sm:p-12";
      case "terminal":
        return "bg-[#0b0f17]/90 border border-green-500/20 text-green-400 font-mono shadow-[0_0_25px_rgba(34,197,94,0.1)] p-6 sm:p-12";
      case "minimal":
        return "bg-[#fafaf9] border-none text-neutral-800 font-serif leading-relaxed shadow-none max-w-3xl p-6 sm:p-8";
      case "dark":
      default:
        return "bg-navy-surface/40 border border-navy-border text-foreground font-sans shadow-2xl p-6 sm:p-12";
    }
  };

  const getHeaderColor = () => {
    switch (cvTheme) {
      case "light": return "text-slate-900";
      case "terminal": return "text-green-300 font-bold uppercase tracking-wider";
      case "minimal": return "text-neutral-900 font-bold";
      case "dark":
      default: return "text-foreground";
    }
  };

  const getSubheaderColor = () => {
    switch (cvTheme) {
      case "light": return "text-cyan-700 font-semibold";
      case "terminal": return "text-amber-500 font-bold";
      case "minimal": return "text-neutral-600 italic";
      case "dark":
      default: return "text-cyan";
    }
  };

  const getBodyTextColor = () => {
    switch (cvTheme) {
      case "light": return "text-slate-600";
      case "terminal": return "text-green-400/90";
      case "minimal": return "text-neutral-700";
      case "dark":
      default: return "text-muted-foreground";
    }
  };

  const getCardClasses = (matched: boolean) => {
    const dim = (selectedSkill || careerFocus !== "all") && !matched;
    if (dim) return "opacity-15 blur-[0.3px] scale-[0.98] transition-all duration-300 pointer-events-none";

    const activeHighlight = (selectedSkill || careerFocus !== "all") && matched;
    
    switch (cvTheme) {
      case "light":
        return `p-5 rounded-2xl border transition-all duration-300 ${
          activeHighlight 
            ? "border-cyan bg-cyan-50/50 shadow-md scale-[1.01]" 
            : "border-slate-100 bg-slate-50/30 hover:border-slate-200"
        }`;
      case "terminal":
        return `p-4 rounded-lg border border-dashed transition-all duration-300 ${
          activeHighlight 
            ? "border-green-400 bg-green-950/20 shadow-[0_0_12px_rgba(34,197,94,0.2)] scale-[1.01]" 
            : "border-green-900/40 bg-black/40 hover:border-green-800/60 text-green-400"
        }`;
      case "minimal":
        return `py-4 transition-all duration-300 border-b border-neutral-100 ${
          activeHighlight 
            ? "bg-neutral-50 px-2 scale-[1.01]" 
            : "bg-transparent"
        }`;
      case "dark":
      default:
        return `p-5 rounded-2xl border transition-all duration-300 ${
          activeHighlight 
            ? "border-cyan/45 bg-cyan/5 shadow-[0_0_15px_rgba(6,182,212,0.15)] scale-[1.01]" 
            : "border-white/5 bg-navy-elevated/20 hover:border-white/10"
        }`;
    }
  };

  const getSkillBadgeClasses = (skill: string) => {
    const isSelected = selectedSkill?.toLowerCase() === skill.toLowerCase();
    
    switch (cvTheme) {
      case "light":
        return `cursor-pointer px-2 py-0.5 rounded text-[10px] font-semibold border transition-all ${
          isSelected
            ? "bg-cyan-600 border-cyan-600 text-white shadow-sm"
            : "bg-slate-100 border-slate-200 text-slate-600 hover:border-cyan hover:text-cyan-600"
        }`;
      case "terminal":
        return `cursor-pointer px-1.5 py-0.5 rounded text-[9px] font-mono border transition-all ${
          isSelected
            ? "bg-green-500/20 border-green-400 text-green-300"
            : "bg-black border-green-955 text-green-500 hover:border-green-400 hover:text-green-300"
        }`;
      case "minimal":
        return `cursor-pointer px-1 py-0.5 rounded text-[9px] font-serif transition-all ${
          isSelected
            ? "underline text-neutral-900 font-bold"
            : "text-neutral-500 hover:text-neutral-800"
        }`;
      case "dark":
      default:
        return `cursor-pointer px-2 py-0.5 rounded text-[10px] font-semibold border transition-all ${
          isSelected
            ? "bg-cyan/20 border-cyan text-cyan scale-[1.05]"
            : "bg-navy-elevated/40 border-white/5 hover:border-cyan/30 text-muted-foreground hover:text-cyan"
        }`;
    }
  };

  const getSkillCardClasses = () => {
    switch (cvTheme) {
      case "light":
        return "bg-slate-50/60 border-slate-200/60 text-slate-800 hover:border-cyan/40 shadow-sm";
      case "terminal":
        return "bg-black/30 border-green-900/40 text-green-400 hover:border-green-400/40";
      case "minimal":
        return "bg-transparent border-neutral-200 text-neutral-800 border-b";
      case "dark":
      default:
        return "bg-navy-elevated/10 border-white/5 text-muted-foreground hover:border-cyan/20";
    }
  };

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

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const totalHeight = target.scrollHeight - target.clientHeight;
    if (totalHeight > 0) {
      setScrollPercent((target.scrollTop / totalHeight) * 100);
    }
  };

  // Open print preview in new window without routing
  const handlePrint = () => {
    const printContent = document.getElementById("printable-cv");
    if (!printContent) return;
    
    const uniqueName = new Date().getTime();
    const printWindow = window.open("about:blank", uniqueName.toString(), "left=50,top=50,width=850,height=900");
    if (!printWindow) return;
    
    printWindow.document.write(`
      <html>
        <head>
          <title>Malila Nyamai - Resume</title>
          <style>
            body {
              font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
              background: white !important;
              color: #1f2937 !important;
              padding: 30px !important;
              font-size: 11px;
              line-height: 1.4;
            }
            h1, h2, h3, h4, p, span, li, a {
              color: #1f2937 !important;
            }
            .text-cyan, .text-cyan-700 { color: #0891b2 !important; }
            .text-gradient { background: none !important; -webkit-text-fill-color: initial !important; color: #111827 !important; font-size: 28px; font-weight: 800; }
            .border-navy-border, .border-white\\/5, .border-slate-200 { border-color: #e5e7eb !important; }
            .border-b { border-bottom-width: 1px !important; border-bottom-style: solid !important; }
            .border-t { border-top-width: 1px !important; border-top-style: solid !important; }
            .text-muted-foreground, .text-slate-600 { color: #4b5563 !important; }
            .text-xs { font-size: 10px !important; }
            .text-sm { font-size: 11px !important; }
            .text-lg { font-size: 14px !important; }
            .text-xl { font-size: 16px !important; }
            .font-bold { font-weight: 700 !important; }
            .font-semibold { font-weight: 600 !important; }
            .font-medium { font-weight: 500 !important; }
            .uppercase { text-transform: uppercase !important; }
            .tracking-wider { letter-spacing: 0.05em !important; }
            .tracking-widest { letter-spacing: 0.1em !important; }
            .mb-2 { margin-bottom: 6px !important; }
            .mb-3 { margin-bottom: 8px !important; }
            .mb-4 { margin-bottom: 12px !important; }
            .mb-6 { margin-bottom: 16px !important; }
            .mb-8 { margin-bottom: 20px !important; }
            .mt-1 { margin-top: 3px !important; }
            .mt-2 { margin-top: 6px !important; }
            .pb-6 { padding-bottom: 16px !important; }
            .pb-8 { padding-bottom: 20px !important; }
            .pt-8 { padding-top: 20px !important; }
            .pl-3 { padding-left: 10px !important; }
            .pl-6 { padding-left: 16px !important; }
            .pl-8 { padding-left: 20px !important; }
            .rounded { border-radius: 4px !important; }
            .rounded-xl, .rounded-2xl { border-radius: 8px !important; }
            .border { border-width: 1px !important; border-style: solid !important; border-color: #e5e7eb !important; }
            .border-l { border-left-width: 1px !important; border-left-style: solid !important; border-left-color: #e5e7eb !important; }
            .bg-navy-elevated\\/10, .bg-navy-surface\\/30, .bg-slate-50\\/60, .bg-navy-elevated\\/20 { background-color: #f9fafb !important; background: #f9fafb !important; }
            .grid { display: grid !important; }
            .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)) !important; }
            .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
            .sm\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
            @media (min-width: 600px) {
              .md\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; }
              .md\\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)) !important; }
              .md\\:col-span-1 { grid-column: span 1 / span 1 !important; }
              .md\\:col-span-2 { grid-column: span 2 / span 2 !important; }
            }
            .gap-4 { gap: 12px !important; }
            .gap-6 { gap: 16px !important; }
            .gap-8 { gap: 20px !important; }
            .flex { display: flex !important; }
            .flex-col { flex-direction: column !important; }
            .flex-wrap { flex-wrap: wrap !important; }
            .justify-between { justify-content: space-between !important; }
            .items-start { align-items: flex-start !important; }
            .items-center { align-items: center !important; }
            .space-y-1 > * + * { margin-top: 3px !important; }
            .space-y-2 > * + * { margin-top: 6px !important; }
            .space-y-4 > * + * { margin-top: 12px !important; }
            .space-y-6 > * + * { margin-top: 16px !important; }
            .space-y-8 > * + * { margin-top: 20px !important; }
            .list-disc { list-style-type: disc !important; }
            .pl-4 { padding-left: 12px !important; }
            .no-print { display: none !important; }
          </style>
        </head>
        <body>
          <div>
            ${printContent.innerHTML}
          </div>
          <script>
            setTimeout(function() {
              window.print();
              window.close();
            }, 300);
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
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
        throw new Error("No active key configured. Using Sandbox Heuristics.");
      }
    } catch (err: any) {
      console.warn("Mini-chatbot fallback triggered:", err.message);
      let mockResponse = getMockChatResponse(text);
      if (text.toLowerCase().includes("education")) {
        mockResponse = "Malila is a finalist at Zetech University completing a BSc in Information Technology (graduating Nov 2026) and holds a Diploma in Computer Software Engineering, along with Power Learn Project software development certification.";
      } else if (text.toLowerCase().includes("experience") || text.toLowerCase().includes("summarize")) {
        mockResponse = "Malila has 3+ years of technical experience in Software Engineering and QA testing. He is currently a Senior Software QA Engineer at Annex Technologies and a Software Testing Intern at Kiwami Tech Solutions.";
      } else if (text.toLowerCase().includes("rails")) {
        mockResponse = "Malila doesn't have direct Ruby on Rails projects listed, but he has worked extensively on TypeScript/React frontends and Node.js/PHP/C# backend infrastructures (e.g., E-Foleni, RemboGlow).";
      }
      setMessages(prev => [...prev, { sender: "bot", text: mockResponse }]);
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
            className="relative w-full h-full md:h-[90vh] md:max-w-6xl md:rounded-3xl border border-white/10 bg-navy-surface/30 backdrop-blur-xl shadow-2xl flex flex-col overflow-hidden"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
          >
            {/* Ubuntu Yaru Modal Title Bar */}
            <div className="w-full bg-[#2a2a2a] border-b border-[#1c1c1c] px-4 py-2.5 flex items-center justify-between select-none shrink-0 z-30">
              <span className="text-[11px] font-bold text-white/80 font-mono flex items-center gap-1.5 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E95420]" />
                PROFILE <b className="text-white/40">/</b> resume.pdf
              </span>
              <div className="window-controls flex items-center gap-2">
                {/* Ask Ava control indicator */}
                <button 
                  onClick={() => setIsChatOpen(!isChatOpen)}
                  className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase transition-all flex items-center gap-1 border ${
                    isChatOpen 
                      ? "border-[#E95420]/30 bg-[#E95420]/10 text-white" 
                      : "border-white/10 text-white/40 hover:text-white"
                  }`}
                  title="Toggle Ask Ava Copilot"
                >
                  <Cpu size={10} />
                  <span>Ask Ava</span>
                </button>
                <button className="w-2.5 h-2.5 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-[7px]" aria-label="Minimize" />
                <button className="w-2.5 h-2.5 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-[7px]" aria-label="Maximize" />
                <button 
                  onClick={onClose}
                  className="w-2.5 h-2.5 rounded-full bg-[#E95420] hover:bg-[#E95420]/80 flex items-center justify-center text-[7px] text-white" 
                  aria-label="Close" 
                />
              </div>
            </div>

            {/* Split Column Panel content */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
              {/* Scroll Indicator Progress Bar */}
              <div className="absolute top-[48px] left-0 right-0 h-0.5 bg-white/5 z-20">
                <div
                  className="h-full bg-cyan transition-all duration-75"
                  style={{ width: `${scrollPercent}%` }}
                />
              </div>

              {/* LEFT AREA: HTML CV VIEWER */}
              <div className="flex-1 flex flex-col h-full overflow-hidden border-r border-white/5 relative">
              {/* Header inside viewer */}
              <div className="px-4 sm:px-6 py-3.5 flex flex-col lg:flex-row gap-4 items-center justify-between border-b border-white/5 bg-[#0b0f19]/90 backdrop-blur-md z-20 shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan animate-pulse" />
                  <h2 className="font-display font-bold text-sm sm:text-base tracking-wide text-foreground">
                    Malila Nyamai - Curriculum Vitae
                  </h2>
                </div>

                <div className="flex items-center flex-wrap justify-center lg:justify-end gap-2 w-full lg:w-auto">
                  {/* Search inside CV */}
                  <div className="relative w-full sm:w-44 no-print mr-2">
                    <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-muted-foreground/60">
                      <Search size={11} />
                    </span>
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        addLog(`Searched CV for: "${e.target.value}"`);
                      }}
                      placeholder="Search..."
                      className="w-full bg-navy-surface/80 border border-white/10 rounded-xl pl-7 pr-7 py-1.5 text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-cyan/60 transition-colors"
                    />
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm("")}
                        className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-muted-foreground hover:text-cyan"
                      >
                        <X size={11} />
                      </button>
                    )}
                  </div>

                  {/* Actions Group */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {/* Theme */}
                    <button
                      onClick={() => {
                        const themes: Array<"dark" | "light" | "terminal" | "minimal"> = ["dark", "light", "terminal", "minimal"];
                        setCvTheme(curr => {
                          const nextIdx = (themes.indexOf(curr) + 1) % themes.length;
                          addLog(`Cycled resume theme to: ${themes[nextIdx].toUpperCase()}`);
                          return themes[nextIdx];
                        });
                      }}
                      className="p-1.5 rounded-lg border border-white/10 text-muted-foreground hover:text-cyan hover:bg-white/5 transition-all text-[11px] flex items-center gap-1"
                      title="Theme (Press T)"
                    >
                      <Terminal size={12} />
                      <span>{cvTheme.toUpperCase()}</span>
                    </button>

                    {/* Shortcuts Help */}
                    <button
                      onClick={() => setShowShortcutsHelp(curr => !curr)}
                      className="p-1.5 rounded-lg border border-white/10 text-[11px] text-muted-foreground hover:text-cyan hover:bg-white/5 transition-all"
                      title="Shortcuts Help (Press H)"
                    >
                      Help
                    </button>

                    {/* Download */}
                    <a
                      id="download-cv-btn"
                      href="/Malila_Nyamai_Resume.pdf"
                      download="Malila_Nyamai_Resume.pdf"
                      onClick={() => {
                        addLog("User downloaded resume document PDF.");
                        setDownloadToastActive(true);
                        setTimeout(() => setDownloadToastActive(false), 5000);
                      }}
                      className="p-1.5 rounded-lg border border-white/10 text-muted-foreground hover:text-cyan hover:bg-white/5 transition-all text-[11px] flex items-center gap-1"
                      title="Download PDF (Press D)"
                    >
                      <Download size={12} />
                      <span>PDF</span>
                    </a>

                    {/* Fullscreen */}
                    <button
                      onClick={toggleFullscreen}
                      className="p-1.5 rounded-lg border border-white/10 text-muted-foreground hover:text-cyan hover:bg-white/5 transition-all flex items-center justify-center"
                      title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                    >
                    </button>
                  </div>
                </div>
              </div>

              {/* Side Floating Jump indicators (Thumbnails Navigation) */}
              <div className="no-print hidden xl:flex flex-col gap-3.5 absolute left-4 top-1/4 z-30 bg-navy-surface/60 border border-white/5 p-3 rounded-2xl backdrop-blur-md shadow-2xl">
                {[
                  { id: "cv-summary", label: "About Me", icon: <User size={14} /> },
                  { id: "cv-roadmap", label: "Career Map", icon: <TrendingUp size={14} /> },
                  { id: "cv-skills", label: "Core Skills", icon: <Cpu size={14} /> },
                  { id: "cv-experience", label: "Experience", icon: <Briefcase size={14} /> },
                  { id: "cv-projects", label: "Projects", icon: <FolderGit size={14} /> },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      const el = document.getElementById(s.id);
                      el?.scrollIntoView({ behavior: "smooth", block: "center" });
                      addLog(`Sidebar navigated to section: ${s.label}`);
                    }}
                    className="w-8 h-8 rounded-xl border border-white/10 hover:border-cyan/45 hover:bg-cyan/5 text-muted-foreground hover:text-cyan transition-all flex items-center justify-center"
                    title={s.label}
                  >
                    {s.icon}
                  </button>
                ))}
              </div>

              {/* HTML CV Render Viewport */}
              <div
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="flex-1 overflow-y-auto p-4 sm:p-8 bg-navy/20 scroll-smooth relative"
              >
                <div
                  className="mx-auto origin-top transition-all duration-100 ease-out"
                  style={{ zoom: scale }}
                >
                  <article id="printable-cv" className={`relative transition-all duration-300 max-w-4xl mx-auto rounded-3xl ${getThemeClasses()}`}>
                    {/* Canvas for Matrix Code Rain Easter Egg */}
                    {konamiActive && (
                      <canvas
                        ref={canvasRef}
                        className="absolute inset-0 pointer-events-none z-0 rounded-3xl opacity-20"
                      />
                    )}

                    <div className="relative z-10">
                      {/* Header Block */}
                      <header className={`border-b ${cvTheme === "light" ? "border-slate-200" : "border-navy-border"} pb-6 mb-8`}>
                        <div className="flex flex-col gap-4">
                          <div>
                            <h1 className={`text-4xl sm:text-5xl font-black tracking-tight font-display ${getHeaderColor()} text-gradient`}>
                              Malila Nyamai
                            </h1>
                            <p className={`text-base sm:text-lg ${getSubheaderColor()} mt-1.5 tracking-wide font-medium`}>
                              Software Engineer · QA Engineer · IT Consultant
                            </p>
                          </div>

                          {/* Horizontal Contact Pills */}
                          <div className="flex flex-wrap gap-2.5 text-[11px] font-medium no-print">
                            {[
                              { icon: <Mail size={12} />, label: "jamesmnyamai9@gmail.com", href: "mailto:jamesmnyamai9@gmail.com" },
                              { icon: <Phone size={12} />, label: "+254 745 806 761", href: "tel:+254745806761" },
                              { icon: <MapPin size={12} />, label: "Nairobi, Kenya" },
                              { icon: <Linkedin size={12} />, label: "LinkedIn", href: "https://www.linkedin.com/in/malila-nyamai-0b2711221" },
                              { icon: <Github size={12} />, label: "GitHub", href: "https://github.com/joashnyamai" }
                            ].map((item, idx) => (
                              item.href ? (
                                <a
                                  key={idx}
                                  href={item.href}
                                  target={item.href.startsWith("http") ? "_blank" : undefined}
                                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full border transition-all ${
                                    cvTheme === "light"
                                      ? "bg-slate-50 border-slate-200 text-slate-600 hover:text-cyan hover:border-cyan"
                                      : "bg-navy-elevated/40 border-white/5 text-muted-foreground hover:text-cyan hover:border-cyan/30"
                                  }`}
                                >
                                  {item.icon}
                                  <span>{item.label}</span>
                                </a>
                              ) : (
                                <div
                                  key={idx}
                                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full border ${
                                    cvTheme === "light"
                                      ? "bg-slate-50 border-slate-200 text-slate-500"
                                      : "bg-navy-elevated/40 border-white/5 text-muted-foreground"
                                  }`}
                                >
                                  {item.icon}
                                  <span>{item.label}</span>
                                </div>
                              )
                            ))}
                          </div>
                          
                          {/* Print-only traditional contact list */}
                          <div className={`hidden print:flex flex-wrap gap-x-6 gap-y-1 text-xs mt-1 ${getBodyTextColor()}`}>
                            <span>Email: jamesmnyamai9@gmail.com</span>
                            <span>Phone: +254 745 806 761</span>
                            <span>Location: Nairobi, Kenya</span>
                            <span>LinkedIn: linkedin.com/in/malila-nyamai-0b2711221</span>
                            <span>GitHub: github.com/joashnyamai</span>
                          </div>
                        </div>
                      </header>

                      {/* Professional Summary */}
                      <section id="cv-summary" className="mb-8 scroll-mt-20">
                        <h2 className={`text-sm font-semibold tracking-widest uppercase mb-3 ${getSubheaderColor()}`}>
                          Professional Summary
                        </h2>
                        <p className={`text-sm sm:text-base ${getBodyTextColor()} leading-relaxed`}>
                          {highlightText("Motivated IT professional and BSc Information Technology finalist with 3+ years of hands-on experience in software development, quality assurance, IT support, cloud exposure (AWS), and digital training. Proven ability to monitor systems, document workflows, troubleshoot application issues, and support end users in fast-paced technology environments. Experienced in application testing (Jest & Postman), bug tracking (Jira), data management (MySQL, PostgreSQL), and prototyping web solutions using React, TypeScript, Node.js, and PHP. Familiar with AI/ML concepts through LangChain, RAG, and Generative AI certifications. A fast learner and collaborative team player eager to contribute to digital transformation agenda and J-Hub innovation initiatives.")}
                        </p>
                      </section>

                      {/* INTERACTIVE FILTERS TOOLBAR */}
                      <div className="no-print mb-8 bg-navy-elevated/20 border border-navy-border/60 p-5 rounded-2xl flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-xs font-bold text-foreground uppercase tracking-widest flex items-center gap-1.5">
                            <Sliders size={13} className="text-cyan animate-pulse" />
                            Filter by Specialization
                          </span>
                          <span className="text-[10px] text-muted-foreground">Isolate relevant history by category or select skills below</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {[
                            { key: "all", label: "Show All" },
                            { key: "swe", label: "💻 Software Eng" },
                            { key: "qa", label: "🛡️ QA & Testing" },
                            { key: "it", label: "📡 IT & Security" }
                          ].map((btn) => (
                            <button
                              key={btn.key}
                              onClick={() => {
                                setCareerFocus(btn.key as any);
                                addLog(`Changed career focus filter to: ${btn.label.toUpperCase()}`);
                              }}
                              className={`px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all border ${
                                careerFocus === btn.key
                                  ? "bg-cyan border-cyan text-primary-foreground shadow-[0_0_12px_rgba(6,182,212,0.3)] scale-[1.03]"
                                  : "bg-navy-surface border-navy-border text-muted-foreground hover:text-cyan hover:border-cyan/30"
                              }`}
                            >
                              {btn.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* DYNAMIC STATISTICS HIGHLIGHTS COUNTER */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 bg-navy-elevated/10 p-4 border border-navy-border/40 rounded-2xl no-print text-center">
                        {[
                          { val: `${projectsCount}+`, label: "Completed Projects" },
                          { val: `${yearsCount}+`, label: "Years Experience" },
                          { val: `${techCount}+`, label: "Technologies Mastered" },
                          { val: `${uptimeCount}%`, label: "QA Release SLA" }
                        ].map((stat, i) => (
                          <div key={i} className="flex flex-col items-center justify-center p-3 rounded-xl bg-navy-surface/30 border border-white/5 hover:border-cyan/20 transition-all duration-300">
                            <span className="text-2xl sm:text-3xl font-black text-cyan tracking-tight font-mono">{stat.val}</span>
                            <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider mt-1.5">{stat.label}</span>
                          </div>
                        ))}
                      </div>

                      {/* DYNAMIC INTERACTIVE CAREER JOURNEY ROADMAP */}
                      <div id="cv-roadmap" className="no-print mb-8 p-5 bg-navy-elevated/20 border border-navy-border/60 rounded-2xl scroll-mt-20">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-4">
                          Interactive Career Journey Map
                        </span>
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-2 relative">
                          <div className="absolute top-[28px] left-[5%] right-[5%] h-0.5 bg-navy-border -translate-y-1/2 hidden md:block z-0" />
                          {[
                            { key: "student", label: "Student Milestone", desc: "Zetech IT Degree", targetId: "cv-education" },
                            { key: "intern", label: "QA Intern", desc: "Kiwami Tech Solutions", targetId: "role-kiwami-tech-solutions-software-testing-intern" },
                            { key: "qa", label: "QA Engineer", desc: "Annex Tech Senior QA", targetId: "role-annex-technologies-limited-senior-software-quality-assurance-engineer" },
                            { key: "swe", label: "Co-Founder", desc: "RemboGlow Lead Engineer", targetId: "role-remboglow-co-founder-&-lead-engineer" },
                          ].map((milestone) => (
                            <button
                              key={milestone.key}
                              onClick={() => {
                                const el = document.getElementById(milestone.targetId);
                                if (el) {
                                  el.scrollIntoView({ behavior: "smooth", block: "center" });
                                  el.classList.add("animate-pulse");
                                  setTimeout(() => el.classList.remove("animate-pulse"), 2000);
                                  addLog(`Navigated journey step to: ${milestone.label}`);
                                }
                              }}
                              className="relative z-10 bg-navy-surface border border-navy-border hover:border-cyan hover:scale-[1.03] active:scale-95 transition-all p-3 rounded-xl flex flex-col items-center text-center w-full md:w-36 shadow-lg"
                            >
                              <div className="w-5 h-5 rounded-full bg-cyan/20 border border-cyan/40 text-cyan text-[9px] font-black flex items-center justify-center mb-1">
                                ➔
                              </div>
                              <span className="text-xs font-bold text-foreground leading-tight">{milestone.label}</span>
                              <span className="text-[9px] text-muted-foreground mt-0.5">{milestone.desc}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Interactive Active Highlight Status indicators */}
                      {selectedSkill && (
                        <div className="no-print mb-6 p-4 bg-cyan/5 border border-cyan/20 rounded-2xl flex flex-col gap-1.5 text-xs text-muted-foreground animate-fadeIn">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-foreground">Interactive Skill Context: <span className="text-cyan font-mono">[{selectedSkill}]</span></span>
                            <button
                              onClick={() => setSelectedSkill(null)}
                              className="text-[9px] uppercase font-bold text-cyan hover:opacity-80 border border-cyan/20 px-2 py-0.5 rounded bg-cyan/5"
                            >
                              Dismiss Overlay
                            </button>
                          </div>
                          <p className="text-[11px] leading-relaxed">
                            Malila Nyamai has utilized <strong>{selectedSkill}</strong> extensively across{" "}
                            <strong>
                              {projects.filter(p => p.stack.some(s => s.toLowerCase().includes(selectedSkill.toLowerCase()))).length} projects
                            </strong>{" "}
                            and mentioned it in{" "}
                            <strong>
                              {experiences.filter(e => e.tech.some(s => s.toLowerCase().includes(selectedSkill.toLowerCase()))).length} professional positions
                            </strong>.
                          </p>
                        </div>
                      )}

                            {/* TECHNICAL SKILLS SECTION (FULL-WIDTH) */}
                      <section id="cv-skills" className="mb-8 scroll-mt-20">
                        <h2 className={`text-sm font-semibold tracking-widest uppercase mb-4 pb-1.5 border-b border-navy-border/40 ${getSubheaderColor()}`}>
                          Technical Competencies & Skills
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                          {skillGroups.map((group) => (
                            <div key={group.category} className={`space-y-2.5 p-4 rounded-2xl border transition-colors duration-300 ${getSkillCardClasses()}`}>
                              <h3 className={`font-bold uppercase tracking-wider text-[10px] border-b border-navy-border/30 pb-1 flex items-center justify-between ${getHeaderColor()}`}>
                                <span>{group.category}</span>
                                <span className="text-[9px] text-muted-foreground/60 normal-case font-normal">{group.tagline}</span>
                              </h3>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {group.skills.map((skill) => {
                                  const isSelected = selectedSkill?.toLowerCase() === skill.toLowerCase();
                                  return (
                                    <span
                                      key={skill}
                                      onClick={() => {
                                        setSelectedSkill(isSelected ? null : skill);
                                        addLog(`Highlighting projects/roles requiring: ${skill}`);
                                      }}
                                      className={getSkillBadgeClasses(skill)}
                                    >
                                      {skill}
                                    </span>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                      </section>

                      {/* Two-Column Grid for Career History & Timeline / Education & Certifications */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-navy-border/30 pt-8">
                        {/* Left Main Column: Work Experience & Projects (col-span-2) */}
                        <div className="md:col-span-2 space-y-8">
                          {/* Work Experience */}
                          <section>
                            <h2 className={`text-sm font-semibold tracking-widest uppercase mb-6 pb-1.5 border-b border-navy-border/40 ${getSubheaderColor()}`}>
                              Work History & Timeline
                            </h2>

                            {/* DYNAMIC COLLAPSIBLE TIMELINE CARDS */}
                            <div id="cv-experience" className="relative pl-6 sm:pl-8 border-l border-cyan/20 space-y-6 scroll-mt-20">
                              {experiences.map((exp) => {
                                const matched = isExperienceMatched(exp);
                                const dim = (selectedSkill || careerFocus !== "all") && !matched;
                                const isExpanded = !!expandedRoles[exp.company + exp.role];
                                const cardKey = exp.company + exp.role;
                                
                                return (
                                  <div
                                    key={cardKey}
                                    id={`role-${exp.company.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${exp.role.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                                    className={`relative transition-all duration-300 ${
                                      dim ? "opacity-15 blur-[0.4px] pointer-events-none scale-[0.98]" : "opacity-100"
                                    }`}
                                  >
                                    {/* Timeline Node point indicator */}
                                    <span className="absolute -left-[31px] sm:-left-[39px] top-4 w-4 h-4 rounded-full bg-navy-surface border-2 border-cyan flex items-center justify-center z-10 shadow-sm">
                                      <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
                                    </span>

                                    <div className={getCardClasses(matched)}>
                                      <div className="flex justify-between items-start flex-wrap gap-2">
                                        <div>
                                          <h3 className={`text-sm font-bold ${getHeaderColor()}`}>{highlightText(exp.role)}</h3>
                                          <p className="text-xs text-cyan font-medium">{highlightText(exp.company)} · {highlightText(exp.location)} · {highlightText(exp.type)}</p>
                                        </div>
                                        <span className="text-[10px] text-muted-foreground bg-navy-elevated px-2 py-0.5 rounded border border-navy-border font-medium">
                                          {exp.period}
                                        </span>
                                      </div>

                                      {/* Read more collapsible button */}
                                      <div className="mt-3">
                                        <button
                                          onClick={() => {
                                            setExpandedRoles(prev => ({ ...prev, [cardKey]: !isExpanded }));
                                            addLog(`${isExpanded ? "Collapsed" : "Expanded"} details for: ${exp.role} at ${exp.company}`);
                                          }}
                                          className="text-[10px] font-bold text-cyan hover:opacity-85 flex items-center gap-1 uppercase tracking-widest"
                                        >
                                          {isExpanded ? (
                                            <>
                                              <ChevronUp size={12} />
                                              <span>Collapse Achievements</span>
                                            </>
                                          ) : (
                                            <>
                                              <ChevronDown size={12} />
                                              <span>Read Achievements & Overview</span>
                                            </>
                                          )}
                                        </button>
                                      </div>

                                      {isExpanded && (
                                        <motion.div
                                          initial={{ opacity: 0, height: 0 }}
                                          animate={{ opacity: 1, height: "auto" }}
                                          exit={{ opacity: 0, height: 0 }}
                                          transition={{ duration: 0.2 }}
                                          className="mt-3 pt-3 border-t border-navy-border/40 space-y-2.5 overflow-hidden"
                                        >
                                          <p className="text-xs text-muted-foreground leading-relaxed">
                                            {highlightText(exp.overview)}
                                          </p>
                                          <ul className="text-[11px] text-muted-foreground list-disc pl-4 space-y-1.5">
                                            {exp.highlights.map((h, i) => (
                                              <li key={i}>{highlightText(h)}</li>
                                            ))}
                                          </ul>
                                        </motion.div>
                                      )}

                                      <div className="flex flex-wrap gap-1 mt-3">
                                        {exp.tech.map((t) => (
                                          <span
                                            key={t}
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              const isSelected = selectedSkill?.toLowerCase() === t.toLowerCase();
                                              setSelectedSkill(isSelected ? null : t);
                                              addLog(`Highlighted context skills matching: ${t}`);
                                            }}
                                            className={getSkillBadgeClasses(t)}
                                          >
                                            {t}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </section>

                          {/* Key Projects */}
                          <section id="cv-projects" className="pt-6 scroll-mt-20">
                            <h2 className={`text-sm font-semibold tracking-widest uppercase mb-4 pb-1.5 border-b border-navy-border/40 ${getSubheaderColor()}`}>
                              Key Projects
                            </h2>
                            <div className="space-y-4">
                              {projects.map((proj) => {
                                const matched = isProjectMatched(proj);
                                const dim = (selectedSkill || careerFocus !== "all") && !matched;

                                return (
                                  <div key={proj.name} className={getCardClasses(matched)}>
                                    <div className="flex justify-between items-start flex-wrap gap-2">
                                      <h3 className={`font-bold text-xs ${getHeaderColor()}`}>
                                        {highlightText(proj.name)}
                                      </h3>
                                      <span className="text-[10px] text-muted-foreground bg-navy-elevated px-2 py-0.5 rounded border border-navy-border">
                                        {proj.period}
                                      </span>
                                    </div>
                                    <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{highlightText(proj.objective)}</p>
                                    <p className="mt-1.5 text-[11px] text-muted-foreground/95 bg-navy/30 p-2.5 rounded border border-navy-border/40 leading-relaxed font-medium">
                                      {highlightText(proj.summary)}
                                    </p>

                                    {/* Styled project live demo and source code actions */}
                                    <div className="flex flex-wrap gap-2 mt-3.5 no-print">
                                      {proj.url && (
                                        <a
                                          href={proj.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="px-2.5 py-1 bg-cyan text-primary-foreground font-bold rounded-lg text-[9px] hover:opacity-90 flex items-center gap-1.5 shadow-sm"
                                        >
                                          <PlayCircle size={11} />
                                          Live Demo
                                        </a>
                                      )}
                                      <a
                                        href="https://github.com/joashnyamai"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-2.5 py-1 bg-navy-surface border border-navy-border hover:border-cyan text-muted-foreground hover:text-cyan font-bold rounded-lg text-[9px] flex items-center gap-1.5"
                                      >
                                        <Github size={11} />
                                        GitHub Source
                                      </a>
                                    </div>

                                    <div className="flex flex-wrap gap-1 mt-3">
                                      {proj.stack.map((t) => (
                                        <span
                                          key={t}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            const isSelected = selectedSkill?.toLowerCase() === t.toLowerCase();
                                            setSelectedSkill(isSelected ? null : t);
                                            addLog(`Highlighted context skills matching: ${t}`);
                                          }}
                                          className={getSkillBadgeClasses(t)}
                                        >
                                          {t}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </section>
                        </div>

                        {/* Right Column: Education, Certifications & Credentials (col-span-1) */}
                        <div className="md:col-span-1 space-y-8 border-l border-navy-border/30 md:pl-6">
                          {/* Education */}
                          <section id="cv-education" className="scroll-mt-20">
                            <h2 className={`text-sm font-semibold tracking-widest uppercase mb-4 pb-1.5 border-b border-navy-border/40 ${getSubheaderColor()}`}>
                              Education
                            </h2>
                            <div className="space-y-4 text-xs text-muted-foreground">
                              {education.map((edu) => (
                                <div key={edu.degree} className={`relative pl-3 border-l ${cvTheme === "light" ? "border-slate-200" : "border-navy-border"}`}>
                                  <h3 className={`font-semibold text-[11px] leading-tight ${getHeaderColor()}`}>{highlightText(edu.degree)}</h3>
                                  <p className={`text-[11px] mt-0.5 ${getBodyTextColor()}`}>{highlightText(edu.institution)}</p>
                                  <p className="text-[9px] text-muted-foreground/75 mt-0.5">{edu.period} · {edu.status}</p>
                                </div>
                              ))}
                            </div>
                          </section>

                          {/* Certifications */}
                          <section>
                            <h2 className={`text-sm font-semibold tracking-widest uppercase mb-4 pb-1.5 border-b border-navy-border/40 ${getSubheaderColor()}`}>
                              Certifications
                            </h2>
                            <ul className="space-y-2 text-xs text-muted-foreground list-none pl-0">
                              {certifications.map((c) => {
                                const isSelected = selectedSkill?.toLowerCase() === c.category.toLowerCase() || selectedSkill?.toLowerCase() === c.name.toLowerCase();
                                return (
                                  <li
                                    key={c.name}
                                    className={`flex items-start gap-2.5 p-2 rounded-xl transition-all border ${
                                      isSelected 
                                        ? "bg-cyan/10 text-cyan border-cyan/25" 
                                        : (cvTheme === "light" 
                                            ? "bg-slate-50/60 border-slate-200/60 text-slate-700" 
                                            : "bg-navy-surface/30 border-white/5 text-muted-foreground")
                                    }`}
                                  >
                                    <span className="text-sm flex-shrink-0 mt-0.5">{c.icon}</span>
                                    <div>
                                      <p className={`font-semibold text-[11px] leading-tight ${getHeaderColor()}`}>{highlightText(c.name)}</p>
                                      <p className="text-[9px] text-muted-foreground/75 mt-1">{c.issuer} · {c.category}</p>
                                    </div>
                                  </li>
                                );
                              })}
                            </ul>
                          </section>
                        </div>
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
                <div className="hidden sm:block text-[10px] text-muted-foreground font-mono">
                  Press <kbd className="bg-white/10 px-1 py-0.5 rounded text-[9px] border border-white/10">Esc</kbd> to close · Hotkeys: <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-[9px] border border-white/10">A</kbd> chat · <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-[9px] border border-white/10">T</kbd> theme · <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-[9px] border border-white/10">D</kbd> download · <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-[9px] border border-white/10">H</kbd> cheatsheet
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

            {/* DOWNLOAD ANALYTICS CTAs TOAST */}
            <AnimatePresence>
              {downloadToastActive && (
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.9 }}
                  className="no-print fixed bottom-6 left-6 z-50 bg-[#090d16] border border-cyan/40 p-4 rounded-2xl shadow-2xl flex flex-col gap-2 max-w-sm backdrop-blur-xl text-xs text-muted-foreground"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-green-500/20 border border-green-500/35 flex items-center justify-center text-[10px] text-green-400 font-bold">✓</span>
                    <span className="font-bold text-foreground">Resume downloaded successfully!</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground/90">Want to verify the codebase of his best projects?</p>
                  <div className="flex gap-2 mt-1">
                    <button
                      onClick={() => {
                        setDownloadToastActive(false);
                        onClose();
                        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="px-3 py-1 bg-cyan text-primary-foreground text-[10px] font-bold rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Explore Live Projects
                    </button>
                    <button
                      onClick={() => setDownloadToastActive(false)}
                      className="px-2.5 py-1 border border-white/10 hover:border-white/20 text-muted-foreground hover:text-foreground text-[10px] rounded-lg transition-colors"
                    >
                      Dismiss
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* KEYBOARD SHORTCUTS HELP CHEATSHEET OVERLAY */}
            <AnimatePresence>
              {showShortcutsHelp && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-50 bg-navy/90 backdrop-blur-md flex items-center justify-center p-6"
                  onClick={() => setShowShortcutsHelp(false)}
                >
                  <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    className="bg-[#0b0f19] border border-white/10 p-6 rounded-3xl max-w-md w-full shadow-2xl text-xs text-muted-foreground space-y-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-between border-b border-white/5 pb-3">
                      <span className="font-display font-bold text-sm text-foreground flex items-center gap-1.5">
                        <Terminal size={14} className="text-cyan" />
                        Keyboard Shortcuts Cheatsheet
                      </span>
                      <button
                        onClick={() => setShowShortcutsHelp(false)}
                        className="p-1 rounded hover:bg-white/5 text-muted-foreground hover:text-foreground transition-all"
                      >
                        <X size={15} />
                      </button>
                    </div>

                    <div className="space-y-3 font-mono">
                      <div className="flex justify-between items-center">
                        <span className="text-foreground">Toggle Ava Chat Panel</span>
                        <kbd className="px-2 py-0.5 bg-white/10 border border-white/10 rounded text-[10px] text-cyan font-bold">A</kbd>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-foreground">Cycle visual style themes</span>
                        <kbd className="px-2 py-0.5 bg-white/10 border border-white/10 rounded text-[10px] text-cyan font-bold">T</kbd>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-foreground">Download precompiled PDF CV</span>
                        <kbd className="px-2 py-0.5 bg-white/10 border border-white/10 rounded text-[10px] text-cyan font-bold">D</kbd>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-foreground">Toggle shortcuts cheatsheet</span>
                        <kbd className="px-2 py-0.5 bg-white/10 border border-white/10 rounded text-[10px] text-cyan font-bold">H</kbd>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-foreground">Exit Modal / Close</span>
                        <kbd className="px-2 py-0.5 bg-white/10 border border-white/10 rounded text-[10px] text-cyan font-bold">ESC</kbd>
                      </div>
                      <div className="border-t border-white/5 pt-3 mt-1 text-[10px] text-muted-foreground/80 leading-relaxed font-sans">
                        💡 <strong>Easter Egg Challenge</strong>: Try entering the legendary <strong>Konami Code</strong> on your keyboard (<kbd className="bg-white/5 px-1 rounded">↑</kbd><kbd className="bg-white/5 px-1 rounded">↑</kbd><kbd className="bg-white/5 px-1 rounded">↓</kbd><kbd className="bg-white/5 px-1 rounded">↓</kbd><kbd className="bg-white/5 px-1 rounded">←</kbd><kbd className="bg-white/5 px-1 rounded">→</kbd><kbd className="bg-white/5 px-1 rounded">←</kbd><kbd className="bg-white/5 px-1 rounded">→</kbd><kbd className="bg-white/5 px-1 rounded">B</kbd><kbd className="bg-white/5 px-1 rounded">A</kbd>) to unlock Matrix Code Rain Mode!
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  );
}