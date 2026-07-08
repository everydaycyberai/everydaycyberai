"use client";
import { useState, useEffect } from "react";
import ToolPageWrapper from "@/components/ToolPageWrapper";

type Item = { id: string; title: string; desc: string };

const CHECKLIST: { category: string; items: Item[] }[] = [
  {
    category: "Router & WiFi Basics",
    items: [
      { id: "default-pw", title: "Changed the default router password", desc: "Default passwords (admin/admin, etc.) are public knowledge — change it immediately." },
      { id: "wifi-name", title: "Changed the default WiFi network name (SSID)", desc: "Default names like 'TP-Link_XXXX' reveal the router model, making known exploits easier to try." },
      { id: "wpa3", title: "Using WPA2/WPA3 encryption (not WEP or Open)", desc: "Check router settings — WEP is outdated and easily cracked; use WPA2 or WPA3." },
      { id: "strong-pw", title: "WiFi password is strong (12+ characters, not a phone number)", desc: "Avoid using your phone number, room number, or 'password123' as your WiFi password." },
    ],
  },
  {
    category: "Shared Network Safety (Hostel/PG)",
    items: [
      { id: "guest-network", title: "Using a separate guest network for visitors, if available", desc: "Keeps your personal devices isolated from guest devices on the same connection." },
      { id: "file-sharing-off", title: "Turned off file/printer sharing on your laptop", desc: "On shared networks, file sharing can expose your files to everyone else connected." },
      { id: "public-network-type", title: "Set your WiFi connection type to 'Public' not 'Private/Home'", desc: "Windows/Mac firewalls are stricter on 'Public' network profiles, blocking more incoming connections." },
      { id: "vpn-shared", title: "Use a VPN when on hostel/shared/public WiFi", desc: "Encrypts your traffic so others on the same network can't snoop on what you're doing." },
    ],
  },
  {
    category: "Device Hygiene",
    items: [
      { id: "firewall-on", title: "Firewall is turned on", desc: "Built into Windows/Mac — should be on by default, but worth checking." },
      { id: "auto-updates", title: "OS and apps set to auto-update", desc: "Security patches close known vulnerabilities — delaying updates leaves you exposed." },
      { id: "antivirus", title: "Antivirus/security software installed and active", desc: "Even a free option is far better than none." },
      { id: "no-shared-accounts", title: "Not auto-logged into personal accounts on shared/lab computers", desc: "Always log out of email, social media, and banking apps on any shared computer." },
    ],
  },
];

export default function WifiSecurityChecklistPage() {
  const [checked, setChecked] = useState<Record<string, boolean>>(() => {
    if (typeof window === "undefined") return {};
    try {
      const saved = localStorage.getItem("wifi_security_checklist");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem("wifi_security_checklist", JSON.stringify(checked));
  }, [checked]);

  const totalItems = CHECKLIST.reduce((s, c) => s + c.items.length, 0);
  const doneItems = Object.values(checked).filter(Boolean).length;
  const pct = Math.round((doneItems / totalItems) * 100);

  const toggle = (id: string) => setChecked(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <ToolPageWrapper badge="📶 Student Safety">
      <main className="px-6 py-12 pb-24 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Hostel/PG WiFi Security Checklist</h1>
            <p className="text-gray-400">Practical steps for students on shared networks — go through each item and check it off.</p>
          </div>

          <div className="bg-black/40 backdrop-blur-sm border border-zinc-700/60 rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-400 text-sm">Progress</span>
              <span className="text-cyan-400 font-bold">{doneItems}/{totalItems} done</span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-3 overflow-hidden">
              <div className="bg-cyan-500 h-full transition-all duration-500" style={{ width: `${pct}%` }} />
            </div>
          </div>

          <div className="space-y-8">
            {CHECKLIST.map((cat) => (
              <div key={cat.category}>
                <h2 className="text-lg font-bold text-cyan-400 mb-4">{cat.category}</h2>
                <div className="space-y-3">
                  {cat.items.map((item) => (
                    <button key={item.id} onClick={() => toggle(item.id)}
                      className={`w-full text-left flex items-start gap-4 p-5 rounded-2xl border transition ${checked[item.id] ? "bg-green-500/10 border-green-500/30" : "bg-black/40 border-zinc-700/60 hover:border-zinc-600"}`}>
                      <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition ${checked[item.id] ? "bg-green-500 border-green-500" : "border-zinc-600"}`}>
                        {checked[item.id] && <span className="text-black text-sm font-bold">✓</span>}
                      </div>
                      <div>
                        <p className={`font-medium ${checked[item.id] ? "text-green-300 line-through" : "text-white"}`}>{item.title}</p>
                        <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {pct === 100 && (
            <div className="mt-8 bg-green-500/10 border border-green-500/30 rounded-2xl p-6 text-center">
              <p className="text-2xl mb-2">🎉</p>
              <p className="text-green-400 font-bold">All done! Your setup is in good shape.</p>
            </div>
          )}

          <p className="text-xs text-gray-600 text-center mt-8">💾 Your progress is saved in this browser only — nothing is sent anywhere.</p>
        </div>
      </main>
    </ToolPageWrapper>
  );
}
