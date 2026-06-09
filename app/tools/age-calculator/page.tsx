"use client";
import { useState } from "react";
import ToolPageWrapper from "@/components/ToolPageWrapper";

export default function AgeCalculatorPage() {
  const [dob, setDob]     = useState("");
  const [target, setTarget] = useState("");

  const calc = () => {
    if (!dob) return null;
    const birth = new Date(dob);
    const ref   = target ? new Date(target) : new Date();
    if (birth > ref) return null;

    let years  = ref.getFullYear() - birth.getFullYear();
    let months = ref.getMonth() - birth.getMonth();
    let days   = ref.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(ref.getFullYear(), ref.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) { years--; months += 12; }

    const totalDays    = Math.floor((ref.getTime() - birth.getTime()) / 86400000);
    const totalWeeks   = Math.floor(totalDays / 7);
    const totalMonths  = years * 12 + months;
    const totalHours   = totalDays * 24;
    const nextBirthday = new Date(ref.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday <= ref) nextBirthday.setFullYear(ref.getFullYear() + 1);
    const daysToNext = Math.ceil((nextBirthday.getTime() - ref.getTime()) / 86400000);

    const dayName = birth.toLocaleDateString("en-IN", { weekday: "long" });
    const zodiac = getZodiac(birth.getMonth() + 1, birth.getDate());

    return { years, months, days, totalDays, totalWeeks, totalMonths, totalHours, daysToNext, dayName, zodiac };
  };

  function getZodiac(month: number, day: number) {
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "♈ Aries";
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "♉ Taurus";
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "♊ Gemini";
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "♋ Cancer";
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "♌ Leo";
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "♍ Virgo";
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "♎ Libra";
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "♏ Scorpio";
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "♐ Sagittarius";
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "♑ Capricorn";
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "♒ Aquarius";
    return "♓ Pisces";
  }

  const result = calc();

  return (
    <ToolPageWrapper badge="Daily Use Tool">
      <main className="px-6 py-12 pb-24">
        <div className="max-w-2xl mx-auto">

          <div className="text-center mb-10">
            <h1 className="text-5xl font-bold mb-4">Age Calculator</h1>
            <p className="text-gray-400">Find your exact age in years, months, days — with zodiac sign and next birthday</p>
          </div>

          <div className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-3xl p-8 space-y-5">

            <div>
              <label className="block text-gray-300 font-medium mb-2">Date of Birth *</label>
              <input type="date" value={dob} onChange={(e) => setDob(e.target.value)}
                max={new Date().toISOString().split("T")[0]}
                className="w-full bg-black/80 border border-zinc-700 rounded-2xl px-5 py-4 text-white outline-none focus:border-cyan-400 transition" />
            </div>

            <div>
              <label className="block text-gray-300 font-medium mb-2">
                Calculate age as of <span className="text-gray-500 font-normal text-sm">(leave blank for today)</span>
              </label>
              <input type="date" value={target} onChange={(e) => setTarget(e.target.value)}
                className="w-full bg-black/80 border border-zinc-700 rounded-2xl px-5 py-4 text-white outline-none focus:border-cyan-400 transition" />
            </div>

          </div>

          {result && (
            <div className="mt-6 space-y-4">

              {/* Main age */}
              <div className="bg-gradient-to-br from-cyan-500/15 to-blue-500/10 border border-cyan-500/30 rounded-3xl p-8 text-center">
                <p className="text-gray-400 mb-2 text-sm">Your Age</p>
                <div className="flex items-end justify-center gap-4">
                  <div><span className="text-6xl font-bold text-cyan-400">{result.years}</span><p className="text-gray-400 text-sm mt-1">Years</p></div>
                  <div><span className="text-4xl font-bold text-white">{result.months}</span><p className="text-gray-400 text-sm mt-1">Months</p></div>
                  <div><span className="text-4xl font-bold text-white">{result.days}</span><p className="text-gray-400 text-sm mt-1">Days</p></div>
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Total Days",    value: result.totalDays.toLocaleString("en-IN") },
                  { label: "Total Weeks",   value: result.totalWeeks.toLocaleString("en-IN") },
                  { label: "Total Months",  value: result.totalMonths },
                  { label: "Total Hours",   value: result.totalHours.toLocaleString("en-IN") },
                  { label: "Born On",       value: result.dayName },
                  { label: "Zodiac Sign",   value: result.zodiac },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-4 text-center">
                    <p className="text-lg font-bold text-cyan-400">{value}</p>
                    <p className="text-xs text-gray-500 mt-1">{label}</p>
                  </div>
                ))}
              </div>

              {/* Next birthday */}
              <div className="bg-zinc-900/50 border border-yellow-500/20 rounded-2xl p-5 text-center">
                <p className="text-yellow-400 font-semibold">🎂 Next Birthday in {result.daysToNext} days</p>
              </div>

            </div>
          )}

        </div>
      </main>
    </ToolPageWrapper>
  );
}
