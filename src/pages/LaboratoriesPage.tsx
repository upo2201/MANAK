import React, { useState, useEffect } from 'react';
import { FlaskConical, Search, MapPin, Phone, Mail, Filter } from 'lucide-react';
import { fetchLaboratories } from '../services/api';
import { Laboratory } from '../types';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export const LaboratoriesPage: React.FC = () => {
  const [laboratories, setLaboratories] = useState<Laboratory[]>([]);
  const [search, setSearch] = useState('');
  const [state, setState] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadLabs();
  }, [search, state]);

  const loadLabs = async () => {
    setIsLoading(true);
    try {
      const data = await fetchLaboratories({ search, state });
      setLaboratories(data.laboratories);
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2 shadow-sm">
            <FlaskConical className="w-3.5 h-3.5 text-emerald-600" /> BIS Testing Network
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900">Laboratory Finder</h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Locate BIS Central, Regional, and empanelled testing laboratories across India by testing scope and location.
          </p>
        </div>
      </div>

      {/* Map & Directory split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Search & Laboratory Cards */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Filters */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search lab name, city (e.g. Sahibabad, Mumbai, Chennai)..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white"
              />
            </div>
          </div>

          {/* Laboratory Cards List */}
          {isLoading ? (
            <div className="text-center py-12 text-slate-500 text-xs">Loading laboratory directory...</div>
          ) : (
            <div className="space-y-4">
              {laboratories.map((lab) => (
                <div key={lab.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-300 space-y-3 transition-all">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-display font-bold text-base text-slate-900">{lab.name}</h3>
                      <p className="text-xs text-slate-600 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600" /> {lab.location}, {lab.city}, {lab.state}
                      </p>
                    </div>
                    <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">
                      BIS Regional Lab
                    </span>
                  </div>

                  {/* Testing Scopes */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Testing Scopes</span>
                    <div className="flex flex-wrap gap-1.5">
                      {lab.testingScopes.map((scope, idx) => (
                        <span key={idx} className="bg-slate-50 border border-slate-200 text-slate-700 text-[10px] px-2 py-0.5 rounded-md font-medium">
                          {scope}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Supported Standards */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>Phone: {lab.contactPhone}</span>
                    <span className="text-emerald-700 font-bold">{lab.contactEmail}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: OpenStreetMap Leaflet Map */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-3 border border-slate-200 shadow-md h-[550px] overflow-hidden relative">
          <MapContainer
            center={[20.5937, 78.9629]}
            zoom={5}
            scrollWheelZoom={false}
            className="w-full h-full rounded-2xl z-10"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {laboratories.map((lab) => (
              lab.lat && lab.lng ? (
                <Marker key={lab.id} position={[lab.lat, lab.lng]}>
                  <Popup>
                    <div className="p-1 space-y-1 text-slate-900 font-sans">
                      <strong className="font-bold text-xs">{lab.name}</strong>
                      <p className="text-[11px]">{lab.city}, {lab.state}</p>
                      <p className="text-[10px] text-emerald-700 font-medium">{lab.testingScopes.join(', ')}</p>
                    </div>
                  </Popup>
                </Marker>
              ) : null
            ))}
          </MapContainer>
        </div>

      </div>

    </div>
  );
};
