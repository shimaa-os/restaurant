"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Calendar, ChevronDown, Award } from "lucide-react";
import Button from "@/components/common/Button";

export default function HeroSection() {
  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Hero Image with Dark Gradient Overlays */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=2000&q=90"
          alt="Aurelia Gourmet Gastronomy"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 animate-pulse duration-[10000ms]"
        />
        {/* Multilayered cinematic dark vignettes */}
        <div className="absolute inset-0 bg-[#0B0C0E]/75 backdrop-brightness-[0.4]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-transparent to-[#0B0C0E]/80" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#0B0C0E]/40 to-[#0B0C0E]" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
        {/* Michelin Guide & Award Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#131518]/80 border border-[#D4AF37]/40 backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(212,175,55,0.15)]">
          <Award className="w-4 h-4 text-[#D4AF37]" />
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#F3E5AB] font-medium">
            Michelin Guide 3 Stars • Mayfair London
          </span>
        </div>

        {/* Brand Title */}
        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-[#FBFBFD] tracking-wider leading-none mb-6 drop-shadow-2xl">
          AURELIA
        </h1>

        {/* Tagline */}
        <p className="font-serif italic text-xl sm:text-2xl md:text-3xl text-[#E5C378] font-normal tracking-wide max-w-2xl mb-6">
          A Symphony of Fire, Craft & Season
        </p>

        {/* Narrative Description */}
        <p className="font-sans text-sm sm:text-base text-gray-300 font-light max-w-xl mx-auto leading-relaxed mb-10 text-balance">
          Contemporary fine dining elevated by primitive open hearth embers, biodynamic cellar reserves, and rare seasonal ingredients harvested at peak expression.
        </p>

        {/* Primary Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link href="/menu" className="w-full sm:w-auto">
            <Button
              variant="gold"
              size="lg"
              className="w-full sm:w-auto"
              icon={<Sparkles className="w-4 h-4" />}
            >
              Explore The Menu
            </Button>
          </Link>
          <Link href="/reservation" className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
              icon={<Calendar className="w-4 h-4" />}
            >
              Reserve A Table
            </Button>
          </Link>
        </div>

        {/* Bottom Feature Badges */}
        <div className="grid grid-cols-3 gap-6 sm:gap-12 mt-16 pt-8 border-t border-white/10 max-w-3xl w-full text-center">
          <div>
            <div className="font-serif text-xl sm:text-2xl text-[#F3E5AB]">Open Fire</div>
            <div className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest mt-1">
              Holm Oak Embers
            </div>
          </div>
          <div>
            <div className="font-serif text-xl sm:text-2xl text-[#F3E5AB]">1,800+ Vintages</div>
            <div className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest mt-1">
              Biodynamic Cellar
            </div>
          </div>
          <div>
            <div className="font-serif text-xl sm:text-2xl text-[#F3E5AB]">Daily Catch</div>
            <div className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest mt-1">
              Wild British Waters
            </div>
          </div>
        </div>
      </div>

      {/* Down Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-1 text-gray-400 opacity-70 hover:opacity-100 transition-opacity">
        <span className="text-[9px] uppercase tracking-[0.25em]">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-[#D4AF37]" />
      </div>
    </section>
  );
}
