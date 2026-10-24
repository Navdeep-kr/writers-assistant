import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Dashboard — AI Writing Studio & Document Workspace",
  description: "Access all 13 core AI writing tools: real-time grammar checks, multi-tone paraphrasing, ATS resume templates, AI detection, and cloud document sync.",
  alternates: {
    canonical: '/dashboard',
  },
  openGraph: {
    title: "Dashboard & AI Writing Studio — Writing Assistant",
    description: "Your unified workspace for distraction-free writing, paraphrasing, and document creation.",
    url: "https://writingassistant.app/dashboard",
  }
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
