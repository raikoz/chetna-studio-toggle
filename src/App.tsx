import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ModeProvider } from "@/contexts/ModeContext";
import { BookingProvider } from "@/contexts/BookingContext";
import { GetInTouchModal } from "@/components/GetInTouchModal";
import { CustomCursor } from "@/components/CustomCursor";
import Index from "./pages/Index";
import Work from "./pages/Work";
import Services from "./pages/Services";
import About from "./pages/About";
import JournalPage from "./pages/JournalPage";
import JournalPost from "./pages/JournalPost";
import FaqPage from "./pages/FaqPage";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import ProjectPage from "./pages/ProjectPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ModeProvider>
        <BookingProvider>
          <CustomCursor />
          <Toaster />
          <Sonner />
          <GetInTouchModal />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/work" element={<Work />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<About />} />
              <Route path="/journal" element={<JournalPage />} />
              <Route path="/journal/:id" element={<JournalPost />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/project/:id" element={<ProjectPage />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </BookingProvider>
      </ModeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
