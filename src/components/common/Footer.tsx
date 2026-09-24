"use client";

import React, { useState } from "react";
import Link from "next/link";
import { restaurantInfo } from "@/data/restaurantInfo";
import { Mail, Phone, MapPin, Award, Check } from "lucide-react";
import Button from "./Button";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-[#08090A] border-t border-[#1F232B] pt-20 pb-12 text-gray-400 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-16 border-b border-[#1F232B]">
          {/* Column 1: Brand & Philosophy */}
          <div className="flex flex-col space-y-5">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-sm border border-[#D4AF37]/50 flex items-center justify-center bg-[#131518]">
                <span className="font-serif text-[#D4AF37] text-lg font-bold">A</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-light tracking-[0.25em] text-[#FBFBFD]">
                  AURELIA
                </span>
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#D4AF37] -mt-1 font-medium">
                  Atelier Culinaire
                </span>
              </div>
            </Link>
            <p className="text-sm text-gray-400 font-light leading-relaxed">
              {restaurantInfo.description}
            </p>
            <div className="flex items-center gap-2 pt-2 text-xs text-[#D4AF37]">
              <Award className="w-4 h-4 shrink-0" />
              <span>Michelin Guide 3 Stars • World's 50 Best</span>
            </div>
          </div>

          {/* Column 2: Hours */}
          <div className="flex flex-col space-y-4">
            <h4 className="font-serif text-lg text-[#FBFBFD] tracking-wider uppercase text-xs font-semibold text-[#D4AF37]">
              Service Hours
            </h4>
            <div className="space-y-3 text-xs sm:text-sm">
              {restaurantInfo.hours.map((item, idx) => (
                <div key={idx} className="border-b border-[#1A1D23] pb-2 last:border-0">
                  <div className="text-white font-medium">{item.days}</div>
                  <div className="text-gray-400 text-xs">Lunch: {item.lunch}</div>
                  <div className="text-gray-400 text-xs">Dinner: {item.dinner}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Location & Concierge */}
          <div className="flex flex-col space-y-4">
            <h4 className="font-serif text-lg text-[#FBFBFD] tracking-wider uppercase text-xs font-semibold text-[#D4AF37]">
              Concierge & Atelier
            </h4>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>
                  {restaurantInfo.address.street}
                  <br />
                  {restaurantInfo.address.city}, {restaurantInfo.address.postalCode}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a
                  href={`tel:${restaurantInfo.contact.phone}`}
                  className="hover:text-white transition-colors"
                >
                  {restaurantInfo.contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a
                  href={`mailto:${restaurantInfo.contact.email}`}
                  className="hover:text-white transition-colors"
                >
                  {restaurantInfo.contact.email}
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div className="flex flex-col space-y-4">
            <h4 className="font-serif text-lg text-[#FBFBFD] tracking-wider uppercase text-xs font-semibold text-[#D4AF37]">
              The Seasonal Letter
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Receive private invitations to seasonal tasting previews, winemaker dinners, and cellar releases.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 p-3 bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#F3E5AB] text-xs rounded">
                <Check className="w-4 h-4" />
                <span>Welcome to the Aurelia circle.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full px-3.5 py-2.5 bg-[#131518] border border-[#23272F] text-xs text-white placeholder-gray-500 rounded-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
                <Button variant="gold" size="sm" className="w-full">
                  Subscribe
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            © {new Date().getFullYear()} AURELIA Atelier Culinaire. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-gray-300 transition-colors">
              Philosophy
            </Link>
            <Link href="/menu" className="hover:text-gray-300 transition-colors">
              Menu
            </Link>
            <Link href="/reservation" className="hover:text-gray-300 transition-colors">
              Reservations
            </Link>
            <Link href="/contact" className="hover:text-gray-300 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
