# MANAK AI System Architecture Specification

## Overview
MANAK AI is designed as a modular, enterprise-grade full-stack architecture separated cleanly between a React TypeScript frontend and a Node.js Express backend.

```
+-------------------------------------------------------------------------+
|                              REACT FRONTEND                             |
|  - Vite + TypeScript + Tailwind CSS                                    |
|  - Framer Motion + Leaflet Maps                                         |
|  - Router: Landing, Assistant, Recommender, Standards, Labs, Admin      |
+------------------------------------+------------------------------------+
                                     | REST JSON APIs
                                     v
+-------------------------------------------------------------------------+
|                           EXPRESS BACKEND                               |
|  - TypeScript Controllers & API Router                              |
|  - Modular RAG Engine (Intent, Retriever, Reranker, Citation)           |
|  - Provider Abstraction (Demo Grounded Synthesizer / OpenAI / Gemini)  |
|  - In-Memory Seed Repository / PostgreSQL Ready                         |
+-------------------------------------------------------------------------+
```

## Modular RAG Pipeline Architecture
1. **Query Normalizer & Intent Classifier**: Classifies queries into domain categories (`PRODUCT_STANDARD_RECOMMENDATION`, `CERTIFICATION_PROCESS_GUIDANCE`, `LABORATORY_LOOKUP`, `HALLMARKING_INQUIRY`, `CONSUMER_RIGHTS_VERIFICATION`, `STANDARD_LOOKUP`).
2. **Hybrid Retriever**: Combines lexical BM25 token matching with exact IS number boosting and semantic keyword proximity scoring.
3. **Authority Reranker**: Adjusts document scores by source authority multipliers (Official BIS: 1.4x, Govt Gazette: 1.3x).
4. **Confidence Scorer**: Calculates transparent evidence confidence (High, Medium, Low).
5. **Context Synthesizer**: Injects chunk references `[1]`, `[2]` and validates claims against context to eliminate hallucinations.
