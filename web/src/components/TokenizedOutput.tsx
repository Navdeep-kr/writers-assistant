'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './TokenizedOutput.module.css';

interface Modification {
  original: string;
  replacement: string;
  reason: string;
  type: 'synonym' | 'structural';
}

interface TokenizedOutputProps {
  text: string;
  modifications: Modification[];
  onApplySynonym?: (original: string, replacement: string) => void;
}

const TokenizedOutput: React.FC<TokenizedOutputProps> = ({ text, modifications }) => {
  const [activeToken, setActiveToken] = useState<number | null>(null);

  // Simple tokenizer that identifies modifications in the text
  // In a production app, we would use a more robust diffing algorithm or server-side offsets
  const renderTokens = () => {
    let result: React.ReactNode[] = [];
    let remainingText = text;
    let key = 0;

    // Sort modifications by length (longest first) to avoid partial matches
    const sortedMods = [...modifications].sort((a, b) => b.replacement.length - a.replacement.length);

    // This is a naive implementation for demonstration. 
    // Usually, the backend would provide exact start/end offsets.
    const parts = text.split(/(\s+)/);

    return parts.map((part, index) => {
      const mod = sortedMods.find(m => m.replacement.toLowerCase() === part.toLowerCase().replace(/[.,!?;:]/g, ''));
      
      if (mod) {
        return (
          <span key={index} className={styles.tokenWrapper}>
            <span 
              className={`${styles.token} ${mod.type === 'synonym' ? styles.synonym : styles.structural}`}
              onMouseEnter={() => setActiveToken(index)}
              onMouseLeave={() => setActiveToken(null)}
            >
              {part}
              <AnimatePresence>
                {activeToken === index && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.95 }}
                    className={`${styles.tooltip} glass`}
                  >
                    <div className={styles.tooltipHeader}>
                      <span className={styles.label}>Improved from:</span>
                      <span className={styles.original}>"{mod.original}"</span>
                    </div>
                    <p className={styles.reason}>{mod.reason}</p>
                    <div className={styles.typeTag}>{mod.type}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </span>
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className={styles.container}>
      {renderTokens()}
    </div>
  );
};

export default TokenizedOutput;
