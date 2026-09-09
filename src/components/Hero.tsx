import { useMode } from "@/contexts/ModeContext";
import { useBooking } from "@/contexts/BookingContext";

export function Hero() {
  const { mode } = useMode();
  const { openBookingModal } = useBooking();

  return (
    <section id="about" className="min-h-screen flex items-center justify-center pt-20 transition-mode">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto text-center">
          {mode === "studio" ? (
            <>
              <p className="text-sm tracking-[0.3em] uppercase mb-6 opacity-80 font-medium">
                Design Studio & Consultancy
              </p>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium leading-[0.9] mb-8">
                <span className="italic">TheChet</span>
                <span className="text-stroke">&</span>
                <span className="italic">Co</span>
              </h1>
              <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-80 leading-relaxed">
                A boutique design studio & consultancy crafting visual identities, brand experiences, 
                and creative direction for those who dare to stand out.
              </p>
            </>
          ) : (
            <>
              <p className="text-sm tracking-[0.3em] uppercase mb-6 opacity-80 font-medium">
                Creative Director & Consultant
              </p>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium leading-[0.9] mb-8">
                Chetna
                <br />
                <span className="italic">Pattnaik</span>
              </h1>
              <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-80 leading-relaxed">
                Blending art, design, and strategic storytelling to create experiences 
                that resonate and inspire.
              </p>
            </>
          )}

          <div className="mt-12 flex items-center justify-center gap-6">
            <a
              href="#work"
              className="px-8 py-3 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-300 text-sm tracking-widest uppercase"
            >
              View Work
            </a>
            <button
              type="button"
              onClick={openBookingModal}
              className="text-sm tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity cursor-pointer flex items-center gap-1"
            >
              Get in Touch →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
