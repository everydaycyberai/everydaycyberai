"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { db } from "@/lib/firebase";
import { doc, setDoc, increment } from "firebase/firestore";

export default function ToolPageWrapper({
  children,
  badge,
}: {
  children: React.ReactNode;
  badge?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    const sessionKey = `tool_tracked_${pathname}`;
    if (sessionStorage.getItem(sessionKey)) return;
    sessionStorage.setItem(sessionKey, "1");

    const slug = pathname.replace("/tools/", "").replace(/\//g, "") || "tools-index";
    setDoc(
      doc(db, "tool_usage", slug),
      { path: pathname, views: increment(1), lastViewed: new Date() },
      { merge: true }
    ).catch(() => {
      // Silently ignore — analytics should never break the page for the user
    });
  }, [pathname]);

  return (
    <div className="relative min-h-screen text-white overflow-hidden z-10">

      {/* ── Cyber Background ── */}

      {/* Matrix-style grid lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34,211,238,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,211,238,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Animated glow orbs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/8 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/8 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-cyan-400/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Hex pattern overlay (top-right corner) */}
      <div
        className="absolute top-0 right-0 w-96 h-96 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100'%3E%3Cpath d='M28 66L0 50V18L28 2l28 16v32L28 66zm0-6l22-13V19L28 6 6 19v28l22 13z' fill='%2322d3ee'/%3E%3C/svg%3E")`,
          backgroundSize: "56px 100px",
        }}
      />

      {/* Scan line animation */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(transparent 50%, rgba(34,211,238,0.012) 50%)",
          backgroundSize: "100% 4px",
        }}
      />

      {/* ── Back Navigation Bar ── */}
      <div className="sticky top-[72px] z-40 px-6 pt-4 pb-2">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 bg-black/60 backdrop-blur-md border border-zinc-700 hover:border-cyan-400 hover:text-cyan-400 text-gray-400 px-4 py-2 rounded-xl text-sm font-medium transition duration-200"
          >
            ← Back
          </button>
          <Link
            href="/tools"
            className="flex items-center gap-2 bg-black/60 backdrop-blur-md border border-zinc-700 hover:border-cyan-400 hover:text-cyan-400 text-gray-400 px-4 py-2 rounded-xl text-sm font-medium transition duration-200"
          >
            🛠️ All Tools
          </Link>
          {badge && (
            <span className="ml-auto text-xs bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-3 py-1.5 rounded-full">
              {badge}
            </span>
          )}
        </div>
      </div>

      {/* ── Page Content ── */}
      <div className="relative z-10">
        {children}
      </div>

    </div>
  );
}
