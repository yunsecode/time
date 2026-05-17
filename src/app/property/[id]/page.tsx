import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { getProperty } from '@/lib/services/properties';
import '@/styles/property.scss';

export default async function PropertyPage({
    params
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const supabase = await createClient();
    const property = await getProperty(supabase, id);

    if (!property) notFound();

    const comingSoon = property.status === 'coming_soon';
    const pricePerPart = Number(property.price_per_part) || 0;
    const totalShares = property.total_shares;
    const remaining = totalShares - property.reserved_shares;
    const totalPrice = pricePerPart * totalShares;
    const progress =
        totalShares > 0 ? (property.reserved_shares / totalShares) * 100 : 0;

    const statusLabel =
        property.status === 'published'
            ? 'Disponible'
            : property.status === 'funded'
              ? 'Financé'
              : comingSoon
                ? 'À venir'
                : 'Brouillon';

    const fmt = (n: number) => n.toLocaleString('fr-FR');
    const details = property.details;
    const description =
        property.description ??
        `${property.name} est une opportunité d'investissement${
            property.location ? ` située à ${property.location}` : ''
        }.`;

    return (
        <div className="property-page">
            {/* Header */}
            <header className="property-header">
                <nav className="property-nav">
                    <Link href="/">
                        <Image
                            src="/timmo-logo.svg"
                            alt="Timmo"
                            width={140}
                            height={40}
                        />
                    </Link>
                    <Link href="/dashboard" className="nav-dash-link">
                        Tableau de bord
                    </Link>
                </nav>
            </header>

            {/* Hero */}
            <section className="property-hero">
                <div className="property-hero-inner">
                    <Link href="/dashboard" className="back-link">
                        <ArrowLeft />
                        Retour au tableau de bord
                    </Link>

                    <div className="property-grid">
                        <div className="property-image">
                            <Image
                                src={property.image_url || '/interior.jpg'}
                                alt={property.name}
                                fill
                                sizes="(max-width: 900px) 100vw, 50vw"
                            />
                        </div>

                        <div className="property-info">
                            <span
                                className={`status-badge ${
                                    comingSoon ? 'is-soon' : ''
                                }`}
                            >
                                {statusLabel}
                            </span>

                            <h1>{property.name}</h1>

                            <div className="info-tags">
                                {property.location && (
                                    <span>{property.location}</span>
                                )}
                                {property.property_type && (
                                    <span>{property.property_type}</span>
                                )}
                                {property.surface && (
                                    <span>{property.surface}</span>
                                )}
                            </div>

                            <p className="property-desc">{description}</p>

                            <div className="property-stats">
                                <div className="stat">
                                    <p className="stat-key">Prix total</p>
                                    <p className="stat-value">
                                        {comingSoon
                                            ? '--'
                                            : `${fmt(totalPrice)} €`}
                                    </p>
                                </div>
                                <div className="stat">
                                    <p className="stat-key">Prix par part</p>
                                    <p className="stat-value">
                                        {comingSoon
                                            ? '--'
                                            : `${fmt(pricePerPart)} €`}
                                    </p>
                                </div>
                                <div className="stat">
                                    <p className="stat-key">Rentabilité</p>
                                    <p className="stat-value">
                                        {property.annual_yield
                                            ? `${property.annual_yield} % / an`
                                            : '--'}
                                    </p>
                                </div>
                                <div className="stat">
                                    <p className="stat-key">
                                        Parts disponibles
                                    </p>
                                    <p className="stat-value">
                                        {comingSoon ? '--' : fmt(remaining)}
                                    </p>
                                </div>
                            </div>

                            {!comingSoon && (
                                <div className="property-shares">
                                    <div className="shares-head">
                                        <span className="shares-key">
                                            Parts réservées
                                        </span>
                                        <span className="shares-value">
                                            {fmt(property.reserved_shares)} /{' '}
                                            {fmt(totalShares)}
                                        </span>
                                    </div>
                                    <div className="shares-bar">
                                        <div
                                            className="shares-fill"
                                            style={{
                                                width: `${progress}%`
                                            }}
                                        />
                                    </div>
                                    <p className="shares-left">
                                        {fmt(remaining)} parts disponibles
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Sections détaillées */}
            <div className="property-body">
                {/* Pourquoi cette ville */}
                {details?.highlights?.items &&
                    details.highlights.items.length > 0 && (
                        <section className="property-section">
                            <h2>
                                {details.highlights.title ?? 'Points forts'}
                            </h2>
                            {details.highlights.intro && (
                                <p className="section-intro">
                                    {details.highlights.intro}
                                </p>
                            )}
                            <div className="highlight-grid">
                                {details.highlights.items.map((h, i) => (
                                    <div key={i} className="highlight-card">
                                        <h3>{h.title}</h3>
                                        <p>{h.text}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                {/* L'investissement */}
                {details?.investment?.items &&
                    details.investment.items.length > 0 && (
                        <section className="property-section">
                            <h2>L&apos;investissement</h2>
                            {details.investment.intro && (
                                <p className="section-intro">
                                    {details.investment.intro}
                                </p>
                            )}
                            <div className="fact-list">
                                {details.investment.items.map((f, i) => (
                                    <div
                                        key={i}
                                        className={`fact-row ${
                                            i ===
                                            details.investment!.items!.length -
                                                1
                                                ? 'is-total'
                                                : ''
                                        }`}
                                    >
                                        <span>{f.label}</span>
                                        <span>{f.value}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                {/* Scénarios de revente */}
                {details?.resale && details.resale.length > 0 && (
                    <section className="property-section">
                        <h2>Scénarios de revente (à 5 ans)</h2>
                        <div className="resale-grid">
                            {details.resale.map((r, i) => (
                                <div
                                    key={i}
                                    className={`resale-card ${
                                        i === 1 ? 'is-featured' : ''
                                    }`}
                                >
                                    <h3>{r.label}</h3>
                                    <p className="resale-value">{r.value}</p>
                                    {r.note && (
                                        <p className="resale-note">{r.note}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Tendances du marché */}
                {details?.market?.items && details.market.items.length > 0 && (
                    <section className="property-section">
                        <h2>Tendances du marché</h2>
                        {details.market.intro && (
                            <p className="section-intro">
                                {details.market.intro}
                            </p>
                        )}
                        <div className="market-grid">
                            {details.market.items.map((m, i) => (
                                <div key={i} className="market-card">
                                    <h3>{m.title}</h3>
                                    <p className="market-value">{m.value}</p>
                                    {m.note && (
                                        <p className="market-note">{m.note}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Galerie */}
                {details?.gallery && details.gallery.length > 0 && (
                    <section className="property-section">
                        <h2>Galerie</h2>
                        <div className="gallery-grid">
                            {details.gallery.map((src, i) => (
                                <div key={i} className="gallery-item">
                                    <Image
                                        src={src}
                                        alt={`${property.name} ${i + 1}`}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                <div className="property-footer-cta">
                    <Link href="/dashboard" className="property-cta">
                        Retour au tableau de bord
                        <ArrowRight />
                    </Link>
                </div>
            </div>
        </div>
    );
}
