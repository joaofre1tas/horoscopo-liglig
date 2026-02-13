-- Garante que usuários anônimos (formulário público) podem inserir leads.
-- Execute no SQL Editor do Supabase se o resgate do cupom retornar 403.

-- 1) Concede permissão explícita de INSERT na tabela para anon e authenticated
grant insert on public.leads to anon;
grant insert on public.leads to authenticated;

-- 2) Garante que RLS está ativado
alter table public.leads enable row level security;

-- 3) Remove qualquer política de INSERT para anon que exista (evita duplicata)
drop policy if exists "leads_insert_anon" on public.leads;

-- 4) Cria a política que permite INSERT para requisições anônimas (anon key)
create policy "leads_insert_anon"
  on public.leads
  for insert
  to anon
  with check (true);

-- 5) Permite INSERT também para authenticated (ex.: quando o admin testa o formulário logado)
drop policy if exists "leads_insert_authenticated" on public.leads;
create policy "leads_insert_authenticated"
  on public.leads
  for insert
  to authenticated
  with check (true);
