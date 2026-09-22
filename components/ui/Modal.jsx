"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

export default function Modal({ isOpen, onClose, title, description, children, maxWidth = "max-w-md" }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen && onClose) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto"
    >
      <div
        className={`relative w-full ${maxWidth} bg-white dark:bg-zinc-900 rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-zinc-800 my-8`}
      >
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 transition-colors p-1"
            aria-label="Kapat"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {(title || description) && (
          <div className="mb-6">
            {title && (
              <h3 className="text-lg font-bold text-slate-900 dark:text-zinc-100">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
                {description}
              </p>
            )}
          </div>
        )}

        {children}
      </div>
    </div>
  );
}
