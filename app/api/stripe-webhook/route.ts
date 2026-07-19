import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createAdminSupabase } from '@/lib/supabaseServer';
import type Stripe from 'stripe';

// Stripe requires the raw request body to verify the webhook signature —
// do not JSON.parse before this. Configure this URL in your Stripe
// Dashboard: Developers > Webhooks > Add endpoint
//   https://yourdomain.com/api/stripe-webhook
// Listen for: checkout.session.completed
export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error('Webhook signature verification failed', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const bookingId = session.metadata?.booking_id;

    if (bookingId) {
      const admin = createAdminSupabase();
      await admin
        .from('bookings')
        .update({
          status: 'paid',
          stripe_payment_intent: typeof session.payment_intent === 'string' ? session.payment_intent : null
        })
        .eq('id', bookingId);
    }
  }

  return NextResponse.json({ received: true });
}
