'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Check, Sparkles, RefreshCw, FileText, 
  CheckCircle2, ArrowRight, Copy, Wand2, ShieldCheck, AlertCircle 
} from 'lucide-react';
import styles from './AssistantPanel.module.css';

interface AssistantPanelProps {
  suggestions: any[];
  score: number;
  selectedText: string;
  fullText: string;
  onApplyFix?: (suggestion: any) => void;
  onDismissFix?: (index: number) => void;
  onApplyText?: (text: string) => void;
  onClose?: () => void;
  ai: any;
}

const AssistantPanel: React.FC<AssistantPanelProps> = ({
  suggestions = [],
  score = 98,
  selectedText = '',
  fullText = '',
  onApplyFix,
  onDismissFix,
  onApplyText,
  onClose,
  ai
}) => {
  const [activeTab, setActiveTab] = useState<'fix' | 'rephrase' | 'summarize'>('fix');
  
  // Rephrase State
  const [selectedTone, setSelectedTone] = useState('Clear');
  const [rephraseLoading, setRephraseLoading] = useState(false);
  const [rephraseResult, setRephraseResult] = useState('');
  const [copied, setCopied] = useState(false);

  // Summarize State
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summaryResult, setSummaryResult] = useState('');

  const tones = [
    { id: 'Clear', label: 'Clear & Concise', icon: '💡' },
    { id: 'Professional', label: 'Professional', icon: '👔' },
    { id: 'Casual', label: 'Casual & Warm', icon: '💬' },
    { id: 'Academic', label: 'Academic & Formal', icon: '🎓' },
  ];

  const handleRephrase = async () => {
    const textToProcess = selectedText.trim() || fullText.trim();
    if (!textToProcess) return;

    setRephraseLoading(true);
    setRephraseResult('');
    try {
      const res = await ai.paraphrase(textToProcess, selectedTone);
      const extracted = res?.result?.rewrittenText || res?.rewrittenText || res?.result || res;
      setRephraseResult(typeof extracted === 'string' ? extracted : JSON.stringify(extracted));
    } catch (err) {
      console.error('Rephrase error:', err);
    } finally {
      setRephraseLoading(false);
    }
  };

  const handleSummarize = async () => {
    const textToProcess = fullText.trim() || selectedText.trim();
    if (!textToProcess) return;

    setSummaryLoading(true);
    setSummaryResult('');
    try {
      const res = await ai.summarize(textToProcess, 'medium');
      const extracted = res?.result || res?.summary || res;
      setSummaryResult(typeof extracted === 'string' ? extracted : JSON.stringify(extracted));
    } catch (err) {
      console.error('Summarize error:', err);
    } finally {
      setSummaryLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <aside className={styles.panelContainer}>
      {/* Panel Header */}
      <div className={styles.header}>
        <div className={styles.headerTitleGroup}>
          <div className={styles.headerIconWrapper}>
            <Sparkles size={16} />
          </div>
          <div>
            <h3 className={styles.headerTitle}>Assistant</h3>
            <span className={styles.headerSubtitle}>
              {score >= 90 ? 'High Clarity' : score >= 70 ? 'Good Draft' : 'Needs Review'}
            </span>
          </div>
        </div>

        <div className={styles.headerRight}>
          <div className={styles.scorePill}>
            <span className={styles.scoreNumber}>{score}</span>
            <span className={styles.scoreUnit}>/100</span>
          </div>
          {onClose && (
            <button 
              className={styles.closeBtn} 
              onClick={onClose}
              aria-label="Close assistant panel"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabBar}>
        <button
          className={`${styles.tabBtn} ${activeTab === 'fix' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('fix')}
        >
          <ShieldCheck size={14} />
          <span>Fix</span>
          {suggestions.length > 0 && (
            <span className={styles.badgeCount}>{suggestions.length}</span>
          )}
        </button>
        <button
          className={`${styles.tabBtn} ${activeTab === 'rephrase' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('rephrase')}
        >
          <Wand2 size={14} />
          <span>Rephrase</span>
        </button>
        <button
          className={`${styles.tabBtn} ${activeTab === 'summarize' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('summarize')}
        >
          <FileText size={14} />
          <span>Summarize</span>
        </button>
      </div>

      {/* Tab Content */}
      <div className={styles.tabBody}>
        {/* TAB 1: FIX */}
        {activeTab === 'fix' && (
          <div className={styles.tabContent}>
            {suggestions.length === 0 ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>
                  <CheckCircle2 size={32} />
                </div>
                <h4>Everything looks great!</h4>
                <p>No grammar, spelling, or clarity errors detected in your draft.</p>
              </div>
            ) : (
              <div className={styles.suggestionsList}>
                <div className={styles.listHeader}>
                  <span>{suggestions.length} issue{suggestions.length > 1 ? 's' : ''} found</span>
                </div>
                {suggestions.map((item, idx) => {
                  const replacement = item.replacements?.[0]?.value || item.replacement || '';
                  return (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={styles.suggestionCard}
                    >
                      <div className={styles.cardHeader}>
                        <span className={styles.ruleBadge}>
                          {item.rule?.category?.name || 'Grammar'}
                        </span>
                        {onDismissFix && (
                          <button 
                            className={styles.dismissBtn}
                            onClick={() => onDismissFix(idx)}
                            title="Dismiss issue"
                          >
                            <X size={13} />
                          </button>
                        )}
                      </div>
                      
                      <p className={styles.issueMessage}>{item.message}</p>

                      {replacement && (
                        <div className={styles.fixActionArea}>
                          <button 
                            className={styles.acceptFixBtn}
                            onClick={() => onApplyFix && onApplyFix(item)}
                          >
                            <Check size={14} />
                            <span>Change to <b>"{replacement}"</b></span>
                          </button>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: REPHRASE */}
        {activeTab === 'rephrase' && (
          <div className={styles.tabContent}>
            <div className={styles.scopeNotice}>
              {selectedText.trim() ? (
                <span>Rephrasing <b>selected text</b> ({selectedText.trim().split(/\s+/).length} words)</span>
              ) : (
                <span>Rephrasing <b>entire document</b></span>
              )}
            </div>

            <div className={styles.toneGrid}>
              {tones.map((t) => (
                <button
                  key={t.id}
                  className={`${styles.toneBtn} ${selectedTone === t.id ? styles.activeTone : ''}`}
                  onClick={() => setSelectedTone(t.id)}
                >
                  <span className={styles.toneIcon}>{t.icon}</span>
                  <span className={styles.toneLabel}>{t.label}</span>
                </button>
              ))}
            </div>

            <button
              className={styles.runActionBtn}
              onClick={handleRephrase}
              disabled={rephraseLoading || (!selectedText.trim() && !fullText.trim())}
            >
              {rephraseLoading ? (
                <>
                  <RefreshCw size={14} className={styles.spinIcon} />
                  <span>Rewriting...</span>
                </>
              ) : (
                <>
                  <Wand2 size={14} />
                  <span>Rewrite in {selectedTone} tone</span>
                </>
              )}
            </button>

            {rephraseResult && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={styles.resultBox}
              >
                <div className={styles.resultHeader}>
                  <span className={styles.resultLabel}>Suggestion</span>
                  <div className={styles.resultActions}>
                    <button 
                      className={styles.iconBtn} 
                      onClick={() => copyToClipboard(rephraseResult)}
                      title="Copy to clipboard"
                    >
                      {copied ? <Check size={13} /> : <Copy size={13} />}
                    </button>
                  </div>
                </div>
                <p className={styles.resultText}>{rephraseResult}</p>
                {onApplyText && (
                  <button 
                    className={styles.replaceDocBtn}
                    onClick={() => onApplyText(rephraseResult)}
                  >
                    <span>Insert into Document</span>
                    <ArrowRight size={14} />
                  </button>
                )}
              </motion.div>
            )}
          </div>
        )}

        {/* TAB 3: SUMMARIZE */}
        {activeTab === 'summarize' && (
          <div className={styles.tabContent}>
            <p className={styles.helperText}>
              Condense your document into essential takeaways.
            </p>

            <button
              className={styles.runActionBtn}
              onClick={handleSummarize}
              disabled={summaryLoading || !fullText.trim()}
            >
              {summaryLoading ? (
                <>
                  <RefreshCw size={14} className={styles.spinIcon} />
                  <span>Summarizing...</span>
                </>
              ) : (
                <>
                  <FileText size={14} />
                  <span>Generate Summary</span>
                </>
              )}
            </button>

            {summaryResult && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={styles.resultBox}
              >
                <div className={styles.resultHeader}>
                  <span className={styles.resultLabel}>Executive Summary</span>
                  <button 
                    className={styles.iconBtn} 
                    onClick={() => copyToClipboard(summaryResult)}
                    title="Copy to clipboard"
                  >
                    {copied ? <Check size={13} /> : <Copy size={13} />}
                  </button>
                </div>
                <div className={styles.resultText}>{summaryResult}</div>
                {onApplyText && (
                  <button 
                    className={styles.replaceDocBtn}
                    onClick={() => onApplyText(`\n\n---\n**Summary:**\n${summaryResult}`)}
                  >
                    <span>Append to Draft</span>
                    <ArrowRight size={14} />
                  </button>
                )}
              </motion.div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
};

export default AssistantPanel;
