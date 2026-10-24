import React from 'react';
import Link from 'next/link';
import { Zap } from 'lucide-react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  const footerSections = [
    {
      title: "Writing Tools",
      links: [
        { label: "AI Paraphraser", href: "/dashboard?tool=paraphraser" },
        { label: "Grammar & Spell Engine", href: "/dashboard?tool=grammar" },
        { label: "Resume & Career Studio", href: "/dashboard?tool=resume" },
        { label: "AI Humanizer", href: "/dashboard?tool=humanizer" },
        { label: "Smart Summarizer", href: "/dashboard?tool=summarizer" },
        { label: "AI Content Detector", href: "/dashboard?tool=ai-detector" },
      ]
    },
    {
      title: "Solutions",
      links: [
        { label: "For Professionals", href: "/professional" },
        { label: "For Academic & Research", href: "/academic" },
        { label: "For Content Creators", href: "/creators" },
        { label: "Personal Writing", href: "/personal" },
        { label: "Workspace Apps", href: "/apps" },
      ]
    },
    {
      title: "Platform",
      links: [
        { label: "AI Writing Dashboard", href: "/dashboard" },
        { label: "Plans & Pricing", href: "/pricing" },
        { label: "Sign In", href: "/login" },
        { label: "Create Account", href: "/signup" },
      ]
    },
    {
      title: "Company & Support",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Responsible AI", href: "/responsible-ai" },
        { label: "Help Center", href: "/help" },
        { label: "Contact Us", href: "/contact" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Privacy Policy", href: "/privacy" },
      ]
    }
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={styles.footerGrid}>
          {footerSections.map((section, idx) => (
            <div key={idx} className={styles.footerColumn}>
              <h4 className={styles.columnTitle}>{section.title}</h4>
              <ul className={styles.linkList}>
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link href={link.href} className={styles.footerLink}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className={styles.bottomContent}>
          <div className={styles.brandInfo}>
            <div className={styles.logo}>
              <Zap size={20} className={styles.logoIcon} />
              <span className={styles.logoText}>Writers Assistant</span>
            </div>
            <p className={styles.copyright}>
              © {new Date().getFullYear()} Writers Assistant Inc. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

