import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu } from "lucide-react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Matrix characters
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$#@%&*+=:;<>?アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);

    // Initial drops y coordinates
    const rainDrops: number[] = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0f0"; // Matrix Green
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        const x = i * fontSize;
        const y = rainDrops[i] * fontSize;

        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };

    const loop = () => {
      draw();
      animationFrameId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, filter: "blur(8px)" }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 bg-black z-[9999] flex flex-col items-center justify-center font-mono select-none overflow-hidden"
      >
        <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full opacity-60" />

        {/* Center Panel Dialog */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative max-w-sm w-[90%] mx-auto p-6 md:p-8 rounded-2xl bg-[#030708]/85 border border-cyan/25 backdrop-blur-md shadow-[0_0_50px_rgba(0,255,0,0.15)] text-center space-y-6 z-10"
        >
          {/* Cyber Decorators */}
          <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan rounded-tl-lg" />
          <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan rounded-tr-lg" />
          <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan rounded-bl-lg" />
          <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan rounded-br-lg" />

          {/* Logo Title */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full border-2 border-cyan/20 flex items-center justify-center text-cyan bg-cyan/5 animate-pulse">
              <Cpu size={22} />
            </div>
            <div>
              <h1 className="font-display font-black text-lg tracking-widest text-foreground uppercase mt-2">MALILA.OS</h1>
              <span className="text-[9px] uppercase tracking-widest text-cyan font-bold block mt-0.5">Systems Initializer v3.1</span>
            </div>
          </div>

          <div className="space-y-2 py-4 border-t border-b border-white/10 text-left text-[11px] text-white/60">
            <div className="flex items-center justify-between font-mono">
              <span>HOST:</span>
              <span className="text-cyan font-bold">localhost:8080</span>
            </div>
            <div className="flex items-center justify-between font-mono">
              <span>LOCATION:</span>
              <span className="text-foreground">Nairobi, Kenya</span>
            </div>
            <div className="flex items-center justify-between font-mono">
              <span>CORE CREDENTIALS:</span>
              <span className="text-cyan">Full-Stack & QA</span>
            </div>
            <div className="flex items-center justify-between font-mono">
              <span>STATUS:</span>
              <span className="text-emerald-500 font-bold tracking-wider animate-pulse">READY</span>
            </div>
          </div>

          {/* Glowing Entry Button */}
          <button 
            onClick={() => {
              setIsVisible(false);
              setTimeout(onComplete, 400); // allow exit animations to complete
            }}
            className="w-full py-3 rounded-xl bg-cyan text-slate-950 text-xs font-black uppercase tracking-widest transition-all duration-300 hover:bg-cyan/90 hover:scale-[1.02] shadow-[0_0_20px_rgba(6,182,212,0.35)] cursor-pointer block"
          >
            Access Malila.OS
          </button>

          <p className="text-[8px] text-white/30 font-mono tracking-wider">
            SECURE AUTH PROTOCOL // HTTP2-TLS1.3 CERTIFIED
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
