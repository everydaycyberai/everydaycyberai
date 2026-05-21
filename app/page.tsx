"use client";

import { useState } from "react";
import Link from "next/link";
export default function Home() {
  const [mobileMenu, setMobileMenu] = useState(false);
  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Glow Effects */}
<div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full"></div>

<div className="absolute top-[600px] right-0 w-[400px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full"></div>
      
      {/* Navbar */}
      

      {/* Hero Section */}
      <section id="home" className="pt-40 pb-24 px-6">

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center">

          {/* Left Side */}
          <div>

            <div className="inline-block bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-4 py-2 rounded-full text-sm mb-6">
              Everyday IT Solutions Powered by AI
            </div>

            <h2 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Smart IT Support,
              <span className="text-cyan-400"> Surveillance </span>
              & Automation Solutions
            </h2>

            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Professional IT infrastructure, remote support,
              surveillance systems, firewall management,
              data center assistance and AI-powered utility tools
              for modern businesses.
            </p>

            <div className="flex gap-4">

              <button className="bg-cyan-500 hover:bg-cyan-400 hover:shadow-[0_0_25px_rgba(34,211,238,0.45)] text-black px-6 py-3 rounded-xl font-semibold transition duration-300">
                Request Support
              </button>

              <button className="border border-gray-700 hover:border-cyan-400 px-6 py-3 rounded-xl transition">
                Explore Services
              </button>

            </div>

          </div>

          {/* Right Side */}
          <div className="relative">

            <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border border-cyan-500/20 rounded-3xl p-10 backdrop-blur-sm shadow-[0_0_60px_rgba(34,211,238,0.08)] relative overflow-hidden">
             <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-400/10 blur-3xl rounded-full"></div>
              <div className="space-y-6">

                <div className="bg-black/40 border border-gray-800 rounded-2xl p-5 float-card">
                  <h3 className="text-cyan-400 font-semibold mb-2">
                    Remote IT Support
                  </h3>

                  <p className="text-gray-400 text-sm">
                    Fast troubleshooting & support for offices and businesses.
                  </p>
                </div>

                <div className="bg-black/40 border border-gray-800 rounded-2xl p-5 float-card-delay">
                  <h3 className="text-cyan-400 font-semibold mb-2">
                    Data Center Support
                  </h3>

                  <p className="text-gray-400 text-sm">
                    Rack, hardware replacement & remote hands assistance.
                  </p>
                </div>

                <div className="bg-black/40 border border-gray-800 rounded-2xl p-5 float-card-slow">
                  <h3 className="text-cyan-400 font-semibold mb-2">
                    AI Utility Tools
                  </h3>

                  <p className="text-gray-400 text-sm">
                    Smart automation tools to simplify IT operations.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>
      {/* Services Section */}
      <section
  id="services"
  className="py-24 px-6 bg-gradient-to-b from-black to-gray-950 fade-up"
>

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16">

            <div className="inline-block bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-4 py-2 rounded-full text-sm mb-6">
              Professional IT Services
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Complete Technology &
              <span className="text-cyan-400"> Support Solutions</span>
            </h2>

            <p className="text-gray-400 max-w-3xl mx-auto text-lg">
              End-to-end IT support, surveillance systems,
              infrastructure management and automation solutions
              designed for modern businesses and enterprises.
            </p>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            {/* Card 1 */}
            <div className="bg-black border border-gray-800 hover:border-cyan-400 rounded-3xl p-8 transition duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]">

              <div className="text-cyan-400 text-4xl mb-6">💻</div>

              <h3 className="text-2xl font-semibold mb-4">
                IT Support
              </h3>

              <p className="text-gray-400 leading-relaxed">
                Remote troubleshooting, desktop support,
                software installation and office IT assistance.
              </p>

            </div>

            {/* Card 2 */}
            <div className="bg-black border border-gray-800 hover:border-cyan-400 rounded-3xl p-8 transition duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]">

              <div className="text-cyan-400 text-4xl mb-6">🛡️</div>

              <h3 className="text-2xl font-semibold mb-4">
                Firewall & Security
              </h3>

              <p className="text-gray-400 leading-relaxed">
                Firewall configuration, VPN support,
                network security and access management solutions.
              </p>

            </div>

            {/* Card 3 */}
            <div className="bg-black border border-gray-800 hover:border-cyan-400 rounded-3xl p-8 transition duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]">

              <div className="text-cyan-400 text-4xl mb-6">📹</div>

              <h3 className="text-2xl font-semibold mb-4">
                Surveillance Support
              </h3>

              <p className="text-gray-400 leading-relaxed">
                CCTV systems, DVR/NVR troubleshooting,
                ATM surveillance and remote monitoring support.
              </p>

            </div>

            {/* Card 4 */}
            <div className="bg-black border border-gray-800 hover:border-cyan-400 rounded-3xl p-8 transition duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]">

              <div className="text-cyan-400 text-4xl mb-6">🖥️</div>

              <h3 className="text-2xl font-semibold mb-4">
                Data Center Support
              </h3>

              <p className="text-gray-400 leading-relaxed">
                Rack installation, hardware replacement,
                smart hands and remote infrastructure assistance.
              </p>

            </div>

          </div>

        </div>

      </section>
      {/* Why Choose Us Section */}
      <section className="py-24 px-6 bg-black fade-up">

        <div className="max-w-7xl mx-auto">

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left Content */}
            <div>

              <div className="inline-block bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-4 py-2 rounded-full text-sm mb-6">
                Why Choose Us
              </div>

              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                Reliable IT &
                <span className="text-cyan-400"> Infrastructure Support</span>
              </h2>

              <p className="text-gray-400 text-lg leading-relaxed mb-10">
                We provide modern businesses with fast,
                scalable and professional technology support
                including surveillance systems, networking,
                firewall management and remote assistance.
              </p>

              <div className="space-y-6">

                <div className="flex items-start gap-4">
                  <div className="text-cyan-400 text-2xl">⚡</div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Fast Response Support
                    </h3>

                    <p className="text-gray-400">
                      Quick troubleshooting and remote assistance
                      for business-critical systems.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-cyan-400 text-2xl">🛡️</div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Secure Infrastructure
                    </h3>

                    <p className="text-gray-400">
                      Professional firewall, VPN and security
                      management solutions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-cyan-400 text-2xl">🌐</div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Multi-site Support
                    </h3>

                    <p className="text-gray-400">
                      Support for offices, ATM locations,
                      surveillance systems and enterprise networks.
                    </p>
                  </div>
                </div>

              </div>

            </div>

            {/* Right Stats */}
            <div className="grid grid-cols-2 gap-6">

              <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-3xl p-10 text-center">

                <h3 className="text-5xl font-bold text-cyan-400 mb-4">
                  24/7
                </h3>

                <p className="text-gray-400">
                  Remote Support Availability
                </p>

              </div>

              <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-3xl p-10 text-center">

                <h3 className="text-5xl font-bold text-cyan-400 mb-4">
                  2000+
                </h3>

                <p className="text-gray-400">
                  Surveillance Sites Experience
                </p>

              </div>

              <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-3xl p-10 text-center">

                <h3 className="text-5xl font-bold text-cyan-400 mb-4">
                  60+
                </h3>

                <p className="text-gray-400">
                  Devices Managed
                </p>

              </div>

              <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-3xl p-10 text-center">

                <h3 className="text-5xl font-bold text-cyan-400 mb-4">
                  AI
                </h3>

                <p className="text-gray-400">
                  Automation Focused Solutions
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>
      {/* Tools Section */}
      <section
  id="tools"
  className="py-24 px-6 bg-gradient-to-b from-black to-gray-950 fade-up"
>

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16">

            <div className="inline-block bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-4 py-2 rounded-full text-sm mb-6">
              Smart Utility Tools
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Free IT &
              <span className="text-cyan-400"> Productivity Tools</span>
            </h2>

            <p className="text-gray-400 max-w-3xl mx-auto text-lg">
              Useful online tools designed to help businesses,
              IT teams and everyday users solve problems quickly
              and efficiently.
            </p>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* Tool Card 1 */}
            <div className="group bg-black border border-gray-800 hover:border-cyan-400 rounded-3xl p-8 transition duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]">

              <div className="text-5xl mb-6">📄</div>

              <h3 className="text-2xl font-semibold mb-4 group-hover:text-cyan-400 transition">
                PDF Tools
              </h3>

              <p className="text-gray-400 leading-relaxed mb-6">
                Merge PDF, split PDF, compress files and convert images to PDF instantly.
              </p>

              <button className="text-cyan-400 font-semibold">
                Explore →
              </button>

            </div>

            {/* Tool Card 2 */}
            <div className="group bg-black border border-gray-800 hover:border-cyan-400 rounded-3xl p-8 transition duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]">

              <div className="text-5xl mb-6">🌐</div>

              <h3 className="text-2xl font-semibold mb-4 group-hover:text-cyan-400 transition">
                Network Tools
              </h3>

              <p className="text-gray-400 leading-relaxed mb-6">
                IP checker, DNS lookup, port testing and password generator utilities.
              </p>

              <button className="text-cyan-400 font-semibold">
                Explore →
              </button>

            </div>

            {/* Tool Card 3 */}
            <div className="group bg-black border border-gray-800 hover:border-cyan-400 rounded-3xl p-8 transition duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]">

              <div className="text-5xl mb-6">📹</div>

              <h3 className="text-2xl font-semibold mb-4 group-hover:text-cyan-400 transition">
                CCTV Calculators
              </h3>

              <p className="text-gray-400 leading-relaxed mb-6">
                Storage calculators, bandwidth estimators and surveillance planning tools.
              </p>

              <button className="text-cyan-400 font-semibold">
                Explore →
              </button>

            </div>

            {/* Tool Card 4 */}
            <div className="group bg-black border border-gray-800 hover:border-cyan-400 rounded-3xl p-8 transition duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]">

              <div className="text-5xl mb-6">🤖</div>

              <h3 className="text-2xl font-semibold mb-4 group-hover:text-cyan-400 transition">
                AI Writing Tools
              </h3>

              <p className="text-gray-400 leading-relaxed mb-6">
                Generate emails, complaint letters, SOPs and IT documentation instantly.
              </p>

              <button className="text-cyan-400 font-semibold">
                Explore →
              </button>

            </div>

            {/* Tool Card 5 */}
            <div className="group bg-black border border-gray-800 hover:border-cyan-400 rounded-3xl p-8 transition duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]">

              <div className="text-5xl mb-6">🧾</div>

              <h3 className="text-2xl font-semibold mb-4 group-hover:text-cyan-400 transition">
                Office Utilities
              </h3>

              <p className="text-gray-400 leading-relaxed mb-6">
                GST invoice generators, quotation creators and salary slip tools.
              </p>

              <button className="text-cyan-400 font-semibold">
                Explore →
              </button>

            </div>

            {/* Tool Card 6 */}
            <div className="group bg-black border border-gray-800 hover:border-cyan-400 rounded-3xl p-8 transition duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]">

              <div className="text-5xl mb-6">⚙️</div>

              <h3 className="text-2xl font-semibold mb-4 group-hover:text-cyan-400 transition">
                Automation Tools
              </h3>

              <p className="text-gray-400 leading-relaxed mb-6">
                Smart automation utilities designed for IT operations and monitoring tasks.
              </p>

              <button className="text-cyan-400 font-semibold">
                Explore →
              </button>

            </div>

          </div>

        </div>

      </section>
      {/* Footer Section */}
      <footer
  id="contact"
  className="bg-black border-t border-gray-800 py-16 px-6 fade-up"
>

        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">

          {/* Company Info */}
          <div>

            <h2 className="text-2xl font-bold text-cyan-400 mb-4">
              Everyday Cyber AI
            </h2>

            <p className="text-gray-400 leading-relaxed mb-6">
              Professional IT support, surveillance systems,
              infrastructure management and AI-powered business solutions.
            </p>

            <p className="text-gray-500 text-sm">
              IT Support & Cyber Security Specialist – Mumbai
            </p>

          </div>

          {/* Services */}
          <div>

            <h3 className="text-xl font-semibold mb-6">
              Services
            </h3>

            <ul className="space-y-3 text-gray-400">

              <li className="hover:text-cyan-400 transition duration-300 cursor-pointer">
  IT Support
</li>
              <li className="hover:text-cyan-400 transition duration-300 cursor-pointer">
  Firewall & Security
</li>
              <li className="hover:text-cyan-400 transition duration-300 cursor-pointer">
  Data Center Support
</li>
              <li className="hover:text-cyan-400 transition duration-300 cursor-pointer">
    Surveillance Support
  </li>
              <li className="hover:text-cyan-400 transition duration-300 cursor-pointer">
    AI Automation
  </li>

            </ul>

          </div>

          {/* Tools */}
          <div>

            <h3 className="text-xl font-semibold mb-6">
              Tools
            </h3>

            <ul className="space-y-3 text-gray-400">

              <li className="hover:text-cyan-400 transition duration-300 cursor-pointer">
                PDF Tools
                </li>
              <li className="hover:text-cyan-400 transition duration-300 cursor-pointer">
                Network Tools
                </li>
              <li className="hover:text-cyan-400 transition duration-300 cursor-pointer">
                CCTV Calculators
                </li>
              <li className="hover:text-cyan-400 transition duration-300 cursor-pointer">
                AI Writing Tools
                </li>
              <li className="hover:text-cyan-400 transition duration-300 cursor-pointer">
                Automation Tools
                </li>

            </ul>

          </div>

          {/* Contact */}
          <div>

            <h3 className="text-xl font-semibold mb-6">
              Contact
            </h3>

            <ul className="space-y-3 text-gray-400">

              <li>Mumbai, India</li>
              <li>Remote IT Support Available</li>
              <li>Business Support Services</li>

            </ul>

          </div>

        </div>

        {/* Bottom Line */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">

          © 2026 Everyday Cyber AI. All rights reserved.

        </div>

      </footer>

      {/* Floating WhatsApp Button */}
      <a
  href="https://wa.me/918454031225"
  target="_blank"
  rel="noopener noreferrer"
  className="fixed bottom-6 right-6 bg-cyan-500 hover:bg-cyan-400 text-black px-5 py-4 rounded-full shadow-2xl font-semibold z-50 transition"
>
  WhatsApp
</a>
{/* Scroll To Top Button */}
<a
  href="#home"
  className="fixed bottom-24 right-6 bg-white/10 backdrop-blur-md border border-gray-700 hover:border-cyan-400 hover:text-cyan-400 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-2xl z-50 transition duration-300"
>
  ↑
</a>
    </main>
  );
}
