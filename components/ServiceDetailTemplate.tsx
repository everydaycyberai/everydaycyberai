"use client";
import { useState } from "react";
import Link from "next/link";

export type ServiceDetail = {
  icon: string;
  title: string;
  tagline: string;
  price: string;
  priceNote: string;
  intro: string;
  included: string[];
  process: { title: string; desc: string }[];
  relatedTools?: { title: string; href: string }[];
  faqs: { q: string; a: string }[];
};

const WHATSAPP_NUMBER = "918454031225";

export default function ServiceDetailTemplate({ service }: { service: ServiceDetail }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi! I'm interested in ${service.title}. Can you share more details?`)}`;

  return (
    <main className="min-h-screen text-white px-6 py-12 relative z-10">
      <div className="max-w-5xl mx-auto">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-cyan-400 transition">Home</Link>
          <span>/</span>
          <Link href="/services" className="hover:text-cyan-400 transition">Services</Link>
          <span>/</span>
          <span className="text-gray-400">{service.title}</span>
        </div>

        {/* Hero */}
        <div className="mb-12">
          <div className="text-6xl mb-6">{service.icon}</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{service.title}</h1>
          <p className="text-gray-400 text-lg max-w-2xl leading-relaxed mb-6">{service.tagline}</p>

          <div className="flex flex-wrap items-center gap-4">
            <div className="bg-black/40 border border-cyan-500/30 rounded-2xl px-6 py-3">
              <span className="text-3xl font-black text-cyan-400">{service.price}</span>
              <span className="text-gray-500 text-sm ml-2">{service.priceNote}</span>
            </div>
            <a href={waLink} target="_blank" rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-xl font-bold transition flex items-center gap-2">
              💬 Chat on WhatsApp
            </a>
            <Link href="/contact"
              className="bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-3 rounded-xl font-bold transition">
              Request Support
            </Link>
          </div>
        </div>

        {/* Intro */}
        <div className="bg-black/40 backdrop-blur-sm border border-zinc-700/60 rounded-3xl p-8 mb-10">
          <p className="text-gray-300 leading-relaxed text-lg">{service.intro}</p>
        </div>

        {/* What's Included */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">✅ What&apos;s Included</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {service.included.map((f) => (
              <div key={f} className="flex items-start gap-3 bg-black/30 border border-zinc-800 rounded-xl p-4">
                <span className="text-cyan-400 shrink-0 mt-0.5">✓</span>
                <span className="text-gray-300 text-sm">{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Process */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">⚡ How It Works</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {service.process.map((p, i) => (
              <div key={p.title} className="bg-black/40 border border-zinc-700/60 rounded-2xl p-5 relative">
                <div className="w-8 h-8 rounded-full bg-cyan-500 text-black flex items-center justify-center text-sm font-bold mb-4">{i + 1}</div>
                <h3 className="font-semibold text-white mb-2">{p.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-3xl p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">Why Choose Everyday Cyber AI?</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: "⚡", text: "Fast Response — within 2 hours" },
              { icon: "💰", text: "Transparent Pricing — no hidden charges" },
              { icon: "🇮🇳", text: "India-based team — Hindi & English support" },
              { icon: "✅", text: "Satisfaction guaranteed" },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-3 text-gray-300 text-sm">
                <span className="text-xl">{icon}</span>{text}
              </div>
            ))}
          </div>
        </div>

        {/* Related Free Tools */}
        {service.relatedTools && service.relatedTools.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-2">🛠️ Try Our Free Tools First</h2>
            <p className="text-gray-500 text-sm mb-6">Not ready to talk yet? Check these free tools related to this service.</p>
            <div className="flex flex-wrap gap-3">
              {service.relatedTools.map((t) => (
                <Link key={t.href} href={t.href}
                  className="bg-black/40 border border-zinc-700/60 hover:border-cyan-400 text-cyan-400 px-5 py-3 rounded-xl text-sm font-medium transition">
                  {t.title} →
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* FAQ */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">❓ Frequently Asked Questions</h2>
          <div className="space-y-3">
            {service.faqs.map((f, i) => (
              <div key={f.q} className="bg-black/40 border border-zinc-700/60 rounded-2xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-6 py-4 flex items-center justify-between gap-4">
                  <span className="font-medium text-white text-sm">{f.q}</span>
                  <span className="text-cyan-400 shrink-0">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <p className="px-6 pb-4 text-gray-400 text-sm leading-relaxed">{f.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-3xl p-10 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to get started with {service.title}?</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href={waLink} target="_blank" rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-xl font-bold transition flex items-center gap-2">
              💬 Chat on WhatsApp
            </a>
            <Link href="/contact"
              className="bg-cyan-500 hover:bg-cyan-400 text-black px-8 py-4 rounded-xl font-bold transition">
              📋 Request a Quote
            </Link>
          </div>
          <Link href="/services" className="block mt-6 text-gray-500 text-sm hover:text-cyan-400 transition">← Back to all services</Link>
        </div>

      </div>
    </main>
  );
}
