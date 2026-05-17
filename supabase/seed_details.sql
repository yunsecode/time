-- Contenu détaillé des biens de démonstration.
-- Dollar-quoting ($d$ / $j$) pour éviter d'échapper les apostrophes françaises.

-- ===== Appartement Haussmannien (Paris 7e) =====
update public.properties set
    description = $d$Cet appartement haussmannien de 85 m² situé dans le 7e arrondissement de Paris allie le charme de l'ancien — moulures, parquet en point de Hongrie, hauteur sous plafond de 3,2 m — à une rénovation complète. À quelques minutes de la Tour Eiffel et du Champ-de-Mars, c'est un investissement patrimonial d'exception.$d$,
    annual_yield = 4.2,
    details = $j$
{
  "highlights": {
    "title": "Pourquoi le 7e arrondissement ?",
    "intro": "Le 7e est l'un des secteurs les plus prisés et les plus stables de la capitale.",
    "items": [
      { "title": "Emplacement prestigieux", "text": "À deux pas de la Tour Eiffel, des Invalides et du musée d'Orsay." },
      { "title": "Marché ultra-stable", "text": "Demande locative constante, taux de vacance quasi nul." },
      { "title": "Valeur refuge", "text": "L'immobilier parisien résiste durablement aux cycles économiques." },
      { "title": "Forte demande locative", "text": "Cadres, diplomates et expatriés recherchent ce quartier." }
    ]
  },
  "investment": {
    "intro": "Détail des coûts d'acquisition de ce bien.",
    "items": [
      { "label": "Prix d'acquisition", "value": "950 000 €" },
      { "label": "Frais de notaire", "value": "+71 250 €" },
      { "label": "Travaux de rénovation", "value": "+45 000 €" },
      { "label": "Commission Timmo", "value": "+28 500 €" },
      { "label": "Coût total", "value": "1 094 750 €" }
    ]
  },
  "resale": [
    { "label": "Prudent (+15 %)", "value": "~1 092 500 €", "note": "(+142 k€)" },
    { "label": "Médian (+25 %)", "value": "~1 187 500 €", "note": "(+237 k€)" },
    { "label": "Favorable (+35 %)", "value": "~1 282 500 €", "note": "(+332 k€)" }
  ],
  "market": {
    "intro": "Tendances récentes du marché immobilier parisien.",
    "items": [
      { "title": "Prix moyen au m²", "value": "10 500 €", "note": "Paris 7e" },
      { "title": "Taux d'occupation locative", "value": "> 97 %", "note": "" },
      { "title": "Rendement locatif net", "value": "3,5 – 4,5 %", "note": "" },
      { "title": "Évolution sur 10 ans", "value": "+38 %", "note": "" }
    ]
  },
  "gallery": [
    "/elegant-paris-apartment-building-facade-rue-fabert.jpg",
    "/modern-minimalist-house-interior-with-large-window.jpg"
  ]
}
$j$::jsonb
where name = 'Appartement Haussmannien';

-- ===== Maison Contemporaine (Bordeaux) =====
update public.properties set
    description = $d$Cette maison contemporaine de 140 m² à Bordeaux, livrée en 2022, offre des prestations haut de gamme : grandes baies vitrées, jardin paysager et performance énergétique A. Un marché porteur, dynamisé par la LGV et l'attractivité croissante du Sud-Ouest.$d$,
    annual_yield = 5.8,
    details = $j$
{
  "highlights": {
    "title": "Pourquoi Bordeaux ?",
    "intro": "Bordeaux figure parmi les villes françaises les plus dynamiques et les plus recherchées.",
    "items": [
      { "title": "À 2h de Paris", "text": "La LGV a rapproché Bordeaux et renforcé son attractivité." },
      { "title": "Qualité de vie", "text": "Classée régulièrement parmi les villes où il fait bon vivre." },
      { "title": "Demande soutenue", "text": "Population étudiante et jeunes actifs en forte croissance." },
      { "title": "Marché porteur", "text": "Valorisation régulière du neuf et de l'ancien rénové." }
    ]
  },
  "investment": {
    "intro": "Détail des coûts d'acquisition de ce bien.",
    "items": [
      { "label": "Prix d'acquisition", "value": "560 000 €" },
      { "label": "Frais de notaire", "value": "+14 000 €" },
      { "label": "Ameublement", "value": "+18 000 €" },
      { "label": "Commission Timmo", "value": "+16 800 €" },
      { "label": "Coût total", "value": "608 800 €" }
    ]
  },
  "resale": [
    { "label": "Prudent (+18 %)", "value": "~660 800 €", "note": "(+52 k€)" },
    { "label": "Médian (+28 %)", "value": "~716 800 €", "note": "(+108 k€)" },
    { "label": "Favorable (+38 %)", "value": "~772 800 €", "note": "(+164 k€)" }
  ],
  "market": {
    "intro": "Tendances récentes du marché immobilier bordelais.",
    "items": [
      { "title": "Prix moyen au m²", "value": "4 900 €", "note": "Bordeaux" },
      { "title": "Taux d'occupation locative", "value": "> 93 %", "note": "" },
      { "title": "Rendement locatif net", "value": "4,5 – 6 %", "note": "" },
      { "title": "Évolution sur 10 ans", "value": "+52 %", "note": "" }
    ]
  },
  "gallery": [
    "/modern-contemporary-house-exterior-with-clean-line.jpg",
    "/interior.jpg"
  ]
}
$j$::jsonb
where name = 'Maison Contemporaine';

-- ===== Bien à venir =====
update public.properties set
    description = $d$Un nouveau bien arrive prochainement sur Timmo. Inscrivez-vous pour être informé en avant-première de son ouverture à l'investissement.$d$
where name = 'Bien à venir';
