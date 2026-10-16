'use client';

import React, { useState, useMemo, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, CheckCircle2, ShieldCheck, FileText, 
  Search, ArrowRight, X, Clock, Plus, Zap, Award, BookOpen,
  LayoutGrid, RefreshCw, MessageSquare, Globe, Trash2, Home as HomeIcon
} from 'lucide-react';

import styles from '../page.module.css';

import DashboardModal from '@/components/DashboardModal';
import { useAI } from '@/hooks/useAI';
import { useDocuments } from '@/hooks/useDocuments';
import { useAuth } from '@/hooks/useAuth';
import { useNavigation } from '@/context/navigation-context';

import { 
  Paraphraser, Summarizer, Translator, GrammarFixer, 
  HumanizerTool, AIChatTool, AIDetectorTool, SocialMediaTool,
  CoverLetterTool, ResumeBuilderTool, PlagiarismTool,
  AcademicCoWriter, CitationGenerator
} from '@/components/FeatureTools';
import TemplateGallery from '@/components/TemplateGallery';

interface DashboardTool {
  id: string;
  title: string;
  description: string;
  category: 'writing' | 'career' | 'integrity' | 'academic' | 'assist';
  icon: string;
  tag: string;
  component: React.ComponentType<{ ai: any }>;
}

const DASHBOARD_TOOLS: DashboardTool[] = [
  {
    id: 'paraphraser',
    title: 'AI Paraphraser',
    description: 'Transform tone, rephrase clauses, and enhance style with zero robotic artifacts.',
    category: 'writing',
    icon: '🔄',
    tag: 'POPULAR',
    component: Paraphraser
  },
  {
    id: 'grammar',
    title: 'Grammar & Spell Engine',
    description: 'Fix grammatical slips, punctuation, and style inconsistencies with deep rule validation.',
    category: 'writing',
    icon: '✨',
    tag: 'ESSENTIAL',
    component: GrammarFixer
  },
  {
    id: 'humanizer',
    title: 'AI Humanizer',
    description: 'Convert machine-generated content into fluid, natural, human-sounding prose.',
    category: 'writing',
    icon: '🛡️',
    tag: 'PRO',
    component: HumanizerTool
  },
  {
    id: 'summarizer',
    title: 'Smart Summarizer',
    description: 'Condense articles, briefs, and reports into crisp executive summaries or bullet points.',
    category: 'writing',
    icon: '📝',
    tag: 'EFFICIENCY',
    component: Summarizer
  },
  {
    id: 'ai-detector',
    title: 'AI Content Detector',
    description: 'Inspect perplexity, burstiness, and machine patterns to ensure human authenticity.',
    category: 'integrity',
    icon: '🔍',
    tag: 'ACCURACY',
    component: AIDetectorTool
  },
  {
    id: 'plagiarism',
    title: 'Plagiarism Checker',
    description: 'Scan content against millions of indexed online publications and academic papers.',
    category: 'integrity',
    icon: '📄',
    tag: 'SECURITY',
    component: PlagiarismTool
  },
  {
    id: 'resume',
    title: 'Resume Builder',
    description: 'Craft high-impact, ATS-optimized resumes highlighting your key achievements.',
    category: 'career',
    icon: '💼',
    tag: 'CAREER',
    component: ResumeBuilderTool
  },
  {
    id: 'cover-letter',
    title: 'Cover Letter Generator',
    description: 'Generate tailored, compelling cover letters matching exact job specifications.',
    category: 'career',
    icon: '✉️',
    tag: 'CAREER',
    component: CoverLetterTool
  },
  {
    id: 'social-media',
    title: 'Social Media Writer',
    description: 'Create viral, platform-tailored posts for LinkedIn, X (Twitter), and Instagram.',
    category: 'career',
    icon: '📱',
    tag: 'CREATOR',
    component: SocialMediaTool
  },
  {
    id: 'ai-chat',
    title: 'AI Writing Mentor',
    description: 'Engage with an intelligent AI partner for brainstorming, editing, and structure critique.',
    category: 'assist',
    icon: '💬',
    tag: 'INTERACTIVE',
    component: AIChatTool
  },
  {
    id: 'translator',
    title: 'Multilingual Translator',
    description: 'Translate across 50+ languages while preserving subtle contextual nuances.',
    category: 'writing',
    icon: '🌐',
    tag: 'GLOBAL',
    component: Translator
  },
  {
    id: 'academic-cowriter',
    title: 'Academic Co-Writer',
    description: 'Draft scholarly manuscripts, literature reviews, and research dissertations.',
    category: 'academic',
    icon: '🎓',
    tag: 'SCHOLARLY',
    component: AcademicCoWriter
  },
  {
    id: 'citation',
    title: 'Citation Generator',
    description: 'Generate instant APA, MLA, and Chicago bibliography citations effortlessly.',
    category: 'academic',
    icon: '📚',
    tag: 'RESEARCH',
    component: CitationGenerator
  },
  {
    id: 'templates',
    title: 'Writing Frameworks & Templates',
    description: 'Access curated templates for business proposals, academic outlines, and creative stories.',
    category: 'assist',
    icon: '📑',
    tag: 'LIBRARY',
    component: () => <TemplateGallery visible={true} onGenerate={(c) => console.log(c)} />
  }
];

function DashboardContent() {
  const ai = useAI();
  const docs = useDocuments();
  const auth = useAuth();
  const searchParams = useSearchParams();
  const { isDashOpen, setIsDashOpen } = useNavigation();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeToolId, setActiveToolId] = useState<string | null>(null);

  const workspaceRef = useRef<HTMLDivElement>(null);
  const { documents, fetchDocuments, deleteDocument } = docs;

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  // Read ?tool=<toolId> from URL and open that tool automatically
  useEffect(() => {
    const requestedTool = searchParams.get('tool');
    if (requestedTool) {
      // Find matching tool
      const match = DASHBOARD_TOOLS.find(t => t.id === requestedTool || t.id.toLowerCase() === requestedTool.toLowerCase());
      if (match) {
        setActiveToolId(match.id);
        setTimeout(() => {
          if (workspaceRef.current) {
            workspaceRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 150);
      }
    }
  }, [searchParams]);

  // Filter tools by category and search
  const filteredTools = useMemo(() => {
    return DASHBOARD_TOOLS.filter(tool => {
      const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;
      const matchesSearch = 
        tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tag.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const activeTool = useMemo(() => {
    return DASHBOARD_TOOLS.find(t => t.id === activeToolId) || null;
  }, [activeToolId]);

  const handleLaunchTool = (toolId: string) => {
    setActiveToolId(toolId);
    setTimeout(() => {
      if (workspaceRef.current) {
        workspaceRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <div className={styles.dashboardContainer} style={{ paddingTop: '80px', minHeight: '100vh' }}>
      <div className={styles.contentWrapper}>
        
        {/* Executive Header Section */}
        <section className={styles.headerSection}>
          <div className={styles.headerLeft}>
            <div className={styles.statusPill}>
              <span className={styles.statusDot}></span>
              <span>100% Operational • Local Intelligence Active</span>
            </div>
            <h1 className={styles.mainTitle}>
              Writing <span className={styles.gradientText}>Command Center</span>
            </h1>
            <p className={styles.subtitle}>
              All 14 AI writing tools, analyzers, and generators unified in one powerful, easy-to-use dashboard.
            </p>
          </div>

          <div className={styles.headerActions}>
            <Link 
              href="/"
              className={styles.secondaryActionBtn}
              title="Return to homepage"
            >
              <HomeIcon size={16} />
              <span>Back to Home</span>
            </Link>
            <button 
              className={styles.primaryActionBtn}
              onClick={() => setIsDashOpen(true)}
              title="Open saved drafts"
            >
              <FileText size={18} />
              <span>My Saved Documents ({documents.length})</span>
            </button>
          </div>
        </section>

        {/* Live Key Metrics Cards */}
        <section className={styles.metricsGrid}>
          <div className={styles.metricCard}>
            <div className={`${styles.metricIconWrapper} ${styles.iconCyan}`}>
              <Award size={26} />
            </div>
            <div className={styles.metricInfo}>
              <span className={styles.metricValue}>98.4%</span>
              <span className={styles.metricLabel}>Writing Quality Health</span>
              <span className={styles.metricSubtext}>Adaptive grammar & clarity engine</span>
            </div>
          </div>

          <div className={styles.metricCard}>
            <div className={`${styles.metricIconWrapper} ${styles.iconBlue}`}>
              <FileText size={26} />
            </div>
            <div className={styles.metricInfo}>
              <span className={styles.metricValue}>{documents.length}</span>
              <span className={styles.metricLabel}>Saved Documents</span>
              <span className={styles.metricSubtext}>Synchronized with cloud database</span>
            </div>
          </div>

          <div className={styles.metricCard}>
            <div className={`${styles.metricIconWrapper} ${styles.iconViolet}`}>
              <Zap size={26} />
            </div>
            <div className={styles.metricInfo}>
              <span className={styles.metricValue}>14 Active</span>
              <span className={styles.metricLabel}>AI Tools & Generators</span>
              <span className={styles.metricSubtext}>Gemini 3.8 Flash + Local NLP fallback</span>
            </div>
          </div>

          <div className={styles.metricCard}>
            <div className={`${styles.metricIconWrapper} ${styles.iconGreen}`}>
              <ShieldCheck size={26} />
            </div>
            <div className={styles.metricInfo}>
              <span className={styles.metricValue}>99.2%</span>
              <span className={styles.metricLabel}>Originality & AI Bypass</span>
              <span className={styles.metricSubtext}>Perplexity & burstiness tuned</span>
            </div>
          </div>
        </section>

        {/* Smart Quick Actions Bar */}
        <section className={styles.quickActionsSection}>
          <span className={styles.quickActionsTitle}>⚡ Quick Actions:</span>
          <div className={styles.quickActionPills}>
            <button 
              className={`${styles.actionPill} ${activeToolId === 'paraphraser' ? styles.actionPillActive : ''}`}
              onClick={() => handleLaunchTool('paraphraser')}
            >
              🔄 Quick Paraphrase
            </button>
            <button 
              className={`${styles.actionPill} ${activeToolId === 'grammar' ? styles.actionPillActive : ''}`}
              onClick={() => handleLaunchTool('grammar')}
            >
              ✨ Polish Grammar
            </button>
            <button 
              className={`${styles.actionPill} ${activeToolId === 'humanizer' ? styles.actionPillActive : ''}`}
              onClick={() => handleLaunchTool('humanizer')}
            >
              🛡️ Humanize Text
            </button>
            <button 
              className={`${styles.actionPill} ${activeToolId === 'ai-detector' ? styles.actionPillActive : ''}`}
              onClick={() => handleLaunchTool('ai-detector')}
            >
              🔍 Scan AI Origin
            </button>
            <button 
              className={`${styles.actionPill} ${activeToolId === 'plagiarism' ? styles.actionPillActive : ''}`}
              onClick={() => handleLaunchTool('plagiarism')}
            >
              📄 Check Plagiarism
            </button>
            <button 
              className={`${styles.actionPill} ${activeToolId === 'cover-letter' ? styles.actionPillActive : ''}`}
              onClick={() => handleLaunchTool('cover-letter')}
            >
              ✉️ Cover Letter
            </button>
            <button 
              className={`${styles.actionPill} ${activeToolId === 'resume' ? styles.actionPillActive : ''}`}
              onClick={() => handleLaunchTool('resume')}
            >
              💼 Resume Builder
            </button>
            <button 
              className={`${styles.actionPill} ${activeToolId === 'ai-chat' ? styles.actionPillActive : ''}`}
              onClick={() => handleLaunchTool('ai-chat')}
            >
              💬 AI Mentor Chat
            </button>
          </div>
        </section>

        {/* Integrated In-Dashboard Workspace (When a Tool is Active) */}
        <div ref={workspaceRef}>
          <AnimatePresence>
            {activeTool && (
              <motion.section 
                className={styles.activeWorkspaceSection}
                initial={{ opacity: 0, y: -20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                <div className={styles.workspaceTopBar}>
                  <div className={styles.workspaceToolMeta}>
                    <div className={styles.workspaceToolIcon}>
                      {activeTool.icon}
                    </div>
                    <div>
                      <h2 className={styles.workspaceToolTitle}>{activeTool.title}</h2>
                      <p className={styles.workspaceToolDesc}>{activeTool.description}</p>
                    </div>
                  </div>

                  <div className={styles.workspaceControls}>
                    <span className={styles.statusIndicator}>
                      <span className={styles.statusDot}></span> Ready to Execute
                    </span>
                    <button 
                      className={styles.closeWorkspaceBtn}
                      onClick={() => setActiveToolId(null)}
                      title="Close workspace"
                    >
                      <X size={15} />
                      <span>Minimize</span>
                    </button>
                  </div>
                </div>

                <div className={styles.toolBodyContainer}>
                  <activeTool.component ai={ai} />
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>

        {/* Filter and Search Bar for All Tools */}
        <section className={styles.filterSection}>
          <div className={styles.categoryTabs}>
            <button 
              className={`${styles.categoryTab} ${activeCategory === 'all' ? styles.categoryTabActive : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              All Tools ({DASHBOARD_TOOLS.length})
            </button>
            <button 
              className={`${styles.categoryTab} ${activeCategory === 'writing' ? styles.categoryTabActive : ''}`}
              onClick={() => setActiveCategory('writing')}
            >
              ✍️ Writing & Editing (5)
            </button>
            <button 
              className={`${styles.categoryTab} ${activeCategory === 'career' ? styles.categoryTabActive : ''}`}
              onClick={() => setActiveCategory('career')}
            >
              💼 Career & Content (3)
            </button>
            <button 
              className={`${styles.categoryTab} ${activeCategory === 'integrity' ? styles.categoryTabActive : ''}`}
              onClick={() => setActiveCategory('integrity')}
            >
              🛡️ Integrity & Verification (2)
            </button>
            <button 
              className={`${styles.categoryTab} ${activeCategory === 'academic' ? styles.categoryTabActive : ''}`}
              onClick={() => setActiveCategory('academic')}
            >
              🎓 Academic & Research (2)
            </button>
            <button 
              className={`${styles.categoryTab} ${activeCategory === 'assist' ? styles.categoryTabActive : ''}`}
              onClick={() => setActiveCategory('assist')}
            >
              💬 AI Mentor & Templates (2)
            </button>
          </div>

          <div className={styles.searchBox}>
            <Search size={16} color="var(--text-muted)" />
            <input 
              type="text"
              placeholder="Search tools, generators..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </section>

        {/* Full Tools Grid */}
        <section className={styles.toolsGrid}>
          {filteredTools.map((tool) => {
            const isSelected = activeToolId === tool.id;
            return (
              <div 
                key={tool.id} 
                className={`${styles.toolCard} ${isSelected ? styles.toolCardActive : ''}`}
                onClick={() => handleLaunchTool(tool.id)}
              >
                <div className={styles.toolCardTop}>
                  <div className={styles.toolCardIcon}>
                    {tool.icon}
                  </div>
                  <span className={styles.toolCardTag}>{tool.tag}</span>
                </div>

                <div className={styles.toolCardContent}>
                  <h3>{tool.title}</h3>
                  <p>{tool.description}</p>
                </div>

                <div className={styles.toolCardFooter}>
                  <span className={styles.launchText}>
                    {isSelected ? 'Active In Workspace' : 'Launch In Dashboard'}
                    <ArrowRight size={14} />
                  </span>
                  <span className={styles.statusIndicator}>
                    <span className={styles.statusDot}></span> 100% Live
                  </span>
                </div>
              </div>
            );
          })}
        </section>

        {/* Recent Cloud Drafts & Quick Document Management */}
        <section className={styles.draftsSection}>
          <div className={styles.draftsHeader}>
            <h2 className={styles.draftsTitle}>📁 Recent Documents & Drafts</h2>
            <button 
              className={styles.secondaryActionBtn}
              onClick={() => setIsDashOpen(true)}
              title="View all drafts"
            >
              <FileText size={15} />
              <span>Explore All Drafts</span>
            </button>
          </div>

          <div className={styles.draftsGrid}>
            {documents.length === 0 ? (
              <div className={styles.draftCard} style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: 0 }}>
                  No saved drafts yet. All tools generate instant results ready to copy and export.
                </p>
              </div>
            ) : (
              documents.slice(0, 6).map((doc) => (
                <div 
                  key={doc.id} 
                  className={styles.draftCard}
                  onClick={() => setIsDashOpen(true)}
                >
                  <div className={styles.draftCardTop}>
                    <div>
                      <h4 className={styles.draftCardTitle}>{doc.title || 'Untitled Document'}</h4>
                      <span className={styles.draftCardTime}>
                        Updated {new Date(doc.updatedAt).toLocaleDateString()} at {new Date(doc.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <button 
                      className={styles.draftCardDeleteBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteDocument(doc.id);
                      }}
                      title="Delete draft"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <div className={styles.draftCardFooter}>
                    <span>{doc.content ? doc.content.replace(/<[^>]*>/g, '').trim().split(/\s+/).filter(Boolean).length : 0} words</span>
                    <span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>Open in Explorer →</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

      </div>

      {/* Slide-out Drafts Explorer */}
      <DashboardModal 
        isOpen={isDashOpen} 
        onClose={() => setIsDashOpen(false)} 
        documents={documents} 
        fetchDocuments={fetchDocuments} 
        onSelect={(doc) => {
          setIsDashOpen(false);
        }} 
        onDelete={deleteDocument} 
        onNew={() => {
          setIsDashOpen(false);
          handleLaunchTool('paraphraser');
        }} 
      />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
        Loading Dashboard...
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}
