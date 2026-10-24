import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Academic Writing Suite — Research Papers, Citations & Integrity",
  description: "Advanced AI tools for students, scholars, and researchers. Instant APA, MLA, and Chicago citation generation, academic paraphrasing, AI detection, and thesis summarization.",
  alternates: {
    canonical: '/academic',
  },
  openGraph: {
    title: "Academic Writing Suite — Writing Assistant",
    description: "Rigorous academic writing assistance, citation formatting, and plagiarism verification.",
    url: "https://writingassistant.app/academic",
  }
};

export default function AcademicLayout({ children }: { children: React.ReactNode }) {
  return children;
}
