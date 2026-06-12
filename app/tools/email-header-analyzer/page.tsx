"use client";
import { useState } from "react";
import ToolPageWrapper from "@/components/ToolPageWrapper";

// ── Types ────────────────────────────────────────────────────
interface HopInfo {
  from: string;
  by: string;
  ip: string;
  timestamp: string;
  delay: string;
}

interface AnalysisResult {
  // Basic
  from: string;
  replyTo: string;
  returnPath: string;
  to: string;
  subject: string;
  date: string;
  messageId: string;

  // Auth
  spf: { result: string; domain: string; ip: string };
  dkim: { result: string; domain: string };
  dmarc: { result: string; action: string };

  // IPs
  originatingIP: string;
  allIPs: string[];
  hops: HopInfo[];

  // Security
  spoofingRisk: "low" | "medium" | "high";
  spoofingReasons: string[];
  isPhishing: boolean;
  phishingReasons: string[];

  // Server
  mailClient: string;
  sendingServer: string;
  receivingServer: string;
  totalDelay: string;

  // Raw fields
  xMailer: string;
  xOriginatingIP: string;
  contentType: string;
  mimeVersion: string;
}

// ── Parser ───────────────────────────────────────────────────
function parseHeaders(raw: string): AnalysisResult {
  const h = raw;
  const get = (pattern: RegExp) => (h.match(pattern)?.[1] || "").trim();
  const getAll = (pattern: RegExp, str: string) => {
    const matches: string[] = [];
    let m;
    const re = new RegExp(pattern.source, "gi");
    while ((m = re.exec(str)) !== null) matches.push(m[1].trim());
    return matches;
  };

  // Basic fields
  const from       = get(/^From:\s*(.+)/im);
  const replyTo    = get(/^Reply-To:\s*(.+)/im);
  const returnPath = get(/^Return-Path:\s*(.+)/im);
  const to         = get(/^To:\s*(.+)/im);
  const subject    = get(/^Subject:\s*(.+)/im);
  const date       = get(/^Date:\s*(.+)/im);
  const messageId  = get(/^Message-ID:\s*(.+)/im);
  const xMailer    = get(/^X-Mailer:\s*(.+)/im);
  const contentType= get(/^Content-Type:\s*(.+)/im);
  const mimeVersion= get(/^MIME-Version:\s*(.+)/im);

  // X-Originating-IP
  const xOriginatingIP = get(/X-Originating-IP:\s*\[?([0-9a-f:.]+)\]?/i);

  // Auth results
  const authResults = h.match(/Authentication-Results:[\s\S]*?(?=\n\S)/gi)?.[0] || "";

  const spfMatch   = authResults.match(/spf=(\w+)/i);
  const spfIP      = authResults.match(/\(sender IP is ([^\)]+)\)/i)?.[1] || "";
  const spfDomain  = authResults.match(/smtp\.(?:mailfrom|helo)=([^\s;]+)/i)?.[1] || "";
  const dkimMatch  = authResults.match(/dkim=(\w+)/i);
  const dkimDomain = authResults.match(/header\.(?:d|i)=([^\s;]+)/i)?.[1] || "";
  const dmarcMatch = authResults.match(/dmarc=(\w+)/i);
  const dmarcAction= authResults.match(/action=(\w+)/i)?.[1] || "none";

  // Extract ALL IPs from Received headers
  const receivedHeaders = h.match(/^Received:[\s\S]*?(?=^\S)/gim) || [];
  const ipRegex = /(?:\[([0-9]{1,3}(?:\.[0-9]{1,3}){3})\]|\(([0-9]{1,3}(?:\.[0-9]{1,3}){3})\)|from.*?([0-9]{1,3}(?:\.[0-9]{1,3}){3}))/g;

  const allIPsSet = new Set<string>();
  if (xOriginatingIP) allIPsSet.add(xOriginatingIP);
  if (spfIP) allIPsSet.add(spfIP);

  receivedHeaders.forEach(rec => {
    let m;
    const re = /\[([0-9]{1,3}(?:\.[0-9]{1,3}){3})\]/g;
    while ((m = re.exec(rec)) !== null) {
      const ip = m[1];
      if (!ip.startsWith("127.") && !ip.startsWith("10.") && !ip.startsWith("192.168.") && !ip.startsWith("172.")) {
        allIPsSet.add(ip);
      }
    }
  });

  const allIPs = Array.from(allIPsSet).slice(0, 10);
  const originatingIP = xOriginatingIP || spfIP || allIPs[allIPs.length - 1] || "Not found";

  // Parse hops from Received headers
  const hops: HopInfo[] = [];
  let prevTime: Date | null = null;
  const sortedReceived = [...receivedHeaders].reverse();

  sortedReceived.forEach(rec => {
    const fromMatch = rec.match(/from\s+([^\s]+)/i);
    const byMatch   = rec.match(/by\s+([^\s]+)/i);
    const ipMatch   = rec.match(/\[([0-9]{1,3}(?:\.[0-9]{1,3}){3})\]/);
    const timeMatch = rec.match(/;\s*(.+)$/im);

    let delay = "";
    let currentTime: Date | null = null;
    if (timeMatch) {
      try {
        currentTime = new Date(timeMatch[1].trim());
        if (prevTime && currentTime && !isNaN(currentTime.getTime())) {
          const diff = Math.abs(currentTime.getTime() - prevTime.getTime()) / 1000;
          delay = diff < 60 ? `${Math.round(diff)}s` : `${Math.round(diff/60)}m`;
        }
        prevTime = currentTime;
      } catch {}
    }

    if (fromMatch || byMatch) {
      hops.push({
        from: fromMatch?.[1] || "unknown",
        by: byMatch?.[1] || "unknown",
        ip: ipMatch?.[1] || "",
        timestamp: timeMatch ? new Date(timeMatch[1].trim()).toLocaleString("en-IN") : "",
        delay,
      });
    }
  });

  // Mail client detection
  let mailClient = "Unknown";
  if (xMailer) mailClient = xMailer;
  else if (h.match(/X-Google-DKIM/i)) mailClient = "Gmail";
  else if (h.match(/X-MS-Exchange|X-Microsoft/i)) mailClient = "Microsoft Outlook / Exchange";
  else if (h.match(/X-Yahoo/i)) mailClient = "Yahoo Mail";
  else if (h.match(/X-ProtonMail/i)) mailClient = "ProtonMail";
  else if (h.match(/X-Zoho/i)) mailClient = "Zoho Mail";
  else if (h.match(/X-Mailer.*Thunderbird/i)) mailClient = "Mozilla Thunderbird";

  // Sending / receiving servers
  const sendingServer   = hops[0]?.from || "Unknown";
  const receivingServer = hops[hops.length - 1]?.by || "Unknown";

  // Spoofing detection
  const spoofingReasons: string[] = [];
  const fromDomain        = from.match(/@([^\s>]+)/)?.[1]?.toLowerCase() || "";
  const returnPathDomain  = returnPath.match(/@([^\s>]+)/)?.[1]?.toLowerCase() || "";
  const replyToDomain     = replyTo.match(/@([^\s>]+)/)?.[1]?.toLowerCase() || "";

  if (spfMatch?.[1]?.toLowerCase() === "fail") spoofingReasons.push("SPF FAILED — sending server not authorized for this domain");
  if (spfMatch?.[1]?.toLowerCase() === "softfail") spoofingReasons.push("SPF SOFTFAIL — possible unauthorized sender");
  if (dkimMatch?.[1]?.toLowerCase() === "fail") spoofingReasons.push("DKIM FAILED — email may have been tampered with");
  if (!dkimMatch) spoofingReasons.push("DKIM missing — email not cryptographically signed");
  if (dmarcMatch?.[1]?.toLowerCase() === "fail") spoofingReasons.push("DMARC FAILED — sender domain policy violated");
  if (fromDomain && returnPathDomain && fromDomain !== returnPathDomain) {
    spoofingReasons.push(`From domain (${fromDomain}) differs from Return-Path (${returnPathDomain})`);
  }
  if (replyTo && replyToDomain && fromDomain && fromDomain !== replyToDomain) {
    spoofingReasons.push(`Reply-To domain (${replyToDomain}) differs from From domain — replies will go elsewhere`);
  }

  const spoofingRisk: "low"|"medium"|"high" =
    spoofingReasons.length >= 3 ? "high" :
    spoofingReasons.length >= 1 ? "medium" : "low";

  // Phishing indicators
  const phishingReasons: string[] = [];
  if (subject.match(/urgent|verify|suspended|blocked|action required|winner|lottery|prize|click here|confirm your/i)) {
    phishingReasons.push(`Suspicious subject line: "${subject}"`);
  }
  if (spoofingRisk === "high") phishingReasons.push("Multiple authentication failures indicate spoofed sender");
  if (fromDomain && returnPathDomain && fromDomain !== returnPathDomain) {
    phishingReasons.push("From and Return-Path mismatch — classic phishing pattern");
  }
  if (originatingIP && !originatingIP.includes("Not found")) {
    const knownGoodIPs = ["google", "gmail", "yahoo", "microsoft", "outlook", "amazon"];
    const srvLower = sendingServer.toLowerCase();
    if (!knownGoodIPs.some(k => srvLower.includes(k)) && spfMatch?.[1]?.toLowerCase() === "fail") {
      phishingReasons.push("Email from unknown server with failed SPF — high phishing risk");
    }
  }

  const isPhishing = phishingReasons.length >= 2;

  // Total delivery time
  const firstHop = hops[0];
  const lastHop  = hops[hops.length - 1];
  let totalDelay = "Unknown";
  try {
    if (firstHop?.timestamp && lastHop?.timestamp) {
      const diff = Math.abs(new Date(lastHop.timestamp).getTime() - new Date(firstHop.timestamp).getTime()) / 1000;
      totalDelay = diff < 60 ? `${Math.round(diff)} seconds` : `${Math.round(diff/60)} minutes`;
    }
  } catch {}

  return {
    from, replyTo, returnPath, to, subject, date, messageId,
    spf: { result: spfMatch?.[1] || "none", domain: spfDomain, ip: spfIP },
    dkim: { result: dkimMatch?.[1] || "none", domain: dkimDomain },
    dmarc: { result: dmarcMatch?.[1] || "none", action: dmarcAction },
    originatingIP, allIPs, hops,
    spoofingRisk, spoofingReasons, isPhishing, phishingReasons,
    mailClient, sendingServer, receivingServer, totalDelay,
    xMailer, xOriginatingIP, contentType, mimeVersion,
  };
}

// ── UI Helpers ────────────────────────────────────────────────
function AuthBadge({ result }: { result: string }) {
  const r = result.toLowerCase();
  const config = r === "pass" ? { bg: "bg-green-500/15 border-green-500/30 text-green-400", label: "✅ PASS" }
    : r === "fail"            ? { bg: "bg-red-500/15 border-red-500/30 text-red-400",     label: "❌ FAIL" }
    : r === "softfail"        ? { bg: "bg-orange-500/15 border-orange-500/30 text-orange-400", label: "⚠️ SOFTFAIL" }
    : r === "none"            ? { bg: "bg-gray-500/15 border-gray-500/30 text-gray-400",   label: "— NONE" }
    :                           { bg: "bg-yellow-500/15 border-yellow-500/30 text-yellow-400", label: `⚠️ ${result.toUpperCase()}` };
  return <span className={`text-xs px-2 py-0.5 rounded-lg border font-bold ${config.bg}`}>{config.label}</span>;
}

function InfoRow({ label, value, mono = false, highlight = false }: { label: string; value: string; mono?: boolean; highlight?: boolean }) {
  if (!value) return null;
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-1 py-2.5 border-b border-zinc-800/60 last:border-0">
      <span className="text-gray-500 text-xs w-40 shrink-0 mt-0.5">{label}</span>
      <span className={`text-sm break-all ${mono ? "font-mono text-cyan-300" : ""} ${highlight ? "text-white font-semibold" : "text-gray-300"}`}>
        {value}
      </span>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────
export default function EmailHeaderAnalyzerPage() {
  const [raw, setRaw]       = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [ipInfo, setIpInfo] = useState<Record<string, { country: string; city: string; org: string; timezone: string }>>({});

  const analyze = async () => {
    if (!raw.trim() || raw.trim().split("\n").length < 3) return;
    setLoading(true);
    setResult(null);
    setIpInfo({});
    await new Promise(r => setTimeout(r, 400));
    const res = parseHeaders(raw);
    setResult(res);
    setLoading(false);

    // Fetch IP geolocation for originating IP
    if (res.originatingIP && res.originatingIP !== "Not found") {
      try {
        const resp = await fetch(`https://ipapi.co/${res.originatingIP}/json/`);
        const data = await resp.json();
        setIpInfo(prev => ({
          ...prev,
          [res.originatingIP]: {
            country: `${data.country_name} ${data.country_flag || ""}`,
            city: `${data.city || ""}, ${data.region || ""}`,
            org: data.org || data.asn || "",
            timezone: data.timezone || "",
          }
        }));
      } catch {}
    }
  };

  const riskConfig = {
    low:    { label: "✅ Low Risk — Email appears legitimate", color: "border-green-500/40 bg-green-500/8 text-green-400" },
    medium: { label: "⚠️ Medium Risk — Some authentication issues", color: "border-yellow-500/40 bg-yellow-500/8 text-yellow-400" },
    high:   { label: "🚨 High Risk — Possible spoofed/fake email", color: "border-red-500/40 bg-red-500/8 text-red-400" },
  };

  return (
    <ToolPageWrapper badge="🔍 Security Tool">
      <main className="px-4 py-10 pb-24 relative z-10">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-block bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-4 py-1.5 rounded-full text-xs mb-4">
              🔍 Free Email Forensics Tool
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Email Header Analyzer</h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm leading-relaxed">
              Paste email headers to trace origin IP, detect spoofing/phishing, verify SPF/DKIM/DMARC authentication
              and see the full delivery path. 100% private — analyzed in browser only.
            </p>
          </div>

          {/* How to get headers */}
          <div className="bg-black/40 border border-zinc-700/60 rounded-2xl p-5 mb-6">
            <p className="text-cyan-400 font-semibold text-sm mb-3">📖 How to get email headers:</p>
            <div className="grid sm:grid-cols-3 gap-3 text-xs text-gray-400">
              {[
                { app: "Gmail", steps: "Open email → 3 dots menu → Show original → Copy all" },
                { app: "Outlook", steps: "Open email → File → Properties → Copy from 'Internet headers' box" },
                { app: "Yahoo Mail", steps: "Open email → 3 dots → View Raw Message → Copy all" },
              ].map(item => (
                <div key={item.app} className="bg-black/30 rounded-xl p-3">
                  <p className="text-white font-semibold mb-1">{item.app}</p>
                  <p>{item.steps}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="bg-black/40 backdrop-blur-sm border border-zinc-700/60 rounded-3xl p-6 mb-6">
            <label className="block text-gray-300 font-medium mb-3">
              Paste Full Email Headers Here
            </label>
            <textarea
              rows={10}
              value={raw}
              onChange={e => setRaw(e.target.value)}
              placeholder={`Delivered-To: you@gmail.com\nReceived: from mail-sor-f41.google.com (mail-sor-f41.google.com. [209.85.220.41])\n        by mx.google.com with SMTPS id...\nAuthentication-Results: mx.google.com;\n       dkim=pass header.i=@gmail.com;\n       spf=pass (google.com: domain of sender@gmail.com)\nFrom: Sender Name <sender@domain.com>\nTo: recipient@gmail.com\nSubject: Your subject here\nDate: Thu, 12 Jun 2026 10:30:00 +0530\n...paste full headers here`}
              className="w-full bg-black/60 border border-zinc-700/60 rounded-2xl px-4 py-3 text-white text-xs font-mono resize-none outline-none focus:border-cyan-400 transition leading-relaxed"
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={analyze}
                disabled={loading || raw.trim().split("\n").length < 3}
                className="flex-1 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-black py-3.5 rounded-2xl font-bold transition hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]">
                {loading ? "🔍 Analyzing..." : "🔍 Analyze Headers"}
              </button>
              {raw && (
                <button
                  onClick={() => { setRaw(""); setResult(null); setIpInfo({}); }}
                  className="bg-zinc-800 hover:bg-zinc-700 text-gray-400 px-5 py-3.5 rounded-2xl transition">
                  Clear
                </button>
              )}
            </div>
            <p className="text-gray-600 text-xs mt-2 text-center">🔒 All analysis happens in your browser — headers are never sent anywhere</p>
          </div>

          {/* Loading */}
          {loading && (
            <div className="text-center py-8 text-gray-400">
              <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"/>
              <p className="text-sm">Parsing headers and analyzing authentication...</p>
            </div>
          )}

          {/* Results */}
          {result && !loading && (
            <div className="space-y-5">

              {/* Risk Banner */}
              <div className={`border rounded-2xl p-5 ${riskConfig[result.spoofingRisk].color}`}>
                <p className="text-lg font-bold">{riskConfig[result.spoofingRisk].label}</p>
                {result.isPhishing && (
                  <p className="text-red-400 font-bold mt-1">🚨 PHISHING WARNING — Do NOT click links in this email!</p>
                )}
                {result.spoofingReasons.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {result.spoofingReasons.map((r, i) => (
                      <li key={i} className="text-sm flex gap-2"><span className="shrink-0">→</span>{r}</li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Authentication */}
              <div className="bg-black/40 border border-zinc-700/60 rounded-2xl overflow-hidden">
                <div className="bg-cyan-500/8 border-b border-zinc-700/60 px-5 py-3">
                  <h3 className="text-cyan-400 font-bold text-sm">🔐 Email Authentication Results</h3>
                </div>
                <div className="p-5 grid sm:grid-cols-3 gap-4">
                  {[
                    {
                      label: "SPF", sub: "Sender Policy Framework",
                      desc: "Checks if sending server is authorized",
                      result: result.spf.result,
                      detail: result.spf.ip ? `IP: ${result.spf.ip}` : result.spf.domain,
                    },
                    {
                      label: "DKIM", sub: "DomainKeys Identified Mail",
                      desc: "Verifies email not tampered in transit",
                      result: result.dkim.result,
                      detail: result.dkim.domain,
                    },
                    {
                      label: "DMARC", sub: "Domain-Based Auth Reporting",
                      desc: "Policy enforcement for SPF + DKIM",
                      result: result.dmarc.result,
                      detail: `Action: ${result.dmarc.action}`,
                    },
                  ].map(item => (
                    <div key={item.label} className="bg-black/40 border border-zinc-800 rounded-xl p-4 text-center">
                      <p className="font-black text-2xl text-white mb-1">{item.label}</p>
                      <p className="text-gray-500 text-xs mb-2">{item.sub}</p>
                      <AuthBadge result={item.result} />
                      {item.detail && <p className="text-gray-500 text-xs mt-2 font-mono">{item.detail}</p>}
                      <p className="text-gray-600 text-xs mt-1">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Originating IP */}
              {result.originatingIP !== "Not found" && (
                <div className="bg-black/40 border border-zinc-700/60 rounded-2xl overflow-hidden">
                  <div className="bg-cyan-500/8 border-b border-zinc-700/60 px-5 py-3">
                    <h3 className="text-cyan-400 font-bold text-sm">📍 Originating IP Address</h3>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl font-black text-cyan-400 font-mono">{result.originatingIP}</span>
                      {result.xOriginatingIP && (
                        <span className="text-xs bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded">X-Originating-IP</span>
                      )}
                    </div>
                    {ipInfo[result.originatingIP] ? (
                      <div className="grid sm:grid-cols-2 gap-3">
                        {[
                          { label: "🌍 Country", value: ipInfo[result.originatingIP].country },
                          { label: "🏙️ City/Region", value: ipInfo[result.originatingIP].city },
                          { label: "🏢 ISP / Organization", value: ipInfo[result.originatingIP].org },
                          { label: "🕐 Timezone", value: ipInfo[result.originatingIP].timezone },
                        ].map(({ label, value }) => value ? (
                          <div key={label} className="bg-black/40 border border-zinc-800 rounded-xl p-3">
                            <p className="text-gray-500 text-xs">{label}</p>
                            <p className="text-white text-sm font-semibold mt-1">{value}</p>
                          </div>
                        ) : null)}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <div className="w-4 h-4 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"/>
                        Loading geolocation...
                      </div>
                    )}
                    {result.allIPs.length > 1 && (
                      <div className="mt-4">
                        <p className="text-gray-500 text-xs mb-2">All IPs found in headers:</p>
                        <div className="flex flex-wrap gap-2">
                          {result.allIPs.map(ip => (
                            <span key={ip} className="font-mono text-xs bg-zinc-800 border border-zinc-700 text-gray-300 px-3 py-1 rounded-lg">
                              {ip}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Sender Info */}
              <div className="bg-black/40 border border-zinc-700/60 rounded-2xl overflow-hidden">
                <div className="bg-cyan-500/8 border-b border-zinc-700/60 px-5 py-3">
                  <h3 className="text-cyan-400 font-bold text-sm">👤 Sender Information</h3>
                </div>
                <div className="px-5 py-2">
                  <InfoRow label="From"         value={result.from}       highlight />
                  <InfoRow label="Reply-To"     value={result.replyTo}    highlight={!!result.replyTo && result.replyTo !== result.from} />
                  <InfoRow label="Return-Path"  value={result.returnPath} mono />
                  <InfoRow label="To"           value={result.to} />
                  <InfoRow label="Subject"      value={result.subject}    highlight />
                  <InfoRow label="Date"         value={result.date} />
                  <InfoRow label="Message-ID"   value={result.messageId}  mono />
                  <InfoRow label="Mail Client"  value={result.mailClient} />
                  <InfoRow label="X-Mailer"     value={result.xMailer}    mono />
                  <InfoRow label="Content-Type" value={result.contentType} mono />
                </div>
              </div>

              {/* Delivery Path */}
              {result.hops.length > 0 && (
                <div className="bg-black/40 border border-zinc-700/60 rounded-2xl overflow-hidden">
                  <div className="bg-cyan-500/8 border-b border-zinc-700/60 px-5 py-3 flex justify-between items-center">
                    <h3 className="text-cyan-400 font-bold text-sm">🛤️ Email Delivery Path ({result.hops.length} hops)</h3>
                    {result.totalDelay !== "Unknown" && (
                      <span className="text-xs text-gray-500">Total: {result.totalDelay}</span>
                    )}
                  </div>
                  <div className="p-4 space-y-2">
                    {result.hops.map((hop, i) => (
                      <div key={i} className="flex gap-3 items-start">
                        <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-xs flex items-center justify-center shrink-0 font-bold">
                          {i + 1}
                        </div>
                        <div className="flex-1 bg-black/40 border border-zinc-800/60 rounded-xl p-3 min-w-0">
                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
                            <span><span className="text-gray-500">From:</span> <span className="text-gray-300 font-mono">{hop.from}</span></span>
                            <span><span className="text-gray-500">By:</span> <span className="text-gray-300 font-mono">{hop.by}</span></span>
                            {hop.ip && <span><span className="text-gray-500">IP:</span> <span className="text-cyan-400 font-mono">{hop.ip}</span></span>}
                            {hop.delay && <span className="text-yellow-400">+{hop.delay}</span>}
                          </div>
                          {hop.timestamp && <p className="text-gray-600 text-xs mt-1">{hop.timestamp}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Phishing indicators */}
              {result.phishingReasons.length > 0 && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-5">
                  <h3 className="text-red-400 font-bold mb-3">🚨 Phishing Indicators Detected</h3>
                  <ul className="space-y-2">
                    {result.phishingReasons.map((r, i) => (
                      <li key={i} className="flex gap-2 text-sm text-red-300">
                        <span className="shrink-0">⚠️</span>{r}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 p-3 bg-black/30 rounded-xl text-xs text-gray-400">
                    <p className="font-semibold text-white mb-1">What to do:</p>
                    <p>1. Do NOT click any links in this email</p>
                    <p>2. Do NOT download attachments</p>
                    <p>3. Report as phishing in your email client</p>
                    <p>4. If you received this on behalf of a business, report to <span className="text-cyan-400">cert-in.org.in</span></p>
                  </div>
                </div>
              )}

              {/* Summary guide */}
              <div className="bg-black/40 border border-zinc-700/60 rounded-2xl p-5">
                <h3 className="text-cyan-400 font-semibold mb-3 text-sm">📚 How to read these results</h3>
                <div className="space-y-2 text-xs text-gray-400">
                  {[
                    { term: "SPF PASS", meaning: "Sending server is authorized by the domain — good sign" },
                    { term: "SPF FAIL", meaning: "Server NOT authorized — possible spoofed domain" },
                    { term: "DKIM PASS", meaning: "Email not modified in transit — cryptographically verified" },
                    { term: "DKIM FAIL/NONE", meaning: "Email may have been tampered or not signed" },
                    { term: "DMARC PASS", meaning: "Both SPF and DKIM aligned — most trustworthy result" },
                    { term: "From ≠ Return-Path", meaning: "Classic phishing trick — replies go to different address" },
                  ].map(({ term, meaning }) => (
                    <div key={term} className="flex gap-2">
                      <span className="text-cyan-400 font-mono shrink-0">{term}:</span>
                      <span>{meaning}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* Empty state */}
          {!result && !loading && (
            <div className="text-center py-10 text-gray-600">
              <div className="text-5xl mb-3">📧</div>
              <p className="text-sm">Paste email headers above and click Analyze</p>
            </div>
          )}

        </div>
      </main>
    </ToolPageWrapper>
  );
}
