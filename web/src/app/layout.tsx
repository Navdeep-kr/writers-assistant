import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/context/theme-context";
import { NavigationProvider } from "@/context/navigation-context";
import { AuthProvider } from "@/context/auth-context";
import LayoutClient from "./layout-client";
import { Suspense } from "react";

const outfit = Outfit({ subsets: ["latin"], weight: ['300', '400', '500', '600', '700'] });

export const metadata: Metadata = {
  title: "Writing Assistant | Elevate Your Writing",
  description: "AI-powered writing assistant for professionals and students.",
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
      </head>
      <body className={outfit.className}>
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
