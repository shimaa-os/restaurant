"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FoodItem } from "@/types";
import { Star, Plus, Eye, Sparkles, Leaf } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Badge from "@/components/common/Badge";

interface FoodCardProps {
  item: FoodItem;
}

export default function FoodCard({ item }: FoodCardProps) {
  const { addToCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(item, 1);
  };

  return (
    <div className="group relative bg-[#131518] border border-[#23272F] rounded-sm overflow-hidden flex flex-col transition-all duration-500 hover:border-[#D4AF37]/50 hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
      {/* Image Container with Aspect Ratio */}
      <Link href={`/menu/${item.id}`} className="relative w-full aspect-[4/3] overflow-hidden block bg-[#1A1D23]">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#131518] via-transparent to-black/30" />

        {/* Badges on Image */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {item.isChefSpecial && (
            <Badge variant="gold" size="sm">
              <Sparkles className="w-2.5 h-2.5 mr-1" />
              Signature
            </Badge>
          )}
          {item.isVegetarian && (
            <Badge variant="emerald" size="sm">
              <Leaf className="w-2.5 h-2.5 mr-1" />
              Veg
            </Badge>
          )}
        </div>

        {/* Rating Pill */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs text-[#F3E5AB]">
          <Star className="w-3 h-3 fill-[#D4AF37] text-[#D4AF37]" />
          <span className="font-semibold text-[11px]">{item.rating.toFixed(1)}</span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Preparation time */}
          <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-gray-400 mb-2">
            <span className="text-[#D4AF37] font-medium">{item.category}</span>
            {item.preparationTime && <span>{item.preparationTime}</span>}
          </div>

          {/* Title */}
          <Link href={`/menu/${item.id}`} className="block group-hover:text-[#F3E5AB] transition-colors">
            <h3 className="font-serif text-xl font-light text-[#FBFBFD] tracking-wide mb-2 line-clamp-1">
              {item.name}
            </h3>
          </Link>

          {/* Description */}
          <p className="text-gray-400 text-xs sm:text-sm font-light leading-relaxed line-clamp-2 mb-4">
            {item.shortDescription}
          </p>
        </div>

        {/* Bottom Row: Price & Actions */}
        <div className="pt-4 border-t border-[#1F232B] flex items-center justify-between mt-auto">
          <div>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest block">Price</span>
            <span className="font-serif text-xl text-[#FBFBFD] font-medium tracking-tight">
              £{item.price.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/menu/${item.id}`}
              className="p-2 text-gray-400 hover:text-white bg-[#1A1D23] border border-[#2A2E35] rounded-sm transition-colors"
              title="View dish details"
            >
              <Eye className="w-4 h-4" />
            </Link>

            <button
              onClick={handleQuickAdd}
              className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-[#D4AF37] to-[#B89047] text-[#0B0C0E] text-xs font-semibold uppercase tracking-wider rounded-sm hover:brightness-110 active:scale-95 transition-all shadow-[0_0_12px_rgba(212,175,55,0.25)]"
              title="Add to order"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
