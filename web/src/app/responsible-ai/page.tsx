import React from 'react';
import styles from '../info-page.module.css';

export default function ResponsibleAIPage() {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Responsible AI</h1>
        <p className={styles.subtitle}>
          Our commitment to ethical, transparent, and human-centric artificial intelligence.
        </p>
      </header>

      <main className={styles.content}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Our Ethical Framework</h2>
          <div className={styles.textBlock}>
            At <span className={styles.highlight}>Writing Assistant</span>, we believe AI should be a tool for empowerment, not deception. We've built our technology on four foundational pillars of responsibility.
          </div>
          
          <div className={styles.grid}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>1. Transparency</h3>
              <p>We clearly label AI-generated content and provide tools like our AI Detector to help users maintain authenticity.</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>2. Bias Mitigation</h3>
              <p>We actively audit our models to identify and reduce linguistic biases related to gender, race, and culture.</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>3. Human Agency</h3>
              <p>Our tools are designed as "co-pilots". The human writer always has the final say in every suggestion and edit.</p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>4. Privacy</h3>
              <p>User content is processed with strict anonymization protocols. We respect your intellectual property above all else.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
