"use client";

import Image from "next/image";
import { ArrowRight, CheckCircle2, MapPin, Edit3 } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

export default function Hero() {
  const { siteData, isAdmin, setEditHeroModalOpen } = useAdmin();

  const hero = siteData?.hero || {
    badge: "KAHRAMANMARAŞ ONİKİŞUBAT — WEB, BİLİŞİM & GÜVENLİK",
    title: "İşletmeniz İçin Kurumsal Web, Bilişim, Güvenlik ve Donanım Çözümleri",
    description: "Modern mobil uyumlu kurumsal web siteleri, Akınsoft ERP ticari yazılımları, 4K akıllı güvenlik kamera sistemleri ve dokunmatik POS donanımıyla Kahramanmaraş ve çevre illerde işletmenizin yanındayız.",
    ctaText: "İletişime Geçin",
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=80",
  };

  const highlights = [
    "Kurumsal Web Tasarımı, E-Ticaret & SEO Odaklı Dijital Çözümler",
    "Akınsoft ERP, Ön Muhasebe ve e-Dönüşüm Çözümleri (e-Fatura, e-Arşiv, e-İrsaliye)",
    "Dahua, Hikvision, Uniview 4K CCTV & IP Kamera Montajı (PoE altyapısı, NVR sistemleri)",
    "Dokunmatik POS Sistemleri, Barkod Otomasyonu & Şirketlere Özel SLA Bakım",
  ];

  const handleContact = (e) => {
    e.preventDefault();
    const el = document.getElementById("iletisim");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="bg-white dark:bg-zinc-950 border-b border-slate-100 dark:border-zinc-800 relative">
      
      {/* Yönetici Düzenle Butonu */}
      {isAdmin && (
        <div className="absolute top-4 right-4 sm:top-6 sm:right-8 z-20">
          <button
            type="button"
            onClick={() => setEditHeroModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
          >
            <Edit3 className="w-4 h-4" />
            <span>Hero Alanını Düzenle</span>
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Sol */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <span className="text-blue-600 dark:text-blue-400 font-bold tracking-[0.2em] uppercase text-[11px] mb-4 block">
              {hero.badge}
            </span>

            <h1 className="text-slate-900 dark:text-zinc-100 font-extrabold text-3xl sm:text-4xl md:text-[42px] lg:text-[44px] leading-[1.2] tracking-tight mb-5">
              {hero.title}
            </h1>

            <p className="text-slate-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed mb-7 max-w-xl">
              {hero.description}
            </p>

            <div className="space-y-2.5 mb-8">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div>
              <a
                href="#iletisim"
                onClick={handleContact}
                className="inline-flex items-center justify-center gap-2 px-7 h-12 rounded-xl bg-slate-900 dark:bg-blue-600 hover:bg-slate-700 dark:hover:bg-blue-700 text-white font-bold text-sm tracking-wide transition-colors shadow-sm"
              >
                {hero.ctaText || "İletişime Geçin"}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Sağ — Saha Fotoğrafı */}
          <div className="w-full lg:w-1/2">
            <div className="relative h-[280px] sm:h-[360px] lg:h-[440px] rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-zinc-800 bg-slate-100 dark:bg-zinc-900">
              <img
                src={hero.image || "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=80"}
                alt="ARGE-SAN Teknoloji – Saha Kurulum ve Güvenlik Sistemi"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-5 py-4 flex items-center justify-between text-xs text-white">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-semibold">Bilişim, Web & Saha Güvenlik Ekibi</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" />
                  <span>Onikişubat / Kahramanmaraş</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}