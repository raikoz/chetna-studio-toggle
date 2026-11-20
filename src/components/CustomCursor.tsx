import React, { useEffect, useState, useRef } from "react";

function checkIsWhiteBackground(el: HTMLElement | null): boolean {
  let current: HTMLElement | null = el;
  while (current && current !== document.body && current !== document.documentElement) {
    if (current.hasAttribute("data-cursor-dark")) return true;

    const style = window.getComputedStyle(current);
    const bg = style.backgroundColor;
    if (bg && bg !== "transparent" && bg !== "rgba(0, 0, 0, 0)") {
      const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (match) {
        const r = parseInt(match[1], 10);
        const g = parseInt(match[2], 10);
        const b = parseInt(match[3], 10);
        // Calculate perceived brightness / luminance
        const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
        if (luminance > 180) {
          return true;
        } else {
          return false;
        }
      }
    }
    current = current.parentElement;
  }
  return false;
}

export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [isOverWhite, setIsOverWhite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Only activate for devices with mouse / fine pointer
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!media.matches) return;

    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      posRef.current.x = e.clientX;
      posRef.current.y = e.clientY;

      if (!visible) setVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        setIsOverWhite(checkIsWhiteBackground(target));

        const interactive = Boolean(
          target.closest("a") ||
          target.closest("button") ||
          target.closest("[role='button']") ||
          target.closest(".cursor-pointer")
        );
        setIsHovered(interactive);
      }
    };

    const render = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`;
      }
      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    const onMouseEnter = () => setVisible(true);
    const onMouseLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [visible]);

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 99999,
        willChange: "transform",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.2s ease",
      }}
    >
      <div
        style={{
          width: "9px",
          height: "9px",
          borderRadius: "50%",
          transform: isHovered ? "translate(-50%, -50%) scale(1.35)" : "translate(-50%, -50%) scale(1)",
          backgroundColor: isOverWhite ? "#3a0201" : "#ffffff",
          boxShadow: isOverWhite
            ? "0 0 0 1px rgba(58, 2, 1, 0.2)"
            : "0 0 0 1px rgba(255, 255, 255, 0.4), 0 1px 3px rgba(0, 0, 0, 0.4)",
          transition: "background-color 0.18s ease, transform 0.18s ease, box-shadow 0.18s ease",
        }}
      />
    </div>
  );
}
