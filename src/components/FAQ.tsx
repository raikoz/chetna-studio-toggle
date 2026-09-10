import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQS: FAQItem[] = [
  {
    question: "How does TheChet&Co differ from traditional creative agencies?",
    answer:
      "We operate as an agile design studio and consultancy. You work directly with Chetna and our core creative directors—no junior pass-offs or bureaucratic decks.",
    category: "Philosophy",
  },
  {
    question: "What does an identity or consulting engagement look like?",
    answer:
      "Our engagements span 4 to 8 weeks: from foundational Brand Architecture to Digital Drops, Campaign Motion, and Community Collateral.",
    category: "Process",
  },
  {
    question: "What is your philosophy on brand guidelines?",
    answer:
      "Guidelines should execute strategy, not replace it. We build living, breathable systems that founders and teams actually use.",
    category: "Operations",
  },
  {
    question: "Who do you partner with?",
    answer:
      "High-conviction founders, direct-to-consumer innovators, cultural organizers, hospitality spaces, and ambitious leaders.",
    category: "Clients",
  },
  {
    question: "How do we schedule a discovery consultation?",
    answer:
      "Use the 'Book a Discovery Call' button. You'll choose a 45-minute slot with Google Meet details automatically synced with Chetna's calendar.",
    category: "Getting Started",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 transition-mode relative">
      <div className="container mx-auto px-6">
        {/* Minimal Section Header */}
        <AnimatedSection className="mb-14">
          <div className="border-b border-foreground/10 pb-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light tracking-tight">
              Clarity &amp; Conviction
            </h2>
            <p className="text-xs font-mono uppercase tracking-widest opacity-50 mt-2">
              Frequently Questioned
            </p>
          </div>
        </AnimatedSection>

        {/* 2-Column Minimal Flat Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Soft Rounded Text Image */}
          <AnimatedSection direction="right" className="lg:col-span-5">
            <div className="rounded-[10px] overflow-hidden bg-white border border-foreground/10 p-3">
              <img
                src="/images/about-3.jpg"
                alt="The Chet & Co. Brand Ops & Strategy"
                className="w-full h-auto object-cover rounded-[6px]"
              />
            </div>
            <p className="mt-3 text-xs font-mono opacity-50 uppercase tracking-widest text-center">
              The Anti-Agency Playbook • Chetna Pattnaik
            </p>
          </AnimatedSection>

          {/* Right Column: Minimal Flat Accordion (No boxy borders) */}
          <div className="lg:col-span-7 divide-y divide-foreground/10">
            {FAQS.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <AnimatedSection key={index} delay={index * 0.05}>
                  <div className="py-5">
                    <button
                      type="button"
                      onClick={() => toggle(index)}
                      className="w-full text-left flex items-start justify-between gap-4 cursor-pointer group"
                    >
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest opacity-40 block mb-1">
                          {faq.category}
                        </span>
                        <h3 className="text-lg md:text-xl font-serif font-light group-hover:opacity-75 transition-opacity">
                          {faq.question}
                        </h3>
                      </div>
                      <div className="w-7 h-7 rounded-full border border-foreground/15 flex items-center justify-center flex-shrink-0 mt-1 group-hover:border-foreground/40 transition-colors">
                        {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <div className="pt-3 pr-8 text-sm md:text-base opacity-70 font-sans leading-relaxed">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
