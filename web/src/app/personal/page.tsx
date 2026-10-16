'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useAI } from '@/hooks/useAI';
import styles from './personal.module.css';
import { 
  DiaryAssistant, PersonalLetter, SpeechWriter, ItineraryPlanner, PersonalTool 
} from '@/components/FeatureTools';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation } from '@/context/navigation-context';

const PERSONAL_TOOLS_DATA = [
  { 
    id: 'diary-assistant', 
    title: 'Diary Assistant', 
    description: 'Reflect on your day. Transform brief notes into meaningful, reflective diary entries.',
    icon: '📔',
    tag: 'REfLECTION',
    color: '#a855f7'
  },
  { 
    id: 'personal-letter', 
    title: 'Personal Letter', 
    description: 'Draft heartfelt letters for friends, family, or partners based on your feelings.',
    icon: '✉️',
    tag: 'EXPRESSION',
    color: '#ec4899'
  },
  { 
    id: 'speech-writer', 
    title: 'Speech Writer', 
    description: 'Create memorable, emotional speeches for weddings, birthdays, or special events.',
    icon: '🎤',
    tag: 'EVENTS',
    color: '#f59e0b'
  },
  { 
    id: 'gift-ideas', 
    title: 'Gift Ideas', 
    description: 'Generate unique, thoughtful, and personalized gift ideas for any occasion.',
    icon: '🎁',
    tag: 'PLANNING',
    color: '#10b981'
  },
  { 
    id: 'itinerary-planner', 
    title: 'Itinerary Planner', 
    description: 'Plan your next adventure with a detailed, day-by-day travel itinerary.',
    icon: '🗺️',
    tag: 'TRAVEL',
    color: '#3b82f6'
  }
];

function PersonalHubContent() {
  const { activeTab: activeTool, setActiveTab: setActiveTool } = useNavigation();
  const [search, setSearch] = useState('');
  const ai = useAI();

  const filteredTools = useMemo(() => 
    PERSONAL_TOOLS_DATA.filter(t => 
      t.title.toLowerCase().includes(search.toLowerCase()) || 
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      t.tag.toLowerCase().includes(search.toLowerCase())
    ), [search]);

  const renderActiveTool = () => {
    switch (activeTool) {
      case 'diary-assistant': return <DiaryAssistant ai={ai} />;
      case 'personal-letter': return <PersonalLetter ai={ai} />;
      case 'speech-writer': return <SpeechWriter ai={ai} />;
      case 'gift-ideas': return <PersonalTool ai={ai} toolId="gift-ideas" title="Gift Ideas" description="Find the perfect present for someone special." icon="🎁" placeholder="Who is the gift for? What are their interests? What is the occasion?" />;
      case 'itinerary-planner': return <ItineraryPlanner ai={ai} />;
      default: return null;
    }
  };

  return (
    <div className={styles.personalLayout}>
      <AnimatePresence mode="wait">
        {!activeTool || activeTool === 'editor' || !PERSONAL_TOOLS_DATA.find(t => t.id === activeTool) ? (
          <motion.div 
            key="hub"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <section className={styles.hero}>
              <h1>Personal AI Companion</h1>
              <p>Specialized tools for your daily life. From reflective journaling to planning your next big trip or special event speech.</p>
              <div className={styles.searchWrapper}>
                <input 
                  type="text" 
                  placeholder="Search personal tools (e.g., Diary, Speech, Gift)..." 
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
                  style={{ '--tool-accent': tool.color } as any}
                >
                  <div className={styles.cardIcon}>{tool.icon}</div>
                  <div className={styles.cardContent}>
                    <span className={styles.tag}>{tool.tag}</span>
                    <h3>{tool.title}</h3>
                    <p>{tool.description}</p>
                  </div>
                  <div className={styles.cardFooter}>
                    <span className={styles.arrow}>Launch Tool →</span>
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
          >
             <div className={styles.backBtn} onClick={() => setActiveTool('')}>
                ← Back to Personal Hub
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

export default function PersonalHub() {
  return (
    <Suspense fallback={<div style={{ padding: '60px', textAlign: 'center', color: '#fff' }}>Powering up Personal Hub...</div>}>
      <PersonalHubContent />
    </Suspense>
  );
}
