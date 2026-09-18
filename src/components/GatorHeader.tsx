'use client';

import React, { useState } from 'react';
import { Phone, MapPin, User, Menu, X, Map, Award } from 'lucide-react';

interface GatorHeaderProps {
  user?: any;
  onOpenAuth?: () => void;
  onLogout?: () => void;
  onReserveClick?: () => void;
  onOpenMap?: () => void;
}

export default function GatorHeader({
  user,
  onOpenAuth,
  onLogout,
  onReserveClick,
  onOpenMap,
}: GatorHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#e2e2e2] shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
      {/* Top Utility Ribbon */}
      <div className="hidden lg:block border-b border-[#ececec] text-[#555] text-xs">
        <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">
          <div className="flex items-center space-x-6 text-[11px] font-medium tracking-wide">
            <span className="flex items-center space-x-1.5 text-[#1c1c1c]">
              <MapPin className="w-3.5 h-3.5 text-[#916e27]" />
              <span>4200 Ocean Vista Drive, Northwest Gainesville, FL 32606</span>
            </span>
            <span className="text-[#999]">&bull;</span>
            <a
              href="tel:15552001234"
              className="flex items-center space-x-1.5 text-[#1c1c1c] hover:text-[#916e27] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#916e27]" />
              <span>+1 (555) 200-1234 (Front Desk 24/7 Ext 0)</span>
            </a>
          </div>

          <div className="flex items-center space-x-6 text-[11px] font-medium tracking-wider uppercase">
            <button
              onClick={onOpenMap}
              className="flex items-center space-x-1 hover:text-[#916e27] transition-colors"
            >
              <Map className="w-3.5 h-3.5 text-[#916e27]" />
              <span>Property Map</span>
            </button>
            <a
              href="#loyalty"
              className="flex items-center space-x-1 hover:text-[#916e27] transition-colors"
            >
              <Award className="w-3.5 h-3.5 text-[#916e27]" />
              <span>Gator Rewards</span>
            </a>
            <a
              href="#reservation"
              onClick={(e) => {
                e.preventDefault();
                onReserveClick?.();
              }}
              className="hover:text-[#916e27] transition-colors"
            >
              Check Rates
            </a>
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-[#1c1c1c] font-semibold normal-case">
                  {user.name || user.email?.split('@')[0]}
                </span>
                <button
                  onClick={onLogout}
                  className="text-[#916e27] hover:underline normal-case text-xs"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center space-x-1 text-[#1c1c1c] font-semibold hover:text-[#916e27] transition-colors"
              >
                <User className="w-3.5 h-3.5 text-[#916e27]" />
                <span>Sign in / Guest Access</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Brand & Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        {/* Mobile menu trigger */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#1c1c1c] hover:text-[#916e27]"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Resort Brand Identity */}
        <div className="flex items-center space-x-3">
          <a href="#" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 relative flex items-center justify-center">
              <img
                src="/images/gator_logo.png"
                alt="Go Gator Resort Logo"
                className="w-full h-full object-contain group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-serif text-lg sm:text-xl font-bold tracking-[0.12em] text-[#1c1c1c] leading-tight group-hover:text-[#916e27] transition-colors">
                GO GATOR RESORT &amp; SPA
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#916e27] font-semibold">
                4.5-Star All-Inclusive &bull; Gainesville, Florida
              </span>
            </div>
          </a>
        </div>

        {/* Desktop Primary Navigation */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-7">
          <a
            href="#accommodations"
            className="t-overline-medium text-[#2d2d2d] hover:text-[#916e27] transition-colors"
          >
            Accommodations
          </a>
          <a
            href="#dining"
            className="t-overline-medium text-[#2d2d2d] hover:text-[#916e27] transition-colors"
          >
            Dining &amp; Bars
          </a>
          <a
            href="#amenities"
            className="t-overline-medium text-[#2d2d2d] hover:text-[#916e27] transition-colors"
          >
            Amenities &amp; Pools
          </a>
          <a
            href="#spa"
            className="t-overline-medium text-[#2d2d2d] hover:text-[#916e27] transition-colors"
          >
            Spa &amp; Wellness
          </a>
          <a
            href="#activities"
            className="t-overline-medium text-[#2d2d2d] hover:text-[#916e27] transition-colors"
          >
            Activities
          </a>
          <button
            onClick={onOpenMap}
            className="t-overline-medium text-[#2d2d2d] hover:text-[#916e27] transition-colors uppercase"
          >
            Property Map
          </button>
          <a
            href="#loyalty"
            className="t-overline-medium text-[#2d2d2d] hover:text-[#916e27] transition-colors"
          >
            Gator Rewards
          </a>
          <a
            href="#attractions"
            className="t-overline-medium text-[#2d2d2d] hover:text-[#916e27] transition-colors"
          >
            Area Guide
          </a>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onReserveClick?.()}
            className="px-5 sm:px-6 py-2.5 bg-[#1c1c1c] text-white hover:bg-[#916e27] transition-all text-xs uppercase tracking-[0.2em] font-medium shadow"
          >
            Reserve Now
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-[#e2e2e2] px-6 py-6 space-y-4 shadow-xl animate-fadeIn">
          <div className="space-y-3 pb-4 border-b border-[#f0f0f0]">
            <a
              href="#accommodations"
              onClick={() => setMobileMenuOpen(false)}
              className="block t-overline-medium text-[#1c1c1c] hover:text-[#916e27]"
            >
              Accommodations (306 Rooms &amp; Suites)
            </a>
            <a
              href="#dining"
              onClick={() => setMobileMenuOpen(false)}
              className="block t-overline-medium text-[#1c1c1c] hover:text-[#916e27]"
            >
              Dining &amp; Bars (5 Venues + 3 Bars)
            </a>
            <a
              href="#amenities"
              onClick={() => setMobileMenuOpen(false)}
              className="block t-overline-medium text-[#1c1c1c] hover:text-[#916e27]"
            >
              Amenities &amp; Pools (3 Outdoor Pools)
            </a>
            <a
              href="#spa"
              onClick={() => setMobileMenuOpen(false)}
              className="block t-overline-medium text-[#1c1c1c] hover:text-[#916e27]"
            >
              Spa &amp; Wellness (Thermal Suite)
            </a>
            <a
              href="#activities"
              onClick={() => setMobileMenuOpen(false)}
              className="block t-overline-medium text-[#1c1c1c] hover:text-[#916e27]"
            >
              Activities &amp; Golf
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenMap?.();
              }}
              className="block text-left w-full t-overline-medium text-[#1c1c1c] hover:text-[#916e27]"
            >
              Property Map &amp; Floor Plan
            </button>
            <a
              href="#loyalty"
              onClick={() => setMobileMenuOpen(false)}
              className="block t-overline-medium text-[#1c1c1c] hover:text-[#916e27]"
            >
              Gator Rewards Loyalty
            </a>
            <a
              href="#attractions"
              onClick={() => setMobileMenuOpen(false)}
              className="block t-overline-medium text-[#1c1c1c] hover:text-[#916e27]"
            >
              Gainesville &amp; Area Attractions
            </a>
          </div>

          <div className="pt-2 flex flex-col space-y-3 text-xs text-[#646464]">
            <div className="flex items-center space-x-2">
              <Phone className="w-3.5 h-3.5 text-[#916e27]" />
              <span>+1 (555) 200-1234 (Dial Ext 0)</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-3.5 h-3.5 text-[#916e27]" />
              <span>4200 Ocean Vista Dr, Gainesville, FL</span>
            </div>
            {user ? (
              <div className="flex items-center justify-between pt-2 border-t border-[#f0f0f0]">
                <span>Signed in: {user.name || user.email}</span>
                <button onClick={onLogout} className="text-[#916e27] font-semibold">
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth?.();
                }}
                className="w-full text-center py-2.5 border border-[#1c1c1c] text-[#1c1c1c] font-semibold uppercase tracking-wider text-xs"
              >
                Sign in / Guest Access
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
