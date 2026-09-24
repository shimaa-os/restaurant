"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem, FoodItem } from "@/types";

interface ToastInfo {
  message: string;
  type: "success" | "info" | "error";
  id: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (
    item: FoodItem,
    quantity?: number,
    selectedOptions?: Record<string, string>,
    specialInstructions?: string
  ) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (isOpen: boolean) => void;
  toasts: ToastInfo[];
  showToast: (message: string, type?: "success" | "info" | "error") => void;
  removeToast: (id: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  // Initialize with some default realistic items so user immediately sees rich cart UI if desired
  useEffect(() => {
    // Add default signature items for an instant rich experience
    const initialItems: CartItem[] = [
      {
        item: {
          id: "main-1",
          name: "Prime Dry-Aged Côte de Boeuf",
          shortDescription: "45-day dry-aged Galician beef, bone marrow jus, and smoked confit garlic.",
          description: "Grass-fed rubia gallega ribeye dry-aged for 45 days in Himalayan salt chambers.",
          price: 88,
          category: "mains",
          image: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1000&q=80",
          rating: 5.0,
          reviewCount: 78,
          ingredients: ["45-Day Galician Beef", "Bone Marrow Jus", "Confit Garlic"],
        },
        quantity: 1,
        selectedOptions: { "Meat Doneness": "Medium Rare", "Choice of Gourmet Side": "Truffle Pomme Purée" },
      },
      {
        item: {
          id: "drk-1",
          name: "The Golden Embers Cocktail",
          shortDescription: "Smoked Japanese whisky, amber vermouth, 24k gold leaf.",
          description: "Yamazaki 12-Year single malt rested over toasted cedar.",
          price: 26,
          category: "drinks",
          image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1000&q=80",
          rating: 4.9,
          reviewCount: 68,
          ingredients: ["Yamazaki 12-Year", "Amber Vermouth", "24K Gold Flakes"],
        },
        quantity: 2,
      },
    ];
    setItems(initialItems);
  }, []);

  const showToast = (message: string, type: "success" | "info" | "error" = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { message, type, id }]);
    setTimeout(() => {
      removeToast(id);
    }, 3500);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToCart = (
    item: FoodItem,
    quantity = 1,
    selectedOptions?: Record<string, string>,
    specialInstructions?: string
  ) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.item.id === item.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        if (selectedOptions) updated[existingIndex].selectedOptions = selectedOptions;
        if (specialInstructions) updated[existingIndex].specialInstructions = specialInstructions;
        return updated;
      }
      return [...prev, { item, quantity, selectedOptions, specialInstructions }];
    });
    showToast(`Added "${item.name}" to your order`);
  };

  const removeFromCart = (itemId: string) => {
    const removedItem = items.find((i) => i.item.id === itemId);
    setItems((prev) => prev.filter((i) => i.item.id !== itemId));
    if (removedItem) {
      showToast(`Removed "${removedItem.item.name}"`, "info");
    }
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.item.id === itemId ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = items.reduce((sum, cartItem) => {
    let itemPrice = cartItem.item.price;
    // Account for add-on extras if configured in options
    return sum + itemPrice * cartItem.quantity;
  }, 0);

  const deliveryFee = totalItems > 0 ? 8 : 0;
  const tax = Math.round(subtotal * 0.1 * 100) / 100;
  const total = subtotal + deliveryFee + tax;

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        deliveryFee,
        tax,
        total,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
