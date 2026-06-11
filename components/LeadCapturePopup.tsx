"use client";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import emailjs from "@emailjs/browser";

export default function LeadCapturePopup() {
  const [show, setShow]       = useState(false);
  const [name, setName]       = useState("");
  const [phone, setPhone]     = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone]       = useState(false);
  const [error, setError]     = useState("");

  useEffect(() => {
    const seen = sessionStorage.getItem("lead_popup_seen");
    if (seen) return;
    const timer = setTimeout(() => setShow(true), 20000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async () => {
    setError("");
    if (!name.trim()) { setError("Please enter your name"); return; }
    if (phone.replace(/\D/g,"").length < 10) { setError("Please enter a valid 10-digit mobile number"); return; }
    setLoading(true);
    try {
      // Save to Firebase
      await addDoc(collection(db, "leads"), {
        name: name.trim(),
        phone: phone.trim(),
        page: window.location.pathname,
        source: document.referrer || "direct",
        createdAt: new Date(),
      });

      // Send email notification via EmailJS
      await emailjs.send(
        "service_nlc4m47",
        "template_lead_notify",
        {
          lead_name:  name.trim(),
          lead_phone: phone.trim(),
          lead_page:  window.location.pathname,
          lead_time:  new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        },
        "2nt6KxxekpR_yNTb_"
      );

      sessionStorage.setItem("lead_popup_seen", "1");
      setDone(true);
      setTimeout(() => setShow(false), 3000);
    } catch (e) {
      console.error(e);
      // Even if email fails, still mark as done (Firebase saved)
      sessionStorage.setItem("lead_popup_seen", "1");
      setDone(true);
      setTimeout(() => setShow(false), 3000);
    } finally { setLoading(false); }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4"
      style={{background:"rgba(0,0,0,0.88)", backdropFilter:"blur(8px)"}}>
      <div className="bg-zinc-900 border border-cyan-500/30 rounded-3xl p-8 w-full max-w-sm shadow-[0_0_80px_rgba(34,211,238,0.15)]">

        {done ? (
          <div className="text-center py-4">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-2xl font-bold text-cyan-400 mb-2">Thanks, {name}!</h3>
            <p className="text-gray-400">We will reach out to you on WhatsApp shortly.</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-7">
              <div className="text-5xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold mb-2 text-white">
                Get Free IT Support Consultation
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Enter your details below — our team will contact you on WhatsApp within 24 hours.
              </p>
            </div>

            <div className="space-y-3">
              <input type="text" placeholder="Your Full Name *" value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-black border border-zinc-700 rounded-2xl px-4 py-3 text-white outline-none focus:border-cyan-400 transition placeholder-gray-600"/>
              <input type="tel" placeholder="WhatsApp Mobile Number *" value={phone}
                onChange={e => setPhone(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSubmit()}
                className="w-full bg-black border border-zinc-700 rounded-2xl px-4 py-3 text-white outline-none focus:border-cyan-400 transition placeholder-gray-600"/>

              {error && <p className="text-red-400 text-sm">⚠️ {error}</p>}

              <button onClick={handleSubmit}
                disabled={loading || !name.trim() || !phone.trim()}
                className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed text-black py-3.5 rounded-2xl font-bold transition hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]">
                {loading ? "Please wait..." : "Get Free Consultation 🚀"}
              </button>
            </div>

            <p className="text-xs text-gray-600 text-center mt-4">
              🔒 We never spam. Your number is safe with us.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
