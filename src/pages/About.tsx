import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AnimatedSection } from "@/components/AnimatedSection";
import { useBooking } from "@/contexts/BookingContext";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function About() {
  const { openBookingModal } = useBooking();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground transition-mode overflow-x-hidden selection:bg-foreground selection:text-background relative">
      <Header />

      {/* Floating Home Link */}
      <Link
        to="/"
        className="fixed bottom-8 left-8 z-50 px-5 py-3 bg-foreground text-background text-xs font-sans font-medium uppercase tracking-widest hover:opacity-85 transition-opacity flex items-center gap-2 rounded-[8px] shadow-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Studio</span>
      </Link>

      <div className="container mx-auto px-6 pt-36 pb-32">
        {/* Breadcrumb / Top Bar */}
        <div className="flex items-center justify-between border-b border-foreground/10 pb-6 mb-16">
          <div className="text-[11px] font-sans uppercase tracking-[0.3em] opacity-60">
            STORYLINE &amp; IDENTITY
          </div>
          <div className="text-[11px] font-sans uppercase tracking-widest opacity-60">
            CHETNA PATTNAIK • FOUNDER
          </div>
        </div>

        {/* Hero Banner: Bauhaus Typographic Scale */}
        <section className="mb-24">
          <AnimatedSection>
            <p className="text-xs font-sans uppercase tracking-[0.35em] opacity-60 mb-4">
              THE MANIFESTO &amp; THE MIND BEHIND IT
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-serif font-light uppercase tracking-tight leading-[0.94] mb-12">
              Form Follows Conviction. <br />
              <span className="italic">We Build Living Worlds.</span>
            </h1>
          </AnimatedSection>

          {/* Lead Paragraph with Clean Geometric Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 border-t border-foreground/10">
            <div className="lg:col-span-8">
              <p className="text-2xl md:text-3xl font-serif font-light leading-relaxed opacity-90">
                TheChet&amp;Co exists as an anti-agency sanctuary for founders and cultural agitators who dare to stand out.
              </p>
              <p className="mt-6 text-base md:text-lg opacity-70 font-sans leading-relaxed">
                Founded by Chetna Pattnaik, we combine fine art sensibility with sharp strategic positioning to create visual identities that turn strangers into devotees.
              </p>
            </div>
            <div className="lg:col-span-4 border-l border-foreground/10 pl-8 space-y-8">
              <div>
                <div className="text-4xl font-serif font-light">100%</div>
                <div className="text-xs font-sans uppercase tracking-widest opacity-60 mt-1">Founder-Led Engagements</div>
              </div>
              <div>
                <div className="text-4xl font-serif font-light">Bespoke</div>
                <div className="text-xs font-sans uppercase tracking-widest opacity-60 mt-1">Tailored Visual Systems</div>
              </div>
              <div>
                <div className="text-4xl font-serif font-light">End-to-End</div>
                <div className="text-xs font-sans uppercase tracking-widest opacity-60 mt-1">Strategy to Cultural Drops</div>
              </div>
            </div>
          </div>
        </section>

        {/* Bauhaus Montage Grid: Crisp Flat Layout, Soft Rounded Corners */}
        <section className="my-28">
          <AnimatedSection className="mb-12">
            <div className="flex items-baseline justify-between border-b border-foreground/10 pb-4">
              <h2 className="text-3xl md:text-4xl font-serif italic">
                The Montage: Studio Artifacts
              </h2>
              <span className="text-xs font-sans uppercase tracking-widest opacity-50">
                VISUAL CHRONICLE
              </span>
            </div>
          </AnimatedSection>

          {/* Asymmetric Montage Grid - No Boxy Cards */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Chetna in Transit */}
            <AnimatedSection className="md:col-span-6 lg:col-span-5">
              <div className="group">
                <div className="relative overflow-hidden bg-foreground/5 rounded-[10px]">
                  <img
                    src="/images/about-1.jpg"
                    alt="Chetna Pattnaik on the street"
                    className="w-full h-auto max-h-[580px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-foreground text-background text-[10px] font-sans px-3 py-1 rounded-[6px] uppercase tracking-wider font-semibold shadow-sm">
                    IN TRANSIT
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between text-xs font-sans opacity-70">
                  <span className="font-medium">CHETNA PATTNAIK</span>
                  <span className="opacity-60">DIRECTING &amp; GEAR</span>
                </div>
              </div>
            </AnimatedSection>

            {/* Retreat & Day 1 + Community Gathering */}
            <div className="md:col-span-6 lg:col-span-7 space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* Matchbox */}
                <AnimatedSection delay={0.1}>
                  <div className="group">
                    <div className="overflow-hidden bg-foreground/5 rounded-[10px]">
                      <img
                        src="/images/montage-8.jpg"
                        alt="Founders don't take breaks. Let's change that."
                        className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <p className="mt-3 text-[11px] font-sans uppercase tracking-wider opacity-60">
                      FOUNDERS RETREAT
                    </p>
                  </div>
                </AnimatedSection>

                {/* Day 1 Stamp */}
                <AnimatedSection delay={0.2}>
                  <div className="group">
                    <div className="overflow-hidden bg-foreground/5 rounded-[10px]">
                      <img
                        src="/images/montage-4.jpg"
                        alt="The Gathering Day 1 Stamp"
                        className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <p className="mt-3 text-[11px] font-sans uppercase tracking-wider opacity-60">
                      THE GATHERING
                    </p>
                  </div>
                </AnimatedSection>
              </div>

              {/* Sofar Music */}
              <AnimatedSection delay={0.3}>
                <div className="group">
                  <div className="overflow-hidden bg-foreground/5 rounded-[10px]">
                    <img
                      src="/images/montage-9.jpg"
                      alt="Sofar Sounds Community Gathering"
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs font-sans opacity-70">
                    <span className="font-medium">SOFAR SOUNDS BHUBANESWAR</span>
                    <span className="opacity-60">COMMUNITY FOOTPRINT</span>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>

          {/* Lower Montage Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            <AnimatedSection delay={0.1}>
              <div className="group">
                <div className="overflow-hidden rounded-[10px] bg-foreground/5">
                  <img
                    src="/images/montage-1.jpg"
                    alt="Kunsquad Pop-Up Exhibition"
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <p className="mt-3 text-[11px] font-sans uppercase tracking-wider opacity-60">
                  KUNSQUAD // STREETWEAR LAUNCH
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="group">
                <div className="overflow-hidden rounded-[10px] bg-foreground/5">
                  <img
                    src="/images/about-4.jpg"
                    alt="Chetna Pattnaik Red Portrait Print"
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <p className="mt-3 text-[11px] font-sans uppercase tracking-wider opacity-60">
                  PORTRAIT // PRINT ARCHIVE
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="group">
                <div className="overflow-hidden rounded-[10px] bg-foreground/5">
                  <img
                    src="/images/about-5.jpg"
                    alt="Chetna at Studio Workspace"
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <p className="mt-3 text-[11px] font-sans uppercase tracking-wider opacity-60">
                  STUDIO WORKSPACE // CHETNA
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Brand Voice & Principles Section */}
        <section className="my-28 border-t border-foreground/10 pt-20">
          <AnimatedSection className="mb-14">
            <p className="text-[11px] font-sans uppercase tracking-[0.3em] opacity-60 mb-2">
              STUDIO CREED
            </p>
            <h2 className="text-4xl md:text-6xl font-serif font-light tracking-tight">
              The Rules We Live By
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <AnimatedSection delay={0.1}>
              <div className="h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-serif italic mb-3">
                    It is only delusional until it works.
                  </h3>
                  <p className="text-sm opacity-70 leading-relaxed font-sans">
                    Every culture-defining brand sounded bold on paper before it launched. We don&apos;t design for the median; we design for the extremes that captivate true believers.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-foreground/10 text-[10px] font-sans uppercase tracking-widest opacity-50">
                  CONVICTION
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-serif italic mb-3">
                    Real physical gravity.
                  </h3>
                  <p className="text-sm opacity-70 leading-relaxed font-sans">
                    A brand that exists solely on screens is fragile. We test identities against tactile merchandise, editorial prints, and visceral public rooms.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-foreground/10 text-[10px] font-sans uppercase tracking-widest opacity-50">
                  TACTILE IDENTITY
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-serif italic mb-3">
                    Selective partnerships.
                  </h3>
                  <p className="text-sm opacity-70 leading-relaxed font-sans">
                    We take on an intentionally limited roster of clients each quarter so every brand receives our undivided dedication.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-foreground/10 text-[10px] font-sans uppercase tracking-widest opacity-50">
                  BESPOKE CAPACITY
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Flat Minimal CTA Section */}
        <section className="my-20 pt-16 border-t border-foreground/10">
          <div className="max-w-3xl">
            <span className="text-[11px] font-sans uppercase tracking-[0.3em] opacity-60">
              COLLABORATION
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-light tracking-tight mt-3 mb-4">
              Ready to build something unforgettable?
            </h2>
            <p className="text-base opacity-70 font-sans leading-relaxed mb-8">
              Direct consultation with Chetna Pattnaik. Let&apos;s dissect your current positioning and architect a brand world that resonates.
            </p>
            <button
              type="button"
              onClick={openBookingModal}
              className="px-8 py-4 bg-foreground text-background text-xs font-sans uppercase tracking-widest font-semibold hover:opacity-85 transition-opacity inline-flex items-center gap-3 rounded-[8px] cursor-pointer"
            >
              <span>Book 45-Min Discovery Call</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
