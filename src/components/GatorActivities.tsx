'use client';

import React from 'react';
import { Gamepad2, Smile, Compass, Music, Flag, ShieldCheck } from 'lucide-react';

export default function GatorActivities() {
  return (
    <section id="activities" className="py-24 bg-[#fbfbfb] border-b border-[#e2e2e2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#916e27] font-semibold block">
            Section 6 &bull; Recreation &amp; Family
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif-luxury font-normal text-[#1c1c1c] tracking-tight">
            Activities, Youth Clubs &amp; Entertainment
          </h2>
          <p className="text-sm text-[#646464] font-light leading-relaxed">
            From supervised day camps and watersports on the private beach to nightly live music and partner championship golf, every moment is filled with discovery.
          </p>
        </div>

        {/* 4 Recreation Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Kids Club */}
          <div className="bg-white border border-[#e5e5e5] p-6 flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
            <div className="space-y-3">
              <div className="w-10 h-10 bg-[#faf6ee] text-[#916e27] flex items-center justify-center">
                <Smile className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase tracking-wider font-bold text-[#916e27] block">
                Ages 4–12 Years
              </span>
              <h3 className="text-xl font-serif font-bold text-[#1c1c1c]">
                Kids Club
              </h3>
              <p className="text-xs text-[#555] leading-relaxed">
                <strong>Day Camp (9 AM–5 PM):</strong> $0 Complimentary for all-inclusive guests, including supervised activities and kid-friendly lunch.
              </p>
              <p className="text-xs text-[#555] leading-relaxed">
                <strong>Evening Camp (6–10 PM):</strong> $25 / child, advance sign-up required.
              </p>
            </div>
          </div>

          {/* Teen Lounge */}
          <div className="bg-white border border-[#e5e5e5] p-6 flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
            <div className="space-y-3">
              <div className="w-10 h-10 bg-[#faf6ee] text-[#916e27] flex items-center justify-center">
                <Gamepad2 className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase tracking-wider font-bold text-[#916e27] block">
                Ages 13–17 Years
              </span>
              <h3 className="text-xl font-serif font-bold text-[#1c1c1c]">
                Teen Lounge
              </h3>
              <p className="text-xs text-[#555] leading-relaxed">
                Dedicated youth lounge featuring modern gaming consoles (PS5, Xbox Series X), billiards, movie nights, and beach volleyball tournaments. Self check-in with resort wristband.
              </p>
            </div>
          </div>

          {/* Watersports */}
          <div className="bg-white border border-[#e5e5e5] p-6 flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
            <div className="space-y-3">
              <div className="w-10 h-10 bg-[#faf6ee] text-[#916e27] flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase tracking-wider font-bold text-[#916e27] block">
                Beach &amp; Ocean
              </span>
              <h3 className="text-xl font-serif font-bold text-[#1c1c1c]">
                Watersports
              </h3>
              <p className="text-xs text-[#555] leading-relaxed">
                <strong>Complimentary:</strong> Sea kayaks, stand-up paddleboards, and snorkel gear.
              </p>
              <p className="text-xs text-[#555] leading-relaxed">
                <strong>Jet Ski Rentals:</strong> $90 / 30 minutes (operated by 3rd-party vendor, safety waiver required).
              </p>
            </div>
          </div>

          {/* Evening Entertainment & Golf */}
          <div className="bg-white border border-[#e5e5e5] p-6 flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
            <div className="space-y-3">
              <div className="w-10 h-10 bg-[#faf6ee] text-[#916e27] flex items-center justify-center">
                <Music className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase tracking-wider font-bold text-[#916e27] block">
                Nightly Programming
              </span>
              <h3 className="text-xl font-serif font-bold text-[#1c1c1c]">
                Live Music &amp; Golf
              </h3>
              <p className="text-xs text-[#555] leading-relaxed">
                Live music nightly at Lobby Lounge. Rotating weekly theme nights (Luau, Casino Night) posted at Concierge and on in-room TV Channel 4.
              </p>
              <p className="text-xs text-[#555] leading-relaxed">
                <strong>18-Hole Golf:</strong> Partner course with hourly shuttle (6:30 AM–6 PM) included in resort fee.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
