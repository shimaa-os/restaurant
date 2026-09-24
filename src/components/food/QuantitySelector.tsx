import React from "react";
import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
}

export default function QuantitySelector({
  quantity,
  onIncrement,
  onDecrement,
  min = 1,
  max = 99,
  size = "md",
}: QuantitySelectorProps) {
  const sizeClasses = {
    sm: "h-7 px-2 text-xs",
    md: "h-9 px-3 text-sm",
  };

  return (
    <div className={`inline-flex items-center bg-[#131518] border border-[#23272F] rounded-sm ${sizeClasses[size]}`}>
      <button
        type="button"
        onClick={onDecrement}
        disabled={quantity <= min}
        className="text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed p-0.5 transition-colors"
        aria-label="Decrease quantity"
      >
        <Minus className={size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5"} />
      </button>

      <span className="w-8 text-center font-medium font-sans text-white select-none">
        {quantity}
      </span>

      <button
        type="button"
        onClick={onIncrement}
        disabled={quantity >= max}
        className="text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed p-0.5 transition-colors"
        aria-label="Increase quantity"
      >
        <Plus className={size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5"} />
      </button>
    </div>
  );
}
