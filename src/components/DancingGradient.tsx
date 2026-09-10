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
      // Slower, calmer wave flow
      time += 0.005;

      // Smooth mouse interpolation
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      // 1. BASE BACKGROUND: Exactly matches #3a0201 at the top with zero deviation
      const topColor = isStudio ? "#3a0201" : "#ffffff";
      const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
      bgGradient.addColorStop(0, topColor);
      bgGradient.addColorStop(0.3, topColor); // Stays pure #3a0201 across top third
      bgGradient.addColorStop(0.65, isStudio ? "#520404" : "#fff8f8");
      bgGradient.addColorStop(1, "#ffffff");
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // 2. SOFT AMBIENT GLOW (Positioned lower down so top remains pure #3a0201)
      const glowX = width * (0.5 + Math.sin(time * 0.4) * 0.15 + (mouse.x - 0.5) * 0.2);
      const glowY = height * (0.55 + Math.cos(time * 0.5) * 0.08);
      const glowRadius = Math.max(width, height) * 0.45;
      const ambientGlow = ctx.createRadialGradient(glowX, glowY, 5, glowX, glowY, glowRadius);
      if (isStudio) {
        ambientGlow.addColorStop(0, "rgba(200, 25, 25, 0.35)");
        ambientGlow.addColorStop(0.6, "rgba(100, 3, 3, 0.15)");
        ambientGlow.addColorStop(1, "transparent");
      } else {
        ambientGlow.addColorStop(0, "rgba(244, 63, 94, 0.12)");
        ambientGlow.addColorStop(0.6, "rgba(254, 226, 226, 0.08)");
        ambientGlow.addColorStop(1, "transparent");
      }
      ctx.fillStyle = ambientGlow;
      ctx.fillRect(0, height * 0.2, width, height * 0.8);

      // 3. SINGLE GENTLE DYNAMIC GRADIENT WAVE (Calm, low-amplitude, simple swell)
      const points: { x: number; y: number }[] = [];
      const segments = 100;
      const step = width / segments;

      // Base elevation and lessened wave lunges / trenches
      const baseY = height * 0.54;
      const primaryAmp = height * 0.075; // Low amplitude for gentle swell
      const secondaryAmp = height * 0.03;

      for (let i = 0; i <= segments; i++) {
        const x = i * step;
        const normX = x / width;

        // Simple, smooth traveling harmonic curve
        const wave1 = Math.sin(normX * Math.PI * 1.8 + time) * primaryAmp;
        const wave2 = Math.cos(normX * Math.PI * 2.6 - time * 0.8) * secondaryAmp;

        // Subtle interactive mouse elevation
        const distToMouse = Math.abs(normX - mouse.x);
        const mouseInfluence = Math.exp(-Math.pow(distToMouse * 3.5, 2)) * (mouse.y - 0.5) * (height * 0.12);

        const y = baseY + wave1 + wave2 + mouseInfluence;
        points.push({ x, y });
      }

      // Draw the single wave surface down to bottom
      ctx.beginPath();
      ctx.moveTo(0, points[0].y);

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

      // Multi-stop liquid gradient filling smoothly down into pure white
      const waveGradient = ctx.createLinearGradient(0, height * 0.35, 0, height);
      if (isStudio) {
        waveGradient.addColorStop(0, "rgba(220, 50, 50, 0.8)"); // Soft scarlet wave crest
        waveGradient.addColorStop(0.25, "rgba(255, 160, 160, 0.9)"); // Luminous warm highlight
        waveGradient.addColorStop(0.6, "rgba(255, 240, 240, 0.98)"); // Soft silk body
        waveGradient.addColorStop(0.9, "#ffffff"); // Seamless melt into white
        waveGradient.addColorStop(1, "#ffffff"); // 100% white at bottom edge
      } else {
        waveGradient.addColorStop(0, "rgba(251, 113, 133, 0.55)");
        waveGradient.addColorStop(0.35, "rgba(253, 164, 175, 0.75)");
        waveGradient.addColorStop(0.75, "#ffffff");
        waveGradient.addColorStop(1, "#ffffff");
      }

      ctx.fillStyle = waveGradient;
      ctx.fill();

      // 4. SOFT SILK CREST GLINT (Gentle highlight along the wave crest line)
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
        crestStroke.addColorStop(0, "rgba(255, 170, 170, 0.25)");
        crestStroke.addColorStop(mouse.x, "rgba(255, 255, 255, 0.7)");
        crestStroke.addColorStop(1, "rgba(255, 170, 170, 0.25)");
      } else {
        crestStroke.addColorStop(0, "rgba(244, 63, 94, 0.15)");
        crestStroke.addColorStop(mouse.x, "rgba(255, 255, 255, 0.7)");
        crestStroke.addColorStop(1, "rgba(244, 63, 94, 0.15)");
      }
      ctx.strokeStyle = crestStroke;
      ctx.lineWidth = 2.5;
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
        height: "clamp(200px, 28vw, 400px)",
        backgroundColor: mode === "studio" ? "#3a0201" : "#ffffff",
      }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block pointer-events-none"
      />
    </div>
  );
}
