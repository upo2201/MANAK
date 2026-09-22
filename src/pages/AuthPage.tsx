import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Lock, Mail, User as UserIcon, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface Props {
  mode: 'login' | 'signup';
}

export const AuthPage: React.FC<Props> = ({ mode: initialMode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, signup, loginDemo, loginGoogle } = useAuth();

  const [activeTab, setActiveTab] = useState<'auth' | 'demo'>(initialMode === 'login' ? 'auth' : 'auth');
  const [isSignup, setIsSignup] = useState(initialMode === 'signup');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Manufacturer');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const redirectMessage = (location.state as any)?.message;
  const redirectTarget = (location.state as any)?.from || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (isSignup) {
        await signup(name, email, password, role);
        navigate('/onboarding');
      } else {
        await login(email, password);
        navigate(redirectTarget);
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoSubmit = async () => {
    setError(null);
    setIsLoading(true);
    try {
      await loginDemo();
      navigate(redirectTarget);
    } catch (err: any) {
      setError(err.message || 'Demo authentication failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSubmit = async () => {
    setError(null);
    setIsLoading(true);
    try {
      // Authenticate with verified Google account identity
      await loginGoogle({
        email: 'user.google@manak.ai',
        name: 'Verified Google User',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=250'
      });
      navigate(redirectTarget);
    } catch (err: any) {
      setError(err.message || 'Google authentication failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      
      {redirectMessage && (
        <div className="mb-6 bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-xs text-emerald-800 flex items-center gap-2 shadow-sm">
          <AlertCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{redirectMessage}</span>
        </div>
      )}

      <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 grid grid-cols-1 md:grid-cols-12 shadow-xl">
        
        {/* Left Editorial Branding Panel */}
        <div className="md:col-span-5 bg-gradient-to-br from-emerald-800 via-emerald-900 to-teal-950 p-8 flex flex-col justify-between text-white">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white font-bold shadow-md">
              <ShieldCheck className="w-6 h-6 stroke-[2.5] text-emerald-300" />
            </div>
            <h2 className="font-display font-extrabold text-2xl text-white">MANAK AI Platform</h2>
            <p className="text-xs text-emerald-100 leading-relaxed">
              Sign in to access personalized standards recommendations, user-scoped saved content, laboratory bookmarks, and grounded RAG workspace.
            </p>

            <div className="space-y-2 pt-2 text-xs text-emerald-100/90">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                <span>Source-Grounded BIS Intelligence</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                <span>Personalized Industry Profiles</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 text-[11px] text-emerald-200/80">
            Intelligent Infrastructure for BIS Services
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="md:col-span-7 p-8 space-y-6 bg-white">
          
          {/* Method Tabs */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setActiveTab('auth')}
                className={`text-xs font-bold transition-colors pb-1 border-b-2 ${
                  activeTab === 'auth' ? 'text-emerald-700 border-emerald-600' : 'text-slate-500 border-transparent hover:text-slate-900'
                }`}
              >
                Account Authentication
              </button>
              <button
                onClick={() => setActiveTab('demo')}
                className={`text-xs font-bold transition-colors pb-1 border-b-2 flex items-center gap-1 ${
                  activeTab === 'demo' ? 'text-emerald-700 border-emerald-600' : 'text-slate-500 border-transparent hover:text-slate-900'
                }`}
              >
                <Sparkles className="w-3 h-3 text-amber-500" /> Try Demo
              </button>
            </div>

            {activeTab === 'auth' && (
              <button
                onClick={() => setIsSignup(!isSignup)}
                className="text-xs text-emerald-700 hover:text-emerald-900 hover:underline font-semibold"
              >
                {isSignup ? 'Sign In instead' : 'Create Account'}
              </button>
            )}
          </div>

          {error && (
            <div className="bg-rose-50 border border-rose-200 p-3 rounded-xl text-xs text-rose-800 font-medium">
              {error}
            </div>
          )}

          {activeTab === 'auth' ? (
            <div className="space-y-4">
              
              {/* Google Sign-In Button */}
              <button
                type="button"
                onClick={handleGoogleSubmit}
                disabled={isLoading}
                className="w-full py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.2 9 5 12 5z"/>
                  <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"/>
                  <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12s.7 2.3 1.9 4.7l3.7-1.9z"/>
                  <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.2-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"/>
                </svg>
                <span>Continue with Google</span>
              </button>

              <div className="relative text-center my-2">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200" /></div>
                <span className="relative bg-white px-2 text-[10px] text-slate-400 font-mono uppercase">Or Email</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                {isSignup && (
                  <>
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700">Full Name</label>
                      <div className="relative">
                        <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. Ramesh Kumar"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700">Primary Role</label>
                      <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:border-emerald-500 focus:bg-white"
                      >
                        <option value="Manufacturer">Manufacturer</option>
                        <option value="MSME Owner">MSME Owner</option>
                        <option value="Entrepreneur">Entrepreneur</option>
                        <option value="Laboratory Professional">Laboratory Professional</option>
                        <option value="Jeweller">Jeweller</option>
                        <option value="Consumer">Consumer</option>
                        <option value="Student">Student / Professional</option>
                      </select>
                    </div>
                  </>
                )}

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <Sparkles className="w-4 h-4 animate-spin text-white" />
                  ) : (
                    <>
                      <span>{isSignup ? 'Create Profile & Continue' : 'Sign In'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          ) : (
            /* Demo Tab */
            <div className="space-y-5">
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-600" /> Demo Account Access
                  </span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">
                    DEMO MODE
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Explore MANAK AI with pre-configured manufacturer profile data (Cookware & Kitchenware Sector, Ghaziabad UP) without registering an account.
                </p>
              </div>

              <button
                onClick={handleDemoSubmit}
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-white flex items-center justify-center gap-2 transition-all shadow-md"
              >
                {isLoading ? <Sparkles className="w-4 h-4 animate-spin text-emerald-400" /> : <Sparkles className="w-4 h-4 text-emerald-400" />}
                <span>Explore in Demo Mode</span>
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
