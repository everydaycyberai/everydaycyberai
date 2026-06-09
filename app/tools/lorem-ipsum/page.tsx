"use client";
import { useState } from "react";
import ToolPageWrapper from "@/components/ToolPageWrapper";

const WORDS = ["lorem","ipsum","dolor","sit","amet","consectetur","adipiscing","elit","sed","do","eiusmod","tempor","incididunt","ut","labore","et","dolore","magna","aliqua","enim","ad","minim","veniam","quis","nostrud","exercitation","ullamco","laboris","nisi","aliquip","ex","ea","commodo","consequat","duis","aute","irure","in","reprehenderit","voluptate","velit","esse","cillum","eu","fugiat","nulla","pariatur","excepteur","sint","occaecat","cupidatat","non","proident","sunt","culpa","qui","officia","deserunt","mollit","anim","id","est","laborum","curabitur","pretium","tincidunt","lacus","nulla","nisl","blandit","vel","metus","nec","vestibulum","sodales","posuere","accumsan"];

const sentence = () => {
  const len = 8 + Math.floor(Math.random()*12);
  const words = Array.from({length:len}, () => WORDS[Math.floor(Math.random()*WORDS.length)]);
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(" ") + ".";
};

const paragraph = () => {
  const count = 4 + Math.floor(Math.random()*4);
  return Array.from({length:count}, sentence).join(" ");
};

export default function LoremIpsumPage() {
  const [type, setType]     = useState<"paragraphs"|"sentences"|"words">("paragraphs");
  const [count, setCount]   = useState(3);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [startLorem, setStartLorem] = useState(true);

  const generate = () => {
    let result = "";
    if (type === "paragraphs") {
      const paras = Array.from({length:count}, paragraph);
      if (startLorem) paras[0] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " + paras[0];
      result = paras.join("\n\n");
    } else if (type === "sentences") {
      const sents = Array.from({length:count}, sentence);
      if (startLorem) sents[0] = "Lorem ipsum dolor sit amet. " + sents[0];
      result = sents.join(" ");
    } else {
      const words = Array.from({length:count}, () => WORDS[Math.floor(Math.random()*WORDS.length)]);
      if (startLorem) words.splice(0,0,"lorem","ipsum","dolor","sit","amet");
      result = words.slice(0, startLorem ? count+5 : count).join(" ");
    }
    setOutput(result);
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const presets = [
    { label: "1 Short Para",   type: "paragraphs" as const, count: 1 },
    { label: "3 Paragraphs",   type: "paragraphs" as const, count: 3 },
    { label: "5 Sentences",    type: "sentences"  as const, count: 5 },
    { label: "50 Words",       type: "words"      as const, count: 50 },
  ];

  return (
    <ToolPageWrapper badge="Dev Tool">
      <main className="px-6 py-12 pb-24">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-5xl font-bold mb-4">Lorem Ipsum Generator</h1>
            <p className="text-gray-400">Generate placeholder text for websites, mockups and design projects</p>
          </div>

          {/* Presets */}
          <div className="flex flex-wrap gap-2 mb-5">
            {presets.map(p => (
              <button key={p.label} onClick={() => { setType(p.type); setCount(p.count); }}
                className="px-4 py-2 bg-zinc-900 border border-zinc-700 hover:border-cyan-400 text-gray-400 hover:text-cyan-400 rounded-xl text-sm transition">
                {p.label}
              </button>
            ))}
          </div>

          <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-8 space-y-5">
            {/* Type + Count */}
            <div className="grid grid-cols-3 gap-3">
              {(["paragraphs","sentences","words"] as const).map(t => (
                <button key={t} onClick={() => setType(t)}
                  className={`py-3 rounded-xl text-sm font-medium border transition capitalize ${type===t?"bg-cyan-500/20 border-cyan-500/50 text-cyan-400":"bg-zinc-800 border-zinc-700 text-gray-400"}`}>
                  {t}
                </button>
              ))}
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-gray-300 font-medium">How many {type}?</label>
                <span className="text-cyan-400 font-bold">{count}</span>
              </div>
              <input type="range" min={1} max={type==="words"?200:type==="sentences"?20:10} value={count}
                onChange={e => setCount(Number(e.target.value))} className="w-full accent-cyan-400"/>
              <div className="flex justify-between text-xs text-gray-600 mt-1">
                <span>1</span><span>{type==="words"?200:type==="sentences"?20:10}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input type="checkbox" id="startLorem" checked={startLorem} onChange={e=>setStartLorem(e.target.checked)}
                className="accent-cyan-400 w-4 h-4"/>
              <label htmlFor="startLorem" className="text-gray-400 text-sm cursor-pointer">Start with &quot;Lorem ipsum dolor sit amet...&quot;</label>
            </div>

            <button onClick={generate}
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-black py-4 rounded-2xl font-bold text-lg transition hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]">
              Generate Text
            </button>

            {output && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400 text-sm">{output.split(/\s+/).length} words · {output.length} chars</span>
                  <button onClick={copy}
                    className={`text-xs px-3 py-1 rounded-lg transition ${copied?"bg-green-500/20 text-green-400":"bg-zinc-800 text-gray-400 hover:text-cyan-400"}`}>
                    {copied ? "✓ Copied" : "Copy All"}
                  </button>
                </div>
                <div className="bg-black/80 border border-zinc-700 rounded-2xl px-5 py-4 text-gray-300 text-sm leading-relaxed max-h-64 overflow-y-auto whitespace-pre-wrap">
                  {output}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </ToolPageWrapper>
  );
}
