import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { createHmac } from "crypto";

function validateSignature(req: NextRequest, dataId: string): boolean {
  const secret = process.env.MP_WEBHOOK_SECRET;
  if (!secret) return true;

  const xSignature = req.headers.get("x-signature") ?? "";
  const xRequestId = req.headers.get("x-request-id") ?? "";

  const tsMatch = xSignature.match(/ts=(\d+)/);
  const v1Match = xSignature.match(/v1=([a-f0-9]+)/);
  if (!tsMatch || !v1Match) return false;

  const ts = tsMatch[1];
  const receivedHash = v1Match[1];
  const manifest = `id:${dataId};request-id:${xRequestId};ts:${ts}`;
  const expectedHash = createHmac("sha256", secret).update(manifest).digest("hex");

  return expectedHash === receivedHash;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, data } = body;

    if (type !== "payment" || !data?.id) {
      return NextResponse.json({ received: true });
    }

    if (!validateSignature(req, String(data.id))) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });
    const paymentApi = new Payment(client);
    const payment = await paymentApi.get({ id: data.id });

    console.log("[mp-webhook] payment status:", payment.status, "ref:", payment.external_reference);

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("[mp-webhook]", err);
    return NextResponse.json({ error: "Webhook error" }, { status: 500 });
  }
}
