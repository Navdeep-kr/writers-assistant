import React from 'react';
import styles from '../info-page.module.css';

export default function PrivacyPage() {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Privacy Policy</h1>
        <p className={styles.subtitle}>
          Your trust is our most valuable asset. We are committed to being transparent about how we handle your data and protecting your creative output.
        </p>
      </header>

      <main className={styles.content}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>1. Information We Collect</h2>
          <div className={styles.textBlock}>
            When you use Writing Assistant, we collect information that you provide directly to us:
          </div>
          <ul style={{ color: 'var(--text-secondary)', marginBottom: '24px', paddingLeft: '20px' }}>
            <li><strong>Text Input:</strong> The content you type or paste into our tools to be processed.</li>
            <li><strong>Account Data:</strong> Email address, name, and profile preferences.</li>
            <li><strong>Usage Data:</strong> Information on which tools you use and how frequently.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>2. How We Use Your Data</h2>
          <div className={styles.textBlock}>
            We use your data to provide and improve our services. Crucially:
          </div>
          <div className={styles.card}>
            <p><strong><span className={styles.highlight}>Your data is NOT sold.</span></strong> We do not sell your personal information or your written content to third-party advertisers or data brokers. Your creativity is yours alone.</p>
          </div>
          <div className={styles.textBlock} style={{ marginTop: '20px' }}>
            We use processed text to refine our AI models, but only after it has been fully anonymized and stripped of personally identifiable information (PII). Pro users can opt-out of this refinement process entirely in their settings.
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>3. Data Security</h2>
          <div className={styles.textBlock}>
            We employ industry-standard encryption (AES-256) for all data at rest and TLS for all data in transit. Our servers are hosted in SOC 2 Type II compliant facilities.
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>4. AI Ethics & Responsibility</h2>
          <div className={styles.textBlock}>
            Our AI models are governed by strict safety protocols to prevent the generation of harmful, biased, or misleading content. We are committed to the responsible development of generative technology.
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>5. Your Rights</h2>
          <div className={styles.textBlock}>
            Under GDPR and CCPA, you have the right to access, correct, or delete your personal data. You can request a full export of your account data or account deletion at any time via the Help Center.
          </div>
        </section>

        <div className={styles.footerNote}>
          Last updated: April 15, 2026 • privacy@writingassistant.ai
        </div>
      </main>
    </div>
  );
}
