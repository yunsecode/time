'use client';

import { ArrowRight } from '@mui/icons-material';
import { Button, Link } from '@mui/material';
import Image from 'next/image';
import '@/styles/home/section4.scss';

export default function Section4() {
    return (
        <section className="section4">
            <div className="section4-header">
                <div className="section-label">
                    {/* <Heart className="h-5 w-5" /> */}
                    <span>Avantages</span>
                </div>

                <h2>
                    Pourquoi choisir TIMMO pour vos investissements immobiliers
                    ?
                </h2>

                <p className="description">
                    Découvrez comment TIMMO modernise l&apos;investissement
                    immobilier traditionnel pour vous.
                </p>
            </div>

            <div className="grid-container">
                {/* Left Column - Two stacked cards */}
                <div className="left-column">
                    {/* Card 1 - Notre service s'adapte */}
                    <div className="card green">
                        <div className="icon-wrapper">
                            {/* <Coins className="h-6 w-6 md:h-7 md:w-7 text-[#0F1729]" /> */}
                        </div>

                        <div>
                            <h3>
                                Notre service s&apos;adapte à vos liquidités
                            </h3>
                            <p>
                                Investissez et revendez en toute simplicité :
                                TIMMO démocratise l&apos;immobilier avec des
                                investissements à partir de 10€ et une liquidité
                                accrue grâce à la revente sur notre marché
                                secondaire.
                            </p>
                        </div>
                    </div>

                    {/* Card 2 - Une fiscalité avantageuse */}
                    <div className="card gray">
                        <div className="icon-wrapper">
                            {/* <FileText className="h-6 w-6 md:h-7 md:w-7 text-[#0F1729]" /> */}
                        </div>

                        <div>
                            <h3>Une fiscalité avantageuse</h3>
                            <p>
                                Profitez d&apos;une fiscalité avantageuse avec
                                seulement 30% de flat tax sur les plus-values.
                                Les investissements via TIMMO ne sont pas soumis
                                à l&apos;impôt sur la fortune immobilière !
                            </p>
                            <button className="cta-button">
                                Qu&apos;est ce que la flat tax ?
                                <div className="arrow-circle">
                                    <ArrowRight />
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Column - Large security card */}
                <div className="right-column">
                    <div className="security-card">
                        <div className="content-wrapper">
                            {/* Image hidden on mobile, shown on tablet/desktop */}
                            <div className="image-wrapper">
                                <div className="image-container">
                                    <Image
                                        src="/security-phone.jpg"
                                        alt="Sécurité"
                                        fill
                                    />
                                </div>
                            </div>

                            <div className="text-content">
                                <h3>Transparent et Sécurisé</h3>
                                <p>
                                    TIMMO utilise une technologie et un modèle
                                    innovant pour assurer la sécurité de vos
                                    investissements. Suivez en temps réel les
                                    performances de vos actifs et effectuez des
                                    transactions en toute sécurité.
                                </p>

                                <div className="buttons">
                                    {/* <Link href="/onboarding">
                                        <Button variant="filled">
                                            Contacter un conseiller
                                            <ArrowRight />
                                        </Button>
                                    </Link> */}
                                    <a
                                        href="https://calendly.com/dan-calvo-timmo/rendez-vous-decouverte-timmo"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {/* <Button variant="ghost">
                                            Comment ça marche ?
                                            <ArrowRight />
                                        </Button> */}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
