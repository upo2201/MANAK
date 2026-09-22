import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft, ExternalLink, Award, FlaskConical, Calendar, Tag } from 'lucide-react';
import { fetchStandardById, fetchLaboratories } from '../services/api';
import { Standard, Laboratory } from '../types';

export const StandardDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [standard, setStandard] = useState<Standard | null>(null);
  const [laboratories, setLaboratories] = useState<Laboratory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) loadData(id);
  }, [id]);

  const loadData = async (stdId: string) => {
    setIsLoading(true);
    try {
      const std = await fetchStandardById(stdId);
      setStandard(std);
      const labs = await fetchLaboratories({ standard: std.isNumber });
      setLaboratories(labs.laboratories);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div className="text-center py-20 text-slate-500 text-xs">Loading standard details...</div>;
  if (!standard) return <div className="text-center py-20 text-slate-500 text-xs">Standard not found.</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      
      {/* Back button */}
      <Link to="/standards" className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 font-semibold">
        <ArrowLeft className="w-4 h-4 text-slate-500" /> Back to Standards Explorer
      </Link>

      {/* Main Standard Header Card */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <span className="font-display font-extrabold text-2xl sm:text-3xl text-emerald-700">{standard.isNumber}</span>
            <h1 className="font-display font-bold text-xl sm:text-2xl text-slate-900 mt-1">{standard.title}</h1>
          </div>

          <div className="flex flex-col items-end gap-2">
            <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold">
              Status: {standard.status}
            </span>
            {standard.isMandatory && (
              <span className="bg-rose-50 text-rose-800 border border-rose-200 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-rose-600" /> QCO Mandatory ISI Certification
              </span>
            )}
          </div>
        </div>

        {/* Overview & Metadata */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
            <span className="text-slate-500 font-bold uppercase text-[10px] flex items-center gap-1">
              <Tag className="w-3 h-3 text-emerald-600" /> Sector
            </span>
            <p className="font-bold text-slate-900">{standard.sector}</p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
            <span className="text-slate-500 font-bold uppercase text-[10px] flex items-center gap-1">
              <Calendar className="w-3 h-3 text-emerald-600" /> Edition & Publication
            </span>
            <p className="font-bold text-slate-900">{standard.edition} ({standard.publicationDate})</p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
            <span className="text-slate-500 font-bold uppercase text-[10px] flex items-center gap-1">
              <Award className="w-3 h-3 text-emerald-600" /> Scheme Pathway
            </span>
            <p className="font-bold text-emerald-700">Product Certification Scheme I (ISI Mark)</p>
          </div>
        </div>

        {/* Full Scope & Description */}
        <div className="space-y-2">
          <h3 className="font-bold text-sm text-slate-900">Standard Overview & Technical Scope</h3>
          <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
            {standard.description}
          </p>
        </div>

        {/* Action Link to Official BIS Portal */}
        <div className="pt-2 flex justify-end">
          <a
            href={standard.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs inline-flex items-center gap-2 transition-all shadow-md shadow-emerald-600/20"
          >
            <span>Verify on Official BIS Know Your Standard</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Associated Testing Laboratories Section */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-4">
        <h3 className="font-display font-bold text-base text-slate-900 flex items-center gap-2">
          <FlaskConical className="w-5 h-5 text-emerald-600" /> BIS Recognized Laboratories for {standard.isNumber}
        </h3>

        {laboratories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {laboratories.map((lab) => (
              <div key={lab.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
                <h4 className="font-bold text-slate-900">{lab.name}</h4>
                <p className="text-slate-600">{lab.location}, {lab.city}, {lab.state}</p>
                <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-200">
                  <span>Phone: {lab.contactPhone}</span>
                  <span className="text-emerald-700 font-semibold">{lab.contactEmail}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-500">Samples drawn for this standard are evaluated across BIS Central and Regional Laboratories.</p>
        )}
      </div>

    </div>
  );
};
