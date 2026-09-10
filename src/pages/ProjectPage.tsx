import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { client } from "@/lib/contentful";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import ReactMarkdown from "react-markdown";
import { extractInstagramUrls } from "@/lib/instagram";
import { InstagramReelGrid } from "@/components/InstagramReelGrid";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ArrowLeft, ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";
import { useBooking } from "@/contexts/BookingContext";

// Interactive zoom component: spans edge-to-edge across screen, zooms into hovered part
function ZoomableEdgeImage({ src, alt }: { src: string; alt: string }) {
  const [transformOrigin, setTransformOrigin] = useState("50% 50%");
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setTransformOrigin(`${Math.min(100, Math.max(0, x))}% ${Math.min(100, Math.max(0, y))}%`);
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setTransformOrigin("50% 50%");
      }}
      onMouseMove={handleMouseMove}
      className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] max-w-none overflow-hidden cursor-crosshair bg-foreground/5"
    >
      <img
        src={src}
        alt={alt}
        style={{
          transformOrigin,
          transform: isHovered ? "scale(1.85)" : "scale(1)",
          transition: isHovered ? "transform 0.12s ease-out" : "transform 0.45s cubic-bezier(0.25, 0.4, 0.25, 1)",
        }}
        className="w-full h-auto block select-none will-change-transform"
      />
      {!isHovered && (
        <div className="absolute bottom-4 right-6 bg-background/80 backdrop-blur-md px-3 py-1 rounded-[6px] text-[10px] font-sans uppercase tracking-widest opacity-60 pointer-events-none hidden sm:block">
          Hover to inspect detail
        </div>
      )}
    </div>
  );
}

export default function ProjectPage() {
  const { id } = useParams();
  const { openBookingModal } = useBooking();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showFullText, setShowFullText] = useState(false);

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
            brandDescription:
              "We collaborated closely with the leadership team to architect a distinctive visual ecosystem. From core typography and editorial art direction to digital touchpoints, each artifact was engineered to convey conviction and timeless elegance.",
            scope: ["Visual Identity", "Art Direction", "Brand Ops"],
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
        <p className="font-sans tracking-[0.3em] uppercase text-xs animate-pulse opacity-70">
          Loading Project...
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
  const remainingImages = images.slice(1);

  // Split description into paragraphs, limiting to 2-3 max with View More toggle
  const fullDescription = project.brandDescription || "";
  const paragraphs = fullDescription
    .split(/\n\n+/)
    .map((p: string) => p.trim())
    .filter(Boolean);

  const initialParagraphs = paragraphs.slice(0, 2);
  const extraParagraphs = paragraphs.slice(2);
  const hasMoreText = extraParagraphs.length > 0;

  return (
    <main className="min-h-screen bg-background text-foreground transition-mode overflow-x-hidden selection:bg-foreground selection:text-background relative">
      <Header />

      {/* Floating Back Button */}
      <Link
        to="/work"
        className="fixed bottom-8 left-8 z-50 px-5 py-3 bg-foreground text-background text-xs font-sans font-medium uppercase tracking-widest hover:opacity-85 transition-opacity flex items-center gap-2 group rounded-[8px] shadow-sm"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span>Back to Work</span>
      </Link>

      {/* Top Bar Navigation */}
      <div className="container mx-auto px-6 pt-32 pb-6">
        <div className="flex items-center justify-between border-b border-foreground/10 pb-4 text-xs font-sans uppercase tracking-widest opacity-60">
          <Link to="/work" className="hover:opacity-100 transition-opacity flex items-center gap-2">
            <span>←</span> Return to Showcase
          </Link>
          <span>CLIENT ARCHIVE</span>
        </div>
      </div>

      {/* 1. BRAND HEADER: TYPOGRAPHY, SCOPE & METADATA */}
      <section className="container mx-auto px-6 mb-12">
        <AnimatedSection>
          <div className="pt-2">
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[8rem] font-serif font-light leading-[0.92] tracking-tight uppercase mb-6">
              {project.brandName}
            </h1>

            {/* Scope Tags & Client Info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 border-t border-foreground/10 text-xs font-sans">
              <div className="flex flex-wrap items-center gap-2">
                <span className="uppercase tracking-widest opacity-50 mr-2">Scope:</span>
                {(project.scope || ["Visual Identity", "Strategy", "Art Direction"]).map(
                  (tag: string, i: number) => (
                    <span
                      key={i}
                      className="uppercase tracking-wider px-3 py-1 bg-foreground/[0.06] rounded-[6px] font-medium"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>

              <div className="uppercase tracking-widest opacity-60">
                {project.client || project.brandName} • {project.year || "2025"}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* 2. PRIMARY EDGE-TO-EDGE FULL-WIDTH IMAGE WITH HOVER ZOOM */}
      {firstImage && (
        <section className="w-full mb-16 overflow-hidden">
          <ZoomableEdgeImage src={firstImage} alt={project.brandName} />
        </section>
      )}

      {/* 3. 1-COLUMN NARRATIVE: SMALL TEXT, MAX 2-3 PARAGRAPHS WITH VIEW MORE */}
      <section className="container mx-auto px-6 mb-20">
        <AnimatedSection>
          <div className="max-w-3xl pt-8 border-t border-foreground/10">
            <p className="text-[10px] font-sans uppercase tracking-[0.3em] opacity-50 mb-3">
              MANDATE &amp; CONTEXT
            </p>

            <div className="text-xs sm:text-[13px] font-sans leading-relaxed text-foreground/80 space-y-4">
              {initialParagraphs.map((para: string, idx: number) => (
                <p key={idx}>{para}</p>
              ))}

              {/* Extended text revealed on View More */}
              {showFullText &&
                extraParagraphs.map((para: string, idx: number) => (
                  <p key={`extra-${idx}`} className="animate-fadeIn">
                    {para}
                  </p>
                ))}
            </div>

            {hasMoreText && (
              <button
                type="button"
                onClick={() => setShowFullText(!showFullText)}
                className="mt-4 text-xs font-sans font-medium uppercase tracking-wider opacity-70 hover:opacity-100 transition-opacity flex items-center gap-1.5 cursor-pointer"
              >
                <span>{showFullText ? "View Less" : "View More Details"}</span>
                {showFullText ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            )}

            <div className="pt-6 mt-8 border-t border-foreground/10 flex items-center gap-4">
              <button
                type="button"
                onClick={openBookingModal}
                className="px-6 py-3 bg-foreground text-background text-xs font-sans uppercase tracking-widest font-semibold hover:opacity-85 transition-opacity flex items-center gap-2 rounded-[8px] cursor-pointer"
              >
                <span>Inquire for Similar Scope</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* 4. REMAINING SHOWCASE IMAGES: EDGE-TO-EDGE FIT-WIDTH WITH HOVER ZOOM */}
      {remainingImages.length > 0 && (
        <section className="w-full space-y-16 mb-24 overflow-hidden">
          {remainingImages.map((img: any, idx: number) => (
            <div key={idx} className="w-full overflow-hidden">
              <ZoomableEdgeImage
                src={getImageUrl(img)}
                alt={img.fields?.title || `${project.brandName} Visual ${idx + 1}`}
              />
            </div>
          ))}
        </section>
      )}

      {/* 5. MOTION ARCHIVE REELS */}
      {igUrls.length > 0 && (
        <section className="container mx-auto px-6 mb-28 pt-16 border-t border-foreground/10">
          <div className="mb-12 text-center">
            <p className="text-xs font-sans uppercase tracking-[0.35em] opacity-60 mb-2">
              MOTION ARCHIVE
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
