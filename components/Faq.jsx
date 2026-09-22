"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

const DEFAULT_FAQS = [
  {
    q: "Hangi illere servis veriyorsunuz?",
    a: "Başta Kahramanmaraş merkez ve ilçeleri olmak üzere Gaziantep, Adıyaman ve çevre illere yerinde teknik servis ve kurulum sağlıyoruz.",
  },
  {
    q: "Güvenlik kamerası kurulumu ne kadar sürer?",
    a: "Kamera sayısına ve kablolama zorluğuna bağlı olarak 4–8 kameralı sistemler genellikle 1 iş günü, 16 kameralı sistemler 2 iş günü içinde tamamlanmaktadır. Kurulum öncesinde ücretsiz saha keşfi gerçekleştiriyoruz.",
  },
  {
    q: "Akınsoft ERP lisansı nasıl satın alınır?",
    a: "ARGE-SAN Teknoloji yetkili bayisi üzerinden işletmenize en uygun modülleri belirleyip lisanslama, kurulum ve personel eğitimini anahtar teslim yapıyoruz.",
  },
  {
    q: "Yıllık SLA bakım kapsamında neler yer alıyor?",
    a: "Yıllık bakım anlaşmalarımız; kamera ve ağ sistemi periyodik bakımı, yazılım güncelleme takibi, uzaktan teknik destek, öncelikli yerinde müdahale ve donanım garantisini içermektedir.",
  },
  {
    q: "POS terminalleri hangi yazılımlarla çalışır?",
    a: "Sunduğumuz POS terminalleri Windows ve Android tabanlı olup Akınsoft Wolvox, hızlı satış ve yaygın ticari ERP çözümleriyle tam uyumludur.",
  },
  {
    q: "Kamera görüntülerine cep telefonundan uzaktan erişilebilir mi?",
    a: "Evet. Kurduğumuz NVR/DVR sistemler P2P teknolojisiyle DMSS ve Hik-Connect uygulamaları üzerinden statik IP gerekmeden 7/24 canlı izleme sağlar.",
  },
  {
    q: "Kurumsal web sitesi ve e-Ticaret yazılımı desteği veriyor musunuz?",
    a: "Evet. Şirketinize özel modern, mobil uyumlu, Google SEO kriterlerine uygun, hızlı ve Türkçe yönetim panelli anahtar teslim web çözümleri sunuyoruz.",
  },
  {
    q: "Alan adı (domain), SSL ve kurumsal e-posta kurulumunu yapıyor musunuz?",
    a: "Evet. info@sirketiniz.com kurumsal e-posta, SSL güvenlik sertifikası ve bulut hosting süreçlerini eksiksiz yapılandırıyoruz.",
  },
];

export default function Faq() {
  const { siteData } = useAdmin();
  const [openIndex, setOpenIndex] = useState(null);

  const rawFaqs = siteData?.faq || DEFAULT_FAQS;
  const faqs = rawFaqs.map((item) => ({
    question: item.question || item.q,
    answer: item.answer || item.a,
  }));

  const toggleAccordion = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <section
      id="sss"
      className="scroll-mt-20 py-16 lg:py-20 bg-slate-50 dark:bg-zinc-900 border-b border-slate-100 dark:border-zinc-800"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Başlık Alanı */}
        <div className="text-center mb-12">
          <span className="text-blue-600 dark:text-blue-400 font-bold tracking-[0.2em] uppercase text-[11px] mb-2 block">
            Sık Sorulan Sorular
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-zinc-100 tracking-tight">
            Merak Ettikleriniz
          </h2>
          <p className="mt-3 text-sm text-slate-600 dark:text-zinc-400">
            Cevap bulamazsanız WhatsApp veya telefon ile bize ulaşabilirsiniz.
          </p>
        </div>

        {/* Sorular Izgarası */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;

            return (
              <div
                key={i}
                className="bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(i)}
                  className="w-full flex items-center justify-between text-left p-5 gap-4 hover:bg-slate-50 dark:hover:bg-zinc-900/60 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-[14px] font-semibold text-slate-800 dark:text-zinc-100 leading-snug">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 text-slate-400 dark:text-zinc-500 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-blue-600 dark:text-blue-400" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-3 text-sm text-slate-600 dark:text-zinc-400 leading-relaxed border-t border-slate-100 dark:border-zinc-800 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}