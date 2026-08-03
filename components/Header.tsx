'use client';
import type { CurrencyCode } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* FAR LEFT: Logo & Brand Name */}
        <Link href="/" className="flex items-center gap-3 group focus:outline-none">
          <div className="relative w-10 h-10 overflow-hidden rounded-xl shadow-xs bg-[#1E88E5] flex items-center justify-center transition-transform group-hover:scale-105">
            <Image 
              src="/logo.png" 
              alt="Adventura Trips Logo" 
              fill
              sizes="(max-width: 768px) 40px, 40px"
              className="object-cover p-0.5"
            />
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-900 group-hover:text-[#1E88E5] transition-colors">
            Adventura <span className="text-[#1E88E5]">Trips</span>
          </span>
        </Link>

        {/* CENTER: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="/#tours" className="hover:text-[#1E88E5] transition-colors">Expeditions</a>
          <a href="/#curator" className="hover:text-[#1E88E5] transition-colors">Bespoke Curator</a>
          <a href="/blog" className="hover:text-[#1E88E5] transition-colors">Journal</a>
          <a href="/#reviews" className="hover:text-[#1E88E5] transition-colors">Reviews</a>
        </nav>

        {/* FAR RIGHT: Currency Selector, Wishlist, & Admin Dashboard */}
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

          <Link 
            href="/admin" 
            className="hidden lg:inline-flex text-xs font-semibold uppercase tracking-wider text-slate-700 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            Admin
          </Link>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 px-6 pt-2 pb-6 space-y-3 shadow-lg">
          <a href="/#tours" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-medium text-slate-700">Expeditions</a>
          <a href="/#curator" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-medium text-slate-700">Bespoke Curator</a>
          <a href="/blog" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-medium text-slate-700">Journal</a>
          <a href="/#reviews" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-medium text-slate-700">Reviews</a>
          <div className="pt-2 border-t border-slate-100">
            <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="block text-center text-xs font-semibold uppercase tracking-wider text-white bg-[#1E88E5] py-2.5 rounded-lg">
              Admin Dashboard
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}