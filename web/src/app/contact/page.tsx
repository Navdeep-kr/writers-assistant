import React from 'react';
import type { Metadata } from 'next';
import styles from '../info-page.module.css';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: "Contact Us — Technical Support, Enterprise & Partnerships",
  description: "Get in touch with the Writers Assistant team. 24/7 technical assistance, enterprise team licensing, partnership opportunities, and customer support.",
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: "Contact Writers Assistant — Get In Touch",
    description: "Connect with our customer support, enterprise sales, or engineering team. We're here to help you achieve writing excellence.",
    url: "https://writingassistant.app/contact",
  }
};

export default function ContactPage() {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div style={{ display: 'inline-block', padding: '6px 14px', borderRadius: '20px', background: 'rgba(0, 245, 255, 0.1)', border: '1px solid rgba(0, 245, 255, 0.25)', color: 'var(--accent-cyan)', fontSize: '0.85rem', fontWeight: 700, marginBottom: '16px', letterSpacing: '0.05em' }}>
          WE&apos;RE HERE TO HELP
        </div>
        <h1 className={styles.title}>Get in Touch with Our Team</h1>
        <p className={styles.subtitle}>
          Have a question about our AI tools, need assistance with your subscription, or interested in team licensing? We&apos;d love to hear from you.
        </p>
      </header>

      <main className={styles.content}>
        {/* Department Direct Email Grid */}
        <div className={styles.grid}>
          <div className={styles.card}>
            <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>🛠️</div>
            <h3 className={styles.cardTitle}>Customer &amp; Technical Support</h3>
            <p>Assistance with tools, document sync, or account settings.</p>
            <span className={styles.highlight}>support@writingassistant.app</span>
            <div style={{ marginTop: '10px', fontSize: '0.75rem', color: '#34d399', fontWeight: 600 }}>
              SLA: &lt; 2h for Pro / 24h standard
            </div>
          </div>

          <div className={styles.card}>
            <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>💼</div>
            <h3 className={styles.cardTitle}>Enterprise &amp; Team Sales</h3>
            <p>Custom multi-seat licensing, dedicated servers, and custom SLAs.</p>
            <span className={styles.highlight}>enterprise@writingassistant.app</span>
            <div style={{ marginTop: '10px', fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>
              Custom enterprise onboarding
            </div>
          </div>

          <div className={styles.card}>
            <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>📰</div>
            <h3 className={styles.cardTitle}>Press &amp; Media Inquiries</h3>
            <p>Interview requests, brand assets, and press releases.</p>
            <span className={styles.highlight}>press@writingassistant.app</span>
          </div>

          <div className={styles.card}>
            <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>🤝</div>
            <h3 className={styles.cardTitle}>Academic &amp; Creator Partnerships</h3>
            <p>Affiliate collaborations, university grants, and educator discounts.</p>
            <span className={styles.highlight}>partners@writingassistant.app</span>
          </div>
        </div>

        {/* Interactive Contact Form */}
        <section style={{ marginTop: '60px' }}>
          <ContactForm />
        </section>

        {/* Global Hubs */}
        <section className={styles.section} style={{ marginTop: '60px' }}>
          <h2 className={styles.sectionTitle}>Global Offices</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>🇺🇸 North America Headquarters</h3>
              <p style={{ margin: '8px 0', color: 'var(--text-secondary)' }}>
                535 Mission St, 14th Floor<br />
                San Francisco, CA 94105, United States
              </p>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Hours: 8:00 AM – 6:00 PM PST</span>
            </div>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>🇬🇧 European Operations</h3>
              <p style={{ margin: '8px 0', color: 'var(--text-secondary)' }}>
                100 Bishopsgate<br />
                London EC2N 4AG, United Kingdom
              </p>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Hours: 9:00 AM – 5:30 PM GMT</span>
            </div>
          </div>
        </section>

        <div className={styles.footerNote}>
          Writers Assistant Inc. • Verified Response Guarantee • Security: security@writingassistant.app
        </div>
      </main>
    </div>
  );
}

