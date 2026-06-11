import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Disclaimer — Everyday Cyber AI",
  description: "Disclaimer for Everyday Cyber AI — important information about the use of our website, tools, blog content and affiliate links.",
  alternates: { canonical: "https://everydaycyberai.in/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen text-white px-6 py-12 relative z-10">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-3">Disclaimer</h1>
          <p className="text-gray-500 text-sm">Last updated: June 11, 2026</p>
        </div>

        <div className="space-y-6 text-gray-300 leading-relaxed">

          <div className="bg-black/40 border border-zinc-700/60 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-3">General Information</h2>
            <p>The information provided on <strong className="text-cyan-400">everydaycyberai.in</strong> is for general informational and educational purposes only. All information on this site is provided in good faith, however we make no representation or warranty of any kind regarding the accuracy, adequacy, validity, reliability, availability or completeness of any information on the site.</p>
          </div>

          <div className="bg-black/40 border border-zinc-700/60 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-3">Security Tools Disclaimer</h2>
            <p className="mb-3">Our free security tools (Password Checker, Scam Analyzer, Hack Checker, SSL Checker, etc.) are provided for educational and informational purposes only.</p>
            <ul className="space-y-2 ml-4">
              {[
                "These tools provide estimates and general assessments — not professional security audits",
                "Results from our tools should not be the sole basis for security decisions",
                "We recommend consulting a certified cybersecurity professional for critical security matters",
                "Tool results may not be 100% accurate in all cases",
              ].map(i => <li key={i} className="flex gap-2"><span className="text-yellow-400 shrink-0">⚠</span>{i}</li>)}
            </ul>
          </div>

          <div className="bg-black/40 border border-zinc-700/60 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-3">Blog Content Disclaimer</h2>
            <p>The blog articles and guides on this website are based on our research and experience. Cyber security threats evolve rapidly — information may become outdated. Always verify critical security information from official sources such as CERT-In, RBI, and UIDAI.</p>
          </div>

          <div className="bg-black/40 border border-zinc-700/60 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-3">Affiliate Disclaimer</h2>
            <p>Everyday Cyber AI participates in affiliate marketing programs. Some links on this website are affiliate links, meaning we may earn a commission if you click and make a purchase — <strong className="text-white">at no extra cost to you</strong>. We only recommend products and services we genuinely trust and believe will add value to our readers.</p>
          </div>

          <div className="bg-black/40 border border-zinc-700/60 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-3">External Links Disclaimer</h2>
            <p>Our website may contain links to external websites. These links are provided for convenience only. We have no control over the content of linked sites and accept no responsibility for them or for any loss or damage that may arise from your use of them.</p>
          </div>

          <div className="bg-black/40 border border-zinc-700/60 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-3">Scam Help Disclaimer</h2>
            <p className="mb-3">The Scam Analyzer and Emergency Response Guide tools are provided for informational purposes. <strong className="text-white">If you are a victim of cybercrime:</strong></p>
            <ul className="space-y-2 ml-4">
              {[
                "Call 1930 (National Cyber Crime Helpline) immediately",
                "File complaint at cybercrime.gov.in",
                "Contact your bank directly — do not rely solely on our guidance",
                "Our tools provide general guidance and do not replace official law enforcement or legal advice",
              ].map(i => <li key={i} className="flex gap-2"><span className="text-red-400 shrink-0">→</span>{i}</li>)}
            </ul>
          </div>

          <div className="bg-black/40 border border-zinc-700/60 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-3">AI-Generated Content</h2>
            <p>Some content on this website may be assisted by AI tools (Groq/Llama). While we review all AI-generated content, we recommend verifying critical information from primary sources. AI content is for informational purposes and may contain errors.</p>
          </div>

          <div className="bg-black/40 border border-zinc-700/60 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-3">Contact</h2>
            <p>Questions about this Disclaimer? Contact us at <strong className="text-cyan-400">systemengineer bkc@gmail.com</strong> or WhatsApp: <strong className="text-cyan-400">+91 84540 31225</strong></p>
          </div>

        </div>

        <div className="mt-10 flex gap-4 text-sm">
          <Link href="/privacy-policy" className="text-cyan-400 hover:underline">Privacy Policy</Link>
          <Link href="/terms" className="text-cyan-400 hover:underline">Terms of Use</Link>
          <Link href="/contact" className="text-cyan-400 hover:underline">Contact Us</Link>
        </div>
      </div>
    </main>
  );
}
