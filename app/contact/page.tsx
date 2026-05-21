"use client";
import emailjs from "@emailjs/browser";

import { useState } from "react";

import { db } from "@/lib/firebase";

import { collection, addDoc } from "firebase/firestore";

export default function ContactPage() {
    const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [mobile, setMobile] = useState("");
const [message, setMessage] = useState("");
const [loading, setLoading] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!name || !email || !mobile || !message) {
    alert("Please fill all fields");
    return;
  }

  try {
    setLoading(true);

    await addDoc(collection(db, "support_requests"), {
  name,
  email,
  mobile,
  message,
  status: "Pending",
  createdAt: new Date(),
});
await emailjs.send(
  "service_nlc4m47",
  "template_kokt6xh",
  {
    name,
    email,
    mobile,
    message,
  },
  "2nt6KxxekpR_yNTb_"
);
await emailjs.send(
  "service_nlc4m47",
  "template_u4ejosm",
  {
    name,
    email,
    mobile,
    message,
  },
  "2nt6KxxekpR_yNTb_"
);
    alert("Support request submitted successfully");

    setName("");
    setEmail("");
    setMessage("");
  } catch (error) {
    console.error(error);

    alert("Something went wrong");
  } finally {
    setLoading(false);
  }
};
  return (
    <main className="min-h-screen bg-black text-white px-6 py-32">

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
            Need technical assistance, surveillance support,
            firewall configuration or business IT solutions?
            Send your request and we will get back to you.
          </p>

        </div>

        {/* Contact Form */}
        <div className="bg-black border border-gray-800 rounded-3xl p-10">

          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">

            {/* Name */}
            <div>

              <label className="block mb-3 text-gray-300">
                Full Name
              </label>

              <input
                type="text"
                value={name}
onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full bg-black border border-gray-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-cyan-400"
              />

            </div>

            {/* Phone */}
            <div>

              <label className="block mb-3 text-gray-300">
                Mobile Number
              </label>

              <input
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Enter mobile number"
                className="w-full bg-black border border-gray-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-cyan-400"
              />

            </div>

            {/* Email */}
            <div>

              <label className="block mb-3 text-gray-300">
                Email Address
              </label>

              <input
                type="email"
                value={email}
onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                className="w-full bg-black border border-gray-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-cyan-400"
              />

            </div>

            {/* Service Type */}
            <div>

              <label className="block mb-3 text-gray-300">
                Service Type
              </label>

              <select
                className="w-full bg-black border border-gray-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-cyan-400"
              >
                <option>IT Support</option>
                <option>Firewall & Security</option>
                <option>Surveillance Support</option>
                <option>Data Center Support</option>
                <option>E-Waste Management</option>
                <option>AI Automation</option>
              </select>

            </div>

            {/* Message */}
            <div className="md:col-span-2">

              <label className="block mb-3 text-gray-300">
                Problem Description
              </label>

              <textarea
                rows={6}
                value={message}
onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your issue or support requirement..."
                className="w-full bg-black border border-gray-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-cyan-400"
              ></textarea>

            </div>

            {/* Submit */}
            <div className="md:col-span-2">

              <button
                type="submit"
                className="bg-cyan-500 hover:bg-cyan-400 hover:shadow-[0_0_25px_rgba(34,211,238,0.45)] text-black px-8 py-4 rounded-xl font-semibold transition duration-300"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

            </div>

          </form>

        </div>

      </div>

    </main>
  );
}