"use client";

import { useAdmin } from "@/context/AdminContext";
import { ShieldCheck, Plus, ArrowLeft, Package, LogOut } from "lucide-react";
import Button from "@/components/ui/Button";

export default function AdminTopBar() {
  const {
    isVisualEditMode,
    disableVisualEdit,
    logout,
    setEditProductModalData,
  } = useAdmin();

  if (!isVisualEditMode) return null;

  return (
    <aside
      aria-label="Yönetici Canlı Düzenleme Çubuğu"
      className="sticky top-0 z-50 w-full bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800/80 text-zinc-100 shadow-2xl transition-all"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* Sol Gösterge */}
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold text-[11px] tracking-wide">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>CANLI DÜZENLEME MODU AKTİF</span>
          </div>
        </div>

        {/* Orta Hızlı Aksiyonlar */}
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={() => setEditProductModalData({ isNew: true })}
            className="bg-blue-600 hover:bg-blue-500 text-white"
          >
            <Package className="w-3.5 h-3.5" />
            <span>+ Yeni Ürün Ekle</span>
          </Button>
        </div>

        {/* Sağ: Geri Dön ve Çıkış */}
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={disableVisualEdit}
            className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border-amber-500/30 font-bold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>← Admin Paneline Geri Dön</span>
          </Button>

          <button
            type="button"
            onClick={logout}
            className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 transition-colors cursor-pointer"
            title="Güvenli Çıkış"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </aside>
  );
}
