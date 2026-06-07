"use client";
import Link from "next/link";
import Image from "next/image";
import { X, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "./CartProvider";
import { formatPrice } from "@/lib/products";

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, total, count, isOpen, closeCart } = useCart();
  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm" onClick={closeCart} />}
      <aside className={`fixed right-0 top-0 h-full w-full max-w-md bg-slate-900 border-l border-slate-800 z-50 flex flex-col transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <div className="flex items-center gap-2"><ShoppingBag size={20} className="text-amber-500" /><h2 className="font-bold text-white text-lg">Carrinho {count > 0 && <span className="text-amber-500">({count})</span>}</h2></div>
          <button onClick={closeCart} className="p-2 text-slate-400 hover:text-white transition-colors"><X size={20} /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-500 gap-3">
              <ShoppingBag size={48} strokeWidth={1} />
              <p className="text-sm">Seu carrinho está vazio</p>
              <Link href="/produtos" onClick={closeCart} className="text-amber-500 text-sm hover:underline">Ver produtos →</Link>
            </div>
          ) : items.map((item) => (
            <div key={item.product.id} className="flex gap-3 bg-slate-800 rounded-lg p-3">
              <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0"><Image src={item.product.imageUrl} alt={item.product.shortName} fill className="object-cover" /></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white leading-tight line-clamp-2">{item.product.shortName}</p>
                <p className="text-amber-500 font-bold text-sm mt-1">{formatPrice(item.product.price)}</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-6 h-6 bg-slate-700 rounded text-white text-sm hover:bg-slate-600 transition-colors flex items-center justify-center">−</button>
                    <span className="text-white text-sm w-4 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-6 h-6 bg-slate-700 rounded text-white text-sm hover:bg-slate-600 transition-colors flex items-center justify-center">+</button>
                  </div>
                  <button onClick={() => removeItem(item.product.id)} className="text-slate-500 hover:text-red-400 transition-colors"><Trash2 size={15} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {items.length > 0 && (
          <div className="p-5 border-t border-slate-800 space-y-4">
            <div className="flex justify-between items-center"><span className="text-slate-400">Total</span><span className="text-xl font-black text-white">{formatPrice(total)}</span></div>
            <Link href="/checkout" onClick={closeCart} className="block w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-center py-3.5 rounded-lg transition-colors">Finalizar Compra</Link>
          </div>
        )}
      </aside>
    </>
  );
}
