"use client";
import { useState } from "react";
import ToolPageWrapper from "@/components/ToolPageWrapper";

const QUESTIONS = [
  { id: "q1",  category: "Device",    icon: "📱", question: "Is your device unusually slow or hot without heavy use?" },
  { id: "q2",  category: "Device",    icon: "🔋", question: "Is your battery draining faster than usual?" },
  { id: "q3",  category: "Device",    icon: "📶", question: "High data usage even when you're not using the phone?" },
  { id: "q4",  category: "Accounts",  icon: "🔑", question: "Were you logged out of any accounts (Gmail, WhatsApp, bank) unexpectedly?" },
  { id: "q5",  category: "Accounts",  icon: "📧", question: "Did you receive password reset emails you didn't request?" },
  { id: "q6",  category: "Accounts",  icon: "👤", question: "Do friends say they received strange messages from your account?" },
  { id: "q7",  category: "Financial", icon: "💸", question: "Any unknown transactions in your bank/UPI statements?" },
  { id: "q8",  category: "Financial", icon: "💳", question: "Any unknown charges on credit/debit card?" },
  { id: "q9",  category: "Apps",      icon: "📲", question: "Are there apps on your phone you don't remember installing?" },
  { id: "q10", category: "Apps",      icon: "🔔", question: "Getting unusual pop-ups, ads or notifications?" },
  { id: "q11", category: "Network",   icon: "🌐", question: "Did you recently connect to a public WiFi (cafe, mall, airport)?" },
  { id: "q12", category: "Network",   icon: "🔗", question: "Did you click a suspicious link recently (SMS, email, WhatsApp)?" },
  { id: "q13", category: "Phishing",  icon: "📞", question: "Did you share OTP, password, or bank details with anyone recently?" },
  { id: "q14", category: "Phishing",  icon: "🪪", question: "Did you share Aadhaar, PAN or KYC documents with an unverified person?" },
];

export default function HackCheckerPage() {
  const [answers, setAnswers] = useState<Record<string, boolean | null>>({});
  const [showResult, setShowResult] = useState(false);

  const toggle = (id: string, val: boolean) => setAnswers(prev => ({ ...prev, [id]: val }));
  const allAnswered = QUESTIONS.every(q => answers[q.id] !== undefined);
  const yesCount = Object.values(answers).filter(v => v === true).length;

  const getRiskLevel = () => {
    const critical = ["q7","q8","q4","q13"].filter(id => answers[id] === true).length;
    if (critical >= 2 || yesCount >= 8) return "critical";
    if (critical >= 1 || yesCount >= 5) return "high";
    if (yesCount >= 3) return "medium";
    return "low";
  };

  const risk = getRiskLevel();

  const riskConfig = {
    critical: {
      label: "🚨 HIGH RISK — Your System May Be Compromised!",
      color: "border-red-500/50 bg-red-500/10", text: "text-red-400",
      steps: [
        "Call 1930 (Cyber Crime Helpline) immediately",
        "Block all bank accounts and cards from bank app NOW",
        "Log out of all devices on Google/WhatsApp/email",
        "Change ALL passwords from a DIFFERENT device",
        "Scan with Malwarebytes or any antivirus immediately",
        "Do NOT use the suspected device for banking until cleaned",
        "File complaint at cybercrime.gov.in",
        "Inform your bank about potential compromise",
      ],
    },
    high: {
      label: "⚠️ HIGH CONCERN — Immediate Action Needed",
      color: "border-orange-500/50 bg-orange-500/10", text: "text-orange-400",
      steps: [
        "Change passwords for all important accounts today",
        "Enable 2-Factor Authentication on all accounts",
        "Check bank statements carefully for last 30 days",
        "Remove unknown/suspicious apps immediately",
        "Run antivirus scan on your device",
        "Review app permissions in phone settings",
        "Log out all other sessions on Google and WhatsApp",
      ],
    },
    medium: {
      label: "📋 MEDIUM RISK — Take Precautionary Steps",
      color: "border-yellow-500/50 bg-yellow-500/10", text: "text-yellow-400",
      steps: [
        "Update all your passwords with strong unique ones",
        "Enable 2FA on Gmail, WhatsApp, Instagram, banking",
        "Check Google account activity for unknown logins",
        "Review which apps have camera/microphone access",
        "Avoid public WiFi or use VPN when needed",
        "Be cautious of links in SMS and WhatsApp messages",
      ],
    },
    low: {
      label: "✅ LOW RISK — Your System Seems Safe",
      color: "border-green-500/50 bg-green-500/10", text: "text-green-400",
      steps: [
        "Keep your OS and apps updated regularly",
        "Use different passwords for different accounts",
        "Enable 2FA wherever possible",
        "Be careful about links — always verify before clicking",
        "Review app permissions periodically",
      ],
    },
  };

  const categories = [...new Set(QUESTIONS.map(q => q.category))];

  return (
    <ToolPageWrapper badge="🛡️ Cyber Help">
      <main className="px-6 py-12 pb-24 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-block bg-orange-500/10 border border-orange-500/30 text-orange-400 px-4 py-1.5 rounded-full text-xs mb-4">
              🔍 Free System Check — India
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Hack Checker</h1>
            <p className="text-gray-400">Answer 14 questions to find out if your phone or account has been compromised — get instant action plan</p>
          </div>

          {!showResult ? (
            <div className="space-y-6">
              {categories.map(cat => (
                <div key={cat} className="bg-black/40 backdrop-blur-sm border border-zinc-700/60 rounded-2xl p-6">
                  <h3 className="text-cyan-400 font-bold mb-4 text-sm uppercase tracking-wider">
                    {cat === "Device" ? "📱 Device Behavior" :
                     cat === "Accounts" ? "🔑 Account Activity" :
                     cat === "Financial" ? "💸 Financial Activity" :
                     cat === "Apps" ? "📲 Apps & Notifications" :
                     cat === "Network" ? "🌐 Network Activity" : "🎣 Phishing & Data Sharing"}
                  </h3>
                  <div className="space-y-3">
                    {QUESTIONS.filter(q => q.category === cat).map(q => (
                      <div key={q.id} className={`flex items-start justify-between gap-4 p-4 rounded-xl border transition ${
                        answers[q.id] === true ? "bg-red-500/10 border-red-500/30" :
                        answers[q.id] === false ? "bg-green-500/5 border-green-500/20" :
                        "bg-black/30 border-zinc-800/60"}`}>
                        <div className="flex items-start gap-3">
                          <span className="text-xl shrink-0">{q.icon}</span>
                          <p className="text-gray-200 text-sm leading-relaxed">{q.question}</p>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <button onClick={() => toggle(q.id, true)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-semibold border transition ${answers[q.id]===true?"bg-red-500 border-red-500 text-white":"bg-black/40 border-zinc-700 text-gray-400 hover:border-red-400"}`}>
                            Yes
                          </button>
                          <button onClick={() => toggle(q.id, false)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-semibold border transition ${answers[q.id]===false?"bg-green-600 border-green-600 text-white":"bg-black/40 border-zinc-700 text-gray-400 hover:border-green-400"}`}>
                            No
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Progress */}
              <div className="bg-black/40 border border-zinc-700/60 rounded-2xl p-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Progress</span>
                  <span className="text-cyan-400 font-semibold">{Object.keys(answers).length} / {QUESTIONS.length} answered</span>
                </div>
                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500 rounded-full transition-all"
                    style={{width: `${(Object.keys(answers).length/QUESTIONS.length)*100}%`}}/>
                </div>
              </div>

              <button onClick={() => setShowResult(true)} disabled={!allAnswered}
                className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-black py-4 rounded-2xl font-bold text-lg transition hover:shadow-[0_0_25px_rgba(34,211,238,0.4)]">
                {allAnswered ? "🔍 Check My Risk Level" : `Answer All Questions (${QUESTIONS.length - Object.keys(answers).length} remaining)`}
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Risk Banner */}
              <div className={`border rounded-2xl p-6 ${riskConfig[risk].color}`}>
                <p className={`text-xl font-bold ${riskConfig[risk].text}`}>{riskConfig[risk].label}</p>
                <div className="flex items-center gap-4 mt-3">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white">{yesCount}</p>
                    <p className="text-gray-400 text-xs">Risk signals</p>
                  </div>
                  <div className="flex-1 h-3 bg-zinc-800 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all ${
                      risk==="critical"?"bg-red-500":risk==="high"?"bg-orange-500":risk==="medium"?"bg-yellow-500":"bg-green-500"}`}
                      style={{width:`${(yesCount/QUESTIONS.length)*100}%`}}/>
                  </div>
                </div>
              </div>

              {/* Steps */}
              <div className="bg-black/40 backdrop-blur-sm border border-zinc-700/60 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">⚡ Your Action Plan</h3>
                <div className="space-y-3">
                  {riskConfig[risk].steps.map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-cyan-500 text-black flex items-center justify-center text-xs font-bold shrink-0">
                        {i+1}
                      </div>
                      <p className="text-gray-200 text-sm leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Flagged answers */}
              {yesCount > 0 && (
                <div className="bg-black/40 border border-red-500/20 rounded-2xl p-5">
                  <h3 className="text-red-400 font-semibold mb-3">🚩 Concerning Signals Detected</h3>
                  <div className="space-y-2">
                    {QUESTIONS.filter(q => answers[q.id] === true).map(q => (
                      <div key={q.id} className="flex items-center gap-2 text-sm text-gray-400">
                        <span className="text-red-400">⚠</span> {q.question}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Helplines */}
              <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-5">
                <h3 className="text-red-400 font-bold mb-3">🆘 If You Need Help</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <a href="tel:1930" className="bg-black/40 border border-red-500/20 rounded-xl p-3 hover:border-red-400 transition">
                    <p className="text-gray-400 text-xs">Cyber Crime Helpline</p>
                    <p className="text-red-400 font-bold text-lg">1930</p>
                  </a>
                  <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer"
                    className="bg-black/40 border border-red-500/20 rounded-xl p-3 hover:border-red-400 transition">
                    <p className="text-gray-400 text-xs">File Complaint</p>
                    <p className="text-red-400 font-bold">cybercrime.gov.in</p>
                  </a>
                </div>
              </div>

              <button onClick={() => { setAnswers({}); setShowResult(false); }}
                className="w-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-gray-300 py-3 rounded-xl transition">
                ← Take Test Again
              </button>
            </div>
          )}
        </div>
      </main>
    </ToolPageWrapper>
  );
}
