import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const adminToken = formData.get("adminToken") as string | null;
  const adminPwd = process.env.ADMIN_PASSWORD ?? "kitcerto2026";
  if (adminToken !== adminPwd) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: "Supabase não configurado no servidor. Adicione NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY no Vercel." }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const files = formData.getAll("file") as File[];
  if (!files.length) return NextResponse.json({ error: "No file" }, { status: 400 });

  const urls: string[] = [];
  for (const file of files) {
    const ext = file.name.split(".").pop() ?? "jpg";
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const bytes = await file.arrayBuffer();
    const { error } = await supabase.storage
      .from("product-images")
      .upload(fileName, bytes, { contentType: file.type, upsert: true });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    const { data: { publicUrl } } = supabase.storage.from("product-images").getPublicUrl(fileName);
    urls.push(publicUrl);
  }

  return NextResponse.json({ urls });
}
