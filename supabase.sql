-- Jalankan sekali di Supabase: SQL Editor > New query > paste semua > Run

create table if not exists products (
  id text primary key,
  name text not null,
  description text not null default '',
  price int not null check (price >= 0),
  stock int not null default 0 check (stock >= 0),
  sizes text[] not null default '{}',
  photo text,                       -- nama file di src/assets/shop (tanpa ekstensi)
  category text not null default 'main',  -- 'main' = produk utama, 'giias' = merch GIIAS
  sort_order int not null default 0,
  active boolean not null default true
);

create table if not exists orders (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  customer_name text not null,
  phone text not null,
  email text not null,
  address text not null,
  city text not null,
  postal text,
  note text,
  total int not null default 0,
  status text not null default 'new'  -- new, paid, shipped, done, cancelled
);

create table if not exists order_items (
  id bigint generated always as identity primary key,
  order_id bigint not null references orders(id) on delete cascade,
  product_id text,
  name text not null,
  size text,
  qty int not null,
  price int not null
);

alter table products enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;

-- Pengunjung: hanya boleh LIHAT produk aktif. Order lewat fungsi place_order di bawah.
drop policy if exists "public read products" on products;
create policy "public read products" on products for select to anon, authenticated using (active);

-- Admin = user yang login lewat Supabase Auth (buat 1 user admin, matikan signup)
drop policy if exists "admin products" on products;
drop policy if exists "admin orders" on orders;
drop policy if exists "admin items" on order_items;
create policy "admin products" on products for all to authenticated using (true) with check (true);
create policy "admin orders" on orders for all to authenticated using (true) with check (true);
create policy "admin items" on order_items for all to authenticated using (true) with check (true);

-- Order: harga & stok dicek di server, jadi tidak bisa dimanipulasi dari browser
create or replace function place_order(p_customer jsonb, p_items jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  it jsonb; p products%rowtype;
  v_total int := 0; v_id bigint; v_qty int;
begin
  if jsonb_array_length(coalesce(p_items, '[]'::jsonb)) = 0 then
    raise exception 'Your cart is empty.';
  end if;
  if coalesce(trim(p_customer->>'name'), '') = '' or coalesce(trim(p_customer->>'phone'), '') = ''
     or coalesce(trim(p_customer->>'email'), '') = '' or coalesce(trim(p_customer->>'address'), '') = ''
     or coalesce(trim(p_customer->>'city'), '') = '' then
    raise exception 'Please fill in all required fields.';
  end if;

  insert into orders (customer_name, phone, email, address, city, postal, note)
  values (trim(p_customer->>'name'), trim(p_customer->>'phone'), trim(p_customer->>'email'),
          trim(p_customer->>'address'), trim(p_customer->>'city'),
          trim(p_customer->>'postal'), trim(p_customer->>'note'))
  returning id into v_id;

  for it in select * from jsonb_array_elements(p_items) loop
    v_qty := coalesce((it->>'qty')::int, 0);
    if v_qty < 1 or v_qty > 20 then raise exception 'Invalid quantity.'; end if;

    select * into p from products where id = it->>'id' and active for update;
    if not found then raise exception 'A product in your cart is no longer available.'; end if;

    if coalesce(array_length(p.sizes, 1), 0) > 0 and not (coalesce(it->>'size', '') = any(p.sizes)) then
      raise exception 'Please choose a size for %.', p.name;
    end if;
    if p.stock < v_qty then
      raise exception 'Not enough stock for %.', p.name;
    end if;

    update products set stock = stock - v_qty where id = p.id;
    insert into order_items (order_id, product_id, name, size, qty, price)
    values (v_id, p.id, p.name, nullif(it->>'size', ''), v_qty, p.price);
    v_total := v_total + p.price * v_qty;
  end loop;

  update orders set total = v_total where id = v_id;
  return jsonb_build_object('id', v_id, 'code', 'ANR-' || lpad(v_id::text, 5, '0'), 'total', v_total);
end;
$$;

grant execute on function place_order(jsonb, jsonb) to anon, authenticated;

-- Produk awal (harga & stok contoh, bisa diubah nanti di Admin)
insert into products (id, name, description, price, stock, sizes, photo, category, sort_order) values
 ('webbing-strap', 'Webbing Strap Anargya', 'Woven strap with the Anargya wordmark.', 35000, 100, '{}', 'webbing-strap', 'main', 1),
 ('helmet-keychain', 'Helmet Keychain', 'Hand-knitted mini racing helmet.', 45000, 100, '{}', 'helmet-keychain', 'main', 2),
 ('retro-tshirt', 'Retro T-Shirt Mark 6.0', 'Retro-style tee celebrating our Mark 6.0 car.', 150000, 100, '{S,M,L,XL}', 'retro-tshirt', 'main', 3),
 ('sticker-pack', 'Sticker Pack', 'A set of Anargya stickers for laptop, helmet, and bottle.', 25000, 100, '{}', 'sticker-pack', 'main', 4),
 ('giias-tote', 'Tote Bag', 'GIIAS edition tote bag.', 65000, 50, '{}', 'giias-1', 'giias', 5),
 ('giias-tumbler', 'Tumbler', 'GIIAS edition tumbler.', 85000, 50, '{}', 'giias-2', 'giias', 6),
 ('giias-lanyard', 'Lanyard', 'GIIAS edition lanyard.', 25000, 100, '{}', 'giias-3', 'giias', 7),
 ('giias-pins', 'Pin Set', 'GIIAS edition pin set.', 30000, 100, '{}', 'giias-4', 'giias', 8),
 ('giias-cap', 'Cap', 'GIIAS edition cap.', 90000, 50, '{}', 'giias-5', 'giias', 9),
 ('giias-notebook', 'Notebook', 'GIIAS edition notebook.', 40000, 100, '{}', 'giias-6', 'giias', 10)
on conflict (id) do nothing;