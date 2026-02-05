'use client';

import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import '@/styles/home/section3.scss';

interface Card {
    id: number;
    icon: React.ReactNode;
    title: string;
    description: string;
    bg: 'blue' | 'light-green' | 'green' | 'dark';
    iconBg: 'white-20' | 'white-70' | 'white-10';
}

const cards: Card[] = [
    {
        id: 1,
        icon: (
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
            </svg>
        ),
        title: 'Créer votre Compte en quelques clics',
        description:
            'Remplissez notre formulaire, et validez votre identité en quelques clics !',
        bg: 'blue',
        iconBg: 'white-20'
    },
    {
        id: 2,
        icon: (
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
        ),
        title: 'Déposer votre Capital',
        description:
            "Déposez uniquement le montant que vous souhaitez investir ! Une manière sûre de répondre à vos objectifs financiers, tout en respectant vos possibilités d'épargne.",
        bg: 'light-green',
        iconBg: 'white-70'
    },
    {
        id: 3,
        icon: (
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
            </svg>
        ),
        title: 'Investissez dans notre catalogue de biens',
        description:
            'Choisissez le bien immobilier qui correspond le mieux à vos préférences et investissez en quelques clics !',
        bg: 'green',
        iconBg: 'white-70'
    },
    {
        id: 4,
        icon: (
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
            </svg>
        ),
        title: 'Recevez vos loyers',
        description:
            'Chaque mois, vous percevez vos revenus passifs directement dans votre portefeuil Timmo. Ré-investissez les, ou bien profitez-en !',
        bg: 'dark',
        iconBg: 'white-10'
    }
];

export function Section3() {
    return (
        <section className="section3">
            <div className="container">
                <div className="grid-container">
                    <div className="left-content">
                        <div className="section-label">
                            <span>Comment ça marche ?</span>
                        </div>

                        <h2>Comment investir grâce à TIMMO ?</h2>

                        <p className="description">
                            La tokenisation immobilière permet d&apos;acheter
                            des parts numériques (tokens) d&apos;un bien
                            immobilier, à partir de 10 euros rendant
                            l&apos;investissement accessible à tous. Chaque
                            token représente une fraction de propriété,
                            démocratisant ainsi un secteur auparavant réservé
                            aux investisseurs avec des capitaux importants.
                        </p>

                        <div className="buttons-wrapper">
                            {/* Buttons here */}
                        </div>
                    </div>

                    <div className="cards-container">
                        <div className="cards-stack">
                            {cards.map((card, index) => (
                                <div
                                    key={card.id}
                                    className="card"
                                    data-bg={card.bg}
                                >
                                    <div
                                        className="icon-wrapper"
                                        data-icon-bg={card.iconBg}
                                    >
                                        {card.icon}
                                    </div>
                                    <h3 className="card-title">{card.title}</h3>
                                    <p className="card-description">
                                        {card.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
