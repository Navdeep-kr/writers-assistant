'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Sidebar.module.css';

interface SidebarProps {
  suggestions: any[];
  tones: { name: string; score: number }[];
  score: number;
  clarity: number;
  engagement: number;
  delivery: number;
  plagiarism: number;
  onOpenCoaching?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  suggestions = [], 
  tones = [{ name: 'Neutral', score: 100 }], 
  score = 100,
  clarity = 100,
  engagement = 100,
  delivery = 100,
  plagiarism = 0,
  onOpenCoaching
}) => {
  return (
    <aside className={`${styles.sidebar} glass`}>
      <div className={styles.scoreSection}>
        <div className={styles.speedometerWrapper}>
          <svg viewBox="0 0 36 36" className={styles.circularChart}>
            <path className={styles.circleBg}
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <motion.path 
              className={styles.circle}
              stroke="url(#gradient)"
              strokeDasharray={`${score}, 100`}
              initial={{ strokeDasharray: '0, 100' }}
              animate={{ strokeDasharray: `${score}, 100` }}
              transition={{ duration: 1.5, ease: "circOut" }}
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--accent-cyan)" />
                <stop offset="100%" stopColor="var(--accent-violet)" />
              </linearGradient>
            </defs>
            <text x="18" y="20.35" className={styles.percentage}>{score}</text>
          </svg>
          <div className={styles.glow} style={{ opacity: score / 100 }} />
        </div>
        <div className={styles.scoreLabel}>Writing Health</div>
        <div className={styles.scoreSublabel}>
          {score > 90 ? 'Exceptional' : score > 70 ? 'Strong' : 'Needs Review'}
        </div>
      </div>

      <div className={styles.gridContainer}>
        <div className={`${styles.gridMetric} glass-hover`}>
          <div className={styles.metricHeader}>
            <span className={styles.metricLabel}>Clarity</span>
            <span className={styles.metricValue}>{clarity}%</span>
          </div>
          <div className={styles.miniBar}><div className={styles.miniFill} style={{ width: `${clarity}%`, background: 'var(--accent-cyan)' }} /></div>
        </div>
        <div className={`${styles.gridMetric} glass-hover`}>
          <div className={styles.metricHeader}>
            <span className={styles.metricLabel}>Style</span>
            <span className={styles.metricValue}>{engagement}%</span>
          </div>
          <div className={styles.miniBar}><div className={styles.miniFill} style={{ width: `${engagement}%`, background: 'var(--accent-blue)' }} /></div>
        </div>
        <div className={`${styles.gridMetric} glass-hover`}>
          <div className={styles.metricHeader}>
            <span className={styles.metricLabel}>Tone</span>
            <span className={styles.metricValue}>{delivery}%</span>
          </div>
          <div className={styles.miniBar}><div className={styles.miniFill} style={{ width: `${delivery}%`, background: 'var(--accent-violet)' }} /></div>
        </div>
      </div>

      <div className={styles.aboutSection}>
        <h4 className={styles.aboutHeading}>Master Your Writing</h4>
        <p className={styles.aboutText}>
          Writing Assistant is your high-performance workspace designed for clarity and impact. 
          Leverage multidimensional AI analysis to refine your tone, ensure grammatical perfection, 
          and bypass machine-detection patterns. Whether you're crafting a professional report 
          or a creative piece, our assistant ensures your voice is heard exactly as intended.
        </p>
        <div className={styles.featureList}>
          <span className={styles.featureItem}>✨ Real-time Grammar Fix</span>
          <span className={styles.featureItem}>🛡️ Humanization Engine</span>
          <span className={styles.featureItem}>🔍 Deep Origin Analysis</span>
          <span className={styles.featureItem}>🌐 Instant Translation</span>
        </div>
      </div>

      <div className={styles.toneMeter}>
        <div className={styles.headerRow}>
          <span className={styles.toneLabel}>Detected Tones</span>
          {plagiarism > 0 && <span className={styles.plagiarismBadge}>{plagiarism}% Plagiarism</span>}
        </div>
        <div className={styles.tonePills}>
          {tones.map((t, i) => (
            <div key={i} className={styles.toneItem}>
              <span className={styles.toneName}>{t.name}</span>
              <span className={styles.toneScore}>{t.score}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.header}>
        <h3>AI Suggestions</h3>
        <span className={styles.count}>{suggestions.length} identified</span>
      </div>

      <div className={styles.suggestionsList}>
        <AnimatePresence>
          {suggestions.length === 0 ? (
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className={styles.noSuggestions}
            >
              Masterpiece recognized. Nothing to fix!
            </motion.p>
          ) : (
            suggestions.map((s, i) => (
              <motion.div 
                key={`${s.rule?.id}-${i}`} 
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                transition={{ duration: 0.3, delay: i * 0.05, ease: "easeOut" }}
                className={styles.suggestionCard}
              >
                <div className={styles.cardHeader}>
                  <div className={styles.typeError}>{s.rule?.category?.name || 'Grammar'}</div>
                </div>
                <p className={styles.message}>{s.message}</p>
                <div className={styles.actions}>
                  <button className={styles.accept}>Review</button>
                  <button className={styles.dismiss}>Ignore</button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
};

export default Sidebar;
