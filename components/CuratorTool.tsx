'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

const TRANSPORT_OPTIONS = ['Economy Flight', 'Business Flight', 'Private Charter', 'Road Transfer'];
const TIER_OPTIONS = ['Standard', 'Premium', 'Luxury', 'Ultra-Luxury'];

export default function CuratorTool({ onSubmitted }: { onSubmitted: (msg: string) => void }) {
  const [destination, setDestination] = useState('');
  const [transportMode, setTransportMode] = useState(TRANSPORT_OPTIONS[0]);
  const [tier, setTier] = useState(TIER_OPTIONS[0]);
  const [headcount, setHeadcount] = useState(2);
  const [days, setDays] = useState(7);
  const [budget, setBudget] = useState(3000);
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Rough live estimate for display only — the real quote comes from the team.
  const tierMultiplier = { Standard: 1, Premium: 1.4, Luxury: 2, 'Ultra-Luxury': 3 }[tier] ?? 1;
  const transportMultiplier = { 'Economy Flight': 1, 'Business Flight': 1.8, 'Private Charter': 4, 'Road Transfer': 0.6 }[transportMode] ?? 1;
  const estimate = Math.round(headcount * days * 120 * tierMultiplier * transportMultiplier);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!destination.trim() || !email.trim()) {
      setError('Please add a destination and your email.');
      return;
    }

    setSubmitting(true);
    const { error: dbError } = await supabase.from('quote_requests').insert({
      destination,
      transport_mode: transportMode,
      accommodation_tier: tier,
      headcount,
      timeframe_days: days,
      target_budget_usd: budget,
      estimated_cost_usd: estimate,
      customer_email: email
    });
    setSubmitting(false);

    if (dbError) {
      setError('Could not submit your request — please try again.');
      return;
    }

    onSubmitted('Request received — our travel curators will email you within 24 hours.');
    setDestination('');
    setEmail('');
  }

  return (
    <section id="curator" className="bg-slate-50 py-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-10">
          <p className="text-[#26A69A] font-bold tracking-[0.2em] text-xs uppercase mb-3">Bespoke Trip Curator</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Design your own itinerary</h2>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-100 p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-xs font-semibold text-slate-600">Destination</label>
            <input
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g. Kyoto, Japan"
              className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E88E5]"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600">Your email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jane@example.com"
              className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E88E5]"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600">Transport mode</label>
            <select
              value={transportMode}
              onChange={(e) => setTransportMode(e.target.value)}
              className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none"
            >
              {TRANSPORT_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600">Accommodation tier</label>
            <select
              value={tier}
              onChange={(e) => setTier(e.target.value)}
              className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none"
            >
              {TIER_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600">Travelers: {headcount}</label>
            <input type="range" min={1} max={20} value={headcount} onChange={(e) => setHeadcount(+e.target.value)} className="mt-3 w-full" />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600">Duration: {days} days</label>
            <input type="range" min={1} max={30} value={days} onChange={(e) => setDays(+e.target.value)} className="mt-3 w-full" />
          </div>
          <div className="md:col-span-2">
            <label className="text-xs font-semibold text-slate-600">Target budget: ${budget.toLocaleString()}</label>
            <input type="range" min={500} max={50000} step={500} value={budget} onChange={(e) => setBudget(+e.target.value)} className="mt-3 w-full" />
          </div>

          <div className="md:col-span-2 flex items-center justify-between bg-slate-50 rounded-xl p-4">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-400">Live rough estimate</p>
              <p className="font-bold text-xl text-slate-900">${estimate.toLocaleString()}</p>
            </div>
            <p className="text-[11px] text-slate-400 max-w-[220px] text-right">
              A curator will confirm the final quote by email — this is a starting estimate, not a price lock.
            </p>
          </div>

          {error && <p className="md:col-span-2 text-xs text-red-500 font-medium">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="md:col-span-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            {submitting ? 'Submitting…' : 'Request My Custom Quote'}
          </button>
        </form>
      </div>
    </section>
  );
}
