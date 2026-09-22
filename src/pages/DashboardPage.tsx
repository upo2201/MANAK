import React, { useState, useEffect } from 'react';
import { User, Bookmark, Search, FlaskConical, Sparkles, MessageSquare, ArrowRight, Building2, MapPin, Award, CheckCircle2, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchUserSavedItems, fetchUserConversations, deleteUserSavedItem } from '../services/api';
import { SavedItem, Conversation } from '../types';

export const DashboardPage: React.FC = () => {
  const { user, token } = useAuth();
  const profile = user?.profile;

  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token) {
      loadUserData(token);
    }
  }, [token]);

  const loadUserData = async (authToken: string) => {
    setIsLoading(true);
    try {
      const [items, convs] = await Promise.all([
        fetchUserSavedItems(authToken),
        fetchUserConversations(authToken)
      ]);
      setSavedItems(items);
      setConversations(convs);
    } catch (err) {
      console.error('Failed to load user dashboard data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSaved = async (id: string) => {
    if (!token) return;
    const ok = await deleteUserSavedItem(token, id);
    if (ok) {
      setSavedItems(prev => prev.filter(i => i.id !== id));
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      
      {/* User Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={user?.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user?.name || 'User')}`}
            alt={user?.name}
            className="w-14 h-14 rounded-2xl object-cover border border-emerald-200 bg-emerald-50"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display font-bold text-xl text-slate-900">Welcome back, {profile?.preferredName || user?.name}</h1>
              {user?.isDemo && (
                <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  Demo Profile
                </span>
              )}
            </div>
            <p className="text-xs text-slate-600 flex items-center gap-2 mt-0.5">
              <span>{profile?.role || 'Manufacturer'}</span> • <span>{profile?.organizationName || 'Industrial Unit'}</span>
              {profile?.city && (
                <span className="flex items-center gap-1 text-slate-600">
                  <MapPin className="w-3 h-3 text-emerald-600" /> {profile.city}, {profile.state}
                </span>
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/onboarding"
            className="px-3.5 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-colors"
          >
            Edit Profile
          </Link>
          <Link
            to="/assistant"
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-colors"
          >
            <Sparkles className="w-4 h-4 text-emerald-200" /> Personalized RAG Inquiry
          </Link>
        </div>
      </div>

      {/* Profile Summary Banner */}
      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
        <div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Primary Sector</span>
          <p className="font-semibold text-emerald-800 mt-0.5">{profile?.industrySector || 'Mechanical & Consumer Goods'}</p>
        </div>
        <div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Main Products</span>
          <p className="font-semibold text-slate-900 mt-0.5">{profile?.mainProducts?.join(', ') || 'Stainless steel pressure cooker'}</p>
        </div>
        <div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Focus Materials</span>
          <p className="font-semibold text-slate-900 mt-0.5">{profile?.materialsUsed?.join(', ') || 'Food grade stainless steel'}</p>
        </div>
        <div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Response Depth</span>
          <p className="font-semibold text-amber-800 mt-0.5">{profile?.informationDepth || 'Detailed'} Guidance</p>
        </div>
      </div>

      {/* Grid Modules */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Saved Items */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3 md:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-sm text-slate-900 flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-emerald-600" /> Your Saved Answers & Items ({savedItems.length})
            </h3>
          </div>

          {savedItems.length > 0 ? (
            <div className="space-y-3">
              {savedItems.map((item) => (
                <div key={item.id} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs space-y-1 relative group">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-800">{item.title}</span>
                    <button
                      onClick={() => handleDeleteSaved(item.id)}
                      className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-slate-700 font-medium">{item.summary}</p>
                  <span className="text-[10px] text-slate-500 block pt-1">{new Date(item.createdAt).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 space-y-2 text-slate-500 text-xs">
              <Bookmark className="w-6 h-6 mx-auto stroke-1 text-slate-400" />
              <p>No saved answers yet. Click "Save" on assistant responses or standards to store them here.</p>
            </div>
          )}
        </div>

        {/* Recent Conversations */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
          <h3 className="font-display font-bold text-sm text-slate-900 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-emerald-600" /> Conversation Threads
          </h3>

          {conversations.length > 0 ? (
            <div className="space-y-2">
              {conversations.map((c) => (
                <Link
                  key={c.id}
                  to="/assistant"
                  className="block bg-slate-50 p-3 rounded-xl border border-slate-200 hover:border-emerald-300 text-xs space-y-1 transition-colors"
                >
                  <p className="text-slate-900 font-medium truncate">{c.title}</p>
                  <span className="text-[10px] text-slate-500">{new Date(c.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 space-y-2 text-slate-500 text-xs">
              <MessageSquare className="w-6 h-6 mx-auto stroke-1 text-slate-400" />
              <p>No recent conversation threads.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
