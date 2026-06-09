"use client";

import { useState } from "react";

type Check = { label: string; passed: boolean; tip: string };

function analyzePassword(pwd: string) {
  const checks: Check[] = [
    { label: "At least 8 characters",  passed: pwd.length >= 8,  tip: "Use 12+ for better security" },
    { label: "At least 12 characters", passed: pwd.length >= 12, tip: "Recommended minimum length" },
    { label: "Uppercase letters (A-Z)", passed: /[A-Z]/.test(pwd), tip: "Add at least one capital letter" },
    { label: "Lowercase letters (a-z)", passed: /[a-z]/.test(pwd), tip: "Mix upper and lowercase" },
    { label: "Numbers (0-9)",           passed: /[0-9]/.test(pwd), tip: "Include digits" },
    { label: "Special symbols (!@#$)",  passed: /[^A-Za-z0-9]/.test(pwd), tip: "Symbols make it much harder to crack" },
    { label: "No common patterns",      passed: !/(123|abc|password|qwerty|admin|letmein|welcome)/i.test(pwd), tip: "Avoid predictable sequences" },
    { label: "No repeated characters",  passed: !/(.)(\1{2,})/.test(pwd), tip: "Avoid aaa or 111 patterns" },
  ];

  const score   = checks.filter((c) => c.passed).length;
  const entropy = Math.floor(pwd.length * Math.log2(
    (/[A-Z]/.test(pwd) ? 26 : 0) +
    (/[a-z]/.test(pwd) ? 26 : 0) +
    (/[0-9]/.test(pwd) ? 10 : 0) +
    (/[^A-Za-z0-9]/.test(pwd) ? 32 : 0) || 26
  ));

  let level = "Very Weak";
  let color = "text-red-400";
  let barColor = "bg-red-500";
  let barWidth = "w-1/5";
  let crackTime = "Instantly";

  if (score >= 3) { level = "Weak";       color = "text-orange-400"; barColor = "bg-orange-500"; barWidth = "w-2/5"; crackTime = "Minutes"; }
  if (score >= 5) { level = "Fair";       color = "text-yellow-400"; barColor = "bg-yellow-500"; barWidth = "w-3/5"; crackTime = "Hours"; }
  if (score >= 6) { level = "Strong";     color = "text-green-400";  barColor = "bg-green-500";  barWidth = "w-4/5"; crackTime = "Years"; }
  if (score >= 7) { level = "Very Strong";color = "text-cyan-400";   barColor = "bg-cyan-400";   barWidth = "w-full"; crackTime = "Centuries"; }

  return { checks, score, level, color, barColor, barWidth, crackTime, entropy };
}

export default function PasswordStrengthPage() {
  const [password, setPassword] = useState("");
  const [show, setShow]         = useState(false);

  const result = password ? analyzePassword(password) : null;

  return (
    <main className="min-h-screen bg-black text-white px-6 py-32">
      <div className="max-w-2xl mx-auto">

        <div className="text-center mb-12">
          <div className="inline-block border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 px-5 py-2 rounded-full text-sm mb-6">
            Security Tool
          </div>
          <h1 className="text-5xl font-bold mb-4">Password Strength Checker</h1>
          <p className="text-gray-400">Check how strong your password is — analyzed locally, never sent anywhere</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 space-y-6">

          {/* Input */}
          <div>
            <label className="block text-gray-300 font-medium mb-3">Enter Your Password</label>
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                placeholder="Type your password here..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black border border-zinc-700 rounded-2xl px-5 py-4 font-mono outline-none focus:border-cyan-400 transition pr-16"
              />
              <button
                onClick={() => setShow(!show)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-cyan-400 transition text-sm"
              >
                {show ? "Hide" : "Show"}
              </button>
            </div>
            <p className="text-xs text-gray-600 mt-2">🔒 Analyzed entirely in your browser — not stored or transmitted</p>
          </div>

          {result && (
            <>
              {/* Strength Bar */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400 text-sm">Overall Strength</span>
                  <span className={`font-bold ${result.color}`}>{result.level}</span>
                </div>
                <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-700 ${result.barColor} ${result.barWidth}`} />
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-black border border-zinc-800 rounded-xl p-4">
                  <p className="text-2xl font-bold text-cyan-400">{password.length}</p>
                  <p className="text-xs text-gray-500 mt-1">Characters</p>
                </div>
                <div className="bg-black border border-zinc-800 rounded-xl p-4">
                  <p className="text-2xl font-bold text-cyan-400">{result.entropy}</p>
                  <p className="text-xs text-gray-500 mt-1">Entropy (bits)</p>
                </div>
                <div className="bg-black border border-zinc-800 rounded-xl p-4">
                  <p className="text-lg font-bold text-cyan-400">{result.crackTime}</p>
                  <p className="text-xs text-gray-500 mt-1">To crack</p>
                </div>
              </div>

              {/* Checklist */}
              <div>
                <p className="text-gray-300 font-medium mb-4">Security Checklist</p>
                <div className="space-y-2">
                  {result.checks.map((c) => (
                    <div key={c.label} className={`flex items-start gap-3 px-4 py-3 rounded-xl border ${
                      c.passed
                        ? "bg-green-500/5 border-green-500/20"
                        : "bg-red-500/5 border-red-500/20"
                    }`}>
                      <span className={c.passed ? "text-green-400" : "text-red-400"}>{c.passed ? "✓" : "✗"}</span>
                      <div>
                        <p className={`text-sm font-medium ${c.passed ? "text-green-400" : "text-red-400"}`}>{c.label}</p>
                        {!c.passed && <p className="text-xs text-gray-500 mt-0.5">{c.tip}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

        </div>

        {!password && (
          <div className="mt-8 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-cyan-400 mb-4">💡 What makes a strong password?</h2>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>✓ 16+ characters minimum</li>
              <li>✓ Mix of uppercase, lowercase, numbers and symbols</li>
              <li>✓ No dictionary words or common phrases</li>
              <li>✓ No personal info (name, birthday, phone)</li>
              <li>✓ Unique — never reuse passwords across accounts</li>
            </ul>
          </div>
        )}

      </div>
    </main>
  );
}
