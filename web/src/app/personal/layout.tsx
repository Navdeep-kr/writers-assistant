import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Personal Writing Studio — Thoughtful Correspondence & Letters",
  description: "AI writing for everyday life. Draft heartfelt letters, speeches, personal reflections, and everyday communications with natural, authentic warmth.",
  alternates: {
    canonical: '/personal',
  },
  openGraph: {
    title: "Personal Writing Studio — Writers Assistant",
    description: "Express your thoughts with confidence in everyday life, relationships, and creative writing.",
    url: "https://writingassistant.app/personal",
  }
};

export default function PersonalLayout({ children }: { children: React.ReactNode }) {
  return children;
}
