import { describe, it, expect } from 'vitest';
import { detectIntent } from '../src/rag/intent.js';
import { performHybridRetrieval } from '../src/rag/retriever.js';
import { calculateConfidence } from '../src/rag/confidence.js';
import { processRAGQuery } from '../src/rag/pipeline.js';

describe('MANAK AI RAG Engine Tests', () => {
  it('should accurately detect intent for pressure cooker query', () => {
    const analysis = detectIntent('What Indian Standard applies to stainless steel pressure cooker?');
    expect(analysis.extractedIsNumbers).toEqual([]);
    expect(analysis.intent).toBe('PRODUCT_STANDARD_RECOMMENDATION');
  });

  it('should extract exact IS numbers from query', () => {
    const analysis = detectIntent('Explain requirements under IS 3042:1990');
    expect(analysis.extractedIsNumbers).toContain('IS 3042');
    expect(analysis.intent).toBe('STANDARD_LOOKUP');
  });

  it('should retrieve IS 3042 chunk with high score for pressure cooker', () => {
    const intent = detectIntent('stainless steel pressure cooker');
    const hits = performHybridRetrieval(intent, 3);

    expect(hits.length).toBeGreaterThan(0);
    expect(hits[0].chunk.documentTitle).toContain('IS 3042');
  });

  it('should calculate High confidence for query with exact chunk matches', () => {
    const intent = detectIntent('IS 3042 pressure cooker safety valve');
    const hits = performHybridRetrieval(intent, 3);
    const confidence = calculateConfidence(hits);

    expect(confidence.level).toBe('High');
    expect(confidence.score).toBeGreaterThanOrEqual(75);
  });

  it('should synthesize a grounded response with citations', async () => {
    const res = await processRAGQuery({ query: 'What is the standard for stainless steel pressure cookers?' });
    expect(res.answer).toContain('[1]');
    expect(res.citations.length).toBeGreaterThan(0);
    expect(res.confidence).toBe('High');
    expect(res.isDemoMode).toBe(true);
  });
});
