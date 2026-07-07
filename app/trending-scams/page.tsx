import type { Metadata } from "next";
import TrendingScamsClient from "./TrendingScamsClient";

export const metadata: Metadata = {
  title: "Trending Scams in India — Latest Scam Alerts | Everyday Cyber AI",
  description:
    "See the most common scam patterns being reported right now — SMS scams, KYC fraud, UPI fraud, job scams and more. Updated from real anonymized scam checks.",
  keywords: "trending scams India, latest scam alerts, SMS scam 2026, KYC fraud alert, UPI fraud pattern, job scam India",
  alternates: { canonical: "https://everydaycyberai.in/trending-scams" },
};

export default function TrendingScamsPage() {
  return <TrendingScamsClient />;
}
