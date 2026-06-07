import { RotateCcw, ShieldCheck, Truck, Clock } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Política de Devolução — Gear Up Prado",
  description: "Saiba como funciona nossa política de trocas, devoluções e garantia de 7 dias.",
};

export default function PoliticaDevolucaoPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-amber-500/10 rounded-xl p-3">
            <RotateCcw size={28} className="text-amber-500" />
          </div>
          <h1 className="text-3xl font-black text-white">Política de Devolução</h1>
        </div>
        <p className="text-slate-400 leading-relaxed">
          Sua satisfação é nossa prioridade. Se por qualquer motivo você não estiver satisfeito com sua compra, estamos aqui para ajudar.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 text-center">
          <Clock size={24} className="text-amber-500 mx-auto mb-2" />
          <p className="text-white font-bold text-lg">7 dias</p>
          <p className="text-slate-400 text-sm">Para solicitar devolução</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 text-center">
          <ShieldCheck size={24} className="text-green-400 mx-auto mb-2" />
          <p className="text-white font-bold text-lg">100%</p>
          <p className="text-slate-400 text-sm">Reembolso garantido</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 text-center">
          <Truck size={24} className="text-blue-400 mx-auto mb-2" />
          <p className="text-white font-bold text-lg">Grátis</p>
          <p className="text-slate-400 text-sm">Frete de devolução em caso de defeito</p>
        </div>
      </div>

      <div className="space-y-8 text-slate-300">
        <section>
          <h2 className="text-xl font-bold text-white mb-3">Direito de Arrependimento (CDC)</h2>
          <p className="leading-relaxed text-slate-400">
            De acordo com o Código de Defesa do Consumidor (Art. 49), você tem o direito de desistir da compra em até <strong className="text-white">7 dias corridos</strong> a partir do recebimento do produto, sem necessidade de justificativa.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">Como solicitar a devolução</h2>
          <ol className="space-y-3 text-slate-400">
            <li className="flex gap-3">
              <span className="bg-amber-500 text-slate-900 font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm">1</span>
              <span>Entre em contato pelo e-mail <a href="mailto:contato@gearupprado.com.br" className="text-amber-400 hover:underline">contato@gearupprado.com.br</a> ou WhatsApp informando o número do pedido e o motivo da devolução.</span>
            </li>
            <li className="flex gap-3">
              <span className="bg-amber-500 text-slate-900 font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm">2</span>
              <span>Nossa equipe responderá em até 24h úteis com as instruções de envio.</span>
            </li>
            <li className="flex gap-3">
              <span className="bg-amber-500 text-slate-900 font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm">3</span>
              <span>Envie o produto na embalagem original, sem sinais de uso, com todos os acessórios e nota fiscal.</span>
            </li>
            <li className="flex gap-3">
              <span className="bg-amber-500 text-slate-900 font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm">4</span>
              <span>Após recebermos e confirmarmos o produto, o reembolso é processado em até 5 dias úteis via estorno no cartão ou PIX.</span>
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">Defeito de fabricação</h2>
          <p className="leading-relaxed text-slate-400">
            Em caso de defeito de fabricação, o prazo para reclamação é de <strong className="text-white">30 dias</strong> para produtos não duráveis e <strong className="text-white">90 dias</strong> para produtos duráveis, conforme o CDC. Nestes casos, o frete de devolução é por nossa conta.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">Condições do produto para devolução</h2>
          <ul className="space-y-2 text-slate-400">
            {[
              "Produto sem sinais de uso",
              "Embalagem original preservada",
              "Todos os acessórios inclusos",
              "Nota fiscal ou comprovante de compra",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">Dúvidas?</h2>
          <p className="text-slate-400 leading-relaxed">
            Entre em contato com nosso time de atendimento. Estamos disponíveis de segunda a sexta, das 9h às 18h.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href="mailto:contato@gearupprado.com.br" className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-5 py-2.5 rounded-lg transition-colors text-sm">
              Enviar e-mail
            </a>
            <Link href="/produtos" className="inline-flex items-center gap-2 border border-slate-600 hover:border-amber-500 text-slate-300 hover:text-amber-400 font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm">
              Continuar comprando
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
