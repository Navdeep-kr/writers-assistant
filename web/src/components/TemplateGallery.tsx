'use client';

import React, { useState } from 'react';
import styles from './TemplateGallery.module.css';
import GlassButton from './ui/GlassButton';
import api from '@/lib/api';

interface Template {
  id: string;
  title: string;
  description: string;
  icon: string;
  prompts: string[];
  samplePreset: Record<string, string>;
}

const TEMPLATES: Template[] = [
  {
    id: 'cover-letter',
    title: 'Cover Letter',
    description: 'Perfect for job applications.',
    icon: '💼',
    prompts: ['job_title', 'company_name', 'key_skills'],
    samplePreset: {
      job_title: 'Staff Software Engineer',
      company_name: 'Stripe',
      key_skills: 'Distributed microservices, Go, TypeScript, payment resilience'
    }
  },
  {
    id: 'blog-post',
    title: 'Blog Post Outline',
    description: 'Structure your next big idea.',
    icon: '📝',
    prompts: ['topic', 'target_audience'],
    samplePreset: {
      topic: 'The Rise of Edge AI & Local Intelligence in 2026',
      target_audience: 'Full-stack developers and tech leaders'
    }
  },
  {
    id: 'professional-email',
    title: 'Business Email',
    description: 'Formal and concise communications.',
    icon: '📧',
    prompts: ['recipient', 'purpose'],
    samplePreset: {
      recipient: 'VP of Engineering',
      purpose: 'Proposing Q4 architecture migration to Next.js 15 and server actions'
    }
  },
  {
    id: 'creative-story',
    title: 'Short Story',
    description: 'Unleash your creative writing.',
    icon: '✨',
    prompts: ['genre', 'protagonist'],
    samplePreset: {
      genre: 'Cyberpunk Noir Detective',
      protagonist: 'A cynical neon-city investigator whose memory was altered'
    }
  }
];

interface TemplateGalleryProps {
  onGenerate: (content: string) => void;
  visible: boolean;
}

const TemplateGallery: React.FC<TemplateGalleryProps> = ({ onGenerate, visible }) => {
  const [selected, setSelected] = useState<Template | null>(null);
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  if (!visible) return null;

  const handleGenerate = async () => {
    if (!selected) return;
    setLoading(true);
    try {
      const response = await api.post('/ai/template', {
        templateId: selected.id,
        prompts: inputs
      });
      onGenerate(response.data.content);
      setSelected(null);
      setInputs({});
    } catch (err) {
      console.error('Template Generate Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadSample = () => {
    if (selected?.samplePreset) {
      setInputs(selected.samplePreset);
    }
  };

  return (
    <div className={`${styles.gallery} glass fade-in`}>
      <h3 className={styles.title}>Premium Templates</h3>
      
      {!selected ? (
        <div className={styles.grid}>
          {TEMPLATES.map((t) => (
            <div key={t.id} className={`${styles.card} glass-hover`} onClick={() => setSelected(t)}>
              <div className={styles.icon}>{t.icon}</div>
              <h4>{t.title}</h4>
              <p>{t.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.form}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
            <h4 style={{ margin: 0 }}>Generate {selected.title}</h4>
            <button
              type="button"
              onClick={handleLoadSample}
              style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--accent-blue)',
                color: 'var(--accent-blue)',
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              ✨ Try Sample Data
            </button>
          </div>
          {selected.prompts.map((p) => (
            <div key={p} className={styles.inputGroup}>
              <label>{p.replace('_', ' ')}</label>
              <input 
                type="text" 
                placeholder={`Enter ${p}...`} 
                value={inputs[p] || ''} 
                onChange={(e) => setInputs({ ...inputs, [p]: e.target.value })} 
                className="glass"
              />
            </div>
          ))}
          <div className={styles.actions}>
            <GlassButton variant="secondary" onClick={() => setSelected(null)}>Back</GlassButton>
            <GlassButton variant="primary" onClick={handleGenerate} disabled={loading} glow>
              {loading ? 'Crafting...' : 'Generate with AI'}
            </GlassButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateGallery;
