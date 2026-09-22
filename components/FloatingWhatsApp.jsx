"use client";

import { useState } from "react";
import { MessageCircle, X, Phone, Clock, ChevronRight } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";

export default function FloatingWhatsApp() {
  const [open, setOpen] = useState(false);

  const options = [
    {
      label: "Güvenlik Kamerası Teklifi",
      msg: "Merhaba ARGE-SAN Teknoloji, güvenlik kamerası kurulumu için teklif almak istiyorum.",
    },
    {
      label: "POS & Donanım Bilgi",
      msg: "Merhaba ARGE-SAN Teknoloji, POS ve barkod donanımı hakkında bilgi almak istiyorum.",
    },
    {
      label: "Akınsoft ERP Demo",
      msg: "Merhaba ARGE-SAN Teknoloji, Akınsoft ERP için demo randevusu almak istiyorum.",
    },
    {
      label: "Teknik Servis Talebi",
      msg: "Merhaba ARGE-SAN Teknoloji, teknik servis desteği için arayabilir misiniz?",
    },
  ];

  return (
    <>
      {/* Popup Kart */}
      {open && (
        <div className="fixed bottom-[5.5rem] right-4 sm:right-6 z-50 w-72 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
          {/* Başlık */}
          <div className="bg-emerald-600 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <WhatsAppIcon className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-[13px] font-bold text-white leading-none">ARGE-SAN Teknoloji</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                  <p className="text-[10px] text-emerald-100">Çevrimiçi · Hızlı Yanıt</p>
                </div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/80 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* İçerik */}
          <div className="p-3 space-y-1">
            <p className="text-[11px] text-slate-400 dark:text-zinc-500 px-1 pb-1 font-medium">Konuyu seçin:</p>
            {options.map((opt, i) => (
              <a
                key={i}
                href={`https://wa.me/905375021244?text=${encodeURIComponent(opt.msg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 border border-slate-100 dark:border-zinc-700 hover:border-emerald-200 dark:hover:border-emerald-800 text-slate-700 dark:text-zinc-300 hover:text-emerald-700 dark:hover:text-emerald-300 text-[12px] font-medium transition-all"
              >
                {opt.label}
                <ChevronRight className="w-3.5 h-3.5 opacity-40" />
              </a>
            ))}
          </div>

          {/* Alt bant */}
          <div className="px-3 pb-3 pt-1 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between">
            <a
              href="tel:05375021244"
              className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
            >
              <Phone className="w-3 h-3" />
              0537 502 12 44
            </a>
            <div className="flex items-center gap-1 text-[10px] text-slate-400 dark:text-zinc-600">
              <Clock className="w-3 h-3" />
              Pzt–Cmt 08:30–18:30
            </div>
          </div>
        </div>
      )}

      {/* Buton */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="WhatsApp ile iletişime geç"
        className="fixed bottom-5 right-4 sm:right-6 z-50 w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 shadow-lg hover:shadow-xl flex items-center justify-center text-white transition-all active:scale-95"
      >
        {open ? (
          <X className="w-6 h-6" />
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        )}
        {!open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 border-2 border-white dark:border-zinc-950 animate-pulse" />
        )}
      </button>
    </>
  );
}