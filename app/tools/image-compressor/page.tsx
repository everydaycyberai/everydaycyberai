"use client";
import { useState, useRef, useCallback } from "react";
import ToolPageWrapper from "@/components/ToolPageWrapper";

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024*1024) return `${(bytes/1024).toFixed(1)} KB`;
  return `${(bytes/(1024*1024)).toFixed(2)} MB`;
}

export default function ImageCompressorPage() {
  const [original, setOriginal] = useState<{url:string;size:number;name:string;w:number;h:number}|null>(null);
  const [compressed, setCompressed] = useState<{url:string;size:number}|null>(null);
  const [quality, setQuality] = useState(80);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const compress = useCallback((file: File, q: number) => {
    setLoading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width; canvas.height = img.height;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          if (!blob) return;
          setCompressed({ url: URL.createObjectURL(blob), size: blob.size });
          setLoading(false);
        }, "image/jpeg", q/100);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }, []);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    const img = new window.Image();
    img.onload = () => {
      setOriginal({ url, size: file.size, name: file.name, w: img.width, h: img.height });
      setCompressed(null);
      compress(file, quality);
    };
    img.src = url;
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const download = () => {
    if (!compressed) return;
    const a = document.createElement("a");
    a.href = compressed.url;
    a.download = `compressed-${original?.name || "image.jpg"}`;
    a.click();
  };

  const saved = original && compressed ? Math.round((1 - compressed.size/original.size)*100) : 0;

  return (
    <ToolPageWrapper badge="Daily Use Tool">
      <main className="px-6 py-12 pb-24">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-5xl font-bold mb-4">Image Compressor</h1>
            <p className="text-gray-400">Compress images without losing quality — perfect for WhatsApp, email and websites</p>
          </div>

          {/* Upload Zone */}
          {!original && (
            <div onDrop={onDrop} onDragOver={e=>e.preventDefault()}
              onClick={() => inputRef.current?.click()}
              className="bg-zinc-900/80 border-2 border-dashed border-zinc-700 hover:border-cyan-400 rounded-3xl p-16 text-center cursor-pointer transition duration-300 group">
              <div className="text-6xl mb-4 group-hover:scale-110 transition">🖼️</div>
              <p className="text-xl font-semibold text-gray-300 mb-2">Click or drag & drop image here</p>
              <p className="text-gray-500 text-sm">Supports JPG, PNG, WebP — Processed in browser, not uploaded anywhere</p>
              <input ref={inputRef} type="file" accept="image/*" className="hidden"
                onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }}/>
            </div>
          )}

          {original && (
            <div className="space-y-5">
              {/* Quality Slider */}
              <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6">
                <div className="flex justify-between mb-3">
                  <span className="text-gray-300 font-medium">Quality</span>
                  <span className="text-cyan-400 font-bold text-xl">{quality}%</span>
                </div>
                <input type="range" min={10} max={100} value={quality}
                  onChange={e => {
                    const q = Number(e.target.value); setQuality(q);
                    inputRef.current?.files?.[0] && compress(inputRef.current.files[0], q);
                    const fileInput = document.querySelector<HTMLInputElement>('input[type="file"]');
                    if (fileInput?.files?.[0]) compress(fileInput.files[0], q);
                  }}
                  className="w-full accent-cyan-400"/>
                <div className="flex justify-between text-xs text-gray-600 mt-1">
                  <span>10% (smallest)</span><span>80% (recommended)</span><span>100% (original)</span>
                </div>
              </div>

              {/* Before / After */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5">
                  <p className="text-gray-400 text-sm mb-3 font-medium">📥 Original</p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={original.url} alt="Original" className="w-full rounded-xl object-cover max-h-48"/>
                  <div className="mt-3 space-y-1 text-sm">
                    <div className="flex justify-between text-gray-400"><span>Size</span><span className="text-white font-semibold">{formatSize(original.size)}</span></div>
                    <div className="flex justify-between text-gray-400"><span>Dimensions</span><span className="text-white">{original.w}×{original.h}px</span></div>
                  </div>
                </div>

                <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5">
                  <p className="text-gray-400 text-sm mb-3 font-medium">📤 Compressed</p>
                  {loading ? (
                    <div className="flex items-center justify-center h-48 text-gray-500">
                      <div className="text-center"><div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"/><p>Compressing...</p></div>
                    </div>
                  ) : compressed ? (<>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={compressed.url} alt="Compressed" className="w-full rounded-xl object-cover max-h-48"/>
                    <div className="mt-3 space-y-1 text-sm">
                      <div className="flex justify-between text-gray-400"><span>Size</span><span className="text-green-400 font-semibold">{formatSize(compressed.size)}</span></div>
                      <div className="flex justify-between text-gray-400"><span>Saved</span><span className="text-green-400 font-bold">{saved}% smaller 🎉</span></div>
                    </div>
                  </>) : null}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button onClick={download} disabled={!compressed || loading}
                  className="flex-1 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-black py-4 rounded-2xl font-bold transition hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]">
                  ⬇ Download Compressed
                </button>
                <button onClick={() => { setOriginal(null); setCompressed(null); }}
                  className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-gray-400 px-6 py-4 rounded-2xl transition">
                  New Image
                </button>
              </div>

              <input ref={inputRef} type="file" accept="image/*" className="hidden"
                onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }}/>
            </div>
          )}

          <div className="mt-8 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-cyan-400 mb-3">🔒 100% Private</h2>
            <p className="text-gray-400 text-sm">Your images are compressed entirely in your browser. Nothing is uploaded to any server. Your photos stay on your device.</p>
          </div>
        </div>
      </main>
    </ToolPageWrapper>
  );
}
