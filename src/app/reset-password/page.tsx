'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@mui/material';
import { createClient } from '@/lib/supabase/client';
import { translateAuthError } from '@/lib/auth-errors';
import '@/styles/login.scss';

export default function ResetPasswordPage() {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [sessionReady, setSessionReady] = useState(false);
    const [done, setDone] = useState(false);

    // Vérifie qu'une session de récupération est bien active
    useEffect(() => {
        const supabase = createClient();
        supabase.auth.getUser().then(({ data }) => {
            if (data.user) {
                setSessionReady(true);
            } else {
                setError(
                    'Lien invalide ou expiré. Veuillez refaire une demande de réinitialisation.'
                );
            }
        });
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError('Les mots de passe ne correspondent pas');
            return;
        }

        setIsLoading(true);
        const supabase = createClient();
        const { error: updateError } = await supabase.auth.updateUser({
            password
        });
        setIsLoading(false);

        if (updateError) {
            setError(translateAuthError(updateError));
            return;
        }

        setDone(true);
        setTimeout(() => {
            router.push('/dashboard');
            router.refresh();
        }, 1600);
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
                </div>
            </header>

            <div className="login-main">
                <div className="login-content">
                    <div className="login-card">
                        {done ? (
                            <div className="login-success">
                                <div className="login-success-icon">
                                    <CheckCircle2 />
                                </div>
                                <h1>Mot de passe mis à jour</h1>
                                <p>Redirection vers votre tableau de bord…</p>
                            </div>
                        ) : (
                            <>
                                <div className="login-card-head">
                                    <h1>Nouveau mot de passe</h1>
                                    <p>
                                        Choisissez un nouveau mot de passe pour
                                        votre compte Timmo.
                                    </p>
                                </div>

                                <form
                                    onSubmit={handleSubmit}
                                    className="login-form"
                                >
                                    <div className="field">
                                        <label htmlFor="password">
                                            Mot de passe
                                        </label>
                                        <input
                                            id="password"
                                            type="password"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            placeholder="••••••••"
                                            required
                                            minLength={8}
                                        />
                                    </div>

                                    <div className="field">
                                        <label htmlFor="confirmPassword">
                                            Confirmer le mot de passe
                                        </label>
                                        <input
                                            id="confirmPassword"
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) =>
                                                setConfirmPassword(
                                                    e.target.value
                                                )
                                            }
                                            placeholder="••••••••"
                                            required
                                            minLength={8}
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
                                        disabled={isLoading || !sessionReady}
                                    >
                                        {isLoading ? (
                                            <Loader2 className="spinner" />
                                        ) : (
                                            <>
                                                Mettre à jour
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
