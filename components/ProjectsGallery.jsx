"use client";

import Image from "next/image";
import { MapPin, Camera } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "16 Kameralı 4K NVR Sistemi",
    location: "Sanayi Çarşısı, Kahramanmaraş",
    category: "CCTV Kurulum",
    img: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Akınsoft ERP Kurulumu",
    location: "Merkez İlçe, Kahramanmaraş",
    category: "Kurumsal Yazılım",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Dokunmatik POS Terminal Kurulumu",
    location: "Dulkadiroğlu, Kahramanmaraş",
    category: "POS Donanım",
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Kartlı Geçiş & PDKS Sistemi",
    location: "Organize Sanayi Bölgesi",
    category: "Erişim Kontrolü",
    img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    title: "Cat6 PoE Ağ Altyapısı",
    location: "Onikişubat, Kahramanmaraş",
    category: "Ağ & Altyapı",
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    title: "IP Bullet Kamera Dış Cephe",
    location: "Elbistan, Kahramanmaraş",
    category: "CCTV Kurulum",
    img: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=800&q=80",
  },
];

export default function ProjectsGallery() {
  return (
    <section id="gallery" className="scroll-mt-20 py-16 lg:py-20 bg-slate-50 dark:bg-zinc-900 border-b border-slate-100 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-blue-600 dark:text-blue-400 font-bold tracking-[0.2em] uppercase text-[11px] mb-2 block">
            Referans Projeler
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-zinc-100 tracking-tight">
            Saha Uygulama Galerimiz
          </h2>
          <p className="mt-3 text-sm text-slate-600 dark:text-zinc-400">
            Kahramanmaraş ve çevre illerde tamamladığımız kamera, ERP, POS ve ağ altyapısı projelerimizden örnekler.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="group relative h-56 rounded-2xl overflow-hidden border border-slate-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow"
            >
              <Image
                src={proj.img}
                alt={proj.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute top-3 left-3">
                <span className="bg-blue-600 text-white text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded flex items-center gap-1">
                  <Camera className="w-2.5 h-2.5" />
                  {proj.category}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-bold text-sm text-white leading-snug">{proj.title}</h3>
                <p className="text-xs text-slate-300 flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3 text-blue-300" />
                  {proj.location}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="https://wa.me/905375021244?text=Merhaba%20ARGE-SAN%20Teknoloji,%20projeniz%20hakkında%20referans%20görmek%20ve%20teklif%20almak%20istiyorum."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 dark:bg-blue-600 hover:bg-slate-700 dark:hover:bg-blue-700 text-white font-bold text-sm transition-colors shadow-sm"
          >
            Projeniz İçin Teklif Alın
          </a>
        </div>
      </div>
    </section>
  );
}