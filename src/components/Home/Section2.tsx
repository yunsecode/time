'use client';

import { ArrowRight, ArrowLeft } from '@mui/icons-material';
import { Button } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import '@/styles/home/section2.scss';

// Icon components (you'll need to install lucide-react or use MUI icons)
// import { Eye, CreditCard, Lock, Leaf, PiggyBank } from 'lucide-react';

export default function Section2() {
    return (
        <section className="section2">
            <div className="grid-container">
                {/* Left Content */}
                <div className="left-content">
                    <div className="section-label">
                        {/* <Eye /> */}
                        <span>Qu&apos;est-ce que c&apos;est ?</span>
                    </div>

                    <div className="title-wrapper">
                        <h2>TIMMO simplifie</h2>
                        <h2>l&apos;investissement immobilier</h2>
                    </div>

                    <p className="description">
                        <span className="highlight">Notre objectif ?</span>{' '}
                        Rendre l&apos;investissement immobilier plus accessible
                        en divisant la propriété d&apos;un bien immobilier en
                        petites parts numériques. Ainsi, vous pouvez commencer
                        par acheter une petite part, au lieu de devoir acquérir
                        un immeuble entier.
                    </p>

                    <div className="features-grid">
                        <div className="feature-item">
                            <div className="icon-wrapper">
                                {/* <CreditCard /> */}
                            </div>
                            <div>
                                <p className="feature-text">
                                    Accessibilité Financière ( Dès 10€ )
                                </p>
                            </div>
                        </div>

                        <div className="feature-item">
                            <div className="icon-wrapper">
                                <div className="arrow-group">
                                    <ArrowLeft />
                                    <ArrowRight />
                                </div>
                            </div>
                            <div>
                                <p className="feature-text">
                                    Achetez et revendez facilement
                                </p>
                            </div>
                        </div>

                        <div className="feature-item">
                            <div className="icon-wrapper">{/* <Lock /> */}</div>
                            <div>
                                <p className="feature-text">
                                    Gestion transparente et sécurisée
                                </p>
                            </div>
                        </div>

                        <div className="feature-item">
                            <div className="icon-wrapper">{/* <Leaf /> */}</div>
                            <div>
                                <p className="feature-text">
                                    Pas de tracas de Gestion
                                </p>
                            </div>
                        </div>

                        <div className="feature-item">
                            <div className="icon-wrapper">
                                {/* <PiggyBank /> */}
                            </div>
                            <div>
                                <p className="feature-text">
                                    Créez vous des revenus passifs
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Content - Phone Mockup */}
                <div className="phone-mockup">
                    <div className="phone-frame">
                        <div className="phone-notch"></div>

                        <div className="app-content">
                            <div className="app-content-header">
                                <div className="header-bar">
                                    <Image
                                        src="/timmo-icon.svg"
                                        alt="TIMMO"
                                        width={24}
                                        height={24}
                                    />
                                    <div className="avatar">
                                        <span>JD</span>
                                    </div>
                                </div>
                            </div>

                            <div className="content">
                                <div className="portfolio-card">
                                    <div className="label">
                                        Valeur totale du portefeuille
                                    </div>
                                    <div className="value">2 450€</div>
                                    <div className="details">
                                        <span className="stats">
                                            12 parts • 3 propriétés
                                        </span>
                                        <span className="badge">+12.5%</span>
                                    </div>
                                </div>

                                <div className="stats-grid">
                                    <div className="stat-item">
                                        <div className="stat-label">
                                            Revenus mensuels
                                        </div>
                                        <div className="stat-value">48€</div>
                                    </div>
                                    <div className="stat-item">
                                        <div className="stat-label">
                                            Rendement
                                        </div>
                                        <div className="stat-value">8.2%</div>
                                    </div>
                                </div>

                                <div className="investments-section">
                                    <h3>Mes investissements</h3>
                                    <div className="investments-list">
                                        <div className="investment-card">
                                            <div className="image-wrapper">
                                                <Image
                                                    src="/exterior.jpg"
                                                    alt="Property"
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                />
                                                <div className="badge">
                                                    5 parts
                                                </div>
                                            </div>
                                            <div className="card-content">
                                                <h4>Villa Moderne</h4>
                                                <div className="card-details">
                                                    <span className="location">
                                                        Paris • 120m²
                                                    </span>
                                                    <span className="performance">
                                                        +15%
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="investment-card">
                                            <div className="image-wrapper">
                                                <Image
                                                    src="/interior.jpg"
                                                    alt="Property"
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                />
                                                <div className="badge">
                                                    7 parts
                                                </div>
                                            </div>
                                            <div className="card-content">
                                                <h4>Appartement Centre</h4>
                                                <div className="card-details">
                                                    <span className="location">
                                                        Lyon • 40m²
                                                    </span>
                                                    <span className="performance">
                                                        +10%
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Link href="/dashboard">
                                    <Button variant="filled-dark" fullWidth>
                                        Voir mon dashboard
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
