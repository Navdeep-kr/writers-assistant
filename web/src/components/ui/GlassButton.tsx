'use client';

import React from 'react';
import styles from './GlassButton.module.css';

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  glow?: boolean;
  loading?: boolean;
}

const GlassButton: React.FC<GlassButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  glow = false,
  loading = false,
  className = '',
  ...props 
}) => {
  const combinedClasses = [
    styles.button,
    styles[variant],
    styles[size],
    glow ? styles.glow : '',
    loading ? styles.loading : '',
    className
  ].join(' ');

  return (
    <button className={combinedClasses} {...props}>
      <span className={styles.content}>
        {loading ? <div className={styles.spinner} /> : children}
      </span>
      {glow && <div className={styles.glowEffect} />}
    </button>
  );
};

export default GlassButton;
