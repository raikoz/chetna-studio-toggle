import { useMode } from "@/contexts/ModeContext";
import { AnimatedSection } from "./AnimatedSection";

const studioTestimonials = [
  {
    quote: "TheChet&Co didn't just design a brand; they understood the soul of Kunsquad. They captured our community's energy and translated it into a visual language that speaks volumes to our tribe.",
    author: "Pallabi Sarangi",
    role: "Founder, Kunsquad",
    number: "01",
  },
  {
    quote: "In healthcare, trust and empathy are paramount. TheChet&Co's rebranding of Rahat Hospitals perfectly balanced clinical excellence with a warm, human approach that resonates with our patients.",
    author: "Reshma",
    role: "Founder, Rahat Hospitals",
    number: "02",
  },
];

const personalTestimonials = [
  {
    quote: "Chetna's creative vision is exceptional. She brings a unique perspective that makes every project special.",
    author: "Anika Mehta",
    role: "Editor, Elle India",
    number: "01",
  },
  {
    quote: "A true artist who understands the intersection of design and emotion. Her work speaks volumes.",
    author: "Rahul Kapoor",
    role: "Art Director, Vogue",
    number: "02",
  },
];

export function Testimonials() {
  const { mode } = useMode();
  const testimonials = mode === "studio" ? studioTestimonials : personalTestimonials;

  return (
    <section className="py-32 border-t border-foreground/15 transition-mode relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <AnimatedSection className="mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-foreground/15 pb-8">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.4em] opacity-60 mb-3">
                [ 03 // CLIENT COMMENDATIONS ]
              </p>
              <h2 className="text-4xl md:text-6xl font-serif font-light tracking-tight">
                Kind Words
              </h2>
            </div>
            <p className="text-xs md:text-sm font-mono uppercase tracking-widest opacity-60 max-w-xs">
              Direct testimonials from founders we have partnered with.
            </p>
          </div>
        </AnimatedSection>

        {/* Brutalist 2-Column Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {testimonials.map((t, index) => (
            <AnimatedSection key={index} delay={index * 0.15}>
              <div className="border-2 border-foreground/20 p-8 md:p-12 bg-background relative h-full flex flex-col justify-between hover:border-foreground transition-all duration-300 shadow-[6px_6px_0px_0px_hsl(var(--foreground)/0.15)]">
                <div>
                  <div className="flex items-center justify-between pb-6 mb-8 border-b border-foreground/10 text-xs font-mono opacity-50 uppercase tracking-widest">
                    <span>ENDORSEMENT // {t.number}</span>
                    <span>VERIFIED CLIENT</span>
                  </div>

                  <blockquote className="text-xl md:text-2xl font-serif font-light leading-relaxed italic opacity-90 mb-8">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                </div>

                <div className="pt-6 border-t border-foreground/15 flex items-center justify-between">
                  <div>
                    <p className="font-sans font-bold uppercase tracking-wider text-sm">{t.author}</p>
                    <p className="text-xs font-mono opacity-60 uppercase tracking-widest mt-0.5">{t.role}</p>
                  </div>
                  <span className="text-2xl font-serif opacity-30">✦</span>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
