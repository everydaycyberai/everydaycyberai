"use client";
import { useState } from "react";
import ToolPageWrapper from "@/components/ToolPageWrapper";

export default function URLShortenerPage() {
  const [url, setUrl]         = useState("");
  const [short, setShort]     = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied]   = useState(false);
  const [error, setError]     = useState("");
  const [history, setHistory] = useState<{original: string; short: string}[]>([]);

  const isValidUrl = (u: string) => {
    try { new URL(u.startsWith("http") ? u : `https://${u}`); return true; } catch { return false; }
  };

  const shorten = async () => {
    const cleanUrl = url.trim().startsWith("http") ? url.trim() : `https://${url.trim()}`;
    if (!isValidUrl(cleanUrl)) { setError("Please enter a valid URL"); return; }
    setError(""); setLoading(true); setShort("");
    try {
      const res = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(cleanUrl)}`);
      if (!res.ok) throw new Error("Failed");
      const data = await res.text();
      setShort(data);
      setHistory(prev => [{ original: cleanUrl, short: data }, ...prev.slice(0, 4)]);
    } catch {
      setError("Could not shorten URL. Please try again.");
    } finally { setLoading(false); }
  };

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolPageWrapper badge="Daily Use Tool">
      <main className="px-6 py-12 pb-24">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-5xl font-bold mb-4">URL Shortener</h1>
            <p className="text-gray-400">Shorten long links for WhatsApp, Instagram, bio and social media</p>
          </div>

          <div className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-3xl p-8 space-y-5">
            <div>
              <label className="block text-gray-300 font-medium mb-3">Enter Long URL</label>
              <textarea rows={3} value={url} onChange={e=>{setUrl(e.target.value); setError(""); setShort("");}}
                placeholder="https://www.example.com/very/long/url/that/needs/shortening"
                className="w-full bg-black/80 border border-zinc-700 rounded-2xl px-5 py-4 text-white outline-none focus:border-cyan-400 transition resize-none text-sm"/>
              {error && <p className="text-red-400 text-sm mt-2">⚠️ {error}</p>}
            </div>

            <button onClick={shorten} disabled={loading || !url.trim()}
              className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-black py-4 rounded-2xl font-bold text-lg transition hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]">
              {loading ? "Shortening..." : "Shorten URL ✂️"}
            </button>

            {short && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-5">
                <p className="text-gray-400 text-sm mb-3">✅ Your short URL is ready:</p>
                <div className="flex items-center gap-3">
                  <a href={short} target="_blank" rel="noopener noreferrer"
                    className="flex-1 text-cyan-400 font-mono text-lg font-bold hover:text-cyan-300 transition break-all">
                    {short}
                  </a>
                  <button onClick={() => copy(short)}
                    className={`shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition ${copied ? "bg-green-500/20 border border-green-500/40 text-green-400" : "bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20"}`}>
                    {copied ? "✓ Copied" : "Copy"}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* History */}
          {history.length > 0 && (
            <div className="mt-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
              <h2 className="text-cyan-400 font-semibold mb-4">🕐 Recent (this session)</h2>
              <div className="space-y-3">
                {history.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-black/40 border border-zinc-800 rounded-xl p-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-500 text-xs truncate">{item.original}</p>
                      <a href={item.short} target="_blank" rel="noopener noreferrer"
                        className="text-cyan-400 text-sm font-mono hover:text-cyan-300">{item.short}</a>
                    </div>
                    <button onClick={() => copy(item.short)}
                      className="shrink-0 text-xs bg-zinc-800 hover:bg-zinc-700 text-gray-400 px-3 py-1 rounded-lg transition">
                      Copy
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-cyan-400 mb-4">💡 Where to use short URLs</h2>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-400">
              {["Instagram bio (1 link only)","WhatsApp messages","Business cards","Email campaigns","Twitter / X posts","YouTube description"].map(u=>(
                <div key={u} className="flex items-center gap-2"><span className="text-cyan-500">✓</span>{u}</div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </ToolPageWrapper>
  );
}
