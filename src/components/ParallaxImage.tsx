import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number; // e.g. 0.2 to 0.5
  fullBleed?: boolean;
  aspect?: string;
  overlay?: boolean;
}

export function ParallaxImage({
  src,
  alt,
  className = "",
  speed = 0.2,
  fullBleed = false,
  aspect = "aspect-[16/9]",
  overlay = true,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-50 * speed, 50 * speed]);

  if (fullBleed) {
    return (
      <div
        ref={containerRef}
        className={`relative w-screen -ml-[50vw] left-1/2 overflow-hidden border-y border-foreground/15 ${className}`}
      >
        <motion.div style={{ y }} className="relative w-full h-[70vh] md:h-[85vh]">
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover scale-105 transition-transform duration-700 hover:scale-110"
          />
          {overlay && (
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-background/20 pointer-events-none" />
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden border border-foreground/15 ${aspect} ${className}`}
    >
      <motion.div style={{ y }} className="w-full h-full scale-105">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
      </motion.div>
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />
      )}
    </div>
  );
}
