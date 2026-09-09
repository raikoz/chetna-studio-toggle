import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { client } from "@/lib/contentful";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ReactMarkdown from "react-markdown";
import { extractInstagramUrls } from "@/lib/instagram";
import { InstagramReelGrid } from "@/components/InstagramReelGrid";
import { ArrowLeft } from "lucide-react";

export default function ProjectPage() {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);

    const fetchProject = async () => {
      try {
        setLoading(true);
        if (id && id.length > 10) {
          const entry = await client.getEntry(id);
          console.log('DEBUG: Project data received:', entry.fields);
          setProject(entry.fields);
        } else {
          setProject({
            brandName: id?.replace(/-/g, " ") || "Showcase Brand",
            brandDescription: "This project is currently being curated. We're working closely with the client to finalize the brandbook and showcase the evolution of their identity. Check back soon for the full story.",
            dummy: true
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

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground transition-mode">
      <p className="animate-pulse tracking-widest uppercase text-sm font-medium">Curating Showcase...</p>
    </div>
  );

  const images = project?.brandMedia?.filter((m: any) => 
    m.fields?.file?.contentType?.startsWith("image/")
  ) || [];

  const igUrls = extractInstagramUrls(project);

  return (
    <main className="min-h-screen bg-background text-foreground transition-mode overflow-x-hidden selection:bg-foreground selection:text-background relative">
      <Header />
      
      {/* Floating Back Button for Entry Pages */}
      <Link 
        to="/" 
        className="fixed bottom-8 left-8 z-50 px-5 py-3 rounded-full bg-foreground text-background border border-foreground/20 text-xs tracking-[0.2em] font-bold uppercase hover:scale-105 shadow-2xl transition-all flex items-center gap-2 group backdrop-blur-md opacity-90 hover:opacity-100"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span>Back to Home</span>
      </Link>
      
      <div className="container mx-auto px-6 pt-40 pb-32">
        {/* Breadcrumb Navigation */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-24 space-y-8 md:space-y-0">
          <Link 
            to="/" 
            className="group flex items-center space-x-4 text-[12px] uppercase tracking-[0.6em] opacity-40 hover:opacity-100 transition-all font-bold"
          >
            <span className="transition-transform group-hover:-translate-x-2">←</span>
            <span>Return to Portfolio</span>
          </Link>
          <div className="h-px flex-grow mx-12 bg-foreground/5 hidden md:block"></div>
          <p className="text-[12px] uppercase tracking-[0.6em] opacity-40 font-bold">Selected Case</p>
        </div>

        {/* Hero Section - Massive Title */}
        <section className="mb-24">
          <div className="max-w-[1400px] mx-auto">
            <p className="text-lg md:text-xl uppercase tracking-[0.8em] mb-12 opacity-80 font-medium italic">
              Project Showcase
            </p>
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-serif leading-[0.9] tracking-tighter mb-16 animate-fade-in uppercase text-center lg:text-left">
              {project.brandName}
            </h1>
          </div>

          {/* Large Hero Image / Carousel - Top visuals */}
          {images.length > 0 && (
            <div className="relative group overflow-hidden mb-16">
              <Carousel className="w-full">
                <CarouselContent>
                  {images.map((img: any, idx: number) => (
                    <CarouselItem key={idx}>
                      <div className="relative overflow-hidden bg-foreground/5 w-full flex items-center justify-center min-h-[50vh] max-h-[85vh]">
                        <img
                          src={img.fields.file.url.startsWith("//") ? `https:${img.fields.file.url}` : img.fields.file.url}
                          alt={img.fields.title}
                          className="w-full h-auto max-h-[85vh] object-contain transition-transform duration-[2000ms]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none"></div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {images.length > 1 && (
                  <>
                    <CarouselPrevious className="left-8 opacity-0 group-hover:opacity-100 transition-opacity bg-background/50 backdrop-blur-md border-0" />
                    <CarouselNext className="right-8 opacity-0 group-hover:opacity-100 transition-opacity bg-background/50 backdrop-blur-md border-0" />
                  </>
                )}
              </Carousel>
              <div className="mt-8 overflow-hidden opacity-40">
                <div className="flex animate-marquee-slow whitespace-nowrap">
                  <span className="text-[10px] uppercase tracking-[0.4em] pr-4">
                    Brand Vision & Strategy • Creative Direction • Identity Reveal • Brand Vision & Strategy • Creative Direction • Identity Reveal • 
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.4em] pr-4">
                    Brand Vision & Strategy • Creative Direction • Identity Reveal • Brand Vision & Strategy • Creative Direction • Identity Reveal • 
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Scope of Work Banner - Placed AFTER Brand Media thumbnail image */}
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-wrap gap-x-6 gap-y-4 my-16 opacity-80 border-y border-foreground/10 py-8 justify-center lg:justify-start items-center">
              <span className="text-xs uppercase tracking-[0.4em] opacity-40 font-mono mr-2">Scope of Work:</span>
              {(project.scope || ["Branding", "Strategy", "Creative Direction"]).map((tag: string, index: number) => (
                <div key={index} className="flex items-center gap-x-6">
                  {index > 0 && <span className="opacity-40 text-lg leading-none">•</span>}
                  <span className="text-xs md:text-sm uppercase tracking-[0.3em] font-bold">{tag}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Article Section */}
        <section className="max-w-[1400px] mx-auto">
          <div className="mb-40 max-w-5xl mx-auto">
            <div>
              <div className="pb-8 mb-12 border-b border-foreground/10 text-center">
                <h2 className="text-4xl md:text-5xl font-serif italic mb-4 tracking-tight">The Evolution</h2>
                <p className="text-[12px] uppercase tracking-[0.6em] opacity-60 font-bold">Detailed Brand Analysis</p>
              </div>
              <div className="prose prose-invert prose-lg md:prose-xl max-w-none text-foreground/90 leading-[2.2] font-serif font-light text-center md:text-left">
                <ReactMarkdown
                  components={{
                    img: ({ node, ...props }) => (
                      <img
                        {...props}
                        className="w-full h-auto my-20 shadow-2xl transition-all duration-700 hover:scale-[1.01] border-0 rounded-3xl"
                      />
                    ),
                    p: ({ children }) => <p className="mb-12 text-2xl md:text-3xl leading-relaxed opacity-100">{children}</p>,
                    h1: ({ children }) => <h3 className="text-5xl font-serif mb-12 mt-24 uppercase tracking-tighter">{children}</h3>,
                    h2: ({ children }) => <h3 className="text-4xl font-serif mb-8 mt-16 italic">{children}</h3>,
                  }}
                >
                  {project.brandDescription}
                </ReactMarkdown>
              </div>
            </div>
          </div>

          {/* IG Reels Section: Fixed 1x3 Grid taking first 3 IGLinks without scrolling */}
          {igUrls.length > 0 && (
            <div className="mt-40 pt-24 border-t border-foreground/10 overflow-hidden">
              <div className="mb-12 text-center">
                <h2 className="text-5xl md:text-6xl font-serif italic mb-6 tracking-tight">Social Storytelling</h2>
                <p className="text-[12px] uppercase tracking-[0.6em] opacity-60 font-bold">Creative Direction • Live Reels • Hover to Pause</p>
              </div>
              
              <InstagramReelGrid urls={igUrls} />
            </div>
          )}
        </section>
      </div>

      <Footer />
    </main>
  );
}
