import { createBrowserClient } from '@supabase/ssr';

// Create a single shared client instance to prevent multiple GoTrueClient warnings
let client: ReturnType<typeof createBrowserClient> | null = null;

export const createClient = () => {
  if (client) return client;

  client = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  return client;
};

// Or if your app expects a direct export named supabase:
export const supabase = createClient();