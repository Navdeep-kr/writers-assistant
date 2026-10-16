# ✒️ Premium AI Writing Assistant & Studio Suite

A modern, full-stack AI Writing Assistant and Document Studio featuring **intelligent offline extraction** (PDF, Word, OCR for images), 5 designer templates for resumes, comprehensive writing tools (Paraphraser, Grammar, Cover Letter, Translator, Summarizer, Citations, Tone Analysis), and real-time collaboration.

---

## 🚀 Public Launch & Deployment Guide

This application is ready for public deployment. You can deploy it using modern serverless cloud platforms or with Docker.

### Option 1: Vercel (Frontend) + Render / Railway (Backend) — *Recommended*

#### Step 1: Deploy the Backend (Express + WebSockets)
1. Push your repository to GitHub or GitLab.
2. Sign up or log in to [Render](https://render.com) or [Railway](https://railway.app).
3. Create a **New Web Service**:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
4. Set the Environment Variables:
   - `PORT`: `4000` (or leave default assigned by platform)
   - `NODE_ENV`: `production`
   - `GEMINI_API_KEY`: *(Optional)* Your Google Gemini API Key
   - `OPENAI_API_KEY`: *(Optional)* Your OpenAI API Key
5. Copy your deployed backend URL (e.g., `https://writing-backend.onrender.com`).

#### Step 2: Deploy the Frontend (Next.js)
1. Go to [Vercel](https://vercel.com) and click **Add New Project**.
2. Select your repository and set the **Root Directory** to `web`.
3. Add the following Environment Variables in Vercel:
   - `NEXT_PUBLIC_API_URL`: `https://writing-backend.onrender.com/api`
   - `NEXT_PUBLIC_SOCKET_URL`: `https://writing-backend.onrender.com`
4. Click **Deploy**. Vercel will build and assign you a global production URL (e.g. `https://your-app.vercel.app` or your custom domain).

---

### Option 2: 1-Click Docker Deployment (VPS / DigitalOcean / AWS / Hetzner)

If you have a Linux VPS with Docker and Docker Compose installed:

```bash
# Clone your repository
git clone https://github.com/your-username/writing-assistant.git
cd writing-assistant

# Set your public URL or domain in your environment or .env
export NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
export NEXT_PUBLIC_SOCKET_URL=https://api.yourdomain.com

# Start all services in production mode
docker compose up -d --build
```

- Frontend will be available on port `3000` (or mapped to port 80/443 with Nginx/Caddy).
- Backend will be available on port `4000`.

---

## 🔒 Production Environment Variables

### Backend (`backend/.env`)
| Variable | Description | Required |
| :--- | :--- | :--- |
| `PORT` | Listening port (default: 4000) | No |
| `GEMINI_API_KEY` | Google Gemini key for cloud AI generation | Optional (Built-in offline engine fallback) |
| `OPENAI_API_KEY` | OpenAI key for cloud AI generation | Optional |
| `SUPABASE_URL` | Supabase URL for cloud database persistence | Optional (Local JSON DB fallback included) |
| `SUPABASE_ANON_KEY` | Supabase Anon Key | Optional |

### Frontend (`web/.env.production`)
| Variable | Description | Required |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_API_URL` | Full URL to backend `/api` endpoint | Yes (e.g. `https://api.yourdomain.com/api`) |
| `NEXT_PUBLIC_SOCKET_URL`| WebSocket endpoint for collaboration | Optional (Derives from API URL if omitted) |

---

## 🛠️ Key Built-in Capabilities for Public Launch

1. **Zero-Quota Fallback & Offline Intelligence**:
   - Local OCR parsing for images (`.png`, `.jpg`, `.jpeg`, `.webp`, `.bmp`) powered by Tesseract.js.
   - Local PDF parsing powered by `pdf-parse`.
   - Local Word document parsing powered by `mammoth`.
   - Heuristic resume decomposition that parses contact information, skills, experience, and education even if cloud AI quotas are exceeded.

2. **5 Designer Resume Templates**:
   - **Silicon Split**: Modern tech gradient sidebar layout.
   - **Modern Tech**: High-contrast, clean engineering resume.
   - **Forbes Executive**: Traditional, high-status serif executive layout.
   - **Creative Studio**: Vibrant indigo header for design and creative roles.
   - **Nordic Minimal**: Sleek Scandinavian minimalist design.

3. **Universal File Import & Export**:
   - Import documents or images into every single tool.
   - Multi-format export: PDF, Word (DOCX), Plain Text (TXT), Markdown (MD), and JSON.

4. **Multi-Platform Ecosystem**:
   - **Web**: Next.js 16 with App Router, full dashboard, dark & light themes.
   - **Mobile**: React Native / Expo application for iOS & Android.
   - **Extension**: Chrome & Edge extension for in-browser AI writing assistance.
