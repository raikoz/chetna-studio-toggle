import { useMode } from "@/contexts/ModeContext";
import { useEffect, useState } from "react";
import { client } from "@/lib/contentful";
import { useNavigate } from "react-router-dom";
import { AnimatedSection } from "./AnimatedSection";


// Helper to format 2-3 lines ending with "..."
const formatDescription = (rawDesc?: string) => {
  const text = (
    rawDesc ||
    "Architecting distinctive brand identities, visual systems, and bespoke digital touchpoints with enduring craft."
  )
    .replace(/[#*_`~\[\]]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (text.length <= 135) {
    return text.replace(/[.,;:\s]*$/, "...");
  }
  const truncated = text.slice(0, 135);
  const lastSpace = truncated.lastIndexOf(" ");
  const cut = lastSpace > 65 ? truncated.slice(0, lastSpace) : truncated;
  return cut.replace(/[.,;:\s]*$/, "...");
};

const dummyProjects = [
  {
    brandName: "Desna",
    dummy: true,
    brandDescription:
      "Architecting a contemporary culinary identity rooted in heritage recipes and slow-cured artisanal excellence.",
  },
  {
    brandName: "Kunsquad",
    dummy: true,
    brandDescription:
      "High-voltage streetwear identity crafted at the intersection of raw underground culture and precision tailoring.",
  },
  {
    brandName: "Cafe Sundowner",
    dummy: true,
    brandDescription:
      "Atmospheric cafe identity designed around warm hospitality, slow mornings, and craft roast rituals.",
  },
  {
    brandName: "The Bar Consultants",
    dummy: true,
    brandDescription:
      "Elevated beverage intelligence and experiential hospitality curation for iconic global cocktail programs.",
  },
  {
    brandName: "Reemly Design Studio",
    dummy: true,
    brandDescription:
      "Harmonious spatial design and architectural art direction celebrating tactile material palettes and natural light.",
  },
  {
    brandName: "Azydo, Puri",
    dummy: true,
    brandDescription:
      "Transforming spiritual pilgrimage hospitality into a transcendent, tranquil coastal sanctuary experience.",
  },
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
          {
            title: "Personal Branding",
            brandName: "Personal Branding",
            brandDescription:
              "Crafting authentic personal narratives and strategic positioning for thought leaders and executives.",
            category: "Identity",
            year: "2024",
          },
          {
            title: "Photography Series",
            brandName: "Photography Series",
            brandDescription:
              "High-contrast editorial photography exploring light, shadow, and architectural serenity across South Asia.",
            category: "Art",
            year: "2024",
          },
          {
            title: "Fashion Editorials",
            brandName: "Fashion Editorials",
            brandDescription:
              "Contemporary editorial styling and creative direction highlighting modern Indian textile movements.",
            category: "Creative Direction",
            year: "2023",
          },
        ];

  const handleProjectClick = (project: any) => {
    if (mode === "studio" && project.sysId) {
      navigate(`/project/${project.sysId}`);
    }
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

        {/* Minimal Flat Grid - Logo Only Default, Description Only on Hover */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
          {projects.map((project: any, index: number) => {
            const isClickable = mode === "studio";
            const logoUrl = project.logo?.fields?.file?.url;
            const fullLogoUrl = logoUrl
              ? logoUrl.startsWith("//")
                ? `https:${logoUrl}`
                : logoUrl
              : null;
            const descText = formatDescription(project.brandDescription || project.description);

            return (
              <AnimatedSection key={index} delay={index * 0.03}>
                <div
                  className={`group relative overflow-hidden rounded-[10px] aspect-square bg-foreground/[0.03] hover:bg-foreground/[0.07] border border-foreground/10 hover:border-foreground/25 transition-all duration-500 ${
                    isClickable ? "cursor-pointer active:scale-[0.98]" : "cursor-default"
                  }`}
                  onClick={() => isClickable && handleProjectClick(project)}
                >
                  {/* DEFAULT STATE: Logo Only (Middle and Center Aligned, Fades Out on Hover) */}
                  <div className="absolute inset-0 flex items-center justify-center p-8 sm:p-12 transition-all duration-400 ease-out opacity-100 group-hover:opacity-0 group-hover:scale-95 pointer-events-none">
                    {fullLogoUrl ? (
                      <img
                        src={fullLogoUrl}
                        alt={`${project.brandName} Logo`}
                        className={`max-h-20 sm:max-h-24 max-w-[75%] w-auto object-contain transition-transform duration-400 ${
                          mode === "studio" ? "filter brightness-0 invert" : "filter brightness-0"
                        }`}
                      />
                    ) : (
                      <span className="text-2xl sm:text-3xl font-serif tracking-widest uppercase text-center text-foreground font-light">
                        {project.brandName || project.title}
                      </span>
                    )}
                  </div>

                  {/* HOVER STATE: Brand Description Only (No Logo, No Other Text, Middle + Center Container, Left-Aligned Text, 2-3 Lines with '...') */}
                  <div className="absolute inset-0 flex items-center justify-center p-8 sm:p-10 transition-all duration-400 ease-out opacity-0 group-hover:opacity-100 pointer-events-none">
                    <div className="w-full max-w-[85%] mx-auto">
                      <p className="text-left font-serif text-base sm:text-lg md:text-xl font-light leading-relaxed text-foreground tracking-normal line-clamp-3">
                        {descText}
                      </p>
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
