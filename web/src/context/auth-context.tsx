'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '@/lib/api';

export interface UserProfile {
  id: string;
  name?: string;
  email: string;
  phoneNumber?: string;
  token: string;
  xp: number;
  level: number;
  streak: number;
  lastLogin: string;
}

export interface AuthResponse {
  success: boolean;
  error?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  login: (email: string, password?: string) => Promise<AuthResponse>;
  register: (email: string, phone: string, password: string, name?: string) => Promise<AuthResponse>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'signup';
  openAuthModal: (mode?: 'login' | 'signup') => void;
  closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const TOKEN_STORAGE_KEY = 'writing_assistant_auth_token';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');

  const fetchProfile = async (token?: string) => {
    const activeToken = token || (typeof window !== 'undefined' ? localStorage.getItem(TOKEN_STORAGE_KEY) : null);
    if (!activeToken) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      api.defaults.headers.common['Authorization'] = `Bearer ${activeToken}`;
      const res = await api.get('/db/me');
      setUser(res.data);
    } catch {
      setUser(null);
      if (typeof window !== 'undefined') {
        localStorage.removeItem(TOKEN_STORAGE_KEY);
      }
      delete api.defaults.headers.common['Authorization'];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const login = async (email: string, password?: string): Promise<AuthResponse> => {
    try {
      const res = await api.post('/db/login', { email, password });
      const userData: UserProfile = res.data;
      setUser(userData);
      if (userData.token) {
        if (typeof window !== 'undefined') {
          localStorage.setItem(TOKEN_STORAGE_KEY, userData.token);
        }
        api.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
      }
      setIsAuthModalOpen(false);
      return { success: true };
    } catch (err: any) {
      const message = err.response?.data?.error || err.message || 'Invalid email or password.';
      return { success: false, error: message };
    }
  };

  const register = async (email: string, phone: string, password: string, name?: string): Promise<AuthResponse> => {
    try {
      const res = await api.post('/db/register', { email, phone, password, name });
      const userData: UserProfile = res.data;
      setUser(userData);
      if (userData.token) {
        if (typeof window !== 'undefined') {
          localStorage.setItem(TOKEN_STORAGE_KEY, userData.token);
        }
        api.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
      }
      setIsAuthModalOpen(false);
      return { success: true };
    } catch (err: any) {
      const message = err.response?.data?.error || err.message || 'Registration failed. Email might already exist.';
      return { success: false, error: message };
    }
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    }
    delete api.defaults.headers.common['Authorization'];
  };

  const openAuthModal = (mode: 'login' | 'signup' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      register,
      logout,
      refreshProfile: () => fetchProfile(),
      isAuthModalOpen,
      authModalMode,
      openAuthModal,
      closeAuthModal
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
