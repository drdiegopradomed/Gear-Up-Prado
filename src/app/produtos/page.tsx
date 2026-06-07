import type { Metadata } from "next";
import { getProductsWithOverrides } from "@/lib/products-with-overrides";
import ProductCard from "@/components/ProductCard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Produtos", description: "Explore nossa curadoria de gadgets, ferramentas e utilidades práticas." };

const categoryMap: Record<string, string> = {
  gadgets: "Gadgets & Eletrônicos",
  casa: "Automação Residencial",
  camping: "Camping & Aventura",
  ferramentas: "Ferramentas & Utilidades",
};

const categoryLabels: Record<string, string> = {
  gadgets: "Gadgets & Tecnologia",
  casa: "Casa & Garagem",
  camping: "Camping & Aventura",
  ferramentas: "Ferramentas & Reparos",
};

export default async function ProdutosPage({ searchParams }: { searchParams: Promise<{ cat?: string }> }) {
  const { cat } = await searchParams;
  const categoryFilter = cat ? categoryMap[cat] : null;
  const allProducts = await getProductsWithOverrides();
  const filtered = categoryFilter ? allProducts.filter((p) => p.category === categoryFilter) : allProducts;
  const displayLabel = cat ? (categoryLabels[cat] ?? categoryFilter) : "Todos os Produtos";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white mb-2">{displayLabel}</h1>
        <p className="text-slate-400">{filtered.length} produto{filtered.length !== 1 ? "s" : ""} disponíveis</p>
      </div>
      <div className="flex flex-wrap gap-2 mb-8">
        <a href="/produtos" className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${!cat ? "bg-amber-500 text-slate-900" : "bg-slate-800 text-slate-400 hover:text-white border border-slate-700"}`}>Todos</a>
        {Object.entries(categoryLabels).map(([slug, label]) => (
          <a key={slug} href={`/produtos?cat=${slug}`} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${cat === slug ? "bg-amber-500 text-slate-900" : "bg-slate-800 text-slate-400 hover:text-white border border-slate-700"}`}>{label}</a>
        ))}
      </div>
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-slate-500">
          <p className="text-lg">Nenhum produto nesta categoria ainda.</p>
          <a href="/produtos" className="text-amber-500 mt-2 inline-block hover:underline">Ver todos os produtos</a>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product) => (<ProductCard key={product.id} product={product} />))}
        </div>
      )}
    </div>
  );
}
