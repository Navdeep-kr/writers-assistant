import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI('AIzaSyBf-DPNzMfbH_htUuQklqpIVsvjzgJ388U');

async function run() {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent('Say hello');
    console.log('Gemini Result:', result.response.text());
  } catch (error) {
    console.error('Gemini Error:', error);
  }
}

run();
