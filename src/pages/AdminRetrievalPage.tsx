import React, { useState } from 'react';
import { Cpu, Search, Sparkles, CheckCircle, ArrowRight, ShieldCheck, FileText, Layers } from 'lucide-react';
import { runAdminRetrievalTest } from '../services/api';

export const AdminRetrievalPage: React.FC = () => {
  const [query, setQuery] = useState('What Indian Standard applies to stainless steel pressure cookers?');
  const [testResult, setTestResult] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTest = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const res = await runAdminRetrievalTest(query);
      setTestResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider">
          <Cpu className="w-3.5 h-3.5 text-emerald-600" /> Judge RAG Inspection Console
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900">
          Step-by-Step RAG Retrieval Test Console.
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto">
          Demonstrates to hackathon judges that MANAK AI uses a real modular RAG pipeline: Query Normalization → Intent Detection → Hybrid Retrieval → Authority Reranking → Grounding Validation → Cited Synthesis.
        </p>
      </div>

      {/* Query Input Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <form onSubmit={handleTest} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter any query to trace RAG pipeline execution..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 font-mono"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-colors flex items-center justify-center gap-2"
          >
            {isLoading ? <Sparkles className="w-4 h-4 animate-spin text-emerald-200" /> : <Cpu className="w-4 h-4" />}
            <span>Execute RAG Trace</span>
          </button>
        </form>
      </div>

      {/* RAG Inspection Trace Output */}
      {testResult && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* STEP 1: Intent & Query Normalization */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <span className="font-mono text-xs font-bold text-emerald-800 uppercase">STEP 1: Intent & Normalization</span>
              <span className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full font-bold">
                Intent: {testResult.trace.step1_intentAnalysis.intent}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Extracted IS Numbers</span>
                <p className="font-mono text-emerald-800 font-bold mt-1">
                  {testResult.trace.step1_intentAnalysis.extractedIsNumbers.join(', ') || 'None extracted'}
                </p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Extracted Keywords</span>
                <p className="font-mono text-slate-900 font-bold mt-1">
                  {testResult.trace.step1_intentAnalysis.productKeywords.join(', ') || 'None'}
                </p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Expanded Queries</span>
                <p className="font-mono text-slate-700 text-[11px] mt-1">
                  {testResult.trace.step1_intentAnalysis.expandedQuery.join(' | ')}
                </p>
              </div>
            </div>
          </div>

          {/* STEP 2: Hybrid Retrieval (Lexical + Semantic Hits) */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <span className="font-mono text-xs font-bold text-emerald-800 uppercase">STEP 2: Hybrid Retrieval Scores (BM25 + Semantic Proximity)</span>
              <span className="text-xs text-slate-500 font-mono">Retrieved {testResult.trace.step2_lexicalAndSemanticHits.length} Hits</span>
            </div>

            <div className="space-y-3">
              {testResult.trace.step2_lexicalAndSemanticHits.map((hit: any, idx: number) => (
                <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="font-bold text-slate-900">{hit.documentTitle}</span>
                    <p className="text-slate-500 text-[11px] font-mono mt-0.5">Matching terms: {hit.matchingTerms.join(', ')}</p>
                  </div>

                  <div className="flex items-center gap-3 font-mono text-[11px]">
                    <span className="text-slate-600">BM25 Lexical: <strong className="text-slate-900">{hit.lexicalScore}</strong></span>
                    <span className="text-slate-600">Semantic: <strong className="text-slate-900">{hit.semanticScore}</strong></span>
                    <span className="bg-emerald-50 text-emerald-800 px-2 py-1 rounded font-bold border border-emerald-200">
                      Combined: {hit.combinedScore}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* STEP 3 & 4: Final Synthesized Answer */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <span className="font-mono text-xs font-bold text-emerald-800 uppercase">STEP 3 & 4: Grounded Synthesis & Citations</span>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Confidence: {testResult.trace.step4_confidence.level} ({testResult.trace.step4_confidence.score}%)
              </span>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
              <div className="text-xs sm:text-sm text-slate-800 whitespace-pre-wrap leading-relaxed font-sans">
                {testResult.trace.step6_finalResponse.answer}
              </div>

              <div className="pt-3 border-t border-slate-200 text-xs text-slate-600 space-y-1">
                <span className="font-bold text-slate-700">Evidence Citations Mapped:</span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {testResult.trace.step6_finalResponse.citations.map((c: any) => (
                    <span key={c.index} className="bg-white border border-slate-200 text-emerald-800 px-2.5 py-1 rounded-lg text-[11px] font-mono shadow-xs">
                      [{c.index}] {c.documentTitle}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
