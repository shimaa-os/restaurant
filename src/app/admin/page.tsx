"use client";

import React from "react";
import Link from "next/link";
import { adminKPIs, mockOrders, revenueChartData } from "@/data/adminData";
import Badge from "@/components/common/Badge";
import Button from "@/components/common/Button";
import {
  TrendingUp,
  ShoppingBag,
  CalendarCheck,
  Users,
  CreditCard,
  ArrowUpRight,
  Plus,
  Utensils,
  Clock,
  ChevronRight,
} from "lucide-react";

export default function AdminOverviewPage() {
  const maxRevenue = Math.max(...revenueChartData.map((d) => d.revenue));

  return (
    <div className="space-y-8">
      {/* Page Title & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold block mb-1">
            Service Console
          </span>
          <h1 className="font-serif text-3xl text-white font-light">
            Salon & Kitchen Overview
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin/menu">
            <Button variant="dark" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>
              Add Dish
            </Button>
          </Link>
          <Link href="/admin/reservations">
            <Button variant="gold" size="sm" icon={<CalendarCheck className="w-3.5 h-3.5" />}>
              Table Schedule
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-[#131518] border border-[#23272F] p-5 rounded-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-400 mb-3">
            <span className="text-xs uppercase tracking-wider">Today's Revenue</span>
            <div className="p-2 bg-[#1A1D23] rounded text-[#D4AF37]">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif text-3xl text-white font-medium mb-1">
            £{adminKPIs.todayRevenue.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
            <span>{adminKPIs.revenueChange}</span>
          </div>
        </div>

        <div className="bg-[#131518] border border-[#23272F] p-5 rounded-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-400 mb-3">
            <span className="text-xs uppercase tracking-wider">Active Hearth Orders</span>
            <div className="p-2 bg-[#1A1D23] rounded text-amber-400">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif text-3xl text-white font-medium mb-1">
            {adminKPIs.activeOrders} Orders
          </div>
          <div className="text-[11px] text-gray-400">
            5 currently at kitchen pass
          </div>
        </div>

        <div className="bg-[#131518] border border-[#23272F] p-5 rounded-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-400 mb-3">
            <span className="text-xs uppercase tracking-wider">Table Occupancy</span>
            <div className="p-2 bg-[#1A1D23] rounded text-sky-400">
              <Utensils className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif text-3xl text-white font-medium mb-1">
            {adminKPIs.tableOccupancy}
          </div>
          <div className="text-[11px] text-sky-400">
            18 / 20 salons occupied
          </div>
        </div>

        <div className="bg-[#131518] border border-[#23272F] p-5 rounded-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-400 mb-3">
            <span className="text-xs uppercase tracking-wider">Average Check</span>
            <div className="p-2 bg-[#1A1D23] rounded text-[#D4AF37]">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif text-3xl text-white font-medium mb-1">
            £{adminKPIs.averageCheck.toFixed(2)}
          </div>
          <div className="text-[11px] text-gray-400">
            +£24.00 vs lunch service
          </div>
        </div>
      </div>

      {/* Main Section: Chart + Live Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Visual Sales Chart (7 cols) */}
        <div className="lg:col-span-7 bg-[#131518] border border-[#23272F] p-6 rounded-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#1F232B]">
            <div>
              <h3 className="font-serif text-xl text-white font-light">
                Weekly Revenue Trajectory
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Past 7 days performance across dinner & lunch salons
              </p>
            </div>
            <span className="font-mono text-xs px-2.5 py-1 bg-[#1A1D23] text-[#F3E5AB] rounded border border-white/5">
              Target Met: 104%
            </span>
          </div>

          {/* Bar Chart Visualization */}
          <div className="h-64 flex items-end justify-between gap-3 pt-4 px-2">
            {revenueChartData.map((item) => {
              const heightPct = Math.round((item.revenue / maxRevenue) * 100);
              return (
                <div key={item.day} className="flex-1 flex flex-col items-center gap-2 group">
                  {/* Tooltip on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono text-[#D4AF37] -mb-1">
                    £{(item.revenue / 1000).toFixed(1)}k
                  </div>

                  {/* Bar */}
                  <div className="w-full bg-[#1A1D24] rounded-xs relative h-48 flex items-end overflow-hidden">
                    <div
                      style={{ height: `${heightPct}%` }}
                      className="w-full bg-gradient-to-t from-[#B89047] to-[#D4AF37] group-hover:brightness-125 transition-all duration-300 rounded-t-xs"
                    />
                  </div>

                  {/* Day Label */}
                  <span className="text-xs text-gray-400 font-medium group-hover:text-white">
                    {item.day}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-[#1F232B] flex items-center justify-between text-xs text-gray-400">
            <span>Peak Day: Saturday (£29,500)</span>
            <span className="text-[#D4AF37]">Total Weekly Sales: £142,600</span>
          </div>
        </div>

        {/* Right Column: Live Hearth Orders Stream (5 cols) */}
        <div className="lg:col-span-5 bg-[#131518] border border-[#23272F] p-6 rounded-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#1F232B]">
              <h3 className="font-serif text-xl text-white font-light">
                Live Service Stream
              </h3>
              <Link
                href="/admin/orders"
                className="text-xs text-[#D4AF37] hover:underline flex items-center gap-1"
              >
                <span>All Orders</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {mockOrders.slice(0, 4).map((order) => {
                const statusBadges = {
                  preparing: <Badge variant="amber">Kitchen Prep</Badge>,
                  ready: <Badge variant="emerald">Ready</Badge>,
                  out_for_delivery: <Badge variant="blue">In Transit</Badge>,
                  pending: <Badge variant="rose">New Order</Badge>,
                  completed: <Badge variant="dark">Served</Badge>,
                  cancelled: <Badge variant="dark">Cancelled</Badge>,
                };

                return (
                  <div
                    key={order.id}
                    className="p-3 bg-[#171A21] border border-[#23272F] rounded-sm flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-white">
                          {order.orderNumber}
                        </span>
                        <span className="text-gray-400">• {order.createdAt}</span>
                      </div>
                      <div className="text-gray-300 font-medium mt-0.5">
                        {order.customerName}
                      </div>
                      <div className="text-[11px] text-gray-400">
                        {order.tableNumber || order.deliveryAddress}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1.5">
                      {statusBadges[order.status]}
                      <span className="font-serif text-sm text-[#F3E5AB]">
                        £{order.totalAmount}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-[#1F232B] mt-4">
            <Link href="/admin/orders" className="w-full block">
              <Button variant="dark" size="sm" className="w-full">
                Open Complete Order Pipeline
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
