'use client';

import React, { useState, useMemo } from 'react';
import { useAI } from '@/hooks/useAI';
import styles from './academic.module.css';
import { 
  Paraphraser, Summarizer, CitationGenerator, 
  AcademicCoWriter, AIDetectorTool, PlagiarismTool, GrammarFixer
} from '@/components/FeatureTools';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation } from '@/context/navigation-context';
import { Suspense } from 'react';

const ACADEMIC_TOOLS_DATA = [
  { 
    id: 'academic-paraphraser', 
    title: 'Academic Paraphraser', 
    description: 'Refine research papers with formal, high-perplexity academic vocabulary.',
    icon: '🎓',
    tag: 'INTEGRITY'
  },
  { 
    id: 'citation-generator', 
    title: 'Citation Generator', 
    description: 'Instant APA, MLA, and Chicago citations for URLs, DOIs, and books.',
    icon: '📚',
    tag: 'FORMATTING'
  },
  { 
    id: 'academic-writer', 
    title: 'Co-Writer (Academic)', 
    description: 'A focused environment for manuscript drafting with integrated research.',
    icon: '✍️',
    tag: 'CREATION'
  },
  { 
    id: 'academic-summarizer', 
    title: 'Research Summarizer', 
    description: 'Condense complex academic papers into scan-ready executive summaries.',
    icon: '📝',
    tag: 'EFFICIENCY'
  },
  { 
    id: 'academic-detector', 
    title: 'AI Detector', 
    description: 'Verify academic integrity with deep scans for AI-generated patterns.',
    icon: '🔍',
    tag: 'VERIFICATION'
  },
  { 
    id: 'academic-plagiarism', 
    title: 'Plagiarism Checker', 
    description: 'Scan against billions of documents and exclusive academic databases.',
    icon: '📄',
    tag: 'VERIFICATION'
  }
];

function AcademicHubContent() {
  const { activeTab: activeTool, setActiveTab: setActiveTool } = useNavigation();
  const [search, setSearch] = useState('');
  const ai = useAI();

  const filteredTools = useMemo(() => 
    ACADEMIC_TOOLS_DATA.filter(t => 
      t.title.toLowerCase().includes(search.toLowerCase()) || 
      t.description.toLowerCase().includes(search.toLowerCase())
    ), [search]);

  const renderActiveTool = () => {
    switch (activeTool) {
      case 'academic-paraphraser': return <Paraphraser ai={ai} />;
      case 'citation-generator': return <CitationGenerator ai={ai} />;
      case 'academic-writer': return <AcademicCoWriter ai={ai} />;
      case 'academic-summarizer': return <Summarizer ai={ai} />;
      case 'academic-detector': return <AIDetectorTool ai={ai} />;
      case 'academic-plagiarism': return <PlagiarismTool ai={ai} />;
      default: return null;
    }
  };

  return (
    <div className={styles.toolsLayout}>
      <AnimatePresence mode="wait">
        {!activeTool || activeTool === 'editor' || !ACADEMIC_TOOLS_DATA.find(t => t.id === activeTool) ? (
          <motion.div 
            key="hub"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            style={{ width: '100%' }}
          >
            <section className={styles.hero}>
              <h1>Academic Research Suite</h1>
              <p>Specialized tools designed for the rigorous standards of modern academia. Perfect for students, researchers, and professional authors.</p>
              <div className={styles.searchWrapper}>
                <input 
                  type="text" 
                  placeholder="Find an academic tool (e.g., Citations, Summarizer)..." 
                  className={styles.searchInput}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </section>

            <section className={styles.toolsGrid}>
              {filteredTools.map((tool) => (
                <div 
                  key={tool.id} 
                  className={styles.toolCard}
                  onClick={() => setActiveTool(tool.id)}
                >
                  <div className={styles.cardIcon}>{tool.icon}</div>
                  <div className={styles.cardContent}>
                    <span className={styles.tag}>{tool.tag}</span>
                    <h3>{tool.title}</h3>
                    <p>{tool.description}</p>
                  </div>
                  <div className={styles.cardFooter}>
                    <span className={styles.arrow} style={{ color: '#fff' }}>→ Open {tool.title}</span>
                  </div>
                </div>
              ))}
            </section>
          </motion.div>
        ) : (
          <motion.div 
            key="focus"
            className={styles.focusWorkspace}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            style={{ width: '100%' }}
          >
             <div className={styles.backBtn} onClick={() => setActiveTool('')}>
                ← Back to Research Suite
              </div>
              <div className={styles.activeToolWrapper}>
                {renderActiveTool()}
              </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AcademicHub() {
  return (
    <Suspense fallback={<div style={{ padding: '40px', textAlign: 'center', color: '#fff' }}>Preparing Research Suite...</div>}>
      <AcademicHubContent />
    </Suspense>
  );
}
