import {
  Globe,
  ShoppingBag,
  Server,
  ShieldCheck,
  Monitor,
  Wrench,
  CheckCircle2,
} from "lucide-react";

const ICON_MAP = {
  srv_web: Globe,
  srv_ecommerce: ShoppingBag,
  srv_erp: Server,
  srv_cctv: ShieldCheck,
  srv_pos: Monitor,
  srv_sla: Wrench,
};

const DEFAULT_SERVICES = [
  {
    id: "srv_web",
    badge: "MODERN & SEO UYUMLU",
    title: "Kurumsal Web Tasarım & Yazılım",
    description: "İşletmenizin kurumsal kimliğini ve prestijini dijitale taşıyoruz. Mobil uyumlu, ultra hızlı web siteleri.",
    items: [
      "Mobil Uyumlu (Responsive) Tasarım",
      "Google SEO Optimizasyonu & Harita Kaydı",
      "Kolay Kullanımlı Türkçe Yönetim Paneli",
    ],
  },
  {
    id: "srv_ecommerce",
    badge: "E-TİCARET & B2B",
    title: "E-Ticaret & Online Katalog Çözümleri",
    description: "Ürünlerinizi internet üzerinden doğrudan satışa açın. Sanal POS ve kargo entegrasyonlu mağazalar.",
    items: [
      "Tüm Bankalar Sanal POS (PayTR, İyzico)",
      "Akınsoft ERP Çift Yönlü Stok Entegrasyonu",
      "B2B Bayi Portalı & Cari Hesap Takibi",
    ],
  },
  {
    id: "srv_erp",
    badge: "AKINSOFT YETKİLİ BAYİ",
    title: "Kurumsal Yazılım & Akınsoft ERP",
    description: "Akınsoft Bölge Yetkili Bayisi güvencesiyle Wolvox ERP, hızlı satış ve e-Dönüşüm çözümleri.",
    items: [
      "Wolvox ERP & Ön Muhasebe",
      "e-Fatura, e-Arşiv, e-İrsaliye Entegrasyonu",
      "Dokunmatik Restoran/Market POS Sistemi",
    ],
  },
  {
    id: "srv_cctv",
    badge: "DAHUA · HIKVISION · UNIVIEW",
    title: "Akıllı Güvenlik & Kamera Sistemleri",
    description: "Yüksek çözünürlüklü IP ve termal kamera projeleri, yapay zekâ hedef tespitli NVR sistemleri.",
    items: [
      "4K Ultra HD Gece Renkli IP Kameralar",
      "AI: İnsan/Araç Algılama & Aktif Siren",
      "Mobil Uzaktan 7/24 Kesintisiz Canlı İzleme",
    ],
  },
  {
    id: "srv_pos",
    badge: "YERİNDE DONANIM KURULUMU",
    title: "Ticari Donanım & POS Otomasyonu",
    description: "Perakende, market ve restoranlar için yoğun tempoya dayanıklı endüstriyel donanım ve barkod altyapısı.",
    items: [
      "15.6'' Dokunmatik Alüminyum POS Terminalleri",
      "1D/2D Hızlı Lazer Barkod Okuyucular",
      "80mm Termal Ağ / Fiş Yazıcıları",
    ],
  },
  {
    id: "srv_sla",
    badge: "K.MARAŞ & ÇEVRE İLLER",
    title: "Ağ Altyapısı & IT Teknik Servis (SLA)",
    description: "Cat6/Cat7 yapısal kablolama, sunucu bakımı, yedekleme ve şirketlere özel yıllık SLA servis anlaşmaları.",
    items: [
      "PoE Switch & Rack Kabinet Altyapısı",
      "Otomatik Veri Yedekleme & Güvenlik Duvarı",
      "Yıllık IT Bakım ve Yerinde Destek Anlaşması",
    ],
  },
];

function getServiceIcon(service, index) {
  if (service.id && ICON_MAP[service.id]) return ICON_MAP[service.id];
  const icons = [Globe, ShoppingBag, Server, ShieldCheck, Monitor, Wrench];
  return icons[index % icons.length] || Globe;
}

export default function Services({ services = DEFAULT_SERVICES }) {
  const serviceList = Array.isArray(services) && services.length > 0 ? services : DEFAULT_SERVICES;

  return (
    <section
      id="hizmetler"
      className="scroll-mt-20 py-16 lg:py-20 bg-slate-50 dark:bg-zinc-950 border-b border-slate-100 dark:border-zinc-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Başlık Alanı */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-blue-600 dark:text-blue-400 font-bold tracking-[0.2em] uppercase text-[11px] mb-2 block">
            Faaliyet & Uzmanlık Alanlarımız
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-zinc-100 tracking-tight leading-tight">
            Uçtan Uca Kurumsal Bilişim, Web & Güvenlik Çözümleri
          </h2>
          <p className="mt-3 text-sm text-slate-600 dark:text-zinc-400">
            Kurumsal web tasarımından ERP yazılımlarına, 4K güvenlik kamera montajından POS donanımına ve SLA teknik servisine kadar tüm dijital ve fiziksel altyapınızı tek çatı altında kuruyoruz.
          </p>
        </div>

        {/* Kartlar Izgarası */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceList.map((card, idx) => {
            const Icon = getServiceIcon(card, idx);
            const items = card.items || card.features || [];

            return (
              <div
                key={card.id || idx}
                className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 flex flex-col hover:shadow-lg dark:hover:border-zinc-700 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-zinc-800 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-50 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 border border-slate-100 dark:border-zinc-700">
                    {card.badge}
                  </span>
                </div>

                <h3 className="text-[16px] font-bold text-slate-900 dark:text-zinc-100 mb-2">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-zinc-500 leading-relaxed mb-5 flex-grow">
                  {card.description || card.desc}
                </p>

                {items.length > 0 && (
                  <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-zinc-800">
                    {items.map((f, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-zinc-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
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