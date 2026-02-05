'use client';

import Image from 'next/image';
import Link from 'next/link';
import '@/styles/landing.scss';
import { Button, IconButton } from '@mui/material';
import { useState } from 'react';

export function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="header">
            <nav className="nav">
                <div className="inner">
                    <Link href="/" className="logo">
                        <Image
                            src="/timmo-icon.svg"
                            alt="TIMMO"
                            width={140}
                            height={40}
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="desktopNav">
                        <a href="/#comment-ca-marche">Comment ça marche ?</a>
                        <Link href="/qui-sommes-nous">Qui sommes-nous?</Link>
                        <a href="/#avantages">Avantages</a>
                        <a href="/#faq">FAQ</a>

                        <Button variant="outlined">Rendez-vous</Button>

                        <Button variant="filled-dark">Investir</Button>
                    </div>

                    {/* ================================ Mobile ================================ */}
                    <div className="mobile">
                        <IconButton onClick={toggleMobileMenu}>☰</IconButton>

                        <div
                            className={`mobileMenu ${!isMobileMenuOpen ? 'hidden' : ''}`}
                        >
                            <a href="/#comment-ca-marche">
                                Comment ça marche ?
                            </a>
                            <Link href="/qui-sommes-nous">
                                Qui sommes-nous?
                            </Link>
                            <a href="/#avantages">Avantages</a>
                            <a href="/#faq">FAQ</a>

                            <hr />

                            <Button variant="outlined">Rendez-vous</Button>

                            <Button variant="filled-dark">Investir</Button>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}
