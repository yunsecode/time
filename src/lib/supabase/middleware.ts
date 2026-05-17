import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

// Routes nécessitant une authentification
const PROTECTED_PATHS = ['/dashboard'];
// Routes d'auth — redirige vers le dashboard si déjà connecté
const AUTH_PATHS = ['/login', '/onboarding'];

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({ request });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) =>
                        request.cookies.set(name, value)
                    );
                    supabaseResponse = NextResponse.next({ request });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    );
                }
            }
        }
    );

    // IMPORTANT : ne pas exécuter de code entre createServerClient et getUser()
    const {
        data: { user }
    } = await supabase.auth.getUser();

    const { pathname } = request.nextUrl;

    // Non connecté + route protégée → /login
    if (!user && PROTECTED_PATHS.some((p) => pathname.startsWith(p))) {
        const url = request.nextUrl.clone();
        url.pathname = '/login';
        return NextResponse.redirect(url);
    }

    // Déjà connecté + page d'auth → /dashboard
    if (user && AUTH_PATHS.some((p) => pathname.startsWith(p))) {
        const url = request.nextUrl.clone();
        url.pathname = '/dashboard';
        return NextResponse.redirect(url);
    }

    return supabaseResponse;
}
