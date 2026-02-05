'use client';

import { ArrowRight } from '@mui/icons-material';
import { Button } from '@mui/material';
import Image from 'next/image';
import '@/styles/home/section1.scss';

export default function Section1() {
    return (
        <section className="section1">
            <div className="container">
                <div className="content-wrapper">
                    {/* Left side content */}
                    <div className="left-content">
                        <h1 className="title">
                            DÉCOUVREZ
                            <br />
                            L&apos;INVESTISSEMENT
                            <br />
                            <span className="badge-line">
                                À PARTS
                                <span className="price-badge">DÈS 10€</span>
                            </span>
                        </h1>

                        <p className="description">
                            Accédez à des opportunités d&apos;investissement
                            immobilier durables. Construisez votre patrimoine
                            progressivement, à votre rythme et selon votre
                            budget.
                        </p>

                        <div className="button-group">
                            <Button
                                variant="filled-dark"
                                onClick={() =>
                                    (window.location.href = '/newsletter')
                                }
                                endIcon={<ArrowRight />}
                            >
                                Accédez en avant-première
                            </Button>
                            <Button
                                variant="filled-light"
                                onClick={() =>
                                    (window.location.href = '/newsletter')
                                }
                            >
                                Rendez-vous découverte
                            </Button>
                        </div>
                    </div>

                    {/* Desktop images */}
                    <div className="images-desktop">
                        <div className="image-wrapper">
                            <Image
                                src="/modern-minimalist-house-interior-with-large-window.jpg"
                                alt="Modern Interior"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="image-wrapper">
                            <Image
                                src="/modern-contemporary-house-exterior-with-clean-line.jpg"
                                alt="Modern Exterior"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    {/* Tablet images */}
                    <div className="images-tablet">
                        <div className="image-wrapper">
                            <Image
                                src="/modern-minimalist-house-interior-with-large-window.jpg"
                                alt="Modern Interior"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="image-wrapper">
                            <Image
                                src="/modern-contemporary-house-exterior-with-clean-line.jpg"
                                alt="Modern Exterior"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    {/* Mobile image */}
                    <div className="images-mobile">
                        <div className="image-wrapper">
                            <Image
                                src="/modern-minimalist-house-interior-with-large-window.jpg"
                                alt="Modern Interior"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>

                <div className="press-section">
                    <p className="press-title">ILS PARLENT DE NOUS</p>
                    <div className="press-carousel">
                        <div className="carousel-track">
                            <div className="logo-group">
                                <Image
                                    src="/le-parisien-logo.png"
                                    alt="Le Parisien"
                                    width={140}
                                    height={40}
                                />
                                <Image
                                    src="/le-monde-logo.png"
                                    alt="Le Monde"
                                    width={160}
                                    height={40}
                                    className="le-monde"
                                />
                                <Image
                                    src="/le-figaro-magazine-logo.png"
                                    alt="Le Figaro Magazine"
                                    width={140}
                                    height={50}
                                    className="le-figaro"
                                />
                                <Image
                                    src="/bfm-business-logo.png"
                                    alt="BFM Business"
                                    width={120}
                                    height={40}
                                    className="bfm"
                                />
                                <Image
                                    src="/entrepreneur-logo.png"
                                    alt="Entrepreneur"
                                    width={180}
                                    height={40}
                                />
                                <Image
                                    src="/inc-logo.png"
                                    alt="Inc."
                                    width={120}
                                    height={40}
                                    className="inc"
                                />
                            </div>
                            {/* Duplicate for seamless loop */}
                            <div className="logo-group">
                                <Image
                                    src="/le-parisien-logo.png"
                                    alt="Le Parisien"
                                    width={140}
                                    height={40}
                                />
                                <Image
                                    src="/le-monde-logo.png"
                                    alt="Le Monde"
                                    width={160}
                                    height={40}
                                    className="le-monde"
                                />
                                <Image
                                    src="/le-figaro-magazine-logo.png"
                                    alt="Le Figaro Magazine"
                                    width={140}
                                    height={50}
                                    className="le-figaro"
                                />
                                <Image
                                    src="/bfm-business-logo.png"
                                    alt="BFM Business"
                                    width={120}
                                    height={40}
                                    className="bfm"
                                />
                                <Image
                                    src="/entrepreneur-logo.png"
                                    alt="Entrepreneur"
                                    width={180}
                                    height={40}
                                />
                                <Image
                                    src="/inc-logo.png"
                                    alt="Inc."
                                    width={120}
                                    height={40}
                                    className="inc"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
