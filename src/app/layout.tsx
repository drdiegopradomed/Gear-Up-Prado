import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: { default: "KitCerto — Gadgets, Ferramentas e Utilidades", template: "%s | KitCerto" },
  description: "Equipamentos úteis para casa, carro, rotina e aventura. Gadgets, ferramentas e utilidades para simplificar o dia a dia.",
  keywords: ["gadgets", "ferramentas", "smartwatch", "lanterna tática", "fechadura digital", "câmera wifi", "camping", "kit certo", "utilidades"],
  openGraph: { title: "KitCerto", description: "Equipamentos para homens que gostam de estar preparados.", locale: "pt_BR", type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-slate-900 text-white min-h-screen flex flex-col">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
