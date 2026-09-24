"use client";

import React, { useState } from "react";
import Image from "next/image";
import { foodItems as initialFoodItems, categories } from "@/data/menuData";
import { FoodItem } from "@/types";
import Badge from "@/components/common/Badge";
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Leaf,
} from "lucide-react";

export default function AdminMenuPage() {
  const [items, setItems] = useState<FoodItem[]>(initialFoodItems);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FoodItem | null>(null);

  // New item form state
  const [newItem, setNewItem] = useState({
    name: "",
    category: "mains",
    price: 36,
    shortDescription: "",
    description: "",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    isChefSpecial: false,
    isVegetarian: false,
    isGlutenFree: false,
    ingredients: "Charcoal, Herbs, Sea Salt",
  });

  const filteredItems = items.filter((item) => {
    if (selectedCategory !== "all" && item.category !== selectedCategory) return false;
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      return item.name.toLowerCase().includes(q) || item.shortDescription.toLowerCase().includes(q);
    }
    return true;
  });

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    const created: FoodItem = {
      id: `custom-${Date.now()}`,
      name: newItem.name,
      category: newItem.category as any,
      price: Number(newItem.price),
      shortDescription: newItem.shortDescription,
      description: newItem.description || newItem.shortDescription,
      image: newItem.image,
      rating: 5.0,
      reviewCount: 1,
      isChefSpecial: newItem.isChefSpecial,
      isVegetarian: newItem.isVegetarian,
      isGlutenFree: newItem.isGlutenFree,
      ingredients: newItem.ingredients.split(",").map((s) => s.trim()),
    };

    setItems([created, ...items]);
    setIsAddModalOpen(false);
    setNewItem({
      name: "",
      category: "mains",
      price: 36,
      shortDescription: "",
      description: "",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
      isChefSpecial: false,
      isVegetarian: false,
      isGlutenFree: false,
      ingredients: "Charcoal, Herbs, Sea Salt",
    });
  };

  const handleDeleteItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold block mb-1">
            Menu Engineering & Catalog
          </span>
          <h1 className="font-serif text-3xl text-white font-light">
            Dishes & Culinary Catalog
          </h1>
        </div>

        <Button
          variant="gold"
          size="sm"
          onClick={() => setIsAddModalOpen(true)}
          icon={<Plus className="w-4 h-4" />}
        >
          Add New Dish
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#131518] border border-[#23272F] p-4 rounded-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1.5 rounded-xs text-xs uppercase tracking-wider font-medium cursor-pointer ${
              selectedCategory === "all"
                ? "bg-[#D4AF37] text-[#0B0C0E] font-semibold"
                : "bg-[#181B21] text-gray-400 hover:text-white border border-[#262A33]"
            }`}
          >
            All Categories ({items.length})
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-1.5 rounded-xs text-xs uppercase tracking-wider font-medium cursor-pointer ${
                selectedCategory === c.id
                  ? "bg-[#D4AF37] text-[#0B0C0E] font-semibold"
                  : "bg-[#181B21] text-gray-400 hover:text-white border border-[#262A33]"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search dish title..."
            className="w-full bg-[#181B21] border border-[#262A33] pl-9 pr-3 py-1.5 rounded-sm text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
          />
        </div>
      </div>

      {/* Catalog Table */}
      <div className="bg-[#131518] border border-[#23272F] rounded-sm overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#181B21] text-gray-400 uppercase tracking-wider text-[10px] border-b border-[#23272F]">
            <tr>
              <th className="py-3 px-4">Dish</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Rating</th>
              <th className="py-3 px-4">Attributes</th>
              <th className="py-3 px-4">Kitchen Availability</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1F232B] text-gray-200">
            {filteredItems.map((item) => (
              <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-sm overflow-hidden shrink-0 border border-[#262A33] bg-[#1A1D23]">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="font-serif text-sm text-white font-medium block">
                        {item.name}
                      </span>
                      <span className="text-[11px] text-gray-400 line-clamp-1 max-w-xs">
                        {item.shortDescription}
                      </span>
                    </div>
                  </div>
                </td>

                <td className="py-3.5 px-4 uppercase text-[11px] text-[#D4AF37] font-medium">
                  {item.category}
                </td>

                <td className="py-3.5 px-4 font-serif text-sm text-[#F3E5AB]">
                  £{item.price.toFixed(2)}
                </td>

                <td className="py-3.5 px-4">
                  <span className="text-white font-semibold">
                    ★ {item.rating.toFixed(1)}
                  </span>
                  <span className="text-gray-500 text-[10px] block">
                    ({item.reviewCount} reviews)
                  </span>
                </td>

                <td className="py-3.5 px-4">
                  <div className="flex flex-wrap gap-1">
                    {item.isChefSpecial && <Badge variant="gold" size="sm">Signature</Badge>}
                    {item.isVegetarian && <Badge variant="emerald" size="sm">Veg</Badge>}
                    {item.isGlutenFree && <Badge variant="amber" size="sm">GF</Badge>}
                  </div>
                </td>

                <td className="py-3.5 px-4">
                  <Badge variant="emerald" size="sm">
                    In Stock (Active)
                  </Badge>
                </td>

                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => setEditingItem(item)}
                      className="p-1.5 bg-[#1C1F26] border border-[#2D313A] rounded hover:border-[#D4AF37] text-gray-300 hover:text-white"
                      title="Edit dish"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="p-1.5 bg-[#1C1F26] border border-[#2D313A] rounded hover:border-red-500 text-gray-300 hover:text-red-400"
                      title="Remove dish"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add New Dish Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Culinary Dish"
        subtitle="Catalog a new creation onto the public seasonal menu."
      >
        <form onSubmit={handleAddItem} className="space-y-4 pt-2 text-xs">
          <div>
            <label className="text-xs uppercase tracking-wider text-gray-400 block mb-1">
              Dish Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Binchotan Charred Langoustine"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="w-full bg-[#1A1D23] border border-[#2A2E35] px-3 py-2 rounded-sm text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs uppercase tracking-wider text-gray-400 block mb-1">
                Category
              </label>
              <select
                value={newItem.category}
                onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                className="w-full bg-[#1A1D23] border border-[#2A2E35] px-3 py-2 rounded-sm text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-gray-400 block mb-1">
                Price (£) *
              </label>
              <input
                type="number"
                required
                min={1}
                value={newItem.price}
                onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })}
                className="w-full bg-[#1A1D23] border border-[#2A2E35] px-3 py-2 rounded-sm text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs uppercase tracking-wider text-gray-400 block mb-1">
              Short Description
            </label>
            <input
              type="text"
              required
              placeholder="Tasting notes and highlights..."
              value={newItem.shortDescription}
              onChange={(e) => setNewItem({ ...newItem, shortDescription: e.target.value })}
              className="w-full bg-[#1A1D23] border border-[#2A2E35] px-3 py-2 rounded-sm text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-wider text-gray-400 block mb-1">
              Ingredients (comma separated)
            </label>
            <input
              type="text"
              value={newItem.ingredients}
              onChange={(e) => setNewItem({ ...newItem, ingredients: e.target.value })}
              className="w-full bg-[#1A1D23] border border-[#2A2E35] px-3 py-2 rounded-sm text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-gray-300">
              <input
                type="checkbox"
                checked={newItem.isChefSpecial}
                onChange={(e) => setNewItem({ ...newItem, isChefSpecial: e.target.checked })}
                className="accent-[#D4AF37]"
              />
              <span>Chef's Signature</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-gray-300">
              <input
                type="checkbox"
                checked={newItem.isVegetarian}
                onChange={(e) => setNewItem({ ...newItem, isVegetarian: e.target.checked })}
                className="accent-[#D4AF37]"
              />
              <span>Vegetarian</span>
            </label>
          </div>

          <div className="pt-4 border-t border-[#1F232B]">
            <Button variant="gold" size="md" type="submit" className="w-full">
              Save & Publish Dish
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Item Modal */}
      {editingItem && (
        <Modal
          isOpen={!!editingItem}
          onClose={() => setEditingItem(null)}
          title={`Edit ${editingItem.name}`}
          subtitle="Adjust pricing and availability."
        >
          <div className="space-y-4 pt-2 text-xs">
            <div>
              <label className="text-xs uppercase tracking-wider text-gray-400 block mb-1">
                Price (£)
              </label>
              <input
                type="number"
                value={editingItem.price}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, price: Number(e.target.value) })
                }
                className="w-full bg-[#1A1D23] border border-[#2A2E35] px-3 py-2 rounded-sm text-xs text-white"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-gray-400 block mb-1">
                Description
              </label>
              <textarea
                rows={3}
                value={editingItem.shortDescription}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, shortDescription: e.target.value })
                }
                className="w-full bg-[#1A1D23] border border-[#2A2E35] px-3 py-2 rounded-sm text-xs text-white"
              />
            </div>
            <div className="pt-3 border-t border-[#1F232B]">
              <Button
                variant="gold"
                size="md"
                className="w-full"
                onClick={() => {
                  setItems((prev) =>
                    prev.map((i) => (i.id === editingItem.id ? editingItem : i))
                  );
                  setEditingItem(null);
                }}
              >
                Update Dish Details
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
