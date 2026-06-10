"use client";
import emailjs from "@emailjs/browser";
import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [serviceType, setServiceType] = useState("IT Support");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !mobile || !message) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "support_requests"), {
        name, email, mobile, message, serviceType,
        status: "Pending",
        createdAt: new Date(),
      });

      await emailjs.send(
        "service_nlc4m47",
        "template_kokt6xh",
        { name, email, mobile, message, serviceType },
        "2nt6KxxekpR_yNTb_"
      );

      await emailjs.send(
        "service_nlc4m47",
        "template_u4ejosm",
        { name, email, mobile, message, serviceType },
        "2nt6KxxekpR_yNTb_"
      );

      setSubmitted(true);
      setName(""); setEmail(""); setMobile(""); setMessage("");
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again or contact via WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen text-white px-6 py-32 relative z-10">
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-16">
          <div className="inline-block bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-4 py-2 rounded-full text-sm mb-6">
            Contact & Support
          </div>
          <h1 className="text-5xl font-bold mb-6">
            Request
            <span className="text-cyan-400"> IT Support</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
            Need technical assistance, surveillance support, firewall configuration or
            business IT solutions? Send your request and we will get back to you.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">

          {/* Contact Info Sidebar */}
          <div className="space-y-6">
            <div className="bg-black border border-gray-800 rounded-2xl p-6">
              <h3 className="text-cyan-400 font-semibold mb-4">Quick Contact</h3>
              <div className="space-y-4 text-gray-400 text-sm">
                <div className="flex items-start gap-3">
                  <span className="text-xl">📍</span>
                  <div>
                    <p className="text-white font-medium">Location</p>
                    <p>Mumbai, India</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xl">📱</span>
                  <div>
                    <p className="text-white font-medium">WhatsApp</p>
                    <a
                      href="https://wa.me/918454031225"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 transition"
                    >
                      +91 84540 31225
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xl">🕐</span>
                  <div>
                    <p className="text-white font-medium">Support Hours</p>
                    <p>24/7 Remote Support</p>
                  </div>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/918454031225"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-green-500/10 border border-green-500/30 hover:border-green-400 text-green-400 px-6 py-4 rounded-2xl transition duration-300 font-semibold"
            >
              <span className="text-2xl">💬</span>
              Chat on WhatsApp
            </a>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-3xl p-10 text-center">
                <div className="text-5xl mb-4">✅</div>
                <h2 className="text-2xl font-bold mb-3 text-cyan-400">Request Submitted!</h2>
                <p className="text-gray-400">
                  We have received your support request and will get back to you shortly.
                  You can also reach us directly on WhatsApp.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 border border-cyan-500/30 text-cyan-400 px-6 py-2 rounded-xl transition hover:border-cyan-400"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <div className="bg-black border border-gray-800 rounded-3xl p-10">
                <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">

                  <div>
                    <label className="block mb-2 text-gray-300 text-sm">Full Name *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full bg-black border border-gray-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-cyan-400 transition"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-gray-300 text-sm">Mobile Number *</label>
                    <input
                      type="tel"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="Enter mobile number"
                      className="w-full bg-black border border-gray-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-cyan-400 transition"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-gray-300 text-sm">Email Address *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email address"
                      className="w-full bg-black border border-gray-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-cyan-400 transition"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-gray-300 text-sm">Service Type</label>
                    <select
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      className="w-full bg-black border border-gray-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-cyan-400 transition"
                    >
                      <option>IT Support</option>
                      <option>Firewall & Security</option>
                      <option>Surveillance Support</option>
                      <option>Data Center Support</option>
                      <option>E-Waste Management</option>
                      <option>AI Automation</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block mb-2 text-gray-300 text-sm">Problem Description *</label>
                    <textarea
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe your issue or support requirement..."
                      className="w-full bg-black border border-gray-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-cyan-400 transition resize-none"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-cyan-500 hover:bg-cyan-400 disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-[0_0_25px_rgba(34,211,238,0.45)] text-black px-8 py-4 rounded-xl font-semibold transition duration-300"
                    >
                      {loading ? "Sending..." : "Send Request"}
                    </button>
                  </div>

                </form>
              </div>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}
