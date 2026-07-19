'use client';
import { useState } from 'react';
import type { Tour } from '@/types';

export default function CheckoutModal({ tour, onClose }: { tour: Tour; onClose: () => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !email.trim()) {
      setError('Please provide your name and email.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tourId: tour.id,
          tourTitle: tour.title,
          priceUsd: tour.price_usd,
          customerName: name,
          customerEmail: email
        })
      });
      const data = await res.json();

      if (!res.ok || !data.url) {
        setError(data.error ?? 'Something went wrong starting checkout.');
        setLoading(false);
        return;
      }

      window.location.href = data.url;
    } catch {
      setError('Network error — please try again.');
      setLoading(false);
    }
  }

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

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-600">Full name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E88E5]"
              placeholder="Jane Doe"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E88E5]"
              placeholder="jane@example.com"
            />
          </div>

          {error && <p className="text-xs text-red-500 font-medium">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1E88E5] hover:bg-[#1976D2] disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            {loading ? 'Redirecting to secure checkout…' : `Pay $${tour.price_usd.toLocaleString()} with Stripe`}
          </button>
          <p className="text-[11px] text-slate-400 text-center">
            You'll be redirected to Stripe's secure checkout page to complete payment.
          </p>
        </form>
      </div>
    </div>
  );
}
