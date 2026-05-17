'use client';

import type React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Loader2, MailCheck } from 'lucide-react';
import { Button } from '@mui/material';
import { createClient } from '@/lib/supabase/client';
import { translateAuthError } from '@/lib/auth-errors';
import '@/styles/login.scss';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        const supabase = createClient();
        const { error: resetError } = await supabase.auth.resetPasswordForEmail(
            email,
            {
                redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`
            }
        );

        setIsLoading(false);
        if (resetError) {
            setError(translateAuthError(resetError));
            return;
        }
        setSent(true);
    };

    return (
        <div className="login-page">
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
                        <Link href="/login" className="signup-link">
                            Retour à la connexion
                        </Link>
                    </p>
                </div>
            </header>

            <div className="login-main">
                <div className="login-content">
                    <div className="login-card">
                        {sent ? (
                            <div className="login-success">
                                <div className="login-success-icon">
                                    <MailCheck />
                                </div>
                                <h1>Email envoyé</h1>
                                <p>
                                    Si un compte existe pour{' '}
                                    <strong>{email}</strong>, vous recevrez un
                                    lien pour réinitialiser votre mot de passe.
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="login-card-head">
                                    <h1>Mot de passe oublié ?</h1>
                                    <p>
                                        Entrez votre email pour recevoir un lien
                                        de réinitialisation.
                                    </p>
                                </div>

                                <form
                                    onSubmit={handleSubmit}
                                    className="login-form"
                                >
                                    <div className="field">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            id="email"
                                            type="email"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            placeholder="votre@email.com"
                                            required
                                        />
                                    </div>

                                    {error && (
                                        <div className="login-error">
                                            {error}
                                        </div>
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
                                                Envoyer le lien
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
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
