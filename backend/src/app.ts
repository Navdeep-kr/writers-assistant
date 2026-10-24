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
app.get('/api/health', (req, res) => res.json({ 
  status: 'ok', 
  service: 'Writing Assistant Backend API',
  websockets: 'active',
  timestamp: new Date().toISOString() 
}));

app.get('/api', (req, res) => res.json({
  service: 'Writing Assistant API Gateway',
  status: 'operational',
  version: '1.0.0',
  documentation: '/',
  endpoints: {
    health: 'GET /api/health',
    ai: 'POST /api/ai/*',
    user: 'POST /api/user/*',
    db: 'GET/POST /api/db/*'
  }
}));

app.get('/', (req, res) => {
  const isApiRequest = req.query.format === 'json' || 
    (req.headers.accept === 'application/json' && !req.headers.accept?.includes('text/html'));
  
  if (isApiRequest) {
    return res.json({
      name: 'Writing Assistant Backend API & WebSocket Gateway',
      status: 'operational',
      version: '1.0.0',
      port: 4000,
      websockets: {
        status: 'active',
        path: '/socket.io/',
        features: ['collaborative-editing', 'cursor-tracking', 'realtime-sync']
      },
      web_application_url: 'http://localhost:3000',
      endpoints: {
        health: 'GET /api/health',
        api_index: 'GET /api',
        ai: 'POST /api/ai/*',
        user: 'POST /api/user/*',
        database: 'GET|POST /api/db/*'
      },
      timestamp: new Date().toISOString()
    });
  }

  return res.type('html').send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Writing Assistant API & WebSocket Gateway</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #030712;
      --card: #0b1329;
      --border: rgba(34, 211, 238, 0.2);
      --cyan: #22d3ee;
      --blue: #3b82f6;
      --emerald: #10b981;
      --text: #f3f4f6;
      --muted: #9ca3af;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: radial-gradient(circle at 50% 0%, #0f172a 0%, var(--bg) 70%);
      color: var(--text);
      font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
      min-height: 100vh;
      padding: 40px 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .container {
      width: 100%;
      max-width: 900px;
      display: flex;
      flex-direction: column;
      gap: 28px;
    }
    .header {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 20px;
      padding: 36px;
      box-shadow: 0 0 50px rgba(34, 211, 238, 0.08);
      position: relative;
      overflow: hidden;
    }
    .header::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 3px;
      background: linear-gradient(90deg, var(--cyan), var(--blue), #8b5cf6);
    }
    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(16, 185, 129, 0.12);
      border: 1px solid rgba(16, 185, 129, 0.3);
      color: var(--emerald);
      padding: 6px 14px;
      border-radius: 99px;
      font-size: 0.82rem;
      font-weight: 700;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      margin-bottom: 16px;
    }
    .status-dot {
      width: 8px;
      height: 8px;
      background: var(--emerald);
      border-radius: 50%;
      box-shadow: 0 0 10px var(--emerald);
      animation: pulse 2s infinite ease-in-out;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.5; transform: scale(0.8); }
    }
    h1 {
      font-size: 2.2rem;
      font-weight: 800;
      letter-spacing: -0.03em;
      margin-bottom: 8px;
      background: linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    p.desc {
      color: var(--muted);
      font-size: 1.05rem;
      line-height: 1.6;
      margin-bottom: 24px;
    }
    .action-row {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      align-items: center;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: linear-gradient(135deg, var(--cyan), var(--blue));
      color: #030712;
      font-weight: 700;
      font-size: 0.95rem;
      padding: 12px 24px;
      border-radius: 12px;
      text-decoration: none;
      box-shadow: 0 0 25px rgba(34, 211, 238, 0.3);
      transition: all 0.2s ease;
      cursor: pointer;
      border: none;
    }
    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 0 35px rgba(34, 211, 238, 0.5);
    }
    .btn-secondary {
      background: rgba(255, 255, 255, 0.05);
      color: var(--text);
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: none;
    }
    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: var(--cyan);
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 16px;
    }
    .card {
      background: var(--card);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      padding: 24px;
      transition: border-color 0.2s;
    }
    .card:hover {
      border-color: var(--border);
    }
    .card-title {
      font-size: 0.85rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--cyan);
      margin-bottom: 8px;
    }
    .card-val {
      font-size: 1.25rem;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 6px;
    }
    .card-sub {
      font-size: 0.82rem;
      color: var(--muted);
      line-height: 1.4;
    }
    .endpoints-box {
      background: var(--card);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      padding: 28px;
    }
    .endpoints-title {
      font-size: 1.1rem;
      font-weight: 700;
      margin-bottom: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .endpoint-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 14px;
      background: rgba(0, 0, 0, 0.3);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 8px;
      margin-bottom: 8px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.85rem;
    }
    .method {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.05em;
    }
    .get { background: rgba(16, 185, 129, 0.2); color: #34d399; }
    .post { background: rgba(59, 130, 246, 0.2); color: #60a5fa; }
    .endpoint-path { color: #f1f5f9; margin-left: 8px; }
    .endpoint-desc { color: var(--muted); font-size: 0.78rem; font-family: 'Plus Jakarta Sans', sans-serif; }
    .footer {
      text-align: center;
      color: var(--muted);
      font-size: 0.85rem;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="status-badge">
        <span class="status-dot"></span> All Systems Operational
      </div>
      <h1>Writing Assistant Core Engine</h1>
      <p class="desc">
        The backend API and real-time WebSocket cluster are live and listening on port <strong>4000</strong>. This server processes AI inference, document persistence, and multi-user synchronization for the web and mobile applications.
      </p>
      <div class="action-row">
        <a href="http://localhost:3000" class="btn">
          🚀 Open Web App (Port 3000)
        </a>
        <a href="/api/health" class="btn btn-secondary">
          🔍 Test Health JSON (/api/health)
        </a>
        <a href="/api" class="btn btn-secondary">
          📋 API Index (/api)
        </a>
      </div>
    </div>

    <div class="grid">
      <div class="card">
        <div class="card-title">WebSocket Gateway</div>
        <div class="card-val">Socket.io Online</div>
        <div class="card-sub">Real-time collaborative editing, cursor broadcast, and live sync at <code>/socket.io/</code>.</div>
      </div>
      <div class="card">
        <div class="card-title">AI Processing Cluster</div>
        <div class="card-val">25+ Core Endpoints</div>
        <div class="card-sub">Grammar engine, multi-tone paraphrasing, ATS resume generator, and origin detection.</div>
      </div>
      <div class="card">
        <div class="card-title">Database & Sync</div>
        <div class="card-val">Active Store</div>
        <div class="card-sub">Encrypted cloud document persistence, auto-draft snapshots, and revision histories.</div>
      </div>
    </div>

    <div class="endpoints-box">
      <div class="endpoints-title">
        <span>Available API Endpoints</span>
        <span style="font-size: 0.8rem; color: var(--muted); font-weight: 500;">Backend Port: 4000</span>
      </div>
      
      <div class="endpoint-item">
        <div><span class="method get">GET</span><span class="endpoint-path">/api/health</span></div>
        <span class="endpoint-desc">System health, uptime, and cluster status</span>
      </div>
      <div class="endpoint-item">
        <div><span class="method get">GET</span><span class="endpoint-path">/api</span></div>
        <span class="endpoint-desc">API directory and route metadata</span>
      </div>
      <div class="endpoint-item">
        <div><span class="method post">POST</span><span class="endpoint-path">/api/ai/check-grammar</span></div>
        <span class="endpoint-desc">Deep grammatical & stylistic validation</span>
      </div>
      <div class="endpoint-item">
        <div><span class="method post">POST</span><span class="endpoint-path">/api/ai/paraphrase</span></div>
        <span class="endpoint-desc">Multi-tone clause rephrasing</span>
      </div>
      <div class="endpoint-item">
        <div><span class="method post">POST</span><span class="endpoint-path">/api/ai/resume</span></div>
        <span class="endpoint-desc">ATS-optimized resume generation</span>
      </div>
      <div class="endpoint-item">
        <div><span class="method post">POST</span><span class="endpoint-path">/api/ai/humanize</span></div>
        <span class="endpoint-desc">Convert synthetic text into natural human prose</span>
      </div>
      <div class="endpoint-item">
        <div><span class="method post">POST</span><span class="endpoint-path">/api/ai/origin</span></div>
        <span class="endpoint-desc">Burstiness & perplexity AI detector</span>
      </div>
      <div class="endpoint-item">
        <div><span class="method post">POST</span><span class="endpoint-path">/api/ai/plagiarism</span></div>
        <span class="endpoint-desc">Academic & web plagiarism scanning</span>
      </div>
      <div class="endpoint-item">
        <div><span class="method post">POST</span><span class="endpoint-path">/api/db/save</span></div>
        <span class="endpoint-desc">Document snapshot save & synchronization</span>
      </div>
    </div>

    <div class="footer">
      Writing Assistant API Server • Running locally on <strong>http://localhost:4000</strong>
    </div>
  </div>
</body>
</html>`);
});

app.use('/api/ai', aiRoutes);
app.use('/api/user', userRoutes);
app.use('/api/db', dbRoutes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

export default app;
