import { Instagram, Linkedin, ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "./Logo";

export function Footer() {
  const marqueeText = "THECHETANDCO • DESIGN STUDIO & CONSULTANCY • CREATIVE DIRECTION • BRAND IDENTITY • IT IS ONLY DELUSIONAL UNTIL IT WORKS • ";
  const repeatedText = marqueeText.repeat(3);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageHovered, setImageHovered] = useState(false);

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
        description: "Your message has been dispatched to manish.rath5240@gmail.com and CC'd to thechet.pattnaik@gmail.com. We'll reach out shortly.",
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
      {/* Non-linear Noisy Gradient Transition from Dark Red into Crisp White */}
      <div className="relative w-full h-36 md:h-48 noisy-gradient-to-light overflow-hidden">
        <div className="absolute inset-0 noise-overlay pointer-events-none" />
      </div>

      {/* Bauhaus Light-Themed Flat Footer */}
      <footer className="relative bg-white text-[#7e0200] border-t border-[#7e0200]/20 pt-16 pb-12 overflow-hidden">
        {/* Marquee Animation */}
        <div className="relative mb-16 border-b border-[#7e0200]/15 pb-6 overflow-hidden">
          <div className="flex whitespace-nowrap animate-marquee">
            <span className="text-3xl md:text-5xl lg:text-6xl font-sans font-light uppercase tracking-tight opacity-15 mr-4">
              {repeatedText}
            </span>
            <span className="text-3xl md:text-5xl lg:text-6xl font-sans font-light uppercase tracking-tight opacity-15 mr-4">
              {repeatedText}
            </span>
          </div>
        </div>

        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20 items-start">
            {/* Left: Flat Lead Form & Logo */}
            <div className="lg:col-span-5 max-w-lg">
              <div className="mb-8">
                <Logo className="h-10 w-auto text-[#7e0200] mb-3" />
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] opacity-60">
                  DESIGN STUDIO &amp; CONSULTANCY • EST. 2024
                </p>
              </div>

              <h3 className="text-3xl md:text-4xl font-serif italic mb-3 text-[#7e0200]">
                Start a conversation
              </h3>
              <p className="text-xs md:text-sm opacity-75 mb-8 tracking-wide font-sans leading-relaxed text-[#7e0200]">
                Leave your details below and tell us how we can bring your vision into sharp reality.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="YOUR NAME *"
                    required
                    className="w-full bg-transparent border-b border-[#7e0200]/30 py-3 outline-none focus:border-[#7e0200] transition-colors placeholder:text-[#7e0200]/40 text-xs font-mono tracking-widest uppercase text-[#7e0200]"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="EMAIL ADDRESS *"
                    required
                    className="w-full bg-transparent border-b border-[#7e0200]/30 py-3 outline-none focus:border-[#7e0200] transition-colors placeholder:text-[#7e0200]/40 text-xs font-mono tracking-widest uppercase text-[#7e0200]"
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    rows={3}
                    placeholder="TELL US ABOUT YOUR BRAND / PROJECT *"
                    required
                    className="w-full bg-transparent border-b border-[#7e0200]/30 py-3 outline-none focus:border-[#7e0200] transition-colors placeholder:text-[#7e0200]/40 text-xs font-mono tracking-widest uppercase text-[#7e0200] resize-none"
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#7e0200] text-white text-xs font-mono tracking-widest uppercase font-bold hover:bg-[#5a0100] transition-colors flex items-center justify-center gap-3 disabled:opacity-40 cursor-pointer"
                >
                  <span>{isSubmitting ? "SENDING DISPATCH..." : "SEND MESSAGE"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Right: Flat Hover Image Artifact ("It is only delusional until it works") */}
            <div className="lg:col-span-7 flex flex-col justify-between h-full">
              {/* Flat Card */}
              <div 
                onMouseEnter={() => setImageHovered(true)}
                onMouseLeave={() => setImageHovered(false)}
                className="relative border border-[#7e0200]/30 p-4 bg-white mb-12 cursor-pointer transition-colors duration-200 hover:border-[#7e0200]"
              >
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#7e0200]/15 text-[10px] font-mono uppercase tracking-widest">
                  <span className="font-bold flex items-center gap-1.5 text-[#7e0200]">
                    <Sparkles className="w-3.5 h-3.5" /> STUDIO MOTTO ARTIFACT
                  </span>
                  <span className="opacity-60 text-[#7e0200]">HOVER TO REVEAL</span>
                </div>

                <div className="relative aspect-[4/3] md:aspect-[16/9] overflow-hidden bg-[#7e0200]/[0.03] border border-[#7e0200]/15 flex items-center justify-center">
                  <img
                    src="/images/footer.jpg"
                    alt="It is only delusional until it works - TheChet&Co"
                    className={`w-full h-full object-contain p-6 transition-transform duration-500 ease-out ${
                      imageHovered ? "scale-105" : "scale-100 opacity-90"
                    }`}
                  />

                  {/* Clean Flat Stamp Overlay */}
                  <div className="absolute bottom-3 right-3 bg-white border border-[#7e0200] px-3 py-1 text-[9px] font-mono uppercase tracking-widest text-[#7e0200] font-bold">
                    THECHET&amp;CO // OFFICIAL CREED
                  </div>
                </div>

                <p className="mt-3 text-xs font-mono uppercase tracking-wider text-[#7e0200] opacity-80 flex items-center justify-between">
                  <span>PLATE 09: HANDWRITTEN REVELATION</span>
                  <span>CHETNA PATTNAIK</span>
                </p>
              </div>

              {/* Flat Social Links & Navigation */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-[#7e0200]/15 pt-8 gap-6">
                <div className="flex items-center gap-8 text-xs font-mono uppercase tracking-widest">
                  <Link to="/about" className="hover:underline font-bold text-[#7e0200]">
                    About Studio
                  </Link>
                  <a 
                    href="https://www.instagram.com/thechetandco/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:underline flex items-center gap-1.5 text-[#7e0200]"
                  >
                    <Instagram className="w-3.5 h-3.5" /> Instagram
                  </a>
                  <a 
                    href="https://www.linkedin.com/company/the-chet-co" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:underline flex items-center gap-1.5 text-[#7e0200]"
                  >
                    <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                  </a>
                </div>

                <div className="text-[10px] font-mono uppercase tracking-widest opacity-60 text-[#7e0200]">
                  BHUBANESWAR • WORLDWIDE
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Flat Copyright Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-[#7e0200]/15 gap-4 text-[10px] font-mono uppercase tracking-widest text-[#7e0200] opacity-70">
            <div>
              © {new Date().getFullYear()} THE CHET &amp; CO. ALL RIGHTS RESERVED.
            </div>
            <div className="flex items-center gap-6">
              <Link to="/privacy" className="hover:underline">
                PRIVACY POLICY
              </Link>
              <span>•</span>
              <span>BAUHAUS FLAT ARCHITECTURE</span>
              <span>•</span>
              <span>CRAFTED WITH INTENTION</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
