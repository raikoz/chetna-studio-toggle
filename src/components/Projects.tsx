import { useMode } from "@/contexts/ModeContext";
import { useEffect, useState } from "react";
import { client } from "@/lib/contentful";
import { useNavigate } from "react-router-dom";
import { AnimatedSection } from "./AnimatedSection";
import { ArrowUpRight } from "lucide-react";

const dummyProjects = [
  { brandName: "Aura Skincare", client: "Aura", year: "2024", dummy: true, dummyImage: "/images/montage-1.jpg" },
  { brandName: "Pulse Fitness", client: "Pulse", year: "2024", dummy: true, dummyImage: "/images/montage-2.jpg" },
  { brandName: "Zenith Architecture", client: "Zenith", year: "2023", dummy: true, dummyImage: "/images/montage-5.jpg" },
  { brandName: "Nova Tech", client: "Nova", year: "2023", dummy: true, dummyImage: "/images/montage-6.jpg" },
  { brandName: "Eco Living", client: "Eco", year: "2023", dummy: true, dummyImage: "/images/montage-7.jpg" },
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

  const getMediaImageUrl = (project: any) => {
    // Check for brandMedia images
    if (project.brandMedia && Array.isArray(project.brandMedia)) {
      const img = project.brandMedia.find((m: any) =>
        m.fields?.file?.contentType?.startsWith("image/")
      );
      if (img?.fields?.file?.url) {
        const url = img.fields.file.url;
        return url.startsWith("//") ? `https:${url}` : url;
      }
    }
    // Fallback to dummy or montage images
    return project.dummyImage || "/images/montage-1.jpg";
  };

  return (
    <section id="work" className="py-24 transition-mode">
      <div className="container mx-auto px-6">
        {/* Minimal Non-Boxy Section Header (No case numbers, clean typography) */}
        <AnimatedSection className="mb-16">
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

        {/* Minimal Flat Grid - Soft 8-10px rounded image cards, no heavy box borders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {projects.map((project: any, index: number) => {
            const isClickable = mode === "studio";
            const brandImageUrl = getMediaImageUrl(project);
            const logoUrl = project.logo?.fields?.file?.url;
            const fullLogoUrl = logoUrl
              ? logoUrl.startsWith("//")
                ? `https:${logoUrl}`
                : logoUrl
              : null;

            return (
              <AnimatedSection key={index} delay={index * 0.05}>
                <div
                  className={`group relative transition-all duration-300 ${
                    isClickable ? "cursor-pointer" : "cursor-default opacity-80"
                  }`}
                  onClick={() => isClickable && handleProjectClick(project)}
                >
                  {/* Brand Media Image with Soft Dark Red Tint, Logo comes on hover */}
                  <div className="aspect-[4/5] rounded-[10px] overflow-hidden relative bg-foreground/5">
                    {/* Primary Brand Image */}
                    <img
                      src={brandImageUrl}
                      alt={project.brandName || "Brand Work"}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Soft Dark Red Tint Overlay */}
                    <div className="absolute inset-0 bg-[#7e0200]/25 mix-blend-multiply transition-opacity duration-500 group-hover:bg-[#7e0200]/15 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 transition-opacity pointer-events-none" />

                    {/* Logo Overlay - Revealed on Hover */}
                    <div className="absolute inset-0 flex items-center justify-center p-8 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-400 ease-out pointer-events-none">
                      {fullLogoUrl ? (
                        <img
                          src={fullLogoUrl}
                          alt={`${project.brandName} Logo`}
                          className="max-h-20 max-w-[70%] object-contain filter brightness-0 invert drop-shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform duration-400"
                        />
                      ) : (
                        <span className="text-2xl font-serif text-white tracking-widest uppercase">
                          {project.brandName}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Clean Non-Boxy Bottom Metadata (No case numbers) */}
                  <div className="pt-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-sans font-medium tracking-tight">
                        {project.brandName || project.title}
                      </h3>
                      <p className="text-xs font-serif italic opacity-60 mt-0.5">
                        Brand Identity &amp; Creative Direction
                      </p>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
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
