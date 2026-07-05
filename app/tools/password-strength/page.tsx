"use client";

import { useState } from "react";
import ToolPageWrapper from "@/components/ToolPageWrapper";

type Check = { label: string; passed: boolean; tip: string };

function analyzePassword(pwd: string) {
  const checks: Check[] = [
    { label: "At least 8 characters",   passed: pwd.length >= 8,   tip: "Use 12+ for better security" },
    { label: "At least 12 characters",  passed: pwd.length >= 12,  tip: "Recommended minimum length" },
    { label: "Uppercase letters (A-Z)", passed: /[A-Z]/.test(pwd), tip: "Add at least one capital letter" },
    { label: "Lowercase letters (a-z)", passed: /[a-z]/.test(pwd), tip: "Mix upper and lowercase" },
    { label: "Numbers (0-9)",           passed: /[0-9]/.test(pwd), tip: "Include digits" },
    { label: "Special symbols (!@#$)",  passed: /[^A-Za-z0-9]/.test(pwd), tip: "Symbols make it much harder to crack" },
    { label: "No common patterns",      passed: !/(123|abc|password|qwerty|admin|letmein|welcome)/i.test(pwd), tip: "Avoid predictable sequences" },
    { label: "No repeated characters",  passed: !/(.)(\1{2,})/.test(pwd), tip: "Avoid aaa or 111 patterns" },
  ];
  const score = checks.filter((c) => c.passed).length;
  const entropy = Math.floor(pwd.length * Math.log2(
    (/[A-Z]/.test(pwd) ? 26 : 0) + (/[a-z]/.test(pwd) ? 26 : 0) +
    (/[0-9]/.test(pwd) ? 10 : 0) + (/[^A-Za-z0-9]/.test(pwd) ? 32 : 0) || 26
  ));
  if (score <= 2) return { checks, score, entropy, level: "Very Weak",  color: "text-red-400",    bar: "bg-red-500",    width: "w-1/5",  crackTime: "Instantly" };
  if (score <= 3) return { checks, score, entropy, level: "Weak",       color: "text-orange-400", bar: "bg-orange-500", width: "w-2/5",  crackTime: "Minutes" };
  if (score <= 4) return { checks, score, entropy, level: "Fair",       color: "text-yellow-400", bar: "bg-yellow-500", width: "w-3/5",  crackTime: "Hours" };
  if (score <= 5) return { checks, score, entropy, level: "Strong",     color: "text-green-400",  bar: "bg-green-500",  width: "w-4/5",  crackTime: "Years" };
  return               { checks, score, entropy, level: "Very Strong",  color: "text-cyan-400",   bar: "bg-cyan-400",   width: "w-full", crackTime: "Centuries" };
}

async function checkPwned(password: string): Promise<number | null> {
  try {
    const enc = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-1", enc);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("").toUpperCase();
    const prefix = hashHex.slice(0, 5);
    const suffix = hashHex.slice(5);
    const res = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
    if (!res.ok) return null;
    const text = await res.text();
    const match = text.split("\n").find(line => line.startsWith(suffix));
    return match ? parseInt(match.split(":")[1].trim(), 10) : 0;
  } catch {
    return null;
  }
}

export default function PasswordStrengthPage() {
  const [password, setPassword] = useState("");
  const [show, setShow]         = useState(false);
  const [pwnedCount, setPwnedCount] = useState<number | null>(null);
  const [checkingBreach, setCheckingBreach] = useState(false);
  const result = password ? analyzePassword(password) : null;

  const runBreachCheck = async () => {
    if (!password) return;
    setCheckingBreach(true);
    setPwnedCount(null);
    const count = await checkPwned(password);
    setPwnedCount(count);
    setCheckingBreach(false);
  };

  return (
    <ToolPageWrapper badge="Security Tool">
      <main className="px-6 py-12 pb-24">
        <div className="max-w-2xl mx-auto">

          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">Password Strength Checker</h1>
            <p className="text-gray-400">Check how strong your password is — analyzed locally, never sent anywhere</p>
          </div>

          <div className="bg-black/40 backdrop-blur-sm border border-zinc-700/60 rounded-3xl p-8 space-y-6">
            <div>
              <label className="block text-gray-300 font-medium mb-3">Enter Your Password</label>
              <div className="relative">
                <input type={show ? "text" : "password"}
                  placeholder="Type your password here..."
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setPwnedCount(null); }}
                  className="w-full bg-black/80 border border-zinc-700 rounded-2xl px-5 py-4 font-mono outline-none focus:border-cyan-400 transition pr-16" />
                <button onClick={() => setShow(!show)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-cyan-400 transition text-sm">
                  {show ? "Hide" : "Show"}
                </button>
              </div>
              <p className="text-xs text-gray-600 mt-2">🔒 Analyzed entirely in your browser — not stored or transmitted</p>
            </div>

            {result && (
              <>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400 text-sm">Overall Strength</span>
                    <span className={`font-bold ${result.color}`}>{result.level}</span>
                  </div>
                  <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-700 ${result.bar} ${result.width}`} />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  {[
                    { val: password.length, label: "Characters" },
                    { val: result.entropy,  label: "Entropy (bits)" },
                    { val: result.crackTime,label: "To crack" },
                  ].map(({ val, label }) => (
                    <div key={label} className="bg-black/80 border border-zinc-800 rounded-xl p-4">
                      <p className="text-2xl font-bold text-cyan-400">{val}</p>
                      <p className="text-xs text-gray-500 mt-1">{label}</p>
                    </div>
                  ))}
                </div>

                <div>
                  <p className="text-gray-300 font-medium mb-4">Security Checklist</p>
                  <div className="space-y-2">
                    {result.checks.map((c) => (
                      <div key={c.label} className={`flex items-start gap-3 px-4 py-3 rounded-xl border ${
                        c.passed ? "bg-green-500/5 border-green-500/20" : "bg-red-500/5 border-red-500/20"}`}>
                        <span className={c.passed ? "text-green-400" : "text-red-400"}>{c.passed ? "✓" : "✗"}</span>
                        <div>
                          <p className={`text-sm font-medium ${c.passed ? "text-green-400" : "text-red-400"}`}>{c.label}</p>
                          {!c.passed && <p className="text-xs text-gray-500 mt-0.5">{c.tip}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-zinc-800 pt-6">
                  <p className="text-gray-300 font-medium mb-2">Data Breach Check</p>
                  <p className="text-xs text-gray-500 mb-4">Checks if this exact password has appeared in known breach dumps — via HaveIBeenPwned&apos;s free Pwned Passwords service. Only the first 5 characters of a hash are sent, never your real password.</p>

                  {pwnedCount === null && !checkingBreach && (
                    <button onClick={runBreachCheck}
                      className="w-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 py-3 rounded-xl font-semibold hover:bg-cyan-500/30 transition">
                      🔍 Check if this password has been leaked
                    </button>
                  )}

                  {checkingBreach && (
                    <div className="text-center py-4 text-gray-400 text-sm">
                      <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                      Checking breach databases...
                    </div>
                  )}

                  {pwnedCount !== null && (
                    pwnedCount > 0 ? (
                      <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-5">
                        <p className="text-red-400 font-bold mb-1">🚨 This password has been leaked!</p>
                        <p className="text-gray-300 text-sm">Found in known breach dumps <b>{pwnedCount.toLocaleString("en-IN")}</b> times. Do not use this password anywhere — change it immediately on any account that uses it.</p>
                      </div>
                    ) : (
                      <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-5">
                        <p className="text-green-400 font-bold mb-1">✅ Not found in known breaches</p>
                        <p className="text-gray-300 text-sm">This exact password wasn&apos;t found in public breach dumps. Still make sure it&apos;s unique and not reused elsewhere.</p>
                      </div>
                    )
                  )}
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
    </ToolPageWrapper>
  );
}
