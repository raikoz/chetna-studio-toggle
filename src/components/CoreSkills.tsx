import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";

interface SkillItem {
  id: string;
  number: string;
  name: string;
  subtitle: string;
  tags: string[];
  image: string;
}

const SKILLS: SkillItem[] = [
  {
    id: "strategy",
    number: "01",
    name: "Creative Strategy",
    subtitle: "Positioning, Narrative Architecture & Brand Ops",
    tags: ["Market Audits", "Narrative Decks", "Growth Playbooks"],
    image: "/images/montage-8.jpg",
  },
  {
    id: "branding",
    number: "02",
    name: "Brand Identity",
    subtitle: "Visual Systems, Type Architecture & Guidelines",
    tags: ["Logo Systems", "Typography", "Art Direction"],
    image: "/images/montage-1.jpg",
  },
  {
    id: "motion",
    number: "03",
    name: "Motion & Social Storytelling",
    subtitle: "Reels, Campaign Artifacts & Micro-Animations",
    tags: ["Campaign Motion", "Social Feeds", "Video Direction"],
    image: "/images/montage-4.jpg",
  },
  {
    id: "marketing",
    number: "04",
    name: "Digital Marketing & Drops",
    subtitle: "High-Conviction Launch Collateral & Community Gatherings",
    tags: ["Drop Strategy", "Community Design", "Collateral"],
    image: "/images/montage-6.jpg",
  },
];

export function CoreSkills() {
  const [activeSkill, setActiveSkill] = useState<SkillItem | null>(null);

  return (
    <section id="services" className="py-28 border-t border-foreground/15 transition-mode relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Bauhaus Section Header */}
        <AnimatedSection className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-foreground/15 pb-6">
            <div>
              <p className="text-[11px] font-mono uppercase tracking-[0.3em] opacity-60 mb-2">
                02 / CAPABILITIES &amp; CRAFT
              </p>
              <h2 className="text-4xl md:text-6xl font-serif font-light tracking-tight">
                Our Core Skills
              </h2>
            </div>
            <p className="text-xs font-mono uppercase tracking-widest opacity-60 max-w-sm">
              Form follows function. We engineer brand systems and cultural momentum for modern leaders.
            </p>
          </div>
        </AnimatedSection>

        {/* Bauhaus Flat List Grid */}
        <div className="relative">
          {SKILLS.map((skill, index) => {
            const isHovered = activeSkill?.id === skill.id;

            return (
              <AnimatedSection key={skill.id} delay={index * 0.08}>
                <div
                  onMouseEnter={() => setActiveSkill(skill)}
                  onMouseLeave={() => setActiveSkill(null)}
                  className={`group relative border-b border-foreground/15 py-8 transition-all duration-300 cursor-pointer ${
                    activeSkill && !isHovered ? "opacity-30" : "opacity-100"
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    {/* Left: Number + Title */}
                    <div className="flex items-baseline gap-6 md:gap-12">
                      <span className="font-mono text-sm opacity-40 group-hover:opacity-100 transition-opacity">
                        {skill.number}
                      </span>
                      <div>
                        <h3 className="text-3xl md:text-5xl lg:text-6xl font-sans font-light uppercase tracking-tight group-hover:translate-x-3 transition-transform duration-300">
                          {skill.name}
                        </h3>
                        <p className="text-xs md:text-sm font-serif italic opacity-70 mt-1">
                          {skill.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Right: Tags + Arrow */}
                    <div className="flex items-center gap-6 lg:gap-12 pl-12 lg:pl-0">
                      <div className="hidden sm:flex flex-wrap gap-2">
                        {skill.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[10px] font-mono uppercase tracking-widest px-3 py-1 border border-foreground/20 group-hover:border-foreground/60 transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="w-9 h-9 border border-foreground/20 flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}

          {/* Floating Flat Bauhaus Image Preview */}
          <AnimatePresence>
            {activeSkill && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.25, ease: [0.25, 0.4, 0.25, 1] }}
                className="hidden xl:block pointer-events-none fixed right-16 top-1/2 -translate-y-1/2 z-40 w-80 h-96 border border-foreground bg-background overflow-hidden"
              >
                <div className="relative w-full h-full">
                  <img
                    src={activeSkill.image}
                    alt={activeSkill.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-foreground text-background text-[9px] font-mono uppercase tracking-widest px-2.5 py-1 font-bold">
                    PREVIEW {activeSkill.number}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-background/95 border-t border-foreground/20 p-3 text-foreground">
                    <p className="text-xs font-sans font-bold uppercase tracking-wider">
                      {activeSkill.name}
                    </p>
                    <p className="text-[10px] font-mono opacity-70 truncate">
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
