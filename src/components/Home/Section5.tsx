'use client';

import { Button, Link } from '@mui/material';
import Image from 'next/image';
import '@/styles/home/section5.scss';
import { useEffect, useState, useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
const properties = [
    {
        id: '1',
        image: '/elegant-paris-apartment-building-facade-rue-fabert.jpg',
        title: 'INVALIDES',
        location: 'Paris 7ème',
        pricePerShare: '10€',
        surface: '90m²',
        type: 'Para-hôtellerie',
        returnRate: '10%',
        horizon: '8 ans',
        amountRaised: 0,
        objective: 497000,
        comingSoon: true
    },
    {
        id: '2',
        image: '/interior.jpg',
        title: 'Villa Méditerranée',
        location: 'Nice',
        pricePerShare: '15€',
        surface: '120m²',
        type: 'Résidentiel',
        returnRate: '8%',
        horizon: '5 ans',
        amountRaised: 0,
        objective: 300000,
        comingSoon: true
    },
    {
        id: '3',
        image: '/exterior.jpg',
        title: 'Appartement Haussmannien',
        location: 'Paris 8ème',
        pricePerShare: '12€',
        surface: '85m²',
        type: 'Résidentiel',
        returnRate: '9%',
        horizon: '6 ans',
        amountRaised: 0,
        objective: 400000,
        comingSoon: true
    }
];

export default function Section5() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cardsPerView, setCardsPerView] = useState(1);
    const router = useRouter();

    useLayoutEffect(() => {
        const getCardsPerView = () => {
            if (window.innerWidth < 768) return 1;
            if (window.innerWidth < 1024) return 2;
            return 3;
        };

        const handleResize = () => {
            setCardsPerView(getCardsPerView());
        };

        // Set initial value
        setCardsPerView(getCardsPerView());

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const maxIndex = Math.max(0, properties.length - cardsPerView);

    const nextSlide = () => {
        setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
    };
    return (
        <section id="nos-biens" className="section5">
            <div className="container">
                <div className="section5-header">
                    <div className="left">
                        <div className="section-label">
                            <BookOpen className="h-5 w-5" />
                            <span>Catalogue</span>
                        </div>
                        <h2>Performances de nos biens</h2>
                        <p className="disclaimer">
                            *Les performances passées ne présument pas des
                            performances futures
                        </p>
                    </div>
                    <Button variant="outlined" className="explore-button">
                        Explorer tous les biens
                    </Button>
                </div>

                <div className="carousel-wrapper">
                    {/* Carousel Container */}
                    <div className="carousel-container">
                        <div
                            className="carousel-track"
                            style={{
                                transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`
                            }}
                        >
                            {properties.map((property) => {
                                return (
                                    <div
                                        key={property.id}
                                        className="property-card"
                                    >
                                        <Link
                                            href={`/property/${property.id}`}
                                            className="card-link"
                                        >
                                            <div className="image-section">
                                                <Image
                                                    src={
                                                        property.image ||
                                                        '/placeholder.svg'
                                                    }
                                                    alt={property.title}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                />
                                                <div className="price-badge">
                                                    {property.pricePerShare}{' '}
                                                    /PART
                                                </div>

                                                {property.comingSoon && (
                                                    <div className="coming-soon-overlay">
                                                        <div className="badge">
                                                            À venir
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="info-section">
                                                <h3>{property.title}</h3>

                                                <div className="progress-wrapper">
                                                    <div className="progress-bar">
                                                        <div
                                                            className="progress-fill"
                                                            style={{
                                                                width: `${Math.min((property.amountRaised / property.objective) * 100, 100)}%`
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="progress-text">
                                                        <span className="raised">
                                                            {property.amountRaised.toLocaleString(
                                                                'fr-FR'
                                                            )}{' '}
                                                            €
                                                        </span>
                                                        <span className="objective">
                                                            sur{' '}
                                                            {property.objective.toLocaleString(
                                                                'fr-FR'
                                                            )}{' '}
                                                            €
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="bottom-row">
                                                    <div className="badges">
                                                        <span className="badge">
                                                            {property.location}
                                                        </span>
                                                        <span className="badge">
                                                            {property.type}
                                                        </span>
                                                        <span className="badge">
                                                            {property.surface}
                                                        </span>
                                                    </div>

                                                    <Button
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            router.push(
                                                                '/newsletter'
                                                            );
                                                        }}
                                                        variant="filled-dark"
                                                        className="invest-button"
                                                    >
                                                        Investir
                                                    </Button>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Navigation Controls */}
                    {properties.length > cardsPerView && (
                        <div className="navigation">
                            {/* Dots */}
                            <div className="dots">
                                {Array.from({ length: maxIndex + 1 }).map(
                                    (_, index) => (
                                        <button
                                            key={index}
                                            onClick={() =>
                                                setCurrentIndex(index)
                                            }
                                            className={`dot ${index === currentIndex ? 'active' : ''}`}
                                            aria-label={`Go to slide ${index + 1}`}
                                        />
                                    )
                                )}
                            </div>

                            {/* Arrow Buttons */}
                            <div className="arrows">
                                <button
                                    onClick={prevSlide}
                                    disabled={currentIndex === 0}
                                    className="arrow-button"
                                    aria-label="Previous slide"
                                >
                                    <ChevronLeft />
                                </button>
                                <button
                                    onClick={nextSlide}
                                    disabled={currentIndex === maxIndex}
                                    className="arrow-button"
                                    aria-label="Next slide"
                                >
                                    <ChevronRight />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
