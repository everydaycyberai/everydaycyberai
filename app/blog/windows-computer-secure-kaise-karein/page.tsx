import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Windows Computer Secure Kaise Karein 2025 — Complete Guide | Everyday Cyber AI",
  description: "Windows PC/laptop ko hack hone se kaise bachayein — 15 essential security tips Hindi mein. Windows 10/11 security settings, antivirus, firewall, updates guide.",
  keywords: "Windows computer secure kaise karein, Windows 10 11 security tips Hindi, laptop secure karna, PC hack se bachao, Windows security settings India",
  alternates: { canonical: "https://everydaycyberai.in/blog/windows-computer-secure-kaise-karein" },
};

const tips = [
  { no: 1,  title: "Windows Update Always On Rakhein",       icon: "🔄", desc: "Settings → Windows Update → Automatic Updates ON karein. Updates mein security patches hote hain — band rakhna bahut dangerous hai.", easy: true },
  { no: 2,  title: "Strong Password Set Karein",              icon: "🔑", desc: "Windows login ke liye minimum 12 character ka password use karein — uppercase, lowercase, numbers, symbols milaye. Simple PIN mat use karein.", easy: true },
  { no: 3,  title: "Windows Defender Enable Rakhein",         icon: "🛡️", desc: "Settings → Windows Security → Virus & threat protection → Real-time protection ON karein. Free hai aur Windows 10/11 mein built-in hai.", easy: true },
  { no: 4,  title: "Windows Firewall On Rakhein",             icon: "🔥", desc: "Control Panel → Windows Defender Firewall → Turn on for all networks. Yeh external attacks se pehli line of defense hai.", easy: true },
  { no: 5,  title: "Screen Lock Fast Karein",                 icon: "🔒", desc: "Settings → Personalization → Lock screen → Screen timeout 1 minute pe set karein. PC unattended hone pe turant lock ho jaaye.", easy: true },
  { no: 6,  title: "Admin Account Alag Rakhein",              icon: "👤", desc: "Daily use ke liye Standard User account use karein, Administrator account sirf software install karne ke liye. Malware ko Admin rights nahi milenge.", easy: false },
  { no: 7,  title: "BitLocker Encrypt Karein",                icon: "💾", desc: "Windows 10/11 Pro mein BitLocker se hard drive encrypt karein. Laptop chori ho jaaye to data safe rahega.", easy: false },
  { no: 8,  title: "Unknown Software Mat Install Karein",     icon: "⚠️", desc: "Sirf official websites se software download karein. Cracked software mein malware hota hai — kabhi use mat karein.", easy: true },
  { no: 9,  title: "Browser Extensions Check Karein",         icon: "🌐", desc: "Chrome/Edge mein extensions review karein — unknown extensions remove karein. Kuch extensions passwords aur browsing data track karte hain.", easy: true },
  { no: 10, title: "Regular Backup Lein",                     icon: "💿", desc: "External hard drive ya Google Drive/OneDrive pe weekly backup lein. Ransomware attack mein backup hi aapko bachaayega.", easy: true },
  { no: 11, title: "Public WiFi Pe VPN Use Karein",           icon: "📶", desc: "Cafe, mall ya airport WiFi pe banking kabhi mat karein bina VPN ke. Proton VPN free plan se shuru karein.", easy: true },
  { no: 12, title: "Two-Factor Authentication Sab Jagah",     icon: "📱", desc: "Gmail, banking, social media — sabke liye 2FA enable karein. Authenticator app (Google Authenticator) SMS se zyada safe hai.", easy: true },
  { no: 13, title: "Startup Programs Clean Karein",           icon: "🚀", desc: "Task Manager → Startup tab → Unnecessary programs disable karein. Kuch malware startup mein add ho jaata hai.", easy: false },
  { no: 14, title: "Remote Desktop Disable Karein",           icon: "🖥️", desc: "Settings → System → Remote Desktop → OFF karein agar use nahi karte. Hackers Remote Desktop ko target karte hain.", easy: true },
  { no: 15, title: "Email Links Carefully Kholein",           icon: "📧", desc: "Unknown email ke links mat click karein. Hover karein link pe — actual URL check karein. Bank kabhi email se link bhejke login nahi maangta.", easy: true },
];

export default function WindowsSecurePage() {
  return (
    <main className="min-h-screen text-white px-6 py-12 relative z-10">
      <div className="max-w-4xl mx-auto">

        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-cyan-400 transition">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-cyan-400 transition">Blog</Link>
          <span>/</span>
          <span className="text-gray-400">Windows Computer Secure Kaise Karein</span>
        </div>

        <div className="mb-10">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-3 py-1 rounded-full text-xs">Windows Security</span>
            <span className="text-gray-500 text-xs">⏱ 10 min read</span>
            <span className="text-gray-500 text-xs">📅 Updated June 2026</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Windows Computer Secure Kaise Karein —
            <span className="text-cyan-400"> 15 Essential Tips</span>
          </h1>
          <div className="bg-gradient-to-r from-cyan-500/10 to-transparent border-l-2 border-cyan-500 pl-5 py-4 rounded-r-xl mb-8">
            <p className="text-lg text-gray-300 leading-relaxed">
              Aapka Windows PC ya laptop kitna safe hai? Yeh 15 tips follow karke aap apna computer
              <strong className="text-white"> 90% zyada secure</strong> bana sakte hain — bina koi paisa kharche.
              Beginners ke liye easy Hindi guide.
            </p>
          </div>
        </div>

        {/* Easy vs Advanced Split */}
        <div className="flex gap-4 mb-8">
          <div className="flex items-center gap-2 text-sm">
            <span className="w-3 h-3 bg-green-500 rounded-full inline-block"/>
            <span className="text-gray-400">Easy (5 min)</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="w-3 h-3 bg-yellow-500 rounded-full inline-block"/>
            <span className="text-gray-400">Advanced (needs IT knowledge)</span>
          </div>
        </div>

        {/* Tips */}
        <div className="space-y-4 mb-12">
          {tips.map((tip) => (
            <div key={tip.no} className="bg-black/40 border border-zinc-700/60 rounded-2xl p-5 hover:border-cyan-400/30 transition">
              <div className="flex items-start gap-4">
                <div className="flex items-center gap-2 shrink-0">
                  <div className="w-8 h-8 bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 rounded-full flex items-center justify-center text-sm font-bold">
                    {tip.no}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-xl">{tip.icon}</span>
                    <h3 className="font-bold text-white">{tip.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${tip.easy ? "bg-green-500/10 border-green-500/20 text-green-400" : "bg-yellow-500/10 border-yellow-500/20 text-yellow-400"}`}>
                      {tip.easy ? "Easy" : "Advanced"}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{tip.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Free Security Check CTA */}
        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl p-6 text-center mb-8">
          <h3 className="text-xl font-bold mb-2">Apna Security Score Check Karein — Free!</h3>
          <p className="text-gray-400 text-sm mb-4">12 simple questions — pata karein aap kitne safe hain online</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/tools/safety-score" className="bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-2.5 rounded-xl font-bold text-sm transition">
              🔒 Check Safety Score
            </Link>
            <Link href="/tools/hack-checker" className="border border-cyan-500/40 text-cyan-400 px-6 py-2.5 rounded-xl font-semibold text-sm transition hover:border-cyan-400">
              🛡️ Hack Checker
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
