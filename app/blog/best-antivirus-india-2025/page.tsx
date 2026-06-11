import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Best Antivirus for India 2025 — Top 5 Reviewed | Everyday Cyber AI",
  description: "Best antivirus software for India 2025 — Quick Heal, Kaspersky, Bitdefender compared. Which antivirus is best for Windows PC, laptop and Android in India? Expert review.",
  keywords: "best antivirus India 2025, Quick Heal vs Kaspersky India, best antivirus for Windows India, free antivirus India, best internet security India 2025",
  openGraph: {
    title: "Best Antivirus for India 2025 — Top 5 Reviewed",
    description: "Quick Heal, Kaspersky, Bitdefender compared for Indian users. Find the best antivirus for your budget.",
    type: "article",
    url: "https://everydaycyberai.com/blog/best-antivirus-india-2025",
  },
  alternates: { canonical: "https://everydaycyberai.com/blog/best-antivirus-india-2025" },
};

const antiviruses = [
  {
    rank: 1, name: "Kaspersky Standard", price: "₹1,199/year",
    rating: 4.8, badge: "⭐ Best Overall",
    pros: ["Highest detection rate (99.9%)", "Minimal system slowdown", "Excellent web & phishing protection", "Banking protection built-in"],
    cons: ["Slightly expensive", "Russian company (privacy concern for some)"],
    bestFor: "Best overall protection for Windows",
    href: "https://www.kaspersky.co.in",
  },
  {
    rank: 2, name: "Quick Heal Total Security", price: "₹999/year",
    rating: 4.5, badge: "🇮🇳 Best Indian",
    pros: ["Made in India — local support in Hindi", "Good ransomware protection", "Parental controls included", "Lightweight"],
    cons: ["Detection rate slightly lower than international brands", "UI is old-fashioned"],
    bestFor: "Best for Indian users who want local support",
    href: "https://www.quickheal.co.in",
  },
  {
    rank: 3, name: "Bitdefender Total Security", price: "₹1,499/year",
    rating: 4.7, badge: "🏆 Best Features",
    pros: ["Best feature set", "VPN included (200MB/day)", "Multi-device (5 devices)", "Autopilot mode"],
    cons: ["More expensive", "VPN data limit on free tier"],
    bestFor: "Best for families with multiple devices",
    href: "https://www.bitdefender.com",
  },
  {
    rank: 4, name: "Windows Defender (Free)", price: "Free",
    rating: 4.0, badge: "🆓 Best Free",
    pros: ["Completely free", "Built into Windows 10/11", "No installation needed", "Regular Microsoft updates"],
    cons: ["Basic features only", "No advanced ransomware protection", "No VPN or password manager"],
    bestFor: "Basic protection for budget users",
    href: "https://www.microsoft.com/en-in/windows/comprehensive-security",
  },
  {
    rank: 5, name: "Malwarebytes", price: "Free / ₹1,200/year",
    rating: 4.4, badge: "🔍 Best Scanner",
    pros: ["Excellent malware removal", "Great for infected systems", "Free version available", "Lightweight"],
    cons: ["Free version is scanner only (no real-time)", "Not a full antivirus replacement"],
    bestFor: "Best for cleaning already infected systems",
    href: "https://www.malwarebytes.com",
  },
];

export default function BestAntivirusPage() {
  return (
    <main className="min-h-screen text-white px-6 py-12 relative z-10">
      <div className="max-w-4xl mx-auto">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-cyan-400 transition">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-cyan-400 transition">Blog</Link>
          <span>/</span>
          <span className="text-gray-400">Best Antivirus India 2025</span>
        </div>

        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-3 py-1 rounded-full text-xs">Cyber Security</span>
            <span className="text-gray-500 text-xs flex items-center">⏱ 8 min read</span>
            <span className="text-gray-500 text-xs flex items-center">📅 Updated June 2026</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Best Antivirus for India 2025 —<span className="text-cyan-400"> Top 5 Reviewed</span>
          </h1>
          <div className="bg-gradient-to-r from-cyan-500/10 to-transparent border-l-2 border-cyan-500 pl-5 py-4 rounded-r-xl mb-8">
            <p className="text-lg text-gray-300 leading-relaxed">
              India mein cyber attacks 2025 mein 40% badhein. Sahi antivirus choose karna ab zaroorat hai, luxury nahi.
              Hamne top 5 antivirus software test kiye — yahan hai honest comparison especially for Indian users.
            </p>
          </div>
        </div>

        {/* Quick Answer Box */}
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6 mb-10">
          <h2 className="text-yellow-400 font-bold mb-3">⚡ Quick Answer</h2>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>🏆 <strong className="text-white">Best Overall:</strong> Kaspersky Standard (₹1,199/year)</li>
            <li>🇮🇳 <strong className="text-white">Best for India:</strong> Quick Heal Total Security (₹999/year)</li>
            <li>👨‍👩‍👧 <strong className="text-white">Best for Families:</strong> Bitdefender Total Security (₹1,499/year)</li>
            <li>🆓 <strong className="text-white">Best Free:</strong> Windows Defender (Built into Windows)</li>
            <li>🔧 <strong className="text-white">Best for Cleaning:</strong> Malwarebytes Free</li>
          </ul>
        </div>

        {/* Why You Need Antivirus */}
        <div className="bg-black/40 border border-zinc-700/60 rounded-2xl p-6 mb-10">
          <h2 className="text-2xl font-bold mb-4">Why Do You Need Antivirus in India?</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-400">
            {[
              "India mein 2025 mein 1.39 million cyber attacks hue",
              "UPI fraud cases 85% badhein pichle saal",
              "Ransomware ab mobile phones ko bhi target kar raha hai",
              "Fake apps Play Store bypass karke install ho jaate hain",
              "Public WiFi pe data chori bahut common hai India mein",
              "Phishing emails ab Hindi mein aane lage hain",
            ].map(point => (
              <div key={point} className="flex gap-2">
                <span className="text-red-400 shrink-0">⚠</span>
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Antivirus Reviews */}
        <h2 className="text-3xl font-bold mb-8">Top 5 Antivirus for India — Detailed Reviews</h2>
        <div className="space-y-8 mb-12">
          {antiviruses.map((av) => (
            <div key={av.name} className="bg-black/40 border border-zinc-700/60 rounded-2xl p-6 hover:border-cyan-400/40 transition">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-cyan-500 text-black rounded-full flex items-center justify-center font-black text-lg">
                    {av.rank}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold">{av.name}</h3>
                      <span className="text-xs bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded-full">{av.badge}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      {"⭐".repeat(Math.floor(av.rating))}
                      <span className="text-yellow-400 text-sm ml-1">{av.rating}/5</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-cyan-400 font-bold text-xl">{av.price}</p>
                </div>
              </div>

              <p className="text-cyan-400 text-sm font-semibold mb-3">✅ Best for: {av.bestFor}</p>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-green-400 text-xs font-bold mb-2">PROS</p>
                  <ul className="space-y-1">
                    {av.pros.map(p => <li key={p} className="text-gray-400 text-sm flex gap-1.5"><span className="text-green-400">+</span>{p}</li>)}
                  </ul>
                </div>
                <div>
                  <p className="text-red-400 text-xs font-bold mb-2">CONS</p>
                  <ul className="space-y-1">
                    {av.cons.map(c => <li key={c} className="text-gray-400 text-sm flex gap-1.5"><span className="text-red-400">−</span>{c}</li>)}
                  </ul>
                </div>
              </div>

              <a href={av.href} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 px-4 py-2 rounded-xl text-sm font-semibold transition">
                Check Price & Download →
              </a>
            </div>
          ))}
        </div>

        {/* Buying Guide */}
        <div className="bg-black/40 border border-zinc-700/60 rounded-2xl p-6 mb-10">
          <h2 className="text-2xl font-bold mb-6">Antivirus Kharidne Se Pehle — 5 Zaroori Baatein</h2>
          <div className="space-y-4">
            {[
              { q: "Free vs Paid?", a: "Windows Defender free mein theek hai for basic use. Lekin banking, online shopping ya business ke liye paid antivirus lena zaroori hai — extra features bahut important hain." },
              { q: "Kitne devices cover karein?", a: "Family ke liye minimum 3-device plan lo. Bitdefender aur Kaspersky ke 5-device plans best value dete hain." },
              { q: "Performance impact?", a: "Kaspersky aur Bitdefender dono lightweight hain — background mein chale to system slow nahi hoga. Quick Heal bhi theek hai." },
              { q: "Renewal price?", a: "Pehle saal discount hota hai — renewal mein price badhti hai. Amazon ya Flipkart se kharidna often cheaper hota hai official site se." },
              { q: "Free trial available?", a: "Kaspersky, Bitdefender aur Malwarebytes sab 30-day free trial dete hain. Pehle try karo, phir kharido." },
            ].map(({ q, a }) => (
              <div key={q} className="border-b border-zinc-800 pb-4 last:border-0">
                <p className="text-cyan-400 font-semibold mb-1">Q: {q}</p>
                <p className="text-gray-400 text-sm">{a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl p-6 mb-8 text-center">
          <h3 className="text-xl font-bold mb-2">Antivirus Setup mein Help Chahiye?</h3>
          <p className="text-gray-400 text-sm mb-4">Hamari team antivirus install, configure aur optimize karne mein help karti hai — remote support available</p>
          <div className="flex gap-3 justify-center">
            <Link href="/pricing" className="bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-2.5 rounded-xl font-bold text-sm transition">
              View Support Plans
            </Link>
            <Link href="/recommended" className="border border-cyan-500/40 text-cyan-400 px-6 py-2.5 rounded-xl font-semibold text-sm transition hover:border-cyan-400">
              See All Recommendations
            </Link>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-6 border-t border-zinc-800">
          <Link href="/blog" className="text-gray-400 hover:text-cyan-400 transition text-sm flex items-center gap-1">
            ← All Articles
          </Link>
          <Link href="/tools/password-strength" className="text-gray-400 hover:text-cyan-400 transition text-sm">
            Check Password Strength →
          </Link>
        </div>

      </div>
    </main>
  );
}
