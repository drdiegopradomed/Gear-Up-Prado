"use client";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { type Product, formatPrice } from "@/lib/products";
import { useCart } from "./CartProvider";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  return (
    <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-amber-500/50 transition-all group">
      <Link href={`/produtos/${product.slug}`} className="block relative">
        <div className="relative h-52 overflow-hidden">
          <Image src={product.imageUrl} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
          {product.badge && <span className="absolute top-2 left-2 bg-amber-500 text-slate-900 text-xs font-bold px-2.5 py-1 rounded-full">{product.badge}</span>}
          {discount > 0 && <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">-{discount}%</span>}
        </div>
      </Link>
      <div className="p-4">
        <p className="text-xs text-amber-500 font-medium mb-1">{product.category}</p>
        <Link href={`/produtos/${product.slug}`}><h3 className="font-semibold text-white text-sm leading-tight hover:text-amber-400 transition-colors line-clamp-2 mb-3">{product.name}</h3></Link>
        <div className="flex items-center gap-2 mb-4">
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
