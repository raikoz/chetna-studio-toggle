import { useState, useEffect } from "react";
import { Instagram } from "lucide-react";
import { InstagramReelGrid } from "@/components/InstagramReelGrid";
import { client } from "@/lib/contentful";

const INSTAGRAM_ACCOUNT_URL = "https://www.instagram.com/thechetandco/";
const INSTAGRAM_HANDLE = "@thechetandco";

const INITIAL_REEL_URLS = [
  "https://www.instagram.com/reel/DQTXcFOjYKM/",
  "https://www.instagram.com/reel/DCB49SwvJ2J/",
  "https://www.instagram.com/reel/DDo_GfEvDOr/",
];

export function InstagramFeed() {
  const [reelUrls, setReelUrls] = useState<string[]>(INITIAL_REEL_URLS);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>("Just now");

  const fetchLiveInstagramPosts = async () => {
    setIsRefreshing(true);
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
      const uniqueUrls = Array.from(new Set(fetchedUrls.map(u => u.trim())));
      if (uniqueUrls.length > 0) {
        setReelUrls(uniqueUrls.slice(0, 3));
      }
      
      const now = new Date();
      setLastSyncTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    } catch (error) {
      console.error("Error updating Instagram feed:", error);
    } finally {
      setIsRefreshing(false);
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
    <section className="py-24 border-t border-foreground/10 transition-mode bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light tracking-tight">
              Captured in Motion — <br className="hidden md:block" />
              <span className="italic">Unfiltered Studio Artifacts</span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={INSTAGRAM_ACCOUNT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-foreground text-background text-xs tracking-widest uppercase font-medium hover:opacity-90 transition-opacity inline-flex items-center gap-2"
            >
              <Instagram className="w-4 h-4" /> Follow {INSTAGRAM_HANDLE}
            </a>
          </div>
        </div>

        <InstagramReelGrid urls={reelUrls} />
      </div>
    </section>
  );
}
