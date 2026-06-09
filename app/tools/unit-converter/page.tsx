"use client";
import { useState } from "react";
import ToolPageWrapper from "@/components/ToolPageWrapper";

type Category = "length" | "weight" | "temperature" | "area" | "speed" | "data";

const units: Record<Category, { label: string; units: { id: string; name: string; toBase: (v: number) => number; fromBase: (v: number) => number }[] }> = {
  length: {
    label: "📏 Length",
    units: [
      { id: "mm",  name: "Millimeter (mm)",   toBase: v => v/1000,    fromBase: v => v*1000 },
      { id: "cm",  name: "Centimeter (cm)",   toBase: v => v/100,     fromBase: v => v*100 },
      { id: "m",   name: "Meter (m)",         toBase: v => v,         fromBase: v => v },
      { id: "km",  name: "Kilometer (km)",    toBase: v => v*1000,    fromBase: v => v/1000 },
      { id: "in",  name: "Inch (in)",         toBase: v => v*0.0254,  fromBase: v => v/0.0254 },
      { id: "ft",  name: "Feet (ft)",         toBase: v => v*0.3048,  fromBase: v => v/0.3048 },
      { id: "mi",  name: "Mile (mi)",         toBase: v => v*1609.34, fromBase: v => v/1609.34 },
    ],
  },
  weight: {
    label: "⚖️ Weight",
    units: [
      { id: "mg",  name: "Milligram (mg)",    toBase: v => v/1e6,    fromBase: v => v*1e6 },
      { id: "g",   name: "Gram (g)",          toBase: v => v/1000,   fromBase: v => v*1000 },
      { id: "kg",  name: "Kilogram (kg)",     toBase: v => v,        fromBase: v => v },
      { id: "ton", name: "Metric Ton",        toBase: v => v*1000,   fromBase: v => v/1000 },
      { id: "lb",  name: "Pound (lb)",        toBase: v => v*0.4536, fromBase: v => v/0.4536 },
      { id: "oz",  name: "Ounce (oz)",        toBase: v => v*0.02835,fromBase: v => v/0.02835 },
    ],
  },
  temperature: {
    label: "🌡️ Temperature",
    units: [
      { id: "c",  name: "Celsius (°C)",    toBase: v => v,                fromBase: v => v },
      { id: "f",  name: "Fahrenheit (°F)", toBase: v => (v-32)*5/9,       fromBase: v => v*9/5+32 },
      { id: "k",  name: "Kelvin (K)",      toBase: v => v-273.15,         fromBase: v => v+273.15 },
    ],
  },
  area: {
    label: "📐 Area",
    units: [
      { id: "sqm",  name: "Sq. Meter (m²)",   toBase: v => v,          fromBase: v => v },
      { id: "sqkm", name: "Sq. Kilometer",     toBase: v => v*1e6,      fromBase: v => v/1e6 },
      { id: "sqft", name: "Sq. Feet (ft²)",    toBase: v => v*0.0929,   fromBase: v => v/0.0929 },
      { id: "acre", name: "Acre",              toBase: v => v*4046.86,  fromBase: v => v/4046.86 },
      { id: "ha",   name: "Hectare (ha)",      toBase: v => v*10000,    fromBase: v => v/10000 },
      { id: "sqyd", name: "Sq. Yard (yd²)",    toBase: v => v*0.8361,   fromBase: v => v/0.8361 },
    ],
  },
  speed: {
    label: "🚀 Speed",
    units: [
      { id: "ms",   name: "Meter/sec (m/s)",   toBase: v => v,          fromBase: v => v },
      { id: "kmh",  name: "Km/hour (km/h)",    toBase: v => v/3.6,      fromBase: v => v*3.6 },
      { id: "mph",  name: "Miles/hour (mph)",  toBase: v => v*0.44704,  fromBase: v => v/0.44704 },
      { id: "knot", name: "Knot",              toBase: v => v*0.51444,  fromBase: v => v/0.51444 },
    ],
  },
  data: {
    label: "💾 Data",
    units: [
      { id: "b",   name: "Byte (B)",       toBase: v => v,          fromBase: v => v },
      { id: "kb",  name: "Kilobyte (KB)",  toBase: v => v*1024,     fromBase: v => v/1024 },
      { id: "mb",  name: "Megabyte (MB)",  toBase: v => v*1024**2,  fromBase: v => v/1024**2 },
      { id: "gb",  name: "Gigabyte (GB)",  toBase: v => v*1024**3,  fromBase: v => v/1024**3 },
      { id: "tb",  name: "Terabyte (TB)",  toBase: v => v*1024**4,  fromBase: v => v/1024**4 },
    ],
  },
};

export default function UnitConverterPage() {
  const [category, setCategory] = useState<Category>("length");
  const [from, setFrom] = useState("m");
  const [to, setTo]     = useState("ft");
  const [value, setValue] = useState("");

  const cat = units[category];
  const fromUnit = cat.units.find(u => u.id === from);
  const toUnit   = cat.units.find(u => u.id === to);

  const result = (() => {
    const num = parseFloat(value);
    if (!fromUnit || !toUnit || isNaN(num)) return "";
    const base = fromUnit.toBase(num);
    const out  = toUnit.fromBase(base);
    return Number.isFinite(out) ? (Math.abs(out) > 1e10 || (Math.abs(out) < 1e-6 && out !== 0) ? out.toExponential(4) : parseFloat(out.toPrecision(8)).toString()) : "—";
  })();

  const swap = () => { setFrom(to); setTo(from); };

  return (
    <ToolPageWrapper badge="Study Tool">
      <main className="px-6 py-12 pb-24">
        <div className="max-w-2xl mx-auto">

          <div className="text-center mb-10">
            <h1 className="text-5xl font-bold mb-4">Unit Converter</h1>
            <p className="text-gray-400">Convert length, weight, temperature, area, speed and data units instantly</p>
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {(Object.entries(units) as [Category, typeof units[Category]][]).map(([key, val]) => (
              <button key={key} onClick={() => { setCategory(key); setFrom(val.units[0].id); setTo(val.units[1].id); setValue(""); }}
                className={`px-4 py-2 rounded-xl text-sm font-medium border transition ${
                  category === key ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400" : "bg-zinc-900 border-zinc-700 text-gray-400 hover:border-cyan-500/30"}`}>
                {val.label}
              </button>
            ))}
          </div>

          <div className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-3xl p-8 space-y-5">

            {/* From */}
            <div>
              <label className="block text-gray-300 font-medium mb-2">From</label>
              <div className="flex gap-3">
                <input type="number" placeholder="Enter value" value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="flex-1 bg-black/80 border border-zinc-700 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400 transition text-white" />
                <select value={from} onChange={(e) => setFrom(e.target.value)}
                  className="bg-black border border-zinc-700 rounded-2xl px-4 py-4 text-white outline-none focus:border-cyan-400 min-w-[140px]">
                  {cat.units.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                </select>
              </div>
            </div>

            {/* Swap button */}
            <div className="text-center">
              <button onClick={swap}
                className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-cyan-400 text-gray-400 hover:text-cyan-400 px-6 py-2 rounded-xl transition text-lg">
                ⇅ Swap
              </button>
            </div>

            {/* To */}
            <div>
              <label className="block text-gray-300 font-medium mb-2">To</label>
              <div className="flex gap-3">
                <div className="flex-1 bg-black/40 border border-cyan-500/30 rounded-2xl px-5 py-4 text-cyan-400 font-mono text-xl font-bold min-h-[58px] flex items-center">
                  {result || <span className="text-gray-600 font-normal text-base">Result will appear here</span>}
                </div>
                <select value={to} onChange={(e) => setTo(e.target.value)}
                  className="bg-black border border-zinc-700 rounded-2xl px-4 py-4 text-white outline-none focus:border-cyan-400 min-w-[140px]">
                  {cat.units.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                </select>
              </div>
            </div>

            {/* Formula */}
            {value && result && (
              <div className="bg-black/40 border border-zinc-800 rounded-xl px-5 py-3 text-sm text-gray-400 font-mono">
                {value} {fromUnit?.name} = <span className="text-cyan-400 font-bold">{result} {toUnit?.name}</span>
              </div>
            )}

          </div>

        </div>
      </main>
    </ToolPageWrapper>
  );
}
