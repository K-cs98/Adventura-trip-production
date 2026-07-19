'use client';
import { createBrowserClient } from '@supabase/ssr';

// Public client — safe to use in client components. Respects RLS policies.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// Convenience singleton for components that just need one instance.
export const supabase = createClient();
