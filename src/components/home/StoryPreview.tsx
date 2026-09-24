import React from "react";
import Image from "next/image";
import Link from "next/link";
import SectionTitle from "@/components/common/SectionTitle";
import Button from "@/components/common/Button";
import { ArrowRight, Compass, Flame, Sparkles } from "lucide-react";

export default function StoryPreview() {
  return (
    <section className="py-24 bg-[#0E1013] relative overflow-hidden border-y border-[#1F232B]">
      {/* Background ambient gold glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Rich Editorial Imagery */}
          <div className="relative">
            <div className="relative w-full aspect-[4/5] rounded-sm overflow-hidden border border-[#2A2E35]">
              <Image
                src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80"
                alt="Aurelia Open Kitchen"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E]/80 via-transparent to-transparent" />
            </div>

            {/* Overlapping Floating Inset Card */}
            <div className="absolute -bottom-6 -right-6 sm:bottom-8 sm:-right-8 bg-[#131518]/95 backdrop-blur-md border border-[#D4AF37]/40 p-6 rounded-sm shadow-2xl max-w-xs hidden sm:block">
              <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold block mb-1">
                Zero Compromise
              </span>
              <p className="font-serif text-lg text-white font-light">
                “Every plate tells the ancient truth of its soil and season.”
              </p>
            </div>
          </div>

          {/* Right Column: Editorial Narrative */}
          <div className="flex flex-col space-y-6">
            <SectionTitle
              eyebrow="Our Heritage & Vision"
              title="Where Ancient Fire Meets Architectural Gastronomy"
              align="left"
              className="mb-6"
            />

            <p className="text-gray-300 font-light text-sm sm:text-base leading-relaxed">
              Founded on the belief that dining should be a transformative ceremony, AURELIA bridges the primitive energy of charcoal hearths with modern culinary alchemy. We work directly with generational farmers, free-dive scallopers, and biodynamic vintners who share our reverence for the land.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#131518] border border-[#23272F] rounded text-[#D4AF37] shrink-0">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-base text-[#FBFBFD] mb-1">Hearth Embers</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Searing over sweet holm oak and Japanese binchotan at precise temperatures.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#131518] border border-[#23272F] rounded text-[#D4AF37] shrink-0">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-base text-[#FBFBFD] mb-1">Micro-Seasonal</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Menus evolve daily according to dawn harvests and marine tides.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <Link href="/about">
                <Button
                  variant="gold"
                  size="md"
                  icon={<ArrowRight className="w-4 h-4" />}
                  iconPosition="right"
                >
                  Read Our Full Story
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
