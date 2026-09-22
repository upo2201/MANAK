import React from 'react';
import { ShieldCheck, AlertTriangle, Info } from 'lucide-react';

interface Props {
  confidence: 'High' | 'Medium' | 'Low';
  score?: number;
}

export const ConfidenceBadge: React.FC<Props> = ({ confidence, score }) => {
  const isHigh = confidence === 'High';
  const isMedium = confidence === 'Medium';

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border transition-all ${
        isHigh
          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
          : isMedium
          ? 'bg-amber-50 text-amber-800 border-amber-200'
          : 'bg-rose-50 text-rose-800 border-rose-200'
      }`}
    >
      {isHigh ? (
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
      ) : isMedium ? (
        <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
      ) : (
        <Info className="w-3.5 h-3.5 text-rose-600" />
      )}
      <span>Evidence Strength: {confidence}</span>
      {score !== undefined && <span className="opacity-75 font-normal">({score}%)</span>}
    </div>
  );
};

