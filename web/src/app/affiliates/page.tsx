import React from 'react';
import styles from '../info-page.module.css';

export default function AffiliatesPage() {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Affiliate Program</h1>
        <p className={styles.subtitle}>
          Partner with the world's most advanced writing platform and earn while helping others improve their writing.
        </p>
      </header>

      <main className={styles.content}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Why Partner With Us?</h2>
          <div className={styles.grid}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>30% Recurring Commission</h3>
              <p>Earn 30% on every payment made by users you refer, for the life of their subscription.</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>90-Day Cookie</h3>
              <p>We offer a generous attribution window to ensure you get credit for your impact.</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Premium Assets</h3>
              <p>Access custom banners, copy templates, and real-time performance analytics.</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Dedicated Support</h3>
              <p>Our affiliate managers are here to help you optimize your conversion rates.</p>
            </div>
          </div>
        </section>

        <section className={styles.section} style={{ textAlign: 'center', marginTop: '60px' }}>
          <h2 className={styles.sectionTitle} style={{ justifyContent: 'center' }}>Ready to get started?</h2>
          <p style={{ marginBottom: '32px' }}>Join over 1,000 active partners who are already earning with Writing Assistant.</p>
          <span className={styles.highlight} style={{ fontSize: '1.5rem', cursor: 'pointer', border: '1px solid var(--accent-cyan)', padding: '12px 24px', borderRadius: '12px' }}>Apply to Join →</span>
        </section>
      </main>
    </div>
  );
}
