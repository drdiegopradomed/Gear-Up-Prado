import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Shield, Truck, RefreshCw, Zap } from "lucide-react";
import { products, formatPrice } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

const categories = [
  { name: "Gadgets & Eletrônicos", slug: "gadgets", icon: "⚡", description: "Smartwatches, fones, power banks e mais" },
  { name: "Automação Residencial", slug: "automacao", icon: "🏠", description: "Câmeras, fechaduras e tomadas inteligentes" },
  { name: "Camping & Aventura", slug: "camping", icon: "🏕️", description: "Lanternas, filtros e equipamentos táticos" },
  { name: "Ferramentas & Utilidades", slug: "ferramentas", icon: "🔧", description: "Multifunções, medidores e organizadores" },
];

const diferenciais = [
  { icon: Shield, title: "Compra Protegida", desc: "Garantia de 7 dias ou seu dinheiro de volta" },
  { icon: Truck, title: "Entrega Rápida", desc: "Envio em até 24h para todo o Brasil" },
  { icon: RefreshCw, title: "Troca Fácil", desc: "Troca gratuita em caso de defeito de fabricação" },
  { icon: Zap, title: "Pagamento Seguro", desc: "PIX, cartão e boleto via Mercado Pago" },
];

export default function HomePage() {
  const featuredProducts = products.slice(0, 4);
  const heroProduct = products[0];

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 40px, #f59e0b 40px, #f59e0b 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, #f59e0b 40px, #f59e0b 41px)" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 tracking-wider uppercase">
                O kit certo para cada momento
              </span>
              <h1 className="text-4xl lg:text-6xl font-black text-white leading-tight mb-6">
                Gadgets e<br />ferramentas que<br /><span className="text-amber-500">fazem diferença</span>
              </h1>
              <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-lg">
                Equipamentos úteis para casa, carro, rotina e aventura. Soluções práticas para homens que gostam de estar preparados.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/produtos" className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-6 py-3.5 rounded-lg transition-colors">
                  Ver Todos os Produtos <ArrowRight size={18} />
                </Link>
                <Link href={`/produtos/${heroProduct.slug}`} className="inline-flex items-center gap-2 border border-slate-600 hover:border-amber-500 text-slate-300 hover:text-amber-400 font-semibold px-6 py-3.5 rounded-lg transition-colors">
                  Produto em Destaque
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden border border-slate-700">
                <Image src={heroProduct.imageUrl} alt={heroProduct.name} fill className="object-cover" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="bg-amber-500 text-slate-900 text-xs font-bold px-2.5 py-1 rounded-full">{heroProduct.badge}</span>
                  <h3 className="text-white font-bold text-lg mt-2">{heroProduct.name}</h3>
                  <p className="text-amber-400 font-black text-2xl">{formatPrice(heroProduct.price)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-800 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {diferenciais.map((d) => (
              <div key={d.title} className="flex items-start gap-3">
                <div className="bg-amber-500/10 rounded-lg p-2 flex-shrink-0"><d.icon size={20} className="text-amber-500" /></div>
                <div><p className="font-semibold text-white text-sm">{d.title}</p><p className="text-slate-500 text-xs mt-0.5">{d.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

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

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black text-white">Produtos em Destaque</h2>
          <Link href="/produtos" className="text-amber-500 hover:text-amber-400 text-sm font-semibold flex items-center gap-1 transition-colors">Ver todos <ArrowRight size={14} /></Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (<ProductCard key={product.id} product={product} />))}
        </div>
      </section>

      <section className="bg-amber-500 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black text-slate-900 mb-3">Pronto para ter o kit certo?</h2>
          <p className="text-slate-800 mb-6 max-w-xl mx-auto">Explore nossa coleção completa de gadgets, ferramentas e equipamentos para o dia a dia.</p>
          <Link href="/produtos" className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-3.5 rounded-lg transition-colors">
            Explorar Produtos <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
