import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";

interface SkillItem {
  id: string;
  name: string;
  subtitle: string;
  image: string;
}

// Dedicated capabilities visuals - no client / selected works
const SKILLS: SkillItem[] = [
  {
    id: "strategy",
    name: "Creative Strategy",
    subtitle: "Positioning & Narrative Architecture",
    image: "/images/service-strategy.jpg",
  },
  {
    id: "branding",
    name: "Brand Identity",
    subtitle: "Visual Systems & Art Direction",
    image: "/images/service-branding.jpg",
  },
  {
    id: "motion",
    name: "Motion & Social Storytelling",
    subtitle: "Campaign Motion & Video Direction",
    image: "/images/service-motion.jpg",
  },
  {
    id: "marketing",
    name: "Digital Marketing & Drops",
    subtitle: "Launch Collateral & Community Design",
    image: "/images/service-marketing.jpg",
  },
];

export function CoreSkills() {
  const [activeSkill, setActiveSkill] = useState<SkillItem | null>(null);

  return (
    <section id="services" className="py-24 transition-mode relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Minimal Section Header */}
        <AnimatedSection className="mb-14">
          <div className="border-b border-foreground/10 pb-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light tracking-tight">
              Our Capabilities
            </h2>
            <p className="text-xs font-sans uppercase tracking-widest opacity-50 mt-2">
              Capabilities &amp; Craft
            </p>
          </div>
        </AnimatedSection>

        {/* Minimal Flat List (Non-boxy, clean dividers) */}
        <div className="relative">
          {SKILLS.map((skill, index) => {
            const isHovered = activeSkill?.id === skill.id;

            return (
              <AnimatedSection key={skill.id} delay={index * 0.06}>
                <div
                  onMouseEnter={() => setActiveSkill(skill)}
                  onMouseLeave={() => setActiveSkill(null)}
                  className={`group relative border-b border-foreground/10 py-7 transition-all duration-300 cursor-pointer ${
                    activeSkill && !isHovered ? "opacity-30" : "opacity-100"
                  }`}
                >
                  <div className="flex items-center justify-between gap-6">
                    <div>
                      <h3 className="text-3xl md:text-5xl font-sans font-light uppercase tracking-tight group-hover:translate-x-2 transition-transform duration-300">
                        {skill.name}
                      </h3>
                      <p className="text-xs md:text-sm font-serif italic opacity-60 mt-1">
                        {skill.subtitle}
                      </p>
                    </div>

                    <div className="w-8 h-8 rounded-full border border-foreground/20 flex items-center justify-center group-hover:border-foreground transition-colors">
                      <ArrowUpRight className="w-4 h-4 opacity-70 group-hover:opacity-100" />
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}

          {/* Floating Hover Image Preview with Soft 10px Rounded Edges */}
          <AnimatePresence>
            {activeSkill && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.25, ease: [0.25, 0.4, 0.25, 1] }}
                className="hidden xl:block pointer-events-none fixed right-16 top-1/2 -translate-y-1/2 z-40 w-72 h-88 rounded-[10px] overflow-hidden bg-background border border-foreground/15 shadow-xl"
              >
                <div className="relative w-full h-full">
                  <img
                    src={activeSkill.image}
                    alt={activeSkill.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-xs font-sans font-medium uppercase tracking-wider">
                      {activeSkill.name}
                    </p>
                    <p className="text-[10px] font-sans opacity-75 truncate mt-0.5">
                      {activeSkill.subtitle}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
