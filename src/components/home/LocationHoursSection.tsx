import React from "react";
import Link from "next/link";
import { restaurantInfo } from "@/data/restaurantInfo";
import SectionTitle from "@/components/common/SectionTitle";
import Button from "@/components/common/Button";
import { Clock, MapPin, Phone, Mail, Navigation, Calendar } from "lucide-react";

export default function LocationHoursSection() {
  return (
    <section className="py-24 bg-[#0E1013] border-t border-[#1F232B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Presence & Hospitality"
          title="Visit The Atelier"
          subtitle="Nestled in the architectural heart of Mayfair, welcoming epicureans seven days a week."
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Hours & Contact Information (7 cols) */}
          <div className="lg:col-span-7 bg-[#131518] border border-[#23272F] p-8 sm:p-10 rounded-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 text-[#D4AF37] mb-6">
                <Clock className="w-5 h-5" />
                <h3 className="font-serif text-2xl text-white font-light">
                  Service Timings
                </h3>
              </div>

              <div className="space-y-4 mb-8">
                {restaurantInfo.hours.map((h, i) => (
                  <div
                    key={i}
                    className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#1F232B] text-sm"
                  >
                    <span className="font-medium text-white">{h.days}</span>
                    <span className="text-gray-400 text-xs sm:text-sm">
                      Lunch: <strong className="text-gray-200">{h.lunch}</strong> | Dinner:{" "}
                      <strong className="text-gray-200">{h.dinner}</strong>
                    </span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs uppercase tracking-wider text-gray-400 mb-1">
                      Location
                    </h5>
                    <p className="text-sm text-gray-200">
                      {restaurantInfo.address.street}
                      <br />
                      {restaurantInfo.address.city}, {restaurantInfo.address.postalCode}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs uppercase tracking-wider text-gray-400 mb-1">
                      Direct Concierge
                    </h5>
                    <p className="text-sm text-gray-200">
                      {restaurantInfo.contact.phone}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      valet parking available
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#1F232B] flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-gray-400">
                Dress Code: Elegant Smart Casual. Advance booking recommended.
              </span>
              <Link href="/reservation">
                <Button variant="gold" size="sm" icon={<Calendar className="w-3.5 h-3.5" />}>
                  Book Table
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Interactive Map Placeholder (5 cols) */}
          <div className="lg:col-span-5 bg-[#131518] border border-[#23272F] rounded-sm p-2 flex flex-col relative overflow-hidden min-h-[340px]">
            {/* Dark Styled Map Graphic Mockup */}
            <div className="relative w-full h-full rounded-sm overflow-hidden bg-[#0F1115] flex flex-col items-center justify-center p-6 text-center">
              {/* Radial grid overlay */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "radial-gradient(#D4AF37 1px, transparent 1px), radial-gradient(#2A2E35 1px, #0F1115 1px)",
                  backgroundSize: "24px 24px",
                }}
              />

              <div className="relative z-10 flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-[#1A1D23] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.4)] mb-4 animate-bounce">
                  <MapPin className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-xl text-white font-light mb-1">
                  AURELIA Mayfair
                </h4>
                <p className="text-xs text-gray-400 max-w-xs mb-4">
                  48 Grosvenor Square, Mayfair, London W1K 2HP
                </p>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#1E222A] border border-[#2C303A] rounded-full text-[11px] text-[#F3E5AB]">
                  <Navigation className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>3 mins walk from Bond Street Station</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
