import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ShieldCheck, ArrowLeft, Lock, Eye, FileText, Server } from "lucide-react";

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground transition-mode selection:bg-foreground selection:text-background">
      <Header />

      <div className="container mx-auto px-6 pt-40 pb-24">
        {/* Navigation Back Link */}
        <div className="mb-12">
          <Link
            to="/"
            className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] font-medium opacity-60 hover:opacity-100 transition-opacity"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Studio Home</span>
          </Link>
        </div>

        {/* Hero Banner */}
        <div className="max-w-4xl mb-16">
          <p className="text-xs uppercase tracking-[0.4em] opacity-50 font-bold mb-4">
            Legal & Governance
          </p>
          <h1 className="text-5xl md:text-7xl font-serif font-light mb-6 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-lg opacity-80 leading-relaxed font-serif italic">
            At The Chet & Co. Design Studio & Consultancy, we handle your personal data and creative inquiries with absolute confidentiality, precision, and respect.
          </p>
          <p className="text-xs opacity-40 uppercase tracking-widest mt-4">
            Last Updated: September 2026 • Effective Immediately
          </p>
        </div>

        <hr className="border-foreground/10 mb-16" />

        {/* Policy Content */}
        <div className="max-w-4xl space-y-16 text-foreground/90 font-light leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-serif flex items-center gap-3">
              <Eye className="w-5 h-5 opacity-60" /> 1. Information We Collect
            </h2>
            <p className="opacity-80">
              When you interact with The Chet & Co. website, schedule a consultation call, or submit a lead inquiry form, we collect information necessary to deliver high-touch creative services:
            </p>
            <ul className="list-disc list-inside space-y-2 opacity-80 pl-4">
              <li><strong>Contact Identifiers:</strong> Your full name, email address, and telephone number provided during consultation bookings.</li>
              <li><strong>Consultation Details:</strong> Preferred booking dates, 45-minute time slots, and optional project briefs or design notes.</li>
              <li><strong>Automated Metadata:</strong> Non-personally identifiable browser analytics, IP address, and session interaction data to optimize website performance.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-serif flex items-center gap-3">
              <Lock className="w-5 h-5 opacity-60" /> 2. Purpose & Use of Data
            </h2>
            <p className="opacity-80">
              Your personal information is utilized strictly for professional studio operations and service delivery:
            </p>
            <ul className="list-disc list-inside space-y-2 opacity-80 pl-4">
              <li>Generating auto-configured Google Meet Video links and dispatching calendar invitations for your 45-minute consultation calls.</li>
              <li>Notifying studio lead Chetna Pattnaik (<span className="underline">thechet.pattnaik@gmail.com</span>) of incoming inquiries and scheduled strategy sessions.</li>
              <li>Formulating tailored proposals, NDA agreements, and brand identity roadmaps.</li>
              <li>We <strong>never sell, rent, or trade</strong> your contact information to any third-party marketing brokers.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-serif flex items-center gap-3">
              <Server className="w-5 h-5 opacity-60" /> 3. Third-Party Integrations & Storage
            </h2>
            <p className="opacity-80">
              To provide real-time scheduling and seamless digital communication, our platform interfaces with secure cloud infrastructure:
            </p>
            <ul className="list-disc list-inside space-y-2 opacity-80 pl-4">
              <li><strong>Google Workspace & Meet:</strong> Used for generating video conference URLs and managing calendar invitations.</li>
              <li><strong>Google Sheets & Webhook Scripts:</strong> Encrypted serverless endpoints used to record lead form submissions in real-time.</li>
              <li><strong>Instagram Live Grid:</strong> Real-time display of public studio media via standard API endpoints without tracking individual visitors.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-serif flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 opacity-60" /> 4. Client Confidentiality & NDAs
            </h2>
            <p className="opacity-80">
              All initial consultation disclosures, brand strategies, unreleased product information, and strategic assets shared during design calls are held under strict professional confidentiality. Separate Mutual Non-Disclosure Agreements (MNDAs) are executed prior to onboarding major brand identity projects upon request.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-serif flex items-center gap-3">
              <FileText className="w-5 h-5 opacity-60" /> 5. Your Rights & Data Inquiries
            </h2>
            <p className="opacity-80">
              You retain full rights to request access to, modification of, or complete erasure of your personal data stored in our records. For any privacy requests or inquiries, please contact studio management at:
            </p>
            <div className="p-6 border border-foreground/20 bg-foreground/5 space-y-1 text-sm font-mono">
              <p>The Chet & Co. Design Studio & Consultancy</p>
              <p>Email: <a href="mailto:thechet.pattnaik@gmail.com" className="underline">thechet.pattnaik@gmail.com</a></p>
              <p>Instagram: <a href="https://www.instagram.com/thechetandco/" target="_blank" rel="noopener noreferrer" className="underline">@thechetandco</a></p>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
