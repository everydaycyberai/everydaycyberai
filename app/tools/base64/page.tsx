"use client";
import { useState } from "react";
import ToolPageWrapper from "@/components/ToolPageWrapper";

export default function Base64Page() {
  const [input, setInput]   = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode]     = useState<"encode"|"decode">("encode");
  const [error, setError]   = useState("");
  const [copied, setCopied] = useState(false);

  const process = (text: string, m: typeof mode) => {
    setError("");
    try {
      if (m === "encode") {
        setOutput(btoa(unescape(encodeURIComponent(text))));
      } else {
        setOutput(decodeURIComponent(escape(atob(text))));
      }
    } catch {
      setError(m === "decode" ? "Invalid Base64 string" : "Encoding failed");
      setOutput("");
    }
  };

  const handleInput = (val: string) => {
    setInput(val);
    if (val) process(val, mode);
    else { setOutput(""); setError(""); }
  };

  const switchMode = () => {
    const newMode = mode === "encode" ? "decode" : "encode";
    setMode(newMode);
    setInput(output);
    if (output) process(output, newMode);
    else { setOutput(""); setError(""); }
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolPageWrapper badge="Dev Tool">
      <main className="px-6 py-12 pb-24">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-5xl font-bold mb-4">Base64 Encoder / Decoder</h1>
            <p className="text-gray-400">Encode text to Base64 or decode Base64 back to text — instantly in browser</p>
          </div>

          <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-8 space-y-5">
            {/* Mode Toggle */}
            <div className="grid grid-cols-2 gap-3">
              {(["encode","decode"] as const).map(m => (
                <button key={m} onClick={() => { setMode(m); setInput(""); setOutput(""); setError(""); }}
                  className={`py-3 rounded-xl font-medium border transition capitalize ${mode===m?"bg-cyan-500/20 border-cyan-500/50 text-cyan-400":"bg-zinc-800 border-zinc-700 text-gray-400"}`}>
                  {m === "encode" ? "Text → Base64" : "Base64 → Text"}
                </button>
              ))}
            </div>

            {/* Input */}
            <div>
              <label className="block text-gray-300 font-medium mb-2">
                {mode === "encode" ? "Enter Text to Encode" : "Enter Base64 to Decode"}
              </label>
              <textarea rows={5} value={input} onChange={e => handleInput(e.target.value)}
                placeholder={mode === "encode" ? "Type any text here..." : "Paste Base64 string here..."}
                className="w-full bg-black/80 border border-zinc-700 rounded-2xl px-5 py-4 text-white font-mono text-sm resize-none outline-none focus:border-cyan-400 transition"/>
            </div>

            {/* Swap button */}
            <div className="text-center">
              <button onClick={switchMode}
                className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-cyan-400 text-gray-400 hover:text-cyan-400 px-6 py-2 rounded-xl transition">
                ⇅ Swap Input / Output
              </button>
            </div>

            {/* Output */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-gray-300 font-medium">
                  {mode === "encode" ? "Base64 Output" : "Decoded Text"}
                </label>
                {output && (
                  <button onClick={copy}
                    className={`text-xs px-3 py-1 rounded-lg transition ${copied?"bg-green-500/20 text-green-400":"bg-zinc-800 text-gray-400 hover:text-cyan-400"}`}>
                    {copied ? "✓ Copied" : "Copy"}
                  </button>
                )}
              </div>
              {error && <p className="text-red-400 text-sm mb-2">⚠️ {error}</p>}
              <div className="bg-black/80 border border-zinc-700 rounded-2xl px-5 py-4 min-h-[100px] font-mono text-sm text-green-400 break-all">
                {output || <span className="text-gray-600">{mode==="encode"?"Base64 encoded output...":"Decoded text output..."}</span>}
              </div>
            </div>

            {/* Stats */}
            {input && output && (
              <div className="grid grid-cols-2 gap-3">
                {[{label:"Input length",value:`${input.length} chars`},{label:"Output length",value:`${output.length} chars`}].map(({label,value})=>(
                  <div key={label} className="bg-black/40 border border-zinc-800 rounded-xl p-3 text-center">
                    <p className="text-cyan-400 font-bold">{value}</p>
                    <p className="text-xs text-gray-500">{label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-cyan-400 font-semibold mb-3">💡 What is Base64?</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-3">Base64 converts binary/text data into a safe ASCII string that can be transmitted over the internet without corruption.</p>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-400">
              {["Email attachments","JWT tokens (auth)","Embedding images in HTML/CSS","API data encoding","Storing binary in JSON","Password/credential passing"].map(u=>(
                <div key={u} className="flex items-center gap-2"><span className="text-cyan-500">✓</span>{u}</div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </ToolPageWrapper>
  );
}
