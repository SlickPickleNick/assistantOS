'use client';

import React from 'react';
import { ArrowRight, MapPin, Sparkles } from 'lucide-react';

interface GatorHeroProps {
  onExploreClick?: () => void;
  onOpenMap?: () => void;
}

export default function GatorHero({ onExploreClick, onOpenMap }: GatorHeroProps) {
  return (
    <section className="relative h-[85vh] min-h-[580px] max-h-[820px] w-full flex items-center justify-center overflow-hidden bg-[#0d1322]">
      {/* Real Resort Exterior Photo from Page 1 of Professor's Specification */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-1000"
        style={{
          backgroundImage: `url('/images/resort_exterior.png')`,
        }}
      >
        {/* Subtle Dark Luxury Overlay for High Contrast Text */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/50" />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center text-white space-y-6">
        <div className="inline-flex items-center space-x-2 bg-black/40 backdrop-blur-md px-4 py-1.5 border border-[#c5a869]/40 text-[#c5a869]">
          <Sparkles className="w-3.5 h-3.5" />
          <span className="text-[10.5px] sm:text-xs uppercase tracking-[0.3em] font-semibold">
            4.5-Star All-Inclusive Resort &bull; Northwest Gainesville, Florida
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif-luxury font-normal tracking-tight leading-[1.1] text-white">
          Where Every Stay Feels Like Paradise
        </h1>

        <p className="text-base sm:text-xl text-[#f3e5ab] font-serif italic tracking-wide">
          &ldquo;Gateway to Relaxation&rdquo;
        </p>

        <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base font-light text-[#ececec] tracking-wide leading-relaxed">
          306 Total Accommodations (including 24 luxury suites &amp; 6 private villas) featuring 800 ft of private beachfront, 3 outdoor pools, 5 distinct dining venues, 3 bars, and a full-service spa.
        </p>

        <div className="flex items-center justify-center space-x-2 text-[11px] text-[#ddd] font-light">
          <MapPin className="w-3.5 h-3.5 text-[#c5a869]" />
          <span>4200 Ocean Vista Drive &bull; 15 minutes from Gainesville International Airport (GNV)</span>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onExploreClick}
            className="px-8 py-3.5 bg-white text-[#1c1c1c] hover:bg-[#916e27] hover:text-white transition-all text-xs uppercase tracking-[0.25em] font-semibold shadow-xl flex items-center space-x-2"
          >
            <span>Explore Accommodations</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onOpenMap}
            className="px-8 py-3.5 border border-white/80 text-white hover:bg-white/15 transition-all text-xs uppercase tracking-[0.25em] font-semibold"
          >
            Resort Property Map
          </button>
        </div>
      </div>
    </section>
  );
}
