import { SOURCES } from '../db/knowledgeBase.js';
import { Citation, DocumentChunk } from '../types/index.js';
import { RetrievalResult } from './retriever.js';

export function buildCitations(results: RetrievalResult[]): Citation[] {
  return results.map((item, idx) => {
    const source = SOURCES.find(s => s.id === item.chunk.sourceId);
    
    return {
      index: idx + 1,
      chunkId: item.chunk.id,
      documentTitle: item.chunk.documentTitle,
      sourceName: source?.name || 'BIS Official Knowledge Base',
      authorityLevel: source?.authorityLevel || 'Official BIS',
      sourceUrl: source?.url || 'https://www.bis.gov.in',
      snippet: item.chunk.content.substring(0, 180) + '...',
      section: item.chunk.section
    };
  });
}
