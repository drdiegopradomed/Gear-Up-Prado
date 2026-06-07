"use client";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Truck } from "lucide-react";
import { type Product, formatPrice } from "@/lib/products";
import { useCart } from "./CartProvider";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg key={star} className={`w-3 h-3 ${star <= Math.round(rating) ? "text-amber-400" : "text-slate-600"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  return (
    <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-amber-500/50 transition-all group flex flex-col">
      <Link href={`/produtos/${product.slug}`} className="block relative">
        <div className="relative h-52 overflow-hidden">
          <Image src={product.imageUrl} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
          {product.badge && <span className="absolute top-2 left-2 bg-amber-500 text-slate-900 text-xs font-bold px-2.5 py-1 rounded-full">{product.badge}</span>}
          {discount > 0 && <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">-{discount}%</span>}
        </div>
      </Link>
      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-amber-500 font-medium mb-1">{product.category}</p>
        <Link href={`/produtos/${product.slug}`}>
          <h3 className="font-semibold text-white text-sm leading-tight hover:text-amber-400 transition-colors line-clamp-2 mb-2">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-1.5 mb-3">
          <StarRating rating={product.rating} />
          <span className="text-xs text-slate-400">{product.rating.toFixed(1)} ({product.reviewCount})</span>
        </div>
        <div className="flex items-center gap-1.5 mb-3 text-xs text-slate-400">
          <Truck size={12} className="text-green-400 flex-shrink-0" />
          <span className="text-green-400 font-medium">Entrega em {product.deliveryDays}</span>
        </div>
        <div className="flex items-center gap-2 mb-4 mt-auto">
          <span className="text-xl font-black text-white">{formatPrice(product.price)}</span>
          <span className="text-xs text-slate-500 line-through">{formatPrice(product.originalPrice)}</span>
        </div>
        <button onClick={() => addItem(product)} className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-sm py-2.5 rounded-lg transition-colors">
          <ShoppingCart size={15} />Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
}
