"use client";
import { useState } from "react";
import ToolPageWrapper from "@/components/ToolPageWrapper";

type Build = {
  summary: string;
  components: { part: string; suggestion: string; reason: string }[];
  notes: string[];
};

const USE_CASES = ["Gaming", "Video Editing", "Programming / Dev", "Streaming", "General / Office Use"];

export default function PCBuildCheckerPage() {
  const [budget, setBudget] = useState("60000");
  const [useCase, setUseCase] = useState(USE_CASES[0]);
  const [loading, setLoading] = useState(false);
  const [build, setBuild] = useState<Build | null>(null);
  const [error, setError] = useState("");

  const generate = async () => {
    setLoading(true); setError(""); setBuild(null);

    const prompt = `Suggest a PC build for this budget and use case, for a buyer in India:
Budget: ₹${budget}
Primary Use: ${useCase}

Give a balanced, realistic component suggestion (CPU, GPU, RAM, Storage, Motherboard, PSU, Cabinet) for this exact budget in Indian Rupees. Explain WHY each part fits together (compatibility — socket type, RAM type, PSU wattage needed) and suits the use case. Keep it realistic for current-generation components available in India.

Respond ONLY with valid JSON in this exact format, no markdown, no extra text:
{
  "summary": "2-3 sentence overview of this build and what it's good for",
  "components": [
    {"part": "CPU", "suggestion": "specific recommendation with approx price", "reason": "why this fits the budget/use case and what it's compatible with"},
    {"part": "GPU", "suggestion": "...", "reason": "..."},
    {"part": "RAM", "suggestion": "...", "reason": "..."},
    {"part": "Storage", "suggestion": "...", "reason": "..."},
    {"part": "Motherboard", "suggestion": "...", "reason": "..."},
    {"part": "PSU", "suggestion": "...", "reason": "..."},
    {"part": "Cabinet", "suggestion": "...", "reason": "..."}
  ],
  "notes": ["important compatibility note 1", "note 2", "note 3"]
}`;

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemPrompt: "You are a PC building expert who helps Indian buyers pick compatible, budget-appropriate components. Prices and part availability change often, so recommend component TIERS and categories accurately rather than claiming exact current prices are guaranteed. Always respond with valid JSON only, no markdown, no text outside the JSON.",
          userPrompt: prompt,
        }),
      });
      const data = await res.json();
      const text = data.text || "";
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        setBuild(JSON.parse(jsonMatch[0]));
      } else {
        throw new Error("Invalid response");
      }
    } catch {
      setError("Could not generate a build right now — please try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolPageWrapper badge="🖥️ Gaming & Tech">
      <main className="px-6 py-12 pb-24 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">PC Build Compatibility Checker</h1>
            <p className="text-gray-400">Get an AI-suggested, compatible PC build for your budget and use case — free, instant.</p>
          </div>

          {!build && (
            <div className="bg-black/40 backdrop-blur-sm border border-zinc-700/60 rounded-3xl p-8 space-y-6">
              <div>
                <label className="block text-gray-300 font-medium mb-2">Budget (₹)</label>
                <input type="number" value={budget} onChange={e => setBudget(e.target.value)}
                  className="w-full bg-black/80 border border-zinc-700 rounded-2xl px-5 py-4 text-white text-lg outline-none focus:border-cyan-400 transition" />
              </div>
              <div>
                <label className="block text-gray-300 font-medium mb-3">Primary Use</label>
                <div className="grid grid-cols-2 gap-2">
                  {USE_CASES.map(u => (
                    <button key={u} onClick={() => setUseCase(u)}
                      className={`py-3 rounded-xl text-sm font-medium border transition ${useCase === u ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400" : "bg-zinc-800 border-zinc-700 text-gray-400"}`}>
                      {u}
                    </button>
                  ))}
                </div>
              </div>

              {error && <p className="text-red-400 text-sm">⚠️ {error}</p>}

              <button onClick={generate} disabled={loading || !budget}
                className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-black py-4 rounded-2xl font-bold text-lg transition">
                {loading ? "🔧 Building your setup..." : "🔧 Suggest a Build"}
              </button>
              <p className="text-xs text-gray-600 text-center">Prices/parts change fast — treat this as a starting point, always verify current prices before buying.</p>
            </div>
          )}

          {build && (
            <div className="space-y-5">
              <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl p-6">
                <p className="text-gray-200">{build.summary}</p>
              </div>

              <div className="space-y-3">
                {build.components.map((c) => (
                  <div key={c.part} className="bg-black/40 border border-zinc-700/60 rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-cyan-400 font-bold text-sm uppercase tracking-wide">{c.part}</span>
                    </div>
                    <p className="text-white font-medium mb-1">{c.suggestion}</p>
                    <p className="text-gray-500 text-sm">{c.reason}</p>
                  </div>
                ))}
              </div>

              {build.notes?.length > 0 && (
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-5">
                  <p className="text-yellow-400 font-bold mb-2 text-sm">⚠️ Compatibility Notes</p>
                  <ul className="space-y-1">
                    {build.notes.map((n, i) => <li key={i} className="text-gray-300 text-sm">• {n}</li>)}
                  </ul>
                </div>
              )}

              <button onClick={() => setBuild(null)}
                className="w-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-gray-300 py-3 rounded-xl transition font-semibold">
                Try Another Budget
              </button>
            </div>
          )}
        </div>
      </main>
    </ToolPageWrapper>
  );
}
