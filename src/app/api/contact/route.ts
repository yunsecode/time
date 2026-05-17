import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// POST /api/contact — { name, email, message }
export async function POST(request: Request) {
    const supabase = await createClient();
    const {
        data: { user }
    } = await supabase.auth.getUser();

    const body = await request.json().catch(() => null);
    const name = String(body?.name ?? '').trim();
    const email = String(body?.email ?? '').trim();
    const message = String(body?.message ?? '').trim();

    if (!name || !email || !message) {
        return NextResponse.json(
            { error: 'Tous les champs sont requis' },
            { status: 400 }
        );
    }

    const { error } = await supabase.from('contact_messages').insert({
        user_id: user?.id ?? null,
        name,
        email,
        message
    });

    if (error) {
        return NextResponse.json(
            { error: "Échec de l'envoi du message" },
            { status: 500 }
        );
    }

    return NextResponse.json({ ok: true });
}
