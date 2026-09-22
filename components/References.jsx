"use client";

import { useState } from "react";
import {
  Building2,
  ShieldCheck,
  Scale,
  Building,
  ShoppingCart,
  UtensilsCrossed,
  Coffee,
  Fish,
  Fuel,
  Tv,
  Shirt,
  ShoppingBag,
  Landmark,
  Store,
  Utensils,
  Sparkles,
  Beef,
  Leaf,
  Apple,
  Sofa,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const iconMap = {
  Building2,
  ShieldCheck,
  Scale,
  Building,
  ShoppingCart,
  UtensilsCrossed,
  Coffee,
  Fish,
  Fuel,
  Tv,
  Shirt,
  ShoppingBag,
  Landmark,
  Store,
  Utensils,
  Sparkles,
  Beef,
  Leaf,
  Apple,
  Sofa,
};

const allReferences = [
  // MEVCUT İLK 8 KART
  { name: "Kahramanmaraş İl Sağlık Müdürlüğü", category: "Kamu Altyapı", icon: "Building2" },
  { name: "Kahramanmaraş İl Emniyet Müdürlüğü", category: "Güvenlik & Network", icon: "ShieldCheck" },
  { name: "Kahramanmaraş Barosu", category: "Kurumsal IT Destek", icon: "Scale" },
  { name: "Kahramanmaraş TOKİ Projeleri", category: "Kamera & Çevre Güvenlik", icon: "Building" },
  { name: "Cenmar Gross Marketler", category: "ERP & POS Otomasyonu", icon: "ShoppingCart" },
  { name: "Fırnız Lotus Restaurant", category: "Adisyon & Güvenlik", icon: "UtensilsCrossed" },
  { name: "White Stone Cafe & Bistro", category: "Restoran Otomasyonu", icon: "Coffee" },
  { name: "Karsu Alabalık Tesisleri", category: "Saha Ağ & Kamera", icon: "Fish" },

  // GENİŞLETİLMİŞ LİSTE (DAHA FAZLASI AÇILINCA GELECEKLER)
  { name: "Shell Akaryakıt", category: "Akınsoft ERP & İstasyon Otomasyonu", icon: "Fuel" },
  { name: "Opet Akaryakıt", category: "İstasyon Otomasyon & Güvenlik", icon: "Fuel" },
  { name: "Arçelik Yetkili Bayi", category: "Ticari Yazılım & Donanım", icon: "Tv" },
  { name: "Mavi", category: "Mağaza & Barkod Çözümleri", icon: "Shirt" },
  { name: "Seç Market", category: "Barkodlu Hızlı Satış & Kasa", icon: "ShoppingCart" },
  { name: "Çolakoğlu AVM", category: "POS & Ağ Altyapısı", icon: "ShoppingBag" },
  { name: "Hasçolakoğlu AVM", category: "ERP & Çevre Güvenlik", icon: "ShoppingBag" },
  { name: "Özçolakoğlu AVM", category: "Kasa & Barkod Sistemleri", icon: "ShoppingBag" },
  { name: "ESKKK (Kredi Kefalet)", category: "Kurumsal Altyapı", icon: "Landmark" },
  { name: "İl / İlçe Müftülüğü", category: "Güvenlik & Kamera", icon: "Building2" },
  { name: "TP (Türkiye Petrolleri)", category: "Akınsoft & Ağ Çözümleri", icon: "Fuel" },
  { name: "Kadoil Akaryakıt", category: "İstasyon Otomasyonu", icon: "Fuel" },
  { name: "Gross Market", category: "Hızlı Satış & Barkod", icon: "Store" },
  { name: "Murat Marketler", category: "POS Terminal & ERP", icon: "Store" },
  { name: "Hepiyi Market", category: "Market Otomasyonu", icon: "ShoppingCart" },
  { name: "Totem Cafe", category: "Dokunmatik Adisyon & Mutfak", icon: "Coffee" },
  { name: "Merlin Cafe", category: "Adisyon Sistemi", icon: "Coffee" },
  { name: "Massa Cafe", category: "Restoran Otomasyonu", icon: "Coffee" },
  { name: "Pascha Cafe", category: "Dokunmatik Kasa & Adisyon", icon: "Coffee" },
  { name: "Vegas Cafe", category: "Adisyon & Ağ Altyapısı", icon: "Coffee" },
  { name: "Hatay Döner Restaurant", category: "Hızlı Satış & Yazıcı Çözümleri", icon: "Utensils" },
  { name: "Teras Cafe", category: "Adisyon Otomasyonu", icon: "Coffee" },
  { name: "Divan Kozmetik", category: "Mağaza Satış & Stok Yönetimi", icon: "Sparkles" },
  { name: "Maraş AWM (Zincir)", category: "Merkezi ERP & Barkod", icon: "Store" },
  { name: "Emre Ülker Et & Et Ürünleri", category: "Barkodlu Terazi & ERP", icon: "Beef" },
  { name: "Beylerbeyi Kasap", category: "Terazi & Hızlı Kasa", icon: "Beef" },
  { name: "Hasbahçe Yöresel", category: "Stok & Ön Muhasebe", icon: "Store" },
  { name: "MFD Yöresel", category: "Barkod & Kasa Otomasyonu", icon: "Store" },
  { name: "Kardeşler Tarım", category: "Ticari ERP & Ön Muhasebe", icon: "Leaf" },
  { name: "Ender Tarım", category: "Stok Takip & Fatura", icon: "Leaf" },
  { name: "Çakıroğlu Manav", category: "Barkodlu Terazi Entegrasyonu", icon: "Apple" },
  { name: "Şairler Manav", category: "Hızlı Satış Kasa Otomasyonu", icon: "Apple" },
  { name: "Kıyak Mobilya", category: "Ticari Yazılım & Altyapı", icon: "Sofa" },
  { name: "DK Beauty", category: "Randevu & Kasa Takip", icon: "Sparkles" },
  { name: "Katre Güzellik", category: "Müşteri & Kasa Yönetimi", icon: "Sparkles" },
  { name: "RHM Butik", category: "Barkodlu Satış & Stok", icon: "Shirt" }
];

export default function References() {
  const [showAll, setShowAll] = useState(false);

  const displayedReferences = showAll ? allReferences : allReferences.slice(0, 8);

  return (
    <section
      id="referanslar"
      className="scroll-mt-20 py-16 lg:py-20 bg-white dark:bg-zinc-950 border-b border-slate-100 dark:border-zinc-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-blue-600 dark:text-blue-400 font-bold tracking-[0.2em] uppercase text-[11px] mb-2 block">
            Güçlü İş Ortaklıkları & Referanslar
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-zinc-100 tracking-tight">
            Kahramanmaraş ve Bölgede Bizi Tercih Eden Markalar
          </h2>
          <p className="mt-3 text-sm text-slate-600 dark:text-zinc-400">
            Kamu kurumlarından perakende zincirlerine, akaryakıt istasyonlarından restoranlara kadar yüzlerce işletmenin bilişim ve otomasyon altyapısını kurduk.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {displayedReferences.map((ref, idx) => {
            const Icon = iconMap[ref.icon] || Building2;
            return (
              <div
                key={idx}
                className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-5 flex items-start gap-4 hover:shadow-sm hover:border-slate-300 dark:hover:border-zinc-700 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-[13px] text-slate-800 dark:text-zinc-200 leading-snug mb-0.5">
                    {ref.name}
                  </p>
                  <span className="text-[11px] text-slate-500 dark:text-zinc-500 font-medium">
                    {ref.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Daha Fazla Göster / Daha Az Göster Butonu */}
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900 hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-800 dark:text-zinc-200 transition-all cursor-pointer shadow-sm hover:shadow"
          >
            <span>{showAll ? "Daha Az Göster" : `Tüm Referansları Gör (${allReferences.length} Marka)`}</span>
            {showAll ? (
              <ChevronUp className="w-4 h-4 text-slate-500 dark:text-zinc-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-500 dark:text-zinc-400" />
            )}
          </button>
        </div>

      </div>
    </section>
  );
}