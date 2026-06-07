import { NextResponse } from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://pftxshuumirphkosihfn.supabase.co";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmdHhzaHV1bWlycGhrb3NpaGZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk1NDA1MzksImV4cCI6MjA5NTExNjUzOX0.wqeLt49mZnxzpiEzOlG01Br4p7HbSxyUkyf7yGhkbl4";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/product_overrides?select=*`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          "Cache-Control": "no-store",
        },
        cache: "no-store",
      }
    );
    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ data: [], error: text });
    }
    const data = await res.json();
    return NextResponse.json({ data });
  } catch (e) {
    return NextResponse.json({ data: [], error: String(e) });
  }
}
