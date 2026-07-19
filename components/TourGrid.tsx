'use client';
import type { Tour, CurrencyCode } from '@/types';
import TourCard from './TourCard';

export default function TourGrid({
  tours,
  currency,
  rates,
  wishlist,
  onToggleWishlist,
  onBook
}: {
  tours: Tour[];
  currency: CurrencyCode;
  rates: Record<CurrencyCode, number>;
  wishlist: Set<string>;
  onToggleWishlist: (id: string) => void;
  onBook: (tour: Tour) => void;
}) {
  return (
    <section id="tours" className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <p className="text-[#26A69A] font-bold tracking-[0.2em] text-xs uppercase mb-3">Featured Expeditions</p>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Curated journeys, ready to book</h2>
      </div>

      {tours.length === 0 ? (
        <p className="text-center text-slate-400 text-sm">
          No tours published yet — add some from the admin dashboard.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.map((tour) => (
            <TourCard
              key={tour.id}
              tour={tour}
              currency={currency}
              rates={rates}
              isWishlisted={wishlist.has(tour.id)}
              onToggleWishlist={() => onToggleWishlist(tour.id)}
              onBook={() => onBook(tour)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
