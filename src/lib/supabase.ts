import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://pftxshuumirphkosihfn.supabase.co";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmdHhzaHV1bWlycGhrb3NpaGZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk1NDA1MzksImV4cCI6MjA5NTExNjUzOX0.wqeLt49mZnxzpiEzOlG01Br4p7HbSxyUkyf7yGhkbl4";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export type ProductOverride = {
  product_id: string;
  name?: string | null;
  price?: number | null;
  original_price?: number | null;
  description?: string | null;
  features?: string[] | null;
  image_url?: string | null;
  images?: string[] | null;
  badge?: string | null;
  in_stock?: boolean | null;
  delivery_days?: string | null;
};
