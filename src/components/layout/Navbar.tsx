import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShieldCheck, Sparkles, Menu, X, Cpu, Search, Award, FlaskConical, Gem, User as UserIcon, BookOpen, Layers, LogOut, ChevronDown, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const isAdmin = user?.profile?.role === 'Admin';

  const baseNavLinks = [
    { name: 'Assistant', path: '/assistant', icon: Sparkles },
    { name: 'Standards', path: '/standards', icon: Search },
    { name: 'Recommender', path: '/recommend', icon: Layers },
    { name: 'Certification', path: '/certification', icon: Award },
    { name: 'Laboratories', path: '/laboratories', icon: FlaskConical },
    { name: 'Hallmarking', path: '/hallmarking', icon: Gem },
    { name: 'Consumer', path: '/consumer', icon: ShieldCheck },
    { name: 'Learning', path: '/learning', icon: BookOpen },
  ];

  const navLinks = isAdmin
    ? [...baseNavLinks, { name: 'Admin Inspector', path: '/admin/retrieval', icon: Cpu }]
    : baseNavLinks;

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 py-3 px-4 sm:px-8">
      <nav className="max-w-7xl mx-auto glass-panel rounded-2xl px-4 py-2.5 flex items-center justify-between shadow-lg border border-slate-200/80">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center text-white font-bold shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-xl tracking-tight text-slate-900">MANAK <span className="text-emerald-600">AI</span></span>
              {user?.isDemo && (
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  DEMO MODE
                </span>
              )}
            </div>
            <p className="text-[10px] text-slate-500 -mt-1 hidden sm:block">Intelligent Infrastructure for BIS</p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-1.5">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  active
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${active ? 'text-emerald-600' : 'text-slate-400'}`} />
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Right User Identity Element */}
        <div className="hidden sm:flex items-center gap-3">
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2.5 p-1.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-500/40 transition-all text-left"
              >
                <img
                  src={user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name)}`}
                  alt={user.name}
                  className="w-7 h-7 rounded-lg object-cover bg-emerald-100"
                />
                <div className="leading-tight pr-1">
                  <p className="text-xs font-bold text-slate-900 max-w-[110px] truncate">{user.name}</p>
                  <p className="text-[10px] text-emerald-600 font-semibold capitalize">{user.profile?.role || 'User'}</p>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* User Dropdown Menu */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl p-2 border border-slate-200 shadow-xl z-50 space-y-1">
                  <Link
                    to="/dashboard"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-slate-100 rounded-xl font-semibold"
                  >
                    <LayoutDashboard className="w-4 h-4 text-emerald-600" /> Dashboard
                  </Link>
                  <Link
                    to="/onboarding"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-slate-100 rounded-xl font-semibold"
                  >
                    <UserIcon className="w-4 h-4 text-emerald-600" /> Edit Profile
                  </Link>
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      logout();
                      navigate('/');
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 rounded-xl font-semibold border-t border-slate-100 mt-1"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="text-xs text-slate-600 hover:text-slate-900 px-3 py-2 font-semibold flex items-center gap-1.5 transition-colors"
              >
                <UserIcon className="w-3.5 h-3.5 text-slate-500" />
                Sign In
              </Link>

              <Link
                to="/login"
                className="relative group overflow-hidden rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 px-4 py-2 text-xs font-bold text-white shadow-md shadow-emerald-600/20 hover:shadow-emerald-600/35 transition-all hover:scale-[1.02] flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-white animate-pulse" />
                <span>GET STARTED</span>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 glass-panel rounded-2xl p-4 space-y-2 border border-slate-200 shadow-xl">
          {isAuthenticated && user && (
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 mb-2">
              <img
                src={user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name)}`}
                alt={user.name}
                className="w-8 h-8 rounded-lg object-cover"
              />
              <div>
                <p className="text-xs font-bold text-slate-900">{user.name}</p>
                <p className="text-[10px] text-emerald-600">{user.email}</p>
              </div>
            </div>
          )}

          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  active
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-emerald-600' : 'text-slate-400'}`} />
                {link.name}
              </Link>
            );
          })}
          <div className="pt-2 border-t border-slate-200 flex flex-col gap-2">
            {isAuthenticated ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                  navigate('/');
                }}
                className="text-center py-2.5 text-xs font-bold text-rose-600 bg-rose-50 rounded-xl border border-rose-200"
              >
                Sign Out
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-2.5 text-xs font-bold text-white bg-emerald-600 rounded-xl"
              >
                GET STARTED
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
