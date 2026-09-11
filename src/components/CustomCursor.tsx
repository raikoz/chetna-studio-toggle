import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { useMode } from "@/contexts/ModeContext";

interface Particle {
  id: number;
  x: number;
  y: number;
}

export function CustomCursor() {
  const { mode } = useMode();
  const [isHovered, setIsHovered] = useState(false);
  const [isInFooter, setIsInFooter] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [particles, setParticles] = useState<Particle[]>([]);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth responsive spring for the circle
  const mainX = useSpring(cursorX, { stiffness: 800, damping: 35 });
  const mainY = useSpring(cursorY, { stiffness: 800, damping: 35 });

  const isStudio = mode === "studio";
  // In studio mode: dark red (#3a0201) in footer, pure solid white (#ffffff) on page body. No glitching mix-blend.
  const cursorColor = isStudio ? (isInFooter ? "#3a0201" : "#ffffff") : "#3a0201";

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    setIsMobile(!mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsMobile(!e.matches);
    };
    mediaQuery.addEventListener("change", handleMediaChange);

    let counter = 0;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      if (target) {
        const inFooter = Boolean(target.closest("footer") || target.closest("[data-cursor-dark]"));
        setIsInFooter(inFooter);
      }

      counter++;
      // Stardust effect
      if (counter % 4 === 0) {
        const newParticle: Particle = {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
        };
        setParticles((prev) => [...prev.slice(-8), newParticle]);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const inFooter = Boolean(target.closest("footer") || target.closest("[data-cursor-dark]"));
      setIsInFooter(inFooter);

      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.closest("select") ||
        target.closest("[role='button']") ||
        target.closest(".cursor-pointer")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  useEffect(() => {
    if (particles.length === 0) return;
    const interval = setInterval(() => {
      setParticles((prev) => prev.slice(1));
    }, 90);
    return () => clearInterval(interval);
  }, [particles]);

  if (isMobile || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Stardust particles trail */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0.6, scale: 1 }}
          animate={{ opacity: 0, scale: 0.2 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          style={{
            position: "fixed",
            left: p.x - 1.5,
            top: p.y - 1.5,
            width: 3,
            height: 3,
            backgroundColor: cursorColor,
          }}
          className="rounded-full pointer-events-none transition-colors duration-200"
        />
      ))}

      {/* Main clean circle pointer: inverts to #3a0201 in footer, white on page, shrinks on hover, no glitch effect */}
      <motion.div
        style={{
          x: mainX,
          y: mainY,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: cursorColor,
        }}
        animate={{
          scale: isHovered ? 0.45 : 1, // Shrinks on hover
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="fixed w-3 h-3 rounded-full pointer-events-none transition-colors duration-200"
      />
    </div>
  );
}
