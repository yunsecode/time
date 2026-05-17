import type { SupabaseClient } from '@supabase/supabase-js';
import type { Property } from '@/lib/types';

// Couche de service — point d'accès unique aux biens immobiliers.
// Lors du passage au web3, seul l'intérieur de ces fonctions changera
// (lecture depuis un indexeur on-chain au lieu de la table Postgres).

export async function listProperties(
    supabase: SupabaseClient
): Promise<Property[]> {
    const { data, error } = await supabase
        .from('properties')
        .select('*')
        .in('status', ['published', 'coming_soon', 'funded'])
        .order('created_at', { ascending: true });

    if (error) throw error;
    return (data ?? []) as Property[];
}

export async function getProperty(
    supabase: SupabaseClient,
    id: string
): Promise<Property | null> {
    const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .single();

    if (error) return null;
    return data as Property;
}
