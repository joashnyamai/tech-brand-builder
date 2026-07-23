import { useEffect, useRef } from "react";

export default function MatrixRain({ onClose }: { onClose: () => void }) {
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

    // Alphanumeric characters + Katakana
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$#@%&*+=:;<>?アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);

    // Initial drops y coordinates
    const rainDrops: number[] = Array(columns).fill(1);

    const draw = () => {
      // Semi-transparent black background to create trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0f0"; // Green matrix text
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        const x = i * fontSize;
        const y = rainDrops[i] * fontSize;

        ctx.fillText(text, x, y);

        // Reset drop to top randomly
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

    // Interaction handler to exit screensaver
    const handleExit = () => {
      onClose();
    };

    // Any mouse move, keypress, or click exits screensaver
    window.addEventListener("mousemove", handleExit);
    window.addEventListener("keydown", handleExit);
    window.addEventListener("mousedown", handleExit);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleExit);
      window.removeEventListener("keydown", handleExit);
      window.removeEventListener("mousedown", handleExit);
      cancelAnimationFrame(animationFrameId);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[9999] bg-black">
      <canvas ref={canvasRef} className="block w-full h-full" />
      <div className="absolute top-5 left-5 font-mono text-[10px] text-emerald-500/50 pointer-events-none uppercase tracking-widest">
        MALILA.OS // SCREEN SAVER ACTIVE // PRESS ANY KEY OR MOVE MOUSE TO EXIT
      </div>
    </div>
  );
}
