import * as aiService from '../services/aiService.js';
export const checkGrammar = async (req, res) => {
    const { text, goals } = req.body;
    if (!text) {
        return res.status(400).json({ error: 'Text is required' });
    }
    try {
        const results = await aiService.checkGrammar(text);
        const wordCount = text.trim().split(/\s+/).length;
        const score = aiService.calculateScore(results.matches || [], wordCount);
        res.json({ ...results, score });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const improveStyle = async (req, res) => {
    const { text, style, goals, brandVoice } = req.body;
    if (!text || !style) {
        return res.status(400).json({ error: 'Text and style are required' });
    }
    try {
        const improved = await aiService.improveStyle(text, style, goals, brandVoice);
        res.json({ improved });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const getAnalysis = async (req, res) => {
    const { text, goals } = req.body;
    if (!text) {
        return res.status(400).json({ error: 'Text is required' });
    }
    try {
        const insights = await aiService.analyzeInsights(text, goals);
        res.json(insights);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const getSentimentHeatmap = async (req, res) => {
    const { text } = req.body;
    if (!text)
        return res.status(400).json({ error: 'Text is required' });
    try {
        const heatmap = await aiService.analyzeSentimentSegments(text);
        res.json(heatmap);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const createCitation = async (req, res) => {
    const { source, style } = req.body;
    if (!source)
        return res.status(400).json({ error: 'Source is required' });
    try {
        const citation = await aiService.generateCitation(source, style);
        res.json({ citation });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const getSynonyms = async (req, res) => {
    const { word, context } = req.body;
    if (!word || !context)
        return res.status(400).json({ error: 'Word and context are required' });
    try {
        const synonyms = await aiService.getContextualSynonyms(word, context);
        res.json(synonyms);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const generateTemplateDoc = async (req, res) => {
    const { templateId, prompts, goals } = req.body;
    if (!templateId || !prompts)
        return res.status(400).json({ error: 'Missing template info' });
    try {
        const content = await aiService.generateFromTemplate(templateId, prompts, goals);
        res.json({ content });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
//# sourceMappingURL=aiController.js.map