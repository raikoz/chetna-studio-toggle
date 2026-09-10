import { ModeToggle } from "./ModeToggle";
import { useMode } from "@/contexts/ModeContext";
import { useBooking } from "@/contexts/BookingContext";
import { Logo } from "./Logo";
import { Menu, Calendar } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Header() {
  const { mode } = useMode();
  const { openBookingModal } = useBooking();
  const location = useLocation();
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setHidden(currentScrollY > lastScrollY && currentScrollY > 100);
      setScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Each menu item is a dedicated separate page
  const navLinks = [
    { href: "/work", label: "Work" },
    { href: "/services", label: "Capabilities" },
    { href: "/about", label: "About Studio" },
    { href: "/journal", label: "Journal" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-foreground/10 shadow-sm"
          : "bg-background/40 backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group hover:opacity-85 transition-opacity">
            <Logo className="h-10 w-auto text-foreground transition-colors" />
            <span className="text-[11px] tracking-[0.25em] uppercase font-sans hidden sm:inline-block border-l border-foreground/20 pl-3 opacity-80 font-medium">
              {mode === "studio" ? "TheChet&Co" : "Chetna Pattnaik"}
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8 text-xs tracking-widest uppercase font-sans">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`relative group py-1 transition-opacity ${
                    isActive ? "opacity-100 font-semibold" : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <span>{link.label}</span>
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-foreground transition-all duration-300 ease-out ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <motion.button
              onClick={openBookingModal}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="hidden sm:flex items-center gap-2 text-xs font-sans uppercase tracking-widest px-5 py-2.5 bg-foreground text-background font-semibold rounded-[8px] hover:opacity-85 transition-opacity cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" /> Book Call
            </motion.button>

            <ModeToggle />
            
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <button className="p-2 border border-foreground/15 rounded-[8px] hover:bg-foreground/5 transition-colors">
                    <Menu className="w-5 h-5" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[320px] bg-background border-l border-foreground/15 p-8">
                  <div className="border-b border-foreground/10 pb-4 mb-8">
                    <Logo className="h-8 w-auto text-foreground mb-2" />
                    <span className="text-[10px] font-sans uppercase tracking-widest opacity-60">
                      NAVIGATION
                    </span>
                  </div>
                  <nav className="flex flex-col gap-6">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        to={link.href}
                        className={`text-xl font-serif font-light tracking-tight transition-opacity uppercase ${
                          location.pathname === link.href ? "opacity-100 italic" : "hover:opacity-60"
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
