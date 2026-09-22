# MANAK AI Installation & Environment Setup Guide

## System Requirements
- OS: Windows, Linux, or macOS
- Node.js: v18.0.0 or higher
- npm: v9.0.0 or higher

## Step-by-Step Local Deployment

1. **Clone & Install Dependencies**
```bash
git clone <repo-url>
cd MANAK
npm install
```

2. **Environment Configuration**
Create `.env` file at root based on `.env.example`:
```env
PORT=5000
NODE_ENV=development
AI_PROVIDER=demo
VITE_API_URL=http://localhost:5000
```

3. **Start Development Servers**
```bash
npm run dev
```
This runs Express backend on `http://localhost:5000` and Vite frontend on `http://localhost:5173` concurrently.

4. **Verify Backend Health**
```bash
curl http://localhost:5000/api/health
```

5. **Run Automated Test Suite**
```bash
npm run test
```
