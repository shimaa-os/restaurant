import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "gold" | "outline" | "emerald" | "amber" | "rose" | "dark" | "blue";
  size?: "sm" | "md";
  className?: string;
}

export default function Badge({
  children,
  variant = "gold",
  size = "sm",
  className = "",
}: BadgeProps) {
  const sizeStyles = {
    sm: "px-2 py-0.5 text-[10px] tracking-wider",
    md: "px-2.5 py-1 text-xs tracking-wide",
  };

  const variantStyles = {
    gold: "bg-[#D4AF37]/15 text-[#F3E5AB] border border-[#D4AF37]/30",
    outline: "border border-white/20 text-[#D1D5DB] bg-transparent",
    emerald: "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30",
    amber: "bg-amber-500/15 text-amber-300 border border-amber-500/30",
    rose: "bg-rose-500/15 text-rose-300 border border-rose-500/30",
    blue: "bg-sky-500/15 text-sky-300 border border-sky-500/30",
    dark: "bg-[#1C1F26] text-gray-300 border border-[#2D313A]",
  };

  return (
    <span
      className={`inline-flex items-center uppercase font-medium rounded-full ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
