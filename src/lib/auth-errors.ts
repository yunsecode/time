import type { AuthError } from '@supabase/supabase-js';

// Traduit les erreurs d'authentification Supabase en français.
// On se base d'abord sur error.code (fiable), puis sur le message (repli).
export function translateAuthError(error: AuthError | null): string {
    if (!error) return 'Une erreur est survenue. Veuillez réessayer.';

    switch (error.code) {
        case 'invalid_credentials':
            return 'Email ou mot de passe incorrect.';
        case 'email_not_confirmed':
            return 'Veuillez confirmer votre email avant de vous connecter.';
        case 'email_address_invalid':
            return 'Adresse email invalide.';
        case 'email_exists':
        case 'user_already_exists':
            return 'Cet email est déjà utilisé. Veuillez vous connecter.';
        case 'weak_password':
            return 'Le mot de passe est trop faible (au moins 6 caractères).';
        case 'over_email_send_rate_limit':
        case 'over_request_rate_limit':
            return 'Trop de tentatives. Veuillez réessayer dans quelques minutes.';
        case 'signup_disabled':
            return 'Les inscriptions sont actuellement désactivées.';
        case 'validation_failed':
            return 'Veuillez vérifier les informations saisies.';
    }

    // Repli par message (anciennes versions / code absent)
    const msg = error.message.toLowerCase();
    if (msg.includes('invalid login credentials'))
        return 'Email ou mot de passe incorrect.';
    if (msg.includes('email not confirmed'))
        return 'Veuillez confirmer votre email avant de vous connecter.';
    if (msg.includes('is invalid') || msg.includes('invalid email'))
        return 'Adresse email invalide.';
    if (msg.includes('already registered') || msg.includes('already exists'))
        return 'Cet email est déjà utilisé. Veuillez vous connecter.';
    if (msg.includes('password'))
        return 'Le mot de passe doit contenir au moins 6 caractères.';
    if (msg.includes('rate limit'))
        return 'Trop de tentatives. Veuillez réessayer dans quelques minutes.';

    return 'Une erreur est survenue. Veuillez réessayer.';
}
