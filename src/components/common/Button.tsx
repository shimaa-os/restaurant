import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "gold" | "outline" | "ghost" | "dark" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  children: React.ReactNode;
}

export default function Button({
  variant = "gold",
  size = "md",
  isLoading = false,
  icon,
  iconPosition = "left",
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none tracking-wide text-xs uppercase";

  const sizeStyles = {
    sm: "px-3.5 py-1.5 text-[11px] gap-1.5",
    md: "px-5 py-2.5 text-xs gap-2 tracking-wider",
    lg: "px-8 py-3.5 text-sm gap-2.5 tracking-widest font-semibold",
  };

  const variantStyles = {
    gold: "bg-gradient-to-r from-[#D4AF37] via-[#E5C378] to-[#AA7C11] text-[#0B0C0E] font-semibold hover:brightness-110 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] active:scale-[0.98]",
    outline:
      "border border-[#D4AF37]/50 text-[#F3E5AB] hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 active:scale-[0.98]",
    ghost:
      "text-[#E8E9ED] hover:text-[#D4AF37] hover:bg-white/5 active:scale-[0.98]",
    dark:
      "bg-[#1A1D22] border border-[#2A2E35] text-[#E8E9ED] hover:border-[#D4AF37]/40 hover:bg-[#23272F] active:scale-[0.98]",
    danger:
      "bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 active:scale-[0.98]",
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {icon && iconPosition === "left" && <span className="shrink-0">{icon}</span>}
          <span>{children}</span>
          {icon && iconPosition === "right" && <span className="shrink-0">{icon}</span>}
        </>
      )}
    </button>
  );
}
