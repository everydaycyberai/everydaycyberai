"use client";
import { useState } from "react";
import ToolPageWrapper from "@/components/ToolPageWrapper";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

type Result = {
  verdict: "scam" | "suspicious" | "legit";
  confidence: number;
  scamType: string;
  redFlags: string[];
  explanation: string;
  whatToDo: string[];
};

export default function JobScamCheckerPage() {
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [askedForMoney, setAskedForMoney] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");

  const check = async () => {
    if (!message.trim()) return;
    setLoading(true); setError(""); setResult(null);

    const prompt = `Analyze this job offer / recruitment message for an Indian job seeker, before they respond or pay anything.

Company name given: ${company || "Not provided"}
Were they asked for any payment/registration/training fee? ${askedForMoney === null ? "Not specified" : askedForMoney ? "Yes" : "No"}
Message: """${message}"""

Respond ONLY with valid JSON in this exact format:
{
  "verdict": "scam OR suspicious OR legit",
  "confidence": (0-100),
  "scamType": "e.g. Fake WFH Job, Registration Fee Scam, Fake Interview, Task-Based Scam, or 'None' if legit",
  "redFlags": ["specific red flag in this message", "..."],
  "explanation": "2-3 sentences referencing specific parts of the message",
  "whatToDo": ["specific action 1", "action 2", "action 3"]
}`;

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemPrompt: "You are a career fraud prevention expert for Indian job seekers, especially freshers and students. Common job scam patterns in India: fake work-from-home offers, upfront 'registration' or 'training' or 'security deposit' fees, task-based scams (like paid product reviews or app installs) that ask for money to 'unlock' earnings, fake HR contacting via WhatsApp/Telegram only, unrealistic salaries for minimal work, and interviews conducted only via chat with no video call. A legitimate company never asks a candidate to pay money at any stage of hiring. Always respond with valid JSON only.",
          userPrompt: prompt,
        }),
      });
      const data = await res.json();
      const text = data.text || "";
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed: Result = JSON.parse(jsonMatch[0]);
        setResult(parsed);
        if (parsed.verdict !== "legit") {
          addDoc(collection(db, "scam_reports"), {
            scamType: parsed.scamType || "Job Scam",
            verdict: parsed.verdict,
            source: "job-offer",
            createdAt: new Date(),
          }).catch(() => {});
        }
      } else {
        throw new Error("Invalid response");
      }
    } catch {
      setError("Could not analyze right now — please try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => { setResult(null); setMessage(""); setCompany(""); setAskedForMoney(null); setError(""); };

  const verdictConfig = {
    scam:       { label: "🚨 Likely a SCAM", color: "border-red-500/50 bg-red-500/10", text: "text-red-400" },
    suspicious: { label: "⚠️ SUSPICIOUS — Be Careful", color: "border-yellow-500/50 bg-yellow-500/10", text: "text-yellow-400" },
    legit:      { label: "✅ Looks Legitimate", color: "border-green-500/50 bg-green-500/10", text: "text-green-400" },
  };

  return (
    <ToolPageWrapper badge="💼 Career Safety">
      <main className="px-6 py-12 pb-24 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-block bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-1.5 rounded-full text-xs mb-4">
              🔍 Check Before You Pay Anything or Share Details
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Fake Job Offer Checker</h1>
            <p className="text-gray-400">Got a job offer or WFH opportunity that feels off? Paste the details and get an instant AI check.</p>
          </div>

          {!result && (
            <div className="bg-black/40 backdrop-blur-sm border border-zinc-700/60 rounded-3xl p-8 space-y-5">
              <div>
                <label className="block text-gray-300 font-medium mb-2">Company name (optional)</label>
                <input value={company} onChange={e => setCompany(e.target.value)} placeholder="e.g. Amazon, a startup you haven't heard of"
                  className="w-full bg-black/80 border border-zinc-700 rounded-2xl px-5 py-3 text-white outline-none focus:border-cyan-400 transition" />
              </div>

              <div>
                <label className="block text-gray-300 font-medium mb-3">Were you asked to pay any money (registration/training/deposit)?</label>
                <div className="grid grid-cols-2 gap-3">
                  {[["Yes", true], ["No", false]].map(([label, val]) => (
                    <button key={label as string} onClick={() => setAskedForMoney(val as boolean)}
                      className={`py-2.5 rounded-xl text-sm font-medium border transition ${askedForMoney === val ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400" : "bg-zinc-800 border-zinc-700 text-gray-400"}`}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-medium mb-2">Paste the job offer message / details</label>
                <textarea value={message} onChange={e => setMessage(e.target.value)} rows={6}
                  placeholder="Paste the WhatsApp/email/message you received about this job..."
                  className="w-full bg-black/80 border border-zinc-700 rounded-2xl px-5 py-4 text-white outline-none focus:border-cyan-400 transition resize-none" />
              </div>

              {error && <p className="text-red-400 text-sm">⚠️ {error}</p>}

              <button onClick={check} disabled={loading || !message.trim()}
                className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-black py-4 rounded-2xl font-bold text-lg transition">
                {loading ? "🔍 Analyzing..." : "🔍 Check This Job Offer"}
              </button>
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

              {result.verdict !== "legit" && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-5 text-sm text-red-300">
                  🆘 Already paid money? Call <b>1930</b> (Cyber Crime Helpline) immediately, or use our{" "}
                  <a href="/tools/scam-analyzer" className="underline text-cyan-400">Scam Analyzer</a> for a full recovery action plan.
                </div>
              )}

              <button onClick={reset}
                className="w-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-gray-300 py-3 rounded-xl transition font-semibold">
                Check Another Offer
              </button>
            </div>
          )}
        </div>
      </main>
    </ToolPageWrapper>
  );
}
