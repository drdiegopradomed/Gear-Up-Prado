import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Check, ShieldCheck, Truck, ArrowLeft } from "lucide-react";
import { getProductBySlug, formatPrice, products } from "@/lib/products";
import AddToCartButton from "./AddToCartButton";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return { title: product.name, description: product.description };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="flex items-center gap-1.5 text-sm text-slate-500 mb-8">
        <Link href="/" className="hover:text-amber-500 transition-colors">Início</Link>
        <ChevronRight size={14} />
        <Link href="/produtos" className="hover:text-amber-500 transition-colors">Produtos</Link>
        <ChevronRight size={14} />
        <span className="text-slate-300">{product.shortName}</span>
      </nav>
      <div className="grid lg:grid-cols-2 gap-12">
        <div className="relative h-80 lg:h-[500px] rounded-2xl overflow-hidden border border-slate-700">
          <Image src={product.imageUrl} alt={product.name} fill className="object-cover" priority />
          {product.badge && <span className="absolute top-4 left-4 bg-amber-500 text-slate-900 text-sm font-bold px-3 py-1.5 rounded-full">{product.badge}</span>}
        </div>
        <div>
          <p className="text-amber-500 text-sm font-medium mb-2">{product.category}</p>
          <h1 className="text-3xl font-black text-white leading-tight mb-4">{product.name}</h1>
          <div className="flex items-end gap-3 mb-6">
            <span className="text-4xl font-black text-white">{formatPrice(product.price)}</span>
            <div className="mb-1">
              <span className="text-slate-500 line-through text-sm">{formatPrice(product.originalPrice)}</span>
              <span className="ml-2 bg-red-500/20 text-red-400 text-xs font-bold px-2 py-0.5 rounded">-{discount}% OFF</span>
            </div>
          </div>
          <p className="text-slate-400 leading-relaxed mb-6">{product.description}</p>
          <div className="bg-slate-800 rounded-xl p-5 mb-6">
            <h3 className="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wide">Especificações</h3>
            <ul className="space-y-2">
              {product.features.map((f) => (<li key={f} className="flex items-center gap-2 text-sm text-slate-300"><Check size={15} className="text-amber-500 flex-shrink-0" />{f}</li>))}
            </ul>
          </div>
          <AddToCartButton product={product} />
          <div className="grid grid-cols-2 gap-3 mt-6">
            <div className="flex items-center gap-2 text-xs text-slate-400"><ShieldCheck size={16} className="text-amber-500 flex-shrink-0" />Garantia de 7 dias</div>
            <div className="flex items-center gap-2 text-xs text-slate-400"><Truck size={16} className="text-amber-500 flex-shrink-0" />Envio em até 24h</div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <Link href="/produtos" className="inline-flex items-center gap-1.5 text-slate-500 hover:text-amber-500 text-sm transition-colors"><ArrowLeft size={14} />Voltar para produtos</Link>
      </div>
    </div>
  );
}
