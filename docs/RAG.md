# MANAK AI RAG Pipeline & Anti-Hallucination Guardrails

## RAG Principles
1. **Source First**: No factual claim regarding an Indian Standard, fee, or laboratory location is stated without explicit chunk grounding.
2. **Citation Mapping**: Generated responses map exact citation indices `[1]`, `[2]` directly back to document chunk IDs.
3. **No Fabricated Standards**: If no official BIS record matches the query, the assistant explicitly states that evidence was insufficient rather than inventing IS numbers.

## Judge RAG Inspection Console (`/admin/retrieval`)
Judges can inspect every phase of the pipeline live by querying the RAG console:
- Extracted IS numbers and intent
- Lexical BM25 & Semantic scores
- Authority reranked results
- Assembled context chunks
- Final cited response
