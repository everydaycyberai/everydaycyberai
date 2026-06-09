"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

// Scroll-triggered fade-up hook
function useFadeUp() {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

const services = [
  { icon: "💻", title: "IT Support", desc: "Remote troubleshooting, desktop support, software installation and office IT assistance." },
  { icon: "🛡️", title: "Firewall & Security", desc: "Firewall configuration, VPN support, network security and access management solutions." },
  { icon: "📹", title: "Surveillance Support", desc: "CCTV systems, DVR/NVR troubleshooting, ATM surveillance and remote monitoring support." },
  { icon: "🖥️", title: "Data Center Support", desc: "Rack installation, hardware replacement, smart hands and remote infrastructure assistance." },
];

const tools = [
  { icon: "📄", title: "PDF Tools", desc: "Merge, split, compress files and convert images to PDF instantly.", href: "/tools" },
  { icon: "🌐", title: "Network Tools", desc: "IP checker, DNS lookup, port testing and password generator utilities.", href: "/tools" },
  { icon: "📹", title: "CCTV Calculators", desc: "Storage calculators, bandwidth estimators and surveillance planning tools.", href: "/tools" },
  { icon: "🤖", title: "AI Writing Tools", desc: "Generate emails, complaint letters, SOPs and IT documentation instantly.", href: "/tools" },
  { icon: "🧾", title: "Office Utilities", desc: "GST invoice generators, quotation creators and salary slip tools.", href: "/tools" },
  { icon: "⚙️", title: "Automation Tools", desc: "Smart automation utilities designed for IT operations and monitoring tasks.", href: "/tools" },
];

const stats = [
  { value: "24/7", label: "Remote Support Availability" },
  { value: "2000+", label: "Surveillance Sites Experience" },
  { value: "60+", label: "Devices Managed" },
  { value: "AI", label: "Automation Focused Solutions" },
];

export default function Home() {
  const serviceRef = useFadeUp() as React.RefObject<HTMLElement>;
  const whyRef = useFadeUp() as React.RefObject<HTMLElement>;
  const toolsRef = useFadeUp() as React.RefObject<HTMLElement>;
  const footerRef = useFadeUp() as React.RefObject<HTMLElement>;

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-[600px] right-0 w-[400px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* ── Hero ── */}
      <section id="home" className="hero-grid pt-40 pb-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center">

          {/* Left */}
          <div>
            <div className="inline-block bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-4 py-2 rounded-full text-sm mb-6">
              Everyday IT Solutions Powered by AI
            </div>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Smart IT Support,
              <span className="text-cyan-400"> Surveillance </span>
              &amp; Automation Solutions
            </h1>

            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Professional IT infrastructure, remote support, surveillance systems, firewall management,
              data center assistance and AI-powered utility tools for modern businesses.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="bg-cyan-500 hover:bg-cyan-400 hover:shadow-[0_0_25px_rgba(34,211,238,0.45)] text-black px-6 py-3 rounded-xl font-semibold transition duration-300"
              >
                Request Support
              </Link>
              <Link
                href="/services"
                className="border border-gray-700 hover:border-cyan-400 hover:text-cyan-400 px-6 py-3 rounded-xl transition duration-300"
              >
                Explore Services
              </Link>
            </div>
          </div>

          {/* Right — floating cards */}
          <div className="relative">
            <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border border-cyan-500/20 rounded-3xl p-10 backdrop-blur-sm shadow-[0_0_60px_rgba(34,211,238,0.08)] relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-400/10 blur-3xl rounded-full" />
              <div className="space-y-6">
                {[
                  { cls: "float-card", title: "Remote IT Support", desc: "Fast troubleshooting & support for offices and businesses." },
                  { cls: "float-card-delay", title: "Data Center Support", desc: "Rack, hardware replacement & remote hands assistance." },
                  { cls: "float-card-slow", title: "AI Utility Tools", desc: "Smart automation tools to simplify IT operations." },
                ].map((card) => (
                  <div key={card.title} className={`bg-black/40 border border-gray-800 rounded-2xl p-5 ${card.cls}`}>
                    <h3 className="text-cyan-400 font-semibold mb-2">{card.title}</h3>
                    <p className="text-gray-400 text-sm">{card.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── Services ── */}
      <section
        ref={serviceRef as React.RefObject<HTMLElement>}
        id="services"
        className="fade-up py-24 px-6 bg-gradient-to-b from-black to-gray-950"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-4 py-2 rounded-full text-sm mb-6">
              Professional IT Services
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Complete Technology &amp;
              <span className="text-cyan-400"> Support Solutions</span>
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto text-lg">
              End-to-end IT support, surveillance systems, infrastructure management and
              automation solutions designed for modern businesses and enterprises.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((s) => (
              <div
                key={s.title}
                className="bg-black border border-gray-800 hover:border-cyan-400 rounded-3xl p-8 transition duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]"
              >
                <div className="text-cyan-400 text-4xl mb-6">{s.icon}</div>
                <h3 className="text-2xl font-semibold mb-4">{s.title}</h3>
                <p className="text-gray-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/services"
              className="border border-cyan-500/40 hover:border-cyan-400 text-cyan-400 px-8 py-3 rounded-xl transition duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]"
            >
              View All Services →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section
        ref={whyRef as React.RefObject<HTMLElement>}
        className="fade-up py-24 px-6 bg-black"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <div>
              <div className="inline-block bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-4 py-2 rounded-full text-sm mb-6">
                Why Choose Us
              </div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                Reliable IT &amp;
                <span className="text-cyan-400"> Infrastructure Support</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-10">
                We provide modern businesses with fast, scalable and professional technology support
                including surveillance systems, networking, firewall management and remote assistance.
              </p>

              <div className="space-y-6">
                {[
                  { icon: "⚡", title: "Fast Response Support", desc: "Quick troubleshooting and remote assistance for business-critical systems." },
                  { icon: "🛡️", title: "Secure Infrastructure", desc: "Professional firewall, VPN and security management solutions." },
                  { icon: "🌐", title: "Multi-site Support", desc: "Support for offices, ATM locations, surveillance systems and enterprise networks." },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="text-cyan-400 text-2xl">{item.icon}</div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat) => (
                <div
                  key={stat.value}
                  className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-3xl p-10 text-center hover:border-cyan-400/40 transition duration-300"
                >
                  <h3 className="text-5xl font-bold text-cyan-400 mb-4">{stat.value}</h3>
                  <p className="text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── Tools ── */}
      <section
        ref={toolsRef as React.RefObject<HTMLElement>}
        id="tools"
        className="fade-up py-24 px-6 bg-gradient-to-b from-black to-gray-950"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-4 py-2 rounded-full text-sm mb-6">
              Smart Utility Tools
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Free IT &amp;
              <span className="text-cyan-400"> Productivity Tools</span>
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto text-lg">
              Useful online tools designed to help businesses, IT teams and everyday users
              solve problems quickly and efficiently.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool) => (
              <Link
                key={tool.title}
                href={tool.href}
                className="group bg-black border border-gray-800 hover:border-cyan-400 rounded-3xl p-8 transition duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] block"
              >
                <div className="text-5xl mb-6">{tool.icon}</div>
                <h3 className="text-2xl font-semibold mb-4 group-hover:text-cyan-400 transition">{tool.title}</h3>
                <p className="text-gray-400 leading-relaxed mb-6">{tool.desc}</p>
                <span className="text-cyan-400 font-semibold">Explore →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        ref={footerRef as React.RefObject<HTMLElement>}
        id="contact"
        className="fade-up bg-black border-t border-gray-800 py-16 px-6"
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">

          <div>
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">Everyday Cyber AI</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              Professional IT support, surveillance systems, infrastructure management
              and AI-powered business solutions.
            </p>
            <p className="text-gray-500 text-sm">IT Support & Cyber Security Specialist — Mumbai</p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://wa.me/918454031225"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 transition text-sm border border-cyan-500/30 px-3 py-1 rounded-lg"
              >
                WhatsApp
              </a>
              <Link
                href="/contact"
                className="text-cyan-400 hover:text-cyan-300 transition text-sm border border-cyan-500/30 px-3 py-1 rounded-lg"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-6">Services</h3>
            <ul className="space-y-3 text-gray-400">
              {["IT Support", "Firewall & Security", "Data Center Support", "Surveillance Support", "AI Automation"].map((s) => (
                <li key={s}>
                  <Link href="/services" className="hover:text-cyan-400 transition duration-300">{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-6">Tools</h3>
            <ul className="space-y-3 text-gray-400">
              {["PDF Tools", "Network Tools", "CCTV Calculators", "AI Writing Tools", "Automation Tools"].map((t) => (
                <li key={t}>
                  <Link href="/tools" className="hover:text-cyan-400 transition duration-300">{t}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-6">Contact</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>📍 Mumbai, India</li>
              <li>💬 Remote IT Support Available</li>
              <li>
                <a
                  href="https://wa.me/918454031225"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition"
                >
                  📱 +91 84540 31225
                </a>
              </li>
              <li>
                <Link href="/contact" className="hover:text-cyan-400 transition">
                  📧 Send a Support Request
                </Link>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-500 text-sm">
          <p>© 2026 Everyday Cyber AI. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/about" className="hover:text-cyan-400 transition">About</Link>
            <Link href="/contact" className="hover:text-cyan-400 transition">Contact</Link>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/918454031225"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-cyan-500 hover:bg-cyan-400 text-black px-5 py-4 rounded-full shadow-2xl font-semibold z-50 transition pulse-ring"
      >
        WhatsApp
      </a>

      {/* Scroll To Top */}
      <a
        href="#home"
        aria-label="Scroll to top"
        className="fixed bottom-24 right-6 bg-white/10 backdrop-blur-md border border-gray-700 hover:border-cyan-400 hover:text-cyan-400 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-2xl z-50 transition duration-300"
      >
        ↑
      </a>

    </main>
  );
}
