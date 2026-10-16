import { useState, useCallback } from 'react';
import axios from 'axios';

// Replace with your local machine's IP (e.g. 192.168.1.10) for physical devices
const API_URL = 'http://localhost:4000/api';

export const useAI = () => {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [insights, setInsights] = useState<any>({
    tones: ['neutral'],
    aiLikelihood: 0,
    readability: { score: 100, grade: 'General' }
  });
  const [score, setScore] = useState<number>(100);

  const analyzeText = useCallback(async (text: string) => {
    if (!text || text.length < 5) return;
    
    setLoading(true);
    try {
      // 1. Grammar & Style Check
      const response = await axios.post(`${API_URL}/ai/check-grammar`, { text });
      setSuggestions(response.data.matches || []);
      setScore(response.data.score || 100);
      
      // 2. Full Insights Analysis
      const insightRes = await axios.post(`${API_URL}/ai/analyze`, { text });
      setInsights(insightRes.data);

      // 3. Register Activity
      await axios.post(`${API_URL}/user/activity`);
    } catch (error) {
      console.error('Mobile AI Service Error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const polishText = useCallback(async (text: string) => {
    if (!text) return text;
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/ai/improve-style`, {
        text,
        style: 'professional',
        brandVoice: 'Clear, concise, and professional'
      });
      return response.data.improved;
    } catch (error) {
      console.error('Polish Error:', error);
      return text;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    suggestions,
    insights,
    score,
    analyzeText,
    polishText,
  };
};
