import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free IT Tools — Everyday Cyber AI",
  description:
    "Free online IT tools — PDF utilities, network tools, CCTV calculators, AI writing tools, office utilities and automation tools.",
};

const tools = [
  {
    icon: "🔐",
    title: "Password Generator",
    desc: "Generate strong, secure passwords instantly for better account security.",
    tags: ["Strong Passwords", "Custom Length", "Instant"],
    status: "available" as const,
    href: "/tools/password-generator",
  },
  {
    icon: "🌐",
    title: "IP Calculator",
    desc: "IP checker, subnet calculator and networking utility tool for quick calculations.",
    tags: ["IP Lookup", "Subnet Calc", "Network"],
    status: "available" as const,
    href: "/tools/ip-calculator",
  },
  {
    icon: "📹",
    title: "CCTV Calculators",
    desc: "Storage calculators, bitrate estimators and surveillance planning utilities.",
    tags: ["Storage Calc", "Bitrate Est.", "Camera Planner"],
    status: "coming" as const,
    href: "#",
  },
  {
    icon: "🤖",
    title: "AI Writing Tools",
    desc: "Generate emails, SOPs, complaint letters and IT documentation.",
    tags: ["Email Gen", "SOP Writer", "IT Docs"],
    status: "coming" as const,
    href: "#",
  },
  {
    icon: "🧾",
    title: "Office Utilities",
    desc: "GST invoice generators, quotation creators and salary slip tools.",
    tags: ["GST Invoice", "Quotation", "Salary Slip"],
    status: "coming" as const,
    href: "#",
  },
  {
    icon: "⚙️",
    title: "Automation Tools",
    desc: "Smart utilities for automation, monitoring and workflow management.",
    tags: ["Monitoring", "Workflow", "Alerts"],
    status: "coming" as const,
    href: "#",
  },
];

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-32">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="mb-16 text-center">
          <div className="inline-block bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-4 py-2 rounded-full text-sm mb-6">
            Smart Utility Tools
          </div>
          <h1 className="text-5xl font-bold mb-6">
            Free IT &amp;
            <span className="text-cyan-400"> Productivity Tools</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
            Powerful online utilities designed to simplify IT operations,
            productivity tasks and business workflows — completely free.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool) => (
            <div
              key={tool.title}
              className="group bg-black border border-gray-800 hover:border-cyan-400 rounded-3xl p-8 transition duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] relative"
            >
              {tool.status === "coming" && (
                <span className="absolute top-4 right-4 text-xs bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 px-3 py-1 rounded-full">
                  Coming Soon
                </span>
              )}
              <div className="text-5xl mb-6">{tool.icon}</div>
              <h2 className="text-2xl font-semibold mb-4 group-hover:text-cyan-400 transition">{tool.title}</h2>
              <p className="text-gray-400 leading-relaxed mb-6">{tool.desc}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {tool.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              {tool.status === "available" && tool.href !== "#" && (
                <a href={tool.href} className="text-cyan-400 hover:text-cyan-300 font-semibold transition">
                  Open Tool →
                </a>
              )}
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
