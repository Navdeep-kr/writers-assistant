import React from 'react';
import styles from '../info-page.module.css';

export default function TermsPage() {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Terms of Service</h1>
        <p className={styles.subtitle}>
          By using Writing Assistant, you agree to these terms. Please read them carefully to understand your rights and responsibilities.
        </p>
      </header>

      <main className={styles.content}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>1. Acceptance of Terms</h2>
          <div className={styles.textBlock}>
            By accessing or using the <span className={styles.highlight}>Writing Assistant</span> platform, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using this site.
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>2. Use License</h2>
          <div className={styles.textBlock}>
            Writing Assistant grants you a personal, non-exclusive, non-transferable license to use the platform's AI tools for individual or professional use, subject to your subscription tier limits.
          </div>
          <div className={styles.textBlock}>
            You may not use our service to:
          </div>
          <ul style={{ color: 'var(--text-secondary)', marginBottom: '24px', paddingLeft: '20px' }}>
            <li>Generate spam or deceptive content.</li>
            <li>Systematically scrape or crawl the service for data.</li>
            <li>Attempt to reverse engineer any part of the AI infrastructure.</li>
            <li>Violate the intellectual property rights of others.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>3. Intellectual Property</h2>
          <div className={styles.card}>
            <p><strong><span className={styles.highlight}>Your Content is Yours.</span></strong> You retain full ownership and copyright of any text you generate or refine using Writing Assistant. We claim no ownership over your creative output.</p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>4. Subscriptions & Payments</h2>
          <div className={styles.textBlock}>
            Subscription fees are billed in advance on a monthly or annual basis. You may cancel your subscription at any time, and you will continue to have access to the service through the end of your billing period.
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>5. Disclaimer of Warranties</h2>
          <div className={styles.textBlock}>
            The service is provided "as is". While our AI is highly accurate, Writing Assistant makes no warranties, expressed or implied, regarding the factual correctness or suitability of generated content for any specific purpose.
          </div>
        </section>

        <div className={styles.footerNote}>
          Last updated: April 15, 2026 • legal@writingassistant.ai
        </div>
      </main>
    </div>
  );
}
