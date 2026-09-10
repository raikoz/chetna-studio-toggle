import { useEffect, useRef } from "react";
import { useMode } from "@/contexts/ModeContext";

export function DancingGradient() {
  const { mode } = useMode();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isStudio = mode === "studio";

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      // 1. BASE BACKGROUND: 100% exact match to #3a0201 at the top
      const topColor = isStudio ? "#3a0201" : "#ffffff";
      ctx.fillStyle = topColor;
      ctx.fillRect(0, 0, width, height);

      // 2. SLANTED GRADIENT WITH NON-STRAIGHT ORGANIC LINE (NO WAVES)
      // Slants from ~35% height on left down to ~72% height on right
      const startY = height * 0.32;
      const endY = height * 0.72;

      // Draw soft gradient glow along the slant ramp
      const slantGradient = ctx.createLinearGradient(0, startY * 0.6, width, endY * 1.1);
      if (isStudio) {
        slantGradient.addColorStop(0, "#3a0201");
        slantGradient.addColorStop(0.28, "#4d0303");
        slantGradient.addColorStop(0.55, "#7e1212");
        slantGradient.addColorStop(0.78, "#f2dede");
        slantGradient.addColorStop(1, "#ffffff");
      } else {
        slantGradient.addColorStop(0, "#ffffff");
        slantGradient.addColorStop(0.4, "#fde8e8");
        slantGradient.addColorStop(1, "#ffffff");
      }
      ctx.fillStyle = slantGradient;
      ctx.fillRect(0, 0, width, height);

      // 3. NON-STRAIGHT SLANT BOUNDARY FILLING TO PURE WHITE AT BOTTOM
      // A gentle, tactile non-straight edge (deckled paper / organic slant)
      ctx.beginPath();
      const steps = 180;
      const dx = width / steps;

      for (let i = 0; i <= steps; i++) {
        const x = i * dx;
        const progress = x / width;
        // Non-straight organic slant line (subtle natural micro-variations, no waves)
        const linearY = startY + (endY - startY) * progress;
        const organicOffset =
          Math.sin(progress * 14) * 4.5 +
          Math.cos(progress * 28) * 2.2 +
          Math.sin(progress * 55) * 1.2;
        const y = linearY + organicOffset;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();

      // Slant body fill transitioning cleanly into pure white at the bottom edge
      const whiteFill = ctx.createLinearGradient(0, startY, 0, height);
      whiteFill.addColorStop(0, "rgba(255, 255, 255, 0.88)");
      whiteFill.addColorStop(0.4, "rgba(255, 255, 255, 0.98)");
      whiteFill.addColorStop(0.75, "#ffffff");
      whiteFill.addColorStop(1, "#ffffff");
      ctx.fillStyle = whiteFill;
      ctx.fill();

      // 4. GENERATE TACTILE RISOGRAPH FILM GRAIN / NOISE EFFECT
      const noiseCanvas = document.createElement("canvas");
      const noiseWidth = 240;
      const noiseHeight = 240;
      noiseCanvas.width = noiseWidth;
      noiseCanvas.height = noiseHeight;
      const noiseCtx = noiseCanvas.getContext("2d");

      if (noiseCtx) {
        const imgData = noiseCtx.createImageData(noiseWidth, noiseHeight);
        const data = imgData.data;
        for (let i = 0; i < data.length; i += 4) {
          const val = Math.floor(Math.random() * 255);
          data[i] = val;
          data[i + 1] = val;
          data[i + 2] = val;
          data[i + 3] = Math.floor(Math.random() * 32); // Grain intensity
        }
        noiseCtx.putImageData(imgData, 0, 0);

        // Pattern fill noise across the entire slant gradient
        const pattern = ctx.createPattern(noiseCanvas, "repeat");
        if (pattern) {
          ctx.fillStyle = pattern;
          ctx.fillRect(0, 0, width, height);
        }
      }
    };

    draw();
    window.addEventListener("resize", draw);

    return () => {
      window.removeEventListener("resize", draw);
    };
  }, [mode]);

  return (
    <div
      className="relative w-full overflow-hidden select-none"
      style={{
        height: "clamp(180px, 24vw, 360px)",
        backgroundColor: mode === "studio" ? "#3a0201" : "#ffffff",
      }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block pointer-events-none"
      />

      {/* High-fidelity SVG Fractal Noise Grain Overlay */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20 mix-blend-overlay"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="slantGrain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#slantGrain)" />
      </svg>
    </div>
  );
}
