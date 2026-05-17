// Types des entités de la base de données.

export type PropertyStatus = 'draft' | 'published' | 'coming_soon' | 'funded';

export type Property = {
    id: string;
    name: string;
    location: string | null;
    image_url: string | null;
    property_type: string | null;
    surface: string | null;
    price_per_part: number | null;
    total_shares: number;
    reserved_shares: number;
    status: PropertyStatus;
    created_at: string;
};

export type Profile = {
    id: string;
    first_name: string | null;
    last_name: string | null;
    phone: string | null;
    role: 'user' | 'admin';
    newsletter: boolean;
    created_at: string;
};

export type WalletTransactionType =
    | 'deposit'
    | 'withdrawal'
    | 'purchase'
    | 'payout';

export type WalletTransaction = {
    id: string;
    user_id: string;
    type: WalletTransactionType;
    amount: number;
    status: 'pending' | 'completed' | 'failed';
    created_at: string;
};
