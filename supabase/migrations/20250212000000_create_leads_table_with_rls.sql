-- Tabela de leads (dados do formulário do horóscopo)
create table public.leads (
  id uuid primary key default gen_random_uuid(),
  birth_year int4 not null,
  name text not null,
  email text not null,
  whatsapp text not null,
  coupon_code text not null,
  coupon_condition text,
  zodiac_sign_name text not null,
  created_at timestamptz not null default now()
);

-- RLS: ativar na tabela
alter table public.leads enable row level security;

-- INSERT: permitir para anon (formulário público)
create policy "leads_insert_anon"
  on public.leads for insert
  to anon
  with check (true);

-- SELECT: apenas usuários autenticados (admin)
create policy "leads_select_authenticated"
  on public.leads for select
  to authenticated
  using (true);
