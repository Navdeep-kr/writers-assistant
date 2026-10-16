import React from 'react';
import styles from './FeatureGrid.module.css';

interface FeatureCard {
  id: string;
  title: string;
  action: string;
  icon: React.ReactNode;
  iconTarget?: React.ReactNode;
}

interface FeatureGridProps {
  onNavigate: (tab: string) => void;
}

const features: FeatureCard[] = [
  { id: 'paraphraser', title: 'AI Paraphraser', action: 'Dial in exact tone', icon: '📝', iconTarget: '🔄' },
  { id: 'grammar', title: 'Grammar Checker', action: 'Flawless mechanics', icon: '✨', iconTarget: '💡' },
  { id: 'humanizer', title: 'AI Writer', action: 'Draft instantly', icon: '🛡️', iconTarget: '👤' },
  { id: 'summarizer', title: 'Deep Summarizer', action: 'Condense reading', icon: '📝', iconTarget: '🗒️' },
  { id: 'ai-chat', title: 'AI Chat Assistant', action: 'Brainstorm 24/7', icon: '💬', iconTarget: '🤖' },
  { id: 'ai-detector', title: 'Zero-Trace Plagiarism', action: 'Publish confidently', icon: '🔍', iconTarget: '🧐' },
];

const FeatureGrid: React.FC<FeatureGridProps> = ({ onNavigate }) => {
  return (
    <div className={styles.grid}>
      {features.map((f) => (
        <div key={f.id} className={styles.card} onClick={() => onNavigate(f.id)}>
          <div className={styles.iconWrapper}>
            <span className={styles.icon}>{f.icon}</span>
            <span className={styles.arrow}>→</span>
            <span className={styles.icon}>{f.iconTarget}</span>
          </div>
          <h3 className={styles.title}>{f.title}</h3>
          <span className={styles.action}>{f.action}</span>
        </div>
      ))}
    </div>
  );
};

export default FeatureGrid;
