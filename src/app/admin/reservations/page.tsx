"use client";

import React, { useState } from "react";
import { mockReservations } from "@/data/adminData";
import { ReservationData } from "@/types";
import Badge from "@/components/common/Badge";
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import {
  CalendarDays,
  Plus,
  Search,
  Users,
  Clock,
  Utensils,
  CheckCircle,
  Phone,
  Mail,
} from "lucide-react";

export default function AdminReservationsPage() {
  const [reservations, setReservations] = useState<ReservationData[]>(mockReservations);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  // New reservation form state
  const [newRes, setNewRes] = useState({
    fullName: "",
    email: "",
    phone: "",
    date: "Tonight, Sep 24",
    time: "8:30 PM",
    guests: 2,
    occasion: "Dinner",
    seatingPreference: "main",
    specialRequests: "",
  });

  const filtered = reservations.filter((r) => {
    if (statusFilter !== "all" && r.status !== statusFilter) return false;
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      return r.fullName.toLowerCase().includes(q) || r.email.toLowerCase().includes(q);
    }
    return true;
  });

  const handleStatusChange = (id: string, nextStatus: ReservationData["status"]) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: nextStatus } : r))
    );
  };

  const handleCreateReservation = (e: React.FormEvent) => {
    e.preventDefault();
    const created: ReservationData = {
      id: `res-${Date.now()}`,
      fullName: newRes.fullName,
      email: newRes.email,
      phone: newRes.phone,
      date: newRes.date,
      time: newRes.time,
      guests: Number(newRes.guests),
      occasion: newRes.occasion,
      seatingPreference: newRes.seatingPreference as any,
      specialRequests: newRes.specialRequests,
      status: "confirmed",
      createdAt: "Just now",
    };
    setReservations([created, ...reservations]);
    setIsNewModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold block mb-1">
            Maître d' Console
          </span>
          <h1 className="font-serif text-3xl text-white font-light">
            Salon Reservations
          </h1>
        </div>

        <Button
          variant="gold"
          size="sm"
          onClick={() => setIsNewModalOpen(true)}
          icon={<Plus className="w-4 h-4" />}
        >
          New Booking
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#131518] border border-[#23272F] p-4 rounded-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {["all", "confirmed", "seated", "completed"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xs text-xs uppercase tracking-wider font-medium cursor-pointer ${
                statusFilter === st
                  ? "bg-[#D4AF37] text-[#0B0C0E] font-semibold"
                  : "bg-[#181B21] text-gray-400 hover:text-white border border-[#262A33]"
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guest or email..."
            className="w-full bg-[#181B21] border border-[#262A33] pl-9 pr-3 py-1.5 rounded-sm text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#131518] border border-[#23272F] rounded-sm overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#181B21] text-gray-400 uppercase tracking-wider text-[10px] border-b border-[#23272F]">
            <tr>
              <th className="py-3 px-4">Guest</th>
              <th className="py-3 px-4">Party Size</th>
              <th className="py-3 px-4">Service Slot</th>
              <th className="py-3 px-4">Salon Preference</th>
              <th className="py-3 px-4">Notes / Occasion</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Maître d' Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1F232B] text-gray-200">
            {filtered.map((res) => {
              const statusBadges = {
                confirmed: <Badge variant="gold">Confirmed</Badge>,
                seated: <Badge variant="emerald">Seated</Badge>,
                completed: <Badge variant="dark">Finished</Badge>,
                cancelled: <Badge variant="rose">Cancelled</Badge>,
              };

              return (
                <tr key={res.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="font-serif text-sm text-white font-medium block">
                      {res.fullName}
                    </span>
                    <span className="text-[11px] text-gray-400 block font-mono">
                      {res.phone}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1.5 font-medium text-white">
                      <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{res.guests} Guests</span>
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="font-medium text-white block">{res.time}</span>
                    <span className="text-[11px] text-gray-400">{res.date}</span>
                  </td>

                  <td className="py-3.5 px-4 capitalize text-gray-300">
                    {res.seatingPreference} Salon
                  </td>

                  <td className="py-3.5 px-4 max-w-xs">
                    {res.occasion && (
                      <span className="text-[#F3E5AB] font-medium block text-[11px]">
                        {res.occasion}
                      </span>
                    )}
                    <span className="text-gray-400 text-[11px] line-clamp-1 italic">
                      {res.specialRequests || "No special requests"}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    {statusBadges[res.status || "confirmed"]}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {res.status === "confirmed" && (
                        <button
                          onClick={() => handleStatusChange(res.id!, "seated")}
                          className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded text-[11px] hover:bg-emerald-500/30"
                        >
                          Seat Table
                        </button>
                      )}
                      {res.status === "seated" && (
                        <button
                          onClick={() => handleStatusChange(res.id!, "completed")}
                          className="px-2.5 py-1 bg-[#1A1D23] text-gray-300 border border-[#2A2E35] rounded text-[11px] hover:text-white"
                        >
                          Complete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* New Reservation Modal */}
      <Modal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        title="Direct Table Allocation"
        subtitle="Record telephone or concierge booking into the salon schedule."
      >
        <form onSubmit={handleCreateReservation} className="space-y-4 pt-2 text-xs">
          <div>
            <label className="text-xs uppercase tracking-wider text-gray-400 block mb-1">
              Guest Full Name *
            </label>
            <input
              type="text"
              required
              value={newRes.fullName}
              onChange={(e) => setNewRes({ ...newRes, fullName: e.target.value })}
              className="w-full bg-[#1A1D23] border border-[#2A2E35] px-3 py-2 rounded-sm text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs uppercase tracking-wider text-gray-400 block mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                required
                value={newRes.phone}
                onChange={(e) => setNewRes({ ...newRes, phone: e.target.value })}
                className="w-full bg-[#1A1D23] border border-[#2A2E35] px-3 py-2 rounded-sm text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-gray-400 block mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={newRes.email}
                onChange={(e) => setNewRes({ ...newRes, email: e.target.value })}
                className="w-full bg-[#1A1D23] border border-[#2A2E35] px-3 py-2 rounded-sm text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs uppercase tracking-wider text-gray-400 block mb-1">
                Guests
              </label>
              <input
                type="number"
                min={1}
                max={20}
                value={newRes.guests}
                onChange={(e) => setNewRes({ ...newRes, guests: Number(e.target.value) })}
                className="w-full bg-[#1A1D23] border border-[#2A2E35] px-3 py-2 rounded-sm text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-gray-400 block mb-1">
                Time
              </label>
              <input
                type="text"
                value={newRes.time}
                onChange={(e) => setNewRes({ ...newRes, time: e.target.value })}
                className="w-full bg-[#1A1D23] border border-[#2A2E35] px-3 py-2 rounded-sm text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-gray-400 block mb-1">
                Salon Area
              </label>
              <select
                value={newRes.seatingPreference}
                onChange={(e) => setNewRes({ ...newRes, seatingPreference: e.target.value })}
                className="w-full bg-[#1A1D23] border border-[#2A2E35] px-3 py-2 rounded-sm text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="main">Main Salon</option>
                <option value="counter">Chef Stage</option>
                <option value="terrace">Glass Terrace</option>
                <option value="cellar">Wine Vault</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs uppercase tracking-wider text-gray-400 block mb-1">
              Concierge Notes
            </label>
            <textarea
              rows={2}
              value={newRes.specialRequests}
              onChange={(e) => setNewRes({ ...newRes, specialRequests: e.target.value })}
              className="w-full bg-[#1A1D23] border border-[#2A2E35] px-3 py-2 rounded-sm text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div className="pt-3 border-t border-[#1F232B]">
            <Button variant="gold" size="md" type="submit" className="w-full">
              Confirm & Allocate Table
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
