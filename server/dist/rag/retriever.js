import { DOCUMENT_CHUNKS } from '../db/knowledgeBase.js';
export function performHybridRetrieval(analysis, topK = 5) {
    const results = [];
    const queryTerms = Array.from(new Set([
        ...analysis.productKeywords,
        ...analysis.expandedQuery.flatMap(q => q.toLowerCase().split(/\s+/))
    ])).filter(t => t.length > 2);
    for (const chunk of DOCUMENT_CHUNKS) {
        const chunkText = `${chunk.documentTitle} ${chunk.content} ${chunk.section || ''} ${chunk.tags.join(' ')}`.toLowerCase();
        let lexicalScore = 0;
        const matchingTerms = [];
        // Check exact IS number matches (highest priority)
        for (const isNum of analysis.extractedIsNumbers) {
            const cleanIs = isNum.toLowerCase().replace(/[^a-z0-9]/g, '');
            const cleanChunkText = chunkText.replace(/[^a-z0-9]/g, '');
            if (cleanChunkText.includes(cleanIs)) {
                lexicalScore += 50.0;
                matchingTerms.push(isNum);
            }
        }
        // Token frequency and keyword matching
        for (const term of queryTerms) {
            if (chunkText.includes(term)) {
                lexicalScore += 5.0;
                // Extra boost if term is in document title or tags
                if (chunk.documentTitle.toLowerCase().includes(term))
                    lexicalScore += 10.0;
                if (chunk.tags.some(t => t.toLowerCase().includes(term)))
                    lexicalScore += 7.0;
                matchingTerms.push(term);
            }
        }
        // Semantic keyword proximity score (mock vector distance simulation for zero API dependency mode)
        let semanticScore = 0;
        const uniqueMatches = Array.from(new Set(matchingTerms));
        if (uniqueMatches.length > 0) {
            semanticScore = Math.min(100, (uniqueMatches.length / Math.max(1, queryTerms.length)) * 80 + lexicalScore * 0.5);
        }
        const combinedScore = parseFloat((lexicalScore * 0.6 + semanticScore * 0.4).toFixed(2));
        if (combinedScore > 0) {
            results.push({
                chunk: { ...chunk, relevanceScore: combinedScore },
                lexicalScore,
                semanticScore,
                combinedScore,
                matchingTerms: Array.from(new Set(matchingTerms))
            });
        }
    }
    // Sort by combined score descending
    results.sort((a, b) => b.combinedScore - a.combinedScore);
    return results.slice(0, topK);
}
