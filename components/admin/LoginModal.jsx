"use client";

import { useState } from "react";
import { useAdmin } from "@/context/AdminContext";
import { Lock, User, KeyRound, AlertCircle } from "lucide-react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

export default function LoginModal() {
  const { isLoginModalOpen, setIsLoginModalOpen, login } = useAdmin();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await login(username, password);
    if (!result.success) {
      setError(result.error || "Hatalı kullanıcı adı veya şifre.");
      setLoading(false);
    } else {
      setPassword("");
      setError("");
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isLoginModalOpen}
      onClose={() => {
        setIsLoginModalOpen(false);
        setError("");
        setPassword("");
      }}
      title="Yönetici Girişi"
      description="ARGE-SAN Teknoloji Yönetim Konsolu"
      maxWidth="max-w-md"
    >
      {error && (
        <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 text-xs text-rose-600 dark:text-rose-400 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="block font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
            Kullanıcı Adı
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              required
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (error) setError("");
              }}
              placeholder="admin"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-sm text-slate-900 dark:text-zinc-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
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
              autoFocus
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError("");
              }}
              placeholder="Şifrenizi girin..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-sm text-slate-900 dark:text-zinc-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            loading={loading}
            className="w-full py-2.5 text-sm"
          >
            Giriş Yap & Yönetim Paneline Git
          </Button>
        </div>
      </form>
    </Modal>
  );
}
