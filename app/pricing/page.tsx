import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "IT Support Pricing — Affordable Plans India | Everyday Cyber AI",
  description:
    "Affordable IT support packages for businesses in India — remote support, CCTV setup, cyber security audit, firewall configuration. Monthly AMC plans starting ₹1,999.",
  keywords:
    "IT support pricing India, remote IT support cost, CCTV setup price Mumbai, cyber security audit cost India, IT AMC plans small business",
  alternates: { canonical: "https://everydaycyberai.in/pricing" },
};

const plans = [
  {
    name: "Basic Support",
    price: "₹999",
    period: "per session",
    color: "border-gray-700",
    badge: "",
    desc: "Perfect for individuals and home offices",
    features: [
      "1 Remote Support Session (60 min)",
      "Windows/Software troubleshooting",
      "Virus/Malware removal",
      "Email & WhatsApp support",
      "Same-day response",
    ],
    cta: "Book Session",
    href: "/contact",
  },
  {
    name: "Business Monthly",
    price: "₹2,999",
    period: "per month",
    color: "border-cyan-500",
    badge: "Most Popular",
    desc: "Best for small offices & businesses",
    features: [
      "Unlimited Remote Support Sessions",
      "5 Devices covered",
      "Network & WiFi support",
      "Monthly security check",
      "Priority WhatsApp support",
      "Free cyber security tips",
    ],
    cta: "Get Started",
    href: "/contact",
  },
  {
    name: "Enterprise AMC",
    price: "₹7,999",
    period: "per month",
    color: "border-purple-500",
    badge: "Best Value",
    desc: "For offices with 10+ systems",
    features: [
      "Unlimited Remote Support",
      "20 Devices covered",
      "CCTV & Surveillance support",
      "Firewall & VPN management",
      "Weekly security reports",
      "On-site visit (1/month Mumbai)",
      "Dedicated support number",
    ],
    cta: "Contact Us",
    href: "/contact",
  },
];

const services = [
  { icon: "📹", name: "CCTV Installation Support",     price: "₹1,499 onwards" },
  { icon: "🛡️", name: "Cyber Security Audit",          price: "₹4,999 onwards" },
  { icon: "🔥", name: "Firewall Setup & Config",        price: "₹2,999 onwards" },
  { icon: "🌐", name: "Network Setup & Troubleshoot",   price: "₹1,999 onwards" },
  { icon: "💾", name: "Data Recovery Assistance",       price: "₹1,499 onwards" },
  { icon: "🖥️", name: "Server Setup & Management",     price: "₹4,999 onwards" },
  { icon: "🔒", name: "VPN Setup for Business",         price: "₹2,499 onwards" },
  { icon: "📱", name: "Mobile Device Management",       price: "₹999 onwards" },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen text-white px-6 py-12 relative z-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-4 py-2 rounded-full text-sm mb-6">
            Transparent Pricing — No Hidden Charges
          </div>
          <h1 className="text-5xl font-bold mb-6">
            Affordable IT Support
            <span className="text-cyan-400"> Plans India</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Professional IT support, cyber security and surveillance services for businesses and individuals.
            All plans include WhatsApp support and expert guidance.
          </p>
        </div>

        {/* Monthly Plans */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan) => (
            <div key={plan.name}
              className={`relative bg-black/40 backdrop-blur-sm border-2 ${plan.color} rounded-3xl p-8 flex flex-col ${plan.badge ? "scale-[1.02]" : ""}`}>
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyan-500 text-black px-4 py-1 rounded-full text-sm font-bold whitespace-nowrap">
                  ⭐ {plan.badge}
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{plan.desc}</p>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-black text-cyan-400">{plan.price}</span>
                  <span className="text-gray-500 text-sm mb-1">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-3 flex-1 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                    <span className="text-green-400 shrink-0 mt-0.5">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <Link href={plan.href}
                className={`text-center py-3 rounded-xl font-bold transition ${
                  plan.badge
                    ? "bg-cyan-500 hover:bg-cyan-400 text-black hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                    : "bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white"
                }`}>
                {plan.cta} →
              </Link>
            </div>
          ))}
        </div>

        {/* One-time Services */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">One-Time Services</h2>
            <p className="text-gray-400">Pay only for what you need — no monthly commitment</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((s) => (
              <div key={s.name}
                className="bg-black/40 border border-zinc-700/60 rounded-2xl p-5 hover:border-cyan-400/40 transition">
                <div className="text-3xl mb-3">{s.icon}</div>
                <h3 className="font-semibold text-sm mb-2">{s.name}</h3>
                <p className="text-cyan-400 font-bold">{s.price}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-500 text-sm text-center mt-4">
            * Prices vary based on complexity. <Link href="/contact" className="text-cyan-400 hover:underline">Contact us</Link> for exact quote.
          </p>
        </div>

        {/* Why Choose Us */}
        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-3xl p-10 mb-16">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why Choose Everyday Cyber AI?</h2>
              <div className="space-y-4">
                {[
                  { icon: "⚡", text: "Fast Response — We respond within 2 hours" },
                  { icon: "💰", text: "Transparent Pricing — No hidden charges ever" },
                  { icon: "🇮🇳", text: "India-based team — Hindi & English support" },
                  { icon: "🔒", text: "Certified expertise — Cyber security specialists" },
                  { icon: "📱", text: "WhatsApp support — Chat anytime, anywhere" },
                  { icon: "✅", text: "Satisfaction guaranteed — If not resolved, no charge" },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-center gap-3 text-gray-300">
                    <span className="text-xl">{icon}</span>
                    <span className="text-sm">{text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-black/40 border border-cyan-500/20 rounded-2xl p-6 text-center">
                <p className="text-5xl font-black text-cyan-400 mb-2">500+</p>
                <p className="text-gray-400">IT Issues Resolved</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/40 border border-cyan-500/20 rounded-2xl p-4 text-center">
                  <p className="text-3xl font-bold text-cyan-400">24/7</p>
                  <p className="text-gray-400 text-sm">Support</p>
                </div>
                <div className="bg-black/40 border border-cyan-500/20 rounded-2xl p-4 text-center">
                  <p className="text-3xl font-bold text-cyan-400">2hr</p>
                  <p className="text-gray-400 text-sm">Response</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Not sure which plan is right for you?</h2>
          <p className="text-gray-400 mb-8">Talk to us on WhatsApp — we'll suggest the best option for your needs</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="https://wa.me/918454031225?text=Hi!%20I%20want%20to%20know%20more%20about%20your%20IT%20support%20plans."
              target="_blank" rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-xl font-bold transition hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] flex items-center gap-2">
              💬 Chat on WhatsApp
            </a>
            <Link href="/contact"
              className="bg-cyan-500 hover:bg-cyan-400 text-black px-8 py-4 rounded-xl font-bold transition hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]">
              📋 Request a Quote
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
