import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://everydaycyberai.in";
  const now = new Date();

  const page = (
    path: string,
    priority: number,
    changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never" = "monthly"
  ) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });

  return [
    // Core Pages
    page("", 1.0, "weekly"),
    page("/services", 0.9),
    page("/services/remote-it-support", 0.85),
    page("/services/cyber-security", 0.9),
    page("/services/surveillance-support", 0.85),
    page("/services/data-center-support", 0.82),
    page("/services/e-waste-management", 0.8),
    page("/services/ai-automation", 0.85),
    page("/services/network-support-engineer", 0.87),
    page("/services/data-center-hardware-replacement", 0.85),
    page("/services/laptop-configuration", 0.85),
    page("/services/windows-autopilot-support", 0.84),
    page("/services/cctv-dvr-support", 0.86),
    page("/tools", 0.9, "weekly"),
    page("/trending-scams", 0.88, "daily"),
    page("/downloads", 0.92, "weekly"),
    page("/pricing", 0.95),
    page("/products", 0.88, "weekly"),
    page("/recommended", 0.85),
    page("/blog", 0.95, "daily"),
    page("/about", 0.7),
    page("/contact", 0.8),

    // Legal Pages
    page("/privacy-policy", 0.6),
    page("/disclaimer", 0.6),
    page("/terms", 0.6),

    // Blog Articles
    page("/blog/ai-se-hack-kaise-hote-hai", 0.95),
    page("/blog/upi-fraud-se-kaise-bachen", 0.92),
    page("/blog/best-antivirus-india-2025", 0.9),
    page("/blog/best-vpn-india-2025", 0.9),
    page("/blog/windows-computer-secure-kaise-karein", 0.88),

    // Cyber Security Help Tools
    page("/tools/scam-analyzer", 0.95),
    page("/tools/scam-message-checker", 0.93),
    page("/tools/job-scam-checker", 0.9),
    page("/tools/hack-checker", 0.92),
    page("/tools/safety-score", 0.9),
    page("/tools/emergency-response", 0.95),
    page("/tools/email-header-analyzer", 0.9),
    page("/tools/password-generator", 0.85),
    page("/tools/password-strength", 0.88),
    page("/tools/ip-calculator", 0.85),
    page("/tools/ssl-checker", 0.85),
    page("/tools/wifi-security-checklist", 0.83),

    // AI Tools
    page("/tools/ai-writer", 0.9),
    page("/tools/ai-email", 0.9),
    page("/tools/mock-interview", 0.88),
    page("/tools/cover-letter-generator", 0.88),
    page("/tools/caption-generator", 0.85),

    // Study Tools
    page("/tools/word-counter", 0.85),
    page("/tools/unit-converter", 0.85),
    page("/tools/age-calculator", 0.85),
    page("/tools/percentage-calculator", 0.85),
    page("/tools/typing-test", 0.88),
    page("/tools/exam-age-calculator", 0.87),

    // Daily Use Tools
    page("/tools/resume-builder", 0.9),
    page("/tools/qr-generator", 0.85),
    page("/tools/image-compressor", 0.85),
    page("/tools/url-shortener", 0.85),
    page("/tools/passport-photo", 0.9),
    page("/tools/color-picker", 0.85),
    page("/tools/bmi-calculator", 0.88),
    page("/tools/pc-build-checker", 0.86),
    page("/tools/username-checker", 0.85),

    // Finance Tools
    page("/tools/gst-calculator", 0.88),
    page("/tools/gst-invoice-generator", 0.9),
    page("/tools/emi-calculator", 0.88),
    page("/tools/salary-calculator", 0.88),
    page("/tools/sip-calculator", 0.88),

    // Text / Dev Tools
    page("/tools/case-converter", 0.85),
    page("/tools/json-formatter", 0.85),
    page("/tools/base64", 0.85),
    page("/tools/lorem-ipsum", 0.85),
    page("/tools/windows-commands", 0.88),
    page("/tools/linux-commands", 0.88),
    page("/tools/firewall-switch-commands", 0.87),
  ];
}
