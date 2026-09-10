import { InstagramReelEmbed } from "./InstagramReelEmbed";

interface InstagramReelGridProps {
  urls: string[];
}

export function InstagramReelGrid({ urls }: InstagramReelGridProps) {
  // Take up to 4 reels for clean 2-in-a-row pairs on mobile and 3-4 on desktop
  const reels = (urls || []).slice(0, 4);

  if (reels.length === 0) return null;

  return (
    <div className="w-full max-w-6xl mx-auto my-8 sm:my-12">
      {/* Strictly 2 reels per row on mobile (grid-cols-2), 3 on md, 4 on lg */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
        {reels.map((url, idx) => (
          <InstagramReelEmbed key={idx} url={url} className="w-full" />
        ))}
      </div>
    </div>
  );
}
