'use client';

import React from 'react';
import {
  Waves,
  Utensils,
  Sparkles,
  MapPin,
  Clock,
  Phone,
  Mail,
  ShieldCheck,
  CheckCircle2,
  Maximize2,
} from 'lucide-react';

interface GatorPropertyOverviewProps {
  onOpenMap?: () => void;
}

export default function GatorPropertyOverview({ onOpenMap }: GatorPropertyOverviewProps) {
  return (
    <section className="py-20 bg-white border-b border-[#e2e2e2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#916e27] font-semibold block">
            Section 1 &bull; Exclusive Resort Destination
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif-luxury font-normal text-[#1c1c1c] tracking-tight">
            Go Gator Resort &amp; Spa
          </h2>
          <p className="text-sm sm:text-base text-[#646464] font-light leading-relaxed">
            Our sole premier destination: a 4.5-star all-inclusive coastal sanctuary situated along private beachfront waters in Northwest Gainesville, Florida.
          </p>
        </div>

        {/* The Single Property Showcase Card */}
        <div className="bg-[#fbfbfb] border border-[#e5e5e5] overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Image Side */}
            <div className="lg:col-span-6 relative min-h-[360px] lg:min-h-full overflow-hidden bg-slate-900">
              <img
                src="/images/resort_exterior.png"
                alt="Go Gator Resort & Spa Dusk View"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3.5 py-1.5 text-[11px] uppercase tracking-[1.5px] font-bold text-[#1c1c1c] shadow">
                4.5-Star All-Inclusive Resort
              </div>
              <button
                onClick={onOpenMap}
                className="absolute bottom-4 right-4 bg-black/80 hover:bg-[#916e27] text-white px-3.5 py-1.5 text-xs flex items-center space-x-1.5 shadow transition-colors"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>View Floor Plan Map</span>
              </button>
            </div>

            {/* Information Side */}
            <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between space-y-8">
              <div>
                <div className="flex items-center space-x-2 text-[11px] text-[#916e27] uppercase tracking-[2px] font-semibold mb-2">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Northwest Gainesville &bull; 15 min from GNV Airport</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif-luxury font-normal text-[#1c1c1c]">
                  Property Overview &amp; Key Specifications
                </h3>

                <p className="text-xs sm:text-sm text-[#646464] font-light mt-3 leading-relaxed">
                  Go Gator Resort &amp; Spa offers 306 total luxury accommodations, including 24 suites and 6 standalone private villas. Registered guests enjoy all-inclusive dining privileges across 5 distinct culinary venues and 3 bars.
                </p>

                {/* Core Highlights List from Document */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 text-xs text-[#2d2d2d]">
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#916e27] shrink-0 mt-0.5" />
                    <span>800 ft of private beachfront</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#916e27] shrink-0 mt-0.5" />
                    <span>3 outdoor pools (Adult, Family, Lazy River)</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#916e27] shrink-0 mt-0.5" />
                    <span>5 dining venues + 3 bars</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#916e27] shrink-0 mt-0.5" />
                    <span>Full-service spa (12 treatment rooms)</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#916e27] shrink-0 mt-0.5" />
                    <span>18-hole championship golf shuttle</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#916e27] shrink-0 mt-0.5" />
                    <span>15,000 sq ft conference &amp; event space</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#916e27] shrink-0 mt-0.5" />
                    <span>Kids Club (4–12) &amp; Teen Lounge (13–17)</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#916e27] shrink-0 mt-0.5" />
                    <span>24/7 Front Desk Operations (Ext 0)</span>
                  </div>
                </div>
              </div>

              {/* Fast Facts Grid */}
              <div className="pt-6 border-t border-[#eaeaea] grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#888] block">Check-in</span>
                  <span className="font-semibold text-[#1c1c1c]">4:00 PM</span>
                  <span className="text-[10px] text-[#916e27] block">(10 AM for $50)</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#888] block">Check-out</span>
                  <span className="font-semibold text-[#1c1c1c]">11:00 AM</span>
                  <span className="text-[10px] text-[#916e27] block">(2 PM for $50)</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#888] block">Front Desk</span>
                  <span className="font-semibold text-[#1c1c1c]">24/7 (Ext 0)</span>
                  <span className="text-[10px] text-[#888] block">+1 (555) 200-1234</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
