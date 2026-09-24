"use client";

import React, { useState } from "react";
import { mockCustomers } from "@/data/adminData";
import { Customer } from "@/types";
import Badge from "@/components/common/Badge";
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import {
  Users,
  Search,
  Award,
  Crown,
  Sparkles,
  Phone,
  Mail,
  Heart,
  TrendingUp,
} from "lucide-react";

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [tierFilter, setTierFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const filtered = customers.filter((c) => {
    if (tierFilter !== "all" && c.loyaltyTier !== tierFilter) return false;
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      return (
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.favoriteDish.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const tierBadges = {
    Diamond: <Badge variant="gold">Diamond VIP</Badge>,
    Platinum: <Badge variant="blue">Platinum</Badge>,
    Gold: <Badge variant="amber">Gold Patron</Badge>,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold block mb-1">
            Guest Relations & Hospitality
          </span>
          <h1 className="font-serif text-3xl text-white font-light">
            VIP Guest Directory
          </h1>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#131518] border border-[#23272F] p-4 rounded-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1.5">
          {["all", "Diamond", "Platinum", "Gold"].map((t) => (
            <button
              key={t}
              onClick={() => setTierFilter(t)}
              className={`px-3 py-1.5 rounded-xs text-xs uppercase tracking-wider font-medium cursor-pointer ${
                tierFilter === t
                  ? "bg-[#D4AF37] text-[#0B0C0E] font-semibold"
                  : "bg-[#181B21] text-gray-400 hover:text-white border border-[#262A33]"
              }`}
            >
              {t === "all" ? "All Tiers" : t}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search patron or dish..."
            className="w-full bg-[#181B21] border border-[#262A33] pl-9 pr-3 py-1.5 rounded-sm text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-[#131518] border border-[#23272F] rounded-sm overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#181B21] text-gray-400 uppercase tracking-wider text-[10px] border-b border-[#23272F]">
            <tr>
              <th className="py-3 px-4">Patron Name</th>
              <th className="py-3 px-4">Loyalty Privilege</th>
              <th className="py-3 px-4">Lifetime Orders</th>
              <th className="py-3 px-4">Total Expenditure</th>
              <th className="py-3 px-4">Recent Visit</th>
              <th className="py-3 px-4">Preferred Creation</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1F232B] text-gray-200">
            {filtered.map((c) => (
              <tr key={c.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="py-3.5 px-4">
                  <span className="font-serif text-sm text-white font-medium block">
                    {c.name}
                  </span>
                  <span className="text-[11px] text-gray-400 font-mono block">
                    {c.email}
                  </span>
                </td>

                <td className="py-3.5 px-4">{tierBadges[c.loyaltyTier]}</td>

                <td className="py-3.5 px-4 font-mono font-medium text-white">
                  {c.totalOrders} visits
                </td>

                <td className="py-3.5 px-4 font-serif text-sm text-[#F3E5AB]">
                  £{c.totalSpent.toLocaleString()}
                </td>

                <td className="py-3.5 px-4 text-gray-400">{c.lastVisit}</td>

                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center gap-1.5 text-xs text-gray-300">
                    <Heart className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span>{c.favoriteDish}</span>
                  </span>
                </td>

                <td className="py-3.5 px-4 text-right">
                  <button
                    onClick={() => setSelectedCustomer(c)}
                    className="px-2.5 py-1 bg-[#1C1F26] border border-[#2D313A] rounded text-[11px] hover:border-[#D4AF37] text-gray-300 hover:text-white"
                  >
                    View Dossier
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Customer Profile Modal */}
      {selectedCustomer && (
        <Modal
          isOpen={!!selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
          title={selectedCustomer.name}
          subtitle={`AURELIA ${selectedCustomer.loyaltyTier} Tier Patron`}
        >
          <div className="space-y-4 pt-2 text-xs">
            <div className="grid grid-cols-2 gap-3 p-4 bg-[#181B21] border border-[#262A33] rounded-sm">
              <div>
                <span className="text-gray-400 text-[10px] uppercase block">Lifetime Spend</span>
                <span className="font-serif text-2xl text-[#F3E5AB]">
                  £{selectedCustomer.totalSpent.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-gray-400 text-[10px] uppercase block">Salon Visits</span>
                <span className="font-serif text-2xl text-white">
                  {selectedCustomer.totalOrders} times
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between p-2.5 bg-[#14161C] border border-[#23272F] rounded">
                <span className="text-gray-400">Direct Telephone:</span>
                <span className="text-white font-mono">{selectedCustomer.phone}</span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-[#14161C] border border-[#23272F] rounded">
                <span className="text-gray-400">Email Dossier:</span>
                <span className="text-white font-mono">{selectedCustomer.email}</span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-[#14161C] border border-[#23272F] rounded">
                <span className="text-gray-400">Culinary Preference:</span>
                <span className="text-[#F3E5AB] font-medium">{selectedCustomer.favoriteDish}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#1F232B] flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => setSelectedCustomer(null)}
              >
                Close Dossier
              </Button>
              <Button
                variant="gold"
                size="sm"
                className="flex-1"
                onClick={() => {
                  alert(`Private invitation generated for ${selectedCustomer.name}`);
                  setSelectedCustomer(null);
                }}
              >
                Send Tasting Invite
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
