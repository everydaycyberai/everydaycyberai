import type { Metadata } from "next";
import ServiceDetailTemplate from "@/components/ServiceDetailTemplate";

export const metadata: Metadata = {
  title: "E-Waste Management & IT Asset Disposal Mumbai | Everyday Cyber AI",
  description:
    "Safe e-waste management, IT asset disposal, secure data destruction and hardware recycling for businesses in Mumbai. Get a free quote today.",
  keywords: "e-waste management Mumbai, IT asset disposal, data destruction, hardware recycling India, office equipment disposal",
  alternates: { canonical: "https://everydaycyberai.in/services/e-waste-management" },
};

const service = {
  icon: "♻️",
  title: "E-Waste Management",
  tagline: "Safe IT asset disposal, e-waste handling, hardware recycling and office equipment decommissioning — done responsibly and securely.",
  price: "Contact",
  priceNote: "for a free quote",
  intro: "Old laptops, servers and office electronics often contain sensitive business data even after they stop being used. We help you decommission IT assets safely — wiping or destroying data securely, and recycling hardware responsibly instead of it ending up as unmanaged e-waste.",
  included: [
    "IT asset disposal & pickup",
    "Secure data destruction",
    "Hardware recycling",
    "Equipment decommissioning",
    "Asset inventory before disposal",
    "Disposal certificate on request",
  ],
  process: [
    { title: "List Your Assets", desc: "Tell us what needs to be disposed of — laptops, servers, peripherals, etc." },
    { title: "Data Wipe / Destruction", desc: "Any storage devices are securely wiped or physically destroyed first." },
    { title: "Pickup & Recycling", desc: "Equipment is collected and routed to responsible recycling channels." },
    { title: "Confirmation", desc: "You receive confirmation of disposal for your records." },
  ],
  faqs: [
    { q: "Is my data safe before disposal?", a: "Yes — secure data wiping or physical destruction of storage drives is done before any hardware leaves your premises or ours, so no business data risk remains." },
    { q: "Do you provide a disposal certificate?", a: "Yes, a certificate of disposal / data destruction can be provided on request for compliance records." },
    { q: "What kind of equipment can you dispose of?", a: "Laptops, desktops, servers, networking equipment, printers, and other office IT hardware." },
    { q: "Is this service available outside Mumbai?", a: "Pickup service is currently focused on Mumbai. Reach out and we'll let you know what's possible for your location." },
  ],
};

export default function EWasteManagementPage() {
  return <ServiceDetailTemplate service={service} />;
}
