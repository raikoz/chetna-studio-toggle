import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useMode } from "@/contexts/ModeContext";

export function DancingGradient() {
  const { mode } = useMode();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Interactive mouse tracking for fluid water pull
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { stiffness: 100, damping: 22 };
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
      className="relative w-full h-56 sm:h-64 md:h-80 lg:h-96 overflow-hidden select-none"
      style={{
        backgroundColor: mode === "studio" ? "hsl(0 93% 12%)" : "#ffffff",
      }}
    >
      {/* Background Liquid Light Atmosphere (Dark Red/Crimson Aurora) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Living Breathing Orb 1: Rich Crimson Pulse */}
        <motion.div
          animate={{
            x: ["-10%", "12%", "-5%", "-10%"],
            y: ["0%", "15%", "-10%", "0%"],
            scale: [1, 1.2, 0.95, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-1/4 -left-1/4 w-[85vw] h-[85vw] max-w-[750px] max-h-[750px] rounded-full blur-[90px] opacity-75 mix-blend-screen"
          style={{
            background:
              mode === "studio"
                ? "radial-gradient(circle, rgba(185, 20, 20, 0.85) 0%, rgba(126, 2, 0, 0.5) 50%, transparent 75%)"
                : "radial-gradient(circle, rgba(244, 63, 94, 0.25) 0%, rgba(254, 226, 226, 0.4) 50%, transparent 75%)",
          }}
        />

        {/* Living Breathing Orb 2: Deep Scarlet Rhythm */}
        <motion.div
          animate={{
            x: ["10%", "-12%", "5%", "10%"],
            y: ["5%", "-10%", "15%", "5%"],
            scale: [1.05, 0.9, 1.15, 1.05],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 -right-1/4 w-[80vw] h-[80vw] max-w-[700px] max-h-[700px] rounded-full blur-[100px] opacity-70 mix-blend-screen"
          style={{
            background:
              mode === "studio"
                ? "radial-gradient(circle, rgba(210, 28, 28, 0.75) 0%, rgba(140, 5, 5, 0.45) 55%, transparent 80%)"
                : "radial-gradient(circle, rgba(251, 113, 133, 0.3) 0%, rgba(244, 63, 94, 0.15) 60%, transparent 80%)",
          }}
        />

        {/* Interactive Fluid Cursor Light */}
        <motion.div
          animate={{
            scale: isHovered ? 1.3 : 1,
            opacity: isHovered ? 0.7 : 0.35,
          }}
          transition={{ duration: 0.35 }}
          className="absolute -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 rounded-full blur-[65px] pointer-events-none"
          style={{
            left: xPercent,
            top: yPercent,
            background:
              mode === "studio"
                ? "radial-gradient(circle, rgba(255, 140, 140, 0.65) 0%, rgba(200, 30, 30, 0.35) 45%, transparent 75%)"
                : "radial-gradient(circle, rgba(244, 63, 94, 0.35) 0%, rgba(253, 164, 175, 0.2) 50%, transparent 75%)",
          }}
        />
      </div>

      {/* Living Breathing Whole Gradient Wave (Flowing White Wave of the Footer) */}
      <div className="absolute inset-0 pointer-events-none">
        <svg
          viewBox="0 0 1440 360"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          {/* WAVE 1 (Back Layer): Soft Translucent White Mist */}
          <motion.path
            fill={mode === "studio" ? "rgba(255, 255, 255, 0.22)" : "rgba(255, 255, 255, 0.4)"}
            animate={{
              d: [
                "M0,130 C320,70, 520,190, 780,130 C1040,80, 1220,180, 1440,110 L1440,360 L0,360 Z",
                "M0,150 C300,190, 500,80, 760,150 C1020,210, 1200,100, 1440,160 L1440,360 L0,360 Z",
                "M0,120 C340,60, 540,180, 800,120 C1060,70, 1240,170, 1440,120 L1440,360 L0,360 Z",
                "M0,130 C320,70, 520,190, 780,130 C1040,80, 1220,180, 1440,110 L1440,360 L0,360 Z",
              ],
            }}
            transition={{
              duration: 11,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* WAVE 2 (Middle Layer): Luminous Semi-Solid White Flow */}
          <motion.path
            fill={mode === "studio" ? "rgba(255, 255, 255, 0.58)" : "rgba(255, 255, 255, 0.75)"}
            animate={{
              d: [
                "M0,180 C280,240, 480,130, 740,190 C1000,250, 1180,140, 1440,180 L1440,360 L0,360 Z",
                "M0,200 C320,140, 520,250, 780,180 C1040,120, 1220,230, 1440,210 L1440,360 L0,360 Z",
                "M0,170 C290,230, 490,120, 750,200 C1010,260, 1190,150, 1440,170 L1440,360 L0,360 Z",
                "M0,180 C280,240, 480,130, 740,190 C1000,250, 1180,140, 1440,180 L1440,360 L0,360 Z",
              ],
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* WAVE 3 (Front Layer): Solid Pure White (#ffffff) Wave Body Merging Seamlessly into Footer */}
          <motion.path
            fill="#ffffff"
            animate={{
              d: [
                "M0,230 C340,170, 540,280, 820,210 C1100,150, 1260,260, 1440,210 L1440,360 L0,360 Z",
                "M0,250 C360,270, 560,180, 840,230 C1120,280, 1280,180, 1440,240 L1440,360 L0,360 Z",
                "M0,220 C330,160, 530,270, 810,200 C1090,140, 1250,250, 1440,200 L1440,360 L0,360 Z",
                "M0,230 C340,170, 540,280, 820,210 C1100,150, 1260,260, 1440,210 L1440,360 L0,360 Z",
              ],
            }}
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </svg>
      </div>
    </div>
  );
}
