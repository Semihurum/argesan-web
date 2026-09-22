"use client";

import { useState } from "react";
import { useAdmin } from "@/context/AdminContext";
import { Plus, Edit2, Trash2 } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

export default function Catalog() {
  const {
    siteData,
    saveSiteData,
    isAdmin,
    setEditProductModalData,
  } = useAdmin();

  const [active, setActive] = useState("TÜMÜ");

  const categories = siteData?.catalogCategories || [
    "TÜMÜ",
    "WEB & E-TİCARET",
    "GÜVENLİK KAMERA",
    "POS & DONANIM",
    "YAZICI & BARKOD",
    "YAZILIM",
  ];

  const products = siteData?.products || [];

  const handleDeleteProduct = async (e, product) => {
    e.stopPropagation();
    const id = product.id || product._id;
    if (!window.confirm(`"${product.title}" ürününü silmek istediğinize emin misiniz?`)) {
      return;
    }
    const updated = products.filter((p) => String(p.id || p._id) !== String(id));
    await saveSiteData({
      ...siteData,
      products: updated,
    });
  };

  const handleEditProduct = (e, product) => {
    e.stopPropagation();
    setEditProductModalData({ product });
  };

  const filtered = active === "TÜMÜ"
    ? products
    : products.filter((p) => {
        const pCat = (p.category || "").toUpperCase();
        const activeCat = active.toUpperCase();
        if (pCat === activeCat) return true;
        if (Array.isArray(p.categories) && p.categories.some((c) => c.toUpperCase() === activeCat)) return true;
        return false;
      });

  return (
    <section
      id="katalog"
      className="scroll-mt-20 py-16 lg:py-20 bg-white dark:bg-zinc-950 border-b border-slate-100 dark:border-zinc-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Başlık Alanı & Yönetici Ekleme Butonu */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-blue-600 dark:text-blue-400 font-bold tracking-[0.2em] uppercase text-[11px] mb-2 block">
            Ürün & Çözüm Kataloğu
          </span>
          
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-zinc-100 tracking-tight">
              Yetkili Ürünler & Çözümler
            </h2>
            
            {isAdmin && (
              <Button
                size="sm"
                onClick={() => setEditProductModalData({ isNew: true })}
                className="bg-blue-600 hover:bg-blue-500 text-white shadow-sm hover:scale-105"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Yeni Ürün Kartı Ekle</span>
              </Button>
            )}
          </div>

          <p className="mt-3 text-sm text-slate-600 dark:text-zinc-400">
            Kurumsal web yazılımlarından Akınsoft ERP lisanslarına, Dahua & Hikvision kameralardan endüstriyel POS cihazlarına kadar tüm ihtiyaçlarınıza eksiksiz yanıt veriyoruz.
          </p>
        </div>

        {/* Filtre Butonları */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider border transition-colors cursor-pointer ${
                active === cat
                  ? "bg-slate-900 dark:bg-blue-600 text-white border-transparent"
                  : "bg-white dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 border-slate-200 dark:border-zinc-700 hover:border-slate-400 dark:hover:border-zinc-500"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Kartlar (Grid Düzeni) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => {
            const prodId = product.id || product._id;
            return (
              <div
                key={prodId}
                className="group relative bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800/50 rounded-2xl p-6 hover:border-blue-500/40 dark:hover:border-blue-500/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                {/* Yönetici Düzenle & Sil Butonları */}
                {isAdmin && (
                  <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 bg-white/95 dark:bg-zinc-900/95 backdrop-blur p-1 rounded-xl border border-slate-200 dark:border-zinc-700 shadow-md">
                    <button
                      type="button"
                      onClick={(e) => handleEditProduct(e, product)}
                      className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-colors cursor-pointer"
                      title="Ürünü Düzenle"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleDeleteProduct(e, product)}
                      className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors cursor-pointer"
                      title="Ürünü Sil"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* Ürün Görsel Alanı */}
                <div className="relative w-full h-48 rounded-xl bg-slate-50 dark:bg-zinc-950/60 border border-slate-200/40 dark:border-zinc-800/40 p-4 flex items-center justify-center overflow-hidden mb-4">
                  {/* Kategori Rozeti */}
                  <div className="absolute top-3 left-3 z-10">
                    <Badge variant="neutral" size="sm">
                      {product.categoryBadge || product.category}
                    </Badge>
                  </div>

                  {/* Birebir Ürün Fotoğrafı */}
                  <img
                    src={product.image || "/images/products/web-cms-mockup.png"}
                    alt={product.title}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                {/* İçerik Bilgileri */}
                <div className="flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="font-bold text-[15px] text-slate-900 dark:text-zinc-100 mb-2 leading-snug">
                      {product.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                      {product.description || product.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-slate-400 dark:text-zinc-500 text-sm">
            Bu kategoride henüz ürün bulunmuyor.
          </div>
        )}

      </div>
    </section>
  );
}
