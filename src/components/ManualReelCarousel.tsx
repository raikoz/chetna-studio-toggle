import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { InstagramReelEmbed } from "./InstagramReelEmbed";

interface ManualReelCarouselProps {
  urls: string[];
}

export function ManualReelCarousel({ urls }: ManualReelCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -340, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 340, behavior: "smooth" });
    }
  };

  if (!urls || urls.length === 0) return null;

  return (
    <div className="relative group/carousel my-12">
      {/* Hover Arrow Left */}
      <button
        type="button"
        onClick={scrollLeft}
        aria-label="Scroll Reels Left"
        className="absolute left-2 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-background/80 text-foreground border border-foreground/20 backdrop-blur-md shadow-2xl opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:scale-110 cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Manual Scroll Container */}
      <div
        ref={containerRef}
        className="flex gap-6 overflow-x-auto scrollbar-none py-6 px-4 scroll-smooth snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {urls.map((url, idx) => (
          <div key={idx} className="flex-none w-[280px] sm:w-[320px] snap-center">
            <InstagramReelEmbed url={url} className="w-full" />
          </div>
        ))}
      </div>

      {/* Hover Arrow Right */}
      <button
        type="button"
        onClick={scrollRight}
        aria-label="Scroll Reels Right"
        className="absolute right-2 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-background/80 text-foreground border border-foreground/20 backdrop-blur-md shadow-2xl opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:scale-110 cursor-pointer"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
