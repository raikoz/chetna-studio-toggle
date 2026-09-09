import { ModeToggle } from "./ModeToggle";
import { useMode } from "@/contexts/ModeContext";
import { Menu } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Header() {
  const { mode } = useMode();
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { href: "/#work", label: "Work", id: "work" },
    { href: "/#about", label: "About", id: "about" },
    { href: "/#contact", label: "Contact", id: "contact" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate(href);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate(href);
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm transition-mode">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-medium tracking-tight hover:opacity-70 transition-opacity">
            {mode === "studio" ? (
              <span className="italic">TheChet&Co</span>
            ) : (
              <span>Chetna Pattnaik</span>
            )}
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm tracking-wide">
            {navLinks.map((link) => (
              <a 
                key={link.href} 
                href={link.href} 
                onClick={(e) => handleNavClick(e, link.href, link.id)}
                className="hover:opacity-60 transition-opacity cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <ModeToggle />
            
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <button className="p-2 hover:bg-foreground/5 rounded-full transition-colors">
                    <Menu className="w-5 h-5" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <nav className="flex flex-col gap-6 mt-16">
                    {navLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href, link.id)}
                        className="text-2xl font-medium tracking-tight hover:opacity-60 transition-opacity cursor-pointer"
                      >
                        {link.label}
                      </a>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

