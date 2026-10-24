import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Apps & Browser Extensions — Chrome, Windows, Mac & Mobile",
  description: "Download Writers Assistant for Google Chrome, Windows, macOS, iOS, and Android. Access real-time grammar checks, paraphrasing, and AI writing everywhere you type.",
  alternates: {
    canonical: '/apps',
  },
  openGraph: {
    title: "Apps & Extensions — Writers Assistant",
    description: "Write with AI superpowers anywhere on the web, desktop, and mobile.",
    url: "https://writingassistant.app/apps",
  }
};

export default function AppsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
