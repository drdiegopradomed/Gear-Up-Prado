import { NextRequest, NextResponse } from "next/server";
import { createPreference } from "@/lib/mercadopago";
import { randomUUID } from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items, buyer } = body;
    if (!items?.length || !buyer?.name || !buyer?.email || !buyer?.cpf) {
      return NextResponse.json({ error: "Dados incompletos." }, { status: 400 });
    }
    const externalRef = randomUUID();
    const result = await createPreference(items, buyer, externalRef);
    return NextResponse.json({ preference_id: result.id, init_point: result.init_point, external_reference: externalRef });
  } catch (err) {
    console.error("[checkout]", err);
    return NextResponse.json({ error: "Erro ao criar preferência de pagamento." }, { status: 500 });
  }
}
