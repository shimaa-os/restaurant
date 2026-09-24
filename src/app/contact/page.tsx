"use client";

import React, { useState } from "react";
import { restaurantInfo } from "@/data/restaurantInfo";
import SectionTitle from "@/components/common/SectionTitle";
import Button from "@/components/common/Button";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Navigation,
  Car,
  Globe,
  Share2,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "Concierge / Table Inquiries",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        department: "Concierge / Table Inquiries",
        message: "",
      });
      setTimeout(() => setIsSent(false), 5000);
    }, 1000);
  };

  return (
    <div className="pt-28 pb-24 min-h-screen bg-[#0B0C0E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Direct Concierge"
          title="Connect with The Atelier"
          subtitle="Whether planning an intimate private tasting, cellar consultation, or media collaboration, our dedicated concierge team is at your service."
          align="center"
        />

        {/* 3 Contact Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          <div className="bg-[#131518] border border-[#23272F] p-6 rounded-sm flex items-start gap-4">
            <div className="p-3 bg-[#1A1D23] border border-[#2A2E35] rounded text-[#D4AF37] shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold block mb-1">
                Mayfair Address
              </span>
              <p className="text-sm text-white font-medium">
                {restaurantInfo.address.street}
              </p>
              <p className="text-xs text-gray-400">
                {restaurantInfo.address.city}, {restaurantInfo.address.postalCode}
              </p>
              <span className="text-[11px] text-gray-500 block mt-2">
                Valet parking available at Grosvenor entrance
              </span>
            </div>
          </div>

          <div className="bg-[#131518] border border-[#23272F] p-6 rounded-sm flex items-start gap-4">
            <div className="p-3 bg-[#1A1D23] border border-[#2A2E35] rounded text-[#D4AF37] shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold block mb-1">
                Telephone & Concierge
              </span>
              <a
                href={`tel:${restaurantInfo.contact.phone}`}
                className="text-sm text-white font-medium hover:text-[#D4AF37] transition-colors block"
              >
                {restaurantInfo.contact.phone}
              </a>
              <a
                href={`tel:${restaurantInfo.contact.conciergePhone}`}
                className="text-xs text-gray-400 hover:text-white transition-colors block mt-0.5"
              >
                VIP Direct: {restaurantInfo.contact.conciergePhone}
              </a>
              <span className="text-[11px] text-gray-500 block mt-2">
                Lines open daily from 9:00 AM – 11:00 PM GMT
              </span>
            </div>
          </div>

          <div className="bg-[#131518] border border-[#23272F] p-6 rounded-sm flex items-start gap-4">
            <div className="p-3 bg-[#1A1D23] border border-[#2A2E35] rounded text-[#D4AF37] shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold block mb-1">
                Electronic Dispatches
              </span>
              <a
                href={`mailto:${restaurantInfo.contact.email}`}
                className="text-sm text-white font-medium hover:text-[#D4AF37] transition-colors block"
              >
                {restaurantInfo.contact.email}
              </a>
              <a
                href={`mailto:${restaurantInfo.contact.privateEventsEmail}`}
                className="text-xs text-gray-400 hover:text-white transition-colors block mt-0.5"
              >
                Private Dining: {restaurantInfo.contact.privateEventsEmail}
              </a>
              <span className="text-[11px] text-gray-500 block mt-2">
                Responses within 2 business hours
              </span>
            </div>
          </div>
        </div>

        {/* Main Grid: Form + Map & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Interactive Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#131518] border border-[#23272F] p-6 sm:p-10 rounded-sm">
            <h3 className="font-serif text-2xl text-white font-light mb-2">
              Send an Inquiry
            </h3>
            <p className="text-xs text-gray-400 mb-6">
              Our front-of-house concierge and private dining curators will attend to your request promptly.
            </p>

            {isSent && (
              <div className="mb-6 p-4 bg-[#D4AF37]/15 border border-[#D4AF37]/50 rounded-sm text-xs text-[#F3E5AB] flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <span>Thank you. Your inquiry has been routed to our Head Concierge.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-wider text-gray-400 block mb-1.5 font-medium">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lady Vivienne Sterling"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#1A1D23] border border-[#2A2E35] px-3.5 py-2.5 rounded-sm text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-gray-400 block mb-1.5 font-medium">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="vivienne@sterling.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#1A1D23] border border-[#2A2E35] px-3.5 py-2.5 rounded-sm text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-wider text-gray-400 block mb-1.5 font-medium">
                    Contact Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    placeholder="+44 20 7000 0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#1A1D23] border border-[#2A2E35] px-3.5 py-2.5 rounded-sm text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-gray-400 block mb-1.5 font-medium">
                    Inquiry Nature
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full bg-[#1A1D23] border border-[#2A2E35] px-3.5 py-2.5 rounded-sm text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="Concierge / Table Inquiries">Concierge / Table Inquiries</option>
                    <option value="Private Salon / Exclusive Buyout">Private Salon / Exclusive Buyout</option>
                    <option value="Cellar & Rare Wine Consultation">Cellar & Rare Wine Consultation</option>
                    <option value="Press & Media Relations">Press & Media Relations</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-gray-400 block mb-1.5 font-medium">
                  Message Details *
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Share details regarding dates, guest numbers, special cellar preferences..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#1A1D23] border border-[#2A2E35] px-3.5 py-2.5 rounded-sm text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="pt-2">
                <Button
                  variant="gold"
                  size="lg"
                  type="submit"
                  isLoading={isSubmitting}
                  icon={<Send className="w-4 h-4" />}
                >
                  Transmit Inquiry
                </Button>
              </div>
            </form>
          </div>

          {/* Right Column: Map Mockup, Hours & Socials (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Map Graphic Mockup */}
            <div className="bg-[#131518] border border-[#23272F] rounded-sm p-2">
              <div className="relative w-full aspect-[4/3] rounded-sm overflow-hidden bg-[#0E1013] flex flex-col items-center justify-center p-6 text-center">
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      "radial-gradient(#D4AF37 1px, transparent 1px), radial-gradient(#2A2E35 1px, #0E1013 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />

                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-[#1A1D23] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.4)] mb-3 animate-bounce">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif text-lg text-white font-light">
                    AURELIA Mayfair
                  </h4>
                  <p className="text-xs text-gray-400 mb-3">
                    48 Grosvenor Square, London W1K 2HP
                  </p>
                  <div className="flex items-center gap-2 text-[10px] text-[#F3E5AB] bg-[#1E222A] px-3 py-1 rounded-full border border-white/10">
                    <Car className="w-3 h-3 text-[#D4AF37]" />
                    <span>Complimentary Valet at Main Portico</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Hours Card */}
            <div className="bg-[#131518] border border-[#23272F] p-6 rounded-sm">
              <div className="flex items-center gap-2 text-[#D4AF37] mb-4">
                <Clock className="w-4 h-4" />
                <h4 className="font-serif text-lg text-white font-light">
                  Weekly Service Schedule
                </h4>
              </div>

              <div className="space-y-2.5 text-xs text-gray-300">
                {restaurantInfo.hours.map((item, idx) => (
                  <div key={idx} className="flex justify-between py-1.5 border-b border-[#1E222A] last:border-0">
                    <span className="font-medium text-white">{item.days}</span>
                    <span className="text-gray-400">{item.dinner}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Channels */}
            <div className="bg-[#131518] border border-[#23272F] p-6 rounded-sm">
              <span className="text-xs uppercase tracking-wider text-gray-400 block mb-3 font-medium">
                Follow The Hearth & Cellar
              </span>
              <div className="flex items-center gap-4">
                {restaurantInfo.socials.map((s, idx) => (
                  <a
                    key={idx}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-xs text-gray-300 hover:text-[#D4AF37] p-2 bg-[#1A1D23] border border-[#2A2E35] rounded-sm transition-colors"
                  >
                    <span>{s.platform}</span>
                    <span className="text-[10px] text-gray-500 font-mono">{s.handle}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
