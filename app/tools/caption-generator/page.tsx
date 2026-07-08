"use client";
import { useState } from "react";
import ToolPageWrapper from "@/components/ToolPageWrapper";

type CaptionSet = { caption: string; hashtags: string[] };

const VIBES = ["Funny", "Aesthetic", "Motivational", "Savage", "Romantic", "Travel", "Fitness", "Casual"];

export default function CaptionGeneratorPage() {
  const [topic, setTopic] = useState("");
  const [vibe, setVibe] = useState(VIBES[0]);
  const [loading, setLoading] = useState(false);
  const [captions, setCaptions] = useState<CaptionSet[] | null>(null);
  const [error, setError] = useState("");
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const generate = async () => {
    if (!topic.trim()) return;
    setLoading(true); setError(""); setCaptions(null);

    const prompt = `Generate 6 Instagram captions for this post:
Topic/Description: ${topic}
Vibe: ${vibe}

Each caption should be short (1-2 lines), catchy, and match the vibe. Include 5-8 relevant hashtags per caption (mix of popular and niche).

Respond ONLY with valid JSON array in this exact format, no markdown:
[{"caption": "...", "hashtags": ["tag1","tag2",...]}, ...]`;

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemPrompt: "You are a social media content creator who writes catchy, trendy Instagram captions for Indian Gen-Z/young millennial audience. Keep captions punchy and natural, not cringe or overly formal. Always respond with valid JSON only, no markdown, no text outside the JSON array.",
          userPrompt: prompt,
        }),
      });
      const data = await res.json();
      const text = data.text || "";
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        setCaptions(JSON.parse(jsonMatch[0]));
      } else {
        throw new Error("Invalid response");
      }
    } catch {
      setError("Could not generate captions right now — please try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  const copyCaption = (i: number, c: CaptionSet) => {
    const text = `${c.caption}\n\n${c.hashtags.map(h => `#${h.replace(/^#/, "")}`).join(" ")}`;
    navigator.clipboard.writeText(text);
    setCopiedIdx(i);
    setTimeout(() => setCopiedIdx(null), 1500);
  };

  return (
    <ToolPageWrapper badge="📸 Social Tool">
      <main className="px-6 py-12 pb-24 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">AI Instagram Caption Generator</h1>
            <p className="text-gray-400">Describe your post, pick a vibe, get instant captions + hashtags. Free, unlimited.</p>
          </div>

          {!captions && (
            <div className="bg-black/40 backdrop-blur-sm border border-zinc-700/60 rounded-3xl p-8 space-y-6">
              <div>
                <label className="block text-gray-300 font-medium mb-2">What&apos;s the post about?</label>
                <textarea value={topic} onChange={e => setTopic(e.target.value)} rows={3}
                  placeholder="e.g. Sunset at the beach with friends, gym progress pic, new haircut..."
                  className="w-full bg-black/80 border border-zinc-700 rounded-2xl px-5 py-4 text-white outline-none focus:border-cyan-400 transition resize-none" />
              </div>
              <div>
                <label className="block text-gray-300 font-medium mb-3">Vibe</label>
                <div className="grid grid-cols-4 gap-2">
                  {VIBES.map(v => (
                    <button key={v} onClick={() => setVibe(v)}
                      className={`py-2.5 rounded-xl text-sm font-medium border transition ${vibe === v ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400" : "bg-zinc-800 border-zinc-700 text-gray-400"}`}>
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {error && <p className="text-red-400 text-sm">⚠️ {error}</p>}

              <button onClick={generate} disabled={loading || !topic.trim()}
                className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-black py-4 rounded-2xl font-bold text-lg transition">
                {loading ? "✨ Writing captions..." : "✨ Generate Captions"}
              </button>
            </div>
          )}

          {captions && (
            <div className="space-y-4">
              {captions.map((c, i) => (
                <div key={i} className="bg-black/40 backdrop-blur-sm border border-zinc-700/60 rounded-2xl p-6">
                  <p className="text-white text-lg mb-3">{c.caption}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {c.hashtags.map((h) => (
                      <span key={h} className="text-cyan-400 text-sm">#{h.replace(/^#/, "")}</span>
                    ))}
                  </div>
                  <button onClick={() => copyCaption(i, c)}
                    className="text-xs bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-gray-300 px-4 py-2 rounded-lg transition">
                    {copiedIdx === i ? "✅ Copied!" : "📋 Copy Caption + Tags"}
                  </button>
                </div>
              ))}
              <button onClick={() => setCaptions(null)}
                className="w-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-gray-300 py-3 rounded-xl transition font-semibold">
                Generate New Captions
              </button>
            </div>
          )}
        </div>
      </main>
    </ToolPageWrapper>
  );
}
