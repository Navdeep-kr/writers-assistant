'use client';

import React, { useState } from 'react';
import styles from './AIActionPanel.module.css';
import api from '@/lib/api';

interface AIActionPanelProps {
  onApply: (text: string) => void;
  selectedText: string;
}

const AIActionPanel: React.FC<AIActionPanelProps> = ({ onApply, selectedText }) => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<string[]>([]);

  const handleRewrite = async (style: 'simple' | 'professional' | 'creative') => {
    if (!selectedText) return;
    setLoading(true);
    try {
      const response = await api.post('/ai/improve-style', { 
        text: selectedText, 
        style 
      });
      if (response.data.improved) {
        setResults([response.data.improved]);
      }
    } catch (error) {
      console.error('Rewrite error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.panel}>
      <h4>AI Rewrite</h4>
      <p className={styles.hint}>Select text in the editor to rewrite.</p>
      
      <div className={styles.options}>
        <button disabled={!selectedText || loading} onClick={() => handleRewrite('simple')}>Simple</button>
        <button disabled={!selectedText || loading} onClick={() => handleRewrite('professional')}>Professional</button>
        <button disabled={!selectedText || loading} onClick={() => handleRewrite('creative')}>Creative</button>
      </div>

      {loading && <div className={styles.loader}>Generating versions...</div>}

      <div className={styles.results}>
        {results.map((r, i) => (
          <div key={i} className={styles.resultCard}>
            <p>{r}</p>
            <button className={styles.applyBtn} onClick={() => onApply(r)}>Use This</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIActionPanel;
