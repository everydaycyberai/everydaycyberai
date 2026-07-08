"use client";
import { useState } from "react";
import ToolPageWrapper from "@/components/ToolPageWrapper";

const TONES = ["Professional", "Friendly", "Confident", "Enthusiastic"];

export default function CoverLetterGeneratorPage() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [experience, setExperience] = useState("");
  const [tone, setTone] = useState(TONES[0]);
  const [loading, setLoading] = useState(false);
  const [letter, setLetter] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = async () => {
    if (!name.trim() || !role.trim()) return;
    setLoading(true); setError(""); setLetter("");

    const prompt = `Write a cover letter for a job application:
Candidate name: ${name}
Applying for role: ${role}
Company: ${company || "the company"}
Relevant background/experience: ${experience || "Not specified — write a general but credible cover letter for this role"}
Tone: ${tone}

Write a complete, ready-to-send cover letter (3-4 short paragraphs). Keep it concise, specific, and free of generic filler phrases. Do not use placeholder brackets like [Company Name] — use the actual details given, or write naturally around missing details.`;

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemPrompt: "You are a professional career writer who writes concise, specific, non-generic cover letters for Indian job seekers. Avoid cliches like 'I am writing to express my interest'. Write naturally and directly.",
          userPrompt: prompt,
        }),
      });
      const data = await res.json();
      if (data.text) setLetter(data.text.trim());
      else throw new Error();
    } catch {
      setError("Could not generate a cover letter right now — please try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  const copyLetter = () => {
    navigator.clipboard.writeText(letter);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <ToolPageWrapper badge="✉️ Career Tool">
      <main className="px-6 py-12 pb-24 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">AI Cover Letter Generator</h1>
            <p className="text-gray-400">Get a ready-to-send cover letter in seconds — free, no login. Pairs great with our Resume Builder.</p>
          </div>

          {!letter && (
            <div className="bg-black/40 backdrop-blur-sm border border-zinc-700/60 rounded-3xl p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 font-medium mb-2 text-sm">Your Name</label>
                  <input value={name} onChange={e => setName(e.target.value)} placeholder="Full name"
                    className="w-full bg-black/80 border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400 transition" />
                </div>
                <div>
                  <label className="block text-gray-300 font-medium mb-2 text-sm">Role Applying For</label>
                  <input value={role} onChange={e => setRole(e.target.value)} placeholder="e.g. Marketing Intern"
                    className="w-full bg-black/80 border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400 transition" />
                </div>
              </div>
              <div>
                <label className="block text-gray-300 font-medium mb-2 text-sm">Company</label>
                <input value={company} onChange={e => setCompany(e.target.value)} placeholder="Company name"
                  className="w-full bg-black/80 border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400 transition" />
              </div>
              <div>
                <label className="block text-gray-300 font-medium mb-2 text-sm">Your relevant experience/skills</label>
                <textarea value={experience} onChange={e => setExperience(e.target.value)} rows={4}
                  placeholder="e.g. 2 years in digital marketing, ran Instagram campaigns, good with Canva and analytics..."
                  className="w-full bg-black/80 border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400 transition resize-none" />
              </div>
              <div>
                <label className="block text-gray-300 font-medium mb-3 text-sm">Tone</label>
                <div className="grid grid-cols-4 gap-2">
                  {TONES.map(t => (
                    <button key={t} onClick={() => setTone(t)}
                      className={`py-2.5 rounded-xl text-sm font-medium border transition ${tone === t ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400" : "bg-zinc-800 border-zinc-700 text-gray-400"}`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {error && <p className="text-red-400 text-sm">⚠️ {error}</p>}

              <button onClick={generate} disabled={loading || !name.trim() || !role.trim()}
                className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-black py-4 rounded-2xl font-bold text-lg transition">
                {loading ? "✍️ Writing your cover letter..." : "✍️ Generate Cover Letter"}
              </button>
            </div>
          )}

          {letter && (
            <div className="space-y-4">
              <div className="bg-white text-black rounded-2xl p-8 whitespace-pre-wrap leading-relaxed">
                {letter}
              </div>
              <div className="flex gap-3">
                <button onClick={copyLetter}
                  className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-black py-3 rounded-xl font-bold transition">
                  {copied ? "✅ Copied!" : "📋 Copy Letter"}
                </button>
                <button onClick={() => setLetter("")}
                  className="flex-1 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-gray-300 py-3 rounded-xl transition font-semibold">
                  Generate Another
                </button>
              </div>
              <a href="/tools/resume-builder" className="block text-center text-cyan-400 text-sm hover:underline">
                Need a resume too? Try our free Resume Builder →
              </a>
            </div>
          )}
        </div>
      </main>
    </ToolPageWrapper>
  );
}
