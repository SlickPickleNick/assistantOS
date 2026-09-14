'use client';

import React from 'react';
import { Sparkles, Waves, Compass, Shield, HeartHandshake } from 'lucide-react';

interface HotelAmenitiesProps {
  onAskConcierge: (query: string) => void;
}

export default function HotelAmenities({ onAskConcierge }: HotelAmenitiesProps) {
  return (
    <section id="spa" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16 space-y-3">
        <span className="text-xs uppercase tracking-[0.25em] text-amber-300 font-semibold">
          Wellness & Discovery
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
          Curated Resort Experiences
        </h2>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          Rejuvenate your senses with hydrotherapy treatments, cliffside ocean dips, and private concierge charters.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Thalasso Spa Card */}
        <div className="rounded-2xl glass-panel p-8 flex flex-col justify-between border border-amber-400/30 group hover:border-amber-400/60 transition-all">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300">
              <Waves className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-white">Azure Thalasso Spa & Hydrotherapy</h3>
            <p className="text-slate-300 text-xs leading-relaxed">
              Open daily from 9:00 AM to 8:00 PM. Immerse yourself in heated mineral seawater pools, eucalyptus steam grottos, and therapeutic deep-tissue body rituals designed to restore balance.
            </p>
            <ul className="space-y-2 text-xs text-slate-400 pt-2">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-300" />
                <span>Private Couples Cabana Treatments</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-300" />
                <span>Nordic Plunge Pools & Organic Botanical Oils</span>
              </li>
            </ul>
          </div>

          <div className="pt-6">
            <button
              onClick={() => onAskConcierge('What spa treatments and appointments are open this week?')}
              className="w-full py-3 rounded-xl btn-gold text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-slate-950" />
              <span>Book Spa Session with Concierge</span>
            </button>
          </div>
        </div>

        {/* Local Excursions Card */}
        <div id="attractions" className="rounded-2xl glass-panel p-8 flex flex-col justify-between border border-sky-400/30 group hover:border-sky-400/60 transition-all">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-sky-400/10 border border-sky-400/30 flex items-center justify-center text-sky-300">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-white">Private Excursions & Local Wonders</h3>
            <p className="text-slate-300 text-xs leading-relaxed">
              Discover hidden coves, sunset catamaran sailing charters, and artisan vineyard trails. Our AI concierge cross-references weather, tides, and reservations to build custom daily itineraries.
            </p>
            <ul className="space-y-2 text-xs text-slate-400 pt-2">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-300" />
                <span>Scenic Cliffside Coastal Hiking Boardwalk</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-300" />
                <span>Historic Lighthouse & Harbor Yacht Charters</span>
              </li>
            </ul>
          </div>

          <div className="pt-6">
            <button
              onClick={() => onAskConcierge('What are the top recommended local attractions and day trips?')}
              className="w-full py-3 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/50 text-sky-200 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(14,165,233,0.2)]"
            >
              <Compass className="w-3.5 h-3.5 text-sky-300" />
              <span>Explore Excursions via Concierge</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
