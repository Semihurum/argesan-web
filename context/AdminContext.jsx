"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  const router = useRouter();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isVisualEditMode, setIsVisualEditMode] = useState(false);

  const [siteData, setSiteData] = useState(null);
  const [loadingSiteData, setLoadingSiteData] = useState(true);

  // Modallar
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isMessagesModalOpen, setIsMessagesModalOpen] = useState(false);
  const [isAddSectionModalOpen, setIsAddSectionModalOpen] = useState(false);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

  // Bölüm editörleri
  const [editHeroModalOpen, setEditHeroModalOpen] = useState(false);
  const [editServiceModalData, setEditServiceModalData] = useState(null);
  const [editProductModalData, setEditProductModalData] = useState(null);
  const [editFaqModalData, setEditFaqModalData] = useState(null);
  const [editNavModalData, setEditNavModalData] = useState(null);
  const [editSectionModalData, setEditSectionModalData] = useState(null);

  const [messagesCount, setMessagesCount] = useState(0);

  // localStorage oturum kontrolü
  useEffect(() => {
    try {
      const savedAuth = localStorage.getItem("argesan_admin_auth");
      if (savedAuth === "true") {
        setIsAuthenticated(true);
      }
      const savedVisualMode = localStorage.getItem("argesan_visual_edit_mode");
      if (savedVisualMode === "true") {
        setIsVisualEditMode(true);
      }
    } catch (e) {
      console.warn("localStorage erişim hatası:", e);
    }
  }, []);

  // /api/site-data çekimi
  const fetchSiteData = useCallback(async () => {
    try {
      const res = await fetch("/api/site-data");
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setSiteData(json.data);
        }
      }
    } catch (err) {
      console.error("site-data çekilemedi:", err);
    } finally {
      setLoadingSiteData(false);
    }
  }, []);

  useEffect(() => {
    fetchSiteData();
  }, [fetchSiteData]);

  // Mesaj sayısını getirme
  const refreshMessagesCount = useCallback(async () => {
    try {
      const res = await fetch("/api/contact");
      if (res.ok) {
        const data = await res.json();
        setMessagesCount(Array.isArray(data) ? data.length : 0);
      }
    } catch (err) {
      console.error("Mesaj sayısı alınırken hata:", err);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      refreshMessagesCount();
    }
  }, [isAuthenticated, refreshMessagesCount]);

  // Site verisini API'ye kaydetme
  const saveSiteData = async (newData) => {
    try {
      setSiteData(newData);
      const res = await fetch("/api/site-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      });
      return res.ok;
    } catch (err) {
      console.error("saveSiteData hatası:", err);
      return false;
    }
  };

  // Login: API ile doğrula, başarılıysa /admin sayfasına yönlendir
  const login = async (username, password) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        try {
          localStorage.setItem("argesan_admin_auth", "true");
        } catch (e) {}
        setIsLoginModalOpen(false);
        router.push("/admin");
        return { success: true };
      } else {
        return { success: false, error: data.error || "Hatalı kullanıcı adı veya şifre." };
      }
    } catch (err) {
      console.error("Giriş hatası:", err);
      return { success: false, error: "Sunucu bağlantı hatası." };
    }
  };

  // Logout: Oturumu kapat, ana sayfaya dön
  const logout = () => {
    setIsAuthenticated(false);
    setIsVisualEditMode(false);
    setIsLoginModalOpen(false);
    setIsMessagesModalOpen(false);
    setIsAddSectionModalOpen(false);
    setIsAddCategoryModalOpen(false);
    setEditHeroModalOpen(false);
    setEditServiceModalData(null);
    setEditProductModalData(null);
    setEditFaqModalData(null);
    setEditNavModalData(null);
    setEditSectionModalData(null);
    try {
      localStorage.removeItem("argesan_admin_auth");
      localStorage.removeItem("argesan_visual_edit_mode");
    } catch (e) {}
    router.push("/");
  };

  // Canlı Düzenleme Modu (Site Üzerinde Düzenle)
  const enableVisualEdit = () => {
    setIsVisualEditMode(true);
    try {
      localStorage.setItem("argesan_visual_edit_mode", "true");
    } catch (e) {}
    router.push("/");
  };

  // Canlı Düzenleme Modundan çıkıp /admin paneline dön
  const disableVisualEdit = () => {
    setIsVisualEditMode(false);
    try {
      localStorage.removeItem("argesan_visual_edit_mode");
    } catch (e) {}
    router.push("/admin");
  };

  // isAdmin kısayolu: Canlı düzenleme modundayken arayüz kontrollerini açar
  const isAdmin = isAuthenticated && isVisualEditMode;

  return (
    <AdminContext.Provider
      value={{
        isAuthenticated,
        isVisualEditMode,
        isAdmin, // UI kontrolleri için (isVisualEditMode aktifken true)
        login,
        logout,
        enableVisualEdit,
        disableVisualEdit,

        siteData,
        saveSiteData,
        loadingSiteData,
        fetchSiteData,

        // Modal durumları
        isLoginModalOpen,
        setIsLoginModalOpen,
        isMessagesModalOpen,
        setIsMessagesModalOpen,
        isAddSectionModalOpen,
        setIsAddSectionModalOpen,
        isAddCategoryModalOpen,
        setIsAddCategoryModalOpen,
        isAddProductModalOpen,
        setIsAddProductModalOpen,

        // Bölüm editörleri
        editHeroModalOpen,
        setEditHeroModalOpen,
        editServiceModalData,
        setEditServiceModalData,
        editProductModalData,
        setEditProductModalData,
        editFaqModalData,
        setEditFaqModalData,
        editNavModalData,
        setEditNavModalData,
        editSectionModalData,
        setEditSectionModalData,

        messagesCount,
        refreshMessagesCount,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return ctx;
}
