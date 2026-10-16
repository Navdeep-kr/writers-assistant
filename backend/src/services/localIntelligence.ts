import axios from 'axios';

export interface LocalModification {
  original: string;
  replacement: string;
  reason: string;
  type: 'synonym' | 'structural' | 'clarity';
}

/**
 * Local Intelligence Engine (Credit-Independent NLP)
 * Provides genuine, high-fidelity transformations for all writing styles.
 */

// Conciseness & Redundancy Map
const CONCISENESS_MAP: Record<string, string> = {
  'in order to': 'to',
  'due to the fact that': 'because',
  'at this point in time': 'currently',
  'at the present time': 'now',
  'for the purpose of': 'to',
  'in the event that': 'if',
  'has the ability to': 'can',
  'is able to': 'can',
  'take into consideration': 'consider',
  'make a decision': 'decide',
  'reach a conclusion': 'conclude',
  'give an indication of': 'indicate',
  'a large number of': 'many',
  'a majority of': 'most',
  'in spite of the fact that': 'although',
  'with reference to': 'regarding',
  'with regard to': 'regarding',
  'prior to': 'before',
  'subsequent to': 'after',
  'it is crucial to': 'we must',
  'it is important to note that': 'notably,',
  'needless to say': '',
  'as a matter of fact': 'in fact',
  'each and every': 'every',
  'first and foremost': 'first',
  'end result': 'result',
  'future plans': 'plans',
  'past history': 'history',
  'free gift': 'gift',
  'unexpected surprise': 'surprise',
  'very unique': 'unique',
  'completely eliminate': 'eliminate',
  'absolutely essential': 'essential',
  'basic fundamentals': 'fundamentals',
};

// Conversational / Informal to Professional Map
const INFORMAL_TO_PROFESSIONAL: Record<string, string> = {
  'hey dude': 'Dear colleague,',
  'hey guys': 'Hello team,',
  'hey': 'Hello,',
  'whats up': 'how are things progressing',
  'what\'s up': 'how are things progressing',
  'can u': 'could you please',
  'can you': 'could you please',
  'when u get a chance': 'at your earliest convenience',
  'when you get a chance': 'at your earliest convenience',
  'check this document': 'review this document',
  'check this': 'review this',
  'take a look at': 'review',
  'gonna': 'going to',
  'wanna': 'would like to',
  'gotta': 'must',
  'lots of': 'numerous',
  'a lot of': 'substantial',
  'tell me': 'please provide an overview of',
  'look into': 'investigate',
  'make sure': 'ensure',
  'find out': 'determine',
  'get in touch': 'connect',
  'talk about': 'discuss',
  'deal with': 'address',
  'asap': 'as soon as feasible',
  'give up': 'discontinue',
  'put off': 'postpone',
  'bring up': 'introduce',
  'point out': 'highlight',
  'set up': 'establish',
  'come up with': 'develop',
  'fix': 'resolve',
  'do': 'execute',
  'buy': 'procure',
  'help': 'facilitate',
  'start': 'initiate',
  'end': 'conclude',
  'ask': 'inquire',
  'need': 'require',
  'big': 'significant',
  'bad': 'suboptimal',
  'good': 'effective',
  'really good': 'exceptional',
  'very good': 'exemplary',
  'really bad': 'detrimental',
  'very bad': 'critical',
  'i think': 'In my assessment,',
  'maybe': 'potentially',
  'just': '',
  'kind of': 'moderately',
  'sort of': 'somewhat',
};

// Academic replacements (vocabulary & tone elevation)
const ACADEMIC_MAP: Record<string, string> = {
  'shows': 'demonstrates',
  'proves': 'substantiates',
  'explains': 'elucidates',
  'describes': 'delineates',
  'uses': 'utilizes',
  'makes': 'generates',
  'causes': 'precipitates',
  'leads to': 'culminates in',
  'changes': 'transforms',
  'gets': 'attains',
  'gives': 'furnishes',
  'seems': 'appears',
  'a lot': 'considerably',
  'about': 'approximately',
  'enough': 'sufficient',
  'whole': 'entire',
  'next': 'subsequent',
  'so': 'consequently,',
  'but': 'however,',
  'also': 'furthermore,',
  'besides': 'moreover,',
};

// Contractions expansion map
const CONTRACTIONS: Record<string, string> = {
  "don't": "do not",
  "doesn't": "does not",
  "didn't": "did not",
  "can't": "cannot",
  "couldn't": "could not",
  "won't": "will not",
  "wouldn't": "would not",
  "shouldn't": "should not",
  "isn't": "is not",
  "aren't": "are not",
  "wasn't": "was not",
  "weren't": "were not",
  "it's": "it is",
  "that's": "that is",
  "there's": "there is",
  "i'm": "I am",
  "you're": "you are",
  "we're": "we are",
  "they're": "they are",
  "i've": "I have",
  "you've": "you have",
  "we've": "we have",
  "they've": "they have",
};

/**
 * Free Datamuse Synonyms
 */
export const getLocalSynonyms = async (word: string): Promise<string[]> => {
  try {
    const response = await axios.get(`https://api.datamuse.com/words?rel_syn=${encodeURIComponent(word)}&max=5`, { timeout: 2500 });
    return response.data.map((item: any) => item.word);
  } catch {
    return [];
  }
};

/**
 * Local Style Improvement Engine
 */
export const localImproveStyle = (text: string, style: string): { result: string, modifications: LocalModification[] } => {
  if (!text || text.trim().length === 0) return { result: '', modifications: [] };

  let result = text;
  const modifications: LocalModification[] = [];
  const normalizedStyle = style.toLowerCase();

  // 1. Expand contractions for Academic / Formal
  if (normalizedStyle.includes('academic') || normalizedStyle.includes('formal')) {
    Object.entries(CONTRACTIONS).forEach(([orig, repl]) => {
      const regex = new RegExp(`\\b${orig}\\b`, 'gi');
      if (regex.test(result)) {
        result = result.replace(regex, repl);
        modifications.push({
          original: orig,
          replacement: repl,
          reason: 'Expanded contraction for academic formality.',
          type: 'clarity'
        });
      }
    });
  }

  // 2. Apply Informal to Professional mapping
  if (normalizedStyle.includes('prof') || normalizedStyle.includes('formal') || normalizedStyle.includes('refine')) {
    Object.entries(INFORMAL_TO_PROFESSIONAL).forEach(([orig, repl]) => {
      const regex = new RegExp(`\\b${orig.replace("'", "\\'")}\\b`, 'gi');
      if (regex.test(result)) {
        result = result.replace(regex, repl);
        modifications.push({
          original: orig,
          replacement: repl,
          reason: 'Elevated colloquial phrasing to professional standards.',
          type: 'synonym'
        });
      }
    });
  }

  // 3. Apply Academic Vocabulary
  if (normalizedStyle.includes('academic')) {
    Object.entries(ACADEMIC_MAP).forEach(([orig, repl]) => {
      const regex = new RegExp(`\\b${orig}\\b`, 'gi');
      if (regex.test(result)) {
        result = result.replace(regex, repl);
        modifications.push({
          original: orig,
          replacement: repl,
          reason: 'Substituted colloquial term with precise academic terminology.',
          type: 'synonym'
        });
      }
    });
  }

  // 4. Apply Conciseness Map
  Object.entries(CONCISENESS_MAP).forEach(([orig, repl]) => {
    const regex = new RegExp(`\\b${orig}\\b`, 'gi');
    if (regex.test(result)) {
      result = result.replace(regex, repl);
      modifications.push({
        original: orig,
        replacement: repl || '[removed redundancy]',
        reason: 'Eliminated redundant words to maximize clarity.',
        type: 'clarity'
      });
    }
  });

  // 5. Cleanup spacing and capitalization
  let cleaned = result.replace(/\s{2,}/g, ' ').trim();
  if (cleaned.length > 0) {
    cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  }

  return { result: cleaned, modifications };
};

/**
 * Local Paraphrase Engine with Structure Shuffling and Synonym Swapping
 */
export const localParaphrase = async (text: string, tone: string): Promise<{ rewrittenText: string, modifications: LocalModification[], toneIntensity: number[] }> => {
  const { result: styledText, modifications } = localImproveStyle(text, tone);
  let paraphrased = styledText;

  // Split into sentences
  const sentenceList = paraphrased.match(/[^.!?]+[.!?]*/g) || [paraphrased];
  const transformedSentences = [];

  for (let s of sentenceList) {
    let current = s.trim();

    // Structural shuffling: If sentence has dependent clause starting with When/If/Because/Although/Since
    const clauseMatch = current.match(/^(When|If|Because|Although|Since|While)\s+([^,]+),\s*(.+)$/i);
    if (clauseMatch) {
      const [, connective, depClause, mainClause] = clauseMatch;
      const reordered = `${mainClause.replace(/[.!?]$/, '')} ${connective.toLowerCase()} ${depClause}.`;
      modifications.push({
        original: current,
        replacement: reordered,
        reason: 'Inverted clause order to strengthen sentence emphasis and flow.',
        type: 'structural'
      });
      current = reordered;
    }

    transformedSentences.push(current);
  }

  paraphrased = transformedSentences.join(' ');

  // Try Datamuse synonym enhancement on one salient word
  const words = paraphrased.split(/\s+/);
  for (let i = 0; i < words.length; i++) {
    const cleanWord = words[i].replace(/[^a-zA-Z]/g, '').toLowerCase();
    if (cleanWord.length >= 6 && !['should', 'before', 'always', 'people', 'number', 'system'].includes(cleanWord)) {
      const syns = await getLocalSynonyms(cleanWord);
      if (syns.length > 0) {
        const replacement = syns[0];
        const punctuation = words[i].match(/[^a-zA-Z]+$/)?.[0] || '';
        words[i] = replacement + punctuation;
        modifications.push({
          original: cleanWord,
          replacement: replacement,
          reason: `Enhanced vocabulary with ${tone.toLowerCase()} synonym.`,
          type: 'synonym'
        });
        paraphrased = words.join(' ');
        break;
      }
    }
  }

  // Capitalize first letter
  if (paraphrased.length > 0) {
    paraphrased = paraphrased.charAt(0).toUpperCase() + paraphrased.slice(1);
  }

  return {
    rewrittenText: paraphrased,
    modifications,
    toneIntensity: [88]
  };
};

/**
 * Local Summarizer (Salient Sentence Extraction)
 */
export const localSummarize = (text: string, length: string): string => {
  const sentences = (text.match(/[^.!?]+[.!?]*/g) || [text]).map(s => s.trim()).filter(s => s.length > 5);
  if (sentences.length === 0) return text;
  if (sentences.length === 1) return sentences[0];

  // Word frequency scoring for extractive summary
  const words = text.toLowerCase().match(/\b[a-z]{3,}\b/g) || [];
  const stopWords = new Set(['the', 'and', 'for', 'that', 'this', 'with', 'from', 'have', 'were', 'which', 'their', 'they', 'been', 'will']);
  const freq: Record<string, number> = {};
  for (const w of words) {
    if (!stopWords.has(w)) {
      freq[w] = (freq[w] || 0) + 1;
    }
  }

  const scored = sentences.map((s, index) => {
    const sWords = s.toLowerCase().match(/\b[a-z]{3,}\b/g) || [];
    const score = sWords.reduce((acc, w) => acc + (freq[w] || 0), 0) / (sWords.length || 1);
    return { sentence: s, score, index };
  });

  scored.sort((a, b) => b.score - a.score);

  let count = 2;
  if (length === 'short') count = 1;
  else if (length === 'long') count = Math.min(sentences.length, 4);

  const top = scored.slice(0, count).sort((a, b) => a.index - b.index);

  if (length === 'short') {
    return top[0].sentence;
  }
  return top.map(t => `• ${t.sentence}`).join('\n');
};
