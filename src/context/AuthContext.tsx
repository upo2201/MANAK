import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserProfile } from '../types';

const API_BASE = (import.meta as any).env?.VITE_API_URL || '';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<User>;
  signup: (name: string, email: string, password?: string, role?: string) => Promise<User>;
  loginDemo: () => Promise<User>;
  loginGoogle: (credential: { email: string; name?: string; avatar?: string }) => Promise<User>;
  logout: () => void;
  setUserProfile: (profile: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('manak_token'));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token) {
      fetchCurrentUser(token);
    } else {
      setIsLoading(false);
    }
  }, [token]);

  const fetchCurrentUser = async (authToken: string) => {
    try {
      const res = await fetch(`${API_BASE}/api/auth/me`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        logout();
      }
    } catch (err) {
      console.error('Failed to verify user session token:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password?: string): Promise<User> => {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.error || 'Login failed.');
    }
    const data = await res.json();
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem('manak_token', data.token);
    return data.user;
  };

  const signup = async (name: string, email: string, password?: string, role?: string): Promise<User> => {
    const res = await fetch(`${API_BASE}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role })
    });
    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.error || 'Signup failed.');
    }
    const data = await res.json();
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem('manak_token', data.token);
    return data.user;
  };

  const loginDemo = async (): Promise<User> => {
    const res = await fetch(`${API_BASE}/api/auth/demo`, { method: 'POST' });
    if (!res.ok) throw new Error('Demo login failed.');
    const data = await res.json();
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem('manak_token', data.token);
    return data.user;
  };

  const loginGoogle = async (credential: { email: string; name?: string; avatar?: string }): Promise<User> => {
    const res = await fetch(`${API_BASE}/api/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credential)
    });
    if (!res.ok) throw new Error('Google authentication failed.');
    const data = await res.json();
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem('manak_token', data.token);
    return data.user;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('manak_token');
  };

  const setUserProfile = (profileData: Partial<UserProfile>) => {
    if (!user) return;
    setUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        profile: {
          ...(prev.profile || {
            userId: prev.id,
            role: 'Manufacturer',
            productCategories: [],
            mainProducts: [],
            materialsUsed: [],
            bisInterestAreas: [],
            preferredLanguage: 'en',
            informationDepth: 'Quick',
            isOnboarded: true
          }),
          ...profileData,
          isOnboarded: true
        }
      };
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        loginDemo,
        loginGoogle,
        logout,
        setUserProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
