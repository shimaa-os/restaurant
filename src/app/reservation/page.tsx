"use client";

import React, { useState } from "react";
import Link from "next/link";
import SectionTitle from "@/components/common/SectionTitle";
import Button from "@/components/common/Button";
import {
  Calendar as CalendarIcon,
  Clock,
  Users,
  Utensils,
  CheckCircle2,
  Sparkles,
  Heart,
  Briefcase,
  Cake,
  Wine,
  Download,
  Share2,
} from "lucide-react";

import { createReservation } from "@/lib/db";

export default function ReservationPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    date: "2026-10-15",
    time: "19:30",
    guests: 2,
    occasion: "Anniversary",
    seatingPreference: "main",
    specialRequests: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState("");

  const timeSlots = [
    { time: "12:00", label: "12:00 PM (Lunch)" },
    { time: "12:45", label: "12:45 PM (Lunch)" },
    { time: "13:30", label: "1:30 PM (Lunch)" },
    { time: "17:30", label: "5:30 PM (Early Dinner)" },
    { time: "18:15", label: "6:15 PM (Dinner)" },
    { time: "19:00", label: "7:00 PM (Prime Dinner)" },
    { time: "19:45", label: "7:45 PM (Prime Dinner)" },
    { time: "20:30", label: "8:30 PM (Late Dinner)" },
    { time: "21:15", label: "9:15 PM (Late Dinner)" },
  ];

  const seatingOptions = [
    {
      id: "main",
      title: "Main Dining Salon",
      desc: "Warm acoustic lighting, Belgian linen, and hearth views.",
      icon: Utensils,
    },
    {
      id: "counter",
      title: "Chef's Granite Stage",
      desc: "Front-row interactive seating with Marcus Vance and brigade.",
      icon: Sparkles,
    },
    {
      id: "terrace",
      title: "Enclosed Glass Terrace",
      desc: "Overlooking Grosvenor gardens with heated ambient lounge.",
      icon: Heart,
    },
    {
      id: "cellar",
      title: "Private Wine Vault",
      desc: "Surrounded by 1,800 rare vintages. Dedicated sommelier service.",
      icon: Wine,
    },
  ];

  const occasions = ["Romantic Dinner", "Anniversary", "Birthday", "Business Dinner", "Casual Gathering"];

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = "Please enter your full name.";
    if (!formData.phone.trim()) errs.phone = "Contact phone number is required.";
    if (!formData.email.trim() || !formData.email.includes("@"))
      errs.email = "Please provide a valid email address.";
    if (!formData.date) errs.date = "Please select a dining date.";
    if (!formData.time) errs.time = "Please pick a service time.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const result = await createReservation(formData);
    setIsSubmitting(false);
    setBookingRef(result.bookingRef);
    setIsSubmitted(true);
  };

  return (
    <div className="pt-28 pb-24 min-h-screen bg-[#0B0C0E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Table Sanctuary"
          title="Reserve Your Experience"
          subtitle="Join us for an evening of modern gastronomy, hearth smoke, and rare cellar pairings in Mayfair."
          align="center"
        />

        {isSubmitted ? (
          /* Confirmation Ticket Card */
          <div className="max-w-2xl mx-auto bg-[#131518] border border-[#D4AF37]/50 rounded-sm p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] mx-auto mb-6 shadow-[0_0_25px_rgba(212,175,55,0.4)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block mb-1">
              Table Confirmed
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-light mb-2">
              We Await Your Arrival
            </h2>
            <p className="text-sm text-gray-300 font-light mb-8">
              A formal confirmation notice has been dispatched to{" "}
              <span className="text-[#F3E5AB] font-medium">{formData.email}</span>.
            </p>

            {/* Ticket Details Box */}
            <div className="bg-[#181B21] border border-[#2A2E35] rounded-sm p-6 text-left space-y-4 mb-8">
              <div className="flex items-center justify-between pb-3 border-b border-[#23272F]">
                <span className="text-xs text-gray-400 uppercase tracking-wider">Reference</span>
                <span className="font-mono text-sm text-[#D4AF37] font-bold">{bookingRef}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm">
                <div>
                  <span className="text-gray-400 block text-[11px] uppercase">Guest Name</span>
                  <span className="text-white font-medium">{formData.fullName}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[11px] uppercase">Party Size</span>
                  <span className="text-white font-medium">{formData.guests} Guests</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[11px] uppercase">Date & Time</span>
                  <span className="text-white font-medium">{formData.date} at {formData.time}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[11px] uppercase">Salon Preference</span>
                  <span className="text-white font-medium capitalize">
                    {seatingOptions.find((s) => s.id === formData.seatingPreference)?.title}
                  </span>
                </div>
              </div>

              {formData.specialRequests && (
                <div className="pt-3 border-t border-[#23272F] text-xs">
                  <span className="text-gray-400 block text-[11px] uppercase mb-1">Special Notes</span>
                  <p className="text-gray-200 italic">{formData.specialRequests}</p>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="outline"
                size="md"
                onClick={() => setIsSubmitted(false)}
              >
                Modify Reservation
              </Button>
              <Link href="/admin/reservations">
                <Button variant="gold" size="md">
                  View in Admin Portal
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          /* Reservation Form */
          <div className="max-w-4xl mx-auto bg-[#131518] border border-[#23272F] rounded-sm p-6 sm:p-10 lg:p-12">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Step 1: Party Size & Date & Time */}
              <div>
                <h3 className="font-serif text-xl sm:text-2xl text-white font-light mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#D4AF37]" />
                  <span>1. Party Size & Schedule</span>
                </h3>

                {/* Guest Count Buttons */}
                <div className="mb-6">
                  <label className="text-xs uppercase tracking-wider text-gray-400 block mb-2 font-medium">
                    Number of Guests
                  </label>
                  <div className="grid grid-cols-6 sm:grid-cols-8 gap-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setFormData({ ...formData, guests: num })}
                        className={`py-2 text-xs font-semibold rounded border transition-all cursor-pointer ${
                          formData.guests === num
                            ? "bg-[#D4AF37] text-[#0B0C0E] border-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.3)]"
                            : "bg-[#1A1D23] text-gray-300 border-[#2A2E35] hover:border-gray-500"
                        }`}
                      >
                        {num} {num === 1 ? "Guest" : "Guests"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date & Time Picker */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="text-xs uppercase tracking-wider text-gray-400 block mb-2 font-medium">
                      Dining Date
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-[#1A1D23] border border-[#2A2E35] px-3.5 py-2.5 rounded-sm text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                    {errors.date && (
                      <p className="text-xs text-red-400 mt-1">{errors.date}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-wider text-gray-400 block mb-2 font-medium">
                      Special Occasion
                    </label>
                    <select
                      value={formData.occasion}
                      onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                      className="w-full bg-[#1A1D23] border border-[#2A2E35] px-3.5 py-2.5 rounded-sm text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    >
                      {occasions.map((occ) => (
                        <option key={occ} value={occ}>
                          {occ}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Time Slots */}
                <div>
                  <label className="text-xs uppercase tracking-wider text-gray-400 block mb-2 font-medium">
                    Available Service Times
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                    {timeSlots.map((slot) => {
                      const isSelected = formData.time === slot.time;
                      return (
                        <button
                          key={slot.time}
                          type="button"
                          onClick={() => setFormData({ ...formData, time: slot.time })}
                          className={`py-2 px-2 text-xs rounded border transition-all text-center cursor-pointer ${
                            isSelected
                              ? "bg-[#D4AF37] text-[#0B0C0E] border-[#D4AF37] font-semibold shadow-[0_0_10px_rgba(212,175,55,0.3)]"
                              : "bg-[#1A1D23] text-gray-300 border-[#2A2E35] hover:border-gray-500"
                          }`}
                        >
                          {slot.time}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Step 2: Seating Experience */}
              <div className="pt-6 border-t border-[#1F232B]">
                <h3 className="font-serif text-xl sm:text-2xl text-white font-light mb-4 flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-[#D4AF37]" />
                  <span>2. Seating Atmosphere</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {seatingOptions.map((opt) => {
                    const isSelected = formData.seatingPreference === opt.id;
                    const IconComponent = opt.icon;
                    return (
                      <div
                        key={opt.id}
                        onClick={() => setFormData({ ...formData, seatingPreference: opt.id as any })}
                        className={`p-4 rounded-sm border cursor-pointer transition-all ${
                          isSelected
                            ? "bg-[#D4AF37]/10 border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.15)]"
                            : "bg-[#1A1D23] border-[#2A2E35] hover:border-gray-600"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-serif text-base text-white font-medium flex items-center gap-2">
                            <IconComponent className="w-4 h-4 text-[#D4AF37]" />
                            {opt.title}
                          </span>
                          {isSelected && (
                            <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
                          )}
                        </div>
                        <p className="text-xs text-gray-400 font-light leading-relaxed">
                          {opt.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Guest Coordinates */}
              <div className="pt-6 border-t border-[#1F232B]">
                <h3 className="font-serif text-xl sm:text-2xl text-white font-light mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                  <span>3. Guest Contact & Special Requests</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                  <div>
                    <label className="text-xs uppercase tracking-wider text-gray-400 block mb-1.5 font-medium">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Lord Percival Sterling"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-[#1A1D23] border border-[#2A2E35] px-3.5 py-2.5 rounded-sm text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                    {errors.fullName && (
                      <p className="text-xs text-red-400 mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-wider text-gray-400 block mb-1.5 font-medium">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="+44 7700 900142"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#1A1D23] border border-[#2A2E35] px-3.5 py-2.5 rounded-sm text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-400 mt-1">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-wider text-gray-400 block mb-1.5 font-medium">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="percival@sterling.co.uk"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#1A1D23] border border-[#2A2E35] px-3.5 py-2.5 rounded-sm text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                    {errors.email && (
                      <p className="text-xs text-red-400 mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-gray-400 block mb-1.5 font-medium">
                    Dietary Requirements & Special Requests
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Allergies, high chair, window preference, or anniversary champagne on arrival..."
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    className="w-full bg-[#1A1D23] border border-[#2A2E35] px-3.5 py-2.5 rounded-sm text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-6 border-t border-[#1F232B] flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-gray-400">
                  By clicking Confirm, you accept our 24h courtesy cancellation policy.
                </span>
                <Button
                  variant="gold"
                  size="lg"
                  isLoading={isSubmitting}
                  type="submit"
                  className="w-full sm:w-auto"
                >
                  Confirm Table Reservation
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
