import { useMode } from "@/contexts/ModeContext";
import { useEffect, useState } from "react";
import { client } from "@/lib/contentful";
import { useNavigate } from "react-router-dom";
import { AnimatedSection } from "./AnimatedSection";

// Minimal, subtle, abstract editorial textures for Selected Works
const brandSubtleImages: Record<string, string> = {
  desna: "/images/brand-subtle-1.jpg", // Minimalist architectural light & shadow
  kunsquad: "/images/brand-subtle-2.jpg", // Subtle organic sculptural curves
  "cafe sundowner": "/images/brand-subtle-4.jpg", // Soft ambient light refraction through fluted glass
  sundowner: "/images/brand-subtle-4.jpg",
  "the bar consultants": "/images/brand-subtle-6.jpg", // Subtle crimson liquid marble
  "bar consultants": "/images/brand-subtle-6.jpg",
  tbc: "/images/brand-subtle-6.jpg",
  reemly: "/images/brand-subtle-5.jpg", // Minimalist geometric paper & shadow
  "reemly design studio": "/images/brand-subtle-5.jpg",
  azydo: "/images/brand-subtle-7.jpg", // Minimalist stone & serene natural light
  "azydo, puri": "/images/brand-subtle-7.jpg",
  "orange strings": "/images/brand-subtle-3.jpg", // Deep abstract crimson flow & resonance
  lemme: "/images/brand-subtle-8.jpg", // Subtle sculpture curve & muted shadow
  "boudh distillery lemme bottle": "/images/brand-subtle-8.jpg",
  "boudh distillery": "/images/brand-subtle-8.jpg",
  rahat: "/images/brand-subtle-9.jpg", // Abstract raw organic fiber & clean weave
  "rahat hospitals": "/images/brand-subtle-9.jpg",
  "house of niasna": "/images/brand-subtle-10.jpg", // Minimalist geometric light on fine texture
  niasna: "/images/brand-subtle-10.jpg",
  gunjan: "/images/brand-subtle-11.jpg", // Abstract monochrome fluid curve
  "gunjan makeup & styling atelier": "/images/brand-subtle-11.jpg",
};

const dummyProjects = [
  { brandName: "Desna", dummy: true, dummyImage: "/images/brand-subtle-1.jpg" },
  { brandName: "Kunsquad", dummy: true, dummyImage: "/images/brand-subtle-2.jpg" },
  { brandName: "Cafe Sundowner", dummy: true, dummyImage: "/images/brand-subtle-4.jpg" },
  { brandName: "The Bar Consultants", dummy: true, dummyImage: "/images/brand-subtle-6.jpg" },
  { brandName: "Reemly Design Studio", dummy: true, dummyImage: "/images/brand-subtle-5.jpg" },
  { brandName: "Azydo, Puri", dummy: true, dummyImage: "/images/brand-subtle-7.jpg" },
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

  const getSubtleImageUrl = (project: any) => {
    const name = (project.brandName || project.title || "").toLowerCase();
    for (const key of Object.keys(brandSubtleImages)) {
      if (name.includes(key)) {
        return brandSubtleImages[key];
      }
    }
    return project.dummyImage || "/images/brand-subtle-1.jpg";
  };

  return (
    <section id="work" className="py-16 md:py-24 transition-mode">
      <div className="container mx-auto px-6">
        {/* Minimal Section Header */}
        <AnimatedSection className="mb-10 md:mb-14">
          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 border-b border-foreground/10 pb-6">
            <div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-light tracking-tight">
                {mode === "studio" ? "Selected Works" : "Commissions"}
              </h2>
              <p className="text-xs font-sans uppercase tracking-widest opacity-50 mt-2">
                Brand identities &amp; creative systems
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Minimal Flat Grid - Ultra-Subtle Minimal Abstract Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
          {projects.map((project: any, index: number) => {
            const isClickable = mode === "studio";
            const subtleImageUrl = getSubtleImageUrl(project);
            const logoUrl = project.logo?.fields?.file?.url;
            const fullLogoUrl = logoUrl
              ? logoUrl.startsWith("//")
                ? `https:${logoUrl}`
                : logoUrl
              : null;

            return (
              <AnimatedSection key={index} delay={index * 0.03}>
                <div
                  className={`group relative overflow-hidden rounded-[10px] aspect-square bg-foreground/5 transition-all duration-500 ${
                    isClickable ? "cursor-pointer active:scale-[0.98]" : "cursor-default"
                  }`}
                  onClick={() => isClickable && handleProjectClick(project)}
                >
                  {/* Minimal Subtle Abstract Photo */}
                  <img
                    src={subtleImageUrl}
                    alt={project.brandName || "Selected Work"}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Soft Dark Red Tint Overlay */}
                  <div className="absolute inset-0 bg-[#7e0200]/25 mix-blend-multiply transition-colors duration-500 group-hover:bg-[#7e0200]/45 pointer-events-none" />

                  {/* Gradient Depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 opacity-40 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none" />

                  {/* Logo Center and Middle Reveal on Hover / Active */}
                  <div className="absolute inset-0 flex items-center justify-center p-8 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-400 ease-out pointer-events-none">
                    {fullLogoUrl ? (
                      <img
                        src={fullLogoUrl}
                        alt={`${project.brandName} Logo`}
                        className="max-h-24 max-w-[75%] w-auto object-contain filter brightness-0 invert drop-shadow-xl transform scale-95 group-hover:scale-100 transition-transform duration-400"
                      />
                    ) : (
                      <span className="text-2xl md:text-3xl font-serif text-white tracking-widest uppercase text-center drop-shadow-md">
                        {project.brandName}
                      </span>
                    )}
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
