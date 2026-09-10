import { useEffect, useRef, useState } from "react";
import { useMode } from "@/contexts/ModeContext";

export function DancingGradient() {
  const { mode } = useMode();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position in normalized coordinates [0..1]
  const mouseRef = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const isStudio = mode === "studio";

    const render = () => {
      time += 0.012;

      // Smooth mouse interpolation
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      // 1. BASE BACKGROUND: Seamless transition from page background color at top
      const topColor = isStudio ? "hsl(0, 93%, 12%)" : "#ffffff";
      const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
      bgGradient.addColorStop(0, topColor);
      bgGradient.addColorStop(0.4, isStudio ? "#550202" : "#fff5f5");
      bgGradient.addColorStop(1, "#ffffff");
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // 2. LUMINOUS SCARLET AMBIENT GLOW (Breathes softly behind the wave)
      const glowX = width * (0.5 + Math.sin(time * 0.5) * 0.2 + (mouse.x - 0.5) * 0.3);
      const glowY = height * (0.35 + Math.cos(time * 0.6) * 0.1);
      const glowRadius = Math.max(width, height) * 0.6;
      const ambientGlow = ctx.createRadialGradient(glowX, glowY, 10, glowX, glowY, glowRadius);
      if (isStudio) {
        ambientGlow.addColorStop(0, "rgba(215, 30, 30, 0.45)");
        ambientGlow.addColorStop(0.5, "rgba(140, 5, 5, 0.2)");
        ambientGlow.addColorStop(1, "transparent");
      } else {
        ambientGlow.addColorStop(0, "rgba(244, 63, 94, 0.15)");
        ambientGlow.addColorStop(0.6, "rgba(254, 226, 226, 0.1)");
        ambientGlow.addColorStop(1, "transparent");
      }
      ctx.fillStyle = ambientGlow;
      ctx.fillRect(0, 0, width, height);

      // 3. SINGLE DYNAMIC SEAMLESS GRADIENT WAVE (Volumetric liquid silk flow)
      // We calculate a unified, smoothly undulating silk curve across the canvas
      const points: { x: number; y: number }[] = [];
      const segments = 120;
      const step = width / segments;

      // Base elevation and wave amplitudes
      const baseY = height * 0.48;
      const primaryAmp = height * 0.18;
      const secondaryAmp = height * 0.08;

      for (let i = 0; i <= segments; i++) {
        const x = i * step;
        const normX = x / width;

        // Harmonic traveling sine & cosine waves for liquid organic drape
        const wave1 = Math.sin(normX * Math.PI * 2 + time) * primaryAmp;
        const wave2 = Math.cos(normX * Math.PI * 3.5 - time * 1.3) * secondaryAmp;
        const wave3 = Math.sin(normX * Math.PI * 1.2 + time * 0.7) * (height * 0.05);

        // Gentle interactive mouse depression / pull
        const distToMouse = Math.abs(normX - mouse.x);
        const mouseDip = Math.exp(-Math.pow(distToMouse * 3.5, 2)) * (mouse.y - 0.5) * (height * 0.25);

        const y = baseY + wave1 + wave2 + wave3 + mouseDip;
        points.push({ x, y });
      }

      // Draw the wave surface filling seamlessly down to bottom (0 -> width -> height -> 0)
      ctx.beginPath();
      ctx.moveTo(0, points[0].y);

      // Smooth Bezier curve through all points
      for (let i = 0; i < points.length - 1; i++) {
        const xc = (points[i].x + points[i + 1].x) / 2;
        const yc = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
      }
      const lastPoint = points[points.length - 1];
      ctx.lineTo(lastPoint.x, lastPoint.y);
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();

      // Multi-stop liquid gradient filling the wave body directly into pure #ffffff
      const waveGradient = ctx.createLinearGradient(0, height * 0.2, 0, height);
      if (isStudio) {
        waveGradient.addColorStop(0, "rgba(235, 60, 60, 0.85)"); // Vibrant scarlet crest
        waveGradient.addColorStop(0.2, "rgba(255, 145, 145, 0.92)"); // Soft rose-gold light highlight
        waveGradient.addColorStop(0.55, "rgba(255, 235, 235, 0.98)"); // Luminous champagne silk body
        waveGradient.addColorStop(0.85, "#ffffff"); // Seamless melt into white
        waveGradient.addColorStop(1, "#ffffff"); // Solid 100% white at footer seam
      } else {
        waveGradient.addColorStop(0, "rgba(251, 113, 133, 0.6)");
        waveGradient.addColorStop(0.3, "rgba(253, 164, 175, 0.8)");
        waveGradient.addColorStop(0.7, "#ffffff");
        waveGradient.addColorStop(1, "#ffffff");
      }

      ctx.fillStyle = waveGradient;
      ctx.fill();

      // 4. SOFT SILK CREST HIGHLIGHT (Subtle specular ribbon accentuating the single wave's 3D motion)
      ctx.beginPath();
      ctx.moveTo(0, points[0].y);
      for (let i = 0; i < points.length - 1; i++) {
        const xc = (points[i].x + points[i + 1].x) / 2;
        const yc = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
      }
      ctx.lineTo(lastPoint.x, lastPoint.y);

      const crestStroke = ctx.createLinearGradient(0, 0, width, 0);
      if (isStudio) {
        crestStroke.addColorStop(0, "rgba(255, 180, 180, 0.3)");
        crestStroke.addColorStop(mouse.x, "rgba(255, 255, 255, 0.75)"); // Interactive light glint under cursor
        crestStroke.addColorStop(1, "rgba(255, 180, 180, 0.3)");
      } else {
        crestStroke.addColorStop(0, "rgba(244, 63, 94, 0.2)");
        crestStroke.addColorStop(mouse.x, "rgba(255, 255, 255, 0.8)");
        crestStroke.addColorStop(1, "rgba(244, 63, 94, 0.2)");
      }
      ctx.strokeStyle = crestStroke;
      ctx.lineWidth = 3;
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [mode]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current.targetX = (e.clientX - rect.left) / rect.width;
    mouseRef.current.targetY = (e.clientY - rect.top) / rect.height;
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        mouseRef.current.targetX = 0.5;
        mouseRef.current.targetY = 0.5;
      }}
      className="relative w-full overflow-hidden select-none cursor-pointer"
      style={{
        height: "clamp(220px, 32vw, 440px)",
        backgroundColor: mode === "studio" ? "hsl(0 93% 12%)" : "#ffffff",
      }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block pointer-events-none"
      />
    </div>
  );
}
