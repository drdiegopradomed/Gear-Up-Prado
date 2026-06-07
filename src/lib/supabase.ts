import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(url, anonKey);

export type ProductOverride = {
  product_id: string;
  name?: string | null;
  price?: number | null;
  original_price?: number | null;
  description?: string | null;
  features?: string[] | null;
  image_url?: string | null;
  badge?: string | null;
  in_stock?: boolean | null;
  delivery_days?: string | null;
};
