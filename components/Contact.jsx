"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";

const SERVICE_OPTIONS = [
  "Akınsoft ERP Çözümleri",
  "Kamera & Güvenlik Sistemleri",
  "POS & Donanım Sistemleri",
  "Web & Yazılım Çözümleri",
  "Yazıcı & Barkod Otomasyonu",
  "Genel Danışmanlık & Teknik Servis",
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "Akınsoft ERP Çözümleri",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMsg) setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccess(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Mesaj gönderilirken bir hata oluştu.");
      }

      // Başarılı
      setSuccess(true);
      setFormData({
        name: "",
        phone: "",
        email: "",
        subject: "Akınsoft ERP Çözümleri",
        message: "",
      });

      // 6 saniye sonra başarı mesajını temizle
      setTimeout(() => {
        setSuccess(false);
      }, 6000);
    } catch (err) {
      setErrorMsg(err.message || "Mesaj iletilemedi. Lütfen daha sonra tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  const info = [
    {
      icon: Phone,
      title: "Telefon / WhatsApp",
      line1: "0537 502 12 44",
      sub: "Pzt–Cmt 08:30–18:30 | 7/24 Acil",
      href: "tel:05375021244",
    },
    {
      icon: Mail,
      title: "E-posta",
      line1: "argesanteknoloji@gmail.com",
      sub: "Yanıt süresi: 1 iş günü",
      href: "mailto:argesanteknoloji@gmail.com",
    },
    {
      icon: MapPin,
      title: "Adres",
      line1: "Serintepe Mah., Bayazıtlı Blv. No:12/B",
      sub: "Onikişubat / Kahramanmaraş",
      href: "https://maps.google.com/?q=Serintepe+Mah+Bayazıtlı+Blv+No+12+Onikişubat+Kahramanmaraş",
    },
    {
      icon: Clock,
      title: "Çalışma Saatleri",
      line1: "Pazartesi – Cumartesi",
      sub: "08:30 – 18:30 | 7/24 Acil Destek",
      href: null,
    },
  ];

  return (
    <section
      id="iletisim"
      className="scroll-mt-20 py-16 lg:py-20 bg-white dark:bg-zinc-950 border-b border-slate-100 dark:border-zinc-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Başlık Alanı */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-blue-600 dark:text-blue-400 font-bold tracking-[0.2em] uppercase text-[11px] mb-2 block">
            İletişim & Teklif
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-zinc-100 tracking-tight">
            Bizimle İletişime Geçin
          </h2>
          <p className="mt-3 text-sm text-slate-600 dark:text-zinc-400">
            Kahramanmaraş merkezli ofisimizden doğrudan randevu alabilir veya aşağıdaki formu doldurarak anında teklif talebinde bulunabilirsiniz.
          </p>
        </div>

        {/* 2 Sütunlu Responsive Düzen */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Sol Sütun (5 Kolon): İletişim Bilgileri + Canlı Google Harita */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* İletişim Kartları Izgarası */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
              {info.map((item, i) => {
                const Icon = item.icon;
                const inner = (
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-zinc-800 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500 mb-0.5">
                        {item.title}
                      </p>
                      <p className="text-sm font-semibold text-slate-900 dark:text-zinc-100">{item.line1}</p>
                      <p className="text-xs text-slate-500 dark:text-zinc-500">{item.sub}</p>
                    </div>
                  </div>
                );

                return item.href ? (
                  <a
                    key={i}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="block p-4 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 hover:border-blue-200 dark:hover:border-blue-800 transition-colors"
                  >
                    {inner}
                  </a>
                ) : (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800"
                  >
                    {inner}
                  </div>
                );
              })}
            </div>

            {/* WhatsApp Hızlı İletişim Butonu */}
            <a
              href="https://wa.me/905375021244?text=Merhaba%20ARGE-SAN%20Teknoloji,%20bilgi%20ve%20teklif%20almak%20istiyorum."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-colors shadow-sm"
            >
              <WhatsAppIcon className="w-4 h-4" />
              WhatsApp ile Hızlı İletişim
            </a>

            {/* Canlı Google Harita Yerleşimi */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-zinc-800 h-64 lg:h-72 w-full mt-1">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.19!2d36.9233!3d37.5785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15370ee4a5f17bed%3A0x44fe4598ae7d63a5!2sSerintepe%2C%20Bayaz%C4%B1tl%C4%B1%20Blv.%20No%3A12%2FB%2C%2046060%20Oniki%C5%9Fubat%2FKahramanmara%C5%9F!5e0!3m2!1str!2str!4v1726698000000!5m2!1str!2str"
                width="100%"
                height="100%"
                style={{ border: 0, display: "block" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="ARGE-SAN Teknoloji Konum – Onikişubat / Kahramanmaraş"
              />
            </div>

          </div>

          {/* Sağ Sütun (7 Kolon): Modern İletişim & Teklif Formu */}
          <div className="lg:col-span-7 bg-slate-50/70 dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="mb-6">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-zinc-100">
                Teklif & Danışmanlık Talep Formu
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-zinc-400">
                Aşağıdaki formu eksiksiz doldurarak işletmeniz için kurumsal fiyat ve proje teklifi talep edebilirsiniz.
              </p>
            </div>

            {/* Başarı Bildirimi */}
            {success && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 flex items-start gap-3 animate-in fade-in duration-300">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <strong className="block font-bold">Talebiniz Başarıyla İletildi!</strong>
                  <span>Müşteri temsilcimiz en kısa sürede belirttiğiniz iletişim kanalları üzerinden sizinle irtibata geçecektir.</span>
                </div>
              </div>
            )}

            {/* Hata Bildirimi */}
            {errorMsg && (
              <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-300 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-medium">{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Ad Soyad */}
                <div>
                  <label htmlFor="name" className="block font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
                    Ad Soyad *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Adınız ve Soyadınız"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-zinc-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-xs"
                  />
                </div>

                {/* Telefon */}
                <div>
                  <label htmlFor="phone" className="block font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
                    Telefon Numarası *
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="05XX XXX XX XX"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-zinc-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* E-posta */}
                <div>
                  <label htmlFor="email" className="block font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
                    E-posta Adresi (Opsiyonel)
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="ornek@sirketiniz.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-zinc-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-xs"
                  />
                </div>

                {/* Hizmet / Konu */}
                <div>
                  <label htmlFor="subject" className="block font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
                    İlgilendiğiniz Hizmet / Çözüm *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-xs"
                  >
                    {SERVICE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Mesaj */}
              <div>
                <label htmlFor="message" className="block font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
                  Mesajınız / Talep Detayı *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="İhtiyacınız olan adet, lokasyon, donanım veya özel yazılım isteklerinizi kısaca belirtin..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-zinc-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-xs resize-none"
                />
              </div>

              {/* Gönder Butonu */}
              <div className="pt-2 flex items-center justify-between gap-4">
                <p className="text-[11px] text-slate-500 dark:text-zinc-500">
                  * ile işaretli alanların doldurulması zorunludur.
                </p>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold text-xs transition-all shadow-sm cursor-pointer hover:shadow"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Gönderiliyor...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Talebi İlet</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
}