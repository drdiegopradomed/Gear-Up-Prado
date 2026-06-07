import { MercadoPagoConfig, Preference } from "mercadopago";

let _client: MercadoPagoConfig | null = null;

function getClient(): MercadoPagoConfig {
  if (!_client) {
    const token = process.env.MP_ACCESS_TOKEN;
    if (!token) throw new Error("MP_ACCESS_TOKEN não configurado");
    _client = new MercadoPagoConfig({ accessToken: token });
  }
  return _client;
}

export type CheckoutItem = {
  id: string;
  title: string;
  quantity: number;
  unit_price: number;
  picture_url?: string;
};

export type BuyerInfo = {
  name: string;
  email: string;
  cpf: string;
  phone: string;
};

export async function createPreference(
  items: CheckoutItem[],
  buyer: BuyerInfo,
  externalReference: string
) {
  const client = getClient();
  const preference = new Preference(client);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const result = await preference.create({
    body: {
      items: items.map((item) => ({
        id: item.id,
        title: item.title,
        quantity: item.quantity,
        unit_price: item.unit_price,
        currency_id: "BRL",
        ...(item.picture_url ? { picture_url: item.picture_url } : {}),
      })),
      payer: {
        name: buyer.name.split(" ")[0],
        surname: buyer.name.split(" ").slice(1).join(" "),
        email: buyer.email,
        identification: { type: "CPF", number: buyer.cpf.replace(/\D/g, "") },
        phone: { area_code: buyer.phone.slice(0, 2), number: buyer.phone.slice(2) },
      },
      back_urls: {
        success: `${baseUrl}/pedido/sucesso`,
        failure: `${baseUrl}/pedido/falhou`,
        pending: `${baseUrl}/pedido/pendente`,
      },
      auto_return: "approved",
      external_reference: externalReference,
      notification_url: `${baseUrl}/api/webhooks/mercadopago`,
      statement_descriptor: "GEAR UP PRADO",
    },
  });

  return result;
}
