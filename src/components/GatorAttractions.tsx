'use client';

import React from 'react';
import { MapPin, Clock, Compass } from 'lucide-react';

const ATTRACTIONS = [
  {
    name: 'Downtown Gainesville',
    distance: '15 min drive',
    visitTime: '2–4 hours',
    description: 'Vibrant city center offering artisanal dining, boutique shopping, craft breweries, and lively evening entertainment.',
  },
  {
    name: 'University of Florida (UF)',
    distance: '15 min drive',
    visitTime: '2–4 hours',
    description: 'Iconic historic campus featuring Century Tower, Ben Hill Griffin Stadium ("The Swamp"), and university art museums.',
  },
  {
    name: 'Florida Museum of Natural History',
    distance: '20 min drive',
    visitTime: '2–3 hours',
    description: 'Premier family-friendly cultural museum highlighting prehistoric fossils, indigenous artifacts, and Florida wildlife exhibits.',
  },
  {
    name: 'Butterfly Rainforest',
    distance: '20 min drive',
    visitTime: '1–2 hours',
    description: 'Screened 6,400 sq ft living tropical rainforest exhibit filled with hundreds of vibrant free-flying butterflies and exotic birds.',
  },
  {
    name: 'Kanapaha Botanical Gardens',
    distance: '20 min drive',
    visitTime: '1–2 hours',
    description: '68 lush botanical acres boasting the state’s largest public bamboo garden and majestic giant Victoria water lilies.',
  },
  {
    name: "Devil's Millhopper Geological State Park",
    distance: '25 min drive',
    visitTime: '1–2 hours',
    description: 'National Natural Landmark featuring a spectacular 120-foot deep limestone sinkhole sheltering a lush miniature rainforest.',
  },
  {
    name: 'Paynes Prairie Preserve State Park',
    distance: '25 min drive',
    visitTime: '1–3 hours',
    description: '21,000-acre wild savanna preserve where wild horses, Florida bison, and hundreds of alligator species roam freely.',
  },
  {
    name: 'Historic Downtown / Cultural District',
    distance: '15–20 min drive',
    visitTime: '2–4 hours',
    description: 'Charming historic brick district known for cultural art walks, independent galleries, antique markets, and seasonal dining.',
  },
];

export default function GatorAttractions() {
  return (
    <section id="attractions" className="py-24 bg-white border-b border-[#e2e2e2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2 text-[#916e27]">
            <Compass className="w-4 h-4" />
            <span className="text-xs uppercase tracking-[0.25em] font-semibold">
              Section 16 &bull; Destination Guide
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif-luxury font-normal text-[#1c1c1c] tracking-tight">
            Local Attractions &amp; Area Information
          </h2>
          <p className="text-sm text-[#646464] font-light leading-relaxed">
            Conveniently situated in Northwest Gainesville, Go Gator Resort &amp; Spa offers easy driving access to Florida’s most celebrated natural reserves, museums, and the historic University of Florida campus.
          </p>
        </div>

        {/* 8 Attractions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ATTRACTIONS.map((attraction) => (
            <div
              key={attraction.name}
              className="bg-[#fcfbf9] border border-[#e8dfcf] p-6 flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] text-[#916e27] font-semibold mb-2">
                  <span className="flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{attraction.distance}</span>
                  </span>
                  <span className="flex items-center space-x-1 text-[#666]">
                    <Clock className="w-3 h-3" />
                    <span>{attraction.visitTime}</span>
                  </span>
                </div>

                <h3 className="text-base font-serif font-bold text-[#1c1c1c]">
                  {attraction.name}
                </h3>

                <p className="text-xs text-[#555] font-light leading-relaxed mt-2">
                  {attraction.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#ebdcc4] text-[11px] font-semibold text-[#916e27]">
                Concierge Can Arrange Transfer
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
