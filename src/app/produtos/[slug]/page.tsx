import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Check, ShieldCheck, Truck, ArrowLeft, Star, RotateCcw, Lock } from "lucide-react";
import { products, formatPrice } from "@/lib/products";
import { getProductWithOverride } from "@/lib/products-with-overrides";
import AddToCartButton from "./AddToCartButton";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductWithOverride(slug);
  if (!product) return {};
  return { title: product.name, description: product.description };
}

function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg key={star} style={{ width: size, height: size }} className={star <= Math.round(rating) ? "text-amber-400" : "text-slate-600"} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductWithOverride(slug);
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
          <h1 className="text-3xl font-black text-white leading-tight mb-3">{product.name}</h1>

          <div className="flex items-center gap-3 mb-5">
            <StarRating rating={product.rating} size={18} />
            <span className="text-amber-400 font-bold">{product.rating.toFixed(1)}</span>
            <span className="text-slate-500 text-sm">({product.reviewCount} avaliações)</span>
          </div>

          <div className="flex items-end gap-3 mb-5">
            <span className="text-4xl font-black text-white">{formatPrice(product.price)}</span>
            <div className="mb-1">
              <span className="text-slate-500 line-through text-sm">{formatPrice(product.originalPrice)}</span>
              <span className="ml-2 bg-red-500/20 text-red-400 text-xs font-bold px-2 py-0.5 rounded">-{discount}% OFF</span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-2.5 mb-5 w-fit">
            <Truck size={16} className="text-green-400" />
            <span className="text-green-400 text-sm font-semibold">Entrega estimada: {product.deliveryDays}</span>
          </div>

          <p className="text-slate-400 leading-relaxed mb-6">{product.description}</p>

          <div className="bg-slate-800 rounded-xl p-5 mb-6">
            <h3 className="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wide">Especificações</h3>
            <ul className="space-y-2">
              {product.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                  <Check size={15} className="text-amber-500 flex-shrink-0" />{f}
                </li>
              ))}
            </ul>
          </div>

          <AddToCartButton product={product} />

          <div className="grid grid-cols-3 gap-3 mt-5">
            <div className="flex flex-col items-center gap-1 bg-slate-800/50 rounded-lg p-3 text-center">
              <ShieldCheck size={18} className="text-green-400" />
              <span className="text-xs text-slate-400">Garantia 7 dias</span>
            </div>
            <div className="flex flex-col items-center gap-1 bg-slate-800/50 rounded-lg p-3 text-center">
              <Lock size={18} className="text-blue-400" />
              <span className="text-xs text-slate-400">Pagamento seguro</span>
            </div>
            <div className="flex flex-col items-center gap-1 bg-slate-800/50 rounded-lg p-3 text-center">
              <RotateCcw size={18} className="text-amber-400" />
              <span className="text-xs text-slate-400">Troca grátis</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      {product.reviews && product.reviews.length > 0 && (
        <div className="mt-14">
          <h2 className="text-xl font-black text-white mb-6 flex items-center gap-2">
            <Star size={20} className="text-amber-400" fill="currentColor" />
            Avaliações dos clientes
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {product.reviews.map((review, i) => (
              <div key={i} className="bg-slate-800 border border-slate-700 rounded-xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <StarRating rating={review.rating} size={14} />
                  <span className="text-xs text-slate-500">{review.date}</span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-3">"{review.comment}"</p>
                <p className="text-amber-500 text-xs font-semibold">{review.author}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8">
        <Link href="/produtos" className="inline-flex items-center gap-1.5 text-slate-500 hover:text-amber-500 text-sm transition-colors">
          <ArrowLeft size={14} />Voltar para produtos
        </Link>
      </div>
    </div>
  );
}
