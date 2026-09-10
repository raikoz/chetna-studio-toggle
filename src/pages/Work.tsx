import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Projects } from "@/components/Projects";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Work() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground transition-mode overflow-x-hidden selection:bg-foreground selection:text-background relative">
      <Header />

      {/* Floating Back Link */}
      <Link
        to="/"
        className="fixed bottom-8 left-8 z-50 px-5 py-3 bg-foreground text-background text-xs font-sans font-medium uppercase tracking-widest hover:opacity-85 transition-opacity flex items-center gap-2 rounded-[8px] shadow-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Studio</span>
      </Link>

      <div className="pt-24">
        <Projects />
      </div>

      <Footer />
    </main>
  );
}
