"use client";
import { ShoppingCart } from "lucide-react";
import type { Product } from "@/lib/products";
import { useCart } from "@/components/CartProvider";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  return (
    <button onClick={() => addItem(product)} className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-4 rounded-xl transition-colors text-lg">
      <ShoppingCart size={20} />Adicionar ao Carrinho
    </button>
  );
}
