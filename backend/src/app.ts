import express from 'express';
import cors from 'cors';

import aiRoutes from './routes/aiRoutes.js';
import userRoutes from './routes/userRoutes.js';
import dbRoutes from './routes/dbRoutes.js';

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use((req, res, next) => {
  console.log(`➡️ ${req.method} ${req.url}`);
  next();
});

// Main Routes
app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));
app.use('/api/ai', aiRoutes);
app.use('/api/user', userRoutes);
app.use('/api/db', dbRoutes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

export default app;
