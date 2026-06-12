import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free Windows Tools Download — Security Audit, PC Optimizer | Everyday Cyber AI",
  description: "Free Windows PowerShell tools — Security Audit Tool, PC Optimizer, Network Diagnostic. Download and run to check Windows 11/10 security, clean PC and diagnose network issues.",
  keywords: "free Windows security audit tool, Windows PC optimizer download, network diagnostic tool Windows, PowerShell security check Windows 11, free PC cleaner India",
  alternates: { canonical: "https://everydaycyberai.in/downloads" },
};

const tools = [
  {
    id: "security-audit",
    icon: "🛡️",
    title: "Windows Security Audit Tool",
    desc: "Scans your Windows PC/laptop for 14 security issues — generates a color-coded HTML report with exact fix steps. Checks antivirus, firewall, updates, BitLocker, passwords, open ports and more.",
    version: "v2.0",
    size: "8 KB",
    filename: "SecurityAudit.ps1",
    badge: "🔥 Most Popular",
    badgeColor: "bg-red-500/20 text-red-400 border-red-500/30",
    checks: [
      "Windows Defender & Real-Time Protection status",
      "Windows Firewall (Public/Private/Domain)",
      "Pending Windows Updates count",
      "BitLocker encryption status",
      "Remote Desktop (RDP) — security risk check",
      "USB AutoRun disabled or not",
      "Password policy strength",
      "Open dangerous ports (RDP, SMB, Telnet, VNC)",
      "Non-standard shared folders",
      "Admin user accounts list",
      "Security Score out of 100 with grade",
      "Full HTML report saved to Desktop",
    ],
    requirements: "Windows 10/11 | PowerShell 5.0+ | Admin rights recommended",
  },
  {
    id: "pc-optimizer",
    icon: "⚡",
    title: "PC Optimizer & Cleaner",
    desc: "Safely cleans temp files, browser caches, Windows Update cache, DNS cache and Recycle Bin. Shows how much space was freed. Checks disk health, RAM usage and startup programs.",
    version: "v1.0",
    size: "5 KB",
    filename: "PCOptimizer.ps1",
    badge: "✨ New",
    badgeColor: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    checks: [
      "Cleans User & Windows Temp files",
      "Clears Chrome & Edge browser caches",
      "Cleans Windows Update download cache",
      "Flushes DNS cache",
      "Empties Recycle Bin",
      "Disk health check (free space warning)",
      "RAM usage analysis",
      "Startup programs count & tips",
      "Shows total MB freed",
    ],
    requirements: "Windows 10/11 | PowerShell 5.0+ | Run as Administrator",
  },
  {
    id: "network-diagnostic",
    icon: "🌐",
    title: "Network Diagnostic Tool",
    desc: "Diagnoses internet, WiFi and network issues in seconds. Tests connectivity to router, Google DNS, websites. Shows WiFi signal strength, IP config, DNS test and generates HTML report.",
    version: "v1.0",
    size: "6 KB",
    filename: "NetworkDiagnostic.ps1",
    badge: "🛠️ Useful",
    badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    checks: [
      "Router/Gateway reachability test",
      "Internet connectivity test (Google DNS, Cloudflare)",
      "Website ping test (Google, YouTube)",
      "WiFi signal strength percentage",
      "Active connection count",
      "DNS resolution test",
      "IP address, gateway, DNS server info",
      "Latency measurement (ms)",
      "Specific recommendations for issues found",
      "Full HTML report saved to Desktop",
    ],
    requirements: "Windows 10/11 | PowerShell 5.0+ | No admin needed",
  },
];

export default function DownloadsPage() {
  return (
    <main className="min-h-screen text-white px-6 py-12 relative z-10">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-block bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-4 py-2 rounded-full text-sm mb-6">
            🖥️ Free Windows Tools
          </div>
          <h1 className="text-5xl font-bold mb-6">
            Free Windows
            <span className="text-cyan-400"> Diagnostic Tools</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Download and run on your Windows PC — get instant reports on security, performance and network.
            100% free, no installation needed, no data sent anywhere.
          </p>
        </div>

        {/* How to Run */}
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6 mb-12">
          <h2 className="text-yellow-400 font-bold text-lg mb-4">📖 How to Run These Tools</h2>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            {[
              { step: "1", title: "Download", desc: "Click Download button — save .ps1 file anywhere on your PC" },
              { step: "2", title: "Right-Click", desc: "Right-click the downloaded file → 'Run with PowerShell'" },
              { step: "3", title: "Allow if asked", desc: "If Windows asks permission, click 'Open' or 'Run anyway'" },
            ].map(s => (
              <div key={s.step} className="flex gap-3 items-start">
                <div className="w-8 h-8 bg-yellow-500 text-black rounded-full flex items-center justify-center font-black shrink-0">{s.step}</div>
                <div>
                  <p className="font-bold text-white">{s.title}</p>
                  <p className="text-gray-400 mt-1">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 bg-black/30 rounded-xl p-3 text-xs text-gray-400 font-mono">
            <span className="text-yellow-400">Alternative:</span> Open PowerShell as Admin → Type:
            <span className="text-cyan-400"> Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass</span> → Press Enter → Then run the script
          </div>
        </div>

        {/* Tools */}
        <div className="space-y-10">
          {tools.map((tool) => (
            <div key={tool.id} className="bg-black/40 backdrop-blur-sm border border-zinc-700/60 rounded-3xl overflow-hidden hover:border-cyan-400/40 transition">

              {/* Top bar */}
              <div className="flex items-center justify-between px-8 py-5 border-b border-zinc-700/60">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{tool.icon}</span>
                  <div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-2xl font-bold">{tool.title}</h3>
                      <span className={`text-xs px-3 py-1 rounded-full border font-bold ${tool.badgeColor}`}>{tool.badge}</span>
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                      <span>{tool.version}</span>
                      <span>•</span>
                      <span>{tool.size}</span>
                      <span>•</span>
                      <span className="font-mono">{tool.filename}</span>
                    </div>
                  </div>
                </div>
                <a
                  href={`/tools/windows/${tool.filename}`}
                  download={tool.filename}
                  className="bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-3 rounded-xl font-bold transition hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] text-sm whitespace-nowrap flex items-center gap-2">
                  ⬇ Download Free
                </a>
              </div>

              <div className="grid md:grid-cols-2 gap-0">
                {/* Left — description */}
                <div className="p-6 border-r border-zinc-700/60">
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">{tool.desc}</p>
                  <div className="bg-black/30 border border-zinc-800 rounded-xl p-3">
                    <p className="text-gray-500 text-xs"><span className="text-cyan-400 font-semibold">Requirements:</span> {tool.requirements}</p>
                  </div>
                </div>

                {/* Right — checks */}
                <div className="p-6">
                  <p className="text-gray-400 text-xs font-semibold mb-3 uppercase tracking-wider">What it checks:</p>
                  <ul className="space-y-1.5">
                    {tool.checks.map(c => (
                      <li key={c} className="flex items-start gap-2 text-xs text-gray-400">
                        <span className="text-green-400 shrink-0 mt-0.5">✓</span>
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Safety note */}
        <div className="mt-12 bg-green-500/10 border border-green-500/20 rounded-2xl p-6">
          <h3 className="text-green-400 font-bold mb-3">🔒 100% Safe — Here is Why</h3>
          <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-400">
            {[
              "Open source PowerShell scripts — you can read every line before running",
              "No internet connection required — works fully offline",
              "No data sent to any server — everything stays on your PC",
              "No installation — just download and run",
              "No registry changes or permanent modifications",
              "Report saved to your Desktop — easy to delete",
            ].map(s => (
              <div key={s} className="flex gap-2"><span className="text-green-400">✓</span>{s}</div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <p className="text-gray-400 mb-4">Need help running these tools or understanding the results?</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="https://wa.me/918454031225?text=Hi!%20I%20downloaded%20your%20Windows%20tool%20and%20need%20help%20with%20the%20results."
              target="_blank" rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-xl font-bold transition">
              💬 WhatsApp Help
            </a>
            <Link href="/tools/scam-analyzer"
              className="border border-cyan-500/40 text-cyan-400 px-6 py-3 rounded-xl font-semibold transition hover:border-cyan-400">
              🔍 Online Scam Analyzer
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
