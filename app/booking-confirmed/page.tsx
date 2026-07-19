import { createAdminSupabase } from '@/lib/supabaseServer';

export default async function BookingConfirmedPage({
  searchParams
}: {
  searchParams: { session_id?: string };
}) {
  let booking = null;

  if (searchParams.session_id) {
    const admin = createAdminSupabase();
    const { data } = await admin
      .from('bookings')
      .select('*')
      .eq('stripe_session_id', searchParams.session_id)
      .maybeSingle();
    booking = data;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <div className="max-w-md w-full bg-white rounded-2xl border border-slate-100 p-8 text-center">
        <div className="w-14 h-14 rounded-full bg-[#26A69A]/10 text-[#26A69A] text-2xl flex items-center justify-center mx-auto mb-4">✓</div>
        <h1 className="text-xl font-bold text-slate-900">
          {booking?.status === 'paid' ? 'Booking confirmed' : "We're finalizing your booking"}
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          {booking
            ? `${booking.tour_title} — a confirmation has been sent to ${booking.customer_email}.`
            : 'Your payment is being processed. You will receive a confirmation email shortly.'}
        </p>
        <p className="mt-4 text-[11px] text-slate-400">
          {booking?.status !== 'paid' &&
            'If this status doesn\'t update within a few minutes, contact us via the chat widget on the homepage.'}
        </p>
        <a href="/" className="mt-6 inline-block bg-slate-900 text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-slate-800 transition-colors">
          Back to homepage
        </a>
      </div>
    </div>
  );
}
