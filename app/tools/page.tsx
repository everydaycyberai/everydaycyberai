import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free Cyber Security & IT Tools — Everyday Cyber AI",
  description:
    "Free online security tools — password generator, password strength checker, IP subnet calculator, SSL checker and more. Check if your system is secure.",
  keywords:
    "free password generator, password strength checker, IP calculator, subnet calculator, SSL checker, cyber security tools, network tools India",
};

const tools = [
  {
    icon: "🔐",
    title: "Password Generator",
    desc: "Generate cryptographically secure passwords with custom length, character types and strength meter.",
    tags: ["Strength Meter", "Custom Length", "Copy Button", "Multi-Generate"],
    status: "live" as const,
    href: "/tools/password-generator",
    color: "cyan",
  },
  {
    icon: "🛡️",
    title: "Password Strength Checker",
    desc: "Check how strong your password is — entropy analysis, crack time estimate, security checklist.",
    tags: ["Entropy Score", "Crack Time", "Security Checklist"],
    status: "live" as const,
    href: "/tools/password-strength",
    color: "cyan",
  },
  {
    icon: "🌐",
    title: "IP / Subnet Calculator",
    desc: "Full subnet calculator — network address, broadcast, host range, CIDR, IP class detection.",
    tags: ["Subnet Mask", "CIDR", "Host Range", "IP Class"],
    status: "live" as const,
    href: "/tools/ip-calculator",
    color: "cyan",
  },
  {
    icon: "🔒",
    title: "SSL Certificate Checker",
    desc: "Check if a website has valid SSL, HTTPS redirect and certificate status.",
    tags: ["HTTPS Check", "Redirect Check", "Status Code"],
    status: "live" as const,
    href: "/tools/ssl-checker",
    color: "cyan",
  },
  {
    icon: "📹",
    title: "CCTV Storage Calculator",
    desc: "Calculate how much storage you need for your surveillance system based on cameras and days.",
    tags: ["Storage Calc", "Bitrate Est.", "Multi-Camera"],
    status: "coming" as const,
    href: "#",
    color: "yellow",
  },
  {
    icon: "🤖",
    title: "AI Writing Tools",
    desc: "Generate IT emails, complaint letters, SOPs and documentation instantly using AI.",
    tags: ["Email Gen", "SOP Writer", "IT Docs"],
    status: "coming" as const,
    href: "#",
    color: "yellow",
  },
  {
    icon: "🧾",
    title: "GST Invoice Generator",
    desc: "Create professional GST invoices, quotations and salary slips for your business.",
    tags: ["GST Invoice", "Quotation", "Salary Slip"],
    status: "coming" as const,
    href: "#",
    color: "yellow",
  },
  {
    icon: "🖥️",
    title: "Network Scanner",
    desc: "Scan common ports and check which services are running on a host.",
    tags: ["Port Check", "Service Detect"],
    status: "coming" as const,
    href: "#",
    color: "yellow",
  },
];

export default function ToolsPage() {
  const liveTools = tools.filter((t) => t.status === "live");
  const comingTools = tools.filter((t) => t.status === "coming");

  return (
    <main className="min-h-screen bg-black text-white px-6 py-32">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="mb-16 text-center">
          <div className="inline-block bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-4 py-2 rounded-full text-sm mb-6">
            Free Security & IT Tools
          </div>
          <h1 className="text-5xl font-bold mb-6">
            Check Your System&apos;s
            <span className="text-cyan-400"> Security — Free</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
            Professional-grade security tools for everyone. Check passwords, analyze networks,
            verify SSL certificates and more — no account needed, completely free.
          </p>
        </div>

        {/* Live Tools */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-2xl font-bold">Available Now</h2>
            <span className="bg-green-500/10 border border-green-500/30 text-green-400 text-xs px-3 py-1 rounded-full">
              {liveTools.length} Tools Live
            </span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {liveTools.map((tool) => (
              <Link
                key={tool.title}
                href={tool.href}
                className="group bg-black border border-gray-800 hover:border-cyan-400 rounded-3xl p-7 transition duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] block"
              >
                <div className="text-5xl mb-5">{tool.icon}</div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-cyan-400 transition">{tool.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-5">{tool.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {tool.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-cyan-400 text-sm font-semibold group-hover:gap-2 transition">
                  Open Tool →
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Coming Soon Tools */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-2xl font-bold">Coming Soon</h2>
            <span className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs px-3 py-1 rounded-full">
              In Development
            </span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {comingTools.map((tool) => (
              <div
                key={tool.title}
                className="relative bg-black/50 border border-gray-800/50 rounded-3xl p-7 opacity-70"
              >
                <span className="absolute top-4 right-4 text-xs bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 px-2 py-0.5 rounded-full">
                  Soon
                </span>
                <div className="text-5xl mb-5 grayscale">{tool.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-400">{tool.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{tool.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
