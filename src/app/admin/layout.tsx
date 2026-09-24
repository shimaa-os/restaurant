"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  UtensilsCrossed,
  CalendarDays,
  Users,
  Star,
  ExternalLink,
  Bell,
  Search,
  ChevronRight,
  ShieldCheck,
  Menu as MenuIcon,
  X,
  Circle,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isServiceActive, setIsServiceActive] = useState(true);

  const navItems = [
    { label: "Overview", href: "/admin", icon: LayoutDashboard },
    { label: "Orders", href: "/admin/orders", icon: ShoppingBag, badge: "5 Live" },
    { label: "Menu Management", href: "/admin/menu", icon: UtensilsCrossed },
    { label: "Reservations", href: "/admin/reservations", icon: CalendarDays, badge: "12 Today" },
    { label: "VIP Customers", href: "/admin/customers", icon: Users },
    { label: "Guest Reviews", href: "/admin/reviews", icon: Star },
  ];

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-[#090A0C] text-[#E8E9ED] flex flex-col md:flex-row">
      {/* Mobile Header Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#111317] border-b border-[#23272F] sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-2">
          <span className="w-7 h-7 rounded border border-[#D4AF37] flex items-center justify-center font-serif text-[#D4AF37] text-sm font-bold">
            A
          </span>
          <span className="font-serif text-lg tracking-wider text-white">AURELIA ADMIN</span>
        </Link>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-gray-300 hover:text-white"
        >
          {isSidebarOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-[#0F1115] border-r border-[#1F232B] flex flex-col justify-between z-30 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div>
          {/* Brand & Subtitle */}
          <div className="p-6 border-b border-[#1F232B]">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded border border-[#D4AF37]/50 flex items-center justify-center bg-[#181B21]">
                <span className="font-serif text-[#D4AF37] text-base font-bold">A</span>
              </div>
              <div>
                <span className="font-serif text-lg font-light tracking-[0.2em] text-[#FBFBFD] block">
                  AURELIA
                </span>
                <span className="text-[9px] uppercase tracking-widest text-[#D4AF37] block font-mono">
                  Kitchen & Salon Admin
                </span>
              </div>
            </Link>
          </div>

          {/* Service Status Toggle */}
          <div className="px-6 py-4 border-b border-[#1F232B]/60">
            <button
              onClick={() => setIsServiceActive(!isServiceActive)}
              className="w-full flex items-center justify-between px-3 py-2 rounded bg-[#16181F] border border-[#262A34] text-xs transition-colors hover:border-[#D4AF37]/40 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Circle
                  className={`w-2.5 h-2.5 ${
                    isServiceActive
                      ? "fill-emerald-400 text-emerald-400 animate-pulse"
                      : "fill-amber-400 text-amber-400"
                  }`}
                />
                <span className="font-medium text-white">
                  {isServiceActive ? "Dinner Service Live" : "Prep Mode / Paused"}
                </span>
              </div>
              <span className="text-[10px] text-gray-500 uppercase">Switch</span>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            <span className="px-3 text-[10px] uppercase tracking-[0.2em] text-gray-500 font-semibold block mb-2">
              Console Navigation
            </span>
            {navItems.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-sm text-xs transition-all ${
                    active
                      ? "bg-[#D4AF37]/15 text-[#F3E5AB] border border-[#D4AF37]/40 font-medium shadow-[0_0_12px_rgba(212,175,55,0.1)]"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${active ? "text-[#D4AF37]" : "text-gray-400"}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#1A1D24] text-gray-300 font-mono border border-white/5">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Profile & Public Site Link */}
        <div className="p-4 border-t border-[#1F232B] space-y-3">
          <Link
            href="/"
            className="flex items-center justify-between px-3 py-2 rounded bg-[#16181F] border border-[#262A34] text-xs text-gray-300 hover:text-white hover:border-[#D4AF37]/30 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Exit to Guest Site</span>
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
          </Link>

          <div className="flex items-center gap-3 px-2 py-1">
            <div className="w-8 h-8 rounded-full bg-[#1F232B] border border-[#D4AF37]/40 flex items-center justify-center text-xs font-serif text-[#D4AF37]">
              MV
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-xs font-medium text-white block truncate">
                Chef Marcus Vance
              </span>
              <span className="text-[10px] text-gray-400 block truncate">
                Culinary Director (Master)
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Admin Content Canvas */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navigation Bar */}
        <header className="h-16 bg-[#0E1013] border-b border-[#1F232B] px-6 sm:px-8 flex items-center justify-between sticky top-0 z-20">
          {/* Search Bar */}
          <div className="relative w-64 sm:w-80 hidden sm:block">
            <Search className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search orders, tables, guests, dishes..."
              className="w-full bg-[#15171C] border border-[#23272F] pl-9 pr-3 py-1.5 rounded-sm text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          {/* Quick Actions & Notifications */}
          <div className="flex items-center gap-4 ml-auto">
            <div className="flex items-center gap-2 text-xs text-gray-400 bg-[#15171C] border border-[#23272F] px-3 py-1.5 rounded-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="hidden sm:inline">Admin Mode (Mock Sandbox)</span>
            </div>

            <button
              className="relative p-2 rounded-sm bg-[#15171C] border border-[#23272F] text-gray-400 hover:text-white transition-colors"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#D4AF37]" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 sm:p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}
