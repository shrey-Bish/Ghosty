create extension if not exists "pgcrypto";

create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  name text not null,
  date date not null,
  location text,
  total_capital_value numeric,
  created_at timestamptz default now()
);

create table if not exists contacts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  name text not null,
  company text,
  role text,
  intent_tag text check (intent_tag in ('recruiting','mentor','collaborator','amplifier','peer')),
  context_snippet text,
  key_details jsonb default '[]'::jsonb,
  follow_up_date date,
  value_score numeric(3,1),
  value_breakdown jsonb default '[]'::jsonb,
  estimated_career_value numeric,
  salary_band jsonb,
  voice_memo_url text,
  transcription text,
  followed_up_at timestamptz,
  event_id uuid references events(id),
  created_at timestamptz default now()
);

create table if not exists follow_up_drafts (
  id uuid primary key default gen_random_uuid(),
  contact_id uuid references contacts(id) on delete cascade,
  type text check (type in ('linkedin','email','cover_letter')),
  content text not null,
  sent_at timestamptz,
  created_at timestamptz default now()
);

alter table events enable row level security;
alter table contacts enable row level security;
alter table follow_up_drafts enable row level security;

create policy "users own their events" on events
  for all using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "users own their contacts" on contacts
  for all using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "users own drafts through contacts" on follow_up_drafts
  for all using (
    exists (
      select 1 from contacts
      where contacts.id = follow_up_drafts.contact_id
      and contacts.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from contacts
      where contacts.id = follow_up_drafts.contact_id
      and contacts.user_id = auth.uid()
    )
  );
