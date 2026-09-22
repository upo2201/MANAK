# MANAK AI — AI-Powered Intelligent Assistant for Indian Standards & BIS Services

**MANAK AI** is a national hackathon prototype built to transform how Indian industries, manufacturers, laboratories, jewellers, consumers, and students interact with the Bureau of Indian Standards (BIS) ecosystem.

Built with a **Source-First, Zero-Hallucination Retrieval-Augmented Generation (RAG)** pipeline, MANAK AI delivers grounded guidance backed by explicit document citations `[1]`, confidence scoring, and interactive inspection traces.

---

## 🌟 Differentiating Features

1. **Source-Grounded RAG Pipeline**: Uses hybrid BM25 lexical token scoring + semantic proximity + source authority reranking (Official BIS > Govt Gazette > Secondary) to synthesize factual answers.
2. **Product → Standard Discovery Engine**: Input product specifications, materials, and intended use to receive candidate Indian Standards (IS numbers) and QCO mandatory notices.
3. **Interactive Step-by-Step RAG Inspector (`/admin/retrieval`)**: Critical SIH judge demonstration console exposing the exact trace from query to intent, retrieval hits, authority scores, context assembly, and citation mapping.
4. **Out-of-the-Box Demo Mode**: Zero external API dependencies required to run out of the box using seeded official BIS records. Seamlessly upgrades when OpenAI/Gemini API keys are provided.
5. **Multilingual & Voice Support**: Interactive support for English, Hindi, and Bengali with browser Web Speech API voice input.
6. **Domain Modules**: Standards Explorer, Interactive Certification Pathways, Testing Laboratory Finder with Leaflet Maps, Gold Hallmarking & 6-digit HUID verification, and Consumer Rights portal.

---

## 🚀 Quick Start Setup

### Prerequisites
- Node.js v18+ and npm v9+

### 1. Installation
```bash
git clone <repository-url>
cd MANAK
npm install
```

### 2. Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
*(No API keys or external database setup required for DEMO MODE).*

### 3. Run Development Application
To launch both Express backend (Port 5000) and React Vite frontend (Port 5173):
```bash
npm run dev
```
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000/api/health`

### 4. Run Automated Test Suite
```bash
npm run test
```

---

## 🏛 System Architecture Overview

```
User Query ──> Intent Detection ──> Hybrid Retrieval ──> Authority Reranker ──> Grounding Check ──> Cited Synthesis
```

For full documentation, inspect:
- [ARCHITECTURE.md](docs/ARCHITECTURE.md)
- [RAG.md](docs/RAG.md)
- [DATA_MODEL.md](docs/DATA_MODEL.md)
- [DEMO.md](docs/DEMO.md)
