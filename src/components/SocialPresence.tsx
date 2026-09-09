import { useMode } from "@/contexts/ModeContext";
import { useBooking } from "@/contexts/BookingContext";
import { Instagram, Linkedin, Calendar } from "lucide-react";

export function SocialPresence() {
  const { mode } = useMode();
  const { openBookingModal } = useBooking();

  const socials = [
    { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/thechetandco/" },
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/company/the-chet-co" },
  ];

  return (
    <section id="contact" className="py-24 border-t border-foreground/10 transition-mode">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl">
          <p className="text-sm tracking-[0.3em] uppercase mb-4 opacity-60 font-medium">
            Let's Connect & Consult
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light mb-8">
            {mode === "studio" 
              ? "Ready to create something extraordinary?" 
              : "Let's create together"}
          </h2>

          <div className="mb-12">
            <button
              onClick={openBookingModal}
              className="px-8 py-4 bg-foreground text-background text-xs uppercase tracking-[0.2em] font-medium hover:opacity-90 transition-opacity inline-flex items-center gap-3 cursor-pointer"
            >
              <Calendar className="w-4 h-4" /> Book 45-Min Consultation Call
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {socials.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-6 border border-foreground/10 hover:border-foreground/30 hover:bg-foreground/5 transition-all duration-300 group"
              >
                <social.icon className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity" />
                <span className="text-lg font-serif italic">{social.label}</span>
                <span className="ml-auto opacity-0 group-hover:opacity-60 transition-opacity">
                  →
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
