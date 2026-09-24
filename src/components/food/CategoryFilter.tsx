"use client";

import React from "react";
import { categories } from "@/data/menuData";

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  itemCounts?: Record<string, number>;
}

export default function CategoryFilter({
  selectedCategory,
  onSelectCategory,
  itemCounts,
}: CategoryFilterProps) {
  return (
    <div className="w-full overflow-x-auto pb-2 scrollbar-none">
      <div className="flex items-center gap-2 sm:gap-3 min-w-max mx-auto justify-start md:justify-center px-1">
        <button
          onClick={() => onSelectCategory("all")}
          className={`px-4 sm:px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-medium transition-all duration-300 cursor-pointer ${
            selectedCategory === "all"
              ? "bg-[#D4AF37] text-[#0B0C0E] shadow-[0_0_15px_rgba(212,175,55,0.4)] font-semibold"
              : "bg-[#131518] text-gray-300 border border-[#23272F] hover:border-[#D4AF37]/40 hover:text-white"
          }`}
        >
          <span>All Creations</span>
          {itemCounts && itemCounts["all"] !== undefined && (
            <span className={`ml-2 text-[10px] px-1.5 py-0.5 rounded-full ${
              selectedCategory === "all" ? "bg-black/20 text-[#0B0C0E]" : "bg-[#1E222A] text-gray-400"
            }`}>
              {itemCounts["all"]}
            </span>
          )}
        </button>

        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const count = itemCounts ? itemCounts[cat.id] : undefined;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 sm:px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-medium transition-all duration-300 cursor-pointer ${
                isSelected
                  ? "bg-[#D4AF37] text-[#0B0C0E] shadow-[0_0_15px_rgba(212,175,55,0.4)] font-semibold"
                  : "bg-[#131518] text-gray-300 border border-[#23272F] hover:border-[#D4AF37]/40 hover:text-white"
              }`}
            >
              <span>{cat.name}</span>
              {count !== undefined && (
                <span
                  className={`ml-2 text-[10px] px-1.5 py-0.5 rounded-full ${
                    isSelected ? "bg-black/20 text-[#0B0C0E]" : "bg-[#1E222A] text-gray-400"
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
