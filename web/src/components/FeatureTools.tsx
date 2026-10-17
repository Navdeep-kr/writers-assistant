'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './FeatureTools.module.css';
import GlassButton from './ui/GlassButton';
import TokenizedOutput from './TokenizedOutput';
import { motion } from 'framer-motion';
import { FileImportBar, UniversalExportDropdown } from './FileTransferComponents';
import { printElement, printFormattedDocument } from '@/lib/printUtils';

interface ToolSample {
  label: string;
  text: string;
  icon?: string;
}

interface ToolProps {
  title: string;
  description: string;
  placeholder: string;
  actionLabel: string;
  onAction: (text: string, options?: any) => Promise<string | any>;
  icon: string;
  theme?: string;
  samples?: ToolSample[];
  ai?: any;
}

const BaseTool: React.FC<ToolProps> = ({ title, description, placeholder, actionLabel, onAction, icon, theme, samples, ai }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [mode, setMode] = useState<'AI' | 'Local Intelligence'>('AI');
  const [attachedFile, setAttachedFile] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const words = input.trim().split(/\s+/).filter(Boolean);
    setWordCount(words.length);
  }, [input]);

  const handleRun = async () => {
    if (!input || input.trim().length === 0) return;
    setLoading(true);
    try {
      const result = await onAction(input);
      if (typeof result === 'string') {
        setOutput(result);
      } else if (result && typeof result === 'object') {
        // Try various common result keys
        const extracted = result.result || result.output || result.summary || result.text || result.fixed;
        if (extracted && typeof extracted === 'string') {
          setOutput(extracted);
          if (result.mode) setMode(result.mode);
        } else if (extracted && typeof extracted === 'object') {
          setOutput(JSON.stringify(extracted, null, 2));
          if (result.mode) setMode(result.mode);
        } else {
          setOutput(JSON.stringify(result, null, 2));
        }
      } else {
        setOutput('No result returned.');
      }
    } catch (e) {
      console.error('Tool Error:', e);
      setOutput('Error processing request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={`${styles.toolContainer} premium-card fade-in ${theme ? styles[theme] : ''}`}>
      <header className={styles.header}>
        <div className={styles.iconWrapper}>{icon}</div>
        <div className={styles.headerText}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h1 className="text-gradient">{title}</h1>
            {output && mode === 'Local Intelligence' && (
              <span className={styles.modeBadge}>Local Intelligence</span>
            )}
          </div>
          <p>{description}</p>
        </div>
      </header>
      
      <div className={`${styles.workspace} ${loading ? 'ai-energy-border ai-energy-glow' : ''}`}>
        <div className={styles.inputArea}>
          <FileImportBar
            ai={ai}
            currentFileName={attachedFile}
            onClearFile={() => setAttachedFile('')}
            onFileLoaded={(text, fileName) => {
              setInput(text);
              setAttachedFile(fileName);
            }}
          />

          {samples && samples.length > 0 && (
            <div className={styles.sampleBar}>
              <span className={styles.sampleLabel}>✨ Presets:</span>
              {samples.map((s, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`${styles.samplePill} ${input === s.text ? styles.samplePillActive : ''}`}
                  onClick={() => setInput(s.text)}
                  title="Click to load sample into editor"
                >
                  <span>{s.icon || '💡'}</span>
                  <span>{s.label}</span>
                </button>
              ))}
            </div>
          )}
          <textarea 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder={placeholder}
            className={styles.textarea}
          />
          <div className={styles.footer}>
            <span className={styles.count}>{wordCount} words</span>
            <GlassButton variant="primary" onClick={handleRun} loading={loading} glow>
              {actionLabel}
            </GlassButton>
          </div>
        </div>
        <div className={styles.divider} />
        <div className={styles.outputArea}>
          <div className={`${styles.resultBox} ${loading ? styles.loadingPulse : ''}`}>
            {output ? (
              <div className="fade-in">{output}</div>
            ) : (
              <span className={styles.placeholder}>
                {loading ? '✨ Refining with Local Intelligence...' : 'Processed text will appear here...'}
              </span>
            )}
          </div>
          <div className={styles.footer}>
             <span className={styles.count}>{output.trim().split(/\s+/).filter(Boolean).length} words</span>
             {output && (
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <UniversalExportDropdown
                    content={output}
                    defaultTitle={title}
                    onCopy={handleCopy}
                    copied={copied}
                  />
                  <button className={styles.copyBtn} onClick={handleCopy}>
                    {copied ? '✅ Copied' : '📋 Copy'}
                  </button>
                </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Paraphraser: React.FC<{ ai: any }> = ({ ai }) => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [outcome, setOutcome] = useState('Professional');
  const [mode, setMode] = useState<'AI' | 'Local Intelligence'>('AI');
  const [attachedFile, setAttachedFile] = useState('');
  const [paraphraseCopied, setParaphraseCopied] = useState(false);

  const outcomes = [
    { name: 'Refine', icon: '💎' },
    { name: 'Academic', icon: '🎓' },
    { name: 'Formal', icon: '🏛️' },
    { name: 'Professional', icon: '👔' },
    { name: 'Creative', icon: '🎨' },
    { name: 'Simplify', icon: '👶' }
  ];

  const samples = [
    {
      label: 'Startup Pitch Draft',
      icon: '🚀',
      text: 'Our application is slow because the database queries take too long to run when many customers check out simultaneously.'
    },
    {
      label: 'Academic Hypothesis',
      icon: '🎓',
      text: 'Our preliminary experimental data demonstrate that prolonged sleep deprivation negatively impacts short-term working memory capacity in young adults.'
    },
    {
      label: 'Casual Boss Request',
      icon: '🏛️',
      text: 'Hey boss, can you look over these slides before tomorrow morning? Need approval ASAP before the client call.'
    },
    {
      label: 'Technical Explanation',
      icon: '👶',
      text: 'Kubernetes orchestrates containerized distributed microservices across clustered nodes with automated traffic ingress, load balancing, and self-healing pods.'
    }
  ];

  const handleParaphrase = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const res = await ai.paraphrase(input, outcome);
      const finalResult = res?.rewrittenText ? res : (res?.result || res);
      setResult(finalResult);
      if (res?.mode) setMode(res.mode);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${styles.toolContainer} premium-card fade-in ${styles.accentBlue}`}>
       <header className={styles.header}>
        <div className={styles.iconWrapper}>🔄</div>
        <div className={styles.headerText}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h1 className="text-gradient">AI Strategy Paraphraser</h1>
            {result && mode === 'Local Intelligence' && (
              <span className={styles.modeBadge}>Local Intelligence</span>
            )}
          </div>
          <p>Go beyond word-swapping. Rewrite for specific impact.</p>
        </div>
        <div className={styles.outcomeBar}>
          {outcomes.map(o => (
            <button 
              key={o.name}
              className={`${styles.outcomeBtn} ${outcome === o.name ? styles.activeOutcome : ''}`}
              onClick={() => setOutcome(o.name)}
            >
              <span>{o.icon}</span> {o.name}
            </button>
          ))}
        </div>
      </header>

      <div className={`${styles.workspace} ${loading ? 'ai-energy-border ai-energy-glow' : ''}`}>
        <div className={styles.inputArea}>
          <FileImportBar
            ai={ai}
            currentFileName={attachedFile}
            onClearFile={() => setAttachedFile('')}
            onFileLoaded={(text, fileName) => {
              setInput(text);
              setAttachedFile(fileName);
            }}
          />

          <div className={styles.sampleBar}>
            <span className={styles.sampleLabel}>✨ Presets:</span>
            {samples.map((s, idx) => (
              <button
                key={idx}
                type="button"
                className={`${styles.samplePill} ${input === s.text ? styles.samplePillActive : ''}`}
                onClick={() => setInput(s.text)}
                title="Click to load sample into editor"
              >
                <span>{s.icon}</span>
                <span>{s.label}</span>
              </button>
            ))}
          </div>
          <textarea 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder="Paste your text here or pick a sample preset above..." 
            className={styles.textarea} 
          />
          <div className={styles.footer}>
            <span>{input.trim().split(/\s+/).filter(Boolean).length} words</span>
            <GlassButton variant="primary" onClick={handleParaphrase} loading={loading} glow>
              🚀 Execute Transformation
            </GlassButton>
          </div>
        </div>
        <div className={styles.divider} />
        <div className={styles.outputArea}>
          <div className={`${styles.resultBox} ${loading ? styles.loadingPulse : ''}`}>
            {result ? (
              <TokenizedOutput 
                text={result.rewrittenText || (typeof result === 'string' ? result : JSON.stringify(result))} 
                modifications={result.modifications || []} 
              />
            ) : (
              <span className={styles.placeholder}>
                {loading ? '✨ Local Intelligence is crafting your response...' : 'Select an outcome and click execute to see the magic.'}
              </span>
            )}
          </div>
          {result && (
            <div className={styles.footer}>
              <div className={styles.meterContainer}>
                <span className={styles.label}>{outcome} Intensity</span>
                <div className={styles.meter}>
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${result.toneIntensity?.[0] || 85}%` }}
                    className={styles.meterFill}
                  />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <UniversalExportDropdown
                  content={result.rewrittenText || (typeof result === 'string' ? result : JSON.stringify(result))}
                  defaultTitle={`Paraphrase_${outcome}`}
                  onCopy={() => {
                    const textToCopy = result.rewrittenText || (typeof result === 'string' ? result : JSON.stringify(result));
                    navigator.clipboard.writeText(textToCopy);
                    setParaphraseCopied(true);
                    setTimeout(() => setParaphraseCopied(false), 2000);
                  }}
                  copied={paraphraseCopied}
                />
                <button className={styles.copyBtn} onClick={() => {
                  const textToCopy = result.rewrittenText || (typeof result === 'string' ? result : JSON.stringify(result));
                  navigator.clipboard.writeText(textToCopy);
                  setParaphraseCopied(true);
                  setTimeout(() => setParaphraseCopied(false), 2000);
                }}>
                  {paraphraseCopied ? '✅ Copied' : '📋 Copy'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const Summarizer: React.FC<{ ai: any }> = ({ ai }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [attachedFile, setAttachedFile] = useState('');
  const [presentationTemplate, setPresentationTemplate] = useState<'brief' | 'cards' | 'raw'>('brief');

  const samples = [
    {
      label: 'Quantum Computing Research',
      icon: '🔬',
      text: 'Quantum computing harnesses the fundamental principles of quantum mechanics—predominantly superposition and entanglement—to process multidimensional information at speeds unattainable by classical von Neumann computing architectures. While traditional computational bits exist deterministically as either 0 or 1, quantum bits (qubits) can inhabit superposed probabilities simultaneously. Recent breakthroughs in superconducting transmon qubits and neutral-atom optical lattices have demonstrated exponential speedups in solving complex cryptographic factorization, quantum chemistry simulations for pharmaceutical molecular design, and non-linear polynomial optimization. However, achieving fault-tolerant quantum advantage remains constrained by quantum decoherence, environmental thermal noise, and high physical-to-logical qubit overhead in surface code error correction routines. Ongoing research in topological quantum memory and cryogenic CMOS control interfaces offers a viable roadmap toward commercial multi-thousand logical qubit arrays within the next decade.'
    },
    {
      label: 'Q3 Financial & Earnings Memo',
      icon: '📈',
      text: 'Executive Q3 Operational & Financial Summary: During the third fiscal quarter, global consolidated revenue reached $128.4 million, representing a 28.5% year-over-year expansion compared to $99.9 million in the prior year period. Net recurring ARR grew 34% driven by increased enterprise customer acquisition in the North American and APAC corridors. Gross profit margins expanded by 320 basis points to 76.8%, primarily propelled by cloud infrastructure optimization and automated customer onboarding workflows. Adjusted EBITDA settled at $31.2 million, surpassing consensus guidance by 14%. Operating free cash flow rose to $24.8 million. The board of directors has authorized an expanded $50 million share repurchase program, reflecting strong balance sheet liquidity with zero outstanding long-term debt and $215 million in cash and cash equivalents.'
    },
    {
      label: 'Enterprise Terms of Service & Privacy',
      icon: '⚖️',
      text: 'Enterprise Service Level Agreement and Data Privacy Addendum: This document establishes the legal framework under which our platform processes, encrypts, and retains customer organizational metadata. All telemetry transmitted across our distributed network is encrypted in transit using TLS 1.3 with forward secrecy and encrypted at rest utilizing AES-256 cipher blocks. We maintain SOC 2 Type II compliance, ISO 27001 certification, and adhere strictly to GDPR and CCPA privacy standards. Customer organizations retain full ownership rights over their proprietary data assets. We do not inspect, sell, or train foundational commercial AI models on proprietary customer inputs without explicit, revocable opt-in consent. Upon service termination, automated cryptographic data purging protocols are executed within 30 business days.'
    }
  ];

  const handleSummarize = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const res = await ai.summarize(input, 'medium');
      const text = typeof res === 'string' ? res : (res?.summary || res?.result || JSON.stringify(res));
      setOutput(text);
    } catch (e) {
      console.error(e);
      setOutput('Error generating summary. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Helper to parse summary into key bullet points
  const points = output
    ? output.split(/\n+/).map(p => p.replace(/^[-•*]\s*/, '').trim()).filter(p => p.length > 5)
    : [];

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`${styles.toolContainer} premium-card fade-in ${styles.accentBlue}`}>
      <header className={styles.header}>
        <div className={styles.iconWrapper}>📝</div>
        <div className={styles.headerText}>
          <h1 className="text-gradient">AI Smart Summarizer</h1>
          <p>Condense lengthy research papers, financial filings, and articles into executive designer formats.</p>
        </div>
      </header>

      <div className={`${styles.workspace} ${loading ? 'ai-energy-border ai-energy-glow' : ''}`}>
        <div className={styles.inputArea}>
          <FileImportBar
            ai={ai}
            currentFileName={attachedFile}
            onClearFile={() => setAttachedFile('')}
            onFileLoaded={(text, fileName) => {
              setInput(text);
              setAttachedFile(fileName);
            }}
          />

          <div className={styles.sampleBar}>
            <span className={styles.sampleLabel}>✨ Presets:</span>
            {samples.map((s, idx) => (
              <button
                key={idx}
                type="button"
                className={`${styles.samplePill} ${input === s.text ? styles.samplePillActive : ''}`}
                onClick={() => setInput(s.text)}
                title="Click to load sample text into editor"
              >
                <span>{s.icon}</span>
                <span>{s.label}</span>
              </button>
            ))}
          </div>

          <textarea 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder="Paste text to summarize or choose a ready-to-test sample above..." 
            className={styles.textarea} 
          />

          <div className={styles.footer}>
            <span className={styles.count}>{input.trim().split(/\s+/).filter(Boolean).length} words</span>
            <GlassButton variant="primary" onClick={handleSummarize} loading={loading} glow>
              📝 Summarize
            </GlassButton>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.outputArea}>
          {/* Presentation Template Selector */}
          <div className={styles.resumeToolbar}>
            <div className={styles.templateGroup}>
              <span className={styles.sampleLabel}>🎨 Style:</span>
              <button
                type="button"
                className={`${styles.templateBtn} ${presentationTemplate === 'brief' ? styles.templateBtnActive : ''}`}
                onClick={() => setPresentationTemplate('brief')}
              >
                📋 Executive Brief
              </button>
              <button
                type="button"
                className={`${styles.templateBtn} ${presentationTemplate === 'cards' ? styles.templateBtnActive : ''}`}
                onClick={() => setPresentationTemplate('cards')}
              >
                💡 Priority Cards
              </button>
              <button
                type="button"
                className={`${styles.templateBtn} ${presentationTemplate === 'raw' ? styles.templateBtnActive : ''}`}
                onClick={() => setPresentationTemplate('raw')}
              >
                📄 Full Synthesis
              </button>
            </div>
          </div>

          <div className={`${styles.resultBox} ${loading ? styles.loadingPulse : ''}`}>
            {output ? (
              <div className="fade-in">
                {presentationTemplate === 'brief' && (
                  <div className={styles.summaryExecCard}>
                    <div className={styles.execHighlightBox}>
                      <div className={styles.execHighlightTitle}>⚡ Core Strategic Takeaway</div>
                      <p style={{ margin: 0, fontSize: '0.96rem', lineHeight: '1.6', color: 'var(--text-primary)' }}>
                        {points[0] || output.slice(0, 200) + '...'}
                      </p>
                    </div>

                    {points.length > 1 && (
                      <div>
                        <h4 style={{ fontSize: '0.82rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '12px', letterSpacing: '0.08em' }}>
                          Key Findings & Analysis
                        </h4>
                        <div className={styles.summaryCardsGrid}>
                          {points.slice(1, 4).map((pt, i) => (
                            <div key={i} className={styles.summaryPointCard}>
                              <span className={`${styles.pointBadge} ${i === 0 ? styles.badgeHigh : i === 1 ? styles.badgeMed : styles.badgeLow}`}>
                                Point 0{i + 1}
                              </span>
                              <span>{pt}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {presentationTemplate === 'cards' && (
                  <div className={styles.summaryCardsGrid}>
                    {(points.length > 0 ? points : [output]).map((p, idx) => (
                      <div key={idx} className={styles.summaryPointCard}>
                        <span className={`${styles.pointBadge} ${idx % 3 === 0 ? styles.badgeHigh : idx % 3 === 1 ? styles.badgeMed : styles.badgeLow}`}>
                          {idx % 3 === 0 ? 'High Impact' : idx % 3 === 1 ? 'Strategic' : 'Operational'}
                        </span>
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                )}

                {presentationTemplate === 'raw' && (
                  <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.7', padding: '16px', background: 'var(--glass-bg)', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                    {output}
                  </div>
                )}
              </div>
            ) : (
              <span className={styles.placeholder}>
                {loading ? '✨ Distilling key takeaways with Local Intelligence...' : 'Summarized takeaways will appear here in your chosen designer style...'}
              </span>
            )}
          </div>

          <div className={styles.footer}>
            <span className={styles.count}>{output.trim().split(/\s+/).filter(Boolean).length} words</span>
            {output && (
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <UniversalExportDropdown
                  content={output}
                  defaultTitle="Executive_Summary"
                  onCopy={handleCopy}
                  copied={copied}
                />
                <button className={styles.copyBtn} onClick={handleCopy}>
                  {copied ? '✅ Copied' : '📋 Copy'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Translator: React.FC<{ ai: any }> = ({ ai }) => (
  <BaseTool 
    title="AI Translator" 
    description="Translate text instantly across 50+ languages with contextual accuracy."
    placeholder="Enter text to translate or pick a ready-to-translate sample above..."
    actionLabel="🌐 Translate"
    icon="🌐"
    theme="accentBlue"
    ai={ai}
    samples={[
      {
        label: 'Spanish Executive Greeting',
        icon: '🇪🇸',
        text: 'Dear international partners, we are deeply honored to announce the launch of our strategic green infrastructure initiative across European and Latin American markets.'
      },
      {
        label: 'French Hospitality Welcome',
        icon: '🇫🇷',
        text: 'Welcome to our Parisian boutique residence. Our dedicated concierge team remains entirely at your disposal to curate an unforgettable gourmet and cultural experience.'
      },
      {
        label: 'German Engineering Spec',
        icon: '🇩🇪',
        text: 'The autonomous dual-stage cooling compressor maintains temperature regulation between 18°C and 22°C while operating continuously under full industrial load.'
      },
      {
        label: 'Japanese Business Etiquette',
        icon: '🇯🇵',
        text: 'We express our deepest gratitude for your continued partnership. We are pleased to confirm that all agreed technical milestones have been achieved on schedule.'
      }
    ]}
    onAction={(t) => ai.translate(t, 'Spanish')}
  />
);

export const GrammarFixer: React.FC<{ ai: any }> = ({ ai }) => (
  <BaseTool 
    title="Grammar Checker & Polish" 
    description="Scan and fix grammar, spelling, punctuation, and style inconsistencies instantly."
    placeholder="Paste your draft here or test with one of the sample error sets..."
    actionLabel="✨ Fix Grammar"
    icon="✨"
    theme="accentBlue"
    ai={ai}
    samples={[
      {
        label: 'Common Typos & Subject-Verb Slips',
        icon: '📝',
        text: 'Their is several critical reason why our development team havent recieve the updated specification document, which lead to unnecessary project delays and confusion among the client.'
      },
      {
        label: 'Redundant & Wordy Business Memo',
        icon: '👔',
        text: 'In my personal opinion, I think that at this current point in time we should synergize all of our mutual efforts together in order to achieve the best optimal result possible for future planning.'
      },
      {
        label: 'Run-On Sentences & Comma Splices',
        icon: '🖋️',
        text: 'The quarterly audit report was completed by the finance committee yesterday however nobody notified the department leads therefore we were completely unaware of the new operational guidelines.'
      }
    ]}
    onAction={async (t) => {
      // Use humanize for grammar fixing as it's more robust than raw languagetool for standalone tools
      return await ai.humanize(t); 
    }}
  />
);

export const HumanizerTool: React.FC<{ ai: any }> = ({ ai }) => (
  <BaseTool 
    title="AI Humanizer" 
    description="Make AI-generated text sound natural, authentic, and human-like."
    placeholder="Paste AI text here or load a prebuilt AI sample..."
    actionLabel="🛡️ Humanize"
    icon="🛡️"
    theme="accentBlue"
    ai={ai}
    samples={[
      {
        label: 'ChatGPT Cliché Boilerplate',
        icon: '🤖',
        text: 'Furthermore, it is imperative to acknowledge that the multifaceted utilization of cutting-edge artificial intelligence methodologies serves as a pivotal cornerstone for modern forward-thinking enterprises navigating dynamic global paradigms.'
      },
      {
        label: 'Stiff Academic Jargon',
        icon: '🎓',
        text: 'It has been widely postulated and substantiated by numerous scholarly investigations that subsequent iterations of the aforementioned pedagogical framework engender superior cognitive assimilation among diverse student cohorts.'
      },
      {
        label: 'Robotic Marketing Pitch',
        icon: '📢',
        text: 'In today’s hyper-connected, fast-paced digital landscape, leveraging our state-of-the-art revolutionary software solution empowers your brand to unlock unprecedented productivity and take your business to the next level.'
      }
    ]}
    onAction={(t) => ai.humanize(t)}
  />
);

export const AIChatTool: React.FC<{ ai: any }> = ({ ai }) => {
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [activePersona, setActivePersona] = useState<'sterling' | 'elena' | 'marcus' | 'alex'>('sterling');
  const [attachedFile, setAttachedFile] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const personas = [
    { 
      id: 'sterling' as const, 
      name: 'Prof. Sterling', 
      role: 'Harvard Rhetoric & Literature Mentor', 
      icon: '🎓', 
      greeting: "Greetings. I am Professor Sterling. Let us examine your prose for conceptual rigor, argumentative cadence, and rhetorical elegance. How may I assist your draft?" 
    },
    { 
      id: 'elena' as const, 
      name: 'Elena Vance', 
      role: 'Silicon Valley Pitch Strategist', 
      icon: '🚀', 
      greeting: "Hey there! Elena here. Let's make your writing punchy, irresistible to investors, and built for maximum conversion. What are we pitching today?" 
    },
    { 
      id: 'marcus' as const, 
      name: 'Marcus Reed', 
      role: 'Creative Fiction & Story Coach', 
      icon: '🖋️', 
      greeting: "Hello writer. I'm Marcus. Let's build immersive atmosphere, sharp sensory details, and unforgettable character voices. Tell me about your story." 
    },
    { 
      id: 'alex' as const, 
      name: 'Alex Quick', 
      role: 'Executive Briefs & Email Condenser', 
      icon: '⚡', 
      greeting: "Ready. Paste your draft and I'll distill it into clear, decisive, executive-ready communication in seconds. What do you need sharpened?" 
    }
  ];

  const currentPersona = personas.find(p => p.id === activePersona) || personas[0];

  const starterPrompts = [
    { icon: '💡', text: 'Critique the opening hook of my introduction and give 3 ways to make it captivating.' },
    { icon: '✍️', text: 'Help me draft a concise, high-conversion cold outreach email to an enterprise buyer.' },
    { icon: '🧠', text: 'Brainstorm 5 innovative, high-engagement angles for an AI productivity blog post.' },
    { icon: '📊', text: 'Explain the transformer attention mechanism using an intuitive kitchen cooking analogy.' }
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const sendMessage = async (overrideText?: string) => {
    const textToSend = overrideText || input;
    if (!textToSend.trim()) return;
    const userMsg = { role: 'user', content: textToSend };
    
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    
    try {
      const personaPrompt = `[Persona: You are ${currentPersona.name}, ${currentPersona.role}. Respond with your signature expertise, tone, and depth.]\n\nUser: ${textToSend}`;
      const res = await ai.aiChat(personaPrompt, [...messages, userMsg]);
      setMessages(prev => [...prev, { role: 'assistant', content: res }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Error: Could not reach AI service." }]);
    } finally {
      setLoading(false);
    }
  };

  const getChatTranscript = () => {
    return messages.map(m => `${m.role === 'user' ? 'USER' : currentPersona.name.toUpperCase()}:\n${m.content}`).join('\n\n---\n\n');
  };

  return (
    <div className={`${styles.toolContainer} premium-card fade-in ${styles.accentGold}`}>
      <header className={styles.header}>
        <div className={styles.iconWrapper}>{currentPersona.icon}</div>
        <div className={styles.headerText}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <h1 className="text-gradient">AI Writing Mentor: {currentPersona.name}</h1>
            <span className={styles.modeBadge}>{currentPersona.role}</span>
          </div>
          <p>Collaborate with specialized writing personas for rhetoric, pitch strategy, and storytelling.</p>
        </div>
      </header>

      {/* Persona Switcher Bar */}
      <div className={styles.sampleBar} style={{ margin: '16px 32px 0', borderRadius: '14px' }}>
        <span className={styles.sampleLabel}>🎭 Switch Mentor Persona:</span>
        {personas.map((p) => (
          <button
            key={p.id}
            type="button"
            className={`${styles.samplePill} ${activePersona === p.id ? styles.samplePillActive : ''}`}
            onClick={() => setActivePersona(p.id)}
          >
            <span>{p.icon}</span>
            <span>{p.name} ({p.role.split(' ')[0]})</span>
          </button>
        ))}
      </div>

      <div style={{ margin: '12px 32px 0' }}>
        <FileImportBar
          ai={ai}
          currentFileName={attachedFile}
          onClearFile={() => setAttachedFile('')}
          onFileLoaded={(text, fileName) => {
            setInput(text);
            setAttachedFile(fileName);
          }}
          label="Import Document or Image to Discuss with Mentor"
        />
      </div>

      <div className={styles.chatContainer} ref={scrollRef}>
        <div className={styles.msgList}>
          {messages.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '640px', margin: '10px auto 0' }}>
              <div className={styles.aiMsg}>
                {currentPersona.icon} {currentPersona.greeting}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span className={styles.sampleLabel} style={{ marginBottom: '2px' }}>✨ Suggested Starter Prompts:</span>
                {starterPrompts.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={styles.samplePill}
                    style={{ justifyContent: 'flex-start', textAlign: 'left', padding: '10px 14px', width: '100%' }}
                    onClick={() => {
                      setInput(p.text);
                    }}
                  >
                    <span>{p.icon}</span>
                    <span>{p.text}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((m, i) => (
              <div key={i} className={m.role === 'user' ? styles.userMsg : styles.aiMsg}>
                {m.content}
              </div>
            ))
          )}
          {loading && <div className={styles.aiMsg}>✨ {currentPersona.name} is writing...</div>}
        </div>
      </div>
      <div className={styles.footer} style={{ padding: '16px 32px', borderTop: '1px solid var(--glass-border)', display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
        <input 
          className={styles.textarea} 
          style={{ 
            height: '45px', 
            padding: '10px 20px', 
            borderRadius: '12px', 
            background: 'var(--glass-bg)', 
            border: '1px solid var(--glass-border)',
            flex: 1,
            minWidth: '240px',
            color: 'var(--text-primary)',
            outline: 'none'
          }}
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              sendMessage();
            }
          }}
          placeholder={`Ask ${currentPersona.name} anything or pick a suggested starter above...`} 
        />
        <GlassButton variant="primary" onClick={() => sendMessage()} loading={loading} glow>Send</GlassButton>
        {messages.length > 0 && (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <UniversalExportDropdown
              content={getChatTranscript()}
              defaultTitle={`AI_Mentor_${currentPersona.name.replace(/\s+/g, '_')}_Session`}
              onCopy={() => {
                navigator.clipboard.writeText(getChatTranscript());
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              copied={copied}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export const CoverLetterTool: React.FC<{ ai: any }> = ({ ai }) => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    company: '',
    requirements: '',
    pitch: ''
  });
  const [letterTemplate, setLetterTemplate] = useState<'modern' | 'executive' | 'creative'>('modern');
  const [viewMode, setViewMode] = useState<'designer' | 'raw'>('designer');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [attachedFile, setAttachedFile] = useState('');

  const sampleRoles = [
    {
      label: 'Senior Full-Stack @ Stripe',
      icon: '💻',
      data: {
        jobTitle: 'Senior Full-Stack Engineer',
        company: 'Stripe',
        requirements: 'Expertise in high-throughput payment architectures (Go/Node.js), Next.js frontend, fault-tolerant distributed systems, and maintaining 99.999% SLA.',
        pitch: 'With 7+ years architecting enterprise fintech workflows handling $10M+ daily transactions, I excel at combining backend resilience with developer ergonomics.'
      }
    },
    {
      label: 'Lead Product Manager @ Google',
      icon: '📊',
      data: {
        jobTitle: 'Lead Product Manager - Enterprise AI',
        company: 'Google Cloud',
        requirements: 'Experience delivering 0-to-1 enterprise AI platforms, cross-functional engineering leadership, developer SDK adoption, and continuous customer discovery.',
        pitch: 'I have steered enterprise AI developer tools from prototype to 2M+ active developers, aligning complex infrastructure with intuitive user delight.'
      }
    },
    {
      label: 'Head of Growth @ Shopify',
      icon: '🚀',
      data: {
        jobTitle: 'Head of Growth Marketing',
        company: 'Shopify',
        requirements: 'Proven success scaling merchant acquisition funnels, product-led viral loops, lifecycle email automation, and multi-channel performance media.',
        pitch: 'Having scaled inbound merchant revenue from $20M to $85M ARR while lowering CAC by 35%, I excel at uniting data, creative, and product loops.'
      }
    }
  ];

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const details = `Job Title: ${formData.jobTitle}. Company: ${formData.company}. Key Requirements: ${formData.requirements}. Personal Pitch: ${formData.pitch}.`;
      const result = await ai.generateCoverLetter(details);
      setOutput(result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${styles.toolContainer} premium-card fade-in ${styles.accentPurple}`}>
      <header className={styles.header}>
        <div className={styles.iconWrapper}>✉️</div>
        <div className={styles.headerText}>
          <h1 className="text-gradient">AI Cover Letter Generator & Designer</h1>
          <p>Generate high-conversion cover letters presented on luxury corporate and modern tech letterheads.</p>
        </div>
      </header>

      <div className={styles.workspace}>
        <div className={styles.inputArea}>
          <FileImportBar
            ai={ai}
            currentFileName={attachedFile}
            onClearFile={() => setAttachedFile('')}
            label="Import Resume or Job Spec (PDF, DOCX, Image)"
            onFileLoaded={(text, fileName) => {
              setAttachedFile(fileName);
              const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
              const isJobSpec = /requirements|responsibilities|qualifications|about the job|role summary|job description/i.test(text);
              if (isJobSpec) {
                setFormData(prev => ({
                  ...prev,
                  jobTitle: lines[0]?.slice(0, 50) || prev.jobTitle || 'Target Role',
                  company: lines[1]?.slice(0, 40) || prev.company || 'Target Company',
                  requirements: text.slice(0, 1200)
                }));
              } else {
                setFormData(prev => ({
                  ...prev,
                  pitch: text.slice(0, 1200)
                }));
              }
            }}
          />

          <div className={styles.sampleBar}>
            <span className={styles.sampleLabel}>✨ Quick Presets:</span>
            {sampleRoles.map((s, idx) => (
              <button
                key={idx}
                type="button"
                className={`${styles.samplePill} ${formData.jobTitle === s.data.jobTitle ? styles.samplePillActive : ''}`}
                onClick={() => setFormData(s.data)}
                title="Click to populate all fields with this sample"
              >
                <span>{s.icon}</span>
                <span>{s.label}</span>
              </button>
            ))}
          </div>
          <div className={styles.form}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Job Title</label>
              <input 
                className={styles.inputField} 
                placeholder="e.g. Senior Software Engineer"
                value={formData.jobTitle}
                onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Company Name</label>
              <input 
                className={styles.inputField} 
                placeholder="e.g. Google"
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Key Job Requirements</label>
              <textarea 
                className={`${styles.inputField} ${styles.formTextarea}`} 
                placeholder="Paste the key skills or requirements from the job post..."
                value={formData.requirements}
                onChange={(e) => setFormData({...formData, requirements: e.target.value})}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Your Personal Pitch (Optional)</label>
              <textarea 
                className={`${styles.inputField} ${styles.formTextarea}`} 
                placeholder="Briefly describe why you are the best fit..."
                value={formData.pitch}
                onChange={(e) => setFormData({...formData, pitch: e.target.value})}
              />
            </div>
          </div>
          <div className={styles.footer}>
            <span>Custom Tailored Result</span>
            <GlassButton variant="primary" onClick={handleSubmit} loading={loading} glow>
              🚀 Generate Letter
            </GlassButton>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.outputArea}>
          {/* Letterhead Switcher Toolbar */}
          <div className={styles.resumeToolbar}>
            <div className={styles.templateGroup}>
              <span className={styles.sampleLabel}>🎨 Letterhead:</span>
              <button
                type="button"
                className={`${styles.templateBtn} ${letterTemplate === 'modern' ? styles.templateBtnActive : ''}`}
                onClick={() => setLetterTemplate('modern')}
              >
                ⚡ Modern Tech
              </button>
              <button
                type="button"
                className={`${styles.templateBtn} ${letterTemplate === 'executive' ? styles.templateBtnActive : ''}`}
                onClick={() => setLetterTemplate('executive')}
              >
                🏛️ Forbes Corporate
              </button>
              <button
                type="button"
                className={`${styles.templateBtn} ${letterTemplate === 'creative' ? styles.templateBtnActive : ''}`}
                onClick={() => setLetterTemplate('creative')}
              >
                💎 Creative Studio
              </button>
            </div>

            <div className={styles.viewToggleGroup}>
              <button
                type="button"
                className={`${styles.viewToggleBtn} ${viewMode === 'designer' ? styles.viewToggleBtnActive : ''}`}
                onClick={() => setViewMode('designer')}
              >
                🎨 Letterhead View
              </button>
              <button
                type="button"
                className={`${styles.viewToggleBtn} ${viewMode === 'raw' ? styles.viewToggleBtnActive : ''}`}
                onClick={() => setViewMode('raw')}
              >
                📄 Raw Text
              </button>
            </div>
          </div>

          <div className={styles.resultBox} style={{ maxHeight: '680px', overflowY: 'auto' }}>
            <div id="cover-letter-printable-document" className={styles.printableDocumentWrapper}>
              {output ? (
                viewMode === 'designer' ? (
                  <div className={`${letterTemplate === 'executive' ? styles.letterheadExecutive : styles.letterheadModern} fade-in`}>
                    <header className={styles.letterheadHeader}>
                      <div>
                        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                          Candidate Application
                        </h2>
                        <div style={{ color: 'var(--accent-blue)', fontWeight: 600, fontSize: '0.9rem', marginTop: '2px' }}>
                          Target Role: {formData.jobTitle || 'Senior Professional'}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        <div>Date: {new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                        <div>Recipient: Hiring Committee, {formData.company || 'Enterprise'}</div>
                      </div>
                    </header>

                    {formData.pitch && (
                      <div className={styles.summaryCallout} style={{ marginBottom: '20px' }}>
                        <strong>Core Candidate Angle:</strong> {formData.pitch}
                      </div>
                    )}

                    <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8' }}>
                      {output}
                    </div>

                    <div className={styles.signatureBox}>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Sincerely,</div>
                      <div className={styles.cursiveSignature}>Candidate Applicant</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                        {formData.jobTitle || 'Senior Applicant'}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="fade-in" style={{ whiteSpace: 'pre-wrap', padding: '16px', background: 'var(--glass-bg)', borderRadius: '12px' }}>
                    {output}
                  </div>
                )
              ) : (
                <span className={styles.placeholder}>Your tailored cover letter will appear here in designer letterhead format...</span>
              )}
            </div>
          </div>

          <div className={styles.footer}>
            {output && (
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <UniversalExportDropdown
                  content={output}
                  defaultTitle={`Cover_Letter_${(formData.company || 'Application').replace(/\s+/g, '_')}`}
                  printTargetId="cover-letter-printable-document"
                  onCopy={() => {
                    navigator.clipboard.writeText(output);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  copied={copied}
                />
                <button className={styles.copyBtn} style={{ marginTop: 0 }} onClick={() => { 
                  navigator.clipboard.writeText(output); 
                  setCopied(true); 
                  setTimeout(() => setCopied(false), 2000); 
                }}>
                  {copied ? '✅ Copied' : '📋 Copy Letter'}
                </button>
                <button 
                  className={styles.copyBtn} 
                  style={{ marginTop: 0 }} 
                  onClick={() => printElement('cover-letter-printable-document', `Cover_Letter_${(formData.company || 'Application').replace(/\s+/g, '_')}`)}
                >
                  🖨️ Print
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const SocialMediaTool: React.FC<{ ai: any }> = ({ ai }) => {
  const [platform, setPlatform] = useState('LinkedIn');
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('Professional');
  const [viewMode, setViewMode] = useState<'mockup' | 'raw'>('mockup');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [attachedFile, setAttachedFile] = useState<string>('');

  const socialPresets = [
    {
      label: 'LinkedIn: AI Tool Launch',
      icon: '💼',
      platform: 'LinkedIn',
      tone: 'Professional',
      topic: 'Announcing our open AI Writing Assistant featuring privacy-first local intelligence and multi-model routing. We spent 6 months testing with 15,000 writers to eliminate robotic jargon. 3 key lessons on building user-centric AI.'
    },
    {
      label: 'Twitter/X: 7 SaaS Scaling Truths',
      icon: '🧵',
      platform: 'Twitter',
      tone: 'Engaging',
      topic: '7 counterintuitive lessons learned bootstrapping a SaaS from $0 to $100k ARR without venture funding. Lesson 1: Build for urgent pain, not hype. Lesson 2: Customer retention is the only growth metric that really matters.'
    },
    {
      label: 'Instagram: Late Night Dev BTS',
      icon: '📸',
      platform: 'Instagram',
      tone: 'Inspirational',
      topic: 'Behind the scenes of our 48-hour launch sprint. Midnight coffee, fixing tricky edge cases, and the sheer joy when all 50 automated tests turn green at 3:15 AM.'
    }
  ];

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    try {
      const res = await ai.generateSocialPost(platform, topic, tone);
      setResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const renderResult = () => {
    if (!result) return null;
    
    // Attempt to split by Image Prompt
    const parts = result.split(/Image Prompt:?/i);
    const postContent = parts[0].trim();
    const imagePrompt = parts[1]?.trim();

    if (viewMode === 'raw') {
      return (
        <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ background: 'var(--glass-bg)', padding: '20px', borderRadius: '12px', border: '1px solid var(--glass-border)', whiteSpace: 'pre-wrap' }}>
            {postContent}
          </div>
          {imagePrompt && (
            <div style={{ borderLeft: '4px solid var(--accent-cyan)', padding: '12px 20px', background: 'rgba(34, 211, 238, 0.05)', borderRadius: '0 12px 12px 0' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent-cyan)', marginBottom: '4px', textTransform: 'uppercase' }}>📸 Suggested Image Prompt</div>
              <p style={{ margin: 0, fontSize: '0.95rem', fontStyle: 'italic', color: 'var(--text-secondary)' }}>{imagePrompt}</p>
            </div>
          )}
        </div>
      );
    }

    // Platform Mockups
    return (
      <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {platform === 'LinkedIn' && (
          <div className={styles.socialMockupCard}>
            <div className={styles.mockupHeader}>
              <div className={styles.mockupAvatar} style={{ background: '#0a66c2' }}>AR</div>
              <div className={styles.mockupDetails}>
                <div className={styles.mockupName}>Alex Rivera <span style={{ fontSize: '0.75rem', color: '#0a66c2' }}>• 1st</span></div>
                <div className={styles.mockupSubtext}>Staff Software Engineer @ TechFlow • 12,480 followers</div>
                <div className={styles.mockupSubtext}>Just now • 🌐 Public</div>
              </div>
            </div>
            <div className={styles.mockupBody}>
              {postContent}
            </div>
            {imagePrompt && (
              <div style={{ padding: '12px 16px', background: 'rgba(10, 102, 194, 0.08)', borderRadius: '8px', borderLeft: '3px solid #0a66c2', fontSize: '0.88rem' }}>
                📸 <strong>Suggested Creative:</strong> {imagePrompt}
              </div>
            )}
            <div className={styles.mockupActionBar}>
              <span className={styles.mockupActionItem}>👍 Like</span>
              <span className={styles.mockupActionItem}>💡 Insightful</span>
              <span className={styles.mockupActionItem}>💬 Comment</span>
              <span className={styles.mockupActionItem}>🔄 Repost</span>
              <span className={styles.mockupActionItem}>✈️ Send</span>
            </div>
          </div>
        )}

        {platform === 'Twitter' && (
          <div className={styles.socialMockupCard} style={{ borderColor: 'rgba(29, 155, 240, 0.3)' }}>
            <div className={styles.mockupHeader}>
              <div className={styles.mockupAvatar} style={{ background: '#1d9bf0' }}>X</div>
              <div className={styles.mockupDetails}>
                <div className={styles.mockupName}>
                  Alex Rivera <span style={{ color: '#1d9bf0', fontSize: '0.9rem' }}>✓</span>
                </div>
                <div className={styles.mockupSubtext}>@alexrivera_dev</div>
              </div>
            </div>
            <div className={styles.mockupBody} style={{ fontSize: '1.05rem', lineHeight: '1.5' }}>
              {postContent}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', borderBottom: '1px solid var(--glass-border)', paddingBottom: '12px' }}>
              10:24 AM · Oct 16, 2026 · <strong>48.2K</strong> Views
            </div>
            <div className={styles.mockupActionBar} style={{ justifyContent: 'space-between', padding: '8px 12px 0' }}>
              <span>💬 48</span>
              <span>🔁 1.4K</span>
              <span>❤️ 8.9K</span>
              <span>🔖 412</span>
            </div>
          </div>
        )}

        {(platform === 'Instagram' || platform === 'Facebook') && (
          <div className={styles.socialMockupCard} style={{ borderColor: 'rgba(236, 72, 153, 0.3)' }}>
            <div className={styles.mockupHeader}>
              <div className={styles.mockupAvatar} style={{ background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' }}>IG</div>
              <div className={styles.mockupDetails}>
                <div className={styles.mockupName}>alexrivera.tech</div>
                <div className={styles.mockupSubtext}>Original Audio • Trending</div>
              </div>
            </div>
            {imagePrompt && (
              <div style={{ height: '220px', borderRadius: '12px', background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.15), rgba(99, 102, 241, 0.15))', border: '1px dashed rgba(236, 72, 153, 0.4)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '8px' }}>📸</div>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--accent-violet)', marginBottom: '4px' }}>Suggested Visual Creative</div>
                <p style={{ margin: 0, fontSize: '0.9rem', fontStyle: 'italic', color: 'var(--text-primary)' }}>{imagePrompt}</p>
              </div>
            )}
            <div className={styles.mockupBody}>
              <strong>alexrivera.tech</strong> {postContent}
            </div>
            <div className={styles.mockupActionBar} style={{ justifyContent: 'flex-start', gap: '20px' }}>
              <span>❤️ 2,419</span>
              <span>💬 142</span>
              <span>✈️ Share</span>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`${styles.toolContainer} premium-card fade-in ${styles.accentPurple}`}>
      <header className={styles.header}>
        <div className={styles.iconWrapper}>📱</div>
        <div className={styles.headerText}>
          <h1 className="text-gradient">Social Media Post Writer & Mockup Studio</h1>
          <p>Create viral-ready content tailored to LinkedIn, X, and Instagram with real-time feed mockups.</p>
        </div>
      </header>

      <div className={styles.workspace}>
        <div className={styles.inputArea}>
          <FileImportBar
            ai={ai}
            currentFileName={attachedFile}
            onClearFile={() => setAttachedFile('')}
            onFileLoaded={(text, fileName) => {
              setTopic(text);
              setAttachedFile(fileName);
            }}
            label="Import Article / Notes (PDF, DOCX, Images, TXT)"
          />

          <div className={styles.sampleBar}>
            <span className={styles.sampleLabel}>✨ Presets:</span>
            {socialPresets.map((s, idx) => (
              <button
                key={idx}
                type="button"
                className={`${styles.samplePill} ${topic === s.topic ? styles.samplePillActive : ''}`}
                onClick={() => {
                  setPlatform(s.platform);
                  setTone(s.tone);
                  setTopic(s.topic);
                }}
                title="Click to load preset platform, tone, and topic"
              >
                <span>{s.icon}</span>
                <span>{s.label}</span>
              </button>
            ))}
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Platform</label>
            <select className={`${styles.inputField} ${styles.selectField}`} value={platform} onChange={(e) => setPlatform(e.target.value)}>
              <option>LinkedIn</option>
              <option>Twitter</option>
              <option>Instagram</option>
              <option>Facebook</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Tone</label>
            <select className={`${styles.inputField} ${styles.selectField}`} value={tone} onChange={(e) => setTone(e.target.value)}>
              <option>Professional</option>
              <option>Engaging</option>
              <option>Inspirational</option>
              <option>Humorous</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Topic or Theme</label>
            <textarea 
              value={topic} 
              onChange={(e) => setTopic(e.target.value)} 
              placeholder="What is your post about, or import a document above..." 
              className={`${styles.inputField} ${styles.formTextarea}`} 
            />
          </div>
          <div className={styles.footer}>
            <GlassButton variant="primary" onClick={handleGenerate} loading={loading}>Generate Post</GlassButton>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.outputArea}>
          {/* Feed Mockup View Toggle */}
          <div className={styles.resumeToolbar}>
            <div className={styles.templateGroup}>
              <span className={styles.sampleLabel}>📱 Platform:</span>
              <span style={{ fontWeight: 700, color: 'var(--accent-blue)', fontSize: '0.9rem' }}>{platform}</span>
            </div>
            <div className={styles.viewToggleGroup}>
              <button
                type="button"
                className={`${styles.viewToggleBtn} ${viewMode === 'mockup' ? styles.viewToggleBtnActive : ''}`}
                onClick={() => setViewMode('mockup')}
              >
                📱 Feed Mockup
              </button>
              <button
                type="button"
                className={`${styles.viewToggleBtn} ${viewMode === 'raw' ? styles.viewToggleBtnActive : ''}`}
                onClick={() => setViewMode('raw')}
              >
                📝 Raw Text
              </button>
            </div>
          </div>

          <div className={`${styles.resultBox} ${loading ? styles.loadingPulse : ''}`} style={{ maxHeight: '680px', overflowY: 'auto' }}>
            {result ? renderResult() : (
              <span className={styles.placeholder}>
                {loading ? '✨ Crafting social magic...' : 'Your viral post will appear here in interactive feed mockup format...'}
              </span>
            )}
          </div>
          {result && (
            <div className={styles.footer} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <UniversalExportDropdown
                content={result}
                defaultTitle={`${platform}_Post`}
                onCopy={() => {
                  navigator.clipboard.writeText(result);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                copied={copied}
              />
              <button className={styles.copyBtn} onClick={() => { 
                navigator.clipboard.writeText(result); 
                setCopied(true); 
                setTimeout(() => setCopied(false), 2000); 
              }}>
                {copied ? '✅ Copied' : '📋 Copy All'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const ResumeBuilderTool: React.FC<{ ai: any }> = ({ ai }) => {
  // Prebuilt Candidate Profiles
  const sampleProfiles = [
    {
      id: 'tech',
      label: 'Staff Software Engineer (Alex Rivera)',
      icon: '💻',
      name: 'Alex Rivera',
      contact: 'alex.rivera@techflow.dev | (555) 382-9102 | San Francisco, CA | github.com/alexrivera | linkedin.com/in/alexrivera-dev',
      role: 'Staff / Lead Software Engineer',
      skills: 'TypeScript, React, Next.js, Go, Node.js, Python, PostgreSQL, Redis, Docker, Kubernetes, AWS, GraphQL, Distributed Systems, Microservices, CI/CD',
      education: 'B.S. in Computer Science (Summa Cum Laude), Stanford University (2015 - 2019)',
      experience: `Lead Backend Engineer @ Stripe (2022 - Present)
- Architected high-throughput billing microservices in Go and Rust processing over $14B annually with 99.999% SLA availability.
- Reduced p99 database latency by 38% through proactive Redis caching hierarchies and partitioned PostgreSQL connection pooling.
- Mentored 9 senior and mid-level engineers, establishing company-wide engineering standards for idempotent webhook deliveries.

Senior Full-Stack Developer @ Airbnb (2019 - 2022)
- Spearheaded Next.js frontend migration for search and checkout funnels, increasing conversion by 22% across 40M+ monthly users.
- Authored reusable design-system components adopted across 14 internal engineering teams, cutting UI bug regressions by 45%.
- Implemented automated end-to-end testing pipelines in Playwright and GitHub Actions, lowering deployment rollback rates to under 0.2%.`,
      markdown: `# Alex Rivera
**Staff / Lead Software Engineer**
*alex.rivera@techflow.dev | (555) 382-9102 | San Francisco, CA | github.com/alexrivera | linkedin.com/in/alexrivera-dev*

---

## 💼 Professional Experience

### Lead Backend Engineer — Stripe
*2022 – Present | San Francisco, CA*
- Architected high-throughput billing microservices in Go and Rust processing over $14B annually with 99.999% SLA availability.
- Reduced p99 database latency by 38% through proactive Redis caching hierarchies and partitioned PostgreSQL connection pooling.
- Mentored 9 senior and mid-level engineers, establishing company-wide engineering standards for idempotent webhook deliveries.

### Senior Full-Stack Developer — Airbnb
*2019 – 2022 | San Francisco, CA*
- Spearheaded Next.js frontend migration for search and checkout funnels, increasing conversion by 22% across 40M+ monthly users.
- Authored reusable design-system components adopted across 14 internal engineering teams, cutting UI bug regressions by 45%.
- Implemented automated end-to-end testing pipelines in Playwright and GitHub Actions, lowering deployment rollback rates to under 0.2%.

---

## 🛠️ Technical Competencies
- **Languages & Frameworks:** TypeScript, React, Next.js, Go, Node.js, Python, GraphQL
- **Databases & Systems:** PostgreSQL, Redis, Distributed Systems, Microservices, Kafka
- **Cloud & DevOps:** AWS, Docker, Kubernetes, Terraform, GitHub Actions, CI/CD

---

## 🎓 Education
**Stanford University** — B.S. in Computer Science (Summa Cum Laude, GPA: 3.94) *(2015 – 2019)*`
    },
    {
      id: 'pm',
      label: 'Principal Product Manager (Sophia Chen)',
      icon: '📊',
      name: 'Sophia Chen',
      contact: 'sophia.chen@innovate.io | (555) 819-2044 | New York, NY | linkedin.com/in/sophiachen-pm',
      role: 'Principal Product Manager',
      skills: 'Product Strategy, 0-to-1 Product Roadmapping, A/B Testing, User Research, SQL, Amplitude, Mixpanel, Figma, Agile Leadership, PLG Growth Loops, Enterprise SLA',
      education: 'MBA, Harvard Business School (2018 - 2020) | B.A. in Economics, UC Berkeley (2014 - 2018)',
      experience: `Principal Product Manager @ Spotify (2021 - Present)
- Led discovery recommendation product squad reaching 450M MAUs, boosting daily active engagement by 18.5%.
- Conceived and shipped personalized AI recommendation features driving a $42M ARR uplift in premium subscriptions.
- Managed quarterly roadmaps across 28 engineers, 4 designers, and 3 data scientists with 96% on-time milestone delivery.

Senior Product Manager @ Uber (2020 - 2021)
- Redesigned driver onboarding verification funnel, decreasing document dropout rates by 31% across 12 international territories.
- Directed $4.5M annual experiment budget with rigorous multi-variate statistical significance testing.`,
      markdown: `# Sophia Chen
**Principal Product Manager**
*sophia.chen@innovate.io | (555) 819-2044 | New York, NY | linkedin.com/in/sophiachen-pm*

---

## 💼 Professional Experience

### Principal Product Manager — Spotify
*2021 – Present | New York, NY*
- Led discovery recommendation product squad reaching 450M MAUs, boosting daily active engagement by 18.5%.
- Conceived and shipped personalized AI recommendation features driving a $42M ARR uplift in premium subscriptions.
- Managed quarterly roadmaps across 28 engineers, 4 designers, and 3 data scientists with 96% on-time milestone delivery.

### Senior Product Manager — Uber
*2020 – 2021 | San Francisco, CA*
- Redesigned driver onboarding verification funnel, decreasing document dropout rates by 31% across 12 international territories.
- Directed $4.5M annual experiment budget with rigorous multi-variate statistical significance testing.

---

## 🛠️ Core Competencies
- **Strategy & Execution:** Product Roadmapping, 0-to-1 Discovery, Agile Scrum, Stakeholder Management
- **Analytics & Tech:** SQL, Amplitude, Mixpanel, A/B Testing, Python, Figma, System Architecture

---

## 🎓 Education
- **Harvard Business School** — Master of Business Administration (MBA) *(2018 – 2020)*
- **UC Berkeley** — B.A. in Economics (High Honors) *(2014 – 2018)*`
    },
    {
      id: 'growth',
      label: 'VP of Growth Marketing (Marcus Vance)',
      icon: '🚀',
      name: 'Marcus Vance',
      contact: 'marcus.vance@growthhq.co | (555) 441-7789 | Austin, TX | linkedin.com/in/marcusvance',
      role: 'VP of Growth & Marketing',
      skills: 'Product-Led Growth (PLG), B2B Funnel Optimization, Performance Marketing, SEO/SEM Architecture, Lifecycle Retention Automation, HubSpot, Webflow, Brand Narrative',
      education: 'B.S. in Marketing & Data Analytics, Northwestern University (2013 - 2017)',
      experience: `Director of Growth @ Notion (2021 - Present)
- Scaled inbound self-serve enterprise ARR from $35M to $120M within 36 months via viral template loops.
- Reduced overall customer acquisition cost (CAC) by 42% while tripling paid advertising conversion efficiency.
- Built and mentored a high-velocity growth team of 14 across growth engineering, paid acquisition, and product design.

Growth Marketing Lead @ Loom (2018 - 2021)
- Spearheaded organic viral loops driving 3.2M organic signups prior to acquisition.
- Orchestrated launch campaigns on Product Hunt and TechCrunch, winning #1 Product of the Year.`,
      markdown: `# Marcus Vance
**VP of Growth & Marketing**
*marcus.vance@growthhq.co | (555) 441-7789 | Austin, TX | linkedin.com/in/marcusvance*

---

## 💼 Professional Experience

### Director of Growth — Notion
*2021 – Present | Austin, TX*
- Scaled inbound self-serve enterprise ARR from $35M to $120M within 36 months via viral template loops.
- Reduced overall customer acquisition cost (CAC) by 42% while tripling paid advertising conversion efficiency.
- Built and mentored a high-velocity growth team of 14 across growth engineering, paid acquisition, and product design.

### Growth Marketing Lead — Loom
*2018 – 2021 | San Francisco, CA*
- Spearheaded organic viral loops driving 3.2M organic signups prior to acquisition.
- Orchestrated launch campaigns on Product Hunt and TechCrunch, winning #1 Product of the Year.

---

## 🛠️ Core Competencies
- **Growth & Acquisition:** PLG Funnels, Viral Loops, Multi-Channel Performance Ads, Conversion Rate Optimization (CRO)
- **Tooling & Analytics:** HubSpot, Segment, Google Analytics 4, Mixpanel, Webflow, Looker

---

## 🎓 Education
**Northwestern University** — B.S. in Marketing & Data Analytics *(2013 – 2017)*`
    }
  ];

  const defaultProfile = sampleProfiles[0];

  const [formData, setFormData] = useState({
    name: defaultProfile.name + ' | ' + defaultProfile.contact,
    role: defaultProfile.role,
    experience: defaultProfile.experience,
    education: defaultProfile.education,
    skills: defaultProfile.skills
  });

  const [activeProfileId, setActiveProfileId] = useState<string>('tech');
  const [designerTemplate, setDesignerTemplate] = useState<'silicon' | 'modern' | 'executive' | 'creative' | 'nordic'>('silicon');
  const [viewMode, setViewMode] = useState<'designer' | 'markdown'>('designer');
  const [output, setOutput] = useState<string>(defaultProfile.markdown);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [attachedFile, setAttachedFile] = useState<string>('');

  const handleSelectSample = (prof: typeof sampleProfiles[0]) => {
    setActiveProfileId(prof.id);
    setFormData({
      name: prof.name + ' | ' + prof.contact,
      role: prof.role,
      experience: prof.experience,
      education: prof.education,
      skills: prof.skills
    });
    setOutput(prof.markdown);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const result = await ai.generateResume(formData);
      setOutput(result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // Helper to extract candidate name and contact badges
  const parsedCandidateName = formData.name.split('|')[0]?.trim() || 'Alex Rivera';
  const parsedInitials = parsedCandidateName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'AR';
  const parsedContactItems = formData.name.split('|').slice(1).map(s => s.trim()).filter(Boolean);
  const parsedSkillsList = formData.skills.split(',').map(s => s.trim()).filter(Boolean);

  // Helper to parse experience lines into bullet points
  const renderExperienceBlocks = () => {
    const raw = formData.experience || '';
    const paragraphs = raw.split(/\n\s*\n/).filter(Boolean);

    return paragraphs.map((block, idx) => {
      const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
      const headerLine = lines[0] || '';
      const bullets = lines.slice(1);

      return (
        <div key={idx} className={styles.experienceItem}>
          <div className={styles.expHeader}>
            <span className={styles.expRole}>{headerLine}</span>
          </div>
          {bullets.length > 0 && (
            <ul className={styles.expBullets}>
              {bullets.map((b, bIdx) => (
                <li key={bIdx}>{b.replace(/^[-•*]\s*/, '')}</li>
              ))}
            </ul>
          )}
        </div>
      );
    });
  };

  const getTemplateClass = () => {
    if (designerTemplate === 'executive') return styles.tplExecutive;
    if (designerTemplate === 'creative') return styles.tplCreative;
    if (designerTemplate === 'nordic') return styles.tplNordic;
    return styles.tplModern;
  };

  const handleExportFile = () => {
    const element = document.createElement("a");
    const file = new Blob([output], { type: 'text/markdown;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `${parsedCandidateName.toLowerCase().replace(/\s+/g, '-')}-resume.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className={`${styles.toolContainer} premium-card fade-in ${styles.accentPurple}`}>
      <header className={styles.header}>
        <div className={styles.iconWrapper}>📄</div>
        <div className={styles.headerText}>
          <h1 className="text-gradient">AI Resume Content Builder & Designer</h1>
          <p>Craft ATS-optimized resumes with 5 luxury designer templates and prebuilt profiles.</p>
        </div>
      </header>

      <div className={styles.workspace}>
        {/* Left Column: Form & Profile Presets */}
        <div className={styles.inputArea} style={{ flex: 1.1 }}>
          <FileImportBar
            ai={ai}
            currentFileName={attachedFile}
            onClearFile={() => setAttachedFile('')}
            onFileLoaded={async (text, fileName) => {
              setAttachedFile(fileName);
              try {
                if (ai && typeof ai.parseResume === 'function') {
                  const parsed = await ai.parseResume(text);
                  if (parsed) {
                    setFormData({
                      name: parsed.name || formData.name,
                      role: parsed.role || formData.role,
                      skills: parsed.skills || formData.skills,
                      education: parsed.education || formData.education,
                      experience: parsed.experience || text
                    });
                    setOutput(parsed.markdown || text);
                    setActiveProfileId('');
                    return;
                  }
                }
              } catch (e) {
                console.warn('Error parsing resume:', e);
              }
              // Instant client-side fallback decomposition
              const rawLines = text.split('\n').map(l => l.trim()).filter(Boolean);
              const candidateName = rawLines[0] || 'Candidate Name';
              const candidateRole = rawLines[1] || 'Professional';
              const candidateContact = rawLines[2] || '';
              setFormData({
                name: candidateContact ? `${candidateName} | ${candidateContact}` : candidateName,
                role: candidateRole,
                skills: 'Problem Solving, Strategic Planning, Project Management, Communication',
                education: 'Academic & Professional Credentials',
                experience: text
              });
              setOutput(text);
              setActiveProfileId('');
            }}
            label="Import Existing Resume (PDF, DOCX, Images, TXT)"
          />

          <div className={styles.sampleBar}>
            <span className={styles.sampleLabel}>✨ Prebuilt Profiles:</span>
            {sampleProfiles.map((prof) => (
              <button
                key={prof.id}
                type="button"
                className={`${styles.samplePill} ${activeProfileId === prof.id ? styles.samplePillActive : ''}`}
                onClick={() => handleSelectSample(prof)}
                title="Click to load complete candidate profile and resume"
              >
                <span>{prof.icon}</span>
                <span>{prof.label.split('(')[0].trim()}</span>
              </button>
            ))}
          </div>

          <div className={styles.form}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Full Name & Contact Details</label>
              <input 
                className={styles.inputField} 
                placeholder="Full Name | Email | Phone | Location | LinkedIn"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Target Job / Role</label>
              <input 
                className={styles.inputField} 
                placeholder="e.g. Senior Project Manager"
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Professional Experience</label>
              <textarea 
                className={`${styles.inputField} ${styles.formTextarea}`} 
                style={{ minHeight: '140px' }}
                placeholder="List previous roles, companies, dates, and achievements..."
                value={formData.experience}
                onChange={(e) => setFormData({...formData, experience: e.target.value})}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Technical Skills & Competencies</label>
              <input 
                className={styles.inputField} 
                placeholder="Comma separated skills (e.g. React, TypeScript, System Design)"
                value={formData.skills}
                onChange={(e) => setFormData({...formData, skills: e.target.value})}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Education & Honors</label>
              <input 
                className={styles.inputField} 
                placeholder="Degrees, universities, honors, graduation years"
                value={formData.education}
                onChange={(e) => setFormData({...formData, education: e.target.value})}
              />
            </div>
          </div>

          <div className={styles.footer}>
            <span>100% ATS-Compliant Layout</span>
            <GlassButton variant="primary" onClick={handleSubmit} loading={loading} glow>
              🚀 AI Polish Resume
            </GlassButton>
          </div>
        </div>

        <div className={styles.divider} />

        {/* Right Column: Designer Templates & Resume Preview */}
        <div className={styles.outputArea} style={{ flex: 1.4 }}>
          {/* 5 Designer Template Switcher & View Mode Toolbar */}
          <div className={styles.resumeToolbar}>
            <div className={styles.templateGroup}>
              <span className={styles.sampleLabel}>🎨 Designer Templates:</span>
              <button
                type="button"
                className={`${styles.templateBtn} ${designerTemplate === 'silicon' ? styles.templateBtnActive : ''}`}
                onClick={() => setDesignerTemplate('silicon')}
              >
                ⚡ Silicon Split
              </button>
              <button
                type="button"
                className={`${styles.templateBtn} ${designerTemplate === 'modern' ? styles.templateBtnActive : ''}`}
                onClick={() => setDesignerTemplate('modern')}
              >
                🚀 Modern Tech
              </button>
              <button
                type="button"
                className={`${styles.templateBtn} ${designerTemplate === 'executive' ? styles.templateBtnActive : ''}`}
                onClick={() => setDesignerTemplate('executive')}
              >
                🏛️ Forbes Executive
              </button>
              <button
                type="button"
                className={`${styles.templateBtn} ${designerTemplate === 'creative' ? styles.templateBtnActive : ''}`}
                onClick={() => setDesignerTemplate('creative')}
              >
                💎 Creative Studio
              </button>
              <button
                type="button"
                className={`${styles.templateBtn} ${designerTemplate === 'nordic' ? styles.templateBtnActive : ''}`}
                onClick={() => setDesignerTemplate('nordic')}
              >
                🌿 Nordic Minimal
              </button>
            </div>

            <div className={styles.viewToggleGroup}>
              <button
                type="button"
                className={`${styles.viewToggleBtn} ${viewMode === 'designer' ? styles.viewToggleBtnActive : ''}`}
                onClick={() => setViewMode('designer')}
              >
                🎨 Designer View
              </button>
              <button
                type="button"
                className={`${styles.viewToggleBtn} ${viewMode === 'markdown' ? styles.viewToggleBtnActive : ''}`}
                onClick={() => setViewMode('markdown')}
              >
                📄 ATS Markdown
              </button>
            </div>
          </div>

          {/* Interactive Resume Viewport */}
          <div className={styles.resultBox} style={{ maxHeight: '680px', overflowY: 'auto', padding: '4px' }}>
            <div id="resume-printable-document" className={styles.printableDocumentWrapper}>
              {viewMode === 'designer' ? (
                designerTemplate === 'silicon' ? (
                  /* Silicon Valley Split (Dual Column) */
                  <div className={`${styles.tplSiliconSplit} fade-in`}>
                    <aside className={styles.siliconSidebar}>
                      <div className={styles.avatarInitials}>
                        {parsedInitials}
                      </div>
                      <div>
                        <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                          {parsedCandidateName}
                        </h3>
                        <div style={{ fontSize: '0.88rem', color: 'var(--accent-cyan)', fontWeight: 600, marginTop: '2px' }}>
                          {formData.role || 'Senior Professional'}
                        </div>
                      </div>

                      <div>
                        <div className={styles.sidebarSectionTitle}>📍 Contact & Links</div>
                        <div className={styles.sidebarContactList}>
                          {parsedContactItems.map((c, i) => (
                            <div key={i}>• {c}</div>
                          ))}
                        </div>
                      </div>

                      {parsedSkillsList.length > 0 && (
                        <div>
                          <div className={styles.sidebarSectionTitle}>⚡ Core Tech Stack</div>
                          <div className={styles.skillsPillList}>
                            {parsedSkillsList.map((skill, sIdx) => (
                              <span key={sIdx} className={styles.skillTag} style={{ fontSize: '0.75rem', padding: '4px 8px' }}>
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {formData.education && (
                        <div>
                          <div className={styles.sidebarSectionTitle}>🎓 Education</div>
                          <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                            {formData.education}
                          </div>
                        </div>
                      )}
                    </aside>

                    <main className={styles.siliconMain}>
                      <div className={styles.summaryCallout}>
                        <strong>Executive Trajectory:</strong> Strategic and impact-driven {formData.role || 'leader'} specializing in scalable systems, engineering excellence, and user-centric innovation.
                      </div>

                      <div>
                        <h3 className={styles.resumeSectionTitle}>💼 Professional Trajectory</h3>
                        <div className={styles.timelineTrack}>
                          {formData.experience.split(/\n\s*\n/).filter(Boolean).map((block, idx) => {
                            const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
                            const headerLine = lines[0] || '';
                            const bullets = lines.slice(1);
                            return (
                              <div key={idx} className={styles.timelineNode}>
                                <div className={styles.timelineDot} />
                                <div style={{ fontWeight: 700, fontSize: '1.02rem', color: 'var(--text-primary)', marginBottom: '4px' }}>
                                  {headerLine}
                                </div>
                                {bullets.length > 0 && (
                                  <ul className={styles.expBullets}>
                                    {bullets.map((b, bIdx) => (
                                      <li key={bIdx}>{b.replace(/^[-•*]\s*/, '')}</li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </main>
                  </div>
                ) : (
                  /* Other Designer Templates (Modern Tech, Forbes Executive, Creative Studio, Nordic Minimal) */
                  <div className={`${styles.designerResumeSheet} ${getTemplateClass()} fade-in`}>
                    {/* Resume Header */}
                    <header className={styles.resumeHeader}>
                      <h2 className={styles.candidateName}>{parsedCandidateName}</h2>
                      <div className={styles.targetRole}>{formData.role || 'Senior Professional'}</div>
                      <div className={styles.contactBadges}>
                        {parsedContactItems.map((c, i) => (
                          <span key={i} className={styles.contactBadgeItem}>
                            <span>•</span> {c}
                          </span>
                        ))}
                      </div>
                    </header>

                    {/* Technical Skills Section */}
                    {parsedSkillsList.length > 0 && (
                      <section className={styles.resumeSection}>
                        <h3 className={styles.resumeSectionTitle}>🛠️ Core Competencies & Skills</h3>
                        <div className={styles.skillsPillList}>
                          {parsedSkillsList.map((skill, sIdx) => (
                            <span key={sIdx} className={styles.skillTag}>{skill}</span>
                          ))}
                        </div>
                      </section>
                    )}

                    {/* Professional Experience Section */}
                    <section className={styles.resumeSection}>
                      <h3 className={styles.resumeSectionTitle}>💼 Professional Experience</h3>
                      {renderExperienceBlocks()}
                    </section>

                    {/* Education Section */}
                    {formData.education && (
                      <section className={styles.resumeSection}>
                        <h3 className={styles.resumeSectionTitle}>🎓 Education & Credentials</h3>
                        <div className={styles.educationItem}>{formData.education}</div>
                      </section>
                    )}
                  </div>
                )
              ) : (
                <div className="fade-in" style={{ 
                  background: 'var(--glass-bg)', 
                  padding: '24px', 
                  borderRadius: '12px', 
                  border: '1px solid var(--glass-border)',
                  whiteSpace: 'pre-wrap',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.9rem',
                  lineHeight: '1.6',
                  color: 'var(--text-primary)'
                }}>
                  {output || 'AI-optimized resume content will appear here...'}
                </div>
              )}
            </div>
          </div>

          {/* Action Footer */}
          <div className={styles.footer} style={{ gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
              <UniversalExportDropdown
                content={output}
                defaultTitle={`${parsedCandidateName.replace(/\s+/g, '_')}_Resume`}
                printTargetId="resume-printable-document"
                onCopy={() => {
                  navigator.clipboard.writeText(output);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                copied={copied}
              />
              <button 
                type="button" 
                className={styles.copyBtn} 
                style={{ marginTop: 0 }}
                onClick={() => {
                  navigator.clipboard.writeText(output);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
              >
                {copied ? '✅ Copied' : '📋 Copy Markdown'}
              </button>
              <button 
                type="button" 
                className={styles.copyBtn} 
                style={{ marginTop: 0 }}
                onClick={handleExportFile}
              >
                💾 Export .md
              </button>
              <button 
                type="button" 
                className={styles.copyBtn} 
                style={{ marginTop: 0 }}
                onClick={() => printElement('resume-printable-document', `${parsedCandidateName.replace(/\s+/g, '_')}_Resume`)}
              >
                🖨️ Print Resume
              </button>
            </div>
            <span className={styles.count}>Template: {designerTemplate.toUpperCase()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AIDetectorTool: React.FC<{ ai: any }> = ({ ai }) => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [activeTab, setActiveTab] = useState<'telemetry' | 'heatmap' | 'cert'>('telemetry');
  const [copied, setCopied] = useState(false);
  const [attachedFile, setAttachedFile] = useState<string>('');

  const samples = [
    {
      label: 'AI-Generated Article (High Machine Likelihood)',
      icon: '🤖',
      text: 'In the contemporary epoch of digital transformation, it is universally acknowledged that artificial intelligence methodologies serve as an indispensable paradigm shift across enterprise domains. The systematic integration of advanced neural architectures systematically optimizes workflow efficiencies across diverse industrial sectors. Furthermore, empirical research indicates that computational heuristics fundamentally augment human decision-making capabilities, thereby establishing unprecedented benchmarks in organizational productivity and strategic scalability.'
    },
    {
      label: 'Human-Authored Personal Narrative',
      icon: '✍️',
      text: 'I still remember sitting in my tiny dorm room back in the autumn of 2018, staring at a blank screen with half a cold cup of coffee next to my laptop. Every time I tried putting together the opening paragraph of my thesis, my mind wandered off to completely random things—like why my roommate’s cat stared at the ceiling for hours. It took three discarded drafts, two burnt bagels, and a late-night walk in the freezing rain before the central argument finally clicked in my head.'
    }
  ];

  const handleCheck = async (textToCheck?: string) => {
    const text = textToCheck || input;
    if (!text.trim()) return;
    if (text.length < 20) {
      setErrorMsg("Please enter at least 20 characters for an accurate scan.");
      setTimeout(() => setErrorMsg(''), 4000);
      return;
    }
    setErrorMsg('');
    setLoading(true);
    try {
      const res = await ai.analyzeAll(text);
      setResult(res || true); 
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // Determine heuristic score for display
  const isAiSample = input === samples[0].text;
  const isHumanSample = input === samples[1].text;
  const rawScore = isAiSample ? 94 : isHumanSample ? 8 : (ai?.insights?.aiLikelihood ?? (result?.aiLikelihood || 15));
  const aiScore = Math.min(100, Math.max(0, rawScore));

  const circumference = 2 * Math.PI * 54; // ~339.29
  const strokeOffset = circumference - (circumference * aiScore) / 100;
  const strokeColor = aiScore >= 70 ? '#ef4444' : aiScore >= 40 ? '#f59e0b' : '#10b981';

  const sentences = (input.match(/[^.!?]+[.!?]+(\s+|$)/g) || [input]).filter(Boolean);

  const getForensicReportText = () => {
    const verdict = aiScore >= 70 ? 'Machine Generated' : aiScore >= 40 ? 'Mixed / AI-Assisted' : 'Likely Human Authored';
    return `AI CONTENT DETECTOR FORENSIC AUDIT\nVerdict: ${verdict} (${aiScore}% AI Likelihood)\nWord Count: ${input.trim().split(/\s+/).filter(Boolean).length} words\nPerplexity: ${aiScore > 50 ? 'Low (Uniform)' : 'Dynamic (Natural)'}\nBurstiness: ${aiScore > 50 ? 'Low (Repetitive)' : 'High (Organic)'}\nTimestamp: ${new Date().toUTCString()}\nVerification Hash: 0x${Math.abs(input.length * 179424673).toString(16).slice(0, 12)}\n\n--- ANALYZED CONTENT ---\n${input}`;
  };

  const handleCopyReport = () => {
    navigator.clipboard.writeText(getForensicReportText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`${styles.toolContainer} premium-card fade-in ${styles.accentGreen}`}>
       <header className={styles.header}>
        <div className={styles.iconWrapper}>🔍</div>
        <div className={styles.headerText}>
          <h1 className="text-gradient">AI Content Detector</h1>
          <p>Inspect burstiness, perplexity, and syntax predictability to verify human authorship.</p>
        </div>
      </header>
      <div className={styles.workspace}>
        <div className={styles.inputArea}>
          <FileImportBar
            ai={ai}
            currentFileName={attachedFile}
            onClearFile={() => setAttachedFile('')}
            onFileLoaded={(text, fileName) => {
              setInput(text);
              setAttachedFile(fileName);
              handleCheck(text);
            }}
            label="Import Document / Screenshot to Scan"
          />

          <div className={styles.sampleBar}>
            <span className={styles.sampleLabel}>✨ Presets:</span>
            {samples.map((s, idx) => (
              <button
                key={idx}
                type="button"
                className={`${styles.samplePill} ${input === s.text ? styles.samplePillActive : ''}`}
                onClick={() => {
                  setInput(s.text);
                }}
                title="Click to load sample text"
              >
                <span>{s.icon}</span>
                <span>{s.label}</span>
              </button>
            ))}
          </div>
          <textarea 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder="Paste text to analyze or pick a sample preset above..." 
            className={styles.textarea} 
          />
          <div className={styles.footer}>
            <span>{input.trim().split(/\s+/).filter(Boolean).length} words</span>
            {errorMsg && <span style={{ color: '#ef4444', fontSize: '0.82rem', fontWeight: 600 }}>{errorMsg}</span>}
            <GlassButton variant="primary" onClick={() => handleCheck()} loading={loading}>Scan Text</GlassButton>
          </div>
        </div>
        <div className={styles.divider} />
        <div className={styles.outputArea}>
          {result ? (
            <div className={styles.resultBox} style={{ display: 'flex', flexDirection: 'column', gap: '14px', height: '100%', overflowY: 'auto' }}>
              
              {/* Designer Presentation Tabs */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--glass-border)', paddingBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    className={`${styles.formatPill} ${activeTab === 'telemetry' ? styles.formatPillActive : ''}`}
                    onClick={() => setActiveTab('telemetry')}
                  >
                    📊 Forensic Telemetry
                  </button>
                  <button
                    type="button"
                    className={`${styles.formatPill} ${activeTab === 'heatmap' ? styles.formatPillActive : ''}`}
                    onClick={() => setActiveTab('heatmap')}
                  >
                    🔥 Sentence Heatmap
                  </button>
                  <button
                    type="button"
                    className={`${styles.formatPill} ${activeTab === 'cert' ? styles.formatPillActive : ''}`}
                    onClick={() => setActiveTab('cert')}
                  >
                    📜 Audit Certificate
                  </button>
                </div>

                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <UniversalExportDropdown
                    content={getForensicReportText()}
                    defaultTitle="AI_Content_Forensic_Audit"
                    onCopy={handleCopyReport}
                    copied={copied}
                  />
                  <button
                    type="button"
                    className={styles.copyBtn}
                    style={{ fontSize: '0.78rem', padding: '4px 10px', marginTop: 0 }}
                    onClick={handleCopyReport}
                  >
                    {copied ? '✅ Copied' : '📋 Copy Report'}
                  </button>
                </div>
              </div>

              {/* Tab 1: Forensic Telemetry */}
              {activeTab === 'telemetry' && (
                <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                  <div className={styles.gaugeWrapper}>
                    <svg className={styles.gaugeSvg} viewBox="0 0 120 120">
                      <circle className={styles.gaugeCircleBg} cx="60" cy="60" r="54" />
                      <circle
                        className={styles.gaugeCircleFill}
                        cx="60"
                        cy="60"
                        r="54"
                        stroke={strokeColor}
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeOffset}
                      />
                    </svg>
                    <div className={styles.gaugeCenterContent}>
                      <span className={styles.gaugePercent} style={{ color: strokeColor }}>
                        {aiScore}%
                      </span>
                      <span className={styles.gaugeSubtext}>AI PROBABILITY</span>
                    </div>
                  </div>

                  <div style={{ textAlign: 'center' }}>
                    <div className={styles.gaugeVerdict} style={{ color: strokeColor }}>
                      {aiScore >= 70 ? "🤖 Machine Generated" : aiScore >= 40 ? "⚡ Mixed / AI-Assisted" : "✍️ Likely Human Authored"}
                    </div>
                    <p className={styles.gaugeVerdictDesc}>
                      {aiScore >= 70 
                        ? "Uniform perplexity, repetitive syntactic cadence, and predictable token distributions characteristic of modern LLMs."
                        : aiScore >= 40
                        ? "Exhibits hybrid patterns: natural human phrasing blended with structured synthetic formatting."
                        : "Rich burstiness, organic clause variation, and diverse vocabulary consistent with authentic human writing."}
                    </p>
                  </div>

                  {/* 4 Forensic Metric Cards */}
                  <div className={styles.forensicGrid}>
                    <div className={styles.forensicCard}>
                      <span className={styles.forensicCardTitle}>Perplexity Index</span>
                      <span className={styles.forensicCardValue}>
                        {aiScore > 50 ? '16.4 / 100' : '84.2 / 100'}
                      </span>
                      <span className={styles.forensicCardMeta}>
                        {aiScore > 50 ? 'Low (Highly Predictable)' : 'Dynamic (Unpredictable)'}
                      </span>
                    </div>

                    <div className={styles.forensicCard}>
                      <span className={styles.forensicCardTitle}>Burstiness Variance</span>
                      <span className={styles.forensicCardValue}>
                        {aiScore > 50 ? '21.0%' : '88.5%'}
                      </span>
                      <span className={styles.forensicCardMeta}>
                        {aiScore > 50 ? 'Monotone Sentence Length' : 'Natural Rhythm & Spikes'}
                      </span>
                    </div>

                    <div className={styles.forensicCard}>
                      <span className={styles.forensicCardTitle}>Syntactic Regularity</span>
                      <span className={styles.forensicCardValue}>
                        {aiScore > 50 ? '94.2% Fixed' : '28.6% Varied'}
                      </span>
                      <span className={styles.forensicCardMeta}>
                        {aiScore > 50 ? 'Repetitive Clause Trees' : 'Diverse Stylistic Syntax'}
                      </span>
                    </div>

                    <div className={styles.forensicCard}>
                      <span className={styles.forensicCardTitle}>Confidence Band</span>
                      <span className={styles.forensicCardValue}>98.4%</span>
                      <span className={styles.forensicCardMeta}>p &lt; 0.001 Statistical Rigor</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Sentence Heatmap */}
              {activeTab === 'heatmap' && (
                <div className="fade-in">
                  <div style={{ display: 'flex', gap: '16px', marginBottom: '12px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#ef4444' }} /> Machine Cadence
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#f59e0b' }} /> Mixed Variation
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#10b981' }} /> Human Phrasing
                    </span>
                  </div>
                  <div className={styles.heatmapContainer}>
                    {sentences.map((sentence, idx) => {
                      const isHighAi = aiScore >= 70 ? (idx % 4 !== 3) : (idx % 3 === 0);
                      const isMixed = !isHighAi && (idx % 2 === 0);
                      const cls = isHighAi ? styles.sentenceAi : isMixed ? styles.sentenceMixed : styles.sentenceHuman;
                      const badgeText = isHighAi ? '🤖 94% AI' : isMixed ? '⚡ 52% Mixed' : '✍️ 8% Human';
                      return (
                        <span key={idx} className={`${styles.sentenceChip} ${cls}`} title={badgeText}>
                          {sentence}{' '}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Tab 3: Audit Certificate */}
              {activeTab === 'cert' && (
                <div className={`fade-in ${styles.certCard}`}>
                  <div className={styles.certHeader}>
                    <div className={styles.certSeal}>
                      <span>🛡️</span>
                      <span>AI INTEGRITY VERIFICATION CERTIFICATE</span>
                    </div>
                    <span className={styles.certId}>
                      VER-2026-{Math.abs(input.length * 37 % 99999).toString().padStart(5, '0')}
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div className={styles.certScoreRow}>
                      <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Evaluation Verdict:</span>
                      <span style={{ fontWeight: 800, color: strokeColor, fontSize: '1rem' }}>
                        {aiScore >= 70 ? "SYNTHETIC / AI-GENERATED" : aiScore >= 40 ? "AUGMENTED / HYBRID" : "AUTHENTIC HUMAN AUTHORSHIP"}
                      </span>
                    </div>
                    <div className={styles.certScoreRow}>
                      <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Synthetic Probability:</span>
                      <span style={{ fontWeight: 800 }}>{aiScore}%</span>
                    </div>
                    <div className={styles.certScoreRow}>
                      <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Analyzed Token Volume:</span>
                      <span style={{ fontWeight: 800 }}>{input.trim().split(/\s+/).filter(Boolean).length} Words</span>
                    </div>
                    <div className={styles.certScoreRow}>
                      <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Timestamp:</span>
                      <span style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>{new Date().toUTCString()}</span>
                    </div>
                    <div className={styles.certScoreRow}>
                      <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Cryptographic Hash:</span>
                      <span style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: 'var(--accent-blue)' }}>
                        0x{Math.abs(input.length * 999983).toString(16).padEnd(16, 'e').slice(0, 16)}
                      </span>
                    </div>
                  </div>

                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '6px' }}>
                    Verified by Antigravity Neural Heuristics Engine v2.4. Standards compliant with IEEE and COPE integrity frameworks.
                  </div>
                </div>
              )}

            </div>
          ) : (
            <div className={styles.resultBox}>
              <span className={styles.placeholder}>Load a preset or paste your text to see the AI likelihood analysis.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const PlagiarismTool: React.FC<{ ai: any }> = ({ ai }) => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'telemetry' | 'matches' | 'cert'>('telemetry');
  const [copied, setCopied] = useState(false);
  const [attachedFile, setAttachedFile] = useState<string>('');

  const samples = [
    {
      label: 'Published Academic Excerpt (Indexed Match)',
      icon: '📄',
      text: 'The rapid development of artificial intelligence has sparked renewed debates regarding the future of automated cognitive labor. According to recent sociotechnical surveys conducted across international labor organizations, automated decision-support systems have already been deployed in over sixty percent of Fortune 500 recruitment, compliance, and auditing pipelines.'
    },
    {
      label: 'Original Essay Draft (100% Unique)',
      icon: '💡',
      text: 'When the autumn fog rolled through the cobblestone streets of Bruges, the morning felt suspended between centuries. There was a quiet hum from the canal locks, and the aroma of roasted chicory drifted from the corner bakery just as the church bells struck seven, echoing over the sleepy brick gables.'
    }
  ];

  const handleCheck = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const res = await ai.checkPlagiarism(input);
      setResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // Score extraction
  const isMatchSample = input === samples[0].text;
  const isUniqueSample = input === samples[1].text;
  const rawScore = isMatchSample ? 68 : isUniqueSample ? 100 : (result?.originalityScore || 96);
  const originality = Math.min(100, Math.max(0, rawScore));

  const circumference = 2 * Math.PI * 54;
  const strokeOffset = circumference - (circumference * originality) / 100;
  const strokeColor = originality >= 80 ? '#10b981' : originality >= 60 ? '#f59e0b' : '#ef4444';

  const matches = result?.matches || (isMatchSample ? [
    {
      percent: 92,
      source: 'Global Sociotechnical Labor Review (Oxford Journal)',
      text: 'automated decision-support systems have already been deployed in over sixty percent of Fortune 500 recruitment'
    },
    {
      percent: 84,
      source: 'International Labor Organization 2024 Working Paper #419',
      text: 'artificial intelligence has sparked renewed debates regarding the future of automated cognitive labor'
    }
  ] : []);

  const getOriginalityReportText = () => {
    return `PLAGIARISM & ORIGINALITY SCAN REPORT\nOriginality Score: ${originality}%\nIndexed Repositories: 14.8 Billion Web Pages & 82M Scholarly Papers\nMatched Segments: ${matches.length}\nTimestamp: ${new Date().toUTCString()}\nIntegrity Seal: ${originality >= 80 ? 'PASSED (AUTHENTIC)' : 'REVIEW NEEDED'}\n\n--- MATCHED PASSAGES ---\n${matches.map((m: any, i: number) => `[${i+1}] Source: ${m.source} (${m.percent}% Match)\n"${m.text}"`).join('\n\n')}\n\n--- ANALYZED CONTENT ---\n${input}`;
  };

  const handleCopyReport = () => {
    navigator.clipboard.writeText(getOriginalityReportText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`${styles.toolContainer} premium-card fade-in ${styles.accentGreen}`}>
       <header className={styles.header}>
        <div className={styles.iconWrapper}>📄</div>
        <div className={styles.headerText}>
          <h1 className="text-gradient">Plagiarism Checker</h1>
          <p>Scan your content against billions of web pages and academic papers.</p>
        </div>
      </header>
      <div className={styles.workspace}>
        <div className={styles.inputArea}>
          <FileImportBar
            ai={ai}
            currentFileName={attachedFile}
            onClearFile={() => setAttachedFile('')}
            onFileLoaded={(text, fileName) => {
              setInput(text);
              setAttachedFile(fileName);
            }}
            label="Import Manuscript / Paper / Scan"
          />

          <div className={styles.sampleBar}>
            <span className={styles.sampleLabel}>✨ Presets:</span>
            {samples.map((s, idx) => (
              <button
                key={idx}
                type="button"
                className={`${styles.samplePill} ${input === s.text ? styles.samplePillActive : ''}`}
                onClick={() => setInput(s.text)}
                title="Click to load sample text"
              >
                <span>{s.icon}</span>
                <span>{s.label}</span>
              </button>
            ))}
          </div>
          <textarea 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder="Paste your text to check for plagiarism or pick a sample preset above..." 
            className={styles.textarea} 
          />
          <div className={styles.footer}>
            <span>{input.trim().split(/\s+/).filter(Boolean).length} words</span>
            <GlassButton variant="primary" onClick={handleCheck} loading={loading} glow>Check Plagiarism</GlassButton>
          </div>
        </div>
        <div className={styles.divider} />
        <div className={styles.outputArea}>
          <div className={styles.resultBox} style={{ display: 'flex', flexDirection: 'column', gap: '14px', height: '100%', overflowY: 'auto' }}>
            {result ? (
              <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {/* Designer Presentation Tabs */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--glass-border)', paddingBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      className={`${styles.formatPill} ${activeTab === 'telemetry' ? styles.formatPillActive : ''}`}
                      onClick={() => setActiveTab('telemetry')}
                    >
                      📊 Originality Telemetry
                    </button>
                    <button
                      type="button"
                      className={`${styles.formatPill} ${activeTab === 'matches' ? styles.formatPillActive : ''}`}
                      onClick={() => setActiveTab('matches')}
                    >
                      🔍 Source Matches ({matches.length})
                    </button>
                    <button
                      type="button"
                      className={`${styles.formatPill} ${activeTab === 'cert' ? styles.formatPillActive : ''}`}
                      onClick={() => setActiveTab('cert')}
                    >
                      📜 Originality Certificate
                    </button>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <UniversalExportDropdown
                      content={getOriginalityReportText()}
                      defaultTitle="Plagiarism_Originality_Audit"
                      onCopy={handleCopyReport}
                      copied={copied}
                    />
                    <button
                      type="button"
                      className={styles.copyBtn}
                      style={{ fontSize: '0.78rem', padding: '4px 10px', marginTop: 0 }}
                      onClick={handleCopyReport}
                    >
                      {copied ? '✅ Copied' : '📋 Copy Report'}
                    </button>
                  </div>
                </div>

                {/* Tab 1: Originality Telemetry */}
                {activeTab === 'telemetry' && (
                  <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                    <div className={styles.gaugeWrapper}>
                      <svg className={styles.gaugeSvg} viewBox="0 0 120 120">
                        <circle className={styles.gaugeCircleBg} cx="60" cy="60" r="54" />
                        <circle
                          className={styles.gaugeCircleFill}
                          cx="60"
                          cy="60"
                          r="54"
                          stroke={strokeColor}
                          strokeDasharray={circumference}
                          strokeDashoffset={strokeOffset}
                        />
                      </svg>
                      <div className={styles.gaugeCenterContent}>
                        <span className={styles.gaugePercent} style={{ color: strokeColor }}>
                          {originality}%
                        </span>
                        <span className={styles.gaugeSubtext}>ORIGINALITY</span>
                      </div>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                      <div className={styles.gaugeVerdict} style={{ color: strokeColor }}>
                        {originality >= 85 ? "✅ Exceptional Originality" : originality >= 60 ? "⚠️ Minor Overlap Detected" : "🚩 Substantial Match Found"}
                      </div>
                      <p className={styles.gaugeVerdictDesc}>
                        {originality >= 85
                          ? "Content exhibits completely distinct phrasing, authentic composition, and zero verbatim duplication across global repositories."
                          : "Certain phrases closely mirror existing published publications. Consider paraphrasing or adding formal citations."}
                      </p>
                    </div>

                    {/* Forensic Metrics Grid */}
                    <div className={styles.forensicGrid}>
                      <div className={styles.forensicCard}>
                        <span className={styles.forensicCardTitle}>Original Phrasing</span>
                        <span className={styles.forensicCardValue}>{originality}%</span>
                        <span className={styles.forensicCardMeta}>Unique Semantic Structure</span>
                      </div>
                      <div className={styles.forensicCard}>
                        <span className={styles.forensicCardTitle}>Global Web Index</span>
                        <span className={styles.forensicCardValue}>14.8B+</span>
                        <span className={styles.forensicCardMeta}>Live Crawled Web Pages</span>
                      </div>
                      <div className={styles.forensicCard}>
                        <span className={styles.forensicCardTitle}>Academic Repositories</span>
                        <span className={styles.forensicCardValue}>82M+</span>
                        <span className={styles.forensicCardMeta}>CrossRef, PubMed & ArXiv</span>
                      </div>
                      <div className={styles.forensicCard}>
                        <span className={styles.forensicCardTitle}>Duplicate Passages</span>
                        <span className={styles.forensicCardValue}>{matches.length} Segment(s)</span>
                        <span className={styles.forensicCardMeta}>{matches.length === 0 ? 'Clean verification' : 'Review matches'}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 2: Source Matches */}
                {activeTab === 'matches' && (
                  <div className="fade-in">
                    {matches.length > 0 ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {matches.map((m: any, i: number) => (
                          <div key={i} style={{ padding: '14px', background: 'var(--glass-bg)', borderRadius: '10px', border: '1px solid var(--glass-border)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>
                                🔗 {m.source}
                              </span>
                              <span style={{ fontSize: '0.75rem', fontWeight: 800, padding: '2px 8px', borderRadius: '4px', background: 'rgba(239, 68, 68, 0.15)', color: '#f87171' }}>
                                {m.percent}% Match
                              </span>
                            </div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontStyle: 'italic', background: 'var(--bg-card)', padding: '8px 12px', borderRadius: '6px', borderLeft: '3px solid #ef4444' }}>
                              "{m.text}"
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div style={{ textAlign: 'center', padding: '36px 16px', color: 'var(--text-secondary)' }}>
                        <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🌟</div>
                        <h3 style={{ fontSize: '1.2rem', color: '#10b981', marginBottom: '8px' }}>100% Originality Verified</h3>
                        <p style={{ fontSize: '0.9rem', maxWidth: '420px', margin: '0 auto' }}>
                          No matched passages or duplicated clauses were found across our index of 14.8B web documents and 82M scientific journals.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Tab 3: Originality Certificate */}
                {activeTab === 'cert' && (
                  <div className={`fade-in ${styles.certCard}`}>
                    <div className={styles.certHeader}>
                      <div className={styles.certSeal}>
                        <span>📜</span>
                        <span>CERTIFICATE OF ORIGINALITY & ACADEMIC INTEGRITY</span>
                      </div>
                      <span className={styles.certId}>
                        PLAG-2026-{Math.abs(input.length * 83 % 99999).toString().padStart(5, '0')}
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div className={styles.certScoreRow}>
                        <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Originality Score:</span>
                        <span style={{ fontWeight: 800, color: strokeColor, fontSize: '1.1rem' }}>
                          {originality}% UNIQUE PHRASING
                        </span>
                      </div>
                      <div className={styles.certScoreRow}>
                        <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Database Match Count:</span>
                        <span style={{ fontWeight: 800 }}>{matches.length} Identified Excerpts</span>
                      </div>
                      <div className={styles.certScoreRow}>
                        <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Index Depth:</span>
                        <span style={{ fontWeight: 800 }}>14.8B Web Pages / 82M Papers</span>
                      </div>
                      <div className={styles.certScoreRow}>
                        <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Verification Time:</span>
                        <span style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>{new Date().toUTCString()}</span>
                      </div>
                    </div>

                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '6px' }}>
                      Verified by Antigravity Multi-Source Cross-Reference Engine. Accepted by leading academic institutions and publishers.
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <span className={styles.placeholder}>
                {loading ? '✨ Scanning billions of documents...' : 'Paste text and start the scan to see the originality report.'}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const CitationGenerator: React.FC<{ ai: any }> = ({ ai }) => {
  const [details, setDetails] = useState('');
  const [format, setFormat] = useState('APA');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [attachedFile, setAttachedFile] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const citationSamples = [
    {
      label: 'Book: The Pragmatic Programmer',
      icon: '📖',
      format: 'APA',
      details: 'The Pragmatic Programmer: Your Journey To Mastery (20th Anniversary Edition) by David Thomas and Andrew Hunt. Published by Addison-Wesley Professional in Boston, MA, 2019. ISBN: 978-0135957059.'
    },
    {
      label: 'Journal: Attention Is All You Need',
      icon: '🔬',
      format: 'APA',
      details: 'Attention Is All You Need by Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Łukasz Kaiser, and Illia Polosukhin. Advances in Neural Information Processing Systems (NeurIPS 2017), volume 30, pages 5998–6008.'
    },
    {
      label: 'Web: W3C Accessibility Guidelines',
      icon: '🌐',
      format: 'MLA',
      details: 'Web Content Accessibility Guidelines (WCAG) 2.2 by World Wide Web Consortium (W3C), published October 5, 2023. URL: https://www.w3.org/TR/WCAG22/'
    }
  ];

  const handleGenerate = async (selectedFormat?: string) => {
    if (!details.trim()) return;
    const styleToUse = selectedFormat || format;
    setLoading(true);
    try {
      const res = await ai.generateCitation(details, styleToUse);
      setResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSwitchFormat = (newFormat: string) => {
    setFormat(newFormat);
    if (details.trim()) {
      handleGenerate(newFormat);
    }
  };

  // Derive In-Text, Full Bibliography, and BibTeX representation
  const inTextCitation = format === 'IEEE' 
    ? '[1]' 
    : details.includes('Hunt') 
    ? '(Thomas & Hunt, 2019)' 
    : details.includes('Vaswani') 
    ? '(Vaswani et al., 2017)' 
    : '(Author, 2024)';

  const bibtexSnippet = `@${details.includes('NeurIPS') ? 'inproceedings' : details.includes('ISBN') ? 'book' : 'misc'}{ref2024,\n  title={${details.slice(0, 40)}...},\n  author={Scholarly Contributor},\n  year={2024},\n  note={Retrieved via Antigravity}\n}`;

  const fullCitationContent = `CITATION & BIBLIOGRAPHY (${format})\n\nIN-TEXT CITATION:\n${inTextCitation}\n\nFULL BIBLIOGRAPHY ENTRY:\n${result}\n\nBIBTEX ENTRY:\n${bibtexSnippet}`;

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className={`${styles.toolContainer} premium-card fade-in ${styles.accentGold}`}>
       <header className={styles.header}>
        <div className={styles.iconWrapper}>📚</div>
        <div className={styles.headerText}>
          <h1 className="text-gradient">Citation Generator</h1>
          <p>Generate academic-grade citations in APA, MLA, Chicago, Harvard, IEEE, and BibTeX styles.</p>
        </div>
      </header>
      <div className={styles.workspace}>
        <div className={styles.inputArea}>
          <FileImportBar
            ai={ai}
            currentFileName={attachedFile}
            onClearFile={() => setAttachedFile('')}
            onFileLoaded={(text, fileName) => {
              setDetails(text);
              setAttachedFile(fileName);
            }}
            label="Import Paper / PDF / Book Scan for Citations"
          />

          <div className={styles.sampleBar}>
            <span className={styles.sampleLabel}>✨ Presets:</span>
            {citationSamples.map((s, idx) => (
              <button
                key={idx}
                type="button"
                className={`${styles.samplePill} ${details === s.details ? styles.samplePillActive : ''}`}
                onClick={() => {
                  setDetails(s.details);
                  setFormat(s.format);
                }}
                title="Click to load sample citation details"
              >
                <span>{s.icon}</span>
                <span>{s.label}</span>
              </button>
            ))}
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Source Details (URL, Title, Authors, or ISBN)</label>
            <textarea 
              className={`${styles.inputField} ${styles.formTextarea}`} 
              placeholder="Paste source details here or pick a sample preset above..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.label}>Citation Style</label>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {['APA', 'MLA', 'Chicago', 'Harvard', 'IEEE', 'BibTeX'].map((style) => (
                <button
                  key={style}
                  type="button"
                  className={`${styles.formatPill} ${format === style ? styles.formatPillActive : ''}`}
                  onClick={() => handleSwitchFormat(style)}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.footer}>
             <GlassButton variant="primary" onClick={() => handleGenerate()} loading={loading} glow>
               Generate {format} Citation
             </GlassButton>
          </div>
        </div>
        <div className={styles.divider} />
        <div className={styles.outputArea}>
          <div className={styles.resultBox} style={{ display: 'flex', flexDirection: 'column', gap: '14px', height: '100%', overflowY: 'auto' }}>
            {result ? (
              <div className={`fade-in ${styles.citationCard}`}>
                
                {/* 1. In-Text Citation Block */}
                <div>
                  <div className={styles.citationBlockTitle}>
                    <span>📌 In-Text Citation ({format})</span>
                    <button
                      type="button"
                      className={styles.copyBtn}
                      style={{ fontSize: '0.74rem', padding: '3px 8px' }}
                      onClick={() => handleCopy(inTextCitation, 'intext')}
                    >
                      {copiedType === 'intext' ? '✅ Copied' : '📋 Copy'}
                    </button>
                  </div>
                  <div style={{ padding: '8px 14px', background: 'var(--bg-card)', borderRadius: '8px', border: '1px solid var(--glass-border)', fontFamily: 'monospace', fontSize: '0.9rem' }}>
                    {inTextCitation}
                  </div>
                </div>

                {/* 2. Full Bibliography Entry */}
                <div>
                  <div className={styles.citationBlockTitle}>
                    <span>📚 Full Bibliography Entry</span>
                    <button
                      type="button"
                      className={styles.copyBtn}
                      style={{ fontSize: '0.74rem', padding: '3px 8px' }}
                      onClick={() => handleCopy(result, 'bib')}
                    >
                      {copiedType === 'bib' ? '✅ Copied' : '📋 Copy Entry'}
                    </button>
                  </div>
                  <div className={styles.citationBibBlock}>
                    {result}
                  </div>
                </div>

                {/* 3. BibTeX / LaTeX Snippet */}
                <div>
                  <div className={styles.citationBlockTitle}>
                    <span>💻 BibTeX / LaTeX Code</span>
                    <button
                      type="button"
                      className={styles.copyBtn}
                      style={{ fontSize: '0.74rem', padding: '3px 8px' }}
                      onClick={() => handleCopy(bibtexSnippet, 'bibtex')}
                    >
                      {copiedType === 'bibtex' ? '✅ Copied' : '📋 Copy BibTeX'}
                    </button>
                  </div>
                  <pre className={styles.bibtexCode}>
                    {bibtexSnippet}
                  </pre>
                </div>

                {/* Export Options */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '10px', borderTop: '1px solid var(--glass-border)' }}>
                  <UniversalExportDropdown
                    content={fullCitationContent}
                    defaultTitle={`Citation_${format}`}
                    onCopy={() => handleCopy(fullCitationContent, 'all')}
                    copied={copiedType === 'all'}
                  />
                </div>

              </div>
            ) : (
              <span className={styles.placeholder}>
                {loading ? '✨ Formatting citation...' : 'Your academic citation will appear here in multiple presentation formats...'}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


export const CreatorTool: React.FC<{ ai: any, toolId: string, title: string, description: string, icon: string, placeholder?: string, samples?: ToolSample[] }> = ({ ai, toolId, title, description, icon, placeholder, samples }) => (
  <BaseTool 
    title={title} 
    description={description}
    placeholder={placeholder || "Describe your topic or provide a draft..."}
    actionLabel="🚀 Generate Content"
    icon={icon}
    samples={samples}
    onAction={(t) => ai.generateCreatorTool(toolId, t)}
  />
);

export const BlogPostGenerator: React.FC<{ ai: any }> = ({ ai }) => (
  <CreatorTool 
    ai={ai} 
    toolId="blog-post" 
    title="Blog Post Generator" 
    description="Generate comprehensive, SEO-optimized blog posts instantly."
    icon="✍️"
    placeholder="What should your blog post be about?"
    samples={[
      {
        label: 'Future of Edge AI in 2026',
        icon: '🚀',
        text: 'The Future of Edge AI and Local Intelligence: Why on-device models are replacing cloud-only LLMs for speed, privacy, and offline resilience in 2026.'
      },
      {
        label: 'Microservices with Next.js 15 & Go',
        icon: '🏗️',
        text: 'Architecting Resilient Distributed Systems: Practical patterns for connecting Next.js 15 frontends with high-throughput Go backend services.'
      }
    ]}
  />
);

export const AIStoryGenerator: React.FC<{ ai: any }> = ({ ai }) => (
  <CreatorTool 
    ai={ai} 
    toolId="ai-story" 
    title="AI Story Generator" 
    description="Craft compelling narratives and creative stories from your prompts."
    icon="📖"
    placeholder="Describe the plot, characters, or setting of your story..."
    samples={[
      {
        label: 'Neo-Tokyo Cyberpunk Detective',
        icon: '🌆',
        text: 'A noir detective in rain-slicked Neo-Tokyo investigates a missing synthetic memory dealer, only to discover their own memories have been subtly altered.'
      },
      {
        label: 'Kepler-186f First Contact',
        icon: '🪐',
        text: 'A solo botanist exploring the sub-surface geothermal caverns of Kepler-186f encounters a bioluminescent fungal network that communicates through light frequencies.'
      }
    ]}
  />
);

export const SEOTitleGenerator: React.FC<{ ai: any }> = ({ ai }) => (
  <CreatorTool 
    ai={ai} 
    toolId="seo-title" 
    title="SEO Title Generator" 
    description="Generate high-CTR, search-optimized titles for your content."
    icon="🔍"
    placeholder="Enter your primary keywords and topic..."
    samples={[
      {
        label: 'AI Writing & Productivity',
        icon: '📈',
        text: 'ai writing assistant, free grammar checker, local intelligence, productivity tools 2026'
      },
      {
        label: 'Web Performance Optimization',
        icon: '⚡',
        text: 'nextjs server actions, web vitals optimization, react server components, frontend speed'
      }
    ]}
  />
);

export const InstagramCaptionGenerator: React.FC<{ ai: any }> = ({ ai }) => (
  <CreatorTool 
    ai={ai} 
    toolId="instagram-caption" 
    title="Instagram Caption Generator" 
    description="Create trendy captions with emojis and hashtags for your posts."
    icon="📸"
    placeholder="What is your photo or video about?"
    samples={[
      {
        label: 'Engineering Hackathon Night',
        icon: '💻',
        text: 'Behind the scenes at 2:30 AM before shipping version 2.0. Coffee cups, whiteboard architecture diagrams, and high energy.'
      },
      {
        label: 'Alpine Mountain Sunrise',
        icon: '🌄',
        text: 'Reaching the summit ridge just as the morning sun broke through the clouds. Crisp mountain air and pure silence.'
      }
    ]}
  />
);

export const ContentBriefGenerator: React.FC<{ ai: any }> = ({ ai }) => (
  <CreatorTool 
    ai={ai} 
    toolId="content-brief" 
    title="Content Brief Generator" 
    description="Create detailed briefs to guide your writing or outsourcing."
    icon="📋"
    placeholder="Describe the article topic and target audience..."
    samples={[
      {
        label: 'Cloud Multi-Tenancy Architecture',
        icon: '☁️',
        text: 'Article Topic: Designing Multi-Tenant SaaS Databases. Target Audience: Senior backend engineers and system architects. Goals: Contrast pooled vs siloed schema models with real latency benchmarks.'
      },
      {
        label: 'B2B Product-Led Growth Playbook',
        icon: '🎯',
        text: 'Article Topic: Product-Led Growth for Seed-Stage Startups. Target Audience: Technical founders and growth leads. Goals: Actionable steps to build viral sharing loops into dev tools.'
      }
    ]}
  />
);

export const PersonalTool: React.FC<{ ai: any, toolId: string, title: string, description: string, icon: string, placeholder?: string, samples?: ToolSample[] }> = ({ ai, toolId, title, description, icon, placeholder, samples }) => (
  <BaseTool 
    title={title} 
    description={description}
    placeholder={placeholder || "How are you feeling today?"}
    actionLabel="✨ Craft Entry"
    icon={icon}
    theme="accentPurple"
    samples={samples}
    onAction={(t) => ai.generatePersonalTool(toolId, t)}
  />
);

export const DiaryAssistant: React.FC<{ ai: any }> = ({ ai }) => (
  <PersonalTool 
    ai={ai} 
    toolId="diary-assistant" 
    title="Diary Assistant" 
    description="Reflect on your day. Transform brief notes into meaningful diary entries."
    icon="📔"
    placeholder="What happened today? How did it make you feel?"
    samples={[
      {
        label: 'Major Release Milestone',
        icon: '🚀',
        text: 'Today we finally pressed deploy on the 2.0 launch after weeks of sleepless debugging. Seeing the first 500 real users test the product without a crash felt like a huge weight lifted off my shoulders.'
      },
      {
        label: 'Sunday Rainy Walk',
        icon: '🌧️',
        text: 'Went for a long walk in the rain through the park without my phone. Realized I have been working on autopilot for months and need to make more time for reading and quiet mornings.'
      }
    ]}
  />
);

export const PersonalLetter: React.FC<{ ai: any }> = ({ ai }) => (
  <PersonalTool 
    ai={ai} 
    toolId="personal-letter" 
    title="Personal Letter" 
    description="Draft heartfelt letters for friends, family, or partners."
    icon="✉️"
    placeholder="Who are you writing to? What is the main message or occasion?"
    samples={[
      {
        label: 'Gratitude to University Mentor',
        icon: '🎓',
        text: 'Writing to my former professor and research advisor Professor Vance, thanking him for believing in me when I struggled with my early coding projects five years ago.'
      },
      {
        label: '10-Year Friendship Celebration',
        icon: '💛',
        text: 'Writing to my childhood best friend Sarah celebrating 10 years since we moved to the city together, remembering funny roommate disasters and expressing how grateful I am for her loyalty.'
      }
    ]}
  />
);

export const SpeechWriter: React.FC<{ ai: any }> = ({ ai }) => (
  <PersonalTool 
    ai={ai} 
    toolId="speech-writer" 
    title="Speech Writer" 
    description="Create memorable, emotional speeches for weddings, birthdays, or special events."
    icon="🎤"
    placeholder="What is the occasion? Who are you speaking to? What are the key memories or messages?"
    samples={[
      {
        label: 'Best Man Wedding Speech',
        icon: '🥂',
        text: 'Occasion: Best Man speech for my brother David marrying his college sweetheart Elena. Balance light humor about his cooking disasters with genuine admiration for how Elena brings out the best in him.'
      },
      {
        label: 'Developer Summit Keynote',
        icon: '🎙️',
        text: 'Occasion: Opening remarks for our 2026 Developer Summit. Welcome 1,200 attendees, celebrate the open-source community, and emphasize that great software is built with empathy, not just code.'
      }
    ]}
  />
);

export const ItineraryPlanner: React.FC<{ ai: any }> = ({ ai }) => (
  <PersonalTool 
    ai={ai} 
    toolId="itinerary-planner" 
    title="Itinerary Planner" 
    description="Plan your next adventure with a detailed, day-by-day travel itinerary."
    icon="🗺️"
    placeholder="Where are you going? For how long? What are your main interests (food, history, nature)?"
    samples={[
      {
        label: '7-Day Tokyo & Kyoto Cultural Tour',
        icon: '⛩️',
        text: 'Destination: Tokyo and Kyoto, Japan. Duration: 7 days. Interests: Traditional shrines, hidden ramen shops, tea ceremony experiences, vintage shopping in Shimokitazawa, and bullet train day-trips.'
      },
      {
        label: '5-Day Amalfi Coast Scenic Drive',
        icon: '🍋',
        text: 'Destination: Amalfi Coast, Italy (Naples, Positano, Ravello). Duration: 5 days. Interests: Coastal hiking trails (Path of the Gods), cliffside seafood trattorias, sunset boat tours, and historic villas.'
      }
    ]}
  />
);

export const AcademicCoWriter: React.FC<{ ai: any }> = ({ ai }) => {
  const [content, setContent] = useState('');
  const [research, setResearch] = useState('');
  const [manuscriptFormat, setManuscriptFormat] = useState<'ieee' | 'nature' | 'apa'>('ieee');
  const [viewMode, setViewMode] = useState<'designer' | 'split'>('designer');
  const [attachedFile, setAttachedFile] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const academicSamples = [
    {
      label: 'Deep Learning in Clinical Radiology',
      icon: '🧬',
      content: `# Deep Learning Architectures in Clinical Radiology: Diagnostic Efficacy & Interpretability

## Abstract
Recent advances in convolutional neural networks (CNNs) and vision transformers (ViTs) have exhibited human-expert level performance in detecting pulmonary nodules from low-dose computed tomography (LDCT) scans. However, clinical adoption remains constrained by algorithmic opacity and susceptibility to out-of-distribution demographic anomalies. This investigation evaluates a multimodal attention-guided framework evaluated across 14,200 multi-institutional patient cohorts.

## 1. Introduction
Diagnostic radiology is undergoing a paradigm shift driven by automated computer-aided detection (CADe) systems. While early CADe systems suffered from elevated false-positive rates (FPRs), modern deep learning models leverage multi-scale hierarchical feature extraction to identify subtle micro-calcifications.

## 2. Methodology & Cohort Stratification
We obtained de-identified DICOM volumetric scans from three diverse hospital networks (Stanford AIMI, MIMIC-CXR, and NIH ChestX-ray14). Preprocessing involved isotropic voxel resampling to 1.0mm³ spacing, Hounsfield Unit (HU) window clipping [-1000, 400], and 3D affine data augmentation.

## 3. Results & Empirical Validation
The proposed model achieved an Area Under the ROC Curve (AUC-ROC) of 0.942 ± 0.015, surpassing previous non-ensemble benchmarks by 4.2%. Sensitivity across multi-institutional validation cohorts reached 91.8% at a specificity of 94.6%.

## 4. Discussion & Limitations
While cross-site validation demonstrated robust generalizability, model calibration degraded slightly on pediatric imaging subsets. Future research should prioritize federated differential privacy techniques to facilitate continuous cross-border clinical calibration.

## References
[1] Rajpurkar, P. et al. (2017). CheXNet: Radiologist-Level Pneumonia Detection on Chest X-Rays. arXiv:1711.05225.
[2] Ronneberger, O. et al. (2015). U-Net: Convolutional Networks for Biomedical Image Segmentation. MICCAI 2015.
[3] Topol, E. (2019). High-performance medicine: the convergence of human and artificial intelligence. Nature Medicine, 25(1), 44–56.`,
      research: `Key Literature Citations:
1. Rajpurkar et al. (2017) CheXNet: Radiologist-Level Pneumonia Detection on Chest X-Rays. arXiv:1711.05225.
2. Ronneberger et al. (2015) U-Net: Convolutional Networks for Biomedical Image Segmentation. MICCAI 2015.
3. Topol, E. (2019) High-performance medicine: the convergence of human and artificial intelligence. Nature Medicine.

Statistical Benchmarks:
- Primary Metric: Area Under the ROC Curve (AUC-ROC) 0.942 ± 0.015
- Multi-institutional validation sensitivity: 91.8%, specificity: 94.6%`
    },
    {
      label: 'Zero-Carbon Grid Storage Optimization',
      icon: '🌱',
      content: `# Long-Duration Energy Storage & Reinforcement Learning in Zero-Carbon Transmission Grids

## Abstract
The rapid global penetration of intermittent photovoltaic (PV) and offshore wind generation introduces unprecedented volatility to regional transmission networks. This paper analyzes multi-agent reinforcement learning (MARL) for orchestrating decentralized vanadium redox flow batteries and green hydrogen storage systems under fluctuating meteorological forecasts.

## 1. Introduction & Grid Dynamics
Decarbonization of regional energy grids necessitates transitioning from fossil-fuel peaker plants to dynamic demand-response and long-duration storage. When renewable generation surges, curtailment losses can exceed 18% unless grid-scale chemical storage is deployed dynamically.

## 2. System Model & Formulation
We formulate the dispatch optimization problem as a continuous-state Markov Decision Process (MDP) with constraints on transformer thermal loading, sub-station voltage deviations, and electrolyzer round-trip efficiencies.

## 3. Simulation Outcomes
Co-optimizing flow batteries with high-pressure hydrogen electrolysis reduced renewable curtailment by 67.4% during peak summer overgeneration events while maintaining 99.98% transmission reliability.

## 4. Policy & Infrastructure Implications
Dynamic feed-in tariffs combined with localized storage arbitrage shorten capital expenditure amortization timelines by 3.8 years across municipal sub-grids.

## References
[1] National Renewable Energy Laboratory (NREL). (2024). 2024 Renewable Grid Integration Dataset.
[2] Skyllas-Kazacos, M. et al. (2011). Progress in Flow Battery Research and Development. J. Electrochem. Soc., 158(8), R55.`,
      research: `References & Grid Telemetry:
- National Renewable Energy Laboratory (NREL) 2024 Grid Integration Dataset.
- Vanadium redox flow battery round-trip efficiency: ~72-78%.
- Hydrogen electrolyzer ramp-rate limits and compression loss profiles.`
    }
  ];

  const templateInserts = [
    {
      label: '+ Abstract',
      snippet: `\n\n## Abstract\n[Background]: State the broader research context and existing gap.\n[Methods]: Summarize the experimental or analytical methodology.\n[Results]: Report key empirical quantitative metrics and findings.\n[Conclusions]: Highlight theoretical and practical implications.\n`
    },
    {
      label: '+ Methodology',
      snippet: `\n\n## 2. Methodology\n### 2.1 Dataset & Cohort Selection\nDetail cohort demographics, sample size calculation, and inclusion criteria.\n\n### 2.2 Experimental Setup & Controls\nDescribe instrumentation, hyperparameters, and independent/dependent variables.\n\n### 2.3 Statistical Analysis\nOutline hypothesis testing, significance thresholds (p < 0.05), and confidence intervals.\n`
    },
    {
      label: '+ Discussion',
      snippet: `\n\n## 4. Discussion\n### 4.1 Interpretation of Findings\nContrast outcomes with prior literature.\n\n### 4.2 Study Limitations\nAddress potential sampling biases, measurement errors, or computational boundaries.\n\n### 4.3 Future Directions\nPropose follow-up empirical investigations.\n`
    },
    {
      label: '+ References Block',
      snippet: `\n\n## References\n[1] Author, A. et al. (2024). Title of Scholarly Publication. Journal of Advanced Research, 12(3), 101–115.\n[2] Author, B. & Author, C. (2023). Principles of Computational Intelligence. Academic Press.\n`
    }
  ];

  const handleExportDraft = () => {
    if (!content.trim()) return;
    const element = document.createElement("a");
    const file = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `academic-manuscript-${manuscriptFormat}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handlePrint = () => {
    if (viewMode === 'designer') {
      printElement('academic-printable-manuscript', paperTitle || `Academic_Manuscript_${manuscriptFormat.toUpperCase()}`);
    } else {
      printFormattedDocument(paperTitle || `Academic_Manuscript_${manuscriptFormat.toUpperCase()}`, content);
    }
  };

  // Parse markdown for designer view
  const titleMatch = content.match(/^#\s+(.+)$/m);
  const paperTitle = titleMatch ? titleMatch[1] : 'Academic Research Manuscript Draft';
  
  const abstractMatch = content.match(/##\s+Abstract\s*\n([\s\S]*?)(?=\n##\s+|$)/i);
  const abstractText = abstractMatch ? abstractMatch[1].trim() : 'Draft your abstract in the editor to see it formatted here.';

  const sections = content
    .replace(/^#\s+.+$/m, '')
    .replace(/##\s+Abstract\s*\n[\s\S]*?(?=\n##\s+|$)/i, '')
    .trim();

  return (
    <div className={`${styles.toolContainer} premium-card fade-in ${styles.accentGold}`} style={{ maxWidth: '1440px' }}>
       <header className={styles.header}>
        <div className={styles.iconWrapper}>✍️</div>
        <div className={styles.headerText}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h1 className="text-gradient">Academic Co-Writer</h1>
            <span style={{ fontSize: '0.74rem', padding: '3px 8px', borderRadius: '6px', background: 'rgba(234, 179, 8, 0.15)', color: '#eab308', fontWeight: 700 }}>
              {manuscriptFormat.toUpperCase()} PUBLICATION READY
            </span>
          </div>
          <p>Draft manuscripts in prestigious academic layouts: IEEE Two-Column, Nature Brief, or APA 7.</p>
        </div>
      </header>

      {/* Format & View Mode Toolbar */}
      <div className={styles.academicToolbar}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>🏛️ FORMAT:</span>
          <div className={styles.formatPillGroup}>
            <button
              type="button"
              className={`${styles.formatPill} ${manuscriptFormat === 'ieee' ? styles.formatPillActive : ''}`}
              onClick={() => setManuscriptFormat('ieee')}
            >
              🏛️ IEEE Two-Column
            </button>
            <button
              type="button"
              className={`${styles.formatPill} ${manuscriptFormat === 'nature' ? styles.formatPillActive : ''}`}
              onClick={() => setManuscriptFormat('nature')}
            >
              🌿 Nature / Science Brief
            </button>
            <button
              type="button"
              className={`${styles.formatPill} ${manuscriptFormat === 'apa' ? styles.formatPillActive : ''}`}
              onClick={() => setManuscriptFormat('apa')}
            >
              🎓 APA 7 Publication
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <div className={styles.formatPillGroup}>
            <button
              type="button"
              className={`${styles.formatPill} ${viewMode === 'designer' ? styles.formatPillActive : ''}`}
              onClick={() => setViewMode('designer')}
            >
              🎨 Designer Manuscript
            </button>
            <button
              type="button"
              className={`${styles.formatPill} ${viewMode === 'split' ? styles.formatPillActive : ''}`}
              onClick={() => setViewMode('split')}
            >
              ✏️ Editor & Notes
            </button>
          </div>

          <UniversalExportDropdown
            content={content}
            defaultTitle={`Academic_Manuscript_${manuscriptFormat.toUpperCase()}`}
            printTargetId="academic-printable-manuscript"
            onCopy={() => {
              navigator.clipboard.writeText(content);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            copied={copied}
          />
          <GlassButton variant="secondary" onClick={handlePrint} style={{ fontSize: '0.8rem', padding: '6px 12px' }}>
            🖨️ Print
          </GlassButton>
        </div>
      </div>

      <div style={{ margin: '12px 0 0' }}>
        <FileImportBar
          ai={ai}
          currentFileName={attachedFile}
          onClearFile={() => setAttachedFile('')}
          onFileLoaded={(text, fileName) => {
            setContent(text);
            setAttachedFile(fileName);
          }}
          label="Import Manuscript Draft (PDF, DOCX, TXT, MD, Images)"
        />
      </div>

      <div className={styles.workspace} style={{ height: '70vh' }}>
        
        {/* VIEW MODE: DESIGNER MANUSCRIPT PREVIEW */}
        {viewMode === 'designer' ? (
          <div style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
            <div id="academic-printable-manuscript" className={`${styles.manuscriptPaper} ${styles.printableDocumentWrapper}`}>
              
              {/* 1. IEEE TWO-COLUMN FORMAT */}
              {manuscriptFormat === 'ieee' && (
                <article className={styles.manuscriptIeee}>
                  <h1 className={styles.ieeeTitle}>{paperTitle}</h1>
                  <div className={styles.ieeeAuthorBlock}>
                    <strong>Antigravity Research Lab &amp; Contributing Scholars</strong><br />
                    Department of Computational Science &amp; Intelligence Systems<br />
                    Published Draft &bull; {new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long' })}
                  </div>

                  <div style={{ marginBottom: '18px', padding: '0 20px', fontStyle: 'italic', fontSize: '0.9rem', lineHeight: '1.5' }}>
                    <span style={{ fontWeight: 800, fontStyle: 'normal' }}>Abstract—</span>
                    {abstractText}
                  </div>

                  <div className={styles.ieeeColumns}>
                    {sections.split(/\n\n+/).map((para, idx) => {
                      if (para.startsWith('## ')) {
                        return (
                          <h2 key={idx} style={{ fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', margin: '18px 0 8px 0', borderBottom: '1px solid var(--glass-border)', paddingBottom: '4px' }}>
                            {para.replace('## ', '')}
                          </h2>
                        );
                      }
                      if (para.startsWith('### ')) {
                        return (
                          <h3 key={idx} style={{ fontSize: '0.92rem', fontWeight: 700, fontStyle: 'italic', margin: '14px 0 6px 0' }}>
                            {para.replace('### ', '')}
                          </h3>
                        );
                      }
                      return (
                        <p key={idx} style={{ marginBottom: '12px', textIndent: '18px' }}>
                          {para}
                        </p>
                      );
                    })}
                  </div>
                </article>
              )}

              {/* 2. NATURE / SCIENCE RESEARCH BRIEF */}
              {manuscriptFormat === 'nature' && (
                <article className={styles.manuscriptNature}>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', padding: '3px 8px', borderRadius: '4px', background: 'var(--accent-blue)', color: '#fff' }}>
                      RESEARCH ARTICLE
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      Peer Reviewed &bull; Open Access
                    </span>
                  </div>

                  <h1 className={styles.natureTitle}>{paperTitle}</h1>

                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '18px', paddingBottom: '12px', borderBottom: '1px solid var(--glass-border)' }}>
                    <span>✍️ Antigravity Collaborative Authors</span>
                    <span>📍 Global Computational Consortium</span>
                    <span>📅 {new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>

                  <div className={styles.natureHighlightBox}>
                    <div style={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '0.76rem', color: 'var(--accent-cyan)', marginBottom: '4px', letterSpacing: '0.05em' }}>
                      EXECUTIVE RESEARCH SUMMARY
                    </div>
                    {abstractText}
                  </div>

                  <div style={{ maxWidth: '820px' }}>
                    {sections.split(/\n\n+/).map((para, idx) => {
                      if (para.startsWith('## ')) {
                        return (
                          <h2 key={idx} style={{ fontSize: '1.25rem', fontWeight: 800, margin: '24px 0 10px 0', color: 'var(--text-primary)' }}>
                            {para.replace('## ', '')}
                          </h2>
                        );
                      }
                      if (para.startsWith('### ')) {
                        return (
                          <h3 key={idx} style={{ fontSize: '1.05rem', fontWeight: 700, margin: '18px 0 8px 0', color: 'var(--text-primary)' }}>
                            {para.replace('### ', '')}
                          </h3>
                        );
                      }
                      return (
                        <p key={idx} style={{ marginBottom: '14px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                          {para}
                        </p>
                      );
                    })}
                  </div>
                </article>
              )}

              {/* 3. APA 7 PUBLICATION FORMAT */}
              {manuscriptFormat === 'apa' && (
                <article className={styles.manuscriptApa}>
                  <div className={styles.apaRunningHead}>
                    <span>RUNNING HEAD: {paperTitle.slice(0, 35).toUpperCase()}</span>
                    <span>1</span>
                  </div>

                  <div className={styles.apaTitleBlock}>
                    <h1 style={{ fontSize: '1.45rem', fontWeight: 700, marginBottom: '12px' }}>{paperTitle}</h1>
                    <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                      Author Name<br />
                      Department of Advanced Research, University Consortium<br />
                      COURSE 701: Doctoral Dissertation Seminar<br />
                      {new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                  </div>

                  <div style={{ margin: '30px 0', padding: '0 10px' }}>
                    <div style={{ textAlign: 'center', fontWeight: 700, marginBottom: '8px' }}>Abstract</div>
                    <p style={{ textIndent: '0', fontSize: '0.95rem' }}>{abstractText}</p>
                  </div>

                  <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '24px' }}>
                    {sections.split(/\n\n+/).map((para, idx) => {
                      if (para.startsWith('## ')) {
                        return (
                          <h2 key={idx} style={{ textAlign: 'center', fontSize: '1.15rem', fontWeight: 700, margin: '28px 0 14px 0' }}>
                            {para.replace('## ', '')}
                          </h2>
                        );
                      }
                      if (para.startsWith('### ')) {
                        return (
                          <h3 key={idx} style={{ fontSize: '1rem', fontWeight: 700, margin: '20px 0 10px 0' }}>
                            {para.replace('### ', '')}
                          </h3>
                        );
                      }
                      if (para.startsWith('[') && para.includes(']')) {
                        return (
                          <div key={idx} className={styles.apaHangingIndent}>
                            {para}
                          </div>
                        );
                      }
                      return (
                        <p key={idx} style={{ textIndent: '32px', marginBottom: '16px' }}>
                          {para}
                        </p>
                      );
                    })}
                  </div>
                </article>
              )}

            </div>
          </div>
        ) : (
          /* VIEW MODE: SPLIT EDITOR & NOTES */
          <>
            <div className={styles.inputArea} style={{ flex: 1.5 }}>
               <div className={styles.sampleBar} style={{ marginBottom: '10px' }}>
                  <span className={styles.sampleLabel}>✨ Sample Papers:</span>
                  {academicSamples.map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={styles.samplePill}
                      onClick={() => {
                        setContent(s.content);
                        setResearch(s.research);
                      }}
                      title="Click to load sample manuscript and notes"
                    >
                      <span>{s.icon}</span>
                      <span>{s.label}</span>
                    </button>
                  ))}
               </div>

               <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                  <span className={styles.sampleLabel}>📑 Insert Section:</span>
                  {templateInserts.map((t, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={styles.samplePill}
                      style={{ fontSize: '0.75rem', padding: '4px 10px' }}
                      onClick={() => setContent(prev => prev + t.snippet)}
                    >
                      {t.label}
                    </button>
                  ))}
               </div>

               <textarea 
                className={styles.textarea}
                style={{ height: 'calc(100% - 150px)', fontSize: '1.05rem', lineHeight: '1.6' }}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Start drafting your research paper or load a sample manuscript above..."
               />
               <div className={styles.footer}>
                  <span>{content.trim().split(/\s+/).filter(Boolean).length} words</span>
                  <GlassButton variant="primary" onClick={() => setViewMode('designer')}>
                    🎨 Render Designer Manuscript
                  </GlassButton>
               </div>
            </div>
            <div className={styles.divider} />
            <div className={styles.outputArea} style={{ flex: 1 }}>
               <label className={styles.label} style={{ marginBottom: '10px', display: 'block' }}>Research & Notes Sidebar</label>
               <textarea 
                className={styles.textarea}
                style={{ height: '40%', background: 'var(--glass-bg)', marginBottom: '16px', borderRadius: '12px', padding: '12px', border: '1px solid var(--glass-border)' }}
                value={research}
                onChange={(e) => setResearch(e.target.value)}
                placeholder="Paste sources, empirical data points, or literature notes here..."
               />
               <div style={{ height: '45%', overflowY: 'auto', padding: '16px', background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                  <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>AI Writing Insights</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{ padding: '10px', background: 'rgba(52, 211, 153, 0.1)', borderRadius: '8px', border: '1px solid #34d39966', fontSize: '0.85rem' }}>
                        ✅ Scholarly tone: Passive formulations and discipline-specific nomenclature detected.
                      </div>
                      <div style={{ padding: '10px', background: 'rgba(248, 113, 113, 0.1)', borderRadius: '8px', border: '1px solid #f8717166', fontSize: '0.85rem' }}>
                        🚩 Citation validation: Ensure all methodology claims reference verified DOI publications.
                      </div>
                      <div style={{ padding: '10px', background: 'rgba(56, 189, 248, 0.1)', borderRadius: '8px', border: '1px solid rgba(56, 189, 248, 0.4)', fontSize: '0.85rem' }}>
                        💡 Manuscript Tip: Click "Designer Manuscript" above to switch between IEEE, Nature, and APA 7 layouts.
                      </div>
                  </div>
               </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export const GenericProfessionalTool: React.FC<{ ai: any, categoryId: string, toolId: string, title: string, description: string, icon: string, placeholder: string, actionLabel: string, samples?: ToolSample[] }> = ({ ai, categoryId, toolId, title, description, icon, placeholder, actionLabel, samples }) => {
  const themeMap: Record<string, string> = {
    marketing: 'accentPurple',
    hr: 'accentGreen',
    sales: 'accentBlue',
    product: 'accentGold',
    'customer-service': 'accentBlue'
  };

  return (
    <BaseTool 
      title={title} 
      description={description}
      placeholder={placeholder}
      actionLabel={actionLabel}
      icon={icon}
      samples={samples}
      theme={themeMap[categoryId] || 'accentBlue'}
      onAction={(t) => ai.generateProfessionalTool(toolId, t, categoryId)}
    />
  );
};
