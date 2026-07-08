import type { Metadata } from "next";
import ServiceDetailTemplate from "@/components/ServiceDetailTemplate";

export const metadata: Metadata = {
  title: "Laptop Configuration & Setup Service Mumbai | Everyday Cyber AI",
  description:
    "New laptop setup, OS installation, software configuration and employee onboarding IT setup for businesses in Mumbai. Bulk laptop configuration available. Starting ₹799.",
  keywords: "laptop configuration service Mumbai, new employee laptop setup, bulk laptop configuration, office laptop setup service",
  alternates: { canonical: "https://everydaycyberai.in/services/laptop-configuration" },
};

const service = {
  icon: "💻",
  title: "Laptop Configuration & Setup",
  tagline: "New laptop setup for employees — OS installation, software configuration, security settings and account setup, ready to hand over on day one.",
  price: "₹799",
  priceNote: "per device",
  intro: "New hires need working laptops from day one — configured correctly, secured, and loaded with the right software. We handle laptop configuration for individual new joiners or in bulk for larger onboarding batches, so your team isn't stuck troubleshooting setups on someone's first week.",
  included: [
    "OS installation & updates",
    "Software installation as per your standard list",
    "Email & account configuration",
    "Security settings (firewall, antivirus, encryption)",
    "Company policy/security baseline setup",
    "Printer & peripheral configuration",
    "Data migration from old device (if applicable)",
    "Basic user handover walkthrough",
  ],
  process: [
    { title: "Share Requirements", desc: "Send us your standard software list and any security policies." },
    { title: "Bulk or Single Setup", desc: "We configure one device or a full batch for new hires." },
    { title: "Quality Check", desc: "Every device is tested before handover — updates, software, login all verified." },
    { title: "Ready to Use", desc: "Devices are handed over fully configured and ready for day one." },
  ],
  faqs: [
    { q: "Can you configure laptops in bulk for a hiring batch?", a: "Yes — bulk laptop configuration is one of our most common requests, especially around onboarding cycles. Per-device pricing typically reduces for larger batches, ask us for a quote." },
    { q: "Do you set up standard software like MS Office, VPN clients, etc.?", a: "Yes — send us your standard software list (or your IT policy document) and we'll configure every device to match." },
    { q: "Can this be done remotely?", a: "Basic software configuration can sometimes be done remotely if devices are already with the employee, but full setup (OS install, security baseline) is usually done on-site or at our end before handover." },
    { q: "Do you handle both Windows and Mac devices?", a: "Yes, we configure both Windows and Mac laptops." },
  ],
};

export default function LaptopConfigurationPage() {
  return <ServiceDetailTemplate service={service} />;
}
