import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const { adminToken, ...fields } = body;
  const adminPwd = process.env.ADMIN_PASSWORD ?? "kitcerto2026";
  if (adminToken !== adminPwd) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const supabase = getSupabase();
  const { error } = await supabase.from("product_overrides").upsert({
    product_id: id,
    name: fields.name ?? null,
    price: fields.price ? Number(fields.price) : null,
    original_price: fields.originalPrice ? Number(fields.originalPrice) : null,
    description: fields.description ?? null,
    features: fields.features ?? null,
    image_url: fields.imageUrl ?? null,
    badge: fields.badge ?? null,
    in_stock: fields.inStock ?? null,
    delivery_days: fields.deliveryDays ?? null,
    updated_at: new Date().toISOString(),
  }, { onConflict: "product_id" });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { searchParams } = new URL(req.url);
  const adminToken = searchParams.get("token");
  const adminPwd = process.env.ADMIN_PASSWORD ?? "kitcerto2026";
  if (adminToken !== adminPwd) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const supabase = getSupabase();
  await supabase.from("product_overrides").delete().eq("product_id", id);
  return NextResponse.json({ ok: true });
}
