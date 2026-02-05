'use client';

import { ArrowRight } from '@mui/icons-material';
import { Button, Link } from '@mui/material';
import Image from 'next/image';
import '@/styles/home/section7.scss';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function Section7() {
    return (
        <section className="section7">
            <div className="container">
                <div className="gradient-box">
                    <div className="grid-container">
                        {/* Left - Image */}
                        <div className="image-container">
                            <Image
                                src="/exterior.jpg"
                                alt="Vendez votre bien immobilier"
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                style={{ objectFit: 'cover' }}
                            />
                        </div>

                        {/* Right - Content */}
                        <div className="content">
                            <div className="tag">
                                <span>Aquisition</span>
                            </div>

                            <h2>
                                Vous souhaitez vendre votre bien immobilier ?
                            </h2>

                            <p className="description">
                                Proposez votre bien sur TIMMO, sans frais !
                            </p>

                            {/* CTA Buttons */}
                            <div className="button-group">
                                <Link href="/newsletter">
                                    <Button variant="filled-dark">
                                        Commencer
                                        <ArrowRight />
                                    </Button>
                                </Link>
                                <Button variant="filled-light">
                                    En savoir plus
                                    <ArrowRight />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
