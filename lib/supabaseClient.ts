import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// 1. Export the function for components
export function createClient() {
  return createSupabaseClient(supabaseUrl, supabaseAnonKey);
}

// 2. Export a direct 'supabase' instance so legacy imports don't throw errors
export const supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey);