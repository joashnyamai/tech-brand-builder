import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, BriefcaseBusiness, Code2, FileText, Github, GitCommitHorizontal, Layers3, Sparkles, X } from "lucide-react";
import { usePortfolioData } from "@/hooks/use-portfolio-data";

type Tour = "Recruiter" | "Client" | "Developer";

const years = [2022, 2023, 2024, 2025, 2026];
const anchors: Record<Tour, string> = { Recruiter: "experience", Client: "projects", Developer: "skills" };
const copy: Record<Tour, string> = {
  Recruiter: "I’ll take you through impact, experience, and the interactive CV.",
  Client: "I’ll show the problems solved, project outcomes, and the work behind them.",
  Developer: "I’ll map the stack, architectures, and technical decisions together.",
};

export function AvaTourGuide({ onOpenResume }: { onOpenResume: () => void }) {
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState<Tour | null>(null);
  const start = (tour: Tour) => {
    setSelected(tour);
    document.getElementById(anchors[tour])?.scrollIntoView({ behavior: "smooth", block: "start" });
    if (tour === "Recruiter") window.setTimeout(onOpenResume, 700);
  };
  return <AnimatePresence>{open && <motion.aside initial={{ opacity: 0, x: 24, y: 12 }} animate={{ opacity: 1, x: 0, y: 0 }} exit={{ opacity: 0, x: 24 }} transition={{ delay: .3 }} className="ava-tour no-print"><button className="ava-tour-close" onClick={() => setOpen(false)} aria-label="Dismiss Ava tour"><X size={14}/></button><div className="ava-tour-icon"><Bot size={19}/></div><p className="ava-tour-kicker">AVA / TOUR GUIDE</p><h2>Hi, I can show you around.</h2><p className="ava-tour-copy">{selected ? copy[selected] : "Pick a path and I’ll guide you through the most relevant parts of Malila’s portfolio."}</p><div className="ava-tour-options">{(["Recruiter", "Client", "Developer"] as Tour[]).map((tour, index) => <button key={tour} onClick={() => start(tour)}><span>0{index + 1}</span>{tour}<span>→</span></button>)}</div></motion.aside>}</AnimatePresence>;
}

export function PortfolioGraph({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { projects, experiences, skills } = usePortfolioData();
  const [selected, setSelected] = useState("React");
  const [year, setYear] = useState(2026);
  const nodes = [
    { name: "React", x: 25, y: 36, type: "skill" }, { name: "Node.js", x: 72, y: 34, type: "skill" },
    { name: "E-Foleni", x: 48, y: 52, type: "project" }, { name: "PostgreSQL", x: 26, y: 72, type: "skill" },
    { name: "Quality Engineering", x: 73, y: 72, type: "experience" }, { name: "AI", x: 51, y: 18, type: "skill" },
  ];
  const detail = useMemo(() => {
    const relatedProjects = projects.filter(project => project.stack.some(stack => stack.toLowerCase().includes(selected.toLowerCase()) || selected.toLowerCase().includes(stack.toLowerCase()))).slice(0, 3);
    const relatedExperience = experiences.filter(experience => experience.tech.some(tech => tech.toLowerCase().includes(selected.toLowerCase()) || selected.toLowerCase().includes(tech.toLowerCase()))).slice(0, 2);
    return { relatedProjects, relatedExperience };
  }, [experiences, projects, selected]);
  const visibleProjects = projects.filter(project => year >= 2025 || project.name === "E-Foleni");
  return <AnimatePresence>{open && <motion.div className="graph-layer no-print" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><motion.section initial={{ scale: .97, y: 15 }} animate={{ scale: 1, y: 0 }} exit={{ scale: .97, y: 15 }} className="graph-workspace"><header><div><span className="graph-kicker"><Sparkles size={12}/> PORTFOLIO INTELLIGENCE</span><h2>Knowledge graph</h2></div><button onClick={onClose} aria-label="Close graph"><X size={18}/></button></header><div className="graph-layout"><div className="graph-stage"><svg viewBox="0 0 100 100" preserveAspectRatio="none"><line x1="25" y1="36" x2="48" y2="52"/><line x1="72" y1="34" x2="48" y2="52"/><line x1="51" y1="18" x2="25" y2="36"/><line x1="51" y1="18" x2="72" y2="34"/><line x1="48" y1="52" x2="26" y2="72"/><line x1="48" y1="52" x2="73" y2="72"/></svg>{nodes.map(node => <button key={node.name} onClick={() => setSelected(node.name)} style={{ left: `${node.x}%`, top: `${node.y}%` }} className={`intelligence-node ${node.type} ${selected === node.name ? "active" : ""}`}>{node.name}</button>)}</div><aside className="graph-inspector"><span className="graph-kicker">SELECTED NODE</span><h3>{selected}</h3><p>Click any node to reshape this view around the work, experience, and system decisions connected to it.</p><section><b><BriefcaseBusiness size={13}/> Projects ({detail.relatedProjects.length})</b>{detail.relatedProjects.length ? detail.relatedProjects.map(project => <button key={project.name} onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>{project.name} <span>↗</span></button>) : <small>Explore E-Foleni for a connected project case study.</small>}</section><section><b><Code2 size={13}/> Experience ({detail.relatedExperience.length})</b>{detail.relatedExperience.map(experience => <button key={experience.role} onClick={() => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })}>{experience.role} <span>↗</span></button>)}</section><section><b><Layers3 size={13}/> Skills</b><small>{skills.flatMap(group => group.skills).slice(0, 6).join(" · ")}</small></section></aside></div><footer className="graph-timeline"><div><span>CAREER TIME MACHINE</span><strong>{year}</strong></div><input aria-label="Graph career timeline" type="range" min="2022" max="2026" value={year} onChange={event => setYear(Number(event.target.value))}/><div className="graph-year-labels">{years.map(value => <span key={value}>{value}</span>)}</div><p>{visibleProjects.length} project{visibleProjects.length === 1 ? "" : "s"} visible at this point in the journey.</p></footer></motion.section></motion.div>}</AnimatePresence>;
}

export function LiveActivity() {
  const [activity, setActivity] = useState("Syncing public GitHub activity…");
  useEffect(() => {
    const controller = new AbortController();
    fetch("https://api.github.com/users/joashnyamai/events/public?per_page=1", { signal: controller.signal })
      .then(response => response.ok ? response.json() : Promise.reject(new Error("GitHub unavailable")))
      .then((events: Array<{ repo?: { name?: string }; created_at?: string }>) => {
        const event = events[0];
        if (!event?.repo?.name || !event.created_at) return;
        const minutes = Math.max(1, Math.round((Date.now() - new Date(event.created_at).getTime()) / 60000));
        setActivity(`${event.repo.name.replace("joashnyamai/", "")} · ${minutes < 60 ? `${minutes} min ago` : "recent activity"}`);
      })
      .catch(() => setActivity("Latest work: portfolio and product experiments"));
    return () => controller.abort();
  }, []);
  return <aside className="live-activity no-print"><div><span className="activity-live"/> LIVE / NOW</div><strong>Building in public</strong><p>Currently refining an e-commerce checkout experience.</p><footer><Github size={12}/> <span>GitHub</span><b>{activity}</b></footer><a href="#ai-lab-teaser"><GitCommitHorizontal size={13}/> Explore the AI lab</a></aside>;
}
