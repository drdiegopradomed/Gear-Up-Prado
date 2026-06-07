import { NextRequest, NextResponse } from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://pftxshuumirphkosihfn.supabase.co";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmdHhzaHV1bWlycGhrb3NpaGZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk1NDA1MzksImV4cCI6MjA5NTExNjUzOX0.wqeLt49mZnxzpiEzOlG01Br4p7HbSxyUkyf7yGhkbl4";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const adminToken = formData.get("adminToken") as string | null;
  const adminPwd = process.env.ADMIN_PASSWORD ?? "kitcerto2026";
  if (adminToken !== adminPwd) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const files = formData.getAll("file") as File[];
  if (!files.length) return NextResponse.json({ error: "No file" }, { status: 400 });

  const urls: string[] = [];
  for (const file of files) {
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const buffer = await file.arrayBuffer();

    const res = await fetch(
      `${SUPABASE_URL}/storage/v1/object/product-images/${fileName}`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
          "Content-Type": file.type || "image/jpeg",
          "x-upsert": "true",
        },
        body: buffer,
      }
    );

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json({ error: err }, { status: 500 });
    }

    const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/product-images/${fileName}`;
    urls.push(publicUrl);
  }

  return NextResponse.json({ urls });
}
