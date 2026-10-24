import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Create Account — Start Writing Free with AI",
  description: "Create a free Writing Assistant account to unlock cloud document sync, real-time grammar checking, ATS resume builder, and multi-modal file imports.",
  alternates: {
    canonical: '/signup',
  },
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return children;
}
