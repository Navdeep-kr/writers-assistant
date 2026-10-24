import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Professional Intelligence Suite — Enterprise & Industry Tools",
  description: "60+ specialized professional AI tools for engineering, product, legal, marketing, sales, HR, and executive operations. Accelerate your business deliverables.",
  alternates: {
    canonical: '/professional',
  },
  openGraph: {
    title: "Professional Intelligence Suite — Writing Assistant",
    description: "Industry-grade AI writing tools for high-performing engineering, sales, and executive teams.",
    url: "https://writingassistant.app/professional",
  }
};

export default function ProfessionalLayout({ children }: { children: React.ReactNode }) {
  return children;
}
