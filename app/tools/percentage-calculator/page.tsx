"use client";
import { useState } from "react";
import ToolPageWrapper from "@/components/ToolPageWrapper";

type Mode = "percent_of" | "what_percent" | "percent_change" | "marks" | "discount";

export default function PercentageCalculatorPage() {
  const [mode, setMode] = useState<Mode>("percent_of");
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");

  const calc = () => {
    const na = parseFloat(a), nb = parseFloat(b), nc = parseFloat(c);
    if (mode === "percent_of")     return isNaN(na)||isNaN(nb) ? null : { result: (na/100)*nb, label: `${na}% of ${nb}` };
    if (mode === "what_percent")   return isNaN(na)||isNaN(nb) ? null : { result: (na/nb)*100, label: `${na} is what % of ${nb}` };
    if (mode === "percent_change") return isNaN(na)||isNaN(nb) ? null : { result: ((nb-na)/na)*100, label: nb>=na?"Increase":"Decrease", extra: nb>=na?"📈":"📉" };
    if (mode === "marks")          return isNaN(na)||isNaN(nb) ? null : { result: (na/nb)*100, label: `${na} out of ${nb}` };
    if (mode === "discount")       return isNaN(na)||isNaN(nb) ? null : { result: na - (na*(nb/100)), label: `Price after ${nb}% off`, extra: `You save: ₹${((na*nb)/100).toFixed(2)}` };
    return null;
  };

  const result = calc();

  const modes = [
    { id: "percent_of",     label: "X% of Y",       desc: "10% of 500 = 50" },
    { id: "what_percent",   label: "X is ?% of Y",  desc: "50 is ?% of 200" },
    { id: "percent_change", label: "% Change",       desc: "100 → 150 = +50%" },
    { id: "marks",          label: "Marks %",        desc: "45 out of 60" },
    { id: "discount",       label: "Discount",       desc: "₹500 at 20% off" },
  ] as const;

  return (
    <ToolPageWrapper badge="Study Tool">
      <main className="px-6 py-12 pb-24">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-5xl font-bold mb-4">Percentage Calculator</h1>
            <p className="text-gray-400">Calculate percentage, marks, discounts and percentage change instantly</p>
          </div>

          {/* Mode selector */}
          <div className="flex flex-wrap gap-2 mb-6">
            {modes.map((m) => (
              <button key={m.id} onClick={() => { setMode(m.id); setA(""); setB(""); setC(""); }}
                className={`px-4 py-2 rounded-xl text-sm font-medium border transition ${
                  mode === m.id ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400" : "bg-zinc-900 border-zinc-700 text-gray-400 hover:border-cyan-500/30"}`}>
                {m.label}
              </button>
            ))}
          </div>

          <div className="bg-black/40 backdrop-blur-sm border border-zinc-700/60 rounded-3xl p-8 space-y-5">
            {mode === "percent_of" && (<>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-gray-300 text-sm mb-2">Percentage (%)</label>
                  <input type="number" placeholder="e.g. 10" value={a} onChange={e=>setA(e.target.value)}
                    className="w-full bg-black/80 border border-zinc-700 rounded-2xl px-5 py-4 text-white outline-none focus:border-cyan-400 transition"/></div>
                <div><label className="block text-gray-300 text-sm mb-2">Of Number</label>
                  <input type="number" placeholder="e.g. 500" value={b} onChange={e=>setB(e.target.value)}
                    className="w-full bg-black/80 border border-zinc-700 rounded-2xl px-5 py-4 text-white outline-none focus:border-cyan-400 transition"/></div>
              </div>
            </>)}

            {mode === "what_percent" && (<>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-gray-300 text-sm mb-2">Number (X)</label>
                  <input type="number" placeholder="e.g. 50" value={a} onChange={e=>setA(e.target.value)}
                    className="w-full bg-black/80 border border-zinc-700 rounded-2xl px-5 py-4 text-white outline-none focus:border-cyan-400 transition"/></div>
                <div><label className="block text-gray-300 text-sm mb-2">Total (Y)</label>
                  <input type="number" placeholder="e.g. 200" value={b} onChange={e=>setB(e.target.value)}
                    className="w-full bg-black/80 border border-zinc-700 rounded-2xl px-5 py-4 text-white outline-none focus:border-cyan-400 transition"/></div>
              </div>
            </>)}

            {mode === "percent_change" && (<>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-gray-300 text-sm mb-2">Original Value</label>
                  <input type="number" placeholder="e.g. 100" value={a} onChange={e=>setA(e.target.value)}
                    className="w-full bg-black/80 border border-zinc-700 rounded-2xl px-5 py-4 text-white outline-none focus:border-cyan-400 transition"/></div>
                <div><label className="block text-gray-300 text-sm mb-2">New Value</label>
                  <input type="number" placeholder="e.g. 150" value={b} onChange={e=>setB(e.target.value)}
                    className="w-full bg-black/80 border border-zinc-700 rounded-2xl px-5 py-4 text-white outline-none focus:border-cyan-400 transition"/></div>
              </div>
            </>)}

            {mode === "marks" && (<>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-gray-300 text-sm mb-2">Marks Obtained</label>
                  <input type="number" placeholder="e.g. 450" value={a} onChange={e=>setA(e.target.value)}
                    className="w-full bg-black/80 border border-zinc-700 rounded-2xl px-5 py-4 text-white outline-none focus:border-cyan-400 transition"/></div>
                <div><label className="block text-gray-300 text-sm mb-2">Total Marks</label>
                  <input type="number" placeholder="e.g. 500" value={b} onChange={e=>setB(e.target.value)}
                    className="w-full bg-black/80 border border-zinc-700 rounded-2xl px-5 py-4 text-white outline-none focus:border-cyan-400 transition"/></div>
              </div>
            </>)}

            {mode === "discount" && (<>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-gray-300 text-sm mb-2">Original Price (₹)</label>
                  <input type="number" placeholder="e.g. 999" value={a} onChange={e=>setA(e.target.value)}
                    className="w-full bg-black/80 border border-zinc-700 rounded-2xl px-5 py-4 text-white outline-none focus:border-cyan-400 transition"/></div>
                <div><label className="block text-gray-300 text-sm mb-2">Discount (%)</label>
                  <input type="number" placeholder="e.g. 20" value={b} onChange={e=>setB(e.target.value)}
                    className="w-full bg-black/80 border border-zinc-700 rounded-2xl px-5 py-4 text-white outline-none focus:border-cyan-400 transition"/></div>
              </div>
            </>)}

            {/* Result */}
            {result && (
              <div className="bg-gradient-to-br from-cyan-500/15 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-6 text-center">
                <p className="text-gray-400 text-sm mb-2">{result.label}</p>
                <p className="text-5xl font-bold text-cyan-400">
                  {mode === "discount" ? `₹${parseFloat(result.result.toFixed(2)).toLocaleString("en-IN")}` :
                   mode === "percent_change" || mode === "what_percent" || mode === "marks"
                   ? `${parseFloat(result.result.toFixed(2))}%` :
                   parseFloat(result.result.toFixed(4)).toLocaleString("en-IN")}
                  {"extra" in result && result.extra ? ` ${result.extra}` : ""}
                </p>
                {"extra" in result && result.extra && mode === "discount" && (
                  <p className="text-green-400 mt-2 font-semibold">{result.extra}</p>
                )}
                {mode === "marks" && (
                  <p className="text-gray-400 mt-3 text-sm">
                    Grade: {result.result >= 90 ? "🏆 A+" : result.result >= 75 ? "⭐ A" : result.result >= 60 ? "✅ B" : result.result >= 45 ? "📘 C" : "❌ Fail"}
                  </p>
                )}
              </div>
            )}

            {/* Quick examples */}
            <div className="bg-black/30 border border-zinc-800 rounded-xl p-4">
              <p className="text-xs text-gray-500 mb-2">Quick example:</p>
              <p className="text-cyan-400 text-sm font-mono">{modes.find(m=>m.id===mode)?.desc}</p>
            </div>
          </div>
        </div>
      </main>
    </ToolPageWrapper>
  );
}
