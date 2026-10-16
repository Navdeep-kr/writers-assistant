'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import styles from './professional.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { PROFESSIONAL_DATA } from '@/lib/professionalData';

export default function ProfessionalHub() {
  const [search, setSearch] = useState('');
  const categories = Object.values(PROFESSIONAL_DATA);

  const filteredCategories = useMemo(() => 
    categories.filter(cat => 
      cat.title.toLowerCase().includes(search.toLowerCase()) || 
      cat.description.toLowerCase().includes(search.toLowerCase()) ||
      cat.id.toLowerCase().includes(search.toLowerCase())
    ), [search, categories]);

  return (
    <div className={styles.hubContainer}>
      <header className={styles.hubHeader}>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.hubTitle}
        >
          Professional Intelligence Suite
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={styles.hubSubtitle}
        >
          Elevate your industry workflows with specialized AI writing tools tailored for enterprise excellence.
        </motion.p>
        <div className={styles.searchWrapper}>
          <input 
            type="text" 
            placeholder="Search departments (e.g., Marketing, Sales, HR)..." 
            className={styles.searchInput}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>

      <div className={styles.categoryGrid}>
        <AnimatePresence>
          {filteredCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link href={`/professional/${category.id}`} className={styles.categoryCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.categoryIcon}>{category.icon}</span>
                  <h2 className={styles.categoryTitle}>{category.title}</h2>
                </div>
                <p className={styles.categoryDescription}>{category.description}</p>
                <div className={styles.cardFooter}>
                  <span className={styles.toolCount}>{category.tools.length} Specialized Tools</span>
                  <span className={styles.arrow}>Launch Hub →</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
