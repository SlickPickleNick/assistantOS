'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HotelHero from '@/components/HotelHero';
import HotelSuites from '@/components/HotelSuites';
import HotelDining from '@/components/HotelDining';
import HotelAmenities from '@/components/HotelAmenities';
import HotelFooter from '@/components/HotelFooter';
import ChatWidget from '@/components/ChatWidget';
import GatekeeperModal from '@/components/GatekeeperModal';

export default function HomePage() {
  const [user, setUser] = useState<any>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [loadingSession, setLoadingSession] = useState(true);

  // Check current session on mount
  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch('/api/auth/session');
        const data = await res.json();
        if (data.user) {
          setUser(data.user);
        } else {
          // Site-wide gatekeeper: If unauthenticated, prompt gatekeeper modal
          setIsAuthOpen(true);
        }
      } catch (err) {
        console.error('Session check failed', err);
        setIsAuthOpen(true);
      } finally {
        setLoadingSession(false);
      }
    }
    checkSession();
  }, []);

  async function handleLogout() {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      setIsChatOpen(false);
      setIsAuthOpen(true);
    } catch (err) {
      console.error('Logout error:', err);
    }
  }

  function handleConciergePrompt(promptText: string) {
    if (!user) {
      setIsAuthOpen(true);
      return;
    }
    setIsChatOpen(true);
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#070a12] text-slate-100 selection:bg-amber-400 selection:text-slate-950">
      {/* Navigation */}
      <Navbar
        user={user}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenChat={() => {
          if (!user) {
            setIsAuthOpen(true);
          } else {
            setIsChatOpen(true);
          }
        }}
        onLogout={handleLogout}
      />

      {/* Main Hotel Showcase Body */}
      <main className="flex-1">
        <HotelHero
          user={user}
          onOpenChat={() => {
            if (!user) {
              setIsAuthOpen(true);
            } else {
              setIsChatOpen(true);
            }
          }}
          onOpenAuth={() => setIsAuthOpen(true)}
        />
        <HotelSuites onAskConcierge={handleConciergePrompt} />
        <HotelDining onAskConcierge={handleConciergePrompt} />
        <HotelAmenities onAskConcierge={handleConciergePrompt} />
      </main>

      {/* Footer */}
      <HotelFooter />

      {/* Floating 24/7 AI Concierge Chat Support Bubble */}
      <ChatWidget
        user={user}
        isOpen={isChatOpen}
        onToggle={() => {
          if (!user) {
            setIsAuthOpen(true);
          } else {
            setIsChatOpen(!isChatOpen);
          }
        }}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* Site-Wide Authentication Gatekeeper Modal */}
      <GatekeeperModal
        isOpen={isAuthOpen}
        onClose={() => {
          // If user is not logged in, gatekeeper stays open or can be dismissed if allowed
          if (user) setIsAuthOpen(false);
        }}
        onSuccess={(authenticatedUser) => {
          setUser(authenticatedUser);
          setIsAuthOpen(false);
        }}
        forceRequired={!user && !loadingSession}
      />
    </div>
  );
}
