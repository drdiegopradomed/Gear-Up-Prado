import { NextRequest, NextResponse } from "next/server";

const SUPABASE_URL = "https://pftxshuumirphkosihfn.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmdHhzaHV1bWlycGhrb3NpaGZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk1NDA1MzksImV4cCI6MjA5NTExNjUzOX0.wqeLt49mZnxzpiEzOlG01Br4p7HbSxyUkyf7yGhkbl4";

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
    hidden: body.hidden ?? false,
    updated_at: new Date().toISOString(),
  };

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

  const insRes = await fetch(`${SUPABASE_URL}/rest/v1/product_overrides`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(payload),
  });
  if (!insRes.ok) {
    const text = await insRes.text();
    return NextResponse.json({ error: `INSERT failed: ${text}` }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

// PATCH — toggle hidden only (quick delete/restore)
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const adminPwd = process.env.ADMIN_PASSWORD ?? "kitcerto2026";
  if (body.adminToken !== adminPwd) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const hidden = body.hidden === true;

  // Upsert: update if exists, insert if not
  const upsertRes = await fetch(
    `${SUPABASE_URL}/rest/v1/product_overrides?product_id=eq.${encodeURIComponent(id)}`,
    {
      method: "PATCH",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ hidden, updated_at: new Date().toISOString() }),
    }
  );

  if (upsertRes.ok) {
    // Check if any row was affected (PostgREST returns empty on PATCH with no match)
    const count = upsertRes.headers.get("content-range");
    if (count === null || count === "*/0") {
      // No existing row — insert minimal row with just hidden flag
      const insRes = await fetch(`${SUPABASE_URL}/rest/v1/product_overrides`, {
        method: "POST",
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({ product_id: id, hidden, updated_at: new Date().toISOString() }),
      });
      if (!insRes.ok) {
        const text = await insRes.text();
        return NextResponse.json({ error: `INSERT failed: ${text}` }, { status: 500 });
      }
    }
    return NextResponse.json({ ok: true });
  }

  const text = await upsertRes.text();
  return NextResponse.json({ error: text }, { status: 500 });
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
