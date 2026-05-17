import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { listProperties } from '@/lib/services/properties';

// GET /api/properties — liste des biens disponibles
export async function GET() {
    const supabase = await createClient();
    try {
        const properties = await listProperties(supabase);
        return NextResponse.json({ properties });
    } catch {
        return NextResponse.json(
            { error: 'Impossible de charger les biens' },
            { status: 500 }
        );
    }
}
