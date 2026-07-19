# Adventura Trips — Production Build

This replaces the original single-file demo (`page.tsx`) with a real Next.js 14
App Router project: a Postgres database (Supabase) instead of mock arrays,
real Stripe Checkout instead of an `alert()`, and a properly authenticated
admin dashboard instead of an open, unprotected panel.

## What changed vs. the demo, and why

| Demo behavior | Production behavior |
|---|---|
| "Authorize Settlement" button fired `alert()` | Real Stripe Checkout session; booking is only marked `paid` after Stripe's webhook confirms payment |
| All data (tours, hotels, flights, blog, reviews) lived in `useState` arrays, reset on refresh | All content lives in Supabase Postgres tables, editable from `/admin` |
| Admin panel had no login | Supabase email/password auth + `admin_users` allow-list, enforced both in middleware and in Row Level Security policies (defense in depth) |
| Currency conversion used hardcoded rates | Static fallback rates plus an optional live-rate API route — swap in a real key and it upgrades automatically |
| "Aviation Manifest Terminal" / seat maps / hotel search simulated live inventory | Flights & hotels are admin-managed listings (per your scope choice) — search/browse is real, backed by the database, but there's no live GDS connection. That's a distinct, larger project (Amadeus/Duffel integration) if you want it later. |
| Bespoke Trip Curator gave a fake instant quote | Curator saves a real `quote_requests` row your team follows up on; the instant number shown is clearly labeled as a rough estimate |
| Chat widget was decorative | Messages save to a real `enquiries` table, visible and reply-able from `/admin` |

## Project structure

```
app/                 Next.js App Router pages & API routes
  admin/             Protected dashboard (login, tours/hotels/flights/blog/media/reviews CRUD, bookings, quotes, inbox)
  api/checkout/       Creates a Stripe Checkout session
  api/stripe-webhook/ Confirms payment, marks booking paid
  api/currency/       Optional live FX rates
  blog/              Public blog (list + [slug])
  booking-confirmed/ Post-checkout landing page
components/          UI components (homepage sections, admin managers)
lib/                 Supabase clients, Stripe client, currency helpers, data fetchers
supabase/schema.sql  Full DB schema + Row Level Security policies + seed data
middleware.ts        Protects /admin routes, refreshes Supabase session
```

## 1. Set up Supabase

1. Create a project at supabase.com.
2. Go to the SQL Editor and run the entire contents of `supabase/schema.sql`.
   This creates every table, enables Row Level Security, and seeds a few
   sample tours/reviews you can delete later from `/admin`.
3. Go to Authentication > Users and create yourself a user (email + password).
4. Copy that user's UUID (Authentication > Users, click into the user), then
   back in the SQL Editor run:
   ```sql
   insert into admin_users (id, email) values ('<paste-uuid-here>', 'you@yourdomain.com');
   ```
   Without this row, logging in works but the middleware will redirect you
   back to `/admin/login` — that's the second layer of protection working
   as intended.
5. Copy Project Settings > API: `Project URL`, `anon public` key, and
   `service_role` key (keep the service role key secret — server-only).

## 2. Set up Stripe

1. Create a Stripe account (or use an existing one) and switch to **test
   mode** first.
2. Developers > API keys — copy the secret key and publishable key.
3. Developers > Webhooks > Add endpoint. For local testing use the Stripe
   CLI (`stripe listen --forward-to localhost:3000/api/stripe-webhook`),
   which prints a webhook signing secret. For production, point the
   endpoint at `https://yourdomain.com/api/stripe-webhook` and select the
   `checkout.session.completed` event — copy the signing secret it gives you.

## 3. Configure environment variables

```bash
cp .env.local.example .env.local
```
Fill in every value from steps 1–2. `NEXT_PUBLIC_SITE_URL` should be your
real domain once deployed (used to build Stripe's success/cancel redirect
URLs).

## 4. Run locally

```bash
npm install
npm run dev
```
Visit `http://localhost:3000`. Sign in at `/admin/login` with the user you
created, add a few tours/hotels/flights/blog posts, then test a booking —
use Stripe's test card `4242 4242 4242 4242`, any future expiry, any CVC.

## 5. Deploy

Recommended: **Vercel** (built for Next.js) + your Supabase project + your
live Stripe keys.

1. Push this repo to GitHub.
2. Import it in Vercel, add all the same environment variables from
   `.env.local` in the Vercel project settings (use your **live** Stripe
   keys and set `NEXT_PUBLIC_SITE_URL` to your production domain).
3. Add the production webhook endpoint in Stripe pointing at
   `https://yourdomain.com/api/stripe-webhook`, and put that endpoint's
   signing secret into `STRIPE_WEBHOOK_SECRET` on Vercel.
4. Deploy.

## Things intentionally left for you to decide (real business choices, not code gaps)

- **Transactional email**: booking confirmations and admin replies currently
  live in the database only — no email is actually sent yet. Wire up Resend,
  Postmark, or SendGrid inside `app/api/stripe-webhook/route.ts` (on payment
  success) and `components/admin/EnquiriesViewer.tsx` (on reply) when you're
  ready; this needs its own API key and a decision on sender domain.
- **Real flight/hotel inventory**: currently admin-managed, per your request.
  If you later want live search against a real GDS, Amadeus and Duffel both
  have developer APIs — that's a separate integration project.
- **Multi-currency settlement**: the currency switcher changes what's
  *displayed*; Stripe still charges in USD in this build. True multi-currency
  charging requires enabling those currencies in your Stripe account and
  passing the selected currency through to the checkout API route.
- **Legal pages**: no Terms of Service, Privacy Policy, or refund policy
  page exists yet — required in most jurisdictions before taking live
  payments.
