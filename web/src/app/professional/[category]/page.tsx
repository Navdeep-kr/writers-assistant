'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import styles from './category.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { PROFESSIONAL_DATA } from '@/lib/professionalData';

import { GenericProfessionalTool } from '@/components/FeatureTools';
import { useAI } from '@/hooks/useAI';

export default function ProfessionalCategoryPage() {
  const params = useParams();
  const categoryId = params.category as string;
  const category = PROFESSIONAL_DATA[categoryId];
  const ai = useAI();
  
  const [activeToolId, setActiveToolId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const activeTool = useMemo(() => {
    if (!activeToolId || !category) return null;
    return category.tools.find(t => t.id === activeToolId);
  }, [activeToolId, category]);

  const filteredTools = useMemo(() => {
    if (!category) return [];
    return category.tools.filter(tool => 
      tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [category, searchQuery]);

  if (!category) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Category Not Found</h1>
          <p>The requested professional category does not exist.</p>
          <Link href="/professional" className={styles.backLink}>← Back to Hub</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <AnimatePresence mode="wait">
        {!activeToolId ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <header className={styles.header}>
              <div className={styles.titleSection}>
                <div className={styles.categoryBadge} style={{ color: category.accentColor, borderColor: `${category.accentColor}33`, background: `${category.accentColor}11` }}>
                  {category.icon} {category.title}
                </div>
                <h1 className={styles.title}>{category.title} Suite</h1>
                <p className={styles.subtitle}>{category.description}</p>
              </div>
              
              <div className={styles.searchSection}>
                <div className={styles.searchBar}>
                  <span className={styles.searchIcon}>🔍</span>
                  <input 
                    type="text" 
                    placeholder={`Search ${category.title.toLowerCase()} tools...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={styles.searchInput}
                  />
                </div>
              </div>
            </header>

            <div className={styles.toolsGrid}>
              {filteredTools.map((tool, index) => (
                <motion.div
                  layout
                  key={tool.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={() => setActiveToolId(tool.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className={styles.toolCard}>
                    <div className={styles.cardHeader}>
                        <span className={styles.cardIcon}>{tool.icon}</span>
                        <h3 className={styles.cardTitle}>{tool.title}</h3>
                    </div>
                    <p className={styles.cardDescription}>{tool.description}</p>
                    <div className={styles.cardAction}>
                        <span>Launch Tool</span>
                        <span className={styles.arrow}>→</span>
                    </div>
                    <div 
                      className={styles.cardHoverGlow} 
                      style={{ background: `radial-gradient(circle at center, ${category.accentColor}22 0%, transparent 70%)` }} 
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredTools.length === 0 && (
              <div className={styles.noResults}>
                <p>No tools found matching "{searchQuery}"</p>
                <button onClick={() => setSearchQuery('')} className={styles.clearBtn}>Clear Search</button>
              </div>
            )}

            <footer className={styles.footer}>
              <Link href="/professional" className={styles.backLink}>
                 ← Back to Professional Hub
              </Link>
            </footer>
          </motion.div>
        ) : (
          <motion.div
            key="tool"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className={styles.toolWorkspace}
          >
            <div className={styles.toolHeader}>
               <button className={styles.backBtn} onClick={() => setActiveToolId(null)}>
                  ← Back to {category.title} Grid
               </button>
               <div className={styles.toolMeta}>
                  <span className={styles.toolIcon}>{activeTool?.icon}</span>
                  <span className={styles.toolTitle}>{activeTool?.title}</span>
               </div>
            </div>
            
            <div className={styles.activeToolContainer}>
              {activeTool && (
                <GenericProfessionalTool 
                  ai={ai}
                  categoryId={categoryId}
                  toolId={activeTool.id}
                  title={activeTool.title}
                  description={activeTool.description}
                  icon={activeTool.icon}
                  placeholder={activeTool.placeholder}
                  actionLabel={activeTool.actionLabel}
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
