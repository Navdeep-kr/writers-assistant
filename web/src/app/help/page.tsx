import React from 'react';
import styles from '../info-page.module.css';

export default function HelpPage() {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Help Center</h1>
        <p className={styles.subtitle}>
          Everything you need to know about using Writing Assistant effectively.
        </p>
      </header>

      <main className={styles.content}>
        <div className={styles.grid}>
          <div className={styles.card}>
            <span className={styles.cardIcon}>🚀</span>
            <h3 className={styles.cardTitle}>Getting Started</h3>
            <p>Learn the basics of our AI tools and how to set up your account.</p>
          </div>
          <div className={styles.card}>
            <span className={styles.cardIcon}>💳</span>
            <h3 className={styles.cardTitle}>Billing & Plans</h3>
            <p>Manage your subscription, invoices, and payment methods.</p>
          </div>
          <div className={styles.card}>
            <span className={styles.cardIcon}>🛡️</span>
            <h3 className={styles.cardTitle}>Account Security</h3>
            <p>How we protect your data and how to manage your privacy settings.</p>
          </div>
          <div className={styles.card}>
            <span className={styles.cardIcon}>🔧</span>
            <h3 className={styles.cardTitle}>Troubleshooting</h3>
            <p>Fix common issues with browser extensions and desktop apps.</p>
          </div>
        </div>

        <section className={styles.section} style={{ marginTop: '60px' }}>
          <h2 className={styles.sectionTitle}>Can't find what you need?</h2>
          <div className={styles.textBlock}>
            Our support team is available 24/7 to help you with any specific questions or technical challenges.
          </div>
          <a href="/contact" className={styles.highlight} style={{ fontSize: '1.2rem', textDecoration: 'underline' }}>Contact Support →</a>
        </section>
      </main>
    </div>
  );
}
