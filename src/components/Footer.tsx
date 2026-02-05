'use client';

import { Button, Link } from '@mui/material';
import Image from 'next/image';
import '@/styles/footer.scss';
import { ArrowRight } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="grid-container">
                    {/* Left Content */}
                    <div className="left-content">
                        <Image
                            src="/timmo-logo.svg"
                            alt="TIMMO"
                            width={120}
                            height={40}
                            className="logo"
                        />

                        <div className="text-content">
                            <h3>Investissez dans l&apos;immobilier dès 10€</h3>
                            <p>
                                Avec TIMMO, investissez dans des biens
                                immobiliers selon votre budget, sans vous
                                encombrer de la gestion locative.
                            </p>
                        </div>

                        <div className="button-group">
                            <Link href="/newsletter">
                                <Button variant="filled-dark">
                                    Commencer
                                    <ArrowRight />
                                </Button>
                            </Link>
                            <a
                                href="https://calendly.com/dan-calvo-timmo/rendez-vous-decouverte-timmo"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button variant="outlined">
                                    Contacter un conseiller
                                    <ArrowRight />
                                </Button>
                            </a>
                        </div>

                        {/* Social Media Icons */}
                        <div className="social-links">
                            <a href="#">
                                <svg fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>
                            <a href="#">
                                <svg fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 4.75 0 0116.25 22h-8.5A5.75 4.75 0 012 16.25v-8.5A5.75 4.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5a4.25 4.25 0 004.25 4.25h8.5a4.25 4.25 0 004.25-4.25v-8.5a4.25 4.25 0 00-4.25-4.25h-8.5zM12 7.25a4.75 4.75 0 110 9.5 4.75 4.75 0 010-9.5zm0 1.5a3.25 3.25 0 100 6.5 3.25 3.25 0 000-6.5zM17.5 5.5a1 1 0 110 2 1 1 0 010-2z" />
                                </svg>
                            </a>
                            <a href="#">
                                <svg fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                </svg>
                            </a>
                            <a href="#">
                                <svg fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Right Content - Navigation Links */}
                    <div className="right-content">
                        <nav>
                            <a href="#comment-ca-marche">Comment ça marche ?</a>
                            <a href="/nos-biens">Nos biens</a>
                            <a href="#avantages">Avantages</a>
                            <a href="#faq">FAQ</a>
                        </nav>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="footer-bottom">
                    <div className="bottom-content">
                        <p>© 2025 TIMMO</p>
                        <div className="links">
                            <Link href="#">Privacy Policy</Link>
                            <Link href="#">Mentions légales</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
