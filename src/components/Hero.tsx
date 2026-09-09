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

          <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
            <button
              type="button"
              onClick={openBookingModal}
              className="px-8 py-3.5 bg-foreground text-background hover:opacity-90 transition-all duration-300 text-xs md:text-sm tracking-widest uppercase font-semibold cursor-pointer shadow-lg"
            >
              Book a Discovery Call
            </button>
            <button
              type="button"
              onClick={openBookingModal}
              className="px-8 py-3.5 border border-foreground/30 text-foreground hover:bg-foreground/10 transition-all duration-300 text-xs md:text-sm tracking-widest uppercase font-medium cursor-pointer"
            >
              Get in Touch
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
