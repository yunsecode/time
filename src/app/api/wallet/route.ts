import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getWallet } from '@/lib/services/wallet';

// GET /api/wallet — solde + historique des transactions
export async function GET() {
    const supabase = await createClient();
    const {
        data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const wallet = await getWallet(supabase, user.id);
    return NextResponse.json(wallet);
}
