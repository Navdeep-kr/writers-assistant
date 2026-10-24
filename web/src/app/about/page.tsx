import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '../info-page.module.css';

export const metadata: Metadata = {
  title: "About Us — Empowering Human Communication with AI",
  description: "Discover the vision, technology, and team behind Writers Assistant. Built for writers, professionals, researchers, and creators worldwide with zero-compromise linguistic accuracy.",
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: "About Writers Assistant — Intelligent AI Writing Suite",
    description: "Discover the vision, technology, and team behind Writers Assistant. Built for writers, professionals, researchers, and creators worldwide.",
    url: "https://writingassistant.app/about",
  }
};

export default function AboutPage() {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div style={{ display: 'inline-block', padding: '6px 14px', borderRadius: '20px', background: 'rgba(0, 245, 255, 0.1)', border: '1px solid rgba(0, 245, 255, 0.25)', color: 'var(--accent-cyan)', fontSize: '0.85rem', fontWeight: 700, marginBottom: '16px', letterSpacing: '0.05em' }}>
          OUR MISSION &amp; TECHNOLOGY
        </div>
        <h1 className={styles.title}>Redefining How the World Writes</h1>
        <p className={styles.subtitle}>
          Empowering over 2.5 million writers, students, researchers, and enterprise teams to communicate with precision, authentic voice, and effortless clarity.
        </p>
      </header>

      <main className={styles.content}>
        {/* Key Metrics Banner */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '60px' }}>
          <div className={styles.card} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-cyan)', marginBottom: '6px' }}>2.5M+</div>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 600 }}>Active Global Writers</p>
          </div>
          <div className={styles.card} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#38bdf8', marginBottom: '6px' }}>140+</div>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 600 }}>Countries Supported</p>
          </div>
          <div className={styles.card} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#a855f7', marginBottom: '6px' }}>99.98%</div>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 600 }}>Platform Availability</p>
          </div>
          <div className={styles.card} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#34d399', marginBottom: '6px' }}>100%</div>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 600 }}>User Content Ownership</p>
          </div>
        </div>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Who We Are</h2>
          <div className={styles.textBlock}>
            Founded in 2024 by an international collective of computational linguists, machine learning researchers, and interface designers, <span className={styles.highlight}>Writers Assistant</span> was created to solve a fundamental paradox: while generative AI can produce vast quantities of text in seconds, true communication demands nuance, contextual resonance, and distinctive human voice.
          </div>
          <div className={styles.textBlock}>
            Rather than replacing the writer, our software functions as a responsive cognitive multiplier. Whether you are drafting a breakthrough academic thesis, optimizing an executive board deck, or polishing an ATS-friendly engineering resume, Writers Assistant provides real-time syntactic analysis, tone calibration, and stylistic suggestions that elevate your authentic perspective.
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Dual-Engine Hybrid Intelligence</h2>
          <div className={styles.textBlock}>
            What differentiates Writers Assistant from generic chatbots is our dual-engine architecture:
          </div>
          <div className={styles.grid}>
            <div className={styles.card}>
              <span className={styles.cardIcon}>🧠</span>
              <h3 className={styles.cardTitle}>Multi-Provider Neural Routing</h3>
              <p>We intelligently route requests across state-of-the-art LLM architectures (Google Gemini and OpenAI) with automatic fallback systems to ensure sub-second response latency.</p>
            </div>
            <div className={styles.card}>
              <span className={styles.cardIcon}>⚡</span>
              <h3 className={styles.cardTitle}>Deterministic Local Linguistics</h3>
              <p>For sensitive workflows or offline conditions, our deterministic heuristics analyze grammar, syntactic cohesion, and readability locally without transmitting data over external networks.</p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Our Core Commitments</h2>
          <div className={styles.grid}>
            <div className={styles.card}>
              <span className={styles.cardIcon}>🛡️</span>
              <h3 className={styles.cardTitle}>Absolute Data Privacy</h3>
              <p>Your writing is yours alone. We never sell user data, train third-party models on your private documents, or retain sensitive drafts without your explicit instruction.</p>
            </div>
            <div className={styles.card}>
              <span className={styles.cardIcon}>✨</span>
              <h3 className={styles.cardTitle}>Human-Centric Design</h3>
              <p>Every feature—from our AI Humanizer to our multi-style resume designer—is engineered with intuitive UX, keyboard shortcuts, and frictionless multi-format import/export.</p>
            </div>
            <div className={styles.card}>
              <span className={styles.cardIcon}>🎓</span>
              <h3 className={styles.cardTitle}>Academic &amp; Professional Integrity</h3>
              <p>Our deep AI origin heatmaps and plagiarism cross-referencing algorithms empower educators, students, and authors to verify originality and uphold ethical standards.</p>
            </div>
            <div className={styles.card}>
              <span className={styles.cardIcon}>🌐</span>
              <h3 className={styles.cardTitle}>Universal Accessibility</h3>
              <p>We believe world-class writing tools should be accessible everywhere. We maintain a full-featured free tier alongside enterprise offerings to support learners worldwide.</p>
            </div>
          </div>
        </section>

        <section className={styles.section} style={{ background: 'var(--glass-bg)', padding: '36px', borderRadius: '20px', border: '1px solid var(--glass-border)' }}>
          <h2 className={styles.sectionTitle}>Experience the Future of Writing</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '24px' }}>
            Join millions of writers already transforming their daily workflows with our intelligent suite. Get started in seconds with zero configuration required.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link 
              href="/dashboard"
              style={{
                background: 'linear-gradient(135deg, var(--accent-cyan), #00a8ff)',
                color: '#000',
                padding: '12px 28px',
                borderRadius: '10px',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              🚀 Open Dashboard Now
            </Link>
            <Link 
              href="/pricing"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--glass-border)',
                color: 'var(--text-primary)',
                padding: '12px 24px',
                borderRadius: '10px',
                fontWeight: 600,
                textDecoration: 'none'
              }}
            >
              View Plans &amp; Pricing
            </Link>
          </div>
        </section>

        <div className={styles.footerNote}>
          San Francisco, CA • London, UK • Operational since 2024 • Contact: team@writingassistant.app
        </div>
      </main>
    </div>
  );
}

