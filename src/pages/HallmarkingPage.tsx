import React, { useState, useEffect } from 'react';
import { Gem, ShieldCheck, CheckCircle2, ArrowRight, ExternalLink, QrCode } from 'lucide-react';
import { fetchHallmarkingOverview } from '../services/api';
import { HallmarkingCentre } from '../types';
import { Link } from 'react-router-dom';

export const HallmarkingPage: React.FC = () => {
  const [data, setData] = useState<{ centres: HallmarkingCentre[]; mandatoryPurityGrades: any[]; mandatoryMarks: any[] } | null>(null);

  useEffect(() => {
    fetchHallmarkingOverview().then(setData).catch(console.error);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider shadow-sm">
          <Gem className="w-3.5 h-3.5 text-amber-600" /> BIS Gold Hallmarking Portal
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900">
          Mandatory Gold Hallmarking & HUID Verification.
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto">
          Grounded in IS 1417:2019 and IS 15820:2009 specifications for jewellers, assaying centres, and consumer protection.
        </p>
      </div>

      {/* 3 Mandatory Hallmark Marks Showcase */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md space-y-6">
        <h3 className="font-display font-bold text-xl text-slate-900 text-center">
          The 3 Mandatory Marks on Genuine Gold Jewellery
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-amber-50/60 p-6 rounded-2xl border border-amber-200 text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 font-extrabold text-lg flex items-center justify-center mx-auto border border-amber-300 shadow-sm">
              BIS
            </div>
            <h4 className="font-bold text-sm text-slate-900">1. BIS Standard Mark</h4>
            <p className="text-xs text-slate-600">Authentic Bureau of Indian Standards hallmark logo stamped on precious metal.</p>
          </div>

          <div className="bg-amber-50/60 p-6 rounded-2xl border border-amber-200 text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 font-extrabold text-xs flex items-center justify-center mx-auto border border-amber-300 shadow-sm">
              22K916
            </div>
            <h4 className="font-bold text-sm text-slate-900">2. Purity & Fineness Grade</h4>
            <p className="text-xs text-slate-600">Purity specification e.g., 22K916 (91.6% pure gold) or 18K750 (75% pure gold).</p>
          </div>

          <div className="bg-amber-50/60 p-6 rounded-2xl border border-amber-200 text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center mx-auto border border-amber-300 font-mono shadow-sm">
              A1B2C3
            </div>
            <h4 className="font-bold text-sm text-slate-900">3. 6-Digit HUID Code</h4>
            <p className="text-xs text-slate-600">Hallmark Unique Identification laser engraved code for total consumer traceability.</p>
          </div>
        </div>
      </div>

      {/* Mandatory Purity Grades Table */}
      {data && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-4">
          <h3 className="font-display font-bold text-lg text-slate-900">IS 1417 Fineness & Purity Grades</h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {data.mandatoryPurityGrades.map((grade: any) => (
              <div key={grade.karat} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-center space-y-1">
                <span className="font-display font-extrabold text-base text-amber-800">{grade.karat}</span>
                <p className="text-xs font-bold text-slate-900">Fineness {grade.fineness}</p>
                <p className="text-[10px] text-slate-500 leading-tight">{grade.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Assaying & Hallmarking Centres (AHCs) */}
      {data && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-4">
          <h3 className="font-display font-bold text-lg text-slate-900">BIS Recognized Assaying & Hallmarking Centres (AHCs)</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.centres.map((ahc) => (
              <div key={ahc.id} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900">{ahc.name}</h4>
                  <span className="text-[10px] bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full font-bold">
                    {ahc.centreCode}
                  </span>
                </div>
                <p className="text-slate-600">{ahc.location}, {ahc.city}, {ahc.state}</p>
                <div className="flex flex-wrap gap-1 pt-1">
                  {ahc.services.map((s, idx) => (
                    <span key={idx} className="bg-white border border-slate-200 text-slate-700 text-[10px] px-2 py-0.5 rounded-md font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
