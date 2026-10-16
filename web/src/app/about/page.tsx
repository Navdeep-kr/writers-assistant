import React from 'react';
import styles from '../info-page.module.css';

export default function AboutPage() {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Our Mission</h1>
        <p className={styles.subtitle}>
          Empowering 2.5 million writers worldwide to express their ideas with clarity, precision, and brilliance through the power of collaborative AI.
        </p>
      </header>

      <main className={styles.content}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Who We Are</h2>
          <div className={styles.textBlock}>
            Founded in 2024, <span className={styles.highlight}>Writing Assistant</span> was born from a simple observation: writing is one of the most powerful tools for change, yet it remains one of the most difficult skills to master. Our team of linguists, AI researchers, and designers came together to build more than just a grammar checker—we built a creative partner.
          </div>
          <div className={styles.textBlock}>
            We believe that technology should amplify the human voice, not replace it. Every tool we build is designed to work <span className={styles.highlight}>with you</span>, helping you find the perfect tone, structure, and impact for your unique message.
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Our Core Values</h2>
          <div className={styles.grid}>
            <div className={styles.card}>
              <span className={styles.cardIcon}>🛡️</span>
              <h3 className={styles.cardTitle}>Integrity First</h3>
              <p>We prioritize accuracy and academic honesty. Our AI detection and plagiarism tools set the industry standard for verification.</p>
            </div>
            <div className={styles.card}>
              <span className={styles.cardIcon}>✨</span>
              <h3 className={styles.cardTitle}>Human-Centric AI</h3>
              <p>We design interfaces that keep you in control. Our "Humanizer" technology ensures your AI-assisted work never loses its soul.</p>
            </div>
            <div className={styles.card}>
              <span className={styles.cardIcon}>🌐</span>
              <h3 className={styles.cardTitle}>Radical Access</h3>
              <p>Great writing shouldn't be a luxury. We offer a robust free tier to ensure students and creators everywhere can succeed.</p>
            </div>
            <div className={styles.card}>
              <span className={styles.cardIcon}>🚀</span>
              <h3 className={styles.cardTitle}>Constant Innovation</h3>
              <p>The world of language is always evolving. We ship updates daily to stay at the cutting edge of linguistic intelligence.</p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>The Future of Expression</h2>
          <div className={styles.textBlock}>
            As we look toward the future, we are expanding our ecosystem beyond the desktop. With our upcoming mobile apps and integrated browser extensions, Writing Assistant will be wherever you are—helping you craft the perfect email, essay, or social post in real-time.
          </div>
        </section>

        <div className={styles.footerNote}>
          Last updated: April 2026 • San Francisco, CA
        </div>
      </main>
    </div>
  );
}
