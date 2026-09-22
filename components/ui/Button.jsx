"use client";

import { Loader2 } from "lucide-react";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  className = "",
  type = "button",
  onClick,
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none";

  const sizeStyles = {
    sm: "px-3 py-1.5 rounded-lg text-xs gap-1.5",
    md: "px-4 py-2.5 rounded-xl text-xs sm:text-sm gap-2",
    lg: "px-6 py-3 rounded-xl text-sm sm:text-base gap-2.5 font-bold",
  };

  const variantStyles = {
    primary:
      "bg-blue-600 hover:bg-blue-500 text-white shadow-sm hover:shadow",
    secondary:
      "bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-800 dark:text-zinc-200 border border-slate-200 dark:border-zinc-700",
    danger:
      "bg-rose-500 hover:bg-rose-600 text-white shadow-sm",
    dangerOutline:
      "bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30",
    outline:
      "border border-slate-200 dark:border-zinc-700 hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300",
    success:
      "bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm",
    dark:
      "bg-slate-900 hover:bg-slate-800 text-white",
  };

  const currentSize = sizeStyles[size] || sizeStyles.md;
  const currentVariant = variantStyles[variant] || variantStyles.primary;

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyles} ${currentSize} ${currentVariant} ${className}`}
      {...props}
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin shrink-0" /> : null}
      {children}
    </button>
  );
}
