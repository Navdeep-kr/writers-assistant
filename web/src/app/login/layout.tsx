import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Sign In — Access Your Writers Assistant Account",
  description: "Sign in to your Writers Assistant account to access saved cloud documents, personalized writing goals, and Pro features.",
  alternates: {
    canonical: '/login',
  },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
