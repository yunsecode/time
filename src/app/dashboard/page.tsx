'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
    ArrowRight,
    TrendingUp,
    Wallet,
    Home,
    LogOut,
    Plus,
    Minus,
    X,
    CreditCard,
    Bell
} from 'lucide-react';
import { Button } from '@mui/material';
import { createClient } from '@/lib/supabase/client';
import type { Property } from '@/lib/types';
import '@/styles/dashboard.scss';

type Section = 'portfolio' | 'available' | 'contact';

const QUICK_AMOUNTS = [50, 100, 250, 500, 1000];

export default function DashboardPage() {
    const router = useRouter();
    const [activeSection, setActiveSection] = useState<Section>('portfolio');
    const [userFirstName, setUserFirstName] = useState('');
    const [properties, setProperties] = useState<Property[]>([]);

    const [walletBalance, setWalletBalance] = useState(0);
    const [showDepositModal, setShowDepositModal] = useState(false);
    const [showWithdrawModal, setShowWithdrawModal] = useState(false);
    const [depositAmount, setDepositAmount] = useState('');
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [busy, setBusy] = useState(false);

    // Aucun investissement pour la pré-production
    const myInvestments: never[] = [];

    // Chargement des données au montage
    useEffect(() => {
        fetch('/api/me')
            .then((r) => (r.ok ? r.json() : null))
            .then((d) => {
                if (d?.profile?.first_name)
                    setUserFirstName(d.profile.first_name);
            })
            .catch(() => {});

        fetch('/api/properties')
            .then((r) => (r.ok ? r.json() : null))
            .then((d) => setProperties(d?.properties ?? []))
            .catch(() => {});

        fetch('/api/wallet')
            .then((r) => (r.ok ? r.json() : null))
            .then((d) => {
                if (d) setWalletBalance(d.balance);
            })
            .catch(() => {});
    }, []);

    const handleLogout = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push('/');
        router.refresh();
    };

    const handleDeposit = async () => {
        setBusy(true);
        const res = await fetch('/api/wallet/deposit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: parseFloat(depositAmount) })
        });
        const data = await res.json();
        setBusy(false);

        if (res.ok) {
            setWalletBalance(data.balance);
            setShowDepositModal(false);
            setDepositAmount('');
        } else {
            alert(data.error ?? 'Une erreur est survenue');
        }
    };

    const handleWithdraw = async () => {
        setBusy(true);
        const res = await fetch('/api/wallet/withdraw', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: parseFloat(withdrawAmount) })
        });
        const data = await res.json();
        setBusy(false);

        if (res.ok) {
            setWalletBalance(data.balance);
            setShowWithdrawModal(false);
            setWithdrawAmount('');
        } else {
            alert(data.error ?? 'Une erreur est survenue');
        }
    };

    const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const fd = new FormData(form);
        const res = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: fd.get('name'),
                email: fd.get('email'),
                message: fd.get('message')
            })
        });
        if (res.ok) {
            alert('Message envoyé !');
            form.reset();
        } else {
            const data = await res.json().catch(() => null);
            alert(data?.error ?? 'Une erreur est survenue');
        }
    };

    const tabs: { key: Section; label: string; shortLabel: string }[] = [
        {
            key: 'portfolio',
            label: 'Mon portefeuille',
            shortLabel: 'Portefeuille'
        },
        { key: 'available', label: 'Parts disponibles', shortLabel: 'Parts' },
        { key: 'contact', label: 'Contact', shortLabel: 'Contact' }
    ];

    const heroContent = {
        portfolio: {
            title: userFirstName ? `Bonjour, ${userFirstName}` : 'Bonjour',
            subtitle:
                "Voici un aperçu de votre portefeuille d'investissement immobilier"
        },
        available: {
            title: 'Parts disponibles',
            subtitle:
                "Découvrez nos biens immobiliers disponibles à l'investissement"
        },
        contact: {
            title: 'Contactez-nous',
            subtitle: 'Notre équipe est là pour répondre à toutes vos questions'
        }
    }[activeSection];

    return (
        <div className="dashboard-page">
            {/* Header - pilule flottante */}
            <header className="dash-header">
                <nav className="dash-nav">
                    <div className="dash-nav-inner">
                        <Link href="/" className="dash-logo">
                            <Image
                                src="/timmo-logo.svg"
                                alt="TIMMO"
                                width={140}
                                height={40}
                            />
                        </Link>

                        {/* Onglets desktop */}
                        <div className="dash-tabs">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveSection(tab.key)}
                                    className={`dash-tab ${
                                        activeSection === tab.key
                                            ? 'is-active'
                                            : ''
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Portefeuille + actions desktop */}
                        <div className="dash-actions">
                            <div className="wallet-chip">
                                <Wallet />
                                <span>{walletBalance.toFixed(2)} €</span>
                            </div>
                            <button
                                onClick={() => setShowDepositModal(true)}
                                className="btn-deposit"
                            >
                                <Plus />
                                Déposer
                            </button>
                            <button
                                onClick={() => setShowWithdrawModal(true)}
                                disabled={walletBalance === 0}
                                className="btn-withdraw"
                            >
                                <Minus />
                                Retirer
                            </button>
                            <button
                                onClick={handleLogout}
                                className="btn-logout"
                                aria-label="Se déconnecter"
                            >
                                <LogOut />
                            </button>
                        </div>

                        {/* Actions mobile */}
                        <div className="dash-actions-mobile">
                            <button
                                onClick={() => setShowDepositModal(true)}
                                className="btn-deposit-mobile"
                            >
                                <Wallet />
                                {walletBalance.toFixed(0)}€
                            </button>
                            <button
                                onClick={handleLogout}
                                className="btn-logout-mobile"
                                aria-label="Se déconnecter"
                            >
                                <LogOut />
                            </button>
                        </div>
                    </div>
                </nav>

                {/* Onglets mobile */}
                <div className="dash-tabs-mobile">
                    <div className="dash-tabs-mobile-inner">
                        {tabs.map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveSection(tab.key)}
                                className={`dash-tab-mobile ${
                                    activeSection === tab.key ? 'is-active' : ''
                                }`}
                            >
                                {tab.shortLabel}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            {/* Hero */}
            <section className="dash-hero">
                <div className="dash-hero-inner">
                    <h1>{heroContent.title}</h1>
                    <p>{heroContent.subtitle}</p>
                </div>
            </section>

            <div className="dash-main">
                {/* ---------- Portefeuille ---------- */}
                {activeSection === 'portfolio' && (
                    <>
                        <div className="stats-grid">
                            <div className="stat-card">
                                <div className="stat-top">
                                    <div className="stat-icon">
                                        <Wallet />
                                    </div>
                                </div>
                                <h3>0€</h3>
                                <p>Investissement total</p>
                            </div>
                            <div className="stat-card">
                                <div className="stat-top">
                                    <div className="stat-icon">
                                        <Home />
                                    </div>
                                    <span className="stat-badge">
                                        {myInvestments.length} bien
                                        {myInvestments.length !== 1 ? 's' : ''}
                                    </span>
                                </div>
                                <h3>0€</h3>
                                <p>Valeur actuelle</p>
                            </div>
                            <div className="stat-card">
                                <div className="stat-top">
                                    <div className="stat-icon">
                                        <TrendingUp />
                                    </div>
                                    <span className="stat-badge">Mensuel</span>
                                </div>
                                <h3>0.00€</h3>
                                <p>Revenus passifs estimés</p>
                            </div>
                        </div>

                        <section>
                            <div className="section-head">
                                <h2>Mes investissements</h2>
                            </div>

                            <div className="empty-card">
                                <div className="empty-icon">
                                    <Home />
                                </div>
                                <h3>Aucun investissement</h3>
                                <p>
                                    Vous n&apos;avez pas encore investi. Déposez
                                    des fonds et découvrez nos biens
                                    disponibles.
                                </p>
                                <div className="empty-actions">
                                    <Button
                                        variant="filled-dark"
                                        onClick={() =>
                                            setShowDepositModal(true)
                                        }
                                    >
                                        <Plus
                                            style={{
                                                marginRight: '0.5rem',
                                                width: '1rem',
                                                height: '1rem'
                                            }}
                                        />
                                        Déposer des fonds
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        onClick={() =>
                                            setActiveSection('available')
                                        }
                                    >
                                        Voir les biens
                                        <ArrowRight
                                            style={{
                                                marginLeft: '0.5rem',
                                                width: '1rem',
                                                height: '1rem'
                                            }}
                                        />
                                    </Button>
                                </div>
                            </div>
                        </section>
                    </>
                )}

                {/* ---------- Parts disponibles ---------- */}
                {activeSection === 'available' && (
                    <section className="properties-grid">
                        {properties.map((property) => {
                            const comingSoon =
                                property.status === 'coming_soon';
                            const fillRatio =
                                comingSoon || property.total_shares === 0
                                    ? 0
                                    : (property.reserved_shares /
                                          property.total_shares) *
                                      100;
                            return (
                                <div
                                    key={property.id}
                                    className="property-card"
                                >
                                    <div className="property-img">
                                        <Image
                                            src={
                                                property.image_url ||
                                                '/interior.jpg'
                                            }
                                            alt={property.name}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                        <div className="img-shade" />
                                        {comingSoon && (
                                            <div className="coming-soon-overlay">
                                                <span>À venir</span>
                                            </div>
                                        )}
                                        <div className="price-tag">
                                            {property.price_per_part
                                                ? `${property.price_per_part}€/PART`
                                                : '--'}
                                        </div>
                                    </div>
                                    <div className="property-body">
                                        <h3>{property.name}</h3>
                                        <p className="property-location">
                                            {property.location ?? '--'}
                                        </p>
                                        <div className="property-tags">
                                            <span className="tag-type">
                                                {property.property_type ?? '--'}
                                            </span>
                                            <span className="tag-surface">
                                                {property.surface ?? '--'}
                                            </span>
                                        </div>

                                        <div className="shares-box">
                                            <div className="shares-head">
                                                <span className="shares-key">
                                                    Parts réservées
                                                </span>
                                                <span className="shares-value">
                                                    {comingSoon
                                                        ? '-- / --'
                                                        : `${property.reserved_shares.toLocaleString()} / ${property.total_shares.toLocaleString()}`}
                                                </span>
                                            </div>
                                            <div className="shares-bar">
                                                <div
                                                    className="shares-fill"
                                                    style={{
                                                        width: `${fillRatio}%`
                                                    }}
                                                />
                                            </div>
                                            <p className="shares-left">
                                                {comingSoon
                                                    ? '-- parts disponibles'
                                                    : `${(
                                                          property.total_shares -
                                                          property.reserved_shares
                                                      ).toLocaleString()} parts disponibles`}
                                            </p>
                                        </div>

                                        {comingSoon ? (
                                            <Button
                                                fullWidth
                                                onClick={() =>
                                                    alert(
                                                        'Vous serez averti par email dès que ce bien sera disponible !'
                                                    )
                                                }
                                                sx={{
                                                    py: 1.25,
                                                    backgroundColor: '#7ba3e8',
                                                    color: '#fff',
                                                    '&:hover': {
                                                        backgroundColor:
                                                            '#6892d7'
                                                    }
                                                }}
                                            >
                                                <Bell
                                                    style={{
                                                        marginRight: '0.5rem',
                                                        width: '1rem',
                                                        height: '1rem'
                                                    }}
                                                />
                                                Être averti
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="filled-dark"
                                                fullWidth
                                                sx={{ py: 1.25 }}
                                                onClick={() =>
                                                    router.push(
                                                        `/property/${property.id}`
                                                    )
                                                }
                                            >
                                                Voir le bien
                                                <ArrowRight
                                                    style={{
                                                        marginLeft: '0.5rem',
                                                        width: '1rem',
                                                        height: '1rem'
                                                    }}
                                                />
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </section>
                )}

                {/* ---------- Contact ---------- */}
                {activeSection === 'contact' && (
                    <section className="contact-grid">
                        <div className="contact-form-card">
                            <h3>Envoyez-nous un message</h3>
                            <form onSubmit={handleContactSubmit}>
                                <div>
                                    <label htmlFor="contact-name">
                                        Nom complet
                                    </label>
                                    <input
                                        id="contact-name"
                                        name="name"
                                        type="text"
                                        placeholder="Votre nom"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="contact-email">Email</label>
                                    <input
                                        id="contact-email"
                                        name="email"
                                        type="email"
                                        placeholder="votre@email.com"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="contact-message">
                                        Message
                                    </label>
                                    <textarea
                                        id="contact-message"
                                        name="message"
                                        rows={5}
                                        placeholder="Votre message..."
                                        required
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    variant="filled-dark"
                                    fullWidth
                                    sx={{ py: 1.5 }}
                                >
                                    Envoyer le message
                                    <ArrowRight
                                        style={{
                                            marginLeft: '0.5rem',
                                            width: '1rem',
                                            height: '1rem'
                                        }}
                                    />
                                </Button>
                            </form>
                        </div>

                        <div className="contact-info">
                            <div className="info-card info-email">
                                <h3>Email</h3>
                                <p>support@timmo.fr</p>
                            </div>
                            <div className="info-card info-phone">
                                <h3>Téléphone</h3>
                                <p>+33 1 23 45 67 89</p>
                            </div>
                            <div className="info-card info-hours">
                                <h3>Horaires</h3>
                                <p>Lundi - Vendredi: 9h - 18h</p>
                                <p>Samedi: 10h - 16h</p>
                            </div>
                        </div>
                    </section>
                )}
            </div>

            {/* Modal de dépôt */}
            {showDepositModal && (
                <div className="modal-overlay">
                    <div className="modal-card">
                        <div className="modal-head">
                            <h3>Déposer des fonds</h3>
                            <button
                                onClick={() => {
                                    setShowDepositModal(false);
                                    setDepositAmount('');
                                }}
                                className="modal-close"
                                aria-label="Fermer"
                            >
                                <X />
                            </button>
                        </div>

                        <div className="modal-note">
                            <CreditCard />
                            <p>
                                Paiement sécurisé par carte bancaire via Stripe
                            </p>
                        </div>

                        <div className="modal-field">
                            <label htmlFor="deposit-amount">
                                Montant (minimum 10€)
                            </label>
                            <div className="modal-input-wrap">
                                <input
                                    id="deposit-amount"
                                    type="number"
                                    value={depositAmount}
                                    onChange={(e) =>
                                        setDepositAmount(e.target.value)
                                    }
                                    placeholder="0.00"
                                    min="10"
                                />
                                <span className="modal-input-suffix">€</span>
                            </div>
                        </div>

                        <div className="quick-amounts">
                            {QUICK_AMOUNTS.map((amount) => (
                                <button
                                    key={amount}
                                    onClick={() =>
                                        setDepositAmount(amount.toString())
                                    }
                                    className={`quick-amount ${
                                        depositAmount === amount.toString()
                                            ? 'is-selected'
                                            : ''
                                    }`}
                                >
                                    {amount}€
                                </button>
                            ))}
                        </div>

                        <Button
                            variant="filled-dark"
                            className="modal-submit"
                            onClick={handleDeposit}
                            disabled={
                                busy ||
                                !depositAmount ||
                                parseFloat(depositAmount) < 10
                            }
                        >
                            <CreditCard
                                style={{
                                    marginRight: '0.5rem',
                                    width: '1.25rem',
                                    height: '1.25rem'
                                }}
                            />
                            Payer{' '}
                            {depositAmount
                                ? `${parseFloat(depositAmount).toFixed(2)} €`
                                : ''}
                        </Button>
                    </div>
                </div>
            )}

            {/* Modal de retrait */}
            {showWithdrawModal && (
                <div className="modal-overlay">
                    <div className="modal-card">
                        <div className="modal-head">
                            <h3>Retirer des fonds</h3>
                            <button
                                onClick={() => setShowWithdrawModal(false)}
                                className="modal-close"
                                aria-label="Fermer"
                            >
                                <X />
                            </button>
                        </div>

                        <div className="modal-balance">
                            <p className="modal-balance-label">
                                Solde disponible
                            </p>
                            <p className="modal-balance-value">
                                {walletBalance.toFixed(2)} €
                            </p>
                        </div>

                        <div className="modal-field">
                            <label htmlFor="withdraw-amount">
                                Montant à retirer
                            </label>
                            <div className="modal-input-wrap">
                                <input
                                    id="withdraw-amount"
                                    type="number"
                                    value={withdrawAmount}
                                    onChange={(e) =>
                                        setWithdrawAmount(e.target.value)
                                    }
                                    placeholder="0.00"
                                    max={walletBalance}
                                />
                                <span className="modal-input-suffix">€</span>
                            </div>
                        </div>

                        <button
                            onClick={() =>
                                setWithdrawAmount(walletBalance.toString())
                            }
                            className="withdraw-all"
                        >
                            Retirer tout ({walletBalance.toFixed(2)}€)
                        </button>

                        <Button
                            variant="filled-dark"
                            className="modal-submit"
                            onClick={handleWithdraw}
                            disabled={
                                busy ||
                                !withdrawAmount ||
                                parseFloat(withdrawAmount) <= 0 ||
                                parseFloat(withdrawAmount) > walletBalance
                            }
                        >
                            Confirmer le retrait
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
