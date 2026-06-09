import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — Everyday Cyber AI",
  description:
    "Learn about Everyday Cyber AI — professional IT support, surveillance, cybersecurity and AI automation specialists based in Mumbai.",
};

const expertise = [
  { icon: "💻", title: "Remote IT Support", desc: "Windows, Linux, networking, printers, software — fast remote resolution for office environments." },
  { icon: "🛡️", title: "Firewall & Network Security", desc: "Firewall configuration, VPN tunnels, IPsec, access policies and network hardening." },
  { icon: "📹", title: "CCTV & Surveillance", desc: "2000+ surveillance sites experience — DVR/NVR, ATM cameras, IP systems and remote monitoring." },
  { icon: "🏢", title: "Data Center Support", desc: "Rack installation, hardware replacement, remote hands and infrastructure management." },
  { icon: "♻️", title: "E-Waste Management", desc: "Responsible IT asset disposal, hardware recycling and office equipment decommission." },
  { icon: "🤖", title: "AI Automation", desc: "AI-powered business tools, workflow automation and smart IT operation utilities." },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-32">
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <div className="mb-16">
          <div className="inline-block bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-4 py-2 rounded-full text-sm mb-6">
            About Everyday Cyber AI
          </div>
          <h1 className="text-5xl font-bold mb-6">
            Professional IT &amp;
            <span className="text-cyan-400"> Cyber Solutions</span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed max-w-3xl">
            Everyday Cyber AI provides modern IT support, surveillance infrastructure assistance,
            cybersecurity solutions and AI-powered business tools designed for businesses,
            offices and enterprise environments across Mumbai and remotely across India.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-3xl p-8">
            <h2 className="text-2xl font-semibold mb-4 text-cyan-400">Our Mission</h2>
            <p className="text-gray-400 leading-relaxed">
              To provide reliable, scalable and modern IT solutions that help businesses
              operate efficiently, securely and without interruption — with fast response
              and hands-on expertise.
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 rounded-3xl p-8">
            <h2 className="text-2xl font-semibold mb-4 text-cyan-400">Our Approach</h2>
            <p className="text-gray-400 leading-relaxed">
              We combine deep technical knowledge with AI-powered tools to deliver solutions
              that are not just reactive — but proactive, automated and built for the future
              of business IT.
            </p>
          </div>
        </div>

        {/* Expertise Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-10">
            Our <span className="text-cyan-400">Expertise</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertise.map((item) => (
              <div
                key={item.title}
                className="bg-black border border-gray-800 hover:border-cyan-400/40 rounded-2xl p-6 transition duration-300"
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold mb-2 text-cyan-400">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-3xl p-10 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to work together?</h2>
          <p className="text-gray-400 mb-8 text-lg">
            Get in touch for IT support, surveillance solutions or AI automation for your business.
          </p>
          <Link
            href="/contact"
            className="bg-cyan-500 hover:bg-cyan-400 hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] text-black px-8 py-4 rounded-xl font-semibold transition duration-300 inline-block"
          >
            Contact Us
          </Link>
        </div>

      </div>
    </main>
  );
}
