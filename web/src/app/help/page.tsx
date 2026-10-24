import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '../info-page.module.css';

export const metadata: Metadata = {
  title: "Help Center & FAQ — Documentation & Tutorials",
  description: "Find answers to frequently asked questions, tutorials on our AI tools, file import/export guides, billing support, and troubleshooting documentation.",
  alternates: {
    canonical: '/help',
  },
  openGraph: {
    title: "Writers Assistant Help Center & Knowledge Base",
    description: "Explore comprehensive guides, troubleshooting tips, and answers to common questions about Writers Assistant.",
    url: "https://writingassistant.app/help",
  }
};

const FAQ_ITEMS = [
  {
    q: "What file formats can I import into Writers Assistant?",
    a: "You can import PDF documents, Microsoft Word (.docx), Plain Text (.txt), Markdown (.md), CSV files, and image files (PNG, JPG, WEBP). For images and scanned documents, our multi-modal OCR engine automatically transcribes the visual text directly into your workspace."
  },
  {
    q: "How does the ATS Resume Studio format resumes?",
    a: "Our Resume Studio automatically formats your employment history, technical competencies, and academic credentials to pass Applicant Tracking Systems (ATS) used by Fortune 500 employers. You can toggle between 4 designer templates (Executive, Modern Silicon, Minimalist Classic, Creative Portfolio) and export to clean, unclipped PDF or Print with zero watermarks."
  },
  {
    q: "Does Writers Assistant work without an account?",
    a: "Yes! Guest users can use all core writing tools, import documents, and export to PDF/DOCX immediately. Your drafts are saved safely in your browser's local storage. When you create a free account, all your local documents are automatically synchronized to your cloud database."
  },
  {
    q: "Is my writing used to train public AI models?",
    a: "No. Your documents, private drafts, and prompts are processed in ephemeral inference sessions and are never used to train public commercial foundation models. You retain 100% intellectual property ownership over all generated text."
  },
  {
    q: "What export options are available?",
    a: "Every tool includes our Universal Export menu, allowing you to download your deliverables as formatted PDF, Microsoft Word (.docx), Markdown (.md), Plain Text (.txt), or print with our custom Print Isolation Engine that guarantees no navigation headers or sidebars clutter your document."
  },
  {
    q: "How do I cancel or manage my subscription?",
    a: "You can upgrade, downgrade, or cancel your subscription at any time with one click from your Account Settings. If you cancel, you will maintain full Pro access until the end of your billing cycle with zero penalties."
  }
];

export default function HelpPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ_ITEMS.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  };

  return (
    <div className={styles.pageContainer}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <header className={styles.header}>
        <div style={{ display: 'inline-block', padding: '6px 14px', borderRadius: '20px', background: 'rgba(0, 245, 255, 0.1)', border: '1px solid rgba(0, 245, 255, 0.25)', color: 'var(--accent-cyan)', fontSize: '0.85rem', fontWeight: 700, marginBottom: '16px', letterSpacing: '0.05em' }}>
          SUPPORT &amp; DOCUMENTATION
        </div>
        <h1 className={styles.title}>Knowledge Base &amp; FAQ</h1>
        <p className={styles.subtitle}>
          Everything you need to master our AI writing suite, manage your subscription, and troubleshoot any issues.
        </p>
      </header>

      <main className={styles.content}>
        {/* Knowledge Base Category Grid */}
        <div className={styles.grid}>
          <div className={styles.card}>
            <span className={styles.cardIcon}>🚀</span>
            <h3 className={styles.cardTitle}>Getting Started Guide</h3>
            <p>Master keyboard shortcuts, grammar correction pills, and AI tone switches.</p>
            <Link href="/dashboard" style={{ color: 'var(--accent-cyan)', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>
              Explore Tools →
            </Link>
          </div>

          <div className={styles.card}>
            <span className={styles.cardIcon}>📄</span>
            <h3 className={styles.cardTitle}>Import &amp; OCR Engine</h3>
            <p>How to drag-and-drop PDFs, Word documents, and extract text from images.</p>
            <span style={{ color: '#34d399', fontSize: '0.85rem', fontWeight: 600 }}>Supports 6+ File Types</span>
          </div>

          <div className={styles.card}>
            <span className={styles.cardIcon}>💼</span>
            <h3 className={styles.cardTitle}>ATS Resume Templates</h3>
            <p>Choosing the right template, optimizing keywords, and exporting to PDF.</p>
            <Link href="/dashboard?tool=resume" style={{ color: 'var(--accent-cyan)', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>
              Open Resume Studio →
            </Link>
          </div>

          <div className={styles.card}>
            <span className={styles.cardIcon}>💳</span>
            <h3 className={styles.cardTitle}>Billing &amp; Subscriptions</h3>
            <p>Manage receipts, enterprise seats, 14-day refund policy, and invoices.</p>
            <Link href="/pricing" style={{ color: 'var(--accent-cyan)', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>
              View Plans →
            </Link>
          </div>
        </div>

        {/* Detailed FAQ Section */}
        <section className={styles.section} style={{ marginTop: '60px' }}>
          <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {FAQ_ITEMS.map((item, idx) => (
              <div 
                key={idx}
                className={styles.card}
                style={{ padding: '24px 28px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}
              >
                <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '10px', fontWeight: 700 }}>
                  {item.q}
                </h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Banner */}
        <section className={styles.section} style={{ marginTop: '40px', background: 'var(--bg-card)', padding: '36px', borderRadius: '20px', border: '1px solid var(--glass-border)', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
            Still have questions?
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '520px', margin: '0 auto 24px', lineHeight: 1.6 }}>
            Our engineering and support team is on standby 24/7 to help you resolve technical inquiries or set up custom enterprise workflows.
          </p>
          <Link 
            href="/contact"
            style={{
              background: 'linear-gradient(135deg, var(--accent-cyan), #00a8ff)',
              color: '#000',
              padding: '12px 30px',
              borderRadius: '10px',
              fontWeight: 700,
              textDecoration: 'none',
              display: 'inline-block'
            }}
          >
            Contact Customer Support →
          </Link>
        </section>

        <div className={styles.footerNote}>
          Knowledge Base Updated Weekly • Last Review: April 2026 • Status: All Systems Operational
        </div>
      </main>
    </div>
  );
}

