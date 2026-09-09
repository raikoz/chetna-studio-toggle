import { Instagram, Linkedin, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "./Logo";

export function Footer() {
  const marqueeText = "THECHETANDCO • DESIGN STUDIO & CONSULTANCY • CREATIVE DIRECTION • BRAND IDENTITY • ";
  const repeatedText = marqueeText.repeat(4);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
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
          date: new Date().toISOString() 
        }),
        headers: { "Content-Type": "application/json" },
      });

      toast({
        title: "Conversation initiated",
        description: "Your message has been sent to manish.rath5240@gmail.com. We'll reach out shortly.",
      });
      
      (e.target as HTMLFormElement).reset();
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
    <footer className="py-20 border-t border-foreground/10 overflow-hidden transition-mode bg-background">
      {/* Marquee Animation */}
      <div className="relative mb-20">
        <div className="flex whitespace-nowrap animate-marquee">
          <span className="text-4xl md:text-6xl lg:text-8xl font-medium tracking-tight opacity-10 uppercase">
            {repeatedText}
          </span>
          <span className="text-4xl md:text-6xl lg:text-8xl font-medium tracking-tight opacity-10 uppercase">
            {repeatedText}
          </span>
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Left: Lead Form & Logo */}
          <div className="max-w-md">
            <div className="mb-6">
              <Logo className="h-14 w-auto text-foreground opacity-90 mb-4" />
            </div>
            <h3 className="text-3xl md:text-4xl font-serif italic mb-6">Start a conversation</h3>
            <p className="text-sm opacity-60 mb-8 tracking-wide">
              Leave your details below and tell us how we can help bring your vision to life.
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative group">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  required
                  className="w-full bg-transparent border-b border-foreground/20 py-3 outline-none focus:border-foreground transition-colors placeholder:text-foreground/30 text-sm tracking-widest uppercase"
                />
              </div>
              <div className="relative group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required
                  className="w-full bg-transparent border-b border-foreground/20 py-3 outline-none focus:border-foreground transition-colors placeholder:text-foreground/30 text-sm tracking-widest uppercase"
                />
              </div>
              <div className="relative group">
                <textarea
                  name="message"
                  rows={3}
                  placeholder="Tell us how we can help you..."
                  required
                  className="w-full bg-transparent border-b border-foreground/20 py-3 outline-none focus:border-foreground transition-colors placeholder:text-foreground/30 text-sm tracking-wide resize-none"
                ></textarea>
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-4 bg-foreground text-background text-xs tracking-widest uppercase font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-40 cursor-pointer"
              >
                <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Right: Links & Info */}
          <div className="flex flex-col justify-between items-start lg:items-end">
            <div className="flex flex-col items-start lg:items-end gap-6">
              <span className="text-[10px] uppercase tracking-[0.4em] opacity-40 font-bold mb-2">Connect</span>
              <a 
                href="https://www.instagram.com/thechetandco/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-2xl font-serif italic hover:opacity-60 transition-opacity"
              >
                <Instagram className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity" />
                Instagram
              </a>
              <a 
                href="https://www.linkedin.com/company/the-chet-co" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-2xl font-serif italic hover:opacity-60 transition-opacity"
              >
                <Linkedin className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-foreground/5 gap-6">
          <div className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-bold">
            © {new Date().getFullYear()} The Chet & Co. All rights reserved.
          </div>

          <div className="flex items-center gap-8 text-[10px] uppercase tracking-[0.3em] font-bold">
            <Link to="/privacy" className="opacity-40 hover:opacity-100 transition-opacity">
              Privacy
            </Link>
            <span className="opacity-20">
              Crafted with intention
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

