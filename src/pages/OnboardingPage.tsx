import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, ArrowLeft, CheckCircle2, User, Building2, Layers, ShieldCheck, Settings, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserProfile } from '../types';

const API_BASE = (import.meta as any).env?.VITE_API_URL || '';

export const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, token, setUserProfile } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);
  const [isSaving, setIsSaving] = useState(false);

  const [profileData, setProfileData] = useState<Partial<UserProfile>>({
    preferredName: user?.name || '',
    role: user?.profile?.role || 'Manufacturer',
    organizationName: user?.profile?.organizationName || '',
    businessType: 'Private Limited',
    industrySector: user?.profile?.industrySector || 'Mechanical Engineering & Consumer Goods',
    companySize: '10-50 Employees',
    city: user?.profile?.city || 'Ghaziabad',
    state: user?.profile?.state || 'Uttar Pradesh',
    country: 'India',
    productCategories: user?.profile?.productCategories?.length ? user.profile.productCategories : ['Cookware & Kitchenware'],
    mainProducts: user?.profile?.mainProducts?.length ? user.profile.mainProducts : ['Stainless Steel Pressure Cooker'],
    materialsUsed: user?.profile?.materialsUsed?.length ? user.profile.materialsUsed : ['Food Grade Stainless Steel'],
    bisInterestAreas: user?.profile?.bisInterestAreas?.length ? user.profile.bisInterestAreas : ['Indian Standards', 'Product Certification', 'Laboratory Testing'],
    preferredLanguage: 'en',
    informationDepth: 'Detailed'
  });

  const steps = [
    { num: 1, title: 'About You', icon: User },
    { num: 2, title: 'Organization', icon: Building2 },
    { num: 3, title: 'Products & Materials', icon: Layers },
    { num: 4, title: 'BIS Focus', icon: ShieldCheck },
    { num: 5, title: 'Preferences', icon: Settings },
    { num: 6, title: 'Review & Complete', icon: Award }
  ];

  const handleNext = () => {
    if (currentStep < 6) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      if (token) {
        await fetch(`${API_BASE}/api/user/profile`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(profileData)
        });
      }
      setUserProfile(profileData);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setUserProfile(profileData);
      navigate('/dashboard');
    } finally {
      setIsSaving(false);
    }
  };

  const toggleCategory = (cat: string) => {
    const list = profileData.productCategories || [];
    if (list.includes(cat)) {
      setProfileData({ ...profileData, productCategories: list.filter(c => c !== cat) });
    } else {
      setProfileData({ ...profileData, productCategories: [...list, cat] });
    }
  };

  const toggleInterest = (area: string) => {
    const list = profileData.bisInterestAreas || [];
    if (list.includes(area)) {
      setProfileData({ ...profileData, bisInterestAreas: list.filter(a => a !== area) });
    } else {
      setProfileData({ ...profileData, bisInterestAreas: [...list, area] });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      
      {/* Editorial Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Guided Workspace Setup
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900">
          Tell MANAK a little about yourself.
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
          Your profile helps us surface relevant Indian Standards, QCO certification pathways, laboratory networks, and grounded AI responses.
        </p>
      </div>

      {/* Progress Stepper Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm grid grid-cols-2 sm:grid-cols-6 gap-2">
        {steps.map((s) => {
          const Icon = s.icon;
          const isActive = currentStep === s.num;
          const isDone = currentStep > s.num;
          return (
            <div
              key={s.num}
              className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
                isActive
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-bold shadow-sm'
                  : isDone
                  ? 'bg-slate-50 border-slate-200 text-slate-700'
                  : 'bg-slate-50/50 border-slate-100 text-slate-400'
              }`}
            >
              <div className={`w-6 h-6 rounded-lg font-mono text-[10px] flex items-center justify-center font-bold ${
                isActive ? 'bg-emerald-600 text-white' : isDone ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-slate-200 text-slate-600'
              }`}>
                {isDone ? <CheckCircle2 className="w-4 h-4 text-emerald-700" /> : s.num}
              </div>
              <span className="text-xs truncate hidden sm:block">{s.title}</span>
            </div>
          );
        })}
      </div>

      {/* Step Content Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg space-y-6">
        
        {/* STEP 1: About You */}
        {currentStep === 1 && (
          <div className="space-y-5 animate-fadeIn">
            <h3 className="font-display font-bold text-lg text-slate-900 flex items-center gap-2">
              <User className="w-5 h-5 text-emerald-600" /> Step 1 — About You
            </h3>

            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Preferred Name</label>
                <input
                  type="text"
                  value={profileData.preferredName}
                  onChange={(e) => setProfileData({ ...profileData, preferredName: e.target.value })}
                  placeholder="How should MANAK address you?"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Primary Role in Ecosystem *</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
                  {['Manufacturer', 'MSME Owner', 'Entrepreneur', 'Laboratory Professional', 'Jeweller', 'Consumer', 'Student', 'Researcher', 'Consultant'].map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setProfileData({ ...profileData, role: r as any })}
                      className={`p-3 rounded-xl border text-left font-medium transition-all ${
                        profileData.role === r
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-bold shadow-sm'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Organization */}
        {currentStep === 2 && (
          <div className="space-y-5 animate-fadeIn">
            <h3 className="font-display font-bold text-lg text-slate-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-emerald-600" /> Step 2 — Organization & Location
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Organization / Business Name</label>
                <input
                  type="text"
                  value={profileData.organizationName}
                  onChange={(e) => setProfileData({ ...profileData, organizationName: e.target.value })}
                  placeholder="e.g. National Cookware Industries"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Industry / Sector</label>
                <select
                  value={profileData.industrySector}
                  onChange={(e) => setProfileData({ ...profileData, industrySector: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:bg-white"
                >
                  <option value="Mechanical Engineering & Consumer Goods">Mechanical & Consumer Goods</option>
                  <option value="Chemical & Environmental Engineering">Chemical & Water</option>
                  <option value="Electrotechnical Engineering">Electrotechnical & Electrical</option>
                  <option value="Hallmarking & Precious Metals">Hallmarking & Gold</option>
                  <option value="Food & Agriculture">Food & Agriculture</option>
                  <option value="Electronics & IT Goods">Electronics & IT (CRS)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">City</label>
                <input
                  type="text"
                  value={profileData.city}
                  onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                  placeholder="e.g. Ghaziabad, Mumbai, Kolkata"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">State</label>
                <input
                  type="text"
                  value={profileData.state}
                  onChange={(e) => setProfileData({ ...profileData, state: e.target.value })}
                  placeholder="e.g. Uttar Pradesh, Maharashtra"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Products & Materials */}
        {currentStep === 3 && (
          <div className="space-y-5 animate-fadeIn">
            <h3 className="font-display font-bold text-lg text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-600" /> Step 3 — Products & Materials
            </h3>

            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Product Categories</label>
                <div className="flex flex-wrap gap-2 pt-1">
                  {['Cookware & Kitchenware', 'Packaged Water', 'Electrical Cables', 'Gold Jewellery', 'Lithium Batteries', 'Toys', 'Fasteners'].map((cat) => {
                    const isSelected = profileData.productCategories?.includes(cat);
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => toggleCategory(cat)}
                        className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                          isSelected ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-bold shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Main Manufactured / Handled Products</label>
                <input
                  type="text"
                  value={profileData.mainProducts?.join(', ')}
                  onChange={(e) => setProfileData({ ...profileData, mainProducts: e.target.value.split(',').map(s => s.trim()) })}
                  placeholder="e.g. Stainless steel pressure cooker, PVC wire"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: BIS Focus Areas */}
        {currentStep === 4 && (
          <div className="space-y-5 animate-fadeIn">
            <h3 className="font-display font-bold text-lg text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" /> Step 4 — BIS Focus & Interest Areas
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {['Indian Standards Discovery', 'Product Certification (ISI Mark)', 'CRS Electronics Registration', 'Gold Hallmarking & HUID', 'Laboratory Testing Network', 'Consumer Protection & Complaints'].map((area) => {
                const isSelected = profileData.bisInterestAreas?.includes(area);
                return (
                  <button
                    key={area}
                    type="button"
                    onClick={() => toggleInterest(area)}
                    className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      isSelected ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-bold shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{area}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 5: Preferences */}
        {currentStep === 5 && (
          <div className="space-y-5 animate-fadeIn">
            <h3 className="font-display font-bold text-lg text-slate-900 flex items-center gap-2">
              <Settings className="w-5 h-5 text-emerald-600" /> Step 5 — Preferences & Response Depth
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Preferred Language</label>
                <select
                  value={profileData.preferredLanguage}
                  onChange={(e) => setProfileData({ ...profileData, preferredLanguage: e.target.value as any })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:bg-white"
                >
                  <option value="en">English</option>
                  <option value="hi">हिन्दी (Hindi)</option>
                  <option value="bn">বাংলা (Bengali)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">AI Response Detail Level</label>
                <select
                  value={profileData.informationDepth}
                  onChange={(e) => setProfileData({ ...profileData, informationDepth: e.target.value as any })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:bg-white"
                >
                  <option value="Quick">Quick Highlights</option>
                  <option value="Detailed">Detailed Step-by-Step</option>
                  <option value="Technical">Full Technical Clause Breakdown</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: Review & Complete */}
        {currentStep === 6 && (
          <div className="space-y-5 animate-fadeIn">
            <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <h3 className="font-display font-bold text-xl text-slate-900">Your MANAK profile is ready!</h3>
              <p className="text-xs text-slate-600 max-w-lg mx-auto leading-relaxed">
                Your workspace is now personalized around your role (<strong className="text-emerald-700">{profileData.role}</strong>), industry sector (<strong className="text-slate-900">{profileData.industrySector}</strong>), and focus products.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div>
                <span className="text-slate-400 font-bold uppercase text-[10px]">User Role</span>
                <p className="font-semibold text-slate-900">{profileData.role}</p>
              </div>
              <div>
                <span className="text-slate-400 font-bold uppercase text-[10px]">Organization</span>
                <p className="font-semibold text-slate-900">{profileData.organizationName || 'Individual'}</p>
              </div>
              <div>
                <span className="text-slate-400 font-bold uppercase text-[10px]">Location</span>
                <p className="font-semibold text-slate-900">{profileData.city}, {profileData.state}</p>
              </div>
              <div>
                <span className="text-slate-400 font-bold uppercase text-[10px]">Main Products</span>
                <p className="font-semibold text-emerald-700">{profileData.mainProducts?.join(', ')}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons Bar */}
        <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 disabled:opacity-30 text-xs font-semibold flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          {currentStep < 6 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 hover:scale-[1.01] transition-all flex items-center gap-2"
            >
              <span>Continue</span> <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSaveProfile}
              disabled={isSaving}
              className="px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg shadow-emerald-600/25 hover:scale-105 transition-all flex items-center gap-2"
            >
              {isSaving ? <Sparkles className="w-4 h-4 animate-spin text-white" /> : <Award className="w-4 h-4" />}
              <span>Create My MANAK Profile</span>
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
