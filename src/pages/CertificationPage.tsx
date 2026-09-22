import React, { useState } from 'react';
import { Award, CheckCircle, ArrowRight, AlertTriangle, FileText, ExternalLink, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CertificationPage: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    { step: 1, title: 'Application Submission', desc: 'Submit online application (Form I) on ManakOnline portal along with manufacturing flowcharts, machinery details, and quality control personnel documents.' },
    { step: 2, title: 'Preliminary Factory Audit', desc: 'BIS Inspecting Officer visits factory site to inspect raw material testing, production machinery, calibration of testing equipment, and quality control systems.' },
    { step: 3, title: 'Independent Sample Testing', desc: 'Factory samples drawn during inspection are sealed and dispatched to a BIS recognized laboratory for full conformity testing against relevant IS.' },
    { step: 4, title: 'Grant of Licence', desc: 'Upon satisfactory inspection and passing test reports, BIS grants Licence (CML number) permitting ISI Mark printing on manufactured products.' },
    { step: 5, title: 'Surveillance & Renewal', desc: 'BIS performs periodic unannounced factory audits and market sample testing. Licence is renewed after 1-2 years.' }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider shadow-sm">
          <Award className="w-3.5 h-3.5 text-emerald-600" /> BIS Certification Hub
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900">
          Understand the BIS Certification Journey.
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto">
          Clear, step-by-step guidance for domestic and foreign manufacturers to obtain BIS ISI Mark licences and CRS registrations.
        </p>
      </div>

      {/* Interactive Stepper Widget */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-8">
        <h3 className="font-display font-bold text-lg text-slate-900">Product Certification Scheme I (ISI Mark) Pathway</h3>

        {/* Stepper Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {steps.map((s) => {
            const isActive = activeStep === s.step;
            return (
              <button
                key={s.step}
                onClick={() => setActiveStep(s.step)}
                className={`p-4 rounded-2xl text-left border transition-all ${
                  isActive
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-sm font-bold'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span className={`text-[10px] font-bold font-mono ${isActive ? 'text-emerald-700' : 'text-slate-500'}`}>
                  STEP 0{s.step}
                </span>
                <h4 className="font-bold text-xs mt-1 leading-tight">{s.title}</h4>
              </button>
            );
          })}
        </div>

        {/* Active Step Details */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-display font-bold text-base text-emerald-800">
              Step 0{activeStep}: {steps[activeStep - 1].title}
            </span>
            <span className="text-xs text-slate-500 font-mono">ManakOnline e-BIS Workflow</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {steps[activeStep - 1].desc}
          </p>
        </div>

        {/* Official Statutory Fee Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl text-xs text-amber-900 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-amber-900">Statutory Fee & Regulation Notice</h4>
            <p className="leading-relaxed text-slate-700">
              Fee schedules for application, inspection, marking, and testing are governed strictly by Schedule II of BIS (Conformity Assessment) Regulations. Fee data should be verified directly from the current official BIS portal at manakonline.in.
            </p>
          </div>
        </div>
      </div>

      {/* Action CTAs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
          <h4 className="font-display font-bold text-base text-slate-900">Ask AI About Certification Steps</h4>
          <p className="text-xs text-slate-600">Have specific questions about factory layout requirements or document checklists?</p>
          <Link
            to="/assistant"
            className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 hover:text-emerald-900 hover:underline pt-2"
          >
            <span>Ask MANAK AI Assistant</span> <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
          <h4 className="font-display font-bold text-base text-slate-900">Official ManakOnline Portal</h4>
          <p className="text-xs text-slate-600">Submit Form I applications directly on the official e-BIS ManakOnline portal.</p>
          <a
            href="https://www.manakonline.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 hover:text-emerald-900 hover:underline pt-2"
          >
            <span>Visit ManakOnline.in</span> <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

    </div>
  );
};
