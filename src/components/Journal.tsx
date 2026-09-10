import { ArrowUpRight } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";

interface JournalEntry {
  id: string;
  tag: string;
  date: string;
  title: string;
  image: string;
}

const ENTRIES: JournalEntry[] = [
  {
    id: "rebrand-anatomy",
    tag: "Brand Architecture",
    date: "Sep 2025",
    title: "The Anatomy of a High-Conviction Rebrand",
    image: "/images/montage-5.jpg",
  },
  {
    id: "fault-in-our-ops",
    tag: "Design Operations",
    date: "Aug 2025",
    title: "Why Most Brand Guidelines Die on Slide 12",
    image: "/images/about-2.jpg",
  },
  {
    id: "the-gathering",
    tag: "Leadership & Culture",
    date: "Jul 2025",
    title: "The Gathering: Notes from the Founder Salon",
    image: "/images/montage-7.jpg",
  },
  {
    id: "physical-community",
    tag: "Community Artifacts",
    date: "Jun 2025",
    title: "Sofar Sounds: Physical Rooms, Digital Resonance",
    image: "/images/montage-9.jpg",
  },
];

export function Journal() {
  return (
    <section id="journal" className="py-24 transition-mode relative">
      <div className="container mx-auto px-6">
        {/* Minimal Section Header */}
        <AnimatedSection className="mb-14">
          <div className="border-b border-foreground/10 pb-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light tracking-tight">
              The Journal
            </h2>
            <p className="text-xs font-mono uppercase tracking-widest opacity-50 mt-2">
              Editorial &amp; Dispatches
            </p>
          </div>
        </AnimatedSection>

        {/* Minimal Non-Boxy 2x2 Grid (Soft 10px rounded image, clean typography below) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {ENTRIES.map((entry, index) => (
            <AnimatedSection key={entry.id} delay={index * 0.06}>
              <article className="group cursor-pointer">
                {/* Image Container with Soft 10px Radius */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-[10px] bg-foreground/5 mb-4">
                  <img
                    src={entry.image}
                    alt={entry.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-sm text-[10px] font-mono uppercase tracking-widest">
                    {entry.tag}
                  </div>
                </div>

                {/* Minimal Typography: Date + Header */}
                <div className="flex items-baseline justify-between gap-4">
                  <div>
                    <span className="text-xs font-mono opacity-50 uppercase tracking-wider block mb-1">
                      {entry.date}
                    </span>
                    <h3 className="text-xl md:text-2xl font-serif font-light tracking-tight group-hover:opacity-75 transition-opacity">
                      {entry.title}
                    </h3>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-4 h-4" />
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
