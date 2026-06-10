"use client";
import { useState } from "react";
import ToolPageWrapper from "@/components/ToolPageWrapper";

function analyze(text: string) {
  const words   = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars   = text.length;
  const charsNoSpace = text.replace(/\s/g, "").length;
  const sentences = text.trim() ? (text.match(/[.!?]+/g) || []).length || 1 : 0;
  const paragraphs = text.trim() ? text.split(/\n\s*\n/).filter(Boolean).length || 1 : 0;
  const readTime = Math.max(1, Math.ceil(words / 200));
  const speakTime = Math.max(1, Math.ceil(words / 130));
  return { words, chars, charsNoSpace, sentences, paragraphs, readTime, speakTime };
}

export default function WordCounterPage() {
  const [text, setText] = useState("");
  const s = analyze(text);

  const stats = [
    { label: "Words",           value: s.words },
    { label: "Characters",      value: s.chars },
    { label: "Chars (no space)",value: s.charsNoSpace },
    { label: "Sentences",       value: s.sentences },
    { label: "Paragraphs",      value: s.paragraphs },
    { label: "Read Time",       value: `${s.readTime} min` },
    { label: "Speak Time",      value: `${s.speakTime} min` },
  ];

  // Social media limits
  const limits = [
    { platform: "Twitter / X",  limit: 280,  icon: "𝕏" },
    { platform: "Instagram bio",limit: 150,  icon: "📸" },
    { platform: "LinkedIn post", limit: 3000, icon: "💼" },
    { platform: "WhatsApp status", limit: 139, icon: "💬" },
    { platform: "Meta description", limit: 160, icon: "🔍" },
  ];

  return (
    <ToolPageWrapper badge="Study Tool">
      <main className="px-6 py-12 pb-24">
        <div className="max-w-3xl mx-auto">

          <div className="text-center mb-10">
            <h1 className="text-5xl font-bold mb-4">Word Counter</h1>
            <p className="text-gray-400">Count words, characters, sentences — with reading time and social media limits</p>
          </div>

          {/* Textarea */}
          <div className="bg-black/40 backdrop-blur-sm border border-zinc-700/60 rounded-3xl p-6 mb-6">
            <div className="flex justify-between items-center mb-3">
              <label className="text-gray-300 font-medium">Type or paste your text</label>
              {text && (
                <button onClick={() => setText("")}
                  className="text-xs text-gray-500 hover:text-red-400 transition">
                  Clear ✕
                </button>
              )}
            </div>
            <textarea
              rows={10}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your essay, article, assignment or any text here..."
              className="w-full bg-black/80 border border-zinc-700 rounded-2xl px-5 py-4 text-white resize-none outline-none focus:border-cyan-400 transition text-sm leading-relaxed"
            />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {stats.map(({ label, value }) => (
              <div key={label} className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-4 text-center">
                <p className="text-2xl font-bold text-cyan-400">{value}</p>
                <p className="text-xs text-gray-500 mt-1">{label}</p>
              </div>
            ))}
          </div>

          {/* Social Media Limits */}
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-cyan-400 font-semibold mb-4">📱 Social Media Character Limits</h2>
            <div className="space-y-3">
              {limits.map(({ platform, limit, icon }) => {
                const used = s.chars;
                const pct  = Math.min(100, Math.round((used / limit) * 100));
                const over = used > limit;
                return (
                  <div key={platform}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">{icon} {platform}</span>
                      <span className={over ? "text-red-400 font-semibold" : "text-gray-500"}>
                        {used} / {limit} {over ? "⚠️ Over limit" : ""}
                      </span>
                    </div>
                    <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-300 ${over ? "bg-red-500" : pct > 80 ? "bg-yellow-500" : "bg-cyan-500"}`}
                        style={{ width: `${Math.min(100, pct)}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </main>
    </ToolPageWrapper>
  );
}
