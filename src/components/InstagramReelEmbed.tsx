import { useState } from "react";
import { Play, Pause, Volume2, VolumeX, ExternalLink } from "lucide-react";

interface InstagramReelEmbedProps {
  url: string;
  className?: string;
}

export function extractReelId(url: string): string | null {
  if (!url) return null;
  const match = url.match(/\/(reel|p|reels|tv)\/([a-zA-Z0-9_-]+)/i);
  return match ? match[2] : null;
}

export function InstagramReelEmbed({ url, className = "" }: InstagramReelEmbedProps) {
  const reelId = extractReelId(url);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  if (!reelId) return null;

  const activePlaying = isPlaying && !isHovered;
  const embedUrl = `https://www.instagram.com/reel/${reelId}/embed/?autoplay=${activePlaying ? 1 : 0}&muted=${isMuted ? 1 : 0}`;

  const handleContainerClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("button")) {
      return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying((prev) => !prev);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted((prev) => !prev);
  };

  return (
    <div
      onClick={handleContainerClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative overflow-hidden bg-black cursor-pointer transition-all duration-500 hover:scale-[1.01] border-2 border-foreground/30 hover:border-foreground shadow-[6px_6px_0px_0px_hsl(var(--foreground)/0.15)] ${className}`}
      title="Click to open Reel on Instagram"
    >
      {/* Video Container */}
      <div className="relative w-full aspect-[9/16] overflow-hidden bg-black">
        <iframe
          src={embedUrl}
          className="absolute inset-0 w-full h-[120%] -top-[10%] border-0 outline-none pointer-events-none"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          allowFullScreen
          scrolling="no"
          title={`Instagram Reel ${reelId}`}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />

        {/* Interactive Play/Pause & Mute Buttons */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={activePlaying ? "Pause Reel" : "Play Reel"}
            className="p-2.5 bg-black/80 backdrop-blur-md text-white hover:bg-black transition-colors border border-white/30 shadow-lg cursor-pointer"
          >
            {activePlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
          </button>

          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute Reel" : "Mute Reel"}
            className="p-2.5 bg-black/80 backdrop-blur-md text-white hover:bg-black transition-colors border border-white/30 shadow-lg cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Hover overlay indicator */}
        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px] pointer-events-none">
          <span className="px-5 py-2.5 bg-white text-black text-xs font-mono uppercase tracking-[0.2em] font-bold shadow-2xl flex items-center gap-2 mb-2 border border-black">
            View Reel <ExternalLink className="w-3.5 h-3.5" />
          </span>
          <span className="text-[10px] text-white/80 font-mono uppercase tracking-widest bg-black/80 px-3 py-1 border border-white/20">
            Paused on Hover
          </span>
        </div>
      </div>
    </div>
  );
}
