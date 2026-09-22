"use client";

import { useState } from "react";
import {
  ShieldCheck,
  Award,
  Users,
  Target,
  Globe2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const brands = [
  // 1. Satır (6 Marka)
  { name: "AKINSOFT", sub: "ERP & Ticari Yazılım" },
  { name: "WOLVOX", sub: "Kurumsal ERP" },
  { name: "OCTOCLOUD", sub: "Bulut Muhasebe" },
  { name: "HIKVISION", sub: "Güvenlik Sistemleri" },
  { name: "DAHUA", sub: "Full-Color & AI" },
  { name: "UNV", sub: "IP Video Gözetim" },

  // 2. Satır (6 Marka - Toplam 12)
  { name: "TIANDY", sub: "Yapay Zekâ CCTV" },
  { name: "AXIS", sub: "Endüstriyel Kamera" },
  { name: "BOSCH", sub: "Güvenlik & İletişim" },
  { name: "HANWHA", sub: "Profesyonel Video" },
  { name: "TP-LINK", sub: "Ağ Çözümleri" },
  { name: "UBIQUITI", sub: "UniFi Kablosuz Ağ" },

  // 3. Satır (Daha Fazla Göster ile Açılacak +7 Marka)
  { name: "MIKROTIK", sub: "Router & Firewall" },
  { name: "RUIJIE", sub: "Kurumsal Switch" },
  { name: "CISCO", sub: "Kurumsal Network" },
  { name: "ARUBA (HPE)", sub: "Enterprise Wi-Fi" },
  { name: "ZYXEL", sub: "Ağ Altyapısı" },
  { name: "D-LINK", sub: "Switch & Donanım" },
  { name: "HUAWEI", sub: "Ağ & Telekom" },
];

const highlights = [
  {
    Icon: ShieldCheck,
    title: "GÜVENİLİR",
    desc: "Yetkili Markalar",
  },
  {
    Icon: Award,
    title: "YÜKSEK KALİTE",
    desc: "Ürün ve Hizmetler",
  },
  {
    Icon: Users,
    title: "UZMAN EKİP",
    desc: "Profesyonel Destek",
  },
  {
    Icon: Target,
    title: "DOĞRU ÇÖZÜM",
    desc: "İhtiyacınıza Özel",
  },
  {
    Icon: Globe2,
    title: "GENİŞ AĞ",
    desc: "K.Maraş & Bölge",
  },
];

export default function Partners() {
  const [showAllBrands, setShowAllBrands] = useState(false);

  // Varsayılan olarak ilk 2 satır (ilk 12 marka)
  const displayedBrands = showAllBrands ? brands : brands.slice(0, 12);

  return (
    <section className="py-16 bg-white dark:bg-zinc-950 border-b border-slate-100 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 1. Başlık Alanı */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-blue-600 dark:text-blue-400 font-bold tracking-[0.2em] uppercase text-[11px] mb-2 block">
            Teknoloji & Çözüm Ortaklarımız
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-zinc-100 tracking-tight">
            Yetkili ve Güvenilir Markalar
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-zinc-400">
            Projelerimizde yalnızca dünya ve Türkiye standartlarında onaylı, distribütör garantili donanım ve yazılım markalarıyla çalışıyoruz.
          </p>
        </div>

        {/* 2. Marka Kartları Izgarası */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {displayedBrands.map((brand, idx) => (
            <div
              key={idx}
              className="bg-slate-50/70 dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 rounded-xl p-4 flex flex-col items-center justify-center text-center hover:border-blue-400/50 dark:hover:border-blue-500/40 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200"
            >
              <span className="font-extrabold text-slate-900 dark:text-zinc-100 text-sm tracking-wider">
                {brand.name}
              </span>
              <span className="text-[10px] text-slate-400 dark:text-zinc-500 mt-0.5 font-medium">
                {brand.sub}
              </span>
            </div>
          ))}
        </div>

        {/* 3. Daha Fazla / Daha Az Göster Butonu */}
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAllBrands(!showAllBrands)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-semibold border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-800 dark:text-zinc-200 transition-colors cursor-pointer shadow-sm"
          >
            <span>{showAllBrands ? "Daha Az Marka Göster" : "Daha Fazla Marka Göster (+7 Marka)"}</span>
            {showAllBrands ? (
              <ChevronUp className="w-3.5 h-3.5 text-slate-500" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            )}
          </button>
        </div>

        {/* 4. Alt Güven Rozetleri (5'li Yatay Bant) */}
        <div className="mt-12 pt-8 border-t border-slate-100 dark:border-zinc-800/80 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {highlights.map((item, idx) => {
            const Icon = item.Icon;
            return (
              <div key={idx} className="flex items-center gap-3 justify-center sm:justify-start">
                <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-zinc-100 tracking-wide">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-slate-400 dark:text-zinc-500">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
