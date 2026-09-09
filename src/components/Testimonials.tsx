import { useMode } from "@/contexts/ModeContext";

const studioTestimonials = [
  {
    quote: "TheChet&Co transformed our brand identity into something truly extraordinary. Their attention to detail is unmatched.",
    author: "Sarah Chen",
    role: "Founder, Lumière Studios",
  },
  {
    quote: "Working with them was a revelation. They understood our vision and elevated it beyond our expectations.",
    author: "Priya Sharma",
    role: "Creative Director, Atelier Noir",
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
    <section className="py-24 transition-mode">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <p className="text-sm tracking-[0.3em] uppercase mb-4 opacity-60">
            Kind Words
          </p>
          <h2 className="text-3xl md:text-5xl font-medium">Testimonials</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="border-l-2 border-foreground/20 pl-8">
              <blockquote className="text-xl md:text-2xl font-light leading-relaxed mb-6 italic">
                "{testimonial.quote}"
              </blockquote>
              <div>
                <p className="font-medium">{testimonial.author}</p>
                <p className="text-sm opacity-60">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
