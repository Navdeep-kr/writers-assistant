'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useNavigation } from '@/context/navigation-context';
import styles from './CommandPalette.module.css';

interface CommandItem {
  id: string;
  label: string;
  icon: string;
  category: string;
  shortcut?: string;
  action: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { setActiveTab, setIsFocusMode, isFocusMode } = useNavigation();

  const commands: CommandItem[] = [
    { id: 'editor', label: 'Go to Editor', icon: '📝', category: 'Navigation', shortcut: 'G E', action: () => { router.push('/'); setActiveTab('editor'); onClose(); } },
    { id: 'paraphraser', label: 'AI Paraphraser', icon: '🔄', category: 'Tools', action: () => { router.push('/'); setActiveTab('paraphraser'); onClose(); } },
    { id: 'grammar', label: 'Grammar Checker', icon: '✨', category: 'Tools', action: () => { router.push('/'); setActiveTab('grammar'); onClose(); } },
    { id: 'summarizer', label: 'Summarizer', icon: '📝', category: 'Tools', action: () => { router.push('/'); setActiveTab('summarizer'); onClose(); } },
    { id: 'humanizer', label: 'Humanizer', icon: '🛡️', category: 'Tools', action: () => { router.push('/'); setActiveTab('humanizer'); onClose(); } },
    { id: 'resume', label: 'Resume Builder', icon: '📄', category: 'Generators', action: () => { router.push('/'); setActiveTab('resume'); onClose(); } },
    { id: 'social-media', label: 'Social Media Writer', icon: '📱', category: 'Generators', action: () => { router.push('/'); setActiveTab('social-media'); onClose(); } },
    { id: 'cover-letter', label: 'Cover Letter', icon: '✉️', category: 'Generators', action: () => { router.push('/'); setActiveTab('cover-letter'); onClose(); } },
    { id: 'ai-chat', label: 'AI Chat', icon: '💬', category: 'Generators', action: () => { router.push('/'); setActiveTab('ai-chat'); onClose(); } },
    { id: 'ai-detector', label: 'AI Detector', icon: '🔍', category: 'Analysis', action: () => { router.push('/'); setActiveTab('ai-detector'); onClose(); } },
    { id: 'plagiarism', label: 'Plagiarism Checker', icon: '🛡️', category: 'Analysis', action: () => { router.push('/'); setActiveTab('plagiarism'); onClose(); } },
    { id: 'academic', label: 'Academic Hub', icon: '🎓', category: 'Navigation', action: () => { router.push('/academic'); onClose(); } },
    { id: 'pro', label: 'Professional Hub', icon: '💼', category: 'Navigation', action: () => { router.push('/professional'); onClose(); } },
    { id: 'dark-mode', label: isFocusMode ? 'Exit Focus Mode' : 'Enter Focus Mode', icon: '🎯', category: 'Settings', shortcut: 'F', action: () => { setIsFocusMode(!isFocusMode); onClose(); } },
  ];

  const filteredCommands = commands.filter(cmd => 
    cmd.label.toLowerCase().includes(search.toLowerCase()) || 
    cmd.category.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setActiveIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex(prev => (prev + 1) % filteredCommands.length);
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      }
      if (e.key === 'Enter') {
        filteredCommands[activeIndex]?.action();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, activeIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.container} onClick={e => e.stopPropagation()}>
        <div className={styles.searchWrapper}>
          <span className={styles.searchIcon}>🔍</span>
          <input 
            ref={inputRef}
            className={styles.input}
            placeholder="Type a command or search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className={styles.results}>
          {filteredCommands.length > 0 ? (
            filteredCommands.map((cmd, index) => (
              <React.Fragment key={cmd.id}>
                {(index === 0 || filteredCommands[index - 1].category !== cmd.category) && (
                  <div className={styles.groupLabel}>{cmd.category}</div>
                )}
                <div 
                  className={`${styles.resultItem} ${index === activeIndex ? styles.activeResult : ''}`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={cmd.action}
                >
                  <span className={styles.icon}>{cmd.icon}</span>
                  <span className={styles.label}>{cmd.label}</span>
                  {cmd.shortcut && <span className={styles.shortcut}>{cmd.shortcut}</span>}
                </div>
              </React.Fragment>
            ))
          ) : (
            <div className={styles.groupLabel} style={{ textAlign: 'center', padding: '2rem' }}>No commands found</div>
          )}
        </div>

        <div className={styles.footer}>
          <span><b>↑↓</b> to navigate</span>
          <span><b>Enter</b> to select</span>
          <span><b>Esc</b> to close</span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
