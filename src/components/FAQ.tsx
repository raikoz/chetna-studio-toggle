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
      "We operate as an agile design studio and consultancy rather than a bloated agency. You work directly with Chetna and our core creative directors—no junior pass-offs, no 30-page bureaucratic decks that gather dust. Every decision is driven by commercial clarity and cultural conviction.",
    category: "PHILOSOPHY",
  },
  {
    question: "What does an identity or consulting engagement look like?",
    answer:
      "Our engagements typically span 4 to 8 weeks depending on scope: from foundational Brand Architecture and Visual Identity Systems to Digital Drops, Campaign Motion, and Community Collateral. We deliver working systems, not static PDF rulebooks.",
    category: "PROCESS",
  },
  {
    question: "What is your philosophy on brand guidelines and SOPs?",
    answer:
      "Guidelines should execute strategy, not replace it. We build living, breathable systems that founders and in-house teams can immediately use in the wild. If an SOP requires a manual to decode, it is broken.",
    category: "OPERATIONS",
  },
  {
    question: "Who do you partner with?",
    answer:
      "High-conviction founders, direct-to-consumer innovators, cultural organizers, hospitality spaces, and ambitious leaders who want to be remembered rather than merely noticed.",
    category: "CLIENTS",
  },
  {
    question: "How do we schedule a discovery consultation?",
    answer:
      "Use the 'Book a Discovery Call' button in the header or hero. You'll choose a dedicated 45-minute slot, receive an auto-generated Google Meet link, and an invitation directly synced with Chetna's calendar.",
    category: "GETTING STARTED",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-28 border-t border-foreground/15 transition-mode relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <AnimatedSection className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-foreground/15 pb-6">
            <div>
              <p className="text-[11px] font-mono uppercase tracking-[0.3em] opacity-60 mb-2">
                05 / FREQUENTLY QUESTIONED
              </p>
              <h2 className="text-4xl md:text-6xl font-serif font-light tracking-tight">
                Clarity &amp; Conviction
              </h2>
            </div>
            <p className="text-xs font-mono uppercase tracking-widest opacity-60 max-w-sm">
              Answers to how we think, build, and deliver without agency noise.
            </p>
          </div>
        </AnimatedSection>

        {/* 2-Column Bauhaus Flat Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Flat Artifact Panel */}
          <AnimatedSection direction="right" className="lg:col-span-5">
            <div className="border border-foreground/20 bg-background p-4 hover:border-foreground transition-colors duration-200">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-foreground/15 text-[10px] font-mono uppercase tracking-widest">
                <span className="font-bold">
                  STUDIO ARTIFACT / REF 03
                </span>
                <span className="opacity-60">
                  EST. 2024
                </span>
              </div>
              <div className="relative overflow-hidden border border-foreground/10 bg-white">
                <img
                  src="/images/about-3.jpg"
                  alt="The Chet & Co. Manifesto on Brand Ops and Strategy"
                  className="w-full h-auto object-cover transition-transform duration-500 hover:scale-[1.02]"
                />
              </div>
              <div className="pt-4 flex items-center justify-between text-xs font-mono opacity-70">
                <span>THE ANTI-AGENCY PLAYBOOK</span>
                <span>CHETNA PATTNAIK</span>
              </div>
            </div>
          </AnimatedSection>

          {/* Right Column: Bauhaus Flat Accordion */}
          <div className="lg:col-span-7 space-y-4">
            {FAQS.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <AnimatedSection key={index} delay={index * 0.06}>
                  <div className="border border-foreground/20 bg-background transition-colors hover:border-foreground">
                    <button
                      type="button"
                      onClick={() => toggle(index)}
                      className="w-full text-left p-6 flex items-start justify-between gap-4 cursor-pointer"
                    >
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 border border-foreground/30 inline-block opacity-60">
                          {faq.category}
                        </span>
                        <h3 className="text-lg md:text-xl font-sans font-medium uppercase tracking-tight pr-4">
                          {faq.question}
                        </h3>
                      </div>
                      <div className="w-8 h-8 border border-foreground/30 flex items-center justify-center flex-shrink-0 mt-1">
                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: [0.25, 0.4, 0.25, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="p-6 pt-0 border-t border-foreground/10 text-sm md:text-base opacity-75 font-sans leading-relaxed">
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
