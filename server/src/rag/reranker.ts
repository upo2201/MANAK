import { SOURCES } from '../db/knowledgeBase.js';
import { RetrievalResult } from './retriever.js';

export function rerankResults(results: RetrievalResult[]): RetrievalResult[] {
  return results.map(item => {
    const source = SOURCES.find(s => s.id === item.chunk.sourceId);
    let authorityMultiplier = 1.0;

    if (source) {
      if (source.authorityLevel === 'Official BIS') authorityMultiplier = 1.4;
      else if (source.authorityLevel === 'Government Notification') authorityMultiplier = 1.3;
      else if (source.authorityLevel === 'Empanelled Portal') authorityMultiplier = 1.1;
    }

    const rerankedScore = parseFloat((item.combinedScore * authorityMultiplier).toFixed(2));

    return {
      ...item,
      combinedScore: rerankedScore
    };
  }).sort((a, b) => b.combinedScore - a.combinedScore);
}
