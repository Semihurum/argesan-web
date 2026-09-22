"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, ChevronRight } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import WhatsAppIcon from "@/components/WhatsAppIcon";

const navLinks = [
  { name: "Hizmetler", href: "#hizmetler" },
  { name: "Katalog", href: "#katalog" },
  { name: "Referanslar", href: "#referanslar" },
  { name: "S.S.S.", href: "#sss" },
  { name: "İletişim", href: "#iletisim" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full border-b border-slate-200/40 dark:border-zinc-800/40 bg-white/95 dark:bg-zinc-950/95 backdrop-blur transition-shadow duration-200 ${
          scrolled ? "shadow-sm" : ""
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-10 h-20 flex items-center justify-between">

          {/* En Sol — Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center group shrink-0 cursor-pointer"
            aria-label="Sayfanın en üstüne git"
          >
            {/* Açık Mod Logosu (Siyah ARGESAN) */}
            <Image
              src="/logo-transparent.png"
              alt="ARGE-SAN Teknoloji"
              width={170}
              height={56}
              priority
              className="h-10 sm:h-11 w-auto object-contain dark:hidden"
            />
            {/* Koyu Mod Logosu (Beyaz ARGESAN) */}
            <Image
              src="/logo-dark.png"
              alt="ARGE-SAN Teknoloji"
              width={170}
              height={56}
              priority
              className="h-10 sm:h-11 w-auto object-contain hidden dark:block"
            />
          </button>

          {/* Orta — Nav Linkleri (Statik, Temiz, Kusursuz One-Page Omurgası) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500 dark:text-zinc-400">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-slate-900 dark:hover:text-zinc-100 transition-colors py-1"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* En Sağ — WA Butonu + ThemeToggle */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://wa.me/905375021244"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[13px] font-bold transition-colors flex items-center gap-2 shadow-sm"
            >
              <WhatsAppIcon className="w-4 h-4" />
              WhatsApp Destek
            </a>
            <ThemeToggle />
          </div>

          {/* Mobil */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg border border-slate-200 dark:border-zinc-700 text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-900 transition-colors"
              aria-label="Menü"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobil Çekmece */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
        <div
          className={`fixed top-0 right-0 bottom-0 w-[78%] max-w-xs bg-white dark:bg-zinc-950 border-l border-slate-200 dark:border-zinc-800 shadow-2xl p-6 flex flex-col transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between pb-5 border-b border-slate-100 dark:border-zinc-800">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                setIsOpen(false);
              }}
              className="flex items-center cursor-pointer"
            >
              <Image
                src="/logo-transparent.png"
                alt="ARGE-SAN Teknoloji"
                width={140}
                height={46}
                className="h-8 w-auto object-contain dark:hidden"
              />
              <Image
                src="/logo-dark.png"
                alt="ARGE-SAN Teknoloji"
                width={140}
                height={46}
                className="h-8 w-auto object-contain hidden dark:block"
              />
            </button>
            <button onClick={() => setIsOpen(false)} className="p-1.5 rounded-lg border border-slate-200 dark:border-zinc-700 text-slate-400">
              <X className="w-4 h-4" />
            </button>
          </div>

          <nav className="mt-5 space-y-1 flex-grow">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-zinc-100 hover:bg-slate-50 dark:hover:bg-zinc-900 font-semibold text-[13px] transition-colors"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-slate-300 dark:text-zinc-600" />
              </a>
            ))}
          </nav>

          <div className="pt-5 border-t border-slate-100 dark:border-zinc-800 space-y-2">
            <a
              href="https://wa.me/905375021244"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[13px] transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4" />
              WhatsApp Destek
            </a>
            <a
              href="tel:05375021244"
              className="w-full flex items-center justify-center py-3 rounded-xl bg-slate-900 dark:bg-blue-600 text-white font-bold text-[13px] transition-colors"
            >
              0537 502 12 44
            </a>
          </div>
        </div>
      </div>
    </>
  );
}