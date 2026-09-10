import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { client } from "@/lib/contentful";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import ReactMarkdown from "react-markdown";
import { extractInstagramUrls } from "@/lib/instagram";
import { InstagramReelGrid } from "@/components/InstagramReelGrid";
import { ParallaxImage } from "@/components/ParallaxImage";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useBooking } from "@/contexts/BookingContext";

export default function ProjectPage() {
  const { id } = useParams();
  const { openBookingModal } = useBooking();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchProject = async () => {
      try {
        setLoading(true);
        if (id && id.length > 10) {
          const entry = await client.getEntry(id);
          setProject(entry.fields);
        } else {
          setProject({
            brandName: id?.replace(/-/g, " ") || "Showcase Brand",
            brandDescription: "We worked closely with the founder to architect a fearless visual language, defining typography, merchandise collateral, and digital presence.",
            scope: ["Visual Identity", "Art Direction", "Merchandise", "Brand Ops"],
            dummy: true,
          });
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground transition-mode">
        <p className="font-mono tracking-[0.4em] uppercase text-xs animate-pulse">
          CURATING ARTIFACTS...
        </p>
      </div>
    );
  }

  const images =
    project?.brandMedia?.filter((m: any) =>
      m.fields?.file?.contentType?.startsWith("image/")
    ) || [];

  const getImageUrl = (img: any) => {
    if (!img?.fields?.file?.url) return "";
    const url = img.fields.file.url;
    return url.startsWith("//") ? `https:${url}` : url;
  };

  const igUrls = extractInstagramUrls(project);
  const firstImage = images.length > 0 ? getImageUrl(images[0]) : null;
  const secondImage = images.length > 1 ? getImageUrl(images[1]) : null;
  const remainingImages = images.slice(2);

  return (
    <main className="min-h-screen bg-background text-foreground transition-mode overflow-x-hidden selection:bg-foreground selection:text-background relative">
      <Header />

      {/* Floating Flat Back Button */}
      <Link
        to="/"
        className="fixed bottom-8 left-8 z-50 px-5 py-3 bg-foreground text-background border border-foreground text-xs font-mono uppercase tracking-widest hover:bg-transparent hover:text-foreground transition-colors flex items-center gap-2 group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span>Back to Index</span>
      </Link>

      {/* Top Bar Navigation */}
      <div className="container mx-auto px-6 pt-32 pb-8">
        <div className="flex items-center justify-between border-b border-foreground/15 pb-4 text-xs font-mono uppercase tracking-widest opacity-60">
          <Link to="/" className="hover:opacity-100 transition-opacity flex items-center gap-2">
            <span>←</span> Return to Showcase
          </Link>
          <span>CLIENT WORK ARCHIVE</span>
        </div>
      </div>

      {/* 1. FIRST IMAGE: EDGE-TO-EDGE FULL BLEED */}
      {firstImage && (
        <section className="w-full overflow-hidden border-y border-foreground/20 bg-foreground/5 mb-16">
          <ParallaxImage
            src={firstImage}
            alt={project.brandName}
            fullBleed={true}
            speed={0.15}
          />
        </section>
      )}

      {/* 2. MASSIVE BRAND NAME + WHAT WE DID (SCOPE) */}
      <section className="container mx-auto px-6 mb-20">
        <AnimatedSection>
          <div className="border-b border-foreground/20 pb-10">
            <p className="text-[11px] font-mono uppercase tracking-[0.3em] opacity-60 mb-4">
              CASE STUDY
            </p>
            {/* Massive Brand Name */}
            <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-serif font-light leading-[0.9] tracking-tight uppercase mb-8">
              {project.brandName}
            </h1>

            {/* Scope Tags */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-6 border-t border-foreground/15">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono uppercase tracking-widest opacity-50">
                  SCOPE:
                </span>
                <div className="flex flex-wrap gap-2">
                  {(project.scope || ["Visual Identity", "Strategy", "Creative Direction"]).map(
                    (tag: string, i: number) => (
                      <span
                        key={i}
                        className="text-xs font-mono uppercase tracking-wider px-3 py-1 border border-foreground/25 bg-foreground/[0.03] font-medium"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </div>

              <div className="text-xs font-mono uppercase tracking-widest opacity-60">
                CLIENT: {project.client || project.brandName} • YEAR: {project.year || "2025"}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* 3. ASYMMETRIC CONTENT: ARTICLE TEXT ON SIDE + PRIMARY IMAGE FOCUS */}
      <section className="container mx-auto px-6 mb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Sticky Text Details */}
          <AnimatedSection direction="right" className="lg:col-span-4 sticky top-28">
            <div className="border-l border-foreground/30 pl-6 py-2 space-y-6">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.3em] opacity-50 mb-2">
                  THE CONTEXT &amp; MANDATE
                </p>
                <h2 className="text-2xl font-serif italic text-foreground">
                  The Strategic Shift
                </h2>
              </div>

              {/* Reduced size text */}
              <div className="prose prose-sm max-w-none text-foreground/80 font-sans leading-relaxed text-sm">
                <ReactMarkdown>{project.brandDescription}</ReactMarkdown>
              </div>

              <div className="pt-6 border-t border-foreground/15">
                <button
                  type="button"
                  onClick={openBookingModal}
                  className="w-full py-3.5 bg-foreground text-background text-xs font-mono uppercase tracking-widest font-bold hover:bg-transparent hover:text-foreground border border-foreground transition-colors flex items-center justify-center gap-2"
                >
                  <span>Inquire for Similar Scope</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </AnimatedSection>

          {/* Right: Flat Showcase Gallery */}
          <div className="lg:col-span-8 space-y-10">
            {remainingImages.map((img: any, idx: number) => (
              <AnimatedSection key={idx} delay={idx * 0.08}>
                <div className="border border-foreground/20 bg-foreground/5 p-3 hover:border-foreground transition-colors duration-200">
                  <div className="overflow-hidden bg-background">
                    <img
                      src={getImageUrl(img)}
                      alt={img.fields?.title || `${project.brandName} showcase`}
                      className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>
                  <div className="pt-3 flex items-center justify-between text-[10px] font-mono opacity-60 uppercase tracking-widest">
                    <span>ARTIFACT {String(idx + 1).padStart(2, "0")}</span>
                    <span>{project.brandName}</span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SECOND IMAGE: EDGE-TO-EDGE FULL BLEED */}
      {secondImage && (
        <section className="w-full overflow-hidden border-y border-foreground/20 bg-foreground/5 my-20">
          <ParallaxImage
            src={secondImage}
            alt={`${project.brandName} Edge Visual`}
            fullBleed={true}
            speed={0.2}
          />
        </section>
      )}

      {/* 5. INSTAGRAM STORYTELLING REELS */}
      {igUrls.length > 0 && (
        <section className="container mx-auto px-6 mt-28 pt-16 border-t border-foreground/15">
          <div className="mb-12 text-center">
            <p className="text-xs font-mono uppercase tracking-[0.4em] opacity-60 mb-2">
              LIVE ARTIFACTS
            </p>
            <h2 className="text-4xl md:text-5xl font-serif italic tracking-tight">
              Captured in Motion
            </h2>
          </div>

          <InstagramReelGrid urls={igUrls} />
        </section>
      )}

      <Footer />
    </main>
  );
}
