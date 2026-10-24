import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '../info-page.module.css';

export const metadata: Metadata = {
  title: "Terms of Service — Transparent Legal Agreement",
  description: "Read the Writers Assistant Terms of Service. Clear definitions of 100% user content ownership, permitted use, subscription policies, and platform standards.",
  alternates: {
    canonical: '/terms',
  },
  openGraph: {
    title: "Terms of Service — Writers Assistant",
    description: "Review our clear, transparent terms regarding user rights, IP ownership, and platform usage.",
    url: "https://writingassistant.app/terms",
  }
};

export default function TermsPage() {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div style={{ display: 'inline-block', padding: '6px 14px', borderRadius: '20px', background: 'rgba(0, 245, 255, 0.1)', border: '1px solid rgba(0, 245, 255, 0.25)', color: 'var(--accent-cyan)', fontSize: '0.85rem', fontWeight: 700, marginBottom: '16px', letterSpacing: '0.05em' }}>
          LEGAL AGREEMENT &amp; USER RIGHTS
        </div>
        <h1 className={styles.title}>Terms of Service</h1>
        <p className={styles.subtitle}>
          Effective Date: April 2026 • Please review these terms carefully to understand your rights, responsibilities, and our commitment to your intellectual property.
        </p>
      </header>

      <main className={styles.content}>
        {/* Core Guarantee Highlight */}
        <div className={styles.card} style={{ borderLeft: '4px solid var(--accent-cyan)', marginBottom: '40px' }}>
          <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '8px' }}>
            ✨ The Writers Assistant Core Guarantee: You Own 100% of Your Content
          </h3>
          <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            You retain full intellectual property ownership, copyright, and commercial exploitation rights to all text, essays, resumes, and deliverables created or refined using Writers Assistant. We claim zero proprietary rights over your output.
          </p>
        </div>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>1. Acceptance of Terms &amp; Eligibility</h2>
          <div className={styles.textBlock}>
            By creating an account, browsing, or utilizing any feature within the <span className={styles.highlight}>Writers Assistant</span> platform, you enter into a legally binding agreement governed by these Terms of Service. If you are using our services on behalf of an organization or business entity, you represent and warrant that you possess the authority to bind that entity to these terms.
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>2. Permitted Use &amp; Service License</h2>
          <div className={styles.textBlock}>
            Subject to your compliance with these terms and your selected subscription tier, Writers Assistant grants you a worldwide, non-exclusive, revocable, non-transferable license to utilize our AI writing, paraphrasing, grammar analysis, resume generation, and document export infrastructure.
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>3. Intellectual Property Rights &amp; Ownership</h2>
          <div className={styles.textBlock}>
            We distinguish strictly between platform software and user-generated output:
          </div>
          <ul style={{ color: 'var(--text-secondary)', marginBottom: '24px', paddingLeft: '24px', lineHeight: 1.8 }}>
            <li><strong>Your Output:</strong> All documents, rewritten paragraphs, citations, resumes, and code comments generated through the service remain your exclusive intellectual property.</li>
            <li><strong>Our Platform:</strong> The algorithms, user interface, visual templates, documentation, and proprietary code of Writers Assistant are the exclusive property of Writers Assistant Inc. and are protected by international copyright laws.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>4. Acceptable Use Policy</h2>
          <div className={styles.textBlock}>
            You agree to utilize Writers Assistant strictly in compliance with all applicable laws and ethical standards. You may not:
          </div>
          <ul style={{ color: 'var(--text-secondary)', marginBottom: '24px', paddingLeft: '24px', lineHeight: 1.8 }}>
            <li>Generate or disseminate unlawful, harassing, defamatory, or abusive content.</li>
            <li>Use the service to orchestrate academic misconduct, deceptive impersonation, or mass spam generation.</li>
            <li>Attempt to probe, reverse-engineer, decompile, or overload our API endpoints or servers.</li>
            <li>Resell or sublicense access to the platform without an authorized Enterprise Partnership Agreement.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>5. Subscriptions, Payments &amp; Cancellation</h2>
          <div className={styles.textBlock}>
            Certain advanced capabilities require a paid subscription (Pro or Enterprise). Subscription terms include:
          </div>
          <ul style={{ color: 'var(--text-secondary)', marginBottom: '24px', paddingLeft: '24px', lineHeight: 1.8 }}>
            <li><strong>Billing Cycle:</strong> Plans are billed in advance on either a monthly or annual billing schedule.</li>
            <li><strong>Cancellation:</strong> You may cancel your subscription at any time directly from your account settings. You will retain unrestricted access until the conclusion of your current billing period.</li>
            <li><strong>14-Day Satisfaction Guarantee:</strong> If you are unsatisfied with your initial Pro subscription, you may request a full refund within 14 days of your initial purchase date.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>6. Service Uptime &amp; Disclaimers</h2>
          <div className={styles.textBlock}>
            While Writers Assistant strives for 99.9% service availability, the service is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis. Generative AI technology operates based on probabilistic computational models; you are encouraged to review critical factual assertions before formal publication or submission.
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>7. Limitation of Liability</h2>
          <div className={styles.textBlock}>
            To the maximum extent permitted by applicable law, Writers Assistant Inc. shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your access to or use of the service.
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>8. Governing Law &amp; Dispute Resolution</h2>
          <div className={styles.textBlock}>
            These Terms shall be construed and governed in accordance with the laws of the State of California, without regard to its conflict of law principles. Any legal action arising from these terms shall be settled via binding arbitration in San Francisco, CA.
          </div>
        </section>

        <div className={styles.footerNote}>
          Questions regarding these terms? Contact our legal counsel at legal@writingassistant.app • Last amended: April 2026
        </div>
      </main>
    </div>
  );
}

