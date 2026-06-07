import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";

export default function PedidoSucessoPage() {
  return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center">
      <CheckCircle size={64} className="text-green-400 mx-auto mb-6" strokeWidth={1.5} />
      <h1 className="text-3xl font-black text-white mb-3">Pedido Confirmado!</h1>
      <p className="text-slate-400 mb-2">Obrigado pela sua compra. Você receberá um e-mail de confirmação em instantes.</p>
      <p className="text-slate-500 text-sm mb-8">Prazo de entrega estimado: 7–15 dias úteis.</p>
      <Link href="/produtos" className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-6 py-3 rounded-lg transition-colors">
        Continuar Comprando <ArrowRight size={16} />
      </Link>
    </div>
  );
}
