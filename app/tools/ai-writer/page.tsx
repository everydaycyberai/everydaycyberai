"use client";
import { useState } from "react";
import ToolPageWrapper from "@/components/ToolPageWrapper";

const TEMPLATES = [
  { id: "email",        label: "📧 Professional Email",   prompt: (t: string) => `Write a professional email about: ${t}. Make it formal, clear and concise with subject line.` },
  { id: "essay",        label: "📝 Essay / Article",      prompt: (t: string) => `Write a well-structured essay on: ${t}. Include introduction, main points and conclusion.` },
  { id: "cover_letter", label: "📄 Cover Letter",         prompt: (t: string) => `Write a professional cover letter for: ${t}. Make it compelling and highlight key skills.` },
  { id: "product_desc", label: "🛍️ Product Description",  prompt: (t: string) => `Write an engaging product description for: ${t}. Highlight features, benefits and call to action.` },
  { id: "social_post",  label: "📱 Social Media Post",    prompt: (t: string) => `Write an engaging social media post about: ${t}. Make it catchy with relevant hashtags.` },
  { id: "summary",      label: "📋 Summarize Text",       prompt: (t: string) => `Summarize the following text in clear bullet points:\n\n${t}` },
  { id: "complaint",    label: "⚠️ Complaint Letter",     prompt: (t: string) => `Write a formal complaint letter about: ${t}. Be firm but professional.` },
  { id: "custom",       label: "✨ Custom Prompt",         prompt: (t: string) => t },
];

const TONES = ["Professional", "Friendly", "Formal", "Casual", "Persuasive", "Simple"];

export default function AIWriterPage() {
  const [template, setTemplate] = useState(TEMPLATES[0].id);
  const [topic, setTopic]       = useState("");
  const [tone, setTone]         = useState("Professional");
  const [output, setOutput]     = useState("");
  const [loading, setLoading]   = useState(false);
  const [copied, setCopied]     = useState(false);
  const [wordCount, setWordCount] = useState(200);

  const generate = async () => {
    if (!topic.trim()) return;
    setLoading(true); setOutput("");
    const tmpl = TEMPLATES.find(t => t.id === template)!;
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemPrompt: `You are a professional writer. Write in a ${tone.toLowerCase()} tone. Be helpful, clear and direct. Respond only with the written content, no meta-commentary.`,
          userPrompt: tmpl.prompt(topic) + `\n\nTarget length: approximately ${wordCount} words.`,
        }),
      });
      const data = await res.json();
      setOutput(data.text || data.error || "Could not generate. Please try again.");
    } catch {
      setOutput("Something went wrong. Please try again.");
    } finally { setLoading(false); }
  };

  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <ToolPageWrapper badge="AI Tool">
      <main className="px-6 py-12 pb-24 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-block bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-4 py-1.5 rounded-full text-xs mb-4">Powered by Claude AI</div>
            <h1 className="text-5xl font-bold mb-4">AI Writing Assistant</h1>
            <p className="text-gray-400">Write emails, essays, cover letters, product descriptions and more — free AI writer India</p>
          </div>

          <div className="bg-black/40 backdrop-blur-sm border border-zinc-700/60 rounded-3xl p-8 space-y-6">
            <div>
              <label className="block text-gray-300 font-medium mb-3">What do you want to write?</label>
              <div className="grid grid-cols-2 gap-2">
                {TEMPLATES.map(t => (
                  <button key={t.id} onClick={() => setTemplate(t.id)}
                    className={`text-left px-4 py-2.5 rounded-xl text-sm border transition ${template===t.id?"bg-cyan-500/20 border-cyan-500/50 text-cyan-400":"bg-black/40 border-zinc-700/50 text-gray-400 hover:border-zinc-600"}`}>
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gray-300 font-medium mb-2">
                {template==="custom"?"Enter your full prompt":template==="summary"?"Paste text to summarize":"Topic / Subject"}
              </label>
              <textarea rows={4} value={topic} onChange={e => setTopic(e.target.value)}
                placeholder={
                  template==="email"?"e.g. Request for leave on Monday due to medical appointment":
                  template==="essay"?"e.g. Impact of AI on jobs in India":
                  template==="cover_letter"?"e.g. Software Engineer at TCS, 2 years React experience":
                  template==="summary"?"Paste the text you want to summarize...":
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
                      className={`text-xs px-3 py-1.5 rounded-lg border transition ${tone===t?"bg-cyan-500/20 border-cyan-500/40 text-cyan-400":"bg-black/40 border-zinc-700/50 text-gray-500 hover:border-zinc-600"}`}>
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

            <button onClick={generate} disabled={loading||!topic.trim()}
              className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-black py-4 rounded-2xl font-bold text-lg transition hover:shadow-[0_0_25px_rgba(34,211,238,0.4)]">
              {loading?"✨ Writing...":"✨ Generate with AI"}
            </button>

            {(loading||output) && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400 text-sm font-medium">Generated Content</span>
                  {output && (
                    <button onClick={copy}
                      className={`text-xs px-3 py-1 rounded-lg transition ${copied?"bg-green-500/20 text-green-400":"bg-zinc-800 text-gray-400 hover:text-cyan-400"}`}>
                      {copied?"✓ Copied":"Copy"}
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
                {output && <p className="text-gray-600 text-xs mt-2">{output.split(/\s+/).filter(Boolean).length} words</p>}
              </div>
            )}
          </div>

          <div className="mt-6 bg-black/40 border border-zinc-700/60 rounded-2xl p-5">
            <h2 className="text-cyan-400 font-semibold mb-3">💡 Tips for best results</h2>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-400">
              {["Be specific in your topic","Mention recipient name in email","Add key details (experience, skills)","Choose the right tone","Review and personalize output","Use as a starting point, not final"].map(t=>(
                <div key={t} className="flex items-start gap-2"><span className="text-cyan-500 shrink-0">✓</span>{t}</div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </ToolPageWrapper>
  );
}
