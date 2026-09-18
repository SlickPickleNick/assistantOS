'use client';

import React from 'react';
import { Sparkles, Clock, Calendar, ShieldAlert } from 'lucide-react';

const TREATMENTS = [
  {
    name: 'Ocean Mineral Massage',
    duration: '50 Minutes',
    price: '$175',
    description:
      'Therapeutic full-body stone massage utilizing warmed coastal smooth stones and marine sea-salt botanical oils to deeply soothe muscular tension.',
  },
  {
    name: 'Coastal Glow Facial',
    duration: '60 Minutes',
    price: '$195',
    description:
      'Intensive skin rejuvenation utilizing marine collagen, active botanical antioxidants, and gentle lymphatic contouring to restore a radiant coastal glow.',
  },
  {
    name: 'Couples Retreat Package',
    duration: '90 Minutes',
    price: '$420',
    description:
      'Dual side-by-side aromatherapy massages in our private VIP suite, accompanied by complimentary champagne service and reserved hydrotherapy thermal soak.',
  },
];

export default function GatorSpa() {
  return (
    <section id="spa" className="py-24 bg-white border-b border-[#e2e2e2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#916e27] font-semibold block">
            Section 5 &bull; Hydrotherapy &amp; Rejuvenation
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif-luxury font-normal text-[#1c1c1c] tracking-tight">
            Full-Service Luxury Spa &amp; Wellness
          </h2>
          <p className="text-sm text-[#646464] font-light leading-relaxed">
            Featuring 12 private treatment rooms, a tranquil relaxation solarium, and an invigorating Thermal Suite equipped with cedarwood sauna, eucalyptus steam, and hydrotherapy whirlpool.
          </p>
        </div>

        {/* Operating Hours & Advisory */}
        <div className="bg-[#faf8f5] border border-[#e8ded0] p-6 mb-12 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <Clock className="w-5 h-5 text-[#916e27] shrink-0" />
            <div>
              <span className="text-xs uppercase tracking-wider text-[#888] font-semibold block">
                Standard Spa Hours
              </span>
              <span className="text-sm font-bold text-[#1c1c1c]">
                8:00 AM – 8:00 PM Daily
              </span>
            </div>
          </div>

          <div className="text-xs text-blue-900 bg-blue-50 border border-blue-200 px-4 py-2.5">
            <strong>Operational Advisory:</strong> This Sunday, the spa opens at <strong>10:00 AM</strong> due to scheduled maintenance.
          </div>
        </div>

        {/* Signature Treatments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
          {TREATMENTS.map((t) => (
            <div
              key={t.name}
              className="bg-[#fafafa] border border-[#e5e5e5] p-8 flex flex-col justify-between hover:shadow-lg transition-shadow group"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#eee] mb-4">
                  <span className="text-xs uppercase tracking-wider text-[#916e27] font-semibold">
                    {t.duration}
                  </span>
                  <span className="text-xl font-bold font-serif text-[#1c1c1c]">
                    {t.price}
                  </span>
                </div>

                <h3 className="text-xl font-serif-luxury font-bold text-[#1c1c1c] group-hover:text-[#916e27] transition-colors">
                  {t.name}
                </h3>

                <p className="text-xs text-[#555] leading-relaxed font-light mt-3">
                  {t.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#eee]">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-[#1c1c1c] block">
                  Includes Thermal Suite Access
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Thermal Suite & Policies Callout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-[#444] bg-[#f8f8f8] border border-[#e5e5e5] p-6 lg:p-8">
          <div>
            <strong className="text-[#1c1c1c] text-sm block mb-1">
              Thermal Suite Hydrotherapy Access:
            </strong>
            <p className="leading-relaxed">
              Full access to cedarwood sauna, herbal steam room, and hydrotherapy whirlpool is <strong>complimentary with any booked spa treatment</strong>, or available via a Day Pass for <strong>$45</strong>.
            </p>
          </div>

          <div>
            <strong className="text-[#1c1c1c] text-sm block mb-1">
              Booking &amp; Cancellation Policies:
            </strong>
            <p className="leading-relaxed">
              We recommend booking appointments <strong>48+ hours in advance</strong> for weekend slots. Strictly <strong>24-hour advance cancellation notice</strong> is required; otherwise, a 50% charge applies.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
