create extension if not exists pgcrypto;

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique,
  buyer_user_id uuid references auth.users(id) on delete set null,
  buyer_email text not null,
  company_name text not null,
  contact_person text not null,
  job_title text not null,
  company_website text,
  country text not null,
  phone text not null,
  product_category text not null,
  product_requirement text not null,
  product_specifications text,
  quantity text not null,
  destination text not null,
  timeline text not null,
  incoterm text,
  additional_notes text,
  attachment_path text,
  attachment_name text,
  status text not null default 'new'
    check (status in ('new', 'reviewing', 'responded', 'quoted', 'negotiating', 'won', 'closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  last_activity_at timestamptz not null default now()
);

create index if not exists enquiries_buyer_email_idx
  on public.enquiries (lower(buyer_email));
create index if not exists enquiries_created_at_idx
  on public.enquiries (created_at desc);
create index if not exists enquiries_status_idx
  on public.enquiries (status, last_activity_at desc);

create table if not exists public.enquiry_messages (
  id uuid primary key default gen_random_uuid(),
  enquiry_id uuid not null references public.enquiries(id) on delete cascade,
  sender_role text not null check (sender_role in ('buyer', 'admin', 'system')),
  sender_email text,
  body text not null check (char_length(body) between 1 and 10000),
  attachment_path text,
  attachment_name text,
  created_at timestamptz not null default now()
);

create index if not exists enquiry_messages_enquiry_created_idx
  on public.enquiry_messages (enquiry_id, created_at);

create or replace function public.touch_enquiry_updated_at()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists enquiries_touch_updated_at on public.enquiries;
create trigger enquiries_touch_updated_at
before update on public.enquiries
for each row execute function public.touch_enquiry_updated_at();

create or replace function public.touch_enquiry_from_message()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.enquiries
    set last_activity_at = new.created_at,
        updated_at = new.created_at
  where id = new.enquiry_id;
  return new;
end;
$$;

drop trigger if exists enquiry_messages_touch_parent on public.enquiry_messages;
create trigger enquiry_messages_touch_parent
after insert on public.enquiry_messages
for each row execute function public.touch_enquiry_from_message();

create or replace function public.claim_buyer_enquiries()
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  claimed_count integer := 0;
  verified_email text := lower(coalesce(auth.jwt() ->> 'email', ''));
begin
  if auth.uid() is null or verified_email = '' then
    return 0;
  end if;

  update public.enquiries
    set buyer_user_id = auth.uid()
  where buyer_user_id is null
    and lower(buyer_email) = verified_email;

  get diagnostics claimed_count = row_count;
  return claimed_count;
end;
$$;

revoke all on function public.claim_buyer_enquiries() from public;
grant execute on function public.claim_buyer_enquiries() to authenticated;

alter table public.enquiries enable row level security;
alter table public.enquiry_messages enable row level security;

revoke all on public.enquiries from anon;
revoke all on public.enquiry_messages from anon;
grant select on public.enquiries to authenticated;
grant select, insert on public.enquiry_messages to authenticated;
grant all on public.enquiries to service_role;
grant all on public.enquiry_messages to service_role;

create policy "Buyers read their own enquiries"
on public.enquiries
for select
to authenticated
using (
  buyer_user_id = (select auth.uid())
  or (
    buyer_user_id is null
    and lower(buyer_email) = lower(coalesce((select auth.jwt() ->> 'email'), ''))
  )
);

create policy "Buyers read messages for their own enquiries"
on public.enquiry_messages
for select
to authenticated
using (
  exists (
    select 1
    from public.enquiries enquiry
    where enquiry.id = enquiry_messages.enquiry_id
      and (
        enquiry.buyer_user_id = (select auth.uid())
        or (
          enquiry.buyer_user_id is null
          and lower(enquiry.buyer_email) = lower(coalesce((select auth.jwt() ->> 'email'), ''))
        )
      )
  )
);

create policy "Buyers reply to their own enquiries"
on public.enquiry_messages
for insert
to authenticated
with check (
  sender_role = 'buyer'
  and lower(coalesce(sender_email, '')) = lower(coalesce((select auth.jwt() ->> 'email'), ''))
  and exists (
    select 1
    from public.enquiries enquiry
    where enquiry.id = enquiry_messages.enquiry_id
      and (
        enquiry.buyer_user_id = (select auth.uid())
        or (
          enquiry.buyer_user_id is null
          and lower(enquiry.buyer_email) = lower(coalesce((select auth.jwt() ->> 'email'), ''))
        )
      )
  )
);

insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'enquiry-files',
  'enquiry-files',
  false,
  10485760,
  array[
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'image/png',
    'image/jpeg'
  ]
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

-- The enquiry-files bucket intentionally has no anon or authenticated storage
-- policies. Portal downloads are issued as short-lived signed URLs only after
-- the application verifies that the authenticated buyer owns the enquiry.
