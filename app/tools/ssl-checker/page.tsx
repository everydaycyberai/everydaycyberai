"use client";

import { useState } from "react";

type SSLResult = {
  domain: string;
  hasSSL: boolean;
  redirectsToHTTPS: boolean;
  statusCode?: number;
  error?: string;
};

export default function SSLCheckerPage() {
  const [domain, setDomain]   = useState("");
  const [result, setResult]   = useState<SSLResult | null>(null);
  const [loading, setLoading] = useState(false);

  const cleanDomain = (input: string) =>
    input.trim().replace(/^https?:\/\//, "").replace(/\/.*$/, "").toLowerCase();

  const checkSSL = async () => {
    const d = cleanDomain(domain);
    if (!d) return;

    setLoading(true);
    setResult(null);

    try {
      // Check HTTPS
      let hasSSL = false;
      let statusCode: number | undefined;

      try {
        const res = await fetch(`https://${d}`, { method: "HEAD", signal: AbortSignal.timeout(8000) });
        hasSSL = true;
        statusCode = res.status;
      } catch {
        hasSSL = false;
      }

      // Check HTTP redirect
      let redirectsToHTTPS = false;
      try {
        const res = await fetch(`http://${d}`, { method: "HEAD", signal: AbortSignal.timeout(8000), redirect: "follow" });
        redirectsToHTTPS = res.url.startsWith("https://");
      } catch {
        redirectsToHTTPS = false;
      }

      setResult({ domain: d, hasSSL, redirectsToHTTPS, statusCode });
    } catch (e) {
      setResult({ domain: d, hasSSL: false, redirectsToHTTPS: false, error: "Could not reach domain" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white px-6 py-32">
      <div className="max-w-2xl mx-auto">

        <div className="text-center mb-12">
          <div className="inline-block border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 px-5 py-2 rounded-full text-sm mb-6">
            Security Tool
          </div>
          <h1 className="text-5xl font-bold mb-4">SSL Certificate Checker</h1>
          <p className="text-gray-400">Check if a website has a valid SSL certificate and HTTPS enabled</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 space-y-6">
          <div>
            <label className="block text-gray-300 font-medium mb-3">Enter Domain Name</label>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="e.g. google.com or yoursite.com"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && checkSSL()}
                className="flex-1 bg-black border border-zinc-700 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400 transition"
              />
              <button
                onClick={checkSSL}
                disabled={loading || !domain.trim()}
                className="bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-black px-6 py-4 rounded-2xl font-bold transition shrink-0"
              >
                {loading ? "Checking..." : "Check"}
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {["google.com", "github.com", "facebook.com"].map((ex) => (
                <button key={ex} onClick={() => setDomain(ex)}
                  className="text-xs bg-zinc-800 hover:bg-zinc-700 text-gray-400 hover:text-cyan-400 px-3 py-1 rounded-lg transition">
                  {ex}
                </button>
              ))}
            </div>
          </div>

          {loading && (
            <div className="text-center py-8 text-gray-400">
              <div className="inline-block w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mb-3" />
              <p>Checking SSL for {cleanDomain(domain)}...</p>
            </div>
          )}

          {result && !loading && (
            <div className="space-y-4">
              {/* Main SSL Status */}
              <div className={`flex items-center gap-4 p-5 rounded-2xl border ${
                result.hasSSL
                  ? "bg-green-500/10 border-green-500/30"
                  : "bg-red-500/10 border-red-500/30"
              }`}>
                <span className="text-4xl">{result.hasSSL ? "🔒" : "🔓"}</span>
                <div>
                  <p className={`text-xl font-bold ${result.hasSSL ? "text-green-400" : "text-red-400"}`}>
                    {result.hasSSL ? "SSL Active" : "No SSL Detected"}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {result.domain} — {result.hasSSL ? "HTTPS is working" : "Site may not be secure"}
                  </p>
                </div>
              </div>

              {/* Details */}
              <div className="bg-black border border-zinc-800 rounded-2xl divide-y divide-zinc-800">
                {[
                  { label: "HTTPS Enabled",    value: result.hasSSL ? "Yes ✓" : "No ✗",            ok: result.hasSSL },
                  { label: "HTTP → HTTPS Redirect", value: result.redirectsToHTTPS ? "Yes ✓" : "No ✗", ok: result.redirectsToHTTPS },
                  { label: "HTTP Status",       value: result.statusCode ? `${result.statusCode}` : "N/A", ok: result.statusCode === 200 },
                  { label: "Domain Checked",    value: result.domain, ok: true },
                ].map(({ label, value, ok }) => (
                  <div key={label} className="flex justify-between px-5 py-3">
                    <span className="text-gray-400 text-sm">{label}</span>
                    <span className={`text-sm font-semibold ${ok ? "text-green-400" : "text-red-400"}`}>{value}</span>
                  </div>
                ))}
              </div>

              {!result.hasSSL && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-5 text-sm text-red-300">
                  ⚠️ This domain does not appear to have SSL. Visitors will see a "Not Secure" warning in their browser. Install a free SSL certificate via Let&apos;s Encrypt.
                </div>
              )}
              {result.hasSSL && !result.redirectsToHTTPS && (
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-5 text-sm text-yellow-300">
                  ⚠️ SSL is active but HTTP does not redirect to HTTPS. Configure your server to force HTTPS for all visitors.
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-8 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-cyan-400 mb-4">🔒 Why SSL Matters</h2>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>✓ Encrypts data between visitor and server</li>
            <li>✓ Required for Google ranking (SEO benefit)</li>
            <li>✓ Browsers show "Not Secure" without it — scares visitors away</li>
            <li>✓ Required for online payments (PCI compliance)</li>
            <li>✓ Free via Let&apos;s Encrypt — no excuse not to have it</li>
          </ul>
        </div>

      </div>
    </main>
  );
}
