import type { Metadata } from "next";
import ServiceDetailTemplate from "@/components/ServiceDetailTemplate";

export const metadata: Metadata = {
  title: "Remote IT Support Mumbai — Windows, Software & Printer Help | Everyday Cyber AI",
  description:
    "Fast remote IT support in Mumbai starting ₹999 — Windows troubleshooting, software installation, printer setup, virus removal. Same-day response, WhatsApp support.",
  keywords: "remote IT support Mumbai, Windows troubleshooting, printer setup, virus removal, IT help India",
  alternates: { canonical: "https://everydaycyberai.in/services/remote-it-support" },
};

const service = {
  icon: "💻",
  title: "Remote IT Support",
  tagline: "Fast troubleshooting, software installation, Windows support, printer setup and remote assistance for office environments — anywhere in India.",
  price: "₹999",
  priceNote: "per session",
  intro: "Whether it's a slow laptop, a printer that won't connect, or a virus that won't go away — our remote IT support team fixes it over a screen-share session, usually within the hour. No need to wait for a technician to visit; most issues are solved remotely, the same day you contact us.",
  included: [
    "Windows & Linux troubleshooting",
    "Remote desktop assistance via screen-share",
    "Software installation & licensing help",
    "Printer & peripheral setup",
    "Virus / malware removal",
    "Email client setup (Outlook, Gmail)",
    "Slow PC performance optimization",
    "Basic network / WiFi troubleshooting",
  ],
  process: [
    { title: "Message Us", desc: "WhatsApp or call us with your issue — no forms, no waiting on hold." },
    { title: "Quick Diagnosis", desc: "We ask a few questions to understand the problem before connecting." },
    { title: "Remote Session", desc: "We connect via secure screen-share and fix the issue live." },
    { title: "Confirm & Close", desc: "You confirm it's resolved before we close the ticket." },
  ],
  relatedTools: [
    { title: "Hack Checker", href: "/tools/hack-checker" },
    { title: "Digital Safety Score", href: "/tools/safety-score" },
  ],
  faqs: [
    { q: "Do I need to install any software for remote support?", a: "Yes, a lightweight, trusted screen-sharing tool (like AnyDesk or TeamViewer) is used only for the duration of the session, and only with your permission. Nothing stays installed unless you want it to." },
    { q: "What if the issue can't be fixed remotely?", a: "If a problem needs a physical visit (like hardware replacement), we'll let you know upfront and can arrange an on-site visit in Mumbai, or guide you to the right hardware fix." },
    { q: "How fast is the response time?", a: "We typically respond within 2 hours during business hours, and most sessions are completed the same day." },
    { q: "Is my data safe during a remote session?", a: "Yes — we only access what's needed to fix your specific issue, and the session ends the moment we're done. We never store your files or credentials." },
  ],
};

export default function RemoteITSupportPage() {
  return <ServiceDetailTemplate service={service} />;
}
