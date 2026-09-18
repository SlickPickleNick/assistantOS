'use client';

import React, { useState, useEffect } from 'react';
import GatorHeader from '@/components/GatorHeader';
import GatorHero from '@/components/GatorHero';
import GatorReservation from '@/components/GatorReservation';
import GatorBulletins from '@/components/GatorBulletins';
import GatorPropertyOverview from '@/components/GatorPropertyOverview';
import GatorAccommodations from '@/components/GatorAccommodations';
import GatorDining from '@/components/GatorDining';
import GatorAmenities from '@/components/GatorAmenities';
import GatorSpa from '@/components/GatorSpa';
import GatorActivities from '@/components/GatorActivities';
import GatorMapViewer from '@/components/GatorMapViewer';
import GatorLoyalty from '@/components/GatorLoyalty';
import GatorAttractions from '@/components/GatorAttractions';
import GatorFooter from '@/components/GatorFooter';
import GatekeeperModal from '@/components/GatekeeperModal';

export default function HomePage() {
  const [user, setUser] = useState<any>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  // Check current session on mount
  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch('/api/auth/session');
        const data = await res.json();
        if (data.user) {
          setUser(data.user);
        }
      } catch (err) {
        console.error('Session check failed', err);
      }
    }
    checkSession();
  }, []);

  async function handleLogout() {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
    } catch (err) {
      console.error('Logout error:', err);
    }
  }

  function scrollToReservation() {
    const el = document.getElementById('reservation');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function scrollToAccommodations() {
    const el = document.getElementById('accommodations');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1c1c1c] selection:bg-[#916e27] selection:text-white">
      {/* Official Go Gator Header */}
      <GatorHeader
        user={user}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
        onReserveClick={scrollToReservation}
        onOpenMap={() => setIsMapModalOpen(true)}
      />

      {/* Main Luxury Resort Body */}
      <main className="flex-1">
        {/* Hero Section */}
        <GatorHero
          onExploreClick={scrollToAccommodations}
          onOpenMap={() => setIsMapModalOpen(true)}
        />

        {/* Floating Reservation Search Bar */}
        <GatorReservation
          onSearch={(criteria) => {
            console.log('Reservation Search:', criteria);
            alert(`Checking rates at Go Gator Resort & Spa for ${criteria.dates}`);
          }}
        />

        {/* Live Daily Resort Bulletins (Section 17) */}
        <GatorBulletins />

        {/* Single Property Dedicated Overview Card (Section 1 & 3) */}
        <GatorPropertyOverview onOpenMap={() => setIsMapModalOpen(true)} />

        {/* All 7 Room & Villa Categories (Section 2) */}
        <GatorAccommodations />

        {/* 5 Dining Venues + 3 Bars & All-Inclusive Rules (Section 4) */}
        <GatorDining />

        {/* Pools, Beach, Cabanas & Transportation (Section 3 & 7) */}
        <GatorAmenities />

        {/* Spa & Wellness (Section 5) */}
        <GatorSpa />

        {/* Kids Club, Teen Lounge, Watersports & Entertainment (Section 6) */}
        <GatorActivities />

        {/* Interactive Property Map & Floor Plan Lightbox (Page 2) */}
        <GatorMapViewer
          isOpen={isMapModalOpen}
          onClose={() => setIsMapModalOpen(false)}
        />

        {/* Gator Rewards Loyalty Program Tiers (Section 9) */}
        <GatorLoyalty />

        {/* Gainesville Local Area Guide (Section 16) */}
        <GatorAttractions />
      </main>

      {/* Official Directory & Policies Footer (Section 8 & 15) */}
      <GatorFooter />

      {/* Authentication Gatekeeper Modal */}
      <GatekeeperModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={(authenticatedUser) => {
          setUser(authenticatedUser);
          setIsAuthOpen(false);
        }}
      />
    </div>
  );
}
