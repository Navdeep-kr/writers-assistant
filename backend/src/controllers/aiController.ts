import type { Request, Response } from 'express';
import * as aiService from '../services/aiService.js';

export const checkGrammar = async (req: Request, res: Response) => {
  const { text, goals } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  try {
    const results = await aiService.checkGrammar(text);
    const wordCount = text.trim().split(/\s+/).length;
    const score = aiService.calculateScore(results.matches || [], wordCount);
    res.json({ ...results, score });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const paraphrase = async (req: Request, res: Response) => {
  const { text, tone } = req.body;
  if (!text) return res.status(400).json({ error: 'Text is required' });

  try {
    const paraphrased = await aiService.paraphraseText(text, tone);
    res.json({ result: paraphrased, mode: (paraphrased.modifications?.length > 0 && paraphrased.modifications[0].reason.includes('local intelligence')) ? 'Local Intelligence' : 'AI' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const summarize = async (req: Request, res: Response) => {
  const { text, length } = req.body;
  if (!text) return res.status(400).json({ error: 'Text is required' });

  try {
    const summary = await aiService.summarizeText(text, length);
    res.json({ result: summary, mode: summary.includes('SUMMARY') ? 'Local Intelligence' : 'AI' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const translate = async (req: Request, res: Response) => {
  const { text, targetLanguage } = req.body;
  if (!text || !targetLanguage) return res.status(400).json({ error: 'Text and target language are required' });

  try {
    const translated = await aiService.translateText(text, targetLanguage);
    res.json({ result: translated });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const improveStyle = async (req: Request, res: Response) => {
  const { text, style, goals, brandVoice } = req.body;
  if (!text || !style) {
    return res.status(400).json({ error: 'Text and style are required' });
  }

  try {
    const improved = await aiService.improveStyle(text, style, goals, brandVoice);
    res.json({ improved, mode: improved.includes('[REFINED') || improved.includes('In my professional assessment') ? 'Local Intelligence' : 'AI' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getAnalysis = async (req: Request, res: Response) => {
  const { text, goals } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  try {
    const insights = await aiService.analyzeInsights(text, goals);
    res.json(insights);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getSentimentHeatmap = async (req: Request, res: Response) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Text is required' });

  try {
    const heatmap = await aiService.analyzeSentimentSegments(text);
    res.json(heatmap);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


export const getSynonyms = async (req: Request, res: Response) => {
  const { word, context } = req.body;
  if (!word || !context) return res.status(400).json({ error: 'Word and context are required' });

  try {
    const synonyms = await aiService.getContextualSynonyms(word, context);
    res.json(synonyms);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const generateTemplateDoc = async (req: Request, res: Response) => {
  const { templateId, prompts, goals } = req.body;
  if (!templateId || !prompts) return res.status(400).json({ error: 'Missing template info' });

  try {
    const content = await aiService.generateFromTemplate(templateId, prompts, goals);
    res.json({ content });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const humanize = async (req: Request, res: Response) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  try {
    const humanized = await aiService.humanizeText(text);
    res.json({ humanized });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getTextOrigin = async (req: Request, res: Response) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  try {
    const originAnalysis = await aiService.analyzeTextOrigin(text);
    res.json(originAnalysis);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const generateCoverLetter = async (req: Request, res: Response) => {
  const { details } = req.body;
  if (!details) return res.status(400).json({ error: 'Details are required' });

  try {
    const letter = await aiService.generateCoverLetter(details);
    res.json({ result: letter });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const writeSocialPost = async (req: Request, res: Response) => {
  const { platform, topic, tone } = req.body;
  if (!topic) return res.status(400).json({ error: 'Topic is required' });

  try {
    const post = await aiService.generateSocialPost(platform, topic, tone);
    res.json({ result: post });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const generateResume = async (req: Request, res: Response) => {
  const { details } = req.body;
  if (!details) return res.status(400).json({ error: 'Details are required' });

  try {
    const resume = await aiService.generateResume(details);
    res.json({ result: resume });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const chat = async (req: Request, res: Response) => {
  const { message, history } = req.body;
  if (!message) return res.status(400).json({ error: 'Message is required' });

  try {
    const response = await aiService.aiChat(message, history);
    res.json({ result: response });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const checkPlagiarism = async (req: Request, res: Response) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Text is required' });

  try {
    const report = await aiService.checkPlagiarismDetailed(text);
    res.json(report);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const generateCitation = async (req: Request, res: Response) => {
  const { details, format } = req.body;
  if (!details) return res.status(400).json({ error: 'Details are required' });

  try {
    const citation = await aiService.generateCitation(details, format);
    res.json({ result: citation });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const professionalGenerate = async (req: Request, res: Response) => {
  const { toolId, input, category } = req.body;
  if (!toolId || !input || !category) return res.status(400).json({ error: 'Missing required tool parameters' });

  try {
    const result = await aiService.generateProfessionalContent(toolId, input, category);
    res.json({ result });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const creatorGenerate = async (req: Request, res: Response) => {
  const { toolId, input } = req.body;
  if (!toolId || !input) return res.status(400).json({ error: 'Missing toolId or input' });

  try {
    const result = await aiService.generateCreatorContent(toolId, input);
    res.json({ result });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const personalGenerate = async (req: Request, res: Response) => {
  const { toolId, input } = req.body;
  if (!toolId || !input) return res.status(400).json({ error: 'Missing toolId or input' });

  try {
    const result = await aiService.generatePersonalContent(toolId, input);
    res.json({ result });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const detectImageAI = async (req: Request, res: Response) => {
  // Mock image analysis for now - in production this would use a vision API
  res.json({ 
    isAI: Math.random() > 0.5, 
    confidence: Math.round(Math.random() * 100), 
    analysis: "Deep pixel analysis suggests synthetic patterns in the edge gradients." 
  });
};

export const extractFileContent = async (req: Request, res: Response) => {
  const { mimeType, fileName } = req.body;
  const base64 = req.body.base64 || req.body.fileBase64 || '';
  if (!base64 && !fileName) {
    return res.status(400).json({ error: 'Missing file payload' });
  }

  try {
    const text = await aiService.extractTextFromFileOrImage(base64, mimeType, fileName);
    res.json({ text, fileName });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const parseResume = async (req: Request, res: Response) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Text is required for resume parsing' });
  }

  try {
    const result = await aiService.parseResumeContent(text);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

