-- ====================================================================
-- AURELIA Modern Luxury Restaurant Database Schema for Supabase
-- ====================================================================

-- 1. Categories Table
create table if not exists public.categories (
  id text primary key,
  name text not null,
  description text,
  icon_name text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Menu Items Table
create table if not exists public.menu_items (
  id text primary key,
  name text not null,
  short_description text not null,
  description text not null,
  price numeric(10, 2) not null,
  category_id text references public.categories(id) on delete set null,
  image text not null,
  rating numeric(3, 2) default 5.0,
  review_count integer default 0,
  is_chef_special boolean default false,
  is_vegetarian boolean default false,
  is_gluten_free boolean default false,
  calories integer,
  preparation_time text,
  ingredients text[] default '{}',
  allergens text[] default '{}',
  wine_pairing text,
  customization_options jsonb default '[]'::jsonb,
  is_available boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Table Reservations Table
create table if not exists public.reservations (
  id uuid default gen_random_uuid() primary key,
  booking_ref text not null unique,
  full_name text not null,
  email text not null,
  phone text not null,
  date text not null,
  time text not null,
  guests integer not null default 2,
  occasion text default 'Dinner',
  seating_preference text default 'main',
  special_requests text,
  status text default 'confirmed' check (status in ('confirmed', 'seated', 'completed', 'cancelled')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Customer Orders Table
create table if not exists public.orders (
  id uuid default gen_random_uuid() primary key,
  order_number text not null unique,
  customer_name text not null,
  customer_phone text not null,
  total_amount numeric(10, 2) not null,
  status text default 'pending' check (status in ('pending', 'preparing', 'ready', 'out_for_delivery', 'completed', 'cancelled')),
  order_type text default 'dine_in' check (order_type in ('dine_in', 'takeaway', 'delivery')),
  table_number text,
  delivery_address text,
  items jsonb not null default '[]'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Customer Reviews Table
create table if not exists public.reviews (
  id uuid default gen_random_uuid() primary key,
  author text not null,
  avatar text,
  rating integer not null check (rating between 1 and 5),
  comment text not null,
  dish_recommended text,
  status text default 'published' check (status in ('published', 'pending', 'flagged')),
  admin_reply text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ====================================================================
-- Row Level Security (RLS) Policies
-- ====================================================================
alter table public.categories enable row level security;
alter table public.menu_items enable row level security;
alter table public.reservations enable row level security;
alter table public.orders enable row level security;
alter table public.reviews enable row level security;

-- Public read policies (Allow everyone to view menu and published reviews)
create policy "Allow public read on categories" on public.categories for select using (true);
create policy "Allow public read on menu_items" on public.menu_items for select using (true);
create policy "Allow public read on reviews" on public.reviews for select using (status = 'published');

-- Public insert policies (Allow guests to submit reservations and orders)
create policy "Allow public insert on reservations" on public.reservations for insert with check (true);
create policy "Allow public insert on orders" on public.orders for insert with check (true);
create policy "Allow public insert on reviews" on public.reviews for insert with check (true);
