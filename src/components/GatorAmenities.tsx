'use client';

import React from 'react';
import {
  Waves,
  Sun,
  Dumbbell,
  Wifi,
  Car,
  Printer,
  Shirt,
  Bus,
  ShieldAlert,
} from 'lucide-react';

export default function GatorAmenities() {
  return (
    <section id="amenities" className="py-24 bg-[#f8f8f8] border-b border-[#e2e2e2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#916e27] font-semibold block">
            Sections 3 &amp; 7 &bull; Resort Facilities
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif-luxury font-normal text-[#1c1c1c] tracking-tight">
            Amenities, Pools &amp; Transportation
          </h2>
          <p className="text-sm text-[#646464] font-light leading-relaxed">
            From 800 ft of private white-sand beach to three specialized swimming pools and seamless airport transfers, every amenity is crafted for effortless relaxation.
          </p>
        </div>

        {/* 3 Pools Showcase */}
        <div className="mb-14">
          <h3 className="text-xl sm:text-2xl font-serif-luxury font-bold text-[#1c1c1c] mb-6 flex items-center space-x-2">
            <Waves className="w-5 h-5 text-[#916e27]" />
            <span>3 Outdoor Swimming Pools</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Family Pool */}
            <div className="bg-white border border-[#e2e2e2] p-6 space-y-3">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#916e27] block">
                All Ages Welcome
              </span>
              <h4 className="text-lg font-bold text-[#1c1c1c] font-serif">
                Family Pool
              </h4>
              <p className="text-xs text-[#555] leading-relaxed">
                Open <strong>7:00 AM – 10:00 PM</strong>. Interactive resort swimming pool featuring zero-entry shallow zone, poolside deck games, and family loungers.
              </p>
              <div className="pt-2 text-[10.5px] font-semibold text-purple-900 bg-purple-50 p-2 border border-purple-200">
                Notice: Closing early at 6:00 PM today for a private event.
              </div>
            </div>

            {/* Serenity Adults-Only Pool */}
            <div className="bg-white border border-[#e2e2e2] p-6 space-y-3">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#916e27] block">
                Strictly 18+ Only
              </span>
              <h4 className="text-lg font-bold text-[#1c1c1c] font-serif">
                Serenity Adults-Only Pool
              </h4>
              <p className="text-xs text-[#555] leading-relaxed">
                Open <strong>8:00 AM – 7:00 PM</strong>. Quiet relaxation pool sanctuary with plush cushioned loungers, chilled towel service, and dedicated cocktail stewards.
              </p>
            </div>

            {/* Lazy River */}
            <div className="bg-white border border-[#e2e2e2] p-6 space-y-3">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#916e27] block">
                Continuous Tube Float
              </span>
              <h4 className="text-lg font-bold text-[#1c1c1c] font-serif">
                Meandering Lazy River
              </h4>
              <p className="text-xs text-[#555] leading-relaxed">
                Open <strong>9:00 AM – 6:00 PM</strong>. Continuous gentle current tube course looping through tropical foliage, palm groves, and stone waterfalls.
              </p>
            </div>
          </div>
        </div>

        {/* Facilities & Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Beach & Cabanas */}
          <div className="bg-white border border-[#e2e2e2] p-6 space-y-3">
            <div className="w-9 h-9 bg-[#faf6ee] flex items-center justify-center text-[#916e27]">
              <Sun className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-[#1c1c1c] font-serif">
              Beachfront &amp; Cabana Rentals
            </h4>
            <p className="text-xs text-[#555] leading-relaxed">
              800 ft private white-sand beach with complimentary chaise loungers and umbrellas. Luxury cabanas available for <strong>$75/day</strong> (reservable via app or Concierge). <em>Complimentary on weekdays for Platinum Gators members.</em>
            </p>
          </div>

          {/* Fitness Center */}
          <div className="bg-white border border-[#e2e2e2] p-6 space-y-3">
            <div className="w-9 h-9 bg-[#faf6ee] flex items-center justify-center text-[#916e27]">
              <Dumbbell className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-[#1c1c1c] font-serif">
              24/7 Fitness Center
            </h4>
            <p className="text-xs text-[#555] leading-relaxed">
              24/7 secure access with room keycard. Complete cardio suite, free weights, and stretching zone. Certified personal training sessions available at <strong>$60/hr</strong> (book via spa desk).
            </p>
          </div>

          {/* Wi-Fi Connectivity */}
          <div className="bg-white border border-[#e2e2e2] p-6 space-y-3">
            <div className="w-9 h-9 bg-[#faf6ee] flex items-center justify-center text-[#916e27]">
              <Wifi className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-[#1c1c1c] font-serif">
              Wi-Fi Resort-Wide
            </h4>
            <p className="text-xs text-[#555] leading-relaxed">
              Complimentary standard high-speed Wi-Fi available across all guest rooms, public lobbies, and pool decks. Premium ultra-speed Wi-Fi available for <strong>$12.95/day</strong>.
            </p>
          </div>

          {/* Parking & EV Charging */}
          <div className="bg-white border border-[#e2e2e2] p-6 space-y-3">
            <div className="w-9 h-9 bg-[#faf6ee] flex items-center justify-center text-[#916e27]">
              <Car className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-[#1c1c1c] font-serif">
              Parking &amp; EV Stations
            </h4>
            <p className="text-xs text-[#555] leading-relaxed">
              Self-parking: <strong>$25/day</strong> &bull; Valet parking: <strong>$40/day</strong>. 4 dedicated electric vehicle (EV) charging stations available (first-come, first-served basis).
            </p>
          </div>

          {/* Business Center & Laundry */}
          <div className="bg-white border border-[#e2e2e2] p-6 space-y-3">
            <div className="w-9 h-9 bg-[#faf6ee] flex items-center justify-center text-[#916e27]">
              <Printer className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-[#1c1c1c] font-serif">
              Business Center &amp; Laundry
            </h4>
            <p className="text-xs text-[#555] leading-relaxed">
              Business Center off main lobby open 6:00 AM – 11:00 PM (printing $0.25/page). Same-day valet laundry (drop off by 9 AM) and self-service guest laundromat located on Level 2.
            </p>
          </div>

          {/* Airport & Shuttles */}
          <div className="bg-white border border-[#e2e2e2] p-6 space-y-3">
            <div className="w-9 h-9 bg-[#faf6ee] flex items-center justify-center text-[#916e27]">
              <Bus className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-[#1c1c1c] font-serif">
              Airport &amp; Golf Shuttles
            </h4>
            <p className="text-xs text-[#555] leading-relaxed">
              Complimentary scheduled airport shuttle every 2 hours, 6:00 AM – 10:00 PM (currently requires 24-hr advance booking). Hourly golf shuttle (6:30 AM – 6 PM) included in resort fee. Private on-demand car: $65 one-way.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
