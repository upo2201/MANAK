import React from 'react';
import { BookOpen, CheckCircle, ArrowRight, Award, ShieldCheck, FlaskConical, Gem } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LearningPage: React.FC = () => {
  const modules = [
    { title: 'Indian Standards 101', icon: BookOpen, desc: 'Learn how Indian Standards (IS numbers) are formulated, published, and updated by BIS technical committees.' },
    { title: 'BIS Certification Schemes', icon: Award, desc: 'Understand Scheme-I (ISI Mark) vs Scheme-II (CRS Self Declaration of Conformity).' },
    { title: 'Laboratory Testing Procedures', icon: FlaskConical, desc: 'Discover how samples are tested for mechanical, electrical, chemical, and microbiological compliance.' },
    { title: 'Gold Hallmarking & HUID', icon: Gem, desc: 'Master the 6-digit HUID tracking system and gold fineness standards (IS 1417).' },
    { title: 'Quality Control Orders (QCOs)', icon: ShieldCheck, desc: 'Explore mandatory government orders enforcing Indian Standards on manufactured and imported goods.' },
    { title: 'MSME & Industry Support', icon: CheckCircle, desc: 'Identify concessions, testing fee rebates, and licensing support available for Indian MSMEs.' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5 text-emerald-600" /> BIS Learning Centre
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900">
          Learn the Standards Ecosystem.
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto">
          Bite-sized educational guides for manufacturers, MSMEs, students, and professionals navigating Indian technical standards.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div key={idx} className="bg-white rounded-2xl p-6 space-y-3 border border-slate-200 shadow-sm hover:border-slate-300 transition-all">
              <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-emerald-600">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base text-slate-900">{m.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{m.desc}</p>
              <Link to="/assistant" className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:text-emerald-700 hover:underline pt-2">
                <span>Ask AI about this topic</span> <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          );
        })}
      </div>

    </div>
  );
};
