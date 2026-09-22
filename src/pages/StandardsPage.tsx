import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ShieldCheck, ArrowRight, Table, LayoutGrid } from 'lucide-react';
import { fetchStandards } from '../services/api';
import { Standard } from '../types';

export const StandardsPage: React.FC = () => {
  const [standards, setStandards] = useState<Standard[]>([]);
  const [search, setSearch] = useState('');
  const [sector, setSector] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStandards();
  }, [search, sector]);

  const loadStandards = async () => {
    setIsLoading(true);
    try {
      const data = await fetchStandards({ search, sector });
      setStandards(data.standards);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900">Standards Explorer</h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Search, filter, and inspect official Indian Standards (IS numbers), specifications, and QCO mandatory requirements.
          </p>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl p-1 self-start shadow-sm">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg text-xs font-semibold transition-colors ${viewMode === 'grid' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`p-2 rounded-lg text-xs font-semibold transition-colors ${viewMode === 'table' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
          >
            <Table className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm grid grid-cols-1 sm:grid-cols-12 gap-4">
        <div className="sm:col-span-8 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by IS number (e.g. IS 3042), title, or keyword..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white"
          />
        </div>

        <div className="sm:col-span-4 flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:bg-white"
          >
            <option value="all">All Technical Sectors</option>
            <option value="Mechanical Engineering & Consumer Goods">Mechanical & Consumer</option>
            <option value="Chemical & Environmental Engineering">Chemical & Water</option>
            <option value="Electrotechnical Engineering">Electrotechnical & Cables</option>
            <option value="Hallmarking & Precious Metals">Hallmarking & Gold</option>
          </select>
        </div>
      </div>

      {/* Content View */}
      {isLoading ? (
        <div className="text-center py-16 text-slate-500 text-xs">Loading official Indian Standards records...</div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {standards.map((std) => (
            <Link
              key={std.id}
              to={`/standards/${std.id}`}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-300 space-y-3 flex flex-col justify-between group transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-display font-extrabold text-base text-emerald-700 group-hover:text-emerald-800">
                    {std.isNumber}
                  </span>
                  {std.isMandatory && (
                    <span className="text-[10px] bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 rounded-full font-bold">
                      QCO Mandatory
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-sm text-slate-900 line-clamp-2">{std.title}</h3>
                <p className="text-xs text-slate-600 line-clamp-3">{std.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 text-[11px] truncate max-w-[180px]">{std.sector}</span>
                <span className="text-emerald-700 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  View <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
          <table className="w-full text-left text-xs text-slate-800">
            <thead className="bg-slate-50 uppercase font-semibold text-slate-600 border-b border-slate-200">
              <tr>
                <th className="p-4">IS Number</th>
                <th className="p-4">Standard Title</th>
                <th className="p-4">Sector</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {standards.map((std) => (
                <tr key={std.id} className="hover:bg-slate-50/80">
                  <td className="p-4 font-bold text-emerald-700">{std.isNumber}</td>
                  <td className="p-4 font-medium text-slate-900">{std.title}</td>
                  <td className="p-4 text-slate-600">{std.sector}</td>
                  <td className="p-4">
                    <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full text-[10px] font-semibold">
                      {std.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <Link to={`/standards/${std.id}`} className="text-emerald-700 hover:text-emerald-900 hover:underline font-bold">
                      Inspect
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};
