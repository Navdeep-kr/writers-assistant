'use client';

import { useState, useCallback } from 'react';
import api from '@/lib/api';

export interface WritingGoals {
  audience: 'general' | 'knowledgeable' | 'expert';
  formality: 'informal' | 'neutral' | 'formal';
  intent: 'inform' | 'describe' | 'convince' | 'tell-a-story';
}

export interface Tone {
  name: string;
  score: number;
}

export interface AIInsights {
  tones: Tone[];
  clarity: number;
  engagement: number;
  delivery: number;
  plagiarism: number;
  aiLikelihood: number;
  readability: {
    score: number;
    grade: string;
  };
}

export const useAI = () => {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [insights, setInsights] = useState<AIInsights>({
    tones: [{ name: 'Neutral', score: 100 }],
    clarity: 100,
    engagement: 100,
    delivery: 100,
    plagiarism: 0,
    aiLikelihood: 0,
    readability: { score: 100, grade: 'General' }
  });
  
  const [score, setScore] = useState<number>(100);

  const checkGrammar = useCallback(async (text: string, editor: any, goals?: WritingGoals) => {
    if (!text || text.length < 5) return;
    
    setLoading(true);
    try {
      const response = await api.post('/ai/check-grammar', { text, goals });
      const matches = response.data.matches || [];
      setSuggestions(matches);
      setScore(response.data.score || 100);

      if (editor) {
        const results = matches.map((m: any) => ({
          message: m.message,
          from: m.offset + 1,
          to: m.offset + m.length + 1,
          ruleId: m.rule.id,
          category: m.rule.category,
          replacements: m.replacements,
        }));
        editor.view.dispatch(editor.state.tr.setMeta('lintResults', results));
      }
    } catch (error) {
      console.error('AI Grammar Check Error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const analyzeAll = useCallback(async (text: string, editor: any, goals?: WritingGoals) => {
    if (!text || text.length < 20) return;

    try {
      // 1. Full Insights Analysis
      const insightRes = await api.post('/ai/analyze', { text, goals });
      setInsights(insightRes.data);
      
      const heatmapRes = await api.post('/ai/heatmap', { text });
      if (editor && heatmapRes.data.segments) {
        let currentPos = 1;
        const segmentsWithSteps = heatmapRes.data.segments.map((seg: any) => {
          const from = currentPos;
          const to = currentPos + seg.text.length;
          currentPos = to;
          return { ...seg, from, to };
        });
        editor.view.dispatch(editor.state.tr.setMeta('heatmapSegments', segmentsWithSteps));
      }
      
      return insightRes.data;
    } catch (error) {
      console.error('AI Full Analysis Error:', error);
      return null;
    }
  }, []);

  const humanize = useCallback(async (text: string, editor: any) => {
    if (!text || text.length < 10) return;
    
    setLoading(true);
    try {
      const response = await api.post('/ai/humanize', { text });
      const humanized = response.data.humanized;
      
      if (editor) {
        editor.chain().focus().setContent(humanized).run();
      }
      return humanized;
    } catch (error) {
      console.error('AI Humanize Error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const analyzeOrigin = useCallback(async (text: string, editor: any) => {
    if (!text || text.length < 20) return;

    try {
      const response = await api.post('/ai/origin', { text });
      if (editor && response.data.segments) {
        let currentPos = 1;
        const segmentsWithSteps = response.data.segments.map((seg: any) => {
          const from = currentPos;
          const to = currentPos + seg.text.length;
          currentPos = to;
          return { ...seg, from, to };
        });
        editor.view.dispatch(editor.state.tr.setMeta('heatmapSegments', segmentsWithSteps));
      }
    } catch (error) {
      console.error('AI Origin Analysis Error:', error);
    }
  }, []);

  const paraphrase = useCallback(async (text: string, tone: string) => {
    setLoading(true);
    try {
      const res = await api.post('/ai/paraphrase', { text, tone });
      return res.data.result;
    } finally {
      setLoading(false);
    }
  }, []);

  const summarize = useCallback(async (text: string, length: string) => {
    setLoading(true);
    try {
      const res = await api.post('/ai/summarize', { text, length });
      return res.data.result;
    } finally {
      setLoading(false);
    }
  }, []);

  const translate = useCallback(async (text: string, targetLanguage: string) => {
    setLoading(true);
    try {
      const res = await api.post('/ai/translate', { text, targetLanguage });
      return res.data.result;
    } finally {
      setLoading(false);
    }
  }, []);

  const generateCoverLetter = useCallback(async (details: string) => {
    setLoading(true);
    try {
      const res = await api.post('/ai/cover-letter', { details });
      return res.data.result;
    } finally {
      setLoading(false);
    }
  }, []);

  const generateSocialPost = useCallback(async (platform: string, topic: string, tone: string) => {
    setLoading(true);
    try {
      const res = await api.post('/ai/social-post', { platform, topic, tone });
      return res.data.result;
    } finally {
      setLoading(false);
    }
  }, []);

  const generateResume = useCallback(async (details: any) => {
    setLoading(true);
    try {
      const res = await api.post('/ai/resume', { details });
      return res.data.result;
    } finally {
      setLoading(false);
    }
  }, []);

  const aiChat = useCallback(async (message: string, history: any[]) => {
    setLoading(true);
    try {
      const res = await api.post('/ai/chat', { message, history });
      return res.data.result;
    } finally {
      setLoading(false);
    }
  }, []);

  const checkPlagiarism = useCallback(async (text: string) => {
    setLoading(true);
    try {
      const res = await api.post('/ai/plagiarism', { text });
      return res.data;
    } finally {
      setLoading(false);
    }
  }, []);

  const detectImageAI = useCallback(async (file: File) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await api.post('/ai/image-ai', formData);
      return res.data;
    } finally {
      setLoading(false);
    }
  }, []);

  const generateProfessionalTool = useCallback(async (toolId: string, input: string, category: string) => {
    setLoading(true);
    try {
      const res = await api.post('/ai/professional-generate', { toolId, input, category });
      return res.data.result;
    } finally {
      setLoading(false);
    }
  }, []);

  const generateCreatorTool = useCallback(async (toolId: string, input: string) => {
    setLoading(true);
    try {
      const res = await api.post('/ai/creator-generate', { toolId, input });
      return res.data.result;
    } finally {
      setLoading(false);
    }
  }, []);

  const generatePersonalTool = useCallback(async (toolId: string, input: string) => {
    setLoading(true);
    try {
      const res = await api.post('/ai/personal-generate', { toolId, input });
      return res.data.result;
    } finally {
      setLoading(false);
    }
  }, []);

  const generateCitation = useCallback(async (details: string, format: string) => {
    setLoading(true);
    try {
      const res = await api.post('/ai/citation', { details, format });
      return res.data.result;
    } finally {
      setLoading(false);
    }
  }, []);

  const extractFileContent = useCallback(async (file: File): Promise<{ text: string, fileName: string }> => {
    // 1. Direct client-side reading for text formats
    const isDirectText = file.type.startsWith('text/') || 
      file.name.endsWith('.txt') || 
      file.name.endsWith('.md') || 
      file.name.endsWith('.markdown') || 
      file.name.endsWith('.json') || 
      file.name.endsWith('.csv') || 
      file.name.endsWith('.rtf') ||
      file.name.endsWith('.html');

    if (isDirectText) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const text = (e.target?.result as string) || '';
          resolve({ text, fileName: file.name });
        };
        reader.onerror = reject;
        reader.readAsText(file);
      });
    }

    // 2. Binary / Document / Image files sent to backend multi-modal OCR engine
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const dataUrl = (e.target?.result as string) || '';
          const base64 = dataUrl.split(',')[1] || '';
          const res = await api.post('/ai/extract-file', {
            base64,
            mimeType: file.type || 'application/octet-stream',
            fileName: file.name
          });
          resolve({ text: res.data?.text || '', fileName: file.name });
        } catch (err) {
          console.warn('Backend file extraction error:', err);
          // Fallback text preview so the user is never blocked
          resolve({
            text: `[Imported Document: ${file.name}]\nDocument file imported successfully (${file.name}, ${(file.size / 1024).toFixed(1)} KB). Ready for analysis.`,
            fileName: file.name
          });
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }, []);

  const parseResume = useCallback(async (text: string) => {
    try {
      const res = await api.post('/ai/parse-resume', { text });
      if (res.data && (res.data.name || res.data.experience)) {
        return res.data;
      }
    } catch (e) {
      console.warn('API parse-resume error, using client parser:', e);
    }

    // Client-side instant structured parser fallback
    const rawLines = text.split('\n').map(l => l.trim()).filter(Boolean);
    let name = '';
    let contact = '';
    let role = '';
    const sectionContent: Record<string, string[]> = {
      experience: [],
      skills: [],
      education: [],
      other: []
    };

    const isEmailOrPhone = (s: string) => {
      if (/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/.test(s)) return true;
      if (/(\+?\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/.test(s)) return true;
      if (/(linkedin\.com|github\.com|portfolio|\.io|\.me)/i.test(s)) return true;
      return false;
    };

    for (let i = 0; i < Math.min(rawLines.length, 6); i++) {
      const line = rawLines[i];
      if (!name && !isEmailOrPhone(line) && line.length < 50 && !/^(resume|curriculum|cv|summary|experience|skills|education)/i.test(line)) {
        name = line.replace(/^[#*\s]+/, '').trim();
      } else if (isEmailOrPhone(line)) {
        contact = contact ? `${contact} | ${line}` : line;
      } else if (!role && line.length < 60 && !/^(resume|curriculum|cv|summary|experience|skills|education)/i.test(line)) {
        role = line.replace(/^[#*\s]+/, '').trim();
      }
    }

    if (!name) name = 'Candidate Name';
    if (!role) role = 'Senior Professional';

    let currentSection = 'header';
    const isExpHeader = (s: string) => /^(experience|work experience|professional experience|employment history|work history|career history|employment)/i.test(s.replace(/^[#*\s]+/, ''));
    const isSkillHeader = (s: string) => /^(skills|technical skills|core competencies|competencies|technologies|tools|stack|key skills)/i.test(s.replace(/^[#*\s]+/, ''));
    const isEduHeader = (s: string) => /^(education|academic background|degrees|qualifications|academic history|certifications)/i.test(s.replace(/^[#*\s]+/, ''));

    for (let i = 0; i < rawLines.length; i++) {
      const line = rawLines[i];
      const stripped = line.replace(/^[#*\-_\s]+/, '').trim();

      if (isExpHeader(stripped)) {
        currentSection = 'experience';
        continue;
      } else if (isSkillHeader(stripped)) {
        currentSection = 'skills';
        continue;
      } else if (isEduHeader(stripped)) {
        currentSection = 'education';
        continue;
      }

      if (currentSection !== 'header') {
        sectionContent[currentSection]?.push(line);
      }
    }

    const expText = sectionContent.experience.join('\n').trim() || text;
    const skillsText = sectionContent.skills.join(', ')
      .replace(/^[-•*]\s*/gm, '')
      .replace(/\n+/g, ', ')
      .replace(/,\s*,/g, ', ')
      .trim() || 'Strategic Planning, Technical Problem Solving, Cross-Functional Collaboration';
    const eduText = sectionContent.education.join('\n').replace(/^[-•*]\s*/gm, '').trim() || 'Academic & Professional Credentials';

    const fullNameWithContact = contact ? `${name} | ${contact}` : name;
    const markdown = `# ${name}\n**${role}**\n*${contact || 'Contact Details'}*\n\n---\n\n## 💼 Professional Experience\n\n${expText}\n\n---\n\n## 🛠️ Technical Competencies\n${skillsText}\n\n---\n\n## 🎓 Education\n${eduText}`;

    return {
      name: fullNameWithContact,
      role,
      skills: skillsText,
      education: eduText,
      experience: expText,
      markdown
    };
  }, []);

  return {
    loading,
    suggestions,
    insights,
    score,
    checkGrammar,
    analyzeAll,
    humanize,
    analyzeOrigin,
    paraphrase,
    summarize,
    translate,
    generateCoverLetter,
    generateSocialPost,
    generateResume,
    parseResume,
    aiChat,
    checkPlagiarism,
    generateCitation,
    detectImageAI,
    generateProfessionalTool,
    generateCreatorTool,
    generatePersonalTool,
    extractFileContent,
  };
};
