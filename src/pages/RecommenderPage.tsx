import React, { useState } from 'react';
import { Layers, Sparkles, AlertTriangle, CheckCircle, ArrowRight, ShieldCheck, Search } from 'lucide-react';
import { recommendProductStandard } from '../services/api';
import { RecommendationRequest, StandardRecommendation } from '../types';
import { ConfidenceBadge } from '../components/common/ConfidenceBadge';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const RecommenderPage: React.FC = () => {
  const { user } = useAuth();
  const userProf = user?.profile;

  const [form, setForm] = useState<RecommendationRequest>({
    productName: userProf?.mainProducts?.[0] || 'Stainless steel pressure cooker',
    category: userProf?.productCategories?.[0] || 'Cookware',
    material: userProf?.materialsUsed?.[0] || 'Stainless steel',
    intendedUse: 'Domestic kitchen cooking',
    manufacturingProcess: 'Deep drawing & stamping',
  });

  const [recommendations, setRecommendations] = useState<StandardRecommendation[] | null>(null);
  const [disclaimer, setDisclaimer] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.productName.trim()) return;

    setIsLoading(true);
    try {
      const res = await recommendProductStandard(form);
      setRecommendations(res.recommendations);
      setDisclaimer(res.disclaimer);
    } catch (err) {
      console.error('Error fetching recommendations:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      
      {/* Page Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider shadow-sm">
          <Layers className="w-3.5 h-3.5 text-emerald-600" /> Product-to-Standard Discovery Engine
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900">
          Find applicable Indian Standards for your product.
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto">
          Describe your product specifications, material, and intended use to discover potentially relevant Indian Standards and mandatory Quality Control Orders (QCOs).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Form Panel */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-md space-y-5">
          <h3 className="font-display font-bold text-base text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" /> Enter Product Specifications
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Product Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Stainless steel pressure cooker"
                value={form.productName}
                onChange={(e) => setForm({ ...form, productName: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Product Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:bg-white"
                >
                  <option value="Cookware">Cookware & Kitchenware</option>
                  <option value="Water">Water & Beverages</option>
                  <option value="Electrical">Electrical & Cables</option>
                  <option value="Jewellery">Jewellery & Gold</option>
                  <option value="Electronics">Electronics & IT</option>
                  <option value="Toys">Toys & Children Products</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Primary Material</label>
                <input
                  type="text"
                  placeholder="e.g. Stainless steel, PVC"
                  value={form.material}
                  onChange={(e) => setForm({ ...form, material: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Intended Use / Environment</label>
              <input
                type="text"
                placeholder="e.g. Domestic kitchen cooking"
                value={form.intendedUse}
                onChange={(e) => setForm({ ...form, intendedUse: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !form.productName.trim()}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 disabled:opacity-40 transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin text-white" />
                  <span>Matching Knowledge Base...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Discover Potentially Relevant Standards</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Results Panel */}
        <div className="lg:col-span-7 space-y-4">
          {recommendations ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-base text-slate-900">
                  Potentially Relevant Indian Standards ({recommendations.length})
                </h3>
              </div>

              {disclaimer && (
                <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p>{disclaimer}</p>
                </div>
              )}

              {recommendations.map((rec) => (
                <div key={rec.standard.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-md space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-display font-extrabold text-base text-emerald-700">{rec.standard.isNumber}</span>
                      <h4 className="font-bold text-sm text-slate-900 mt-0.5">{rec.standard.title}</h4>
                    </div>
                    <ConfidenceBadge confidence={rec.confidence} score={rec.matchScore} />
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">{rec.standard.description}</p>

                  {rec.mandatoryNotice && (
                    <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-rose-800 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-lg">
                      <ShieldCheck className="w-3.5 h-3.5 text-rose-600" /> {rec.mandatoryNotice}
                    </div>
                  )}

                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                    <span className="text-slate-500">Sector: {rec.standard.sector}</span>
                    <Link
                      to={`/standards/${rec.standard.id}`}
                      className="text-emerald-700 font-bold hover:text-emerald-900 hover:underline flex items-center gap-1"
                    >
                      View Standard Details <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center space-y-3 border border-slate-200 text-slate-500 shadow-sm">
              <Layers className="w-10 h-10 mx-auto stroke-1 text-slate-400" />
              <p className="text-xs sm:text-sm text-slate-600">Submit your product description on the left to analyze candidate Indian Standards.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
