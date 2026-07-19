import { createClient } from '@supabase/supabase-js';
import type { Tour, Hotel, FlightRecord, BlogPost, MediaAsset, CustomerReview } from '@/types';

// Read-only anon client for Server Components — no cookies needed since
// this only ever reads publicly-published rows (enforced by RLS policies).
function publicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export async function getTours(): Promise<Tour[]> {
  const { data, error } = await publicClient()
    .from('tours')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false });
  if (error) {
    console.error('getTours', error);
    return [];
  }
  return data ?? [];
}

export async function getHotels(): Promise<Hotel[]> {
  const { data, error } = await publicClient().from('hotels').select('*').eq('is_published', true);
  if (error) {
    console.error('getHotels', error);
    return [];
  }
  return data ?? [];
}

export async function getFlights(): Promise<FlightRecord[]> {
  const { data, error } = await publicClient().from('flights').select('*').eq('is_published', true);
  if (error) {
    console.error('getFlights', error);
    return [];
  }
  return data ?? [];
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const { data, error } = await publicClient()
    .from('blog_posts')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false });
  if (error) {
    console.error('getBlogPosts', error);
    return [];
  }
  return data ?? [];
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await publicClient()
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .maybeSingle();
  if (error) {
    console.error('getBlogPostBySlug', error);
    return null;
  }
  return data;
}

export async function getMediaGallery(): Promise<MediaAsset[]> {
  const { data, error } = await publicClient().from('media_gallery').select('*');
  if (error) {
    console.error('getMediaGallery', error);
    return [];
  }
  return data ?? [];
}

export async function getReviews(): Promise<CustomerReview[]> {
  const { data, error } = await publicClient().from('customer_reviews').select('*').eq('is_published', true);
  if (error) {
    console.error('getReviews', error);
    return [];
  }
  return data ?? [];
}
