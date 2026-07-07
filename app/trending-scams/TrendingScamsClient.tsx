"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where, Timestamp } from "firebase/firestore";

type ScamStat = { type: string; count: number };

const SCAM_DESCRIPTIONS: Record<string, string> = {
  "Phishing Link": "Fake links pretending to be from a bank, delivery service, or government body — designed to steal your login details or OTP.",
  "Fake KYC Update": "Messages claiming your bank/UPI KYC will expire unless you click a link or share personal details immediately.",
  "Lottery Scam": "You've 'won' a prize you never entered for, and are asked to pay a 'processing fee' to claim it.",
  "Job Scam": "Fake job offers, often for easy remote work, that ask for an upfront 'registration' or 'training' fee.",
  "Delivery Scam": "Fake courier/customs messages asking for a small 'fee' to release a package you never ordered.",
  "UPI Fraud": "Requests to accept a payment or scan a QR code that actually deducts money instead of sending it to you.",
  "Bank Alert Scam": "Fake bank alerts about a blocked account or suspicious transaction, pushing you to 'verify' by sharing OTP or card details.",
  "Digital Arrest": "Impersonators posing as police/government officials, threatening arrest unless you pay money or share personal info immediately.",
};

function describeScam(type: string): string {
  return SCAM_DESCRIPTIONS[type] || "A reported scam pattern — always verify independently before clicking links or sharing personal/financial details.";
}

export default function TrendingScamsClient() {
  const [stats, setStats] = useState<ScamStat[]>([]);
  const [totalReports, setTotalReports] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const q = query(
          collection(db, "scam_reports"),
          where("createdAt", ">=", Timestamp.fromDate(thirtyDaysAgo))
        );
        const snap = await getDocs(q);

        const counts: Record<string, number> = {};
        snap.docs.forEach((d) => {
          const scamType = d.data().scamType || "Unknown";
          counts[scamType] = (counts[scamType] || 0) + 1;
        });

        const sorted = Object.entries(counts)
          .map(([type, count]) => ({ type, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 12);

        setStats(sorted);
        setTotalReports(snap.docs.length);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <main className="min-h-screen text-white px-6 py-12 relative z-10">
      <div className="max-w-4xl mx-auto">

        <div className="text-center mb-12">
          <div className="inline-block bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-2 rounded-full text-sm mb-6">
            🚨 Updated from real, anonymized scam checks
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Trending Scams Right Now</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            These are the most common scam patterns people have been checking on our free tool in the last 30 days.
            No personal data or message content is ever shown — just the pattern, so you know what to watch for.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-16 text-gray-500">
            <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            Loading trending scam data...
          </div>
        ) : stats.length === 0 ? (
          <div className="bg-black/40 border border-zinc-700/60 rounded-2xl p-10 text-center mb-12">
            <div className="text-4xl mb-3">📊</div>
            <p className="text-gray-400">Not enough data yet — this page fills up as more people use our free Scam Message Checker.</p>
            <Link href="/tools/scam-message-checker" className="inline-block mt-5 bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-3 rounded-xl font-bold transition">
              Try the Scam Checker →
            </Link>
          </div>
        ) : (
          <>
            <p className="text-center text-gray-500 text-sm mb-8">Based on {totalReports} anonymized checks in the last 30 days</p>
            <div className="space-y-4 mb-14">
              {stats.map((s, i) => (
                <div key={s.type} className="bg-black/40 border border-zinc-700/60 rounded-2xl p-6 flex items-start gap-5">
                  <div className="w-10 h-10 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 flex items-center justify-center font-bold shrink-0">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
                      <h3 className="text-lg font-bold text-white">{s.type}</h3>
                      <span className="text-xs bg-red-500/10 border border-red-500/30 text-red-400 px-3 py-1 rounded-full whitespace-nowrap">
                        {s.count} report{s.count !== 1 ? "s" : ""}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">{describeScam(s.type)}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* General safety tips — always shown regardless of data */}
        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-3xl p-8 mb-12">
          <h2 className="text-2xl font-bold mb-5">🛡️ General Safety Rules</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Never share OTP, PIN, or CVV with anyone — banks never ask for these.",
              "Don't click links in unexpected SMS/WhatsApp messages, even from known numbers.",
              "Verify government/bank communication only through official apps or websites.",
              "If it sounds urgent or too good to be true, pause and verify independently.",
            ].map((tip) => (
              <div key={tip} className="flex items-start gap-3 text-sm text-gray-300">
                <span className="text-cyan-400 shrink-0">✓</span>{tip}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Got a suspicious message?</h2>
          <p className="text-gray-400 mb-6">Paste it into our free checker — get an instant verdict before you click anything.</p>
          <Link href="/tools/scam-message-checker" className="bg-cyan-500 hover:bg-cyan-400 text-black px-8 py-4 rounded-xl font-bold transition inline-block">
            🔍 Check a Message Now
          </Link>
        </div>

      </div>
    </main>
  );
}
