import React from 'react';
import type { Metadata } from 'next';
import styles from '../info-page.module.css';

export const metadata: Metadata = {
  title: "Privacy Policy — Protecting Your Data & Creative Content",
  description: "Read our comprehensive Privacy Policy. Learn how Writing Assistant safeguards your documents, enforces zero-data-sale rules, and respects GDPR and CCPA rights.",
  alternates: {
    canonical: '/privacy',
  },
  openGraph: {
    title: "Privacy Policy — Writing Assistant",
    description: "Your trust is our cornerstone. Zero data selling, encrypted document processing, and complete user ownership.",
    url: "https://writingassistant.app/privacy",
  }
};

export default function PrivacyPage() {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div style={{ display: 'inline-block', padding: '6px 14px', borderRadius: '20px', background: 'rgba(52, 211, 153, 0.1)', border: '1px solid rgba(52, 211, 153, 0.25)', color: '#34d399', fontSize: '0.85rem', fontWeight: 700, marginBottom: '16px', letterSpacing: '0.05em' }}>
          DATA PRIVACY &amp; SECURITY PROTOCOLS
        </div>
        <h1 className={styles.title}>Privacy Policy</h1>
        <p className={styles.subtitle}>
          Last Updated: April 2026 • We believe privacy is an absolute human right. Your documents, creative outputs, and personal credentials will never be monetized, sold, or exposed.
        </p>
      </header>

      <main className={styles.content}>
        {/* Core Guarantee Callout */}
        <div className={styles.card} style={{ borderLeft: '4px solid #34d399', marginBottom: '40px' }}>
          <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '8px' }}>
            🔒 The Writing Assistant Zero-Data-Selling Pledge
          </h3>
          <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            We do <strong>not</strong> sell, rent, monetize, or broker your personal information or the contents of your documents to data aggregators, ad networks, or third-party organizations under any circumstances.
          </p>
        </div>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>1. Information We Collect</h2>
          <div className={styles.textBlock}>
            To deliver real-time writing enhancements, we collect only the minimum information necessary:
          </div>
          <ul style={{ color: 'var(--text-secondary)', marginBottom: '24px', paddingLeft: '24px', lineHeight: 1.8 }}>
            <li><strong>Account Profile:</strong> Name, verified email address, hashed authentication credentials, and user preferences.</li>
            <li><strong>User Content Inputs:</strong> Text snippets, documents, and attached files (PDF, DOCX, TXT, images) submitted for grammar checking, paraphrasing, translation, or resume generation.</li>
            <li><strong>Technical Diagnostics:</strong> Anonymized telemetry including browser type, operating system, and error crash dumps to guarantee 99.98% platform reliability.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>2. How Your Data is Handled &amp; AI Safeguards</h2>
          <div className={styles.textBlock}>
            We adhere to strict data-minimization practices when routing prompts through our neural models:
          </div>
          <ul style={{ color: 'var(--text-secondary)', marginBottom: '24px', paddingLeft: '24px', lineHeight: 1.8 }}>
            <li><strong>No Public Model Training:</strong> Your private document text is strictly processed in ephemeral inference sessions and is <em>never</em> used to train public generative foundation models.</li>
            <li><strong>In-Memory Processing:</strong> When our local deterministic heuristics analyze your writing, the text is evaluated directly within memory and never stored on third-party servers.</li>
            <li><strong>Anonymized Tokenization:</strong> Any aggregated linguistic telemetry used for internal grammar rule refinement is stripped of Personally Identifiable Information (PII) before evaluation.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>3. Enterprise Security Standards</h2>
          <div className={styles.textBlock}>
            We deploy multi-layered defense-in-depth security infrastructure:
          </div>
          <div className={styles.grid}>
            <div className={styles.card}>
              <span className={styles.cardIcon}>🔐</span>
              <h3 className={styles.cardTitle}>AES-256 Encryption</h3>
              <p>All stored cloud documents and user credentials are encrypted using military-grade AES-256 cryptographic standards at rest.</p>
            </div>
            <div className={styles.card}>
              <span className={styles.cardIcon}>🛡️</span>
              <h3 className={styles.cardTitle}>TLS 1.3 in Transit</h3>
              <p>Every packet exchanged between your browser and our API clusters is guarded by modern TLS 1.3 transport security.</p>
            </div>
            <div className={styles.card}>
              <span className={styles.cardIcon}>☁️</span>
              <h3 className={styles.cardTitle}>SOC 2 Compliant Data Centers</h3>
              <p>Our server infrastructure is hosted within SOC 2 Type II, ISO 27001, and HIPAA-ready certified cloud facilities.</p>
            </div>
            <div className={styles.card}>
              <span className={styles.cardIcon}>⚡</span>
              <h3 className={styles.cardTitle}>Local Guest Storage</h3>
              <p>Unregistered visitors can utilize our entire tool suite with data saved exclusively inside their own browser&apos;s localStorage.</p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>4. Global Compliance: GDPR, CCPA &amp; User Rights</h2>
          <div className={styles.textBlock}>
            Regardless of geographic location, Writing Assistant extends comprehensive rights to all users:
          </div>
          <ul style={{ color: 'var(--text-secondary)', marginBottom: '24px', paddingLeft: '24px', lineHeight: 1.8 }}>
            <li><strong>Right of Access &amp; Portability:</strong> You can export all your cloud documents in PDF, DOCX, Markdown, or raw JSON at any time.</li>
            <li><strong>Right to Erasure (The Right to be Forgotten):</strong> You may request permanent deletion of your account and all associated documents directly in your account settings or by emailing our privacy team.</li>
            <li><strong>Opt-Out of Analytics:</strong> You may disable non-essential cookies and diagnostic telemetry through our privacy preferences dashboard.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>5. Children&apos;s Privacy (COPPA Compliance)</h2>
          <div className={styles.textBlock}>
            Writing Assistant does not knowingly collect or solicit personal data from children under the age of 13. If we discover that personal data has been submitted by an individual under 13 without verifiable parental consent, we will promptly purge that information from our records.
          </div>
        </section>

        <div className={styles.footerNote}>
          Data Protection Officer: dpo@writingassistant.app • Regulatory Inquiries: privacy@writingassistant.app • 535 Mission St, San Francisco, CA
        </div>
      </main>
    </div>
  );
}

