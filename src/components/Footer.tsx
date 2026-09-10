import { Instagram, Linkedin, ArrowRight, Calendar } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useBooking } from "@/contexts/BookingContext";
import { Logo } from "./Logo";
import { DancingGradient } from "./DancingGradient";

export function Footer() {
  const { toast } = useToast();
  const { openBookingModal } = useBooking();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email");

    try {
      const SCRIPT_URL =
        "https://script.google.com/macros/s/AKfycbw2Q6yswt5YxiXQwtdXIpN3ilDMZ9csprLiv4RYoaFpDMqIlXasWMypSm7IcIrlLTx3/exec";

      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
          email,
          message: "Footer dispatch newsletter / brief contact",
          recipientOwner: "manish.rath5240@gmail.com",
          ccOwner: "thechet.pattnaik@gmail.com",
          guestEmail: "thechet.pattnaik@gmail.com",
          date: new Date().toISOString(),
        }),
        headers: { "Content-Type": "application/json" },
      });

      toast({
        title: "Dispatched",
        description: "Your contact details have been sent to the studio.",
      });

      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative w-full">
      {/* Living Breathing Dancing Gradient Transition to White */}
      <DancingGradient />

      {/* Light-Themed Flat & Minimal Footer: Increased Height, Wrapped Around Centered Image */}
      <footer className="relative bg-white text-[#7e0200] py-20 md:py-28 px-6 min-h-[460px] flex items-center">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Side: Brand Identity, Studio Statement, Navigation Links, Copyright */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
              <div>
                <Logo className="h-10 w-auto text-[#7e0200] mb-3" />
                <p className="text-xs font-sans uppercase tracking-widest opacity-60">
                  Design Studio &amp; Consultancy • Chetna Pattnaik
                </p>
                <p className="text-sm font-serif italic opacity-75 mt-2 max-w-sm leading-relaxed">
                  Crafting visual identities and cultural worlds for those who dare to stand out.
                </p>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-sans uppercase tracking-widest pt-2">
                <Link to="/work" className="hover:opacity-60 transition-opacity">
                  Work
                </Link>
                <Link to="/services" className="hover:opacity-60 transition-opacity">
                  Capabilities
                </Link>
                <Link to="/about" className="hover:opacity-60 transition-opacity">
                  About
                </Link>
                <Link to="/journal" className="hover:opacity-60 transition-opacity">
                  Journal
                </Link>
                <Link to="/faq" className="hover:opacity-60 transition-opacity">
                  FAQ
                </Link>
                <Link to="/contact" className="hover:opacity-60 transition-opacity">
                  Contact
                </Link>
                <a
                  href="https://www.instagram.com/thechetandco/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-60 transition-opacity flex items-center gap-1"
                >
                  <Instagram className="w-3.5 h-3.5" /> Instagram
                </a>
                <a
                  href="https://www.linkedin.com/company/the-chet-co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-60 transition-opacity flex items-center gap-1"
                >
                  <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                </a>
                <Link to="/privacy" className="hover:opacity-60 transition-opacity">
                  Privacy
                </Link>
              </div>

              <div className="text-[10px] font-sans uppercase tracking-widest opacity-50 pt-2">
                © {new Date().getFullYear()} THE CHET &amp; CO. • ALL RIGHTS RESERVED
              </div>
            </div>

            {/* Middle: Embedded Creed Image (Nestled directly in the center, footer wrapped on left & right) */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center my-4 lg:my-0">
              <img
                src="/images/footer.jpg"
                alt="It is only delusional until it works"
                className="w-36 sm:w-44 md:w-48 h-auto object-contain rounded-[8px] transition-transform duration-500 hover:scale-105 select-none"
              />
            </div>

            {/* Right Side: Fast Email Dispatch, Direct Communication & Discovery Booking */}
            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-between space-y-6">
              <div className="w-full sm:w-80">
                <p className="text-[10px] font-sans uppercase tracking-[0.25em] opacity-60 mb-2">
                  INITIATE DIALOGUE
                </p>
                <form onSubmit={handleSubmit} className="flex items-center border-b border-[#7e0200]/30 pb-2">
                  <input
                    type="email"
                    name="email"
                    placeholder="ENTER YOUR EMAIL"
                    required
                    className="w-full bg-transparent outline-none placeholder:text-[#7e0200]/40 text-xs font-sans uppercase tracking-wider text-[#7e0200]"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="text-xs font-sans uppercase tracking-widest font-semibold opacity-80 hover:opacity-100 transition-opacity pl-2 cursor-pointer flex items-center gap-1"
                  >
                    <span>{isSubmitting ? "..." : "SEND"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>

              <div className="space-y-2 text-left lg:text-right">
                <a
                  href="mailto:hello@thechetandco.com"
                  className="text-xs font-sans tracking-wider opacity-80 hover:opacity-100 transition-opacity block font-medium"
                >
                  hello@thechetandco.com
                </a>
                <p className="text-[11px] font-sans uppercase tracking-widest opacity-50">
                  Bhubaneswar • Mumbai • Global
                </p>
              </div>

              <button
                type="button"
                onClick={openBookingModal}
                className="px-6 py-3 bg-[#7e0200] text-white text-xs font-sans uppercase tracking-widest font-semibold rounded-[8px] hover:opacity-90 transition-opacity flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book 45-Min Call</span>
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
