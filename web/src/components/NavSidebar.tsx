'use client';

import React from 'react';
import styles from './NavSidebar.module.css';

import { usePathname, useRouter } from 'next/navigation';
import { useNavigation } from '@/context/navigation-context';

interface NavSidebarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  className?: string;
}

const NavSidebar: React.FC<NavSidebarProps> = ({ className }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { activeTab, setActiveTab } = useNavigation();

  const handleItemClick = (id: string) => {
    setActiveTab(id);
    
    // If we are already on the editor/hub page, it just switches tabs via state
    // If we are on a professional or other page, it needs to redirect to home
    if (pathname !== '/' && pathname !== '/tools') {
      router.push(`/?tool=${id}`);
    }
  };

  const sections = [
    {
      title: 'Writing Tools',
      items: [
        { id: 'paraphraser', label: 'Paraphraser', icon: '🔄' },
        { id: 'grammar', label: 'Grammar Fixer', icon: '✨' },
        { id: 'humanizer', label: 'Humanizer', icon: '🛡️' },
        { id: 'summarizer', label: 'Summarizer', icon: '📝' },
        { id: 'translator', label: 'Translator', icon: '🌐' },
      ]
    },
    {
      title: 'Generators',
      items: [
        { id: 'resume', label: 'Resume Builder', icon: '📄' },
        { id: 'cover-letter', label: 'Cover Letter', icon: '✉️' },
        { id: 'social-media', label: 'Social Media', icon: '📱' },
        { id: 'ai-chat', label: 'AI Chat', icon: '💬' },
      ]
    },
    {
      title: 'Analysis',
      items: [
        { id: 'ai-detector', label: 'AI Detector', icon: '🔍' },
        { id: 'plagiarism', label: 'Plagiarism Checker', icon: '📄' },
      ]
    }
  ];

  return (
    <nav className={`${styles.sidebar} ${className || ''}`}>
      {sections.map((section, idx) => (
        <div key={idx} className={styles.navSection}>
          <div className={styles.sectionTitle}>{section.title}</div>
          {section.items.map((item) => (
            <button
              key={item.id}
              className={`${styles.navItem} ${activeTab === item.id ? styles.activeNavItem : ''}`}
              onClick={() => handleItemClick(item.id)}
            >
              <span className={styles.icon}>{item.icon}</span>
              {item.label}
              {item.id === 'humanizer' && <span className={styles.badge}>PRO</span>}
            </button>
          ))}
        </div>
      ))}
    </nav>
  );
};

export default NavSidebar;
