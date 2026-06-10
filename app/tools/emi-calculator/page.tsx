"use client";
import { useState } from "react";
import ToolPageWrapper from "@/components/ToolPageWrapper";

export default function EMICalculatorPage() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate]           = useState("");
  const [tenure, setTenure]       = useState("");
  const [tenureType, setTenureType] = useState<"years"|"months">("years");

  const calc = () => {
    const P = parseFloat(principal), r = parseFloat(rate), t = parseFloat(tenure);
    if (!P || !r || !t) return null;
    const months = tenureType === "years" ? t * 12 : t;
    const monthlyRate = r / 12 / 100;
    const emi = P * monthlyRate * Math.pow(1+monthlyRate, months) / (Math.pow(1+monthlyRate, months) - 1);
    const totalPayment = emi * months;
    const totalInterest = totalPayment - P;

    // Amortization (first 6 months)
    const schedule: {month:number;emi:number;principal:number;interest:number;balance:number}[] = [];
    let balance = P;
    for (let m = 1; m <= Math.min(months, 12); m++) {
      const int = balance * monthlyRate;
      const prin = emi - int;
      balance -= prin;
      schedule.push({month:m, emi, principal:prin, interest:int, balance:Math.max(0,balance)});
    }

    return { emi, totalPayment, totalInterest, months, schedule };
  };

  const r = calc();
  const fmt = (n:number) => `₹${Math.round(n).toLocaleString("en-IN")}`;
  const pct = r ? Math.round((r.totalInterest/r.totalPayment)*100) : 0;

  const presets = [
    { label: "Home Loan",     amount: "5000000", rate: "8.5",  tenure: "20", type: "years" as const },
    { label: "Car Loan",      amount: "800000",  rate: "9.5",  tenure: "5",  type: "years" as const },
    { label: "Personal Loan", amount: "200000",  rate: "14",   tenure: "3",  type: "years" as const },
    { label: "Education Loan",amount: "1500000", rate: "10.5", tenure: "10", type: "years" as const },
  ];

  return (
    <ToolPageWrapper badge="Finance Tool">
      <main className="px-6 py-12 pb-24">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-5xl font-bold mb-4">EMI Calculator</h1>
            <p className="text-gray-400">Calculate monthly EMI for home, car or personal loans with full breakdown</p>
          </div>

          {/* Presets */}
          <div className="flex flex-wrap gap-2 mb-5">
            {presets.map(p=>(
              <button key={p.label} onClick={()=>{setPrincipal(p.amount);setRate(p.rate);setTenure(p.tenure);setTenureType(p.type)}}
                className="px-4 py-2 bg-zinc-900 border border-zinc-700 hover:border-cyan-400 text-gray-400 hover:text-cyan-400 rounded-xl text-sm transition">
                {p.label}
              </button>
            ))}
          </div>

          <div className="bg-black/40 backdrop-blur-sm border border-zinc-700/60 rounded-3xl p-8 space-y-5">
            <div>
              <label className="block text-gray-300 font-medium mb-2">Loan Amount (₹)</label>
              <input type="number" placeholder="e.g. 1000000" value={principal} onChange={e=>setPrincipal(e.target.value)}
                className="w-full bg-black/80 border border-zinc-700 rounded-2xl px-5 py-4 text-white outline-none focus:border-cyan-400 transition"/>
            </div>
            <div>
              <label className="block text-gray-300 font-medium mb-2">Interest Rate (% per annum)</label>
              <input type="number" step="0.1" placeholder="e.g. 8.5" value={rate} onChange={e=>setRate(e.target.value)}
                className="w-full bg-black/80 border border-zinc-700 rounded-2xl px-5 py-4 text-white outline-none focus:border-cyan-400 transition"/>
            </div>
            <div>
              <label className="block text-gray-300 font-medium mb-2">Loan Tenure</label>
              <div className="flex gap-3">
                <input type="number" placeholder="e.g. 5" value={tenure} onChange={e=>setTenure(e.target.value)}
                  className="flex-1 bg-black/80 border border-zinc-700 rounded-2xl px-5 py-4 text-white outline-none focus:border-cyan-400 transition"/>
                <div className="flex border border-zinc-700 rounded-2xl overflow-hidden">
                  {(["years","months"] as const).map(t=>(
                    <button key={t} onClick={()=>setTenureType(t)}
                      className={`px-5 py-2 font-medium transition ${tenureType===t?"bg-cyan-500 text-black":"bg-zinc-800 text-gray-400"}`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {r && (
              <div className="space-y-4 pt-2">
                {/* Main result */}
                <div className="bg-gradient-to-br from-cyan-500/15 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-6 text-center">
                  <p className="text-gray-400 text-sm mb-1">Monthly EMI</p>
                  <p className="text-5xl font-bold text-cyan-400">{fmt(r.emi)}</p>
                  <p className="text-gray-500 text-sm mt-2">for {r.months} months</p>
                </div>

                {/* Breakdown */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    {label:"Principal Amount",value:fmt(parseFloat(principal)),color:"text-white"},
                    {label:"Total Interest",value:fmt(r.totalInterest),color:"text-yellow-400"},
                    {label:"Total Payment",value:fmt(r.totalPayment),color:"text-cyan-400"},
                    {label:"Interest %",value:`${pct}% of total`,color:"text-orange-400"},
                  ].map(({label,value,color})=>(
                    <div key={label} className="bg-black/40 border border-zinc-800 rounded-xl p-4 text-center">
                      <p className="text-xs text-gray-500 mb-1">{label}</p>
                      <p className={`font-bold ${color}`}>{value}</p>
                    </div>
                  ))}
                </div>

                {/* Amortization */}
                <div className="bg-black/40 border border-zinc-800 rounded-xl overflow-hidden">
                  <p className="text-gray-400 text-sm font-medium px-4 py-3 border-b border-zinc-800">First 12 months breakdown</p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead><tr className="text-gray-500 border-b border-zinc-800">
                        {["Month","EMI","Principal","Interest","Balance"].map(h=><th key={h} className="px-3 py-2 text-left">{h}</th>)}
                      </tr></thead>
                      <tbody>
                        {r.schedule.map(row=>(
                          <tr key={row.month} className="border-b border-zinc-900 hover:bg-zinc-900/50">
                            <td className="px-3 py-2 text-gray-400">{row.month}</td>
                            <td className="px-3 py-2 text-white">{fmt(row.emi)}</td>
                            <td className="px-3 py-2 text-green-400">{fmt(row.principal)}</td>
                            <td className="px-3 py-2 text-yellow-400">{fmt(row.interest)}</td>
                            <td className="px-3 py-2 text-gray-300">{fmt(row.balance)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </ToolPageWrapper>
  );
}
