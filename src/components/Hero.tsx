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

  const bgX = useSpring(useTransform(mouseX, [0, 1], [-20, 20]), { stiffness: 50, damping: 30 });
  const bgY = useSpring(useTransform(mouseY, [0, 1], [-20, 20]), { stiffness: 50, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 80 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + i * 0.04,
        duration: 0.8,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay, duration: 0.8, ease: [0.25, 0.4, 0.25, 1] },
    }),
  };

  const studioTitle = "TheChet&Co";
  const personalTitle1 = "Chetna";
  const personalTitle2 = "Pattnaik";

  return (
    <section
      ref={containerRef}
      id="about"
      className="min-h-screen flex items-center justify-center pt-20 transition-mode relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Parallax background image */}
      <motion.div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{ x: bgX, y: bgY }}
      >
        <img
          src="/images/hero-abstract-1.jpg"
          alt=""
          className="w-full h-full object-cover scale-110"
        />
      </motion.div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {mode === "studio" ? (
            <>
              <motion.p
                custom={0.1}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="text-xs tracking-[0.4em] uppercase mb-8 opacity-60 font-sans font-medium"
              >
                Design Studio & Consultancy
              </motion.p>

              <div className="overflow-hidden mb-6">
                <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-serif font-light leading-[0.9] tracking-tight">
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
                custom={1.2}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="text-sm md:text-base max-w-lg opacity-60 leading-relaxed font-sans font-light"
              >
                A boutique design studio & consultancy crafting visual identities, brand experiences, 
                and creative direction for those who dare to stand out.
              </motion.p>
            </>
          ) : (
            <>
              <motion.p
                custom={0.1}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="text-xs tracking-[0.4em] uppercase mb-8 opacity-60 font-sans font-medium"
              >
                Creative Director & Consultant
              </motion.p>

              <div className="overflow-hidden mb-2">
                <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-serif font-light leading-[0.9] tracking-tight">
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
                <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-serif font-light leading-[0.9] tracking-tight italic">
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
                custom={1.2}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="text-sm md:text-base max-w-lg opacity-60 leading-relaxed font-sans font-light"
              >
                Blending art, design, and strategic storytelling to create experiences 
                that resonate and inspire.
              </motion.p>
            </>
          )}

          <motion.div
            custom={1.6}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-12 flex flex-wrap items-center gap-6"
          >
            <motion.button
              type="button"
              onClick={openBookingModal}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3.5 bg-foreground text-background hover:opacity-90 transition-colors duration-300 text-xs md:text-sm tracking-widest uppercase font-sans font-semibold"
            >
              Book a Discovery Call
            </motion.button>
            <motion.button
              type="button"
              onClick={openBookingModal}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3.5 border border-foreground/30 text-foreground hover:bg-foreground/10 transition-colors duration-300 text-xs md:text-sm tracking-widest uppercase font-sans font-medium"
            >
              Get in Touch
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-px h-12 bg-foreground/30"
        />
      </motion.div>
    </section>
  );
}
