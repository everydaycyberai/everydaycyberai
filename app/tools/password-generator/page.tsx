"use client";

import { useState, useCallback } from "react";

type Options = {
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
};

function generatePwd(length: number, opts: Options): string {
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const nums  = "0123456789";
  const syms  = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  let pool = "";
  if (opts.uppercase) pool += upper;
  if (opts.lowercase) pool += lower;
  if (opts.numbers)   pool += nums;
  if (opts.symbols)   pool += syms;
  if (!pool) pool = lower;

  const arr = new Uint32Array(length);
  crypto.getRandomValues(arr);
  return Array.from(arr).map((n) => pool[n % pool.length]).join("");
}

function getStrength(pwd: string): { label: string; color: string; width: string; score: number } {
  let score = 0;
  if (pwd.length >= 8)  score++;
  if (pwd.length >= 12) score++;
  if (pwd.length >= 16) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[a-z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;

  if (score <= 2) return { label: "Very Weak", color: "bg-red-500",    width: "w-1/5",   score };
  if (score <= 3) return { label: "Weak",      color: "bg-orange-500", width: "w-2/5",   score };
  if (score <= 4) return { label: "Fair",      color: "bg-yellow-500", width: "w-3/5",   score };
  if (score <= 5) return { label: "Strong",    color: "bg-green-400",  width: "w-4/5",   score };
  return               { label: "Very Strong", color: "bg-cyan-400",   width: "w-full",  score };
}

export default function PasswordGeneratorPage() {
  const [length, setLength]     = useState(16);
  const [opts, setOpts]         = useState<Options>({ uppercase: true, lowercase: true, numbers: true, symbols: true });
  const [passwords, setPasswords] = useState<string[]>([generatePwd(16, { uppercase: true, lowercase: true, numbers: true, symbols: true })]);
  const [copied, setCopied]     = useState<number | null>(null);
  const [count, setCount]       = useState(1);

  const generate = useCallback(() => {
    setPasswords(Array.from({ length: count }, () => generatePwd(length, opts)));
    setCopied(null);
  }, [length, opts, count]);

  const copy = (pwd: string, idx: number) => {
    navigator.clipboard.writeText(pwd);
    setCopied(idx);
    setTimeout(() => setCopied(null), 2000);
  };

  const toggle = (key: keyof Options) => {
    setOpts((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      const anyOn = Object.values(next).some(Boolean);
      return anyOn ? next : prev;
    });
  };

  const strength = passwords[0] ? getStrength(passwords[0]) : null;

  return (
    <main className="min-h-screen bg-black text-white px-6 py-32">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 px-5 py-2 rounded-full text-sm mb-6">
            Security Tool
          </div>
          <h1 className="text-5xl font-bold mb-4">Password Generator</h1>
          <p className="text-gray-400">
            Generate cryptographically secure passwords using <code className="text-cyan-400 text-sm">crypto.getRandomValues()</code>
          </p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 space-y-8">

          {/* Length Slider */}
          <div>
            <div className="flex justify-between mb-3">
              <span className="text-gray-300 font-medium">Password Length</span>
              <span className="text-cyan-400 font-bold text-xl">{length}</span>
            </div>
            <input
              type="range" min={6} max={64} value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-600 mt-1">
              <span>6</span><span>16</span><span>32</span><span>64</span>
            </div>
          </div>

          {/* Character Type Toggles */}
          <div>
            <p className="text-gray-300 font-medium mb-4">Character Types</p>
            <div className="grid grid-cols-2 gap-3">
              {([ 
                { key: "uppercase", label: "Uppercase", example: "A–Z" },
                { key: "lowercase", label: "Lowercase", example: "a–z" },
                { key: "numbers",   label: "Numbers",   example: "0–9" },
                { key: "symbols",   label: "Symbols",   example: "!@#$%" },
              ] as { key: keyof Options; label: string; example: string }[]).map(({ key, label, example }) => (
                <button
                  key={key}
                  onClick={() => toggle(key)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl border transition duration-200 ${
                    opts[key]
                      ? "bg-cyan-500/10 border-cyan-500/50 text-white"
                      : "bg-black border-zinc-700 text-gray-500"
                  }`}
                >
                  <span className="font-medium">{label}</span>
                  <span className={`text-xs font-mono ${opts[key] ? "text-cyan-400" : "text-gray-600"}`}>{example}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Count */}
          <div className="flex items-center gap-4">
            <span className="text-gray-300 font-medium">Generate</span>
            <select
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="bg-black border border-zinc-700 text-white px-4 py-2 rounded-xl focus:outline-none focus:border-cyan-400"
            >
              {[1,3,5,10].map(n => <option key={n} value={n}>{n} password{n > 1 ? "s" : ""}</option>)}
            </select>
            <span className="text-gray-500 text-sm">at once</span>
          </div>

          {/* Generate Button */}
          <button
            onClick={generate}
            className="w-full bg-cyan-500 hover:bg-cyan-400 hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] text-black py-4 rounded-2xl font-bold text-lg transition duration-300"
          >
            Generate Password{count > 1 ? "s" : ""}
          </button>

          {/* Strength Meter (for first password) */}
          {strength && passwords[0] && (
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400 text-sm">Strength</span>
                <span className={`text-sm font-semibold ${strength.color.replace("bg-", "text-")}`}>{strength.label}</span>
              </div>
              <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-500 ${strength.color} ${strength.width}`} />
              </div>
            </div>
          )}

          {/* Password Results */}
          <div className="space-y-3">
            {passwords.map((pwd, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-black border border-zinc-700 rounded-2xl px-5 py-4">
                <span className="flex-1 font-mono text-lg break-all text-white">{pwd}</span>
                <button
                  onClick={() => copy(pwd, idx)}
                  className={`shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition duration-200 ${
                    copied === idx
                      ? "bg-green-500/20 border border-green-500/40 text-green-400"
                      : "bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20"
                  }`}
                >
                  {copied === idx ? "✓ Copied" : "Copy"}
                </button>
              </div>
            ))}
          </div>

        </div>

        {/* Security Tips */}
        <div className="mt-8 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-cyan-400 mb-4">🔐 Password Security Tips</h2>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>✓ Use a different password for every account</li>
            <li>✓ Use a password manager (Bitwarden, 1Password) to store them safely</li>
            <li>✓ Enable 2-Factor Authentication (2FA) wherever possible</li>
            <li>✓ Never share your password over email or WhatsApp</li>
            <li>✓ Passwords 16+ characters with all character types are hardest to crack</li>
          </ul>
        </div>

      </div>
    </main>
  );
}
