"use client";
import { useState } from "react";
import ToolPageWrapper from "@/components/ToolPageWrapper";

const QUESTIONS = [
  { id: "s1",  points: 10, question: "Do you use different passwords for different accounts?", tip: "Use a password manager like Bitwarden (free) to manage unique passwords." },
  { id: "s2",  points: 15, question: "Is 2-Factor Authentication (2FA) enabled on Gmail/email?", tip: "Enable 2FA on Google account settings — it blocks 99% of account takeovers." },
  { id: "s3",  points: 10, question: "Is 2FA enabled on your banking/UPI apps?", tip: "Enable app lock and MPIN on PhonePe, GPay, Paytm." },
  { id: "s4",  points: 8,  question: "Do you avoid clicking unknown links in SMS/WhatsApp?", tip: "Never click links in unexpected messages. Visit websites directly." },
  { id: "s5",  points: 7,  question: "Do you check the URL before entering passwords on websites?", tip: "Look for HTTPS and verify domain name — fake sites use similar-looking URLs." },
  { id: "s6",  points: 8,  question: "Do you avoid connecting to public WiFi for banking?", tip: "Public WiFi is unsafe for banking. Use mobile data or VPN." },
  { id: "s7",  points: 5,  question: "Are your phone OS and apps updated regularly?", tip: "Updates fix security vulnerabilities. Enable auto-update." },
  { id: "s8",  points: 5,  question: "Do you review app permissions (camera, mic, contacts)?", tip: "Go to Settings → Apps → Permissions and revoke unnecessary access." },
  { id: "s9",  points: 8,  question: "Do you have app lock or strong PIN/fingerprint on your phone?", tip: "Use fingerprint or strong 6-digit PIN — not pattern locks." },
  { id: "s10", points: 7,  question: "Do you avoid sharing OTP or PIN with anyone (even 'bank officials')?", tip: "Real bank officials NEVER ask for OTP or PIN. Always refuse." },
  { id: "s11", points: 7,  question: "Do you avoid installing apps from unknown sources (outside Play Store)?", tip: "Only install apps from Google Play Store or Apple App Store." },
  { id: "s12", points: 10, question: "Do you have antivirus/security app installed on your device?", tip: "Install Malwarebytes or Bitdefender (free versions available)." },
];

const totalPoints = QUESTIONS.reduce((sum, q) => sum + q.points, 0);

export default function SafetyScorePage() {
  const [answers, setAnswers] = useState<Record<string, boolean | null>>({});
  const [showResult, setShowResult] = useState(false);

  const toggle = (id: string, val: boolean) => setAnswers(prev => ({ ...prev, [id]: val }));
  const allAnswered = QUESTIONS.every(q => answers[q.id] !== undefined);
  const score = QUESTIONS.filter(q => answers[q.id] === true).reduce((sum, q) => sum + q.points, 0);
  const pct = Math.round((score / totalPoints) * 100);

  const getGrade = () => {
    if (pct >= 90) return { grade: "A+", label: "Excellent! 🏆", color: "text-green-400", bar: "bg-green-500" };
    if (pct >= 75) return { grade: "A",  label: "Good 👍",       color: "text-green-400", bar: "bg-green-400" };
    if (pct >= 60) return { grade: "B",  label: "Fair ✅",       color: "text-yellow-400",bar: "bg-yellow-500" };
    if (pct >= 40) return { grade: "C",  label: "Weak ⚠️",       color: "text-orange-400",bar: "bg-orange-500" };
    return               { grade: "D",  label: "Danger 🚨",     color: "text-red-400",   bar: "bg-red-500" };
  };

  const g = getGrade();
  const failedQuestions = QUESTIONS.filter(q => answers[q.id] === false);

  return (
    <ToolPageWrapper badge="🛡️ Cyber Help">
      <main className="px-6 py-12 pb-24 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-block bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-4 py-1.5 rounded-full text-xs mb-4">
              🔒 Free Security Check
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Digital Safety Score</h1>
            <p className="text-gray-400">12 simple questions — find out how safe you are online and get personalized tips to improve</p>
          </div>

          {!showResult ? (
            <div className="space-y-4">
              <div className="bg-black/40 backdrop-blur-sm border border-zinc-700/60 rounded-3xl p-6 space-y-3">
                {QUESTIONS.map((q, i) => (
                  <div key={q.id} className={`flex items-start justify-between gap-4 p-4 rounded-xl border transition ${
                    answers[q.id] === true  ? "bg-green-500/5 border-green-500/20" :
                    answers[q.id] === false ? "bg-red-500/5 border-red-500/20" :
                    "bg-black/30 border-zinc-800/60"}`}>
                    <div className="flex items-start gap-3">
                      <span className="text-gray-500 text-xs font-mono w-5 shrink-0 mt-1">{i+1}.</span>
                      <div>
                        <p className="text-gray-200 text-sm leading-relaxed">{q.question}</p>
                        <p className="text-cyan-400/60 text-xs mt-1">+{q.points} points</p>
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button onClick={() => toggle(q.id, true)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-semibold border transition ${answers[q.id]===true?"bg-green-600 border-green-600 text-white":"bg-black/40 border-zinc-700 text-gray-400 hover:border-green-400"}`}>
                        Yes
                      </button>
                      <button onClick={() => toggle(q.id, false)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-semibold border transition ${answers[q.id]===false?"bg-red-600 border-red-600 text-white":"bg-black/40 border-zinc-700 text-gray-400 hover:border-red-400"}`}>
                        No
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-black/40 border border-zinc-700/60 rounded-2xl p-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Progress</span>
                  <span className="text-cyan-400 font-semibold">{Object.keys(answers).length}/{QUESTIONS.length}</span>
                </div>
                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500 rounded-full transition-all"
                    style={{width:`${(Object.keys(answers).length/QUESTIONS.length)*100}%`}}/>
                </div>
              </div>

              <button onClick={() => setShowResult(true)} disabled={!allAnswered}
                className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-black py-4 rounded-2xl font-bold text-lg transition hover:shadow-[0_0_25px_rgba(34,211,238,0.4)]">
                {allAnswered ? "🔒 Get My Safety Score" : `Answer All (${QUESTIONS.length - Object.keys(answers).length} left)`}
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Score Card */}
              <div className="bg-black/40 backdrop-blur-sm border border-zinc-700/60 rounded-3xl p-8 text-center">
                <p className="text-gray-400 mb-2">Your Digital Safety Score</p>
                <div className={`text-8xl font-black mb-2 ${g.color}`}>{pct}</div>
                <p className="text-2xl font-bold text-white mb-1">{g.grade} — {g.label}</p>
                <p className="text-gray-400 text-sm mb-6">{score} out of {totalPoints} points</p>
                <div className="h-4 bg-zinc-800 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-1000 ${g.bar}`} style={{width:`${pct}%`}}/>
                </div>
                <div className="flex justify-between text-xs text-gray-600 mt-1">
                  <span>0 — Danger</span><span>100 — Safe</span>
                </div>
              </div>

              {/* Weak areas */}
              {failedQuestions.length > 0 && (
                <div className="bg-black/40 backdrop-blur-sm border border-zinc-700/60 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">🔧 Areas to Improve ({failedQuestions.length})</h3>
                  <div className="space-y-4">
                    {failedQuestions.map(q => (
                      <div key={q.id} className="bg-red-500/5 border border-red-500/20 rounded-xl p-4">
                        <p className="text-red-300 text-sm font-medium mb-1">❌ {q.question}</p>
                        <p className="text-gray-400 text-xs leading-relaxed">💡 {q.tip}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Passed areas */}
              {QUESTIONS.filter(q => answers[q.id] === true).length > 0 && (
                <div className="bg-black/40 backdrop-blur-sm border border-zinc-700/60 rounded-2xl p-5">
                  <h3 className="text-green-400 font-semibold mb-3">✅ You're Already Doing These Right</h3>
                  <div className="space-y-1">
                    {QUESTIONS.filter(q => answers[q.id] === true).map(q => (
                      <div key={q.id} className="flex items-center gap-2 text-sm text-gray-400">
                        <span className="text-green-400">✓</span>{q.question}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button onClick={() => { setAnswers({}); setShowResult(false); }}
                className="w-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-gray-300 py-3 rounded-xl transition">
                ← Retake Test
              </button>
            </div>
          )}
        </div>
      </main>
    </ToolPageWrapper>
  );
}
