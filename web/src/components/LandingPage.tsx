'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  CheckCircle, Zap, Shield, Globe, Target, Layout, Edit3, 
  MessageSquare, UserCheck, Flame, Medal, Sliders, ChevronRight,
  Sparkles, FileText, Briefcase, Mail, Share2, Award, BookOpen
} from 'lucide-react';
import styles from './LandingPage.module.css';
import GlassButton from './ui/GlassButton';

interface LandingPageProps {
  onStart?: () => void;
  onLogin?: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart, onLogin }) => {
  const router = useRouter();

  const handleGoToDashboard = (toolId?: string) => {
    if (toolId) {
      router.push(`/dashboard?tool=${toolId}`);
    } else {
      router.push('/dashboard');
    }
  };

  const [demoText, setDemoText] = useState('');
  const fullDemoText = "The quick brown fox jumps over the lazy dog. Writing well is hard, but AI makes it effortless.";
  const [demoMode, setDemoMode] = useState('Professional');

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDemoText(fullDemoText.substring(0, index));
      index++;
      if (index > fullDemoText.length) clearInterval(interval);
    }, 45);
    return () => clearInterval(interval);
  }, []);

  const mockRewrites: Record<string, string> = {
    'Professional': 'A swift auburn fox leaps over the inactive canine. Effective communication poses challenges, yet artificial intelligence streamlines the process seamlessly.',
    'Creative': 'Like a russet flash of lightning, the fox bound over the sleeping hound. Weaving words is an art, but with a touch of AI magic, your prose will sing.',
    'Shorten': 'The fox jumped the dog. Writing is hard, but AI helps.',
    'Formal': 'The agile brown fox vaults over the lethargic dog. Composing high-quality text presents difficulties; however, AI facilitates an effortless composition process.'
  };

  return (
    <div className={styles.landingContainer}>
      <div className={styles.blob1}></div>
      <div className={styles.blob2}></div>

      {/* 1. HERO SECTION */}
      <section className={styles.hero}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={styles.heroContent}
        >
          <div className={styles.badge}><Zap size={14} /> Trusted by 2,500,000+ writers worldwide</div>
          <h1 className={styles.title}>
            Write with <span style={{ background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-blue))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Brilliance.</span><br />
            Instantly.
          </h1>
          <p className={styles.subtitle}>
            Your all-in-one AI writing command center. Overcome writer's block, perfect your tone, and run 14 specialized writing tools from one unified dashboard.
          </p>
          <div className={styles.ctaGroup}>
            <GlassButton variant="primary" size="lg" onClick={() => handleGoToDashboard()} glow>
              Launch Dashboard Free
            </GlassButton>
            <GlassButton variant="ghost" size="lg" onClick={() => handleGoToDashboard('paraphraser')}>
              Try Paraphraser <ChevronRight size={18} />
            </GlassButton>
          </div>
        </motion.div>

        {/* Hero Interactive Typing Demo */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className={styles.heroDemoWrapper}
        >
          <div className={styles.mockWindow}>
            <div className={styles.windowHeader}>
              <div className={styles.dot}></div><div className={styles.dot}></div><div className={styles.dot}></div>
            </div>
            <div className={styles.demoInput}>
              {demoText}<span className={styles.cursor}>|</span>
              {demoText.length === fullDemoText.length && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginTop: '20px', fontSize: '1rem', color: '#10b981' }}>
                  <Zap size={16} style={{ display: 'inline', marginRight: '8px' }} />
                  AI Suggestion: <span className={styles.demoHighlight}>Crafting exceptional prose poses challenges, yet artificial intelligence renders it effortless.</span>
                  <div style={{ marginTop: '16px' }}>
                    <button 
                      onClick={() => handleGoToDashboard('paraphraser')}
                      style={{
                        background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-blue))',
                        color: '#030304',
                        border: 'none',
                        padding: '6px 16px',
                        borderRadius: '8px',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        cursor: 'pointer'
                      }}
                    >
                      Open in Dashboard Paraphraser →
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </section>

      {/* 2. TRUST & SOCIAL PROOF */}
      <section className={styles.socialProof}>
        <div className={styles.proofText}>4.9★ rating from active professionals, students, and authors</div>
        <div className={styles.logoGrid}>
          <div className={styles.logo}>Stanford</div>
          <div className={styles.logo}>Google</div>
          <div className={styles.logo}>MIT</div>
          <div className={styles.logo}>Forbes</div>
          <div className={styles.logo}>Medium</div>
        </div>
      </section>

      {/* 3. CORE FEATURES GRID (ALL TOOLS DIRECTLY CLICKABLE) */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Click Any Tool to Launch Directly in the Dashboard</h2>
        <p className={styles.sectionSubtitle}>
          From instant paraphrasing to AI humanizing, resume building, and plagiarism scans, select any tool below to launch it immediately in your dashboard.
        </p>
        <div className={styles.featuresGrid}>
          <FeatureCard 
            icon={<Target className={styles.featureIconBlue} size={30} />} 
            title="AI Paraphraser" 
            description="Find the perfect words, every single time. Dial in your exact tone with zero robotic artifacts."
            toolId="paraphraser"
            tag="POPULAR"
            onClick={handleGoToDashboard}
          />
          <FeatureCard 
            icon={<Shield className={styles.featureIconPurple} size={30} />} 
            title="Grammar & Spell Engine" 
            description="Flawless mechanics without losing your voice. Fix syntax, subject-verb agreement, and style."
            toolId="grammar"
            tag="ESSENTIAL"
            onClick={handleGoToDashboard}
          />
          <FeatureCard 
            icon={<Zap className={styles.featureIconCyan} size={30} />} 
            title="AI Humanizer" 
            description="Convert machine-written text into fluid, natural, human-sounding prose that bypasses detectors."
            toolId="humanizer"
            tag="PRO"
            onClick={handleGoToDashboard}
          />
          <FeatureCard 
            icon={<Edit3 className={styles.featureIconBlue} size={30} />} 
            title="Smart Summarizer" 
            description="Compress hours of reading into seconds with adjustable depth and bullet point controls."
            toolId="summarizer"
            tag="EFFICIENCY"
            onClick={handleGoToDashboard}
          />
          <FeatureCard 
            icon={<Globe className={styles.featureIconPurple} size={30} />} 
            title="AI Content Detector" 
            description="Inspect perplexity, burstiness, and machine patterns to verify true human authorship."
            toolId="ai-detector"
            tag="ACCURACY"
            onClick={handleGoToDashboard}
          />
          <FeatureCard 
            icon={<FileText className={styles.featureIconCyan} size={30} />} 
            title="Plagiarism Checker" 
            description="Scan content against billions of indexed web pages and academic databases."
            toolId="plagiarism"
            tag="SECURITY"
            onClick={handleGoToDashboard}
          />
          <FeatureCard 
            icon={<Briefcase className={styles.featureIconBlue} size={30} />} 
            title="Resume Builder" 
            description="Craft high-impact, ATS-optimized resumes that highlight measurable achievements."
            toolId="resume"
            tag="CAREER"
            onClick={handleGoToDashboard}
          />
          <FeatureCard 
            icon={<Mail className={styles.featureIconPurple} size={30} />} 
            title="Cover Letter Generator" 
            description="Generate tailored, high-converting cover letters matching exact job listings."
            toolId="cover-letter"
            tag="CAREER"
            onClick={handleGoToDashboard}
          />
          <FeatureCard 
            icon={<Share2 className={styles.featureIconCyan} size={30} />} 
            title="Social Media Writer" 
            description="Create viral-ready posts for LinkedIn, X (Twitter), and Instagram with image prompts."
            toolId="social-media"
            tag="CREATOR"
            onClick={handleGoToDashboard}
          />
          <FeatureCard 
            icon={<MessageSquare className={styles.featureIconBlue} size={30} />} 
            title="AI Writing Mentor" 
            description="Your 24/7 brainstorming partner for drafting, structure critique, and creative flow."
            toolId="ai-chat"
            tag="INTERACTIVE"
            onClick={handleGoToDashboard}
          />
          <FeatureCard 
            icon={<Globe className={styles.featureIconPurple} size={30} />} 
            title="Multilingual Translator" 
            description="Translate across 50+ languages with high contextual nuance and natural cadence."
            toolId="translator"
            tag="GLOBAL"
            onClick={handleGoToDashboard}
          />
          <FeatureCard 
            icon={<BookOpen className={styles.featureIconCyan} size={30} />} 
            title="Academic Co-Writer" 
            description="Draft scholarly research papers, literature reviews, and citations effortlessly."
            toolId="academic-cowriter"
            tag="SCHOLARLY"
            onClick={handleGoToDashboard}
          />
        </div>
      </section>

      {/* 4. INTERACTIVE DEMO (SPLIT SCREEN) */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>AI that works WITH you, not instead of you</h2>
        <p className={styles.sectionSubtitle}>Watch how our multi-provider intelligence enhances your voice in real time.</p>
        
        <div className={styles.splitDemo}>
          <div className={styles.demoPane}>
            <div className={styles.demoPaneHeader}>Original Draft</div>
            <div className={styles.demoText} style={{ opacity: 0.7 }}>
              {fullDemoText}
            </div>
          </div>
          <div className={styles.demoDivider}></div>
          <div className={styles.demoPane}>
            <div className={styles.demoPaneHeader}>
              <span>AI Rewrite</span>
              <div className={styles.demoModes}>
                {['Professional', 'Creative', 'Shorten', 'Formal'].map(m => (
                  <button 
                    key={m} 
                    className={`${styles.demoModeBtn} ${demoMode === m ? styles.demoModeActive : ''}`}
                    onClick={() => setDemoMode(m)}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
            <motion.div 
              key={demoMode}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={styles.demoText}
            >
              <span className={styles.demoHighlight}>{mockRewrites[demoMode]}</span>
            </motion.div>
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
              <GlassButton variant="primary" size="sm" onClick={() => handleGoToDashboard('paraphraser')}>
                Open in Dashboard Paraphraser →
              </GlassButton>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PRICING PREVIEW */}
      <section className={styles.section}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <span style={{
            fontSize: '0.8rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--accent-cyan)',
            padding: '4px 14px',
            borderRadius: '99px',
            background: 'rgba(34, 211, 238, 0.1)',
            border: '1px solid rgba(34, 211, 238, 0.25)'
          }}>
            Transparent Plans
          </span>
        </div>
        <h2 className={styles.sectionTitle}>Simple, Transparent Access</h2>
        <p className={styles.subtitle} style={{ marginBottom: '48px' }}>
          Start free forever or unlock unlimited AI processing, ATS resume templates, and multi-user live collaboration.
        </p>

        <div className={styles.pricingGrid}>
          {/* FREE PLAN */}
          <div className={styles.priceCard}>
            <div className={styles.starterBadge}>Starter • 100% Free</div>
            <h3 style={{ fontSize: '1.6rem', color: 'var(--text-primary)', marginTop: '8px' }}>Hobbyist</h3>
            <div className={styles.price}>$0<span>/mo</span></div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Ideal for students, casual drafting, and quick editing.</p>
            <ul className={styles.priceList}>
              <li><CheckCircle size={18} className={styles.priceIcon}/> All 14 Core AI Writing Tools</li>
              <li><CheckCircle size={18} className={styles.priceIcon}/> 1,500 words per day limit</li>
              <li><CheckCircle size={18} className={styles.priceIcon}/> Standard Paraphrasing & Grammar Check</li>
              <li><CheckCircle size={18} className={styles.priceIcon}/> Offline Local AI Fail-safe Engine</li>
              <li><CheckCircle size={18} className={styles.priceIcon}/> Clipboard Copy & Plain Text Export</li>
            </ul>
            <GlassButton variant="ghost" onClick={() => handleGoToDashboard()} style={{ width: '100%' }}>
              Get Started Free
            </GlassButton>
          </div>

          {/* PRO PLAN - FEATURED */}
          <div className={`${styles.priceCard} ${styles.pricePro}`}>
            <div className={styles.popularBadge}>🔥 Most Popular • Recommended</div>
            <div className={styles.teamBadge} style={{ background: 'rgba(34, 211, 238, 0.15)', color: 'var(--accent-cyan)', borderColor: 'rgba(34, 211, 238, 0.3)' }}>
              Pro Unlimited
            </div>
            <h3 style={{ fontSize: '1.6rem', color: 'var(--text-primary)', marginTop: '8px' }}>Pro Writer</h3>
            <div className={styles.price} style={{ color: 'var(--accent-cyan)' }}>$9.99<span>/mo</span></div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Full horsepower for serious authors, creators, and researchers.</p>
            <ul className={styles.priceList}>
              <li><CheckCircle size={18} style={{ color: 'var(--accent-cyan)' }}/> <strong>Unlimited Words & Processing</strong></li>
              <li><CheckCircle size={18} style={{ color: 'var(--accent-cyan)' }}/> <strong>8+ Advanced Paraphrase & Tone Modes</strong></li>
              <li><CheckCircle size={18} style={{ color: 'var(--accent-cyan)' }}/> <strong>ATS Resume Builder & Designer Templates</strong></li>
              <li><CheckCircle size={18} style={{ color: 'var(--accent-cyan)' }}/> <strong>Full AI Origin & Plagiarism Detector</strong></li>
              <li><CheckCircle size={18} style={{ color: 'var(--accent-cyan)' }}/> <strong>Real-Time Cloud Sync & Auto-Drafts</strong></li>
              <li><CheckCircle size={18} style={{ color: 'var(--accent-cyan)' }}/> <strong>PDF, Word (.docx) & Markdown Export</strong></li>
            </ul>
            <GlassButton variant="primary" onClick={() => router.push('/pricing')} style={{ width: '100%' }} glow>
              Upgrade to Pro Writer →
            </GlassButton>
          </div>

          {/* TEAM PLAN */}
          <div className={styles.priceCard}>
            <div className={styles.teamBadge}>Teams & Agencies</div>
            <h3 style={{ fontSize: '1.6rem', color: 'var(--text-primary)', marginTop: '8px' }}>Team Studio</h3>
            <div className={styles.price}>$29<span>/mo</span></div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Collaborative command center for editorial & agency teams.</p>
            <ul className={styles.priceList}>
              <li><CheckCircle size={18} className={styles.priceIcon}/> Everything in Pro Writer included</li>
              <li><CheckCircle size={18} className={styles.priceIcon}/> 5 Team Seats & Shared Workspaces</li>
              <li><CheckCircle size={18} className={styles.priceIcon}/> Multi-User Real-Time Co-Editing & Cursors</li>
              <li><CheckCircle size={18} className={styles.priceIcon}/> Custom Brand Tone & Editorial Guidelines</li>
              <li><CheckCircle size={18} className={styles.priceIcon}/> Centralized Team Billing & Member Roles</li>
              <li><CheckCircle size={18} className={styles.priceIcon}/> Priority 24/7 Dedicated Concierge Support</li>
            </ul>
            <GlassButton variant="ghost" onClick={() => router.push('/pricing')} style={{ width: '100%' }}>
              Start Team Plan →
            </GlassButton>
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA */}
      <section className={styles.section}>
        <div className={styles.finalCta}>
          <h2>Ready to elevate your writing?</h2>
          <p>Access all tools instantly from your unified command center.</p>
          <GlassButton 
            variant="primary" 
            size="lg" 
            onClick={() => handleGoToDashboard()} 
            style={{ background: '#fff', color: '#000', border: 'none' }}
          >
            Open Dashboard Free
          </GlassButton>
        </div>
      </section>

    </div>
  );
};

const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  toolId, 
  tag,
  onClick 
}: { 
  icon: React.ReactNode, 
  title: string, 
  description: string, 
  toolId: string,
  tag?: string,
  onClick: (toolId: string) => void 
}) => (
  <div 
    className={styles.featureCard}
    onClick={() => onClick(toolId)}
    style={{ cursor: 'pointer' }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
      <div className={styles.featureIcon}>{icon}</div>
      <span style={{
        fontSize: '0.72rem',
        fontWeight: 700,
        padding: '3px 10px',
        borderRadius: '99px',
        background: 'rgba(34, 211, 238, 0.12)',
        color: 'var(--accent-cyan)',
        border: '1px solid rgba(34, 211, 238, 0.25)',
        textTransform: 'uppercase'
      }}>
        {tag || '100% LIVE'}
      </span>
    </div>
    <h3>{title}</h3>
    <p>{description}</p>
    <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-cyan)', fontSize: '0.88rem', fontWeight: 700 }}>
      <span>Launch in Dashboard</span>
      <ChevronRight size={16} />
    </div>
  </div>
);

export default LandingPage;
