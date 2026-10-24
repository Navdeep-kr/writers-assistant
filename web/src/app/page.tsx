import React from 'react';
import type { Metadata } from 'next';
import HomePageClient from './home-client';

export const metadata: Metadata = {
  title: "Writing Assistant — Advanced AI Writing, Paraphrasing & Resume Studio",
  description: "The complete AI writing suite for professionals, researchers, and creators. Real-time grammar verification, multi-tone paraphrasing, ATS resume builder with designer templates, AI origin detection, and universal document export.",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Writing Assistant — Advanced AI Writing Suite",
    description: "Write with superhuman precision. Real-time grammar verification, ATS resume creation, high-accuracy paraphrasing, and multi-format document workflows.",
    url: "https://writingassistant.app",
    type: "website",
  }
};

export default function Home() {
  return <HomePageClient />;
}
