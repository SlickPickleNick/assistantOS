'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Shield, MapPin, Phone, Mail } from 'lucide-react';

export default function HotelFooter() {
  return (
    <footer className="border-t border-amber-400/20 bg-slate-950/80 pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {/* Col 1 */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border border-amber-400/40 flex items-center justify-center bg-amber-400/10">
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
            <span className="font-serif font-bold text-sm tracking-wider gold-gradient-text uppercase">
              The Grand Azure
            </span>
          </div>
          <p className="leading-relaxed">
            A coastal five-star sanctuary honoring hospitality, culinary distinction, and personalized AI concierge services.
          </p>
        </div>

        {/* Col 2 */}
        <div className="space-y-3">
          <h4 className="font-serif font-bold text-slate-200 tracking-wider uppercase text-xs">
            Location & Contact
          </h4>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
              <span>100 Ocean Promenade, Azure Cove, CA 90265</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-300 shrink-0" />
              <span>+1 (800) 555-AZURE</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-300 shrink-0" />
              <span>concierge@grandazure.demo</span>
            </li>
          </ul>
        </div>

        {/* Col 3 */}
        <div className="space-y-3">
          <h4 className="font-serif font-bold text-slate-200 tracking-wider uppercase text-xs">
            Resort Hours & Policies
          </h4>
          <ul className="space-y-1.5 leading-relaxed">
            <li>Check-in: 3:00 PM | Check-out: 11:00 AM</li>
            <li>Concierge Desk: 24/7 (In-Person & AI)</li>
            <li>Infinity Pool: 6:00 AM – 10:00 PM</li>
            <li>Azure Thalasso Spa: 9:00 AM – 8:00 PM</li>
            <li>Complimentary Valet & EV Charging</li>
          </ul>
        </div>

        {/* Col 4 */}
        <div className="space-y-3">
          <h4 className="font-serif font-bold text-slate-200 tracking-wider uppercase text-xs">
            Administration
          </h4>
          <p className="leading-relaxed">
            Authorized hotel administrators and capstone group team members can access the operational configuration desk.
          </p>
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-400/40 text-amber-300 hover:bg-amber-400/10 transition-colors font-semibold"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Staff Admin Portal</span>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
        <div>© {new Date().getFullYear()} The Grand Azure Resort & Spa. Capstone Demonstration Project.</div>
        <div className="flex items-center gap-4">
          <span>Grounding Guardrails Active</span>
          <span>•</span>
          <span>Closed-Loop Curation Active</span>
        </div>
      </div>
    </footer>
  );
}
