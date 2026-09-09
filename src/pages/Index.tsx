import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Testimonials } from "@/components/Testimonials";
import { SocialPresence } from "@/components/SocialPresence";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground transition-mode">
      <Header />
      <Hero />
      <Projects />
      <Testimonials />
      <SocialPresence />
      <Footer />
    </main>
  );
};

export default Index;
