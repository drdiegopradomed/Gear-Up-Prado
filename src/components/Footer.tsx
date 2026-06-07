import Link from "next/link";
import { Mail, Instagram, ShieldCheck, Lock, RotateCcw, CreditCard, PackageCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-900 mt-20">
      {/* Security badges bar */}
      <div className="border-b border-slate-800 bg-slate-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2.5">
              <div className="bg-green-500/10 rounded-lg p-2 flex-shrink-0"><ShieldCheck size={18} className="text-green-400" /></div>
              <div>
                <p className="text-white text-xs font-semibold">Site Seguro SSL</p>
                <p className="text-slate-500 text-xs">Dados criptografados</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="bg-blue-500/10 rounded-lg p-2 flex-shrink-0"><Lock size={18} className="text-blue-400" /></div>
              <div>
                <p className="text-white text-xs font-semibold">Pagamento Seguro</p>
                <p className="text-slate-500 text-xs">Via Mercado Pago</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="bg-amber-500/10 rounded-lg p-2 flex-shrink-0"><RotateCcw size={18} className="text-amber-400" /></div>
              <div>
                <p className="text-white text-xs font-semibold">7 Dias de Garantia</p>
                <p className="text-slate-500 text-xs">Devolução sem burocracia</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="bg-purple-500/10 rounded-lg p-2 flex-shrink-0"><CreditCard size={18} className="text-purple-400" /></div>
              <div>
                <p className="text-white text-xs font-semibold">PIX, Cartão e Boleto</p>
                <p className="text-slate-500 text-xs">Parcele em até 12x</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-amber-500 rounded-lg p-1.5">
                <PackageCheck size={16} className="text-slate-900" strokeWidth={2.5} />
              </div>
              <span className="font-black text-white text-lg">Kit<span className="text-amber-500">Certo</span></span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Utilidades inteligentes para homens práticos. Gadgets e ferramentas para casa, carro, trabalho e aventura.
            </p>
            <div className="flex gap-3">
              <a href="https://instagram.com/kitcerto" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-amber-500 transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="mailto:contato@kitcerto.com.br" className="text-slate-500 hover:text-amber-500 transition-colors" aria-label="Email">
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">Loja</h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/produtos", label: "Todos os Produtos" },
                { href: "/produtos?cat=gadgets", label: "Gadgets & Tecnologia" },
                { href: "/produtos?cat=camping", label: "Camping & Aventura" },
                { href: "/produtos?cat=casa", label: "Casa & Garagem" },
                { href: "/produtos?cat=ferramentas", label: "Ferramentas & Reparos" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-slate-400 hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">Informações</h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/politica-devolucao", label: "Política de Devolução" },
                { href: "/politica-privacidade", label: "Política de Privacidade" },
                { href: "/termos-de-uso", label: "Termos de Uso" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-slate-400 hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">Atendimento</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>Segunda a Sexta, 9h–18h</li>
              <li>
                <a href="mailto:contato@kitcerto.com.br" className="hover:text-white transition-colors">
                  contato@kitcerto.com.br
                </a>
              </li>
              <li className="pt-1">
                <a href="https://wa.me/5527992929832" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  WhatsApp: (27) 99292-9832
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800 text-xs text-slate-600 flex flex-col sm:flex-row justify-between gap-2">
          <p>© {new Date().getFullYear()} KitCerto. Todos os direitos reservados.</p>
          <p>Vitória/ES — Brasil</p>
        </div>
      </div>
    </footer>
  );
}
