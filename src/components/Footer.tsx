import { Instagram, Linkedin, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "./Logo";

export function Footer() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    const firstName = formData.get("firstName");
    const email = formData.get("email");
    const message = formData.get("message");

    try {
      const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw2Q6yswt5YxiXQwtdXIpN3ilDMZ9csprLiv4RYoaFpDMqIlXasWMypSm7IcIrlLTx3/exec"; 
      
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({ 
          firstName, 
          email, 
          message,
          recipientOwner: "manish.rath5240@gmail.com",
          ccOwner: "thechet.pattnaik@gmail.com",
          guestEmail: "thechet.pattnaik@gmail.com",
          date: new Date().toISOString() 
        }),
        headers: { "Content-Type": "application/json" },
      });

      toast({
        title: "Conversation initiated",
        description: "Your message has been dispatched to manish.rath5240@gmail.com and CC'd to thechet.pattnaik@gmail.com.",
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
      {/* Ultra-Smooth Seamless Multi-Stop Non-Linear Gradient Transition to White */}
      <div className="relative w-full h-44 md:h-60 smooth-gradient-to-light" />

      {/* Light-Themed Flat & Minimal Footer */}
      <footer className="relative bg-white text-[#7e0200] pt-8 pb-14 px-6">
        <div className="container mx-auto">
          {/* Middle Floating Creed Image: No borders, No cards, No containers, small in size */}
          <div className="flex flex-col items-center justify-center py-10">
            <img
              src="/images/footer.jpg"
              alt="It is only delusional until it works"
              className="w-32 md:w-40 h-auto object-contain rounded-[6px] transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Details Row: Left Logo & Subtitle, Right-Aligned Navigation & Contact Form */}
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between pt-12 border-t border-[#7e0200]/15 gap-12">
            {/* Left: Minimal Logo & Studio Subtitle */}
            <div className="max-w-sm">
              <Logo className="h-9 w-auto text-[#7e0200] mb-3" />
              <p className="text-xs font-sans uppercase tracking-widest opacity-60">
                Design Studio &amp; Consultancy • Chetna Pattnaik
              </p>
              <p className="text-sm font-serif italic opacity-75 mt-2">
                Crafting visual identities for those who dare to stand out.
              </p>
            </div>

            {/* Middle / Right: Fast Contact Form & Socials (Row-wise, Right-Aligned) */}
            <div className="w-full lg:w-auto flex flex-col items-start lg:items-end gap-8">
              {/* Minimal inline dispatch input */}
              <form onSubmit={handleSubmit} className="w-full sm:w-80 flex items-center border-b border-[#7e0200]/30 pb-2">
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

              {/* Row-wise Right-Aligned Links */}
              <div className="flex flex-wrap items-center gap-6 text-xs font-sans uppercase tracking-widest">
                <Link to="/about" className="hover:opacity-60 transition-opacity">
                  About Studio
                </Link>
                <a
                  href="https://www.instagram.com/thechetandco/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-60 transition-opacity flex items-center gap-1.5"
                >
                  <Instagram className="w-3.5 h-3.5" /> Instagram
                </a>
                <a
                  href="https://www.linkedin.com/company/the-chet-co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-60 transition-opacity flex items-center gap-1.5"
                >
                  <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                </a>
                <Link to="/privacy" className="hover:opacity-60 transition-opacity">
                  Privacy
                </Link>
              </div>

              {/* Copyright */}
              <div className="text-[10px] font-sans uppercase tracking-widest opacity-50">
                © {new Date().getFullYear()} THE CHET &amp; CO. • ALL RIGHTS RESERVED
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
