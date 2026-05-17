import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createTransaction, getWallet } from '@/lib/services/wallet';

// POST /api/wallet/withdraw — { amount: number }
export async function POST(request: Request) {
    const supabase = await createClient();
    const {
        data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const body = await request.json().catch(() => null);
    const amount = Number(body?.amount);

    if (!Number.isFinite(amount) || amount <= 0) {
        return NextResponse.json(
            { error: 'Montant invalide' },
            { status: 400 }
        );
    }

    // Vérifie le solde côté serveur
    const wallet = await getWallet(supabase, user.id);
    if (amount > wallet.balance) {
        return NextResponse.json(
            { error: 'Solde insuffisant' },
            { status: 400 }
        );
    }

    const transaction = await createTransaction(
        supabase,
        user.id,
        'withdrawal',
        amount
    );
    const updated = await getWallet(supabase, user.id);
    return NextResponse.json({ transaction, balance: updated.balance });
}
