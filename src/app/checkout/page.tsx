"use client";
import { useState } from "react";
import Image from "next/image";
import { ChevronRight, Lock } from "lucide-react";
import { useCart } from "@/components/CartProvider";
import { formatPrice } from "@/lib/products";

type FormData = { name: string; email: string; cpf: string; phone: string; };

function formatCPF(v: string) { return v.replace(/\D/g, "").slice(0,11).replace(/(\d{3})(\d)/,"$1.$2").replace(/(\d{3})(\d)/,"$1.$2").replace(/(\d{3})(\d{1,2})$/,"$1-$2"); }
function formatPhone(v: string) { return v.replace(/\D/g, "").slice(0,11).replace(/(\d{2})(\d)/,"($1) $2").replace(/(\d{5})(\d{4})$/,"$1-$2"); }

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const [form, setForm] = useState<FormData>({ name: "", email: "", cpf: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (items.length === 0) return (
    <div className="max-w-lg mx-auto px-4 py-20 text-center">
      <p className="text-slate-400 mb-4">Seu carrinho está vazio.</p>
      <a href="/produtos" className="text-amber-500 hover:underline font-medium">Ir às compras →</a>
    </div>
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const res = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items: items.map((i) => ({ id: i.product.id, title: i.product.name, quantity: i.quantity, unit_price: i.product.price, picture_url: i.product.imageUrl })), buyer: form }) });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Erro ao processar. Tente novamente."); return; }
      clearCart();
      window.location.href = data.init_point;
    } catch { setError("Erro de conexão. Tente novamente."); } finally { setLoading(false); }
  }

  const field = (id: keyof FormData, label: string, type = "text", placeholder = "") => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-1.5">{label}</label>
      <input id={id} type={type} value={form[id]} onChange={(e) => { let v = e.target.value; if (id==="cpf") v=formatCPF(v); if (id==="phone") v=formatPhone(v); setForm((f)=>({...f,[id]:v})); }} placeholder={placeholder} required className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500 transition-colors" />
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <nav className="flex items-center gap-1.5 text-sm text-slate-500 mb-8">
        <a href="/produtos" className="hover:text-amber-500">Produtos</a><ChevronRight size={14} />
        <span className="text-slate-300">Checkout</span>
      </nav>
      <h1 className="text-2xl font-black text-white mb-8">Finalizar Compra</h1>
      <div className="grid lg:grid-cols-5 gap-8">
        <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-5">
          <div className="bg-slate-800 rounded-xl p-6 space-y-4">
            <h2 className="font-bold text-white mb-2">Seus Dados</h2>
            {field("name","Nome completo","text","João da Silva")}
            {field("email","E-mail","email","joao@email.com")}
            {field("cpf","CPF","text","000.000.000-00")}
            {field("phone","WhatsApp / Telefone","tel","(27) 99999-0000")}
          </div>
          {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-lg">{error}</div>}
          <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-slate-900 font-bold py-4 rounded-xl transition-colors text-lg">
            <Lock size={18} />{loading ? "Processando..." : "Ir para Pagamento"}
          </button>
          <p className="text-xs text-slate-500 text-center">Pagamento 100% seguro via Mercado Pago. PIX, cartão e boleto disponíveis.</p>
        </form>
        <div className="lg:col-span-2">
          <div className="bg-slate-800 rounded-xl p-5 sticky top-20">
            <h2 className="font-bold text-white mb-4">Resumo do Pedido</h2>
            <div className="space-y-3 mb-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-3">
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0"><Image src={item.product.imageUrl} alt={item.product.shortName} fill className="object-cover" /></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white font-medium line-clamp-2 leading-tight">{item.product.shortName}</p>
                    <p className="text-xs text-slate-400 mt-1">{item.quantity}x {formatPrice(item.product.price)}</p>
                  </div>
                  <p className="text-sm font-semibold text-white flex-shrink-0">{formatPrice(item.product.price * item.quantity)}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-slate-700 pt-4">
              <div className="flex justify-between text-sm text-slate-400 mb-1"><span>Subtotal</span><span>{formatPrice(total)}</span></div>
              <div className="flex justify-between text-sm text-slate-400 mb-3"><span>Frete</span><span className="text-green-400">Grátis</span></div>
              <div className="flex justify-between font-black text-white text-lg"><span>Total</span><span>{formatPrice(total)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
