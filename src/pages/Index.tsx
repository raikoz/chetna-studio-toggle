import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Testimonials } from "@/components/Testimonials";
import { SocialPresence } from "@/components/SocialPresence";
import { InstagramFeed } from "@/components/InstagramFeed";
import { Footer } from "@/components/Footer";
import { useMode } from "@/contexts/ModeContext";

const Index = () => {
  const { mode } = useMode();

  return (
    <main className="min-h-screen bg-background text-foreground transition-mode">
      <Header />
      <Hero />
      
      {/* Show Projects, Testimonials, SocialPresence & InstagramFeed ONLY on the Design Studio page */}
      {mode === "studio" && (
        <>
          <Projects />
          <Testimonials />
          <SocialPresence />
          <InstagramFeed />
        </>
      )}

      <Footer />
    </main>
  );
};

export default Index;
