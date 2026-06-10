"use client";
import { useState } from "react";
import ToolPageWrapper from "@/components/ToolPageWrapper";

const SCAM_TYPES = [
  { id: "upi",       label: "💸 UPI / Payment Fraud",     desc: "Unknown UPI transaction, fake payment request" },
  { id: "digital_arrest", label: "👮 Digital Arrest",      desc: "Police/CBI/court call demanding money" },
  { id: "phishing",  label: "🎣 Phishing / Fake Link",    desc: "Suspicious email, SMS, or website link" },
  { id: "otp",       label: "📱 OTP / SIM Swap",          desc: "OTP shared, SIM stopped working" },
  { id: "job",       label: "💼 Fake Job / Work",         desc: "Work from home fraud, advance fee job" },
  { id: "investment",label: "📈 Investment / Trading",    desc: "Fake app, crypto scheme, guaranteed returns" },
  { id: "whatsapp",  label: "💬 WhatsApp / Social Media", desc: "Fraud via WhatsApp, Instagram, Facebook" },
  { id: "loan",      label: "🏦 Fake Loan App",           desc: "Instant loan app threatening/misusing data" },
  { id: "kyc",       label: "🪪 Fake KYC / Bank Call",    desc: "Bank/UIDAI call asking Aadhaar, card details" },
  { id: "other",     label: "❓ Other / Not Sure",        desc: "Describe what happened" },
];

type Result = {
  scamType: string;
  severity: "critical" | "high" | "medium";
  whatHappened: string;
  immediateSteps: string[];
  reportWhere: { name: string; contact: string; how: string }[];
  recoveryChance: string;
  preventionTips: string[];
};

export default function ScamAnalyzerPage() {
  const [step, setStep]         = useState<"type" | "describe" | "result">("type");
  const [scamType, setScamType] = useState("");
  const [description, setDescription] = useState("");
  const [timeAgo, setTimeAgo]   = useState("");
  const [amountLost, setAmountLost] = useState("");
  const [loading, setLoading]   = useState(false);
  const [result, setResult]     = useState<Result | null>(null);

  const analyze = async () => {
    if (!description.trim()) return;
    setLoading(true);
    const selectedType = SCAM_TYPES.find(s => s.id === scamType);

    const prompt = `You are a cyber security expert helping an Indian victim of a cyber scam. Analyze this situation and provide help in JSON format.

Scam Type: ${selectedType?.label || "Unknown"}
Description: ${description}
Time since incident: ${timeAgo || "Unknown"}
Amount lost: ${amountLost ? "₹" + amountLost : "Unknown or not mentioned"}

Respond ONLY with a valid JSON object in this exact format:
{
  "scamType": "exact name of this scam type",
  "severity": "critical OR high OR medium",
  "whatHappened": "2-3 sentences explaining exactly what scam this is and how the fraudster operated",
  "immediateSteps": ["Step 1 action", "Step 2 action", "Step 3 action", "Step 4 action", "Step 5 action"],
  "reportWhere": [
    {"name": "National Cyber Crime Helpline", "contact": "1930 (Call)", "how": "Call immediately, give transaction ID and details"},
    {"name": "cybercrime.gov.in", "contact": "cybercrime.gov.in", "how": "File online FIR with screenshots"},
    {"name": "Your Bank", "contact": "Bank customer care", "how": "Report fraud transaction, request chargeback"}
  ],
  "recoveryChance": "Honest assessment of money recovery chances with specific advice",
  "preventionTips": ["Tip 1", "Tip 2", "Tip 3", "Tip 4"]
}`;

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemPrompt: "You are a cyber crime expert for India. Always respond with valid JSON only. No markdown, no explanation outside JSON. Be specific, practical and compassionate. Include India-specific resources like 1930 helpline, cybercrime.gov.in, RBI ombudsman.",
          userPrompt: prompt,
        }),
      });
      const data = await res.json();
      const text = data.text || "";
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        setResult(parsed);
        setStep("result");
      } else {
        throw new Error("Invalid response");
      }
    } catch {
      setResult({
        scamType: "Cyber Fraud",
        severity: "high",
        whatHappened: "Based on your description, this appears to be a cyber fraud. Please take immediate action.",
        immediateSteps: [
          "Call 1930 (National Cyber Crime Helpline) immediately",
          "Block your UPI/bank account via bank app",
          "Screenshot all evidence (messages, calls, transactions)",
          "File complaint at cybercrime.gov.in",
          "Change all passwords from a safe device",
        ],
        reportWhere: [
          { name: "National Cyber Crime Helpline", contact: "1930", how: "Call immediately" },
          { name: "Cyber Crime Portal", contact: "cybercrime.gov.in", how: "File online complaint" },
        ],
        recoveryChance: "Act fast — within 24 hours gives the best chance of recovery.",
        preventionTips: ["Never share OTP", "Verify caller identity", "Use 2FA", "Check URLs before clicking"],
      });
      setStep("result");
    } finally { setLoading(false); }
  };

  const reset = () => { setStep("type"); setScamType(""); setDescription(""); setTimeAgo(""); setAmountLost(""); setResult(null); };

  const severityConfig = {
    critical: { label: "🚨 CRITICAL — Act in Next 30 Minutes!", color: "border-red-500/50 bg-red-500/10", text: "text-red-400" },
    high:     { label: "⚠️ HIGH — Act Within 24 Hours",        color: "border-orange-500/50 bg-orange-500/10", text: "text-orange-400" },
    medium:   { label: "📋 MEDIUM — Take Action Today",         color: "border-yellow-500/50 bg-yellow-500/10", text: "text-yellow-400" },
  };

  return (
    <ToolPageWrapper badge="🛡️ Cyber Help">
      <main className="px-6 py-12 pb-24 relative z-10">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-block bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-1.5 rounded-full text-xs mb-4">
              🆘 Free Cyber Scam Help — India
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Scam Analyzer</h1>
            <p className="text-gray-400">Describe what happened — get instant guidance on what to do next, where to report, and how to recover</p>
          </div>

          {/* Progress */}
          <div className="flex items-center gap-2 mb-8">
            {[{id:"type",label:"1. Scam Type"},{id:"describe",label:"2. Your Situation"},{id:"result",label:"3. Action Plan"}].map((s,i) => (
              <div key={s.id} className="flex items-center gap-2 flex-1">
                <div className={`flex items-center gap-2 ${step===s.id||step==="result"&&i<=2||step==="describe"&&i<=1?"text-cyan-400":"text-gray-600"}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border ${
                    (step==="result"&&i<2)||(step==="describe"&&i<1) ? "bg-green-500 border-green-500 text-black" :
                    step===s.id ? "bg-cyan-500 border-cyan-500 text-black" : "border-zinc-700"}`}>
                    {(step==="result"&&i<2)||(step==="describe"&&i<1) ? "✓" : i+1}
                  </div>
                  <span className="text-xs hidden sm:block">{s.label}</span>
                </div>
                {i < 2 && <div className="flex-1 h-px bg-zinc-700"/>}
              </div>
            ))}
          </div>

          {/* Step 1 — Scam Type */}
          {step === "type" && (
            <div className="bg-black/40 backdrop-blur-sm border border-zinc-700/60 rounded-3xl p-8 space-y-5">
              <h2 className="text-xl font-bold text-white">What type of scam happened?</h2>
              <p className="text-gray-400 text-sm">Select the closest option — you can describe in detail in the next step</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SCAM_TYPES.map(s => (
                  <button key={s.id} onClick={() => setScamType(s.id)}
                    className={`text-left p-4 rounded-2xl border transition ${scamType===s.id ? "bg-cyan-500/20 border-cyan-500/50" : "bg-black/40 border-zinc-700/50 hover:border-zinc-600"}`}>
                    <div className={`font-semibold text-sm mb-1 ${scamType===s.id ? "text-cyan-400" : "text-white"}`}>{s.label}</div>
                    <div className="text-gray-500 text-xs">{s.desc}</div>
                  </button>
                ))}
              </div>
              <button onClick={() => scamType && setStep("describe")} disabled={!scamType}
                className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-black py-4 rounded-2xl font-bold transition">
                Next →
              </button>
            </div>
          )}

          {/* Step 2 — Describe */}
          {step === "describe" && (
            <div className="bg-black/40 backdrop-blur-sm border border-zinc-700/60 rounded-3xl p-8 space-y-5">
              <div className="flex items-center gap-3 mb-2">
                <button onClick={() => setStep("type")} className="text-gray-500 hover:text-cyan-400 transition text-sm">← Back</button>
                <h2 className="text-xl font-bold text-white">Tell us what happened</h2>
              </div>

              <div>
                <label className="block text-gray-300 font-medium mb-2">Describe the incident *</label>
                <textarea rows={6} value={description} onChange={e => setDescription(e.target.value)}
                  placeholder="Describe in detail — who called/messaged you, what they said, what happened, what you did, any links you clicked, any money transferred, etc. The more detail you give, the better we can help."
                  className="w-full bg-black/60 border border-zinc-700/60 rounded-2xl px-5 py-4 text-white resize-none outline-none focus:border-cyan-400 transition text-sm leading-relaxed"/>
                <p className="text-gray-600 text-xs mt-1">Your information is private and not stored anywhere.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-xs mb-2">When did this happen?</label>
                  <select value={timeAgo} onChange={e => setTimeAgo(e.target.value)}
                    className="w-full bg-black/60 border border-zinc-700/60 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400 transition text-sm">
                    <option value="">Select time</option>
                    <option value="just now">Just happened (last 30 mins)</option>
                    <option value="few hours ago">Few hours ago</option>
                    <option value="today">Earlier today</option>
                    <option value="yesterday">Yesterday</option>
                    <option value="few days ago">Few days ago</option>
                    <option value="more than a week ago">More than a week ago</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 text-xs mb-2">Amount lost (₹)</label>
                  <input type="number" placeholder="e.g. 5000 (0 if none)" value={amountLost} onChange={e => setAmountLost(e.target.value)}
                    className="w-full bg-black/60 border border-zinc-700/60 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400 transition text-sm"/>
                </div>
              </div>

              {/* Urgency warning */}
              {timeAgo === "just now" || timeAgo === "few hours ago" ? (
                <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 text-sm text-red-300">
                  🚨 <strong>Act NOW!</strong> Call <strong>1930</strong> immediately while submitting this form. Every minute matters for fund recovery!
                </div>
              ) : null}

              <button onClick={analyze} disabled={loading || !description.trim()}
                className="w-full bg-red-500 hover:bg-red-400 disabled:opacity-40 text-white py-4 rounded-2xl font-bold text-lg transition hover:shadow-[0_0_25px_rgba(239,68,68,0.4)]">
                {loading ? "🔍 Analyzing your case..." : "🔍 Analyze & Get Action Plan"}
              </button>

              {loading && (
                <div className="text-center text-gray-400 text-sm">
                  <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"/>
                  Analyzing your situation and preparing personalized guidance...
                </div>
              )}
            </div>
          )}

          {/* Step 3 — Result */}
          {step === "result" && result && (
            <div className="space-y-5">

              {/* Severity Banner */}
              <div className={`border rounded-2xl p-5 ${severityConfig[result.severity].color}`}>
                <p className={`text-lg font-bold ${severityConfig[result.severity].text}`}>
                  {severityConfig[result.severity].label}
                </p>
                <p className="text-white font-semibold mt-1">{result.scamType}</p>
                <p className="text-gray-300 text-sm mt-2">{result.whatHappened}</p>
              </div>

              {/* Immediate Steps */}
              <div className="bg-black/40 backdrop-blur-sm border border-zinc-700/60 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">⚡ What to do RIGHT NOW</h3>
                <div className="space-y-3">
                  {result.immediateSteps.map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-cyan-500 text-black flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <p className="text-gray-200 text-sm leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Where to Report */}
              <div className="bg-black/40 backdrop-blur-sm border border-zinc-700/60 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">📞 Where to Report</h3>
                <div className="space-y-3">
                  {result.reportWhere.map((r, i) => (
                    <div key={i} className="bg-black/40 border border-zinc-800/60 rounded-xl p-4">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-cyan-400 font-semibold text-sm">{r.name}</p>
                          <p className="text-white font-bold">{r.contact}</p>
                          <p className="text-gray-400 text-xs mt-1">{r.how}</p>
                        </div>
                        {r.contact === "1930" && (
                          <a href="tel:1930"
                            className="bg-green-500 hover:bg-green-400 text-black px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition">
                            📞 Call Now
                          </a>
                        )}
                        {r.contact === "cybercrime.gov.in" && (
                          <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer"
                            className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition">
                            🌐 Open
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recovery Chance */}
              <div className="bg-black/40 backdrop-blur-sm border border-yellow-500/20 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-3">💰 Money Recovery Chances</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{result.recoveryChance}</p>
              </div>

              {/* Prevention Tips */}
              <div className="bg-black/40 backdrop-blur-sm border border-zinc-700/60 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">🛡️ How to Prevent This in Future</h3>
                <div className="space-y-2">
                  {result.preventionTips.map((tip, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-green-400 shrink-0">✓</span>
                      <p className="text-gray-300 text-sm">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Emergency Contacts */}
              <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-5">
                <h3 className="text-red-400 font-bold mb-3">🆘 Emergency Helplines India</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {[
                    { name: "Cyber Crime", contact: "1930", href: "tel:1930" },
                    { name: "Cyber Crime Portal", contact: "cybercrime.gov.in", href: "https://cybercrime.gov.in" },
                    { name: "RBI Ombudsman", contact: "cms.rbi.org.in", href: "https://cms.rbi.org.in" },
                    { name: "TRAI (SIM Swap)", contact: "1800-11-0420", href: "tel:18001100420" },
                  ].map(h => (
                    <a key={h.name} href={h.href} target={h.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="bg-black/40 border border-red-500/20 rounded-xl p-3 hover:border-red-400 transition">
                      <p className="text-gray-400 text-xs">{h.name}</p>
                      <p className="text-red-400 font-bold">{h.contact}</p>
                    </a>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3">
                <button onClick={reset}
                  className="flex-1 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-gray-300 py-3 rounded-xl transition font-semibold">
                  Analyze Another Case
                </button>
                <button onClick={() => window.print()}
                  className="flex-1 bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 py-3 rounded-xl transition font-semibold hover:bg-cyan-500/30">
                  🖨️ Save / Print Report
                </button>
              </div>
            </div>
          )}

          {/* Bottom Info */}
          {step === "type" && (
            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
              {[
                { icon: "🔒", text: "100% Private", sub: "Nothing stored" },
                { icon: "⚡", text: "Instant Help", sub: "AI-powered" },
                { icon: "🇮🇳", text: "India Specific", sub: "Local helplines" },
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
