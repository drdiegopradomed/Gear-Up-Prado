import Link from "next/link";
import { Clock } from "lucide-react";

export default function PedidoPendentePage() {
  return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center">
      <Clock size={64} className="text-amber-400 mx-auto mb-6" strokeWidth={1.5} />
      <h1 className="text-3xl font-black text-white mb-3">Pagamento Pendente</h1>
      <p className="text-slate-400 mb-2">Seu pagamento está sendo processado. Assim que confirmado, você receberá um e-mail de confirmação.</p>
      <p className="text-slate-500 text-sm mb-8">Se pagou via boleto, pode levar até 2 dias úteis para compensar.</p>
      <Link href="/" className="inline-flex items-center gap-2 border border-slate-700 hover:border-amber-500 text-slate-300 hover:text-amber-400 font-semibold px-6 py-3 rounded-lg transition-colors">Voltar para o Início</Link>
    </div>
  );
}
