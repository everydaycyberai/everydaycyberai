export type SearchEntry = {
  icon: string;
  title: string;
  desc: string;
  href: string;
  type: "page" | "service" | "tool";
};

export const SEARCH_INDEX: SearchEntry[] = [
  {
    "icon": "🏠",
    "title": "Home",
    "desc": "Everyday Cyber AI homepage — IT support, cyber security, surveillance and AI automation.",
    "href": "/",
    "type": "page"
  },
  {
    "icon": "🛠️",
    "title": "All Tools",
    "desc": "Browse all free tools — AI, security, finance, student and daily-use utilities.",
    "href": "/tools",
    "type": "page"
  },
  {
    "icon": "🧰",
    "title": "All Services",
    "desc": "Browse all IT support and cyber security services we offer.",
    "href": "/services",
    "type": "page"
  },
  {
    "icon": "📰",
    "title": "Blog",
    "desc": "Cyber security guides, tips and articles.",
    "href": "/blog",
    "type": "page"
  },
  {
    "icon": "🚨",
    "title": "Trending Scams",
    "desc": "See the most common scam patterns reported recently.",
    "href": "/trending-scams",
    "type": "page"
  },
  {
    "icon": "💰",
    "title": "Pricing",
    "desc": "Pricing for our IT support and cyber security services.",
    "href": "/pricing",
    "type": "page"
  },
  {
    "icon": "📦",
    "title": "Products",
    "desc": "Digital products and guides — coming soon.",
    "href": "/products",
    "type": "page"
  },
  {
    "icon": "⬇️",
    "title": "Downloads",
    "desc": "Free Windows security and utility scripts to download.",
    "href": "/downloads",
    "type": "page"
  },
  {
    "icon": "ℹ️",
    "title": "About Us",
    "desc": "Learn more about Everyday Cyber AI.",
    "href": "/about",
    "type": "page"
  },
  {
    "icon": "📞",
    "title": "Contact",
    "desc": "Get in touch or request IT support.",
    "href": "/contact",
    "type": "page"
  },
  {
    "icon": "💻",
    "title": "Remote IT Support",
    "desc": "Fast troubleshooting, software installation, Windows support, printer setup and remote assistance for office environments.",
    "href": "/services/remote-it-support",
    "type": "service"
  },
  {
    "icon": "🛡️",
    "title": "Cyber Security",
    "desc": "End-to-end cyber security solutions — firewall setup, VPN, threat detection, network hardening and security audits for businesses.",
    "href": "/services/cyber-security",
    "type": "service"
  },
  {
    "icon": "📹",
    "title": "Surveillance Support",
    "desc": "CCTV setup, DVR/NVR troubleshooting, ATM surveillance systems and remote monitoring support.",
    "href": "/services/surveillance-support",
    "type": "service"
  },
  {
    "icon": "🏢",
    "title": "Data Center Support",
    "desc": "Rack installation, hardware replacement, smart hands support and infrastructure assistance.",
    "href": "/services/data-center-support",
    "type": "service"
  },
  {
    "icon": "♻️",
    "title": "E-Waste Management",
    "desc": "Safe IT asset disposal, e-waste handling, hardware recycling and office equipment management.",
    "href": "/services/e-waste-management",
    "type": "service"
  },
  {
    "icon": "🤖",
    "title": "AI Automation",
    "desc": "AI-powered tools, workflow automation, reporting utilities and smart business solutions.",
    "href": "/services/ai-automation",
    "type": "service"
  },
  {
    "icon": "🌐",
    "title": "Network Support Engineer",
    "desc": "On-site and remote network support — router/switch config, LAN/WAN troubleshooting, downtime fixes.",
    "href": "/services/network-support-engineer",
    "type": "service"
  },
  {
    "icon": "🔧",
    "title": "Data Center Hardware Replacement",
    "desc": "On-site technician support for swapping faulty server hardware — disks, RAM, PSUs, network cards.",
    "href": "/services/data-center-hardware-replacement",
    "type": "service"
  },
  {
    "icon": "💻",
    "title": "Laptop Configuration & Setup",
    "desc": "New employee laptop setup — OS install, software, security settings, ready on day one.",
    "href": "/services/laptop-configuration",
    "type": "service"
  },
  {
    "icon": "🚀",
    "title": "Windows Autopilot Support",
    "desc": "Zero-touch device provisioning setup — Intune enrollment, deployment profiles, troubleshooting.",
    "href": "/services/windows-autopilot-support",
    "type": "service"
  },
  {
    "icon": "📹",
    "title": "CCTV / DVR Camera Support",
    "desc": "DVR/NVR troubleshooting, camera-not-recording fixes, remote viewing setup for existing systems.",
    "href": "/services/cctv-dvr-support",
    "type": "service"
  },
  {
    "icon": "🔍",
    "title": "Scam Analyzer",
    "desc": "Scam ho gaya? Describe karo — AI batayega kaunsa scam hua, turant kya karo, kahan report karo aur paisa wapas milne ke chances kitne hain. India ka sabse useful cyber help tool.",
    "href": "/tools/scam-analyzer",
    "type": "tool"
  },
  {
    "icon": "🚩",
    "title": "Scam Message Checker",
    "desc": "Suspicious SMS, email ya WhatsApp message mila? Paste karo aur turant pata karo scam hai ya nahi — click karne se pehle check karo. Free AI-powered scam message detector India.",
    "href": "/tools/scam-message-checker",
    "type": "tool"
  },
  {
    "icon": "💼",
    "title": "Fake Job Offer Checker",
    "desc": "WFH job offer mila jo suspicious lag raha hai? Paste karo aur turant pata karo scam hai ya legitimate — paisa maangne se pehle check karo. Freshers ke liye zaroori tool.",
    "href": "/tools/job-scam-checker",
    "type": "tool"
  },
  {
    "icon": "🛡️",
    "title": "Hack Checker",
    "desc": "Pata karo aapka phone ya account hack hua hai ya nahi — 14 simple questions ka jawab do aur instant risk report pao. Free system security check India.",
    "href": "/tools/hack-checker",
    "type": "tool"
  },
  {
    "icon": "🔒",
    "title": "Digital Safety Score",
    "desc": "Aap online kitne safe hain? 12 questions ka jawab do — apna cyber security score janiye aur personalized improvement tips pao. Free security audit India.",
    "href": "/tools/safety-score",
    "type": "tool"
  },
  {
    "icon": "🆘",
    "title": "Emergency Response Guide",
    "desc": "UPI fraud, account hack, digital arrest, SIM swap — kisi bhi cyber emergency mein exact step-by-step action plan aur India ke official helpline numbers.",
    "href": "/tools/emergency-response",
    "type": "tool"
  },
  {
    "icon": "✍️",
    "title": "AI Writing Assistant",
    "desc": "Free AI tool to write emails, essays, cover letters, product descriptions instantly. Powered by Groq + Llama — fastest free AI writer India 2025. No login needed.",
    "href": "/tools/ai-writer",
    "type": "tool"
  },
  {
    "icon": "📧",
    "title": "AI Email Generator",
    "desc": "Generate professional emails in seconds — leave application, job application, complaint, resignation. Free AI email writer for students and professionals India.",
    "href": "/tools/ai-email",
    "type": "tool"
  },
  {
    "icon": "🎤",
    "title": "AI Mock Interview Generator",
    "desc": "Practice before the real thing — get realistic interview questions with answer tips for any role. Free AI interview prep tool for freshers and professionals India.",
    "href": "/tools/mock-interview",
    "type": "tool"
  },
  {
    "icon": "✉️",
    "title": "AI Cover Letter Generator",
    "desc": "Generate a ready-to-send cover letter in seconds — pairs perfectly with our Resume Builder. Free AI cover letter writer for job applications India.",
    "href": "/tools/cover-letter-generator",
    "type": "tool"
  },
  {
    "icon": "📸",
    "title": "AI Instagram Caption Generator",
    "desc": "Free AI caption generator — get catchy Instagram captions and hashtags for any post in seconds. Multiple vibes: funny, aesthetic, motivational and more.",
    "href": "/tools/caption-generator",
    "type": "tool"
  },
  {
    "icon": "📝",
    "title": "Word Counter",
    "desc": "Free online word counter — count words, characters, sentences, reading time instantly. Check Twitter, Instagram, LinkedIn character limits. Best tool for students writing assignments.",
    "href": "/tools/word-counter",
    "type": "tool"
  },
  {
    "icon": "🔡",
    "title": "Case Converter",
    "desc": "Free text case converter — convert to UPPERCASE, lowercase, Title Case, camelCase, snake_case, kebab-case instantly. Useful for developers and content writers.",
    "href": "/tools/case-converter",
    "type": "tool"
  },
  {
    "icon": "📄",
    "title": "Lorem Ipsum Generator",
    "desc": "Free Lorem Ipsum placeholder text generator — generate paragraphs, sentences or words for websites, UI mockups and design projects instantly.",
    "href": "/tools/lorem-ipsum",
    "type": "tool"
  },
  {
    "icon": "📋",
    "title": "JSON Formatter",
    "desc": "Free JSON formatter and validator online — format, beautify, minify and validate JSON data instantly. Useful for developers and API testing.",
    "href": "/tools/json-formatter",
    "type": "tool"
  },
  {
    "icon": "🔐",
    "title": "Password Generator",
    "desc": "Generate strong, secure passwords instantly — free password generator India with length slider, character types and strength meter. Never get hacked again.",
    "href": "/tools/password-generator",
    "type": "tool"
  },
  {
    "icon": "🛡️",
    "title": "Password Strength & Breach Checker",
    "desc": "Check how strong your password is in seconds — entropy score, estimated crack time, security checklist, and a free check if it has appeared in known data breaches. 100% private.",
    "href": "/tools/password-strength",
    "type": "tool"
  },
  {
    "icon": "📧",
    "title": "Email Header Analyzer",
    "desc": "Trace email origin IP, detect phishing and spoofing — paste email headers to get sender location, SPF/DKIM/DMARC results, delivery path and full forensic analysis. Free email forensics tool India.",
    "href": "/tools/email-header-analyzer",
    "type": "tool"
  },
  {
    "icon": "🌐",
    "title": "IP / Subnet Calculator",
    "desc": "Free IP subnet calculator — find network address, broadcast, host range, CIDR notation and IP class. Essential tool for network engineers India.",
    "href": "/tools/ip-calculator",
    "type": "tool"
  },
  {
    "icon": "🔒",
    "title": "SSL Certificate Checker",
    "desc": "Check if any website has valid SSL certificate and HTTPS enabled. Free online SSL checker — verify website security before entering your data.",
    "href": "/tools/ssl-checker",
    "type": "tool"
  },
  {
    "icon": "📶",
    "title": "Hostel/PG WiFi Security Checklist",
    "desc": "Practical security checklist for students on shared hostel/PG WiFi networks — router safety, network hygiene and device protection. Free, saves your progress.",
    "href": "/tools/wifi-security-checklist",
    "type": "tool"
  },
  {
    "icon": "📐",
    "title": "Unit Converter",
    "desc": "Free unit converter India — convert length, weight, temperature, area, speed and data units instantly. Covers metric and imperial units. Best for science students.",
    "href": "/tools/unit-converter",
    "type": "tool"
  },
  {
    "icon": "🧮",
    "title": "Age Calculator",
    "desc": "Calculate your exact age in years, months and days — with zodiac sign, day of birth and next birthday countdown. Free age calculator India for Aadhaar, passport forms.",
    "href": "/tools/age-calculator",
    "type": "tool"
  },
  {
    "icon": "📊",
    "title": "Percentage Calculator",
    "desc": "Free percentage calculator — calculate marks percentage, discount, percentage change and more. Most useful tool for students, shoppers and professionals in India.",
    "href": "/tools/percentage-calculator",
    "type": "tool"
  },
  {
    "icon": "⌨️",
    "title": "Typing Speed Test",
    "desc": "Test your typing speed in WPM (words per minute) free online — improve your typing for government exams, bank jobs, SSC, data entry and office work.",
    "href": "/tools/typing-test",
    "type": "tool"
  },
  {
    "icon": "🎓",
    "title": "Exam Age Eligibility Calculator",
    "desc": "Check your age eligibility for UPSC, SSC CGL, Bank PO, NEET, JEE and more — instant category-wise (General/OBC/SC-ST/PWD) eligibility check for Indian competitive exams.",
    "href": "/tools/exam-age-calculator",
    "type": "tool"
  },
  {
    "icon": "🔎",
    "title": "Plagiarism Checker",
    "desc": "Free plagiarism checker for students — check your essay, assignment or article for duplicate content. Browser-based, no file upload needed.",
    "href": "/tools/plagiarism-checker",
    "type": "tool"
  },
  {
    "icon": "📄",
    "title": "Resume Builder",
    "desc": "Free resume builder India — create professional resume with 3 templates and download as PDF instantly. No watermark, no signup. Best free CV maker for freshers and experienced.",
    "href": "/tools/resume-builder",
    "type": "tool"
  },
  {
    "icon": "▦",
    "title": "QR Code Generator",
    "desc": "Free QR code generator — create QR codes for URL, Wi-Fi password, phone number, email and text. Download PNG instantly. Best free QR maker for business cards and shops.",
    "href": "/tools/qr-generator",
    "type": "tool"
  },
  {
    "icon": "🖼️",
    "title": "Image Compressor",
    "desc": "Free image compressor online India — reduce JPG, PNG image size without losing quality. Perfect for compressing photos for WhatsApp, website and email. 100% private.",
    "href": "/tools/image-compressor",
    "type": "tool"
  },
  {
    "icon": "🔗",
    "title": "URL Shortener",
    "desc": "Free URL shortener India — shorten long links for sharing on WhatsApp, Instagram bio, Twitter. Create short links instantly with copy button.",
    "href": "/tools/url-shortener",
    "type": "tool"
  },
  {
    "icon": "📸",
    "title": "Passport Size Photo Maker",
    "desc": "Free passport size photo maker online India — resize any photo to 35x45mm passport size. Download instantly for Aadhaar, PAN, visa, exam forms. No watermark.",
    "href": "/tools/passport-photo",
    "type": "tool"
  },
  {
    "icon": "🎨",
    "title": "Color Picker",
    "desc": "Free online color picker — pick any color and get HEX, RGB, HSL, CMYK codes instantly. Includes shade generator and popular palettes for designers and developers.",
    "href": "/tools/color-picker",
    "type": "tool"
  },
  {
    "icon": "🏃",
    "title": "BMI Calculator",
    "desc": "Free BMI calculator India — calculate Body Mass Index for adults and children. Know if you are underweight, normal, overweight or obese with health tips.",
    "href": "/tools/bmi-calculator",
    "type": "tool"
  },
  {
    "icon": "🖥️",
    "title": "PC Build Compatibility Checker",
    "desc": "Get an AI-suggested, compatible PC build for your budget and use case — gaming, editing, coding. Free tool for Indian PC builders, explains CPU/GPU/RAM compatibility.",
    "href": "/tools/pc-build-checker",
    "type": "tool"
  },
  {
    "icon": "🔎",
    "title": "Username Availability Checker",
    "desc": "Check if a username is free across Instagram, YouTube, X and GitHub — all at once. Free social media username checker for creating a consistent online identity.",
    "href": "/tools/username-checker",
    "type": "tool"
  },
  {
    "icon": "🧾",
    "title": "GST Calculator",
    "desc": "Free GST calculator India 2025 — calculate GST inclusive and exclusive amounts for 3%, 5%, 12%, 18% and 28% tax slabs. Shows CGST and SGST breakup for businesses.",
    "href": "/tools/gst-calculator",
    "type": "tool"
  },
  {
    "icon": "🧾",
    "title": "GST Invoice Generator",
    "desc": "Free GST invoice generator India — create professional tax invoices with auto CGST/SGST/IGST split, download as PDF instantly. No login, no watermark. Best free billing tool for small business.",
    "href": "/tools/gst-invoice-generator",
    "type": "tool"
  },
  {
    "icon": "🏦",
    "title": "EMI Calculator",
    "desc": "Free EMI calculator India — calculate monthly EMI for home loan, car loan and personal loan with full amortization schedule. Shows total interest payable.",
    "href": "/tools/emi-calculator",
    "type": "tool"
  },
  {
    "icon": "💵",
    "title": "Salary / CTC Calculator",
    "desc": "Free salary calculator India 2025 — calculate in-hand salary from CTC with new and old tax regime. Shows PF deduction, income tax and take-home pay.",
    "href": "/tools/salary-calculator",
    "type": "tool"
  },
  {
    "icon": "📈",
    "title": "SIP Calculator",
    "desc": "Free SIP calculator India — calculate mutual fund SIP returns and maturity amount. Compare lumpsum vs SIP investment with yearly growth chart.",
    "href": "/tools/sip-calculator",
    "type": "tool"
  },
  {
    "icon": "🔐",
    "title": "Base64 Encoder / Decoder",
    "desc": "Free Base64 encoder and decoder online — encode text to Base64 or decode Base64 to text instantly in browser. Used for JWT tokens and API authentication.",
    "href": "/tools/base64",
    "type": "tool"
  },
  {
    "icon": "⌨️",
    "title": "Windows CMD & PowerShell Commands",
    "desc": "Free reference list of essential Windows CMD and PowerShell commands — searchable, click to copy. Covers network, system, disk and user management commands.",
    "href": "/tools/windows-commands",
    "type": "tool"
  },
  {
    "icon": "🐧",
    "title": "Linux Commands Cheat Sheet",
    "desc": "Free reference list of essential Linux commands — searchable, click to copy. Covers file management, network, permissions, package management and systemd.",
    "href": "/tools/linux-commands",
    "type": "tool"
  },
  {
    "icon": "🔌",
    "title": "Firewall & Switch Commands",
    "desc": "Free CLI command reference for popular firewall and switch brands — Cisco, Fortinet, Sophos, MikroTik, Juniper, Aruba, Palo Alto. Searchable, click to copy.",
    "href": "/tools/firewall-switch-commands",
    "type": "tool"
  }
];
