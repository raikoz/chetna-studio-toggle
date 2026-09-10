import { useMode } from "@/contexts/ModeContext";
import { useBooking } from "@/contexts/BookingContext";
import { motion, useMotionValue } from "framer-motion";
import { useRef, useEffect } from "react";

export function Hero() {
  const { mode } = useMode();
  const { openBookingModal } = useBooking();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Subtle Water Physics Enabled Ripple Effect on Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    interface Ripple {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      alpha: number;
      speed: number;
      color: string;
    }

    const ripples: Ripple[] = [];

    const addRipple = (x: number, y: number) => {
      ripples.push({
        x,
        y,
        radius: 0,
        maxRadius: Math.min(width, height) * 0.45,
        alpha: 0.18,
        speed: 1.8,
        color: "rgba(255, 255, 255, ",
      });
    };

    let lastTime = 0;
    const handlePointerMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime > 75) {
        addRipple(e.clientX, e.clientY);
        lastTime = now;
      }
    };
    window.addEventListener("mousemove", handlePointerMove);

    // Occasional gentle ambient drops
    const ambientInterval = setInterval(() => {
      addRipple(
        width * 0.2 + Math.random() * width * 0.6,
        height * 0.2 + Math.random() * height * 0.6
      );
    }, 2800);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += r.speed;
        r.alpha -= 0.0018;

        if (r.alpha <= 0 || r.radius >= r.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        // Draw multiple refractive concentric water rings
        ctx.save();
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `${r.color}${r.alpha * 0.6})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Secondary inner refraction wave
        if (r.radius > 20) {
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius - 16, 0, Math.PI * 2);
          ctx.strokeStyle = `${r.color}${r.alpha * 0.35})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(ambientInterval);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handlePointerMove);
    };
  }, []);

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.15 + i * 0.03,
        duration: 0.7,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay, duration: 0.7, ease: [0.25, 0.4, 0.25, 1] },
    }),
  };

  const studioTitle = "TheChet&Co";
  const personalTitle1 = "Chetna";
  const personalTitle2 = "Pattnaik";

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center pt-24 pb-16 transition-mode relative overflow-hidden"
    >
      {/* Physics water ripple canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0 mix-blend-overlay"
      />

      {/* Subtle fluid background visual */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-0">
        <img
          src="/images/hero-abstract-1.jpg"
          alt=""
          className="w-full h-full object-cover scale-105"
        />
      </div>

      {/* Fluid background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/95 to-background pointer-events-none z-0" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {mode === "studio" ? (
            <>
              <motion.p
                custom={0.1}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="text-xs font-sans uppercase tracking-[0.35em] opacity-60 mb-6"
              >
                Design Studio &amp; Consultancy
              </motion.p>

              <div className="overflow-hidden mb-6">
                <h1 className="text-6xl md:text-8xl lg:text-[9.5rem] font-serif font-light leading-[0.88] tracking-tight">
                  {studioTitle.split("").map((char, i) => (
                    <motion.span
                      key={i}
                      custom={i}
                      initial="hidden"
                      animate="visible"
                      variants={letterVariants}
                      className={`inline-block ${char === "&" ? "text-stroke mx-1" : "italic"}`}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </h1>
              </div>

              {/* Minimal concise subheader only */}
              <motion.p
                custom={0.6}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="text-base md:text-xl font-serif italic opacity-75 max-w-xl font-light leading-relaxed"
              >
                Crafting visual identities, brand experiences &amp; cultural artifacts.
              </motion.p>
            </>
          ) : (
            <>
              <motion.p
                custom={0.1}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="text-xs font-sans uppercase tracking-[0.35em] opacity-60 mb-6"
              >
                Creative Director &amp; Consultant
              </motion.p>

              <div className="overflow-hidden mb-2">
                <h1 className="text-6xl md:text-8xl lg:text-[9.5rem] font-serif font-light leading-[0.88] tracking-tight">
                  {personalTitle1.split("").map((char, i) => (
                    <motion.span
                      key={`l1-${i}`}
                      custom={i}
                      initial="hidden"
                      animate="visible"
                      variants={letterVariants}
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  ))}
                </h1>
              </div>
              <div className="overflow-hidden mb-6">
                <h1 className="text-6xl md:text-8xl lg:text-[9.5rem] font-serif font-light leading-[0.88] tracking-tight italic">
                  {personalTitle2.split("").map((char, i) => (
                    <motion.span
                      key={`l2-${i}`}
                      custom={i + personalTitle1.length}
                      initial="hidden"
                      animate="visible"
                      variants={letterVariants}
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  ))}
                </h1>
              </div>

              <motion.p
                custom={0.6}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="text-base md:text-xl font-serif italic opacity-75 max-w-xl font-light leading-relaxed"
              >
                Blending art, design, and strategic storytelling to inspire.
              </motion.p>
            </>
          )}

          {/* Clean minimal flat actions (non-boxy, soft rounded, minimal) */}
          <motion.div
            custom={0.9}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-12 flex flex-wrap items-center gap-6"
          >
            <button
              type="button"
              onClick={openBookingModal}
              className="px-8 py-3.5 bg-foreground text-background font-sans text-xs uppercase tracking-widest font-medium rounded-md hover:opacity-90 transition-opacity cursor-pointer"
            >
              Book a Discovery Call
            </button>
            <button
              type="button"
              onClick={openBookingModal}
              className="px-6 py-3.5 text-foreground font-sans text-xs tracking-widest uppercase font-medium hover:opacity-70 transition-opacity cursor-pointer flex items-center gap-2 group"
            >
              <span>Get in Touch</span>
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Minimal scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-px h-8 bg-foreground/20" />
      </motion.div>
    </section>
  );
}
