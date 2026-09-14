'use client';

import React from 'react';
import { Utensils, Clock, Sparkles, Wine } from 'lucide-react';

interface HotelDiningProps {
  onAskConcierge: (query: string) => void;
}

const VENUES = [
  {
    title: 'The Horizon Terrace',
    category: 'Breakfast & Coastal Tasting Menu',
    hours: '6:30 AM – 11:00 AM | 5:30 PM – 10:00 PM',
    description:
      'Artisanal breakfast buffet and evening farm-to-table coastal cuisine overlooking panoramic ocean horizons.',
    image:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    dressCode: 'Resort Chic',
  },
  {
    title: 'Celadon Oyster & Raw Bar',
    category: 'Fresh Pacific Seafood & Signature Cocktails',
    hours: '4:00 PM – 11:30 PM Daily',
    description:
      'Chilled seafood towers, hand-shucked coastal oysters, and craft botanical cocktails crafted by master mixologists.',
    image:
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    dressCode: 'Smart Casual',
  },
  {
    title: 'The Vault Reserve',
    category: 'Private Sommelier Cellar & Charcuterie',
    hours: 'Open by Reservation (6:00 PM – Midnight)',
    description:
      'An intimate subterranean wine sanctuary housing over 3,000 vintage labels curated across global wine regions.',
    image:
      'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80',
    dressCode: 'Evening Elegant',
  },
];

export default function HotelDining({ onAskConcierge }: HotelDiningProps) {
  return (
    <section id="dining" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-950/60 border-y border-amber-400/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-amber-300 font-semibold">
            Gastronomic Excellence
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Culinary Experiences
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            From sunrise seaside breakfasts to private sommelier tastings, our culinary team honors the freshest seasonal harvest.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {VENUES.map((venue, idx) => (
            <div
              key={idx}
              className="rounded-2xl glass-panel overflow-hidden flex flex-col group hover:border-amber-400/50 transition-all duration-300"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={venue.image}
                  alt={venue.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-[10px] tracking-wider uppercase text-amber-300 font-semibold">
                    {venue.category}
                  </span>
                  <h3 className="text-xl font-serif font-bold text-white">{venue.title}</h3>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <p className="text-slate-400 text-xs leading-relaxed">{venue.description}</p>

                  <div className="space-y-1.5 pt-2 border-t border-slate-800 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                      <span>{venue.hours}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wine className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                      <span>Dress Code: {venue.dressCode}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onAskConcierge(`What are the reservation policies and menus for ${venue.title}?`)}
                  className="w-full py-2.5 rounded-xl btn-outline-gold text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Reserve via AI Concierge</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
