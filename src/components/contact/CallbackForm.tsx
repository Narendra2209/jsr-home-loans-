import React, { useState } from "react";
import { MessageCircle, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { mailtoUrl, sendEnquiry, whatsappUrl, type Enquiry } from "@/lib/enquiry";
import { openMail } from "@/lib/mailto";
import { office } from "@/content/company";

const timeSlots = [
  "Morning (9:30am – 12pm)",
  "Afternoon (12pm – 4pm)",
  "Evening (4pm – 7pm)",
  "Any time",
];

const loanTypes = [
  "Home Loan",
  "Construction Loan",
  "Home Renovation Loan",
  "Open Plot Purchase Loan",
  "Loan Against Property",
  "Commercial Property Loan",
  "Balance Transfer",
  "Personal Loan",
  "Business Loan",
  "Not sure yet",
];

const tenDigits = (value: string) => value.replace(/\D/g, "").length === 10;

const CallbackForm: React.FC<{ defaultService?: string }> = ({ defaultService = "" }) => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [slot, setSlot] = useState(timeSlots[3]);
  const [service, setService] = useState(defaultService);
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [sending, setSending] = useState(false);

  const enquiry = (): Enquiry => ({
    name: name.trim(),
    phone: phone.trim(),
    service: service || undefined,
    message: message.trim() || undefined,
    context: `Callback requested — ${slot}`,
  });

  const valid = () => {
    if (!name.trim()) {
      toast({ title: "Your name, please", description: "We need something to call you." });
      return false;
    }
    if (!tenDigits(phone)) {
      setPhoneError("Enter a 10-digit mobile number so we can call you back.");
      return false;
    }
    setPhoneError("");
    if (!consent) {
      toast({
        title: "One box left",
        description: "Please tick the consent box so we know we may call you.",
      });
      return false;
    }
    return true;
  };

  const onWhatsApp = () => {
    if (!valid()) return;
    window.open(whatsappUrl(enquiry()), "_blank", "noopener");
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!valid()) return;

    setSending(true);
    const result = await sendEnquiry(enquiry());
    setSending(false);

    if (result.outcome === "sent") {
      toast({
        title: "Callback requested",
        description: `Thank you ${name.trim()} — we will call you ${slot.toLowerCase()}.`,
      });
      setName("");
      setPhone("");
      setMessage("");
      setConsent(false);
      return;
    }

    // Nothing was delivered — hand off rather than claim a callback that is not booked.
    const opened = await openMail(mailtoUrl(enquiry()));

    if (opened) {
      toast({
        title: "Opening your email app",
        description:
          result.outcome === "failed"
            ? "We could not submit that just now. Send the email that opens, or use WhatsApp."
            : "Send the email that opens, or use WhatsApp — both reach us directly.",
      });
      return;
    }

    // No mail app took the hand-off. Saying one opened would lose the enquiry.
    toast({
      title: "No email app opened",
      description: `This device has no mail app set up for email links. Use the 'Send on WhatsApp' button — it carries the same details — or write to ${office.email}.`,
    });
  };

  return (
    <form onSubmit={onSubmit} className="rounded-xl border bg-card p-6 shadow-elegant md:p-8">
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">Callback</p>
      <h2 className="mt-2 font-heading text-2xl font-semibold">Ask us to call you</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Tell us when suits and we will ring you then, not at some random hour.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium" htmlFor="cb-name">
            Full name
          </label>
          <input
            id="cb-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-1 w-full rounded-md border bg-background px-3 py-2"
            placeholder="Your name"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium" htmlFor="cb-phone">
            Mobile number
          </label>
          <input
            id="cb-phone"
            value={phone}
            onChange={(event) => {
              setPhone(event.target.value);
              if (phoneError) setPhoneError("");
            }}
            className="mt-1 w-full rounded-md border bg-background px-3 py-2"
            placeholder="10-digit mobile"
            inputMode="tel"
            autoComplete="tel"
            aria-invalid={phoneError ? true : undefined}
            aria-describedby={phoneError ? "cb-phone-error" : undefined}
            required
          />
          {phoneError && (
            <p id="cb-phone-error" className="mt-1 text-xs text-destructive">
              {phoneError}
            </p>
          )}
        </div>
      </div>

      <fieldset className="mt-5">
        <legend className="text-sm font-medium">Best time to call</legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {timeSlots.map((option) => (
            <label
              key={option}
              className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm transition ${
                slot === option
                  ? "border-primary bg-primary/5 ring-1 ring-primary"
                  : "hover:border-muted-foreground/40"
              }`}
            >
              <input
                type="radio"
                name="slot"
                value={option}
                checked={slot === option}
                onChange={() => setSlot(option)}
                className="h-4 w-4"
              />
              {option}
            </label>
          ))}
        </div>
        <p className="mt-2 text-xs text-muted-foreground">We are open Monday to Saturday.</p>
      </fieldset>

      <div className="mt-5">
        <label className="text-sm font-medium" htmlFor="cb-service">
          What is it about?
        </label>
        <select
          id="cb-service"
          value={service}
          onChange={(event) => setService(event.target.value)}
          className="mt-1 w-full rounded-md border bg-background px-3 py-2"
        >
          <option value="">Select a service</option>
          {loanTypes.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="mt-5">
        <label className="text-sm font-medium" htmlFor="cb-message">
          Anything we should know? <span className="text-muted-foreground">(optional)</span>
        </label>
        <textarea
          id="cb-message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          rows={3}
          className="mt-1 w-full rounded-md border bg-background px-3 py-2"
          placeholder="Property, loan amount, or the question on your mind"
        />
      </div>

      <label className="mt-5 flex gap-3 text-xs text-muted-foreground" htmlFor="cb-consent">
        <input
          id="cb-consent"
          type="checkbox"
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0"
        />
        <span>
          I would like JSR Home Loan Services to contact me about this enquiry. We do not share
          your details with anyone else.
        </span>
      </label>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button type="submit" variant="brand" size="lg" disabled={sending} className="flex-1">
          <PhoneCall className="mr-2 h-4 w-4" aria-hidden="true" />
          {sending ? "Sending…" : "Request a callback"}
        </Button>
        <Button
          type="button"
          size="lg"
          onClick={onWhatsApp}
          className="flex-1 bg-[#1f9d55] text-white hover:bg-[#1b8a4a]"
        >
          <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" />
          Send on WhatsApp
        </Button>
      </div>
    </form>
  );
};

export default CallbackForm;
