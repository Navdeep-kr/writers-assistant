import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '../info-page.module.css';

export const metadata: Metadata = {
  title: "Responsible AI — Ethical Framework, Transparency & Integrity",
  description: "Learn how Writing Assistant approaches generative AI with ethical guardrails, academic integrity, bias auditing, and human-in-the-loop agency.",
  alternates: {
    canonical: '/responsible-ai',
  },
  openGraph: {
    title: "Responsible AI — Writing Assistant",
    description: "Our manifesto on human-first artificial intelligence, transparency, and linguistic safety.",
    url: "https://writingassistant.app/responsible-ai",
  }
};

export default function ResponsibleAIPage() {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div style={{ display: 'inline-block', padding: '6px 14px', borderRadius: '20px', background: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.25)', color: '#a855f7', fontSize: '0.85rem', fontWeight: 700, marginBottom: '16px', letterSpacing: '0.05em' }}>
          ETHICAL AI MANIFESTO
        </div>
        <h1 className={styles.title}>Responsible AI &amp; Human Agency</h1>
        <p className={styles.subtitle}>
          Our foundational commitment to building transparent, unbiased, and human-amplifying artificial intelligence.
        </p>
      </header>

      <main className={styles.content}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>The Human-in-the-Loop Philosophy</h2>
          <div className={styles.textBlock}>
            At <span className={styles.highlight}>Writing Assistant</span>, we firmly reject the notion that artificial intelligence should replace human cognition or authorship. Language is the vessel of human empathy, nuance, and critical thought. Our tools are architected from the ground up as <strong>cognitive co-pilots</strong>—delivering structure, clarity, and grammatical precision while leaving 100% of creative decisions in the writer&apos;s hands.
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>The 5 Guardrails of Generative Language</h2>
          <div className={styles.grid}>
            <div className={styles.card}>
              <span className={styles.cardIcon}>🔍</span>
              <h3 className={styles.cardTitle}>1. Origin Transparency</h3>
              <p>We build native verification tools like our AI Detector and Perplexity Heatmap so writers, professors, and publishers can verify authentic provenance with mathematical precision.</p>
            </div>
            <div className={styles.card}>
              <span className={styles.cardIcon}>⚖️</span>
              <h3 className={styles.cardTitle}>2. Active Bias Mitigation</h3>
              <p>Our machine learning models undergo continuous adversarial auditing to prevent cultural, gender, racial, and socioeconomic linguistic skews in suggestions and tone analysis.</p>
            </div>
            <div className={styles.card}>
              <span className={styles.cardIcon}>🛡️</span>
              <h3 className={styles.cardTitle}>3. Academic Honesty</h3>
              <p>We work closely with university research bodies to ensure our paraphrasing and summarization engines promote genuine comprehension rather than unethical academic circumvention.</p>
            </div>
            <div className={styles.card}>
              <span className={styles.cardIcon}>🔒</span>
              <h3 className={styles.cardTitle}>4. Ephemeral Privacy</h3>
              <p>Your ideas belong to you. We strictly disallow third-party foundation models from harvesting or indexing your private drafts for training purposes.</p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Combatting Misinformation &amp; Deceptive Generation</h2>
          <div className={styles.textBlock}>
            Our API pipeline enforces safety filters against the generation of synthetic harassment, hate speech, medical falsehoods, and political astroturfing. If a prompt attempts to create malicious disinformation, our system immediately flags the request and halts generation.
          </div>
          <div className={styles.textBlock}>
            We believe that building powerful tools incurs an equally profound ethical responsibility to the global information ecosystem.
          </div>
        </section>

        <section className={styles.section} style={{ background: 'var(--glass-bg)', padding: '36px', borderRadius: '20px', border: '1px solid var(--glass-border)' }}>
          <h2 className={styles.sectionTitle}>Have Feedback on AI Safety?</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '20px' }}>
            We invite researchers, educators, and ethicists to audit our tools and submit feedback on linguistic fairness.
          </p>
          <Link 
            href="/contact"
            style={{
              background: 'linear-gradient(135deg, #a855f7, #6366f1)',
              color: '#fff',
              padding: '12px 24px',
              borderRadius: '10px',
              fontWeight: 600,
              textDecoration: 'none',
              display: 'inline-block'
            }}
          >
            Contact AI Ethics Board →
          </Link>
        </section>

        <div className={styles.footerNote}>
          Writing Assistant Ethical Oversight Committee • ethics@writingassistant.app • Standards aligned with UNESCO &amp; NIST AI Risk Management Frameworks
        </div>
      </main>
    </div>
  );
}

