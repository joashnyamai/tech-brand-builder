import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  FileText,
  User,
  Briefcase,
  Cpu,
  FolderGit,
  Command,
  Bot,
  Sliders,
  Sun,
  Mail
} from "lucide-react";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onTriggerResume: () => void;
  onTriggerAva: () => void;
}

export default function CommandPalette({
  isOpen,
  onClose,
  onTriggerResume,
  onTriggerAva
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open palette
          const btn = document.getElementById("trigger-command-palette");
          if (btn) btn.click();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const items = [
    {
      category: "Navigation",
      commands: [
        { icon: <User size={14} />, label: "Go to About Me", action: () => { document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }); onClose(); } },
        { icon: <Cpu size={14} />, label: "Go to Technical Skills", action: () => { document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" }); onClose(); } },
        { icon: <Briefcase size={14} />, label: "Go to Work Experience", action: () => { document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" }); onClose(); } },
        { icon: <FolderGit size={14} />, label: "Go to Featured Projects", action: () => { document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); onClose(); } },
        { icon: <Cpu size={14} />, label: "Open Portfolio Knowledge Graph", action: () => { document.querySelector<HTMLButtonElement>('button[title="Skill Graph"]')?.click(); onClose(); } },
        { icon: <Mail size={14} />, label: "Go to Contact Details", action: () => { document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); onClose(); } }
      ]
    },
    {
      category: "Actions & Tools",
      commands: [
        { icon: <FileText size={14} />, label: "View Interactive CV", action: () => { onTriggerResume(); onClose(); } },
        { icon: <Bot size={14} />, label: "Ask Ava AI Assistant", action: () => { onTriggerAva(); onClose(); } },
        { icon: <Sliders size={14} />, label: "Open LLM Sync & Match AI Lab", action: () => { window.location.href = "/ai-lab"; onClose(); } },
        { icon: <Sun size={14} />, label: "Cycle Theme Accents", action: () => {
          // Cycle accent colors
          const trigger = document.getElementById("theme-cycle-button");
          if (trigger) {
            trigger.click();
          } else {
            // Emulate click on theme toggle
            const toggle = document.querySelector('[aria-label="Theme toggle"]') as HTMLButtonElement;
            toggle?.click();
          }
          onClose();
        }}
      ]
    }
  ];

  const filteredItems = items
    .map(cat => ({
      category: cat.category,
      commands: cat.commands.filter(cmd =>
        cmd.label.toLowerCase().includes(query.toLowerCase())
      )
    }))
    .filter(cat => cat.commands.length > 0);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[999] flex items-start justify-center pt-[15vh]">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#06080e]/80 backdrop-blur-md"
        />

        {/* Palette Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: -10 }}
          transition={{ duration: 0.15 }}
          className="relative w-full max-w-lg bg-[#0a0f1d] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10"
        >
          {/* Search bar */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/5 bg-navy-surface/40">
            <Search size={16} className="text-muted-foreground" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search sections or execute actions... (e.g. Resume)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
            <div className="flex items-center gap-0.5 px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] font-bold text-muted-foreground font-mono">
              <Command size={9} />
              <span>K</span>
            </div>
          </div>

          {/* Results list */}
          <div className="max-h-[320px] overflow-y-auto p-2.5 space-y-3.5">
            {filteredItems.length > 0 ? (
              filteredItems.map((cat) => (
                <div key={cat.category} className="space-y-1">
                  <span className="text-[10px] font-bold text-cyan uppercase tracking-widest px-2.5 block mb-1">
                    {cat.category}
                  </span>
                  <div className="space-y-0.5">
                    {cat.commands.map((cmd) => (
                      <button
                        key={cmd.label}
                        onClick={cmd.action}
                        className="w-full flex items-center gap-3 px-3 py-2 text-xs text-muted-foreground hover:text-cyan hover:bg-cyan/5 border border-transparent hover:border-cyan/15 rounded-xl transition-all text-left"
                      >
                        <span className="text-muted-foreground group-hover:text-cyan">{cmd.icon}</span>
                        <span className="font-medium">{cmd.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-xs text-muted-foreground">
                No matching sections or actions found. Try typing <span className="text-cyan font-mono font-bold">Resume</span> or <span className="text-cyan font-mono font-bold">About</span>.
              </div>
            )}
          </div>
          <div className="px-4 py-2 bg-[#080d19] border-t border-white/5 text-[9px] text-muted-foreground flex items-center justify-between">
            <span>Use <kbd className="font-mono text-[8px] bg-white/5 px-1 py-0.5 rounded border border-white/10">ESC</kbd> to dismiss</span>
            <span>Malila Nyamai Portfolio</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
