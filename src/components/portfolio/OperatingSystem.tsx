import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, ChevronRight, Code2, Command, FileText, FolderGit2, Github, Mail, MapPin, Play, Search, Terminal, UserRound, Zap } from "lucide-react";
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
  const [palette, setPalette] = useState(false);
  const [query, setQuery] = useState("");
  const [year, setYear] = useState(2026);
  const [node, setNode] = useState("React");
  const [input, setInput] = useState("");
  const [lines, setLines] = useState(["Welcome to malila@portfolio — type help to explore."]);
  const [xray, setXray] = useState<typeof projects[number] | null>(null);
  const [showMatrix, setShowMatrix] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      const parts = date.toLocaleDateString("en-US", { month: "short", day: "numeric" }).split(" ");
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      setTime(`${parts[0]} ${parts[1]}  ${hours}:${minutes}`);
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
      <main className="os-shell min-h-screen overflow-hidden text-white selection:bg-violet-300 selection:text-slate-950 pl-[68px] pt-7 bg-[#2c001e]">
        <div className="ambient ambient-one" />
        <div className="ambient ambient-two" />
        
        {/* Ubuntu Full-Width Top Bar */}
        <header className="fixed top-0 left-0 right-0 h-7 bg-[#111111] text-[11px] text-white/90 px-4 flex items-center justify-between z-50 font-sans shadow-md select-none">
          <div className="flex items-center gap-4">
            <span className="font-extrabold hover:text-white cursor-pointer transition-colors">Activities</span>
            <span className="text-white/40">|</span>
            <span className="capitalize font-mono tracking-tight text-white/80">{active}</span>
          </div>
          <div className="font-bold text-white/85 text-xs">
            {time || "Jul 23  17:36"}
          </div>
          <div className="flex items-center gap-3.5 text-white/60">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4.35 19.4c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l1.9-1.9C9.17 19.58 10.53 20 12 20c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 15c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/>
            </svg>
            <span className="text-[10px] font-bold">100%</span>
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
            </svg>
          </div>
        </header>

        {/* Ubuntu Vertical Left-Sidebar Launcher (Adaptive to Bottom Dock on mobile) */}
        <nav className="fixed left-0 top-7 bottom-0 w-[68px] bg-[#111111]/85 backdrop-blur-md border-r border-white/5 flex flex-col items-center py-4 gap-3 z-40 select-none overflow-y-auto max-md:left-1/2 max-md:bottom-4 max-md:top-auto max-md:w-max max-md:-translate-x-1/2 max-md:h-14 max-md:flex-row max-md:py-2 max-md:px-4 max-md:rounded-2xl max-md:border max-md:border-white/10 max-md:shadow-2xl">
          {appList.map(({ id, label, icon: Icon }) => {
            const isActive = active === id;
            return (
              <button
                key={id}
                onClick={() => setActive(id)}
                className={`relative w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 group cursor-pointer ${
                  isActive
                    ? "bg-[#E95420]/15 border border-[#E95420]/30 text-white"
                    : "text-white/50 hover:bg-white/5 hover:text-white"
                }`}
                title={label}
              >
                {/* Active Indicator Pip (Left on desktop, Bottom on mobile) */}
                {isActive && (
                  <span className="absolute left-0 top-[35%] w-1 h-[30%] bg-[#E95420] rounded-r-md max-md:left-[35%] max-md:bottom-0 max-md:w-[30%] max-md:h-1 max-md:top-auto" />
                )}
                <Icon size={18} />
                {/* Tooltip on hover (Hidden on mobile) */}
                <span className="absolute left-[78px] px-2.5 py-1 rounded bg-[#2b2b2b] text-[10px] text-white/90 font-mono tracking-tight border border-white/5 shadow-xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 origin-left transition-all duration-150 pointer-events-none whitespace-nowrap z-50 max-md:hidden">
                  {label}
                </span>
              </button>
            );
          })}

          <div className="w-8 h-[1px] bg-white/10 my-1 max-md:w-[1px] max-md:h-8 max-md:mx-1 max-md:my-0" />

          {/* Search/Palette Trigger */}
          <button
            onClick={() => setPalette(true)}
            className="w-11 h-11 rounded-xl flex items-center justify-center text-white/50 hover:bg-white/5 hover:text-white cursor-pointer group"
            title="Search command"
          >
            <Search size={17} />
            <span className="absolute left-[78px] px-2.5 py-1 rounded bg-[#2b2b2b] text-[10px] text-white/90 font-mono tracking-tight border border-white/5 shadow-xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 origin-left transition-all duration-150 pointer-events-none whitespace-nowrap z-50 max-md:hidden">
              Search Ctrl+K
            </span>
          </button>
        </nav>

        {/* Workspace content container */}
        <section className="relative w-full h-[calc(100vh-28px)] overflow-hidden flex flex-col p-4 md:p-6 select-none justify-center max-md:h-[calc(100vh-28px-74px)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="flex-1 relative overflow-hidden flex flex-col justify-center max-w-[1400px] mx-auto w-full"
              initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >

              {active === "home" && <Home setActive={setActive} onOpenResume={onOpenResume} />}
              {active === "profile" && <Window eyebrow="PROFILE" title="professional summary"><About isOs={true} /></Window>}
              {active === "projects" && <Window eyebrow="ARCHIVE" title="selected projects"><ProjectsSection isOs={true} /></Window>}
              {active === "graph" && <Graph node={node} setNode={setNode} related={related} experiences={experiences.filter(experience => Number(experience.period.match(/20\d{2}/)?.[0] || 2026) <= year).length} skills={skills.filter((_, index) => year >= 2022 + Math.min(index, 3)).length} />}
              {active === "timeline" && <TimelineExplorer year={year} setYear={setYear} projects={projects} experiences={experiences} skills={skills} />}
              {active === "terminal" && <TerminalApp lines={lines} input={input} setInput={setInput} run={run} />}
              {active === "resume" && <Resume open={onOpenResume} />}
              {active === "contact" && <Window eyebrow="CHANNEL" title="contact"><ContactSection onViewResume={onOpenResume} isOs={true} /></Window>}
              {active === "career" && <Window eyebrow="CAREER" title="professional background"><Experience isOs={true} /></Window>}
              {active === "education" && <Window eyebrow="EDUCATION" title="education & credentials"><CertificationsSection isOs={true} /></Window>}
              {active === "community" && <Window eyebrow="BEYOND CODE" title="community & leadership"><Community isOs={true} /></Window>}
              {active === "ai" && <Window eyebrow="AVA" title="AI lab"><AiLabTeaser isOs={true} /></Window>}
              {active === "articles" && <Window eyebrow="BUILD IN PUBLIC" title="technical notes"><Articles /></Window>}
              {active === "certificates" && <Window eyebrow="VERIFIED" title="certificates"><CertificationsSection isOs={true} /></Window>}
              {active === "code" && <Window eyebrow="EXPLORER" title="components"><CodeExplorer /></Window>}
              {active === "sandbox" && <Window eyebrow="LIVE" title="coding sandbox"><Sandbox /></Window>}
            </motion.div>
          </AnimatePresence>

          {/* Floating Time Machine Slider */}
          <div className="fixed right-6 bottom-6 z-40">
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

function Window({ eyebrow, title, children }: { eyebrow:string; title:string; children:React.ReactNode }) {
  return (
    <section className="os-window bg-[#2c001e]/85 border border-[#77216f]/30 rounded-xl shadow-2xl backdrop-blur-md overflow-hidden flex flex-col h-full">
      <div className="window-bar bg-[#2a2a2a] border-b border-[#1c1c1c] px-4 py-2.5 flex items-center justify-between select-none">
        <span className="text-[11px] font-bold text-white/80 font-mono flex items-center gap-1.5 uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E95420]" />
          {eyebrow} <b className="text-white/40">/</b> {title}
        </span>
        <div className="window-controls flex items-center gap-2">
          {/* Ubuntu Yaru controls on the right */}
          <button className="w-2.5 h-2.5 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-[7px]" aria-label="Minimize" />
          <button className="w-2.5 h-2.5 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-[7px]" aria-label="Maximize" />
          <button className="w-2.5 h-2.5 rounded-full bg-[#E95420] hover:bg-[#E95420]/80 flex items-center justify-center text-[7px] text-white" aria-label="Close" />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
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
  return (
    <div className="grid h-full gap-4 lg:grid-cols-[1.4fr_.8fr]">
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
  );
}
function LegacyProjects({projects,openXray}:{projects:ReturnType<typeof usePortfolioData>["projects"];openXray:(project:ReturnType<typeof usePortfolioData>["projects"][number])=>void}) { return <Window eyebrow="ARCHIVE" title="selected projects"><div className="flex items-end justify-between p-7"><div><div className="eyebrow"><span/> PROJECT ARCHIVE</div><h2 className="mt-3 text-3xl font-semibold">Work with intention.</h2></div><Pill>{projects.length} visible</Pill></div><div className="grid gap-3 border-t border-white/10 p-5 md:grid-cols-3">{projects.slice(0,6).map((project,index)=><article className="project-card" key={project.name}><div className={`project-visual ${["violet","cyan","orange"][index%3]}`}><span>0{index+1}</span><Code2 size={26}/></div><div className="p-5"><p className="text-xs text-white/45">{project.period}</p><h3 className="mt-2 text-xl font-semibold">{project.name}</h3><p className="mt-3 text-sm leading-6 text-white/50">{project.objective}</p><div className="mt-5 flex flex-wrap gap-2">{project.stack.slice(0,3).map(item=><Pill key={item}>{item}</Pill>)}</div><button onClick={()=>openXray(project)} className="mt-6 flex items-center gap-1 text-sm text-violet-300">Open X-Ray <ChevronRight size={15}/></button></div></article>)}</div></Window> }
function Graph({
  node,
  setNode,
  related,
  experiences,
  skills
}: {
  node: string;
  setNode: (value: string) => void;
  related: ReturnType<typeof usePortfolioData>["projects"];
  experiences: number;
  skills: number;
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
    <Window eyebrow="HUD" title="knowledge & skills graph">
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
function TerminalApp({lines,input,setInput,run}:{lines:string[];input:string;setInput:(value:string)=>void;run:()=>void}) { return <Window eyebrow="DEV" title="terminal"><div className="terminal-view">{lines.map((line,index)=><p key={index} className={line.startsWith("malila")?"text-violet-200":"text-emerald-200/80"}>{line}</p>)}<form onSubmit={event=>{event.preventDefault();run()}} className="flex gap-2"><span className="text-violet-300">malila@os:~$</span><input autoFocus value={input} onChange={event=>setInput(event.target.value)}/></form></div></Window> }
function Resume({open}:{open:()=>void}) {
  return (
    <Window eyebrow="PROFILE" title="resume.pdf">
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
function TimelineExplorer({year,setYear,projects,experiences,skills}:{year:number;setYear:(year:number)=>void;projects:ReturnType<typeof usePortfolioData>["projects"];experiences:ReturnType<typeof usePortfolioData>["experiences"];skills:ReturnType<typeof usePortfolioData>["skills"]}){const milestones:Record<number,{title:string;summary:string;focus:string[]}>={2022:{title:"Foundations",summary:"Building the academic, support, and digital-literacy foundations that shaped a practical technology career.",focus:["IT support","Digital literacy","Security basics"]},2023:{title:"Early practice",summary:"Moving from study into hands-on support, testing, and early product work.",focus:["Manual testing","Jira","Documentation"]},2024:{title:"Quality engineering",summary:"Strengthening delivery confidence through API testing, database validation, and automation workflows.",focus:["Postman","SQL","CI/CD"]},2025:{title:"Product builder",summary:"Shipping full-stack products and collaborating across development, quality, and business needs.",focus:["React","Node.js","PostgreSQL"]},2026:{title:"Systems thinking",summary:"Connecting product engineering, AI workflows, and quality systems into a broader technical practice.",focus:["AI agents","Architecture","Product strategy"]}};const stage=milestones[year];const visibleProjects=projects.filter(project=>Number(project.period.match(/20\d{2}/)?.[0]||2026)<=year);const visibleExperience=experiences.filter(experience=>Number(experience.period.match(/20\d{2}/)?.[0]||2026)<=year);const visibleSkills=skills.slice(0,Math.max(1,year-2021));return <Window eyebrow="TIME MACHINE" title={`${year} / ${stage.title}`}><div className="timeline-explorer"><div className="timeline-explorer-head"><div><div className="eyebrow"><span/> CAREER EVOLUTION</div><h2>{stage.title}</h2><p>{stage.summary}</p></div><b>{year}</b></div><input aria-label="Explore career year" type="range" min="2022" max="2026" value={year} onChange={event=>setYear(Number(event.target.value))}/><div className="timeline-year-buttons">{[2022,2023,2024,2025,2026].map(value=><button key={value} onClick={()=>setYear(value)} className={value===year?"active":""}>{value}</button>)}</div><div className="timeline-stage-grid"><section><span>FOCUS UNLOCKED</span>{stage.focus.map(item=><Pill key={item}>{item}</Pill>)}</section><section><span>PROJECTS / {visibleProjects.length}</span>{visibleProjects.length?visibleProjects.slice(0,3).map(project=><p key={project.name}>{project.name}</p>):<p>Project work emerges in later stages.</p>}</section><section><span>EXPERIENCE / {visibleExperience.length}</span>{visibleExperience.length?visibleExperience.slice(0,3).map(experience=><p key={experience.role}>{experience.role}</p>):<p>Experience detail appears as the journey advances.</p>}</section><section><span>SKILL GROUPS / {visibleSkills.length}</span>{visibleSkills.map(group=><p key={group.category}>{group.category}</p>)}</section></div></div></Window>}
function Palette({query,setQuery,close,setActive,projects,skills,experiences}:{query:string;setQuery:(value:string)=>void;close:()=>void;setActive:(app:AppName)=>void;projects:ReturnType<typeof usePortfolioData>["projects"];skills:string[];experiences:string[]}){const needle=query.toLowerCase();const apps=appList.filter(app=>app.label.toLowerCase().includes(needle));const projectResults=projects.filter(project=>`${project.name} ${project.stack.join(" ")}`.toLowerCase().includes(needle)).slice(0,4);const skillResults=skills.filter(skill=>skill.toLowerCase().includes(needle)).slice(0,4);const experienceResults=experiences.filter(role=>role.toLowerCase().includes(needle)).slice(0,3);const action=(app:AppName)=>{setActive(app);close()};return <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="palette-layer" onMouseDown={close}><motion.div initial={{y:-16,scale:.98}} animate={{y:0,scale:1}} onMouseDown={event=>event.stopPropagation()} className="command-card"><div className="flex items-center gap-3 border-b border-white/10 px-5 py-4"><Search className="text-violet-300" size={19}/><input autoFocus value={query} onChange={event=>setQuery(event.target.value)} placeholder="Search projects, skills, experience, code…"/><kbd><Command size={11}/>K</kbd></div><div className="max-h-[430px] overflow-y-auto p-2"><p className="px-3 py-2 text-[10px] font-bold uppercase tracking-[.2em] text-white/35">Apps</p>{apps.map(({id,label,icon:Icon})=><button key={id} className="command-result" onClick={()=>action(id)}><Icon size={16}/><span>{label}</span><ChevronRight size={15}/></button>)}{projectResults.length>0&&<><p className="px-3 py-2 text-[10px] font-bold uppercase tracking-[.2em] text-white/35">Projects</p>{projectResults.map(project=><button key={project.name} className="command-result" onClick={()=>action("projects")}><FolderGit2 size={16}/><span>{project.name}</span><ChevronRight size={15}/></button>)}</>}{skillResults.length>0&&<><p className="px-3 py-2 text-[10px] font-bold uppercase tracking-[.2em] text-white/35">Skills</p>{skillResults.map(skill=><button key={skill} className="command-result" onClick={()=>action("graph")}><Zap size={16}/><span>{skill}</span><ChevronRight size={15}/></button>)}</>}{experienceResults.length>0&&<><p className="px-3 py-2 text-[10px] font-bold uppercase tracking-[.2em] text-white/35">Experience</p>{experienceResults.map(role=><button key={role} className="command-result" onClick={()=>action("resume")}><UserRound size={16}/><span>{role}</span><ChevronRight size={15}/></button>)}</>}</div></motion.div></motion.div>}
function Pill({children}:{children:React.ReactNode}){return <span className="pill">{children}</span>}function Stat({value,label}:{value:string;label:string}){return <div><b className="text-xl">{value}</b><p className="mt-1 text-xs text-white/45">{label}</p></div>}
