import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// Échange le code (OAuth / récupération de mot de passe) contre une session,
// puis redirige vers la destination demandée.
export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get('code');
    const nextParam = searchParams.get('next');
    // Évite les redirections ouvertes : seul un chemin interne est accepté
    const next =
        nextParam && nextParam.startsWith('/') ? nextParam : '/dashboard';

    if (code) {
        const supabase = await createClient();
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (!error) {
            return NextResponse.redirect(`${origin}${next}`);
        }
    }

    return NextResponse.redirect(`${origin}/login?error=auth`);
}
