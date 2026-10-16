'use client';

import React, { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import styles from './sales.module.css';
import { motion, AnimatePresence } from 'framer-motion';

const SALES_TOOLS = [
  { id: 'email-writer', title: 'AI Email Writer', description: 'Generate customized, polished email drafts instantly to engage your prospects.' },
  { id: 'project-proposal', title: 'AI Project Proposal', description: 'Generate persuasive, professional project proposals that win more business.' },
  { id: 'exec-summary', title: 'AI Executive Summary Generator', description: 'Generate clear, concise executive summaries in seconds for busy stakeholders.' },
  { id: 'copywriter', title: 'AI Copywriter', description: 'Get powerful, persuasive marketing copy in seconds to boost your conversions.' },
  { id: 'product-review', title: 'AI Product Review Generator', description: 'Create detailed, engaging product reviews in seconds for any item.' },
  { id: 'case-study', title: 'AI Case Study Generator', description: "Generate detailed case studies quickly with our AI Case Study tool." },
  { id: 'business-plan', title: 'AI Business Plan Generator', description: 'Create a professional business plan in minutes with our AI assistant.' },
  { id: 'slack-message', title: 'AI Slack Message Generator', description: 'Instantly creates professional Slack messages for effective team communication.' },
  { id: 'followup-email', title: 'AI Follow-up Email Generator', description: 'Write professional follow-up emails in seconds to keep the momentum going.' },
  { id: 'ad-copy', title: 'AI Ad copy generator', description: 'Generate high-performing ad copy in seconds to maximize your ad spend.' },
  { id: 'project-charter', title: 'AI Project Charter Generator', description: 'Create professional project charters in seconds to align your team.' },
  { id: 'sales-pitch', title: 'AI Sales Pitch Generator', description: 'Generate impactful sales pitches instantly that resonate with your audience.' },
  { id: 'cold-email', title: 'AI Cold Email Generator', description: 'Write compelling cold emails in seconds to land more meetings.' },
  { id: 'project-brief', title: 'AI Project Brief Generator', description: 'Create clear, concise project briefs in seconds for successful execution.' },
  { id: 'landing-page', title: 'AI Landing page copy generator', description: 'Generate high-converting landing page copy in minutes that sells.' },
  { id: 'marketing-email', title: 'AI Marketing Email Generator', description: 'Craft persuasive marketing emails fast that drive engagement and sales.' },
  { id: 'outreach-email', title: 'AI Outreach Email Generator', description: 'Write effective outreach emails in seconds to build valuable connections.' },
  { id: 'sales-email', title: 'AI Sales Email Generator', description: 'Helps you draft high-impact sales emails tailored to your leads.' },
  { id: 'sales-playbook', title: 'AI Sales Playbook Generator', description: 'Build effective sales strategies fast with our AI Sales Playbook tool.' },
  { id: 'sow-generator', title: 'AI Scope of Work Generator', description: 'Draft professional, detailed SOW documents in minutes for your clients.' },
];

export default function SalesToolsPage() {
  const [search, setSearch] = useState('');

  const filteredTools = useMemo(() => 
    SALES_TOOLS.filter(t => 
      t.title.toLowerCase().includes(search.toLowerCase()) || 
      t.description.toLowerCase().includes(search.toLowerCase())
    ), [search]);

  const handleToolClick = (toolId: string) => {
    // For now, redirecting to the generic editor with a system prompt hint
    window.location.href = `/tools?tool=ai-writer&template=${toolId}`;
  };

  return (
    <div className={styles.container}>
      <Navbar onSignIn={() => {}} />
      
      <main className={styles.content}>
        <section className={styles.hero}>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Sales Intelligence Suite
          </motion.h1>
          <motion.p
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: 0.1 }}
          >
            Empower your sales team with 20+ purpose-built AI tools designed to close deals faster and streamline your outreach workflow.
          </motion.p>
          
          <div className={styles.searchWrapper}>
            <input 
              type="text" 
              placeholder="Search sales tools (e.g., Cold Email, Sales Pitch)..." 
              className={styles.searchInput}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </section>

        <section className={styles.toolsGrid}>
          <AnimatePresence>
            {filteredTools.map((tool, index) => (
              <motion.div 
                layout
                key={tool.id} 
                className={styles.toolCard}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                onClick={() => handleToolClick(tool.id)}
              >
                <h3 className={styles.cardTitle}>{tool.title}</h3>
                <p className={styles.cardDescription}>{tool.description}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </section>
      </main>
    </div>
  );
}
