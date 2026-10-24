import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Creator Studio — Viral Hooks, Scripts & Multi-Platform Copy",
  description: "High-impact creative tools for YouTube creators, podcasters, marketers, and storytellers. Generate engaging video scripts, high-retention hooks, and viral social media posts.",
  alternates: {
    canonical: '/creators',
  },
  openGraph: {
    title: "Creator Studio — Writing Assistant",
    description: "Amplify your audience with AI-powered video scripts, hooks, and creative storytelling.",
    url: "https://writingassistant.app/creators",
  }
};

export default function CreatorsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
