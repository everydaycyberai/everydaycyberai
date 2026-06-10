import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free Online Tools — Everyday Cyber AI",
  description:
    "Free online tools for students and professionals — word counter, QR code generator, unit converter, age calculator, password generator, IP calculator, SSL checker and more.",
  keywords:
    "free online tools India, word counter, QR code generator, unit converter, age calculator, password generator, IP calculator, subnet calculator, SSL checker, free tools students",
};

type Status = "live" | "coming";

const categories = [
  {
    name: "🔐 Security Tools",
    desc: "Check your passwords, networks and SSL — stay safe online",
    tools: [
      { icon: "🔐", title: "Password Generator",        desc: "Generate secure passwords with strength meter and custom options.",  tags: ["Strength Meter","Custom Length"],      href: "/tools/password-generator",    status: "live" as Status },
      { icon: "🛡️", title: "Password Strength Checker", desc: "Check how strong your password is with entropy and crack time.",    tags: ["Entropy Score","Crack Time"],          href: "/tools/password-strength",     status: "live" as Status },
      { icon: "🌐", title: "IP / Subnet Calculator",     desc: "Full subnet calc — network range, host count, IP class detection.", tags: ["CIDR","Subnet Mask","Host Range"],     href: "/tools/ip-calculator",         status: "live" as Status },
      { icon: "🔒", title: "SSL Certificate Checker",   desc: "Check if a website has valid SSL and HTTPS redirect.",             tags: ["HTTPS Check","Redirect Check"],        href: "/tools/ssl-checker",           status: "live" as Status },
    ],
  },
  {
    name: "📚 Study Tools",
    desc: "For students — assignments, essays, exams and daily learning",
    tools: [
      { icon: "📝", title: "Word Counter",       desc: "Count words, characters, sentences with reading time and social media limits.", tags: ["Reading Time","Social Limits","Sentences"], href: "/tools/word-counter",     status: "live" as Status },
      { icon: "📐", title: "Unit Converter",     desc: "Convert length, weight, temperature, area, speed and data units.",             tags: ["Length","Weight","Temp","Data"],             href: "/tools/unit-converter",   status: "live" as Status },
      { icon: "🧮", title: "Age Calculator",     desc: "Exact age in years/months/days, zodiac sign, next birthday countdown.",       tags: ["Zodiac","Birthday","Total Days"],            href: "/tools/age-calculator",   status: "live" as Status },
      { icon: "📊", title: "Percentage Calculator", desc: "Calculate percentage, increase/decrease and marks percentage.",            tags: ["Marks %","Discount","Increase"],             href: "/tools/percentage-calculator",  status: "live" as Status },
    ],
  },
  {
    name: "⚡ Daily Use Tools",
    desc: "Tools everyone uses every day — instant and no login needed",
    tools: [
      { icon: "▦",  title: "QR Code Generator",  desc: "Generate QR codes for URLs, text, Wi-Fi, email and phone numbers.",       tags: ["URL","Wi-Fi","Download PNG"],             href: "/tools/qr-generator",     status: "live" as Status },
      { icon: "🔗", title: "URL Shortener",       desc: "Shorten long URLs for sharing on WhatsApp, Instagram and social media.",  tags: ["Short Link","Share","Track"],             href: "/tools/url-shortener",    status: "live" as Status },
      { icon: "🖼️", title: "Image Compressor",    desc: "Compress images without losing quality — perfect for sending on WhatsApp.", tags: ["Reduce Size","JPG","PNG"],             href: "/tools/image-compressor", status: "live" as Status },
      { icon: "🎨", title: "Color Picker",         desc: "Pick colors, get HEX, RGB, HSL codes — for designers and developers.",   tags: ["HEX","RGB","HSL"],                        href: "/tools/color-picker",     status: "live" as Status },
    ],
  },
  {
    name: "💰 Finance Tools (India)",
    desc: "GST, EMI, salary and tax calculators for Indian users",
    tools: [
      { icon: "🧾", title: "GST Calculator",      desc: "Calculate GST inclusive/exclusive amounts for any tax slab (5%, 12%, 18%, 28%).", tags: ["5%","12%","18%","28%"],       href: "/tools/gst-calculator",   status: "live" as Status },
      { icon: "🏦", title: "EMI Calculator",       desc: "Calculate monthly EMI for home, car or personal loans with full breakdown.",    tags: ["Home Loan","Car Loan","EMI"],  href: "/tools/emi-calculator",   status: "live" as Status },
      { icon: "💵", title: "Salary Calculator",    desc: "Calculate in-hand salary from CTC with PF, tax and deduction breakdown.",      tags: ["CTC","In-Hand","Tax"],        href: "/tools/salary-calculator",status: "live" as Status },
      { icon: "📈", title: "SIP Calculator",       desc: "Calculate SIP returns and maturity amount for your mutual fund investment.",    tags: ["SIP","Returns","Maturity"],   href: "/tools/sip-calculator",   status: "live" as Status },
    ],
  },
  {
    name: "⌨️ Text & Dev Tools",
    desc: "For developers, writers and content creators",
    tools: [
      { icon: "🔡", title: "Case Converter",       desc: "Convert text to UPPERCASE, lowercase, Title Case, camelCase and more.",       tags: ["UPPER","lower","Title Case"],  href: "/tools/case-converter",   status: "live" as Status },
      { icon: "📋", title: "JSON Formatter",       desc: "Format, validate and beautify JSON data instantly.",                          tags: ["Validate","Beautify","Minify"], href: "/tools/json-formatter",  status: "live" as Status },
      { icon: "🔐", title: "Base64 Encoder",        desc: "Encode and decode Base64 text and files in your browser.",                   tags: ["Encode","Decode","File"],      href: "/tools/base64",           status: "live" as Status },
      { icon: "📄", title: "Lorem Ipsum Generator", desc: "Generate placeholder text for websites, designs and mockups.",              tags: ["Placeholder","Design","Words"], href: "/tools/lorem-ipsum",     status: "live" as Status },
    ],
  },
];

export default function ToolsPage() {
  const totalLive = categories.reduce((acc, cat) => acc + cat.tools.filter(t => t.status === "live").length, 0);

  return (
    <main className="min-h-screen text-white px-6 py-32">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="mb-16 text-center">
          <div className="inline-block bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-4 py-2 rounded-full text-sm mb-6">
            Free Online Tools — No Login Required
          </div>
          <h1 className="text-5xl font-bold mb-6">
            Tools for
            <span className="text-cyan-400"> Students & Professionals</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
            {totalLive} free tools live — word counter, QR generator, unit converter,
            password tools, IP calculator, age calculator and more. All run in your browser, no login needed.
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-16">
          {categories.map((cat) => (
            <div key={cat.name}>
              <div className="flex items-end gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold">{cat.name}</h2>
                  <p className="text-gray-500 text-sm mt-1">{cat.desc}</p>
                </div>
                <span className="ml-auto text-xs bg-green-500/10 border border-green-500/20 text-green-400 px-3 py-1 rounded-full shrink-0">
                  {cat.tools.filter(t => t.status === "live").length} live
                </span>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                {cat.tools.map((tool) =>
                  tool.status === "live" ? (
                    <Link key={tool.title} href={tool.href}
                      className="group bg-black border border-gray-800 hover:border-cyan-400 rounded-2xl p-6 transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_25px_rgba(34,211,238,0.12)] block">
                      <div className="text-4xl mb-4">{tool.icon}</div>
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-cyan-400 transition">{tool.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed mb-4">{tool.desc}</p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {tool.tags.map(tag => (
                          <span key={tag} className="text-xs bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded-full">{tag}</span>
                        ))}
                      </div>
                      <span className="text-cyan-400 text-sm font-medium">Open Tool →</span>
                    </Link>
                  ) : (
                    <div key={tool.title}
                      className="relative bg-black/40 border border-gray-800/40 rounded-2xl p-6 opacity-60">
                      <span className="absolute top-3 right-3 text-xs bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full">Soon</span>
                      <div className="text-4xl mb-4 grayscale">{tool.icon}</div>
                      <h3 className="text-lg font-semibold mb-2 text-gray-500">{tool.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{tool.desc}</p>
                    </div>
                  )
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
