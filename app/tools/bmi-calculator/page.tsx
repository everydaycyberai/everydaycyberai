"use client";
import { useState } from "react";
import ToolPageWrapper from "@/components/ToolPageWrapper";

export default function BMICalculatorPage() {
  const [unit, setUnit]     = useState<"metric"|"imperial">("metric");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [feet, setFeet]     = useState("");
  const [inches, setInches] = useState("");
  const [age, setAge]       = useState("");
  const [gender, setGender] = useState<"male"|"female">("male");

  const calcBMI = () => {
    const w = parseFloat(weight);
    let h = 0;
    if (unit==="metric") { h = parseFloat(height)/100; }
    else { h = (parseFloat(feet||"0")*30.48 + parseFloat(inches||"0")*2.54)/100; }
    if (!w||!h||h<=0) return null;
    const bmi = w/(h*h);
    let category = "", color = "", advice = "", range = "";
    if      (bmi<18.5) { category="Underweight"; color="text-blue-400";   range="<18.5";  advice="You may need to gain weight. Eat nutritious foods and consult a doctor."; }
    else if (bmi<25)   { category="Normal";      color="text-green-400";  range="18.5-24.9"; advice="Great! You have a healthy weight. Maintain it with balanced diet and exercise."; }
    else if (bmi<30)   { category="Overweight";  color="text-yellow-400"; range="25-29.9"; advice="Consider losing some weight through diet and regular exercise."; }
    else if (bmi<35)   { category="Obese I";     color="text-orange-400"; range="30-34.9"; advice="Health risk is increased. Please consult a doctor and start a weight loss program."; }
    else               { category="Obese II";    color="text-red-400";    range="35+";    advice="High health risk. Please consult a doctor immediately for a proper plan."; }
    const idealMin = Math.round(18.5*(h*h)*10)/10;
    const idealMax = Math.round(24.9*(h*h)*10)/10;
    return { bmi: Math.round(bmi*10)/10, category, color, advice, range, idealMin, idealMax };
  };

  const r = calcBMI();
  const pct = r ? Math.min(100, Math.max(0, ((r.bmi-10)/30)*100)) : 0;

  return (
    <ToolPageWrapper badge="Health Tool">
      <main className="px-6 py-12 pb-24 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-5xl font-bold mb-4">BMI Calculator</h1>
            <p className="text-gray-400">Free BMI calculator India — calculate Body Mass Index and know your healthy weight range</p>
          </div>

          <div className="bg-black/40 backdrop-blur-sm border border-zinc-700/60 rounded-3xl p-8 space-y-5">

            {/* Unit toggle */}
            <div className="grid grid-cols-2 gap-3">
              {(["metric","imperial"] as const).map(u=>(
                <button key={u} onClick={()=>setUnit(u)}
                  className={`py-3 rounded-xl font-medium border transition capitalize ${unit===u?"bg-cyan-500/20 border-cyan-500/50 text-cyan-400":"bg-zinc-800 border-zinc-700 text-gray-400"}`}>
                  {u==="metric"?"Metric (kg/cm)":"Imperial (lb/ft)"}
                </button>
              ))}
            </div>

            {/* Weight */}
            <div>
              <label className="block text-gray-300 font-medium mb-2">Weight ({unit==="metric"?"kg":"lbs"})</label>
              <input type="number" placeholder={unit==="metric"?"e.g. 65":"e.g. 143"} value={weight} onChange={e=>setWeight(e.target.value)}
                className="w-full bg-black/60 border border-zinc-700/60 rounded-2xl px-5 py-4 text-white outline-none focus:border-cyan-400 transition"/>
            </div>

            {/* Height */}
            <div>
              <label className="block text-gray-300 font-medium mb-2">Height {unit==="metric"?"(cm)":"(ft / in)"}</label>
              {unit==="metric" ? (
                <input type="number" placeholder="e.g. 170" value={height} onChange={e=>setHeight(e.target.value)}
                  className="w-full bg-black/60 border border-zinc-700/60 rounded-2xl px-5 py-4 text-white outline-none focus:border-cyan-400 transition"/>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <input type="number" placeholder="Feet e.g. 5" value={feet} onChange={e=>setFeet(e.target.value)}
                    className="bg-black/60 border border-zinc-700/60 rounded-2xl px-5 py-4 text-white outline-none focus:border-cyan-400 transition"/>
                  <input type="number" placeholder="Inches e.g. 7" value={inches} onChange={e=>setInches(e.target.value)}
                    className="bg-black/60 border border-zinc-700/60 rounded-2xl px-5 py-4 text-white outline-none focus:border-cyan-400 transition"/>
                </div>
              )}
            </div>

            {/* Age + Gender */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-gray-300 text-sm mb-2">Age (optional)</label>
                <input type="number" placeholder="e.g. 25" value={age} onChange={e=>setAge(e.target.value)}
                  className="w-full bg-black/60 border border-zinc-700/60 rounded-2xl px-4 py-3 text-white outline-none focus:border-cyan-400 transition"/>
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">Gender</label>
                <div className="grid grid-cols-2 gap-2">
                  {(["male","female"] as const).map(g=>(
                    <button key={g} onClick={()=>setGender(g)}
                      className={`py-3 rounded-xl text-sm border transition capitalize ${gender===g?"bg-cyan-500/20 border-cyan-500/50 text-cyan-400":"bg-zinc-800 border-zinc-700 text-gray-400"}`}>
                      {g==="male"?"👨 Male":"👩 Female"}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Result */}
            {r && (
              <div className="space-y-4 pt-2">
                <div className="bg-gradient-to-br from-cyan-500/15 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-6 text-center">
                  <p className="text-gray-400 text-sm mb-1">Your BMI</p>
                  <p className="text-6xl font-bold text-cyan-400 mb-2">{r.bmi}</p>
                  <p className={`text-2xl font-bold mb-3 ${r.color}`}>{r.category}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{r.advice}</p>
                </div>

                {/* BMI Scale */}
                <div>
                  <div className="flex justify-between text-xs text-gray-500 mb-2">
                    <span>10</span><span>18.5</span><span>25</span><span>30</span><span>35</span><span>40</span>
                  </div>
                  <div className="h-4 rounded-full overflow-hidden" style={{background:"linear-gradient(to right,#3b82f6,#22c55e,#eab308,#f97316,#ef4444)"}}>
                    <div className="relative h-full">
                      <div className="absolute top-0 bottom-0 w-1 bg-white rounded-full shadow-lg transition-all" style={{left:`${pct}%`}}/>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span className="text-blue-400">Under</span><span className="text-green-400">Normal</span><span className="text-yellow-400">Over</span><span className="text-orange-400">Obese</span>
                  </div>
                </div>

                <div className="bg-black/40 border border-zinc-800/60 rounded-xl p-4 text-sm">
                  <p className="text-gray-400">Ideal weight range for your height:</p>
                  <p className="text-cyan-400 font-bold text-lg">{r.idealMin} kg — {r.idealMax} kg</p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 bg-black/40 border border-zinc-700/60 rounded-2xl p-5">
            <h2 className="text-cyan-400 font-semibold mb-3">📊 BMI Categories (WHO)</h2>
            <div className="space-y-2 text-sm">
              {[["<18.5","Underweight","text-blue-400"],["18.5–24.9","Normal (Healthy)","text-green-400"],["25–29.9","Overweight","text-yellow-400"],["30–34.9","Obese Class I","text-orange-400"],["≥35","Obese Class II/III","text-red-400"]].map(([range,cat,color])=>(
                <div key={range} className="flex justify-between bg-black/30 rounded-lg px-3 py-2">
                  <span className="text-gray-400">BMI {range}</span>
                  <span className={`font-semibold ${color}`}>{cat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </ToolPageWrapper>
  );
}
