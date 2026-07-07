"use client";
import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import emailjs from "@emailjs/browser";

interface Props {
  variant?: "inline" | "banner" | "minimal";
  sourceLabel?: string;
}

export default function NewsletterSubscribe({ variant = "inline", sourceLabel = "website" }: Props) {
  const [name, setName]     = useState("");
  const [email, setEmail]   = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle"|"success"|"exists"|"error">("idle");

  const subscribe = async () => {
    if (!name.trim() || !email.trim()) return;
    if (!email.includes("@")) { setStatus("error"); return; }

    setLoading(true);
    try {
      // Check if already subscribed
      const q = query(collection(db, "subscribers"), where("email", "==", email.trim().toLowerCase()));
      const existing = await getDocs(q);

      if (!existing.empty) {
        setStatus("exists");
        setLoading(false);
        return;
      }

      // Save to Firebase
      await addDoc(collection(db, "subscribers"), {
        name:      name.trim(),
        email:     email.trim().toLowerCase(),
        source:    sourceLabel,
        page:      typeof window !== "undefined" ? window.location.pathname : "/",
        createdAt: new Date(),
        active:    true,
      });

      // Send welcome email to subscriber
      await emailjs.send(
        "service_nlc4m47",
        "template_u4ejosm",
        {
          to_name:  name.trim(),
          to_email: email.trim(),
          message:  `Welcome to Everyday Cyber AI newsletter! You will now receive updates when new cyber security tips, tools and articles are published. Visit us at https://everydaycyberai.in`,
          name:     name.trim(),
          email:    email.trim(),
          mobile:   "Newsletter Subscriber",
          serviceType: "Newsletter",
        },
        "2nt6KxxekpR_yNTb_"
      );

      // Notify admin
      await emailjs.send(
        "service_nlc4m47",
        "template_kokt6xh",
        {
          name:    name.trim(),
          email:   email.trim(),
          mobile:  "Newsletter",
          message: `New newsletter subscriber!\nName: ${name.trim()}\nEmail: ${email.trim()}\nPage: ${typeof window !== "undefined" ? window.location.pathname : "/"}`,
        },
        "2nt6KxxekpR_yNTb_"
      );

      setStatus("success");
      setName(""); setEmail("");
    } catch (e) {
      console.error(e);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  // ── Minimal variant (for blog sidebar / tool pages) ──
  if (variant === "minimal") {
    return (
      <div className="bg-black/40 border border-cyan-500/20 rounded-2xl p-5">
        <p className="text-cyan-400 font-semibold text-sm mb-1">📧 Get Cyber Security Tips</p>
        <p className="text-gray-500 text-xs mb-3">Free weekly tips — no spam</p>
        {status === "success" ? (
          <p className="text-green-400 text-sm">✅ Subscribed! Check your inbox.</p>
        ) : status === "exists" ? (
          <p className="text-yellow-400 text-sm">✅ Already subscribed!</p>
        ) : (
          <div className="space-y-2">
            <input type="text" placeholder="Your Name" value={name} onChange={e=>setName(e.target.value)}
              className="w-full bg-black border border-zinc-700 rounded-xl px-3 py-2 text-white text-xs outline-none focus:border-cyan-400 transition"/>
            <input type="email" placeholder="Email Address" value={email} onChange={e=>setEmail(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&subscribe()}
              className="w-full bg-black border border-zinc-700 rounded-xl px-3 py-2 text-white text-xs outline-none focus:border-cyan-400 transition"/>
            <button onClick={subscribe} disabled={loading||!name.trim()||!email.trim()}
              className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-black py-2 rounded-xl text-xs font-bold transition">
              {loading ? "Subscribing..." : "Subscribe Free →"}
            </button>
          </div>
        )}
      </div>
    );
  }

  // ── Banner variant (for homepage) ──
  if (variant === "banner") {
    return (
      <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-3xl p-8 md:p-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-block bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-3 py-1 rounded-full text-xs mb-4">
              📧 Free Newsletter
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              Cyber Security Tips<br/>
              <span className="text-cyan-400">Seedha Inbox Mein</span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Naye blog posts, tools aur cyber security alerts — subscribe karo aur kabhi miss mat karo.
              <strong className="text-white"> Completely free, no spam.</strong>
            </p>
            <div className="flex items-center gap-4 mt-4 text-xs text-gray-500">
              <span>✅ Weekly updates</span>
              <span>✅ No spam</span>
              <span>✅ Unsubscribe anytime</span>
            </div>
          </div>
          <div>
            {status === "success" ? (
              <div className="text-center py-6">
                <div className="text-5xl mb-3">🎉</div>
                <h4 className="text-xl font-bold text-green-400 mb-2">Subscribed!</h4>
                <p className="text-gray-400 text-sm">Welcome email sent to your inbox. Check spam if not found.</p>
              </div>
            ) : status === "exists" ? (
              <div className="text-center py-6">
                <div className="text-4xl mb-3">✅</div>
                <p className="text-green-400 font-semibold">Already subscribed!</p>
                <p className="text-gray-500 text-sm mt-1">You will get all future updates.</p>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="block text-gray-400 text-xs mb-1">Your Name</label>
                  <input type="text" placeholder="e.g. Rahul Sharma" value={name} onChange={e=>setName(e.target.value)}
                    className="w-full bg-black/60 border border-zinc-700 rounded-2xl px-4 py-3 text-white outline-none focus:border-cyan-400 transition"/>
                </div>
                <div>
                  <label className="block text-gray-400 text-xs mb-1">Email Address</label>
                  <input type="email" placeholder="yourname@gmail.com" value={email} onChange={e=>setEmail(e.target.value)}
                    onKeyDown={e=>e.key==="Enter"&&subscribe()}
                    className="w-full bg-black/60 border border-zinc-700 rounded-2xl px-4 py-3 text-white outline-none focus:border-cyan-400 transition"/>
                </div>
                {status==="error" && <p className="text-red-400 text-xs">⚠️ Valid email address daalo</p>}
                <button onClick={subscribe} disabled={loading||!name.trim()||!email.trim()}
                  className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-black py-3.5 rounded-2xl font-bold transition hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]">
                  {loading ? "Subscribing..." : "Subscribe Free 🚀"}
                </button>
                <p className="text-gray-600 text-xs text-center">🔒 No spam. Unsubscribe anytime.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── Default inline variant ──
  return (
    <div className="bg-black/40 border border-zinc-700/60 rounded-2xl p-6">
      <h3 className="text-lg font-bold mb-1">📧 Subscribe for Updates</h3>
      <p className="text-gray-400 text-sm mb-4">Get notified when new articles and tools are published</p>
      {status === "success" ? (
        <div className="text-center py-3">
          <p className="text-green-400 font-semibold">✅ Subscribed successfully!</p>
          <p className="text-gray-500 text-xs mt-1">Welcome email sent. Check your inbox.</p>
        </div>
      ) : status === "exists" ? (
        <p className="text-yellow-400 text-sm text-center py-2">✅ You are already subscribed!</p>
      ) : (
        <div className="space-y-3">
          <input type="text" placeholder="Your Name" value={name} onChange={e=>setName(e.target.value)}
            className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-cyan-400 transition"/>
          <input type="email" placeholder="Email Address" value={email} onChange={e=>setEmail(e.target.value)}
            onKeyDown={e=>e.key==="Enter"&&subscribe()}
            className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-cyan-400 transition"/>
          {status==="error" && <p className="text-red-400 text-xs">⚠️ Valid email address daalo</p>}
          <button onClick={subscribe} disabled={loading||!name.trim()||!email.trim()}
            className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-black py-3 rounded-xl font-bold transition">
            {loading ? "Subscribing..." : "Subscribe Free →"}
          </button>
        </div>
      )}
    </div>
  );
}
