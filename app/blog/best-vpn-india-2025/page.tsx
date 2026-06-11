import type { Metadata } from "next";
import Link from "next/link";
import NewsletterSubscribe from "@/components/NewsletterSubscribe";

export const metadata: Metadata = {
  title: "Best VPN for India 2025 — Top 5 Compared | Everyday Cyber AI",
  description: "Best VPN for India 2025 — NordVPN, ExpressVPN, Proton VPN compared for speed, privacy and price. Which VPN works best in India for streaming, privacy and public WiFi?",
  keywords: "best VPN India 2025, NordVPN India review, free VPN India, VPN for Android India, safe VPN India, ProtonVPN India, VPN for streaming India",
  openGraph: {
    title: "Best VPN for India 2025 — Top 5 Compared",
    description: "NordVPN, ExpressVPN, Proton VPN compared for Indian users. Speed tests, pricing and privacy analysis.",
    type: "article",
    url: "https://everydaycyberai.in/blog/best-vpn-india-2025",
  },
  alternates: { canonical: "https://everydaycyberai.in/blog/best-vpn-india-2025" },
};

const vpns = [
  {
    rank: 1, name: "NordVPN", price: "₹269/month (2yr plan)",
    rating: 4.8, badge: "🏆 Best Overall",
    features: ["6 devices simultaneously", "Double VPN encryption", "Threat Protection (blocks malware)", "India servers available", "No-logs policy — audited"],
    bestFor: "Overall best — privacy + speed + features",
    affiliate: true, href: "https://nordvpn.com",
  },
  {
    rank: 2, name: "Proton VPN", price: "Free / ₹199/month",
    rating: 4.6, badge: "🆓 Best Free VPN",
    features: ["Free plan — no data limit!", "Open source — fully audited", "Switzerland privacy laws", "No logs policy", "Secure Core servers"],
    bestFor: "Best free VPN — no data limit",
    affiliate: false, href: "https://protonvpn.com",
  },
  {
    rank: 3, name: "ExpressVPN", price: "₹500/month",
    rating: 4.7, badge: "⚡ Fastest Speed",
    features: ["Fastest VPN speeds", "94 countries", "Lightway protocol", "5 devices", "24/7 live chat support"],
    bestFor: "Best speed — streaming & gaming",
    affiliate: true, href: "https://expressvpn.com",
  },
  {
    rank: 4, name: "Surfshark", price: "₹175/month (2yr)",
    rating: 4.5, badge: "💰 Best Value",
    features: ["Unlimited devices!", "CleanWeb (ad blocker)", "Camouflage mode", "India servers", "NoBorders mode"],
    bestFor: "Best value — unlimited devices",
    affiliate: false, href: "https://surfshark.com",
  },
  {
    rank: 5, name: "Windscribe Free", price: "Free (10GB/month)",
    rating: 4.0, badge: "🆓 Good Free Option",
    features: ["10GB free per month", "10 server locations free", "Ad blocker included", "No logs policy", "Good for casual use"],
    bestFor: "Casual free use — 10GB/month",
    affiliate: false, href: "https://windscribe.com",
  },
];

export default function BestVPNPage() {
  return (
    <main className="min-h-screen text-white px-6 py-12 relative z-10">
      <div className="max-w-4xl mx-auto">

        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-cyan-400 transition">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-cyan-400 transition">Blog</Link>
          <span>/</span>
          <span className="text-gray-400">Best VPN India 2025</span>
        </div>

        <div className="mb-10">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-3 py-1 rounded-full text-xs">VPN & Privacy</span>
            <span className="text-gray-500 text-xs">⏱ 7 min read</span>
            <span className="text-gray-500 text-xs">📅 Updated June 2026</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Best VPN for India 2025 —
            <span className="text-cyan-400"> Top 5 Compared</span>
          </h1>
          <div className="bg-gradient-to-r from-cyan-500/10 to-transparent border-l-2 border-cyan-500 pl-5 py-4 rounded-r-xl mb-6">
            <p className="text-lg text-gray-300 leading-relaxed">
              Public WiFi pe banking karte hain? Office se personal browsing karte hain? Streaming sites block hain?
              VPN aapki privacy aur security ke liye zaroorat ban gaya hai. Hamne India ke liye top 5 VPN test kiye.
            </p>
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl px-4 py-2 inline-block mb-8">
            <p className="text-yellow-400 text-xs">⚠️ Disclosure: Kuch links affiliate hain — aapko extra charge nahi lagta lekin hume commission milta hai.</p>
          </div>
        </div>

        {/* Why VPN */}
        <div className="bg-black/40 border border-zinc-700/60 rounded-2xl p-6 mb-10">
          <h2 className="text-2xl font-bold mb-4">VPN Kyun Chahiye India Mein?</h2>
          <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-400">
            {[
              "☕ Cafe/mall WiFi pe banking safe karne ke liye",
              "🔒 ISP aapki browsing history track karta hai — VPN block karta hai",
              "📺 Geo-restricted content access karne ke liye",
              "🏢 Remote work pe company data secure karne ke liye",
              "🛡️ Hackers se public network pe bachne ke liye",
              "🌐 Privacy ke liye — Google/Facebook tracking se bachna",
            ].map(r => <div key={r} className="flex gap-2"><span>{r}</span></div>)}
          </div>
        </div>

        {/* VPN List */}
        <h2 className="text-3xl font-bold mb-8">Top 5 VPN for India — Detailed Comparison</h2>
        <div className="space-y-6 mb-12">
          {vpns.map((vpn) => (
            <div key={vpn.name} className="bg-black/40 border border-zinc-700/60 rounded-2xl p-6 hover:border-cyan-400/40 transition">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-cyan-500 text-black rounded-full flex items-center justify-center font-black text-lg shrink-0">{vpn.rank}</div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-xl font-bold">{vpn.name}</h3>
                      <span className="text-xs bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded-full">{vpn.badge}</span>
                      {vpn.affiliate && <span className="text-xs bg-yellow-500/10 text-yellow-400 px-2 py-0.5 rounded-full">Affiliate</span>}
                    </div>
                    <p className="text-gray-500 text-xs mt-1">{"⭐".repeat(Math.floor(vpn.rating))} {vpn.rating}/5</p>
                  </div>
                </div>
                <p className="text-cyan-400 font-bold text-xl">{vpn.price}</p>
              </div>
              <p className="text-cyan-400 text-sm font-semibold mb-3">✅ {vpn.bestFor}</p>
              <ul className="space-y-1 mb-4">
                {vpn.features.map(f => <li key={f} className="text-gray-400 text-sm flex gap-1.5"><span className="text-green-400">✓</span>{f}</li>)}
              </ul>
              <a href={vpn.href} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 px-4 py-2 rounded-xl text-sm font-semibold transition">
                Try {vpn.name} →
              </a>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl p-6 text-center mb-8">
          <h3 className="text-xl font-bold mb-2">VPN Setup mein Help Chahiye?</h3>
          <p className="text-gray-400 text-sm mb-4">Business ke liye VPN setup — remote team security hamari specialty hai</p>
          <Link href="/contact" className="bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-2.5 rounded-xl font-bold text-sm transition inline-block">
            Get Free Consultation →
          </Link>
        </div>

        {/* Newsletter */}
        <div className="my-8">
          <NewsletterSubscribe variant="inline" />
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-zinc-800">
          <Link href="/blog" className="text-gray-400 hover:text-cyan-400 transition text-sm">← All Articles</Link>
          <Link href="/blog/upi-fraud-se-kaise-bachen" className="text-gray-400 hover:text-cyan-400 transition text-sm">UPI Fraud Guide →</Link>
        </div>

      </div>
    </main>
  );
}
