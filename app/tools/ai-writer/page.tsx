"use client";
import { useState } from "react";
import ToolPageWrapper from "@/components/ToolPageWrapper";

type TemplateId = "email" | "essay" | "cover_letter" | "paraphrase" | "product_desc" | "social_post" | "summary" | "complaint" | "custom";

const TEMPLATES: { id: TemplateId; label: string; instructions: (t: string, wc: number) => string }[] = [
  {
    id: "email", label: "📧 Professional Email",
    instructions: (t, wc) => `Write a professional email about: ${t}

Structure it as a real email: a clear subject line, an appropriate greeting, a body that gets to the point in the first sentence or two (don't bury the ask), and a proper sign-off. Match the level of formality to the context — a leave request and a client escalation should not sound the same. Keep it around ${wc} words including the subject line.`,
  },
  {
    id: "essay", label: "📝 Essay / Article",
    instructions: (t, wc) => `Write a well-structured essay on: ${t}

Open with a specific, concrete point — not a broad generalization like "In today's world..." or "Since the beginning of time...". Each paragraph should carry one clear idea forward. Use specific examples or reasoning rather than vague claims. End with a conclusion that adds a final thought, not just a summary of what was already said. Target length: approximately ${wc} words.`,
  },
  {
    id: "cover_letter", label: "📄 Cover Letter",
    instructions: (t, wc) => `Write a job cover letter for: ${t}

Open with something specific to this role or company — not "I am writing to express my interest in...". Connect the candidate's actual experience to what the role likely needs, using concrete examples rather than generic claims like "hard-working" or "team player" without evidence. Keep paragraphs short. Close with a direct, confident final line. Approximately ${wc} words.`,
  },
  {
    id: "paraphrase", label: "🔄 Paraphraser",
    instructions: (t) => `Rewrite the following text in different words while preserving its exact meaning and all key facts/numbers. Vary sentence structure, not just swap synonyms — a good paraphrase reads like it was written independently, not word-substituted. Keep the same approximate length as the original.\n\nText to paraphrase:\n"""${t}"""`,
  },
  {
    id: "product_desc", label: "🛍️ Product Description",
    instructions: (t, wc) => `Write a product description for: ${t}

Lead with the single most compelling benefit, not a feature list. Translate features into what they actually mean for the buyer (e.g. not "10000mAh battery" but "lasts a full day without charging"). End with a clear reason to act now. Approximately ${wc} words.`,
  },
  {
    id: "social_post", label: "📱 Social Media Post",
    instructions: (t, wc) => `Write a social media post about: ${t}

Hook the reader in the first line — no slow build-up. Write like a real person posting, not a brand press release. Add 3-5 relevant hashtags at the end, not stuffed mid-sentence. Keep it tight: approximately ${wc} words.`,
  },
  {
    id: "summary", label: "📋 Summarize Text",
    instructions: (t) => `Summarize the following text in clear, specific bullet points. Each bullet should capture one distinct point — don't repeat the same idea in different words across bullets. Preserve key numbers, names and facts exactly. Cut anything that's filler in the original.\n\nText to summarize:\n"""${t}"""`,
  },
  {
    id: "complaint", label: "⚠️ Complaint Letter",
    instructions: (t, wc) => `Write a formal complaint letter about: ${t}

State the issue factually in the first paragraph — what happened, when, and the impact — without emotional language. Reference any relevant order/reference numbers if mentioned. State clearly what resolution is expected. Stay firm without being aggressive. Approximately ${wc} words.`,
  },
  {
    id: "custom", label: "✨ Custom Prompt",
    instructions: (t) => t,
  },
];

const TONES = ["Professional", "Friendly", "Formal", "Casual", "Persuasive", "Simple"];

const QUALITY_RULES = `Writing quality rules — follow these strictly:
- Never open with generic phrases like "In today's fast-paced world", "In the ever-evolving landscape of...", "Since time immemorial", or similar throat-clearing.
- Avoid AI-sounding filler words: "moreover", "furthermore", "in conclusion", "it is important to note that", "delve into", "tapestry", "unleash", "unlock the power of".
- Be specific and concrete rather than vague — use real examples, numbers, or details instead of generic claims.
- Vary sentence length naturally — don't make every sentence the same length and structure.
- Don't repeat the same point in different words to pad length — every sentence should add something new.
- Write like a skilled human professional, not like a template being filled in.
- Output ONLY the final written content — no meta-commentary, no "Here's your email:", no explanations before or after.`;

export default function AIWriterPage() {
  const [template, setTemplate]   = useState<TemplateId>(TEMPLATES[0].id);
  const [topic, setTopic]         = useState("");
  const [tone, setTone]           = useState("Professional");
  const [output, setOutput]       = useState("");
  const [loading, setLoading]     = useState(false);
  const [copied, setCopied]       = useState(false);
  const [wordCount, setWordCount] = useState(200);

  const buildAndSend = async (extraInstruction?: string) => {
    setLoading(true); setOutput("");
    const tmpl = TEMPLATES.find(t => t.id === template)!;
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemPrompt: `You are an excellent, experienced human writer — not a generic AI assistant. Write in a ${tone.toLowerCase()} tone.\n\n${QUALITY_RULES}`,
          userPrompt: tmpl.instructions(topic, wordCount) + (extraInstruction ? `\n\n${extraInstruction}` : ""),
        }),
      });
      const data = await res.json();
      setOutput(data.text || data.error || "Could not generate. Please try again.");
    } catch {
      setOutput("Something went wrong. Please try again.");
    } finally { setLoading(false); }
  };

  const generate = () => { if (topic.trim()) buildAndSend(); };
  const regenerate = () => buildAndSend("Write a fresh version — different opening, different structure than a typical response, same requirements.");
  const makeShorter = () => buildAndSend(`Here is a previous version to revise:\n"""${output}"""\n\nMake it noticeably shorter and tighter while keeping the key points.`);
  const makeLonger = () => buildAndSend(`Here is a previous version to revise:\n"""${output}"""\n\nExpand it with more relevant detail and depth while keeping the same quality rules.`);

  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <ToolPageWrapper badge="AI Tool — Free">
      <main className="px-6 py-12 pb-24 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-block bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-4 py-1.5 rounded-full text-xs mb-4">
              ⚡ Powered by Groq + Llama AI — Free
            </div>
            <h1 className="text-5xl font-bold mb-4">AI Writing Assistant</h1>
            <p className="text-gray-400">Write emails, essays, cover letters and more — free AI writer for India, no login needed</p>
          </div>

          <div className="bg-black/40 backdrop-blur-sm border border-zinc-700/60 rounded-3xl p-8 space-y-6">
            <div>
              <label className="block text-gray-300 font-medium mb-3">What do you want to write?</label>
              <div className="grid grid-cols-2 gap-2">
                {TEMPLATES.map(t => (
                  <button key={t.id} onClick={() => setTemplate(t.id)}
                    className={`text-left px-4 py-2.5 rounded-xl text-sm border transition ${template===t.id ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400" : "bg-black/40 border-zinc-700/50 text-gray-400 hover:border-zinc-600"}`}>
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gray-300 font-medium mb-2">
                {template==="custom" ? "Enter your full prompt" :
                 template==="summary" || template==="paraphrase" ? "Paste your text here" :
                 "Topic / Subject"}
              </label>
              <textarea rows={4} value={topic} onChange={e => setTopic(e.target.value)}
                placeholder={
                  template==="email" ? "e.g. Request for leave on Monday due to medical appointment" :
                  template==="essay" ? "e.g. Impact of AI on jobs in India" :
                  template==="cover_letter" ? "e.g. Software Engineer at TCS, 2 years React experience" :
                  template==="paraphrase" ? "Paste the text you want to rewrite/paraphrase here..." :
                  template==="summary" ? "Paste the text you want to summarize here..." :
                  "Describe what you want to write..."
                }
                className="w-full bg-black/60 border border-zinc-700/60 rounded-2xl px-5 py-4 text-white resize-none outline-none focus:border-cyan-400 transition text-sm"/>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Tone</label>
                <div className="flex flex-wrap gap-2">
                  {TONES.map(t => (
                    <button key={t} onClick={() => setTone(t)}
                      className={`text-xs px-3 py-1.5 rounded-lg border transition ${tone===t ? "bg-cyan-500/20 border-cyan-500/40 text-cyan-400" : "bg-black/40 border-zinc-700/50 text-gray-500 hover:border-zinc-600"}`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Length: ~{wordCount} words</label>
                <input type="range" min={50} max={500} step={50} value={wordCount}
                  onChange={e => setWordCount(Number(e.target.value))} className="w-full accent-cyan-400"/>
                <div className="flex justify-between text-xs text-gray-600 mt-1"><span>Short</span><span>Long</span></div>
              </div>
            </div>

            <button onClick={generate} disabled={loading || !topic.trim()}
              className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-black py-4 rounded-2xl font-bold text-lg transition hover:shadow-[0_0_25px_rgba(34,211,238,0.4)]">
              {loading ? "✨ Writing..." : "✨ Generate with AI"}
            </button>

            {(loading || output) && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400 text-sm font-medium">Generated Content</span>
                  {output && (
                    <button onClick={copy}
                      className={`text-xs px-3 py-1 rounded-lg transition ${copied ? "bg-green-500/20 text-green-400" : "bg-zinc-800 text-gray-400 hover:text-cyan-400"}`}>
                      {copied ? "✓ Copied" : "Copy"}
                    </button>
                  )}
                </div>
                <div className="bg-black/60 border border-zinc-700/60 rounded-2xl p-5 min-h-[120px]">
                  {loading ? (
                    <div className="flex items-center gap-3 text-gray-400">
                      <div className="w-5 h-5 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"/>
                      <span className="text-sm">AI is writing your content...</span>
                    </div>
                  ) : (
                    <pre className="text-gray-200 text-sm leading-relaxed whitespace-pre-wrap font-sans">{output}</pre>
                  )}
                </div>
                {output && !loading && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    <button onClick={regenerate} className="text-xs px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-gray-300 hover:border-cyan-400 hover:text-cyan-400 transition">
                      🔄 Try Again
                    </button>
                    <button onClick={makeShorter} className="text-xs px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-gray-300 hover:border-cyan-400 hover:text-cyan-400 transition">
                      ✂️ Make Shorter
                    </button>
                    <button onClick={makeLonger} className="text-xs px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-gray-300 hover:border-cyan-400 hover:text-cyan-400 transition">
                      ➕ Make Longer
                    </button>
                  </div>
                )}
                {output && !loading && <p className="text-gray-600 text-xs mt-2">{output.split(/\s+/).filter(Boolean).length} words generated</p>}
              </div>
            )}
          </div>

          <div className="mt-6 bg-black/40 border border-zinc-700/60 rounded-2xl p-5">
            <h2 className="text-cyan-400 font-semibold mb-3">💡 Tips for best results</h2>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-400">
              {["Be specific in your topic","Mention recipient name for emails","Add key details (experience, skills)","Choose the right tone","Review and personalize output","Use as starting point, not final"].map(t => (
                <div key={t} className="flex items-start gap-2"><span className="text-cyan-500 shrink-0">✓</span>{t}</div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </ToolPageWrapper>
  );
}
