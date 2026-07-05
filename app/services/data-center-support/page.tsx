import type { Metadata } from "next";
import ServiceDetailTemplate from "@/components/ServiceDetailTemplate";

export const metadata: Metadata = {
  title: "Data Center Support & Smart Hands Services Mumbai | Everyday Cyber AI",
  description:
    "Rack installation, hardware replacement and smart hands data center support in Mumbai starting ₹4,999 — server setup, cable management, remote hands support.",
  keywords: "data center support Mumbai, smart hands service, server rack installation, hardware replacement India",
  alternates: { canonical: "https://everydaycyberai.in/services/data-center-support" },
};

const service = {
  icon: "🏢",
  title: "Data Center Support",
  tagline: "Rack installation, hardware replacement, smart hands support and infrastructure assistance for businesses running on-premise or colocated servers.",
  price: "₹4,999",
  priceNote: "onwards",
  intro: "Need someone physically present at a data center or server room to install, replace, or troubleshoot hardware? Our smart hands support covers rack-and-stack installation, cable management, hardware swaps and remote-hands assistance — so you don't need to fly a team out for routine data center work.",
  included: [
    "Rack & stack installation",
    "Server hardware replacement",
    "Remote hands support",
    "Structured cable management",
    "Hardware diagnostics",
    "Power & connectivity checks",
    "Documentation of work performed",
  ],
  process: [
    { title: "Share Requirements", desc: "Tell us the task — installation, replacement, or troubleshooting." },
    { title: "Scheduling", desc: "We coordinate access and timing with your data center/facility." },
    { title: "On-Site Execution", desc: "Our technician performs the work with photo/video documentation." },
    { title: "Report & Handover", desc: "You receive a summary of work done and current system status." },
  ],
  faqs: [
    { q: "What is 'smart hands' support?", a: "It's on-site technical assistance at a data center — someone physically present to install, replace, or troubleshoot hardware on your behalf, guided remotely by your own IT team if needed." },
    { q: "Do you provide documentation of the work done?", a: "Yes, every job includes a written summary and, where useful, photos of the work performed for your records." },
    { q: "Can you help outside Mumbai?", a: "On-site data center visits are currently available in Mumbai. For other locations, get in touch and we'll try to arrange coverage." },
    { q: "Do you supply the hardware, or just the labor?", a: "We primarily provide the technical labor and expertise. Hardware can be sourced separately or supplied by you — we'll advise based on your requirement." },
  ],
};

export default function DataCenterSupportPage() {
  return <ServiceDetailTemplate service={service} />;
}
