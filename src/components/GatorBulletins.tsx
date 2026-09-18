'use client';

import React from 'react';
import { AlertTriangle, Clock, Waves, Utensils, Award } from 'lucide-react';

const BULLETINS = [
  {
    icon: Clock,
    title: 'Airport Shuttle Advance Notice',
    badge: 'Operational Update',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    description:
      'Due to temporary staffing limitations, airport shuttle reservations currently require 24-hour advance booking via Front Desk (Ext 0).',
  },
  {
    icon: AlertTriangle,
    title: 'Sunday Spa Maintenance',
    badge: 'Facility Advisory',
    badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
    description:
      'On Sunday, the spa will open at 10:00 AM (instead of standard 8:00 AM) due to scheduled thermal suite maintenance.',
  },
  {
    icon: Waves,
    title: 'Family Pool Early Closure',
    badge: 'Private Function',
    badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
    description:
      'The Family Pool will close at 6:00 PM today for a private event. Guests are invited to enjoy the Beachfront and Lazy River.',
  },
  {
    icon: Utensils,
    title: 'The Waterfront Restaurant Hours',
    badge: 'Dining Update',
    badgeColor: 'bg-orange-100 text-orange-900 border-orange-300',
    description:
      'The Waterfront will close at 8:00 PM tonight for a private banquet. Guests are encouraged to reserve at The Gator Grill or Go Gator Buffet.',
  },
  {
    icon: Award,
    title: 'Platinum Gators Cabana Perk',
    badge: 'Loyalty Promotion',
    badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    description:
      'Platinum Gators loyalty members receive complimentary luxury cabana rental on weekdays during the current promotional period (reserve with Concierge).',
  },
];

export default function GatorBulletins() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-4">
      <div className="bg-[#fcfbf9] border border-[#e8dfcf] p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-[#ebdcc4] gap-2">
          <div>
            <span className="text-[10px] uppercase tracking-[2px] text-[#916e27] font-bold block">
              Live Resort Operational Notices &bull; Section 17
            </span>
            <h2 className="text-xl sm:text-2xl font-serif-luxury font-bold text-[#1c1c1c]">
              Daily Resort Bulletins &amp; Active Guest Advisories
            </h2>
          </div>
          <span className="text-xs text-[#777] italic">
            Official operational updates from Go Gator Resort Management
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {BULLETINS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-[#ece4d6] p-4 flex flex-col justify-between space-y-3 hover:shadow-md transition-shadow"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[9px] uppercase tracking-wider px-2 py-0.5 border font-semibold ${item.badgeColor}`}
                    >
                      {item.badge}
                    </span>
                    <Icon className="w-4 h-4 text-[#916e27]" />
                  </div>
                  <h3 className="text-sm font-semibold text-[#1c1c1c] font-serif">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#555] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
