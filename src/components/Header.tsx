"use client";
import Link from "next/link";
import { ShoppingCart, Menu, X, Zap } from "lucide-react";
import { useState } from "react";
import { useCart } from "./CartProvider";
import CartDrawer from "./CartDrawer";

export default function Header() {
  const { count, openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = [{ href: "/produtos", label: "Produtos" }, { href: "/produtos?cat=gadgets", label: "Gadgets" }, { href: "/produtos?cat=camping", label: "Camping" }, { href: "/produtos?cat=automacao", label: "Casa Inteligente" }];

  return (
    <>
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-amber-500 rounded p-1.5 group-hover:bg-amber-400 transition-colors"><Zap size={18} className="text-slate-900" strokeWidth={2.5} /></div>
              <div className="leading-none"><span className="font-black text-white tracking-tight text-lg">GEAR UP</span><span className="font-black text-amber-500 tracking-tight text-lg ml-1">PRADO</span></div>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (<Link key={link.href} href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors font-medium">{link.label}</Link>))}
            </nav>
            <div className="flex items-center gap-3">
              <button onClick={openCart} className="relative p-2 text-slate-400 hover:text-white transition-colors" aria-label="Carrinho">
                <ShoppingCart size={22} />
                {count > 0 && <span className="absolute -top-1 -right-1 bg-amber-500 text-slate-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">{count > 9 ? "9+" : count}</span>}
              </button>
              <button className="md:hidden p-2 text-slate-400 hover:text-white" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
            </div>
          </div>
          {menuOpen && (<div className="md:hidden border-t border-slate-800 py-4 space-y-2">{navLinks.map((link) => (<Link key={link.href} href={link.href} className="block px-2 py-2 text-slate-300 hover:text-amber-500 font-medium transition-colors" onClick={() => setMenuOpen(false)}>{link.label}</Link>))}</div>)}
        </div>
      </header>
      <CartDrawer />
    </>
  );
}
