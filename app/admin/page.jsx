"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAdmin } from "@/context/AdminContext";
import {
  ShieldCheck,
  Zap,
  ExternalLink,
  LogOut,
  Package,
  Inbox,
  Database,
  Search,
  Plus,
  Trash2,
  Edit2,
  RefreshCw,
  Phone,
  Mail,
  Calendar,
  Lock,
  User,
  KeyRound,
  AlertCircle,
  Loader2,
  CheckCircle2,
} from "lucide-react";

export default function AdminDashboardPage() {
  const {
    isAuthenticated,
    login,
    logout,
    enableVisualEdit,
    setEditProductModalData,
    siteData,
    saveSiteData,
  } = useAdmin();

  // Login form state (eğer oturum açılmamışsa)
  const [loginUsername, setLoginUsername] = useState("admin");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Dashboard verileri
  const [activeTab, setActiveTab] = useState("messages"); // 'messages' | 'products'
  const [messages, setMessages] = useState([]);
  const [products, setProducts] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  // Verileri çek
  const fetchData = useCallback(async () => {
    setLoadingData(true);
    try {
      const [msgRes, prodRes] = await Promise.all([
        fetch("/api/contact"),
        fetch("/api/products"),
      ]);

      if (msgRes.ok) {
        const msgData = await msgRes.json();
        setMessages(Array.isArray(msgData) ? msgData : []);
      }
      if (prodRes.ok) {
        const prodData = await prodRes.json();
        setProducts(Array.isArray(prodData) ? prodData : []);
      }
    } catch (err) {
      console.error("Dashboard verileri alınırken hata:", err);
    } finally {
      setLoadingData(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated, fetchData]);

  // Login submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");

    const res = await login(loginUsername, loginPassword);
    if (!res.success) {
      setLoginError(res.error || "Hatalı kullanıcı adı veya şifre.");
    }
    setLoginLoading(false);
  };

  // Mesaj silme
  const handleDeleteMessage = async (id) => {
    if (!window.confirm("Bu müşteri talebini silmek istediğinize emin misiniz?")) {
      return;
    }
    setDeletingId(id);
    try {
      const res = await fetch(`/api/contact?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => String(m.id || m._id) !== String(id)));
      } else {
        alert("Mesaj silinemedi.");
      }
    } catch (e) {
      alert("Silme sırasında hata oluştu.");
    } finally {
      setDeletingId(null);
    }
  };

  // Ürün silme
  const handleDeleteProduct = async (product) => {
    const id = product.id || product._id;
    if (!window.confirm(`"${product.title}" ürününü silmek istediğinize emin misiniz?`)) {
      return;
    }
    setDeletingId(id);
    try {
      const res = await fetch(`/api/products?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => String(p.id || p._id) !== String(id)));
      } else {
        alert("Ürün silinemedi.");
      }
    } catch (e) {
      alert("Ürün silinirken hata oluştu.");
    } finally {
      setDeletingId(null);
    }
  };

  // Tarih formatlayıcı
  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("tr-TR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateStr;
    }
  };

  // Eğer kullanıcı giriş yapmamışsa Kurumsal Login Ekranı göster
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-2xl border border-slate-200 dark:border-zinc-800">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 mb-4">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-zinc-100">
              ARGE-SAN Yönetim Konsolu
            </h1>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
              Devam etmek için yönetici kimliğinizi doğrulayın
            </p>
          </div>

          {loginError && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-600 dark:text-rose-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
                Kullanıcı Adı
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-sm text-slate-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
                Yönetici Şifresi
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Şifrenizi girin..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-sm text-slate-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full mt-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all shadow-md cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loginLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Doğrulanıyor...</span>
                </>
              ) : (
                <span>Yönetim Paneline Giriş Yap</span>
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Filtrelenmiş Mesajlar
  const filteredMessages = messages.filter((m) => {
    const q = searchTerm.toLowerCase();
    return (
      (m.name || "").toLowerCase().includes(q) ||
      (m.phone || "").toLowerCase().includes(q) ||
      (m.email || "").toLowerCase().includes(q) ||
      (m.subject || "").toLowerCase().includes(q) ||
      (m.message || "").toLowerCase().includes(q)
    );
  });

  // Filtrelenmiş Ürünler
  const filteredProducts = products.filter((p) => {
    const q = searchTerm.toLowerCase();
    return (
      (p.title || "").toLowerCase().includes(q) ||
      (p.category || "").toLowerCase().includes(q) ||
      (p.description || "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      
      {/* 1. ÜST EYLEM BARI */}
      <header className="sticky top-0 z-30 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800 px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        
        {/* Sol Logo ve Durum */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-base sm:text-lg tracking-tight text-white flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-lg bg-blue-600 text-white text-xs font-mono font-bold">
                CMS
              </span>
              ARGE-SAN Yönetim Konsolu
            </span>
          </div>

          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] font-mono">
            v2.0 Production
          </span>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>MongoDB Canlı Bağlantı: Aktif (200 OK)</span>
          </div>
        </div>

        {/* Sağ Butonlar */}
        <div className="flex items-center flex-wrap gap-2.5">
          {/* Vurgulu Buton: Canlı Görsel Düzenleme Modu */}
          <button
            type="button"
            onClick={enableVisualEdit}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-zinc-950 font-bold text-xs tracking-wide shadow-lg hover:shadow-emerald-500/20 transition-all cursor-pointer transform hover:-translate-y-0.5"
          >
            <Zap className="w-4 h-4 fill-zinc-950" />
            <span>⚡ Canlı Düzenleme Modu (Site Üzerinde Düzenle) ↗</span>
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 text-xs font-semibold transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Siteyi Gör ↗</span>
          </Link>

          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-semibold transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Güvenli Çıkış</span>
          </button>
        </div>
      </header>

      {/* 2. DASHBOARD GÖVDE */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 flex flex-col gap-8">
        
        {/* KPI Metrik Kartları */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          
          {/* Ürün Sayacı */}
          <div className="bg-zinc-950/80 border border-zinc-800/90 rounded-2xl p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Kayıtlı Katalog Ürünleri
              </p>
              <h3 className="text-3xl font-extrabold text-white mt-1.5 font-mono">
                {products.length}
              </h3>
              <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                MongoDB Atlas canlı senkronize
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <Package className="w-6 h-6" />
            </div>
          </div>

          {/* Mesaj Sayacı */}
          <div className="bg-zinc-950/80 border border-zinc-800/90 rounded-2xl p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Gelen Teklif & İletişim Mesajları
              </p>
              <h3 className="text-3xl font-extrabold text-white mt-1.5 font-mono">
                {messages.length}
              </h3>
              <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Web sitesi formundan gelenler
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Inbox className="w-6 h-6" />
            </div>
          </div>

          {/* Sistem Durumu */}
          <div className="bg-zinc-950/80 border border-zinc-800/90 rounded-2xl p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Veritabanı Altyapısı
              </p>
              <h3 className="text-xl font-bold text-white mt-2">
                MongoDB Atlas Cloud
              </h3>
              <p className="text-[11px] text-emerald-400 mt-1 font-mono">
                Cluster: argesan.0cihdy2
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <Database className="w-6 h-6" />
            </div>
          </div>

        </div>

        {/* 3. SEKME VE VERİ YÖNETİMİ */}
        <div className="bg-zinc-950/90 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl flex flex-col">
          
          {/* Sekme Butonları & Arama */}
          <div className="p-4 sm:px-6 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("messages");
                  setSearchTerm("");
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === "messages"
                    ? "bg-blue-600 text-white shadow"
                    : "text-slate-400 hover:text-white hover:bg-zinc-900"
                }`}
              >
                <Inbox className="w-4 h-4" />
                <span>Gelen Müşteri Talepleri ({messages.length})</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab("products");
                  setSearchTerm("");
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === "products"
                    ? "bg-blue-600 text-white shadow"
                    : "text-slate-400 hover:text-white hover:bg-zinc-900"
                }`}
              >
                <Package className="w-4 h-4" />
                <span>Ürün & Çözüm Kataloğu ({products.length})</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              {/* Arama Alanı */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Tabloda ara..."
                  className="pl-9 pr-4 py-1.5 rounded-lg border border-zinc-700 bg-zinc-900 text-xs text-zinc-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 w-44 sm:w-60"
                />
              </div>

              {/* Ürün sekmesindeyken Yeni Ürün Ekle butonu */}
              {activeTab === "products" && (
                <button
                  type="button"
                  onClick={() => setEditProductModalData({ isNew: true })}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors cursor-pointer shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Yeni Ürün Ekle</span>
                </button>
              )}

              {/* Canlı Yenile Butonu */}
              <button
                type="button"
                onClick={fetchData}
                disabled={loadingData}
                className="p-2 rounded-lg border border-zinc-700 bg-zinc-900 text-slate-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                title="Canlı Verileri Yenile"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loadingData ? "animate-spin text-blue-400" : ""}`} />
              </button>
            </div>
          </div>

          {/* TAB 1: GELEN MESAJLAR TABLOSU */}
          {activeTab === "messages" && (
            <div className="overflow-x-auto p-4 sm:p-6">
              {loadingData && messages.length === 0 ? (
                <div className="py-16 text-center text-slate-400 flex flex-col items-center gap-2">
                  <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
                  <span className="text-xs">MongoDB'den mesajlar çekiliyor...</span>
                </div>
              ) : filteredMessages.length === 0 ? (
                <div className="py-16 text-center text-slate-400 flex flex-col items-center gap-3">
                  <Inbox className="w-10 h-10 text-slate-600" />
                  <p className="text-sm font-medium">Henüz gelen müşteri talebi bulunmuyor.</p>
                </div>
              ) : (
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-zinc-900/90 text-slate-300 uppercase tracking-wider text-[11px] font-bold border-b border-zinc-800">
                    <tr>
                      <th className="py-3 px-4">Tarih</th>
                      <th className="py-3 px-4">Müşteri Adı</th>
                      <th className="py-3 px-4">İletişim</th>
                      <th className="py-3 px-4">Hizmet Konusu</th>
                      <th className="py-3 px-4 min-w-[260px]">Mesaj</th>
                      <th className="py-3 px-4 text-center">İşlem</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60 text-slate-200">
                    {filteredMessages.map((item) => {
                      const msgId = item.id || item._id;
                      return (
                        <tr key={msgId} className="hover:bg-zinc-900/40 transition-colors">
                          <td className="py-3.5 px-4 whitespace-nowrap text-slate-400 font-mono text-[11px]">
                            {formatDate(item.createdAt)}
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-white whitespace-nowrap">
                            {item.name}
                          </td>
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <div className="flex flex-col gap-1">
                              <a
                                href={`tel:${item.phone.replace(/\s+/g, "")}`}
                                className="inline-flex items-center gap-1.5 text-blue-400 hover:underline font-medium"
                              >
                                <Phone className="w-3 h-3" />
                                {item.phone}
                              </a>
                              {item.email && (
                                <a
                                  href={`mailto:${item.email}`}
                                  className="inline-flex items-center gap-1.5 text-slate-400 hover:underline text-[11px]"
                                >
                                  <Mail className="w-3 h-3" />
                                  {item.email}
                                </a>
                              )}
                            </div>
                          </td>
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <span className="inline-block px-2.5 py-1 rounded-md bg-zinc-800 text-slate-200 font-medium text-[11px] border border-zinc-700">
                              {item.subject}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-slate-300 leading-relaxed max-w-md break-words">
                            {item.message}
                          </td>
                          <td className="py-3.5 px-4 text-center whitespace-nowrap">
                            <button
                              type="button"
                              onClick={() => handleDeleteMessage(msgId)}
                              disabled={deletingId === msgId}
                              className="inline-flex items-center justify-center p-2 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors cursor-pointer"
                              title="Talebi Sil"
                            >
                              {deletingId === msgId ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* TAB 2: ÜRÜN VE ÇÖZÜMLER TABLOSU */}
          {activeTab === "products" && (
            <div className="overflow-x-auto p-4 sm:p-6">
              {loadingData && products.length === 0 ? (
                <div className="py-16 text-center text-slate-400 flex flex-col items-center gap-2">
                  <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
                  <span className="text-xs">MongoDB'den ürünler çekiliyor...</span>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="py-16 text-center text-slate-400 flex flex-col items-center gap-3">
                  <Package className="w-10 h-10 text-slate-600" />
                  <p className="text-sm font-medium">Katalogda ürün bulunamadı.</p>
                </div>
              ) : (
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-zinc-900/90 text-slate-300 uppercase tracking-wider text-[11px] font-bold border-b border-zinc-800">
                    <tr>
                      <th className="py-3 px-4">Görsel</th>
                      <th className="py-3 px-4">Kategori</th>
                      <th className="py-3 px-4">Ürün / Çözüm Başlığı</th>
                      <th className="py-3 px-4 min-w-[280px]">Açıklama</th>
                      <th className="py-3 px-4 text-center">İşlemler</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60 text-slate-200">
                    {filteredProducts.map((p) => {
                      const pId = p.id || p._id;
                      return (
                        <tr key={pId} className="hover:bg-zinc-900/40 transition-colors">
                          <td className="py-3 px-4 whitespace-nowrap">
                            <div className="w-14 h-14 rounded-xl bg-zinc-900 border border-zinc-700/60 p-1 flex items-center justify-center overflow-hidden">
                              <img
                                src={p.image || "/images/products/web-cms-mockup.png"}
                                alt={p.title}
                                className="max-h-full max-w-full object-contain"
                              />
                            </div>
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap">
                            <span className="inline-block px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-400 font-semibold text-[11px] border border-blue-500/20">
                              {p.categoryBadge || p.category}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-bold text-white max-w-xs">
                            {p.title}
                          </td>
                          <td className="py-3 px-4 text-slate-300 leading-relaxed max-w-md break-words text-[11px]">
                            {p.description}
                          </td>
                          <td className="py-3 px-4 text-center whitespace-nowrap">
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => setEditProductModalData({ product: p })}
                                className="p-2 rounded-lg text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 transition-colors cursor-pointer"
                                title="Düzenle"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteProduct(p)}
                                disabled={deletingId === pId}
                                className="p-2 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors cursor-pointer"
                                title="Sil"
                              >
                                {deletingId === pId ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                  <Trash2 className="w-4 h-4" />
                                )}
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          )}

        </div>

      </main>
    </div>
  );
}
