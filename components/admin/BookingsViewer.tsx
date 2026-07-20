'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabaseClient'; // 1. Import the function
import type { Booking } from '@/types';

export default function BookingsViewer() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
    const supabase = createClient(); // 2. Add this line so 'supabase' is defined
    
    supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setBookings(data ?? []);
        setLoading(false);
      });
  }, []);

  const statusColor: Record<string, string> = {
    paid: 'bg-green-100 text-green-700',
    pending: 'bg-amber-100 text-amber-700',
    cancelled: 'bg-slate-100 text-slate-500',
    refunded: 'bg-red-100 text-red-700'
  };

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6">
      <h2 className="font-bold text-lg text-slate-900 mb-4">Bookings</h2>
      {loading ? (
        <p className="text-sm text-slate-400">Loading…</p>
      ) : bookings.length === 0 ? (
        <p className="text-sm text-slate-400">No bookings yet — these appear automatically once customers pay via Stripe Checkout.</p>
      ) : (
        <div className="space-y-2">
          {bookings.map((b) => (
            <div key={b.id} className="flex items-center justify-between border border-slate-100 rounded-lg px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-slate-800">{b.tour_title}</p>
                <p className="text-xs text-slate-400">{b.customer_name} · {b.customer_email}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-slate-900">${b.amount_usd.toLocaleString()}</p>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusColor[b.status]}`}>{b.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
