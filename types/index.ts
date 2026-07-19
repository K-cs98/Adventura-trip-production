export interface Tour {
  id: string;
  title: string;
  location: string;
  duration: string;
  price_usd: number;
  img: string;
  tag: string;
  slots: number;
  highlights: string[];
  perk_preview: string;
  is_published: boolean;
  created_at: string;
}

export interface Hotel {
  id: string;
  property: string;
  location: string;
  base_cost_usd: number;
  markup_percent: number;
  img: string;
  is_published: boolean;
  created_at: string;
}

export interface FlightRecord {
  id: string;
  carrier: string;
  route: string;
  base_cost_usd: number;
  markup_percent: number;
  is_published: boolean;
  created_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  read_time: string;
  img: string;
  is_published: boolean;
  created_at: string;
}

export interface MediaAsset {
  id: string;
  type: 'image' | 'video';
  title: string;
  location: string;
  src: string;
  thumbnail: string;
}

export interface CustomerReview {
  id: string;
  name: string;
  role: string;
  comment: string;
  rating: number;
  is_published: boolean;
}

export interface Booking {
  id: string;
  tour_id: string | null;
  tour_title: string;
  customer_name: string;
  customer_email: string;
  amount_usd: number;
  currency: string;
  status: 'pending' | 'paid' | 'cancelled' | 'refunded';
  stripe_session_id: string | null;
  created_at: string;
}

export interface QuoteRequest {
  id: string;
  destination: string;
  transport_mode: string;
  accommodation_tier: string;
  headcount: number;
  timeframe_days: number;
  target_budget_usd: number;
  departure_date: string | null;
  estimated_cost_usd: number | null;
  customer_name: string | null;
  customer_email: string | null;
  status: 'new' | 'contacted' | 'closed';
  created_at: string;
}

export interface Enquiry {
  id: string;
  sender_name: string;
  sender_email: string;
  subject: string;
  message: string;
  status: 'unread' | 'replied';
  reply_message: string | null;
  created_at: string;
}

export type CurrencyCode = 'USD' | 'NGN' | 'GHS' | 'XOF';
