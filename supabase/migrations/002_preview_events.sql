create table if not exists preview_events (
  id uuid primary key default gen_random_uuid(),
  attribution_id text not null,
  event text not null check (event in (
    'preview_generated',
    'preview_sent',
    'preview_viewed',
    'cta_clicked',
    'sales_page_viewed',
    'checkout_started',
    'payment_succeeded',
    'onboarding_completed'
  )),
  event_key text not null unique,
  path text,
  created_at timestamptz not null default now()
);

create index if not exists idx_preview_events_attribution on preview_events (attribution_id, created_at desc);

create table if not exists rate_limits (
  bucket text primary key,
  count integer not null,
  window_start timestamptz not null
);

alter table client_previews enable row level security;
alter table preview_events enable row level security;
alter table rate_limits enable row level security;

revoke all on table client_previews from anon, authenticated;
revoke all on table preview_events from anon, authenticated;
revoke all on table rate_limits from anon, authenticated;

drop trigger if exists update_client_previews_updated_at on client_previews;
create trigger update_client_previews_updated_at
  before update on client_previews
  for each row
  execute function update_updated_at_column();
