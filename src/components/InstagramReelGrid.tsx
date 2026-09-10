import { InstagramReelEmbed } from "./InstagramReelEmbed";

interface InstagramReelGridProps {
  urls: string[];
}

export function InstagramReelGrid({ urls }: InstagramReelGridProps) {
  const reels = (urls || []).slice(0, 3);

  if (reels.length === 0) return null;

  return (
    <div className="w-full max-w-6xl mx-auto my-12">
      {/* Fixed 1x3 Grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {reels.map((url, idx) => (
          <InstagramReelEmbed key={idx} url={url} className="w-full" />
        ))}

        {/* Placeholder if fewer than 3 reels */}
        {Array.from({ length: Math.max(0, 3 - reels.length) }).map((_, idx) => (
          <div
            key={`placeholder-${idx}`}
            className="hidden md:flex flex-col items-center justify-center aspect-[9/16] bg-foreground/5 border-2 border-dashed border-foreground/20 p-6 text-center"
          >
            <span className="text-2xl opacity-20 font-serif mb-2">✦</span>
            <span className="text-xs uppercase tracking-widest opacity-40 font-mono">Curating Reel</span>
          </div>
        ))}
      </div>
    </div>
  );
}
