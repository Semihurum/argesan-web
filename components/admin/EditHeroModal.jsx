"use client";

import { useState, useEffect } from "react";
import { useAdmin } from "@/context/AdminContext";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

export default function EditHeroModal() {
  const { editHeroModalOpen, setEditHeroModalOpen, siteData, saveSiteData } = useAdmin();
  const [formData, setFormData] = useState({
    badge: "",
    title: "",
    description: "",
    ctaText: "",
    image: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (siteData?.hero) {
      setFormData({
        badge: siteData.hero.badge || "",
        title: siteData.hero.title || "",
        description: siteData.hero.description || "",
        ctaText: siteData.hero.ctaText || "İletişime Geçin",
        image: siteData.hero.image || "",
      });
    }
  }, [siteData, editHeroModalOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await saveSiteData({
      ...siteData,
      hero: {
        ...formData,
      },
    });
    setSaving(false);
    setEditHeroModalOpen(false);
  };

  return (
    <Modal
      isOpen={editHeroModalOpen}
      onClose={() => setEditHeroModalOpen(false)}
      title="Hero Alanını Düzenle"
      description="Sayfanın en üstündeki ana slogan, açıklama metni ve saha görselini güncelleyin."
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="block font-semibold text-slate-700 dark:text-zinc-300 mb-1">
            Üst Başlık / Rozet (Badge)
          </label>
          <input
            type="text"
            required
            value={formData.badge}
            onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-slate-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-semibold text-slate-700 dark:text-zinc-300 mb-1">
            Ana Başlık (H1)
          </label>
          <textarea
            required
            rows={2}
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-slate-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-semibold text-sm"
          />
        </div>

        <div>
          <label className="block font-semibold text-slate-700 dark:text-zinc-300 mb-1">
            Açıklama Paragrafı
          </label>
          <textarea
            required
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-slate-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        <div>
          <label className="block font-semibold text-slate-700 dark:text-zinc-300 mb-1">
            Sağ Taraf Görsel URL'si
          </label>
          <input
            type="text"
            required
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-slate-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-semibold text-slate-700 dark:text-zinc-300 mb-1">
            Buton Metni
          </label>
          <input
            type="text"
            value={formData.ctaText}
            onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-slate-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="pt-2 flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => setEditHeroModalOpen(false)}
          >
            Vazgeç
          </Button>
          <Button
            type="submit"
            loading={saving}
          >
            Değişiklikleri Kaydet
          </Button>
        </div>
      </form>
    </Modal>
  );
}
