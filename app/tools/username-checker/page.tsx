"use client";
import { useState } from "react";
import ToolPageWrapper from "@/components/ToolPageWrapper";

type PlatformResult = { platform: string; available: boolean | null; url: string };

const PLATFORM_ICONS: Record<string, string> = {
  "GitHub": "💻",
  "Instagram": "📸",
  "YouTube": "▶️",
  "X (Twitter)": "🐦",
};

export default function UsernameCheckerPage() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<PlatformResult[] | null>(null);
  const [error, setError] = useState("");

  const check = async () => {
    if (!username.trim()) return;
    setLoading(true); setError(""); setResults(null);
    try {
      const res = await fetch("/api/username-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });
      const data = await res.json();
      if (data.results) setResults(data.results);
      else throw new Error();
    } catch {
      setError("Could not check right now — please try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolPageWrapper badge="🔎 Social Tool">
      <main className="px-6 py-12 pb-24 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Username Availability Checker</h1>
            <p className="text-gray-400">Check if a username is free across Instagram, YouTube, X and GitHub — all at once.</p>
          </div>

          <div className="bg-black/40 backdrop-blur-sm border border-zinc-700/60 rounded-3xl p-8 space-y-5">
            <div>
              <label className="block text-gray-300 font-medium mb-2">Username</label>
              <div className="flex gap-3">
                <input value={username} onChange={e => setUsername(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && check()}
                  placeholder="e.g. rohitsharma_23" autoCapitalize="off"
                  className="flex-1 bg-black/80 border border-zinc-700 rounded-2xl px-5 py-4 text-white text-lg outline-none focus:border-cyan-400 transition" />
                <button onClick={check} disabled={loading || !username.trim()}
                  className="bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-black px-6 rounded-2xl font-bold transition whitespace-nowrap">
                  {loading ? "..." : "Check"}
                </button>
              </div>
            </div>
            {error && <p className="text-red-400 text-sm">⚠️ {error}</p>}
          </div>

          {loading && (
            <div className="text-center py-10 text-gray-400">
              <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              Checking across platforms...
            </div>
          )}

          {results && (
            <div className="mt-8 space-y-3">
              {results.map((r) => (
                <a key={r.platform} href={r.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between bg-black/40 border border-zinc-700/60 hover:border-cyan-400 rounded-2xl p-5 transition group">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{PLATFORM_ICONS[r.platform] || "🌐"}</span>
                    <span className="text-white font-semibold">{r.platform}</span>
                  </div>
                  {r.available === true && (
                    <span className="bg-green-500/15 border border-green-500/30 text-green-400 px-4 py-1.5 rounded-full text-sm font-medium">✅ Available</span>
                  )}
                  {r.available === false && (
                    <span className="bg-red-500/15 border border-red-500/30 text-red-400 px-4 py-1.5 rounded-full text-sm font-medium">❌ Taken</span>
                  )}
                  {r.available === null && (
                    <span className="bg-gray-500/15 border border-gray-500/30 text-gray-400 px-4 py-1.5 rounded-full text-sm font-medium">❓ Check manually</span>
                  )}
                </a>
              ))}
              <p className="text-xs text-gray-600 text-center pt-3">
                ⚠️ Instagram, YouTube and X actively block automated checks, so those results are best-effort — GitHub is fully reliable. Always confirm on the platform directly before relying on a result.
              </p>
            </div>
          )}
        </div>
      </main>
    </ToolPageWrapper>
  );
}
