import "./globals.css";
import { AdminProvider } from "@/context/AdminContext";
import AdminTopBar from "@/components/admin/AdminTopBar";
import LoginModal from "@/components/admin/LoginModal";
import EditHeroModal from "@/components/admin/EditHeroModal";
import EditProductModal from "@/components/admin/EditProductModal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export const metadata = {
  title: "ARGE-SAN Teknoloji | Kahramanmaraş ERP, Güvenlik Kamerası & POS Sistemleri",
  description:
    "Kahramanmaraş Onikişubat ARGE-SAN Teknoloji: Akınsoft ERP, 7/24 4K güvenlik kamerası montajı, dokunmatik POS ve SLA teknik servis çözümleri.",
  icons: {
    icon: [
      { url: "/icon.png?v=2", type: "image/png" },
      { url: "/favicon.ico?v=2", sizes: "any" },
    ],
    shortcut: "/icon.png?v=2",
    apple: "/icon.png?v=2",
  },
  keywords: [
    "ARGE-SAN Teknoloji",
    "Kahramanmaraş güvenlik kamerası",
    "Onikişubat kamera montajı",
    "Akınsoft Kahramanmaraş",
    "Dokunmatik POS sistemi",
    "e-Fatura e-Dönüşüm",
  ],
  openGraph: {
    title: "ARGE-SAN Teknoloji | Kahramanmaraş Kurumsal Bilişim & Güvenlik",
    description:
      "Kahramanmaraş ve çevre illere yerinde teknik servis, 7/24 güvenlik kamera montajı, Akınsoft ERP çözümleri.",
    locale: "tr_TR",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon.png?v=2" type="image/png" />
        <link rel="icon" href="/favicon.ico?v=2" sizes="any" />
        <link rel="shortcut icon" href="/favicon.ico?v=2" />
        <link rel="apple-touch-icon" href="/icon.png?v=2" />
        {/* Karanlık mod flaşını önlemek için inline script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var t = localStorage.getItem('theme');
                  if (t === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-white dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 min-h-screen flex flex-col antialiased selection:bg-blue-600 selection:text-white transition-colors duration-200">
        <AdminProvider>
          <AdminTopBar />
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <FloatingWhatsApp />
          
          {/* Yönetici Modalları */}
          <LoginModal />
          <EditHeroModal />
          <EditProductModal />
        </AdminProvider>
      </body>
    </html>
  );
}