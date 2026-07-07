"use client";
import { useState } from "react";
import ToolPageWrapper from "@/components/ToolPageWrapper";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

type Source = "sms" | "email" | "whatsapp" | "other";

type Result = {
  verdict: "scam" | "suspicious" | "safe";
  confidence: number;
  scamType: string;
  redFlags: string[];
  explanation: string;
  whatToDo: string[];
};

const SOURCES: { id: Source; label: string }[] = [
  { id: "sms", label: "📱 SMS" },
  { id: "email", label: "📧 Email" },
  { id: "whatsapp", label: "💬 WhatsApp" },
  { id: "other", label: "❓ Other" },
];

export default function ScamMessageCheckerPage() {
  const [source, setSource] = useState<Source>("sms");
  const [sender, setSender] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");

  const check = async () => {
    if (!message.trim()) return;
    setLoading(true); setError(""); setResult(null);

    const prompt = `You are a cyber security expert helping an Indian user check if a message they received is a scam, BEFORE they take any action. Analyze this message.

Source: ${source}
Sender (if known): ${sender || "Not provided"}
Message content: """${message}"""

Respond ONLY with a valid JSON object in this exact format:
{
  "verdict": "scam OR suspicious OR safe",
  "confidence": (a number 0-100, how confident you are in this verdict),
  "scamType": "name of scam pattern if any, e.g. Phishing Link, Fake KYC Update, Lottery Scam, Job Scam, Delivery Scam, or 'None' if safe",
  "redFlags": ["specific red flag found in this exact message", "another specific flag", "..."],
  "explanation": "2-3 sentences explaining exactly why this looks like a scam or why it looks safe, referencing specific parts of the message",
  "whatToDo": ["specific action 1", "specific action 2", "specific action 3"]
}`;

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemPrompt: "You are a cyber crime prevention expert for India. Always respond with valid JSON only, no markdown, no text outside JSON. Be specific and reference the actual message content. Common Indian scam patterns include fake KYC update links, fake delivery/customs fee messages, fake lottery/prize wins, fake bank/UPI alerts, job offer scams, and impersonation of government bodies like TRAI, Income Tax, or police.",
          userPrompt: prompt,
        }),
      });
      const data = await res.json();
      const text = data.text || "";
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed: Result = JSON.parse(jsonMatch[0]);
        setResult(parsed);
        // Anonymized logging only — never the message text, sender, or any personal detail —
        // used purely to power the public "Trending Scams" page.
        if (parsed.verdict !== "safe") {
          addDoc(collection(db, "scam_reports"), {
            scamType: parsed.scamType || "Unknown",
            verdict: parsed.verdict,
            source,
            createdAt: new Date(),
          }).catch(() => {});
        }
      } else {
        throw new Error("Invalid AI response");
      }
    } catch {
      setError("Could not analyze right now — please try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => { setResult(null); setMessage(""); setSender(""); setError(""); };

  const verdictConfig = {
    scam:       { label: "🚨 Likely a SCAM", color: "border-red-500/50 bg-red-500/10", text: "text-red-400" },
    suspicious: { label: "⚠️ SUSPICIOUS — Be Careful", color: "border-yellow-500/50 bg-yellow-500/10", text: "text-yellow-400" },
    safe:       { label: "✅ Looks Safe", color: "border-green-500/50 bg-green-500/10", text: "text-green-400" },
  };

  return (
    <ToolPageWrapper badge="🛡️ Cyber Help">
      <main className="px-6 py-12 pb-24 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-block bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-4 py-1.5 rounded-full text-xs mb-4">
              🔍 Check BEFORE You Click — Free & Instant
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Scam Message Checker</h1>
            <p className="text-gray-400">Paste any suspicious SMS, email or WhatsApp message — AI checks it for scam red flags before you respond or click anything</p>
          </div>

          {!result && (
            <div className="bg-black/40 backdrop-blur-sm border border-zinc-700/60 rounded-3xl p-8 space-y-5">
              <div>
                <label className="block text-gray-300 font-medium mb-3">Where did you receive this?</label>
                <div className="grid grid-cols-4 gap-2">
                  {SOURCES.map(s => (
                    <button key={s.id} onClick={() => setSource(s.id)}
                      className={`py-2.5 rounded-xl text-sm font-medium border transition ${source === s.id ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400" : "bg-zinc-800 border-zinc-700 text-gray-400"}`}>
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-medium mb-2">Sender number / email (optional)</label>
                <input value={sender} onChange={e => setSender(e.target.value)} placeholder="e.g. VM-AXISBK, +91xxxxxxxxxx, or an email address"
                  className="w-full bg-black/80 border border-zinc-700 rounded-2xl px-5 py-3 text-white outline-none focus:border-cyan-400 transition" />
              </div>

              <div>
                <label className="block text-gray-300 font-medium mb-2">Paste the message here</label>
                <textarea value={message} onChange={e => setMessage(e.target.value)} rows={6}
                  placeholder="Paste the full SMS / email / WhatsApp message text here..."
                  className="w-full bg-black/80 border border-zinc-700 rounded-2xl px-5 py-4 text-white outline-none focus:border-cyan-400 transition resize-none" />
                <p className="text-xs text-gray-600 mt-2">🔒 Your message text is never stored — only an anonymous scam-type tag (no message, no sender, no personal info) is logged to power our public <a href="/trending-scams" className="underline text-cyan-400">Trending Scams</a> page.</p>
              </div>

              {error && <p className="text-red-400 text-sm">⚠️ {error}</p>}

              <button onClick={check} disabled={loading || !message.trim()}
                className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-black py-4 rounded-2xl font-bold text-lg transition">
                {loading ? "🔍 Checking message..." : "🔍 Check This Message"}
              </button>

              {loading && (
                <div className="text-center text-gray-400 text-sm">
                  <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                  Scanning for scam patterns...
                </div>
              )}
            </div>
          )}

          {result && (
            <div className="space-y-5">
              <div className={`border rounded-2xl p-6 ${verdictConfig[result.verdict].color}`}>
                <div className="flex items-center justify-between mb-2">
                  <p className={`text-xl font-bold ${verdictConfig[result.verdict].text}`}>{verdictConfig[result.verdict].label}</p>
                  <span className="text-xs text-gray-400">{result.confidence}% confidence</span>
                </div>
                {result.scamType !== "None" && <p className="text-white font-semibold">{result.scamType}</p>}
                <p className="text-gray-300 text-sm mt-2">{result.explanation}</p>
              </div>

              {result.redFlags?.length > 0 && (
                <div className="bg-black/40 backdrop-blur-sm border border-zinc-700/60 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">🚩 Red Flags Found</h3>
                  <div className="space-y-2">
                    {result.redFlags.map((f, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-red-400 shrink-0">•</span>
                        <p className="text-gray-300 text-sm">{f}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-black/40 backdrop-blur-sm border border-zinc-700/60 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">✅ What To Do</h3>
                <div className="space-y-3">
                  {result.whatToDo.map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-cyan-500 text-black flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i + 1}</div>
                      <p className="text-gray-200 text-sm leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {result.verdict !== "safe" && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-5 text-sm text-red-300">
                  🆘 Already clicked a link or shared details? Call <b>1930</b> (Cyber Crime Helpline) immediately, or use our{" "}
                  <a href="/tools/scam-analyzer" className="underline text-cyan-400">Scam Analyzer</a> for a full recovery action plan.
                </div>
              )}

              <button onClick={reset}
                className="w-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-gray-300 py-3 rounded-xl transition font-semibold">
                Check Another Message
              </button>
            </div>
          )}

          {!result && (
            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
              {[
                { icon: "🔒", text: "100% Private", sub: "Nothing stored" },
                { icon: "⚡", text: "Instant Check", sub: "AI-powered" },
                { icon: "🇮🇳", text: "India Patterns", sub: "KYC, UPI, delivery scams" },
              ].map(item => (
                <div key={item.text} className="bg-black/40 border border-zinc-700/60 rounded-2xl p-4">
                  <div className="text-2xl mb-1">{item.icon}</div>
                  <p className="text-white text-sm font-semibold">{item.text}</p>
                  <p className="text-gray-500 text-xs">{item.sub}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </ToolPageWrapper>
  );
}
