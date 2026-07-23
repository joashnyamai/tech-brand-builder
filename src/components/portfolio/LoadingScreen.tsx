import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Terminal, Sparkles } from "lucide-react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [step, setStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // 0: Loading Portfolio (0ms)
    // 1: Initializing Projects (400ms)
    // 2: Loading Experience (850ms)
    // 3: Starting Ava (1300ms)
    // 4: Complete/Welcome (1750ms)
    const timers = [
      setTimeout(() => setStep(1), 400),
      setTimeout(() => setStep(2), 850),
      setTimeout(() => setStep(3), 1300),
      setTimeout(() => setStep(4), 1750),
      setTimeout(() => {
        setIsVisible(false);
        setTimeout(onComplete, 300); // allow fade out animation to finish
      }, 2100)
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-[#070b13] z-[9999] flex flex-col items-center justify-center font-mono text-xs text-muted-foreground select-none"
      >
        <div className="max-w-xs w-full px-6 space-y-6">
          {/* Main loader logo */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-cyan/20 blur-md animate-pulse" />
              <div className="w-10 h-10 rounded-full border border-cyan/30 flex items-center justify-center text-cyan bg-cyan/5">
                <Cpu size={20} className="animate-spin" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-sm tracking-widest text-foreground uppercase">Malila.io</span>
              <span className="text-[9px] uppercase tracking-wider text-cyan font-bold">Systems Diagnostic</span>
            </div>
          </div>

          {/* Sequential items checklist */}
          <div className="space-y-3 bg-[#0a0f1d] border border-white/5 p-4 rounded-xl">
            <div className="flex items-center gap-2">
              <Terminal size={12} className="text-cyan animate-pulse" />
              <span className="text-foreground font-semibold">Initializing profile...</span>
            </div>

            <div className="space-y-2 pt-2 border-t border-white/5">
              <div className="flex items-center justify-between">
                <span>Loading Portfolio</span>
                <span className="text-cyan font-bold">✓</span>
              </div>

              <div className="flex items-center justify-between">
                <span>Initializing Projects</span>
                {step >= 1 ? (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-cyan font-bold">✓</motion.span>
                ) : (
                  <span className="w-2.5 h-2.5 border border-white/20 border-t-cyan rounded-full animate-spin" />
                )}
              </div>

              <div className="flex items-center justify-between">
                <span>Loading Experience</span>
                {step >= 2 ? (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-cyan font-bold">✓</motion.span>
                ) : step >= 1 ? (
                  <span className="w-2.5 h-2.5 border border-white/20 border-t-cyan rounded-full animate-spin" />
                ) : (
                  <span className="text-white/20">...</span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span>Starting Ava AI</span>
                {step >= 3 ? (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-cyan font-bold">✓</motion.span>
                ) : step >= 2 ? (
                  <span className="w-2.5 h-2.5 border border-white/20 border-t-cyan rounded-full animate-spin" />
                ) : (
                  <span className="text-white/20">...</span>
                )}
              </div>
            </div>
          </div>

          {/* Welcome status line */}
          <div className="h-6 text-center text-[10px] text-cyan font-semibold tracking-widest uppercase">
            {step >= 4 && (
              <motion.span
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center gap-1.5"
              >
                <Sparkles size={11} className="animate-pulse" />
                Welcome.
              </motion.span>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
