import { Router } from 'express';
import * as aiController from '../controllers/aiController.js';
const router = Router();
router.post('/check-grammar', aiController.checkGrammar);
router.post('/improve-style', aiController.improveStyle);
router.post('/analyze', aiController.getAnalysis);
router.post('/heatmap', aiController.getSentimentHeatmap);
router.post('/citation', aiController.createCitation);
router.post('/synonyms', aiController.getSynonyms);
router.post('/template', aiController.generateTemplateDoc);
export default router;
//# sourceMappingURL=aiRoutes.js.map