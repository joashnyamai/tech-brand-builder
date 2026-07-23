import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, ChevronRight, Code2, Command, FileText, FolderGit2, Github, Mail, MapPin, Play, Search, Terminal, UserRound, Zap, Calendar, Briefcase, Award, Sliders } from "lucide-react";
import { usePortfolioData } from "@/hooks/use-portfolio-data";
import { Articles, Certificates, CodeExplorer, GithubActivity, Sandbox, XRay } from "@/components/portfolio/OSExtras";
import About from "@/components/portfolio/About";
import Experience from "@/components/portfolio/Experience";
import Community from "@/components/portfolio/Community";
import AiLabTeaser from "@/components/portfolio/AiLabTeaser";
import CertificationsSection from "@/components/portfolio/Certifications";
import ContactSection from "@/components/portfolio/Contact";
import ProjectsSection from "@/components/portfolio/Projects";
import MatrixRain from "@/components/portfolio/MatrixRain";

type AppName = "home" | "profile" | "career" | "education" | "community" | "ai" | "projects" | "graph" | "timeline" | "terminal" | "resume" | "contact" | "articles" | "certificates" | "code" | "sandbox";
const appList: { id: AppName; label: string; icon: typeof Bot; tone: string }[] = [
  { id: "home", label: "Ava AI", icon: Bot, tone: "bg-violet-400" }, { id: "profile", label: "Profile", icon: UserRound, tone: "bg-indigo-300" }, { id: "projects", label: "Projects", icon: FolderGit2, tone: "bg-cyan-400" },
  { id: "graph", label: "Skill Graph", icon: Zap, tone: "bg-amber-300" }, { id: "timeline", label: "Timeline", icon: Play, tone: "bg-cyan-300" }, { id: "terminal", label: "Terminal", icon: Terminal, tone: "bg-emerald-400" },
  { id: "career", label: "Career", icon: UserRound, tone: "bg-teal-300" }, { id: "education", label: "Education", icon: FileText, tone: "bg-pink-300" }, { id: "community", label: "Beyond code", icon: Zap, tone: "bg-orange-300" }, { id: "ai", label: "AI Lab", icon: Bot, tone: "bg-fuchsia-300" }, { id: "resume", label: "Resume", icon: FileText, tone: "bg-rose-400" }, { id: "contact", label: "Contact", icon: Mail, tone: "bg-blue-400" }, { id: "articles", label: "Notes", icon: FileText, tone: "bg-lime-300" }, { id: "certificates", label: "Certificates", icon: Zap, tone: "bg-pink-300" }, { id: "code", label: "Code", icon: Code2, tone: "bg-sky-300" }, { id: "sandbox", label: "Sandbox", icon: Terminal, tone: "bg-orange-300" },
];

export default function OperatingSystem({ onOpenResume }: { onOpenResume: () => void }) {
  const { projects, experiences, skills, certifications } = usePortfolioData();
  const [active, setActive] = useState<AppName>("home");
  const workspaceRef = useRef<HTMLElement>(null);
  const [palette, setPalette] = useState(false);
  const [query, setQuery] = useState("");
  const [year, setYear] = useState(2026);
  const [node, setNode] = useState("React");
  const [input, setInput] = useState("");
  const [lines, setLines] = useState(["Welcome to malila@portfolio — type help to explore."]);
  const [xray, setXray] = useState<typeof projects[number] | null>(null);
  const [showMatrix, setShowMatrix] = useState(false);
  const [time, setTime] = useState("");
  const [mobileTime, setMobileTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const dayName = days[date.getDay()];
      const monthName = months[date.getMonth()];
      const dayNum = date.getDate();
      
      let hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12;
      
      setTime(`${dayName} ${monthName} ${dayNum}  ${hours}:${minutes} ${ampm}`);
      setMobileTime(`${hours}:${minutes} ${ampm}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let idleTimer: number;

    const resetIdleTimer = () => {
      clearTimeout(idleTimer);
      // Trigger screensaver after 45 seconds of idle
      idleTimer = window.setTimeout(() => {
        setShowMatrix(true);
      }, 45000);
    };

    window.addEventListener("mousemove", resetIdleTimer);
    window.addEventListener("keydown", resetIdleTimer);
    window.addEventListener("mousedown", resetIdleTimer);

    resetIdleTimer();

    return () => {
      clearTimeout(idleTimer);
      window.removeEventListener("mousemove", resetIdleTimer);
      window.removeEventListener("keydown", resetIdleTimer);
      window.removeEventListener("mousedown", resetIdleTimer);
    };
  }, []);
  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPalette(value => !value);
      }
      if (event.key === "Escape") setPalette(false);
    };
    const handleNavigate = (e: Event) => {
      const dest = (e as CustomEvent).detail as AppName;
      if (dest) setActive(dest);
    };
    window.addEventListener("keydown", key);
    window.addEventListener("os-navigate", handleNavigate);
    return () => {
      window.removeEventListener("keydown", key);
      window.removeEventListener("os-navigate", handleNavigate);
    };
  }, []);
  const visibleProjects = useMemo(() => projects.filter(project => year >= 2025 || project.name === "E-Foleni"), [projects, year]);
  const run = () => {
    const command = input.trim().toLowerCase();
    if (command === "matrix") {
      setShowMatrix(true);
      setInput("");
      return;
    }
    const actions: Record<string, AppName> = { profile: "profile", about: "profile", projects: "projects", skills: "graph", graph: "graph", timeline: "timeline", career: "career", experience: "career", education: "education", community: "community", "beyond-code": "community", ai: "ai", "ai-lab": "ai", code: "code", sandbox: "sandbox", certificates: "certificates", resume: "resume", cv: "resume", contact: "contact" };
    if (actions[command]) setActive(actions[command]);
    if (command === "resume" || command === "cv") onOpenResume();
    setLines(current => command === "clear" ? [] : [...current, `malila@os:~$ ${input}`, command === "help" ? "profile · projects · graph · timeline · career · education · community · ai-lab · code · sandbox · resume · contact · matrix · clear" : actions[command] ? `Opening ${command}…` : "Command not found. Type help."]);
    setInput("");
  };
  const related = projects.filter(project => project.stack.some(stack => stack.toLowerCase().includes(node.toLowerCase()) || node.toLowerCase().includes(stack.toLowerCase())));
  return (
    <>
      <main className="os-shell min-h-screen md:overflow-hidden text-white selection:bg-violet-300 selection:text-slate-950 pl-0 pt-6 pb-6 md:pb-24 bg-[#0a0c16]">
        <div className="ambient ambient-one" />
        <div className="ambient ambient-two" />
        
        {/* iOS Status Bar */}
        <nav className="fixed top-0 left-0 right-0 h-6 px-6 bg-transparent flex items-center justify-between z-50 text-[11px] font-semibold text-white/90 select-none md:hidden">
          <span>{mobileTime}</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px]">📶</span>
            <span className="text-[9px] font-mono">5G</span>
            <span className="text-[10px]">🔋</span>
          </div>
        </nav>

        {/* macOS Menu Bar */}
        <nav className="fixed top-0 left-0 right-0 h-6 bg-[#161616]/75 border-b border-white/5 backdrop-blur-md flex items-center justify-between px-4 z-50 text-[11px] font-medium text-white/95 select-none shadow-sm font-sans max-md:hidden">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-md bg-cyan bg-opacity-15 border border-cyan border-opacity-30 flex items-center justify-center text-[10px] text-cyan font-black font-mono shadow-sm">M</span>
            <span className="font-extrabold cursor-pointer tracking-tight text-white">MalilaOS</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline opacity-75">100% [🔋]</span>
            <span className="opacity-75">📶</span>
            <button 
              onClick={() => setPalette(true)}
              className="opacity-75 hover:opacity-100 transition-opacity flex items-center"
              title="Search (⌘K)"
            >
              🔍
            </button>
            <span className="font-mono opacity-90">{time}</span>
          </div>
        </nav>

        {/* macOS Centered Floating Dock */}
        <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 w-max max-w-[95vw] h-14 bg-slate-900/60 backdrop-blur-xl border border-white/10 flex items-center px-4 gap-4 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.5)] z-40 select-none overflow-x-auto max-md:hidden">
          {appList.map((app) => {
            const Icon = app.icon;
            const isActive = active === app.id;
            return (
              <button
                key={app.id}
                onClick={() => setActive(app.id)}
                className="relative flex flex-col items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 hover:scale-110 group text-white/70 hover:text-white shrink-0 cursor-pointer"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 border border-white/10 shadow-sm group-hover:bg-white/10 transition-colors">
                  <Icon size={16} />
                </div>
                {/* Tooltip on hover (Hidden on mobile) */}
                <span className="absolute bottom-12 px-2 py-0.5 rounded bg-[#1c1c1f] text-[9px] text-white font-sans opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-150 pointer-events-none shadow-md border border-white/5 whitespace-nowrap z-50 max-md:hidden">
                  {app.label}
                </span>
                {/* Active indicator dot */}
                {isActive && (
                  <span className="absolute bottom-0.5 w-1 h-1 rounded-full bg-white shadow-[0_0_5px_#fff]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* iOS Home Indicator Bar */}
        <div className="fixed bottom-2 left-1/2 -translate-x-1/2 w-36 h-1 rounded-full bg-white/35 z-50 pointer-events-none md:hidden" />

        {/* Workspace content container */}
        <section ref={workspaceRef} className="relative w-full h-[calc(100vh_-_48px)] md:h-[calc(100vh_-_120px)] overflow-y-auto flex flex-col p-4 md:p-6 select-none md:justify-center justify-start">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="flex-1 relative overflow-hidden flex flex-col justify-center max-w-[1400px] mx-auto w-full"
              initial={{ opacity: 0, scale: 0.94, y: 15, filter: "blur(6px)" }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.94, y: -10, filter: "blur(6px)" }}
              transition={{ type: "spring", stiffness: 240, damping: 24 }}
            >

              {active === "home" && <Home setActive={setActive} onOpenResume={onOpenResume} />}
              {active === "profile" && <Window eyebrow="PROFILE" title="professional summary" onClose={() => setActive("home")}><About isOs={true} /></Window>}
              {active === "projects" && <Window eyebrow="ARCHIVE" title="selected projects" onClose={() => setActive("home")}><ProjectsSection isOs={true} /></Window>}
              {active === "graph" && <Graph node={node} setNode={setNode} related={related} experiences={experiences.filter(experience => Number(experience.period.match(/20\d{2}/)?.[0] || 2026) <= year).length} skills={skills.filter((_, index) => year >= 2022 + Math.min(index, 3)).length} onClose={() => setActive("home")} />}
              {active === "timeline" && <TimelineExplorer year={year} setYear={setYear} projects={projects} experiences={experiences} skills={skills} onClose={() => setActive("home")} />}
              {active === "terminal" && <TerminalApp lines={lines} input={input} setInput={setInput} run={run} onClose={() => setActive("home")} />}
              {active === "resume" && <Resume open={onOpenResume} onClose={() => setActive("home")} />}
              {active === "contact" && <Window eyebrow="CHANNEL" title="contact" onClose={() => setActive("home")}><ContactSection onViewResume={onOpenResume} isOs={true} /></Window>}
              {active === "career" && <Window eyebrow="CAREER" title="professional background" onClose={() => setActive("home")}><Experience isOs={true} /></Window>}
              {active === "education" && <Window eyebrow="EDUCATION" title="education & credentials" onClose={() => setActive("home")}><CertificationsSection isOs={true} /></Window>}
              {active === "community" && <Window eyebrow="BEYOND CODE" title="community & leadership" onClose={() => setActive("home")}><Community isOs={true} /></Window>}
              {active === "ai" && <Window eyebrow="AVA" title="AI lab" onClose={() => setActive("home")}><AiLabTeaser isOs={true} /></Window>}
              {active === "articles" && <Window eyebrow="BUILD IN PUBLIC" title="technical notes" onClose={() => setActive("home")}><Articles /></Window>}
              {active === "certificates" && <Window eyebrow="VERIFIED" title="certificates" onClose={() => setActive("home")}><CertificationsSection isOs={true} /></Window>}
              {active === "code" && <Window eyebrow="EXPLORER" title="components" onClose={() => setActive("home")}><CodeExplorer /></Window>}
              {active === "sandbox" && <Window eyebrow="LIVE" title="coding sandbox" onClose={() => setActive("home")}><Sandbox /></Window>}
            </motion.div>
          </AnimatePresence>

          {/* Floating Time Machine Slider */}
          <div className="fixed right-6 bottom-6 z-40 max-md:hidden">
            <Timeline year={year} setYear={setYear} onExplore={() => setActive("timeline")} />
          </div>
        </section>

        {/* Palette / Command Palette Overlay */}
        <AnimatePresence>
          {palette && (
            <Palette
              query={query}
              setQuery={setQuery}
              close={() => setPalette(false)}
              setActive={setActive}
              projects={projects}
              skills={skills.flatMap((group) => group.skills)}
              experiences={experiences.map((experience) => experience.role)}
            />
          )}
        </AnimatePresence>
        <XRay project={xray} close={() => setXray(null)} />
      </main>
      {showMatrix && <MatrixRain onClose={() => setShowMatrix(false)} />}
    </>
  );
}

function Window({ eyebrow, title, children, onClose }: { eyebrow:string; title:string; children:React.ReactNode; onClose?:()=>void }) {
  return (
    <section className="os-window bg-[#12131e]/85 border border-white/10 rounded-xl shadow-2xl backdrop-blur-md overflow-hidden flex flex-col h-full relative max-md:fixed max-md:inset-x-0 max-md:bottom-0 max-md:h-[85vh] max-md:bg-[#12131e]/95 max-md:border-t max-md:border-white/10 max-md:rounded-t-[24px] max-md:z-40">
      {/* iOS Drag Handle Bar (Mobile Only) */}
      <div className="w-9 h-1 rounded-full bg-white/20 mx-auto mt-3 mb-1 shrink-0 md:hidden" />

      <div className="window-bar bg-[#1e1e1e] border-b border-black/30 px-4 py-2.5 flex items-center justify-between select-none relative max-md:bg-transparent max-md:border-b-0 max-md:px-5 max-md:py-2">
        {/* macOS Traffic Lights on the Left (Desktop Only) */}
        <div className="flex items-center gap-1.5 shrink-0 z-10 group/controls max-md:hidden">
          <button 
            onClick={onClose}
            className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] hover:bg-[#FF5F56]/80 flex items-center justify-center text-[6px] text-[#4c0000] font-bold select-none cursor-pointer" 
            aria-label="Close"
          >
            <span className="opacity-0 group-hover/controls:opacity-100 transition-opacity">×</span>
          </button>
          <button className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] hover:bg-[#FFBD2E]/80 flex items-center justify-center text-[6px] text-[#5c3e00] font-bold select-none cursor-default" aria-label="Minimize">
            <span className="opacity-0 group-hover/controls:opacity-100 transition-opacity">-</span>
          </button>
          <button className="w-2.5 h-2.5 rounded-full bg-[#27C93F] hover:bg-[#27C93F]/80 flex items-center justify-center text-[5px] text-[#004d00] font-bold select-none cursor-default" aria-label="Maximize">
            <span className="opacity-0 group-hover/controls:opacity-100 transition-opacity">+</span>
          </button>
        </div>

        {/* iOS Left-aligned eyebrow category (Mobile Only) */}
        <span className="text-xs font-mono uppercase tracking-wider text-white/50 md:hidden shrink-0">
          {eyebrow}
        </span>
        
        {/* Centered Title (Desktop: center, Mobile: center) */}
        <span className="text-[10px] font-bold text-white/80 font-mono tracking-wide uppercase absolute left-1/2 -translate-x-1/2 flex items-center gap-1 max-md:text-sm max-md:font-bold max-md:text-white max-md:max-w-[45%] max-md:truncate">
          <span className="max-md:hidden">{eyebrow} <b className="text-white/30">/</b></span> {title}
        </span>

        {/* macOS spacer on the right on Desktop, iOS "Done" button on Mobile */}
        <div className="shrink-0 z-10">
          <button 
            onClick={onClose} 
            className="md:hidden text-cyan text-sm font-semibold hover:opacity-80 cursor-pointer"
          >
            Done
          </button>
          <div className="max-md:hidden w-12 h-2.5" />
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-y-auto max-md:p-4 max-md:pb-24">
        {children}
      </div>
    </section>
  );
}
function Home({
  setActive,
  onOpenResume
}: {
  setActive: (app: AppName) => void;
  onOpenResume: () => void;
}) {
  const iosApps = [
    { id: "profile", label: "Profile", icon: UserRound, color: "bg-blue-500" },
    { id: "projects", label: "Projects", icon: FolderGit2, color: "bg-emerald-500" },
    { id: "graph", label: "Skills", icon: Zap, color: "bg-amber-500" },
    { id: "timeline", label: "Roadmap", icon: Calendar, color: "bg-indigo-500" },
    { id: "terminal", label: "Terminal", icon: Terminal, color: "bg-zinc-800" },
    { id: "resume", label: "Resume", icon: Briefcase, color: "bg-red-500" },
    { id: "ai", label: "Ava Guide", icon: Bot, color: "bg-violet-600" },
    { id: "certificates", label: "Verify", icon: Award, color: "bg-teal-500" },
    { id: "sandbox", label: "Sandbox", icon: Sliders, color: "bg-orange-500" },
    { id: "contact", label: "Contact", icon: Mail, color: "bg-sky-600" }
  ];

  return (
    <>
      {/* Mobile iOS Home Screen Layout */}
      <div className="md:hidden flex flex-col h-full w-full max-w-md mx-auto select-none pt-4">
        {/* iOS Clock/Welcome Widget */}
        <div className="bg-white/5 border border-white/10 rounded-[24px] p-5 backdrop-blur-md mb-6 space-y-4 shadow-xl">
          <div className="flex justify-between items-center pb-2 border-b border-white/5">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
              <span className="text-[11px] font-bold font-mono text-cyan tracking-wider">MALILA WIDGET</span>
            </div>
            <span className="text-[9px] font-mono text-white/35">iOS 17</span>
          </div>
          <div className="flex gap-4 items-center">
            <img src="/profile.jpg" alt="Malila Nyamai" className="w-12 h-12 rounded-full border border-cyan/30 shadow-md" />
            <div>
              <h3 className="text-sm font-black text-white font-mono">Malila Nyamai</h3>
              <p className="text-[11px] text-white/50">Full-Stack QA & Product Engineer</p>
            </div>
          </div>
          <p className="text-[11px] text-white/60 leading-relaxed font-sans pt-1">
            Tap any app icon below to explore my workspace, run terminal commands, view interactive credentials, or chat with Ava!
          </p>
        </div>

        {/* iOS App Screen Grid */}
        <div className="grid grid-cols-4 gap-y-7 gap-x-2 px-1">
          {iosApps.map((app) => {
            const Icon = app.icon;
            return (
              <button
                key={app.id}
                onClick={() => {
                  if (app.id === "resume") {
                    setActive("resume");
                    onOpenResume();
                  } else {
                    setActive(app.id as AppName);
                  }
                }}
                className="flex flex-col items-center group cursor-pointer animate-none"
              >
                <div className={`w-14 h-14 rounded-2xl ${app.color} flex items-center justify-center shadow-lg transform active:scale-90 transition-transform`}>
                  <Icon size={24} className="text-white" />
                </div>
                <span className="text-[10px] text-white/80 font-sans text-center mt-1.5 truncate max-w-full font-medium tracking-tight">
                  {app.label}
                </span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Desktop macOS Dashboard Layout */}
      <div className="max-md:hidden grid h-full gap-4 lg:grid-cols-[1.4fr_.8fr] relative">
        {/* Vertical Laser Scan Divider (Top to Bottom) */}
        <div className="absolute left-[62.5%] top-0 bottom-0 w-[1px] bg-white/5 overflow-hidden max-lg:hidden pointer-events-none z-20">
          <motion.div 
            className="w-full h-32 bg-gradient-to-b from-transparent via-cyan to-transparent"
            animate={{ y: ["-128px", "720px"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />
        </div>
      {/* Welcome Card */}
      <Window eyebrow="HOME" title="welcome">
        <div className="p-8 md:p-10 flex flex-col justify-between h-full min-h-[480px]">
          <div className="space-y-6">
            {/* Header info */}
            <div className="flex items-center gap-4">
              <img src="/profile.jpg" alt="Malila Nyamai" className="w-14 h-14 rounded-full border-2 border-cyan/30 shadow-[0_0_10px_rgba(6,182,212,0.15)]" />
              <div>
                <h2 className="text-sm font-black font-mono tracking-wider text-cyan">MALILA NYAMAI</h2>
                <p className="text-xs text-white/45 font-mono">Full-Stack & QA Engineer</p>
              </div>
            </div>

            {/* Main Hero Title */}
            <h1 className="font-display font-black text-2xl sm:text-4xl leading-tight tracking-tight text-white">
              I build systems <br />
              people <span className="text-cyan font-serif italic drop-shadow-[0_0_6px_rgba(6,182,212,0.2)]">love</span> to use.
            </h1>

            {/* Tagline description */}
            <p className="max-w-xl text-xs md:text-sm leading-relaxed text-white/55">
              Over 3 years of experience crafting secure React/Node frameworks, automated test suites (Selenium/Postman), and reliable product architectures.
            </p>

            {/* CTA Actions */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button 
                onClick={() => setActive("projects")} 
                className="px-5 py-2.5 rounded-xl bg-cyan hover:bg-cyan/90 text-slate-950 text-xs font-bold transition-all duration-200 shadow-lg shadow-cyan/10 flex items-center gap-1.5 cursor-pointer animate-pulse"
              >
                Explore work <ChevronRight size={14} />
              </button>
              <button 
                onClick={() => { setActive("resume"); onOpenResume(); }} 
                className="px-5 py-2.5 rounded-xl border border-white/10 hover:border-cyan/30 hover:bg-cyan/5 text-white/85 text-xs font-bold transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
              >
                View resume 📄
              </button>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-6 mt-8">
            <button onClick={() => setActive("projects")} className="text-left group cursor-pointer">
              <span className="text-[9px] text-white/35 font-mono uppercase tracking-wider block">Shipped Work</span>
              <b className="text-lg font-bold text-foreground group-hover:text-cyan transition-colors">06+ Projects ➔</b>
            </button>
            <button onClick={() => setActive("career")} className="text-left group cursor-pointer">
              <span className="text-[9px] text-white/35 font-mono uppercase tracking-wider block">Experience</span>
              <b className="text-lg font-bold text-foreground group-hover:text-cyan transition-colors">03 Roles ➔</b>
            </button>
            <button 
              onClick={() => {
                setActive("projects");
                setTimeout(() => {
                  document.getElementById("github-pulse")?.scrollIntoView({ behavior: "smooth" });
                }, 120);
              }}
              className="text-left group cursor-pointer"
            >
              <span className="text-[9px] text-white/35 font-mono uppercase tracking-wider block">GitHub Sync</span>
              <b className="text-lg font-bold text-foreground group-hover:text-cyan transition-colors">Active Sync ➔</b>
            </button>
          </div>
        </div>
      </Window>

      {/* Sidebar Cards */}
      <div className="grid gap-4">
        {/* Onboarding Tour Mode Selection */}
        <Window eyebrow="AVA" title="onboarding tour">
          <div className="p-5 space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
                <p className="text-sm font-semibold">Customize your visit</p>
              </div>
              <p className="text-[11px] text-white/45 mt-1 leading-relaxed">Shape the interface based on your goals:</p>
            </div>

            <div className="space-y-2">
              <button 
                onClick={() => { setActive("resume"); onOpenResume(); }}
                className="w-full text-left p-3 rounded-xl border border-white/5 bg-[#070b13]/40 hover:bg-cyan/5 hover:border-cyan/35 group transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground group-hover:text-cyan transition-colors">
                    🎯 Recruiter Mode
                  </span>
                  <ChevronRight size={14} className="text-white/35 group-hover:text-cyan transition-colors" />
                </div>
                <p className="text-[10px] text-white/45 mt-1 leading-normal">Open verified resume, automated testing milestones, and download CV.</p>
              </button>

              <button 
                onClick={() => setActive("projects")}
                className="w-full text-left p-3 rounded-xl border border-white/5 bg-[#070b13]/40 hover:bg-cyan/5 hover:border-cyan/35 group transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground group-hover:text-cyan transition-colors">
                    🚀 Client Mode
                  </span>
                  <ChevronRight size={14} className="text-white/35 group-hover:text-cyan transition-colors" />
                </div>
                <p className="text-[10px] text-white/45 mt-1 leading-normal">Explore full-stack product architectures, case studies, and live builds.</p>
              </button>

              <button 
                onClick={() => setActive("graph")}
                className="w-full text-left p-3 rounded-xl border border-white/5 bg-[#070b13]/40 hover:bg-cyan/5 hover:border-cyan/35 group transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground group-hover:text-cyan transition-colors">
                    ⚙️ Developer Mode
                  </span>
                  <ChevronRight size={14} className="text-white/35 group-hover:text-cyan transition-colors" />
                </div>
                <p className="text-[10px] text-white/45 mt-1 leading-normal">Audit dependency structure, system models, and interactive skills network.</p>
              </button>
            </div>
          </div>
        </Window>

        {/* Live Activity Window */}
        <Window eyebrow="NOW" title="live activity">
          <div className="p-5">
            <div className="flex items-center gap-2 text-sm text-emerald-300"><span className="pulse-dot" /> BUILDING IN PUBLIC</div>
            <h3 className="mt-4 text-base font-semibold">E-commerce experience</h3>
            <p className="mt-1 text-xs text-white/50">Refining product flows and resilient checkout experiences.</p>
            <div className="mt-4">
              <GithubActivity />
            </div>
          </div>
        </Window>
      </div>
    </div>
    </>
  );
}
function LegacyProjects({projects,openXray}:{projects:ReturnType<typeof usePortfolioData>["projects"];openXray:(project:ReturnType<typeof usePortfolioData>["projects"][number])=>void}) { return <Window eyebrow="ARCHIVE" title="selected projects"><div className="flex items-end justify-between p-7"><div><div className="eyebrow"><span/> PROJECT ARCHIVE</div><h2 className="mt-3 text-3xl font-semibold">Work with intention.</h2></div><Pill>{projects.length} visible</Pill></div><div className="grid gap-3 border-t border-white/10 p-5 md:grid-cols-3">{projects.slice(0,6).map((project,index)=><article className="project-card" key={project.name}><div className={`project-visual ${["violet","cyan","orange"][index%3]}`}><span>0{index+1}</span><Code2 size={26}/></div><div className="p-5"><p className="text-xs text-white/45">{project.period}</p><h3 className="mt-2 text-xl font-semibold">{project.name}</h3><p className="mt-3 text-sm leading-6 text-white/50">{project.objective}</p><div className="mt-5 flex flex-wrap gap-2">{project.stack.slice(0,3).map(item=><Pill key={item}>{item}</Pill>)}</div><button onClick={()=>openXray(project)} className="mt-6 flex items-center gap-1 text-sm text-violet-300">Open X-Ray <ChevronRight size={15}/></button></div></article>)}</div></Window> }
function Graph({
  node,
  setNode,
  related,
  experiences,
  skills,
  onClose
}: {
  node: string;
  setNode: (value: string) => void;
  related: ReturnType<typeof usePortfolioData>["projects"];
  experiences: number;
  skills: number;
  onClose?: () => void;
}) {
  const [filter, setFilter] = useState<"all" | "frontend" | "backend" | "qa" | "cloud_ai">("all");

  const skillNodes = [
    { name: "React", category: "frontend", level: 95, years: 3, description: "Component state logic, custom React hooks, Framer Motion transitions, and performance optimizations.", connections: ["TypeScript", "Next.js", "Tailwind CSS"], icon: "⚛️" },
    { name: "TypeScript", category: "frontend", level: 90, years: 2, description: "Design of type-safe data interfaces, payload schemas, and robust class structures.", connections: ["React", "Node.js"], icon: "📘" },
    { name: "Next.js", category: "frontend", level: 85, years: 2, description: "Server-side rendering, path loaders, SEO headings meta, and static generation builds.", connections: ["React", "TypeScript"], icon: "▲" },
    { name: "Tailwind CSS", category: "frontend", level: 95, years: 3, description: "Premium styling layout structures, CSS variables tokens, theme switches, and mobile grids.", connections: ["React", "Next.js"], icon: "🎨" },

    { name: "Node.js", category: "backend", level: 90, years: 3, description: "Asynchronous APIs, security checks, Express servers, and token-aware routes.", connections: ["TypeScript", "PostgreSQL", "REST APIs"], icon: "🟢" },
    { name: "Ruby on Rails", category: "backend", level: 80, years: 2, description: "MVC architecture, relational database mapping (ActiveRecord), and secure payment API flows.", connections: ["PostgreSQL", "REST APIs"], icon: "💎" },
    { name: "PostgreSQL", category: "backend", level: 85, years: 3, description: "Relational database schema modeling, performance indexes, and query optimizations.", connections: ["Node.js", "Ruby on Rails"], icon: "🐘" },
    { name: "REST APIs", category: "backend", level: 95, years: 3, description: "Secure route boundaries, token authorizations (JWT), and automated integration hooks.", connections: ["Node.js", "PostgreSQL"], icon: "🔌" },

    { name: "QA Testing", category: "qa", level: 95, years: 3, description: "End-to-end user flow scripts, API test validations, regression checks, and defects tracking.", connections: ["Selenium", "Postman", "Jest"], icon: "🛡️" },
    { name: "Selenium", category: "qa", level: 85, years: 2, description: "Automated browser testing scripts, execution assertion logs, and regression sweeps.", connections: ["QA Testing", "Jest"], icon: "🤖" },
    { name: "Postman", category: "qa", level: 90, years: 3, description: "Secure endpoint payload validation sweeps, query parameters assertion checks.", connections: ["REST APIs", "QA Testing"], icon: "🚀" },
    { name: "Jest", category: "qa", level: 85, years: 2, description: "Unit test coverage audits, code coverage reporting, and module mocking loops.", connections: ["React", "QA Testing"], icon: "🃏" },

    { name: "AWS Cloud", category: "cloud_ai", level: 80, years: 2, description: "Virtual servers provisioning, secure IAM credential blocks, and S3 file bucket assets hosting.", connections: ["Docker", "Gemini AI"], icon: "☁️" },
    { name: "Docker", category: "cloud_ai", level: 80, years: 2, description: "Isolated build containers, multi-stage microservices orchestration, and runtime stability.", connections: ["AWS Cloud"], icon: "🐳" },
    { name: "LangChain & RAG", category: "cloud_ai", level: 85, years: 1.5, description: "Contextual large language model query routing, document index parsing, and semantic memory vectors.", connections: ["Gemini AI", "Node.js"], icon: "🧠" },
    { name: "Gemini AI", category: "cloud_ai", level: 90, years: 1.5, description: "Creative LLM query refinement, structured model outputs, and chat history feedback chains.", connections: ["LangChain & RAG", "React"], icon: "✨" }
  ];

  // If selected node is not in our list, default to "React"
  const activeNode = skillNodes.find(n => n.name.toLowerCase() === node.toLowerCase()) || skillNodes[0];

  const filteredNodes = filter === "all" ? skillNodes : skillNodes.filter(n => n.category === filter);

  return (
    <Window eyebrow="HUD" title="knowledge & skills graph" onClose={onClose}>
      <div className="grid lg:grid-cols-[1.3fr_.7fr] min-h-[480px]">
        {/* Left Side: Interactive Node Matrix */}
        <div className="p-5 flex flex-col justify-between border-r border-white/5 bg-[#05080e]/40">
          <div className="space-y-4">
            {/* Category tabs */}
            <div className="flex flex-wrap gap-1.5 pb-3 border-b border-white/5">
              {[
                { id: "all", label: "All Nodes" },
                { id: "frontend", label: "Frontend" },
                { id: "backend", label: "Backend" },
                { id: "qa", label: "QA & Testing" },
                { id: "cloud_ai", label: "Cloud & AI" }
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setFilter(t.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-all cursor-pointer ${
                    filter === t.id
                      ? "bg-cyan border-cyan text-primary-foreground font-semibold"
                      : "bg-[#0c1221] border-white/10 text-muted-foreground hover:text-cyan hover:border-cyan/30"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Glowing nodes grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {filteredNodes.map(item => {
                const isSelected = activeNode.name === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => setNode(item.name)}
                    className={`relative p-3.5 rounded-xl border text-left transition-all duration-300 group cursor-pointer ${
                      isSelected
                        ? "bg-cyan/10 border-cyan text-cyan shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                        : "bg-[#070b13] border-white/5 text-muted-foreground hover:border-white/20 hover:text-foreground"
                    }`}
                  >
                    {/* Cybernetic Corner Decorators */}
                    {isSelected && (
                      <>
                        <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-cyan rounded-tl" />
                        <span className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-cyan rounded-tr" />
                        <span className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-cyan rounded-bl" />
                        <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-cyan rounded-br" />
                      </>
                    )}
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{item.icon}</span>
                      <span className="text-xs font-bold font-mono tracking-tight">{item.name}</span>
                    </div>
                    <div className="mt-2.5 flex justify-between items-center text-[9px] font-bold text-white/35">
                      <span>Lvl {item.level}%</span>
                      <span>{item.years}y Exp</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive mapping canvas status */}
          <div className="mt-6 p-3 rounded-lg bg-navy-elevated/40 border border-white/5 flex items-center justify-between text-[10px] text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
              <span>Click a node to map related career paths and project contexts.</span>
            </div>
            <span className="font-mono text-cyan bg-cyan/5 px-2 py-0.5 rounded border border-cyan/20">{filteredNodes.length} Nodes</span>
          </div>
        </div>

        {/* Right Side: Sci-Fi HUD Details Panel */}
        <aside className="graph-panel p-5 bg-[#070b13]/60 flex flex-col justify-between max-h-[75vh] overflow-y-auto">
          <div className="space-y-5">
            {/* Header info */}
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{activeNode.icon}</span>
                <div>
                  <h3 className="font-display font-black text-lg text-foreground tracking-tight">{activeNode.name}</h3>
                  <span className="text-[9px] uppercase tracking-wider text-cyan font-bold font-mono">{activeNode.category.replace("_", " ")}</span>
                </div>
              </div>
            </div>

            {/* Circular Mastery Dial HUD */}
            <div className="flex items-center gap-5 p-3 rounded-xl bg-navy-elevated/20 border border-white/5">
              <div className="relative w-12 h-12 flex items-center justify-center flex-shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-white/5"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-cyan transition-all duration-500"
                    strokeDasharray={`${activeNode.level}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute text-[9px] font-black font-mono text-foreground">{activeNode.level}%</span>
              </div>
              <div className="text-[10px] space-y-0.5">
                <div className="font-bold text-muted-foreground">Expert Mastery</div>
                <div className="text-white/35 font-mono">{activeNode.years} Years Applied Work</div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <span className="text-[9px] font-bold text-white/35 uppercase tracking-widest block font-mono">Application Details</span>
              <p className="text-xs text-muted-foreground leading-relaxed">{activeNode.description}</p>
            </div>

            {/* Connected Nodes */}
            <div className="space-y-2">
              <span className="text-[9px] font-bold text-white/35 uppercase tracking-widest block font-mono">Related Tool Connections</span>
              <div className="flex flex-wrap gap-1.5">
                {activeNode.connections.map(c => (
                  <button
                    key={c}
                    onClick={() => setNode(c)}
                    className="px-2 py-1 rounded bg-[#070b13] border border-white/5 text-[9px] text-cyan hover:border-cyan/20 transition-all font-mono cursor-pointer"
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Filtered Project Contexts */}
            <div className="space-y-2.5 pt-3 border-t border-white/5">
              <span className="text-[9px] font-bold text-white/35 uppercase tracking-widest block font-mono">Connected Projects</span>
              <div className="space-y-2">
                {related.length > 0 ? (
                  related.slice(0, 2).map(project => (
                    <div key={project.name} className="p-2.5 rounded-lg bg-[#070b13]/40 border border-white/5 text-left text-[10px]">
                      <div className="font-bold text-foreground flex items-center justify-between">
                        <span>{project.name}</span>
                        <span className="text-[8px] text-cyan font-mono">{project.period}</span>
                      </div>
                      <p className="text-[9px] text-muted-foreground mt-1 leading-relaxed">{project.objective}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-3 text-[9px] text-muted-foreground italic bg-navy-elevated/10 rounded-lg border border-white/5">
                    No active projects filtered for {activeNode.name}.
                  </div>
                )}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </Window>
  );
}
function TerminalApp({lines,input,setInput,run,onClose}:{lines:string[];input:string;setInput:(value:string)=>void;run:()=>void;onClose?:()=>void}) { return <Window eyebrow="DEV" title="terminal" onClose={onClose}><div className="terminal-view">{lines.map((line,index)=><p key={index} className={line.startsWith("malila")?"text-violet-200":"text-emerald-200/80"}>{line}</p>)}<form onSubmit={event=>{event.preventDefault();run()}} className="flex gap-2"><span className="text-violet-300">malila@os:~$</span><input autoFocus value={input} onChange={event=>setInput(event.target.value)}/></form></div></Window> }
function Resume({open,onClose}:{open:()=>void;onClose?:()=>void}) {
  return (
    <Window eyebrow="PROFILE" title="resume.pdf" onClose={onClose}>
      <div className="resume-page flex flex-col items-center justify-center text-center p-8 md:p-12 space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-cyan bg-opacity-10 border border-cyan border-opacity-35 flex items-center justify-center text-cyan shadow-lg shadow-cyan/10 animate-pulse">
          <UserRound size={32} />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black tracking-tight">Malila Nyamai</h2>
          <p className="text-xs font-mono uppercase tracking-wider text-cyan font-bold">Full-Stack & QA Product Engineer</p>
        </div>
        <p className="mt-2 max-w-md leading-relaxed text-xs md:text-sm text-white/55">
          Building useful, secure software from the earliest architecture sketch to the last automated pipeline check.
        </p>
        <button 
          className="px-6 py-3 rounded-xl bg-cyan hover:bg-cyan/90 text-white text-xs font-bold transition-all duration-200 shadow-lg shadow-cyan/15 flex items-center gap-2 cursor-pointer" 
          onClick={open}
        >
          Open Interactive Resume 📄
        </button>
      </div>
    </Window>
  );
}
function LegacyContact(){return <Window eyebrow="CHANNEL" title="contact"><div className="contact-page"><div className="eyebrow"><span/> LET’S MAKE SOMETHING USEFUL</div><h2>Got a tricky idea?<br/><em>Let’s talk.</em></h2><p>I’m always happy to meet thoughtful people building ambitious things.</p><div className="contact-links"><a href="mailto:hello@malila.dev"><Mail/> hello@malila.dev <ChevronRight/></a><a href="https://github.com/joashnyamai" target="_blank" rel="noreferrer"><Github/> github.com/joashnyamai <ChevronRight/></a><a href="#location"><MapPin/> Nairobi, Kenya <ChevronRight/></a></div></div></Window>}
function Timeline({year,setYear,onExplore}:{year:number;setYear:(year:number)=>void;onExplore:()=>void}){return <div className="time-machine"><button onClick={onExplore}><span className="eyebrow"><span/> TIME MACHINE</span><b>{year}</b></button><input aria-label="Career timeline" type="range" min="2022" max="2026" value={year} onChange={event=>{const y=Number(event.target.value);setYear(y);onExplore();}}/><div className="timeline-years"><span>2022</span><span>2023</span><span>2024</span><span>2025</span><span>2026</span></div><button className="timeline-open" onClick={onExplore}>Explore year →</button></div>}
function TimelineExplorer({year,setYear,projects,experiences,skills,onClose}:{year:number;setYear:(year:number)=>void;projects:ReturnType<typeof usePortfolioData>["projects"];experiences:ReturnType<typeof usePortfolioData>["experiences"];skills:ReturnType<typeof usePortfolioData>["skills"];onClose?:()=>void}){const milestones:Record<number,{title:string;summary:string;focus:string[]}>={2022:{title:"Foundations",summary:"Building the academic, support, and digital-literacy foundations that shaped a practical technology career.",focus:["IT support","Digital literacy","Security basics"]},2023:{title:"Early practice",summary:"Moving from study into hands-on support, testing, and early product work.",focus:["Manual testing","Jira","Documentation"]},2024:{title:"Quality engineering",summary:"Strengthening delivery confidence through API testing, database validation, and automation workflows.",focus:["Postman","SQL","CI/CD"]},2025:{title:"Product builder",summary:"Shipping full-stack products and collaborating across development, quality, and business needs.",focus:["React","Node.js","PostgreSQL"]},2026:{title:"Systems thinking",summary:"Connecting product engineering, AI workflows, and quality systems into a broader technical practice.",focus:["AI agents","Architecture","Product strategy"]}};const stage=milestones[year];const visibleProjects=projects.filter(project=>Number(project.period.match(/20\d{2}/)?.[0]||2026)<=year);const visibleExperience=experiences.filter(experience=>Number(experience.period.match(/20\d{2}/)?.[0]||2026)<=year);const visibleSkills=skills.slice(0,Math.max(1,year-2021));return <Window eyebrow="TIME MACHINE" title={`${year} / ${stage.title}`} onClose={onClose}><div className="timeline-explorer"><div className="timeline-explorer-head"><div><div className="eyebrow"><span/> CAREER EVOLUTION</div><h2>{stage.title}</h2><p>{stage.summary}</p></div><b>{year}</b></div><input aria-label="Explore career year" type="range" min="2022" max="2026" value={year} onChange={event=>setYear(Number(event.target.value))}/><div className="timeline-year-buttons">{[2022,2023,2024,2025,2026].map(value=><button key={value} onClick={()=>setYear(value)} className={value===year?"active":""}>{value}</button>)}</div><div className="timeline-stage-grid"><section><span>FOCUS UNLOCKED</span>{stage.focus.map(item=><Pill key={item}>{item}</Pill>)}</section><section><span>PROJECTS / {visibleProjects.length}</span>{visibleProjects.length?visibleProjects.slice(0,3).map(project=><p key={project.name}>{project.name}</p>):<p>Project work emerges in later stages.</p>}</section><section><span>EXPERIENCE / {visibleExperience.length}</span>{visibleExperience.length?visibleExperience.slice(0,3).map(experience=><p key={experience.role}>{experience.role}</p>):<p>Experience detail appears as the journey advances.</p>}</section><section><span>SKILL GROUPS / {visibleSkills.length}</span>{visibleSkills.map(group=><p key={group.category}>{group.category}</p>)}</section></div></div></Window>}
function Palette({query,setQuery,close,setActive,projects,skills,experiences}:{query:string;setQuery:(value:string)=>void;close:()=>void;setActive:(app:AppName)=>void;projects:ReturnType<typeof usePortfolioData>["projects"];skills:string[];experiences:string[]}){const needle=query.toLowerCase();const apps=appList.filter(app=>app.label.toLowerCase().includes(needle));const projectResults=projects.filter(project=>`${project.name} ${project.stack.join(" ")}`.toLowerCase().includes(needle)).slice(0,4);const skillResults=skills.filter(skill=>skill.toLowerCase().includes(needle)).slice(0,4);const experienceResults=experiences.filter(role=>role.toLowerCase().includes(needle)).slice(0,3);const action=(app:AppName)=>{setActive(app);close()};return <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="palette-layer" onMouseDown={close}><motion.div initial={{y:-16,scale:.98}} animate={{y:0,scale:1}} onMouseDown={event=>event.stopPropagation()} className="command-card"><div className="flex items-center gap-3 border-b border-white/10 px-5 py-4"><Search className="text-violet-300" size={19}/><input autoFocus value={query} onChange={event=>setQuery(event.target.value)} placeholder="Search projects, skills, experience, code…"/><kbd><Command size={11}/>K</kbd></div><div className="max-h-[430px] overflow-y-auto p-2"><p className="px-3 py-2 text-[10px] font-bold uppercase tracking-[.2em] text-white/35">Apps</p>{apps.map(({id,label,icon:Icon})=><button key={id} className="command-result" onClick={()=>action(id)}><Icon size={16}/><span>{label}</span><ChevronRight size={15}/></button>)}{projectResults.length>0&&<><p className="px-3 py-2 text-[10px] font-bold uppercase tracking-[.2em] text-white/35">Projects</p>{projectResults.map(project=><button key={project.name} className="command-result" onClick={()=>action("projects")}><FolderGit2 size={16}/><span>{project.name}</span><ChevronRight size={15}/></button>)}</>}{skillResults.length>0&&<><p className="px-3 py-2 text-[10px] font-bold uppercase tracking-[.2em] text-white/35">Skills</p>{skillResults.map(skill=><button key={skill} className="command-result" onClick={()=>action("graph")}><Zap size={16}/><span>{skill}</span><ChevronRight size={15}/></button>)}</>}{experienceResults.length>0&&<><p className="px-3 py-2 text-[10px] font-bold uppercase tracking-[.2em] text-white/35">Experience</p>{experienceResults.map(role=><button key={role} className="command-result" onClick={()=>action("resume")}><UserRound size={16}/><span>{role}</span><ChevronRight size={15}/></button>)}</>}</div></motion.div></motion.div>}
function Pill({children}:{children:React.ReactNode}){return <span className="pill">{children}</span>}function Stat({value,label}:{value:string;label:string}){return <div><b className="text-xl">{value}</b><p className="mt-1 text-xs text-white/45">{label}</p></div>}
