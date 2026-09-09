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

  // Static mapping for Gunjan project reels (Fresh links from subagent extraction)
  const gunjanMp4Links: Record<string, string> = {
    "C_SSalBvkrB": "https://scontent-lax3-1.cdninstagram.com/o1/v/t2/f2/m367/AQMlaLQuuy1CkUb7e74B4iT6n62K4z5AvPDu3L47hO6S0Ti9V3Om0qB3ZN-6vKbPHTCfJLFoBCXrIlifIYK8i13EDOWvdkCfvcOO228.mp4?_nc_cat=104&_nc_sid=5e9851&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_ohc=7Cqim1M6n_0Q7kNvwEmOhcy&efg=eyJ2ZW5jb2RlX3RhZyI6Inhwdl9wcm9ncmVzc2l2ZS5JTlNUQUdSQU0uQ0xJUFMuQzMuNzIwLmRhc2hfYmFzZWxpbmVfMV92MSIsInhwdl9hc3NldF9pZCI6MzM1ODkzMzA5NDQxMTAxNywiYXNzZXRfYWdlX2RheXMiOjU3MywidmlfdXNlY2FzZV9pZCI6MTAwOTksImR1cmF0aW9uX3MiOjksInVybGdlbl9zb3VyY2UiOiJ3d3cifQ%3D%3D&ccb=17-1&vs=fb415b7b6281881a&_nc_vs=HBksFQIYQGlnX2VwaGVtZXJhbC85MDQ1QTIzM0UxNjY5ODcwODU4RjMwMDBDMTk4RTZCRF92aWRlb19kYXNoaW5pdC5tcDQVAALIARIAFQIYRmlnX3hwdl9yZWVsc19wZXJtYW5lbnRfc3JfcHJvZC84NTMzNzQzMTY3MjkzMTRfMzUyNDM0OTEyNzQwMzU4Mzc2NS5tcDQVAgLIARIAKAAYABsCiAd1c2Vfb2lsATEScHJvZ3Jlc3NpdmVfcmVjaXBlATEVAAAmkqzV3tG79wsVAigCQzMsF0AiAAAAAAAAGBJkYXNoX2Jhc2VsaW5lXzFfdjERAHX-B2XmnQEA&_nc_gid=_Ox9bzM_EOuxXLXSZdossw&_nc_zt=28&_nc_ss=7a32e&oh=00_AfzGhaGqRoE5tmYH7Nj9KQRSJw0eO-dYe3Wx_oUjx_nRGg&oe=69CAF825",
    "C_IgpqivgwF": "https://scontent-lga3-1.cdninstagram.com/o1/v/t2/f2/m367/AQM-BsJAoDfLbMv8E1clPlVgjZFR14EsHP38nJ83VhR5DvL3hgvwLLbPO28Le4C6KNp_y95sDvU8STkDk5jrGfIHSILcKRKqfDEa4pA.mp4?_nc_cat=103&_nc_sid=5e9851&_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_ohc=A9bnosPn__kQ7kNvwGbrULF&efg=eyJ2ZW5jb2RlX3RhZyI6Inhwdl9wcm9ncmVzc2l2ZS5JTlNUQUdSQU0uQ0xJUFMuQzMuNzIwLmRhc2hfYmFzZWxpbmVfMV92MSIsInhwdl9hc3NldF9pZCI6NzYzODIxMjA1OTYxODE2MywiYXNzZXRfYWdlX2RheXMiOjU3NywidmlfdXNlY2FzZV9pZCI6MTAwOTksImR1cmF0aW9uX3MiOjEwLCJ1cmxnZW5fc291cmNlIjoid3d3In0%3D&ccb=17-1&vs=c8e08b0f1f8172e5&_nc_vs=HBksFQIYQGlnX2VwaGVtZXJhbC82RDQxODg4QTc2NEU2QkY5RTJFNThGRjQ3NUVENkM5NV92aWRlb19kYXNoaW5pdC5tcDQVAALIARIAFQIYRmlnX3hwdl9yZWVsc19wZXJtYW5lbnRfc3JfcHJvZC80OTMxMzM4ODAxNDI0MzBfODc3NjQ2NTQzNDg4Mzc2OTM4OC5tcDQVAgLIARIAKAAYABsCiAd1c2Vfb2lsATEScHJvZ3Jlc3NpdmVfcmVjaXBlATEVAAAm5u3CyLq6kRsVAigCQzMsF0AlJul41P30GBJkYXNoX2Jhc2VsaW5lXzFfdjERAHX-B2XmnQEA&_nc_gid=v2U-CsVc4v8GBnIIIkcukQ&_nc_zt=28&_nc_ss=7a32e&oh=00_AfwiMV_1_k2OTDpwlGMdyd3RORtHRWW4yqKRmJmmSDCtdw&oe=69CAE710",
    "C_Vt-FkvtUW": "https://scontent-ord5-1.cdninstagram.com/o1/v/t2/f2/m367/AQNCrpCamtZ22cZyE6uYspKZW-2cXNJwR9HMIVqTLAi7JlasOr3apTBkzcodaS3CoaAvZTKZ0GsvqEOaxFsBmwmiAl-WGDkyQ5ShV4o.mp4?_nc_cat=111&_nc_sid=5e9851&_nc_ht=scontent-ord5-1.cdninstagram.com&_nc_ohc=TliY7X-k__UQ7kNvwGBsMNR&efg=eyJ2ZW5jb2RlX3RhZyI6Inhwdl9wcm9ncmVzc2l2ZS5JTlNUQUdSQU0uQ0xJUFMuQzMuNzIwLmRhc2hfYmFzZWxpbmVfMV92MSIsInhwdl9hc3NldF9pZCI6NzY5OTQ3MjQ1NjgxODkyMywiYXNzZXRfYWdlX2RheXMiOjU3MSwidmlfdXNlY2FzZV9pZCI6MTAwOTksImR1cmF0aW9uX3MiOjksInVybGdlbl9zb3VyY2UiOiJ3d3cifQ%3D%3D&ccb=17-1&vs=dfc0168f190cc3&_nc_vs=HBksFQIYQGlnX2VwaGVtZXJhbC9ENDQxQ0UxRUU3MkE5Nzc0QkQyN0JDMDZDNjIxMURBNV92aWRlb19kYXNoaW5pdC5tcDQVAALIARIAFQIYR2lnX3hwdl9yZWVsc19wZXJtYW5lbnRfc3JfcHJvZC8xNTQ4Mjk0NzYyNDUzMDM4XzY4MjY4ODE4NzA4NzQ2NjMwODIubXA0FQICyAESACgAGAAbAogHdXNlX29pbAExEnByb2dyZXNzaXZlX3JlY2hwZQExFQAAJtaD-YukqK0bFQIoAkMzLBdAI7tkWhysCBgSZGFzaF9iYXNlbGluZV8xX3YxEQB1_gdl5p0BAA&_nc_gid=FxK8mk6JvyJhtKRzk1DP9A&_nc_zt=28&_nc_ss=7a32e&oh=00_AfzTrQN1kzlrPUuBigZRmawjFpm4CHD_eyHr2Zpo2kCaFw&oe=69CAEAB4",
    "C_WJIcJBN4A": "https://scontent-lax7-1.cdninstagram.com/o1/v/t2/f2/m367/AQPQGVH4HdlBuQPstZuc1tw4u8KxFsp66rb8HDvlFJ_nPJJMoZufzPZsYJpQTXNN05b4TNBHIB68ENeLzQVPxa1PkjVKPLLSq2ceyZo.mp4?_nc_cat=111&_nc_sid=5e9851&_nc_ht=scontent-lax7-1.cdninstagram.com&_nc_ohc=Auf3xWJHEDwQ7kNvwFZKj1E&efg=eyJ2ZW5jb2RlX3RhZyI6Inhwdl9wcm9ncmVzc2l2ZS5JTlNUQUdSQU0uQ0xJUFMuQzMuNzIwLmRhc2hfYmFzZWxpbmVfMV92MSIsInhwdl9hc3NldF9pZCI6MTY3ODI2MjQzNjA3ODE0MiwiYXNzZXRfYWdlX2RheXMiOjU3MSwidmlfdXNlY2FzZV9pZCI6MTAwOTksImR1cmF0aW9uX3MiOjE5LCJ1cmxnZW5fc291cmNlIjoid3d3In0%3D&ccb=17-1&vs=cf2fc29069113632&_nc_vs=HBksFQIYQGlnX2VwaGVtZXJhbC85QzRFMDg5M0UxQzY2MUE4MjU2MUYwMjc0MjUxRjVBRl92aWRlb19kYXNoaW5pdC5tcDQVAALIARIAFQIYR2lnX3hwdl9yZWVsc19wZXJtYW5lbnRfc3JfcHJvZC8xNjcwNDU3MjEwNDc3MTI1XzUyMjEwNjI0MzMxMjE0OTY4ODcubXA0FQICyAESACgAGAAbAogHdXNlX29pbAExEnByb2dyZXNzaXZlX3JlY2hwZQExFQAAJvyIvcXdl_sFFQIoAkMzLBdAM3dLxqfvnhgSZGFzaF9iYXNlbGluZV8xX3YxEQB1_gdl5p0BAA&_nc_gid=R8x97OVcqNfN7TXPMhJ8Fg&_nc_ss=7a30f&_nc_zt=28&oh=00_AfxXm8OqUnD1slMDjr7xpq96mHtVjnWFfjuGOiLk7jjjYA&oe=69CAED84",
    "C__DvCzSaBU": "https://scontent-vie1-1.cdninstagram.com/o1/v/t2/f2/m367/AQPLjNSyuizDCloaQQ4TEcuU6v2iy2K4Uf7dR2sU1jvLkVt9PYsAc4HuafLJqdWLB3FOG8XTzXHQ_7_zP03k6Mve3Zc-6v1BFrqsPeU.mp4?_nc_cat=103&_nc_sid=5e9851&_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_ohc=kWd8jjVFMD8Q7kNvwF1oYF0&efg=eyJ2ZW5jb2RlX3RhZyI6Inhwdl9wcm9ncmVzc2l2ZS5JTlNUQUdSQU0uQ0xJUFMuQzMuNzIwLmRhc2hfYmFzZWxpbmVfMV92MSIsInhwdl9hc3NldF9pZCI6NTQ0MjI3MTg0OTQ0NDM1LCJhc3NldF9hZ2VfZGF5cyI6NTU1LCJ2aV91c2VjYXNlX2lkIjoxMDA5OSwiZHVyYXRpb25fcyI6MzYsInVybGdlbl9zb3VyY2UiOiJ3d3cifQ%3D%3D&ccb=17-1&vs=d4945077b50ca9bd&_nc_vs=HBksFQIYQGlnX2VwaGVtZXJhbC9vRjE0MThGRkM3OUI4RjA3NEY2NEUyNzJFMTQyNEQxQUJfdmlkZW9fZGFzaGluaXQubXA0VAsCsgEsABUCGFmlZ194cHZfcmVlbHNfcGVybWFuZW50X3NyX3Byb2QvNTE0OTE1MTExMjU2MTk3XzYzMjk3Njk1OTAwMjIwNjY3OTIubXA0FQICyAESACgAGAAbAogHdXNlX29pbAExEnByb2dyZXNzaXZlX3JlY2hwZQExFQAAJuaUycCYvvcBFQIoAkMzLBdAQgAAAAAAAAGBJkYXNoX2Jhc2VsaW5lXzFfdjERAHX-B2XmnQEA&_nc_gid=okI3ok2LEHFOrLOL58y6dQ&_nc_zt=28&_nc_ss=7a32e&oh=00_AfwsB-QOZTetLPM6gIWaQEpLZRwLFl_UToqaKw80_VZZ1Q&oe=69CADE14"
  };

  const gunjanThumbnails: Record<string, string> = {
    "C_SSalBvkrB": "https://scontent-lga3-3.cdninstagram.com/v/t51.71878-15/505752121_3598245093813148_2838179198817498023_n.jpg?stp=dst-jpg_e15_tt6&_nc_ht=scontent-lga3-3.cdninstagram.com&_nc_cat=104&_nc_ohc=dfnW6bMsNVMQ7kNvwFDZ8VJ&oh=00_AfyPErkCx5s08wcrDzUioXzLd4_0cq1jzj9UkaBp5coyKA&oe=69CB1E78",
    "C_IgpqivgwF": "https://scontent-ham3-1.cdninstagram.com/v/t51.71878-15/503387996_9502379263201424_1026823668768252132_n.jpg?stp=dst-jpg_e15_tt6&_nc_ht=scontent-ham3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=GhB6IJR9XRMQ7kNvwFFlMp2&oh=00_AfwPiVJy6eARmiQsBtFNwR3Arw2rqpvmEMtDgIc_KGPI7w&oe=69CB0D26",
    "C_Vt-FkvtUW": "https://scontent-sjc3-1.cdninstagram.com/v/t51.71878-15/506305329_9534120203354130_4585691207658458718_n.jpg?stp=dst-jpg_e15_tt6&_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=106&_nc_ohc=MhcP-BfkJPgQ7kNvwEJQktF&oh=00_AfxQRY3BIM1MPAseyOOmTVqhbYMUC3NbHZ9cQB87Px7uhg&oe=69CB0E0B",
    "C_WJIcJBN4A": "https://scontent.cdninstagram.com/v/t51.71878-15/503248581_1879214909316226_5979998821839014903_n.jpg?stp=cmp1_dst-jpg_e35_s640x640_tt6&_nc_cat=110&oh=00_AfzncVxbO5dDss37v6xGUGclLjwhXr6GLo8AECcXK0sU_A&oe=69CB0FF0",
    "C__DvCzSaBU": "https://scontent-sea5-1.cdninstagram.com/v/t51.71878-15/504481327_742965565070595_7797692656970216193_n.jpg?stp=dst-jpg_e15_tt6&_nc_ht=scontent-sea5-1.cdninstagram.com&_nc_cat=103&_nc_ohc=XkgO_mpxs0oQ7kNvwEQPKda&oh=00_AfyLoWCdtjrH-odgnEBfxFLdNkHGMF9B6MqbmgHURUHCBw&oe=69CB1AED"
  };

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
                          className="w-full h-auto max-h-[85vh] object-contain transition-transform duration-[2s]"
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
                    blockquote: ({ children }) => (
                      <div className="text-center mt-[-6rem] mb-24 opacity-60">
                        <div className="text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold border-t border-foreground/10 pt-6 px-12 inline-block max-w-3xl leading-relaxed">
                          {children}
                        </div>
                      </div>
                    ),
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
                        const reelId = url.split("/reel/")[1]?.split("/")[0];
                        const mp4Url = gunjanMp4Links[reelId];
                        const thumbnailUrl = gunjanThumbnails[reelId];
                        
                        return (
                          <a 
                            key={`${set}-${idx}`} 
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-none w-[260px] md:w-[300px] relative overflow-hidden rounded-[2.5rem] bg-foreground/5 p-4 transition-all duration-500 border border-foreground/5 flex flex-col items-center group/reel hover:border-foreground/20"
                          >
                            {/* Video Layer */}
                            <div className="relative w-full aspect-[9/16] bg-black rounded-[1.8rem] overflow-hidden">
                              {mp4Url ? (
                                <div className="absolute inset-0">
                                  <video 
                                    src={mp4Url}
                                    poster={thumbnailUrl}
                                    className="w-full h-full object-cover"
                                    loop
                                    muted
                                    playsInline
                                    onMouseEnter={(e) => e.currentTarget.play()}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.pause();
                                    }}
                                  />
                                </div>
                              ) : (
                                <div className="absolute inset-0 flex items-center justify-center bg-foreground/5">
                                   <p className="text-[10px] uppercase tracking-widest opacity-20">Preview Unavailable</p>
                                </div>
                              )}
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
