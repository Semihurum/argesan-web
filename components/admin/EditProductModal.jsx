"use client";

import { useState, useEffect } from "react";
import { useAdmin } from "@/context/AdminContext";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

const CATEGORIES = [
  "WEB & E-TİCARET",
  "GÜVENLİK KAMERA",
  "POS & DONANIM",
  "YAZICI & BARKOD",
  "YAZILIM",
];

const PRESET_IMAGES = [
  { label: "Web CMS", value: "/images/products/web-cms-mockup.png" },
  { label: "B2B Portal", value: "/images/products/b2b-portal-mockup.png" },
  { label: "Akınsoft ERP", value: "/images/products/akinsoft-wolvox-erp.png" },
  { label: "Dahua Dome Kamera", value: "/images/products/dahua-dome-4k.png" },
  { label: "Hikvision Kamera", value: "/images/products/hikvision-bullet-acusense.png" },
  { label: "POS Terminal", value: "/images/products/pos-terminal-15-6.png" },
  { label: "Barkod Okuyucu", value: "/images/products/honeywell-voyager-1250g.png" },
  { label: "Termal Fiş Yazıcı", value: "/images/products/thermal-receipt-printer-80mm.png" },
  { label: "Dahua NVR Kayıt Cihazı", value: "/images/products/dahua-nvr-16ch.png" },
];

export default function EditProductModal() {
  const { editProductModalData, setEditProductModalData, siteData, saveSiteData } = useAdmin();
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    category: "WEB & E-TİCARET",
    categoryBadge: "Web & Yazılım",
    image: "/images/products/web-cms-mockup.png",
    description: "",
  });
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const isOpen = !!editProductModalData;

  useEffect(() => {
    if (editProductModalData?.product) {
      const p = editProductModalData.product;
      setFormData({
        id: p.id || p._id || "",
        title: p.title || "",
        category: p.category || "WEB & E-TİCARET",
        categoryBadge: p.categoryBadge || p.category || "Genel",
        image: p.image || "/images/products/web-cms-mockup.png",
        description: p.description || p.desc || "",
      });
    } else if (editProductModalData?.isNew) {
      setFormData({
        id: "",
        title: "",
        category: "WEB & E-TİCARET",
        categoryBadge: "Web & Yazılım",
        image: "/images/products/web-cms-mockup.png",
        description: "",
      });
    }
  }, [editProductModalData]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg("");

    try {
      if (editProductModalData.isNew) {
        // Yeni ürün: POST /api/products
        const res = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Ürün eklenemedi.");
        }

        const newProd = await res.json();
        // siteData state senkronize et
        const currentProducts = [...(siteData?.products || [])];
        currentProducts.unshift(newProd);
        if (siteData) {
          saveSiteData({ ...siteData, products: currentProducts });
        }
      } else {
        // Mevcut ürün güncelleme: siteData üzerinden kaydet
        const currentProducts = [...(siteData?.products || [])];
        const idx = currentProducts.findIndex((p) => String(p.id || p._id) === String(formData.id));
        if (idx !== -1) {
          currentProducts[idx] = {
            ...currentProducts[idx],
            ...formData,
          };
          await saveSiteData({ ...siteData, products: currentProducts });
        }
      }

      setEditProductModalData(null);
    } catch (err) {
      setErrorMsg(err.message || "Bir hata oluştu.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setEditProductModalData(null)}
      title={editProductModalData?.isNew ? "Yeni Ürün Kartı Ekle" : "Ürün Kartını Düzenle"}
      description="Katalogda listelenen ürünün başlık, kategori, görsel ve açıklamasını güncelleyin."
      maxWidth="max-w-xl"
    >
      {errorMsg && (
        <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-xs text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="block font-semibold text-slate-700 dark:text-zinc-300 mb-1">
            Ürün / Çözüm Başlığı *
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Örn: Hikvision ColorVu 4K IP Kamera"
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-slate-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-zinc-300 mb-1">
              Kategori Seçimi *
            </label>
            <select
              value={formData.category}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  category: e.target.value,
                  categoryBadge: e.target.value,
                });
              }}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-slate-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-zinc-300 mb-1">
              Kategori Rozet Metni
            </label>
            <input
              type="text"
              value={formData.categoryBadge}
              onChange={(e) => setFormData({ ...formData, categoryBadge: e.target.value })}
              placeholder="Örn: Güvenlik Kamera"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-slate-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 dark:text-zinc-300 mb-1">
            Ürün Görseli (URL veya Dosya Yolu) *
          </label>
          <input
            type="text"
            required
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            placeholder="/images/products/..."
            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-slate-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex flex-wrap gap-1.5 pt-2">
            <span className="text-[10px] text-slate-400 dark:text-zinc-500 mr-1 self-center">Hazır Seçenekler:</span>
            {PRESET_IMAGES.map((preset) => (
              <button
                type="button"
                key={preset.value}
                onClick={() => setFormData({ ...formData, image: preset.value })}
                className={`px-2 py-1 rounded text-[10px] font-medium border transition-colors cursor-pointer ${
                  formData.image === preset.value
                    ? "bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 border-blue-300 dark:border-blue-700"
                    : "bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 border-transparent hover:border-slate-300"
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 dark:text-zinc-300 mb-1">
            Ürün Açıklaması *
          </label>
          <textarea
            required
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Ürünün teknik donanımı ve kullanım avantajlarını yazın..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-slate-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        <div className="pt-2 flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => setEditProductModalData(null)}
          >
            Vazgeç
          </Button>
          <Button
            type="submit"
            loading={saving}
          >
            {editProductModalData?.isNew ? "Ürünü Ekle" : "Kaydet"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
