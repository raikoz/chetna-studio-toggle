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
        className="fixed bottom-8 left-8 z-50 px-5 py-3 bg-foreground text-background border border-foreground text-xs font-mono uppercase tracking-widest hover:bg-transparent hover:text-foreground transition-colors flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Studio</span>
      </Link>

      <div className="container mx-auto px-6 pt-36 pb-32">
        {/* Breadcrumb / Top Bar */}
        <div className="flex items-center justify-between border-b border-foreground/15 pb-6 mb-16">
          <div className="text-[11px] font-mono uppercase tracking-[0.3em] opacity-60">
            ARCHIVE / STORYLINE &amp; IDENTITY
          </div>
          <div className="text-[11px] font-mono uppercase tracking-widest opacity-60">
            CHETNA PATTNAIK • FOUNDER
          </div>
        </div>

        {/* Hero Banner: Bauhaus Typographic Scale */}
        <section className="mb-24">
          <AnimatedSection>
            <p className="text-xs font-mono uppercase tracking-[0.4em] opacity-60 mb-4">
              THE MANIFESTO &amp; THE MIND BEHIND IT
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-[7.5rem] font-serif font-light uppercase tracking-tight leading-[0.92] mb-12">
              Form Follows Conviction. <br />
              <span className="italic">We Build Living Worlds.</span>
            </h1>
          </AnimatedSection>

          {/* Lead Paragraph with Clean Geometric Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 border-t border-foreground/15">
            <div className="lg:col-span-8">
              <p className="text-2xl md:text-3xl font-serif font-light leading-relaxed opacity-90">
                TheChet&amp;Co was founded on a singular provocation: that most creative agencies have
                traded soul for process, drowning daring ideas in 40-page PDFs and safe corporate committee decisions.
              </p>
              <p className="mt-8 text-base md:text-lg opacity-70 font-sans leading-relaxed">
                Founded by Chetna Pattnaik, the studio exists as an anti-agency sanctuary for founders, cultural agitators, and brands that dare to have point-of-view. We merge fine art sensibility with sharp strategic positioning—crafting visual worlds that turn strangers into devotees.
              </p>
            </div>
            <div className="lg:col-span-4 border-l border-foreground/15 pl-8 space-y-8">
              <div>
                <div className="text-4xl font-serif font-light">100%</div>
                <div className="text-xs font-mono uppercase tracking-widest opacity-60 mt-1">Founder-Led Engagements</div>
              </div>
              <div>
                <div className="text-4xl font-serif font-light">0px</div>
                <div className="text-xs font-mono uppercase tracking-widest opacity-60 mt-1">Curve Compromise</div>
              </div>
              <div>
                <div className="text-4xl font-serif font-light">End-to-End</div>
                <div className="text-xs font-mono uppercase tracking-widest opacity-60 mt-1">Strategy to Cultural Drops</div>
              </div>
            </div>
          </div>
        </section>

        {/* Bauhaus Montage Grid: Crisp Geometric Layout, Flat Planes */}
        <section className="my-28">
          <AnimatedSection className="mb-12">
            <div className="flex items-baseline justify-between border-b border-foreground/15 pb-4">
              <h2 className="text-3xl md:text-4xl font-serif italic">
                The Montage: Studio Artifacts
              </h2>
              <span className="text-xs font-mono uppercase tracking-widest opacity-60">
                PLATES 01 – 08
              </span>
            </div>
          </AnimatedSection>

          {/* Asymmetric Bauhaus Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Plate 1: Chetna Bandana on Street */}
            <AnimatedSection className="md:col-span-6 lg:col-span-5">
              <div className="border border-foreground/20 bg-background p-3 hover:border-foreground transition-colors duration-200">
                <div className="relative overflow-hidden aspect-[3/4] bg-foreground/5 border border-foreground/10">
                  <img
                    src="/images/about-1.jpg"
                    alt="Chetna Pattnaik on the street"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-foreground text-background text-[10px] font-mono px-2.5 py-1 uppercase tracking-widest font-bold">
                    PLATE 01 • IN TRANSIT
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between text-xs font-mono opacity-70 pt-2 border-t border-foreground/10">
                  <span>CHETNA PATTNAIK</span>
                  <span>DIRECTING &amp; GEAR</span>
                </div>
              </div>
            </AnimatedSection>

            {/* Plates 2, 3 & 4: Matchbox + The Gathering CXO + Sofar Music */}
            <div className="md:col-span-6 lg:col-span-7 space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* Matchbox */}
                <AnimatedSection delay={0.1}>
                  <div className="border border-foreground/20 bg-background p-3 hover:border-foreground transition-colors duration-200">
                    <div className="aspect-square overflow-hidden bg-foreground/5 border border-foreground/10">
                      <img
                        src="/images/montage-8.jpg"
                        alt="Founders don't take breaks. Let's change that."
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <p className="mt-2 text-[10px] font-mono uppercase tracking-widest opacity-60">
                      ARTIFACT: FOUNDERS RETREAT
                    </p>
                  </div>
                </AnimatedSection>

                {/* Day 1 Stamp */}
                <AnimatedSection delay={0.2}>
                  <div className="border border-foreground/20 bg-background p-3 hover:border-foreground transition-colors duration-200">
                    <div className="aspect-square overflow-hidden bg-foreground/5 border border-foreground/10">
                      <img
                        src="/images/montage-4.jpg"
                        alt="The Gathering Day 1 Stamp"
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <p className="mt-2 text-[10px] font-mono uppercase tracking-widest opacity-60">
                      PLATE 02: THE GATHERING
                    </p>
                  </div>
                </AnimatedSection>
              </div>

              {/* Plate 4: Full-width Community Photo: Sofar Music */}
              <AnimatedSection delay={0.3}>
                <div className="border border-foreground/20 bg-background p-3 hover:border-foreground transition-colors duration-200">
                  <div className="aspect-[16/10] overflow-hidden bg-foreground/5 border border-foreground/10">
                    <img
                      src="/images/montage-9.jpg"
                      alt="Sofar Sounds Community Gathering"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs font-mono opacity-70 pt-2 border-t border-foreground/10">
                    <span>SOFAR SOUNDS BHUBANESWAR</span>
                    <span>COMMUNITY FOOTPRINT</span>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>

          {/* Lower Montage Row: Kunsquad Streetwear + High Contrast Red Portrait + Workspace */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <AnimatedSection delay={0.1}>
              <div className="border border-foreground/20 bg-background p-3 hover:border-foreground transition-colors duration-200">
                <div className="aspect-[4/5] overflow-hidden border border-foreground/10">
                  <img
                    src="/images/montage-1.jpg"
                    alt="Kunsquad Pop-Up Exhibition"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <p className="mt-2 text-[10px] font-mono uppercase tracking-widest opacity-60">
                  KUNSQUAD // STREETWEAR LAUNCH
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="border border-foreground/20 bg-background p-3 hover:border-foreground transition-colors duration-200">
                <div className="aspect-[4/5] overflow-hidden border border-foreground/10">
                  <img
                    src="/images/about-4.jpg"
                    alt="Chetna Pattnaik Red Portrait Print"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <p className="mt-2 text-[10px] font-mono uppercase tracking-widest opacity-60">
                  PORTRAIT // PRINT ARCHIVE
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="border border-foreground/20 bg-background p-3 hover:border-foreground transition-colors duration-200">
                <div className="aspect-[4/5] overflow-hidden border border-foreground/10">
                  <img
                    src="/images/about-5.jpg"
                    alt="Chetna at Studio Workspace"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <p className="mt-2 text-[10px] font-mono uppercase tracking-widest opacity-60">
                  STUDIO WORKSPACE // CHETNA
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Brand Voice & Principles Section */}
        <section className="my-28 border-t border-foreground/15 pt-20">
          <AnimatedSection className="mb-14">
            <p className="text-[11px] font-mono uppercase tracking-[0.3em] opacity-60 mb-2">
              03 / STUDIO CORE CREED
            </p>
            <h2 className="text-4xl md:text-6xl font-serif font-light tracking-tight">
              The Rules We Live By
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedSection delay={0.1}>
              <div className="border border-foreground/20 p-8 bg-background h-full flex flex-col justify-between hover:border-foreground transition-colors duration-200">
                <div>
                  <span className="font-mono text-xs opacity-40">01 / CONVICTION</span>
                  <h3 className="text-2xl font-serif italic mt-4 mb-4">
                    It is only delusional until it works.
                  </h3>
                  <p className="text-sm opacity-70 leading-relaxed font-sans">
                    Every culture-defining brand sounded insane on paper before it launched. We don&apos;t design for the median; we design for the extremes that captivate true believers.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-foreground/10 text-[10px] font-mono uppercase tracking-widest opacity-40">
                  THE FOUNDING PHILOSOPHY
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="border border-foreground/20 p-8 bg-background h-full flex flex-col justify-between hover:border-foreground transition-colors duration-200">
                <div>
                  <span className="font-mono text-xs opacity-40">02 / ARTIFACTS OVER SLIDES</span>
                  <h3 className="text-2xl font-serif italic mt-4 mb-4">
                    Real physical gravity.
                  </h3>
                  <p className="text-sm opacity-70 leading-relaxed font-sans">
                    A digital brand that exists solely on Figma is fragile. We test identities against paper, tactile merchandise, physical gatherings, and visceral public rooms.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-foreground/10 text-[10px] font-mono uppercase tracking-widest opacity-40">
                  TACTILE IDENTITY
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="border border-foreground/20 p-8 bg-background h-full flex flex-col justify-between hover:border-foreground transition-colors duration-200">
                <div>
                  <span className="font-mono text-xs opacity-40">03 / BESPOKE CAPACITY</span>
                  <h3 className="text-2xl font-serif italic mt-4 mb-4">
                    Selective partnerships.
                  </h3>
                  <p className="text-sm opacity-70 leading-relaxed font-sans">
                    We take on an intentionally limited roster of clients each quarter so every brand receives the uncompromised attention of Chetna Pattnaik and our core team.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-foreground/10 text-[10px] font-mono uppercase tracking-widest opacity-40">
                  SELECTIVE CAPACITY
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* CTA to Consult */}
        <section className="my-20 border border-foreground p-10 md:p-14 bg-background relative">
          <div className="max-w-3xl">
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] opacity-60">
              COMMENCE COLLABORATION
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-light tracking-tight mt-3 mb-6">
              Ready to build something unforgettable?
            </h2>
            <p className="text-base opacity-70 font-sans leading-relaxed mb-8">
              Direct consultation with Chetna Pattnaik. Let&apos;s dissect your current positioning and architect a brand world that resonates.
            </p>
            <button
              type="button"
              onClick={openBookingModal}
              className="px-8 py-4 bg-foreground text-background text-xs font-mono uppercase tracking-widest font-bold hover:bg-transparent hover:text-foreground border border-foreground transition-colors inline-flex items-center gap-3 cursor-pointer"
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
