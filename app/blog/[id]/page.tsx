import type { Metadata } from "next";
import BlogDetailClient from "./BlogDetailClient";

// Dynamic metadata for each blog post
// Since content is in Firebase (client-side only), we set strong default SEO
// that covers the blog section, and the client renders the actual content.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  return {
    title: "Cyber Security Article — Everyday Cyber AI",
    description:
      "Read our latest cyber security and IT infrastructure guide on Everyday Cyber AI. Practical tips for businesses in India.",
    keywords:
      "cyber security India, IT support guide, network security tips, firewall setup, CCTV troubleshooting, Windows server, Mumbai IT",
    openGraph: {
      title: "Cyber Security Article — Everyday Cyber AI",
      description: "Practical cyber security and IT guides for businesses in India.",
      url: `https://everydaycyberai.com/blog/${id}`,
      siteName: "Everyday Cyber AI",
      locale: "en_IN",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: "Cyber Security Article — Everyday Cyber AI",
      description: "Practical cyber security and IT guides for businesses in India.",
    },
    alternates: {
      canonical: `https://everydaycyberai.com/blog/${id}`,
    },
  };
}

export default function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return <BlogDetailClient params={params} />;
}
