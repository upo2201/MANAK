import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ExternalLink, Cpu, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white text-slate-600 py-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        
        {/* Brand Info */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">
              <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
            </div>
            <span className="font-display font-bold text-lg text-slate-900">MANAK <span className="text-emerald-700">AI</span></span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            AI-powered intelligent assistant for Indian Standards, BIS certification, hallmarking, and conformity assessment ecosystem.
          </p>
          <div className="inline-flex items-center gap-2 bg-slate-100 border border-slate-200 rounded-lg px-3 py-1.5 text-[11px] text-slate-700">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            Demo Grounded RAG Mode
          </div>
        </div>

        {/* Core Portals */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Ecosystem Portals</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/assistant" className="hover:text-emerald-700 transition-colors">Ask MANAK AI</Link></li>
            <li><Link to="/standards" className="hover:text-emerald-700 transition-colors">Standards Explorer</Link></li>
            <li><Link to="/recommend" className="hover:text-emerald-700 transition-colors">Product Recommender</Link></li>
            <li><Link to="/certification" className="hover:text-emerald-700 transition-colors">BIS Certification Hub</Link></li>
            <li><Link to="/laboratories" className="hover:text-emerald-700 transition-colors">Testing Lab Finder</Link></li>
          </ul>
        </div>

        {/* Stakeholder Hubs */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Stakeholder Hubs</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/hallmarking" className="hover:text-emerald-700 transition-colors">Jewellers & Hallmarking</Link></li>
            <li><Link to="/consumer" className="hover:text-emerald-700 transition-colors">Consumer Rights & Verification</Link></li>
            <li><Link to="/learning" className="hover:text-emerald-700 transition-colors">BIS Learning Centre</Link></li>
            <li><Link to="/admin/retrieval" className="hover:text-emerald-700 transition-colors">RAG Inspection Console</Link></li>
            <li><Link to="/admin/knowledge" className="hover:text-emerald-700 transition-colors">Knowledge Base Management</Link></li>
          </ul>
        </div>

        {/* Official References */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Official BIS Resources</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <a href="https://www.bis.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-700 transition-colors inline-flex items-center gap-1">
                Official BIS Portal <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </li>
            <li>
              <a href="https://www.manakonline.in" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-700 transition-colors inline-flex items-center gap-1">
                ManakOnline e-BIS <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </li>
            <li>
              <a href="https://www.crsbis.in" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-700 transition-colors inline-flex items-center gap-1">
                CRS Registration Portal <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Trust Disclaimer Bar */}
      <div className="max-w-7xl mx-auto pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
        <p>
          MANAK AI is an AI-powered prototype. Information should be verified against current official BIS sources before making regulatory, certification or compliance decisions.
        </p>
        <div className="flex items-center gap-2 text-slate-600 font-medium">
          <span>Built for SIH Prototype Demonstration</span>
        </div>
      </div>
    </footer>
  );
};
