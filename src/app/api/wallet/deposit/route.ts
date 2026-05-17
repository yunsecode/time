import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createTransaction, getWallet } from '@/lib/services/wallet';

// POST /api/wallet/deposit — { amount: number }
// TODO: brancher le paiement Stripe (actuellement crédité directement)
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

    if (!Number.isFinite(amount) || amount < 10) {
        return NextResponse.json(
            { error: 'Montant minimum : 10€' },
            { status: 400 }
        );
    }

    const transaction = await createTransaction(
        supabase,
        user.id,
        'deposit',
        amount
    );
    const wallet = await getWallet(supabase, user.id);
    return NextResponse.json({ transaction, balance: wallet.balance });
}
