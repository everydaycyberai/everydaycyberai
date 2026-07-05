import type { Metadata } from "next";
import ServiceDetailTemplate from "@/components/ServiceDetailTemplate";

export const metadata: Metadata = {
  title: "Cyber Security Services Mumbai — Firewall, VPN & Security Audit | Everyday Cyber AI",
  description:
    "Professional cyber security services in Mumbai starting ₹2,499 — firewall setup, VPN configuration, network security audit, threat detection for businesses.",
  keywords: "cyber security services Mumbai, firewall setup, VPN configuration, network security audit, threat detection India",
  alternates: { canonical: "https://everydaycyberai.in/services/cyber-security" },
};

const service = {
  icon: "🛡️",
  title: "Cyber Security",
  tagline: "End-to-end cyber security solutions — firewall setup, VPN, threat detection, network hardening and security audits for businesses of every size.",
  price: "₹2,499",
  priceNote: "onwards",
  intro: "Cyber attacks on Indian small businesses have grown sharply in recent years — most don't have a dedicated IT security team. We fill that gap: configuring your firewall correctly, closing common attack surfaces, setting up secure VPN access for remote staff, and giving you a clear security audit report so you know exactly where you stand.",
  included: [
    "Firewall setup & configuration",
    "Business VPN configuration",
    "Network security audit",
    "Threat detection & prevention setup",
    "Data protection & encryption guidance",
    "Security policy documentation",
    "Phishing & malware protection setup",
    "Employee security awareness briefing",
  ],
  process: [
    { title: "Free Consultation", desc: "We understand your current setup and biggest risk areas." },
    { title: "Security Audit", desc: "We assess your network, devices and access points for weaknesses." },
    { title: "Implementation", desc: "We configure firewall, VPN and security policies for your business." },
    { title: "Ongoing Monitoring", desc: "Optional monthly checks to keep your defenses up to date." },
  ],
  relatedTools: [
    { title: "SSL Certificate Checker", href: "/tools/ssl-checker" },
    { title: "Scam Message Checker", href: "/tools/scam-message-checker" },
    { title: "Email Header Analyzer", href: "/tools/email-header-analyzer" },
    { title: "Password Strength & Breach Checker", href: "/tools/password-strength" },
  ],
  faqs: [
    { q: "How long does a security audit take?", a: "A typical small business audit takes 1-3 business days depending on network size, and you get a clear written report of findings and recommendations." },
    { q: "Do you work with businesses outside Mumbai?", a: "Yes — most of our cyber security work (firewall, VPN, audits) can be done remotely for businesses anywhere in India. On-site visits are available in Mumbai." },
    { q: "What happens after the audit — do I have to buy anything?", a: "No. The audit report is yours to keep either way. If you want us to implement the fixes, we quote that separately based on scope." },
    { q: "Can you help if we've already been hacked?", a: "Yes, but for an active incident, first use our free Scam Analyzer tool for immediate steps, or call 1930 (Cyber Crime Helpline) if money is at risk — then reach out to us for recovery and hardening support." },
  ],
};

export default function CyberSecurityPage() {
  return <ServiceDetailTemplate service={service} />;
}
