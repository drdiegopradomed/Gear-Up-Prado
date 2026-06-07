import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Shield, Truck, RefreshCw, MessageCircle, CheckCircle, Star } from "lucide-react";
import { products, formatPrice } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

const categories = [
  { name: "Gadgets & Tecnologia", slug: "gadgets", icon: "⚡", description: "Carregadores, suportes, acessórios para celular e home office" },
  { name: "Casa & Garagem", slug: "casa", icon: "🏠", description: "Organização, iluminação, segurança e utilidades domésticas" },
  { name: "Camping & Aventura", slug: "camping", icon: "🏕️", description: "Lanternas, garrafas, organizadores e itens para uso outdoor" },
  { name: "Ferramentas & Reparos", slug: "ferramentas", icon: "🔧", description: "Itens para manutenção simples, medição e organização" },
];

const diferenciais = [
  { icon: Shield, title: "Compra Segura", desc: "Pagamento via PIX, cartão e boleto" },
  { icon: Star, title: "Curadoria Prática", desc: "Produtos escolhidos para resolver problemas reais" },
  { icon: Truck, title: "Envio para todo o Brasil", desc: "Prazo informado em cada produto" },
  { icon: RefreshCw, title: "7 Dias de Garantia", desc: "Devolução conforme política da loja" },
  { icon: MessageCircle, title: "Atendimento Humano", desc: "Suporte pelo WhatsApp em horário comercial" },
  { icon: CheckCircle, title: "Pedido Processado em 24h", desc: "Prazo de entrega informado no checkout" },
];

export default function HomePage() {
  const featuredProducts = products.slice(0, 4);
  const heroProduct = products.find(p => p.slug === "power-bank-65w") ?? products[0];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 40px, #f59e0b 40px, #f59e0b 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, #f59e0b 40px, #f59e0b 41px)" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 tracking-wider uppercase">
                Utilidades inteligentes para homens práticos
              </span>
              <h1 className="text-4xl lg:text-6xl font-black text-white leading-tight mb-6">
                O kit certo para<br />quem gosta de<br /><span className="text-amber-500">estar preparado</span>
              </h1>
              <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-lg">
                Gadgets, ferramentas e utilidades para casa, carro, trabalho e aventura — escolhidos para facilitar sua rotina com praticidade.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/produtos" className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-6 py-3.5 rounded-lg transition-colors">
                  Montar meu kit agora <ArrowRight size={18} />
                </Link>
                <Link href={`/produtos/${heroProduct.slug}`} className="inline-flex items-center gap-2 border border-slate-600 hover:border-amber-500 text-slate-300 hover:text-amber-400 font-semibold px-6 py-3.5 rounded-lg transition-colors">
                  Ver produto em destaque
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden border border-slate-700">
                <Image src={heroProduct.imageUrl} alt={heroProduct.name} fill className="object-cover" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  {heroProduct.badge && <span className="bg-amber-500 text-slate-900 text-xs font-bold px-2.5 py-1 rounded-full">{heroProduct.badge}</span>}
                  <h3 className="text-white font-bold text-lg mt-2">{heroProduct.name}</h3>
                  <p className="text-amber-400 font-black text-2xl">{formatPrice(heroProduct.price)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="border-y border-slate-800 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h2 className="text-center text-white font-black text-lg mb-8">Por que comprar na KitCerto?</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {diferenciais.map((d) => (
              <div key={d.title} className="flex items-start gap-3">
                <div className="bg-amber-500/10 rounded-lg p-2 flex-shrink-0"><d.icon size={20} className="text-amber-500" /></div>
                <div><p className="font-semibold text-white text-sm">{d.title}</p><p className="text-slate-500 text-xs mt-0.5">{d.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categorias */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-black text-white mb-8">Categorias</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link key={cat.slug} href={`/produtos?cat=${cat.slug}`} className="bg-slate-800 border border-slate-700 hover:border-amber-500/50 rounded-xl p-5 group transition-all">
              <div className="text-3xl mb-3">{cat.icon}</div>
              <h3 className="font-bold text-white text-sm group-hover:text-amber-400 transition-colors">{cat.name}</h3>
              <p className="text-slate-500 text-xs mt-1 leading-relaxed">{cat.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Produtos em destaque */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black text-white">Produtos em Destaque</h2>
          <Link href="/produtos" className="text-amber-500 hover:text-amber-400 text-sm font-semibold flex items-center gap-1 transition-colors">Ver todos <ArrowRight size={14} /></Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (<ProductCard key={product.id} product={product} />))}
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-amber-500 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black text-slate-900 mb-3">Pronto para montar o seu kit?</h2>
          <p className="text-slate-800 mb-6 max-w-xl mx-auto">Explore nossa curadoria de gadgets, ferramentas e utilidades práticas para o dia a dia.</p>
          <Link href="/produtos" className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-3.5 rounded-lg transition-colors">
            Montar meu kit agora <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
