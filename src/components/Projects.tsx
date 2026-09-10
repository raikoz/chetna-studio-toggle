import { useMode } from "@/contexts/ModeContext";
import { useEffect, useState } from "react";
import { client } from "@/lib/contentful";
import { useNavigate } from "react-router-dom";
import { AnimatedSection } from "./AnimatedSection";

// Map of craft/task close-up images tailored to each brand's domain
const brandCraftImages: Record<string, string> = {
  desna: "/images/brand-desna.jpg", // Macro Indian pickles, mustard oil & spices
  kunsquad: "/images/brand-kunsquad.jpg", // Macro tailoring stitch, measuring tape & denim
  "cafe sundowner": "/images/brand-sundowner.jpg", // Macro espresso extraction & coffee beans
  sundowner: "/images/brand-sundowner.jpg",
  "the bar consultants": "/images/brand-the-bar.jpg", // Macro flaming orange peel mixology & crystal glass
  "bar consultants": "/images/brand-the-bar.jpg",
  "reemly design studio": "/images/brand-reemly.jpg", // Macro travertine marble, oak & architectural blueprint
  reemly: "/images/brand-reemly.jpg",
  "azydo, puri": "/images/hero-abstract-1.jpg", // Coastal ocean luxury texture
  azydo: "/images/hero-abstract-1.jpg",
  "orange strings": "/images/service-motion.jpg", // Musical wave motion & string resonance
  "boudh distillery lemme bottle": "/images/service-strategy.jpg", // Amber spirit bottle craft
  "boudh distillery": "/images/service-strategy.jpg",
  "rahat hospitals": "/images/service-branding.jpg", // Healthcare precision & human care
  "house of niasna": "/images/montage-1.jpg", // High luxury couture & jewelry
  niasna: "/images/montage-1.jpg",
  "gunjan makeup & styling atelier": "/images/about-4.jpg", // Editorial makeup & beauty styling
  gunjan: "/images/about-4.jpg",
};

const dummyProjects = [
  { brandName: "Desna", dummy: true, dummyImage: "/images/brand-desna.jpg" },
  { brandName: "Kunsquad", dummy: true, dummyImage: "/images/brand-kunsquad.jpg" },
  { brandName: "Cafe Sundowner", dummy: true, dummyImage: "/images/brand-sundowner.jpg" },
  { brandName: "The Bar Consultants", dummy: true, dummyImage: "/images/brand-the-bar.jpg" },
  { brandName: "Reemly Design Studio", dummy: true, dummyImage: "/images/brand-reemly.jpg" },
  { brandName: "Azydo, Puri", dummy: true, dummyImage: "/images/hero-abstract-1.jpg" },
];

export function Projects() {
  const { mode } = useMode();
  const navigate = useNavigate();
  const [contentfulProjects, setContentfulProjects] = useState<any[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await client.getEntries({
          content_type: "clientWork",
          order: ["-sys.createdAt"],
        });
        if (response && response.items) {
          setContentfulProjects(
            response.items.map((item) => ({ ...item.fields, sysId: item.sys.id }))
          );
        }
      } catch (error) {
        console.error("Error fetching projects from Contentful:", error);
      }
    };

    fetchProjects();
  }, []);

  const projects =
    mode === "studio"
      ? contentfulProjects.length > 0
        ? contentfulProjects
        : dummyProjects
      : [
          { title: "Personal Branding", category: "Identity", year: "2024" },
          { title: "Photography Series", category: "Art", year: "2024" },
          { title: "Fashion Editorials", category: "Creative Direction", year: "2023" },
        ];

  const handleProjectClick = (project: any) => {
    if (mode === "studio" && project.sysId) {
      navigate(`/project/${project.sysId}`);
    }
  };

  const getCraftImageUrl = (project: any) => {
    const name = (project.brandName || project.title || "").toLowerCase();
    for (const key of Object.keys(brandCraftImages)) {
      if (name.includes(key)) {
        return brandCraftImages[key];
      }
    }
    // Fallback to project media or curated brand craft image
    return project.dummyImage || "/images/brand-desna.jpg";
  };

  return (
    <section id="work" className="py-24 transition-mode">
      <div className="container mx-auto px-6">
        {/* Minimal Section Header */}
        <AnimatedSection className="mb-14">
          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 border-b border-foreground/10 pb-6">
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light tracking-tight">
                {mode === "studio" ? "Selected Works" : "Commissions"}
              </h2>
              <p className="text-xs font-sans uppercase tracking-widest opacity-50 mt-2">
                Brand identities &amp; creative systems
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Minimal Flat Grid - Pure Image Cards (Names below removed as requested) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {projects.map((project: any, index: number) => {
            const isClickable = mode === "studio";
            const craftImageUrl = getCraftImageUrl(project);
            const logoUrl = project.logo?.fields?.file?.url;
            const fullLogoUrl = logoUrl
              ? logoUrl.startsWith("//")
                ? `https:${logoUrl}`
                : logoUrl
              : null;

            return (
              <AnimatedSection key={index} delay={index * 0.04}>
                <div
                  className={`group relative overflow-hidden rounded-[10px] aspect-[4/5] bg-foreground/5 transition-all duration-500 ${
                    isClickable ? "cursor-pointer" : "cursor-default"
                  }`}
                  onClick={() => isClickable && handleProjectClick(project)}
                >
                  {/* Zoomed-in Craft Photo (Fits width, zoom scale on hover) */}
                  <img
                    src={craftImageUrl}
                    alt={project.brandName || "Brand Craft Showcase"}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />

                  {/* Soft Dark Red Tint Overlay */}
                  <div className="absolute inset-0 bg-[#7e0200]/20 mix-blend-multiply transition-colors duration-500 group-hover:bg-[#7e0200]/40 pointer-events-none" />

                  {/* Gradient Depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 opacity-40 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none" />

                  {/* Logo Center Reveal on Hover with Blur & Red Tint */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-black/45 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-400 ease-out pointer-events-none">
                    {fullLogoUrl ? (
                      <img
                        src={fullLogoUrl}
                        alt={`${project.brandName} Logo`}
                        className="max-h-24 max-w-[75%] w-auto object-contain filter brightness-0 invert drop-shadow-lg transform scale-95 group-hover:scale-100 transition-transform duration-400"
                      />
                    ) : (
                      <span className="text-2xl md:text-3xl font-serif text-white tracking-widest uppercase text-center drop-shadow-md">
                        {project.brandName}
                      </span>
                    )}
                    <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-white/75 mt-4 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                      Explore Case
                    </span>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
