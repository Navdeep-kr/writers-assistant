import type { Metadata, Viewport } from "next";
import "./globals.css";

import { ThemeProvider } from "@/context/theme-context";
import { NavigationProvider } from "@/context/navigation-context";
import { AuthProvider } from "@/context/auth-context";
import LayoutClient from "./layout-client";
import { Suspense } from "react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://writingassistant.app';

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f1f5f9" },
    { media: "(prefers-color-scheme: dark)", color: "#030304" },
  ],
};


export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Writing Assistant — Advanced AI Writing, Paraphrasing & Resume Studio",
    template: "%s | Writing Assistant"
  },
  description: "The complete AI writing suite for professionals, researchers, and creators. Advanced paraphrasing, grammar check, ATS resume builder with designer templates, AI content detection, and multi-format export.",
  keywords: [
    "AI writing assistant",
    "AI paraphrasing tool",
    "grammar checker",
    "ATS resume builder",
    "resume templates",
    "AI content detector",
    "plagiarism checker",
    "essay rewriter",
    "smart summarizer",
    "citation generator",
    "professional document editor",
    "cover letter generator",
    "academic writing tool"
  ],
  authors: [{ name: "Writing Assistant Inc." }],
  creator: "Writing Assistant Inc.",
  publisher: "Writing Assistant Inc.",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Writing Assistant",
    title: "Writing Assistant — Advanced AI Writing, Paraphrasing & Resume Studio",
    description: "Write with superhuman precision. Real-time grammar verification, ATS resume creation, high-accuracy paraphrasing, and multi-format document workflows.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Writing Assistant — Advanced AI Writing Suite",
    description: "AI-powered writing assistant for professionals, students, and creators.",
    creator: "@writingassistant",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function() {
              try {
                var saved = localStorage.getItem('writing_assistant_theme');
                var theme = saved === 'light' ? 'light' : 'dark';
                document.documentElement.setAttribute('data-theme', theme);
              } catch (e) {}
            })();`
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": `${siteUrl}/#website`,
                  "url": siteUrl,
                  "name": "Writing Assistant",
                  "description": "Advanced AI Writing, Paraphrasing, and Document Studio",
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": `${siteUrl}/dashboard?tool={search_term_string}`,
                    "query-input": "required name=search_term_string"
                  }
                },
                {
                  "@type": "SoftwareApplication",
                  "@id": `${siteUrl}/#software`,
                  "name": "Writing Assistant AI Suite",
                  "applicationCategory": "ProductivityApplication",
                  "operatingSystem": "Web, Windows, macOS, Linux, iOS, Android",
                  "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD"
                  },
                  "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.9",
                    "ratingCount": "2480"
                  }
                },
                {
                  "@type": "Organization",
                  "@id": `${siteUrl}/#organization`,
                  "name": "Writing Assistant Inc.",
                  "url": siteUrl
                }
              ]
            })
          }}
        />
      </head>
      <body className="antialiased">
        <Suspense fallback={<div style={{ padding: '40px', color: 'var(--text-primary)' }}>Loading app...</div>}>
          <ThemeProvider>
            <AuthProvider>
              <NavigationProvider>
                <LayoutClient>
                  {children}
                </LayoutClient>
              </NavigationProvider>
            </AuthProvider>
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  );
}
