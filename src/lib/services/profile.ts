import type { SupabaseClient } from '@supabase/supabase-js';
import type { Profile } from '@/lib/types';

// Couche de service — profils utilisateurs (reste off-chain même en web3).

export async function getProfile(
    supabase: SupabaseClient,
    userId: string
): Promise<Profile | null> {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

    if (error) return null;
    return data as Profile;
}
