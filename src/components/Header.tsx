import { ModeToggle } from "./ModeToggle";
import { useMode } from "@/contexts/ModeContext";

export function Header() {
  const { mode } = useMode();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm transition-mode">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-xl font-medium tracking-tight">
            {mode === "studio" ? (
              <span className="italic">TheChet&Co</span>
            ) : (
              <span>Chetna Pattnaik</span>
            )}
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm tracking-wide">
            <a href="#work" className="hover:opacity-60 transition-opacity">
              Work
            </a>
            <a href="#about" className="hover:opacity-60 transition-opacity">
              About
            </a>
            <a href="#clients" className="hover:opacity-60 transition-opacity">
              Clients
            </a>
            <a href="#contact" className="hover:opacity-60 transition-opacity">
              Contact
            </a>
          </nav>

          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
