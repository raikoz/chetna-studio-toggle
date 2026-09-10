import { useState, useEffect } from "react";
import { Instagram, ArrowUpRight } from "lucide-react";
import { InstagramReelGrid } from "@/components/InstagramReelGrid";
import { client } from "@/lib/contentful";
import { AnimatedSection } from "./AnimatedSection";

const INSTAGRAM_ACCOUNT_URL = "https://www.instagram.com/thechetandco/";
const INSTAGRAM_HANDLE = "@thechetandco";

const INITIAL_REEL_URLS = [
  "https://www.instagram.com/reel/DQTXcFOjYKM/",
  "https://www.instagram.com/reel/DCB49SwvJ2J/",
  "https://www.instagram.com/reel/DDo_GfEvDOr/",
];

export function InstagramFeed() {
  const [reelUrls, setReelUrls] = useState<string[]>(INITIAL_REEL_URLS);

  const fetchLiveInstagramPosts = async () => {
    try {
      const response = await client.getEntries({
        content_type: "clientWork",
        order: ["-sys.createdAt"],
      });
      const regex = /(https?:\/\/(www\.)?instagram\.com\/(reel|p|reels|tv)\/[a-zA-Z0-9_-]+)/gi;
      const fetchedUrls: string[] = [];
      if (response && response.items && Array.isArray(response.items)) {
        response.items.forEach((item: any) => {
          if (item && item.fields) {
            const str = JSON.stringify(item.fields);
            const matches = str.match(regex);
            if (matches) fetchedUrls.push(...matches);
          }
        });
      }
      const uniqueUrls = Array.from(new Set(fetchedUrls.map((u) => u.trim())));
      if (uniqueUrls.length > 0) {
        setReelUrls(uniqueUrls.slice(0, 3));
      }
    } catch (error) {
      console.error("Error updating Instagram feed:", error);
    }
  };

  useEffect(() => {
    fetchLiveInstagramPosts();
    const interval = setInterval(() => {
      fetchLiveInstagramPosts();
    }, 45000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-32 border-t border-foreground/15 transition-mode bg-background">
      <div className="container mx-auto px-6">
        <AnimatedSection>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-foreground/15 pb-8">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.4em] opacity-60 mb-3">
                [ 07 // UNFILTERED MOTION ]
              </p>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light tracking-tight">
                Captured in Motion — <br className="hidden md:block" />
                <span className="italic">Studio Artifacts</span>
              </h2>
            </div>

            <div className="flex items-center gap-4">
              <a
                href={INSTAGRAM_ACCOUNT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-foreground text-background text-xs font-mono tracking-widest uppercase font-medium hover:opacity-90 transition-opacity inline-flex items-center gap-2 border border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]"
              >
                <Instagram className="w-4 h-4" />
                <span>Follow {INSTAGRAM_HANDLE}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <InstagramReelGrid urls={reelUrls} />
        </AnimatedSection>
      </div>
    </section>
  );
}
