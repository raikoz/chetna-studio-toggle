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

export default function ProjectPage() {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);
  const [similarWorks, setSimilarWorks] = useState<any[]>([]);
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
          
          try {
            const others = await client.getEntries({
              content_type: 'clientWork',
              limit: 3,
              'sys.id[ne]': id
            });
            setSimilarWorks(others.items.map(item => ({ id: item.sys.id, ...item.fields })));
          } catch (e) {
            console.error("Error fetching similar works:", e);
          }
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

  const igLinksStr = JSON.stringify(project?.igLinks || {});
  const igUrlMatches = igLinksStr.match(/(https:\/\/www\.instagram\.com\/reel\/[a-zA-Z0-9_-]+)/g) || [];
  const igUrls = [...new Set(igUrlMatches)];

  return (
    <main className="min-h-screen bg-background text-foreground transition-mode overflow-x-hidden selection:bg-foreground selection:text-background">
      <Header />
      
      <div className="container mx-auto px-6 pt-40 pb-32">
        {/* Breadcrumb / Back Navigation */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-24 space-y-8 md:space-y-0">
          <Link 
            to="/#work" 
            className="group flex items-center space-x-4 text-[12px] uppercase tracking-[0.6em] opacity-40 hover:opacity-100 transition-all font-bold"
          >
            <span className="transition-transform group-hover:-translate-x-2">←</span>
            <span>Return to Portfolio</span>
          </Link>
          <div className="h-px flex-grow mx-12 bg-foreground/5 hidden md:block"></div>
          <p className="text-[12px] uppercase tracking-[0.6em] opacity-40 font-bold">Selected Case · 01</p>
        </div>

        {/* Hero Section - Massive Title */}
        <section className="mb-40">
          <div className="max-w-[1400px] mx-auto">
            <p className="text-lg md:text-xl uppercase tracking-[0.8em] mb-12 opacity-80 font-medium italic">
              Project Showcase
            </p>
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-serif leading-[0.9] tracking-tighter mb-16 animate-fade-in uppercase text-center lg:text-left">
              {project.brandName}
            </h1>
            {/* Scope of Work Banner */}
            <div className="flex flex-wrap gap-x-6 gap-y-4 mb-20 opacity-80 border-y border-foreground/10 py-8 justify-center lg:justify-start items-center">
               {(project.scope || ["Branding", "Strategy", "Creative Direction"]).map((tag: string, index: number) => (
                 <div key={index} className="flex items-center gap-x-6">
                   {index > 0 && <span className="opacity-40 text-lg leading-none">•</span>}
                   <span className="text-xs md:text-sm uppercase tracking-[0.3em] font-bold">{tag}</span>
                 </div>
               ))}
            </div>
          </div>

          {/* Large Hero Image / Carousel - Top visuals */}
          {images.length > 0 && (
            <div className="relative group overflow-hidden mb-40">
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
        </section>

        {/* Article Section */}
        <section className="max-w-[1400px] mx-auto">
          <div className="mb-40 max-w-5xl mx-auto">
            {/* The Content */}
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

            {/* Sticky Sidebar has been removed. Content is centered above. */}
          </div>

          {/* IG Reels Gallery - Auto Scrolling Marquee */}
          {igUrls.length > 0 && (
            <div className="mt-40 pt-24 border-t border-foreground/10 overflow-hidden">
              <div className="mb-16 text-center">
                <h2 className="text-5xl md:text-6xl font-serif italic mb-6 tracking-tight">Social Storytelling</h2>
                <p className="text-[12px] uppercase tracking-[0.6em] opacity-60 font-bold">Creative Direction • Production • Digital Context</p>
              </div>
              
              <div className="relative flex overflow-hidden group">
                <div className="flex animate-marquee whitespace-nowrap pause-on-hover gap-8 py-10">
                  {/* Two identical sets for seamless loop */}
                  {[1, 2].map((set) => (
                    <div key={set} className="flex gap-8 flex-none">
                      {igUrls.map((url, idx) => {
                        const reelId = url.split("/reel/")[1]?.split("/")[0] || url.split("/p/")[1]?.split("/")[0];
                        // Using a simple thumbnail strategy that links to Instagram's media endpoint
                        const thumbnailUrl = `https://www.instagram.com/reels/${reelId}/thumbnail/`;
                        
                        return (
                          <a 
                            key={`${set}-${idx}`} 
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-none w-[260px] md:w-[300px] relative overflow-hidden rounded-[2.5rem] bg-foreground/5 p-4 transition-all duration-500 border border-foreground/5 flex flex-col items-center group/reel hover:border-foreground/20"
                          >
                            {/* Visual Layer */}
                            <div className="relative w-full aspect-[9/16] bg-black rounded-[1.8rem] overflow-hidden">
                              <img 
                                src={thumbnailUrl}
                                alt="Reel Thumbnail"
                                className="w-full h-full object-cover opacity-80 group-hover/reel:opacity-100 transition-opacity duration-500"
                                onError={(e) => {
                                  // Fallback if Instagram thumbnail endpoint fails
                                  (e.target as HTMLImageElement).src = "https://images.weserv.nl/?url=" + encodeURIComponent(url + "media/?size=l");
                                }}
                              />
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/reel:opacity-100 transition-opacity bg-background/20 backdrop-blur-[2px]">
                                <span className="text-[10px] uppercase tracking-widest font-bold px-4 py-2 border border-foreground/20 bg-background/40">View on IG</span>
                              </div>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Similar Works */}
          {similarWorks && similarWorks.length > 0 && (
            <div className="mt-40 pt-24 pb-20 border-t border-foreground/10">
              <h2 className="text-5xl md:text-6xl font-serif mb-16 italic tracking-tight text-center">Similar Cases</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
                {similarWorks.slice(0, 2).map((work: any, idx: number) => (
                  <Link 
                    key={idx} 
                    to={`/project/${work.id}`} 
                    className="group block border border-foreground/10 p-12 md:p-16 rounded-[2rem] bg-foreground/[0.02] hover:bg-foreground hover:text-background transition-colors duration-500 relative overflow-hidden"
                  >
                    <div className="flex justify-between items-start mb-16">
                      <span className="w-12 h-12 flex items-center justify-center border border-current rounded-full text-xl group-hover:bg-background group-hover:text-foreground transition-colors duration-500">✦</span>
                      <span className="text-sm uppercase tracking-[0.4em] font-bold opacity-50 group-hover:opacity-80 text-right max-w-[60%] line-clamp-2">
                        {(work.scope && work.scope[0]) || "Showcase Work"}
                      </span>
                    </div>
                    <h3 className="text-4xl md:text-5xl font-serif uppercase tracking-tighter mb-4">{work.brandName}</h3>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>

      <Footer />
    </main>
  );
}
