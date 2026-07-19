'use client';
import { useState } from 'react';
import type { FlightRecord, Hotel, CurrencyCode } from '@/types';
import { formatPrice } from '@/lib/currency';

export default function FlightsAndHotels({
  flights,
  hotels,
  currency,
  rates
}: {
  flights: FlightRecord[];
  hotels: Hotel[];
  currency: CurrencyCode;
  rates: Record<CurrencyCode, number>;
}) {
  const [query, setQuery] = useState('');

  const filteredFlights = flights.filter((f) =>
    (f.route + f.carrier).toLowerCase().includes(query.toLowerCase())
  );
  const filteredHotels = hotels.filter((h) =>
    (h.property + h.location).toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <p className="text-[#26A69A] font-bold tracking-[0.2em] text-xs uppercase mb-3">Flights &amp; Stays</p>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Add-ons for your trip</h2>
        <p className="mt-3 text-sm text-slate-500">
          Our travel desk manages this inventory directly — search below, then reach out via the chat widget to add one to your booking.
        </p>
      </div>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search route or property…"
        className="w-full max-w-md mx-auto block border border-slate-200 rounded-xl px-4 py-2.5 text-sm mb-10 focus:outline-none focus:ring-2 focus:ring-[#1E88E5]"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h3 className="font-bold text-slate-900 mb-4">Flights</h3>
          <div className="space-y-3">
            {filteredFlights.length === 0 && <p className="text-sm text-slate-400">No flights match.</p>}
            {filteredFlights.map((f) => {
              const price = f.base_cost_usd * (1 + f.markup_percent / 100);
              return (
                <div key={f.id} className="flex items-center justify-between border border-slate-100 rounded-xl p-4">
                  <div>
                    <p className="font-semibold text-sm text-slate-900">{f.route}</p>
                    <p className="text-xs text-slate-400">{f.carrier}</p>
                  </div>
                  <p className="font-bold text-slate-900">{formatPrice(price, currency, rates)}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="font-bold text-slate-900 mb-4">Hotels</h3>
          <div className="space-y-3">
            {filteredHotels.length === 0 && <p className="text-sm text-slate-400">No hotels match.</p>}
            {filteredHotels.map((h) => {
              const price = h.base_cost_usd * (1 + h.markup_percent / 100);
              return (
                <div key={h.id} className="flex items-center justify-between border border-slate-100 rounded-xl p-4">
                  <div>
                    <p className="font-semibold text-sm text-slate-900">{h.property}</p>
                    <p className="text-xs text-slate-400">{h.location}</p>
                  </div>
                  <p className="font-bold text-slate-900">{formatPrice(price, currency, rates)}<span className="text-xs font-normal text-slate-400">/night</span></p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
