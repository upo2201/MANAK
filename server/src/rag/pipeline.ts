import { RAGRequest, RAGResponse } from '../types/index.js';
import { detectIntent } from './intent.js';
import { performHybridRetrieval } from './retriever.js';
import { rerankResults } from './reranker.js';
import { calculateConfidence } from './confidence.js';
import { buildCitations } from './citation.js';
import { validateAnswerGrounding } from './validator.js';
import { LLMProvider } from '../llm/provider.js';

const llmProvider = new LLMProvider();

export async function processRAGQuery(request: RAGRequest): Promise<RAGResponse> {
  const { query, language = request.userProfile?.preferredLanguage || 'en', responseDepth = request.userProfile?.informationDepth || 'Detailed', userProfile } = request;

  // Step 1: Query Normalization & Intent Detection
  const intentAnalysis = detectIntent(query);

  // Step 2 & 3: Hybrid Retrieval (Lexical BM25 + Semantic keyword proximity)
  const rawRetrievalHits = performHybridRetrieval(intentAnalysis, 5);

  // Step 4: Reranking based on Source Authority
  const rerankedHits = rerankResults(rawRetrievalHits);

  // Step 5: Confidence Calculation
  const confidence = calculateConfidence(rerankedHits);

  // Step 6: Context Assembly & Citations Mapping
  const citations = buildCitations(rerankedHits);
  const contextChunks = rerankedHits.map(hit => hit.chunk);

  // Step 7: LLM Generation / Grounded Synthesis
  const generationResult = await llmProvider.generate({
    query,
    intent: intentAnalysis,
    chunks: contextChunks,
    citations,
    language,
    responseDepth,
    userProfile
  });

  // Step 8: Safety & Anti-hallucination Validation
  const validation = validateAnswerGrounding(query, rerankedHits);

  return {
    answer: generationResult.answer,
    structuredExplanation: generationResult.structuredExplanation,
    intent: intentAnalysis.intent,
    confidence: confidence.level,
    confidenceScore: confidence.score,
    citations,
    retrievedChunks: contextChunks,
    suggestedFollowups: generationResult.followups,
    isDemoMode: true,
    disclaimer: validation.disclaimer
  };
}
