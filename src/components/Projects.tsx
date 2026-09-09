import { useMode } from "@/contexts/ModeContext";
import { useEffect, useState } from "react";
import { client } from "@/lib/contentful";
import { Link, useNavigate } from "react-router-dom";

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
        setContentfulProjects(response.items.map(item => ({ ...item.fields, sysId: item.sys.id })));
      } catch (error) {
        console.error("Error fetching projects from Contentful:", error);
      }
    };

    fetchProjects();
  }, []);

  const projects = mode === "studio" 
    ? (contentfulProjects.length > 0 ? contentfulProjects : dummyProjects) 
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
    <section id="work" className="py-24 transition-mode">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <p className="text-sm tracking-[0.3em] uppercase mb-4 opacity-60 font-medium">
            Selected
          </p>
          <h2 className="text-5xl md:text-6xl font-serif font-light mb-8">
            {mode === "studio" ? "Showcase Projects" : "Work"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project: any, index: number) => {
            const isClickable = mode === "studio";
            // Use the dedicated logo field, fallback to nothing (showing card index) to avoid 'Work in progress' media
            const logoUrl = project.logo?.fields?.file?.url;
            const fullLogoUrl = logoUrl ? (logoUrl.startsWith("//") ? `https:${logoUrl}` : logoUrl) : null;

            return (
              <div
                key={index}
                className={`group relative overflow-hidden ${isClickable ? 'cursor-pointer' : 'cursor-default opacity-80'}`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => isClickable && handleProjectClick(project)}
              >
                <div className="aspect-[4/5] bg-foreground/10 mb-4 overflow-hidden relative border border-transparent hover:border-foreground/10 transition-colors">
                  {/* Base Image (Logo) */}
                  <div className="w-full h-full bg-foreground/5 flex items-center justify-center p-12 group-hover:scale-105 transition-transform duration-700 ease-out">
                    {fullLogoUrl ? (
                      <img 
                        src={fullLogoUrl} 
                        alt={project.brandName} 
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <span className="text-6xl font-light opacity-20 group-hover:opacity-40 transition-opacity">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    )}
                  </div>

                  {/* Clean Hover Reveal - No text as requested */}
                  {isClickable && (
                    <div className="absolute inset-0 bg-foreground/5 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out">
                      {/* Subtlest background tint to indicate clickability */}
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-start pt-2 px-1 transition-all duration-300 group-hover:translate-x-1">
                  <div>
                    <h3 className="text-lg font-medium tracking-tight uppercase">{project.brandName || project.title}</h3>
                    <p className="text-[10px] tracking-widest opacity-40 uppercase">Brand Reveal →</p>
                  </div>
                  <span className="text-xs opacity-50 pt-1 font-serif italic font-light">{project.year || "2025"}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


