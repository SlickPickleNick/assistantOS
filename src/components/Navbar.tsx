'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Shield, LogOut, User as UserIcon, MessageSquare } from 'lucide-react';

interface User {
  id: string;
  name?: string | null;
  username?: string | null;
  email?: string | null;
  role: 'guest' | 'admin';
}

interface NavbarProps {
  user: User | null;
  onOpenAuth: () => void;
  onOpenChat: () => void;
  onLogout: () => void;
}

export default function Navbar({ user, onOpenAuth, onOpenChat, onLogout }: NavbarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full border border-amber-400/40 flex items-center justify-center bg-amber-400/10 group-hover:bg-amber-400/20 transition-all shadow-[0_0_15px_rgba(212,175,55,0.2)]">
            <Sparkles className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <span className="block text-lg font-serif tracking-widest uppercase gold-gradient-text font-bold">
              The Grand Azure
            </span>
            <span className="block text-[10px] tracking-[0.25em] text-slate-400 uppercase font-sans">
              Resort & Spa • Coastline
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm tracking-wider uppercase text-slate-300">
          <a href="#suites" className="hover:text-amber-300 transition-colors">
            Suites
          </a>
          <a href="#dining" className="hover:text-amber-300 transition-colors">
            Dining
          </a>
          <a href="#spa" className="hover:text-amber-300 transition-colors">
            Wellness & Spa
          </a>
          <a href="#attractions" className="hover:text-amber-300 transition-colors">
            Excursions
          </a>
        </nav>

        {/* User Actions */}
        <div className="flex items-center gap-3">
          {/* Chat Quick Trigger */}
          <button
            onClick={onOpenChat}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-sky-500/10 text-sky-300 border border-sky-500/30 hover:bg-sky-500/20 transition-all"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>AI Concierge</span>
          </button>

          {user ? (
            <div className="flex items-center gap-3">
              {user.role === 'admin' ? (
                <Link
                  href="/admin"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition-all shadow-[0_0_10px_rgba(212,175,55,0.2)]"
                >
                  <Shield className="w-3.5 h-3.5 text-amber-400" />
                  <span>Admin Portal</span>
                </Link>
              ) : (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs bg-slate-800/60 border border-slate-700/60 text-slate-300">
                  <UserIcon className="w-3.5 h-3.5 text-amber-300" />
                  <span className="truncate max-w-[120px]">{user.name || user.email || 'Guest'}</span>
                </div>
              )}

              <button
                onClick={onLogout}
                title="Sign Out"
                className="p-2 rounded-full text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="btn-gold px-5 py-2 rounded-full text-xs uppercase tracking-wider font-bold"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
