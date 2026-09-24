"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { CheckCircle2, Info, AlertTriangle, X } from "lucide-react";

export default function Toast() {
  const { toasts, removeToast } = useCart();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const icons = {
          success: <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0" />,
          info: <Info className="w-5 h-5 text-sky-400 shrink-0" />,
          error: <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />,
        };

        const borderColors = {
          success: "border-[#D4AF37]/40",
          info: "border-sky-500/40",
          error: "border-rose-500/40",
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 px-4 py-3.5 bg-[#131518]/95 backdrop-blur-md border ${borderColors[toast.type]} rounded shadow-xl text-sm text-[#FBFBFD] transition-all animate-slideIn`}
          >
            <div className="flex items-center gap-3">
              {icons[toast.type]}
              <span className="font-sans font-medium text-xs sm:text-sm tracking-wide">
                {toast.message}
              </span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
