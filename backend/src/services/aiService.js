import axios from 'axios';
import { OpenAI } from 'openai';
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
export const checkGrammar = async (text) => {
    try {
        const response = await axios.post('https://api.languagetool.org/v2/check', new URLSearchParams({
            text,
            language: 'en-US',
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return response.data;
    }
    catch (error) {
        console.error('LanguageTool API Error:', error);
        throw new Error('Failed to check grammar');
    }
};
export const improveStyle = async (text, style, goals, brandVoice) => {
    const goalPrompt = goals ? `Target Audience: ${goals.audience}. Formality: ${goals.formality}. Intent: ${goals.intent}.` : '';
    const brandPrompt = brandVoice ? `Follow this specific brand voice/style: ${brandVoice}.` : '';
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: `You are an expert writers assistant. Rewrite the following text in a ${style} style. ${goalPrompt} ${brandPrompt} Maintain the original meaning but improve clarity and flow. Output ONLY the rewritten text, no conversational filler.`,
                },
                { role: 'user', content: text },
            ],
        });
        return response.choices[0]?.message?.content || text;
    }
    catch (error) {
        console.error('OpenAI Style Error:', error);
        throw new Error('Failed to improve style');
    }
};
export const analyzeInsights = async (text, goals) => {
    const goalPrompt = goals ? `Considering the target audience is ${goals.audience}, the formality is ${goals.formality}, and the intent is to ${goals.intent}:` : '';
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            response_format: { type: "json_object" },
            messages: [
                {
                    role: 'system',
                    content: `You are an advanced text analyzer. ${goalPrompt} Analyze the text and output a JSON object exactly matching this structure:
            {
              "tones": ["Array of 1 to 4 distinct emotional or objective tones (e.g. Confident, Urgent, Joyful)"],
              "clarity_score": <number 0-100>,
              "engagement_score": <number 0-100>,
              "delivery_score": <number 0-100>,
              "plagiarism_risk": <number 0-100>,
              "ai_likelihood": <number 0-100>,
              "flesch_reading_ease": <number 0-100>,
              "estimated_grade_level": "e.g. 8th Grade"
            }`,
                },
                { role: 'user', content: text },
            ],
        });
        const parsed = JSON.parse(response.choices[0]?.message?.content || '{}');
        return {
            tones: parsed.tones || ['neutral'],
            clarity: parsed.clarity_score || 100,
            engagement: parsed.engagement_score || 100,
            delivery: parsed.delivery_score || 100,
            plagiarism: parsed.plagiarism_risk || 0,
            aiLikelihood: parsed.ai_likelihood || 0,
            readability: {
                score: parsed.flesch_reading_ease || 100,
                grade: parsed.estimated_grade_level || 'General'
            }
        };
    }
    catch (error) {
        console.error('OpenAI Insights Error:', error);
        return { tones: ['neutral'], clarity: 100, engagement: 100, delivery: 100, plagiarism: 0, aiLikelihood: 0, readability: { score: 100, grade: 'General' } };
    }
};
export const analyzeSentimentSegments = async (text) => {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            response_format: { type: "json_object" },
            messages: [
                {
                    role: 'system',
                    content: 'Analyze the sentiment of different parts of the provided text. Return a JSON object with a "segments" array. Each segment must have "text" and "sentiment" (one of: "positive", "neutral", "negative", "urgent", "expert").',
                },
                { role: 'user', content: text },
            ],
        });
        return JSON.parse(response.choices[0]?.message?.content || '{"segments": []}');
    }
    catch (error) {
        console.error('Sentiment Analysis Error:', error);
        return { segments: [] };
    }
};
export const generateCitation = async (sourceInfo, style = 'APA') => {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: `You are a citation expert. Generate a perfect citation in ${style} style for the following source information. Output ONLY the citation string.`,
                },
                { role: 'user', content: sourceInfo },
            ],
        });
        return response.choices[0]?.message?.content || '';
    }
    catch (error) {
        console.error('Citation Generation Error:', error);
        throw new Error('Failed to generate citation');
    }
};
export const getContextualSynonyms = async (word, context) => {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            response_format: { type: "json_object" },
            messages: [
                {
                    role: 'system',
                    content: `You are a thesaurus that understands context. For the word "${word}" in the context of "${context}", provide 3-5 premium synonyms that fit perfectly. Return a JSON object with a "synonyms" array of strings.`,
                },
            ],
        });
        return JSON.parse(response.choices[0]?.message?.content || '{"synonyms": []}');
    }
    catch (error) {
        console.error('Synonym Error:', error);
        return { synonyms: [] };
    }
};
export const generateFromTemplate = async (templateId, prompts, goals) => {
    const goalPrompt = goals ? `Target Audience: ${goals.audience}. Formality: ${goals.formality}. Intent: ${goals.intent}.` : '';
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: `You are a professional writer. Generate a high-quality document for a "${templateId}" template using these details: ${JSON.stringify(prompts)}. ${goalPrompt} Output the full document text.`,
                },
            ],
        });
        return response.choices[0]?.message?.content || '';
    }
    catch (error) {
        console.error('Template Generation Error:', error);
        throw new Error('Failed to generate template document');
    }
};
export const calculateScore = (grammarMatches, wordCount) => {
    if (wordCount < 10)
        return 100;
    const errorDensity = (grammarMatches.length / wordCount) * 100;
    let score = 100 - (errorDensity * 5);
    return Math.max(0, Math.min(100, Math.round(score)));
};
//# sourceMappingURL=aiService.js.map