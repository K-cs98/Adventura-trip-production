'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabaseClient'; // 1. Changed import
import type { QuoteRequest } from '@/types';

export default function QuoteRequestsViewer() {
  const supabase = createClient(); // 2. Added initialization
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true); // Added loading state toggle for better UX
    const { data } = await supabase.from('quote_requests').select('*').order('created_at', { ascending: false });
    setQuotes(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function updateStatus(id: string, status: string) {
    await supabase.from('quote_requests').update({ status }).eq('id', id);
    load();
  }

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6">
      <h2 className="font-bold text-lg text-slate-900 mb-4">Custom Quote Requests</h2>
      {loading ? (
        <p className="text-sm text-slate-400">Loading…</p>
      ) : quotes.length === 0 ? (
        <p className="text-sm text-slate-400">No requests yet.</p>
      ) : (
        <div className="space-y-2">
          {quotes.map((q) => (
            <div key={q.id} className="border border-slate-100 rounded-lg px-4 py-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-800">{q.destination} — {q.headcount} travelers, {q.timeframe_days} days</p>
                <select
                  value={q.status}
                  onChange={(e) => updateStatus(q.id, e.target.value)}
                  className="text-xs border border-slate-200 rounded-md px-2 py-1"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {q.customer_email} · {q.transport_mode} · {q.accommodation_tier} · Budget ${q.target_budget_usd.toLocaleString()} · Est. ${q.estimated_cost_usd?.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}