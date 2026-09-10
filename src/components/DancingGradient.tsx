import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useMode } from "@/contexts/ModeContext";

export function DancingGradient() {
  const { mode } = useMode();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tracking for interactive liquid cursor dance
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { stiffness: 120, damping: 20 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const xPercent = useTransform(smoothX, [0, 1], ["0%", "100%"]);
  const yPercent = useTransform(smoothY, [0, 1], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-56 sm:h-64 md:h-80 lg:h-96 overflow-hidden select-none cursor-pointer"
      style={{
        background:
          mode === "studio"
            ? "hsl(0 93% 12%)"
            : "#ffffff",
      }}
    >
      {/* Dynamic Animated Liquid Orbs that Breathe and Dance */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Living Breathing Orb 1: Rich Crimson & Scarlet Pulse */}
        <motion.div
          animate={{
            x: ["-10%", "15%", "-5%", "-10%"],
            y: ["0%", "20%", "-15%", "0%"],
            scale: [1, 1.25, 0.95, 1],
            rotate: [0, 45, -20, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-1/4 -left-1/4 w-[90vw] h-[90vw] max-w-[800px] max-h-[800px] rounded-full blur-[90px] opacity-70 mix-blend-screen"
          style={{
            background:
              mode === "studio"
                ? "radial-gradient(circle, rgba(168, 18, 18, 0.85) 0%, rgba(126, 2, 0, 0.5) 50%, transparent 75%)"
                : "radial-gradient(circle, rgba(220, 38, 38, 0.3) 0%, rgba(254, 226, 226, 0.5) 50%, transparent 75%)",
          }}
        />

        {/* Living Breathing Orb 2: Deep Wine & Amber Rhythm */}
        <motion.div
          animate={{
            x: ["10%", "-15%", "5%", "10%"],
            y: ["10%", "-10%", "25%", "10%"],
            scale: [1.1, 0.9, 1.2, 1.1],
            rotate: [0, -30, 40, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 -right-1/4 w-[85vw] h-[85vw] max-w-[750px] max-h-[750px] rounded-full blur-[100px] opacity-65 mix-blend-screen"
          style={{
            background:
              mode === "studio"
                ? "radial-gradient(circle, rgba(190, 24, 24, 0.75) 0%, rgba(140, 5, 5, 0.45) 55%, transparent 80%)"
                : "radial-gradient(circle, rgba(251, 113, 133, 0.35) 0%, rgba(244, 63, 94, 0.2) 60%, transparent 80%)",
          }}
        />

        {/* Living Breathing Orb 3: Champagne / Soft Coral Undulation at bottom boundary */}
        <motion.div
          animate={{
            x: ["-20%", "20%", "-10%", "-20%"],
            y: ["15%", "-5%", "10%", "15%"],
            scale: [0.95, 1.15, 1.05, 0.95],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-1/3 left-1/4 w-[75vw] h-[75vw] max-w-[700px] max-h-[700px] rounded-full blur-[80px] opacity-80"
          style={{
            background:
              mode === "studio"
                ? "radial-gradient(circle, rgba(255, 120, 120, 0.45) 0%, rgba(255, 200, 200, 0.2) 45%, transparent 70%)"
                : "radial-gradient(circle, rgba(254, 205, 211, 0.6) 0%, rgba(255, 255, 255, 0.8) 55%, transparent 80%)",
          }}
        />

        {/* Interactive Mouse Dancing Fluid Light Ripple */}
        <motion.div
          animate={{
            scale: isHovered ? 1.35 : 1,
            opacity: isHovered ? 0.75 : 0.4,
          }}
          transition={{ duration: 0.4 }}
          className="absolute -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-96 sm:h-96 rounded-full blur-[60px] pointer-events-none"
          style={{
            left: xPercent,
            top: yPercent,
            background:
              mode === "studio"
                ? "radial-gradient(circle, rgba(255, 150, 150, 0.6) 0%, rgba(210, 40, 40, 0.3) 45%, transparent 75%)"
                : "radial-gradient(circle, rgba(244, 63, 94, 0.4) 0%, rgba(253, 164, 175, 0.2) 50%, transparent 75%)",
          }}
        />
      </div>

      {/* Fluid Undulating SVG Wave Ribbon */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <motion.path
            fill="none"
            stroke={mode === "studio" ? "rgba(255, 255, 255, 0.15)" : "rgba(126, 2, 0, 0.12)"}
            strokeWidth="2"
            animate={{
              d: [
                "M0,160 C320,100, 420,240, 720,170 C1020,100, 1120,220, 1440,160",
                "M0,170 C320,230, 420,90, 720,160 C1020,230, 1120,110, 1440,170",
                "M0,150 C320,80, 420,250, 720,180 C1020,110, 1120,240, 1440,150",
                "M0,160 C320,100, 420,240, 720,170 C1020,100, 1120,220, 1440,160",
              ],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.path
            fill="none"
            stroke={mode === "studio" ? "rgba(255, 180, 180, 0.18)" : "rgba(126, 2, 0, 0.08)"}
            strokeWidth="1.5"
            animate={{
              d: [
                "M0,200 C360,260, 480,120, 780,210 C1080,290, 1200,140, 1440,200",
                "M0,190 C360,130, 480,270, 780,190 C1080,120, 1200,260, 1440,190",
                "M0,210 C360,280, 480,140, 780,220 C1080,290, 1200,160, 1440,210",
                "M0,200 C360,260, 480,120, 780,210 C1080,290, 1200,140, 1440,200",
              ],
            }}
            transition={{
              duration: 13,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </svg>
      </div>

      {/* Multi-Stop Non-Linear Smoothing Mask (Seamless transition from background at top to pure #ffffff at bottom) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            mode === "studio"
              ? "linear-gradient(180deg, hsl(0 93% 12% / 0.95) 0%, hsl(0 91% 13.5% / 0.7) 18%, hsl(0 87% 16% / 0.45) 35%, hsl(0 75% 26% / 0.25) 52%, hsl(0 55% 48% / 0.15) 68%, rgba(255, 255, 255, 0.4) 82%, rgba(255, 255, 255, 0.85) 93%, #ffffff 100%)"
              : "linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 245, 245, 0.6) 20%, rgba(254, 226, 226, 0.3) 45%, rgba(255, 255, 255, 0.5) 75%, #ffffff 100%)",
        }}
      />
    </div>
  );
}
