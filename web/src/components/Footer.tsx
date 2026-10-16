import React from 'react';
import Link from 'next/link';
import { 
  ExternalLink, Mail, Globe, 
  ChevronRight, Zap
} from 'lucide-react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  const footerSections = [
    {
      title: "Get Writing Assistant",
      links: [
        { label: "Writing Assistant for Docs", href: "/apps" },
        { label: "Desktop App", href: "/apps" },
        { label: "Writing Assistant for Windows", href: "/apps" },
        { label: "Writing Assistant for Mac", href: "/apps" },
        { label: "Browser Extension", href: "/apps" },
        { label: "Chrome Extension", href: "/apps" },
      ]
    },
    {
      title: "Learn More",
      links: [
        { label: "AI Writing Dashboard", href: "/dashboard" },
        { label: "Sign In", href: "/login" },
        { label: "Create Account", href: "/signup" },
        { label: "Plans & Pricing", href: "/pricing" },
        { label: "For Professionals", href: "/professional" },
        { label: "For Students", href: "/academic" },
        { label: "For Creators", href: "/creators" },
      ]
    },
    {
      title: "Core Features",
      links: [
        { label: "AI Paraphraser", href: "/dashboard?tool=paraphraser" },
        { label: "Grammar & Spell Engine", href: "/dashboard?tool=grammar" },
        { label: "AI Humanizer", href: "/dashboard?tool=humanizer" },
        { label: "Smart Summarizer", href: "/dashboard?tool=summarizer" },
        { label: "AI Content Detector", href: "/dashboard?tool=ai-detector" },
        { label: "Plagiarism Checker", href: "/dashboard?tool=plagiarism" },
        { label: "Resume & Cover Letter", href: "/dashboard?tool=resume" },
      ]
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Responsible AI", href: "/responsible-ai" },
        { label: "Careers & Culture", href: "/careers" },
        { label: "Press & Media", href: "/press" },
        { label: "Affiliates", href: "/affiliates" },
        { label: "Privacy Policy", href: "/privacy" },
      ]
    }
  ];

  const socialLinks = [
    { icon: <Globe size={18} />, label: "Facebook", href: "#" },
    { icon: <Globe size={18} />, label: "Instagram", href: "#" },
    { icon: <Globe size={18} />, label: "X (Twitter)", href: "#" },
    { icon: <Globe size={18} />, label: "LinkedIn", href: "#" },
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

          <div className={styles.footerColumn}>
            <h4 className={styles.columnTitle}>Connect</h4>
            <ul className={styles.linkList}>
              <li><Link href="/help" className={styles.footerLink}>Help Center</Link></li>
              <li><Link href="/contact" className={styles.footerLink}>Contact Us</Link></li>
              {socialLinks.map((social, sIdx) => (
                <li key={sIdx} className={styles.socialListItem}>
                  <Link href={social.href} className={styles.socialLink}>
                    <span className={styles.socialIcon}>{social.icon}</span>
                    {social.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className={styles.bottomContent}>
          <div className={styles.brandInfo}>
            <div className={styles.logo}>
              <Zap size={20} className={styles.logoIcon} />
              <span className={styles.logoText}>Writing Assistant</span>
            </div>
            <p className={styles.copyright}>
              © {new Date().getFullYear()} Writing Assistant Inc. All rights reserved.
            </p>
          </div>
          <div className={styles.bottomLinks}>
            <Link href="/terms" className={styles.bottomLink}>Terms of Service</Link>
            <Link href="/privacy" className={styles.bottomLink}>Privacy Policy</Link>
            <Link href="/cookies" className={styles.bottomLink}>Cookie Settings</Link>
            <div className={styles.languageSelector}>
              <Globe size={14} />
              <span>English (US)</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
