import React from 'react';
import styles from '../info-page.module.css';

export default function CookiesPage() {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Cookie Policy</h1>
        <p className={styles.subtitle}>
          How we use cookies and similar technologies to enhance your writing experience.
        </p>
      </header>

      <main className={styles.content}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>What are cookies?</h2>
          <div className={styles.textBlock}>
            Cookies are small text files that are stored on your device when you visit a website. They help us remember your preferences and understand how you interact with our tools.
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>How we use them</h2>
          <ul style={{ color: 'var(--text-secondary)', paddingLeft: '20px' }}>
            <li style={{ marginBottom: '12px' }}><strong>Essential Cookies:</strong> Required for the platform to function (e.g., keeping you logged in).</li>
            <li style={{ marginBottom: '12px' }}><strong>Performance Cookies:</strong> Help us understand which tools are most popular and where we can improve.</li>
            <li style={{ marginBottom: '12px' }}><strong>Preference Cookies:</strong> Remember your tone settings and document preferences.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Managing Cookies</h2>
          <div className={styles.textBlock}>
            You can control cookie settings through your browser. However, disabling certain cookies may affect the functionality of some AI features.
          </div>
        </section>
      </main>
    </div>
  );
}
