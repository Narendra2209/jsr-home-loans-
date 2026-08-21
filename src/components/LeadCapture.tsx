import React, { useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { mailtoUrl, sendEnquiry, whatsappUrl, type Enquiry } from "@/lib/enquiry";
import { openMail } from "@/lib/mailto";
import { office } from "@/content/company";

type Props = {
  /** What the page already knows — appended to the enquiry so nobody retypes it. */
  context?: string;
  service?: string;
  heading?: string;
  blurb?: string;
};

const LeadCapture: React.FC<Props> = ({
  context,
  service,
  heading = "Send me this calculation",
  blurb = "We will send your breakdown, and tell you what rate you would actually be offered — which is usually lower than the one you just typed in.",
}) => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [sending, setSending] = useState(false);

  const enquiry = (): Enquiry => ({ name: name.trim(), phone: phone.trim(), service, context });

  const guard = () => {
    if (!name.trim()) {
      toast({ title: "Your name, please", description: "We need something to call you." });
      return false;
    }
    if (!consent) {
      toast({
        title: "One box left",
        description: "Please tick the consent box so we know we may contact you.",
      });
      return false;
    }
    return true;
  };

  const onWhatsApp = () => {
    if (!guard()) return;
    window.open(whatsappUrl(enquiry()), "_blank", "noopener");
  };

  const onSend = async () => {
    if (!guard()) return;
    setSending(true);
    const result = await sendEnquiry(enquiry());
    setSending(false);

    if (result.outcome === "sent") {
      toast({
        title: "Enquiry received",
        description: `Thank you ${name.trim()} — we will be in touch within one business day.`,
      });
      setName("");
      setPhone("");
      setConsent(false);
      return;
    }

    // Nothing was delivered. Hand off rather than pretend.
    const opened = await openMail(mailtoUrl(enquiry()));

    if (opened) {
      toast({
        title: "Opening your email app",
        description:
          result.outcome === "failed"
            ? "We could not submit that just now. Send it as an email, or use WhatsApp."
            : "Send the email that opens, or use the WhatsApp button — both reach us directly.",
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
    <div className="rounded-xl border bg-card p-6 shadow-elegant">
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">
        Get this in writing
      </p>
      <h3 className="mt-2 font-heading text-xl font-semibold">{heading}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{blurb}</p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium" htmlFor="lead-name">
            Your name
          </label>
          <input
            id="lead-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-1 w-full rounded-md border bg-background px-3 py-2"
            placeholder="Name"
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium" htmlFor="lead-phone">
            Phone <span className="text-muted-foreground">(optional)</span>
          </label>
          <input
            id="lead-phone"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className="mt-1 w-full rounded-md border bg-background px-3 py-2"
            placeholder="10-digit mobile"
            inputMode="tel"
          />
        </div>
      </div>

      <label className="mt-4 flex gap-3 text-xs text-muted-foreground" htmlFor="lead-consent">
        <input
          id="lead-consent"
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

      <div className="mt-5 flex flex-wrap gap-3">
        <Button type="button" onClick={onWhatsApp} className="bg-[#1f9d55] text-white hover:bg-[#1b8a4a]">
          <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" />
          Send on WhatsApp
        </Button>
        <Button type="button" variant="brand" onClick={onSend} disabled={sending}>
          <Send className="mr-2 h-4 w-4" aria-hidden="true" />
          {sending ? "Sending…" : "Email me the breakdown"}
        </Button>
      </div>

      {context && (
        <p className="mt-4 text-xs text-muted-foreground">
          Your calculation goes with it — {context} — so you do not have to type it again.
        </p>
      )}
    </div>
  );
};

export default LeadCapture;
