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

  // Bauhaus smooth geometric springs
  const mainX = useSpring(cursorX, { stiffness: 700, damping: 35 });
  const mainY = useSpring(cursorY, { stiffness: 700, damping: 35 });

  const trailingX = useSpring(cursorX, { stiffness: 220, damping: 25 });
  const trailingY = useSpring(cursorY, { stiffness: 220, damping: 25 });

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

      counter++;
      if (counter % 5 === 0) {
        const newParticle: Particle = {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
        };
        setParticles((prev) => [...prev.slice(-6), newParticle]);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

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

  useEffect(() => {
    if (particles.length === 0) return;
    const interval = setInterval(() => {
      setParticles((prev) => prev.slice(1));
    }, 100);
    return () => clearInterval(interval);
  }, [particles]);

  if (isMobile || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Bauhaus minimal geometric dust points */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0.5, scale: 1 }}
          animate={{ opacity: 0, scale: 0.2 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{
            position: "fixed",
            left: p.x - 1.5,
            top: p.y - 1.5,
            width: 3,
            height: 3,
          }}
          className="bg-foreground pointer-events-none"
        />
      ))}

      {/* Trailing flat Bauhaus square */}
      <motion.div
        style={{
          x: trailingX,
          y: trailingY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 1.5 : 1,
          rotate: isHovered ? 45 : 0,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className="fixed w-7 h-7 border border-foreground/50 pointer-events-none bg-transparent"
      />

      {/* Main center solid geometric dot */}
      <motion.div
        style={{
          x: mainX,
          y: mainY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 0.5 : 1,
        }}
        className="fixed w-2 h-2 bg-foreground pointer-events-none"
      />
    </div>
  );
}
