'use client';

import React, { useState } from 'react';
import { Users, Maximize, Bed, PawPrint, ShieldAlert } from 'lucide-react';

interface Accommodation {
  id: string;
  name: string;
  roomNumbers: string;
  sqFt: number;
  maxOccupancy: string;
  bedConfig: string;
  lowRate: number;
  highRate: number;
  petFriendly: boolean;
  image: string;
  description: string;
  category: 'rooms' | 'suites' | 'villas';
}

const ACCOMMODATIONS: Accommodation[] = [
  {
    id: 'garden-view',
    name: 'Garden View Room',
    roomNumbers: 'Rooms 101–120',
    sqFt: 350,
    maxOccupancy: '2 adults + 1 child',
    bedConfig: '1 King or 2 Queens',
    lowRate: 189,
    highRate: 259,
    petFriendly: true,
    image: '/images/guest_room.jpeg',
    description:
      'Surrounded by lush native tropical landscaping. Only room category offering pet-friendly accommodations (limited inventory, $75 pet fee, 2 pets max, 50 lb combined limit).',
    category: 'rooms',
  },
  {
    id: 'resort-view',
    name: 'Resort View Room',
    roomNumbers: 'Rooms 121–140',
    sqFt: 375,
    maxOccupancy: '2 adults + 2 children',
    bedConfig: '1 King or 2 Queens',
    lowRate: 229,
    highRate: 299,
    petFriendly: false,
    image:
      'https://cache.marriott.com/is/image/marriotts7prod/rz-wuhrz-arrival-lobby-13660?wid=900&fit=constrain',
    description:
      'Overlooking central resort courtyards, decorative swimming pools, and illuminated evening garden fountains with private balcony.',
    category: 'rooms',
  },
  {
    id: 'ocean-view',
    name: 'Ocean View Room',
    roomNumbers: 'Rooms 141–160',
    sqFt: 400,
    maxOccupancy: '2 adults + 2 children',
    bedConfig: '1 King or 2 Queens',
    lowRate: 289,
    highRate: 379,
    petFriendly: false,
    image:
      'https://cache.marriott.com/is/image/marriotts7prod/rz-nbomr-one-bedroom-suite-26682?wid=900&fit=constrain',
    description:
      'Elevated views across coastal palm canopies out toward open ocean horizons, featuring private balconies with sun loungers.',
    category: 'rooms',
  },
  {
    id: 'ocean-front',
    name: 'Ocean Front Room',
    roomNumbers: 'Rooms 201–220',
    sqFt: 425,
    maxOccupancy: '2 adults + 2 children',
    bedConfig: '1 King',
    lowRate: 349,
    highRate: 449,
    petFriendly: false,
    image:
      'https://cache.marriott.com/is/image/marriotts7prod/rz-pvrcc-villa-pool-terrace-detail-25019?wid=900&fit=constrain',
    description:
      'Prime beachfront orientation offering direct, unobstructed panoramic ocean views and immediate steps to the 800 ft private white-sand beach.',
    category: 'rooms',
  },
  {
    id: 'junior-suite',
    name: 'Junior Suite',
    roomNumbers: 'Rooms 221–240',
    sqFt: 550,
    maxOccupancy: '4 adults',
    bedConfig: '1 King + Sofa Bed',
    lowRate: 429,
    highRate: 549,
    petFriendly: false,
    image:
      'https://cache.marriott.com/is/image/marriotts7prod/rz-dalrz-rc-suite-65910?wid=900&fit=constrain',
    description:
      'Spacious open-concept suite with integrated living parlor, premium pull-out sofa bed accommodating up to 4 adults, marble bath and deep soaking tub.',
    category: 'suites',
  },
  {
    id: 'executive-suite',
    name: 'Executive Suite',
    roomNumbers: 'Rooms 241–260',
    sqFt: 750,
    maxOccupancy: '4 adults',
    bedConfig: '1 King + Dedicated Living Area',
    lowRate: 599,
    highRate: 749,
    petFriendly: false,
    image:
      'https://cache.marriott.com/is/image/marriotts7prod/rz-gvarz-rc-geneva-social-41527-58200?wid=900&fit=constrain',
    description:
      'Distinguished residence with completely separate master bedroom, executive living salon, dining table, wet bar, and wraparound terrace.',
    category: 'suites',
  },
  {
    id: 'two-bedroom-villa',
    name: 'Two-Bedroom Villa',
    roomNumbers: 'Rooms 261–280 (Villas 301–306)',
    sqFt: 1400,
    maxOccupancy: '6 adults',
    bedConfig: '2 King + Equipped Kitchenette',
    lowRate: 899,
    highRate: 1199,
    petFriendly: false,
    image:
      'https://cache.marriott.com/is/image/marriotts7prod/plsrt-the-residences-28636?wid=900&fit=constrain',
    description:
      'Our most prestigious private estate retreat. Features 2 king master bedrooms, 2 full en-suite bathrooms, equipped kitchenette, and expansive private lanai grounds.',
    category: 'villas',
  },
];

export default function GatorAccommodations() {
  const [filter, setFilter] = useState<'all' | 'rooms' | 'suites' | 'villas' | 'pet'>('all');

  const filtered = ACCOMMODATIONS.filter((item) => {
    if (filter === 'all') return true;
    if (filter === 'pet') return item.petFriendly;
    return item.category === filter;
  });

  return (
    <section id="accommodations" className="py-24 bg-[#f9f9f9] border-b border-[#e2e2e2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#916e27] font-semibold block">
            Section 2 &bull; 306 Total Accommodations
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif-luxury font-normal text-[#1c1c1c] tracking-tight">
            Room Types &amp; Seasonal Rates
          </h2>
          <p className="text-xs sm:text-sm text-[#646464] font-light leading-relaxed">
            Per night, double occupancy base rate. High Season: <strong>August 1st to May 30th</strong> &bull; Low Season: <strong>June 1st to July 31st</strong>.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 text-xs uppercase tracking-[1.5px] border transition-all ${
              filter === 'all'
                ? 'bg-[#1c1c1c] text-white border-[#1c1c1c]'
                : 'bg-white text-[#555] border-[#ddd] hover:border-black'
            }`}
          >
            All 7 Accommodations
          </button>
          <button
            onClick={() => setFilter('rooms')}
            className={`px-4 py-2 text-xs uppercase tracking-[1.5px] border transition-all ${
              filter === 'rooms'
                ? 'bg-[#1c1c1c] text-white border-[#1c1c1c]'
                : 'bg-white text-[#555] border-[#ddd] hover:border-black'
            }`}
          >
            Guest Rooms (101–220)
          </button>
          <button
            onClick={() => setFilter('suites')}
            className={`px-4 py-2 text-xs uppercase tracking-[1.5px] border transition-all ${
              filter === 'suites'
                ? 'bg-[#1c1c1c] text-white border-[#1c1c1c]'
                : 'bg-white text-[#555] border-[#ddd] hover:border-black'
            }`}
          >
            Suites (221–260)
          </button>
          <button
            onClick={() => setFilter('villas')}
            className={`px-4 py-2 text-xs uppercase tracking-[1.5px] border transition-all ${
              filter === 'villas'
                ? 'bg-[#1c1c1c] text-white border-[#1c1c1c]'
                : 'bg-white text-[#555] border-[#ddd] hover:border-black'
            }`}
          >
            Villas (261–306)
          </button>
          <button
            onClick={() => setFilter('pet')}
            className={`px-4 py-2 text-xs uppercase tracking-[1.5px] border transition-all flex items-center space-x-1.5 ${
              filter === 'pet'
                ? 'bg-[#916e27] text-white border-[#916e27]'
                : 'bg-white text-[#916e27] border-[#c5a869] hover:bg-[#faf6ee]'
            }`}
          >
            <PawPrint className="w-3.5 h-3.5" />
            <span>Pet-Friendly (Garden View)</span>
          </button>
        </div>

        {/* Accommodation Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((room) => (
            <div
              key={room.id}
              className="bg-white border border-[#e5e5e5] overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all duration-300 group"
            >
              {/* Image with Tag */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-200">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold text-[#1c1c1c]">
                  {room.roomNumbers}
                </span>
                {room.petFriendly && (
                  <span className="absolute top-3 right-3 bg-[#916e27] text-white px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold flex items-center space-x-1 shadow">
                    <PawPrint className="w-3 h-3" />
                    <span>Pet-Friendly</span>
                  </span>
                )}
              </div>

              {/* Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-serif-luxury font-bold text-[#1c1c1c] group-hover:text-[#916e27] transition-colors">
                    {room.name}
                  </h3>

                  {/* Room Specs */}
                  <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-[#555] my-3 pt-2 border-t border-[#f0f0f0]">
                    <span className="flex items-center space-x-1">
                      <Maximize className="w-3.5 h-3.5 text-[#916e27]" />
                      <span>{room.sqFt} sq ft</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Users className="w-3.5 h-3.5 text-[#916e27]" />
                      <span>{room.maxOccupancy}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Bed className="w-3.5 h-3.5 text-[#916e27]" />
                      <span>{room.bedConfig}</span>
                    </span>
                  </div>

                  <p className="text-xs text-[#666] leading-relaxed font-light">
                    {room.description}
                  </p>
                </div>

                {/* Rates Display */}
                <div className="pt-4 border-t border-[#f0f0f0] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#888] block">
                      Low Season &bull; High Season
                    </span>
                    <div className="flex items-baseline space-x-1">
                      <span className="text-lg font-bold text-[#1c1c1c]">
                        ${room.lowRate}
                      </span>
                      <span className="text-xs text-[#888]">/</span>
                      <span className="text-lg font-bold text-[#916e27]">
                        ${room.highRate}
                      </span>
                      <span className="text-[10px] text-[#777]">night</span>
                    </div>
                  </div>

                  <a
                    href="#reservation"
                    className="px-4 py-2 bg-[#1c1c1c] hover:bg-[#916e27] text-white text-[11px] uppercase tracking-[1.5px] font-semibold transition-colors"
                  >
                    Select
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Policies Callout */}
        <div className="mt-14 bg-white border border-[#e2e2e2] p-6 lg:p-8 text-xs text-[#555] space-y-3">
          <div className="flex items-center space-x-2 text-[#916e27] font-semibold uppercase tracking-wider text-[11px]">
            <ShieldAlert className="w-4 h-4" />
            <span>Official Billing, Occupancy &amp; Cancellation Terms (Sections 2 &amp; 8)</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div>
              <strong className="text-[#1c1c1c] block mb-1">Additional Person Charges:</strong>
              <p>
                Adults (age 13+): $45/night &bull; Children (3–12): $25/night &bull; Children under 3: Stay &amp; eat <strong>FREE</strong>.
              </p>
            </div>
            <div>
              <strong className="text-[#1c1c1c] block mb-1">Mandatory Fees &amp; Taxes:</strong>
              <p>
                Resort Fee: $35/night (covers Wi-Fi, beach chairs/umbrellas, fitness center, kids club, golf shuttle). Combined State/Local Tax: 12% applied at checkout.
              </p>
            </div>
            <div>
              <strong className="text-[#1c1c1c] block mb-1">Cancellation Windows:</strong>
              <p>
                Standard Rooms: Free cancellation up to 5 days before arrival (inside 5 days: 1 night charge). Suites &amp; Villas: Free up to 14 days (inside 14 days: 50% charged).
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
