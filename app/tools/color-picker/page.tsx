"use client";
import { useState, useCallback } from "react";
import ToolPageWrapper from "@/components/ToolPageWrapper";

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
  return { r, g, b };
}
function rgbToHsl(r:number,g:number,b:number) {
  r/=255; g/=255; b/=255;
  const max=Math.max(r,g,b), min=Math.min(r,g,b);
  let h=0, s=0, l=(max+min)/2;
  if(max!==min){const d=max-min; s=l>0.5?d/(2-max-min):d/(max+min);
    switch(max){case r:h=((g-b)/d+(g<b?6:0))/6;break;case g:h=((b-r)/d+2)/6;break;default:h=((r-g)/d+4)/6;}}
  return {h:Math.round(h*360),s:Math.round(s*100),l:Math.round(l*100)};
}
function hexToCmyk(hex:string){
  const {r,g,b}=hexToRgb(hex);
  const R=r/255,G=g/255,B=b/255;
  const k=1-Math.max(R,G,B);
  if(k===1) return {c:0,m:0,y:0,k:100};
  return {c:Math.round(((1-R-k)/(1-k))*100),m:Math.round(((1-G-k)/(1-k))*100),y:Math.round(((1-B-k)/(1-k))*100),k:Math.round(k*100)};
}
function getLuminance(hex:string){const {r,g,b}=hexToRgb(hex);return 0.2126*(r/255)+0.7152*(g/255)+0.0722*(b/255);}
function getContrastColor(hex:string){return getLuminance(hex)>0.5?"#000000":"#ffffff";}

const PALETTES = [
  {name:"Cyber",colors:["#22d3ee","#06b6d4","#0891b2","#0e7490","#155e75"]},
  {name:"Warm",colors:["#f97316","#ef4444","#ec4899","#a855f7","#8b5cf6"]},
  {name:"Nature",colors:["#22c55e","#16a34a","#15803d","#84cc16","#65a30d"]},
  {name:"Neutral",colors:["#f8fafc","#94a3b8","#475569","#1e293b","#0f172a"]},
];

export default function ColorPickerPage() {
  const [color, setColor] = useState("#22d3ee");
  const [copied, setCopied] = useState<string|null>(null);

  const copy = (text:string, label:string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(()=>setCopied(null), 2000);
  };

  const rgb  = hexToRgb(color);
  const hsl  = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const cmyk = hexToCmyk(color);
  const textColor = getContrastColor(color);

  const formats = [
    { label: "HEX",  value: color.toUpperCase() },
    { label: "RGB",  value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
    { label: "HSL",  value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
    { label: "CMYK", value: `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)` },
  ];

  // Generate shades
  const shades = Array.from({length:9},(_,i)=>{
    const {r,g,b}=hexToRgb(color);
    const t=(i+1)/10;
    const nr=Math.round(r+(255-r)*t*(1-t*0.5));
    const ng=Math.round(g+(255-g)*t*(1-t*0.5));
    const nb=Math.round(b+(255-b)*t*(1-t*0.5));
    const dr=Math.round(r*t);
    const dg=Math.round(g*t);
    const db=Math.round(b*t);
    return i<4
      ? `#${dr.toString(16).padStart(2,"0")}${dg.toString(16).padStart(2,"0")}${db.toString(16).padStart(2,"0")}`
      : `#${nr.toString(16).padStart(2,"0")}${ng.toString(16).padStart(2,"0")}${nb.toString(16).padStart(2,"0")}`;
  });

  return (
    <ToolPageWrapper badge="Design Tool">
      <main className="px-6 py-12 pb-24">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-5xl font-bold mb-4">Color Picker</h1>
            <p className="text-gray-400">Pick any color — get HEX, RGB, HSL, CMYK codes instantly</p>
          </div>

          {/* Color Preview + Picker */}
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-8 space-y-6">

            {/* Big preview */}
            <div className="rounded-2xl h-32 flex items-center justify-center transition-all duration-300 relative overflow-hidden"
              style={{backgroundColor: color}}>
              <span className="font-bold text-2xl font-mono" style={{color: textColor}}>{color.toUpperCase()}</span>
            </div>

            {/* Picker */}
            <div className="flex items-center gap-4">
              <input type="color" value={color} onChange={e=>setColor(e.target.value)}
                className="w-16 h-16 rounded-2xl cursor-pointer border-0 bg-transparent"/>
              <div className="flex-1">
                <label className="text-gray-400 text-sm mb-1 block">HEX Code</label>
                <input type="text" value={color} onChange={e=>{if(/^#[0-9A-Fa-f]{0,6}$/.test(e.target.value))setColor(e.target.value)}}
                  className="w-full bg-black/80 border border-zinc-700 rounded-xl px-4 py-3 font-mono text-white outline-none focus:border-cyan-400 transition uppercase"/>
              </div>
            </div>

            {/* Format codes */}
            <div className="space-y-2">
              <p className="text-gray-300 font-medium text-sm">Color Formats</p>
              {formats.map(({label,value})=>(
                <div key={label} className="flex items-center justify-between bg-black/40 border border-zinc-800 rounded-xl px-4 py-3">
                  <div>
                    <span className="text-xs text-cyan-400 font-semibold mr-3">{label}</span>
                    <span className="font-mono text-sm text-white">{value}</span>
                  </div>
                  <button onClick={()=>copy(value,label)}
                    className={`text-xs px-3 py-1 rounded-lg transition ${copied===label?"bg-green-500/20 text-green-400":"bg-zinc-700 text-gray-400 hover:text-cyan-400"}`}>
                    {copied===label?"✓":"Copy"}
                  </button>
                </div>
              ))}
            </div>

            {/* Shades */}
            <div>
              <p className="text-gray-300 font-medium text-sm mb-3">Shades & Tints</p>
              <div className="grid grid-cols-9 gap-1.5">
                {shades.map((shade,i)=>(
                  <button key={i} onClick={()=>setColor(shade)} title={shade}
                    className="h-10 rounded-lg transition hover:scale-110 hover:shadow-lg border border-zinc-800"
                    style={{backgroundColor:shade}}/>
                ))}
              </div>
            </div>
          </div>

          {/* Preset palettes */}
          <div className="mt-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-cyan-400 font-semibold mb-4">🎨 Popular Palettes</h2>
            <div className="space-y-4">
              {PALETTES.map(pal=>(
                <div key={pal.name}>
                  <p className="text-gray-500 text-xs mb-2">{pal.name}</p>
                  <div className="flex gap-2">
                    {pal.colors.map(c=>(
                      <button key={c} onClick={()=>setColor(c)} title={c}
                        className="flex-1 h-10 rounded-xl transition hover:scale-105 border border-zinc-800"
                        style={{backgroundColor:c}}/>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </ToolPageWrapper>
  );
}
