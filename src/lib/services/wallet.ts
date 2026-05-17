import type { SupabaseClient } from '@supabase/supabase-js';
import type { WalletTransaction, WalletTransactionType } from '@/lib/types';

// Couche de service — portefeuille.
// Le solde n'est pas stocké : il est dérivé du registre des transactions.
// (web3 : ce registre deviendra un miroir des transferts on-chain.)

export type Wallet = {
    balance: number;
    transactions: WalletTransaction[];
};

function signedAmount(tx: WalletTransaction): number {
    if (tx.status !== 'completed') return 0;
    const amount = Number(tx.amount);
    // deposit / payout : crédit — withdrawal / purchase : débit
    return tx.type === 'deposit' || tx.type === 'payout' ? amount : -amount;
}

export async function getWallet(
    supabase: SupabaseClient,
    userId: string
): Promise<Wallet> {
    const { data, error } = await supabase
        .from('wallet_transactions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    if (error) throw error;

    const transactions = (data ?? []) as WalletTransaction[];
    const balance = transactions.reduce((sum, tx) => sum + signedAmount(tx), 0);
    return { balance, transactions };
}

export async function createTransaction(
    supabase: SupabaseClient,
    userId: string,
    type: WalletTransactionType,
    amount: number
): Promise<WalletTransaction> {
    const { data, error } = await supabase
        .from('wallet_transactions')
        .insert({ user_id: userId, type, amount, status: 'completed' })
        .select()
        .single();

    if (error) throw error;
    return data as WalletTransaction;
}
