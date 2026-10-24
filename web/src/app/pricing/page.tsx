import React from 'react';
import type { Metadata } from 'next';
import styles from '../info-page.module.css';
import GlassButton from '@/components/ui/GlassButton';
import { CheckCircle, Zap, Star } from 'lucide-react';

export const metadata: Metadata = {
  title: "Pricing & Plans — Transparent Subscription Tiers",
  description: "Explore affordable pricing plans for Writing Assistant. Free forever plan available. Upgrade to Pro for unlimited paraphrasing, ATS resume templates, and multi-modal file imports.",
  alternates: {
    canonical: '/pricing',
  },
  openGraph: {
    title: "Pricing & Plans — Writing Assistant",
    description: "Start free or unlock unlimited Pro writing intelligence for just $9.99/mo.",
    url: "https://writingassistant.app/pricing",
  }
};

export default function PricingPage() {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Simple, Transparent Pricing</h1>
        <p className={styles.subtitle}>
          Invest in your voice. Choose the plan that fits your writing goals, from casual drafting to professional publishing.
        </p>
      </header>

      <main className={styles.content}>
        <div className={styles.grid}>
          {/* FREE PLAN */}
          <div className={styles.card}>
            <div style={{ marginBottom: '24px' }}>
              <h3 className={styles.cardTitle}>Hobbyist</h3>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>$0<span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/mo</span></div>
              <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>Perfect for casual writing and students starting out.</p>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '32px' }}>
              <PriceItem>Basic Grammar Check</PriceItem>
              <PriceItem>2 Paraphrasing Modes</PriceItem>
              <PriceItem>1,500 words/day limit</PriceItem>
              <PriceItem>Standard AI Model</PriceItem>
            </ul>
            <GlassButton variant="ghost" style={{ width: '100%' }}>Get Started Free</GlassButton>
          </div>

          {/* PRO PLAN */}
          <div className={`${styles.card}`} style={{ border: '1px solid var(--accent-cyan)', background: 'rgba(34, 211, 238, 0.05)' }}>
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'inline-block', background: 'var(--accent-cyan)', color: '#000', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 800, marginBottom: '8px', textTransform: 'uppercase' }}>Most Popular</div>
              <h3 className={styles.cardTitle}>Pro Writer</h3>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>$9.99<span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/mo</span></div>
              <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>Unlimited power for serious creators and researchers.</p>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '32px' }}>
              <PriceItem highlight>Unlimited Words & Processing</PriceItem>
              <PriceItem highlight>8+ Premium Paraphrase Modes</PriceItem>
              <PriceItem highlight>Full Plagiarism Checker</PriceItem>
              <PriceItem highlight>AI Humanizer & Co-Pilot</PriceItem>
              <PriceItem highlight>Advanced GPT-4o Model</PriceItem>
              <PriceItem highlight>Early access to new features</PriceItem>
            </ul>
            <GlassButton variant="primary" style={{ width: '100%' }} glow>Upgrade to Pro</GlassButton>
          </div>
        </div>

        <section className={styles.section} style={{ marginTop: '80px' }}>
          <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
          <div className={styles.grid}>
            <div>
              <h4 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>Can I cancel anytime?</h4>
              <p style={{ fontSize: '0.95rem' }}>Yes. You can cancel your Pro subscription with one click. Your access will remain active until the end of your billing cycle.</p>
            </div>
            <div>
              <h4 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>Do you offer student discounts?</h4>
              <p style={{ fontSize: '0.95rem' }}>We offer a 50% discount for verified educational emails. Contact our support team to apply.</p>
            </div>
            <div>
              <h4 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>Is my data safe?</h4>
              <p style={{ fontSize: '0.95rem' }}>Absolutely. We use enterprise-grade encryption and we never sell your personal data or content.</p>
            </div>
            <div>
              <h4 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>What is the "Humanizer"?</h4>
              <p style={{ fontSize: '0.95rem' }}>It's our proprietary technology that adjusts the rhythm and flow of AI text to sound indistinguishable from human writing.</p>
            </div>
          </div>
        </section>

        <div className={styles.footerNote}>
          All prices are in USD. Local taxes may apply.
        </div>
      </main>
    </div>
  );
}

const PriceItem = ({ children, highlight }: { children: React.ReactNode, highlight?: boolean }) => (
  <li style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', fontSize: '0.95rem', color: highlight ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
    <CheckCircle size={16} color={highlight ? 'var(--accent-cyan)' : 'var(--text-muted)'} />
    {children}
  </li>
);
