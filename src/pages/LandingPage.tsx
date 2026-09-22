import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Search, Award, FlaskConical, Gem, BookOpen, CheckCircle, Cpu, FileText, Layers, ExternalLink, Activity, ArrowUpRight } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

export const LandingPage: React.FC = () => {
  const journeys = [
    { num: '01', title: 'Find the Standard', icon: Search, path: '/standards', desc: 'Discover exact Indian Standards (IS numbers) applicable to your product or sector.' },
    { num: '02', title: 'Understand Certification', icon: Award, path: '/certification', desc: 'Navigate mandatory QCOs, Scheme-I ISI Mark licensing, and CRS registration pathways.' },
    { num: '03', title: 'Locate Testing Labs', icon: FlaskConical, path: '/laboratories', desc: 'Find BIS recognized and empanelled laboratories with specific testing scopes.' },
    { num: '04', title: 'Navigate Hallmarking', icon: Gem, path: '/hallmarking', desc: 'Explore gold fineness standards, 6-digit HUID verification, and AHC centre operational rules.' },
    { num: '05', title: 'Solve Consumer Queries', icon: ShieldCheck, path: '/consumer', desc: 'Verify standard mark authenticity, report fake ISI marks, and understand quality rights.' },
    { num: '06', title: 'Learn the Ecosystem', icon: BookOpen, path: '/learning', desc: 'Master Indian Standards 101, MSME benefits, and conformity assessment fundamentals.' },
  ];

  const ragSteps = [
    { step: '01', title: 'User Question', desc: 'Natural language query in English, Hindi, or Bengali.' },
    { step: '02', title: 'Intent Detection', desc: 'Classifies query domain: Product matching, Lab, Hallmarking, or Scheme.' },
    { step: '03', title: 'Hybrid Retrieval', desc: 'Combines exact IS lexical matching with semantic vector proximity.' },
    { step: '04', title: 'Authority Rerank', desc: 'Reranks retrieved evidence prioritizing Official BIS Gazette sources.' },
    { step: '05', title: 'Grounding Verification', desc: 'Validates factual context to eliminate LLM hallucination.' },
    { step: '06', title: 'Cited Synthesis', desc: 'Synthesizes answer with clickable official source citations.' },
  ];

  const audiences = [
    { title: 'Manufacturers', desc: 'Ensure mandatory QCO compliance and streamline ISI mark licensing.' },
    { title: 'MSMEs', desc: 'Discover applicable standards, testing scope, and fee structures.' },
    { title: 'Laboratories', desc: 'Expose testing capabilities and streamline sample verification requests.' },
    { title: 'Jewellers', desc: 'Understand IS 1417 hallmarking, HUID laser engraving, and AHC guidelines.' },
    { title: 'Consumers', desc: 'Verify product authenticity and report misuse of BIS Standard Marks.' },
    { title: 'Students & Pros', desc: 'Study Indian technical standards and conformity assessment frameworks.' },
  ];

  // Animation variants
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  return (
    <div className="space-y-24 pb-20 bg-[#F8FAFC] text-[#0B1324] font-sans overflow-x-hidden">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 px-4 sm:px-8 max-w-7xl mx-auto">
        
        {/* Subtle background warm light glows */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute top-10 right-10 w-[300px] h-[300px] bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Hero Left Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="lg:col-span-7 space-y-6 text-left"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
              Source-Grounded RAG Intelligence
            </motion.div>

            <motion.h1 variants={fadeInUp} className="font-display font-extrabold text-4xl sm:text-6xl xl:text-7xl tracking-tight text-slate-900 leading-[1.08]">
              India's standards ecosystem, <br />
              <span className="bg-gradient-to-r from-emerald-700 via-teal-700 to-amber-600 bg-clip-text text-transparent">
                made intelligent.
              </span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-slate-600 text-base sm:text-lg max-w-2xl leading-relaxed">
              Ask. Discover. Verify. One intelligent interface for Indian Standards, product certification pathways, testing laboratories, hallmarking, and BIS services.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/login"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-bold text-sm shadow-xl shadow-emerald-600/25 hover:shadow-emerald-600/40 hover:scale-[1.02] transition-all flex items-center gap-2.5"
              >
                <Sparkles className="w-4 h-4 text-white" />
                <span>GET STARTED</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/standards"
                className="px-6 py-3.5 rounded-xl bg-white text-slate-700 font-semibold text-sm hover:bg-slate-50 hover:text-slate-900 transition-all border border-slate-200 shadow-sm flex items-center gap-2"
              >
                <Search className="w-4 h-4 text-emerald-600" />
                <span>Explore Standards</span>
              </Link>
            </motion.div>

            {/* Micro stats */}
            <motion.div variants={fadeInUp} className="pt-8 border-t border-slate-200/80 grid grid-cols-3 gap-4 text-left">
              <div>
                <span className="font-display text-2xl font-bold text-slate-900">100%</span>
                <p className="text-xs text-slate-500 font-medium">Source Grounded</p>
              </div>
              <div>
                <span className="font-display text-2xl font-bold text-emerald-600">Zero</span>
                <p className="text-xs text-slate-500 font-medium">Hallucinated Standards</p>
              </div>
              <div>
                <span className="font-display text-2xl font-bold text-slate-900">Instant</span>
                <p className="text-xs text-slate-500 font-medium">Citation Transparency</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Right Visual Demonstration Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-slate-200 shadow-2xl space-y-4 relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <span className="text-[11px] text-emerald-700 font-bold font-mono uppercase tracking-wider flex items-center gap-1">
                  <Activity className="w-3 h-3 text-emerald-600 animate-pulse" /> Live Grounded Assistant
                </span>
              </div>

              {/* User Prompt bubble */}
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs text-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">User Prompt</span>
                <p className="font-medium text-slate-900">"What Indian Standard applies to stainless steel pressure cookers?"</p>
              </div>

              {/* AI Response Card snippet */}
              <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-200 space-y-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" /> Grounded BIS Answer
                  </span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                    Confidence: High
                  </span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed">
                  Based on retrieved official BIS records, domestic stainless steel pressure cookers must conform to <strong className="text-slate-900">IS 3042:1990</strong> <span className="text-emerald-700 font-bold">[1]</span> under mandatory Quality Control Order (QCO)...
                </p>

                {/* Evidence citation pill */}
                <div className="bg-white p-2.5 rounded-xl border border-slate-200 flex items-center justify-between text-[11px] shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-[10px]">
                      [1]
                    </span>
                    <span className="text-slate-800 font-semibold truncate max-w-[180px]">IS 3042:1990 Official Spec</span>
                  </div>
                  <span className="text-emerald-700 text-[10px] font-bold uppercase">Official BIS</span>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* SECTION: One assistant. Many standards journeys */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeInUp}
          className="text-center space-y-3"
        >
          <h2 className="text-xs uppercase font-bold tracking-widest text-emerald-700">Ecosystem Capabilities</h2>
          <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900">
            One assistant. Many standards journeys.
          </h3>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Navigate every phase of the Bureau of Indian Standards ecosystem with source-grounded precision.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {journeys.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div variants={fadeInUp} key={item.num}>
                <Link
                  to={item.path}
                  className="bg-white hover:bg-slate-50 rounded-2xl p-6 space-y-4 border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-500/40 transition-all group block relative h-full flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-display font-bold text-2xl text-slate-300 group-hover:text-emerald-600 transition-colors">
                        {item.num}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <h4 className="font-display font-bold text-lg text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center gap-1 text-xs font-bold text-emerald-700 group-hover:translate-x-1 transition-transform">
                    <span>Explore journey</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* SECTION: From question to evidence (RAG Pipeline Visualizer) */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={fadeInUp}
        className="max-w-7xl mx-auto px-4 sm:px-8 py-12 bg-white rounded-3xl border border-slate-200/80 shadow-md space-y-10"
      >
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700">
            <Cpu className="w-3.5 h-3.5 text-emerald-600" /> Architecture Inspection
          </div>
          <h3 className="font-display font-extrabold text-3xl text-slate-900">
            From question to evidence.
          </h3>
          <p className="text-xs text-slate-600 max-w-xl mx-auto">
            MANAK AI uses Retrieval-Augmented Generation (RAG) rather than blind LLM generation to guarantee factual grounded answers.
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4"
        >
          {ragSteps.map((s) => (
            <motion.div
              variants={fadeInUp}
              key={s.step}
              className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 relative hover:border-emerald-300 transition-colors"
            >
              <span className="text-[10px] font-bold text-emerald-700 font-mono">STEP {s.step}</span>
              <h4 className="font-bold text-xs text-slate-900">{s.title}</h4>
              <p className="text-[11px] text-slate-600 leading-normal">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* SECTION: Built for everyone */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeInUp}
          className="text-center space-y-3"
        >
          <h2 className="text-xs uppercase font-bold tracking-widest text-emerald-700">Target Stakeholders</h2>
          <h3 className="font-display font-extrabold text-3xl text-slate-900">
            Built for everyone in the standards ecosystem.
          </h3>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {audiences.map((aud, idx) => (
            <motion.div
              variants={fadeInUp}
              key={idx}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2 hover:border-emerald-300 transition-all"
            >
              <h4 className="font-display font-bold text-base text-emerald-800">{aud.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{aud.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* SECTION: Trust is a feature */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={fadeInUp}
        className="max-w-7xl mx-auto px-4 sm:px-8 bg-gradient-to-br from-white to-slate-50 rounded-3xl p-8 border border-slate-200 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
      >
        <div className="lg:col-span-5 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">Non-Negotiable Principles</span>
          <h3 className="font-display font-extrabold text-3xl text-slate-900">
            Trust is a feature, not an afterthought.
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Standard compliance decisions impact manufacturing legality and consumer safety. MANAK AI enforces strict guardrails against hallucinating IS numbers or fees.
          </p>
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Source-Backed Answers
            </h4>
            <p className="text-[11px] text-slate-600">Every factual claim is anchored directly to retrieved BIS records.</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Official Source Priority
            </h4>
            <p className="text-[11px] text-slate-600">Official BIS and Gazette of India documents take precedence.</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Citation Transparency
            </h4>
            <p className="text-[11px] text-slate-600">Clickable citation pills expose exact document source URLs.</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Confidence Signals
            </h4>
            <p className="text-[11px] text-slate-600">Transparent High, Medium, or Low evidence scoring.</p>
          </div>
        </div>
      </motion.section>

      {/* SECTION: Editorial CTA */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={fadeInUp}
        className="max-w-5xl mx-auto px-4 text-center py-16 space-y-6"
      >
        <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-slate-900 tracking-tight leading-tight">
          Know the standard. <br />
          Understand the path. <br />
          <span className="text-emerald-700">Act with confidence.</span>
        </h2>
        <div className="pt-4">
          <Link
            to="/assistant"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-bold text-base shadow-2xl shadow-emerald-600/30 hover:scale-105 transition-all"
          >
            <Sparkles className="w-5 h-5 text-white" />
            <span>Enter MANAK AI Workspace</span>
          </Link>
        </div>
      </motion.section>

    </div>
  );
};

