export interface WritingGoals {
    audience: 'general' | 'knowledgeable' | 'expert';
    formality: 'informal' | 'neutral' | 'formal';
    intent: 'inform' | 'describe' | 'convince' | 'tell-a-story';
}
export declare const checkGrammar: (text: string) => Promise<any>;
export declare const improveStyle: (text: string, style: string, goals?: WritingGoals, brandVoice?: string) => Promise<string>;
export declare const analyzeInsights: (text: string, goals?: WritingGoals) => Promise<{
    tones: any;
    clarity: any;
    engagement: any;
    delivery: any;
    plagiarism: any;
    aiLikelihood: any;
    readability: {
        score: any;
        grade: any;
    };
}>;
export declare const analyzeSentimentSegments: (text: string) => Promise<any>;
export declare const generateCitation: (sourceInfo: string, style?: string) => Promise<string>;
export declare const getContextualSynonyms: (word: string, context: string) => Promise<any>;
export declare const generateFromTemplate: (templateId: string, prompts: Record<string, string>, goals?: WritingGoals) => Promise<string>;
export declare const calculateScore: (grammarMatches: any[], wordCount: number) => number;
//# sourceMappingURL=aiService.d.ts.map