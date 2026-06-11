import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Everyday Cyber AI",
  description: "Privacy Policy for Everyday Cyber AI website — how we collect, use and protect your personal information.",
  alternates: { canonical: "https://everydaycyberai.in/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "June 11, 2026";
  return (
    <main className="min-h-screen text-white px-6 py-12 relative z-10">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-3">Privacy Policy</h1>
          <p className="text-gray-500 text-sm">Last updated: {lastUpdated}</p>
        </div>

        <div className="space-y-8 text-gray-300 leading-relaxed">

          <div className="bg-black/40 border border-zinc-700/60 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">1. Introduction</h2>
            <p>Welcome to <strong className="text-cyan-400">Everyday Cyber AI</strong> ("we", "our", "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose and safeguard your information when you visit our website <strong>everydaycyberai.in</strong>.</p>
            <p className="mt-3">Please read this policy carefully. If you disagree with its terms, please discontinue use of our site.</p>
          </div>

          <div className="bg-black/40 border border-zinc-700/60 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">2. Information We Collect</h2>
            <p className="mb-3"><strong className="text-white">Personal Information you provide:</strong></p>
            <ul className="space-y-2 ml-4">
              {["Name and mobile number (when you submit the contact/consultation form)", "Email address (when you submit the contact form)", "Service type and message content (from contact forms)", "Name and phone number (from lead capture popup)"].map(i => (
                <li key={i} className="flex gap-2"><span className="text-cyan-400 shrink-0">•</span>{i}</li>
              ))}
            </ul>
            <p className="mt-4 mb-3"><strong className="text-white">Automatically collected information:</strong></p>
            <ul className="space-y-2 ml-4">
              {["Browser type and version", "Pages visited and time spent", "IP address (anonymized)", "Referring website"].map(i => (
                <li key={i} className="flex gap-2"><span className="text-cyan-400 shrink-0">•</span>{i}</li>
              ))}
            </ul>
            <p className="mt-4"><strong className="text-white">Tool usage:</strong> All security tools (Password Checker, Scam Analyzer, Image Compressor, etc.) process data <strong>entirely in your browser</strong>. We do not store, transmit or access the data you enter in these tools.</p>
          </div>

          <div className="bg-black/40 border border-zinc-700/60 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">3. How We Use Your Information</h2>
            <ul className="space-y-2 ml-4">
              {[
                "To respond to your IT support and consultation requests",
                "To contact you via WhatsApp or phone about our services",
                "To send service updates and relevant information (with your consent)",
                "To improve our website and tools based on usage patterns",
                "To comply with legal obligations",
              ].map(i => <li key={i} className="flex gap-2"><span className="text-cyan-400 shrink-0">✓</span>{i}</li>)}
            </ul>
          </div>

          <div className="bg-black/40 border border-zinc-700/60 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">4. Cookies</h2>
            <p>We use cookies and similar tracking technologies to improve your browsing experience. Types of cookies we use:</p>
            <ul className="space-y-2 mt-3 ml-4">
              {[
                { type: "Essential Cookies", desc: "Required for the website to function properly" },
                { type: "Analytics Cookies", desc: "Help us understand how visitors use our site (Google Analytics)" },
                { type: "Session Storage", desc: "Used to remember if you have seen our consultation popup (clears when browser closes)" },
              ].map(c => <li key={c.type} className="flex gap-2"><span className="text-cyan-400 shrink-0">•</span><span><strong className="text-white">{c.type}:</strong> {c.desc}</span></li>)}
            </ul>
            <p className="mt-3">You can control cookies through your browser settings. Disabling cookies may affect some website functionality.</p>
          </div>

          <div className="bg-black/40 border border-zinc-700/60 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">5. Third-Party Services</h2>
            <p className="mb-3">We use the following third-party services that may collect data:</p>
            <ul className="space-y-3 ml-4">
              {[
                { name: "Firebase (Google)", purpose: "Database to store contact form submissions and leads", policy: "firebase.google.com/support/privacy" },
                { name: "EmailJS", purpose: "To send email notifications for form submissions", policy: "emailjs.com/legal/privacy-policy" },
                { name: "Google Analytics", purpose: "Website traffic analysis", policy: "policies.google.com/privacy" },
                { name: "Groq AI", purpose: "To power AI writing tools (no personal data sent)", policy: "groq.com/privacy" },
                { name: "TinyURL API", purpose: "URL shortener tool", policy: "tinyurl.com/privacy" },
              ].map(s => (
                <li key={s.name} className="flex gap-2">
                  <span className="text-cyan-400 shrink-0">•</span>
                  <span><strong className="text-white">{s.name}:</strong> {s.purpose}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-black/40 border border-zinc-700/60 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">6. Affiliate Links Disclosure</h2>
            <p>Our website contains affiliate links on the <Link href="/recommended" className="text-cyan-400 hover:underline">Recommended Tools</Link> page and in blog articles. When you click these links and make a purchase, we may earn a commission at no extra cost to you. We only recommend products we genuinely trust and that are relevant to cyber security.</p>
          </div>

          <div className="bg-black/40 border border-zinc-700/60 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">7. Data Security</h2>
            <p>We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the internet is 100% secure. We use Firebase (Google Cloud) for data storage, which implements industry-standard security measures.</p>
          </div>

          <div className="bg-black/40 border border-zinc-700/60 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">8. Your Rights</h2>
            <p className="mb-3">You have the right to:</p>
            <ul className="space-y-2 ml-4">
              {["Access the personal information we hold about you", "Request correction of inaccurate data", "Request deletion of your personal data", "Opt out of marketing communications", "Lodge a complaint with a supervisory authority"].map(r => (
                <li key={r} className="flex gap-2"><span className="text-cyan-400 shrink-0">✓</span>{r}</li>
              ))}
            </ul>
            <p className="mt-3">To exercise these rights, contact us at: <strong className="text-cyan-400">systemengineer bkc@gmail.com</strong></p>
          </div>

          <div className="bg-black/40 border border-zinc-700/60 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">9. Children's Privacy</h2>
            <p>Our website is not directed to children under 13. We do not knowingly collect personal information from children under 13. If you believe we have collected such information, please contact us immediately.</p>
          </div>

          <div className="bg-black/40 border border-zinc-700/60 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">10. Contact Us</h2>
            <p className="mb-3">For privacy-related questions or concerns:</p>
            <div className="space-y-2 text-sm">
              <p><strong className="text-white">Company:</strong> Everyday Cyber AI</p>
              <p><strong className="text-white">Location:</strong> Mumbai, India</p>
              <p><strong className="text-white">Email:</strong> systemengineer bkc@gmail.com</p>
              <p><strong className="text-white">WhatsApp:</strong> +91 84540 31225</p>
              <p><strong className="text-white">Website:</strong> everydaycyberai.in</p>
            </div>
          </div>

        </div>

        <div className="mt-10 flex gap-4 text-sm">
          <Link href="/disclaimer" className="text-cyan-400 hover:underline">Disclaimer</Link>
          <Link href="/terms" className="text-cyan-400 hover:underline">Terms of Use</Link>
          <Link href="/contact" className="text-cyan-400 hover:underline">Contact Us</Link>
        </div>
      </div>
    </main>
  );
}
