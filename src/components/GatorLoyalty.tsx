'use client';

import React from 'react';
import { Award, Check, Sparkles, Mail } from 'lucide-react';

const TIERS = [
  {
    name: 'Palm Tier',
    nights: '0–9 Nights / Year',
    tagline: 'Entry-Level Hospitality',
    benefits: [
      'Earn 10 points per $1 spent on room, dining & spa',
      'Exclusive member-only discount room rates',
      'Complimentary welcome arrival drink',
      'Instant digital folio access & mobile keys',
    ],
  },
  {
    name: 'Coral Tier',
    nights: '10–19 Nights / Year',
    tagline: 'Elevated Coastal Privileges',
    benefits: [
      'All Palm benefits included',
      'Room upgrade upon check-in (subject to availability)',
      'Guaranteed 2:00 PM late check-out',
      '10% dining discount across all resort venues',
    ],
  },
  {
    name: 'Gators Tier',
    nights: '20–39 Nights / Year',
    tagline: 'VIP Elite Member Status',
    benefits: [
      'All Coral benefits included',
      'Guaranteed room category upgrade at booking',
      'Guaranteed 2:00 PM late check-out',
      'Exclusive VIP Club Lounge access with evening cocktails',
      '15% dining discount',
      'Room service delivery fee ($6) & 18% service charge 100% WAIVED',
    ],
  },
  {
    name: 'Platinum Gators',
    nights: '40+ Nights / Year',
    tagline: 'Our Highest Circle of Luxury',
    featured: true,
    benefits: [
      'All Gators tier benefits included',
      'Suite upgrade priority guarantee (up to Executive Suite)',
      'Guaranteed 4:00 PM late check-out',
      '20% dining & spa discount resort-wide',
      'Dedicated 24/7 VIP Concierge private telephone line',
      'Complimentary luxury cabana rental on weekdays (active promo)',
    ],
  },
];

export default function GatorLoyalty() {
  return (
    <section id="loyalty" className="py-24 bg-[#f8f8f8] border-b border-[#e2e2e2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2 text-[#916e27]">
            <Award className="w-4 h-4" />
            <span className="text-xs uppercase tracking-[0.25em] font-semibold">
              Section 9 &bull; Loyalty Program
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif-luxury font-normal text-[#1c1c1c] tracking-tight">
            Gator Rewards
          </h2>
          <p className="text-sm text-[#646464] font-light leading-relaxed">
            Enrollment is free and instant at booking, front desk, or via our digital portal. Earn 10 points per $1 on room rate, dining, and spa treatments. <strong>20,000 points = 1 Free Night</strong> (standard room, non-peak dates).
          </p>
        </div>

        {/* Tier Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`bg-white border p-6 sm:p-7 flex flex-col justify-between transition-all ${
                tier.featured
                  ? 'border-[#916e27] shadow-lg ring-1 ring-[#916e27]/20 relative'
                  : 'border-[#e5e5e5] hover:shadow-md'
              }`}
            >
              {tier.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#916e27] text-white text-[10px] uppercase tracking-wider font-bold px-3 py-0.5">
                  Top Tier
                </span>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-serif font-bold text-[#1c1c1c]">
                    {tier.name}
                  </h3>
                  <div className="text-xs font-semibold text-[#916e27] mt-0.5">
                    {tier.nights}
                  </div>
                  <div className="text-[11px] text-[#777] italic mt-1">
                    {tier.tagline}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#f0f0f0] space-y-2.5">
                  {tier.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs text-[#444]">
                      <Check className="w-3.5 h-3.5 text-[#916e27] shrink-0 mt-0.5" />
                      <span className="leading-snug">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#f0f0f0]">
                <button className="w-full py-2 bg-[#1c1c1c] hover:bg-[#916e27] text-white text-[11px] uppercase tracking-wider font-semibold transition-colors">
                  Join Free
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Loyalty Fine Print & Status Match Callout from Syllabus */}
        <div className="mt-12 bg-white border border-[#e2e2e2] p-6 lg:p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#555]">
          <div className="space-y-1">
            <strong className="text-[#1c1c1c] block text-sm">
              Status Match Program &amp; Points Policy:
            </strong>
            <p className="leading-relaxed">
              Guests with elite status at partner hospitality brands can request a direct status match by emailing credentials to{' '}
              <a href="mailto:loyalty@gogator.example" className="text-[#916e27] font-semibold underline">
                loyalty@gogator.example
              </a>. Points expire after 24 months of account inactivity.
            </p>
          </div>

          <a
            href="mailto:loyalty@gogator.example"
            className="shrink-0 inline-flex items-center space-x-2 px-6 py-3 border border-[#1c1c1c] hover:bg-[#1c1c1c] hover:text-white text-xs uppercase tracking-wider font-semibold transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Request Status Match</span>
          </a>
        </div>
      </div>
    </section>
  );
}
