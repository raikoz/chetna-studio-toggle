import { useMode } from "@/contexts/ModeContext";
import { useBooking } from "@/contexts/BookingContext";
import { Instagram, Linkedin, Calendar, ArrowUpRight } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";

export function SocialPresence() {
  const { mode } = useMode();
  const { openBookingModal } = useBooking();

  const socials = [
    { icon: Instagram, label: "Instagram", handle: "@thechetandco", href: "https://www.instagram.com/thechetandco/" },
    { icon: Linkedin, label: "LinkedIn", handle: "The Chet & Co.", href: "https://www.linkedin.com/company/the-chet-co" },
  ];

  return (
    <section id="contact" className="py-24 transition-mode relative">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light tracking-tight mb-4">
              {mode === "studio" 
                ? "Let's build something extraordinary." 
                : "Let's create together."}
            </h2>
            <p className="text-base font-serif italic opacity-70 mb-8">
              Selective capacity. Book a 45-minute discovery consultation.
            </p>

            <div className="mb-12">
              <button
                type="button"
                onClick={openBookingModal}
                className="px-8 py-3.5 bg-foreground text-background text-xs font-mono uppercase tracking-widest font-medium rounded-md hover:opacity-90 transition-opacity inline-flex items-center gap-2.5 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book 45-Min Discovery Call</span>
              </button>
            </div>
          </AnimatedSection>

          {/* Minimalist social links without heavy boxes */}
          <div className="flex flex-wrap items-center gap-8 pt-6 border-t border-foreground/10">
            {socials.map((social, index) => (
              <AnimatedSection key={index} delay={index * 0.08}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider opacity-70 hover:opacity-100 transition-opacity group"
                >
                  <social.icon className="w-4 h-4" />
                  <span>{social.label}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
