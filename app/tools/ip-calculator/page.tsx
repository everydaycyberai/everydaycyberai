"use client";

import { useState } from "react";

export default function IPCalculatorPage() {
  const [ip, setIp] = useState("");

  const calculateIP = () => {
    if (!ip) {
      alert("Please enter IP address");
      return;
    }

    alert(`IP Address Entered: ${ip}`);
  };

  return (
    <main className="min-h-screen bg-black text-white px-6 py-24">

      <div className="max-w-3xl mx-auto text-center">

        <div className="inline-block border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 px-5 py-2 rounded-full text-sm mb-6">
          Networking Tool
        </div>

        <h1 className="text-5xl font-bold mb-6">
          IP Calculator
        </h1>

        <p className="text-gray-400 mb-12">
          Simple IP utility tool for networking calculations.
        </p>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10">

          <input
            type="text"
            placeholder="Enter IP Address"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            className="w-full bg-black border border-zinc-700 rounded-2xl px-6 py-5 mb-8 outline-none focus:border-cyan-400"
          />

          <button
            onClick={calculateIP}
            className="bg-cyan-500 hover:bg-cyan-400 text-black px-8 py-4 rounded-2xl font-semibold transition"
          >
            Calculate
          </button>

        </div>

      </div>

    </main>
  );
}