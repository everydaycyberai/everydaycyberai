import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free Online Tools India — AI, PDF, Security, Finance & More | Everyday Cyber AI",
  description:
    "100+ free online tools for India — AI writing assistant, password generator, resume builder, GST calculator, EMI calculator, QR code generator, unit converter, image compressor and more. No login, no signup required.",
  keywords:
    "free online tools India, AI writing tool free, password generator India, resume builder free, GST calculator India, EMI calculator, QR code generator free, unit converter, image compressor, word counter, age calculator, free tools students India 2025",
  openGraph: {
    title: "Free Online Tools India — Everyday Cyber AI",
    description: "Free AI tools, security tools, finance calculators and productivity tools for India. No login needed.",
    url: "https://everydaycyberai.in/tools",
    siteName: "Everyday Cyber AI",
  },
  alternates: { canonical: "https://everydaycyberai.in/tools" },
};

type Status = "live" | "coming";

const categories = [
  {
    name: "🆘 Cyber Security Help — India",
    desc: "Scam hua? Hack hua? — Turant help pao, kahan report karo, paisa kaise milega wapas",
    tools: [
      { icon: "🔍", title: "Scam Analyzer",          desc: "Scam ho gaya? Describe karo — AI batayega kaunsa scam hua, turant kya karo, kahan report karo aur paisa wapas milne ke chances kitne hain. India ka sabse useful cyber help tool.", tags: ["UPI Fraud","Digital Arrest","Phishing Help","1930"],    href: "/tools/scam-analyzer",       status: "live" as Status },
      { icon: "🚩", title: "Scam Message Checker",   desc: "Suspicious SMS, email ya WhatsApp message mila? Paste karo aur turant pata karo scam hai ya nahi — click karne se pehle check karo. Free AI-powered scam message detector India.", tags: ["SMS Scam","Phishing Check","KYC Fraud","Before You Click"], href: "/tools/scam-message-checker", status: "live" as Status },
      { icon: "🛡️", title: "Hack Checker",           desc: "Pata karo aapka phone ya account hack hua hai ya nahi — 14 simple questions ka jawab do aur instant risk report pao. Free system security check India.", tags: ["Phone Hacked","Account Check","Risk Report"],              href: "/tools/hack-checker",        status: "live" as Status },
      { icon: "🔒", title: "Digital Safety Score",   desc: "Aap online kitne safe hain? 12 questions ka jawab do — apna cyber security score janiye aur personalized improvement tips pao. Free security audit India.", tags: ["Security Score","Safety Tips","Cyber Audit"],              href: "/tools/safety-score",        status: "live" as Status },
      { icon: "🆘", title: "Emergency Response Guide",desc: "UPI fraud, account hack, digital arrest, SIM swap — kisi bhi cyber emergency mein exact step-by-step action plan aur India ke official helpline numbers.", tags: ["1930 Helpline","UPI Fraud Steps","Emergency Plan"],       href: "/tools/emergency-response",  status: "live" as Status },
    ],
  },
  {
    name: "🤖 AI Tools — Free",
    desc: "Free AI-powered tools — write emails, essays, cover letters instantly using Groq + Llama AI",
    tools: [
      { icon: "✍️", title: "AI Writing Assistant",    desc: "Free AI tool to write emails, essays, cover letters, product descriptions instantly. Powered by Groq + Llama — fastest free AI writer India 2025. No login needed.", tags: ["Email Writer","Essay Helper","Free AI India"], href: "/tools/ai-writer",  status: "live" as Status },
      { icon: "📧", title: "AI Email Generator",       desc: "Generate professional emails in seconds — leave application, job application, complaint, resignation. Free AI email writer for students and professionals India.", tags: ["Leave Application","Job Apply","Office Email"], href: "/tools/ai-email",   status: "live" as Status },

    ],
  },
  {
    name: "📝 Writing & Text Tools",
    desc: "Free writing tools for students and professionals — word counter, case converter, text utilities",
    tools: [
      { icon: "📝", title: "Word Counter",              desc: "Free online word counter — count words, characters, sentences, reading time instantly. Check Twitter, Instagram, LinkedIn character limits. Best tool for students writing assignments.", tags: ["Word Count","Reading Time","Assignment Help"],  href: "/tools/word-counter",        status: "live" as Status },
      { icon: "🔡", title: "Case Converter",            desc: "Free text case converter — convert to UPPERCASE, lowercase, Title Case, camelCase, snake_case, kebab-case instantly. Useful for developers and content writers.", tags: ["camelCase","snake_case","UPPERCASE","Writers"],  href: "/tools/case-converter",      status: "live" as Status },
      { icon: "📄", title: "Lorem Ipsum Generator",     desc: "Free Lorem Ipsum placeholder text generator — generate paragraphs, sentences or words for websites, UI mockups and design projects instantly.", tags: ["Placeholder Text","UI Design","Mockup","Web"],  href: "/tools/lorem-ipsum",         status: "live" as Status },
      { icon: "📋", title: "JSON Formatter",            desc: "Free JSON formatter and validator online — format, beautify, minify and validate JSON data instantly. Useful for developers and API testing.", tags: ["JSON Validate","Beautify","API Testing","Dev"],  href: "/tools/json-formatter",      status: "live" as Status },
    ],
  },
  {
    name: "🔐 Cyber Security Tools",
    desc: "Check passwords, networks, SSL — protect yourself online with free security tools",
    tools: [
      { icon: "🔐", title: "Password Generator",              desc: "Generate strong, secure passwords instantly — free password generator India with length slider, character types and strength meter. Never get hacked again.", tags: ["Strong Password","Strength Meter","Free India"], href: "/tools/password-generator",    status: "live" as Status },
      { icon: "🛡️", title: "Password Strength & Breach Checker", desc: "Check how strong your password is in seconds — entropy score, estimated crack time, security checklist, and a free check if it has appeared in known data breaches. 100% private.", tags: ["Password Check","Crack Time","Breach Check","Privacy"],        href: "/tools/password-strength",     status: "live" as Status },
      { icon: "📧", title: "Email Header Analyzer",   desc: "Trace email origin IP, detect phishing and spoofing — paste email headers to get sender location, SPF/DKIM/DMARC results, delivery path and full forensic analysis. Free email forensics tool India.", tags: ["Phishing Check","Email Trace","SPF DKIM","Forensics"], href: "/tools/email-header-analyzer", status: "live" as Status },
      { icon: "🌐", title: "IP / Subnet Calculator",           desc: "Free IP subnet calculator — find network address, broadcast, host range, CIDR notation and IP class. Essential tool for network engineers India.", tags: ["Subnet Mask","CIDR","Network Engineers"],        href: "/tools/ip-calculator",         status: "live" as Status },
      { icon: "🔒", title: "SSL Certificate Checker",         desc: "Check if any website has valid SSL certificate and HTTPS enabled. Free online SSL checker — verify website security before entering your data.", tags: ["HTTPS Check","SSL Valid","Website Safety"],     href: "/tools/ssl-checker",           status: "live" as Status },
    ],
  },
  {
    name: "📚 Study Tools",
    desc: "Free tools for students — word counter, unit converter, plagiarism checker and more",
    tools: [
      { icon: "📝", title: "Word Counter",                    desc: "Free online word counter — count words, characters, sentences, reading time instantly. Check Twitter, Instagram, LinkedIn character limits. Best tool for students writing assignments.", tags: ["Word Count","Reading Time","Assignment Help"],  href: "/tools/word-counter",        status: "live" as Status },
      { icon: "📐", title: "Unit Converter",                  desc: "Free unit converter India — convert length, weight, temperature, area, speed and data units instantly. Covers metric and imperial units. Best for science students.", tags: ["Length","Weight","Temperature","CBSE"],         href: "/tools/unit-converter",       status: "live" as Status },
      { icon: "🧮", title: "Age Calculator",                  desc: "Calculate your exact age in years, months and days — with zodiac sign, day of birth and next birthday countdown. Free age calculator India for Aadhaar, passport forms.", tags: ["Exact Age","Zodiac","Birthday Countdown"],      href: "/tools/age-calculator",       status: "live" as Status },
      { icon: "📊", title: "Percentage Calculator",           desc: "Free percentage calculator — calculate marks percentage, discount, percentage change and more. Most useful tool for students, shoppers and professionals in India.", tags: ["Marks %","Discount","Grade Calculator"],        href: "/tools/percentage-calculator",status: "live" as Status },
      { icon: "⌨️", title: "Typing Speed Test",               desc: "Test your typing speed in WPM (words per minute) free online — improve your typing for government exams, bank jobs, SSC, data entry and office work.", tags: ["WPM Test","Govt Exam","Data Entry","SSC"],       href: "/tools/typing-test",          status: "live" as Status },
      { icon: "🔎", title: "Plagiarism Checker",              desc: "Free plagiarism checker for students — check your essay, assignment or article for duplicate content. Browser-based, no file upload needed.", tags: ["Duplicate Content","Assignment","College"],     href: "/tools/plagiarism-checker",   status: "coming" as Status },
    ],
  },
  {
    name: "⚡ Daily Use Tools",
    desc: "Tools everyone uses everyday — QR codes, photos, images, URLs — free and instant",
    tools: [
      { icon: "📄", title: "Resume Builder",                  desc: "Free resume builder India — create professional resume with 3 templates and download as PDF instantly. No watermark, no signup. Best free CV maker for freshers and experienced.", tags: ["Free CV Maker","PDF Resume","Fresher India"],   href: "/tools/resume-builder",       status: "live" as Status },
      { icon: "▦",  title: "QR Code Generator",              desc: "Free QR code generator — create QR codes for URL, Wi-Fi password, phone number, email and text. Download PNG instantly. Best free QR maker for business cards and shops.", tags: ["WiFi QR","URL QR","Business Card","Free PNG"],  href: "/tools/qr-generator",         status: "live" as Status },
      { icon: "🖼️", title: "Image Compressor",               desc: "Free image compressor online India — reduce JPG, PNG image size without losing quality. Perfect for compressing photos for WhatsApp, website and email. 100% private.", tags: ["Reduce Image Size","WhatsApp Photo","Website"], href: "/tools/image-compressor",     status: "live" as Status },
      { icon: "🔗", title: "URL Shortener",                   desc: "Free URL shortener India — shorten long links for sharing on WhatsApp, Instagram bio, Twitter. Create short links instantly with copy button.", tags: ["Short Link","Instagram Bio","WhatsApp Share"],  href: "/tools/url-shortener",        status: "live" as Status },
      { icon: "📸", title: "Passport Size Photo Maker",       desc: "Free passport size photo maker online India — resize any photo to 35x45mm passport size. Download instantly for Aadhaar, PAN, visa, exam forms. No watermark.", tags: ["Passport Photo","Aadhaar","Visa Form","35x45"], href: "/tools/passport-photo",       status: "live" as Status },
      { icon: "🎨", title: "Color Picker",                    desc: "Free online color picker — pick any color and get HEX, RGB, HSL, CMYK codes instantly. Includes shade generator and popular palettes for designers and developers.", tags: ["HEX Code","RGB","Color Codes","Designers"],    href: "/tools/color-picker",         status: "live" as Status },
      { icon: "🏃", title: "BMI Calculator",                  desc: "Free BMI calculator India — calculate Body Mass Index for adults and children. Know if you are underweight, normal, overweight or obese with health tips.", tags: ["Body Mass Index","Health Check","Weight"],      href: "/tools/bmi-calculator",       status: "live" as Status },
    ],
  },
  {
    name: "💰 Finance Tools India",
    desc: "GST, EMI, salary and investment calculators — made for Indian users",
    tools: [
      { icon: "🧾", title: "GST Calculator",                  desc: "Free GST calculator India 2025 — calculate GST inclusive and exclusive amounts for 3%, 5%, 12%, 18% and 28% tax slabs. Shows CGST and SGST breakup for businesses.", tags: ["GST India","CGST SGST","Tax Slab","Business"],  href: "/tools/gst-calculator",       status: "live" as Status },
      { icon: "🧾", title: "GST Invoice Generator",           desc: "Free GST invoice generator India — create professional tax invoices with auto CGST/SGST/IGST split, download as PDF instantly. No login, no watermark. Best free billing tool for small business.", tags: ["Tax Invoice","CGST SGST IGST","PDF Invoice","Small Business"], href: "/tools/gst-invoice-generator", status: "live" as Status },
      { icon: "🏦", title: "EMI Calculator",                  desc: "Free EMI calculator India — calculate monthly EMI for home loan, car loan and personal loan with full amortization schedule. Shows total interest payable.", tags: ["Home Loan EMI","Car Loan","Interest Rate"],     href: "/tools/emi-calculator",       status: "live" as Status },
      { icon: "💵", title: "Salary / CTC Calculator",         desc: "Free salary calculator India 2025 — calculate in-hand salary from CTC with new and old tax regime. Shows PF deduction, income tax and take-home pay.", tags: ["In-Hand Salary","CTC to Salary","Tax Regime"],  href: "/tools/salary-calculator",    status: "live" as Status },
      { icon: "📈", title: "SIP Calculator",                  desc: "Free SIP calculator India — calculate mutual fund SIP returns and maturity amount. Compare lumpsum vs SIP investment with yearly growth chart.", tags: ["SIP Returns","Mutual Fund","Investment India"], href: "/tools/sip-calculator",       status: "live" as Status },
    ],
  },
  {
    name: "⌨️ Text & Developer Tools",
    desc: "For developers, writers and content creators — code formatters, converters and more",
    tools: [
      { icon: "🔡", title: "Case Converter",                  desc: "Free text case converter — convert to UPPERCASE, lowercase, Title Case, camelCase, snake_case, kebab-case and more. Useful for developers and content writers.", tags: ["camelCase","snake_case","UPPERCASE","Devs"],    href: "/tools/case-converter",       status: "live" as Status },
      { icon: "📋", title: "JSON Formatter",                  desc: "Free JSON formatter and validator online — format, beautify, minify and validate JSON data instantly. Useful for developers and API testing in India.", tags: ["JSON Validate","Beautify","API Testing","Dev"],  href: "/tools/json-formatter",       status: "live" as Status },
      { icon: "🔐", title: "Base64 Encoder / Decoder",        desc: "Free Base64 encoder and decoder online — encode text to Base64 or decode Base64 to text instantly in browser. Used for JWT tokens and API authentication.", tags: ["Base64 Encode","JWT Token","API Auth"],         href: "/tools/base64",               status: "live" as Status },
      { icon: "📄", title: "Lorem Ipsum Generator",           desc: "Free Lorem Ipsum text generator — generate placeholder text for websites, UI mockups and design projects. Choose paragraphs, sentences or words count.", tags: ["Placeholder Text","UI Design","Mockup","Web"],  href: "/tools/lorem-ipsum",          status: "live" as Status },
    ],
  },
];

export default function ToolsPage() {
  const totalLive = categories.reduce((acc, cat) => acc + cat.tools.filter(t => t.status === "live").length, 0);

  return (
    <main className="min-h-screen text-white px-6 py-12 relative z-10">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="mb-16 text-center">
          <div className="inline-block bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-4 py-2 rounded-full text-sm mb-6">
            Free Online Tools — No Login Required
          </div>
          <h1 className="text-5xl font-bold mb-6">
            Free Tools for
            <span className="text-cyan-400"> Students & Professionals</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
            {totalLive}+ free tools — AI writing assistant, password generator, resume builder, GST calculator, QR code generator and more. All run in your browser, no login needed.
          </p>
        </div>

        {/* Trending Scams Banner */}
        <Link href="/trending-scams"
          className="block bg-red-500/10 border border-red-500/30 hover:border-red-400 rounded-2xl p-5 mb-16 transition group">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🚨</span>
              <div>
                <p className="text-white font-bold">See Trending Scams Right Now</p>
                <p className="text-gray-400 text-sm">Real anonymized scam patterns reported this month — know what to watch for</p>
              </div>
            </div>
            <span className="text-red-400 text-sm font-medium whitespace-nowrap group-hover:translate-x-1 transition-transform">View Trends →</span>
          </div>
        </Link>

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
                      className="group bg-black/40 backdrop-blur-sm border border-gray-700/60 hover:border-cyan-400 rounded-2xl p-6 transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_25px_rgba(34,211,238,0.12)] block">
                      <div className="text-4xl mb-4">{tool.icon}</div>
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-cyan-400 transition">{tool.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">{tool.desc}</p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {tool.tags.map(tag => (
                          <span key={tag} className="text-xs bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded-full">{tag}</span>
                        ))}
                      </div>
                      <span className="text-cyan-400 text-sm font-medium">Open Tool →</span>
                    </Link>
                  ) : (
                    <div key={tool.title}
                      className="relative bg-black/30 border border-gray-800/40 rounded-2xl p-6 opacity-60">
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
