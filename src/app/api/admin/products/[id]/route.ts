import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://pftxshuumirphkosihfn.supabase.co";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmdHhzaHV1bWlycGhrb3NpaGZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk1NDA1MzksImV4cCI6MjA5NTExNjUzOX0.wqeLt49mZnxzpiEzOlG01Br4p7HbSxyUkyf7yGhkbl4";

function getSupabase() {
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const adminPwd = process.env.ADMIN_PASSWORD ?? "kitcerto2026";
  if (body.adminToken !== adminPwd) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const supabase = getSupabase();
  const { error } = await supabase.from("product_overrides").upsert({
    product_id: id,
    name: body.name,
    price: body.price,
    original_price: body.originalPrice,
    description: body.description,
    features: body.features,
    image_url: body.imageUrl,
    images: body.images ?? null,
    badge: body.badge,
    in_stock: body.inStock,
    delivery_days: body.deliveryDays,
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
