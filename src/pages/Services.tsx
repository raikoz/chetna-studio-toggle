import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CoreSkills } from "@/components/CoreSkills";
import { AnimatedSection } from "@/components/AnimatedSection";
import { useBooking } from "@/contexts/BookingContext";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function Services() {
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

      <div className="container mx-auto px-6 pt-36 pb-12">
        {/* Breadcrumb Top Bar */}
        <div className="flex items-center justify-between border-b border-foreground/10 pb-6 mb-16 text-xs font-sans uppercase tracking-widest opacity-60">
          <span>CAPABILITIES &amp; STUDIO PROCESS</span>
          <span>THECHET&amp;CO</span>
        </div>

        {/* Hero Headline */}
        <AnimatedSection className="mb-20">
          <p className="text-xs font-sans uppercase tracking-[0.35em] opacity-60 mb-4">
            HOW WE PARTNER WITH FOUNDERS
          </p>
          <h1 className="text-5xl sm:text-7xl lg:text-[7.5rem] font-serif font-light uppercase tracking-tight leading-[0.92] mb-8">
            Bespoke Creative <br />
            <span className="italic">Without Bureaucracy.</span>
          </h1>
          <p className="text-lg md:text-xl font-sans opacity-75 max-w-2xl leading-relaxed">
            We operate as an agile design consultancy. Every engagement is led directly by Chetna Pattnaik and our senior directors—ensuring pure craft, zero committee compromises, and rapid cultural momentum.
          </p>
        </AnimatedSection>
      </div>

      {/* Core Capabilities Section (No selected works shown!) */}
      <CoreSkills />

      {/* 3-Step Engagement Model */}
      <section className="container mx-auto px-6 py-24 border-t border-foreground/10">
        <AnimatedSection className="mb-14">
          <p className="text-xs font-sans uppercase tracking-[0.3em] opacity-60 mb-2">
            METHODOLOGY
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-light tracking-tight">
            How An Engagement Unfolds
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <AnimatedSection delay={0.1}>
            <div className="space-y-4">
              <span className="text-2xl font-serif italic text-foreground/40">01</span>
              <h3 className="text-xl font-sans font-medium uppercase tracking-tight">
                Dissection &amp; Conviction
              </h3>
              <p className="text-sm opacity-70 font-sans leading-relaxed">
                We interview the founder, strip away generic market tropes, and define the singular, polarizing truth of your brand world.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="space-y-4">
              <span className="text-2xl font-serif italic text-foreground/40">02</span>
              <h3 className="text-xl font-sans font-medium uppercase tracking-tight">
                Visual Architecture &amp; Artifacts
              </h3>
              <p className="text-sm opacity-70 font-sans leading-relaxed">
                We design tactile systems: typography, print collateral, merchandise, packaging, and digital interfaces built to last.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div className="space-y-4">
              <span className="text-2xl font-serif italic text-foreground/40">03</span>
              <h3 className="text-xl font-sans font-medium uppercase tracking-tight">
                Cultural Drop &amp; Operations
              </h3>
              <p className="text-sm opacity-70 font-sans leading-relaxed">
                We execute the launch motion, arm your internal team with intuitive assets, and ensure your brand enters the public sphere with gravity.
              </p>
            </div>
          </AnimatedSection>
        </div>

        {/* CTA */}
        <div className="pt-16 mt-16 border-t border-foreground/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-serif italic">Ready to commence?</h3>
            <p className="text-xs font-sans opacity-60 uppercase tracking-wider mt-1">
              Currently accepting 2 bespoke client engagements for the upcoming quarter.
            </p>
          </div>
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

      <Footer />
    </main>
  );
}
