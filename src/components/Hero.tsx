import { useMode } from "@/contexts/ModeContext";
import { useBooking } from "@/contexts/BookingContext";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export function Hero() {
  const { mode } = useMode();
  const { openBookingModal } = useBooking();
  const containerRef = useRef<HTMLElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const bgX = useSpring(useTransform(mouseX, [0, 1], [-15, 15]), { stiffness: 50, damping: 30 });
  const bgY = useSpring(useTransform(mouseY, [0, 1], [-15, 15]), { stiffness: 50, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2 + i * 0.035,
        duration: 0.7,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 25 },
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
      ref={containerRef}
      id="about"
      className="min-h-screen flex items-center justify-center pt-24 pb-16 transition-mode relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Subtle background texture */}
      <motion.div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{ x: bgX, y: bgY }}
      >
        <img
          src="/images/hero-abstract-1.jpg"
          alt=""
          className="w-full h-full object-cover scale-105"
        />
      </motion.div>

      {/* Flat gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {mode === "studio" ? (
            <>
              <motion.div
                custom={0.1}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="flex items-center gap-3 mb-8"
              >
                <span className="w-6 h-px bg-foreground/40" />
                <p className="text-[11px] font-mono tracking-[0.3em] uppercase opacity-60">
                  Design Studio &amp; Consultancy
                </p>
              </motion.div>

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

              <motion.p
                custom={0.8}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="text-sm md:text-base max-w-lg opacity-70 leading-relaxed font-sans font-light"
              >
                A boutique design studio &amp; consultancy crafting visual identities, brand experiences, 
                and creative direction for those who dare to stand out.
              </motion.p>
            </>
          ) : (
            <>
              <motion.div
                custom={0.1}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="flex items-center gap-3 mb-8"
              >
                <span className="w-6 h-px bg-foreground/40" />
                <p className="text-[11px] font-mono tracking-[0.3em] uppercase opacity-60">
                  Creative Director &amp; Consultant
                </p>
              </motion.div>

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
                custom={0.8}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="text-sm md:text-base max-w-lg opacity-70 leading-relaxed font-sans font-light"
              >
                Blending art, design, and strategic storytelling to create experiences 
                that resonate and inspire.
              </motion.p>
            </>
          )}

          {/* Bauhaus Flat Action Buttons */}
          <motion.div
            custom={1.1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-12 flex flex-wrap items-center gap-5"
          >
            <button
              type="button"
              onClick={openBookingModal}
              className="px-8 py-4 bg-foreground text-background font-mono text-xs uppercase tracking-widest font-bold border border-foreground hover:bg-transparent hover:text-foreground transition-colors duration-200 cursor-pointer"
            >
              Book a Discovery Call
            </button>
            <button
              type="button"
              onClick={openBookingModal}
              className="px-8 py-4 border border-foreground/30 text-foreground font-mono text-xs tracking-widest uppercase font-medium hover:border-foreground hover:bg-foreground/5 transition-colors duration-200 cursor-pointer"
            >
              Get in Touch
            </button>
          </motion.div>
        </div>
      </div>

      {/* Bauhaus minimal scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-px h-10 bg-foreground/30"
        />
      </motion.div>
    </section>
  );
}
