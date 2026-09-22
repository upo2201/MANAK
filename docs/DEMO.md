# MANAK AI SIH 3-5 Minute Judge Demonstration Script

Follow this script to demonstrate MANAK AI during hackathon judging:

### Step 1: Landing Page Showcase (0:00 - 0:45)
- Open `http://localhost:5173/`
- Highlight the cinematic hero headline: *"India's standards ecosystem, made intelligent."*
- Point out the floating live RAG trace card demonstrating source-grounded citations `[1]`.
- Scroll through "One assistant. Many journeys." and the visual RAG pipeline diagram.

### Step 2: Main AI Assistant & Grounded Answers (0:45 - 2:00)
- Click **"Ask MANAK AI"** to open `/assistant`.
- Click the sample prompt: *"What Indian Standard applies to my stainless steel pressure cooker?"*
- Show the synthesized response with:
  - **IS 3042:1990** primary standard identification.
  - Mandatory QCO warning.
  - Clickable citation badge `[1]`.
  - Evidence Confidence Badge: **High (92%)**.
- Click **"Why this answer?"** to expose the live RAG evidence trace modal to the judges.

### Step 3: Product-to-Standard Discovery Engine (2:00 - 2:45)
- Navigate to `/recommend`.
- Show how a manufacturer enters a product description (e.g. *"Stainless steel pressure cooker"*) and receives candidate standards with confidence scores.

### Step 4: Laboratory Finder & Map (2:45 - 3:30)
- Navigate to `/laboratories`.
- Show the interactive OpenStreetMap Leaflet visualization displaying BIS Central Laboratory (Sahibabad), WROL (Mumbai), SROL (Chennai), and EROL (Kolkata).

### Step 5: Judge RAG Inspection Console (3:30 - 4:30)
- Navigate to `/admin/retrieval`.
- Enter any query and execute the trace.
- Demonstrate step-by-step intent detection, lexical BM25 scores, semantic proximity, authority reranking, and citation mapping.
