'use client';

import React, { useState } from 'react';
import { Map, Maximize2, X, Compass, CheckCircle2 } from 'lucide-react';

interface GatorMapViewerProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function GatorMapViewer({ isOpen, onClose }: GatorMapViewerProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const isVisible = isOpen !== undefined ? isOpen : modalOpen;
  const handleClose = onClose || (() => setModalOpen(false));

  return (
    <section id="property-map" className="py-24 bg-white border-b border-[#e2e2e2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 text-[#916e27]">
            <Compass className="w-4 h-4" />
            <span className="text-xs uppercase tracking-[0.25em] font-semibold">
              Page 2 &bull; Official Floor Plan
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif-luxury font-normal text-[#1c1c1c] tracking-tight">
            Resort Property Map &amp; Floor Plan
          </h2>
          <p className="text-sm text-[#646464] font-light leading-relaxed">
            Main Level Architectural Layout: 306 Total Rooms, 24 Suites, 6 Villas, 800 ft Private Beachfront, Pools, Dining Pavilions, and Event Spaces.
          </p>
        </div>

        {/* Interactive Map Card */}
        <div className="bg-[#fbfbfb] border border-[#e2e2e2] overflow-hidden shadow-sm">
          <div className="relative group cursor-pointer" onClick={() => setModalOpen(true)}>
            <div className="aspect-[16/10] max-h-[640px] w-full overflow-hidden bg-slate-900 flex items-center justify-center">
              <img
                src="/images/resort_map.jpeg"
                alt="Go Gator Resort Property Map & Floor Plan"
                className="w-full h-full object-contain group-hover:scale-102 transition-transform duration-500"
              />
            </div>

            {/* Hover Expand Overlay */}
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="bg-white text-[#1c1c1c] px-6 py-3 text-xs uppercase tracking-[2px] font-bold shadow-2xl flex items-center space-x-2">
                <Maximize2 className="w-4 h-4 text-[#916e27]" />
                <span>Click to Expand High-Resolution Map</span>
              </span>
            </div>
          </div>

          {/* Room Wings Key Guide from Page 2 */}
          <div className="p-6 sm:p-8 bg-[#fdfdfd] border-t border-[#e8e8e8]">
            <h3 className="text-xs uppercase tracking-[2px] font-bold text-[#916e27] mb-4">
              Resort Room Categories &amp; Wing Key
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-[#333]">
              <div className="space-y-1">
                <strong className="block text-[#1c1c1c]">101–120:</strong>
                <span>Garden View Rooms (West Wing)</span>
              </div>
              <div className="space-y-1">
                <strong className="block text-[#1c1c1c]">121–140:</strong>
                <span>Resort View Rooms (Courtyards)</span>
              </div>
              <div className="space-y-1">
                <strong className="block text-[#1c1c1c]">141–160:</strong>
                <span>Ocean View Rooms (Upper West)</span>
              </div>
              <div className="space-y-1">
                <strong className="block text-[#1c1c1c]">201–220:</strong>
                <span>Ocean Front Rooms (East Beach)</span>
              </div>
              <div className="space-y-1">
                <strong className="block text-[#1c1c1c]">221–240:</strong>
                <span>Junior Suites (Upper East)</span>
              </div>
              <div className="space-y-1">
                <strong className="block text-[#1c1c1c]">241–260:</strong>
                <span>Executive Suites (East Corner)</span>
              </div>
              <div className="space-y-1">
                <strong className="block text-[#1c1c1c]">261–280:</strong>
                <span>Two-Bedroom Villas (South-East)</span>
              </div>
              <div className="space-y-1">
                <strong className="block text-[#1c1c1c]">281–306:</strong>
                <span>Villa Suites &amp; Private Villas (301–306)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Fullscreen Modal */}
      {isVisible && (
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col p-4 sm:p-8 animate-fadeIn">
          <div className="flex items-center justify-between pb-4 border-b border-white/20 text-white">
            <div className="flex items-center space-x-2">
              <Map className="w-5 h-5 text-[#c5a869]" />
              <span className="font-serif text-lg font-bold">
                Go Gator Resort &amp; Spa — High-Resolution Property Map
              </span>
            </div>
            <button
              onClick={handleClose}
              className="p-2 text-white/80 hover:text-white bg-white/10 rounded-full hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-auto flex items-center justify-center p-2">
            <img
              src="/images/resort_map.jpeg"
              alt="Go Gator Resort Property Map High-Res"
              className="max-h-[85vh] max-w-full object-contain shadow-2xl"
            />
          </div>
        </div>
      )}
    </section>
  );
}
