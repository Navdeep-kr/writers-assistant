import 'dotenv/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-3.8-flash' });

async function run() {
  const result = await model.generateContent('Return a valid JSON object: {"status": "ok"}');
  console.log('Gemini output:\n', result.response.text());
}
run();
