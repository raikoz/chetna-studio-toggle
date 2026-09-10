import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";

interface JournalEntry {
  id: string;
  tag: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  image: string;
}

const ENTRIES: JournalEntry[] = [
  {
    id: "rebrand-anatomy",
    tag: "BRAND ARCHITECTURE",
    date: "SEP 2025",
    readTime: "4 MIN READ",
    title: "The Anatomy of a High-Conviction Rebrand: Moving Beyond Aesthetic Fluff",
    excerpt:
      "A look into why modern brands fail when they treat visual design as lipstick rather than strategic positioning and cultural gravity.",
    image: "/images/montage-5.jpg",
  },
  {
    id: "fault-in-our-ops",
    tag: "DESIGN OPERATIONS",
    date: "AUG 2025",
    readTime: "6 MIN READ",
    title: "Why Most Brand Guidelines Die on Slide 12: Building Living Operating Systems",
    excerpt:
      "SOPs shouldn't be 40-page PDFs destined for forgotten Google Drives. How we architect agile, usable design tokens for fast-moving teams.",
    image: "/images/about-2.jpg",
  },
  {
    id: "the-gathering",
    tag: "LEADERSHIP & CULTURE",
    date: "JUL 2025",
    readTime: "5 MIN READ",
    title: "The Gathering: What Happens When CXOs and Founders Stop Pitching and Start Talking Truth",
    excerpt:
      "Notes from Day 1 of our offline founder gathering. Why building in isolation is a trap, and how physical rooms catalyze digital conviction.",
    image: "/images/montage-7.jpg",
  },
  {
    id: "physical-community",
    tag: "COMMUNITY ARTIFACTS",
    date: "JUN 2025",
    readTime: "3 MIN READ",
    title: "Sofar Sounds & Community Spaces: How Intimate Gatherings Amplify Brand Resonance",
    excerpt:
      "From pop-up streetwear drops to acoustic rooms in Bhubaneswar—how real-world human energy injects irreplaceable soul into modern brands.",
    image: "/images/montage-9.jpg",
  },
];

export function Journal() {
  return (
    <section id="journal" className="py-32 border-t border-foreground/15 transition-mode relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <AnimatedSection className="mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-foreground/15 pb-8">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.4em] opacity-60 mb-3">
                [ 04 // EDITORIAL & DISPATCHES ]
              </p>
              <h2 className="text-4xl md:text-6xl font-serif font-light tracking-tight">
                The Journal
              </h2>
            </div>
            <p className="text-xs md:text-sm font-mono uppercase tracking-widest opacity-60 max-w-sm">
              Unfiltered thoughts on design architecture, culture, and running a boutique studio.
            </p>
          </div>
        </AnimatedSection>

        {/* 2x2 Brutalist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {ENTRIES.map((entry, index) => (
            <AnimatedSection key={entry.id} delay={index * 0.1}>
              <article className="group border border-foreground/20 bg-background transition-all duration-300 hover:border-foreground flex flex-col h-full">
                {/* Image Container with Hover Zoom & Brutalist Wireframe */}
                <div className="relative aspect-[16/10] overflow-hidden border-b border-foreground/20 bg-foreground/5">
                  <img
                    src={entry.image}
                    alt={entry.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 vintage-paper"
                  />
                  {/* Badge */}
                  <div className="absolute top-4 left-4 bg-background border border-foreground/30 px-3 py-1 text-[10px] font-mono uppercase tracking-widest font-bold">
                    {entry.tag}
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-8 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono opacity-50 uppercase tracking-widest mb-4">
                      <span>{entry.date}</span>
                      <span>{entry.readTime}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-serif font-light tracking-tight mb-4 group-hover:translate-x-1 transition-transform duration-300">
                      {entry.title}
                    </h3>
                    <p className="text-sm opacity-70 font-sans leading-relaxed">
                      {entry.excerpt}
                    </p>
                  </div>

                  <div className="pt-8 mt-6 border-t border-foreground/10 flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
                      Read Dispatch
                    </span>
                    <div className="w-8 h-8 border border-foreground/20 flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
