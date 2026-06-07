import { NextRequest, NextResponse } from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://pftxshuumirphkosihfn.supabase.co";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmdHhzaHV1bWlycGhrb3NpaGZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk1NDA1MzksImV4cCI6MjA5NTExNjUzOX0.wqeLt49mZnxzpiEzOlG01Br4p7HbSxyUkyf7yGhkbl4";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const adminPwd = process.env.ADMIN_PASSWORD ?? "kitcerto2026";
  if (body.adminToken !== adminPwd) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = {
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
    updated_at: new Date().toISOString(),
  };

  // Step 1: delete existing row (safe even if none exists)
  const delRes = await fetch(
    `${SUPABASE_URL}/rest/v1/product_overrides?product_id=eq.${encodeURIComponent(id)}`,
    {
      method: "DELETE",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    }
  );
  if (!delRes.ok) {
    const text = await delRes.text();
    return NextResponse.json({ error: `DELETE failed: ${text}` }, { status: 500 });
  }

  // Step 2: insert fresh row
  const insRes = await fetch(
    `${SUPABASE_URL}/rest/v1/product_overrides`,
    {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(payload),
    }
  );
  if (!insRes.ok) {
    const text = await insRes.text();
    return NextResponse.json({ error: `INSERT failed: ${text}` }, { status: 500 });
  }

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

  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/product_overrides?product_id=eq.${encodeURIComponent(id)}`,
    {
      method: "DELETE",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    }
  );

  if (!res.ok) {
    const text = await res.text();
    return NextResponse.json({ error: text }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
