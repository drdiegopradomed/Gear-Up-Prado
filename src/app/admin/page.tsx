"use client";
import { useEffect, useRef, useState } from "react";
import { products, Product, formatPrice } from "@/lib/products";
import { supabase, ProductOverride } from "@/lib/supabase";
import { X, Upload, Save, RotateCcw, LogOut, Edit2, Check, Trash2, Plus } from "lucide-react";

function AdminLogin({ onLogin }: { onLogin: (token: string) => void }) {
  const [pwd, setPwd] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr("");
    const res = await fetch("/api/admin/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pwd }),
    });
    setLoading(false);
    if (res.ok) {
      localStorage.setItem("admin_token", pwd);
      onLogin(pwd);
    } else {
      setErr("Senha incorreta");
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 w-full max-w-sm">
        <div className="text-center mb-6">
          <span className="text-2xl font-black"><span className="text-white">Kit</span><span className="text-amber-400">Certo</span></span>
          <p className="text-slate-400 text-sm mt-1">Painel Administrativo</p>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <input
            type="password"
            placeholder="Senha de administrador"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-amber-500"
          />
          {err && <p className="text-red-400 text-sm">{err}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-3 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? "Verificando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}

function EditModal({
  product,
  adminToken,
  onClose,
  onSaved,
}: {
  product: Product;
  adminToken: string;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(String(product.price));
  const [originalPrice, setOriginalPrice] = useState(String(product.originalPrice));
  const [description, setDescription] = useState(product.description);
  const [featuresText, setFeaturesText] = useState(product.features.join("\n"));
  const [badge, setBadge] = useState(product.badge ?? "");
  const [deliveryDays, setDeliveryDays] = useState(product.deliveryDays);
  const [imageUrl, setImageUrl] = useState(product.imageUrl);
  const [extraImages, setExtraImages] = useState<string[]>(product.images ?? []);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const extraFileRef = useRef<HTMLInputElement>(null);

  async function uploadFiles(files: FileList, target: "main" | "extra") {
    setUploading(true);
    const fd = new FormData();
    fd.append("adminToken", adminToken);
    Array.from(files).forEach((f) => fd.append("file", f));
    setUploadProgress(`Enviando ${files.length} foto${files.length > 1 ? "s" : ""}...`);
    const res = await fetch("<https://pftxshuumirphkosihfn.supabase.co/functions/v1/upload-image>
", { method: "POST", body: fd });
    setUploading(false);
    setUploadProgress("");
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      alert("Erro no upload: " + (data.error ?? res.status));
      return;
    }
    const { urls } = await res.json();
    if (target === "main") {
      setImageUrl(urls[0]);
      if (urls.length > 1) setExtraImages((prev) => [...prev, ...urls.slice(1)]);
    } else {
      setExtraImages((prev) => [...prev, ...urls]);
    }
  }

  async function save() {
    setSaving(true);
    const res = await fetch(`/api/admin/products/${product.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        adminToken,
        name,
        price: Number(price),
        originalPrice: Number(originalPrice),
        description,
        features: featuresText.split("\n").map((s) => s.trim()).filter(Boolean),
        imageUrl,
        images: extraImages.length > 0 ? extraImages : null,
        badge: badge || null,
        deliveryDays,
        inStock: true,
      }),
    });
    setSaving(false);
    if (res.ok) {
      setSaved(true);
      setTimeout(() => { onSaved(); onClose(); }, 800);
    } else {
      alert("Erro ao salvar");
    }
  }

  async function resetOverride() {
    if (!confirm("Remover todas as edições e voltar ao padrão?")) return;
    await fetch(`/api/admin/products/${product.id}?token=${adminToken}`, { method: "DELETE" });
    onSaved();
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-2xl my-8">
        <div className="flex items-center justify-between p-5 border-b border-slate-700">
          <h2 className="text-lg font-bold text-white">Editar produto</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><X size={20} /></button>
        </div>

        <div className="p-5 space-y-5">
          {/* Foto principal */}
          <div>
            <label className="text-xs text-slate-400 uppercase tracking-wide mb-2 block">Foto principal</label>
            <div
              className="relative h-48 rounded-xl overflow-hidden border-2 border-dashed border-slate-600 cursor-pointer hover:border-amber-500 transition-colors group"
              onClick={() => fileRef.current?.click()}
            >
              {imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={imageUrl} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-500">
                  <Upload size={32} />
                  <span className="text-sm mt-2">Clique para enviar foto</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="text-white text-sm font-semibold flex items-center gap-2">
                  <Upload size={16} /> {uploading ? uploadProgress : "Trocar foto"}
                </span>
              </div>
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files?.length && uploadFiles(e.target.files, "main")}
            />
            <input
              type="url"
              placeholder="Ou cole uma URL de imagem"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="mt-2 w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Fotos adicionais */}
          <div>
            <label className="text-xs text-slate-400 uppercase tracking-wide mb-2 block">Fotos adicionais</label>
            <div className="grid grid-cols-3 gap-2 mb-2">
              {extraImages.map((url, i) => (
                <div key={i} className="relative h-24 rounded-lg overflow-hidden border border-slate-600 group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={url} alt="" className="w-full h-full object-cover" />
                  <button
                    onClick={() => setExtraImages((prev) => prev.filter((_, idx) => idx !== i))}
                    className="absolute top-1 right-1 bg-black/70 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={12} className="text-red-400" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => extraFileRef.current?.click()}
                disabled={uploading}
                className="h-24 rounded-lg border-2 border-dashed border-slate-600 hover:border-amber-500 flex flex-col items-center justify-center gap-1 text-slate-500 hover:text-amber-400 transition-colors disabled:opacity-50"
              >
                <Plus size={20} />
                <span className="text-xs">{uploading ? uploadProgress : "Adicionar"}</span>
              </button>
            </div>
            <input
              ref={extraFileRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => e.target.files?.length && uploadFiles(e.target.files, "extra")}
            />
            <p className="text-xs text-slate-500">Selecione várias fotos de uma vez na fototeca</p>
          </div>

          {/* Name */}
          <div>
            <label className="text-xs text-slate-400 uppercase tracking-wide mb-1 block">Nome</label>
            <input value={name} onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500" />
          </div>

          {/* Prices */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-400 uppercase tracking-wide mb-1 block">Preço (R$)</label>
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500" />
            </div>
            <div>
              <label className="text-xs text-slate-400 uppercase tracking-wide mb-1 block">Preço original (R$)</label>
              <input type="number" value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500" />
            </div>
          </div>

          {/* Badge & Delivery */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-400 uppercase tracking-wide mb-1 block">Badge (ex: Novo)</label>
              <input value={badge} onChange={(e) => setBadge(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500" />
            </div>
            <div>
              <label className="text-xs text-slate-400 uppercase tracking-wide mb-1 block">Prazo de entrega</label>
              <input value={deliveryDays} onChange={(e) => setDeliveryDays(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500" />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-xs text-slate-400 uppercase tracking-wide mb-1 block">Descrição</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500 resize-none" />
          </div>

          {/* Features */}
          <div>
            <label className="text-xs text-slate-400 uppercase tracking-wide mb-1 block">Especificações (uma por linha)</label>
            <textarea value={featuresText} onChange={(e) => setFeaturesText(e.target.value)} rows={6}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm font-mono focus:outline-none focus:border-amber-500 resize-none" />
          </div>
        </div>

        <div className="flex items-center justify-between p-5 border-t border-slate-700">
          <button onClick={resetOverride} className="flex items-center gap-1.5 text-slate-500 hover:text-red-400 text-sm transition-colors">
            <RotateCcw size={14} /> Resetar para padrão
          </button>
          <div className="flex gap-3">
            <button onClick={onClose} className="px-4 py-2 border border-slate-600 text-slate-300 rounded-lg hover:border-slate-400 text-sm">Cancelar</button>
            <button onClick={save} disabled={saving || uploading}
              className="flex items-center gap-2 px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-lg text-sm disabled:opacity-50 transition-colors">
              {saved ? <><Check size={15} /> Salvo!</> : saving ? "Salvando..." : <><Save size={15} /> Salvar</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [overrides, setOverrides] = useState<Map<string, ProductOverride>>(new Map());
  const [editing, setEditing] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("admin_token");
    if (stored) setToken(stored);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!token) return;
    loadOverrides();
  }, [token]);

  async function loadOverrides() {
    const { data } = await supabase.from("product_overrides").select("*");
    const map = new Map<string, ProductOverride>();
    (data ?? []).forEach((o: ProductOverride) => map.set(o.product_id, o));
    setOverrides(map);
  }

  function getProduct(p: Product): Product {
    const o = overrides.get(p.id);
    if (!o) return p;
    return {
      ...p,
      ...(o.name != null && { name: o.name }),
      ...(o.price != null && { price: o.price }),
      ...(o.original_price != null && { originalPrice: o.original_price }),
      ...(o.description != null && { description: o.description }),
      ...(o.features != null && { features: o.features }),
      ...(o.image_url != null && { imageUrl: o.image_url }),
      ...(o.images != null && { images: o.images }),
      ...(o.badge != null && { badge: o.badge }),
      ...(o.delivery_days != null && { deliveryDays: o.delivery_days }),
    };
  }

  if (loading) return <div className="min-h-screen bg-slate-900" />;
  if (!token) return <AdminLogin onLogin={setToken} />;

  return (
    <div className="min-h-screen bg-slate-900">
      {editing && token && (
        <EditModal
          product={getProduct(editing)}
          adminToken={token}
          onClose={() => setEditing(null)}
          onSaved={() => { loadOverrides(); setEditing(null); }}
        />
      )}

      <div className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
        <div>
          <span className="text-xl font-black"><span className="text-white">Kit</span><span className="text-amber-400">Certo</span></span>
          <span className="text-slate-400 text-sm ml-3">Painel Admin</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="/" target="_blank" className="text-slate-400 hover:text-white text-sm">Ver site ↗</a>
          <button
            onClick={() => { localStorage.removeItem("admin_token"); setToken(null); }}
            className="flex items-center gap-1.5 text-slate-400 hover:text-red-400 text-sm"
          >
            <LogOut size={14} /> Sair
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-black text-white mb-2">Produtos</h1>
        <p className="text-slate-400 text-sm mb-8">Clique em <strong className="text-amber-400">Editar</strong> para alterar fotos, nome, preço ou descrição.</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((p) => {
            const prod = getProduct(p);
            const hasOverride = overrides.has(p.id);
            return (
              <div key={p.id} className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
                <div className="relative h-40 bg-slate-700">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={prod.imageUrl} alt={prod.name} className="w-full h-full object-cover" />
                  {hasOverride && (
                    <span className="absolute top-2 right-2 bg-amber-500 text-slate-900 text-xs font-bold px-2 py-0.5 rounded-full">Editado</span>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-xs text-slate-500 mb-0.5">{prod.category}</p>
                  <p className="text-sm font-semibold text-white leading-tight mb-1 line-clamp-2">{prod.name}</p>
                  <p className="text-amber-400 font-bold text-sm mb-3">{formatPrice(prod.price)}</p>
                  <button
                    onClick={() => setEditing(p)}
                    className="w-full flex items-center justify-center gap-1.5 bg-slate-700 hover:bg-amber-500 hover:text-slate-900 text-slate-300 text-sm font-semibold py-2 rounded-lg transition-colors"
                  >
                    <Edit2 size={13} /> Editar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
