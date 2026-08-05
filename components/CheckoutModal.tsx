'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import type { Tour, CurrencyCode } from '@/types';

const PaystackButtonWrapper = dynamic(
  () => import('@/components/PaystackButtonWrapper'),
  { ssr: false }
);

export default function CheckoutModal({
  tour,
  currency = 'NGN', // Default or passed from parent state
  rates = { USD: 1, NGN: 1500, GHS: 15, XOF: 600 },
  onClose
}: {
  tour: Tour;
  currency?: CurrencyCode;
  rates?: Record<CurrencyCode, number>;
  onClose: () => void;
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentRate = rates[currency] ?? 1500;
  const convertedPrice = Math.round(tour.price_usd * currentRate);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 relative animate-fadeIn">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 text-xl leading-none"
        >
          ×
        </button>

        <p className="text-xs font-bold text-[#26A69A] uppercase tracking-wider">Reserve your spot</p>
        <h3 className="mt-1 font-bold text-lg text-slate-900">{tour.title}</h3>
        <p className="text-sm text-slate-500 mt-1">{tour.location} · {tour.duration}</p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-600">Full name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#09a5db]"
              placeholder="Jane Doe"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#09a5db]"
              placeholder="jane@example.com"
            />
          </div>

          {mounted && (
            <PaystackButtonWrapper
              tour={tour}
              name={name}
              email={email}
              currency={currency}
              convertedPrice={convertedPrice}
              onClose={onClose}
            />
          )}

          <p className="text-[11px] text-slate-400 text-center">
            Secure payment processed via Paystack ({currency}).
          </p>
        </div>
      </div>
    </div>
  );
}