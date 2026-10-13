-- Catálogo Aure. Ejecuta este script en el SQL Editor del proyecto Supabase.
-- El proyecto debe estar vacío. El script se puede volver a correr.

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  sku text not null unique,
  name text not null,
  description text not null default '',
  category_id uuid not null references public.categories (id) on delete restrict,
  price integer not null check (price >= 0),
  stock integer not null default 0 check (stock >= 0),
  is_visible boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products (id) on delete cascade,
  storage_path text not null,
  alt text not null,
  width integer not null check (width > 0),
  height integer not null check (height > 0),
  sort_order integer not null,
  unique (product_id, sort_order)
);

create index if not exists products_sort_order_idx on public.products (sort_order);
create index if not exists products_category_idx on public.products (category_id);
create index if not exists product_images_product_idx on public.product_images (product_id, sort_order);

alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;

drop policy if exists "public read categories" on public.categories;
create policy "public read categories"
  on public.categories
  for select
  to anon, authenticated
  using (true);

drop policy if exists "public read published products" on public.products;
create policy "public read published products"
  on public.products
  for select
  to anon, authenticated
  using (is_visible = true and stock > 0);

drop policy if exists "public read published images" on public.product_images;
create policy "public read published images"
  on public.product_images
  for select
  to anon, authenticated
  using (
    exists (
      select 1
      from public.products
      where products.id = product_images.product_id
        and products.is_visible = true
        and products.stock > 0
    )
  );

grant select on public.categories, public.products, public.product_images to anon, authenticated;
grant all on public.categories, public.products, public.product_images to service_role;

insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do update set public = true;

drop policy if exists "public read product images" on storage.objects;
create policy "public read product images"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'product-images');

-- Usuario administrador: créalo en Authentication → Users.
-- En app_metadata pon { "role": "admin" }.
-- La contraseña no va en este archivo ni en las variables de entorno.
