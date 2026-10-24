'use client';

import React, { Suspense } from 'react';
import styles from './apps.module.css';
import { motion } from 'framer-motion';

const APPS_DATA = [
  { 
    id: 'chrome', 
    title: 'Chrome Extension', 
    description: 'Bring AI writing assistance to every website you visit. Real-time grammar, paraphrasing, and summarizing.',
    icon: '🌐',
    tag: 'BROWSER',
    version: 'v2.4.1'
  },
  { 
    id: 'windows', 
    title: 'Windows App', 
    description: 'The full Writers Assistant experience as a native desktop application. Performant, offline-ready, and system-wide.',
    icon: '🪟',
    tag: 'DESKTOP',
    version: 'v1.0.8'
  },
  { 
    id: 'mac', 
    title: 'macOS App', 
    description: 'Designed specifically for Apple Silicon. Seamless integration with macOS services and advanced shortcuts.',
    icon: '🍎',
    tag: 'DESKTOP',
    version: 'v1.0.9'
  },
  { 
    id: 'ios', 
    title: 'iOS App', 
    description: 'Write better on the go. Mobile-optimized keyboard integration and cloud sync for all your documents.',
    icon: '📱',
    tag: 'MOBILE',
    version: 'v3.2.0'
  },
  { 
    id: 'android', 
    title: 'Android App', 
    description: 'Powerful writing tools for your Android phone or tablet. Includes the Writers Assistant AI keyboard.',
    icon: '🤖',
    tag: 'MOBILE',
    version: 'v3.1.8'
  },
  { 
    id: 'edge', 
    title: 'Edge Extension', 
    description: 'Optimized for Microsoft Edge. Intelligent writing support across Outlook, LinkedIn, and more.',
    icon: '🧭',
    tag: 'BROWSER',
    version: 'v2.3.9'
  }
];

function AppsHubContent() {
  return (
    <div className={styles.appsLayout}>
      <motion.section 
        className={styles.hero}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>Apps & Extensions</h1>
        <p>Take Writers Assistant wherever you write. From cross-platform desktop apps to mobile keyboards and browser extensions.</p>
      </motion.section>

      <section className={styles.appsGrid}>
        {APPS_DATA.map((app, index) => (
          <motion.div 
            key={app.id} 
            className={styles.appCard}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <div className={styles.iconWrapper}>{app.icon}</div>
            <div className={styles.categoryTag} style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10b981', marginBottom: '16px', opacity: 0.8 }}>{app.tag}</div>
            <h3>{app.title}</h3>
            <p>{app.description}</p>
            <button className={styles.downloadBtn} onClick={() => alert('Download starting...')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Download Now
            </button>
            <div className={styles.versionInfo}>{app.version} • Stable Release</div>
          </motion.div>
        ))}
      </section>
    </div>
  );
}

export default function AppsHub() {
  return (
    <Suspense fallback={<div style={{ padding: '60px', textAlign: 'center', color: '#fff' }}>Loading Downloads...</div>}>
      <AppsHubContent />
    </Suspense>
  );
}
