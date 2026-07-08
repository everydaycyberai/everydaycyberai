import type { Metadata } from "next";
import ServiceDetailTemplate from "@/components/ServiceDetailTemplate";

export const metadata: Metadata = {
  title: "CCTV DVR Camera Support & Troubleshooting Mumbai | Everyday Cyber AI",
  description:
    "DVR/NVR troubleshooting, camera not recording fixes, remote viewing setup and CCTV repair support in Mumbai. Starting ₹999.",
  keywords: "CCTV DVR support Mumbai, camera not recording fix, DVR troubleshooting, NVR repair, CCTV remote viewing setup",
  alternates: { canonical: "https://everydaycyberai.in/services/cctv-dvr-support" },
};

const service = {
  icon: "📹",
  title: "CCTV / DVR Camera Support",
  tagline: "DVR/NVR troubleshooting, camera-not-recording fixes, storage issues, and remote viewing setup for existing CCTV systems.",
  price: "₹999",
  priceNote: "per visit",
  intro: "Cameras that stopped recording, a DVR that won't boot, or footage you suddenly can't access remotely — these are the most common CCTV support requests we get. Instead of a full reinstall, we diagnose and fix the specific issue with your existing setup, whether it's a shop, office, warehouse or residential complex.",
  included: [
    "DVR/NVR won't boot or freezing fixes",
    "Camera not recording — diagnosis & fix",
    "Storage/hard-disk troubleshooting",
    "Remote viewing app reconnection",
    "Cable & connector fault checks",
    "Motion detection & alert configuration",
    "Firmware updates where needed",
    "General system health check",
  ],
  process: [
    { title: "Describe the Fault", desc: "Tell us what's happening — no recording, can't view remotely, DVR not booting, etc." },
    { title: "On-Site Diagnosis", desc: "We visit and diagnose the actual cause — often not what it first appears to be." },
    { title: "Fix on the Spot", desc: "Most issues (connections, settings, storage) are fixed during the same visit." },
    { title: "Verify & Handover", desc: "We confirm recording and remote access are working before we leave." },
  ],
  faqs: [
    { q: "My cameras show video but nothing is being recorded — can you fix that?", a: "Yes, this is one of the most common issues we see — usually a storage, configuration, or scheduling setting problem, fixable in a single visit." },
    { q: "Can you set up remote viewing on my phone if it stopped working?", a: "Yes, reconnecting or fixing broken remote-viewing app access is a standard part of this service." },
    { q: "Do you work on any brand of DVR/NVR, or only specific ones?", a: "We work with most common DVR/NVR brands used in Indian offices and shops. If you're unsure whether we support yours, just ask before booking." },
    { q: "Is this different from your full Surveillance Support service?", a: "This is focused on troubleshooting an existing system. If you need new camera installation or a full system setup, check our broader Surveillance Support service instead." },
  ],
};

export default function CctvDvrSupportPage() {
  return <ServiceDetailTemplate service={service} />;
}
