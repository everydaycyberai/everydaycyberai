"use client";
import { useState } from "react";
import ToolPageWrapper from "@/components/ToolPageWrapper";

const EMAIL_TYPES = [
  { id: "leave",       label: "🏖️ Leave Application",   hint: "Sick leave, casual leave, medical" },
  { id: "job_apply",   label: "💼 Job Application",      hint: "Apply for job via email" },
  { id: "follow_up",   label: "🔁 Follow Up",            hint: "Follow up on interview, proposal" },
  { id: "complaint",   label: "⚠️ Complaint",            hint: "Complaint to company, bank" },
  { id: "thank_you",   label: "🙏 Thank You",            hint: "Thank you after interview, meeting" },
  { id: "introduction",label: "👋 Introduction",         hint: "Introduce yourself professionally" },
  { id: "resignation", label: "📤 Resignation",          hint: "Resign from job professionally" },
  { id: "request",     label: "📩 Request / Inquiry",    hint: "Request info, service, meeting" },
];

export default function AIEmailPage() {
  const [emailType, setEmailType] = useState(EMAIL_TYPES[0].id);
  const [details, setDetails]     = useState("");
  const [toName, setToName]       = useState("");
  const [fromName, setFromName]   = useState("");
  const [output, setOutput]       = useState("");
  const [loading, setLoading]     = useState(false);
  const [copied, setCopied]       = useState(false);

  const generate = async () => {
    if (!details.trim()) return;
    setLoading(true); setOutput("");
    const type = EMAIL_TYPES.find(e => e.id === emailType)!;
    const userPrompt = `Write a professional ${type.label.replace(/[^\w\s]/gi,"").trim()} email.
${toName ? `To: ${toName}` : ""}
${fromName ? `From: ${fromName}` : ""}
Details: ${details}

Requirements:
- Professional and polite tone
- Clear subject line at the top (Subject: ...)
- Proper format: greeting, body paragraphs, closing signature
- Concise and to the point
- Indian professional workplace context`;

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemPrompt: "You are an expert professional email writer for Indian workplace context. Always start with 'Subject: ...' then a blank line, then the email body. Output only the email, nothing else.",
          userPrompt,
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
            <h1 className="text-5xl font-bold mb-4">AI Email Generator</h1>
            <p className="text-gray-400">Generate professional emails in seconds — leave application, job application, complaints and more. Free AI email writer India.</p>
          </div>

          <div className="bg-black/40 backdrop-blur-sm border border-zinc-700/60 rounded-3xl p-8 space-y-5">
            <div>
              <label className="block text-gray-300 font-medium mb-3">Email Type</label>
              <div className="grid grid-cols-2 gap-2">
                {EMAIL_TYPES.map(e => (
                  <button key={e.id} onClick={() => setEmailType(e.id)}
                    className={`text-left px-4 py-3 rounded-xl text-sm border transition ${emailType===e.id?"bg-cyan-500/20 border-cyan-500/50 text-cyan-400":"bg-black/40 border-zinc-700/50 text-gray-400 hover:border-zinc-600"}`}>
                    <div className="font-medium">{e.label}</div>
                    <div className="text-xs opacity-60 mt-0.5">{e.hint}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-gray-400 text-xs mb-1">Your Name</label>
                <input type="text" placeholder="e.g. Rahul Sharma" value={fromName} onChange={e=>setFromName(e.target.value)}
                  className="w-full bg-black/60 border border-zinc-700/60 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-cyan-400 transition"/>
              </div>
              <div>
                <label className="block text-gray-400 text-xs mb-1">Recipient / Company</label>
                <input type="text" placeholder="e.g. HR Manager / TCS" value={toName} onChange={e=>setToName(e.target.value)}
                  className="w-full bg-black/60 border border-zinc-700/60 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-cyan-400 transition"/>
              </div>
            </div>

            <div>
              <label className="block text-gray-300 font-medium mb-2">Key Details / Reason *</label>
              <textarea rows={4} value={details} onChange={e=>setDetails(e.target.value)}
                placeholder={
                  emailType==="leave"?"e.g. Need leave on Monday and Tuesday for fever. I am working on Project XYZ.":
                  emailType==="job_apply"?"e.g. Applying for Software Engineer. 2 years React experience. B.Tech 2022 Mumbai University.":
                  emailType==="complaint"?"e.g. Internet not working at account 12345 since 3 days despite multiple calls.":
                  "Describe the key details, reason, or specific information to include..."
                }
                className="w-full bg-black/60 border border-zinc-700/60 rounded-2xl px-5 py-4 text-white resize-none outline-none focus:border-cyan-400 transition text-sm"/>
            </div>

            <button onClick={generate} disabled={loading||!details.trim()}
              className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-black py-4 rounded-2xl font-bold text-lg transition hover:shadow-[0_0_25px_rgba(34,211,238,0.4)]">
              {loading?"✉️ Writing Email...":"✉️ Generate Email"}
            </button>

            {(loading||output) && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400 text-sm font-medium">Your Email</span>
                  {output && (
                    <button onClick={copy}
                      className={`text-xs px-3 py-1 rounded-lg transition ${copied?"bg-green-500/20 text-green-400":"bg-zinc-800 text-gray-400 hover:text-cyan-400"}`}>
                      {copied?"✓ Copied":"Copy Email"}
                    </button>
                  )}
                </div>
                <div className="bg-black/60 border border-zinc-700/60 rounded-2xl p-5 min-h-[140px]">
                  {loading ? (
                    <div className="flex items-center gap-3 text-gray-400">
                      <div className="w-5 h-5 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"/>
                      <span className="text-sm">Writing your email...</span>
                    </div>
                  ) : (
                    <pre className="text-gray-200 text-sm leading-relaxed whitespace-pre-wrap font-sans">{output}</pre>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 bg-black/40 border border-zinc-700/60 rounded-2xl p-5">
            <h2 className="text-cyan-400 font-semibold mb-3">📧 Most used email types</h2>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-400">
              {["Leave application to manager","Job application with resume intro","Follow up after interview","Complaint to ISP / bank / company","Thank you after job interview","Salary increment request"].map(t=>(
                <div key={t} className="flex items-center gap-2"><span className="text-cyan-500">✓</span>{t}</div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </ToolPageWrapper>
  );
}
