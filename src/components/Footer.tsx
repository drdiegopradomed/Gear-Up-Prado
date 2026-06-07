import Link from "next/link";
import { Zap, Mail, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-900 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-amber-500 rounded p-1.5">
                <Zap size={16} className="text-slate-900" strokeWidth={2.5} />
              </div>
              <span className="font-black text-white">GEAR UP PRADO</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Gadgets, ferramentas e utilidades para simplificar o dia a dia do homem moderno.
            </p>
            <div className="flex gap-3 mt-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-amber-500 transition-colors"
                aria-label="Instagram"
              >
                <ExternalLink size={20} />
              </a>
              <a
                href="mailto:contato@gearupprado.com.br"
                className="text-slate-500 hover:text-amber-500 transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">Loja</h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/produtos", label: "Todos os Produtos" },
                { href: "/produtos?cat=gadgets", label: "Gadgets & Eletrônicos" },
                { href: "/produtos?cat=camping", label: "Camping & Aventura" },
                { href: "/produtos?cat=automacao", label: "Automação Residencial" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-slate-400 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">Atendimento</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>Segunda a Sexta, 9h–18h</li>
              <li>
                <a href="mailto:contato@gearupprado.com.br" className="hover:text-white transition-colors">
                  contato@gearupprado.com.br
                </a>
              </li>
              <li className="pt-2 text-xs text-slate-600">Pagamento 100% seguro via Mercado Pago</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800 text-xs text-slate-600 flex flex-col sm:flex-row justify-between gap-2">
          <p>© {new Date().getFullYear()} Gear Up Prado. Todos os direitos reservados.</p>
          <p>CNPJ: a definir</p>
        </div>
      </div>
    </footer>
  );
}
