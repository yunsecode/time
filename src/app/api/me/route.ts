import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getProfile } from '@/lib/services/profile';

// GET /api/me — utilisateur courant + profil
export async function GET() {
    const supabase = await createClient();
    const {
        data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const profile = await getProfile(supabase, user.id);
    return NextResponse.json({
        user: { id: user.id, email: user.email },
        profile
    });
}
