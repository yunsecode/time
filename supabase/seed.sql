-- Données de démonstration — biens immobiliers.
-- Idempotent : insère uniquement si la table est vide.
do $$
begin
    if not exists (select 1 from public.properties) then
        insert into public.properties
            (name, location, image_url, property_type, surface,
             price_per_part, total_shares, reserved_shares, status)
        values
            ('Appartement Haussmannien', 'Paris 7e',
             '/elegant-paris-apartment-building-facade-rue-fabert.jpg',
             'Appartement', '85 m²', 10, 5000, 3200, 'published'),
            ('Maison Contemporaine', 'Bordeaux',
             '/modern-contemporary-house-exterior-with-clean-line.jpg',
             'Maison', '140 m²', 25, 8000, 1500, 'published'),
            ('Bien à venir', '--',
             '/modern-minimalist-house-interior-with-large-window.jpg',
             null, '--', null, 0, 0, 'coming_soon');
    end if;
end $$;
