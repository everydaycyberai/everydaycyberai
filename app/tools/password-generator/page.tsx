"use client";

import { useState } from "react";

export default function PasswordGeneratorPage() {
  const [password, setPassword] = useState("");

  const generatePassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

    let generated = "";

    for (let i = 0; i < 16; i++) {
      generated += chars.charAt(
        Math.floor(Math.random() * chars.length)
      );
    }

    setPassword(generated);
  };

  return (
    <main className="min-h-screen bg-black text-white px-6 py-24">
      <div className="max-w-3xl mx-auto text-center">

        <div className="inline-block border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 px-5 py-2 rounded-full text-sm mb-6">
          Security Tool
        </div>

        <h1 className="text-5xl font-bold mb-6">
          Password Generator
        </h1>

        <p className="text-gray-400 mb-12">
          Generate strong and secure passwords instantly.
        </p>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10">

          <div className="bg-black border border-zinc-700 rounded-2xl px-6 py-5 text-xl break-all mb-8">
            {password || "Click Generate Password"}
          </div>

          <button
            onClick={generatePassword}
            className="bg-cyan-500 hover:bg-cyan-400 text-black px-8 py-4 rounded-2xl font-semibold transition"
          >
            Generate Password
          </button>

        </div>

      </div>
    </main>
  );
}