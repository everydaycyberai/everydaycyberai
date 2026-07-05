import type { Metadata } from "next";
import ServiceDetailTemplate from "@/components/ServiceDetailTemplate";

export const metadata: Metadata = {
  title: "CCTV Installation & Surveillance Support Mumbai | Everyday Cyber AI",
  description:
    "CCTV setup, DVR/NVR troubleshooting and surveillance support in Mumbai starting ₹1,499 — including ATM camera systems and remote monitoring setup.",
  keywords: "CCTV installation Mumbai, DVR NVR troubleshooting, ATM surveillance systems, remote CCTV monitoring India",
  alternates: { canonical: "https://everydaycyberai.in/services/surveillance-support" },
};

const service = {
  icon: "📹",
  title: "Surveillance Support",
  tagline: "CCTV setup, DVR/NVR troubleshooting, ATM surveillance systems and remote monitoring support for shops, offices and residential complexes.",
  price: "₹1,499",
  priceNote: "onwards",
  intro: "From a single shop with 2 cameras to a multi-branch ATM network, we handle CCTV installation, DVR/NVR configuration, and remote viewing setup so you can check your premises from your phone, anywhere. We also troubleshoot existing systems that have stopped recording, lost connectivity, or need storage upgrades.",
  included: [
    "CCTV camera installation & setup",
    "DVR/NVR configuration & troubleshooting",
    "ATM camera system management",
    "Remote viewing setup (mobile app access)",
    "Storage & recording configuration",
    "Cable routing & mounting",
    "System health checks & maintenance",
  ],
  process: [
    { title: "Site Assessment", desc: "We understand your space and coverage needs (in person or via photos/video call)." },
    { title: "Plan & Quote", desc: "We recommend camera count, placement and give you a clear quote." },
    { title: "Installation", desc: "Cameras, DVR/NVR and cabling installed and configured." },
    { title: "Remote Access Setup", desc: "We set up mobile app access so you can view footage from anywhere." },
  ],
  faqs: [
    { q: "Can I view my CCTV footage on my phone?", a: "Yes, we set up remote viewing through a mobile app so you can check live footage and recordings from anywhere with internet access." },
    { q: "Do you fix existing CCTV systems, or only install new ones?", a: "Both. We regularly troubleshoot existing DVR/NVR systems that have stopped recording, lost internet connectivity, or have storage/hard-disk issues." },
    { q: "How many days of footage can be stored?", a: "This depends on your hard disk size and number of cameras — we help you calculate the right storage size for your needs before installation." },
    { q: "Do you service areas outside Mumbai?", a: "Installation visits are currently focused on Mumbai and nearby areas. Remote troubleshooting and configuration support is available pan-India." },
  ],
};

export default function SurveillanceSupportPage() {
  return <ServiceDetailTemplate service={service} />;
}
