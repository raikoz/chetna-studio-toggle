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
    <section id="contact" className="py-28 border-t border-foreground/15 transition-mode relative">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl">
          <AnimatedSection>
            <p className="text-[11px] font-mono uppercase tracking-[0.3em] opacity-60 mb-2">
              06 / DIRECT CONSULTATION
            </p>
            <h2 className="text-4xl md:text-6xl font-serif font-light tracking-tight mb-6">
              {mode === "studio" 
                ? "Ready to create something extraordinary?" 
                : "Let's create together"}
            </h2>
            <p className="text-sm md:text-base opacity-70 font-sans leading-relaxed max-w-2xl mb-10">
              We take on a limited number of brand and design consultancy clients per quarter. Book a 45-minute discovery call directly on our calendar.
            </p>

            <div className="mb-14">
              <button
                type="button"
                onClick={openBookingModal}
                className="px-8 py-4 bg-foreground text-background text-xs font-mono uppercase tracking-widest font-bold hover:bg-transparent hover:text-foreground border border-foreground transition-colors inline-flex items-center gap-3 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book 45-Min Consultation Call</span>
              </button>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10 border-t border-foreground/15">
            {socials.map((social, index) => (
              <AnimatedSection key={index} delay={index * 0.08}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-6 border border-foreground/20 hover:border-foreground transition-colors duration-200 group bg-background"
                >
                  <div className="flex items-center gap-4">
                    <social.icon className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity" />
                    <div>
                      <span className="text-lg font-serif italic block">{social.label}</span>
                      <span className="text-xs font-mono opacity-50 uppercase tracking-widest">{social.handle}</span>
                    </div>
                  </div>
                  <div className="w-8 h-8 border border-foreground/20 flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </a>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
