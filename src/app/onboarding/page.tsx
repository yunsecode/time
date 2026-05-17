'use client';

import type React from 'react';
import { Fragment, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check, Loader2, MailCheck } from 'lucide-react';
import { Button } from '@mui/material';
import { createClient } from '@/lib/supabase/client';
import { translateAuthError } from '@/lib/auth-errors';
import '@/styles/onboarding.scss';

const STEPS = [
    { n: 1, label: 'Infos' },
    { n: 2, label: 'Vérification' },
    { n: 3, label: 'Sécurité' }
];

export default function OnboardingPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [accountCreated, setAccountCreated] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        newsletter: true
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (step < 3) {
            setStep(step + 1);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Les mots de passe ne correspondent pas');
            return;
        }

        setIsLoading(true);

        const supabase = createClient();
        const { data, error: signUpError } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: {
                data: {
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                    phone: formData.phone,
                    newsletter: formData.newsletter
                }
            }
        });

        if (signUpError) {
            setError(translateAuthError(signUpError));
            setIsLoading(false);
            return;
        }

        if (data.session) {
            // Connecté directement (confirmation email désactivée)
            router.push('/dashboard');
            router.refresh();
        } else {
            // Confirmation email requise
            setIsLoading(false);
            setAccountCreated(true);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Écran de confirmation après inscription (email à confirmer)
    if (accountCreated) {
        return (
            <div className="onboarding-page">
                <header className="onboarding-header">
                    <nav className="onboarding-nav">
                        <div className="onboarding-nav-inner">
                            <Link href="/">
                                <Image
                                    src="/timmo-logo.svg"
                                    alt="Timmo"
                                    width={100}
                                    height={32}
                                />
                            </Link>
                        </div>
                    </nav>
                </header>
                <div className="onboarding-main">
                    <div className="onboarding-content">
                        <div className="onboarding-card onboarding-success">
                            <div className="success-icon">
                                <MailCheck />
                            </div>
                            <h1>Compte créé !</h1>
                            <p className="onboarding-subtitle">
                                Un email de confirmation a été envoyé à{' '}
                                <strong>{formData.email}</strong>. Confirmez
                                votre adresse, puis connectez-vous.
                            </p>
                            <Button
                                variant="filled-dark"
                                className="onboarding-btn"
                                onClick={() => router.push('/login')}
                            >
                                Aller à la connexion
                                <ArrowRight
                                    style={{
                                        marginLeft: '0.5rem',
                                        width: '1.125rem',
                                        height: '1.125rem'
                                    }}
                                />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="onboarding-page">
            {/* Header - pilule flottante */}
            <header className="onboarding-header">
                <nav className="onboarding-nav">
                    <div className="onboarding-nav-inner">
                        <Link href="/">
                            <Image
                                src="/timmo-logo.svg"
                                alt="Timmo"
                                width={100}
                                height={32}
                            />
                        </Link>
                        <p className="login-hint">
                            <span className="login-hint-text">
                                Déjà un compte ?{' '}
                            </span>
                            <Link href="/login" className="login-link">
                                Se connecter
                            </Link>
                        </p>
                    </div>
                </nav>
            </header>

            <div className="onboarding-main">
                <div className="onboarding-content">
                    {/* Progress Steps */}
                    <div className="steps-card">
                        <div className="steps-row">
                            {STEPS.map((s, i) => (
                                <Fragment key={s.n}>
                                    <div className="step">
                                        <div
                                            className={`step-circle ${
                                                s.n <= step ? 'is-active' : ''
                                            }`}
                                        >
                                            {s.n < step ? <Check /> : s.n}
                                        </div>
                                        <span
                                            className={`step-label ${
                                                step === s.n ? 'is-current' : ''
                                            }`}
                                        >
                                            {s.label}
                                        </span>
                                    </div>
                                    {i < STEPS.length - 1 && (
                                        <div
                                            className={`step-line ${
                                                s.n < step ? 'is-done' : ''
                                            }`}
                                        />
                                    )}
                                </Fragment>
                            ))}
                        </div>
                    </div>

                    {/* Form Card */}
                    <div className="onboarding-card">
                        <h1>
                            {step === 1 && 'Créez votre compte'}
                            {step === 2 && 'Vérifiez vos informations'}
                            {step === 3 && 'Configurez votre sécurité'}
                        </h1>
                        <p className="onboarding-subtitle">
                            {step === 1 &&
                                "Commencez votre parcours d'investissement immobilier"}
                            {step === 2 &&
                                'Quelques informations supplémentaires'}
                            {step === 3 &&
                                'Protégez votre compte avec un mot de passe sécurisé'}
                        </p>

                        <form
                            onSubmit={handleSubmit}
                            className="onboarding-form"
                        >
                            {step === 1 && (
                                <>
                                    <div className="field-row">
                                        <div className="field">
                                            <label htmlFor="firstName">
                                                Prénom
                                            </label>
                                            <input
                                                id="firstName"
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="field">
                                            <label htmlFor="lastName">
                                                Nom
                                            </label>
                                            <input
                                                id="lastName"
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="field">
                                        <label htmlFor="phone">Téléphone</label>
                                        <input
                                            id="phone"
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </>
                            )}

                            {step === 2 && (
                                <>
                                    <div className="review-box">
                                        <div className="review-row">
                                            <span className="review-key">
                                                Nom complet
                                            </span>
                                            <span className="review-value">
                                                {formData.firstName}{' '}
                                                {formData.lastName}
                                            </span>
                                        </div>
                                        <div className="review-row">
                                            <span className="review-key">
                                                Email
                                            </span>
                                            <span className="review-value">
                                                {formData.email}
                                            </span>
                                        </div>
                                        <div className="review-row">
                                            <span className="review-key">
                                                Téléphone
                                            </span>
                                            <span className="review-value">
                                                {formData.phone}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="checkbox-row">
                                        <input type="checkbox" required />
                                        <label>
                                            J&apos;accepte les{' '}
                                            <Link href="/terms">
                                                conditions générales
                                            </Link>{' '}
                                            et la{' '}
                                            <Link href="/privacy">
                                                politique de confidentialité
                                            </Link>
                                        </label>
                                    </div>
                                    <div className="checkbox-row">
                                        <input
                                            type="checkbox"
                                            checked={formData.newsletter}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    newsletter: e.target.checked
                                                })
                                            }
                                        />
                                        <label>
                                            Je souhaite recevoir la newsletter
                                            et les nouvelles opportunités
                                            d&apos;investissement par email
                                        </label>
                                    </div>
                                </>
                            )}

                            {step === 3 && (
                                <>
                                    <div className="field">
                                        <label htmlFor="password">
                                            Mot de passe
                                        </label>
                                        <input
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            required
                                            minLength={8}
                                        />
                                        <p className="field-hint">
                                            Au moins 8 caractères avec
                                            majuscules, minuscules et chiffres
                                        </p>
                                    </div>
                                    <div className="field">
                                        <label htmlFor="confirmPassword">
                                            Confirmer le mot de passe
                                        </label>
                                        <input
                                            id="confirmPassword"
                                            type="password"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            required
                                            minLength={8}
                                        />
                                    </div>
                                </>
                            )}

                            {error && (
                                <div className="onboarding-error">{error}</div>
                            )}

                            <div className="button-row">
                                {step > 1 && (
                                    <Button
                                        type="button"
                                        variant="outlined"
                                        className="onboarding-btn"
                                        onClick={() => setStep(step - 1)}
                                        disabled={isLoading}
                                    >
                                        Retour
                                    </Button>
                                )}
                                <Button
                                    type="submit"
                                    variant="filled-dark"
                                    className="onboarding-btn"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <Loader2 className="spinner" />
                                    ) : (
                                        <>
                                            {step === 3
                                                ? 'Créer mon compte'
                                                : 'Continuer'}
                                            <ArrowRight
                                                style={{
                                                    marginLeft: '0.5rem',
                                                    width: '1.125rem',
                                                    height: '1.125rem'
                                                }}
                                            />
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
