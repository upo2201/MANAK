import { RetrievalResult } from './retriever.js';

export interface ValidationReport {
  isValid: boolean;
  groundingWarning?: string;
  disclaimer: string;
}

export function validateAnswerGrounding(query: string, results: RetrievalResult[]): ValidationReport {
  const disclaimer = 'MANAK AI is an AI-powered prototype grounded in retrieved official BIS records. Information should be verified against current official BIS sources (bis.gov.in) before making regulatory, licensing, or compliance decisions.';

  if (results.length === 0) {
    return {
      isValid: false,
      groundingWarning: 'Insufficient retrieved evidence found in the official BIS knowledge base for this query. No factual claims were synthesized to prevent hallucination.',
      disclaimer
    };
  }

  const isLowScore = results[0].combinedScore < 20;

  if (isLowScore) {
    return {
      isValid: true,
      groundingWarning: 'Low evidence grounding score. The response is synthesized cautiously based on general BIS regulatory framework principles.',
      disclaimer
    };
  }

  return {
    isValid: true,
    disclaimer
  };
}
