import type { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Cyber Security & IT Blog — Everyday Cyber AI",
  description:
    "Free cyber security tips, IT troubleshooting guides, firewall setup, CCTV surveillance, network security and AI automation articles for businesses in India.",
  keywords:
    "cyber security blog India, IT support tips, firewall setup guide, CCTV troubleshooting, network security tips, Windows server guide, cybersecurity Mumbai, IT infrastructure blog",
  openGraph: {
    title: "Cyber Security & IT Blog — Everyday Cyber AI",
    description:
      "Free cyber security tips, IT guides and network security articles for businesses in India.",
    url: "https://everydaycyberai.com/blog",
    siteName: "Everyday Cyber AI",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cyber Security & IT Blog — Everyday Cyber AI",
    description: "Free cyber security tips and IT guides for businesses in India.",
  },
  alternates: {
    canonical: "https://everydaycyberai.com/blog",
  },
};

export default function BlogPage() {
  return <BlogClient />;
}
