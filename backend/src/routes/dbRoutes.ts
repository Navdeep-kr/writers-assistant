import { Router } from 'express';
import { dbStore } from '../services/dbService.js';

const router = Router();

// Middleware to mock JWT Auth
const requireAuth = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
  }
  const token = authHeader.split(' ')[1];
  const user = dbStore.verifyToken(token);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized: Invalid Auth Token' });
  }
  req.user = user;
  next();
};

/* -- Authentication Layer -- */
router.post('/register', (req, res) => {
  const { email, phone, password, name } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  try {
    const user = dbStore.register(email, phone || '', password, name);
    // Don't leak password to frontend
    const { password: _, ...userSafe } = user;
    res.json(userSafe);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  
  try {
    const user = dbStore.login(email, password);
    const { password: _, ...userSafe } = user;
    res.json(userSafe);
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
});

router.get('/me', requireAuth, (req: any, res) => {
  const { password: _, ...userSafe } = req.user;
  res.json(userSafe);
});

/* -- Documents / Cloud Sync Layer -- */
router.get('/documents', requireAuth, (req: any, res) => {
  const docs = dbStore.getDocuments(req.user.id);
  res.json({ documents: docs });
});

router.post('/documents', requireAuth, (req: any, res) => {
  const { id, title, content } = req.body;
  const saved = dbStore.saveDocument(req.user.id, id, title, content);
  res.json({ document: saved });
});

router.get('/documents/:id', requireAuth, (req: any, res) => {
  const doc = dbStore.getDocument(req.params.id, req.user.id);
  if (!doc) return res.status(404).json({ error: 'Document not found' });
  res.json({ document: doc });
});

router.delete('/documents/:id', requireAuth, (req: any, res) => {
  const success = dbStore.deleteDocument(req.params.id, req.user.id);
  if (!success) return res.status(404).json({ error: 'Failed to delete' });
  res.json({ success: true });
});

export default router;
