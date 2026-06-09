"use client";
import { useState } from "react";
import ToolPageWrapper from "@/components/ToolPageWrapper";

export default function JSONFormatterPage() {
  const [input, setInput]   = useState("");
  const [output, setOutput] = useState("");
  const [error, setError]   = useState("");
  const [indent, setIndent] = useState(2);
  const [copied, setCopied] = useState(false);
  const [stats, setStats]   = useState<{keys:number;arrays:number;depth:number}|null>(null);

  const countStats = (obj: unknown, depth = 0): {keys:number;arrays:number;depth:number} => {
    if (typeof obj !== "object" || obj === null) return {keys:0,arrays:0,depth};
    let keys = 0, arrays = 0, maxDepth = depth;
    if (Array.isArray(obj)) {
      arrays++;
      obj.forEach(v => { const s = countStats(v, depth+1); keys+=s.keys; arrays+=s.arrays; maxDepth=Math.max(maxDepth,s.depth); });
    } else {
      Object.entries(obj as Record<string,unknown>).forEach(([,v]) => { keys++; const s = countStats(v, depth+1); keys+=s.keys; arrays+=s.arrays; maxDepth=Math.max(maxDepth,s.depth); });
    }
    return {keys,arrays,depth:maxDepth};
  };

  const format = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indent));
      setStats(countStats(parsed));
      setError("");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
      setOutput(""); setStats(null);
    }
  };

  const minify = () => {
    try {
      setOutput(JSON.stringify(JSON.parse(input)));
      setError("");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const SAMPLE = `{"name":"Everyday Cyber AI","type":"IT Security","services":["firewall","CCTV","support"],"contact":{"email":"info@everydaycyberai.com","phone":"+91 84540 31225"},"active":true}`;

  return (
    <ToolPageWrapper badge="Dev Tool">
      <main className="px-6 py-12 pb-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-5xl font-bold mb-4">JSON Formatter</h1>
            <p className="text-gray-400">Format, validate, minify and analyze JSON data instantly</p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {/* Input */}
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <label className="text-gray-300 font-medium">Raw JSON</label>
                <button onClick={() => { setInput(SAMPLE); setOutput(""); setError(""); }}
                  className="text-xs bg-zinc-800 hover:bg-zinc-700 text-gray-400 hover:text-cyan-400 px-3 py-1 rounded-lg transition">
                  Load Sample
                </button>
              </div>
              <textarea rows={14} value={input} onChange={e => { setInput(e.target.value); setOutput(""); setError(""); }}
                placeholder={'{\n  "paste": "your JSON here"\n}'}
                className="flex-1 w-full bg-black/80 border border-zinc-700 rounded-2xl px-4 py-3 text-white font-mono text-sm resize-none outline-none focus:border-cyan-400 transition"/>

              <div className="flex items-center gap-3">
                <label className="text-gray-400 text-sm">Indent:</label>
                {[2,4].map(n => (
                  <button key={n} onClick={() => setIndent(n)}
                    className={`px-3 py-1 rounded-lg text-sm border transition ${indent===n?"bg-cyan-500/20 border-cyan-500/40 text-cyan-400":"bg-zinc-800 border-zinc-700 text-gray-400"}`}>
                    {n} spaces
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <button onClick={format}
                  className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-black py-3 rounded-xl font-bold transition">
                  ✨ Format
                </button>
                <button onClick={minify}
                  className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white py-3 rounded-xl font-semibold transition">
                  ⚡ Minify
                </button>
              </div>
            </div>

            {/* Output */}
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <label className="text-gray-300 font-medium">Output</label>
                {output && (
                  <button onClick={copy}
                    className={`text-xs px-3 py-1 rounded-lg transition ${copied?"bg-green-500/20 text-green-400":"bg-zinc-800 text-gray-400 hover:text-cyan-400"}`}>
                    {copied ? "✓ Copied" : "Copy"}
                  </button>
                )}
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                  <p className="text-red-400 text-sm font-semibold mb-1">❌ Invalid JSON</p>
                  <p className="text-red-300/70 text-xs font-mono">{error}</p>
                </div>
              )}

              {stats && (
                <div className="grid grid-cols-3 gap-2">
                  {[{label:"Keys",value:stats.keys},{label:"Arrays",value:stats.arrays},{label:"Max Depth",value:stats.depth}].map(({label,value})=>(
                    <div key={label} className="bg-black/40 border border-zinc-800 rounded-xl p-3 text-center">
                      <p className="text-lg font-bold text-cyan-400">{value}</p>
                      <p className="text-xs text-gray-500">{label}</p>
                    </div>
                  ))}
                </div>
              )}

              <pre className="flex-1 bg-black/80 border border-zinc-700 rounded-2xl px-4 py-3 text-green-400 font-mono text-xs overflow-auto max-h-80 whitespace-pre-wrap break-all">
                {output || <span className="text-gray-600">Formatted output will appear here...</span>}
              </pre>
            </div>
          </div>
        </div>
      </main>
    </ToolPageWrapper>
  );
}
