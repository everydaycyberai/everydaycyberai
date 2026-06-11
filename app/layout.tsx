import type { Metadata } from "next";
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
  title: "Everyday Cyber AI — IT Support, Surveillance & Security Mumbai",
  description:
    "Professional IT support, firewall management, CCTV surveillance, data center assistance and AI-powered business tools for modern businesses in Mumbai.",
  keywords:
    "IT support Mumbai, firewall configuration, CCTV surveillance, network security, data center, AI automation, remote IT support",
  openGraph: {
    title: "Everyday Cyber AI — IT Support & Security Mumbai",
    description:
      "Professional IT support, surveillance systems and AI-powered tools for modern businesses.",
    url: "https://everydaycyberai.com",
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
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CyberBackground />
        <Navbar />
        <CyberHelpBar />
        {children}
        <LeadCapturePopup />
        <FloatingButtons />
      </body>
    </html>
  );
}
