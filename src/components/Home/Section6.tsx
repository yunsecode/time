'use client';

import { ArrowRight } from '@mui/icons-material';
import { Button, Link } from '@mui/material';
import Image from 'next/image';
import '@/styles/home/section6.scss';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface FAQItem {
    question: string;
    answer: string;
}

export default function Section6() {
    const [openIndex, setOpenIndex] = useState<number>(0);

    const faqs: FAQItem[] = [
        {
            question: 'Quelle est la technologie utilisé par TIMMO ?',
            answer: "TIMMO utilise la blockchain pour garantir la sécurité et la transparence de vos transactions. Chaque part représente une fraction d'un bien immobilier réel avec une vraie valeur : un bien physique, des locataires réels et des revenus tangibles."
        },
        {
            question: 'De quoi suis-je propriétaire ?',
            answer: "En investissant via TIMMO, vous devenez propriétaire de parts numériques représentant une fraction d'un bien immobilier réel. Ces parts vous donnent droit à une portion des revenus locatifs et de la plus-value potentielle."
        },
        {
            question: 'Comment je revends mes parts ?',
            answer: 'Vous pouvez revendre vos parts sur notre marché secondaire à tout moment. Les transactions sont simples et sécurisées, vous permettant de récupérer votre capital quand vous le souhaitez.'
        },
        {
            question: 'Fiscalement, comment ça se passe ?',
            answer: "Les revenus sont soumis à une flat tax de 30% sur les plus-values. Les investissements via TIMMO ne sont pas soumis à l'IFI (Impôt sur la Fortune Immobilière)."
        },
        {
            question: 'Quels sont les frais ?',
            answer: 'TIMMO prélève des frais de gestion transparents sur les revenus locatifs et une commission sur les transactions. Tous les frais sont clairement indiqués avant votre investissement.'
        }
    ];

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    return (
        <section id="faq" className="section6">
            <div className="container">
                <div className="grid-container">
                    {/* Left Content */}
                    <div className="left-content">
                        <h2>Les questions les plus fréquentes :</h2>

                        <p className="description">
                            Retrouvez ici les réponses aux questions les plus
                            courantes sur l&apos;investissement immobilier
                            fractionné. Notre équipe est également disponible
                            pour vous accompagner dans votre projet.
                        </p>

                        <Link href="/onboarding">
                            <Button variant="outlined">
                                Contacter un conseiller
                            </Button>
                        </Link>
                    </div>

                    {/* Right Content - FAQ Accordion */}
                    <div className="faq-list">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className={`faq-item ${openIndex === index ? 'open' : ''}`}
                            >
                                <div
                                    className="summary"
                                    onClick={() => toggleFAQ(index)}
                                >
                                    <span className="question">
                                        {faq.question}
                                    </span>
                                    <span className="icon">+</span>
                                </div>
                                <div className="answer">
                                    <div>{faq.answer}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
