-- =============================================================
-- Timmo — schéma initial
-- Groupe A (stable)   : profiles, notifications, contact_messages
-- Groupe B (web3 候補) : properties, investments, wallet_transactions
--   → ces tables deviendront un miroir de l'état on-chain plus tard.
-- =============================================================

-- ========== profiles (stable) ==========
create table if not exists public.profiles (
    id          uuid primary key references auth.users (id) on delete cascade,
    first_name  text,
    last_name   text,
    phone       text,
    role        text not null default 'user' check (role in ('user', 'admin')),
    newsletter  boolean not null default true,
    created_at  timestamptz not null default now()
);

-- Crée automatiquement un profil à l'inscription d'un utilisateur
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
    insert into public.profiles (id, first_name, last_name, phone, newsletter)
    values (
        new.id,
        new.raw_user_meta_data ->> 'first_name',
        new.raw_user_meta_data ->> 'last_name',
        new.raw_user_meta_data ->> 'phone',
        coalesce((new.raw_user_meta_data ->> 'newsletter')::boolean, true)
    );
    return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute function public.handle_new_user();

-- ========== properties (web3 候補) ==========
create table if not exists public.properties (
    id              uuid primary key default gen_random_uuid(),
    name            text not null,
    location        text,
    image_url       text,
    property_type   text,
    surface         text,
    price_per_part  numeric(12, 2),
    total_shares    integer not null default 0,
    reserved_shares integer not null default 0,
    status          text not null default 'published'
                    check (status in ('draft', 'published', 'coming_soon', 'funded')),
    created_at      timestamptz not null default now()
);

-- ========== investments (web3 候補) ==========
create table if not exists public.investments (
    id              uuid primary key default gen_random_uuid(),
    user_id         uuid not null references auth.users (id) on delete cascade,
    property_id     uuid not null references public.properties (id) on delete restrict,
    shares          integer not null check (shares > 0),
    price_per_part  numeric(12, 2) not null,
    created_at      timestamptz not null default now()
);
create index if not exists investments_user_id_idx on public.investments (user_id);

-- ========== wallet_transactions (web3 候補) ==========
-- Le solde du portefeuille = somme des montants (pas de colonne "balance").
create table if not exists public.wallet_transactions (
    id          uuid primary key default gen_random_uuid(),
    user_id     uuid not null references auth.users (id) on delete cascade,
    type        text not null check (type in ('deposit', 'withdrawal', 'purchase', 'payout')),
    amount      numeric(12, 2) not null,
    status      text not null default 'completed'
                check (status in ('pending', 'completed', 'failed')),
    created_at  timestamptz not null default now()
);
create index if not exists wallet_tx_user_id_idx on public.wallet_transactions (user_id);

-- ========== notifications (stable) ==========
create table if not exists public.notifications (
    id          uuid primary key default gen_random_uuid(),
    user_id     uuid not null references auth.users (id) on delete cascade,
    title       text not null,
    body        text,
    read        boolean not null default false,
    created_at  timestamptz not null default now()
);
create index if not exists notifications_user_id_idx on public.notifications (user_id);

-- ========== contact_messages (stable) ==========
create table if not exists public.contact_messages (
    id          uuid primary key default gen_random_uuid(),
    user_id     uuid references auth.users (id) on delete set null,
    name        text not null,
    email       text not null,
    message     text not null,
    created_at  timestamptz not null default now()
);

-- =============================================================
-- Row Level Security
-- =============================================================
alter table public.profiles            enable row level security;
alter table public.properties          enable row level security;
alter table public.investments         enable row level security;
alter table public.wallet_transactions enable row level security;
alter table public.notifications       enable row level security;
alter table public.contact_messages    enable row level security;

-- profiles : chacun lit / modifie uniquement son profil
create policy "profiles_select_own" on public.profiles
    for select using (auth.uid() = id);
create policy "profiles_update_own" on public.profiles
    for update using (auth.uid() = id);

-- properties : visibles par tous (sauf brouillons)
create policy "properties_select_public" on public.properties
    for select using (status in ('published', 'coming_soon', 'funded'));

-- investments : chacun voit / crée uniquement ses investissements
create policy "investments_select_own" on public.investments
    for select using (auth.uid() = user_id);
create policy "investments_insert_own" on public.investments
    for insert with check (auth.uid() = user_id);

-- wallet_transactions : chacun voit / crée uniquement ses transactions
create policy "wallet_select_own" on public.wallet_transactions
    for select using (auth.uid() = user_id);
create policy "wallet_insert_own" on public.wallet_transactions
    for insert with check (auth.uid() = user_id);

-- notifications : chacun voit / met à jour uniquement les siennes
create policy "notifications_select_own" on public.notifications
    for select using (auth.uid() = user_id);
create policy "notifications_update_own" on public.notifications
    for update using (auth.uid() = user_id);

-- contact_messages : tout le monde peut envoyer un message
create policy "contact_insert_any" on public.contact_messages
    for insert with check (true);
