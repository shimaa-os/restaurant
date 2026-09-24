"use client";

import React, { useState } from "react";
import { mockOrders } from "@/data/adminData";
import { Order } from "@/types";
import Badge from "@/components/common/Badge";
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import {
  Search,
  Filter,
  Eye,
  CheckCircle,
  Clock,
  Utensils,
  MapPin,
  ChevronDown,
  ShoppingBag,
} from "lucide-react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter((order) => {
    if (statusFilter !== "all" && order.status !== statusFilter) return false;
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      const matchNum = order.orderNumber.toLowerCase().includes(q);
      const matchCust = order.customerName.toLowerCase().includes(q);
      if (!matchNum && !matchCust) return false;
    }
    return true;
  });

  const handleUpdateStatus = (orderId: string, nextStatus: Order["status"]) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: nextStatus } : o))
    );
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder((prev) => (prev ? { ...prev, status: nextStatus } : null));
    }
  };

  const statusMap = {
    pending: { label: "Pending", variant: "rose" as const },
    preparing: { label: "Preparing", variant: "amber" as const },
    ready: { label: "Ready to Serve", variant: "emerald" as const },
    out_for_delivery: { label: "In Transit", variant: "blue" as const },
    completed: { label: "Completed", variant: "dark" as const },
    cancelled: { label: "Cancelled", variant: "dark" as const },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold block mb-1">
            Kitchen & Delivery Pipeline
          </span>
          <h1 className="font-serif text-3xl text-white font-light">
            Service Orders
          </h1>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-[#131518] border border-[#23272F] p-4 rounded-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Status Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {["all", "pending", "preparing", "ready", "out_for_delivery", "completed"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xs text-xs uppercase tracking-wider font-medium transition-colors cursor-pointer ${
                statusFilter === st
                  ? "bg-[#D4AF37] text-[#0B0C0E] font-semibold"
                  : "bg-[#181B21] text-gray-400 hover:text-white border border-[#262A33]"
              }`}
            >
              {st.replace(/_/g, " ")}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search order # or patron..."
            className="w-full bg-[#181B21] border border-[#262A33] pl-9 pr-3 py-1.5 rounded-sm text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-[#131518] border border-[#23272F] rounded-sm overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#181B21] text-gray-400 uppercase tracking-wider text-[10px] border-b border-[#23272F]">
            <tr>
              <th className="py-3 px-4">Order Ref</th>
              <th className="py-3 px-4">Patron</th>
              <th className="py-3 px-4">Type / Location</th>
              <th className="py-3 px-4">Items Summary</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1F232B] text-gray-200">
            {filteredOrders.map((order) => {
              const statusCfg = statusMap[order.status];
              return (
                <tr key={order.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-white">
                    {order.orderNumber}
                    <span className="block font-sans font-normal text-[10px] text-gray-500">
                      {order.createdAt}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-medium text-white block">
                      {order.customerName}
                    </span>
                    <span className="text-[11px] text-gray-400 font-mono">
                      {order.customerPhone}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1.5 text-xs text-gray-300">
                      {order.orderType === "dine_in" ? (
                        <Utensils className="w-3.5 h-3.5 text-[#D4AF37]" />
                      ) : (
                        <MapPin className="w-3.5 h-3.5 text-sky-400" />
                      )}
                      <span>{order.tableNumber || order.deliveryAddress}</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-4 max-w-xs">
                    <span className="text-gray-300 line-clamp-1">
                      {order.items.map((i) => `${i.quantity}x ${i.dishName}`).join(", ")}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-serif text-sm text-[#F3E5AB]">
                    £{order.totalAmount.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge variant={statusCfg.variant}>
                      {statusCfg.label}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="p-1.5 bg-[#1C1F26] border border-[#2D313A] rounded hover:border-[#D4AF37] text-gray-300 hover:text-white"
                        title="View details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      {order.status === "pending" && (
                        <button
                          onClick={() => handleUpdateStatus(order.id, "preparing")}
                          className="px-2.5 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded text-[11px] hover:bg-amber-500/30"
                        >
                          Send to Pass
                        </button>
                      )}
                      {order.status === "preparing" && (
                        <button
                          onClick={() => handleUpdateStatus(order.id, "ready")}
                          className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded text-[11px] hover:bg-emerald-500/30"
                        >
                          Mark Ready
                        </button>
                      )}
                      {order.status === "ready" && (
                        <button
                          onClick={() => handleUpdateStatus(order.id, "completed")}
                          className="px-2.5 py-1 bg-gray-500/20 text-gray-300 border border-gray-500/30 rounded text-[11px] hover:bg-gray-500/30"
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

      {/* Order Detail Modal */}
      {selectedOrder && (
        <Modal
          isOpen={!!selectedOrder}
          onClose={() => setSelectedOrder(null)}
          title={`Order ${selectedOrder.orderNumber}`}
          subtitle={`Placed by ${selectedOrder.customerName} (${selectedOrder.createdAt})`}
        >
          <div className="space-y-4 pt-2 text-xs">
            <div className="p-3 bg-[#1A1D23] border border-[#2A2E35] rounded-sm space-y-1.5">
              <div className="flex justify-between">
                <span className="text-gray-400">Service:</span>
                <span className="text-white font-medium capitalize">
                  {selectedOrder.orderType.replace(/_/g, " ")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Destination:</span>
                <span className="text-white font-medium">
                  {selectedOrder.tableNumber || selectedOrder.deliveryAddress}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Contact:</span>
                <span className="text-white font-mono">{selectedOrder.customerPhone}</span>
              </div>
            </div>

            {/* Items List */}
            <div>
              <span className="text-xs uppercase tracking-wider text-gray-400 block mb-2 font-medium">
                Courses Ordered
              </span>
              <div className="space-y-2">
                {selectedOrder.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#171A21] border border-[#23272F] rounded-sm flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded bg-[#23272F] flex items-center justify-center font-bold text-[#D4AF37]">
                        {item.quantity}
                      </span>
                      <span className="text-white font-medium">{item.dishName}</span>
                    </div>
                    <span className="font-serif text-[#F3E5AB]">
                      £{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#1F232B] text-sm">
              <span className="text-gray-400 font-medium">Grand Total</span>
              <span className="font-serif text-2xl text-[#F3E5AB] font-bold">
                £{selectedOrder.totalAmount.toFixed(2)}
              </span>
            </div>

            {/* Advance Status Controls */}
            <div className="pt-4 border-t border-[#1F232B] flex gap-2">
              <button
                onClick={() => handleUpdateStatus(selectedOrder.id, "preparing")}
                className="flex-1 py-2 bg-[#1A1D23] border border-[#2A2E35] text-amber-300 rounded hover:bg-amber-500/20 text-xs"
              >
                Set Preparing
              </button>
              <button
                onClick={() => handleUpdateStatus(selectedOrder.id, "ready")}
                className="flex-1 py-2 bg-[#1A1D23] border border-[#2A2E35] text-emerald-300 rounded hover:bg-emerald-500/20 text-xs"
              >
                Set Ready
              </button>
              <button
                onClick={() => handleUpdateStatus(selectedOrder.id, "completed")}
                className="flex-1 py-2 bg-[#D4AF37] text-[#0B0C0E] rounded font-semibold text-xs"
              >
                Mark Completed
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
