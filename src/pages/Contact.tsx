import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AnimatedSection } from "@/components/AnimatedSection";
import { useBooking } from "@/contexts/BookingContext";
import { ArrowLeft, ArrowRight, Calendar, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { openBookingModal } = useBooking();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const SCRIPT_URL =
        "https://script.google.com/macros/s/AKfycbw2Q6yswt5YxiXQwtdXIpN3ilDMZ9csprLiv4RYoaFpDMqIlXasWMypSm7IcIrlLTx3/exec";

      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
          firstName: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
          recipientOwner: "manish.rath5240@gmail.com",
          ccOwner: "thechet.pattnaik@gmail.com",
          guestEmail: "thechet.pattnaik@gmail.com",
          date: new Date().toISOString(),
        }),
        headers: { "Content-Type": "application/json" },
      });

      toast({
        title: "Message Dispatched",
        description: "Your note has reached Chetna Pattnaik. We will respond within 24 hours.",
      });

      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again or email directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
        {/* Top Bar Breadcrumb */}
        <div className="flex items-center justify-between border-b border-foreground/10 pb-6 mb-16 text-xs font-sans uppercase tracking-widest opacity-60">
          <span>CONTACT &amp; COMMISSIONS</span>
          <span>THECHET&amp;CO</span>
        </div>

        {/* Hero Section */}
        <AnimatedSection className="mb-20">
          <p className="text-xs font-sans uppercase tracking-[0.35em] opacity-60 mb-4">
            INITIATE COLLABORATION
          </p>
          <h1 className="text-5xl sm:text-7xl lg:text-[7.5rem] font-serif font-light uppercase tracking-tight leading-[0.92] mb-8">
            Let&apos;s Build <br />
            <span className="italic">Something Enduring.</span>
          </h1>
          <p className="text-lg md:text-xl font-sans opacity-75 max-w-2xl leading-relaxed">
            We partner with visionary founders ready to step outside the safe median. Book a direct 45-minute discovery consultation with Chetna Pattnaik or send an inquiry below.
          </p>
        </AnimatedSection>

        {/* 2-Column Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 pt-12 border-t border-foreground/10">
          {/* Left Column: Direct Consultation Booking Card */}
          <AnimatedSection direction="right" className="lg:col-span-5 space-y-10">
            <div>
              <h3 className="text-2xl font-serif italic mb-3">Schedule a 1-on-1 Discovery Call</h3>
              <p className="text-sm font-sans opacity-75 leading-relaxed mb-6">
                Choose an available slot directly on Chetna&apos;s calendar with an auto-generated Google Meet invite dispatched to your inbox.
              </p>
              <button
                type="button"
                onClick={openBookingModal}
                className="px-8 py-4 bg-foreground text-background text-xs font-sans uppercase tracking-widest font-semibold rounded-[8px] hover:opacity-85 transition-opacity flex items-center gap-3 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book 45-Min Discovery Session</span>
              </button>
            </div>

            <div className="pt-8 border-t border-foreground/10 space-y-6 text-sm font-sans">
              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-foreground/60 mt-0.5" />
                <div>
                  <p className="text-xs uppercase tracking-wider opacity-50">Direct Studio Email</p>
                  <a
                    href="mailto:hello@thechetandco.com"
                    className="font-medium hover:underline block mt-0.5"
                  >
                    hello@thechetandco.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-foreground/60 mt-0.5" />
                <div>
                  <p className="text-xs uppercase tracking-wider opacity-50">Studio Base</p>
                  <p className="font-medium mt-0.5">Bhubaneswar • Mumbai • Global</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Right Column: Direct Dispatch Message Form */}
          <AnimatedSection direction="left" className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-sans uppercase tracking-wider opacity-60 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Maya Lin"
                  className="w-full bg-transparent border-b border-foreground/25 py-3 outline-none focus:border-foreground text-sm font-sans placeholder:text-foreground/30 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-sans uppercase tracking-wider opacity-60 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="maya@brand.com"
                  className="w-full bg-transparent border-b border-foreground/25 py-3 outline-none focus:border-foreground text-sm font-sans placeholder:text-foreground/30 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-sans uppercase tracking-wider opacity-60 mb-2">
                  Brief / Collaboration Details *
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell us about your brand, current challenges, timeline, or design mandate..."
                  className="w-full bg-transparent border-b border-foreground/25 py-3 outline-none focus:border-foreground text-sm font-sans placeholder:text-foreground/30 transition-colors resize-none"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-4 bg-foreground text-background text-xs font-sans uppercase tracking-widest font-semibold rounded-[8px] hover:opacity-85 transition-opacity inline-flex items-center gap-3 disabled:opacity-50 cursor-pointer"
                >
                  <span>{isSubmitting ? "DISPATCHING..." : "DISPATCH MESSAGE"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </AnimatedSection>
        </div>
      </div>

      <Footer />
    </main>
  );
}
