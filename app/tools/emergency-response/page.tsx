"use client";
import { useState } from "react";
import ToolPageWrapper from "@/components/ToolPageWrapper";

const SCENARIOS = [
  { id: "upi_fraud",       icon: "💸", label: "UPI / Bank Fraud",        desc: "Money debited without your knowledge" },
  { id: "account_hacked",  icon: "🔓", label: "Account Hacked",           desc: "Gmail, WhatsApp, Instagram hacked" },
  { id: "phone_hacked",    icon: "📱", label: "Phone Compromised",         desc: "Unknown access to your phone" },
  { id: "digital_arrest",  icon: "👮", label: "Digital Arrest Threat",     desc: "Fake police/CBI demanding money" },
  { id: "otp_shared",      icon: "🔢", label: "OTP Shared Accidentally",   desc: "You shared OTP with someone" },
  { id: "sim_swap",        icon: "📶", label: "SIM Stopped Working",       desc: "Phone shows no signal suddenly" },
  { id: "data_leak",       icon: "🔏", label: "Personal Data Leaked",      desc: "Aadhaar, PAN, photos leaked" },
  { id: "ransomware",      icon: "🔒", label: "Files Locked / Ransomware", desc: "Files encrypted, ransom demanded" },
];

type TimelineStep = {
  time: string;
  urgent: boolean;
  actions: string[];
};

const RESPONSE_PLANS: Record<string, { title: string; warning?: string; timeline: TimelineStep[]; contacts: { name: string; value: string; href: string }[] }> = {
  upi_fraud: {
    title: "UPI / Bank Fraud Response",
    warning: "🚨 Every minute matters! Banks can freeze transactions if reported within 30 minutes.",
    timeline: [
      { time: "0–30 Minutes", urgent: true, actions: [
        "Call 1930 (Cyber Crime Helpline) RIGHT NOW — toll free 24/7",
        "Open your bank app → freeze/block UPI transactions",
        "Screenshot the fraudulent transaction with date, time, amount",
        "Note the merchant/UPI ID that received the money",
        "Call your bank's fraud helpline directly",
      ]},
      { time: "30 Min – 2 Hours", urgent: true, actions: [
        "Visit bank branch and file written complaint",
        "Request chargeback / transaction reversal in writing",
        "File complaint on cybercrime.gov.in (Financial Fraud section)",
        "Note your complaint number / acknowledgment receipt",
      ]},
      { time: "Same Day", urgent: false, actions: [
        "File FIR at local police station",
        "Report to RBI Banking Ombudsman if bank doesn't respond",
        "Email bankingombudsman@rbi.org.in with all details",
        "Change all banking passwords and UPI PIN",
        "Enable additional security on banking apps",
      ]},
      { time: "1–7 Days", urgent: false, actions: [
        "Follow up with bank on complaint status daily",
        "Escalate to RBI if bank doesn't respond in 3 days",
        "Consult cyber crime lawyer if amount is large",
        "Keep all evidence organized — bank statements, screenshots",
      ]},
    ],
    contacts: [
      { name: "Cyber Crime Helpline", value: "1930", href: "tel:1930" },
      { name: "Cyber Crime Portal", value: "cybercrime.gov.in", href: "https://cybercrime.gov.in" },
      { name: "RBI Ombudsman", value: "cms.rbi.org.in", href: "https://cms.rbi.org.in" },
      { name: "NPCI UPI Complaint", value: "npci.org.in", href: "https://www.npci.org.in" },
    ],
  },
  account_hacked: {
    title: "Hacked Account Response",
    warning: "⚠️ Act fast — hackers may lock you out or misuse your account within hours.",
    timeline: [
      { time: "0–30 Minutes", urgent: true, actions: [
        "Try to log in and change password immediately",
        "If locked out — use 'Forgot Password' recovery option",
        "Revoke all active sessions (Settings → Security → All devices)",
        "Enable 2-Factor Authentication if not already done",
        "Check connected apps and revoke unknown ones",
      ]},
      { time: "Same Day", urgent: true, actions: [
        "Warn your contacts that your account was hacked",
        "Check if any messages/emails were sent from your account",
        "Change passwords on all accounts that used same password",
        "Check if recovery email/phone was changed by hacker",
        "Report account hack to the platform (Google, Meta, etc.)",
      ]},
      { time: "1–3 Days", urgent: false, actions: [
        "File complaint at cybercrime.gov.in if misuse occurred",
        "Monitor bank accounts for any linked financial accounts",
        "Set up Google Account activity alerts",
        "Review and update all security questions",
      ]},
    ],
    contacts: [
      { name: "Cyber Crime Helpline", value: "1930", href: "tel:1930" },
      { name: "Google Account Help", value: "accounts.google.com/signin/recovery", href: "https://accounts.google.com/signin/recovery" },
      { name: "Facebook Hacked", value: "facebook.com/hacked", href: "https://www.facebook.com/hacked" },
      { name: "Cyber Crime Portal", value: "cybercrime.gov.in", href: "https://cybercrime.gov.in" },
    ],
  },
  digital_arrest: {
    title: "Digital Arrest Scam Response",
    warning: "🚨 THIS IS ALWAYS A SCAM. No government agency arrests via video call. Do NOT pay anything!",
    timeline: [
      { time: "Immediately", urgent: true, actions: [
        "HANG UP / END THE CALL immediately — it is 100% a scam",
        "Do NOT pay any money — once paid, it cannot be recovered",
        "Do NOT share Aadhaar, bank details, or OTP",
        "Take screenshot if call is still active",
        "Block the number",
      ]},
      { time: "Same Day", urgent: true, actions: [
        "Report the phone number to 1930",
        "File complaint at cybercrime.gov.in",
        "Report to TRAI's Anti-Spam portal: dnd.trai.gov.in",
        "Inform family members so they don't fall for same scam",
      ]},
      { time: "If Money Was Paid", urgent: true, actions: [
        "Call 1930 IMMEDIATELY — within 30 mins is critical",
        "File FIR at local police station for fraud/cheating",
        "Contact your bank for transaction reversal",
        "Gather all evidence: call screenshots, payment proof",
      ]},
    ],
    contacts: [
      { name: "Cyber Crime Helpline", value: "1930", href: "tel:1930" },
      { name: "TRAI Anti-Spam", value: "dnd.trai.gov.in", href: "https://dnd.trai.gov.in" },
      { name: "Cyber Crime Portal", value: "cybercrime.gov.in", href: "https://cybercrime.gov.in" },
      { name: "Police (Emergency)", value: "112", href: "tel:112" },
    ],
  },
  otp_shared: {
    title: "OTP Shared Accidentally",
    warning: "🚨 Act in the next 5 minutes — transactions can happen within seconds of OTP sharing!",
    timeline: [
      { time: "Next 5 Minutes", urgent: true, actions: [
        "Call bank immediately — ask them to block all transactions",
        "Block your UPI and net banking temporarily via app",
        "Check bank statements immediately for any new transactions",
        "Change your UPI PIN and net banking password right now",
      ]},
      { time: "Within 1 Hour", urgent: true, actions: [
        "Report to 1930 if any fraudulent transaction happened",
        "Enable additional transaction authentication",
        "Check all your linked accounts for unauthorized access",
        "Report the phone number that called you",
      ]},
      { time: "Same Day", urgent: false, actions: [
        "File complaint at cybercrime.gov.in",
        "Enable SIM change alert via TRAI",
        "Review your bank statement carefully",
        "Inform bank about the incident in writing",
      ]},
    ],
    contacts: [
      { name: "Cyber Crime Helpline", value: "1930", href: "tel:1930" },
      { name: "Cyber Crime Portal", value: "cybercrime.gov.in", href: "https://cybercrime.gov.in" },
      { name: "RBI Ombudsman", value: "cms.rbi.org.in", href: "https://cms.rbi.org.in" },
    ],
  },
  sim_swap: {
    title: "SIM Swap / SIM Stopped Working",
    warning: "🚨 Your SIM may have been swapped — attackers can reset your bank passwords using OTPs!",
    timeline: [
      { time: "Immediately", urgent: true, actions: [
        "Call your telecom operator (Airtel/Jio/Vi) emergency helpline",
        "Ask them to BLOCK any SIM swap request on your number",
        "Use another phone to call your bank and block transactions",
        "Change bank net banking password from another device",
        "Ask bank to disable OTP-based login temporarily",
      ]},
      { time: "Within 2 Hours", urgent: true, actions: [
        "Visit telecom store with original Aadhaar and photo ID",
        "Request SIM block/replacement on your original number",
        "Call 1930 to report SIM swap fraud",
        "Check all bank accounts for unauthorized transactions",
      ]},
      { time: "Same Day", urgent: false, actions: [
        "File complaint at cybercrime.gov.in",
        "File FIR at local police station",
        "Contact TRAI: trai.gov.in for formal complaint",
        "Check all accounts where your phone number was used for login",
      ]},
    ],
    contacts: [
      { name: "Cyber Crime Helpline", value: "1930", href: "tel:1930" },
      { name: "TRAI", value: "1800-11-0420", href: "tel:18001100420" },
      { name: "Jio Care", value: "199", href: "tel:199" },
      { name: "Airtel Care", value: "198", href: "tel:198" },
    ],
  },
  phone_hacked: {
    title: "Phone Compromised Response",
    timeline: [
      { time: "Immediately", urgent: true, actions: [
        "Disconnect from all networks (WiFi and mobile data)",
        "Do NOT use the phone for any banking or sensitive activity",
        "From another device — change Gmail and bank passwords",
        "Revoke access from all devices on Google account",
        "Check for unknown apps and uninstall them",
      ]},
      { time: "Same Day", urgent: true, actions: [
        "Run antivirus scan (Malwarebytes recommended)",
        "If deeply compromised — factory reset the device",
        "Re-install only essential apps from official store",
        "Change all passwords after cleaning the device",
        "Enable Google Play Protect",
      ]},
      { time: "1–3 Days", urgent: false, actions: [
        "Monitor all financial accounts for suspicious activity",
        "Report to cybercrime.gov.in if data was stolen",
        "Consider using a different phone temporarily for banking",
        "Review and enable all security settings",
      ]},
    ],
    contacts: [
      { name: "Cyber Crime Helpline", value: "1930", href: "tel:1930" },
      { name: "Cyber Crime Portal", value: "cybercrime.gov.in", href: "https://cybercrime.gov.in" },
    ],
  },
  data_leak: {
    title: "Personal Data Leaked Response",
    timeline: [
      { time: "Same Day", urgent: true, actions: [
        "Change passwords on all accounts that used leaked email",
        "Enable 2FA on all important accounts immediately",
        "If Aadhaar leaked — lock Aadhaar biometrics on uidai.gov.in",
        "If PAN leaked — report to NSDL and Income Tax department",
        "Monitor for any new accounts opened in your name",
      ]},
      { time: "1–7 Days", urgent: false, actions: [
        "File complaint at cybercrime.gov.in",
        "Report to CERT-In: cert-in.org.in",
        "Monitor credit score for new loans/cards in your name",
        "Place fraud alert with banks",
        "Check CIBIL report for unknown credit inquiries",
      ]},
    ],
    contacts: [
      { name: "UIDAI (Aadhaar)", value: "1947", href: "tel:1947" },
      { name: "Cyber Crime Portal", value: "cybercrime.gov.in", href: "https://cybercrime.gov.in" },
      { name: "CERT-In", value: "cert-in.org.in", href: "https://www.cert-in.org.in" },
    ],
  },
  ransomware: {
    title: "Ransomware / Files Locked",
    warning: "⚠️ Do NOT pay the ransom — it rarely recovers files and encourages more attacks.",
    timeline: [
      { time: "Immediately", urgent: true, actions: [
        "Disconnect from internet and all networks IMMEDIATELY",
        "Do NOT restart the computer — it may encrypt more files",
        "Take photos of the ransom message on screen",
        "Do NOT pay the ransom",
        "Disconnect all external drives and USB devices",
      ]},
      { time: "Same Day", urgent: true, actions: [
        "Report to cybercrime.gov.in with screenshots",
        "Contact CERT-In: cert-in.org.in for technical help",
        "Search for free decryption tool on nomoreransom.org",
        "Consult IT professional before doing anything",
      ]},
      { time: "Recovery", urgent: false, actions: [
        "Restore from backup if available",
        "Check nomoreransom.org for your specific ransomware decryptor",
        "Clean install OS if no backup available",
        "Set up regular backups to prevent future loss",
      ]},
    ],
    contacts: [
      { name: "Cyber Crime Helpline", value: "1930", href: "tel:1930" },
      { name: "CERT-In", value: "cert-in.org.in", href: "https://www.cert-in.org.in" },
      { name: "No More Ransom", value: "nomoreransom.org", href: "https://www.nomoreransom.org" },
    ],
  },
};

export default function EmergencyResponsePage() {
  const [selected, setSelected] = useState("");
  const plan = RESPONSE_PLANS[selected];

  return (
    <ToolPageWrapper badge="🆘 Emergency Guide">
      <main className="px-6 py-12 pb-24 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-block bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-1.5 rounded-full text-xs mb-4">
              🆘 Emergency Cyber Response — India
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Emergency Response Guide</h1>
            <p className="text-gray-400">Select your situation — get exact step-by-step actions with official helpline numbers</p>
          </div>

          {/* Emergency number banner */}
          <div className="bg-red-500/10 border border-red-500/40 rounded-2xl p-4 mb-8 flex items-center justify-between">
            <div>
              <p className="text-red-400 font-bold">🆘 National Cyber Crime Helpline</p>
              <p className="text-gray-400 text-sm">Toll Free • 24/7 • Call immediately for any cyber fraud</p>
            </div>
            <a href="tel:1930"
              className="bg-red-500 hover:bg-red-400 text-white px-6 py-3 rounded-xl font-black text-xl transition">
              1930
            </a>
          </div>

          {/* Scenario selection */}
          <div className="grid sm:grid-cols-2 gap-3 mb-8">
            {SCENARIOS.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id)}
                className={`text-left p-4 rounded-2xl border transition ${selected===s.id ? "bg-cyan-500/20 border-cyan-500/50" : "bg-black/40 border-zinc-700/50 hover:border-zinc-600"}`}>
                <div className="flex items-start gap-3">
                  <span className="text-2xl shrink-0">{s.icon}</span>
                  <div>
                    <p className={`font-semibold text-sm ${selected===s.id ? "text-cyan-400" : "text-white"}`}>{s.label}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{s.desc}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Action Plan */}
          {plan && (
            <div className="space-y-5">
              <h2 className="text-2xl font-bold text-cyan-400">{plan.title}</h2>

              {plan.warning && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 text-red-300 text-sm font-medium">
                  {plan.warning}
                </div>
              )}

              {/* Timeline */}
              {plan.timeline.map((phase, i) => (
                <div key={i} className={`border rounded-2xl p-6 ${phase.urgent ? "border-red-500/30 bg-red-500/5" : "border-zinc-700/60 bg-black/40"}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`px-3 py-1 rounded-full text-xs font-bold border ${phase.urgent ? "bg-red-500/20 border-red-500/40 text-red-400" : "bg-zinc-800 border-zinc-700 text-gray-400"}`}>
                      {phase.urgent ? "🚨 URGENT" : "📋 IMPORTANT"}
                    </div>
                    <h3 className={`font-bold ${phase.urgent ? "text-red-400" : "text-white"}`}>{phase.time}</h3>
                  </div>
                  <div className="space-y-3">
                    {phase.actions.map((action, j) => (
                      <div key={j} className="flex items-start gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${phase.urgent ? "bg-red-500 text-white" : "bg-cyan-500 text-black"}`}>
                          {j+1}
                        </div>
                        <p className="text-gray-200 text-sm leading-relaxed">{action}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Contacts */}
              <div className="bg-black/40 backdrop-blur-sm border border-zinc-700/60 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">📞 Important Contacts</h3>
                <div className="grid grid-cols-2 gap-3">
                  {plan.contacts.map(c => (
                    <a key={c.name} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="bg-black/40 border border-cyan-500/20 rounded-xl p-3 hover:border-cyan-400 transition">
                      <p className="text-gray-400 text-xs">{c.name}</p>
                      <p className="text-cyan-400 font-bold text-sm">{c.value}</p>
                    </a>
                  ))}
                </div>
              </div>

              <button onClick={() => window.print()}
                className="w-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 py-3 rounded-xl transition hover:bg-cyan-500/30 font-semibold">
                🖨️ Print / Save This Guide
              </button>
            </div>
          )}

          {!selected && (
            <div className="bg-black/40 border border-zinc-700/60 rounded-2xl p-6 text-center text-gray-500">
              <p className="text-3xl mb-2">☝️</p>
              <p>Select your situation above to get the action plan</p>
            </div>
          )}
        </div>
      </main>
    </ToolPageWrapper>
  );
}
