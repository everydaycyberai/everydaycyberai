"use client";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function LeadCapturePopup() {
  const [show, setShow]       = useState(false);
  const [name, setName]       = useState("");
  const [phone, setPhone]     = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone]       = useState(false);

  useEffect(() => {
    // Show popup after 30 seconds, only once per session
    const seen = sessionStorage.getItem("lead_popup_seen");
    if (seen) return;
    const timer = setTimeout(() => setShow(true), 30000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async () => {
    if (!name.trim() || !phone.trim()) return;
    if (phone.replace(/\D/g,"").length < 10) { alert("Please enter a valid phone number"); return; }
    setLoading(true);
    try {
      await addDoc(collection(db, "leads"), {
        name: name.trim(),
        phone: phone.trim(),
        page: window.location.pathname,
        source: document.referrer || "direct",
        createdAt: new Date(),
      });
      sessionStorage.setItem("lead_popup_seen", "1");
      setDone(true);
      setTimeout(() => setShow(false), 3000);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const dismiss = () => {
    sessionStorage.setItem("lead_popup_seen", "1");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-end sm:items-center justify-center p-4"
      style={{background:"rgba(0,0,0,0.7)", backdropFilter:"blur(4px)"}}>
      <div className="bg-zinc-900 border border-cyan-500/30 rounded-3xl p-8 w-full max-w-sm shadow-[0_0_60px_rgba(34,211,238,0.15)] relative">

        {/* Close */}
        <button onClick={dismiss}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-300 transition text-xl leading-none">✕</button>

        {done ? (
          <div className="text-center py-4">
            <div className="text-5xl mb-3">✅</div>
            <h3 className="text-xl font-bold text-cyan-400 mb-2">Thanks, {name}!</h3>
            <p className="text-gray-400 text-sm">We will reach out to you shortly on WhatsApp.</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="text-center mb-6">
              <div className="text-4xl mb-3">🛡️</div>
              <h3 className="text-xl font-bold mb-2">Get Free IT Support Consultation</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Leave your details — our team will reach out on WhatsApp within 24 hours.
              </p>
            </div>

            <div className="space-y-3">
              <input type="text" placeholder="Your Name *" value={name} onChange={e=>setName(e.target.value)}
                className="w-full bg-black border border-zinc-700 rounded-2xl px-4 py-3 text-white outline-none focus:border-cyan-400 transition"/>
              <input type="tel" placeholder="Mobile Number (WhatsApp) *" value={phone} onChange={e=>setPhone(e.target.value)}
                onKeyDown={e => e.key==="Enter" && handleSubmit()}
                className="w-full bg-black border border-zinc-700 rounded-2xl px-4 py-3 text-white outline-none focus:border-cyan-400 transition"/>

              <button onClick={handleSubmit} disabled={loading||!name.trim()||!phone.trim()}
                className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-black py-3 rounded-2xl font-bold transition hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]">
                {loading ? "Saving..." : "Get Free Consultation 🚀"}
              </button>

              <button onClick={dismiss} className="w-full text-gray-500 hover:text-gray-400 text-sm transition py-1">
                No thanks, maybe later
              </button>
            </div>

            <p className="text-xs text-gray-600 text-center mt-3">
              🔒 We never spam. Your number is safe with us.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
