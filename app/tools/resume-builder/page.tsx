"use client";
import { useState, useRef } from "react";
import ToolPageWrapper from "@/components/ToolPageWrapper";

type Experience = { company: string; role: string; duration: string; description: string };
type Education  = { institution: string; degree: string; year: string; grade: string };
type Project    = { name: string; tech: string; description: string };

type ResumeData = {
  // Personal
  name: string; email: string; phone: string; location: string;
  linkedin: string; github: string; portfolio: string;
  summary: string;
  // Sections
  skills: string;
  experience: Experience[];
  education: Education[];
  projects: Project[];
  // Settings
  template: "modern" | "classic" | "minimal";
  accentColor: string;
};

const EMPTY_EXP: Experience = { company: "", role: "", duration: "", description: "" };
const EMPTY_EDU: Education  = { institution: "", degree: "", year: "", grade: "" };
const EMPTY_PRJ: Project    = { name: "", tech: "", description: "" };

const TEMPLATES = [
  { id: "modern",  label: "Modern",  desc: "Sidebar layout, bold headers" },
  { id: "classic", label: "Classic", desc: "Clean single column, professional" },
  { id: "minimal", label: "Minimal", desc: "Ultra-clean, ATS friendly" },
] as const;

const COLORS = [
  { id: "#0891b2", label: "Cyan" },
  { id: "#7c3aed", label: "Purple" },
  { id: "#059669", label: "Green" },
  { id: "#dc2626", label: "Red" },
  { id: "#d97706", label: "Amber" },
  { id: "#1d4ed8", label: "Blue" },
];

export default function ResumeBuilderPage() {
  const previewRef = useRef<HTMLDivElement>(null);
  const [step, setStep]       = useState(0);
  const [downloading, setDownloading] = useState(false);

  const [data, setData] = useState<ResumeData>({
    name: "", email: "", phone: "", location: "",
    linkedin: "", github: "", portfolio: "",
    summary: "",
    skills: "",
    experience: [{ ...EMPTY_EXP }],
    education:  [{ ...EMPTY_EDU }],
    projects:   [{ ...EMPTY_PRJ }],
    template: "modern",
    accentColor: "#0891b2",
  });

  const set = (field: keyof ResumeData, value: unknown) =>
    setData(prev => ({ ...prev, [field]: value }));

  const updateExp = (i: number, f: keyof Experience, v: string) => {
    const arr = [...data.experience]; arr[i] = { ...arr[i], [f]: v };
    set("experience", arr);
  };
  const updateEdu = (i: number, f: keyof Education, v: string) => {
    const arr = [...data.education]; arr[i] = { ...arr[i], [f]: v };
    set("education", arr);
  };
  const updatePrj = (i: number, f: keyof Project, v: string) => {
    const arr = [...data.projects]; arr[i] = { ...arr[i], [f]: v };
    set("projects", arr);
  };

  const downloadPDF = async () => {
    if (!previewRef.current) return;
    setDownloading(true);
    try {
      const { default: html2canvas } = await import("html2canvas");
      const { jsPDF } = await import("jspdf");
      const canvas = await html2canvas(previewRef.current, {
        scale: 2, useCORS: true, backgroundColor: "#ffffff",
        width: previewRef.current.scrollWidth,
        height: previewRef.current.scrollHeight,
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pdfW = pdf.internal.pageSize.getWidth();
      const pdfH = (canvas.height * pdfW) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfW, pdfH);
      pdf.save(`${data.name || "resume"}-resume.pdf`);
    } catch (e) { console.error(e); alert("Download failed. Please try again."); }
    finally { setDownloading(false); }
  };

  const inputCls = "w-full bg-black/60 border border-zinc-700/60 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-cyan-400 transition placeholder-gray-600";
  const labelCls = "block text-gray-300 text-xs font-medium mb-1";

  const STEPS = ["Template", "Personal", "Summary & Skills", "Experience", "Education", "Projects", "Preview & Download"];

  // ── Resume Preview ──────────────────────────────────────────
  const Preview = () => {
    const ac = data.accentColor;
    const skillsList = data.skills.split(",").map(s => s.trim()).filter(Boolean);

    if (data.template === "modern") return (
      <div ref={previewRef} className="w-full" style={{fontFamily:"Arial,sans-serif", minHeight:"297mm", backgroundColor:"#ffffff", color:"#1f2937"}}>
        {/* Header */}
        <div style={{background: ac, padding:"28px 32px 20px"}}>
          <h1 style={{color:"#fff", fontSize:28, fontWeight:700, margin:0}}>{data.name || "Your Name"}</h1>
          <div style={{display:"flex", flexWrap:"wrap", gap:16, marginTop:8}}>
            {[data.email, data.phone, data.location].filter(Boolean).map(v=>(
              <span key={v} style={{color:"rgba(255,255,255,0.9)", fontSize:12}}>{v}</span>
            ))}
          </div>
          {(data.linkedin||data.github||data.portfolio) && (
            <div style={{display:"flex", gap:16, marginTop:6}}>
              {[data.linkedin, data.github, data.portfolio].filter(Boolean).map(v=>(
                <span key={v} style={{color:"rgba(255,255,255,0.8)", fontSize:11}}>{v}</span>
              ))}
            </div>
          )}
        </div>

        <div style={{display:"flex", gap:0}}>
          {/* Left sidebar */}
          <div style={{width:"35%", background:"#f8fafc", padding:"20px 18px", borderRight:"1px solid #e2e8f0"}}>

            {data.summary && (
              <div style={{marginBottom:20}}>
                <h3 style={{color: ac, fontSize:13, fontWeight:700, textTransform:"uppercase", letterSpacing:1, marginBottom:8, paddingBottom:4, borderBottom:`2px solid ${ac}`}}>Profile</h3>
                <p style={{fontSize:11, lineHeight:1.6, color:"#4b5563"}}>{data.summary}</p>
              </div>
            )}

            {skillsList.length > 0 && (
              <div style={{marginBottom:20}}>
                <h3 style={{color: ac, fontSize:13, fontWeight:700, textTransform:"uppercase", letterSpacing:1, marginBottom:8, paddingBottom:4, borderBottom:`2px solid ${ac}`}}>Skills</h3>
                <div style={{display:"flex", flexWrap:"wrap", gap:6}}>
                  {skillsList.map(s=>(
                    <span key={s} style={{background: ac+"22", color: ac, fontSize:10, padding:"3px 8px", borderRadius:4, fontWeight:600}}>{s}</span>
                  ))}
                </div>
              </div>
            )}

            {data.education.filter(e=>e.institution).length > 0 && (
              <div>
                <h3 style={{color: ac, fontSize:13, fontWeight:700, textTransform:"uppercase", letterSpacing:1, marginBottom:8, paddingBottom:4, borderBottom:`2px solid ${ac}`}}>Education</h3>
                {data.education.filter(e=>e.institution).map((e,i)=>(
                  <div key={i} style={{marginBottom:12}}>
                    <div style={{fontWeight:700, fontSize:12}}>{e.degree}</div>
                    <div style={{color:"#6b7280", fontSize:11}}>{e.institution}</div>
                    <div style={{color:"#9ca3af", fontSize:10}}>{e.year}{e.grade ? ` • ${e.grade}` : ""}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right main */}
          <div style={{flex:1, padding:"20px 24px"}}>
            {data.experience.filter(e=>e.company).length > 0 && (
              <div style={{marginBottom:20}}>
                <h3 style={{color: ac, fontSize:13, fontWeight:700, textTransform:"uppercase", letterSpacing:1, marginBottom:12, paddingBottom:4, borderBottom:`2px solid ${ac}`}}>Experience</h3>
                {data.experience.filter(e=>e.company).map((e,i)=>(
                  <div key={i} style={{marginBottom:14}}>
                    <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start"}}>
                      <div>
                        <div style={{fontWeight:700, fontSize:13}}>{e.role}</div>
                        <div style={{color: ac, fontSize:12, fontWeight:600}}>{e.company}</div>
                      </div>
                      <div style={{color:"#9ca3af", fontSize:11, whiteSpace:"nowrap", marginLeft:8}}>{e.duration}</div>
                    </div>
                    {e.description && <p style={{color:"#4b5563", fontSize:11, marginTop:4, lineHeight:1.5}}>{e.description}</p>}
                  </div>
                ))}
              </div>
            )}

            {data.projects.filter(p=>p.name).length > 0 && (
              <div>
                <h3 style={{color: ac, fontSize:13, fontWeight:700, textTransform:"uppercase", letterSpacing:1, marginBottom:12, paddingBottom:4, borderBottom:`2px solid ${ac}`}}>Projects</h3>
                {data.projects.filter(p=>p.name).map((p,i)=>(
                  <div key={i} style={{marginBottom:12}}>
                    <div style={{display:"flex", justifyContent:"space-between"}}>
                      <span style={{fontWeight:700, fontSize:12}}>{p.name}</span>
                      {p.tech && <span style={{color:"#9ca3af", fontSize:10}}>{p.tech}</span>}
                    </div>
                    {p.description && <p style={{color:"#4b5563", fontSize:11, marginTop:3, lineHeight:1.5}}>{p.description}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );

    if (data.template === "classic") return (
      <div ref={previewRef} className="w-full" style={{fontFamily:"Georgia,serif", padding:"32px 40px", minHeight:"297mm", backgroundColor:"#ffffff", color:"#1f2937"}}>
        <div style={{textAlign:"center", borderBottom:`3px double ${data.accentColor}`, paddingBottom:16, marginBottom:20}}>
          <h1 style={{fontSize:26, fontWeight:700, color:"#1e293b", margin:0}}>{data.name || "Your Name"}</h1>
          <div style={{display:"flex", justifyContent:"center", flexWrap:"wrap", gap:12, marginTop:8}}>
            {[data.email, data.phone, data.location, data.linkedin].filter(Boolean).map(v=>(
              <span key={v} style={{color:"#6b7280", fontSize:11}}>{v}</span>
            ))}
          </div>
        </div>

        {data.summary && (<><div style={{fontWeight:700, fontSize:13, color: data.accentColor, textTransform:"uppercase", letterSpacing:1, marginBottom:6}}>Professional Summary</div><p style={{fontSize:12, lineHeight:1.7, color:"#374151", marginBottom:18}}>{data.summary}</p></>)}

        {data.experience.filter(e=>e.company).length > 0 && (<>
          <div style={{fontWeight:700, fontSize:13, color: data.accentColor, textTransform:"uppercase", letterSpacing:1, borderBottom:`1px solid #e2e8f0`, paddingBottom:4, marginBottom:10}}>Experience</div>
          {data.experience.filter(e=>e.company).map((e,i)=>(
            <div key={i} style={{marginBottom:14}}>
              <div style={{display:"flex", justifyContent:"space-between"}}>
                <span style={{fontWeight:700, fontSize:13}}>{e.role} — {e.company}</span>
                <span style={{color:"#9ca3af", fontSize:12}}>{e.duration}</span>
              </div>
              {e.description && <p style={{color:"#4b5563", fontSize:11, marginTop:4, lineHeight:1.6}}>{e.description}</p>}
            </div>
          ))}
        </>)}

        {skillsList.length > 0 && (<>
          <div style={{fontWeight:700, fontSize:13, color: data.accentColor, textTransform:"uppercase", letterSpacing:1, borderBottom:`1px solid #e2e8f0`, paddingBottom:4, marginBottom:10, marginTop:16}}>Skills</div>
          <p style={{fontSize:12, color:"#374151", lineHeight:1.7}}>{skillsList.join(" • ")}</p>
        </>)}

        {data.education.filter(e=>e.institution).length > 0 && (<>
          <div style={{fontWeight:700, fontSize:13, color: data.accentColor, textTransform:"uppercase", letterSpacing:1, borderBottom:`1px solid #e2e8f0`, paddingBottom:4, marginBottom:10, marginTop:16}}>Education</div>
          {data.education.filter(e=>e.institution).map((e,i)=>(
            <div key={i} style={{display:"flex", justifyContent:"space-between", marginBottom:8}}>
              <div><span style={{fontWeight:700, fontSize:12}}>{e.degree}</span><span style={{color:"#6b7280", fontSize:12}}> — {e.institution}</span></div>
              <span style={{color:"#9ca3af", fontSize:11}}>{e.year}{e.grade?` • ${e.grade}`:""}</span>
            </div>
          ))}
        </>)}
      </div>
    );

    // Minimal template
    return (
      <div ref={previewRef} className="w-full" style={{fontFamily:"'Arial',sans-serif", padding:"32px 36px", minHeight:"297mm", backgroundColor:"#ffffff", color:"#1f2937"}}>
        <h1 style={{fontSize:24, fontWeight:700, color:"#111827", margin:"0 0 4px"}}>{data.name || "Your Name"}</h1>
        <div style={{display:"flex", gap:12, flexWrap:"wrap", marginBottom:16}}>
          {[data.email, data.phone, data.location, data.linkedin, data.github].filter(Boolean).map(v=>(
            <span key={v} style={{color:"#6b7280", fontSize:11}}>{v}</span>
          ))}
        </div>
        <hr style={{border:"none", borderTop:`2px solid ${data.accentColor}`, marginBottom:16}}/>

        {data.summary && <p style={{fontSize:12, color:"#374151", lineHeight:1.7, marginBottom:16}}>{data.summary}</p>}

        {data.experience.filter(e=>e.company).length > 0 && (<>
          <div style={{fontSize:12, fontWeight:700, color:"#111827", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8}}>EXPERIENCE</div>
          {data.experience.filter(e=>e.company).map((e,i)=>(
            <div key={i} style={{marginBottom:12}}>
              <div style={{display:"flex", justifyContent:"space-between"}}>
                <span style={{fontWeight:600, fontSize:12}}>{e.role}, <span style={{color: data.accentColor}}>{e.company}</span></span>
                <span style={{color:"#9ca3af", fontSize:11}}>{e.duration}</span>
              </div>
              {e.description && <p style={{color:"#6b7280", fontSize:11, marginTop:3}}>{e.description}</p>}
            </div>
          ))}
          <hr style={{border:"none", borderTop:"1px solid #f1f5f9", margin:"12px 0"}}/>
        </>)}

        {data.education.filter(e=>e.institution).length > 0 && (<>
          <div style={{fontSize:12, fontWeight:700, color:"#111827", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8}}>EDUCATION</div>
          {data.education.filter(e=>e.institution).map((e,i)=>(
            <div key={i} style={{display:"flex", justifyContent:"space-between", marginBottom:8}}>
              <div><span style={{fontWeight:600, fontSize:12}}>{e.degree}</span><span style={{color:"#6b7280", fontSize:12}}>, {e.institution}</span></div>
              <span style={{color:"#9ca3af", fontSize:11}}>{e.year}</span>
            </div>
          ))}
          <hr style={{border:"none", borderTop:"1px solid #f1f5f9", margin:"12px 0"}}/>
        </>)}

        {skillsList.length > 0 && (<>
          <div style={{fontSize:12, fontWeight:700, color:"#111827", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8}}>SKILLS</div>
          <p style={{fontSize:12, color:"#374151"}}>{skillsList.join(" · ")}</p>
        </>)}

        {data.projects.filter(p=>p.name).length > 0 && (<>
          <hr style={{border:"none", borderTop:"1px solid #f1f5f9", margin:"12px 0"}}/>
          <div style={{fontSize:12, fontWeight:700, color:"#111827", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8}}>PROJECTS</div>
          {data.projects.filter(p=>p.name).map((p,i)=>(
            <div key={i} style={{marginBottom:10}}>
              <span style={{fontWeight:600, fontSize:12}}>{p.name}</span>
              {p.tech && <span style={{color:"#9ca3af", fontSize:11}}> · {p.tech}</span>}
              {p.description && <p style={{color:"#6b7280", fontSize:11, marginTop:2}}>{p.description}</p>}
            </div>
          ))}
        </>)}
      </div>
    );
  };

  // ── Step Forms ──────────────────────────────────────────────
  return (
    <ToolPageWrapper badge="Career Tool">
      <main className="px-4 py-12 pb-24 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">Resume Builder</h1>
            <p className="text-gray-400">Create a professional resume and download as PDF — free, no signup needed</p>
          </div>

          {/* Step indicator */}
          <div className="flex overflow-x-auto gap-1 mb-8 pb-1">
            {STEPS.map((s,i) => (
              <button key={i} onClick={() => setStep(i)}
                className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition border ${
                  step === i ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400"
                  : i < step ? "bg-green-500/10 border-green-500/20 text-green-400"
                  : "bg-black/40 border-zinc-700/60 text-gray-500"}`}>
                {i < step ? "✓ " : ""}{s}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Left — Form */}
            <div className="bg-black/40 backdrop-blur-sm border border-zinc-700/60 rounded-3xl p-6 space-y-4">

              {/* Step 0 — Template */}
              {step === 0 && (
                <div className="space-y-5">
                  <h2 className="text-xl font-bold text-cyan-400">Choose Template</h2>
                  <div className="space-y-3">
                    {TEMPLATES.map(t => (
                      <button key={t.id} onClick={() => set("template", t.id)}
                        className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition ${data.template===t.id?"bg-cyan-500/15 border-cyan-500/50":"bg-black/30 border-zinc-700/50 hover:border-zinc-600"}`}>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${data.template===t.id?"border-cyan-400":"border-zinc-600"}`}>
                          {data.template===t.id && <div className="w-2.5 h-2.5 rounded-full bg-cyan-400"/>}
                        </div>
                        <div className="text-left">
                          <p className={`font-semibold ${data.template===t.id?"text-cyan-400":"text-white"}`}>{t.label}</p>
                          <p className="text-gray-500 text-sm">{t.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm font-medium mb-3">Accent Color</p>
                    <div className="flex gap-3">
                      {COLORS.map(c => (
                        <button key={c.id} onClick={() => set("accentColor", c.id)} title={c.label}
                          className={`w-8 h-8 rounded-full transition hover:scale-110 border-2 ${data.accentColor===c.id?"border-white scale-110":"border-transparent"}`}
                          style={{background: c.id}}/>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 1 — Personal */}
              {step === 1 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-cyan-400">Personal Details</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      {f:"name",p:"Full Name *",col:2},
                      {f:"email",p:"Email Address *",col:1},
                      {f:"phone",p:"Phone Number *",col:1},
                      {f:"location",p:"City, State",col:1},
                      {f:"linkedin",p:"LinkedIn URL",col:1},
                      {f:"github",p:"GitHub URL",col:1},
                      {f:"portfolio",p:"Portfolio URL",col:1},
                    ].map(({f,p,col}) => (
                      <div key={f} className={col===2?"col-span-2":""}>
                        <label className={labelCls}>{p}</label>
                        <input type="text" placeholder={p} value={(data as Record<string,unknown>)[f] as string}
                          onChange={e => set(f as keyof ResumeData, e.target.value)}
                          className={inputCls}/>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2 — Summary & Skills */}
              {step === 2 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-cyan-400">Summary & Skills</h2>
                  <div>
                    <label className={labelCls}>Professional Summary</label>
                    <textarea rows={4} placeholder="Brief 2-3 line summary about yourself..." value={data.summary}
                      onChange={e => set("summary", e.target.value)}
                      className={inputCls + " resize-none"}/>
                  </div>
                  <div>
                    <label className={labelCls}>Skills (comma separated)</label>
                    <textarea rows={3} placeholder="React, Node.js, Python, SQL, Figma, MS Office..." value={data.skills}
                      onChange={e => set("skills", e.target.value)}
                      className={inputCls + " resize-none"}/>
                    <p className="text-gray-600 text-xs mt-1">e.g. JavaScript, HTML/CSS, Git, Communication</p>
                  </div>
                </div>
              )}

              {/* Step 3 — Experience */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-cyan-400">Work Experience</h2>
                    <button onClick={() => set("experience",[...data.experience,{...EMPTY_EXP}])}
                      className="text-xs bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-3 py-1.5 rounded-lg hover:bg-cyan-500/20 transition">
                      + Add More
                    </button>
                  </div>
                  {data.experience.map((exp,i) => (
                    <div key={i} className="bg-black/30 border border-zinc-800/60 rounded-2xl p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-cyan-400 text-sm font-semibold">Experience {i+1}</span>
                        {i > 0 && <button onClick={() => set("experience",data.experience.filter((_,idx)=>idx!==i))}
                          className="text-red-400 text-xs hover:text-red-300">Remove</button>}
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {([["company","Company Name"],["role","Job Title / Role"],["duration","Duration (e.g. Jan 2023 - Present)"]] as [keyof Experience,string][]).map(([f,p]) => (
                          <div key={f} className={f==="duration"?"col-span-2":""}>
                            <label className={labelCls}>{p}</label>
                            <input type="text" placeholder={p} value={exp[f]}
                              onChange={e => updateExp(i,f,e.target.value)} className={inputCls}/>
                          </div>
                        ))}
                        <div className="col-span-2">
                          <label className={labelCls}>Key Responsibilities / Achievements</label>
                          <textarea rows={3} placeholder="Describe your role, achievements, technologies used..."
                            value={exp.description} onChange={e => updateExp(i,"description",e.target.value)}
                            className={inputCls + " resize-none"}/>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Step 4 — Education */}
              {step === 4 && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-cyan-400">Education</h2>
                    <button onClick={() => set("education",[...data.education,{...EMPTY_EDU}])}
                      className="text-xs bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-3 py-1.5 rounded-lg hover:bg-cyan-500/20 transition">
                      + Add More
                    </button>
                  </div>
                  {data.education.map((edu,i) => (
                    <div key={i} className="bg-black/30 border border-zinc-800/60 rounded-2xl p-4 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-cyan-400 text-sm font-semibold">Education {i+1}</span>
                        {i > 0 && <button onClick={() => set("education",data.education.filter((_,idx)=>idx!==i))}
                          className="text-red-400 text-xs">Remove</button>}
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {([["institution","College / University / School"],["degree","Degree / Course"],["year","Year (e.g. 2020-2024)"],["grade","CGPA / Percentage"]] as [keyof Education,string][]).map(([f,p]) => (
                          <div key={f}>
                            <label className={labelCls}>{p}</label>
                            <input type="text" placeholder={p} value={edu[f]}
                              onChange={e => updateEdu(i,f,e.target.value)} className={inputCls}/>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Step 5 — Projects */}
              {step === 5 && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-cyan-400">Projects</h2>
                    <button onClick={() => set("projects",[...data.projects,{...EMPTY_PRJ}])}
                      className="text-xs bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-3 py-1.5 rounded-lg hover:bg-cyan-500/20 transition">
                      + Add More
                    </button>
                  </div>
                  {data.projects.map((prj,i) => (
                    <div key={i} className="bg-black/30 border border-zinc-800/60 rounded-2xl p-4 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-cyan-400 text-sm font-semibold">Project {i+1}</span>
                        {i > 0 && <button onClick={() => set("projects",data.projects.filter((_,idx)=>idx!==i))}
                          className="text-red-400 text-xs">Remove</button>}
                      </div>
                      {([["name","Project Name"],["tech","Technologies Used (React, Node, etc)"]] as [keyof Project,string][]).map(([f,p]) => (
                        <div key={f}>
                          <label className={labelCls}>{p}</label>
                          <input type="text" placeholder={p} value={prj[f]}
                            onChange={e => updatePrj(i,f,e.target.value)} className={inputCls}/>
                        </div>
                      ))}
                      <div>
                        <label className={labelCls}>Project Description</label>
                        <textarea rows={2} placeholder="What does this project do? Your role?"
                          value={prj.description} onChange={e => updatePrj(i,"description",e.target.value)}
                          className={inputCls + " resize-none"}/>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Step 6 — Preview */}
              {step === 6 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-cyan-400">Download Resume</h2>
                  <div className="space-y-3">
                    <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-4 text-sm text-green-400">
                      ✅ Your resume is ready! Preview it on the right, then download as PDF.
                    </div>
                    <button onClick={downloadPDF} disabled={downloading}
                      className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-black py-4 rounded-2xl font-bold text-lg transition hover:shadow-[0_0_25px_rgba(34,211,238,0.4)]">
                      {downloading ? "Generating PDF..." : "⬇ Download PDF"}
                    </button>
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                      {["No watermark","No signup needed","A4 PDF format","Download instantly"].map(t=>(
                        <div key={t} className="flex items-center gap-1"><span className="text-cyan-500">✓</span>{t}</div>
                      ))}
                    </div>
                  </div>
                  <div className="border-t border-zinc-800/60 pt-4">
                    <p className="text-gray-400 text-sm font-medium mb-2">Resume Tips:</p>
                    <ul className="space-y-1 text-gray-500 text-xs">
                      <li>✓ Keep resume to 1 page for fresher, 2 for experienced</li>
                      <li>✓ Use action words: "Developed", "Led", "Improved"</li>
                      <li>✓ Add measurable achievements: "Reduced time by 30%"</li>
                      <li>✓ Tailor skills section for each job you apply</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex gap-3 pt-2">
                {step > 0 && (
                  <button onClick={() => setStep(s => s-1)}
                    className="flex-1 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-gray-300 py-3 rounded-xl font-semibold transition">
                    ← Previous
                  </button>
                )}
                {step < STEPS.length-1 && (
                  <button onClick={() => setStep(s => s+1)}
                    className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-black py-3 rounded-xl font-bold transition">
                    Next →
                  </button>
                )}
              </div>
            </div>

            {/* Right — Live Preview */}
            <div className="bg-white rounded-2xl overflow-auto shadow-2xl shadow-cyan-500/10 max-h-[800px]">
              <Preview />
            </div>
          </div>
        </div>
      </main>
    </ToolPageWrapper>
  );
}
