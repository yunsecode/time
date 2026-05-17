-- Champs détaillés des biens immobiliers (page de détail enrichie).
-- description / annual_yield : structurés.
-- details (jsonb) : contenu éditorial flexible —
--   highlights (pourquoi cette ville), investment (détail des coûts),
--   resale (scénarios de revente), market (tendances), gallery (images).
alter table public.properties
    add column if not exists description  text;
alter table public.properties
    add column if not exists annual_yield numeric(5, 2);
alter table public.properties
    add column if not exists details      jsonb;
