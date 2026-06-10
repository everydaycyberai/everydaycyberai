"use client";
import { useState } from "react";
import ToolPageWrapper from "@/components/ToolPageWrapper";

export default function SIPCalculatorPage() {
  const [monthly, setMonthly]   = useState("");
  const [rate, setRate]         = useState("");
  const [years, setYears]       = useState("");
  const [mode, setMode]         = useState<"sip"|"lumpsum">("sip");
  const [lumpsum, setLumpsum]   = useState("");

  const calcSIP = () => {
    const P = parseFloat(monthly), r = parseFloat(rate)/100/12, n = parseFloat(years)*12;
    if (!P||!r||!n) return null;
    const maturity = P * ((Math.pow(1+r,n)-1)/r) * (1+r);
    const invested = P * n;
    return { maturity, invested, returns: maturity - invested };
  };

  const calcLumpsum = () => {
    const P = parseFloat(lumpsum), r = parseFloat(rate)/100, n = parseFloat(years);
    if (!P||!r||!n) return null;
    const maturity = P * Math.pow(1+r, n);
    return { maturity, invested: P, returns: maturity - P };
  };

  const r = mode === "sip" ? calcSIP() : calcLumpsum();
  const fmt = (n:number) => `₹${Math.round(n).toLocaleString("en-IN")}`;
  const invested = r?.invested || 0;
  const maturity = r?.maturity || 0;
  const gainPct = invested ? ((maturity-invested)/invested*100).toFixed(1) : 0;

  // Yearly breakdown for chart-like display
  const yearlyData = () => {
    const yrs = parseFloat(years);
    const rt = parseFloat(rate);
    if (!yrs || !rt) return [];
    return Array.from({length:Math.min(yrs,10)},(_,i)=>{
      const n = i+1;
      if (mode==="sip") {
        const P=parseFloat(monthly),r=rt/100/12,months=n*12;
        if(!P||!r) return null;
        const m=P*((Math.pow(1+r,months)-1)/r)*(1+r);
        return {year:n,invested:P*months,maturity:m};
      } else {
        const P=parseFloat(lumpsum),r=rt/100;
        if(!P||!r) return null;
        return {year:n,invested:P,maturity:P*Math.pow(1+r,n)};
      }
    }).filter(Boolean) as {year:number;invested:number;maturity:number}[];
  };

  const data = yearlyData();

  return (
    <ToolPageWrapper badge="Finance Tool">
      <main className="px-6 py-12 pb-24">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-5xl font-bold mb-4">SIP Calculator</h1>
            <p className="text-gray-400">Calculate SIP and lumpsum mutual fund returns with yearly breakdown</p>
          </div>

          <div className="bg-black/40 backdrop-blur-sm border border-zinc-700/60 rounded-3xl p-8 space-y-5">
            {/* Mode */}
            <div className="grid grid-cols-2 gap-3">
              {(["sip","lumpsum"] as const).map(m=>(
                <button key={m} onClick={()=>setMode(m)}
                  className={`py-3 rounded-xl font-medium border transition ${mode===m?"bg-cyan-500/20 border-cyan-500/50 text-cyan-400":"bg-zinc-800 border-zinc-700 text-gray-400"}`}>
                  {m==="sip"?"SIP (Monthly)":"Lump Sum"}
                </button>
              ))}
            </div>

            {mode==="sip" ? (
              <div>
                <label className="block text-gray-300 font-medium mb-2">Monthly Investment (₹)</label>
                <input type="number" placeholder="e.g. 5000" value={monthly} onChange={e=>setMonthly(e.target.value)}
                  className="w-full bg-black/80 border border-zinc-700 rounded-2xl px-5 py-4 text-white outline-none focus:border-cyan-400 transition"/>
              </div>
            ) : (
              <div>
                <label className="block text-gray-300 font-medium mb-2">Lump Sum Amount (₹)</label>
                <input type="number" placeholder="e.g. 100000" value={lumpsum} onChange={e=>setLumpsum(e.target.value)}
                  className="w-full bg-black/80 border border-zinc-700 rounded-2xl px-5 py-4 text-white outline-none focus:border-cyan-400 transition"/>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 font-medium mb-2">Expected Return (% p.a.)</label>
                <input type="number" step="0.5" placeholder="e.g. 12" value={rate} onChange={e=>setRate(e.target.value)}
                  className="w-full bg-black/80 border border-zinc-700 rounded-2xl px-5 py-4 text-white outline-none focus:border-cyan-400 transition"/>
              </div>
              <div>
                <label className="block text-gray-300 font-medium mb-2">Time Period (Years)</label>
                <input type="number" placeholder="e.g. 10" value={years} onChange={e=>setYears(e.target.value)}
                  className="w-full bg-black/80 border border-zinc-700 rounded-2xl px-5 py-4 text-white outline-none focus:border-cyan-400 transition"/>
              </div>
            </div>

            {/* Quick rate presets */}
            <div className="flex gap-2 flex-wrap">
              {[["Conservative","8"],["Moderate","12"],["Aggressive","15"],["Nifty50 avg","14"]].map(([label,val])=>(
                <button key={label} onClick={()=>setRate(val)}
                  className="text-xs px-3 py-1.5 bg-zinc-800 border border-zinc-700 hover:border-cyan-500/40 text-gray-400 hover:text-cyan-400 rounded-lg transition">
                  {label} ({val}%)
                </button>
              ))}
            </div>

            {r && (
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-cyan-500/15 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-6">
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div><p className="text-gray-400 text-xs mb-1">Invested</p><p className="text-xl font-bold text-white">{fmt(r.invested)}</p></div>
                    <div><p className="text-gray-400 text-xs mb-1">Returns</p><p className="text-xl font-bold text-green-400">{fmt(r.returns)}</p></div>
                    <div><p className="text-gray-400 text-xs mb-1">Maturity Value</p><p className="text-xl font-bold text-cyan-400">{fmt(r.maturity)}</p></div>
                  </div>
                  <div className="text-center mt-3 border-t border-cyan-500/20 pt-3">
                    <p className="text-gray-400 text-sm">Total Gain: <span className="text-green-400 font-bold text-xl">{gainPct}%</span></p>
                  </div>
                </div>

                {/* Yearly growth */}
                {data.length > 0 && (
                  <div className="bg-black/40 border border-zinc-800 rounded-xl overflow-hidden">
                    <p className="text-gray-400 text-sm font-medium px-4 py-3 border-b border-zinc-800">Yearly Growth</p>
                    <div className="space-y-1 p-3">
                      {data.map(({year,invested:inv,maturity:mat})=>{
                        const maxMat = data[data.length-1].maturity;
                        const barW = Math.round((mat/maxMat)*100);
                        return (
                          <div key={year} className="flex items-center gap-3">
                            <span className="text-gray-500 text-xs w-12 shrink-0">Yr {year}</span>
                            <div className="flex-1 h-5 bg-zinc-900 rounded overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-cyan-500/40 to-cyan-500/80 rounded transition-all" style={{width:`${barW}%`}}/>
                            </div>
                            <span className="text-cyan-400 text-xs font-mono w-24 text-right shrink-0">{fmt(mat)}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="mt-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5 text-xs text-gray-500">
            * SIP returns are subject to market risk. Past performance does not guarantee future results. This is for informational purposes only, not financial advice.
          </div>
        </div>
      </main>
    </ToolPageWrapper>
  );
}
