-- ============================================================
-- Adventura Trips — Production Schema
-- Run this in Supabase SQL Editor (Project > SQL Editor > New query)
-- ============================================================

-- Extension for UUIDs
create extension if not exists "pgcrypto";

-- ---------- ADMIN ROLE TABLE ----------
-- Links a Supabase Auth user to admin privileges.
create table if not exists admin_users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  created_at timestamptz not null default now()
);

-- ---------- TOURS ----------
create table if not exists tours (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  location text not null,
  duration text not null,
  price_usd numeric(10,2) not null,
  img text not null,
  tag text not null default 'Featured',
  slots int not null default 1,
  highlights text[] not null default '{}',
  perk_preview text not null default '',
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

-- ---------- HOTELS ----------
create table if not exists hotels (
  id uuid primary key default gen_random_uuid(),
  property text not null,
  location text not null default '',
  base_cost_usd numeric(10,2) not null,
  markup_percent numeric(5,2) not null default 10,
  img text not null default '',
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

-- ---------- FLIGHTS (admin-managed inventory) ----------
create table if not exists flights (
  id uuid primary key default gen_random_uuid(),
  carrier text not null,
  route text not null,
  base_cost_usd numeric(10,2) not null,
  markup_percent numeric(5,2) not null default 10,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

-- ---------- BLOG POSTS ----------
create table if not exists blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null,
  content text not null,
  category text not null default 'Travel Tips',
  author text not null default 'Adventura Editorial',
  read_time text not null default '4 min read',
  img text not null default '',
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

-- ---------- MEDIA GALLERY ----------
create table if not exists media_gallery (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('image','video')),
  title text not null,
  location text not null default '',
  src text not null,
  thumbnail text not null default '',
  created_at timestamptz not null default now()
);

-- ---------- CUSTOMER REVIEWS ----------
create table if not exists customer_reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null default '',
  comment text not null,
  rating int not null default 5 check (rating between 1 and 5),
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

-- ---------- BOOKINGS (created on checkout, confirmed by Stripe webhook) ----------
create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  tour_id uuid references tours(id) on delete set null,
  tour_title text not null,
  customer_name text not null,
  customer_email text not null,
  amount_usd numeric(10,2) not null,
  currency text not null default 'usd',
  status text not null default 'pending' check (status in ('pending','paid','cancelled','refunded')),
  stripe_session_id text unique,
  stripe_payment_intent text,
  notes jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- ---------- CUSTOM QUOTE REQUESTS (Bespoke Trip Curator submissions) ----------
create table if not exists quote_requests (
  id uuid primary key default gen_random_uuid(),
  destination text not null,
  transport_mode text not null,
  accommodation_tier text not null,
  headcount int not null default 1,
  timeframe_days int not null default 1,
  target_budget_usd numeric(10,2) not null,
  departure_date date,
  estimated_cost_usd numeric(10,2),
  customer_name text,
  customer_email text,
  status text not null default 'new' check (status in ('new','contacted','closed')),
  created_at timestamptz not null default now()
);

-- ---------- INBOUND ENQUIRIES (chat widget / contact form / admin inbox) ----------
create table if not exists enquiries (
  id uuid primary key default gen_random_uuid(),
  sender_name text not null default '',
  sender_email text not null,
  subject text not null default 'Website enquiry',
  message text not null,
  status text not null default 'unread' check (status in ('unread','replied')),
  reply_message text,
  created_at timestamptz not null default now()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- Public (anon) can READ published content and INSERT bookings/
-- quote_requests/enquiries. Only authenticated admins can write
-- to catalog tables or read private submissions.
-- ============================================================

alter table admin_users enable row level security;
alter table tours enable row level security;
alter table hotels enable row level security;
alter table flights enable row level security;
alter table blog_posts enable row level security;
alter table media_gallery enable row level security;
alter table customer_reviews enable row level security;
alter table bookings enable row level security;
alter table quote_requests enable row level security;
alter table enquiries enable row level security;

-- Helper: is the current user an admin?
create or replace function is_admin() returns boolean as $$
  select exists (select 1 from admin_users where id = auth.uid());
$$ language sql security definer stable;

-- admin_users: only admins can read the list; nobody writes via API (manage via SQL editor)
create policy "admins can read admin list" on admin_users for select using (is_admin());

-- Public read for published catalog content
create policy "public read published tours" on tours for select using (is_published = true or is_admin());
create policy "public read published hotels" on hotels for select using (is_published = true or is_admin());
create policy "public read published flights" on flights for select using (is_published = true or is_admin());
create policy "public read published blog" on blog_posts for select using (is_published = true or is_admin());
create policy "public read media" on media_gallery for select using (true);
create policy "public read published reviews" on customer_reviews for select using (is_published = true or is_admin());

-- Admin-only writes on catalog content
create policy "admin write tours" on tours for all using (is_admin()) with check (is_admin());
create policy "admin write hotels" on hotels for all using (is_admin()) with check (is_admin());
create policy "admin write flights" on flights for all using (is_admin()) with check (is_admin());
create policy "admin write blog" on blog_posts for all using (is_admin()) with check (is_admin());
create policy "admin write media" on media_gallery for all using (is_admin()) with check (is_admin());
create policy "admin write reviews" on customer_reviews for all using (is_admin()) with check (is_admin());

-- Bookings: anyone can create one (checkout flow), only admins can read/update the list.
-- The customer sees their own booking via the Stripe session id returned to them, not via a table query.
create policy "anyone can create booking" on bookings for insert with check (true);
create policy "admin read bookings" on bookings for select using (is_admin());
create policy "admin update bookings" on bookings for update using (is_admin());

-- Quote requests: anyone can submit, only admins can read.
create policy "anyone can submit quote" on quote_requests for insert with check (true);
create policy "admin read quotes" on quote_requests for select using (is_admin());
create policy "admin update quotes" on quote_requests for update using (is_admin());

-- Enquiries: anyone can submit, only admins can read/reply.
create policy "anyone can submit enquiry" on enquiries for insert with check (true);
create policy "admin read enquiries" on enquiries for select using (is_admin());
create policy "admin update enquiries" on enquiries for update using (is_admin());

-- ============================================================
-- SEED DATA (optional — replace with your real listings via /admin)
-- ============================================================
insert into tours (title, location, duration, price_usd, img, tag, slots, highlights, perk_preview) values
('East Africa Wild Safari & Conservation Tour', 'Serengeti, Tanzania', '6 Days', 1250, 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80', 'Trending', 4, array['Luxury Tented Pavilions','Private Game Drives'], 'Includes complimentary 4x4 private game tracker & conservation donation match.'),
('Maldives Premium Water Villa Experience', 'Maafushi, Maldives', '5 Days', 2100, 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=800&q=80', 'Luxury', 1, array['Overwater Lagoon Villa','Private Coral Snorkeling'], 'Includes 24/7 dedicated overwater butler service and midnight lagoon access.'),
('Santorini Sunset & Private Yacht Cruise', 'Oia, Greece', '7 Days', 3400, 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80', 'Elite Choice', 3, array['Caldera Sunset Sailing','Clifftop Infinity Pools'], 'Includes private catamaran dinner charter with select vintage wine tastings.')
on conflict do nothing;

insert into customer_reviews (name, role, comment, rating) values
('Dr. Amara Anya', 'Corporate Retreat Coordinator', 'The absolute pinnacle of effortless logistics. The customized duration option allowed our board of directors to prolong their retreat session seamlessly.', 5),
('Kofi Mensah', 'Bespoke Enterprise Client', 'Settling invoices natively in local regional denominations instead of jumping through foreign exchange loops completely redefines booking ease.', 5)
on conflict do nothing;

-- ============================================================
-- MAKE YOURSELF AN ADMIN
-- 1. Sign up a user at /admin/login (or Supabase Auth dashboard)
-- 2. Run:  insert into admin_users (id, email) values ('<user-uuid-from-auth.users>', 'you@yourdomain.com');
-- ============================================================
