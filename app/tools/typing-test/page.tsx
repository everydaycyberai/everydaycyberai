"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import ToolPageWrapper from "@/components/ToolPageWrapper";

const TEXTS = {
  easy: [
    "The quick brown fox jumps over the lazy dog. Practice makes perfect and hard work pays off every day.",
    "A good student always reads books and completes homework on time. Knowledge is the key to success in life.",
    "The sun rises in the east and sets in the west. We should wake up early and start our day with exercise.",
  ],
  medium: [
    "Cyber security is the practice of protecting systems, networks and programs from digital attacks. These attacks are usually aimed at accessing, changing or destroying sensitive information.",
    "Artificial intelligence is transforming the way we work and live. Machine learning algorithms can now perform tasks that once required human intelligence and years of training.",
    "India is the fastest growing major economy in the world. The technology sector employs millions of people and contributes significantly to the national GDP every year.",
  ],
  hard: [
    "The implementation of zero-trust architecture requires organizations to verify every user, device and network flow. Authentication, authorization and continuous validation are the three pillars of this security model.",
    "Quantum computing leverages quantum mechanical phenomena such as superposition and entanglement to perform computations. This technology promises to revolutionize cryptography, drug discovery and optimization problems.",
  ],
};

type Diff = "easy"|"medium"|"hard";
type State = "idle"|"running"|"finished";

export default function TypingTestPage() {
  const [diff, setDiff]       = useState<Diff>("medium");
  const [text, setText]       = useState("");
  const [typed, setTyped]     = useState("");
  const [state, setState]     = useState<State>("idle");
  const [timeLeft, setTimeLeft] = useState(60);
  const [duration, setDuration] = useState(60);
  const [wpm, setWpm]         = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [errors, setErrors]   = useState(0);
  const inputRef              = useRef<HTMLInputElement>(null);
  const timerRef              = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  const newTest = useCallback(() => {
    const arr = TEXTS[diff];
    setText(arr[Math.floor(Math.random()*arr.length)]);
    setTyped(""); setState("idle"); setTimeLeft(duration);
    setWpm(0); setAccuracy(0); setErrors(0);
    clearInterval(timerRef.current);
    setTimeout(()=>inputRef.current?.focus(),100);
  }, [diff, duration]);

  useEffect(()=>{ newTest(); }, [diff, duration]);

  const handleType = (val: string) => {
    if (state==="finished") return;
    if (state==="idle") {
      setState("running");
      timerRef.current = setInterval(()=>{
        setTimeLeft(prev=>{
          if (prev<=1){ clearInterval(timerRef.current); setState("finished"); return 0; }
          return prev-1;
        });
      },1000);
    }
    setTyped(val);

    // Calculate stats
    let errs = 0;
    for (let i=0;i<val.length;i++) { if (val[i]!==text[i]) errs++; }
    setErrors(errs);
    const acc = val.length>0 ? Math.round(((val.length-errs)/val.length)*100) : 100;
    setAccuracy(acc);

    if (val===text) {
      clearInterval(timerRef.current);
      setState("finished");
      const elapsed = duration-timeLeft;
      const mins = Math.max(elapsed,1)/60;
      setWpm(Math.round((val.split(" ").length)/mins));
    }
  };

  useEffect(()=>{
    if (state==="running"){
      const elapsed = duration-timeLeft;
      if (elapsed>0&&typed.length>0){
        const mins = elapsed/60;
        setWpm(Math.round((typed.trim().split(/\s+/).length)/mins));
      }
    }
  },[timeLeft]);

  useEffect(()=>()=>clearInterval(timerRef.current),[]);

  const getCharClass = (i: number) => {
    if (i>=typed.length) return "text-gray-500";
    return typed[i]===text[i] ? "text-green-400" : "text-red-400 bg-red-500/20";
  };

  const grade = wpm>=80?"🏆 Expert":wpm>=60?"⭐ Advanced":wpm>=40?"✅ Intermediate":wpm>=25?"📘 Beginner":"🔰 Learner";

  return (
    <ToolPageWrapper badge="Study Tool">
      <main className="px-6 py-12 pb-24 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-5xl font-bold mb-4">Typing Speed Test</h1>
            <p className="text-gray-400">Test your typing speed in WPM — free online typing test for government exams, bank jobs, SSC, data entry</p>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap gap-3 mb-6 justify-center">
            <div className="flex gap-2">
              {(["easy","medium","hard"] as Diff[]).map(d=>(
                <button key={d} onClick={()=>setDiff(d)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border transition capitalize ${diff===d?"bg-cyan-500/20 border-cyan-500/50 text-cyan-400":"bg-black/40 border-zinc-700/50 text-gray-400"}`}>
                  {d}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              {[30,60,120].map(d=>(
                <button key={d} onClick={()=>setDuration(d)}
                  className={`px-4 py-2 rounded-xl text-sm border transition ${duration===d?"bg-cyan-500/20 border-cyan-500/50 text-cyan-400":"bg-black/40 border-zinc-700/50 text-gray-400"}`}>
                  {d}s
                </button>
              ))}
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            {[
              {label:"WPM",    value: state==="idle"?"—":wpm,      color:"text-cyan-400"},
              {label:"Accuracy",value:state==="idle"?"—":`${accuracy}%`, color:accuracy>=90?"text-green-400":"text-yellow-400"},
              {label:"Errors", value:state==="idle"?"—":errors,    color:errors>0?"text-red-400":"text-green-400"},
              {label:"Time",   value:`${timeLeft}s`,                color:timeLeft<=10?"text-red-400":"text-white"},
            ].map(({label,value,color})=>(
              <div key={label} className="bg-black/40 border border-zinc-700/60 rounded-2xl p-4 text-center">
                <p className={`text-2xl font-bold ${color}`}>{value}</p>
                <p className="text-xs text-gray-500 mt-1">{label}</p>
              </div>
            ))}
          </div>

          {/* Text display */}
          <div className="bg-black/40 border border-zinc-700/60 rounded-2xl p-6 mb-4 cursor-text"
            onClick={()=>inputRef.current?.focus()}>
            <p className="text-lg leading-relaxed font-mono tracking-wide">
              {text.split("").map((char,i)=>(
                <span key={i} className={`${getCharClass(i)} transition-colors`}>
                  {char}
                  {i===typed.length&&state==="running"&&<span className="border-l-2 border-cyan-400 animate-pulse"/>}
                </span>
              ))}
            </p>
          </div>

          {/* Hidden input */}
          <input ref={inputRef} type="text" value={typed} onChange={e=>handleType(e.target.value)}
            disabled={state==="finished"}
            className="w-full bg-black/60 border border-zinc-700/60 rounded-2xl px-5 py-4 text-white outline-none focus:border-cyan-400 transition font-mono"
            placeholder={state==="idle"?"Click here and start typing to begin the test...":"Keep typing..."}/>

          {/* Result */}
          {state==="finished" && (
            <div className="mt-6 bg-gradient-to-br from-cyan-500/15 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-6 text-center">
              <p className="text-4xl font-bold text-cyan-400 mb-1">{wpm} WPM</p>
              <p className="text-xl text-white mb-1">{grade}</p>
              <p className="text-gray-400 text-sm mb-4">Accuracy: {accuracy}% • Errors: {errors}</p>
              <div className="text-xs text-gray-500 mb-4">
                Government exam standard: 25-35 WPM • Professional: 50+ WPM • Expert: 80+ WPM
              </div>
              <button onClick={newTest}
                className="bg-cyan-500 hover:bg-cyan-400 text-black px-8 py-3 rounded-xl font-bold transition">
                Try Again
              </button>
            </div>
          )}

          {state!=="finished" && (
            <button onClick={newTest} className="mt-4 w-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-gray-400 py-3 rounded-xl transition text-sm">
              New Test
            </button>
          )}

          <div className="mt-6 bg-black/40 border border-zinc-700/60 rounded-2xl p-5">
            <h2 className="text-cyan-400 font-semibold mb-3">📊 WPM Standards India</h2>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-400">
              {[["SSC / Bank Clerk","25-30 WPM"],["LDC / DEO","35 WPM"],["Court Steno","80-100 WPM"],["Professional","50+ WPM"],["Data Entry Operator","40 WPM"],["Expert Typist","80+ WPM"]].map(([r,v])=>(
                <div key={r} className="flex justify-between bg-black/30 rounded-lg px-3 py-2">
                  <span>{r}</span><span className="text-cyan-400 font-semibold">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </ToolPageWrapper>
  );
}
