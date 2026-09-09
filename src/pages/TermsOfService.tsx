import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Scale, ArrowLeft, Clock, Award, FileCheck, AlertCircle } from "lucide-react";

export default function TermsOfService() {
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
            Terms of Service
          </h1>
          <p className="text-lg opacity-80 leading-relaxed font-serif italic">
            Terms and conditions governing consultancy sessions, brand identity services, and website usage for The Chet & Co. Design Studio & Consultancy.
          </p>
          <p className="text-xs opacity-40 uppercase tracking-widest mt-4">
            Last Updated: September 2026 • Effective Immediately
          </p>
        </div>

        <hr className="border-foreground/10 mb-16" />

        {/* Terms Content */}
        <div className="max-w-4xl space-y-16 text-foreground/90 font-light leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-serif flex items-center gap-3">
              <Award className="w-5 h-5 opacity-60" /> 1. Scope of Studio & Consultancy Services
            </h2>
            <p className="opacity-80">
              The Chet & Co., founded by Creative Director Chetna Pattnaik, provides high-end brand identity design, strategic consultation, visual experience creation, and creative direction. All engagement terms, deliverables, timelines, and payment retainers are outlined in client-specific Master Service Agreements (MSAs) or Statements of Work (SOWs).
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-serif flex items-center gap-3">
              <Clock className="w-5 h-5 opacity-60" /> 2. Consultation Call Scheduling & Buffer Policy
            </h2>
            <p className="opacity-80">
              To ensure focused, high-value strategy sessions, consultation calls booked through our platform adhere to strict operational parameters:
            </p>
            <ul className="list-disc list-inside space-y-2 opacity-80 pl-4">
              <li><strong>Call Duration:</strong> Each scheduled consultation session is allotted exactly <strong>45 minutes</strong>.</li>
              <li><strong>Daily Slot Caps:</strong> Weekdays (Monday through Friday) and Saturdays are capped at <strong>maximum 4 calls per day</strong>. Sundays are capped at <strong>maximum 6 calls per day</strong>.</li>
              <li><strong>Buffer Requirement:</strong> A <strong>minimum 15-minute rest/preparation break</strong> is automatically enforced between consecutive bookings.</li>
              <li><strong>Rescheduling & Cancellations:</strong> Clients must provide at least 12 hours' notice prior to the scheduled slot to reschedule a call.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-serif flex items-center gap-3">
              <Scale className="w-5 h-5 opacity-60" /> 3. Intellectual Property & Brand Rights
            </h2>
            <p className="opacity-80">
              All concepts, custom typography, visual systems, strategy frameworks, and original artwork created by The Chet & Co. remain the intellectual property of Chetna Pattnaik until final project completion and full settlement of invoice retainers. Upon final payment, customized brand assets are transferred according to agreed licensing scopes.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-serif flex items-center gap-3">
              <FileCheck className="w-5 h-5 opacity-60" /> 4. Client Conduct & Submissions
            </h2>
            <p className="opacity-80">
              When submitting inquiry forms or engaging in strategy sessions, clients agree to provide accurate information and refrain from submitting unauthorized copyrighted material, malicious code, or defamatory content. The Chet & Co. reserves the right to decline project inquiries at its discretion.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-serif flex items-center gap-3">
              <AlertCircle className="w-5 h-5 opacity-60" /> 5. Limitation of Liability & Contact
            </h2>
            <p className="opacity-80">
              The Chet & Co. makes reasonable efforts to ensure website availability and accurate scheduling. However, we shall not be held liable for indirect, incidental, or consequential damages resulting from third-party video conferencing interruptions or internet outages.
            </p>
            <div className="p-6 border border-foreground/20 bg-foreground/5 space-y-1 text-sm font-mono mt-4">
              <p>For questions regarding these Terms of Service:</p>
              <p>Email: <a href="mailto:thechet.pattnaik@gmail.com" className="underline">thechet.pattnaik@gmail.com</a></p>
              <p>LinkedIn: <a href="https://www.linkedin.com/company/the-chet-co" target="_blank" rel="noopener noreferrer" className="underline">The Chet & Co.</a></p>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
