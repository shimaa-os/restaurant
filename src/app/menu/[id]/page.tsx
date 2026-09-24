"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { foodItems } from "@/data/menuData";
import { useCart } from "@/context/CartContext";
import FoodCard from "@/components/food/FoodCard";
import QuantitySelector from "@/components/food/QuantitySelector";
import Button from "@/components/common/Button";
import Badge from "@/components/common/Badge";
import {
  Star,
  Sparkles,
  Leaf,
  Wine,
  Clock,
  Flame,
  ArrowLeft,
  Check,
  ShieldAlert,
  ShoppingBag,
} from "lucide-react";

export default function FoodDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const dish = foodItems.find((item) => item.id === resolvedParams.id);

  if (!dish) {
    notFound();
  }

  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    if (dish.customizationOptions) {
      dish.customizationOptions.forEach((group) => {
        if (group.options.length > 0) {
          initial[group.name] = group.options[0].label;
        }
      });
    }
    return initial;
  });
  const [specialInstructions, setSpecialInstructions] = useState("");

  // Related dishes (same category or specials, excluding this item)
  const relatedDishes = foodItems
    .filter((item) => item.id !== dish.id && (item.category === dish.category || item.isChefSpecial))
    .slice(0, 3);

  // Compute calculated total with potential extra prices
  const calculateTotal = () => {
    let extra = 0;
    if (dish.customizationOptions) {
      dish.customizationOptions.forEach((group) => {
        const chosen = selectedOptions[group.name];
        const match = group.options.find((o) => o.label === chosen);
        if (match && match.extraPrice) {
          extra += match.extraPrice;
        }
      });
    }
    return (dish.price + extra) * quantity;
  };

  const handleOptionSelect = (groupName: string, optionLabel: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [groupName]: optionLabel,
    }));
  };

  const handleAddToCart = () => {
    addToCart(dish, quantity, selectedOptions, specialInstructions);
  };

  return (
    <div className="pt-28 pb-24 min-h-screen bg-[#0B0C0E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Back Link */}
        <div className="mb-8">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-gray-400 hover:text-[#D4AF37] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Gastronomy</span>
          </Link>
        </div>

        {/* Main Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pb-20 border-b border-[#1F232B]">
          {/* Left Column: Food Photography Stage (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="relative w-full aspect-[4/3] rounded-sm overflow-hidden border border-[#23272F] bg-[#131518]">
              <Image
                src={dish.image}
                alt={dish.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Floating Status Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                {dish.isChefSpecial && (
                  <Badge variant="gold" size="md">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Signature Creation
                  </Badge>
                )}
                {dish.isVegetarian && (
                  <Badge variant="emerald" size="md">
                    <Leaf className="w-3 h-3 mr-1" />
                    Vegetarian
                  </Badge>
                )}
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-3 p-4 bg-[#131518] border border-[#23272F] rounded-sm text-center">
              <div className="flex flex-col items-center">
                <span className="text-[10px] uppercase tracking-widest text-gray-400 flex items-center gap-1 mb-0.5">
                  <Star className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
                  Rating
                </span>
                <span className="font-serif text-lg text-white font-medium">
                  {dish.rating.toFixed(1)}{" "}
                  <span className="text-xs text-gray-400 font-sans">
                    ({dish.reviewCount} reviews)
                  </span>
                </span>
              </div>

              <div className="flex flex-col items-center border-x border-[#1F232B]">
                <span className="text-[10px] uppercase tracking-widest text-gray-400 flex items-center gap-1 mb-0.5">
                  <Clock className="w-3 h-3 text-[#D4AF37]" />
                  Prep Time
                </span>
                <span className="font-serif text-lg text-white font-medium">
                  {dish.preparationTime || "15 mins"}
                </span>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-[10px] uppercase tracking-widest text-gray-400 flex items-center gap-1 mb-0.5">
                  <Flame className="w-3 h-3 text-[#D4AF37]" />
                  Calories
                </span>
                <span className="font-serif text-lg text-white font-medium">
                  {dish.calories ? `${dish.calories} kcal` : "Fine Art"}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Information, Customization & Actions (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Category */}
              <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
                {dish.category}
              </span>

              {/* Title */}
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-light tracking-wide mt-1 mb-4">
                {dish.name}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="font-serif text-3xl sm:text-4xl text-[#F3E5AB] font-medium">
                  £{dish.price.toFixed(2)}
                </span>
                <span className="text-xs text-gray-500 uppercase tracking-widest">
                  Per Serving
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-300 font-light text-sm sm:text-base leading-relaxed mb-6">
                {dish.description}
              </p>

              {/* Sommelier Wine Pairing (if present) */}
              {dish.winePairing && (
                <div className="mb-6 p-4 rounded-sm bg-[#16181D] border border-[#D4AF37]/30 flex items-start gap-3">
                  <Wine className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-semibold block">
                      Recommended Cellar Pairing
                    </span>
                    <span className="font-serif text-sm sm:text-base text-gray-200 italic">
                      {dish.winePairing}
                    </span>
                  </div>
                </div>
              )}

              {/* Ingredients List */}
              <div className="mb-6">
                <span className="text-xs uppercase tracking-wider text-gray-400 font-medium block mb-2">
                  Artisanal Ingredients
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {dish.ingredients.map((ing, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-[#15171C] border border-[#23272F] text-xs text-gray-300 rounded-sm"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Customization Options */}
              {dish.customizationOptions && dish.customizationOptions.length > 0 && (
                <div className="space-y-4 mb-6 pt-4 border-t border-[#1F232B]">
                  {dish.customizationOptions.map((group) => (
                    <div key={group.name} className="space-y-2">
                      <span className="text-xs uppercase tracking-wider text-gray-300 font-medium flex items-center justify-between">
                        <span>{group.name}</span>
                        {group.required && (
                          <span className="text-[10px] text-[#D4AF37]">Required</span>
                        )}
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {group.options.map((opt) => {
                          const isSelected = selectedOptions[group.name] === opt.label;
                          return (
                            <button
                              key={opt.label}
                              type="button"
                              onClick={() => handleOptionSelect(group.name, opt.label)}
                              className={`p-2.5 text-left text-xs rounded-sm border transition-all flex items-center justify-between cursor-pointer ${
                                isSelected
                                  ? "border-[#D4AF37] bg-[#D4AF37]/10 text-white"
                                  : "border-[#23272F] bg-[#131518] text-gray-400 hover:border-gray-600 hover:text-white"
                              }`}
                            >
                              <span>{opt.label}</span>
                              {isSelected && <Check className="w-3.5 h-3.5 text-[#D4AF37]" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Special Instructions Input */}
              <div className="mb-6">
                <label className="text-xs uppercase tracking-wider text-gray-400 font-medium block mb-2">
                  Special Kitchen Notes (Optional)
                </label>
                <input
                  type="text"
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="e.g., dressing on side, extra crisped, no garnish"
                  className="w-full bg-[#131518] border border-[#23272F] px-3.5 py-2.5 rounded-sm text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              {/* Allergens Notice */}
              {dish.allergens && dish.allergens.length > 0 && (
                <div className="mb-6 flex items-center gap-2 text-xs text-amber-300/80 bg-amber-500/10 border border-amber-500/20 px-3 py-2 rounded-sm">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>Contains: {dish.allergens.join(", ")}</span>
                </div>
              )}
            </div>

            {/* Bottom Actions: Quantity Selector & Add to Cart */}
            <div className="pt-6 border-t border-[#1F232B] flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <span className="text-xs uppercase tracking-wider text-gray-400">Qty:</span>
                <QuantitySelector
                  quantity={quantity}
                  onIncrement={() => setQuantity((q) => q + 1)}
                  onDecrement={() => setQuantity((q) => Math.max(1, q - 1))}
                  size="md"
                />
              </div>

              <div className="flex-1 w-full">
                <Button
                  variant="gold"
                  size="lg"
                  className="w-full"
                  onClick={handleAddToCart}
                  icon={<ShoppingBag className="w-4 h-4" />}
                >
                  Add to Cart • £{calculateTotal().toFixed(2)}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Dishes Section */}
        {relatedDishes.length > 0 && (
          <div className="pt-16">
            <div className="mb-8">
              <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block mb-1">
                Harmonious Pairings
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-light">
                Companions to This Course
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedDishes.map((item) => (
                <FoodCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
