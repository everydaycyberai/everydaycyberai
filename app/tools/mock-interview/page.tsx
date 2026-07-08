"use client";
import { useState } from "react";
import ToolPageWrapper from "@/components/ToolPageWrapper";

type QA = { question: string; tip: string };

const LEVELS = ["Fresher / Entry Level", "1-3 Years Experience", "3-6 Years Experience", "6+ Years / Senior"];

export default function MockInterviewPage() {
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [level, setLevel] = useState(LEVELS[0]);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QA[] | null>(null);
  const [error, setError] = useState("");

  const generate = async () => {
    if (!role.trim()) return;
    setLoading(true); setError(""); setQuestions(null);

    const prompt = `Generate 8 realistic interview questions for this candidate:
Role: ${role}
Company: ${company || "Not specified — generate general questions for this role"}
Experience Level: ${level}

For each question, include a short tip (1-2 sentences) on how to approach answering it well.
Mix technical, behavioral and situational questions appropriate for the experience level.

Respond ONLY with a valid JSON array in this exact format, no markdown, no extra text:
[{"question": "...", "tip": "..."}, ...]`;

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemPrompt: "You are an experienced hiring manager and interview coach in India. Generate realistic, specific interview questions — not generic ones. Always respond with valid JSON only, no markdown formatting, no text outside the JSON array.",
          userPrompt: prompt,
        }),
      });
      const data = await res.json();
      const text = data.text || "";
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        setQuestions(JSON.parse(jsonMatch[0]));
      } else {
        throw new Error("Invalid response");
      }
    } catch {
      setError("Could not generate questions right now — please try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolPageWrapper badge="🎤 Career Tool">
      <main className="px-6 py-12 pb-24 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">AI Mock Interview Generator</h1>
            <p className="text-gray-400">Get realistic interview questions with answer tips — practice before the real thing. Free, instant.</p>
          </div>

          {!questions && (
            <div className="bg-black/40 backdrop-blur-sm border border-zinc-700/60 rounded-3xl p-8 space-y-5">
              <div>
                <label className="block text-gray-300 font-medium mb-2">Job Role</label>
                <input value={role} onChange={e => setRole(e.target.value)} placeholder="e.g. Frontend Developer, Data Analyst, Sales Executive"
                  className="w-full bg-black/80 border border-zinc-700 rounded-2xl px-5 py-3 text-white outline-none focus:border-cyan-400 transition" />
              </div>
              <div>
                <label className="block text-gray-300 font-medium mb-2">Company (optional)</label>
                <input value={company} onChange={e => setCompany(e.target.value)} placeholder="e.g. TCS, Zomato, a startup"
                  className="w-full bg-black/80 border border-zinc-700 rounded-2xl px-5 py-3 text-white outline-none focus:border-cyan-400 transition" />
              </div>
              <div>
                <label className="block text-gray-300 font-medium mb-3">Experience Level</label>
                <div className="grid grid-cols-2 gap-2">
                  {LEVELS.map(l => (
                    <button key={l} onClick={() => setLevel(l)}
                      className={`py-2.5 rounded-xl text-sm font-medium border transition ${level === l ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400" : "bg-zinc-800 border-zinc-700 text-gray-400"}`}>
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              {error && <p className="text-red-400 text-sm">⚠️ {error}</p>}

              <button onClick={generate} disabled={loading || !role.trim()}
                className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-black py-4 rounded-2xl font-bold text-lg transition">
                {loading ? "Generating questions..." : "🎤 Generate Interview Questions"}
              </button>
            </div>
          )}

          {questions && (
            <div className="space-y-4">
              {questions.map((q, i) => (
                <div key={i} className="bg-black/40 backdrop-blur-sm border border-zinc-700/60 rounded-2xl p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-cyan-500 text-black flex items-center justify-center text-sm font-bold shrink-0">{i + 1}</div>
                    <h3 className="text-white font-semibold text-lg pt-1">{q.question}</h3>
                  </div>
                  <div className="ml-11 bg-cyan-500/10 border border-cyan-500/20 rounded-xl px-4 py-3">
                    <p className="text-cyan-300 text-sm">💡 {q.tip}</p>
                  </div>
                </div>
              ))}
              <button onClick={() => setQuestions(null)}
                className="w-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-gray-300 py-3 rounded-xl transition font-semibold">
                Generate New Questions
              </button>
            </div>
          )}
        </div>
      </main>
    </ToolPageWrapper>
  );
}
