import React from 'react';
import { X, FileText, CheckCircle2, ShieldAlert, ExternalLink, Cpu, BookOpen, ShieldCheck } from 'lucide-react';
import { RAGResponse } from '../../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  ragResponse: RAGResponse;
}

export const WhyThisAnswerModal: React.FC<Props> = ({ isOpen, onClose, ragResponse }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl p-6 border border-slate-200 shadow-2xl max-h-[90vh] overflow-y-auto space-y-6 text-slate-900">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <h3 className="font-display font-bold text-lg text-slate-900">Why this answer? — Evidence Explanation</h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              A transparent breakdown of official Bureau of Indian Standards (BIS) documents used to synthesize your response.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Human-Readable Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-500">Topic Area</span>
            <p className="text-xs font-bold text-emerald-700 mt-1 capitalize">{ragResponse.intent.replace(/_/g, ' ')}</p>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-500">Evidence Strength</span>
            <p className="text-xs font-bold text-slate-900 mt-1">{ragResponse.confidence} Grounding ({ragResponse.confidenceScore}%)</p>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-500">Supporting Information</span>
            <p className="text-xs font-bold text-slate-900 mt-1">{ragResponse.citations.length} Verified Sources</p>
          </div>
        </div>

        {/* Supporting References List */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-emerald-600" />
            Official Supporting References
          </h4>

          {ragResponse.citations.map((cite) => {
            const matchedChunk = ragResponse.retrievedChunks.find(c => c.id === cite.chunkId);
            return (
              <div key={cite.index} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center border border-emerald-200">
                      [{cite.index}]
                    </span>
                    <span className="font-bold text-xs text-slate-900">{cite.documentTitle}</span>
                  </div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">
                    {cite.authorityLevel}
                  </span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed pl-4 border-l-2 border-emerald-500 py-1 italic bg-white p-2.5 rounded-r-lg border-y border-r border-slate-200">
                  "{matchedChunk?.content || cite.snippet}"
                </p>

                <div className="flex items-center justify-between pt-2 text-[11px] text-slate-500 border-t border-slate-200/80">
                  <span>Source: <strong className="text-slate-800">{cite.sourceName}</strong> ({cite.section || 'Official Clause'})</span>
                  <a
                    href={cite.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-700 font-semibold hover:underline inline-flex items-center gap-1"
                  >
                    View Source Portal <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Safety & Compliance Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">{ragResponse.disclaimer}</p>
        </div>

        {/* Close Button */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition-colors shadow-sm"
          >
            Close Explanation
          </button>
        </div>

      </div>
    </div>
  );
};

