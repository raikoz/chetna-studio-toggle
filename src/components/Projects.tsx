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
    <section id="work" className="py-28 border-t border-foreground/15 transition-mode">
      <div className="container mx-auto px-6">
        {/* Bauhaus Flat Section Header */}
        <AnimatedSection className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-foreground/15 pb-6">
            <div>
              <p className="text-[11px] font-mono uppercase tracking-[0.3em] opacity-60 mb-2">
                01 / SELECTED WORK
              </p>
              <h2 className="text-4xl md:text-6xl font-serif font-light tracking-tight">
                {mode === "studio" ? "Selected Works" : "Selected Commissions"}
              </h2>
            </div>
            <p className="text-xs font-mono uppercase tracking-widest opacity-60 max-w-xs">
              Direct engagements with founders and cultural movements.
            </p>
          </div>
        </AnimatedSection>

        {/* Bauhaus Flat Grid: Pure 1px Lines, Flat Surfaces, Zero Shadows */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project: any, index: number) => {
            const isClickable = mode === "studio";
            const logoUrl = project.logo?.fields?.file?.url;
            const fullLogoUrl = logoUrl
              ? logoUrl.startsWith("//")
                ? `https:${logoUrl}`
                : logoUrl
              : null;

            return (
              <AnimatedSection key={index} delay={index * 0.06}>
                <div
                  className={`group relative border border-foreground/20 bg-background transition-all duration-300 hover:border-foreground ${
                    isClickable ? "cursor-pointer" : "cursor-default opacity-80"
                  }`}
                  onClick={() => isClickable && handleProjectClick(project)}
                >
                  {/* Top Meta Bar */}
                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-foreground/15 text-[10px] font-mono uppercase tracking-widest opacity-60">
                    <span>CASE {String(index + 1).padStart(2, "0")}</span>
                    <span>{project.year || "2025"}</span>
                  </div>

                  {/* Logo / Showcase Area */}
                  <div className="aspect-[4/5] bg-foreground/[0.03] overflow-hidden relative flex items-center justify-center p-8 transition-colors group-hover:bg-foreground/[0.06]">
                    {fullLogoUrl ? (
                      <img
                        src={fullLogoUrl}
                        alt={project.brandName}
                        className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    ) : (
                      <span className="text-5xl font-light opacity-20 font-serif group-hover:opacity-40 transition-opacity">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    )}
                  </div>

                  {/* Bottom Meta Bar */}
                  <div className="p-5 border-t border-foreground/15 flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-sans font-medium uppercase tracking-wider">
                        {project.brandName || project.title}
                      </h3>
                      <p className="text-[10px] font-mono tracking-widest opacity-50 uppercase mt-0.5">
                        Brand Architecture &amp; Identity
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
