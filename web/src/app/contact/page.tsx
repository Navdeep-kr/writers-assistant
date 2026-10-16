import React from 'react';
import styles from '../info-page.module.css';
import GlassButton from '@/components/ui/GlassButton';

export default function ContactPage() {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Contact Us</h1>
        <p className={styles.subtitle}>
          We're here to help. Reach out to our team for support, sales, or press inquiries.
        </p>
      </header>

      <main className={styles.content}>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Customer Support</h3>
            <p>Need help with a tool or your account?</p>
            <span className={styles.highlight}>support@writingassistant.ai</span>
          </div>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Sales & Enterprise</h3>
            <p>Looking for team plans or API access?</p>
            <span className={styles.highlight}>sales@writingassistant.ai</span>
          </div>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Press & Media</h3>
            <p>For interviews and brand assets.</p>
            <span className={styles.highlight}>press@writingassistant.ai</span>
          </div>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Partnerships</h3>
            <p>For affiliate and strategic collaborations.</p>
            <span className={styles.highlight}>partners@writingassistant.ai</span>
          </div>
        </div>

        <section className={styles.section} style={{ marginTop: '80px', background: 'var(--bg-card)', padding: '40px', borderRadius: '24px', border: '1px solid var(--glass-border)' }}>
          <h2 className={styles.sectionTitle}>Send us a Message</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <input type="text" placeholder="Your Name" style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border-strong)', padding: '12px', borderRadius: '8px', color: 'var(--text-primary)' }} />
            <input type="email" placeholder="Email Address" style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border-strong)', padding: '12px', borderRadius: '8px', color: 'var(--text-primary)' }} />
          </div>
          <textarea placeholder="How can we help?" style={{ width: '100%', height: '150px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border-strong)', padding: '12px', borderRadius: '8px', color: 'var(--text-primary)', marginBottom: '20px' }}></textarea>
          <GlassButton variant="primary" glow>Send Message</GlassButton>
        </section>
      </main>
    </div>
  );
}
