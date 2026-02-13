-- Coluna PIN (correspondente ao cupom resgatado)
alter table public.leads
  add column if not exists pin text;

-- Opcional: preencher PIN para registros antigos (12OFF -> 13U, 30OFF -> 142)
update public.leads
set pin = case
  when coupon_code = '12OFF' then '13U'
  when coupon_code = '30OFF' then '142'
  else pin
end
where pin is null;

-- RLS: permite admin (authenticated) excluir leads
drop policy if exists "leads_delete_authenticated" on public.leads;
create policy "leads_delete_authenticated"
  on public.leads for delete
  to authenticated
  using (true);

grant delete on public.leads to authenticated;
