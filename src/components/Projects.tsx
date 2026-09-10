import { useMode } from "@/contexts/ModeContext";
import { useEffect, useState } from "react";
import { client } from "@/lib/contentful";
import { useNavigate } from "react-router-dom";
import { AnimatedSection } from "./AnimatedSection";
import { ArrowUpRight } from "lucide-react";

const dummyProjects = [
  { brandName: "Aura Skincare", client: "Aura", year: "2024", dummy: true },
  { brandName: "Pulse Fitness", client: "Pulse", year: "2024", dummy: true },
  { brandName: "Zenith Architecture", client: "Zenith", year: "2023", dummy: true },
  { brandName: "Nova Tech", client: "Nova", year: "2023", dummy: true },
  { brandName: "Eco Living", client: "Eco", year: "2023", dummy: true },
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

  return (
    <section id="work" className="py-32 border-t border-foreground/15 transition-mode">
      <div className="container mx-auto px-6">
        {/* Brutalist Section Header */}
        <AnimatedSection className="mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-foreground/15 pb-8">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.4em] opacity-60 mb-3">
                [ 01 // SELECTED COMMISSIONS ]
              </p>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light tracking-tight">
                {mode === "studio" ? "Selected Works" : "Selected Commissions"}
              </h2>
            </div>
            <p className="text-xs md:text-sm font-mono uppercase tracking-widest opacity-60 max-w-xs">
              Direct engagements with founders and movements.
            </p>
          </div>
        </AnimatedSection>

        {/* Brutalist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project: any, index: number) => {
            const isClickable = mode === "studio";
            const logoUrl = project.logo?.fields?.file?.url;
            const fullLogoUrl = logoUrl
              ? logoUrl.startsWith("//")
                ? `https:${logoUrl}`
                : logoUrl
              : null;

            return (
              <AnimatedSection key={index} delay={index * 0.08}>
                <div
                  className={`group relative border-2 border-foreground/20 bg-background transition-all duration-300 hover:border-foreground hover:shadow-[8px_8px_0px_0px_hsl(var(--foreground))] ${
                    isClickable ? "cursor-pointer" : "cursor-default opacity-80"
                  }`}
                  onClick={() => isClickable && handleProjectClick(project)}
                >
                  {/* Card Header Bar */}
                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-foreground/15 text-[10px] font-mono uppercase tracking-widest opacity-60">
                    <span>CASE // {String(index + 1).padStart(2, "0")}</span>
                    <span>{project.year || "2025"}</span>
                  </div>

                  {/* Image Container with Zoom */}
                  <div className="aspect-[4/5] bg-foreground/5 overflow-hidden relative flex items-center justify-center p-8">
                    {fullLogoUrl ? (
                      <img
                        src={fullLogoUrl}
                        alt={project.brandName}
                        className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                    ) : (
                      <span className="text-6xl font-light opacity-20 font-serif group-hover:opacity-40 transition-opacity">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    )}

                    {/* Subtle Wireframe Corners */}
                    <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-foreground/40 pointer-events-none" />
                    <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-foreground/40 pointer-events-none" />
                  </div>

                  {/* Card Footer Bar */}
                  <div className="p-5 border-t border-foreground/15 flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-sans font-bold uppercase tracking-wider">
                        {project.brandName || project.title}
                      </h3>
                      <p className="text-[10px] font-mono tracking-widest opacity-50 uppercase mt-0.5">
                        Brand Identity &amp; Strategy
                      </p>
                    </div>
                    <div className="w-8 h-8 border border-foreground/20 flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors">
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
