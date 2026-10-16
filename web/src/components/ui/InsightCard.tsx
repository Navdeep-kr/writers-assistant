'use client';

import React from 'react';
import styles from './InsightCard.module.css';

interface InsightCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  progress?: number;
  color?: 'cyan' | 'blue' | 'indigo' | 'violet' | 'success' | 'warning' | 'error';
  className?: string;
}

const InsightCard: React.FC<InsightCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  progress,
  color = 'blue',
  className = '',
}) => {
  return (
    <div className={`${styles.card} glass ${className}`}>
      <div className={styles.header}>
        <div className={`${styles.iconContainer} ${styles[color]}`}>
          {icon}
        </div>
        <div className={styles.titleGroup}>
          <span className={styles.title}>{title}</span>
          {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
        </div>
      </div>
      
      <div className={styles.content}>
        <div className={styles.valueGroup}>
          <h2 className={styles.value}>{value}</h2>
          {trend && (
            <span className={`${styles.trend} ${trend.isPositive ? styles.positive : styles.negative}`}>
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
            </span>
          )}
        </div>
        
        {progress !== undefined && (
          <div className={styles.progressContainer}>
            <div 
              className={`${styles.progressBar} ${styles[color]}`} 
              style={{ width: `${progress}%` }} 
            />
          </div>
        )}
      </div>
      
      <div className={styles.glowEffect} style={{ background: `var(--glow-${color === 'success' ? 'cyan' : color === 'error' ? 'violet' : color})` }} />
    </div>
  );
};

export default InsightCard;
