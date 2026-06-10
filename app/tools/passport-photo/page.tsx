"use client";
import { useState, useRef, useCallback } from "react";
import ToolPageWrapper from "@/components/ToolPageWrapper";

const SIZES = [
  { id: "passport",  label: "Passport / Visa",  w: 35, h: 45,  desc: "35×45mm" },
  { id: "aadhaar",   label: "Aadhaar / PAN",    w: 35, h: 45,  desc: "35×45mm" },
  { id: "stamp",     label: "Stamp Size",        w: 25, h: 30,  desc: "25×30mm" },
  { id: "post",      label: "Post Card",         w: 51, h: 51,  desc: "51×51mm" },
  { id: "square",    label: "1×1 inch",          w: 25.4,h: 25.4,desc: "25×25mm" },
];

const BG_COLORS = [
  { id: "white",   label: "White",       hex: "#ffffff" },
  { id: "offwhite",label: "Off White",   hex: "#f5f5f5" },
  { id: "blue",    label: "Light Blue",  hex: "#cce5ff" },
  { id: "gray",    label: "Light Gray",  hex: "#e8e8e8" },
];

const DPI = 300;
const MM_TO_PX = (mm: number) => Math.round((mm * DPI) / 25.4);

export default function PassportPhotoPage() {
  const [image, setImage]     = useState<string|null>(null);
  const [size, setSize]       = useState(SIZES[0]);
  const [bgColor, setBgColor] = useState(BG_COLORS[0]);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast]     = useState(100);
  const [result, setResult]   = useState<string|null>(null);
  const [processing, setProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = e => setImage(e.target?.result as string);
    reader.readAsDataURL(file);
    setResult(null);
  };

  const process = useCallback(() => {
    if (!image) return;
    setProcessing(true);
    const canvas = canvasRef.current || document.createElement("canvas");
    const pw = MM_TO_PX(size.w);
    const ph = MM_TO_PX(size.h);
    canvas.width = pw; canvas.height = ph;
    const ctx = canvas.getContext("2d")!;

    // Background
    ctx.fillStyle = bgColor.hex;
    ctx.fillRect(0,0,pw,ph);

    const img = new window.Image();
    img.onload = () => {
      // Center crop to fill
      const scale = Math.max(pw/img.width, ph/img.height);
      const sw = pw/scale, sh = ph/scale;
      const sx = (img.width-sw)/2, sy = Math.max(0,(img.height-sh)/2 - img.height*0.05);
      ctx.filter = `brightness(${brightness}%) contrast(${contrast}%)`;
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, pw, ph);
      ctx.filter = "none";
      setResult(canvas.toDataURL("image/jpeg", 0.95));
      setProcessing(false);
    };
    img.src = image;
  }, [image, size, bgColor, brightness, contrast]);

  const download = () => {
    if (!result) return;
    const a = document.createElement("a");
    a.href = result;
    a.download = `passport-photo-${size.id}.jpg`;
    a.click();
  };

  return (
    <ToolPageWrapper badge="Daily Use Tool">
      <main className="px-6 py-12 pb-24 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-5xl font-bold mb-4">Passport Size Photo Maker</h1>
            <p className="text-gray-400">Free passport size photo maker India — resize photo for Aadhaar, PAN, visa, exam forms. No watermark, instant download.</p>
          </div>

          <div className="bg-black/40 backdrop-blur-sm border border-zinc-700/60 rounded-3xl p-8 space-y-6">

            {/* Upload */}
            {!image ? (
              <div onClick={() => inputRef.current?.click()}
                onDrop={e=>{e.preventDefault(); const f=e.dataTransfer.files[0]; if(f)handleFile(f);}}
                onDragOver={e=>e.preventDefault()}
                className="border-2 border-dashed border-zinc-700 hover:border-cyan-400 rounded-2xl p-12 text-center cursor-pointer transition group">
                <div className="text-5xl mb-3 group-hover:scale-110 transition">📸</div>
                <p className="text-lg font-semibold text-gray-300 mb-1">Click or drag photo here</p>
                <p className="text-gray-500 text-sm">JPG, PNG supported • Processed in browser, not uploaded</p>
                <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={e=>{const f=e.target.files?.[0]; if(f)handleFile(f);}}/>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm mb-2 text-center">Original</p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={image} alt="original" className="w-full rounded-xl object-cover max-h-48"/>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-2 text-center">Processed</p>
                  {result ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={result} alt="result" className="w-full rounded-xl object-cover max-h-48"/>
                  ) : (
                    <div className="w-full h-48 bg-black/40 rounded-xl flex items-center justify-center text-gray-600 text-sm">
                      Click Process →
                    </div>
                  )}
                </div>
              </div>
            )}

            {image && (<>
              {/* Size */}
              <div>
                <label className="block text-gray-300 font-medium mb-3">Photo Size</label>
                <div className="grid grid-cols-3 gap-2">
                  {SIZES.map(s=>(
                    <button key={s.id} onClick={()=>setSize(s)}
                      className={`px-3 py-2.5 rounded-xl text-xs border transition text-center ${size.id===s.id?"bg-cyan-500/20 border-cyan-500/50 text-cyan-400":"bg-black/40 border-zinc-700/50 text-gray-400"}`}>
                      <div className="font-semibold">{s.label}</div>
                      <div className="opacity-60">{s.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Background */}
              <div>
                <label className="block text-gray-300 font-medium mb-3">Background Color</label>
                <div className="flex gap-3">
                  {BG_COLORS.map(c=>(
                    <button key={c.id} onClick={()=>setBgColor(c)} title={c.label}
                      className={`w-10 h-10 rounded-xl border-2 transition hover:scale-110 ${bgColor.id===c.id?"border-cyan-400 scale-110":"border-zinc-700"}`}
                      style={{background:c.hex}}/>
                  ))}
                </div>
              </div>

              {/* Adjustments */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  {label:`Brightness: ${brightness}%`, val:brightness, set:setBrightness},
                  {label:`Contrast: ${contrast}%`,     val:contrast,   set:setContrast},
                ].map(({label,val,set})=>(
                  <div key={label}>
                    <label className="block text-gray-400 text-sm mb-2">{label}</label>
                    <input type="range" min={50} max={150} value={val} onChange={e=>set(Number(e.target.value))}
                      className="w-full accent-cyan-400"/>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <button onClick={process} disabled={processing}
                  className="flex-1 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-black py-4 rounded-2xl font-bold transition">
                  {processing?"Processing...":"⚙️ Process Photo"}
                </button>
                {result && (
                  <button onClick={download}
                    className="flex-1 bg-green-500 hover:bg-green-400 text-black py-4 rounded-2xl font-bold transition">
                    ⬇ Download
                  </button>
                )}
              </div>
              <button onClick={()=>{setImage(null);setResult(null);}}
                className="w-full bg-zinc-800 text-gray-400 py-3 rounded-xl text-sm transition hover:bg-zinc-700">
                Choose Different Photo
              </button>
            </>)}
          </div>

          <canvas ref={canvasRef} className="hidden"/>

          <div className="mt-6 bg-black/40 border border-zinc-700/60 rounded-2xl p-5">
            <h2 className="text-cyan-400 font-semibold mb-3">📋 Standard Photo Sizes India</h2>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-400">
              {[["Passport / Visa","35×45mm, white bg"],["Aadhaar Card","35×45mm"],["PAN Card","25×35mm"],["Driving License","35×45mm"],["Exam Forms (SSC/UPSC)","35×45mm"],["Bank Account KYC","35×45mm"]].map(([d,s])=>(
                <div key={d} className="flex justify-between bg-black/30 rounded-lg px-3 py-2">
                  <span>{d}</span><span className="text-cyan-400">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </ToolPageWrapper>
  );
}
