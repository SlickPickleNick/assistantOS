'use client';

import React from 'react';
import { Utensils, Clock, Sparkles, AlertCircle } from 'lucide-react';

interface DiningVenue {
  name: string;
  type: string;
  hours: string;
  dressCode: string;
  reservations: string;
  allInclusive: string;
  image: string;
  bulletin?: string;
  description: string;
}

const VENUES: DiningVenue[] = [
  {
    name: 'Go Gator Buffet',
    type: 'International buffet',
    hours: '6:30–11 AM, 12–3 PM, 6–10 PM',
    dressCode: 'Smart casual',
    reservations: 'Not required',
    allInclusive: '100% Included (Unlimited)',
    image: '/images/gator_buffet.jpeg',
    description:
      'Grand international buffet featuring live action cooking stations, fresh Florida produce, carved meats, and made-to-order specialties.',
  },
  {
    name: 'The Waterfront',
    type: 'Seafood, à la carte',
    hours: '5:30–10 PM',
    dressCode: 'Casual',
    reservations: 'Recommended',
    allInclusive: '1 specialty dinner per adult included ($45 adult / $20 child extra)',
    image:
      'https://cache.marriott.com/is/image/marriotts7prod/rz-pvrcc-villa-pool-terrace-detail-25019?wid=900&fit=constrain',
    bulletin: 'Operational Notice: Closing early at 8:00 PM tonight for a private event.',
    description:
      'Oceanfront coastal seafood dining offering wild-caught fresh fish, chilled shellfish platters, and panoramic sunset views.',
  },
  {
    name: 'The Gator Grill',
    type: 'Steakhouse',
    hours: '5:30–10 PM',
    dressCode: 'Smart casual',
    reservations: 'Recommended',
    allInclusive: '100% Included on All-Inclusive Plan',
    image:
      'https://cache.marriott.com/is/image/marriotts7prod/rz-dalrz-rc-suite-65910?wid=900&fit=constrain',
    description:
      'Signature cuts of dry-aged beef, prime chops, grilled poultry, and local Florida specialties in an upscale lodge setting.',
  },
  {
    name: 'Tiki Bar',
    type: 'Asian drinks & exotic cocktails',
    hours: '5:30–10 PM',
    dressCode: 'Smart casual',
    reservations: 'Recommended',
    allInclusive: 'House brands included',
    image:
      'https://cache.marriott.com/is/image/marriotts7prod/rz-gvarz-rc-geneva-social-41527-58200?wid=900&fit=constrain',
    description:
      'Torchlit tropical garden bar specializing in Polynesian tiki mixology, artisanal Asian cocktails, sake, and evening appetizers.',
  },
  {
    name: 'Lagoon Lounge',
    type: 'Cocktails & light bites',
    hours: '11 AM–1 AM',
    dressCode: 'Casual',
    reservations: 'Not required',
    allInclusive: 'House brands included',
    image:
      'https://cache.marriott.com/is/image/marriotts7prod/rz-hnlkz-off-the-lip-40057?wid=900&fit=constrain',
    description:
      'Sophisticated lobby and lagoon-view cocktail parlor serving draft beers, fine wines, small plates, and hosting nightly live acoustic music.',
  },
  {
    name: 'Swamp View',
    type: 'Poolside drinks & refreshments',
    hours: '10 AM–6 PM',
    dressCode: 'Swimwear OK',
    reservations: 'Required (Check in at towel station)',
    allInclusive: 'House brands included',
    image:
      'https://cache.marriott.com/is/image/marriotts7prod/rz-sttrz-great-bay-aerial-30039-86427?wid=900&fit=constrain',
    description:
      'Casual poolside bar serving frozen drinks, local craft beers, chilled juices, and light snacks directly to your pool lounger.',
  },
];

export default function GatorDining() {
  return (
    <section id="dining" className="py-24 bg-white border-b border-[#e2e2e2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#916e27] font-semibold block">
            Section 4 &bull; Culinary Venues &amp; Lounges
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif-luxury font-normal text-[#1c1c1c] tracking-tight">
            5 Dining Venues &amp; 3 Signature Bars
          </h2>
          <p className="text-sm text-[#646464] font-light leading-relaxed">
            All registered guests enjoy the Go Gator All-Inclusive Plan, featuring global flavors, prime steakhouse cuts, and refreshing bars across the resort.
          </p>
        </div>

        {/* Venues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {VENUES.map((venue) => (
            <div
              key={venue.name}
              className="bg-[#fafafa] border border-[#e5e5e5] overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all group"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-200">
                <img
                  src={venue.image}
                  alt={venue.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold text-[#1c1c1c]">
                  {venue.type}
                </span>
                {venue.bulletin && (
                  <span className="absolute bottom-3 left-3 right-3 bg-red-800 text-white px-2.5 py-1 text-[10.5px] font-medium text-center shadow">
                    {venue.bulletin}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-2xl font-serif-luxury font-bold text-[#1c1c1c] group-hover:text-[#916e27] transition-colors">
                    {venue.name}
                  </h3>

                  <div className="space-y-1.5 text-xs text-[#555] my-3 pt-2 border-t border-[#eee]">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-3.5 h-3.5 text-[#916e27] shrink-0" />
                      <span><strong>Hours:</strong> {venue.hours}</span>
                    </div>
                    <div>
                      <span><strong>Dress Code:</strong> {venue.dressCode} &bull; <strong>Reservations:</strong> {venue.reservations}</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#666] leading-relaxed font-light">
                    {venue.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#eee]">
                  <span className="text-[11px] font-semibold text-[#916e27] block">
                    All-Inclusive Plan: {venue.allInclusive}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* All-Inclusive Details & Dietary Callout from Document */}
        <div className="mt-14 bg-[#fbf9f5] border border-[#e8dfcf] p-6 lg:p-8 space-y-4">
          <div className="flex items-center space-x-2 text-[#916e27] font-semibold uppercase tracking-wider text-xs">
            <Sparkles className="w-4 h-4" />
            <span>Official All-Inclusive Plan Rules &amp; Dietary Guidelines (Section 4)</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-[#444] pt-2">
            <div>
              <strong className="text-[#1c1c1c] block mb-1">Included in All-Inclusive Plan:</strong>
              <p className="leading-relaxed">
                Unlimited dining at <strong>Go Gator Buffet</strong>, dinner at <strong>The Gator Grill</strong>, all bars (house brands), and <strong>one (1) specialty dinner reservation per stay per adult</strong> at The Waterfront. Additional specialty dinners are billed at $45/adult, $20/child.
              </p>
            </div>
            <div>
              <strong className="text-[#1c1c1c] block mb-1">Dietary Accommodations:</strong>
              <p className="leading-relaxed">
                Gluten-free, vegan, kosher-style, and allergy-conscious menus available at all venues with <strong>24-hour advance notice</strong> required for strict kosher and halal culinary requests.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
