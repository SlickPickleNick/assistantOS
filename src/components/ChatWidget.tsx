'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  ThumbsUp,
  ThumbsDown,
  ChevronDown,
  Check,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';

interface FeedbackData {
  rating: number;
  reason?: string | null;
  userComment?: string | null;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
  feedback?: FeedbackData | null;
}

interface ChatWidgetProps {
  user: any;
  onOpenAuth: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

const STARTER_PROMPTS = [
  'What are the check-in and checkout times?',
  'What restaurants and dining options are available?',
  'What are the pool and luxury spa hours?',
  'What is the Wi-Fi password for guests?',
  'Can I bring my pet dog?',
  'I need to speak with a human manager',
];

export default function ChatWidget({ user, onOpenAuth, isOpen, onToggle }: ChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content:
        'Welcome to **The Grand Azure Resort & Spa**. I am your personal 24/7 AI Concierge. How may I elevate your stay today?',
      createdAt: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [feedbackPromptMessageId, setFeedbackPromptMessageId] = useState<string | null>(null);
  const [feedbackReason, setFeedbackReason] = useState('Inaccurate info');
  const [feedbackComment, setFeedbackComment] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, loading]);

  async function handleSendMessage(customText?: string) {
    const text = customText || input;
    if (!text.trim()) return;

    if (!user) {
      onOpenAuth();
      return;
    }

    const tempUserMsgId = `user-${Date.now()}`;
    const userMsg: Message = {
      id: tempUserMsgId,
      role: 'user',
      content: text.trim(),
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text.trim(),
          sessionId,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send message');

      if (data.sessionId) setSessionId(data.sessionId);

      const botMsg: Message = {
        id: data.messageId || `bot-${Date.now()}`,
        role: 'assistant',
        content: data.response,
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'assistant',
          content: 'I apologize, but I am having trouble connecting to the concierge desk right now. Please try again in a moment.',
          createdAt: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function submitFeedback(messageId: string, rating: number, reason?: string, comment?: string) {
    if (!user) {
      onOpenAuth();
      return;
    }

    // Optimistic UI update
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId
          ? { ...msg, feedback: { rating, reason: reason || null, userComment: comment || null } }
          : msg
      )
    );
    setFeedbackPromptMessageId(null);
    setFeedbackComment('');

    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messageId,
          rating,
          reason,
          userComment: comment,
        }),
      });
    } catch (err) {
      console.error('Failed to submit feedback:', err);
    }
  }

  return (
    <>
      {/* Floating Launcher Button */}
      <button
        onClick={onToggle}
        aria-label="Open AI Concierge Chat"
        className={`fixed bottom-6 right-6 z-40 flex items-center gap-3 p-4 rounded-full glass-panel border border-amber-400/50 concierge-bubble-glow transition-all duration-300 hover:scale-105 group ${
          isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'
        }`}
      >
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 shadow-lg">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-900 rounded-full animate-ping" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-900 rounded-full" />
        </div>
        <div className="hidden sm:block text-left pr-2">
          <div className="text-xs font-serif font-bold text-amber-300 tracking-wider uppercase">
            24/7 AI Concierge
          </div>
          <div className="text-[10px] text-slate-400">Ask property questions</div>
        </div>
      </button>

      {/* Slide-out Chat Drawer / Window */}
      <div
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] h-[600px] max-h-[85vh] rounded-2xl glass-panel flex flex-col shadow-2xl border border-amber-400/40 overflow-hidden transition-all duration-300 ${
          isOpen
            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
            : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
        }`}
      >
        {/* Drawer Header */}
        <div className="px-5 py-4 border-b border-amber-400/20 bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-amber-400/10 border border-amber-400/40 flex items-center justify-center text-amber-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-serif font-bold tracking-wider gold-gradient-text uppercase">
                Grand Azure Concierge
              </div>
              <div className="flex items-center gap-2 text-[10px] text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Online • Grounded Assistance</span>
              </div>
            </div>
          </div>

          <button
            onClick={onToggle}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 leading-relaxed shadow-md ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-br from-sky-600 to-sky-700 text-white rounded-br-xs'
                    : 'bg-slate-900/90 border border-slate-700/80 text-slate-200 rounded-bl-xs'
                }`}
              >
                <div className="whitespace-pre-wrap font-sans text-xs sm:text-sm">
                  {msg.content}
                </div>
              </div>

              {/* Thumbs Up / Down Feedback Bar for Assistant Messages */}
              {msg.role === 'assistant' && msg.id !== 'welcome-1' && (
                <div className="mt-1.5 flex items-center gap-2 text-[11px] text-slate-400 px-1">
                  <span>Helpful?</span>
                  
                  {/* Thumbs Up Button */}
                  <button
                    onClick={() => submitFeedback(msg.id, 1)}
                    title="Helpful response"
                    className={`p-1 rounded-md transition-colors flex items-center gap-1 ${
                      msg.feedback?.rating === 1
                        ? 'text-amber-300 bg-amber-400/20 font-semibold'
                        : 'hover:text-amber-300 hover:bg-white/5'
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    {msg.feedback?.rating === 1 && <span className="text-[10px]">Liked</span>}
                  </button>

                  {/* Thumbs Down Button */}
                  <button
                    onClick={() => {
                      if (feedbackPromptMessageId === msg.id) {
                        setFeedbackPromptMessageId(null);
                      } else {
                        setFeedbackPromptMessageId(msg.id);
                      }
                    }}
                    title="Needs improvement"
                    className={`p-1 rounded-md transition-colors flex items-center gap-1 ${
                      msg.feedback?.rating === -1
                        ? 'text-rose-400 bg-rose-500/20 font-semibold'
                        : 'hover:text-rose-400 hover:bg-white/5'
                    }`}
                  >
                    <ThumbsDown className="w-3.5 h-3.5" />
                    {msg.feedback?.rating === -1 && <span className="text-[10px]">Disliked</span>}
                  </button>
                </div>
              )}

              {/* Feedback Popover for Downvotes */}
              {feedbackPromptMessageId === msg.id && (
                <div className="mt-2 w-full max-w-[90%] p-3 rounded-xl bg-slate-950 border border-amber-400/30 shadow-lg text-xs space-y-2 animate-in fade-in">
                  <div className="flex items-center gap-1.5 text-amber-300 font-semibold">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>How can we improve this response?</span>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5">
                    {['Inaccurate info', "Didn't answer question", 'Unhelpful tone', 'Other'].map(
                      (reason) => (
                        <button
                          key={reason}
                          type="button"
                          onClick={() => setFeedbackReason(reason)}
                          className={`p-1.5 rounded-lg text-[11px] text-left border transition-all ${
                            feedbackReason === reason
                              ? 'bg-amber-400/20 border-amber-400 text-amber-200'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {reason}
                        </button>
                      )
                    )}
                  </div>

                  <input
                    type="text"
                    value={feedbackComment}
                    onChange={(e) => setFeedbackComment(e.target.value)}
                    placeholder="Optional details for our hotel staff..."
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 text-xs focus:border-amber-400 focus:outline-none"
                  />

                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setFeedbackPromptMessageId(null)}
                      className="px-2.5 py-1 rounded text-slate-400 hover:text-slate-200 text-[11px]"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        submitFeedback(msg.id, -1, feedbackReason, feedbackComment)
                      }
                      className="px-3 py-1 rounded-lg btn-gold text-slate-950 font-bold text-[11px]"
                    >
                      Submit Feedback
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-amber-300/80 italic p-2 bg-slate-900/60 rounded-xl max-w-[70%]">
              <Sparkles className="w-4 h-4 animate-spin text-amber-400" />
              <span>Consulting concierge knowledge base...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        {messages.length <= 2 && (
          <div className="px-4 py-2 border-t border-slate-800/80 bg-slate-950/40">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1.5 font-semibold">
              Suggested Inquiries:
            </div>
            <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {STARTER_PROMPTS.slice(0, 3).map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(prompt)}
                  className="whitespace-nowrap px-2.5 py-1 rounded-full text-[11px] bg-slate-800/70 hover:bg-amber-400/20 hover:text-amber-200 border border-slate-700/60 transition-all text-slate-300"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chat Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 border-t border-amber-400/20 bg-slate-950/80 flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            placeholder={
              user ? 'Inquire about suites, dining, policies...' : 'Please sign in to message concierge'
            }
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-amber-400/60 focus:outline-none text-slate-100 text-xs placeholder:text-slate-500"
          />

          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="p-2.5 rounded-xl btn-gold disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <Send className="w-4 h-4 text-slate-950" />
          </button>
        </form>
      </div>
    </>
  );
}
