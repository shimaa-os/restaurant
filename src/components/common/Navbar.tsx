"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu as MenuIcon, X, Sparkles, ShieldAlert } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Button from "./Button";

export default function Navbar() {
  const pathname = usePathname();
  const { totalItems, setIsCartDrawerOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Menu", href: "/menu" },
    { label: "Story", href: "/about" },
    { label: "Reserve", href: "/reservation" },
    { label: "Contact", href: "/contact" },
    { label: "Admin", href: "/admin", badge: "Live" },
  ];

  const isActive = (href: string) => {
    if (href === "/" && pathname !== "/") return false;
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? "bg-[#0B0C0E]/90 backdrop-blur-md border-b border-[#23272F] py-3.5 shadow-2xl"
            : "bg-gradient-to-b from-[#0B0C0E]/90 via-[#0B0C0E]/40 to-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-sm border border-[#D4AF37]/50 flex items-center justify-center bg-[#131518] group-hover:border-[#D4AF37] transition-all duration-300">
              <span className="font-serif text-[#D4AF37] text-lg font-bold tracking-tighter">
                A
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-light tracking-[0.25em] text-[#FBFBFD] group-hover:text-[#F3E5AB] transition-colors">
                AURELIA
              </span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-[#D4AF37] -mt-1 font-medium">
                Atelier Culinaire
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs uppercase tracking-[0.18em] transition-all duration-200 relative py-1 ${
                    active
                      ? "text-[#D4AF37] font-semibold"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {link.label}
                    {link.badge && (
                      <span className="px-1.5 py-0.2 text-[9px] bg-[#D4AF37]/20 text-[#F3E5AB] border border-[#D4AF37]/30 rounded-xs font-mono">
                        {link.badge}
                      </span>
                    )}
                  </span>
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Cart Link with Badge */}
            <Link
              href="/cart"
              className="relative p-2.5 rounded-sm bg-[#131518] border border-[#23272F] text-gray-300 hover:text-[#D4AF37] hover:border-[#D4AF37]/40 transition-all duration-300"
              aria-label="View shopping cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] bg-gradient-to-r from-[#D4AF37] to-[#B89047] text-[#0B0C0E] text-[10px] font-bold rounded-full flex items-center justify-center px-1 shadow-[0_0_10px_rgba(212,175,55,0.6)] animate-pulse">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Reserve Table Button (Desktop) */}
            <div className="hidden sm:block">
              <Link href="/reservation">
                <Button variant="gold" size="sm" icon={<Sparkles className="w-3.5 h-3.5" />}>
                  Book a Table
                </Button>
              </Link>
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-[#D4AF37]" />
              ) : (
                <MenuIcon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 md:hidden bg-[#0B0C0E]/98 backdrop-blur-xl pt-24 px-6 flex flex-col justify-between pb-8">
          <div className="flex flex-col gap-6">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
              Navigation
            </span>
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`font-serif text-2xl tracking-wider transition-colors flex items-center justify-between ${
                      active ? "text-[#D4AF37]" : "text-gray-200"
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="text-xs font-sans px-2 py-0.5 bg-[#D4AF37]/20 text-[#F3E5AB] rounded border border-[#D4AF37]/30">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-6 border-t border-[#23272F]">
            <Link href="/reservation" className="w-full">
              <Button variant="gold" size="lg" className="w-full">
                Book a Table
              </Button>
            </Link>
            <Link href="/cart" className="w-full">
              <Button variant="dark" size="lg" className="w-full">
                View Order ({totalItems} items)
              </Button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
