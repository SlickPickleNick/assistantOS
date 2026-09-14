'use client';

import React, { useState } from 'react';
import { Shield, Sparkles, X, Lock, User as UserIcon, CheckCircle2, AlertCircle } from 'lucide-react';

interface GatekeeperModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: any) => void;
  forceRequired?: boolean;
}

export default function GatekeeperModal({
  isOpen,
  onClose,
  onSuccess,
  forceRequired = false,
}: GatekeeperModalProps) {
  const [activeTab, setActiveTab] = useState<'guest' | 'admin'>('guest');
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('HotelAdmin2026!');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  async function handleAdminLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'admin', username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Authentication failed');
      onSuccess(data.user);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  async function handleGuestLogin(provider: string, customName?: string, customEmail?: string) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'guest',
          provider,
          name: customName || guestName || `${provider} Guest`,
          email: customEmail || guestEmail || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Guest login failed');
      onSuccess(data.user);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Guest login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md glass-panel rounded-2xl p-6 sm:p-8 shadow-2xl border border-amber-400/30 overflow-hidden">
        {/* Background glow elements */}
        <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />

        {/* Close button if not strictly forced */}
        {!forceRequired && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full border border-amber-400/40 bg-amber-400/10 flex items-center justify-center mx-auto mb-3 shadow-[0_0_15px_rgba(212,175,55,0.25)]">
            <Sparkles className="w-6 h-6 text-amber-300" />
          </div>
          <h2 className="text-2xl font-serif tracking-wider font-bold gold-gradient-text uppercase">
            The Grand Azure
          </h2>
          <p className="text-xs text-slate-400 tracking-wider mt-1 uppercase">
            Authentication Gatekeeper
          </p>
        </div>

        {/* Role Tab Selector */}
        <div className="flex rounded-xl bg-slate-900/80 p-1 border border-slate-800 mb-6">
          <button
            type="button"
            onClick={() => {
              setActiveTab('guest');
              setError(null);
            }}
            className={`flex-1 py-2 text-xs font-semibold tracking-wider rounded-lg transition-all ${
              activeTab === 'guest'
                ? 'bg-gradient-to-r from-sky-600 to-sky-700 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Guest Tester
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('admin');
              setError(null);
            }}
            className={`flex-1 py-2 text-xs font-semibold tracking-wider rounded-lg transition-all ${
              activeTab === 'admin'
                ? 'btn-gold text-slate-950 shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Team Admin
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {activeTab === 'guest' ? (
          <div className="space-y-4">
            <p className="text-xs text-slate-300 text-center leading-relaxed">
              Verify your identity to unlock access to the luxury property demo and the 24/7 AI Concierge.
            </p>

            {/* Quick Demo Tester Button */}
            <button
              onClick={() => handleGuestLogin('DemoGuest', 'Guest Reviewer', 'guest@demo.test')}
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl text-sm font-semibold bg-gradient-to-r from-amber-500/20 to-sky-500/20 hover:from-amber-500/30 hover:to-sky-500/30 border border-amber-400/40 text-amber-200 flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(212,175,55,0.15)] group"
            >
              <CheckCircle2 className="w-4 h-4 text-amber-300 group-hover:scale-110 transition-transform" />
              <span>1-Click Quick Guest Login (Instant Test)</span>
            </button>

            <div className="relative my-4 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-800" />
              </div>
              <span className="relative px-3 text-[10px] uppercase tracking-widest bg-slate-900 text-slate-500">
                Or Continue With
              </span>
            </div>

            {/* Google OAuth Simulation Button */}
            <button
              onClick={() => handleGuestLogin('Google')}
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-medium bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 flex items-center justify-center gap-3 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5c1.7 0 3 .6 4 1.5l3-3C17.2 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.4l3.7 2.9C6.5 7.4 9 5 12 5z"
                />
                <path
                  fill="#4285F4"
                  d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.6 14.7c-.2-.7-.4-1.5-.4-2.7s.1-2 .4-2.7L1.9 6.4C.7 8.8 0 10.3 0 12s.7 3.2 1.9 5.6l3.7-2.9z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.3L1.9 16C3.7 19.8 7.5 23 12 23z"
                />
              </svg>
              <span>Sign in with Google</span>
            </button>

            {/* Discord OAuth Simulation Button */}
            <button
              onClick={() => handleGuestLogin('Discord')}
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-medium bg-[#5865F2]/10 hover:bg-[#5865F2]/20 border border-[#5865F2]/30 text-indigo-200 flex items-center justify-center gap-3 transition-colors"
            >
              <svg className="w-4 h-4 fill-current text-[#5865F2]" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028z" />
              </svg>
              <span>Sign in with Discord</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleAdminLogin} className="space-y-4">
            <p className="text-xs text-amber-200/80 text-center leading-relaxed">
              Administrative credentials required to manage chat prompt audits, triage downvoted answers, and register corrections.
            </p>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Username / Email
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="admin"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-amber-400 focus:outline-none text-white text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-amber-400 focus:outline-none text-white text-sm"
                />
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                Default project admin: <code className="text-amber-300">admin</code> / <code className="text-amber-300">HotelAdmin2026!</code>
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl btn-gold text-slate-950 font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 mt-4"
            >
              <Shield className="w-4 h-4" />
              <span>{loading ? 'Authenticating...' : 'Access Admin Dashboard'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
