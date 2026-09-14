'use client';

import React from 'react';
import { Sparkles, Users, Maximize, ArrowRight } from 'lucide-react';

interface HotelSuitesProps {
  onAskConcierge: (suiteName: string) => void;
}

const SUITES = [
  {
    id: 'azure-penthouse',
    title: 'The Azure Penthouse Suite',
    description:
      'Top-floor residence featuring 2,400 sq.ft of panoramic coastline vistas, private wrap-around terrace, and personal butler service.',
    price: '$1,850',
    guests: 'Up to 4 Guests',
    size: '2,400 sq.ft',
    image:
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    features: ['Oceanfront Spa Bath', 'Private Infinity Plunge Pool', 'Dedicated Wine Cellar'],
  },
  {
    id: 'cliffside-villa',
    title: 'Cliffside Oceanfront Villa',
    description:
      'Secluded coastal sanctuary nestled above the private cove with infinity plunge pool, open-air sun salon, and outdoor rain shower.',
    price: '$1,250',
    guests: 'Up to 3 Guests',
    size: '1,650 sq.ft',
    image:
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80',
    features: ['Private Plunge Pool', 'Sunset Daybed Deck', 'Complimentary In-Villa Breakfast'],
  },
  {
    id: 'heritage-suite',
    title: 'Heritage Palm Pavilion',
    description:
      'Refined suite surrounded by botanical palm gardens, Italian marble master bath, and custom handcrafted teak furnishings.',
    price: '$750',
    guests: 'Up to 2 Guests',
    size: '950 sq.ft',
    image:
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
    features: ['Botanical Garden Patio', 'Dyson Airwrap Styler', 'Artisan Espresso Bar'],
  },
];

export default function HotelSuites({ onAskConcierge }: HotelSuitesProps) {
  return (
    <section id="suites" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16 space-y-3">
        <span className="text-xs uppercase tracking-[0.25em] text-amber-300 font-semibold">
          Unrivaled Accommodations
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
          Suites & Oceanfront Villas
        </h2>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          Every sanctuary has been curated to merge timeless architectural grandeur with modern coastal luxury.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {SUITES.map((suite) => (
          <div
            key={suite.id}
            className="rounded-2xl glass-panel overflow-hidden flex flex-col group hover:border-amber-400/60 transition-all duration-300 hover:-translate-y-1.5"
          >
            {/* Image Banner */}
            <div className="relative h-64 overflow-hidden">
              <img
                src={suite.image}
                alt={suite.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full glass-panel text-xs font-serif font-bold text-amber-300 shadow">
                {suite.price} <span className="text-[10px] font-sans text-slate-300">/ night</span>
              </div>
            </div>

            {/* Suite Details */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-xl font-serif font-bold text-white group-hover:text-amber-300 transition-colors">
                  {suite.title}
                </h3>
                <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                  {suite.description}
                </p>

                {/* Specs */}
                <div className="flex items-center gap-4 text-xs text-slate-300 py-3 border-y border-slate-800/80 my-4">
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-amber-300" />
                    {suite.guests}
                  </span>
                  <span className="flex items-center gap-1">
                    <Maximize className="w-3.5 h-3.5 text-amber-300" />
                    {suite.size}
                  </span>
                </div>

                {/* Features */}
                <ul className="space-y-1.5">
                  {suite.features.map((feat, i) => (
                    <li key={i} className="text-[11px] text-slate-300 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Inquire Action */}
              <button
                onClick={() => onAskConcierge(`Tell me about availability and features for ${suite.title}`)}
                className="w-full py-2.5 rounded-xl btn-outline-gold text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 group-hover:bg-amber-400/20"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Inquire via AI Concierge</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
