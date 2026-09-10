import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
}

export function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [particles, setParticles] = useState<Particle[]>([]);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Springs for smooth following
  const mainX = useSpring(cursorX, { stiffness: 600, damping: 30 });
  const mainY = useSpring(cursorY, { stiffness: 600, damping: 30 });

  const trailingX = useSpring(cursorX, { stiffness: 180, damping: 20 });
  const trailingY = useSpring(cursorY, { stiffness: 180, damping: 20 });

  useEffect(() => {
    // Check if device has hover capability
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    setIsMobile(!mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsMobile(!e.matches);
    };
    mediaQuery.addEventListener("change", handleMediaChange);

    let particleCounter = 0;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Spawn dust particle every few moves
      particleCounter++;
      if (particleCounter % 4 === 0) {
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

    // Interactive element hover detection
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
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

  // Clean up old dust particles
  useEffect(() => {
    if (particles.length === 0) return;
    const interval = setInterval(() => {
      setParticles((prev) => prev.slice(1));
    }, 120);
    return () => clearInterval(interval);
  }, [particles]);

  if (isMobile || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Dust particles */}
      {particles.map((p, index) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0.7, scale: 1 }}
          animate={{ opacity: 0, scale: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{
            position: "fixed",
            left: p.x - 2,
            top: p.y - 2,
            width: 4,
            height: 4,
          }}
          className="bg-foreground pointer-events-none"
        />
      ))}

      {/* Trailing outer brutalist square */}
      <motion.div
        style={{
          x: trailingX,
          y: trailingY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 1.6 : 1,
          rotate: isHovered ? 45 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="fixed w-8 h-8 border border-foreground/60 pointer-events-none mix-blend-difference bg-transparent"
      />

      {/* Main center solid brutalist dot */}
      <motion.div
        style={{
          x: mainX,
          y: mainY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 0.4 : 1,
        }}
        className="fixed w-2 h-2 bg-foreground pointer-events-none"
      />
    </div>
  );
}
