import type { Metadata } from "next";
import ServiceDetailTemplate from "@/components/ServiceDetailTemplate";

export const metadata: Metadata = {
  title: "Windows Autopilot Deployment Support Mumbai | Everyday Cyber AI",
  description:
    "Windows Autopilot setup and deployment support for businesses in Mumbai — zero-touch device provisioning, Intune enrollment, and profile configuration. Starting ₹2,999.",
  keywords: "Windows Autopilot support Mumbai, Autopilot deployment, Intune device enrollment, zero touch provisioning, MDM setup India",
  alternates: { canonical: "https://everydaycyberai.in/services/windows-autopilot-support" },
};

const service = {
  icon: "🚀",
  title: "Windows Autopilot Deployment Support",
  tagline: "Set up Windows Autopilot for zero-touch device provisioning — Intune enrollment, deployment profiles, and device group configuration for your organization.",
  price: "₹2,999",
  priceNote: "onwards (setup)",
  intro: "Windows Autopilot lets you ship a laptop straight to an employee and have it self-configure on first boot — no imaging, no manual setup. Getting it configured correctly the first time (Intune enrollment, deployment profiles, device groups, app assignments) takes specific setup work. We handle that setup so future device rollouts are genuinely zero-touch.",
  included: [
    "Windows Autopilot tenant setup",
    "Intune enrollment configuration",
    "Deployment profile creation",
    "Device group & policy assignment",
    "App & security baseline configuration for auto-provisioning",
    "Test deployment & validation",
    "Documentation for your IT team to manage going forward",
    "Troubleshooting existing Autopilot deployments that aren't working correctly",
  ],
  process: [
    { title: "Assess Current Setup", desc: "We review your Microsoft 365/Intune tenant and current device management state." },
    { title: "Plan Deployment Profiles", desc: "We design profiles matching your device types and user groups." },
    { title: "Configure & Test", desc: "Autopilot is set up and tested on a sample device before full rollout." },
    { title: "Handover & Docs", desc: "Your team gets clear documentation to manage ongoing enrollments." },
  ],
  faqs: [
    { q: "Do we need Microsoft 365/Intune licenses already?", a: "Yes, Windows Autopilot requires an appropriate Microsoft 365 or Intune licensing tier. We can advise on what's needed if you're not sure what you currently have." },
    { q: "Can you fix an Autopilot setup that's already failing?", a: "Yes — troubleshooting broken or partially-working Autopilot deployments is one of our common requests, not just fresh setups." },
    { q: "How long does initial setup take?", a: "A typical setup and test takes 1-3 business days depending on your existing tenant configuration and number of device groups needed." },
    { q: "Is this a one-time setup or ongoing service?", a: "The core setup is a one-time engagement. Once configured, your team can manage day-to-day enrollments — we're available separately if you need help down the line." },
  ],
};

export default function WindowsAutopilotSupportPage() {
  return <ServiceDetailTemplate service={service} />;
}
