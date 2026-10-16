'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useAI } from '@/hooks/useAI';
import styles from './creators.module.css';
import { 
  BlogPostGenerator, AIStoryGenerator, SEOTitleGenerator, 
  InstagramCaptionGenerator, ContentBriefGenerator, CreatorTool 
} from '@/components/FeatureTools';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation } from '@/context/navigation-context';

const CREATOR_TOOLS_DATA = [
  { 
    id: 'blog-post', 
    title: 'Blog Post Generator', 
    description: 'Generate comprehensive, SEO-optimized blog posts instantly with titles and subheaders.',
    icon: '✍️',
    tag: 'WRITING',
    color: '#00f2fe'
  },
  { 
    id: 'ai-story', 
    title: 'AI Story Generator', 
    description: 'Craft compelling narratives and creative fiction from simple character or plot prompts.',
    icon: '📖',
    tag: 'CREATIVE',
    color: '#a855f7'
  },
  { 
    id: 'paragraph-gen', 
    title: 'Paragraph Generator', 
    description: 'Expand a single idea into a full, authoritative, and well-structured paragraph.',
    icon: '📝',
    tag: 'WRITING',
    color: '#34d399'
  },
  { 
    id: 'case-study', 
    title: 'Case Study Generator', 
    description: 'Create professional business case studies highlighting problems, solutions, and ROI.',
    icon: '📁',
    tag: 'PROFESSIONAL',
    color: '#fbbf24'
  },
  { 
    id: 'ad-copy', 
    title: 'Ad Copy Generator', 
    description: 'High-conversion copy for Google, Meta, and LinkedIn ads that drives clicks.',
    icon: '💰',
    tag: 'MARKETING',
    color: '#f87171'
  },
  { 
    id: 'youtube-tags', 
    title: 'YouTube Tag Generator', 
    description: 'Optimize your video reach with searchable tags and catchy descriptions.',
    icon: '📺',
    tag: 'SOCIAL',
    color: '#ff0000'
  },
  { 
    id: 'instagram-caption', 
    title: 'Instagram Caption', 
    description: 'Trendy captions with emojis and hashtags tailored to your photo or video.',
    icon: '📸',
    tag: 'SOCIAL',
    color: '#ec4899'
  },
  { 
    id: 'linkedin-post', 
    title: 'LinkedIn Post Creator', 
    description: 'Authoritative thought-leadership posts for your professional global network.',
    icon: '💼',
    tag: 'SOCIAL',
    color: '#0a66c2'
  },
  { 
    id: 'seo-title', 
    title: 'SEO Title Generator', 
    description: 'Generate high-CTR, search-optimized meta titles that rank on page one.',
    icon: '🔍',
    tag: 'SEO',
    color: '#6366f1'
  },
  { 
    id: 'meta-description', 
    title: 'Meta Description', 
    description: 'Punchy, character-limited descriptions that improve organic click-through rates.',
    icon: '🏷️',
    tag: 'SEO',
    color: '#14b8a6'
  },
  { 
    id: 'content-brief', 
    title: 'Content Brief Generator', 
    description: 'Detailed strategy briefs for writers, including keywords and outline.',
    icon: '📋',
    tag: 'GROWTH',
    color: '#f59e0b'
  }
];

function CreatorHubContent() {
  const { activeTab: activeTool, setActiveTab: setActiveTool } = useNavigation();
  const [search, setSearch] = useState('');
  const ai = useAI();

  const filteredTools = useMemo(() => 
    CREATOR_TOOLS_DATA.filter(t => 
      t.title.toLowerCase().includes(search.toLowerCase()) || 
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      t.tag.toLowerCase().includes(search.toLowerCase())
    ), [search]);

  const renderActiveTool = () => {
    switch (activeTool) {
      case 'blog-post': return <BlogPostGenerator ai={ai} />;
      case 'ai-story': return <AIStoryGenerator ai={ai} />;
      case 'paragraph-gen': return <CreatorTool ai={ai} toolId="paragraph-gen" title="Paragraph Generator" description="Expand your ideas into flowing, professional paragraphs." icon="📝" />;
      case 'case-study': return <CreatorTool ai={ai} toolId="case-study" title="Case Study Generator" description="Draft compelling business success stories." icon="📁" />;
      case 'ad-copy': return <CreatorTool ai={ai} toolId="ad-copy" title="Ad Copy Generator" description="High-conversion marketing copy for any platform." icon="💰" />;
      case 'youtube-tags': return <CreatorTool ai={ai} toolId="youtube-tags" title="YouTube Tag Generator" description="Optimized tags and descriptions for video creators." icon="📺" />;
      case 'instagram-caption': return <InstagramCaptionGenerator ai={ai} />;
      case 'linkedin-post': return <CreatorTool ai={ai} toolId="linkedin-post" title="LinkedIn Post Creator" description="Build your professional presence with expert posts." icon="💼" />;
      case 'seo-title': return <SEOTitleGenerator ai={ai} />;
      case 'meta-description': return <CreatorTool ai={ai} toolId="meta-description" title="Meta Description Generator" description="SEO-optimized snippets for search engines." icon="🏷️" />;
      case 'content-brief': return <ContentBriefGenerator ai={ai} />;
      default: return null;
    }
  };

  return (
    <div className={styles.creatorsLayout}>
      <AnimatePresence mode="wait">
        {!activeTool || activeTool === 'editor' || !CREATOR_TOOLS_DATA.find(t => t.id === activeTool) ? (
          <motion.div 
            key="hub"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <section className={styles.hero}>
              <h1>AI Creator Hub</h1>
              <p>Harness the power of AI to generate high-performing content. From viral social posts to SEO-optimized blog articles, build your creator business with style.</p>
              <div className={styles.searchWrapper}>
                <input 
                  type="text" 
                  placeholder="Search for a tool (e.g., Blog, Instagram, SEO)..." 
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
             <div className={styles.backBtn} onClick={() => setActiveTool('editor')}>
                ← Back to Creator Hub
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

export default function CreatorHub() {
  return (
    <Suspense fallback={<div style={{ padding: '60px', textAlign: 'center', color: '#fff' }}>Powering up Creator Hub...</div>}>
      <CreatorHubContent />
    </Suspense>
  );
}
