'use client';

import React, { useState } from 'react';
import { Calendar, Users, ChevronDown, Check, X, ShieldCheck, Clock } from 'lucide-react';

interface GatorReservationProps {
  onSearch?: (criteria: any) => void;
}

export default function GatorReservation({ onSearch }: GatorReservationProps) {
  const [dates, setDates] = useState('Oct 15 – Oct 19, 2026 (High Season)');
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rateType, setRateType] = useState('Standard All-Inclusive Rate');

  const [isGuestPickerOpen, setIsGuestPickerOpen] = useState(false);
  const [isRatePickerOpen, setIsRatePickerOpen] = useState(false);

  const RATE_OPTIONS = [
    'Standard All-Inclusive Rate',
    'Gator Rewards Member Rate (Palm/Coral/Gators/Platinum)',
    'AAA / CAA Discount Rate',
    'Senior Discount (Age 62+)',
    'Redeem Points (20,000 pts = 1 Free Standard Night)',
  ];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSearch?.({
      destination: 'Go Gator Resort & Spa (Gainesville, FL)',
      dates,
      rooms,
      adults,
      children,
      rateType,
    });
  }

  return (
    <section id="reservation" className="relative z-30 -mt-10 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="bg-white shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-[#e2e2e2] p-4 lg:p-6">
        {/* Reservation Sub-bar Info */}
        <div className="flex flex-wrap items-center justify-between pb-3 mb-4 border-b border-[#f0f0f0] text-[11px] text-[#646464] gap-2">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#916e27]" />
            <span className="font-medium text-[#1c1c1c]">Single Resort Booking Desk:</span>
            <span>Go Gator Resort &amp; Spa (Northwest Gainesville, FL)</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5 text-[#916e27]" />
              <span>Check-in: <strong>4:00 PM</strong> | Check-out: <strong>11:00 AM</strong></span>
            </span>
            <span className="hidden sm:inline text-[#ccc]">|</span>
            <span className="text-[#916e27] font-medium hidden sm:inline">
              High Season: Aug 1 – May 30 &bull; Low Season: Jun 1 – Jul 31
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
          {/* Dates & Seasonality */}
          <div className="border border-[#dcdcdc] p-3 hover:border-[#1c1c1c] transition-colors relative">
            <label className="block text-[10px] uppercase tracking-[1.5px] font-semibold text-[#646464] mb-1">
              Stay Dates &amp; Season
            </label>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-[#916e27] shrink-0" />
              <input
                type="text"
                value={dates}
                onChange={(e) => setDates(e.target.value)}
                className="w-full text-xs sm:text-sm font-medium text-[#1c1c1c] focus:outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Rooms and Guests Popover */}
          <div className="border border-[#dcdcdc] p-3 hover:border-[#1c1c1c] transition-colors relative">
            <label className="block text-[10px] uppercase tracking-[1.5px] font-semibold text-[#646464] mb-1">
              Guests &amp; Accommodations
            </label>
            <button
              type="button"
              onClick={() => {
                setIsGuestPickerOpen(!isGuestPickerOpen);
                setIsRatePickerOpen(false);
              }}
              className="w-full flex items-center justify-between text-left focus:outline-none"
            >
              <div className="flex items-center space-x-2 truncate">
                <Users className="w-4 h-4 text-[#916e27] shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-[#1c1c1c] truncate">
                  {rooms} {rooms === 1 ? 'Room' : 'Rooms'}, {adults + children} {adults + children === 1 ? 'Guest' : 'Guests'}
                </span>
              </div>
              <ChevronDown className="w-4 h-4 text-[#777]" />
            </button>

            {/* Expandable Guest Picker Popover */}
            {isGuestPickerOpen && (
              <div className="absolute top-full left-0 right-0 sm:right-auto sm:w-84 bg-white border border-[#e2e2e2] shadow-2xl p-5 mt-2 z-50 animate-fadeIn">
                <div className="flex items-center justify-between pb-3 border-b border-[#f0f0f0]">
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#1c1c1c]">
                    Room &amp; Occupancy Rules
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsGuestPickerOpen(false)}
                    className="text-slate-400 hover:text-black"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="py-4 space-y-4 text-xs">
                  {/* Rooms */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-[#1c1c1c]">Rooms</div>
                      <div className="text-[10px] text-[#777]">Max 4 rooms per booking</div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        type="button"
                        onClick={() => setRooms(Math.max(1, rooms - 1))}
                        className="w-7 h-7 rounded border border-[#ccc] flex items-center justify-center font-bold hover:border-black"
                      >
                        -
                      </button>
                      <span className="w-4 text-center font-semibold">{rooms}</span>
                      <button
                        type="button"
                        onClick={() => setRooms(Math.min(4, rooms + 1))}
                        className="w-7 h-7 rounded border border-[#ccc] flex items-center justify-center font-bold hover:border-black"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Adults */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-[#1c1c1c]">Adults (Age 13+)</div>
                      <div className="text-[10px] text-[#777]">Extra adults: $45/night</div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        type="button"
                        onClick={() => setAdults(Math.max(1, adults - 1))}
                        className="w-7 h-7 rounded border border-[#ccc] flex items-center justify-center font-bold hover:border-black"
                      >
                        -
                      </button>
                      <span className="w-4 text-center font-semibold">{adults}</span>
                      <button
                        type="button"
                        onClick={() => setAdults(Math.min(6, adults + 1))}
                        className="w-7 h-7 rounded border border-[#ccc] flex items-center justify-center font-bold hover:border-black"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Children */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-[#1c1c1c]">Children (Age 3–12)</div>
                      <div className="text-[10px] text-[#777]">$25/night &bull; Under 3 Free</div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        type="button"
                        onClick={() => setChildren(Math.max(0, children - 1))}
                        className="w-7 h-7 rounded border border-[#ccc] flex items-center justify-center font-bold hover:border-black"
                      >
                        -
                      </button>
                      <span className="w-4 text-center font-semibold">{children}</span>
                      <button
                        type="button"
                        onClick={() => setChildren(Math.min(4, children + 1))}
                        className="w-7 h-7 rounded border border-[#ccc] flex items-center justify-center font-bold hover:border-black"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#f0f0f0] flex justify-end">
                  <button
                    type="button"
                    onClick={() => setIsGuestPickerOpen(false)}
                    className="px-5 py-2 bg-[#1c1c1c] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#916e27]"
                  >
                    Apply Occupancy
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Rate Program */}
          <div className="border border-[#dcdcdc] p-3 hover:border-[#1c1c1c] transition-colors relative">
            <label className="block text-[10px] uppercase tracking-[1.5px] font-semibold text-[#646464] mb-1">
              Rate Program / Loyalty
            </label>
            <button
              type="button"
              onClick={() => {
                setIsRatePickerOpen(!isRatePickerOpen);
                setIsGuestPickerOpen(false);
              }}
              className="w-full flex items-center justify-between text-left focus:outline-none"
            >
              <span className="text-xs sm:text-sm font-medium text-[#1c1c1c] truncate">
                {rateType}
              </span>
              <ChevronDown className="w-4 h-4 text-[#777] shrink-0" />
            </button>

            {/* Expandable Rate Picker Popover */}
            {isRatePickerOpen && (
              <div className="absolute top-full left-0 right-0 sm:w-80 bg-white border border-[#e2e2e2] shadow-2xl p-4 mt-2 z-50 animate-fadeIn">
                <div className="text-xs uppercase tracking-wider font-semibold text-[#1c1c1c] pb-2 border-b border-[#f0f0f0] mb-2">
                  Select Rate Option
                </div>
                <div className="space-y-1">
                  {RATE_OPTIONS.map((rate) => (
                    <button
                      key={rate}
                      type="button"
                      onClick={() => {
                        setRateType(rate);
                        setIsRatePickerOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between rounded hover:bg-[#f8f8f8] ${
                        rateType === rate ? 'font-semibold text-[#916e27] bg-[#faf6ee]' : 'text-[#2d2d2d]'
                      }`}
                    >
                      <span className="truncate pr-2">{rate}</span>
                      {rateType === rate && <Check className="w-3.5 h-3.5 text-[#916e27] shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full h-[52px] bg-[#1c1c1c] hover:bg-[#916e27] text-white font-medium text-xs sm:text-sm uppercase tracking-[2px] transition-all flex items-center justify-center shadow-md hover:shadow-lg"
            >
              <span>Check Rates</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
