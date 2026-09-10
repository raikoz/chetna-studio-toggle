import { useMode } from "@/contexts/ModeContext";
import { useEffect, useState } from "react";
import { client } from "@/lib/contentful";
import { useNavigate } from "react-router-dom";
import { AnimatedSection } from "./AnimatedSection";

// Hyper-realistic 4K camera shot photos matching each brand's domain
const brandCraftImages: Record<string, string> = {
  gunjan: "/images/brand-gunjan.jpg", // Makeup, styling
  desna: "/images/brand-desna.jpg", // Pickles
  niasna: "/images/brand-niasna.jpg", // Sarees, dresses
  "house of niasna": "/images/brand-niasna.jpg",
  kunsquad: "/images/brand-kunsquad.jpg", // Streetwear
  reemly: "/images/brand-reemly.jpg", // Sarees
  "reemly design studio": "/images/brand-reemly.jpg",
  lemme: "/images/brand-lemme.jpg", // Drinks, beverages
  "boudh distillery lemme bottle": "/images/brand-lemme.jpg",
  "boudh distillery": "/images/brand-lemme.jpg",
  "orange strings": "/images/brand-orange-strings.jpg", // Saree
  sundowner: "/images/brand-sundowner.jpg", // Coffee, cafe
  "cafe sundowner": "/images/brand-sundowner.jpg",
  tbc: "/images/brand-the-bar.jpg", // The Bar Consultants (kept as requested)
  "the bar consultants": "/images/brand-the-bar.jpg",
  "bar consultants": "/images/brand-the-bar.jpg",
  rahat: "/images/brand-rahat.jpg", // Hospital, doctor
  "rahat hospitals": "/images/brand-rahat.jpg",
  azydo: "/images/brand-azydo.jpg", // Puri, Jagannath temple
  "azydo, puri": "/images/brand-azydo.jpg",
};

const dummyProjects = [
  { brandName: "Desna", dummy: true, dummyImage: "/images/brand-desna.jpg" },
  { brandName: "Kunsquad", dummy: true, dummyImage: "/images/brand-kunsquad.jpg" },
  { brandName: "House of Niasna", dummy: true, dummyImage: "/images/brand-niasna.jpg" },
  { brandName: "Reemly Design Studio", dummy: true, dummyImage: "/images/brand-reemly.jpg" },
  { brandName: "Cafe Sundowner", dummy: true, dummyImage: "/images/brand-sundowner.jpg" },
  { brandName: "The Bar Consultants", dummy: true, dummyImage: "/images/brand-the-bar.jpg" },
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

        {/* Minimal Flat Grid - Height reduced by 20% (aspect-square), Clickable, Logo dead center on hover */}
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
              <AnimatedSection key={index} delay={index * 0.03}>
                <div
                  className={`group relative overflow-hidden rounded-[10px] aspect-square bg-foreground/5 transition-all duration-500 ${
                    isClickable ? "cursor-pointer" : "cursor-default"
                  }`}
                  onClick={() => isClickable && handleProjectClick(project)}
                >
                  {/* Hyper-Realistic 4K Camera Shot (Fits width, zooms on hover) */}
                  <img
                    src={craftImageUrl}
                    alt={project.brandName || "Brand Craft"}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />

                  {/* Soft Dark Red Tint Overlay */}
                  <div className="absolute inset-0 bg-[#7e0200]/20 mix-blend-multiply transition-colors duration-500 group-hover:bg-[#7e0200]/40 pointer-events-none" />

                  {/* Subtle Gradient Shadow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 opacity-30 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none" />

                  {/* Logo Center and Middle Reveal on Hover (No 'Explore Cases' text) */}
                  <div className="absolute inset-0 flex items-center justify-center p-8 bg-black/45 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-400 ease-out pointer-events-none">
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
