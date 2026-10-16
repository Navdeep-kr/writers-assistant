'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import styles from './tool-workspace.module.css';
import GlassButton from '@/components/ui/GlassButton';
import { motion } from 'framer-motion';
import { PROFESSIONAL_DATA } from '@/lib/professionalData';
import { useAI } from '@/hooks/useAI';

export default function ProfessionalToolWorkspace() {
  const params = useParams();
  const router = useRouter();
  const { generateProfessionalTool, loading } = useAI();
  
  const categoryId = params.category as string;
  const toolId = params.toolId as string;
  
  const category = PROFESSIONAL_DATA[categoryId];
  const tool = category?.tools.find(t => t.id === toolId);
  
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    if (input) {
      const words = input.trim().split(/\s+/).filter(Boolean);
      setWordCount(words.length);
    } else {
      setWordCount(0);
    }
  }, [input]);

  if (!category || !tool) {
    return (
      <div className={styles.container}>
         <div className={styles.errorState}>
           <h1>Tool Not Found</h1>
           <p>The requested tool does not exist.</p>
           <GlassButton variant="secondary" onClick={() => router.back()}>Go Back</GlassButton>
         </div>
      </div>
    );
  }

  const handleRun = async () => {
    if (!input.trim()) return;
    try {
      const result = await generateProfessionalTool(tool.id, input, category.id);
      setOutput(result);
    } catch (e) {
      console.error('Generation Error:', e);
      setOutput('An error occurred during generation. Please try again.');
    }
  };

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      alert('Copied to clipboard!');
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.badge} style={{ color: category.accentColor, background: `${category.accentColor}11`, borderColor: `${category.accentColor}33` }}>
             {tool.icon} {category.title}
          </div>
          <h1 className={styles.title}>{tool.title}</h1>
          <p className={styles.description}>{tool.description}</p>
        </div>
        <button className={styles.backBtn} onClick={() => router.back()}>
          ✕ Close Tool
        </button>
      </header>

      <div className={styles.workspace}>
        {/* Input Area */}
        <div className={styles.inputArea}>
          <div className={styles.areaHeader}>
            <span className={styles.areaLabel}>PROMPT & CONTEXT</span>
            <span className={styles.wordCount}>{wordCount} words</span>
          </div>
          <textarea 
            className={styles.textarea}
            placeholder={tool.placeholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className={styles.areaFooter}>
            <p className={styles.hint}>Tip: Provide specific details for the best AI results.</p>
            <GlassButton 
              variant="primary" 
              onClick={handleRun} 
              loading={loading} 
              glow
              className={styles.generateBtn}
            >
              🚀 {tool.actionLabel}
            </GlassButton>
          </div>
        </div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Output Area */}
        <div className={styles.outputArea}>
          <div className={styles.areaHeader}>
            <span className={styles.areaLabel}>AI GENERATED OUTPUT</span>
            {output && <button onClick={handleCopy} className={styles.copyBtn}>📋 Copy Result</button>}
          </div>
          <div className={styles.resultBox}>
            {loading ? (
              <div className={styles.loadingState}>
                <div className={styles.spinner} style={{ borderColor: `${category.accentColor} ${category.accentColor} transparent transparent` }} />
                <p>AI is crafting your {tool.title.toLowerCase()}...</p>
              </div>
            ) : output ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={styles.outputContent}
              >
                {output}
              </motion.div>
            ) : (
              <div className={styles.emptyOutput}>
                <span className={styles.emptyIcon}>✨</span>
                <p>Your AI-generated result will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
