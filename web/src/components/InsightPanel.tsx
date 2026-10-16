'use client';

import React from 'react';
import styles from './InsightPanel.module.css';
import InsightCard from './ui/InsightCard';

interface InsightPanelProps {
  insights: {
    tones: { name: string; score: number }[];
    clarity: number;
    engagement: number;
    delivery: number;
    plagiarism: number;
    aiLikelihood?: number;
    readability?: {
      score: number;
      grade: string;
    };
  };
  visible: boolean;
}

const InsightPanel: React.FC<InsightPanelProps> = ({ insights, visible }) => {
  if (!visible) return null;

  return (
    <div className={`${styles.panel} glass fade-in`}>
      <h3 className={styles.title}>Writing Insights</h3>
      
      <div className={styles.grid}>
        <InsightCard 
          title="Humanity Score" 
          value={`${100 - (insights.aiLikelihood || 0)}%`} 
          subtitle="Content Authenticity"
          progress={100 - (insights.aiLikelihood || 0)}
          color="success" // Green
          trend={{ value: 4.2, isPositive: true }}
        />
        
        <InsightCard 
          title="AI Detector" 
          value={`${insights.aiLikelihood || 0}%`} 
          subtitle={(insights.aiLikelihood ?? 0) < 20 ? 'Likely Human' : 'Machine Generated'}
          progress={insights.aiLikelihood}
          color="error" // Red
        />
        
        <InsightCard 
          title="Plagiarism" 
          value={`${insights.plagiarism || 0}%`} 
          subtitle="Real-time Originality"
          progress={insights.plagiarism}
          color="blue" // Blue
        />

        <div className={`${styles.tonesCard} glass`}>
          <span className={styles.tonesLabel}>Detected Tones</span>
          <div className={styles.tonesList}>
            {insights.tones.map((tone: any, i: number) => (
              <div key={i} className={styles.toneRow}>
                <span className={styles.toneBadge}>{tone.name}</span>
                <span className={styles.toneScore}>{tone.score}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.actionSection}>
        <p className={styles.hint}>AI Detector and Plagiarism check run automatically as you type.</p>
      </div>
    </div>
  );
};

export default InsightPanel;
