'use client';

import React from 'react';
import { Sparkles, Compass, ShieldCheck, Waves, Utensils, Award } from 'lucide-react';

interface HotelHeroProps {
  onOpenChat: () => void;
  onOpenAuth: () => void;
  user: any;
}

export default function HotelHero({ onOpenChat, onOpenAuth, user }: HotelHeroProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Immersive Luxury Resort Background Imagery */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center filter brightness-[0.35] scale-105 transition-transform duration-1000 ease-out"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=85")',
        }}
      />

      {/* Radiant Gradient Overlays */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#070a12]/80 via-transparent to-[#070a12]" />
      <div className="absolute inset-0 z-0 bg-radial from-amber-500/10 via-transparent to-transparent pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
        {/* Prestige Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-amber-400/40 text-amber-300 text-xs uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(212,175,55,0.2)] animate-in fade-in slide-in-from-bottom-3 duration-500">
          <Award className="w-4 h-4 text-amber-300" />
          <span>Forbes Five-Star Luxury Destination</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-white leading-tight">
          A Sanctuary of <br />
          <span className="gold-gradient-text">Coastal Elegance</span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
          Welcome to <strong className="text-amber-200">The Grand Azure Resort & Spa</strong>. Experience bespoke oceanfront living, world-class gastronomy, and seamless service orchestrated by our grounded 24/7 AI Concierge.
        </p>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenChat}
            className="w-full sm:w-auto px-8 py-4 rounded-full btn-gold text-slate-950 font-bold tracking-wider text-xs uppercase shadow-xl flex items-center justify-center gap-3 transition-transform hover:scale-105"
          >
            <Sparkles className="w-4 h-4 text-slate-950" />
            <span>Consult AI Concierge</span>
          </button>

          <a
            href="#suites"
            className="w-full sm:w-auto px-8 py-4 rounded-full btn-outline-gold text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <Compass className="w-4 h-4" />
            <span>View Suites & Villas</span>
          </a>
        </div>

        {/* Key Highlights Grid */}
        <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            { icon: Waves, label: 'Private Ocean Cove' },
            { icon: Utensils, label: 'Michelin-Selected Dining' },
            { icon: Sparkles, label: 'Thalasso Wellness Spa' },
            { icon: ShieldCheck, label: '24/7 AI Concierge Care' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl glass-subtle flex flex-col items-center justify-center gap-2 text-center border border-white/5 hover:border-amber-400/30 transition-colors"
            >
              <item.icon className="w-5 h-5 text-amber-300" />
              <span className="text-xs font-medium tracking-wide text-slate-300">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
