import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useBooking } from "@/contexts/BookingContext";

interface ArticleData {
  title: string;
  tag: string;
  date: string;
  image: string;
  paragraphs: string[];
}

const ARTICLES: Record<string, ArticleData> = {
  "rebrand-anatomy": {
    title: "The Anatomy of a High-Conviction Rebrand",
    tag: "Brand Architecture",
    date: "September 2025",
    image: "/images/montage-5.jpg",
    paragraphs: [
      "A true rebrand is never about swapping a logo or changing the primary hex code on your website. When a company undergoes a high-conviction transformation, it fundamentally reorganizes its relationship with culture, shedding legacy compromises to articulate an unshakeable point of view.",
      "The most potent brand transformations happen when founders recognize that safe consensus produces invisible companies. By stripping away decorative clutter and anchoring the visual system in bold typography, distinctive art direction, and tactile gravity, a brand shifts from merely participating in a category to defining its terms.",
      "In our studio practice, we treat rebranding as cultural engineering. We build living design architectures that empower teams to execute fearlessly across digital drops, physical packaging, and public physical spaces without ever needing committee permission.",
    ],
  },
  "fault-in-our-ops": {
    title: "Why Most Brand Guidelines Die on Slide 12",
    tag: "Design Operations",
    date: "August 2025",
    image: "/images/about-2.jpg",
    paragraphs: [
      "Most corporate brand guidelines are mausoleums for dead creative ideas. They arrive as monolithic 80-page PDFs full of rigid grid rules, forbidden gradient combinations, and theoretical logo safe-zones that no marketing team or agency partner ever opens after week two.",
      "When systems are built as bureaucratic guardrails rather than creative springboards, teams naturally bypass them. The secret to enduring design systems is radical simplicity: provide clear typographic hierarchies, distinctive color relationships, and visceral photographic tone, then give creators the latitude to improvise with conviction.",
      "We design brand operational guidelines to be lived, not archived. Breathable design systems treat guidelines like musical chord charts—providing the foundational structure so the ensemble can play with soul and agility.",
    ],
  },
  "the-gathering": {
    title: "The Gathering: Notes from the Founder Salon",
    tag: "Leadership & Culture",
    date: "July 2025",
    image: "/images/montage-7.jpg",
    paragraphs: [
      "Last month, we brought together twelve founders, cultural organizers, and independent creators into an intimate room for 'The Gathering.' Stripped of corporate networking formalities and slide decks, the conversation quickly converged on a shared realization: building something authentic in an era of algorithmic sameness is an act of defiance.",
      "The founders spoke candidly about the friction between scaling fast and preserving the soul of their craft. In every case, the brands that commanded fanatical loyalty were the ones that refused to dilute their voice for the median customer, opting instead to double down on raw specificity and handcrafted detail.",
      "The Gathering reinforced our founding philosophy at TheChet&Co. True cultural resonance cannot be automated or focus-grouped into existence; it is forged through high conviction, direct founder involvement, and intimate human rooms.",
    ],
  },
  "physical-community": {
    title: "Sofar Sounds: Physical Rooms, Digital Resonance",
    tag: "Community Artifacts",
    date: "June 2025",
    image: "/images/montage-9.jpg",
    paragraphs: [
      "In an increasingly digitized world where experiences are consumed through six-inch glass screens, the hunger for physical, tactile presence has never been more intense. Our collaboration with Sofar Sounds Bhubaneswar was rooted in creating visceral rooms where music and human community collide without digital distraction.",
      "Every physical touchpoint—from silkscreened entry stamps and handwritten artifact cards to ambient warm lighting—was designed to remind attendees of the gravity of being present in the room together. When people feel real human energy, they don't just attend an event; they become evangelists for the movement.",
      "Great digital brands recognize that physical gravity is their ultimate competitive moat. When your offline footprint carries genuine warmth and tactile beauty, your digital storytelling resonates tenfold.",
    ],
  },
};

export default function JournalPost() {
  const { id } = useParams();
  const { openBookingModal } = useBooking();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const article = (id && ARTICLES[id]) || {
    title: id ? id.replace(/-/g, " ").toUpperCase() : "Studio Dispatch",
    tag: "Editorial",
    date: "Recent Dispatch",
    image: "/images/montage-5.jpg",
    paragraphs: [
      "Every creative project begins with an inquiry: what would this look like if we had zero fear of being misunderstood? In our studio work, we pursue ideas that command attention through clarity and conviction.",
      "When form follows conviction, the resulting artifacts don't just occupy space—they establish an emotional gravitational pull that turns casual onlookers into devoted followers.",
      "We continue to document our insights, experiments, and reflections as we collaborate with courageous founders and creators around the globe.",
    ],
  };

  return (
    <main className="min-h-screen bg-background text-foreground transition-mode overflow-x-hidden selection:bg-foreground selection:text-background relative">
      <Header />

      {/* Floating Back Link */}
      <Link
        to="/journal"
        className="fixed bottom-8 left-8 z-50 px-5 py-3 bg-foreground text-background text-xs font-sans font-medium uppercase tracking-widest hover:opacity-85 transition-opacity flex items-center gap-2 group rounded-[8px] shadow-sm"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span>Back to Journal</span>
      </Link>

      <article className="container mx-auto px-6 pt-36 pb-32 max-w-4xl">
        {/* Breadcrumb Top Bar */}
        <div className="flex items-center justify-between border-b border-foreground/10 pb-4 mb-12 text-xs font-sans uppercase tracking-widest opacity-60">
          <Link to="/journal" className="hover:opacity-100 transition-opacity flex items-center gap-2">
            <span>←</span> All Dispatches
          </Link>
          <span>{article.tag} • {article.date}</span>
        </div>

        {/* Title */}
        <AnimatedSection className="mb-10">
          <span className="text-[10px] font-sans uppercase tracking-[0.3em] opacity-50 block mb-3">
            {article.tag}
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-light tracking-tight leading-[1.05] uppercase">
            {article.title}
          </h1>
        </AnimatedSection>

        {/* Hero Image: Full Fit to Width */}
        <AnimatedSection delay={0.1} className="mb-14">
          <div className="rounded-[10px] overflow-hidden bg-foreground/5 w-full">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-auto object-cover max-h-[580px]"
            />
          </div>
        </AnimatedSection>

        {/* 2-3 Paragraphs Simple Narrative */}
        <AnimatedSection delay={0.2}>
          <div className="max-w-2xl space-y-6 text-sm sm:text-base font-sans leading-relaxed text-foreground/85 border-t border-foreground/10 pt-8">
            {article.paragraphs.map((para, i) => (
              <p key={i} className="leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </AnimatedSection>

        {/* Author / Studio Signoff */}
        <AnimatedSection delay={0.3} className="pt-12 mt-12 border-t border-foreground/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <p className="text-xs font-sans font-medium uppercase tracking-wider">
                Chetna Pattnaik
              </p>
              <p className="text-xs font-serif italic opacity-60 mt-0.5">
                Founder &amp; Creative Director, TheChet&amp;Co
              </p>
            </div>

            <button
              type="button"
              onClick={openBookingModal}
              className="px-6 py-3 bg-foreground text-background text-xs font-sans uppercase tracking-widest font-semibold rounded-[8px] hover:opacity-85 transition-opacity flex items-center gap-2 cursor-pointer"
            >
              <span>Commence Consultation</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </AnimatedSection>
      </article>

      <Footer />
    </main>
  );
}
