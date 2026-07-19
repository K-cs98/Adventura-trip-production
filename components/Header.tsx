'use client';
import type { CurrencyCode } from '@/types';

export default function Header({
  currency,
  setCurrency,
  wishlistCount,
  onCartClick
}: {
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  wishlistCount: number;
  onCartClick: () => void;
}) {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="/" className="font-bold text-lg tracking-tight text-slate-900">
          Adventura <span className="text-[#1E88E5]">Trips</span>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="/#tours" className="hover:text-[#1E88E5] transition-colors">Expeditions</a>
          <a href="/#curator" className="hover:text-[#1E88E5] transition-colors">Bespoke Curator</a>
          <a href="/blog" className="hover:text-[#1E88E5] transition-colors">Journal</a>
          <a href="/#reviews" className="hover:text-[#1E88E5] transition-colors">Reviews</a>
        </nav>

        <div className="flex items-center gap-3">
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
            className="text-xs font-bold border border-slate-200 rounded-lg px-2 py-1.5 bg-white focus:outline-none"
            aria-label="Currency"
          >
            <option value="USD">USD</option>
            <option value="NGN">NGN</option>
            <option value="GHS">GHS</option>
            <option value="XOF">XOF</option>
          </select>

          <button
            onClick={onCartClick}
            className="relative text-xs font-bold uppercase tracking-wider border border-slate-200 rounded-lg px-3 py-1.5 hover:bg-slate-50 transition-colors"
          >
            Wishlist
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#1E88E5] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
