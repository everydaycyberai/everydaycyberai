import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use — Everyday Cyber AI",
  description: "Terms of Use for Everyday Cyber AI website and tools.",
  alternates: { canonical: "https://everydaycyberai.in/terms" },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen text-white px-6 py-12 relative z-10">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-3">Terms of Use</h1>
          <p className="text-gray-500 text-sm">Last updated: June 11, 2026</p>
        </div>

        <div className="space-y-6 text-gray-300 leading-relaxed">

          <div className="bg-black/40 border border-zinc-700/60 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-3">1. Acceptance of Terms</h2>
            <p>By accessing and using <strong className="text-cyan-400">everydaycyberai.in</strong>, you accept and agree to be bound by these Terms of Use. If you do not agree, please do not use our website.</p>
          </div>

          <div className="bg-black/40 border border-zinc-700/60 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-3">2. Use of Free Tools</h2>
            <p className="mb-3">Our free online tools are provided "as is" for personal and professional use. You agree to:</p>
            <ul className="space-y-2 ml-4">
              {["Use tools only for lawful purposes","Not attempt to reverse engineer or copy our tools","Not use tools to harm others or conduct illegal activities","Accept that tool results are estimates, not guarantees"].map(i=><li key={i} className="flex gap-2"><span className="text-cyan-400 shrink-0">✓</span>{i}</li>)}
            </ul>
          </div>

          <div className="bg-black/40 border border-zinc-700/60 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-3">3. Intellectual Property</h2>
            <p>All content on this website — including text, graphics, tools, blog articles and design — is the property of Everyday Cyber AI and is protected by Indian copyright law. You may not reproduce, distribute or create derivative works without our written permission.</p>
          </div>

          <div className="bg-black/40 border border-zinc-700/60 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-3">4. IT Services Terms</h2>
            <p className="mb-3">For paid IT support services:</p>
            <ul className="space-y-2 ml-4">
              {["Payment is due before service delivery unless otherwise agreed","Refund policy: full refund if issue is not resolved","We are not liable for data loss during remote support sessions","Client must have legal ownership/authority over systems we support"].map(i=><li key={i} className="flex gap-2"><span className="text-cyan-400 shrink-0">•</span>{i}</li>)}
            </ul>
          </div>

          <div className="bg-black/40 border border-zinc-700/60 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-3">5. Limitation of Liability</h2>
            <p>Everyday Cyber AI shall not be liable for any indirect, incidental, special, consequential or punitive damages resulting from your use of our website or tools. Our total liability shall not exceed the amount paid for our services, if any.</p>
          </div>

          <div className="bg-black/40 border border-zinc-700/60 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-3">6. Governing Law</h2>
            <p>These Terms shall be governed by the laws of India. Any disputes shall be subject to the jurisdiction of courts in Mumbai, Maharashtra, India.</p>
          </div>

          <div className="bg-black/40 border border-zinc-700/60 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-3">7. Contact</h2>
            <p>Questions? Contact: <strong className="text-cyan-400">systemengineer bkc@gmail.com</strong> | WhatsApp: <strong className="text-cyan-400">+91 84540 31225</strong></p>
          </div>

        </div>

        <div className="mt-10 flex gap-4 text-sm">
          <Link href="/privacy-policy" className="text-cyan-400 hover:underline">Privacy Policy</Link>
          <Link href="/disclaimer" className="text-cyan-400 hover:underline">Disclaimer</Link>
          <Link href="/contact" className="text-cyan-400 hover:underline">Contact Us</Link>
        </div>
      </div>
    </main>
  );
}
