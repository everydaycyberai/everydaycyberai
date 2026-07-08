import type { Metadata } from "next";
import ServiceDetailTemplate from "@/components/ServiceDetailTemplate";

export const metadata: Metadata = {
  title: "Network Support Engineer Mumbai — On-Site & Remote | Everyday Cyber AI",
  description:
    "Hire a network support engineer in Mumbai for router/switch configuration, LAN/WAN troubleshooting, network downtime fixes. On-site visits across Mumbai, BKC, Andheri, Powai, Navi Mumbai, Thane. Starting ₹1,499.",
  keywords: "network support engineer Mumbai, network engineer on-site, LAN WAN troubleshooting, router switch configuration, network downtime support Mumbai",
  alternates: { canonical: "https://everydaycyberai.in/services/network-support-engineer" },
};

const service = {
  icon: "🌐",
  title: "Network Support Engineer",
  tagline: "On-site and remote network support — router/switch configuration, LAN/WAN troubleshooting, downtime fixes, and network health checks for offices in Mumbai and nearby areas.",
  price: "₹1,499",
  priceNote: "per visit",
  intro: "Network issues bring an entire office to a halt — and most small businesses don't have a network engineer on standby. We provide on-demand network support: diagnosing slow or dropping connections, configuring routers and switches correctly, setting up VLANs, and getting your office back online fast. Book a one-time visit whenever you need it — no retainer required.",
  included: [
    "Router & switch configuration",
    "LAN/WAN troubleshooting",
    "Network downtime diagnosis & fix",
    "VLAN setup & segmentation",
    "WiFi coverage & signal troubleshooting",
    "Network cabling checks",
    "Bandwidth & connectivity issues",
    "Basic network documentation after the visit",
  ],
  process: [
    { title: "Describe the Issue", desc: "Tell us what's happening — slow network, downtime, new setup, etc." },
    { title: "Remote Triage First", desc: "We try to diagnose remotely first to save you time and cost where possible." },
    { title: "On-Site Visit", desc: "If needed, an engineer visits your office in Mumbai/nearby areas to fix it on the spot." },
    { title: "Documentation", desc: "You get a summary of what was found and fixed, for your records." },
  ],
  relatedTools: [
    { title: "IP / Subnet Calculator", href: "/tools/ip-calculator" },
    { title: "SSL Certificate Checker", href: "/tools/ssl-checker" },
  ],
  faqs: [
    { q: "Do you offer a dedicated network engineer for ongoing/monthly support?", a: "Currently we offer network support on a one-time, per-visit basis — book us whenever an issue comes up, no monthly contract needed. Get in touch if your business has a larger ongoing requirement and we can discuss options." },
    { q: "Can network issues be fixed remotely?", a: "Many can — slow connections, basic configuration issues, and WiFi troubleshooting are often solvable remotely. Physical issues (cabling, hardware faults) need an on-site visit." },
    { q: "Which areas do you cover for on-site visits?", a: "Mumbai, Bandra Kurla Complex (BKC), Lower Parel, Andheri, Powai, Navi Mumbai, Thane and nearby areas." },
    { q: "How fast can someone come to our office?", a: "We typically respond within 2 hours during business hours, and same-day visits are usually possible for Mumbai-based offices." },
  ],
};

export default function NetworkSupportEngineerPage() {
  return <ServiceDetailTemplate service={service} />;
}
