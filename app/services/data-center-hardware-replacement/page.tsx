import type { Metadata } from "next";
import ServiceDetailTemplate from "@/components/ServiceDetailTemplate";

export const metadata: Metadata = {
  title: "Data Center Hardware Replacement Support Mumbai | Everyday Cyber AI",
  description:
    "On-site hardware replacement support for data centers and server rooms in Mumbai — disk, RAM, PSU, network card swaps and diagnostics. Starting ₹2,999.",
  keywords: "data center hardware replacement Mumbai, server hardware swap, disk RAM PSU replacement, smart hands hardware support",
  alternates: { canonical: "https://everydaycyberai.in/services/data-center-hardware-replacement" },
};

const service = {
  icon: "🔧",
  title: "Data Center Hardware Replacement Support",
  tagline: "On-site technician support for swapping faulty server hardware — disks, RAM, PSUs, network cards — at your data center or server room in Mumbai.",
  price: "₹2,999",
  priceNote: "per visit",
  intro: "When a disk fails or a PSU dies in your server rack, you need someone physically present to swap it — fast, correctly, and with proper handling. We provide on-site hardware replacement support for data centers and server rooms, whether it's a single component swap or a coordinated multi-part replacement job.",
  included: [
    "Disk/HDD/SSD replacement",
    "RAM module replacement",
    "Power supply unit (PSU) replacement",
    "Network card / NIC replacement",
    "Pre-replacement diagnostics",
    "Post-replacement testing & verification",
    "Coordination with your existing IT/vendor team if needed",
    "Written summary of work performed",
  ],
  process: [
    { title: "Report the Fault", desc: "Tell us the component and the server/rack details." },
    { title: "Confirm Access", desc: "We coordinate data center access and timing with your facility." },
    { title: "Replace & Test", desc: "Faulty component is replaced and the system is tested before we leave." },
    { title: "Handover Report", desc: "You receive documentation of the fault, fix and current system status." },
  ],
  faqs: [
    { q: "Do you supply the replacement hardware, or do we?", a: "We primarily provide the technical labor for the swap. You can supply the replacement part, or we can help source it separately — let us know your preference when you reach out." },
    { q: "Can you handle this urgently / same-day?", a: "We prioritize hardware failures since they usually mean downtime — same-day visits are typically possible for Mumbai data centers." },
    { q: "Do you work with our existing IT vendor or team?", a: "Yes, we can coordinate directly with your in-house IT team or existing vendor to make sure the swap fits into your change management process." },
    { q: "Is this different from your general Data Center Support service?", a: "This is a focused, single-purpose hardware swap visit. Our broader Data Center Support service covers rack installs, cabling, and ongoing smart-hands work — check that page if you need more than a one-off replacement." },
  ],
};

export default function DataCenterHardwareReplacementPage() {
  return <ServiceDetailTemplate service={service} />;
}
