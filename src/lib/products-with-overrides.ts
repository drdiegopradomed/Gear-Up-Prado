import { products, Product } from "./products";

const SUPABASE_URL = "https://pftxshuumirphkosihfn.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmdHhzaHV1bWlycGhrb3NpaGZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk1NDA1MzksImV4cCI6MjA5NTExNjUzOX0.wqeLt49mZnxzpiEzOlG01Br4p7HbSxyUkyf7yGhkbl4";

type Override = {
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
  hidden?: boolean | null;
};

async function fetchOverrides(): Promise<Override[]> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/product_overrides?select=*`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        cache: "no-store",
      }
    );
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export async function getProductsWithOverrides(): Promise<Product[]> {
  const data = await fetchOverrides();
  if (!data || data.length === 0) return products;
  const overrideMap = new Map<string, Override>();
  data.forEach((o) => overrideMap.set(o.product_id, o));
  return products
    .filter((p) => {
      const o = overrideMap.get(p.id);
      return !o?.hidden;
    })
    .map((p) => {
      const o = overrideMap.get(p.id);
      if (!o) return p;
      return {
        ...p,
        ...(o.name != null && { name: o.name }),
        ...(o.price != null && { price: o.price }),
        ...(o.original_price != null && { originalPrice: o.original_price }),
        ...(o.description != null && { description: o.description }),
        ...(o.features != null && { features: o.features }),
        ...(o.image_url != null && { imageUrl: o.image_url }),
        ...(o.images != null && { images: o.images }),
        ...(o.badge != null && { badge: o.badge }),
        ...(o.in_stock != null && { inStock: o.in_stock }),
        ...(o.delivery_days != null && { deliveryDays: o.delivery_days }),
      };
    });
}

export async function getProductWithOverride(slug: string): Promise<Product | undefined> {
  const all = await getProductsWithOverrides();
  return all.find((p) => p.slug === slug);
}
