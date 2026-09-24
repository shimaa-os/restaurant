import React from "react";

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className = "",
}: SectionTitleProps) {
  const alignStyles = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  return (
    <div className={`flex flex-col max-w-2xl ${alignStyles[align]} ${className} mb-12 sm:mb-16`}>
      {eyebrow && (
        <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#FBFBFD] tracking-wide leading-tight">
        {title}
      </h2>
      <div className="w-12 h-[1px] bg-[#D4AF37]/60 my-4" />
      {subtitle && (
        <p className="text-sm sm:text-base text-gray-400 font-sans font-light leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
