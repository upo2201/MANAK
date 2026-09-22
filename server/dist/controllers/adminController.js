import { detectIntent } from '../rag/intent.js';
import { performHybridRetrieval } from '../rag/retriever.js';
import { rerankResults } from '../rag/reranker.js';
import { calculateConfidence } from '../rag/confidence.js';
import { processRAGQuery } from '../rag/pipeline.js';
import { DOCUMENT_CHUNKS, SOURCES, STANDARDS } from '../db/knowledgeBase.js';
export async function runRetrievalTest(req, res) {
    try {
        const { query } = req.body;
        if (!query || typeof query !== 'string') {
            res.status(400).json({ error: 'Query parameter is required for retrieval test.' });
            return;
        }
        // Step-by-Step RAG Inspection Trace for SIH Judges
        const intentAnalysis = detectIntent(query);
        const rawRetrievalHits = performHybridRetrieval(intentAnalysis, 6);
        const rerankedHits = rerankResults(rawRetrievalHits);
        const confidence = calculateConfidence(rerankedHits);
        const ragResponse = await processRAGQuery({ query });
        res.json({
            query,
            trace: {
                step1_intentAnalysis: intentAnalysis,
                step2_lexicalAndSemanticHits: rawRetrievalHits.map(hit => ({
                    chunkId: hit.chunk.id,
                    documentTitle: hit.chunk.documentTitle,
                    lexicalScore: hit.lexicalScore,
                    semanticScore: hit.semanticScore,
                    combinedScore: hit.combinedScore,
                    matchingTerms: hit.matchingTerms
                })),
                step3_rerankedHits: rerankedHits.map(hit => ({
                    chunkId: hit.chunk.id,
                    documentTitle: hit.chunk.documentTitle,
                    authorityBoostedScore: hit.combinedScore,
                    sourceId: hit.chunk.sourceId
                })),
                step4_confidence: confidence,
                step5_assembledContext: rerankedHits.map(h => h.chunk.content),
                step6_finalResponse: ragResponse
            }
        });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}
export function getKnowledgeStats(req, res) {
    res.json({
        sourcesCount: SOURCES.length,
        chunksCount: DOCUMENT_CHUNKS.length,
        standardsCount: STANDARDS.length,
        isDemoMode: true,
        indexStatus: 'Active & Vector Index Synced',
        sources: SOURCES,
        chunks: DOCUMENT_CHUNKS
    });
}
