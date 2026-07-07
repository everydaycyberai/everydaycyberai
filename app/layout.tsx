import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@/lib/firebase";
import Navbar from "../components/Navbar";
import LeadCapturePopup from "../components/LeadCapturePopup";
import CyberBackground from "../components/CyberBackground";
import CyberHelpBar from "../components/CyberHelpBar";
import FloatingButtons from "../components/FloatingButtons";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  verification: {
    google: "hwPUvQ6gV-_FoIXs7c2DbEeC5D3XqCmJ8QUybBoF5Is",
  },
  title: "Everyday Cyber AI — IT Support, Surveillance & Security Mumbai",
  description:
    "Professional IT support, firewall management, CCTV surveillance, data center assistance and AI-powered business tools for modern businesses in Mumbai.",
  keywords:
    "IT support Mumbai, firewall configuration, CCTV surveillance, network security, data center, AI automation, remote IT support",
  openGraph: {
    title: "Everyday Cyber AI — IT Support & Security Mumbai",
    description:
      "Professional IT support, surveillance systems and AI-powered tools for modern businesses.",
    url: "https://everydaycyberai.in",
    siteName: "Everyday Cyber AI",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Everyday Cyber AI — IT Support & Security Mumbai",
    description:
      "Professional IT support, surveillance systems and AI-powered tools for modern businesses.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Everyday Cyber AI",
    description: "IT support, cyber security, CCTV surveillance and AI automation services for businesses in Mumbai, India.",
    url: "https://everydaycyberai.in",
    telephone: "+918454031225",
    areaServed: { "@type": "City", name: "Mumbai" },
    address: { "@type": "PostalAddress", addressLocality: "Mumbai", addressRegion: "Maharashtra", addressCountry: "IN" },
    priceRange: "₹₹",
    sameAs: [],
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1GHNWY5TDV"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1GHNWY5TDV');
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col">
        <CyberBackground />
        {/* Sticky header wrapper — both bars stay fixed together */}
        <div className="fixed top-0 left-0 right-0 z-[100] flex flex-col">
          <Navbar />
          <CyberHelpBar />
        </div>
        <div className="pt-[104px] flex-1 relative z-10">{children}</div>
        <LeadCapturePopup />
        <FloatingButtons />
      </body>
    </html>
  );
}
