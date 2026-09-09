import { useMode } from "@/contexts/ModeContext";
import { Instagram, Dribbble, Linkedin, Mail } from "lucide-react";

export function SocialPresence() {
  const { mode } = useMode();

  const studioSocials = [
    { icon: Instagram, label: "@thechetandco", href: "https://www.instagram.com/thechetandco/" },
    { icon: Dribbble, label: "Dribbble", href: "#" },
    { icon: Linkedin, label: "LinkedIn", href: "#" },
    { icon: Mail, label: "hello@thechetandco.com", href: "mailto:hello@thechetandco.com" },
  ];

  const personalSocials = [
    { icon: Instagram, label: "@the._.chet", href: "https://www.instagram.com/the._.chet/" },
    { icon: Dribbble, label: "Dribbble", href: "#" },
    { icon: Linkedin, label: "LinkedIn", href: "#" },
    { icon: Mail, label: "chetna@email.com", href: "mailto:chetna@email.com" },
  ];

  const socials = mode === "studio" ? studioSocials : personalSocials;

  return (
    <section id="contact" className="py-24 border-t border-foreground/10 transition-mode">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl">
          <p className="text-sm tracking-[0.3em] uppercase mb-4 opacity-60">
            Let's Connect
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-12">
            {mode === "studio" 
              ? "Ready to create something extraordinary?" 
              : "Let's create together"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {socials.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-6 border border-foreground/10 hover:border-foreground/30 hover:bg-foreground/5 transition-all duration-300 group"
              >
                <social.icon className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity" />
                <span className="text-lg">{social.label}</span>
                <span className="ml-auto opacity-0 group-hover:opacity-60 transition-opacity">
                  →
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
