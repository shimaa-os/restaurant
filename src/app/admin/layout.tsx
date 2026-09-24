"use client";

import React, { useState, useEffect } from "react";
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
  Lock,
  KeyRound,
  LogOut,
  ArrowRight,
} from "lucide-react";
import Button from "@/components/common/Button";

const ADMIN_SECRET_PIN = "8924";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [passcode, setPasscode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isServiceActive, setIsServiceActive] = useState(true);

  useEffect(() => {
    const authStatus = sessionStorage.getItem("aurelia_admin_auth");
    setIsAuthenticated(authStatus === "true");
  }, []);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === ADMIN_SECRET_PIN || passcode.trim().toLowerCase() === "admin") {
      sessionStorage.setItem("aurelia_admin_auth", "true");
      setIsAuthenticated(true);
      setErrorMsg("");
      setPasscode("");
    } else {
      setErrorMsg("Invalid authorization passcode. Access denied.");
    }
  };

  const handleLock = () => {
    sessionStorage.removeItem("aurelia_admin_auth");
    setIsAuthenticated(false);
  };

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

  // Loading state while checking storage
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#090A0C] flex items-center justify-center">
        <span className="w-6 h-6 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Passcode Security Gate if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070809] flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-sm w-full bg-[#111317] border border-[#23272F] p-8 rounded-sm text-center shadow-2xl">
          <div className="w-14 h-14 rounded-full bg-[#181B21] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] mx-auto mb-5 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
            <Lock className="w-6 h-6" />
          </div>

          <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold block mb-1">
            Restricted Console
          </span>
          <h2 className="font-serif text-2xl text-white font-light mb-2">
            AURELIA Management
          </h2>
          <p className="text-xs text-gray-400 font-light mb-6">
            Authorized personnel only. Please input the salon director security passcode.
          </p>

          <form onSubmit={handleUnlock} className="space-y-4">
            <div className="relative">
              <KeyRound className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                autoFocus
                placeholder="Enter passcode (PIN: 8924)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full bg-[#181B21] border border-[#2A2E35] pl-10 pr-3.5 py-2.5 rounded-sm text-xs text-white text-center tracking-[0.2em] placeholder:tracking-normal placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
              />
            </div>

            {errorMsg && (
              <p className="text-xs text-rose-400 font-medium animate-shake">
                {errorMsg}
              </p>
            )}

            <Button
              variant="gold"
              size="md"
              type="submit"
              className="w-full"
              icon={<ArrowRight className="w-3.5 h-3.5" />}
              iconPosition="right"
            >
              Verify & Unlock
            </Button>
          </form>

          <div className="mt-6 pt-4 border-t border-[#1F232B]">
            <Link
              href="/"
              className="text-[11px] text-gray-500 hover:text-gray-300 transition-colors inline-flex items-center gap-1"
            >
              <ExternalLink className="w-3 h-3" />
              <span>Return to Public Restaurant Site</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard
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

        {/* Bottom Profile, Exit Link & Lock Button */}
        <div className="p-4 border-t border-[#1F232B] space-y-2">
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

          <button
            onClick={handleLock}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded bg-rose-500/10 border border-rose-500/20 text-rose-300 hover:bg-rose-500/20 text-xs transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Lock Admin Portal</span>
          </button>

          <div className="flex items-center gap-3 px-2 pt-2">
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
            <div className="flex items-center gap-2 text-xs text-[#F3E5AB] bg-[#15171C] border border-[#D4AF37]/30 px-3 py-1.5 rounded-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="hidden sm:inline">Secure Session (PIN Verified)</span>
            </div>

            <button
              onClick={handleLock}
              className="p-2 rounded-sm bg-[#15171C] border border-[#23272F] text-gray-400 hover:text-rose-400 transition-colors"
              title="Lock Admin Console"
            >
              <Lock className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 sm:p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}
