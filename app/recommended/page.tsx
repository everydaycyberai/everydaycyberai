import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Best Cyber Security Tools & Software India 2025 — Recommended | Everyday Cyber AI",
  description:
    "Best antivirus, VPN, password manager and security tools for India 2025. Expert-reviewed recommendations to keep your devices safe. Trusted by Everyday Cyber AI.",
  keywords:
    "best antivirus India 2025, best VPN India, password manager India free, cyber security software India, Quick Heal vs Kaspersky, NordVPN India review",
  alternates: { canonical: "https://everydaycyberai.in/recommended" },
};

const tools = [
  {
    category: "🛡️ Antivirus & Internet Security",
    items: [
      {
        name: "Quick Heal Total Security",
        badge: "🇮🇳 Made in India",
        rating: 4.5,
        price: "₹999/year",
        desc: "India's most popular antivirus — best for Windows PCs, laptops and Android phones. Includes banking protection and ransomware defense.",
        pros: ["Made in India, good local support", "Excellent ransomware protection", "Lightweight on system"],
        cons: ["Interface could be better"],
        href: "https://www.quickheal.co.in",
        affiliate: false,
        bestFor: "Individuals & families",
      },
      {
        name: "Kaspersky Standard",
        badge: "⭐ Editor's Choice",
        rating: 4.8,
        price: "₹1,199/year",
        desc: "World's best antivirus detection rate. Excellent for businesses and advanced users who want maximum protection.",
        pros: ["Highest detection rate globally", "Minimal performance impact", "Excellent web protection"],
        cons: ["Slightly expensive"],
        href: "https://www.kaspersky.co.in",
        affiliate: false,
        bestFor: "Businesses & power users",
      },
    ],
  },
  {
    category: "🌐 VPN Services",
    items: [
      {
        name: "NordVPN",
        badge: "🏆 Best Overall",
        rating: 4.8,
        price: "₹269/month",
        desc: "World's most trusted VPN — use for safe browsing on public WiFi, access blocked content and protect your privacy online.",
        pros: ["6 devices simultaneously", "No-logs policy verified", "Fast speeds in India"],
        cons: ["Slightly premium priced"],
        href: "https://nordvpn.com",
        affiliate: true,
        bestFor: "Privacy & security",
      },
      {
        name: "Proton VPN",
        badge: "🆓 Best Free",
        rating: 4.5,
        price: "Free / ₹199/month",
        desc: "Switzerland-based VPN with a genuinely free plan. No data limits on free tier — best free VPN for India.",
        pros: ["Free plan available", "Open source", "Strong privacy laws"],
        cons: ["Free plan has limited servers"],
        href: "https://protonvpn.com",
        affiliate: false,
        bestFor: "Budget users",
      },
    ],
  },
  {
    category: "🔐 Password Managers",
    items: [
      {
        name: "Bitwarden",
        badge: "🆓 100% Free",
        rating: 4.7,
        price: "Free / ₹83/month Premium",
        desc: "Best free password manager — open source, secure and works on all devices. Store unlimited passwords for free.",
        pros: ["Completely free for individuals", "Open source & audited", "Works on all platforms"],
        cons: ["Interface slightly basic"],
        href: "https://bitwarden.com",
        affiliate: false,
        bestFor: "Everyone — start here",
      },
      {
        name: "1Password",
        badge: "💼 Best for Teams",
        rating: 4.8,
        price: "₹250/month",
        desc: "Best password manager for business teams — excellent sharing, admin controls and security features.",
        pros: ["Best team sharing features", "Travel mode", "Excellent UI"],
        cons: ["No free plan"],
        href: "https://1password.com",
        affiliate: true,
        bestFor: "Business teams",
      },
    ],
  },
  {
    category: "🌐 Web Hosting (For Businesses)",
    items: [
      {
        name: "Hostinger",
        badge: "💰 Best Value",
        rating: 4.6,
        price: "₹69/month",
        desc: "Best affordable hosting for India — fast servers, free SSL, free domain. Perfect for small business websites.",
        pros: ["Cheapest reliable hosting India", "Free SSL + domain", "Good India server speeds"],
        cons: ["Support can be slow"],
        href: "https://www.hostinger.in",
        affiliate: true,
        bestFor: "Small business websites",
      },
    ],
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1,2,3,4,5].map(i => (
        <svg key={i} className={`w-4 h-4 ${i <= Math.floor(rating) ? "text-yellow-400" : i - 0.5 <= rating ? "text-yellow-400" : "text-gray-600"}`}
          fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
      <span className="text-yellow-400 text-sm font-bold ml-1">{rating}</span>
    </div>
  );
}

export default function RecommendedPage() {
  return (
    <main className="min-h-screen text-white px-6 py-12 relative z-10">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-4 py-2 rounded-full text-sm mb-6">
            Expert Reviewed — Updated June 2026
          </div>
          <h1 className="text-5xl font-bold mb-6">
            Best Cyber Security
            <span className="text-cyan-400"> Tools India 2026</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Tested and reviewed by our IT security experts — the best antivirus, VPN,
            password managers and security software for India.
          </p>
          <div className="mt-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl px-4 py-2 inline-block">
            <p className="text-yellow-400 text-xs">⚠️ Disclosure: Some links below are affiliate links. We may earn a commission if you purchase — at no extra cost to you. We only recommend tools we genuinely trust.</p>
          </div>
        </div>

        {/* Tools */}
        <div className="space-y-14">
          {tools.map((cat) => (
            <div key={cat.category}>
              <h2 className="text-2xl font-bold mb-6 pb-3 border-b border-zinc-700/60">{cat.category}</h2>
              <div className="space-y-6">
                {cat.items.map((item) => (
                  <div key={item.name}
                    className="bg-black/40 backdrop-blur-sm border border-zinc-700/60 rounded-2xl p-6 hover:border-cyan-400/40 transition">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-xl font-bold">{item.name}</h3>
                          <span className="text-xs bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded-full">
                            {item.badge}
                          </span>
                          {item.affiliate && (
                            <span className="text-xs bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full">
                              Affiliate
                            </span>
                          )}
                        </div>
                        <StarRating rating={item.rating} />
                      </div>
                      <div className="text-right">
                        <p className="text-cyan-400 font-bold text-lg">{item.price}</p>
                        <p className="text-gray-500 text-xs">Best for: {item.bestFor}</p>
                      </div>
                    </div>

                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">{item.desc}</p>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-green-400 text-xs font-semibold mb-2">✅ Pros</p>
                        <ul className="space-y-1">
                          {item.pros.map(p => <li key={p} className="text-gray-400 text-xs flex gap-1.5"><span className="text-green-400">+</span>{p}</li>)}
                        </ul>
                      </div>
                      <div>
                        <p className="text-red-400 text-xs font-semibold mb-2">❌ Cons</p>
                        <ul className="space-y-1">
                          {item.cons.map(c => <li key={c} className="text-gray-400 text-xs flex gap-1.5"><span className="text-red-400">−</span>{c}</li>)}
                        </ul>
                      </div>
                    </div>

                    <a href={item.href} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black px-5 py-2.5 rounded-xl font-bold text-sm transition">
                      Visit Website →
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-3xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Need help choosing or setting up?</h2>
          <p className="text-gray-400 mb-6">Our experts can help you choose the right security tools and set them up for your business.</p>
          <Link href="/contact"
            className="bg-cyan-500 hover:bg-cyan-400 text-black px-8 py-3 rounded-xl font-bold transition inline-block">
            Get Free Consultation →
          </Link>
        </div>

      </div>
    </main>
  );
}
