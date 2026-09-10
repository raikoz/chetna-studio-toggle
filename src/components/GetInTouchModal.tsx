import { useState, useMemo } from "react";
import { useBooking } from "@/contexts/BookingContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Calendar, Clock, Video, CheckCircle2, Copy, ExternalLink, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw2Q6yswt5YxiXQwtdXIpN3ilDMZ9csprLiv4RYoaFpDMqIlXasWMypSm7IcIrlLTx3/exec";
const PRIMARY_OWNER_EMAIL = "manish.rath5240@gmail.com";
const CHETNA_EMAIL = "thechet.pattnaik@gmail.com";

// 45 mins call duration + 15 mins minimum break
const WEEKDAY_SLOTS = [
  { label: "10:00 AM – 10:45 AM", value: "10:00 AM" },
  { label: "11:00 AM – 11:45 AM", value: "11:00 AM" },
  { label: "02:00 PM – 02:45 PM", value: "02:00 PM" },
  { label: "03:00 PM – 03:45 PM", value: "03:00 PM" },
];

const SUNDAY_SLOTS = [
  { label: "10:00 AM – 10:45 AM", value: "10:00 AM" },
  { label: "11:00 AM – 11:45 AM", value: "11:00 AM" },
  { label: "12:00 PM – 12:45 PM", value: "12:00 PM" },
  { label: "02:00 PM – 02:45 PM", value: "02:00 PM" },
  { label: "03:00 PM – 03:45 PM", value: "03:00 PM" },
  { label: "04:00 PM – 04:45 PM", value: "04:00 PM" },
];

export function GetInTouchModal() {
  const { isBookingOpen, closeBookingModal } = useBooking();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    slot: "",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedBooking, setSubmittedBooking] = useState<{
    name: string;
    phone: string;
    email: string;
    date: string;
    slot: string;
    gmeetLink: string;
    calendarUrl: string;
  } | null>(null);

  // Compute available slots based on selected date
  const availableSlots = useMemo(() => {
    if (!formData.date) return WEEKDAY_SLOTS;
    const selectedDate = new Date(formData.date);
    const isSunday = selectedDate.getDay() === 0;
    return isSunday ? SUNDAY_SLOTS : WEEKDAY_SLOTS;
  }, [formData.date]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClose = () => {
    setSubmittedBooking(null);
    closeBookingModal();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email || !formData.date || !formData.slot) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields to schedule your consultation.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Auto-generate a unique Google Meet link
      const randomCode = `${Math.random().toString(36).substring(2, 5)}-${Math.random().toString(36).substring(2, 6)}-${Math.random().toString(36).substring(2, 5)}`;
      const gmeetLink = `https://meet.google.com/${randomCode}`;

      // Build Google Calendar Add Event URL inviting owner & guest
      const calendarTitle = encodeURIComponent(`Consultation: ${formData.name} & Chetna Pattnaik`);
      const calendarDetails = encodeURIComponent(
        `Consultation Session with Chetna Pattnaik (TheChet&Co Design Studio)\n\n` +
        `Client Name: ${formData.name}\n` +
        `Phone: ${formData.phone}\n` +
        `Email: ${formData.email}\n` +
        `Google Meet Link: ${gmeetLink}\n` +
        (formData.notes ? `Notes: ${formData.notes}\n` : "")
      );
      
      const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${calendarTitle}&details=${calendarDetails}&add=${encodeURIComponent(PRIMARY_OWNER_EMAIL)}&add=${encodeURIComponent(CHETNA_EMAIL)}&add=${encodeURIComponent(formData.email)}`;

      // Post payload to Google Apps Script webhook
      const payload = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        date: formData.date,
        slot: formData.slot,
        notes: formData.notes,
        gmeetLink,
        ownerEmail: PRIMARY_OWNER_EMAIL,
        ccEmail: CHETNA_EMAIL,
        guestEmail: CHETNA_EMAIL,
        type: "consultation_booking",
        submittedAt: new Date().toISOString(),
      };

      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });

      setSubmittedBooking({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        date: formData.date,
        slot: formData.slot,
        gmeetLink,
        calendarUrl,
      });

      toast({
        title: "Consultation Scheduled!",
        description: `Confirmation & GMeet details dispatched to ${PRIMARY_OWNER_EMAIL} & ${CHETNA_EMAIL}.`,
      });
    } catch (error) {
      console.error("Error booking consultation:", error);
      toast({
        title: "Error",
        description: "Something went wrong sending your details. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyMeetLink = () => {
    if (submittedBooking) {
      navigator.clipboard.writeText(submittedBooking.gmeetLink);
      toast({ title: "Copied!", description: "Google Meet link copied to clipboard." });
    }
  };

  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <Dialog open={isBookingOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[92vh] overflow-y-auto bg-background text-foreground border border-foreground/30 p-8 md:p-10">
        <DialogHeader className="mb-8 border-b border-foreground/15 pb-6">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] opacity-60">
              COMMENCE ENGAGEMENT
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest opacity-60">
              CHETNA PATTNAIK
            </span>
          </div>
          <DialogTitle className="text-3xl md:text-4xl font-serif font-light tracking-tight text-left mt-2">
            {submittedBooking ? "Consultation Confirmed" : "Book a Discovery Call"}
          </DialogTitle>
          <DialogDescription className="text-xs font-mono uppercase tracking-widest opacity-60 text-left mt-1">
            45-Minute 1-on-1 Session • Google Meet Direct Sync
          </DialogDescription>
        </DialogHeader>

        {submittedBooking ? (
          <div className="space-y-8 py-2">
            <div className="flex items-start gap-4 p-5 border border-foreground/20 bg-foreground/5">
              <CheckCircle2 className="w-5 h-5 text-foreground flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-base font-sans font-medium uppercase tracking-wider">
                  Your Call Has Been Reserved
                </p>
                <p className="text-xs font-mono opacity-80 leading-relaxed">
                  Calendar invites &amp; GMeet link dispatched to{" "}
                  <span className="font-bold underline">{PRIMARY_OWNER_EMAIL}</span> and CC&apos;d to{" "}
                  <span className="font-bold underline">{CHETNA_EMAIL}</span>.
                </p>
              </div>
            </div>

            <div className="border border-foreground/20 p-6 space-y-4 text-xs font-mono">
              <div className="flex justify-between border-b border-foreground/10 pb-2">
                <span className="opacity-50 uppercase tracking-wider">Client Name</span>
                <span className="font-medium text-sm uppercase">{submittedBooking.name}</span>
              </div>
              <div className="flex justify-between border-b border-foreground/10 pb-2">
                <span className="opacity-50 uppercase tracking-wider">Coordinates</span>
                <span>{submittedBooking.phone} • {submittedBooking.email}</span>
              </div>
              <div className="flex justify-between border-b border-foreground/10 pb-2">
                <span className="opacity-50 uppercase tracking-wider">Date</span>
                <span className="font-medium">{submittedBooking.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-50 uppercase tracking-wider">Slot Duration</span>
                <span className="font-medium">{submittedBooking.slot} (45 Mins)</span>
              </div>
            </div>

            {/* Google Meet Box */}
            <div className="p-6 border border-foreground/20 bg-foreground/5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-widest font-bold flex items-center gap-2">
                  <Video className="w-4 h-4" /> Google Meet Link
                </span>
                <button
                  type="button"
                  onClick={copyMeetLink}
                  className="text-xs font-mono flex items-center gap-1.5 opacity-70 hover:opacity-100 hover:underline transition-opacity"
                >
                  <Copy className="w-3.5 h-3.5" /> Copy Link
                </button>
              </div>
              <p className="text-xs font-mono break-all p-3 border border-foreground/20 bg-background">
                {submittedBooking.gmeetLink}
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <a
                  href={submittedBooking.gmeetLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-foreground text-background text-xs font-mono uppercase tracking-widest font-bold hover:bg-transparent hover:text-foreground border border-foreground transition-colors inline-flex items-center gap-2"
                >
                  <span>Join Google Meet</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href={submittedBooking.calendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border border-foreground text-foreground text-xs font-mono uppercase tracking-widest font-bold hover:bg-foreground hover:text-background transition-colors inline-flex items-center gap-2"
                >
                  <span>Add to Google Calendar</span>
                  <Calendar className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="w-full py-4 bg-foreground text-background text-xs font-mono uppercase tracking-widest font-bold hover:bg-transparent hover:text-foreground border border-foreground transition-colors"
            >
              Done &amp; Return to Studio
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest opacity-60 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Sarah Jenkins"
                  required
                  className="w-full bg-transparent border-b border-foreground/30 py-2.5 outline-none focus:border-foreground text-sm font-sans placeholder:text-foreground/30 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest opacity-60 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 000-0000"
                    required
                    className="w-full bg-transparent border-b border-foreground/30 py-2.5 outline-none focus:border-foreground text-sm font-sans placeholder:text-foreground/30 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest opacity-60 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="sarah@company.com"
                    required
                    className="w-full bg-transparent border-b border-foreground/30 py-2.5 outline-none focus:border-foreground text-sm font-sans placeholder:text-foreground/30 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest opacity-60 mb-2">
                    Select Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    min={todayStr}
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-transparent border-b border-foreground/30 py-2.5 outline-none focus:border-foreground text-sm font-mono transition-colors cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest opacity-60 mb-2">
                    Select 45-Min Slot *
                  </label>
                  <select
                    name="slot"
                    value={formData.slot}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-background border-b border-foreground/30 py-2.5 outline-none focus:border-foreground text-sm font-mono transition-colors cursor-pointer"
                  >
                    <option value="" disabled>
                      Choose a time slot...
                    </option>
                    {availableSlots.map((s, i) => (
                      <option key={i} value={s.label} className="bg-background text-foreground">
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-widest opacity-60 mb-2">
                  Project Details / Brief (Optional)
                </label>
                <textarea
                  name="notes"
                  rows={2}
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Tell us briefly about your brand, timeline, or design goals..."
                  className="w-full bg-transparent border-b border-foreground/30 py-2.5 outline-none focus:border-foreground text-sm font-sans placeholder:text-foreground/30 transition-colors resize-none"
                />
              </div>
            </div>

            <div className="pt-4 flex items-center justify-end gap-6 border-t border-foreground/15">
              <button
                type="button"
                onClick={handleClose}
                className="text-xs font-mono uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-4 bg-foreground text-background text-xs font-mono uppercase tracking-widest font-bold hover:bg-transparent hover:text-foreground border border-foreground transition-colors inline-flex items-center gap-2.5 disabled:opacity-50 cursor-pointer"
              >
                <span>{isSubmitting ? "GENERATING GMEET..." : "CONFIRM & CREATE GMEET"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
