import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "UPI Fraud Se Kaise Bachen 2025 — Complete Guide | Everyday Cyber AI",
  description: "UPI fraud se bachne ke tips Hindi mein — GPay, PhonePe, Paytm fraud kaise hota hai, kaise pehchanen aur kya karein agar fraud ho jaye. 1930 helpline guide.",
  keywords: "UPI fraud se kaise bachen, GPay fraud India, PhonePe scam, UPI payment fraud tips Hindi, online payment fraud India 2025, 1930 cyber helpline",
  openGraph: {
    title: "UPI Fraud Se Kaise Bachen 2025 — Complete Guide",
    description: "UPI fraud se bachne ke complete tips Hindi mein. GPay, PhonePe, Paytm fraud kaise hota hai aur kya karein.",
    type: "article",
    url: "https://everydaycyberai.in/blog/upi-fraud-se-kaise-bachen",
  },
  alternates: { canonical: "https://everydaycyberai.in/blog/upi-fraud-se-kaise-bachen" },
};

const fraudTypes = [
  {
    type: "Fake Payment Request",
    how: "Fraudster ek 'Collect Request' bhejta hai — aap sochte hain paisa aayega lekin actually jaata hai. 'Request Money' aur 'Pay' mein fark nahi samajhte log.",
    redFlag: "Koi aapko paisa bhejne ke liye UPI PIN maange — yeh HAMESHA fraud hai",
    example: "OLX pe koi buyer kehta hai 'Main aapko ₹5000 bhej raha hoon, aap PIN daalo' — actually woh aapse le raha hai",
  },
  {
    type: "Fake Customer Care Call",
    how: "Fraudster Google pe fake customer care number list karta hai. Aap call karte hain — woh aapka account 'verify' karne ke liye UPI PIN ya OTP maangte hain.",
    redFlag: "Koi bhi bank/company customer care kabhii OTP ya PIN nahi maangti",
    example: "Google pe 'Paytm customer care number' search karte hain — fraud number milta hai",
  },
  {
    type: "Screen Share Scam",
    how: "AnyDesk, TeamViewer ya Quick Support install karwate hain — screen share karke aapka UPI PIN aur banking details dekh lete hain.",
    redFlag: "Koi bhi agar phone pe koi app install karne ko kahe — REJECT karo",
    example: "'Aapka KYC update karna hai, yeh app install karo' — fraud hai",
  },
  {
    type: "Fake QR Code",
    how: "Shop pe asli QR ke upar fake QR sticker laga dete hain. Aap scan karte hain — paisa fraud ke account mein jaata hai.",
    redFlag: "QR scan karne ke baad merchant ka naam carefully check karo",
    example: "Petrol pump ya small shop pe QR code pe sticker laga ho sakta hai",
  },
  {
    type: "Prize/Lottery Fraud",
    how: "'Aapne ₹50 lakh jeete hain, processing fee bhejiye' — aap chhota amount bhejte hain, prize kabhi nahi aata",
    redFlag: "Koi bhi lottery/prize ke liye pehle paisa nahi maangta",
    example: "WhatsApp pe message: 'KBC winner hain aap, ₹500 bhejiye processing ke liye'",
  },
];

export default function UPIFraudPage() {
  return (
    <main className="min-h-screen text-white px-6 py-12 relative z-10">
      <div className="max-w-4xl mx-auto">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-cyan-400 transition">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-cyan-400 transition">Blog</Link>
          <span>/</span>
          <span className="text-gray-400">UPI Fraud Se Kaise Bachen</span>
        </div>

        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-red-500/10 border border-red-500/30 text-red-400 px-3 py-1 rounded-full text-xs">Cyber Security</span>
            <span className="text-gray-500 text-xs">⏱ 6 min read</span>
            <span className="text-gray-500 text-xs">📅 Updated June 2026</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            UPI Fraud Se Kaise Bachen —
            <span className="text-cyan-400"> Complete Guide 2025</span>
          </h1>
          <div className="bg-gradient-to-r from-red-500/10 to-transparent border-l-2 border-red-500 pl-5 py-4 rounded-r-xl mb-8">
            <p className="text-lg text-gray-300 leading-relaxed">
              India mein 2025 mein UPI fraud cases mein <strong className="text-white">85% ki badhottri</strong> hui.
              Har din hazaron log GPay, PhonePe aur Paytm fraud ka shikaar ho rahe hain.
              Yeh guide aapko batayegi — fraud kaise hota hai, kaise pehchanen aur agar ho jaaye to kya karein.
            </p>
          </div>
        </div>

        {/* Emergency Box */}
        <div className="bg-red-500/10 border border-red-500/40 rounded-2xl p-5 mb-10 flex items-center justify-between gap-4">
          <div>
            <p className="text-red-400 font-bold text-lg">🚨 UPI Fraud Hua? ABHI Call Karein!</p>
            <p className="text-gray-400 text-sm">30 minute ke andar report karne pe paisa wapas milne ke chances highest hain</p>
          </div>
          <div className="flex flex-col gap-2 shrink-0">
            <a href="tel:1930" className="bg-red-500 hover:bg-red-400 text-white px-5 py-2.5 rounded-xl font-black text-xl transition text-center">1930</a>
            <Link href="/tools/scam-analyzer" className="bg-black/40 border border-red-500/30 text-red-400 px-4 py-1.5 rounded-xl text-xs text-center hover:border-red-400 transition">
              Get Help Guide →
            </Link>
          </div>
        </div>

        {/* Golden Rules */}
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6 mb-10">
          <h2 className="text-yellow-400 font-bold text-xl mb-4">⭐ UPI Safety — 5 Golden Rules</h2>
          <div className="space-y-3">
            {[
              { rule: "UPI PIN sirf PAYMENT karte waqt daalo — kabhi bhi verification/kyc ke liye nahi", icon: "🔢" },
              { rule: "Paisa RECEIVE karne ke liye koi PIN nahi lagta — agar koi maange to FRAUD hai", icon: "💸" },
              { rule: "OTP kabhi kisi ke saath share nahi karein — bank wale bhi nahi maangte", icon: "📱" },
              { rule: "QR code scan karne ke baad merchant naam check karein send karne se pehle", icon: "▦" },
              { rule: "AnyDesk/TeamViewer kisi ke kahne pe install mat karein apne phone pe", icon: "📲" },
            ].map(({ rule, icon }) => (
              <div key={rule} className="flex items-start gap-3">
                <span className="text-2xl shrink-0">{icon}</span>
                <p className="text-gray-200 text-sm font-medium leading-relaxed">{rule}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Fraud Types */}
        <h2 className="text-3xl font-bold mb-6">5 Common UPI Fraud Tricks — Kaise Hota Hai</h2>
        <div className="space-y-6 mb-12">
          {fraudTypes.map((f, i) => (
            <div key={f.type} className="bg-black/40 border border-zinc-700/60 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold shrink-0">{i+1}</div>
                <h3 className="text-xl font-bold text-red-400">{f.type}</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-400 text-xs font-semibold mb-1">🎭 KAISE KARTE HAIN:</p>
                  <p className="text-gray-300 text-sm">{f.how}</p>
                </div>
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3">
                  <p className="text-red-400 text-xs font-semibold mb-1">🚨 RED FLAG:</p>
                  <p className="text-gray-300 text-sm">{f.redFlag}</p>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3">
                  <p className="text-yellow-400 text-xs font-semibold mb-1">📌 REAL EXAMPLE:</p>
                  <p className="text-gray-300 text-sm">{f.example}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* What to do if fraud happened */}
        <div className="bg-black/40 border border-cyan-500/20 rounded-2xl p-6 mb-10">
          <h2 className="text-2xl font-bold mb-6">🆘 UPI Fraud Ho Gaya? Step-by-Step Kya Karein</h2>
          <div className="space-y-4">
            {[
              { time: "0-30 Min", urgent: true, steps: ["1930 pe call karein ABHI", "Bank app se UPI immediately disable karein", "Transaction screenshot le lo", "Bank ke fraud helpline pe call karein"] },
              { time: "Same Day", urgent: false, steps: ["cybercrime.gov.in pe online complaint karein", "Bank branch mein written complaint dein", "Merchant/receiver UPI ID note karo"] },
              { time: "Next 3 Days", urgent: false, steps: ["Local police station mein FIR darj karein", "RBI Banking Ombudsman pe complain karein agar bank respond nahi karta", "Complaint acknowledgment number save karein"] },
            ].map(({ time, urgent, steps }) => (
              <div key={time} className={`border rounded-xl p-4 ${urgent ? "border-red-500/30 bg-red-500/5" : "border-zinc-700/60"}`}>
                <p className={`font-bold mb-2 ${urgent ? "text-red-400" : "text-cyan-400"}`}>
                  {urgent ? "🚨 " : "📋 "}{time}
                </p>
                <ul className="space-y-1">
                  {steps.map(s => <li key={s} className="text-gray-300 text-sm flex gap-2"><span className={urgent?"text-red-400":"text-cyan-400"}>→</span>{s}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Tools CTA */}
        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl p-6 text-center mb-8">
          <h3 className="text-xl font-bold mb-3">Free Cyber Security Tools</h3>
          <p className="text-gray-400 text-sm mb-4">Hamari website pe free tools hain jo aapki help kar sakte hain</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/tools/scam-analyzer" className="bg-red-500 hover:bg-red-400 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition">
              🔍 Scam Analyzer
            </Link>
            <Link href="/tools/hack-checker" className="bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 px-5 py-2.5 rounded-xl font-semibold text-sm transition hover:bg-cyan-500/30">
              🛡️ Hack Checker
            </Link>
            <Link href="/tools/safety-score" className="bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 px-5 py-2.5 rounded-xl font-semibold text-sm transition hover:bg-cyan-500/30">
              🔒 Safety Score
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-zinc-800">
          <Link href="/blog" className="text-gray-400 hover:text-cyan-400 transition text-sm">← All Articles</Link>
          <Link href="/blog/best-antivirus-india-2025" className="text-gray-400 hover:text-cyan-400 transition text-sm">Best Antivirus India →</Link>
        </div>

      </div>
    </main>
  );
}
