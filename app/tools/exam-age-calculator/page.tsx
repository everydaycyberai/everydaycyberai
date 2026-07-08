"use client";
import { useState } from "react";
import ToolPageWrapper from "@/components/ToolPageWrapper";

type Category = "General/EWS" | "OBC" | "SC/ST" | "PWD";

type Exam = {
  name: string;
  min: number;
  max: Record<Category, number | null>; // null = no upper limit
  note: string;
};

const EXAMS: Exam[] = [
  { name: "UPSC Civil Services (CSE)", min: 21, max: { "General/EWS": 32, "OBC": 35, "SC/ST": 37, "PWD": 42 }, note: "Age reckoned as of 1st August of the exam year. Attempt limits also apply separately." },
  { name: "SSC CGL", min: 18, max: { "General/EWS": 27, "OBC": 30, "SC/ST": 32, "PWD": 37 }, note: "Upper age varies by specific post within CGL — some posts allow up to 30/32 even for General category." },
  { name: "IBPS Bank PO", min: 20, max: { "General/EWS": 30, "OBC": 33, "SC/ST": 35, "PWD": 40 }, note: "Age limits are consistent across most nationalized bank PO exams, but always confirm per notification." },
  { name: "NEET UG", min: 17, max: { "General/EWS": null, "OBC": null, "SC/ST": null, "PWD": null }, note: "Upper age limit was removed following a Supreme Court ruling — only minimum age of 17 applies." },
  { name: "JEE Main", min: 17, max: { "General/EWS": null, "OBC": null, "SC/ST": null, "PWD": null }, note: "No strict upper age limit currently — eligibility mainly depends on your 12th-grade passing year." },
  { name: "State PSC (typical)", min: 21, max: { "General/EWS": 38, "OBC": 41, "SC/ST": 43, "PWD": 48 }, note: "Varies significantly by state — this is a general reference only, not specific to any one state." },
];

export default function ExamAgeCalculatorPage() {
  const [dob, setDob] = useState("");
  const [category, setCategory] = useState<Category>("General/EWS");
  const [refDate, setRefDate] = useState(new Date().toISOString().slice(0, 10));

  const calcAge = (birthDate: string, ref: string): number | null => {
    if (!birthDate) return null;
    const b = new Date(birthDate);
    const r = new Date(ref);
    let age = r.getFullYear() - b.getFullYear();
    const m = r.getMonth() - b.getMonth();
    if (m < 0 || (m === 0 && r.getDate() < b.getDate())) age--;
    return age;
  };

  const age = calcAge(dob, refDate);

  return (
    <ToolPageWrapper badge="🎓 Student Tool">
      <main className="px-6 py-12 pb-24 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Exam Age Eligibility Calculator</h1>
            <p className="text-gray-400">Check your age eligibility for popular competitive exams in India — instant, free.</p>
          </div>

          <div className="bg-black/40 backdrop-blur-sm border border-zinc-700/60 rounded-3xl p-8 space-y-6 mb-8">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 font-medium mb-2">Date of Birth</label>
                <input type="date" value={dob} onChange={e => setDob(e.target.value)}
                  className="w-full bg-black/80 border border-zinc-700 rounded-2xl px-5 py-3 text-white outline-none focus:border-cyan-400 transition" />
              </div>
              <div>
                <label className="block text-gray-300 font-medium mb-2">As of Date <span className="text-gray-500 text-xs">(exam notification date)</span></label>
                <input type="date" value={refDate} onChange={e => setRefDate(e.target.value)}
                  className="w-full bg-black/80 border border-zinc-700 rounded-2xl px-5 py-3 text-white outline-none focus:border-cyan-400 transition" />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 font-medium mb-3">Category</label>
              <div className="grid grid-cols-4 gap-2">
                {(["General/EWS", "OBC", "SC/ST", "PWD"] as Category[]).map(c => (
                  <button key={c} onClick={() => setCategory(c)}
                    className={`py-2.5 rounded-xl text-sm font-medium border transition ${category === c ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400" : "bg-zinc-800 border-zinc-700 text-gray-400"}`}>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {age !== null && (
              <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-2xl px-6 py-4 text-center">
                <p className="text-gray-400 text-sm">Your age as of {new Date(refDate).toLocaleDateString("en-IN")}</p>
                <p className="text-4xl font-black text-cyan-400">{age} years</p>
              </div>
            )}
          </div>

          {age !== null && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white mb-4">Eligibility by Exam</h2>
              {EXAMS.map((exam) => {
                const maxAge = exam.max[category];
                const eligible = age >= exam.min && (maxAge === null || age <= maxAge);
                return (
                  <div key={exam.name} className={`border rounded-2xl p-5 ${eligible ? "bg-green-500/10 border-green-500/30" : "bg-red-500/10 border-red-500/30"}`}>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-white font-semibold">{exam.name}</h3>
                      <span className={`text-sm font-bold ${eligible ? "text-green-400" : "text-red-400"}`}>
                        {eligible ? "✅ Eligible" : "❌ Not Eligible"}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">
                      Required: {exam.min}{maxAge !== null ? ` – ${maxAge}` : "+"} years ({category})
                    </p>
                    <p className="text-gray-600 text-xs">{exam.note}</p>
                  </div>
                );
              })}
            </div>
          )}

          <p className="text-xs text-gray-600 text-center mt-8">
            ⚠️ Age limits shown are commonly cited reference figures and can change with each year&apos;s official notification, and vary by specific post/state. Always confirm exact eligibility from the official exam notification before applying.
          </p>
        </div>
      </main>
    </ToolPageWrapper>
  );
}
