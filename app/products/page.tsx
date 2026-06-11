import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Digital Products — Cyber Security Guides & Checklists | Everyday Cyber AI",
  description: "Download cyber security guides, checklists and handbooks for India. WhatsApp Security Checklist, Cyber Security Handbook, Business Security Guide — affordable PDF downloads.",
  keywords: "cyber security guide India PDF, WhatsApp security checklist, cyber security handbook India, business security guide India download",
  alternates: { canonical: "https://everydaycyberai.in/products" },
};

const products = [
  {
    id: "whatsapp-checklist",
    icon: "💬",
    title: "WhatsApp Security Checklist",
    subtitle: "Protect yourself from WhatsApp scams & hacks",
    price: "₹49",
    originalPrice: "₹99",
    pages: "2 pages",
    format: "PDF",
    badge: "🔥 Best Seller",
    features: [
      "15-point security checklist",
      "Common WhatsApp scams explained",
      "Privacy settings guide",
      "What to do if account is hacked",
      "Printable format",
    ],
    instamojo: "#", // Add Instamojo link here
    available: false,
  },
  {
    id: "cyber-handbook",
    icon: "📘",
    title: "Cyber Security Handbook India",
    subtitle: "Complete beginner's guide to staying safe online",
    price: "₹199",
    originalPrice: "₹499",
    pages: "30 pages",
    format: "PDF",
    badge: "⭐ Popular",
    features: [
      "Password security complete guide",
      "UPI & banking fraud prevention",
      "Safe browsing tips",
      "Social media privacy",
      "What to do in cyber emergency",
      "India-specific resources & helplines",
    ],
    instamojo: "#",
    available: false,
  },
  {
    id: "business-guide",
    icon: "🏢",
    title: "How to Secure Your Business",
    subtitle: "Complete IT security guide for small businesses India",
    price: "₹499",
    originalPrice: "₹999",
    pages: "50 pages",
    format: "PDF",
    badge: "💼 For Business",
    features: [
      "Employee security policy template",
      "Network security checklist",
      "CCTV & surveillance guide",
      "Data backup strategy",
      "Firewall basics",
      "Cyber insurance guide",
      "Incident response plan template",
    ],
    instamojo: "#",
    available: false,
  },
];

export default function ProductsPage() {
  return (
    <main className="min-h-screen text-white px-6 py-12 relative z-10">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-14">
          <div className="inline-block bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-4 py-2 rounded-full text-sm mb-6">
            📚 Digital Downloads
          </div>
          <h1 className="text-5xl font-bold mb-6">
            Cyber Security
            <span className="text-cyan-400"> Guides & Checklists</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Expert-written guides to protect yourself and your business online — affordable PDF downloads, instant delivery.
          </p>
        </div>

        {/* Coming Soon Banner */}
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-5 mb-10 text-center">
          <p className="text-yellow-400 font-bold text-lg mb-2">🚀 Launching Soon!</p>
          <p className="text-gray-400 text-sm">Our digital products are being finalized. Register your interest and get <strong className="text-white">50% launch discount!</strong></p>
          <div className="flex gap-3 justify-center mt-4">
            <a href="https://wa.me/918454031225?text=Hi!%20I%20am%20interested%20in%20your%20cyber%20security%20PDF%20guides.%20Please%20notify%20me%20on%20launch."
              target="_blank" rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-500 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition">
              💬 Notify Me on WhatsApp
            </a>
            <Link href="/contact" className="border border-cyan-500/40 text-cyan-400 px-6 py-2.5 rounded-xl font-semibold text-sm transition hover:border-cyan-400">
              Contact Us
            </Link>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {products.map((p) => (
            <div key={p.id}
              className="bg-black/40 backdrop-blur-sm border border-zinc-700/60 rounded-3xl p-7 flex flex-col hover:border-cyan-400/40 transition relative">
              <div className="absolute -top-3 left-6">
                <span className="bg-cyan-500 text-black text-xs font-bold px-3 py-1 rounded-full">{p.badge}</span>
              </div>
              <div className="text-5xl mb-5 mt-2">{p.icon}</div>
              <h3 className="text-xl font-bold mb-2">{p.title}</h3>
              <p className="text-gray-400 text-sm mb-5">{p.subtitle}</p>

              <div className="flex items-center gap-3 mb-5">
                <span className="text-3xl font-black text-cyan-400">{p.price}</span>
                <span className="text-gray-600 line-through text-sm">{p.originalPrice}</span>
                <span className="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded">
                  {Math.round((1 - parseInt(p.price.slice(1)) / parseInt(p.originalPrice.slice(1))) * 100)}% OFF
                </span>
              </div>

              <div className="flex gap-3 text-xs text-gray-500 mb-5">
                <span>📄 {p.pages}</span>
                <span>⬇ {p.format}</span>
                <span>📱 Mobile friendly</span>
              </div>

              <ul className="space-y-2 flex-1 mb-6">
                {p.features.map(f => (
                  <li key={f} className="flex gap-2 text-sm text-gray-300">
                    <span className="text-green-400 shrink-0">✓</span>{f}
                  </li>
                ))}
              </ul>

              <button className="w-full bg-zinc-700 text-gray-400 py-3 rounded-xl font-semibold cursor-not-allowed text-sm">
                🔜 Coming Soon
              </button>
            </div>
          ))}
        </div>

        {/* Free Stuff CTA */}
        <div className="mt-16 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-3xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Meanwhile — Use Our Free Tools!</h2>
          <p className="text-gray-400 mb-6">30+ free cyber security and productivity tools — no download, no signup needed</p>
          <Link href="/tools" className="bg-cyan-500 hover:bg-cyan-400 text-black px-8 py-3 rounded-xl font-bold transition inline-block">
            Explore Free Tools →
          </Link>
        </div>

      </div>
    </main>
  );
}
