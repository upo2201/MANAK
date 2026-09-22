import React, { useState, useEffect } from 'react';
import { Database, FileText, CheckCircle2, RefreshCw, Plus, Layers } from 'lucide-react';
import { fetchKnowledgeStats } from '../services/api';

export const AdminKnowledgePage: React.FC = () => {
  const [stats, setStats] = useState<any | null>(null);

  useEffect(() => {
    fetchKnowledgeStats().then(setStats).catch(console.error);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-2">
            <Database className="w-3.5 h-3.5 text-emerald-600" /> Admin Knowledge Management
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900">Knowledge Ingestion & Chunks</h1>
        </div>

        <button className="px-4 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 text-xs font-semibold flex items-center gap-2 self-start transition-colors">
          <RefreshCw className="w-4 h-4 text-slate-500" /> Reindex Knowledge Base
        </button>
      </div>

      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] text-slate-500 font-bold uppercase">Official Sources</span>
            <p className="font-display font-extrabold text-2xl text-emerald-800 mt-1">{stats.sourcesCount}</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] text-slate-500 font-bold uppercase">Document Chunks</span>
            <p className="font-display font-extrabold text-2xl text-slate-900 mt-1">{stats.chunksCount}</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] text-slate-500 font-bold uppercase">Indian Standards</span>
            <p className="font-display font-extrabold text-2xl text-slate-900 mt-1">{stats.standardsCount}</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] text-slate-500 font-bold uppercase">Vector Index Status</span>
            <p className="font-bold text-xs text-emerald-800 mt-2 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Synced & Active
            </p>
          </div>
        </div>
      )}

      {/* Chunks List */}
      {stats && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-display font-bold text-base text-slate-900">Seeded Official Document Chunks</h3>
          <div className="space-y-3">
            {stats.chunks.map((chk: any) => (
              <div key={chk.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{chk.documentTitle}</span>
                  <span className="text-[10px] font-mono bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200">
                    {chk.section || 'General Clause'}
                  </span>
                </div>
                <p className="text-slate-700 leading-relaxed font-sans">{chk.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
