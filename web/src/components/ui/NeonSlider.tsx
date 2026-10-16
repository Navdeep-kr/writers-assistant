'use client';

import React from 'react';
import styles from './NeonSlider.module.css';

interface NeonSliderProps {
  label: string;
  value: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  color?: 'cyan' | 'blue' | 'indigo' | 'violet';
  showValue?: boolean;
}

const NeonSlider: React.FC<NeonSliderProps> = ({
  label,
  value,
  min = 0,
  max = 100,
  onChange,
  color = 'blue',
  showValue = true,
}) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <label className={styles.label}>{label}</label>
        {showValue && <span className={styles.value}>{value}</span>}
      </div>
      
      <div className={styles.sliderWrapper}>
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange?.(Number(e.target.value))}
          className={`${styles.slider} ${styles[color]}`}
          style={{ '--percentage': `${percentage}%` } as React.CSSProperties}
        />
        <div 
          className={styles.glow} 
          style={{ width: `${percentage}%`, background: `var(--accent-${color})`, boxShadow: `0 0 15px var(--glow-${color})` }} 
        />
      </div>
    </div>
  );
};

export default NeonSlider;
