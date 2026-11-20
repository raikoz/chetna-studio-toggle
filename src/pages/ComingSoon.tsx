import React from "react";
import { motion } from "framer-motion";
import { Logo } from "@/components/Logo";
import { ArrowUpRight, Mail, Instagram, Linkedin } from "lucide-react";

export default function ComingSoon() {
  return (
    <div className="min-h-screen bg-[#3a0201] text-[#fdfbf7] flex flex-col justify-between relative overflow-hidden selection:bg-[#fdfbf7] selection:text-[#3a0201]">
      {/* Ambient background glow and soft lighting */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 opacity-40"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(184, 41, 38, 0.35) 0%, rgba(58, 2, 1, 0) 70%)"
        }}
      />
      <div 
        className="pointer-events-none absolute inset-0 z-0 opacity-15"
        style={{
          backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)",
          backgroundSize: "32px 32px"
        }}
      />

      {/* Top Header Bar */}
      <header className="relative z-10 w-full px-6 md:px-12 py-8 flex items-center justify-between border-b border-white/10">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3"
        >
          <Logo className="h-9 w-auto text-[#fdfbf7]" tight embossed />
          <span className="text-xs uppercase tracking-[0.25em] font-sans font-medium text-white/80 border-l border-white/20 pl-3">
            TheChet&Co
          </span>
        </motion.div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-16 md:py-24 text-center max-w-4xl mx-auto">
        {/* Status Pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-md mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white/90" />
          </span>
          <span className="text-[11px] uppercase tracking-[0.22em] font-sans text-white/80 font-medium">
            Work in Progress
          </span>
        </motion.div>

        {/* Centerpiece Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-8"
        >
          <Logo 
            className="w-36 md:w-48 h-auto mx-auto text-[#fdfbf7]" 
            tight 
            embossed 
          />
        </motion.div>

        {/* Brand Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl sm:text-6xl md:text-7xl font-serif font-light tracking-tight text-[#fdfbf7] leading-[1.1] mb-6"
        >
          A new chapter is taking shape.
        </motion.h1>

        {/* Subtitle / Brand Statement */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-lg md:text-xl font-serif italic text-white/75 max-w-xl mx-auto mb-10 leading-relaxed"
        >
          TheChet&Co is currently refining its studio archives and digital presence. 
          We craft brand identities, art direction, and bespoke creative solutions.
        </motion.p>

        {/* Single CTA: Talk to Us -> Instagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex items-center justify-center w-full"
        >
          <a
            href="https://www.instagram.com/thechetandco/"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-dark="true"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#fdfbf7] text-[#3a0201] text-xs uppercase tracking-widest font-sans font-semibold hover:bg-white transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] cursor-pointer"
          >
            <span>Talk to Us</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full px-6 md:px-12 py-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-sans text-white/60 tracking-wider">
        <div className="flex items-center gap-2">
          <span>TheChet&Co · Studio & Art Direction</span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://www.instagram.com/thechetandco/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors inline-flex items-center gap-1.5"
          >
            <Instagram className="w-3.5 h-3.5" />
            <span>@thechetandco</span>
          </a>
          <a
            href="https://www.linkedin.com/company/the-chet-co"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors inline-flex items-center gap-1.5"
          >
            <Linkedin className="w-3.5 h-3.5" />
            <span>LinkedIn</span>
          </a>
          <a
            href="mailto:hello@thechetandco.com"
            className="hover:text-white transition-colors inline-flex items-center gap-1.5"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>hello@thechetandco.com</span>
          </a>
        </div>

        <div>
          <span>© {new Date().getFullYear()} TheChet&Co. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
