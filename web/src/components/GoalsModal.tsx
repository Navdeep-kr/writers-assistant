import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './GoalsModal.module.css';

export interface WritingGoals {
  audience: 'general' | 'knowledgeable' | 'expert';
  formality: 'informal' | 'neutral' | 'formal';
  intent: 'inform' | 'describe' | 'convince' | 'tell-a-story';
}

interface GoalsModalProps {
  isOpen: boolean;
  onClose: () => void;
  goals: WritingGoals;
  setGoals: (goals: WritingGoals) => void;
}

const GoalsModal: React.FC<GoalsModalProps> = ({ isOpen, onClose, goals, setGoals }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.backdrop} 
            onClick={onClose} 
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={styles.modal}
          >
            <h3>Set Writing Goals</h3>
            <p className={styles.subtitle}>Get tailored writing suggestions based on your targets.</p>
            
            <div className={styles.section}>
              <h4>Audience</h4>
              <div className={styles.pillGroup}>
                {['general', 'knowledgeable', 'expert'].map(a => (
                  <button 
                    key={a} 
                    className={goals.audience === a ? styles.activePill : styles.pill}
                    onClick={() => setGoals({...goals, audience: a as any})}
                  >{a}</button>
                ))}
              </div>
            </div>

            <div className={styles.section}>
              <h4>Formality</h4>
              <div className={styles.pillGroup}>
                {['informal', 'neutral', 'formal'].map(f => (
                  <button 
                    key={f} 
                    className={goals.formality === f ? styles.activePill : styles.pill}
                    onClick={() => setGoals({...goals, formality: f as any})}
                  >{f}</button>
                ))}
              </div>
            </div>

            <div className={styles.section}>
              <h4>Intent</h4>
              <div className={styles.pillGroup}>
                {['inform', 'describe', 'convince', 'tell-a-story'].map(i => (
                  <button 
                    key={i} 
                    className={goals.intent === i ? styles.activePill : styles.pill}
                    onClick={() => setGoals({...goals, intent: i as any})}
                  >{i.replace(/-/g, ' ')}</button>
                ))}
              </div>
            </div>

            <button className={styles.doneBtn} onClick={onClose}>Done</button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default GoalsModal;
