import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, ChevronRight, Code2, Command, FileText, FolderGit2, Github, Mail, MapPin, Play, Search, Terminal, UserRound, Zap, Calendar, Briefcase, Award, Sliders } from "lucide-react";
import { usePortfolioData } from "@/hooks/use-portfolio-data";
import { Articles, Certificates, CodeExplorer, GithubActivity, Sandbox } from "@/components/portfolio/OSExtras";
import About from "@/components/portfolio/About";
import Experience from "@/components/portfolio/Experience";
import Community from "@/components/portfolio/Community";
import AiLabTeaser from "@/components/portfolio/AiLabTeaser";
import CertificationsSection from "@/components/portfolio/Certifications";
import ContactSection from "@/components/portfolio/Contact";
import ProjectsSection from "@/components/portfolio/Projects";

type AppName = "home" | "profile" | "career" | "education" | "community" | "ai" | "projects" | "graph" | "timeline" | "terminal" | "resume" | "contact" | "articles" | "certificates" | "code" | "sandbox";
const appList: { id: AppName; label: string; icon: typeof Bot | typeof Terminal; tone: string }[] = [
  { id: "terminal", label: "Terminal CLI", icon: Terminal, tone: "bg-emerald-400" }, { id: "profile", label: "Profile", icon: UserRound, tone: "bg-indigo-300" }, { id: "projects", label: "Projects", icon: FolderGit2, tone: "bg-cyan-400" },
  { id: "graph", label: "Skill Graph", icon: Zap, tone: "bg-amber-300" }, { id: "timeline", label: "Timeline", icon: Play, tone: "bg-cyan-300" },
  { id: "career", label: "Career", icon: UserRound, tone: "bg-teal-300" }, { id: "education", label: "Education", icon: FileText, tone: "bg-pink-300" }, { id: "community", label: "Beyond code", icon: Zap, tone: "bg-orange-300" }, { id: "ai", label: "AI Lab", icon: Bot, tone: "bg-fuchsia-300" }, { id: "resume", label: "Resume", icon: FileText, tone: "bg-rose-400" }, { id: "contact", label: "Contact", icon: Mail, tone: "bg-blue-400" }, { id: "articles", label: "Notes", icon: FileText, tone: "bg-lime-300" }, { id: "certificates", label: "Certificates", icon: Zap, tone: "bg-pink-300" }, { id: "code", label: "Code", icon: Code2, tone: "bg-sky-300" }, { id: "sandbox", label: "Sandbox", icon: Terminal, tone: "bg-orange-300" },
];

export default function OperatingSystem() {
  const { projects, experiences, skills, certifications } = usePortfolioData();
  const [active, setActive] = useState<AppName>("terminal");
  const workspaceRef = useRef<HTMLElement>(null);
  const [year, setYear] = useState(2026);
  const [node, setNode] = useState("React");
  const [input, setInput] = useState("");
  const [lines, setLines] = useState(["Welcome to malila@portfolio — type help to explore."]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleNavigate = (e: Event) => {
      const dest = (e as CustomEvent).detail as AppName;
      if (dest) setActive(dest);
    };
    window.addEventListener("os-navigate", handleNavigate);
    return () => {
      window.removeEventListener("os-navigate", handleNavigate);
    };
  }, []);

  const run = () => {
    const command = input.trim().toLowerCase();
    const actions: Record<string, AppName> = { profile: "profile", about: "profile", projects: "projects", skills: "graph", graph: "graph", timeline: "timeline", career: "career", experience: "career", education: "education", community: "community", "beyond-code": "community", ai: "ai", "ai-lab": "ai", code: "code", sandbox: "sandbox", certificates: "certificates", resume: "resume", cv: "resume", contact: "contact" };
    if (actions[command]) setActive(actions[command]);
    setLines(current => command === "clear" ? [] : [...current, `malila@os:~$ ${input}`, command === "help" ? "profile · projects · graph · timeline · career · education · community · ai-lab · code · sandbox · resume · contact · clear" : actions[command] ? `Opening ${command}…` : "Command not found. Type help."]);
    setInput("");
  };
  const related = projects.filter(project => project.stack.some(stack => stack.toLowerCase().includes(node.toLowerCase()) || node.toLowerCase().includes(stack.toLowerCase())));

  return (
    <div className="web-shell min-h-screen bg-[#060814] text-white flex flex-col font-sans select-text relative">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      {/* Premium Web Navbar */}
      <nav className="sticky top-0 left-0 right-0 h-16 bg-[#060814]/85 border-b border-white/5 backdrop-blur-md flex items-center justify-between px-6 z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActive("terminal")}
            className="w-8 h-8 rounded-lg bg-cyan bg-opacity-15 border border-cyan border-opacity-30 flex items-center justify-center text-sm text-cyan font-black font-mono shadow-sm hover:bg-cyan/20 transition-colors cursor-pointer"
          >
            M
          </button>
          <span className="font-bold tracking-tight text-white cursor-pointer hover:text-cyan transition-colors" onClick={() => setActive("terminal")}>
            Malila Nyamai
          </span>
        </div>

        {/* Navbar links */}
        <div className="hidden md:flex items-center gap-6 text-[11px] uppercase tracking-widest font-bold text-white/50">
          <button onClick={() => setActive("terminal")} className={`transition-colors cursor-pointer ${active === "terminal" ? "text-cyan" : "hover:text-cyan"}`}>Terminal</button>
          <button onClick={() => setActive("profile")} className={`transition-colors cursor-pointer ${active === "profile" ? "text-cyan" : "hover:text-cyan"}`}>Profile</button>
          <button onClick={() => setActive("projects")} className={`transition-colors cursor-pointer ${active === "projects" ? "text-cyan" : "hover:text-cyan"}`}>Projects</button>
          <button onClick={() => setActive("graph")} className={`transition-colors cursor-pointer ${active === "graph" ? "text-cyan" : "hover:text-cyan"}`}>Skills</button>
          <button onClick={() => setActive("contact")} className={`transition-colors cursor-pointer ${active === "contact" ? "text-cyan" : "hover:text-cyan"}`}>Contact</button>
        </div>

        <div className="flex items-center gap-3">
          
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1.5 rounded-lg border border-white/10 text-white/70 hover:text-white md:hidden cursor-pointer text-xs leading-none"
            aria-label="Toggle Navigation Menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#060814]/95 border-b border-white/5 overflow-hidden flex flex-col px-6 py-4 space-y-3 z-40 select-none sticky top-16 backdrop-blur-md"
          >
            {[
              { id: "terminal", label: "Terminal" },
              { id: "profile", label: "Profile" },
              { id: "projects", label: "Projects" },
              { id: "graph", label: "Skills" },
              { id: "contact", label: "Contact" }
            ].map(link => (
              <button
                key={link.id}
                onClick={() => {
                  setActive(link.id as AppName);
                  setMenuOpen(false);
                }}
                className={`text-left text-[10px] uppercase tracking-widest font-bold py-2 transition-colors ${active === link.id ? "text-cyan" : "text-white/60 hover:text-cyan"}`}
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Page Content */}
      <main className="flex-1 w-full max-w-none px-6 md:px-12 py-8 relative z-10 flex flex-col min-h-[calc(100vh_-_64px)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="flex-1 w-full flex flex-col"
            initial={{ opacity: 0, scale: 0.97, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -10 }}
            transition={{ duration: 0.22 }}
          >
            {active === "profile" && <Window eyebrow="PROFILE" title="professional summary" onClose={() => setActive("terminal")} isOs={false}><About isOs={false} /></Window>}
            {active === "projects" && <Window eyebrow="ARCHIVE" title="selected projects" onClose={() => setActive("terminal")} isOs={false}><ProjectsSection isOs={false} /></Window>}
            {active === "graph" && <Graph node={node} setNode={setNode} related={related} experiences={experiences.filter(exp => Number(exp.period.match(/20\d{2}/)?.[0] || 2026) <= year).length} skills={skills.filter((_, index) => year >= 2022 + Math.min(index, 3)).length} onClose={() => setActive("terminal")} isOs={false} />}
            {active === "timeline" && <TimelineExplorer year={year} setYear={setYear} projects={projects} experiences={experiences} skills={skills} onClose={() => setActive("terminal")} isOs={false} />}
            {active === "terminal" && <Window eyebrow="DEV" title="terminal" onClose={() => setActive("terminal")} isOs={false}><TerminalApp lines={lines} input={input} setInput={setInput} run={run} onClose={() => setActive("terminal")} isOs={false} /></Window>}
            {active === "career" && <Window eyebrow="CAREER" title="professional background" onClose={() => setActive("terminal")} isOs={false}><Experience isOs={false} /></Window>}
            {active === "education" && <Window eyebrow="EDUCATION" title="education & credentials" onClose={() => setActive("terminal")} isOs={false}><CertificationsSection isOs={false} /></Window>}
            {active === "community" && <Window eyebrow="BEYOND CODE" title="community & leadership" onClose={() => setActive("terminal")} isOs={false}><Community isOs={false} /></Window>}
            {active === "ai" && <Window eyebrow="AVA" title="AI lab" onClose={() => setActive("terminal")} isOs={false}><AiLabTeaser isOs={false} /></Window>}
            {active === "articles" && <Window eyebrow="BUILD IN PUBLIC" title="technical notes" onClose={() => setActive("terminal")} isOs={false}><Articles /></Window>}
            {active === "certificates" && <Window eyebrow="VERIFIED" title="certificates" onClose={() => setActive("terminal")} isOs={false}><CertificationsSection isOs={false} /></Window>}
            {active === "code" && <Window eyebrow="EXPLORER" title="components" onClose={() => setActive("terminal")} isOs={false}><CodeExplorer /></Window>}
            {active === "sandbox" && <Window eyebrow="LIVE" title="coding sandbox" onClose={() => setActive("terminal")} isOs={false}><Sandbox /></Window>}
            {active === "contact" && <Window eyebrow="CHANNEL" title="contact" onClose={() => setActive("terminal")} isOs={false}><ContactSection onViewResume={() => setActive("resume")} isOs={false} /></Window>}
            {active === "resume" && <Window eyebrow="PROFILE" title="resume.pdf" onClose={() => setActive("terminal")} isOs={false}><Resume onClose={() => setActive("terminal")} /></Window>}
          </motion.div>
        </AnimatePresence>
      </main>
 
      {/* Standard Footer */}
      <footer className="border-t border-white/5 py-8 bg-[#03050d] text-xs text-white/40 z-20">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span>© {new Date().getFullYear()} Malila Nyamai. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="https://github.com/joashnyamai" target="_blank" rel="noopener noreferrer" className="hover:text-cyan transition-colors">GitHub</a>
            <button onClick={() => setActive("contact")} className="hover:text-cyan transition-colors cursor-pointer">Contact</button>
            <button onClick={() => setActive("terminal")} className="hover:text-cyan transition-colors cursor-pointer">Terminal</button>
          </div>
        </div>
      </footer>

    </div>
  );
}


function Graph({
  node,
  setNode,
  related,
  experiences,
  skills,
  onClose,
  isOs = true
}: {
  node: string;
  setNode: (value: string) => void;
  related: ReturnType<typeof usePortfolioData>["projects"];
  experiences: number;
  skills: number;
  onClose?: () => void;
  isOs?: boolean;
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
    <Window eyebrow="HUD" title="knowledge & skills graph" onClose={onClose} isOs={isOs}>
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
function Window({ children }: { eyebrow?: string; title?: string; children: React.ReactNode; onClose?: () => void; isOs?: boolean }) {
  return <div className="w-full text-left select-text">{children}</div>;
}
function TerminalApp({lines,input,setInput,run,onClose,isOs=true}:{lines:string[];input:string;setInput:(value:string)=>void;run:()=>void;onClose?:()=>void;isOs?:boolean}) { return <Window eyebrow="DEV" title="terminal" onClose={onClose} isOs={isOs}><div className="terminal-view">{lines.map((line,index)=><p key={index} className={line.startsWith("malila")?"text-violet-200":"text-emerald-200/80"}>{line}</p>)}<form onSubmit={event=>{event.preventDefault();run()}} className="flex gap-2"><span className="text-violet-300">malila@os:~$</span><input autoFocus value={input} onChange={event=>setInput(event.target.value)}/></form></div></Window> }
function Resume({ onClose }: { onClose?: () => void }) {
  const printResume = () => {
    window.print();
  };

  return (
    <div className="w-full min-h-screen bg-[#070913]/30 text-white select-text">
      {/* Custom print styling overrides */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body {
            background: white !important;
            color: black !important;
          }
          .no-print {
            display: none !important;
          }
          .resume-container {
            background: white !important;
            color: black !important;
            border: none !important;
            box-shadow: none !important;
            padding: 0 !important;
            margin: 0 !important;
            max-width: 100% !important;
          }
          .resume-section-divider {
            border-color: #000 !important;
          }
          .text-cyan {
            color: #0c8599 !important;
          }
          .text-white {
            color: #000000 !important;
          }
          .text-white\\/45, .text-white\\/55, .text-white\\/60, .text-white\\/65, .text-white\\/70, .text-muted-foreground {
            color: #222222 !important;
          }
          .bg-white\\/5 {
            background: transparent !important;
            border: 1px solid #ccc !important;
          }
          nav, footer, .web-shell nav {
            display: none !important;
          }
        }
      `}} />

      {/* CV Section Toolbar */}
      <div className="no-print flex items-center justify-between pb-6 mb-8 border-b border-white/5">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
          <span className="text-[10px] font-bold font-mono tracking-widest text-cyan uppercase">CURRICULUM VITAE</span>
          <span className="text-white/30 font-mono text-[10px]">/</span>
          <span className="text-xs font-semibold text-white/80">Malila Nyamai</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={printResume}
            className="px-4 py-2 rounded-xl bg-cyan hover:bg-cyan/90 text-slate-950 text-xs font-bold transition-all duration-200 shadow-lg shadow-cyan/15 flex items-center gap-1.5 cursor-pointer"
          >
            Print CV / Save PDF 🖨️
          </button>
          <a
            href="/Malila_Nyamai_Resume.pdf"
            download="Malila_Nyamai_Resume.pdf"
            className="px-4 py-2 rounded-xl border border-white/10 hover:border-cyan/30 hover:bg-cyan/5 text-white/70 hover:text-white text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            Download PDF 📄
          </a>
          {onClose && (
            <button 
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-white/10 hover:border-cyan/30 text-white/70 hover:text-white text-xs transition-colors cursor-pointer"
            >
              Back ➔
            </button>
          )}
        </div>
      </div>

      {/* Executive Sheet */}
      <div className="resume-container max-w-5xl mx-auto bg-[#12131e]/30 border border-white/5 rounded-3xl p-6 md:p-12 shadow-2xl space-y-12">
        
        {/* CV Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/5 pb-8 gap-6">
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white font-display">
              MALILA NYAMAI
            </h1>
            <div className="flex flex-wrap gap-x-2 gap-y-1 text-cyan font-mono text-xs uppercase tracking-wider font-semibold">
              <span>Software Engineer</span>
              <span>•</span>
              <span>QA Engineer</span>
              <span>•</span>
              <span>IT Consultant</span>
            </div>
          </div>
          
          {/* Contact coordinates */}
          <div className="text-[11px] text-white/60 space-y-1.5 font-mono md:text-right shrink-0">
            <div className="flex items-center md:justify-end gap-2">
              <MapPin size={12} className="text-cyan shrink-0" />
              <span>Nairobi, Kenya</span>
            </div>
            <div className="flex items-center md:justify-end gap-2">
              <Mail size={12} className="text-cyan shrink-0" />
              <a href="mailto:jamesmnyamai9@gmail.com" className="hover:text-cyan transition-colors">jamesmnyamai9@gmail.com</a>
            </div>
            <div className="flex items-center md:justify-end gap-2">
              <span className="text-cyan shrink-0 text-xs">📞</span>
              <span>0745 806 761</span>
            </div>
            <div className="flex items-center md:justify-end gap-2">
              <span className="text-cyan shrink-0 text-xs">🔗</span>
              <a href="https://linkedin.com/in/malila-nyamai-0b2711221" target="_blank" rel="noreferrer" className="hover:text-cyan transition-colors">linkedin.com/in/malila-nyamai-0b2711221</a>
            </div>
            <div className="flex items-center md:justify-end gap-2">
              <Github size={12} className="text-cyan shrink-0" />
              <a href="https://github.com/joashnyamai" target="_blank" rel="noreferrer" className="hover:text-cyan transition-colors">github.com/joashnyamai</a>
            </div>
          </div>
        </div>

        {/* Executive Profile Summary */}
        <div className="space-y-3 text-left">
          <h2 className="text-xs font-black font-mono tracking-widest text-cyan uppercase flex items-center gap-2">
            <UserRound size={12} />
            <span>Professional Summary</span>
          </h2>
          <div className="resume-section-divider border-b border-white/5" />
          <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-4xl">
            Motivated IT professional and BSc Information Technology finalist with 3+ years of hands-on experience in software development, quality assurance, IT support, cloud exposure (AWS), and digital training. Proven ability to monitor systems, document workflows, troubleshoot application issues, and support end users in fast-paced technology environments. Experienced in application testing (Jest & Postman), bug tracking (Jira), data management (MySQL, PostgreSQL), and prototyping web solutions using React, TypeScript, Node.js, and PHP. Familiar with AI/ML concepts through LangChain, RAG, and Generative AI certifications. A fast learner and collaborative team player eager to contribute to digital transformation agendas and J-Hub innovation initiatives.
          </p>
        </div>

        {/* Resume columns */}
        <div className="grid md:grid-cols-[1fr_2fr] gap-12 text-left">
          
          {/* Left panel */}
          <div className="space-y-10">
            
            {/* Skills */}
            <div className="space-y-3">
              <h2 className="text-xs font-black font-mono tracking-widest text-cyan uppercase flex items-center gap-2">
                <Sliders size={12} />
                <span>Technical Skills</span>
              </h2>
              <div className="resume-section-divider border-b border-white/5" />
              
              <div className="space-y-4 text-xs">
                <div>
                  <h4 className="font-bold text-white mb-1">Cloud & Infrastructure</h4>
                  <p className="text-white/50 leading-relaxed">AWS (exposure) · Azure (exposure) · Cloud resource provisioning · Performance monitoring · Docker · CI/CD Pipelines</p>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Application Testing & QA</h4>
                  <p className="text-white/50 leading-relaxed">Manual & Automated Testing · Postman (API) · Jira (bug tracking) · UAT · Load Testing · TDD</p>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Frontend Development</h4>
                  <p className="text-white/50 leading-relaxed">React · TypeScript · JavaScript (ES6+) · HTML5 · CSS3 · Tailwind CSS · Bootstrap · Vite</p>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Backend & Databases</h4>
                  <p className="text-white/50 leading-relaxed">Node.js · ASP.NET Core / C# · MySQL · PostgreSQL · Firebase · REST APIs · Data Migration</p>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Architecture & Diagramming</h4>
                  <p className="text-white/50 leading-relaxed">System design · Technical documentation · Workflow mapping · Architecture repositories · Technology roadmaps</p>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">AI / ML & Innovation</h4>
                  <p className="text-white/50 leading-relaxed">LangChain · RAG · Agent Architectures · Generative AI (SAP certified) · n8n Automation · Prototype development</p>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">UI/UX & Prototyping</h4>
                  <p className="text-white/50 leading-relaxed">UI testing & iteration · User research · Feedback collection · Responsive design · Accessibility standards</p>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">IT Support & Docs</h4>
                  <p className="text-white/50 leading-relaxed">First-line user support · Technical writing · User guides · Training manuals · Cybersecurity (CCNA) · Wireshark</p>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="space-y-3">
              <h2 className="text-xs font-black font-mono tracking-widest text-cyan uppercase flex items-center gap-2">
                <Award size={12} />
                <span>Certifications</span>
              </h2>
              <div className="resume-section-divider border-b border-white/5" />
              <ul className="space-y-2.5 text-xs text-white/65 leading-relaxed">
                <li><strong>CCNA: Enterprise Networking, Security & Automation</strong> — Cisco Networking Academy</li>
                <li><strong>Cybersecurity Fundamentals</strong> — Q1 Masterclass</li>
                <li><strong>The Complete Cyber Security Course</strong> — Udemy</li>
                <li><strong>Generative AI</strong> — SAP</li>
                <li><strong>Hashgraph Developer</strong> — Hedera / Attendance</li>
                <li><strong>Software Engineering</strong> — Power Learn Africa</li>
                <li><strong>.NET Fundamentals</strong> — Microsoft Student Learn</li>
                <li><strong>Microsoft Office Suite</strong> — Microsoft</li>
              </ul>
            </div>

            {/* Languages */}
            <div className="space-y-3">
              <h2 className="text-xs font-black font-mono tracking-widest text-cyan uppercase">
                <span>Languages</span>
              </h2>
              <div className="resume-section-divider border-b border-white/5" />
              <div className="text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-white">English</span>
                  <span className="text-white/45">Full Professional</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white">Swahili</span>
                  <span className="text-white/45">Native / Bilingual</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right panel */}
          <div className="space-y-10">
            
            {/* Experience list */}
            <div className="space-y-6">
              <h2 className="text-xs font-black font-mono tracking-widest text-cyan uppercase flex items-center gap-2">
                <Briefcase size={12} />
                <span>Work Experience</span>
              </h2>
              <div className="resume-section-divider border-b border-white/5" />

              {/* Annex */}
              <div className="space-y-2">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="font-bold text-white text-xs sm:text-sm">Senior Software Quality Assurance Engineer</h3>
                    <p className="text-xs text-cyan font-mono">Annex Technologies Limited</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-white">Jan 2024 – Present</p>
                    <p className="text-[10px] text-white/45 font-mono">Kenya · Hybrid</p>
                  </div>
                </div>
                <ul className="list-disc list-outside pl-4 space-y-1.5 text-xs text-white/60 leading-relaxed">
                  <li>Performed API testing using Postman and validated backend functionality with SQL queries, ensuring data integrity and system compliance.</li>
                  <li>Assisted in automation testing, reducing manual testing effort and contributing to CI/CD quality pipelines.</li>
                  <li>Provided first-line application support to internal users, escalating complex incidents through proper channels.</li>
                  <li>Documented workflows, test procedures, and QA processes to support knowledge retention and operational continuity.</li>
                </ul>
              </div>

              {/* Kiwami Intern */}
              <div className="space-y-2">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="font-bold text-white text-xs sm:text-sm">Software Testing Intern</h3>
                    <p className="text-xs text-cyan font-mono">Kiwami Tech Solutions</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-white">Aug 2025 – Present</p>
                    <p className="text-[10px] text-white/45 font-mono">Nairobi, Kenya · Part-time</p>
                  </div>
                </div>
                <ul className="list-disc list-outside pl-4 space-y-1.5 text-xs text-white/60 leading-relaxed">
                  <li>Designed and maintained reusable test case management components, execution workflow interfaces, and real-time analytics dashboards to support performance monitoring.</li>
                  <li>Collaborated with backend engineers to validate REST API integrations, verifying accurate display of live test execution results, logs, and dashboards.</li>
                  <li>Performed frontend testing, debugging, and defect reporting; participated in Agile sprints to ensure quality across iterative releases.</li>
                </ul>
              </div>

              {/* RemboGlow */}
              <div className="space-y-2">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="font-bold text-white text-xs sm:text-sm">Co-Founder & Lead Engineer</h3>
                    <p className="text-xs text-cyan font-mono">RemboGlow (remboglow.com)</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-white">Aug 2025 – Present</p>
                    <p className="text-[10px] text-white/45 font-mono">Nairobi, Kenya</p>
                  </div>
                </div>
                <ul className="list-disc list-outside pl-4 space-y-1.5 text-xs text-white/60 leading-relaxed">
                  <li>Co-founded and engineered a beauty-tech digital platform owning architecture design, frontend development, deployment, and monitoring of pilot solutions.</li>
                  <li>Conducted user research and feedback collection to iterate UI/UX and align product development with user needs.</li>
                  <li>Documented learnings, case studies, and operational processes to support knowledge transfer and future scaling.</li>
                </ul>
              </div>

              {/* Tari Africa */}
              <div className="space-y-2">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="font-bold text-white text-xs sm:text-sm">Software Engineer</h3>
                    <p className="text-xs text-cyan font-mono">Tari Africa Platforms</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-white">Jan 2025 – Jun 2025</p>
                    <p className="text-[10px] text-white/45 font-mono">Nairobi, Kenya · Contract</p>
                  </div>
                </div>
                <ul className="list-disc list-outside pl-4 space-y-1.5 text-xs text-white/60 leading-relaxed">
                  <li>Designed and managed relational databases in MySQL, supporting data entry, cleanup, and migration tasks.</li>
                  <li>Built real-time dashboards centralizing compliance and financial reporting supporting performance monitoring responsibilities.</li>
                  <li>Maintained configuration and integration documentation ensuring compliance and knowledge continuity.</li>
                  <li>Managed Agile sprint delivery during peak transaction periods, contributing to parallel project execution.</li>
                </ul>
              </div>

              {/* Freelance */}
              <div className="space-y-2">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="font-bold text-white text-xs sm:text-sm">Freelance IT Consultant & Developer</h3>
                    <p className="text-xs text-cyan font-mono">Malila Tech Consultancies</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-white">Apr 2023 – Oct 2025</p>
                    <p className="text-[10px] text-white/45 font-mono">Kenya · Full-time</p>
                  </div>
                </div>
                <ul className="list-disc list-outside pl-4 space-y-1.5 text-xs text-white/60 leading-relaxed">
                  <li>Provided remote and on-site IT support, handling low-to-medium complexity technical issues and escalating complex incidents appropriately.</li>
                  <li>Supported SMEs in data migration from manual to digital systems, improving data accuracy and cutting processing time by up to 40%.</li>
                  <li>Advised clients on cybersecurity best practices password policies, phishing awareness, and endpoint protection.</li>
                  <li>Delivered digital literacy workshops for community groups and NGOs, building capacity in IT tools and web technologies.</li>
                </ul>
              </div>

              {/* Kiwami Attache */}
              <div className="space-y-2">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="font-bold text-white text-xs sm:text-sm">Quality Assurance Attaché</h3>
                    <p className="text-xs text-cyan font-mono">Kiwami Tech Solutions</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-white">Jun 2025 – Aug 2025</p>
                    <p className="text-[10px] text-white/45 font-mono">Nairobi, Kenya</p>
                  </div>
                </div>
                <ul className="list-disc list-outside pl-4 space-y-1.5 text-xs text-white/60 leading-relaxed">
                  <li>Designed manual test cases for a mobile banking app and created automated test scripts, cutting QA task time by 35%.</li>
                  <li>Identified and documented critical bugs in mobile UI flows, preventing a flawed release to 10,000+ users.</li>
                  <li>Participated in sprint reviews, presenting QA findings and contributing to technology roadmap and release decisions.</li>
                </ul>
              </div>

              {/* Remotasks */}
              <div className="space-y-2">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="font-bold text-white text-xs sm:text-sm">Image Annotator & AI Data Specialist</h3>
                    <p className="text-xs text-cyan font-mono">Remotasks</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-white">Jun 2021 – Apr 2024</p>
                    <p className="text-[10px] text-white/45 font-mono">Nairobi, Kenya</p>
                  </div>
                </div>
                <ul className="list-disc list-outside pl-4 space-y-1.5 text-xs text-white/60 leading-relaxed">
                  <li>Applied data annotation, QA, and image processing skills to support AI/ML model training contributing to machine learning pipelines at scale.</li>
                </ul>
              </div>

              {/* JKUAT */}
              <div className="space-y-2">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="font-bold text-white text-xs sm:text-sm">IT Attaché</h3>
                    <p className="text-xs text-cyan font-mono">JKUAT (Jomo Kenyatta University)</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-white">Sep 2023 – Nov 2023</p>
                    <p className="text-[10px] text-white/45 font-mono">Juja, Kenya</p>
                  </div>
                </div>
                <ul className="list-disc list-outside pl-4 space-y-1.5 text-xs text-white/60 leading-relaxed">
                  <li>Assisted in upgrading computer lab infrastructure, improving system stability and boot-up times by 50%.</li>
                  <li>Conducted digital literacy training sessions; authored IT support guides that reduced repeat service requests.</li>
                  <li>Audited system logs for unauthorized access attempts and reported vulnerabilities supporting compliance and security documentation.</li>
                </ul>
              </div>

            </div>

            {/* Education milestones */}
            <div className="space-y-4">
              <h2 className="text-xs font-black font-mono tracking-widest text-cyan uppercase flex items-center gap-2">
                <Award size={12} />
                <span>Education</span>
              </h2>
              <div className="resume-section-divider border-b border-white/5" />
              <div className="space-y-3.5 text-xs">
                <div>
                  <div className="flex justify-between font-bold">
                    <span className="text-white">BSc Information Technology</span>
                    <span className="text-white/45 font-mono">2023 - 2025</span>
                  </div>
                  <p className="text-cyan">Zetech University</p>
                  <p className="text-[10px] text-white/35 mt-0.5">Expected Graduation: November 2026 · Finalist</p>
                </div>
                <div>
                  <div className="flex justify-between font-bold">
                    <span className="text-white">Diploma — Computer Software Engineering</span>
                    <span className="text-white/45 font-mono">2022 - 2023</span>
                  </div>
                  <p className="text-cyan">Zetech University</p>
                  <p className="text-[10px] text-white/35 mt-0.5">Completed</p>
                </div>
                <div>
                  <div className="flex justify-between font-bold">
                    <span className="text-white">Software Development Certification</span>
                    <span className="text-white/45 font-mono">2025</span>
                  </div>
                  <p className="text-cyan">Power Learn Project (PLP Africa)</p>
                  <p className="text-[10px] text-white/35 mt-0.5">Completed</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

function TimelineExplorer({year,setYear,projects,experiences,skills,onClose,isOs=true}:{year:number;setYear:(year:number)=>void;projects:ReturnType<typeof usePortfolioData>["projects"];experiences:ReturnType<typeof usePortfolioData>["experiences"];skills:ReturnType<typeof usePortfolioData>["skills"];onClose?:()=>void;isOs?:boolean}){const milestones:Record<number,{title:string;summary:string;focus:string[]}>={2022:{title:"Foundations",summary:"Building the academic, support, and digital-literacy foundations that shaped a practical technology career.",focus:["IT support","Digital literacy","Security basics"]},2023:{title:"Early practice",summary:"Moving from study into hands-on support, testing, and early product work.",focus:["Manual testing","Jira","Documentation"]},2024:{title:"Quality engineering",summary:"Strengthening delivery confidence through API testing, database validation, and automation workflows.",focus:["Postman","SQL","CI/CD"]},2025:{title:"Product builder",summary:"Shipping full-stack products and collaborating across development, quality, and business needs.",focus:["React","Node.js","PostgreSQL"]},2026:{title:"Systems thinking",summary:"Connecting product engineering, AI workflows, and quality systems into a broader technical practice.",focus:["AI agents","Architecture","Product strategy"]}};const stage=milestones[year];const visibleProjects=projects.filter(project=>Number(project.period.match(/20\d{2}/)?.[0]||2026)<=year);const visibleExperience=experiences.filter(experience=>Number(experience.period.match(/20\d{2}/)?.[0]||2026)<=year);const visibleSkills=skills.slice(0,Math.max(1,year-2021));return <Window eyebrow="TIME MACHINE" title={`${year} / ${stage.title}`} onClose={onClose} isOs={isOs}><div className="timeline-explorer"><div className="timeline-explorer-head"><div><div className="eyebrow"><span/> CAREER EVOLUTION</div><h2>{stage.title}</h2><p>{stage.summary}</p></div><b>{year}</b></div><input aria-label="Explore career year" type="range" min="2022" max="2026" value={year} onChange={event=>setYear(Number(event.target.value))}/><div className="timeline-year-buttons">{[2022,2023,2024,2025,2026].map(value=><button key={value} onClick={()=>setYear(value)} className={value===year?"active":""}>{value}</button>)}</div><div className="timeline-stage-grid"><section><span>FOCUS UNLOCKED</span>{stage.focus.map(item=><Pill key={item}>{item}</Pill>)}</section><section><span>PROJECTS / {visibleProjects.length}</span>{visibleProjects.length?visibleProjects.slice(0,3).map(project=><p key={project.name}>{project.name}</p>):<p>Project work emerges in later stages.</p>}</section><section><span>EXPERIENCE / {visibleExperience.length}</span>{visibleExperience.length?visibleExperience.slice(0,3).map(experience=><p key={experience.role}>{experience.role}</p>):<p>Experience detail appears as the journey advances.</p>}</section><section><span>SKILL GROUPS / {visibleSkills.length}</span>{visibleSkills.map(group=><p key={group.category}>{group.category}</p>)}</section></div></div></Window>}

function Pill({children}:{children:React.ReactNode}){return <span className="pill">{children}</span>}
function Stat({value,label}:{value:string;label:string}){return <div><b className="text-xl">{value}</b><p className="mt-1 text-xs text-white/45">{label}</p></div>}
