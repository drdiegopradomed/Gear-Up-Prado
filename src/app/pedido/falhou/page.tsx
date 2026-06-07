import Link from "next/link";
import { XCircle } from "lucide-react";

export default function PedidoFalouPage() {
  return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center">
      <XCircle size={64} className="text-red-400 mx-auto mb-6" strokeWidth={1.5} />
      <h1 className="text-3xl font-black text-white mb-3">Pagamento Não Aprovado</h1>
      <p className="text-slate-400 mb-2">Ocorreu um problema com seu pagamento. Nenhum valor foi cobrado.</p>
      <p className="text-slate-500 text-sm mb-8">Tente novamente com outro cartão, PIX ou boleto.</p>
      <Link href="/checkout" className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-6 py-3 rounded-lg transition-colors">Tentar Novamente</Link>
    </div>
  );
}
