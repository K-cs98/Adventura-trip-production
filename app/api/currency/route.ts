import { NextResponse } from 'next/server';
import { STATIC_RATES } from '@/lib/currency';

// GET /api/currency — returns live USD-based rates if EXCHANGE_RATE_API_KEY
// is set, otherwise the static fallback. Cached for 6 hours to stay within
// free-tier request limits.
export const revalidate = 21600;

export async function GET() {
  const apiKey = process.env.EXCHANGE_RATE_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ rates: STATIC_RATES, source: 'static' });
  }

  try {
    const res = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`, {
      next: { revalidate: 21600 }
    });
    const data = await res.json();

    if (data.result !== 'success') throw new Error('rate lookup failed');

    const rates = {
      USD: 1,
      NGN: data.conversion_rates.NGN ?? STATIC_RATES.NGN,
      GHS: data.conversion_rates.GHS ?? STATIC_RATES.GHS,
      XOF: data.conversion_rates.XOF ?? STATIC_RATES.XOF
    };

    return NextResponse.json({ rates, source: 'live' });
  } catch {
    return NextResponse.json({ rates: STATIC_RATES, source: 'static-fallback' });
  }
}
