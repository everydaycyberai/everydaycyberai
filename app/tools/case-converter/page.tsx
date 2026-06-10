"use client";
import { useState } from "react";
import ToolPageWrapper from "@/components/ToolPageWrapper";

const convert = (text: string, mode: string) => {
  switch (mode) {
    case "upper":      return text.toUpperCase();
    case "lower":      return text.toLowerCase();
    case "title":      return text.replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
    case "sentence":   return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    case "camel":      return text.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_,c) => c.toUpperCase());
    case "pascal":     return text.toLowerCase().replace(/(^|[^a-zA-Z0-9]+)(.)/g, (_,__,c) => c.toUpperCase());
    case "snake":      return text.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "");
    case "kebab":      return text.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    case "constant":   return text.toUpperCase().replace(/\s+/g, "_").replace(/[^A-Z0-9_]/g, "");
    case "alternate":  return text.split("").map((c,i) => i%2===0 ? c.toLowerCase() : c.toUpperCase()).join("");
    case "inverse":    return text.split("").map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join("");
    case "remove_space": return text.replace(/\s+/g, "");
    default: return text;
  }
};

const MODES = [
  { id: "upper",       label: "UPPERCASE",       example: "HELLO WORLD" },
  { id: "lower",       label: "lowercase",        example: "hello world" },
  { id: "title",       label: "Title Case",       example: "Hello World" },
  { id: "sentence",    label: "Sentence case",    example: "Hello world" },
  { id: "camel",       label: "camelCase",        example: "helloWorld" },
  { id: "pascal",      label: "PascalCase",       example: "HelloWorld" },
  { id: "snake",       label: "snake_case",       example: "hello_world" },
  { id: "kebab",       label: "kebab-case",       example: "hello-world" },
  { id: "constant",    label: "CONSTANT_CASE",    example: "HELLO_WORLD" },
  { id: "alternate",   label: "aLtErNaTe",        example: "hElLo WoRlD" },
  { id: "inverse",     label: "iNVERSE cASE",     example: "hELLO wORLD" },
  { id: "remove_space",label: "RemoveSpaces",     example: "HelloWorld" },
];

export default function CaseConverterPage() {
  const [input, setInput]   = useState("");
  const [copied, setCopied] = useState<string|null>(null);

  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id); setTimeout(() => setCopied(null), 2000);
  };

  return (
    <ToolPageWrapper badge="Dev Tool">
      <main className="px-6 py-12 pb-24">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-5xl font-bold mb-4">Case Converter</h1>
            <p className="text-gray-400">Convert text to any case — UPPERCASE, camelCase, snake_case, kebab-case and more</p>
          </div>

          <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-8 mb-6">
            <div className="flex justify-between items-center mb-3">
              <label className="text-gray-300 font-medium">Enter your text</label>
              {input && <button onClick={() => setInput("")} className="text-xs text-gray-500 hover:text-red-400 transition">Clear ✕</button>}
            </div>
            <textarea rows={5} value={input} onChange={e => setInput(e.target.value)}
              placeholder="Type or paste text here — e.g. hello world"
              className="w-full bg-black/80 border border-zinc-700 rounded-2xl px-5 py-4 text-white resize-none outline-none focus:border-cyan-400 transition"/>
          </div>

          {input && (
            <div className="grid md:grid-cols-2 gap-3">
              {MODES.map(({ id, label, example }) => {
                const result = convert(input, id);
                return (
                  <div key={id} className="bg-zinc-900/80 border border-zinc-800 hover:border-cyan-400/40 rounded-2xl p-4 transition group">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-cyan-400 text-xs font-semibold">{label}</span>
                      <button onClick={() => copy(result, id)}
                        className={`text-xs px-3 py-1 rounded-lg transition ${copied===id ? "bg-green-500/20 text-green-400" : "bg-zinc-800 text-gray-500 hover:text-cyan-400"}`}>
                        {copied===id ? "✓ Copied" : "Copy"}
                      </button>
                    </div>
                    <p className="font-mono text-sm text-white break-all">{result}</p>
                    <p className="text-gray-600 text-xs mt-1">e.g. {example}</p>
                  </div>
                );
              })}
            </div>
          )}

          {!input && (
            <div className="bg-black/35 backdrop-blur-sm border border-zinc-700/50 rounded-2xl p-6">
              <h2 className="text-cyan-400 font-semibold mb-3">💡 When to use which case?</h2>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-400">
                {[["camelCase","JavaScript variables"],["PascalCase","React components, classes"],["snake_case","Python variables, DB columns"],["kebab-case","CSS classes, URLs"],["CONSTANT_CASE","Constants in any language"],["Title Case","Blog titles, headings"]].map(([c,u])=>(
                  <div key={c}><span className="text-cyan-400 font-mono">{c}</span> — {u}</div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </ToolPageWrapper>
  );
}
