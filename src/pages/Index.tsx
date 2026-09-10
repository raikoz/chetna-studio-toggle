import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { CoreSkills } from "@/components/CoreSkills";
import { Testimonials } from "@/components/Testimonials";
import { Journal } from "@/components/Journal";
import { FAQ } from "@/components/FAQ";
import { SocialPresence } from "@/components/SocialPresence";
import { InstagramFeed } from "@/components/InstagramFeed";
import { Footer } from "@/components/Footer";
import { useMode } from "@/contexts/ModeContext";

const Index = () => {
  const { mode } = useMode();

  return (
    <main className="min-h-screen bg-background text-foreground transition-mode selection:bg-foreground selection:text-background">
      <Header />
      <Hero />
      
      {/* Studio Mode Sections */}
      {mode === "studio" && (
        <>
          <Projects />
          <CoreSkills />
          <Testimonials />
          <Journal />
          <FAQ />
          <SocialPresence />
          <InstagramFeed />
        </>
      )}

      {/* Personal Mode: Curated Direct Presence */}
      {mode === "personal" && (
        <>
          <FAQ />
          <SocialPresence />
        </>
      )}

      <Footer />
    </main>
  );
};

export default Index;
