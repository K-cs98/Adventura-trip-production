import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { createClient as createRawClient } from '@supabase/supabase-js';

// Use inside Server Components / Route Handlers — respects the signed-in
// user's session and RLS policies (used for admin auth checks).
export function createServerSupabase() {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch {
            // Called from a Server Component with no write access — safe to ignore,
            // middleware.ts handles session refresh.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch {
            // see note above
          }
        }
      }
    }
  );
}

// Service-role client — bypasses RLS entirely. ONLY use in trusted server
// code (API routes) that has already verified the request, e.g. the Stripe
// webhook confirming a payment. Never import this into client components.
export function createAdminSupabase() {
  return createRawClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}
