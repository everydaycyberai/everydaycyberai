"use client";
import { useState } from "react";
import ToolPageWrapper from "@/components/ToolPageWrapper";

export default function SalaryCalculatorPage() {
  const [ctc, setCtc]         = useState("");
  const [regime, setRegime]   = useState<"old"|"new">("new");

  const calc = () => {
    const annual = parseFloat(ctc);
    if (!annual || annual <= 0) return null;

    // Standard deductions
    const pf = Math.min(annual * 0.12, 21600); // 12% basic (assumed 50% of CTC), max 1800/month
    const gratuity = annual * 0.0481;
    const grossSalary = annual - pf - gratuity;

    // Tax calculation (FY 2024-25)
    const taxableIncome = regime === "old" ? Math.max(0, grossSalary - 50000 - 150000) : grossSalary; // std deduction 50k + 80C 1.5L for old
    let tax = 0;

    if (regime === "new") {
      // New regime slabs 2024-25
      if (taxableIncome > 1500000)      tax = 150000 + (taxableIncome-1500000)*0.30;
      else if (taxableIncome > 1200000) tax = 90000  + (taxableIncome-1200000)*0.20;
      else if (taxableIncome > 900000)  tax = 45000  + (taxableIncome-900000)*0.15;
      else if (taxableIncome > 600000)  tax = 15000  + (taxableIncome-600000)*0.10;
      else if (taxableIncome > 300000)  tax = (taxableIncome-300000)*0.05;
      if (taxableIncome <= 700000) tax = 0; // rebate u/s 87A
    } else {
      // Old regime slabs
      if (taxableIncome > 1000000)      tax = 112500 + (taxableIncome-1000000)*0.30;
      else if (taxableIncome > 500000)  tax = 12500  + (taxableIncome-500000)*0.20;
      else if (taxableIncome > 250000)  tax = (taxableIncome-250000)*0.05;
      if (taxableIncome <= 500000) tax = 0; // rebate u/s 87A
    }

    const cess = tax * 0.04;
    const totalTax = tax + cess;
    const professionalTax = 2400; // approx

    const inHandAnnual = grossSalary - totalTax - pf - professionalTax;
    const inHandMonthly = inHandAnnual / 12;
    const monthlyCtc = annual / 12;

    return {
      annual, monthlyCtc, grossSalary, pf, gratuity,
      taxableIncome, tax, cess, totalTax, professionalTax,
      inHandAnnual, inHandMonthly,
      effectiveTaxRate: (totalTax/annual)*100
    };
  };

  const r = calc();
  const fmt = (n:number) => `₹${Math.round(n).toLocaleString("en-IN")}`;

  return (
    <ToolPageWrapper badge="Finance Tool">
      <main className="px-6 py-12 pb-24">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-5xl font-bold mb-4">Salary Calculator</h1>
            <p className="text-gray-400">Calculate in-hand salary from CTC with PF, tax and deductions — India FY 2024-25</p>
          </div>

          <div className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-3xl p-8 space-y-6">
            <div>
              <label className="block text-gray-300 font-medium mb-2">Annual CTC (₹)</label>
              <input type="number" placeholder="e.g. 1200000" value={ctc} onChange={e=>setCtc(e.target.value)}
                className="w-full bg-black/80 border border-zinc-700 rounded-2xl px-5 py-4 text-white text-xl outline-none focus:border-cyan-400 transition"/>
              <p className="text-gray-600 text-xs mt-2">Enter your total Cost to Company per year</p>
            </div>

            <div>
              <label className="block text-gray-300 font-medium mb-3">Tax Regime</label>
              <div className="grid grid-cols-2 gap-3">
                {(["new","old"] as const).map(reg=>(
                  <button key={reg} onClick={()=>setRegime(reg)}
                    className={`py-3 rounded-xl font-medium border transition text-sm ${regime===reg?"bg-cyan-500/20 border-cyan-500/50 text-cyan-400":"bg-zinc-800 border-zinc-700 text-gray-400"}`}>
                    {reg==="new"?"New Regime (2024-25)":"Old Regime"}
                  </button>
                ))}
              </div>
              <p className="text-gray-600 text-xs mt-2">
                {regime==="new"?"Lower tax slabs, no deductions":"Higher slabs but 80C, HRA, LTA deductions allowed"}
              </p>
            </div>

            {r && (
              <div className="space-y-4">
                {/* Main result */}
                <div className="bg-gradient-to-br from-cyan-500/15 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-6">
                  <div className="grid grid-cols-2 gap-4 text-center mb-4">
                    <div><p className="text-gray-400 text-xs mb-1">Monthly In-Hand</p><p className="text-3xl font-bold text-cyan-400">{fmt(r.inHandMonthly)}</p></div>
                    <div><p className="text-gray-400 text-xs mb-1">Annual In-Hand</p><p className="text-3xl font-bold text-green-400">{fmt(r.inHandAnnual)}</p></div>
                  </div>
                  <div className="text-center border-t border-cyan-500/20 pt-3">
                    <p className="text-gray-500 text-xs">Effective Tax Rate: <span className="text-yellow-400 font-semibold">{r.effectiveTaxRate.toFixed(1)}%</span></p>
                  </div>
                </div>

                {/* Deductions table */}
                <div className="bg-black/40 border border-zinc-800 rounded-xl divide-y divide-zinc-800 text-sm">
                  {[
                    {label:"Gross CTC",value:fmt(r.annual),color:"text-white"},
                    {label:"Provident Fund (PF)",value:`- ${fmt(r.pf)}`,color:"text-red-400"},
                    {label:"Gratuity",value:`- ${fmt(r.gratuity)}`,color:"text-red-400"},
                    {label:"Gross Salary",value:fmt(r.grossSalary),color:"text-white",bold:true},
                    {label:`Income Tax (${regime==="new"?"New":"Old"} Regime)`,value:`- ${fmt(r.totalTax)}`,color:"text-red-400"},
                    {label:"Professional Tax",value:`- ${fmt(r.professionalTax)}`,color:"text-red-400"},
                    {label:"Annual In-Hand",value:fmt(r.inHandAnnual),color:"text-green-400",bold:true},
                    {label:"Monthly In-Hand",value:fmt(r.inHandMonthly),color:"text-cyan-400",bold:true},
                  ].map(({label,value,color,bold})=>(
                    <div key={label} className={`flex justify-between px-4 py-3 ${bold?"bg-zinc-900/50":""}`}>
                      <span className={bold?"text-gray-300 font-semibold":"text-gray-400"}>{label}</span>
                      <span className={`font-semibold ${color}`}>{value}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-600 text-center">* Approximate calculation. Actual may vary based on exact salary structure, allowances and investments.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </ToolPageWrapper>
  );
}
