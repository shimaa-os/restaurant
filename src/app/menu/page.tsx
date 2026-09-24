"use client";

import React, { useState, useMemo } from "react";
import { foodItems, categories } from "@/data/menuData";
import FoodCard from "@/components/food/FoodCard";
import CategoryFilter from "@/components/food/CategoryFilter";
import SectionTitle from "@/components/common/SectionTitle";
import EmptyState from "@/components/common/EmptyState";
import { Search, SlidersHorizontal, Sparkles, X, ArrowUpDown } from "lucide-react";

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [dietaryFilter, setDietaryFilter] = useState<"all" | "special" | "vegetarian" | "glutenFree">("all");
  const [sortBy, setSortBy] = useState<"recommended" | "price-asc" | "price-desc" | "rating">("recommended");

  // Calculate counts per category
  const itemCounts = useMemo(() => {
    const counts: Record<string, number> = { all: foodItems.length };
    categories.forEach((cat) => {
      counts[cat.id] = foodItems.filter((i) => i.category === cat.id).length;
    });
    return counts;
  }, []);

  // Filter and sort items
  const filteredItems = useMemo(() => {
    return foodItems
      .filter((item) => {
        // Category filter
        if (selectedCategory !== "all" && item.category !== selectedCategory) {
          return false;
        }

        // Dietary filter
        if (dietaryFilter === "special" && !item.isChefSpecial) return false;
        if (dietaryFilter === "vegetarian" && !item.isVegetarian) return false;
        if (dietaryFilter === "glutenFree" && !item.isGlutenFree) return false;

        // Search query
        if (searchQuery.trim() !== "") {
          const q = searchQuery.toLowerCase();
          const matchName = item.name.toLowerCase().includes(q);
          const matchDesc = item.description.toLowerCase().includes(q);
          const matchIngredient = item.ingredients.some((ing) => ing.toLowerCase().includes(q));
          if (!matchName && !matchDesc && !matchIngredient) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        // Default recommended: chef special first, then rating
        if (a.isChefSpecial && !b.isChefSpecial) return -1;
        if (!a.isChefSpecial && b.isChefSpecial) return 1;
        return b.rating - a.rating;
      });
  }, [selectedCategory, dietaryFilter, searchQuery, sortBy]);

  const activeCategoryObj = categories.find((c) => c.id === selectedCategory);

  return (
    <div className="pt-28 pb-24 min-h-screen bg-[#0B0C0E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <SectionTitle
          eyebrow="The Culinary Catalog"
          title="Gastronomic Compositions"
          subtitle="Explore our seasonal menu where ancient wood-hearth traditions meet delicate contemporary artistry."
          align="center"
        />

        {/* Search & Utility Bar */}
        <div className="max-w-4xl mx-auto mb-8 bg-[#131518] border border-[#23272F] rounded-sm p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by dish, ingredient or flavor..."
              className="w-full bg-[#1A1D23] border border-[#2A2E35] pl-10 pr-9 py-2 rounded-sm text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Dietary Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <span className="text-[11px] uppercase tracking-wider text-gray-400 flex items-center gap-1 mr-1">
              <SlidersHorizontal className="w-3 h-3 text-[#D4AF37]" />
              Filter:
            </span>
            <button
              onClick={() => setDietaryFilter("all")}
              className={`px-3 py-1 rounded text-xs transition-colors cursor-pointer ${
                dietaryFilter === "all"
                  ? "bg-[#D4AF37]/20 text-[#F3E5AB] border border-[#D4AF37]/40"
                  : "bg-[#1A1D23] text-gray-400 hover:text-white border border-[#2A2E35]"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setDietaryFilter("special")}
              className={`px-3 py-1 rounded text-xs transition-colors cursor-pointer ${
                dietaryFilter === "special"
                  ? "bg-[#D4AF37]/20 text-[#F3E5AB] border border-[#D4AF37]/40"
                  : "bg-[#1A1D23] text-gray-400 hover:text-white border border-[#2A2E35]"
              }`}
            >
              Signatures
            </button>
            <button
              onClick={() => setDietaryFilter("vegetarian")}
              className={`px-3 py-1 rounded text-xs transition-colors cursor-pointer ${
                dietaryFilter === "vegetarian"
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                  : "bg-[#1A1D23] text-gray-400 hover:text-white border border-[#2A2E35]"
              }`}
            >
              Vegetarian
            </button>
            <button
              onClick={() => setDietaryFilter("glutenFree")}
              className={`px-3 py-1 rounded text-xs transition-colors cursor-pointer ${
                dietaryFilter === "glutenFree"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                  : "bg-[#1A1D23] text-gray-400 hover:text-white border border-[#2A2E35]"
              }`}
            >
              Gluten-Free
            </button>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#1A1D23] border border-[#2A2E35] text-xs text-gray-200 py-1.5 px-3 rounded-sm focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="recommended">Recommended</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="mb-12">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            itemCounts={itemCounts}
          />

          {/* Category Description Banner */}
          {activeCategoryObj && (
            <div className="text-center mt-6">
              <p className="font-serif italic text-base text-[#D4AF37]">
                “{activeCategoryObj.description}”
              </p>
            </div>
          )}
        </div>

        {/* Dishes Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No Culinary Creations Found"
            description="We couldn't find any dishes matching your current search or dietary filters. Try resetting the filters or exploring another category."
            actionText="Reset All Filters"
            onActionClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
              setDietaryFilter("all");
            }}
          />
        )}
      </div>
    </div>
  );
}
