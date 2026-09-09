import { useMode } from "@/contexts/ModeContext";

const studioProjects = [
  { title: "Brand Identity", client: "Lumière Studios", year: "2024" },
  { title: "Visual Campaign", client: "Atelier Noir", year: "2024" },
  { title: "Editorial Design", client: "Vogue India", year: "2023" },
  { title: "Packaging Design", client: "Maison Belle", year: "2023" },
  { title: "Web Experience", client: "Casa Moderna", year: "2023" },
  { title: "Art Direction", client: "Gallery X", year: "2022" },
];

const personalProjects = [
  { title: "Personal Branding", category: "Identity", year: "2024" },
  { title: "Photography Series", category: "Art", year: "2024" },
  { title: "Fashion Editorials", category: "Creative Direction", year: "2023" },
  { title: "Digital Portraits", category: "Illustration", year: "2023" },
  { title: "Zine Collection", category: "Print", year: "2023" },
  { title: "Exhibition Curation", category: "Events", year: "2022" },
];

export function Projects() {
  const { mode } = useMode();
  const projects = mode === "studio" ? studioProjects : personalProjects;

  return (
    <section id="work" className="py-24 transition-mode">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <p className="text-sm tracking-[0.3em] uppercase mb-4 opacity-60">
            Selected
          </p>
          <h2 className="text-4xl md:text-5xl font-medium">
            {mode === "studio" ? "Projects" : "Work"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-[4/5] bg-foreground/10 mb-4 overflow-hidden">
                <div className="w-full h-full bg-foreground/5 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                  <span className="text-6xl font-light opacity-20">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>
              <h3 className="text-lg font-medium mb-1">{project.title}</h3>
              <p className="text-sm opacity-60">
                {"client" in project ? project.client : project.category} · {project.year}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
