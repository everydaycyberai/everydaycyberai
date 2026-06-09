"use client";

import { useState } from "react";

function ipToInt(ip: string): number {
  return ip.split(".").reduce((acc, oct) => (acc << 8) + parseInt(oct), 0) >>> 0;
}

function intToIp(n: number): string {
  return [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join(".");
}

function cidrToMask(cidr: number): string {
  const mask = cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
  return intToIp(mask);
}

function analyzeIP(ipCidr: string) {
  const [ipPart, cidrPart] = ipCidr.includes("/") ? ipCidr.split("/") : [ipCidr, "24"];
  const cidr = parseInt(cidrPart ?? "24");
  const parts = ipPart.split(".").map(Number);

  if (parts.length !== 4 || parts.some((p) => isNaN(p) || p < 0 || p > 255)) return null;
  if (isNaN(cidr) || cidr < 0 || cidr > 32) return null;

  const ipInt     = ipToInt(ipPart);
  const maskInt   = cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
  const networkInt = (ipInt & maskInt) >>> 0;
  const broadcastInt = (networkInt | (~maskInt >>> 0)) >>> 0;
  const firstHost  = networkInt + 1;
  const lastHost   = broadcastInt - 1;
  const totalHosts = cidr >= 31 ? Math.pow(2, 32 - cidr) : Math.pow(2, 32 - cidr) - 2;

  // IP Class
  const first = parts[0];
  let ipClass = "Unknown";
  if (first >= 1   && first <= 126) ipClass = "Class A";
  if (first === 127) ipClass = "Loopback (127.x.x.x)";
  if (first >= 128 && first <= 191) ipClass = "Class B";
  if (first >= 192 && first <= 223) ipClass = "Class C";
  if (first >= 224 && first <= 239) ipClass = "Class D (Multicast)";
  if (first >= 240) ipClass = "Class E (Reserved)";

  // Private check
  const isPrivate =
    (parts[0] === 10) ||
    (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) ||
    (parts[0] === 192 && parts[1] === 168) ||
    (parts[0] === 169 && parts[1] === 254);

  // Type
  let ipType = isPrivate ? "Private (RFC 1918)" : "Public";
  if (parts[0] === 127) ipType = "Loopback";
  if (parts[0] === 169 && parts[1] === 254) ipType = "Link-Local (APIPA)";

  return {
    ip: ipPart,
    cidr,
    subnetMask: cidrToMask(cidr),
    networkAddress: intToIp(networkInt),
    broadcastAddress: intToIp(broadcastInt),
    firstHost: cidr >= 31 ? intToIp(networkInt) : intToIp(firstHost),
    lastHost: cidr >= 31 ? intToIp(broadcastInt) : intToIp(lastHost),
    totalHosts: Math.max(totalHosts, 0),
    ipClass,
    ipType,
    isPrivate,
    binary: parts.map((p) => p.toString(2).padStart(8, "0")).join("."),
  };
}

export default function IPCalculatorPage() {
  const [input, setInput]   = useState("");
  const [result, setResult] = useState<ReturnType<typeof analyzeIP>>(null);
  const [error, setError]   = useState("");

  const calculate = () => {
    setError("");
    const res = analyzeIP(input.trim());
    if (!res) {
      setError("Invalid IP address. Example: 192.168.1.1 or 192.168.1.0/24");
      setResult(null);
    } else {
      setResult(res);
    }
  };

  const Row = ({ label, value, accent }: { label: string; value: string; accent?: boolean }) => (
    <div className="flex items-center justify-between py-3 border-b border-zinc-800 last:border-0">
      <span className="text-gray-400 text-sm">{label}</span>
      <span className={`font-mono text-sm font-semibold ${accent ? "text-cyan-400" : "text-white"}`}>{value}</span>
    </div>
  );

  return (
    <main className="min-h-screen bg-black text-white px-6 py-32">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 px-5 py-2 rounded-full text-sm mb-6">
            Networking Tool
          </div>
          <h1 className="text-5xl font-bold mb-4">IP Calculator</h1>
          <p className="text-gray-400">
            Subnet calculator, IP class detector and network range analyzer
          </p>
        </div>

        {/* Input */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 mb-6">
          <label className="block text-gray-300 font-medium mb-3">Enter IP Address or CIDR</label>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="e.g. 192.168.1.0/24 or 10.0.0.1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && calculate()}
              className="flex-1 bg-black border border-zinc-700 rounded-2xl px-5 py-4 font-mono outline-none focus:border-cyan-400 transition text-white placeholder-gray-600"
            />
            <button
              onClick={calculate}
              className="bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-4 rounded-2xl font-bold transition duration-300 shrink-0"
            >
              Calculate
            </button>
          </div>

          {/* Quick examples */}
          <div className="flex flex-wrap gap-2 mt-4">
            {["192.168.1.0/24", "10.0.0.0/8", "172.16.0.0/12", "203.0.113.5/30"].map((ex) => (
              <button
                key={ex}
                onClick={() => { setInput(ex); setError(""); setResult(null); }}
                className="text-xs bg-zinc-800 hover:bg-zinc-700 text-gray-400 hover:text-cyan-400 px-3 py-1 rounded-lg transition"
              >
                {ex}
              </button>
            ))}
          </div>

          {error && <p className="text-red-400 text-sm mt-4">⚠️ {error}</p>}
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-4">

            {/* IP Type Badge */}
            <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl border ${
              result.isPrivate
                ? "bg-green-500/10 border-green-500/30 text-green-400"
                : "bg-blue-500/10 border-blue-500/30 text-blue-400"
            }`}>
              <span className="text-2xl">{result.isPrivate ? "🔒" : "🌐"}</span>
              <div>
                <p className="font-semibold">{result.ipType}</p>
                <p className="text-sm opacity-70">{result.isPrivate ? "Not reachable from the internet" : "Reachable from the internet"}</p>
              </div>
            </div>

            {/* Main Info */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <h2 className="text-cyan-400 font-semibold mb-4">Network Details</h2>
              <Row label="IP Address"       value={result.ip} accent />
              <Row label="CIDR Notation"    value={`/${result.cidr}`} />
              <Row label="Subnet Mask"      value={result.subnetMask} />
              <Row label="Network Address"  value={result.networkAddress} />
              <Row label="Broadcast"        value={result.broadcastAddress} />
              <Row label="First Host"       value={result.firstHost} />
              <Row label="Last Host"        value={result.lastHost} />
              <Row label="Usable Hosts"     value={result.totalHosts.toLocaleString()} accent />
              <Row label="IP Class"         value={result.ipClass} />
            </div>

            {/* Binary */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <h2 className="text-cyan-400 font-semibold mb-3">Binary Representation</h2>
              <p className="font-mono text-sm text-gray-300 break-all">{result.binary}</p>
            </div>

          </div>
        )}

        {/* Info Box */}
        <div className="mt-8 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-cyan-400 mb-4">🌐 Private IP Ranges (RFC 1918)</h2>
          <div className="space-y-2 text-sm font-mono">
            <div className="flex justify-between text-gray-400"><span>10.0.0.0/8</span><span className="text-gray-500">Class A — 16.7 million hosts</span></div>
            <div className="flex justify-between text-gray-400"><span>172.16.0.0/12</span><span className="text-gray-500">Class B — 1 million hosts</span></div>
            <div className="flex justify-between text-gray-400"><span>192.168.0.0/16</span><span className="text-gray-500">Class C — 65,536 hosts</span></div>
          </div>
        </div>

      </div>
    </main>
  );
}
