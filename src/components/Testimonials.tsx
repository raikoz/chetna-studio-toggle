import { useMode } from "@/contexts/ModeContext";
import { AnimatedSection } from "./AnimatedSection";

const studioTestimonials = [
  {
    quote: "TheChet&Co didn't just design a brand; they understood the soul of Kunsquad. They captured our community's energy and translated it into a visual language that speaks volumes to our tribe.",
    author: "Pallabi Sarangi",
    role: "Founder, Kunsquad",
  },
  {
    quote: "In healthcare, trust and empathy are paramount. TheChet&Co's rebranding of Rahat Hospitals perfectly balanced clinical excellence with a warm, human approach that resonates with our patients.",
    author: "Reshma",
    role: "Founder, Rahat Hospitals",
  },
];

const personalTestimonials = [
  {
    quote: "Chetna's creative vision is exceptional. She brings a unique perspective that makes every project special.",
    author: "Anika Mehta",
    role: "Editor, Elle India",
  },
  {
    quote: "A true artist who understands the intersection of design and emotion. Her work speaks volumes.",
    author: "Rahul Kapoor",
    role: "Art Director, Vogue",
  },
];

export function Testimonials() {
  const { mode } = useMode();
  const testimonials = mode === "studio" ? studioTestimonials : personalTestimonials;

  return (
    <section className="py-24 transition-mode relative">
      <div className="container mx-auto px-6">
        {/* Minimal Section Header */}
        <AnimatedSection className="mb-14">
          <div className="border-b border-foreground/10 pb-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light tracking-tight">
              Kind Words
            </h2>
            <p className="text-xs font-sans uppercase tracking-widest opacity-50 mt-2">
              Founder Commendations
            </p>
          </div>
        </AnimatedSection>

        {/* Minimal Non-Boxy Floating Quotes (Soft 8px rounded background, no harsh boxes) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {testimonials.map((t, index) => (
            <AnimatedSection key={index} delay={index * 0.08}>
              <div className="rounded-[8px] p-8 md:p-10 bg-foreground/[0.02] border border-foreground/10 relative h-full flex flex-col justify-between hover:border-foreground/25 transition-colors duration-200">
                <blockquote className="text-xl md:text-2xl font-serif font-light leading-relaxed italic opacity-85 mb-8">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <div className="pt-4 border-t border-foreground/10 flex items-center justify-between">
                  <div>
                    <p className="font-sans font-medium uppercase tracking-wider text-sm">{t.author}</p>
                    <p className="text-xs font-sans opacity-50 uppercase tracking-widest mt-0.5">{t.role}</p>
                  </div>
                  <span className="text-xl font-serif opacity-30">✦</span>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
