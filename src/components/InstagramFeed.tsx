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
    <section className="py-24 transition-mode bg-background">
      <div className="container mx-auto px-6">
        <AnimatedSection className="mb-14">
          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 border-b border-foreground/10 pb-6">
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light tracking-tight">
                Captured in Motion
              </h2>
              <p className="text-xs font-sans uppercase tracking-widest opacity-50 mt-2">
                Live Studio Artifacts
              </p>
            </div>

            <a
              href={INSTAGRAM_ACCOUNT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-sans uppercase tracking-widest opacity-70 hover:opacity-100 transition-opacity inline-flex items-center gap-2 group"
            >
              <Instagram className="w-4 h-4" />
              <span>Follow {INSTAGRAM_HANDLE}</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <InstagramReelGrid urls={reelUrls} />
        </AnimatedSection>
      </div>
    </section>
  );
}
