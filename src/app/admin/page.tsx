'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Shield,
  Search,
  Download,
  ThumbsUp,
  ThumbsDown,
  Edit3,
  Trash2,
  ExternalLink,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  MessageSquare,
  Users,
  TrendingUp,
  RefreshCw,
  LogOut,
  FileText,
} from 'lucide-react';

interface Message {
  id: string;
  role: string;
  content: string;
  createdAt: string;
  feedback?: {
    rating: number;
    reason?: string | null;
    userComment?: string | null;
  } | null;
  correction?: {
    id: string;
    originalPrompt: string;
    badResponse: string;
    idealResponse: string;
    applied: boolean;
  } | null;
}

interface Session {
  id: string;
  title?: string | null;
  createdAt: string;
  updatedAt: string;
  user: {
    name?: string | null;
    email?: string | null;
    username?: string | null;
  };
  messages: Message[];
}

interface Stats {
  totalSessions: number;
  totalMessages: number;
  thumbsUp: number;
  thumbsDown: number;
  satisfactionRate: number;
  totalCorrections: number;
  totalGuests: number;
}

export default function AdminPage() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [authChecking, setAuthChecking] = useState(true);

  // Dashboard Data
  const [stats, setStats] = useState<Stats | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRating, setFilterRating] = useState<'all' | 'down' | 'up' | 'unrated'>('all');

  // Correction Modal State
  const [isCorrectionModalOpen, setIsCorrectionModalOpen] = useState(false);
  const [targetMessage, setTargetMessage] = useState<Message | null>(null);
  const [targetPrompt, setTargetPrompt] = useState('');
  const [idealResponse, setIdealResponse] = useState('');
  const [savingCorrection, setSavingCorrection] = useState(false);

  // Login form if not admin
  const [adminUsername, setAdminUsername] = useState('admin');
  const [adminPassword, setAdminPassword] = useState('HotelAdmin2026!');
  const [loginError, setLoginError] = useState<string | null>(null);

  // Check auth
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/session');
        const data = await res.json();
        if (data.user && data.user.role === 'admin') {
          setCurrentUser(data.user);
          loadDashboardData();
        }
      } catch (err) {
        console.error('Admin auth check failed', err);
      } finally {
        setAuthChecking(false);
      }
    }
    checkAuth();
  }, []);

  async function handleAdminLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError(null);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'admin', username: adminUsername, password: adminPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Authentication failed');
      setCurrentUser(data.user);
      loadDashboardData();
    } catch (err: any) {
      setLoginError(err.message || 'Login failed');
    }
  }

  async function loadDashboardData() {
    setLoading(true);
    try {
      // 1. Fetch stats
      const statsRes = await fetch('/api/admin/stats');
      const statsData = await statsRes.json();
      if (statsData.stats) setStats(statsData.stats);

      // 2. Fetch chats
      const params = new URLSearchParams();
      if (searchQuery) params.set('query', searchQuery);
      if (filterRating !== 'all') params.set('filter', filterRating);

      const chatsRes = await fetch(`/api/admin/chats?${params.toString()}`);
      const chatsData = await chatsRes.json();
      if (chatsData.sessions) {
        setSessions(chatsData.sessions);
        if (chatsData.sessions.length > 0 && !selectedSessionId) {
          setSelectedSessionId(chatsData.sessions[0].id);
        }
      }
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  }

  // Refetch when search or filter changes
  useEffect(() => {
    if (currentUser?.role === 'admin') {
      loadDashboardData();
    }
  }, [searchQuery, filterRating]);

  function openCorrectionEditor(message: Message, promptText: string) {
    setTargetMessage(message);
    setTargetPrompt(promptText);
    setIdealResponse(message.correction?.idealResponse || message.content);
    setIsCorrectionModalOpen(true);
  }

  async function saveCorrection() {
    if (!targetPrompt || !idealResponse) return;
    setSavingCorrection(true);
    try {
      const res = await fetch('/api/admin/corrections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messageId: targetMessage?.id,
          originalPrompt: targetPrompt,
          badResponse: targetMessage?.content || '',
          idealResponse,
        }),
      });
      if (res.ok) {
        setIsCorrectionModalOpen(false);
        loadDashboardData();
      }
    } catch (err) {
      console.error('Failed to save correction:', err);
    } finally {
      setSavingCorrection(false);
    }
  }

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    setCurrentUser(null);
  }

  function handleExport(format: 'md' | 'txt') {
    const params = new URLSearchParams();
    if (searchQuery) params.set('query', searchQuery);
    if (filterRating !== 'all') params.set('filter', filterRating);
    if (selectedSessionId) params.set('sessionId', selectedSessionId);
    params.set('format', format);

    window.open(`/api/admin/chats?${params.toString()}`, '_blank');
  }

  if (authChecking) {
    return (
      <div className="min-h-screen bg-[#070a12] flex items-center justify-center text-amber-300">
        <Sparkles className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  // If not authenticated as Admin, display dedicated Admin Access Portal
  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="min-h-screen bg-[#070a12] flex items-center justify-center p-4">
        <div className="w-full max-w-md glass-panel rounded-2xl p-8 border border-amber-400/40 shadow-2xl">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-full border border-amber-400/40 bg-amber-400/10 flex items-center justify-center mx-auto mb-3 shadow-[0_0_15px_rgba(212,175,55,0.25)]">
              <Shield className="w-6 h-6 text-amber-300" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-white uppercase tracking-wider">
              Hotel Staff Desk
            </h2>
            <p className="text-xs text-slate-400 tracking-wider mt-1 uppercase">
              Administrator Portal Access
            </p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-300 mb-1">
                Admin Username
              </label>
              <input
                type="text"
                value={adminUsername}
                onChange={(e) => setAdminUsername(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-300 mb-1">
                Admin Password
              </label>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-amber-400 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl btn-gold text-slate-950 font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2"
            >
              <Shield className="w-4 h-4" />
              <span>Authenticate Staff Session</span>
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-800 text-center">
            <Link href="/" className="text-xs text-slate-400 hover:text-amber-300 transition-colors">
              ← Return to Guest Hotel Showcase
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const activeSession = sessions.find((s) => s.id === selectedSessionId) || sessions[0];

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100 flex flex-col selection:bg-amber-400 selection:text-slate-950">
      {/* Top Admin Header */}
      <header className="glass-nav border-b border-amber-400/20 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-amber-400/10 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-serif font-bold gold-gradient-text uppercase tracking-wider flex items-center gap-2">
              <span>The Grand Azure</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-sans font-semibold">
                Staff Desk
              </span>
            </div>
            <div className="text-[10px] text-slate-400">
              Conversational Auditing & AI Response Curation
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-amber-300 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Live Demo</span>
          </Link>

          <button
            onClick={loadDashboardData}
            title="Refresh Data"
            className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={handleLogout}
            title="Sign Out"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs bg-rose-500/10 border border-rose-500/30 text-rose-300 hover:bg-rose-500/20 transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Admin Dashboard Container */}
      <div className="max-w-7xl w-full mx-auto p-6 space-y-6 flex-1">
        {/* KPI Analytics Cards */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="glass-panel rounded-2xl p-5 border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs uppercase tracking-wider">Chat Sessions</span>
                <MessageSquare className="w-4 h-4 text-sky-400" />
              </div>
              <div className="text-2xl font-bold text-white font-serif">{stats.totalSessions}</div>
              <div className="text-[11px] text-slate-500 mt-1">{stats.totalMessages} total messages</div>
            </div>

            <div className="glass-panel rounded-2xl p-5 border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs uppercase tracking-wider">Satisfaction</span>
                <TrendingUp className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-bold text-amber-300 font-serif">
                {stats.satisfactionRate}%
              </div>
              <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-2">
                <span className="text-emerald-400 font-medium">👍 {stats.thumbsUp}</span>
                <span>•</span>
                <span className="text-rose-400 font-medium">👎 {stats.thumbsDown}</span>
              </div>
            </div>

            <div className="glass-panel rounded-2xl p-5 border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs uppercase tracking-wider">Downvoted Queue</span>
                <AlertTriangle className="w-4 h-4 text-rose-400" />
              </div>
              <div className="text-2xl font-bold text-rose-300 font-serif">{stats.thumbsDown}</div>
              <div className="text-[11px] text-slate-500 mt-1">Requires review & correction</div>
            </div>

            <div className="glass-panel rounded-2xl p-5 border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs uppercase tracking-wider">Verified Corrections</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-bold text-emerald-300 font-serif">
                {stats.totalCorrections}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">Active few-shot overrides</div>
            </div>
          </div>
        )}

        {/* Search, Filter & Export Toolbar */}
        <div className="glass-panel rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 border border-slate-800">
          {/* Search bar */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search prompts, responses, or guest emails..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:border-amber-400 focus:outline-none placeholder:text-slate-500"
            />
          </div>

          {/* Feedback Filter Buttons */}
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
            <span className="text-xs text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              <span>Filter:</span>
            </span>

            {[
              { id: 'all', label: 'All' },
              { id: 'down', label: '👎 Disliked Only' },
              { id: 'up', label: '👍 Liked Only' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterRating(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  filterRating === tab.id
                    ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Export Action Buttons */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <button
              onClick={() => handleExport('md')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 transition-colors shadow"
              title="Download full Markdown transcript"
            >
              <Download className="w-3.5 h-3.5 text-amber-300" />
              <span>Export (.md)</span>
            </button>

            <button
              onClick={() => handleExport('txt')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 transition-colors shadow"
              title="Download Plain Text transcript"
            >
              <FileText className="w-3.5 h-3.5 text-sky-300" />
              <span>Export (.txt)</span>
            </button>
          </div>
        </div>

        {/* Two-Column Explorer: Session List on Left, Active Transcript on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[550px]">
          {/* Left Column: Sessions List */}
          <div className="lg:col-span-4 glass-panel rounded-2xl p-4 border border-slate-800 flex flex-col">
            <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-3 flex items-center justify-between">
              <span>Guest Sessions ({sessions.length})</span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 max-h-[500px] pr-1">
              {sessions.length === 0 ? (
                <div className="text-center py-12 text-slate-500 text-xs">
                  No chat sessions match current criteria.
                </div>
              ) : (
                sessions.map((s) => {
                  const isSelected = s.id === selectedSessionId;
                  const hasDownvote = s.messages.some((m) => m.feedback?.rating === -1);
                  const hasUpvote = s.messages.some((m) => m.feedback?.rating === 1);

                  return (
                    <button
                      key={s.id}
                      onClick={() => setSelectedSessionId(s.id)}
                      className={`w-full text-left p-3 rounded-xl border transition-all ${
                        isSelected
                          ? 'bg-slate-800/90 border-amber-400/50 shadow-md'
                          : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-850 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-200 mb-1">
                        <span className="truncate max-w-[160px]">
                          {s.user.name || s.user.email || 'Anonymous Guest'}
                        </span>
                        <span className="text-[10px] text-slate-500">
                          {new Date(s.updatedAt).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>

                      <div className="text-[11px] text-slate-400 truncate mb-2">
                        {s.title || 'Untitled Session'}
                      </div>

                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-slate-500">{s.messages.length} messages</span>
                        <div className="flex items-center gap-1">
                          {hasDownvote && (
                            <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 font-semibold">
                              👎 Flagged
                            </span>
                          )}
                          {hasUpvote && (
                            <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                              👍 Liked
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Column: Active Session Transcript & Response Curation */}
          <div className="lg:col-span-8 glass-panel rounded-2xl p-6 border border-slate-800 flex flex-col">
            {activeSession ? (
              <>
                {/* Transcript Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2 mb-4">
                  <div>
                    <h3 className="text-base font-serif font-bold text-white">
                      {activeSession.title || 'Guest Inquiries'}
                    </h3>
                    <p className="text-xs text-slate-400">
                      Guest: <strong className="text-amber-200">{activeSession.user.name || activeSession.user.email}</strong> • Started {new Date(activeSession.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 font-mono bg-slate-900 px-2 py-1 rounded">
                      ID: {activeSession.id.slice(0, 8)}...
                    </span>
                  </div>
                </div>

                {/* Messages Timeline */}
                <div className="flex-1 overflow-y-auto space-y-4 max-h-[480px] pr-2">
                  {activeSession.messages.map((msg, index) => {
                    // Find preceding user prompt for context
                    const prevUserPrompt =
                      index > 0 && activeSession.messages[index - 1].role === 'user'
                        ? activeSession.messages[index - 1].content
                        : 'General Hotel Query';

                    return (
                      <div
                        key={msg.id}
                        className={`p-4 rounded-xl border leading-relaxed ${
                          msg.role === 'user'
                            ? 'bg-sky-950/20 border-sky-800/40 text-sky-100 ml-8'
                            : 'bg-slate-900/80 border-slate-800 text-slate-200 mr-8'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[11px] mb-2 font-semibold">
                          <span className={msg.role === 'user' ? 'text-sky-300' : 'text-amber-300'}>
                            {msg.role === 'user' ? '👤 Guest Prompt' : '🤖 AI Concierge Response'}
                          </span>
                          <span className="text-slate-500">
                            {new Date(msg.createdAt).toLocaleTimeString()}
                          </span>
                        </div>

                        <p className="text-xs whitespace-pre-wrap">{msg.content}</p>

                        {/* If feedback was provided by guest */}
                        {msg.feedback && (
                          <div
                            className={`mt-3 p-2.5 rounded-lg text-xs flex items-start gap-2 ${
                              msg.feedback.rating === 1
                                ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
                                : 'bg-rose-500/10 border border-rose-500/30 text-rose-300'
                            }`}
                          >
                            {msg.feedback.rating === 1 ? (
                              <ThumbsUp className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                            ) : (
                              <ThumbsDown className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                            )}
                            <div>
                              <div className="font-semibold">
                                {msg.feedback.rating === 1 ? 'Guest Liked Response' : 'Guest Disliked Response'}
                                {msg.feedback.reason && ` — Reason: "${msg.feedback.reason}"`}
                              </div>
                              {msg.feedback.userComment && (
                                <p className="text-[11px] text-slate-300 italic mt-0.5">
                                  &quot;{msg.feedback.userComment}&quot;
                                </p>
                              )}
                            </div>
                          </div>
                        )}

                        {/* If an Admin correction is already applied */}
                        {msg.correction && (
                          <div className="mt-3 p-2.5 rounded-lg bg-amber-400/10 border border-amber-400/30 text-amber-200 text-xs space-y-1">
                            <div className="flex items-center gap-1.5 font-semibold text-amber-300">
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Active Admin Correction Applied</span>
                            </div>
                            <p className="italic">{msg.correction.idealResponse}</p>
                          </div>
                        )}

                        {/* Action Bar for Assistant Messages */}
                        {msg.role === 'assistant' && (
                          <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-end gap-2">
                            <button
                              onClick={() => openCorrectionEditor(msg, prevUserPrompt)}
                              className="px-3 py-1 rounded-lg text-xs font-semibold bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center gap-1.5 transition-colors"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>{msg.correction ? 'Edit Correction' : 'Correct Response'}</span>
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-500 text-xs">
                <MessageSquare className="w-8 h-8 mb-2 opacity-40" />
                <span>Select a chat session from the left to view transcript.</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Response Correction Modal */}
      {isCorrectionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-lg glass-panel rounded-2xl p-6 border border-amber-400/40 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-amber-300 font-serif font-bold text-lg">
                <Edit3 className="w-5 h-5" />
                <span>Curate AI Concierge Response</span>
              </div>
              <button
                onClick={() => setIsCorrectionModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">
                Guest Question / Prompt
              </label>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                {targetPrompt}
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">
                Previous / Bad Response
              </label>
              <div className="p-3 rounded-xl bg-rose-500/5 border border-rose-500/20 text-xs text-slate-400 line-through">
                {targetMessage?.content}
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-amber-300 font-semibold mb-1">
                Ideal / Grounded Hotel Response
              </label>
              <textarea
                rows={4}
                value={idealResponse}
                onChange={(e) => setIdealResponse(e.target.value)}
                placeholder="Write the precise, hospitable, verified hotel response here..."
                className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:border-amber-400 focus:outline-none leading-relaxed"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                This correction will be stored in the database and immediately prioritized by the AI adapter for identical or similar inquiries.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsCorrectionModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveCorrection}
                disabled={savingCorrection || !idealResponse.trim()}
                className="px-5 py-2.5 rounded-xl btn-gold text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-slate-950" />
                <span>{savingCorrection ? 'Saving...' : 'Publish Correction'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
