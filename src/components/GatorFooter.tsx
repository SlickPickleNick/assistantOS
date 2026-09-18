'use client';

import React from 'react';
import { Phone, MapPin, Mail, ShieldAlert, HeartHandshake } from 'lucide-react';

const DIRECTORY = [
  { dept: 'Front Desk', ext: '0', role: '24/7 Guest Services' },
  { dept: 'Concierge', ext: '20', role: 'Activities & Excursions' },
  { dept: 'Housekeeping', ext: '30', role: 'Room Cleaning & Supplies' },
  { dept: 'Engineering', ext: '40', role: 'Facility Maintenance' },
  { dept: 'Room Service', ext: '55', role: 'In-Room Dining' },
  { dept: 'Spa & Wellness', ext: '60', role: 'Spa Treatments & Thermal Suite' },
  { dept: 'Banquets & Events', ext: '70', role: 'Meetings & Celebrations' },
  { dept: 'Reservations', ext: '80', role: 'Booking & Room Management' },
  { dept: 'Resort Security', ext: '90', role: '24/7 Emergency & Lost Property' },
];

export default function GatorFooter() {
  return (
    <footer className="bg-[#141822] text-[#9ba3af] text-xs pt-16 pb-12 border-t border-[#232938]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Top Resort Identity & Slogan */}
        <div className="flex flex-col md:flex-row items-center justify-between pb-12 border-b border-[#232938] gap-6 text-center md:text-left">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-white/10 p-2 rounded-sm flex items-center justify-center">
              <img
                src="/images/gator_logo.png"
                alt="Go Gator Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="font-serif text-2xl font-bold tracking-[0.12em] text-white">
                GO GATOR RESORT &amp; SPA
              </div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-[#c5a869] font-medium mt-0.5">
                Gateway to Relaxation &bull; Where Every Stay Feels Like Paradise
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 text-xs">
            <span className="flex items-center space-x-1.5 text-slate-300">
              <MapPin className="w-4 h-4 text-[#c5a869]" />
              <span>4200 Ocean Vista Drive, Gainesville, FL 32606</span>
            </span>
            <span className="hidden sm:inline text-slate-600">&bull;</span>
            <span className="flex items-center space-x-1.5 text-slate-300">
              <Phone className="w-4 h-4 text-[#c5a869]" />
              <span>+1 (555) 200-1234</span>
            </span>
          </div>
        </div>

        {/* In-Room Telephone Directory Grid (Section 15) */}
        <div>
          <div className="flex items-center space-x-2 text-[#c5a869] font-semibold uppercase tracking-wider text-xs mb-6">
            <Phone className="w-4 h-4" />
            <span>Internal Telephone Directory &bull; Section 15 (Dial From In-Room Phone)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {DIRECTORY.map((item) => (
              <div
                key={item.ext}
                className="bg-[#1a202e] border border-[#2b3345] p-3.5 space-y-1 rounded-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white text-xs">{item.dept}</span>
                  <span className="px-2 py-0.5 bg-[#c5a869] text-[#141822] text-[10.5px] font-bold rounded">
                    Ext {item.ext}
                  </span>
                </div>
                <div className="text-[11px] text-[#8e98a8]">{item.role}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Resort Policies Summary (Section 8) */}
        <div className="bg-[#1a202e] border border-[#2b3345] p-6 lg:p-8 space-y-4 rounded-sm">
          <div className="flex items-center space-x-2 text-[#c5a869] font-semibold uppercase tracking-wider text-xs">
            <ShieldAlert className="w-4 h-4" />
            <span>Resort Policies &amp; Terms &bull; Section 8</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-[11.5px] text-[#a1abbb] pt-1">
            <div>
              <strong className="text-white block mb-1">Check-in &amp; Check-out:</strong>
              <p className="leading-relaxed">
                Check-in: 4:00 PM | Check-out: 11:00 AM. Guaranteed early 10:00 AM check-in or late 2:00 PM check-out can be booked in advance for $50. Photo ID &amp; credit card required with $150/night incidental hold.
              </p>
            </div>
            <div>
              <strong className="text-white block mb-1">Cancellation Rules:</strong>
              <p className="leading-relaxed">
                Standard rooms: Free cancellation up to 5 days prior to arrival; inside 5 days forfeits 1 night. Suites &amp; Villas: Free up to 14 days; inside 14 days forfeits 50% of stay. No-shows charged in full.
              </p>
            </div>
            <div>
              <strong className="text-white block mb-1">Pet Policy:</strong>
              <p className="leading-relaxed">
                Permitted exclusively in Garden View category (limited inventory). $75 nonrefundable pet fee per stay; 2 pets max with 50 lb combined weight limit. Service animals fully exempt.
              </p>
            </div>
            <div>
              <strong className="text-white block mb-1">Smoke-Free Property:</strong>
              <p className="leading-relaxed">
                100% smoke-free indoors including private balconies. Designated smoking areas located near parking structure. A $250 deep-cleaning fee is assessed for violations.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Links & Admin */}
        <div className="flex flex-wrap items-center justify-between pt-4 text-xs gap-4">
          <div className="flex items-center space-x-6 text-[11px] uppercase tracking-wider">
            <a href="#accommodations" className="hover:text-white transition-colors">
              Accommodations
            </a>
            <a href="#dining" className="hover:text-white transition-colors">
              Dining &amp; Bars
            </a>
            <a href="#amenities" className="hover:text-white transition-colors">
              Pools &amp; Beach
            </a>
            <a href="#spa" className="hover:text-white transition-colors">
              Spa &amp; Wellness
            </a>
            <a href="#loyalty" className="hover:text-white transition-colors">
              Gator Rewards
            </a>
            <a href="#property-map" className="hover:text-white transition-colors">
              Property Map
            </a>
          </div>

          <div>
            <a
              href="/admin"
              className="px-3.5 py-1.5 bg-[#2b3345] hover:bg-[#c5a869] hover:text-[#141822] text-[#c5a869] text-xs font-semibold uppercase tracking-wider transition-colors rounded"
            >
              Admin Operations Portal &rarr;
            </a>
          </div>
        </div>

        {/* Official Academic Disclaimer */}
        <div className="pt-6 border-t border-[#232938] text-center text-[11px] text-[#6b7280] space-y-1">
          <p className="italic">
            *Fictional property for chatbot training purposes. All names, rates, and policies are illustrative.
          </p>
          <p>
            &copy; 2026 Go Gator Resort &amp; Spa. All rights reserved. Built with the AssistantOS Framework.
          </p>
        </div>
      </div>
    </footer>
  );
}
