import type { CurrencyCode } from '@/types';

// Fallback rates, used if the live rate endpoint (app/api/currency) hasn't
// loaded yet or EXCHANGE_RATE_API_KEY isn't configured. Update periodically
// if you don't set up the live feed.
export const STATIC_RATES: Record<CurrencyCode, number> = {
  USD: 1,
  NGN: 1480,
  GHS: 14.5,
  XOF: 610
};

export const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  USD: '$',
  NGN: '₦',
  GHS: '₵',
  XOF: 'CFA '
};

export function formatPrice(baseUsd: number, currency: CurrencyCode, rates: Record<CurrencyCode, number> = STATIC_RATES) {
  const converted = baseUsd * (rates[currency] ?? STATIC_RATES[currency]);
  return CURRENCY_SYMBOLS[currency] + converted.toLocaleString(undefined, { maximumFractionDigits: 0 });
}

// IMPORTANT: Stripe Checkout always charges in USD in this build (lib/stripe
// checkout session). The currency switcher is a display convenience for
// browsing — it does not change what the customer is actually charged.
// If you need true multi-currency settlement, pass `currency` through to
// app/api/checkout/route.ts and configure that currency in your Stripe account.
