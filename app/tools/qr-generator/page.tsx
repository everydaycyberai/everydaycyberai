"use client";
import { useState, useEffect, useRef } from "react";
import ToolPageWrapper from "@/components/ToolPageWrapper";

export default function QRGeneratorPage() {
  const [input, setInput]   = useState("");
  const [qrUrl, setQrUrl]   = useState("");
  const [type, setType]     = useState<"url"|"text"|"email"|"phone"|"wifi">("url");
  const [wifi, setWifi]     = useState({ ssid: "", password: "", enc: "WPA" });
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  const buildValue = () => {
    if (type === "email")  return `mailto:${input}`;
    if (type === "phone")  return `tel:${input}`;
    if (type === "wifi")   return `WIFI:T:${wifi.enc};S:${wifi.ssid};P:${wifi.password};;`;
    return input;
  };

  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const val = buildValue();
      if (!val.trim() || (type === "wifi" && !wifi.ssid)) { setQrUrl(""); return; }
      const encoded = encodeURIComponent(val);
      setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encoded}&bgcolor=18181b&color=22d3ee&format=png`);
    }, 500);
  }, [input, type, wifi]);

  const download = () => {
    if (!qrUrl) return;
    const a = document.createElement("a");
    a.href = qrUrl;
    a.download = "qrcode.png";
    a.click();
  };

  const types = [
    { id: "url",   label: "URL",     placeholder: "https://yoursite.com" },
    { id: "text",  label: "Text",    placeholder: "Any text message..." },
    { id: "email", label: "Email",   placeholder: "someone@email.com" },
    { id: "phone", label: "Phone",   placeholder: "+91 98765 43210" },
    { id: "wifi",  label: "Wi-Fi",   placeholder: "" },
  ] as const;

  return (
    <ToolPageWrapper badge="Daily Use Tool">
      <main className="px-6 py-12 pb-24">
        <div className="max-w-2xl mx-auto">

          <div className="text-center mb-10">
            <h1 className="text-5xl font-bold mb-4">QR Code Generator</h1>
            <p className="text-gray-400">Generate QR codes for URLs, text, email, phone or Wi-Fi — free, instant download</p>
          </div>

          <div className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-3xl p-8 space-y-6">

            {/* Type selector */}
            <div>
              <p className="text-gray-300 font-medium mb-3">QR Code Type</p>
              <div className="flex flex-wrap gap-2">
                {types.map((t) => (
                  <button key={t.id} onClick={() => { setType(t.id); setInput(""); }}
                    className={`px-4 py-2 rounded-xl text-sm font-medium border transition ${
                      type === t.id ? "bg-cyan-500/20 border-cyan-500/60 text-cyan-400" : "bg-zinc-800 border-zinc-700 text-gray-400 hover:border-cyan-500/30"}`}>
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            {type !== "wifi" ? (
              <div>
                <label className="block text-gray-300 font-medium mb-2">
                  {type === "url" ? "Enter URL" : type === "email" ? "Enter Email Address" : type === "phone" ? "Enter Phone Number" : "Enter Text"}
                </label>
                <input type="text"
                  placeholder={types.find(t => t.id === type)?.placeholder}
                  value={input} onChange={(e) => setInput(e.target.value)}
                  className="w-full bg-black/80 border border-zinc-700 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400 transition" />
              </div>
            ) : (
              <div className="space-y-3">
                <input type="text" placeholder="Wi-Fi Network Name (SSID)"
                  value={wifi.ssid} onChange={(e) => setWifi({ ...wifi, ssid: e.target.value })}
                  className="w-full bg-black/80 border border-zinc-700 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400 transition" />
                <input type="text" placeholder="Wi-Fi Password"
                  value={wifi.password} onChange={(e) => setWifi({ ...wifi, password: e.target.value })}
                  className="w-full bg-black/80 border border-zinc-700 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400 transition" />
                <select value={wifi.enc} onChange={(e) => setWifi({ ...wifi, enc: e.target.value })}
                  className="w-full bg-black border border-zinc-700 rounded-2xl px-5 py-4 text-white outline-none focus:border-cyan-400">
                  <option>WPA</option><option>WEP</option><option value="nopass">No Password</option>
                </select>
              </div>
            )}

            {/* QR Preview */}
            {qrUrl && (
              <div className="flex flex-col items-center gap-4">
                <div className="bg-zinc-800 rounded-2xl p-4 border border-zinc-700">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={qrUrl} alt="QR Code" width={250} height={250} className="rounded-xl" />
                </div>
                <button onClick={download}
                  className="bg-cyan-500 hover:bg-cyan-400 text-black px-8 py-3 rounded-2xl font-bold transition hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]">
                  ⬇ Download QR Code
                </button>
              </div>
            )}

            {!qrUrl && (
              <div className="text-center py-8 text-gray-600 border border-dashed border-zinc-800 rounded-2xl">
                <p className="text-4xl mb-2">▦</p>
                <p>QR code will appear here</p>
              </div>
            )}

          </div>

          <div className="mt-8 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-cyan-400 mb-4">💡 QR Code Uses</h2>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-400">
              {["Share your website link","Share Wi-Fi password easily","Business card with contact info","Payment UPI link","Instagram / YouTube profile","Event details or location"].map(u => (
                <div key={u} className="flex items-center gap-2"><span className="text-cyan-500">✓</span>{u}</div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </ToolPageWrapper>
  );
}
