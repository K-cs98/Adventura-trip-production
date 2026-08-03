import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createAdminSupabase } from '@/lib/supabaseServer';

// POST /api/checkout
// body: { tourId, tourTitle, priceUsd, customerName, customerEmail, notes? }
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { tourId, tourTitle, priceUsd, customerName, customerEmail, notes } = body;

    if (!tourTitle || !priceUsd || !customerName || !customerEmail) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    const admin = createAdminSupabase();

    const { data: booking, error: bookingError } = await admin
      .from('bookings')
      .insert({
        tour_id: tourId ?? null,
        tour_title: tourTitle,
        customer_name: customerName,
        customer_email: customerEmail,
        amount_usd: priceUsd,
        currency: 'usd',
        status: 'pending',
        notes: notes ?? {}
      })
      .select()
      .single();

    if (bookingError || !booking) {
      console.error(bookingError);
      return NextResponse.json({ error: 'Could not create booking record.' }, { status: 500 });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: customerEmail,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: tourTitle },
            unit_amount: Math.round(priceUsd * 100)
          },
          quantity: 1
        }
      ],
      metadata: { booking_id: booking.id },
      success_url: `${siteUrl}/booking-confirmed?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/?checkout=cancelled`
    });

    await admin.from('bookings').update({ stripe_session_id: session.id }).eq('id', booking.id);

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Checkout failed to initialize.' }, { status: 500 });
  }
}