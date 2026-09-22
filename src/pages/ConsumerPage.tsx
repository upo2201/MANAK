import React from 'react';
import { ShieldCheck, AlertCircle, PhoneCall, CheckCircle, ArrowRight, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ConsumerPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider shadow-sm">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Consumer Rights & Protection
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900">
          Verify Product Quality & Report Misuse.
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto">
          Understand how to verify ISI Marks, check HUID codes on gold jewellery, and lodge official consumer complaints against substandard products.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center font-bold">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
          </div>
          <h3 className="font-display font-bold text-lg text-slate-900">How to Verify an ISI Mark or CML Number</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Every product with an authentic ISI mark displays a Certifying Manufacturing Licence (CML) number directly under the mark. You can enter this 7-digit CML number on the official BIS Care mobile app or online portal to verify manufacturer authenticity and validity.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-4">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 flex items-center justify-center font-bold">
            <AlertCircle className="w-5 h-5 text-rose-600" />
          </div>
          <h3 className="font-display font-bold text-lg text-slate-900">Reporting Fake Marks & Substandard Goods</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            If you purchase a product bearing a fake ISI mark or gold jewellery without a valid 6-digit HUID code, you can file a complaint directly with the BIS Enforcement Cell. BIS carries out search and seizure operations under the statutory provisions of the BIS Act, 2016.
          </p>
        </div>
      </div>

      {/* CTA to Ask Consumer Question in Assistant */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md text-center space-y-4">
        <h3 className="font-display font-bold text-xl text-slate-900">Have a specific consumer protection question?</h3>
        <p className="text-xs text-slate-600 max-w-lg mx-auto">
          Ask MANAK AI to clarify product standards, warranty guidelines, or compulsory certification rules for your purchase.
        </p>
        <div>
          <Link
            to="/assistant"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all"
          >
            <MessageSquare className="w-4 h-4" /> Ask a Consumer Question
          </Link>
        </div>
      </div>

    </div>
  );
};
