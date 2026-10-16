import React from 'react';
import styles from '../info-page.module.css';

export default function PressPage() {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Press & Media</h1>
        <p className={styles.subtitle}>
          Resources for journalists and creators covering the Writing Assistant.
        </p>
      </header>

      <main className={styles.content}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Brand Assets</h2>
          <div className={styles.grid}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Logo Pack</h3>
              <p>Download our official logos in various formats (SVG, PNG, EPS).</p>
              <span className={styles.highlight}>Download .ZIP →</span>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Product Screenshots</h3>
              <p>High-resolution images of our web app and extensions.</p>
              <span className={styles.highlight}>View Gallery →</span>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>In the News</h2>
          <div className={styles.textBlock}>
            "The Writing Assistant is setting a new bar for AI-human collaboration." — <strong>Tech Monthly</strong>
          </div>
          <div className={styles.textBlock}>
            "A must-have tool for students in the age of generative AI." — <strong>Education Weekly</strong>
          </div>
        </section>
      </main>
    </div>
  );
}
