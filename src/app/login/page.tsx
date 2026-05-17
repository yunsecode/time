'use client';

import type React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@mui/material';
import { createClient } from '@/lib/supabase/client';
import { translateAuthError } from '@/lib/auth-errors';
import '@/styles/login.scss';

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        const supabase = createClient();
        const { error: signInError } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password
        });

        if (signInError) {
            setError(translateAuthError(signInError));
            setIsLoading(false);
            return;
        }

        router.push('/dashboard');
        router.refresh();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSocialLogin = async (provider: 'google' | 'apple') => {
        setError(null);
        const supabase = createClient();
        const { error: oauthError } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: `${window.location.origin}/auth/callback`
            }
        });
        if (oauthError) setError(translateAuthError(oauthError));
    };

    return (
        <div className="login-page">
            {/* Header */}
            <header className="login-header">
                <div className="login-header-inner">
                    <Link href="/">
                        <Image
                            src="/timmo-logo.svg"
                            alt="Timmo"
                            width={120}
                            height={40}
                        />
                    </Link>
                    <p className="signup-hint">
                        Pas encore de compte ?{' '}
                        <Link href="/onboarding" className="signup-link">
                            S&apos;inscrire
                        </Link>
                    </p>
                </div>
            </header>

            <div className="login-main">
                <div className="login-content">
                    {/* Form Card */}
                    <div className="login-card">
                        <div className="login-card-head">
                            <h1>Bon retour !</h1>
                            <p>Connectez-vous à votre compte Timmo</p>
                        </div>

                        {/* Social Login Buttons */}
                        <div className="social-buttons">
                            <button
                                type="button"
                                onClick={() => handleSocialLogin('google')}
                                className="social-btn"
                            >
                                <svg viewBox="0 0 24 24">
                                    <path
                                        fill="#4285F4"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="#34A853"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="#FBBC05"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    />
                                    <path
                                        fill="#EA4335"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    />
                                </svg>
                                <span>Continuer avec Google</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => handleSocialLogin('apple')}
                                className="social-btn"
                            >
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                                </svg>
                                <span>Continuer avec Apple</span>
                            </button>
                        </div>

                        <div className="login-divider">
                            <span>Ou avec votre email</span>
                        </div>

                        <form onSubmit={handleSubmit} className="login-form">
                            <div className="field">
                                <label htmlFor="email">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="votre@email.com"
                                    required
                                />
                            </div>

                            <div className="field">
                                <label htmlFor="password">Mot de passe</label>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="••••••••"
                                    required
                                />
                                <div className="forgot">
                                    <Link
                                        href="/forgot-password"
                                        className="forgot-link"
                                    >
                                        Mot de passe oublié ?
                                    </Link>
                                </div>
                            </div>

                            {error && (
                                <div className="login-error">{error}</div>
                            )}

                            <Button
                                type="submit"
                                variant="filled-dark"
                                className="login-submit"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <Loader2 className="spinner" />
                                ) : (
                                    <>
                                        Se connecter
                                        <ArrowRight
                                            style={{
                                                marginLeft: '0.5rem',
                                                width: '1.25rem',
                                                height: '1.25rem'
                                            }}
                                        />
                                    </>
                                )}
                            </Button>
                        </form>
                    </div>

                    <p className="terms-text">
                        En vous connectant, vous acceptez nos{' '}
                        <Link href="/terms" className="terms-link">
                            conditions d&apos;utilisation
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
