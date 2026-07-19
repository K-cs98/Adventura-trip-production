'use client';
import type { Tour, CurrencyCode } from '@/types';
import { formatPrice } from '@/lib/currency';

export default function TourCard({
  tour,
  currency,
  rates,
  isWishlisted,
  onToggleWishlist,
  onBook
}: {
  tour: Tour;
  currency: CurrencyCode;
  rates: Record<CurrencyCode, number>;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
  onBook: () => void;
}) {
  return (
    <div className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative h-52 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={tour.img}
          alt={tour.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 bg-slate-900/80 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
          {tour.tag}
        </span>
        <button
          onClick={onToggleWishlist}
          aria-label="Toggle wishlist"
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-lg ${
            isWishlisted ? 'bg-[#1E88E5] text-white' : 'bg-white/90 text-slate-500'
          }`}
        >
          {isWishlisted ? '♥' : '♡'}
        </button>
      </div>

      <div className="p-5">
        <p className="text-xs font-semibold text-slate-400">{tour.location} · {tour.duration}</p>
        <h3 className="mt-1 font-bold text-slate-900 leading-snug">{tour.title}</h3>

        <ul className="mt-3 space-y-1">
          {tour.highlights.slice(0, 2).map((h) => (
            <li key={h} className="text-xs text-slate-500 flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-[#26A69A]" /> {h}
            </li>
          ))}
        </ul>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider">From</p>
            <p className="font-bold text-lg text-slate-900">{formatPrice(tour.price_usd, currency, rates)}</p>
          </div>
          <button
            onClick={onBook}
            className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
          >
            Reserve
          </button>
        </div>
        {tour.slots <= 3 && (
          <p className="mt-2 text-[11px] font-semibold text-orange-500">Only {tour.slots} spots left</p>
        )}
      </div>
    </div>
  );
}
