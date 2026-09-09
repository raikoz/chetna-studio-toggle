import { useMode } from "@/contexts/ModeContext";

const studioClients = [
  "Vogue India",
  "Elle Magazine",
  "Lakmé Fashion Week",
  "Myntra",
  "Nykaa",
  "FabIndia",
  "Forest Essentials",
  "Good Earth",
];

const personalCollabs = [
  "Adobe Creative",
  "Behance",
  "Dribbble",
  "AIGA",
  "Design Matters",
  "Creative Mornings",
  "Figma Community",
  "Awwwards",
];

export function Clients() {
  const { mode } = useMode();
  const clients = mode === "studio" ? studioClients : personalCollabs;

  return (
    <section id="clients" className="py-24 border-t border-foreground/10 transition-mode">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <p className="text-sm tracking-[0.3em] uppercase mb-4 opacity-60">
            {mode === "studio" ? "Trusted By" : "Featured In"}
          </p>
          <h2 className="text-4xl md:text-5xl font-medium">
            {mode === "studio" ? "Clients" : "Collaborations"}
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {clients.map((client, index) => (
            <div
              key={index}
              className="py-8 border-b border-foreground/10 flex items-center justify-center"
            >
              <span className="text-lg md:text-xl font-light tracking-wide opacity-60 hover:opacity-100 transition-opacity cursor-default">
                {client}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
