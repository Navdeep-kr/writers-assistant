import { Router } from 'express';
import * as aiController from '../controllers/aiController.js';

const router = Router();

router.post('/check-grammar', aiController.checkGrammar);
router.post('/improve-style', aiController.improveStyle);
router.post('/analyze', aiController.getAnalysis);
router.post('/heatmap', aiController.getSentimentHeatmap);
router.post('/synonyms', aiController.getSynonyms);
router.post('/template', aiController.generateTemplateDoc);
router.post('/humanize', aiController.humanize);
router.post('/origin', aiController.getTextOrigin);
router.post('/paraphrase', aiController.paraphrase);
router.post('/summarize', aiController.summarize);
router.post('/translate', aiController.translate);
router.post('/cover-letter', aiController.generateCoverLetter);
router.post('/social-post', aiController.writeSocialPost);
router.post('/resume', aiController.generateResume);
router.post('/chat', aiController.chat);
router.post('/plagiarism', aiController.checkPlagiarism);
router.post('/citation', aiController.generateCitation);
router.post('/professional-generate', aiController.professionalGenerate);
router.post('/creator-generate', aiController.creatorGenerate);
router.post('/personal-generate', aiController.personalGenerate);
router.post('/image-ai', aiController.detectImageAI);
router.post('/extract-file', aiController.extractFileContent);
router.post('/parse-resume', aiController.parseResume);

export default router;
