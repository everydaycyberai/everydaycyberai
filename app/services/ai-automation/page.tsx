import type { Metadata } from "next";
import ServiceDetailTemplate from "@/components/ServiceDetailTemplate";

export const metadata: Metadata = {
  title: "AI Automation Services for Business Mumbai | Everyday Cyber AI",
  description:
    "AI-powered workflow automation, document generation and smart business tools starting ₹4,999 — built for Indian small businesses in Mumbai.",
  keywords: "AI automation services Mumbai, workflow automation India, AI document generation, business automation tools",
  alternates: { canonical: "https://everydaycyberai.in/services/ai-automation" },
};

const service = {
  icon: "🤖",
  title: "AI Automation",
  tagline: "AI-powered tools, workflow automation, reporting utilities and smart business solutions built around how your business actually works.",
  price: "₹4,999",
  priceNote: "onwards",
  intro: "Repetitive tasks — drafting the same type of email, generating reports, organizing customer messages — cost real time every week. We build lightweight AI automations tailored to your business: from auto-drafting responses to generating structured reports from raw data, so your team can focus on higher-value work.",
  included: [
    "Workflow automation setup",
    "AI-powered document/report generation",
    "Custom IT reporting tools",
    "Smart monitoring utilities",
    "Integration with tools you already use",
    "Training for your team on the new workflow",
  ],
  process: [
    { title: "Understand Workflow", desc: "We map out the repetitive task you want automated." },
    { title: "Design Solution", desc: "We propose the simplest automation that solves it reliably." },
    { title: "Build & Test", desc: "We build the automation and test it against real scenarios." },
    { title: "Handover & Support", desc: "We train your team and remain available for tweaks." },
  ],
  relatedTools: [
    { title: "AI Writing Assistant", href: "/tools/ai-writer" },
    { title: "AI Email Generator", href: "/tools/ai-email" },
  ],
  faqs: [
    { q: "What kind of tasks can be automated?", a: "Common examples: drafting repetitive emails, generating standard reports from raw data, organizing incoming customer queries, and creating documents from templates. If it's repetitive and rule-based, it's usually automatable." },
    { q: "Do I need any technical knowledge to use the automation?", a: "No — we design these to be used through simple interfaces (like a form or a button), and we train your team on exactly how to use it." },
    { q: "How is this different from just using ChatGPT myself?", a: "General AI chat tools require you to repeat the same instructions every time. We build a dedicated tool around your specific workflow, so it works consistently with one click, and can plug into your existing data or tools." },
    { q: "Can I try something similar for free first?", a: "Yes — check our free AI Writing Assistant and AI Email Generator tools below to see the kind of AI-powered output we build into custom automations." },
  ],
};

export default function AIAutomationPage() {
  return <ServiceDetailTemplate service={service} />;
}
