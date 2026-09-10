import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AnimatedSection } from "@/components/AnimatedSection";
import { useBooking } from "@/contexts/BookingContext";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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
        className="fixed bottom-8 left-8 z-50 px-5 py-3 bg-foreground text-background border border-foreground/30 text-xs font-mono uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-2 shadow-2xl"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Studio</span>
      </Link>

      <div className="container mx-auto px-6 pt-36 pb-32">
        {/* Breadcrumb / Top Bar */}
        <div className="flex items-center justify-between border-b border-foreground/15 pb-6 mb-16">
          <div className="text-xs font-mono uppercase tracking-[0.4em] opacity-60">
            [ ARCHIVE // STORYLINE & IDENTITY ]
          </div>
          <div className="text-xs font-mono uppercase tracking-widest opacity-60">
            CHETNA PATTNAIK • FOUNDER
          </div>
        </div>

        {/* Hero Banner: Massive Brutalist Typography */}
        <section className="mb-24">
          <AnimatedSection>
            <p className="text-xs md:text-sm font-mono uppercase tracking-[0.4em] opacity-60 mb-6">
              THE MANIFESTO & THE MIND BEHIND IT
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-[7.5rem] font-serif font-light uppercase tracking-tight leading-[0.92] mb-12">
              We Don&apos;t Make Noise. <br />
              <span className="italic">We Engineer Conviction.</span>
            </h1>
          </AnimatedSection>

          {/* Lead Paragraph with Side Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 border-t border-foreground/15">
            <div className="lg:col-span-8">
              <p className="text-2xl md:text-3xl font-serif font-light leading-relaxed opacity-90">
                TheChet&amp;Co was built on a singular provocation: that most creative agencies have
                traded soul for process, drowning daring ideas in 40-page PDFs and safe corporate committee decisions.
              </p>
              <p className="mt-8 text-base md:text-lg opacity-70 font-sans leading-relaxed">
                Founded by Chetna Pattnaik, the studio exists as an anti-agency sanctuary for founders, cultural agitators, and brands that dare to have point-of-view. We merge fine art sensibility with sharp strategic positioning—crafting visual worlds that turn strangers into devotees.
              </p>
            </div>
            <div className="lg:col-span-4 border-l border-foreground/15 pl-8 space-y-6">
              <div>
                <div className="text-4xl font-serif font-light">100%</div>
                <div className="text-xs font-mono uppercase tracking-widest opacity-60">Founder-Led Engagements</div>
              </div>
              <div>
                <div className="text-4xl font-serif font-light">0px</div>
                <div className="text-xs font-mono uppercase tracking-widest opacity-60">Curve Compromise</div>
              </div>
              <div>
                <div className="text-4xl font-serif font-light">End-to-End</div>
                <div className="text-xs font-mono uppercase tracking-widest opacity-60">Strategy to Cultural Drops</div>
              </div>
            </div>
          </div>
        </section>

        {/* Creative Montage Grid: Human Imagery, Old Paper Look, Brutalist Framing */}
        <section className="my-32">
          <AnimatedSection className="mb-12">
            <div className="flex items-baseline justify-between border-b border-foreground/15 pb-4">
              <h2 className="text-3xl md:text-4xl font-serif italic">
                The Montage: Unfiltered Studio Artifacts
              </h2>
              <span className="text-xs font-mono uppercase tracking-widest opacity-60">
                PLATES 01 – 08
              </span>
            </div>
          </AnimatedSection>

          {/* Asymmetric Montage Collage with Vintage Paper Textures */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Plate 1: Chetna Bandana on Street */}
            <AnimatedSection className="md:col-span-6 lg:col-span-5">
              <div className="border-2 border-foreground bg-background p-3 shadow-[8px_8px_0px_0px_hsl(var(--foreground))] transition-transform duration-500 hover:-translate-y-2">
                <div className="relative overflow-hidden aspect-[3/4] bg-foreground/10 border border-foreground/20">
                  <img
                    src="/images/about-1.jpg"
                    alt="Chetna Pattnaik on the street"
                    className="w-full h-full object-cover vintage-paper"
                  />
                  <div className="absolute top-3 left-3 bg-foreground text-background text-[10px] font-mono px-2 py-0.5 uppercase tracking-widest font-bold">
                    PLATE // 01 • IN TRANSIT
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between text-xs font-mono opacity-80 pt-2 border-t border-foreground/10">
                  <span>CHETNA PATTNAIK</span>
                  <span>GEAR & INTENTION</span>
                </div>
              </div>
            </AnimatedSection>

            {/* Plate 2 & 3: Matchbox + The Gathering CXO */}
            <div className="md:col-span-6 lg:col-span-7 space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* Matchbox */}
                <AnimatedSection delay={0.1}>
                  <div className="border-2 border-foreground bg-background p-3 shadow-[6px_6px_0px_0px_hsl(var(--foreground))] transition-transform duration-500 hover:rotate-1">
                    <div className="aspect-square overflow-hidden bg-foreground/5 border border-foreground/20">
                      <img
                        src="/images/montage-8.jpg"
                        alt="Founders don't take breaks. Let's change that."
                        className="w-full h-full object-cover vintage-paper"
                      />
                    </div>
                    <p className="mt-2 text-[10px] font-mono uppercase tracking-widest opacity-70">
                      ARTIFACT: FOUNDERS RETREAT TOKEN
                    </p>
                  </div>
                </AnimatedSection>

                {/* Day 1 Stamp */}
                <AnimatedSection delay={0.2}>
                  <div className="border-2 border-foreground bg-background p-3 shadow-[6px_6px_0px_0px_hsl(var(--foreground))] transition-transform duration-500 hover:-rotate-1">
                    <div className="aspect-square overflow-hidden bg-foreground/5 border border-foreground/20">
                      <img
                        src="/images/montage-4.jpg"
                        alt="The Gathering Day 1 Stamp"
                        className="w-full h-full object-cover vintage-paper"
                      />
                    </div>
                    <p className="mt-2 text-[10px] font-mono uppercase tracking-widest opacity-70">
                      PLATE // 02: THE GATHERING STAMP
                    </p>
                  </div>
                </AnimatedSection>
              </div>

              {/* Plate 4: Full-width Community Photo: Sofar Music */}
              <AnimatedSection delay={0.3}>
                <div className="border-2 border-foreground bg-background p-3 shadow-[8px_8px_0px_0px_hsl(var(--foreground))] transition-transform duration-500 hover:-translate-y-1">
                  <div className="aspect-[16/10] overflow-hidden bg-foreground/5 border border-foreground/20">
                    <img
                      src="/images/montage-9.jpg"
                      alt="Sofar Sounds Community Gathering"
                      className="w-full h-full object-cover vintage-paper"
                    />
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs font-mono opacity-80 pt-2 border-t border-foreground/10">
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
              <div className="border-2 border-foreground bg-background p-3 shadow-[6px_6px_0px_0px_hsl(var(--foreground))]">
                <div className="aspect-[4/5] overflow-hidden border border-foreground/20">
                  <img
                    src="/images/montage-1.jpg"
                    alt="Kunsquad Pop-Up Exhibition"
                    className="w-full h-full object-cover vintage-paper"
                  />
                </div>
                <p className="mt-2 text-[10px] font-mono uppercase tracking-widest opacity-70">
                  KUNSQUAD // STREETWEAR LAUNCH
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="border-2 border-foreground bg-background p-3 shadow-[6px_6px_0px_0px_hsl(var(--foreground))]">
                <div className="aspect-[4/5] overflow-hidden border border-foreground/20">
                  <img
                    src="/images/about-4.jpg"
                    alt="Chetna Pattnaik Red Portrait Print"
                    className="w-full h-full object-cover vintage-paper"
                  />
                </div>
                <p className="mt-2 text-[10px] font-mono uppercase tracking-widest opacity-70">
                  PORTRAIT // RED PRINT ARCHIVE
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="border-2 border-foreground bg-background p-3 shadow-[6px_6px_0px_0px_hsl(var(--foreground))]">
                <div className="aspect-[4/5] overflow-hidden border border-foreground/20">
                  <img
                    src="/images/about-5.jpg"
                    alt="Chetna at Studio Workspace"
                    className="w-full h-full object-cover vintage-paper"
                  />
                </div>
                <p className="mt-2 text-[10px] font-mono uppercase tracking-widest opacity-70">
                  STUDIO WORKSPACE // CHETNA
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Brand Voice & Principles Section */}
        <section className="my-32 border-t border-foreground/15 pt-24">
          <AnimatedSection className="mb-16">
            <p className="text-xs font-mono uppercase tracking-[0.4em] opacity-60 mb-3">
              [ 03 // STUDIO CORE CREED ]
            </p>
            <h2 className="text-4xl md:text-6xl font-serif font-light tracking-tight">
              The Rules We Live By
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedSection delay={0.1}>
              <div className="border border-foreground/20 p-8 bg-background h-full flex flex-col justify-between">
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
              <div className="border border-foreground/20 p-8 bg-background h-full flex flex-col justify-between">
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
              <div className="border border-foreground/20 p-8 bg-background h-full flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs opacity-40">03 / NO COOKIE-CUTTERS</span>
                  <h3 className="text-2xl font-serif italic mt-4 mb-4">
                    Bespoke architecture.
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
        <section className="my-24 border-2 border-foreground p-12 md:p-16 bg-background relative shadow-[12px_12px_0px_0px_hsl(var(--foreground))]">
          <div className="max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-[0.4em] opacity-60">
              COMMENCE COLLABORATION
            </span>
            <h2 className="text-4xl md:text-6xl font-serif font-light tracking-tight mt-4 mb-6">
              Ready to build something unforgettable?
            </h2>
            <p className="text-base md:text-lg opacity-70 font-sans leading-relaxed mb-8">
              Direct consultation with Chetna Pattnaik. Let&apos;s dissect your current positioning and architect a brand world that resonates.
            </p>
            <button
              type="button"
              onClick={openBookingModal}
              className="px-8 py-4 bg-foreground text-background text-xs md:text-sm font-mono uppercase tracking-widest hover:opacity-90 transition-opacity inline-flex items-center gap-3 cursor-pointer"
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
