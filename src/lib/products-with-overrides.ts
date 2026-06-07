import { supabase, ProductOverride } from "./supabase";
import { products, Product } from "./products";

export async function getProductsWithOverrides(): Promise<Product[]> {
  try {
    const { data } = await supabase.from("product_overrides").select("*");
    if (!data || data.length === 0) return products;
    const overrideMap = new Map<string, ProductOverride>();
    data.forEach((o: ProductOverride) => overrideMap.set(o.product_id, o));
    return products.map((p) => {
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
  } catch {
    return products;
  }
}

export async function getProductWithOverride(slug: string): Promise<Product | undefined> {
  const all = await getProductsWithOverrides();
  return all.find((p) => p.slug === slug);
}
