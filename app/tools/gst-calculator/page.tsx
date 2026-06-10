"use client";
import { useState } from "react";
import ToolPageWrapper from "@/components/ToolPageWrapper";

const GST_RATES = [3, 5, 12, 18, 28];

export default function GSTCalculatorPage() {
  const [amount, setAmount]   = useState("");
  const [rate, setRate]       = useState(18);
  const [mode, setMode]       = useState<"exclusive"|"inclusive">("exclusive");

  const num = parseFloat(amount) || 0;

  const calc = () => {
    if (!num) return null;
    if (mode === "exclusive") {
      const gst = (num * rate) / 100;
      const cgst = gst / 2, sgst = gst / 2;
      return { base: num, gst, cgst, sgst, total: num + gst };
    } else {
      const base = (num * 100) / (100 + rate);
      const gst = num - base;
      return { base, gst, cgst: gst/2, sgst: gst/2, total: num };
    }
  };

  const r = calc();
  const fmt = (n: number) => `₹${n.toLocaleString("en-IN", {minimumFractionDigits:2,maximumFractionDigits:2})}`;

  return (
    <ToolPageWrapper badge="Finance Tool">
      <main className="px-6 py-12 pb-24">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-5xl font-bold mb-4">GST Calculator</h1>
            <p className="text-gray-400">Calculate GST inclusive/exclusive for any tax slab — India</p>
          </div>

          <div className="bg-black/40 backdrop-blur-sm border border-zinc-700/60 rounded-3xl p-8 space-y-6">
            {/* Mode */}
            <div className="grid grid-cols-2 gap-3">
              {(["exclusive","inclusive"] as const).map(m=>(
                <button key={m} onClick={()=>setMode(m)}
                  className={`py-3 rounded-xl font-medium border transition ${mode===m?"bg-cyan-500/20 border-cyan-500/50 text-cyan-400":"bg-zinc-800 border-zinc-700 text-gray-400"}`}>
                  {m==="exclusive"?"Add GST to price":"Remove GST from price"}
                </button>
              ))}
            </div>

            <div>
              <label className="block text-gray-300 font-medium mb-2">
                {mode==="exclusive"?"Price (Before GST) ₹":"Price (Including GST) ₹"}
              </label>
              <input type="number" placeholder="Enter amount" value={amount} onChange={e=>setAmount(e.target.value)}
                className="w-full bg-black/80 border border-zinc-700 rounded-2xl px-5 py-4 text-white text-xl outline-none focus:border-cyan-400 transition"/>
            </div>

            {/* GST Rate */}
            <div>
              <label className="block text-gray-300 font-medium mb-3">GST Rate</label>
              <div className="flex flex-wrap gap-2">
                {GST_RATES.map(r=>(
                  <button key={r} onClick={()=>setRate(r)}
                    className={`px-5 py-2.5 rounded-xl font-bold border transition ${rate===r?"bg-cyan-500 text-black border-cyan-500":"bg-zinc-800 border-zinc-700 text-gray-300 hover:border-cyan-500/40"}`}>
                    {r}%
                  </button>
                ))}
              </div>
            </div>

            {/* Result */}
            {r && (
              <div className="space-y-3">
                <div className="bg-gradient-to-br from-cyan-500/15 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-6">
                  <div className="grid grid-cols-2 gap-4 text-center mb-4">
                    <div><p className="text-gray-400 text-sm mb-1">Base Amount</p><p className="text-2xl font-bold text-white">{fmt(r.base)}</p></div>
                    <div><p className="text-gray-400 text-sm mb-1">Total GST ({rate}%)</p><p className="text-2xl font-bold text-yellow-400">{fmt(r.gst)}</p></div>
                  </div>
                  <div className="border-t border-cyan-500/20 pt-4 text-center">
                    <p className="text-gray-400 text-sm mb-1">{mode==="exclusive"?"Total Amount Payable":"Base Price (without GST)"}</p>
                    <p className="text-4xl font-bold text-cyan-400">{fmt(mode==="exclusive"?r.total:r.base)}</p>
                  </div>
                </div>

                {/* GST Breakdown */}
                <div className="bg-black/40 border border-zinc-800 rounded-xl p-4 space-y-2 text-sm">
                  <p className="text-gray-400 font-medium mb-3">GST Breakdown</p>
                  {[
                    {label:`CGST (${rate/2}%)`,value:r.cgst},
                    {label:`SGST (${rate/2}%)`,value:r.sgst},
                    {label:"Total GST",value:r.gst,bold:true},
                  ].map(({label,value,bold})=>(
                    <div key={label} className={`flex justify-between ${bold?"border-t border-zinc-700 pt-2 font-semibold":""}`}>
                      <span className="text-gray-400">{label}</span>
                      <span className={bold?"text-cyan-400":"text-white"}>{fmt(value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5">
            <h2 className="text-cyan-400 font-semibold mb-3">📋 GST Slabs in India</h2>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
              {[["3%","Gold, silver jewellery"],["5%","Essential goods, transport"],["12%","Computers, mobiles, processed food"],["18%","Most services, electronics"],["28%","Luxury goods, tobacco, AC"]].map(([r,d])=>(
                <div key={r} className="bg-black/30 rounded-lg p-2"><span className="text-cyan-400 font-bold">{r}</span> — {d}</div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </ToolPageWrapper>
  );
}
