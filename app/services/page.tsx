import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services — Everyday Cyber AI",
  description:
    "IT support, firewall & security, CCTV surveillance, data center support, e-waste management and AI automation services in Mumbai.",
};

const services = [
  {
    icon: "💻",
    title: "Remote IT Support",
    desc: "Fast troubleshooting, software installation, Windows support, printer setup and remote assistance for office environments.",
    features: ["Windows & Linux support", "Remote desktop assistance", "Software installation", "Printer & peripheral setup"],
  },
  {
    icon: "🛡️",
    title: "Cyber Security",
    desc: "End-to-end cyber security solutions — firewall setup, VPN, threat detection, network hardening and security audits for businesses.",
    features: ["Firewall & VPN configuration", "Network security audit", "Threat detection & prevention", "Data protection & encryption", "Security policy setup", "Phishing & malware protection"],
  },
  {
    icon: "📹",
    title: "Surveillance Support",
    desc: "CCTV setup, DVR/NVR troubleshooting, ATM surveillance systems and remote monitoring support.",
    features: ["CCTV installation & setup", "DVR/NVR troubleshooting", "ATM camera management", "Remote monitoring support"],
  },
  {
    icon: "🏢",
    title: "Data Center Support",
    desc: "Rack installation, hardware replacement, smart hands support and infrastructure assistance.",
    features: ["Rack & stack installation", "Hardware replacement", "Remote hands support", "Cable management"],
  },
  {
    icon: "♻️",
    title: "E-Waste Management",
    desc: "Safe IT asset disposal, e-waste handling, hardware recycling and office equipment management.",
    features: ["IT asset disposal", "Hardware recycling", "Data destruction", "Equipment decommission"],
  },
  {
    icon: "🤖",
    title: "AI Automation",
    desc: "AI-powered tools, workflow automation, reporting utilities and smart business solutions.",
    features: ["Workflow automation", "AI document generation", "IT reporting tools", "Smart monitoring utilities"],
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen text-white px-6 py-32">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="mb-16 text-center">
          <div className="inline-block bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-4 py-2 rounded-full text-sm mb-6">
            Professional IT Services
          </div>
          <h1 className="text-5xl font-bold mb-6">
            Complete Technology &amp;
            <span className="text-cyan-400"> Infrastructure Support</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
            Professional IT support, surveillance solutions, cybersecurity services and
            enterprise infrastructure assistance for businesses and organizations.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((s) => (
            <div
              key={s.title}
              className="bg-black border border-gray-800 rounded-3xl p-8 hover:border-cyan-400 transition duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(34,211,238,0.12)] group"
            >
              <div className="text-5xl mb-6">{s.icon}</div>
              <h2 className="text-2xl font-semibold mb-4 text-cyan-400">{s.title}</h2>
              <p className="text-gray-400 leading-relaxed mb-6">{s.desc}</p>
              <ul className="space-y-2">
                {s.features.map((f) => (
                  <li key={f} className="text-gray-500 text-sm flex items-center gap-2">
                    <span className="text-cyan-500">✓</span> {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-3xl p-10 text-center">
          <h2 className="text-3xl font-bold mb-4">Need a service not listed here?</h2>
          <p className="text-gray-400 mb-8">
            Contact us and we will assess your requirements and provide the right solution.
          </p>
          <Link
            href="/contact"
            className="bg-cyan-500 hover:bg-cyan-400 hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] text-black px-8 py-4 rounded-xl font-semibold transition duration-300 inline-block"
          >
            Request Support
          </Link>
        </div>

      </div>
    </main>
  );
}
