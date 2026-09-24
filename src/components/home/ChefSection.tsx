import React from "react";
import Image from "next/image";
import { restaurantInfo } from "@/data/restaurantInfo";
import SectionTitle from "@/components/common/SectionTitle";
import { Award, Quote } from "lucide-react";

export default function ChefSection() {
  const { chef, sommelier } = restaurantInfo;

  return (
    <section className="py-24 bg-[#0B0C0E] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="The Maestros"
          title="Guided by Obsession & Mastery"
          subtitle="Behind every nuance in flavor lies decades of rigorous classical discipline and avant-garde curiosity."
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Executive Chef Spotlight (Takes 7 cols) */}
          <div className="lg:col-span-7 bg-[#131518] border border-[#23272F] rounded-sm p-6 sm:p-8 relative overflow-hidden flex flex-col md:flex-row gap-8 items-center">
            {/* Chef Portrait */}
            <div className="relative w-48 h-64 md:w-56 md:h-72 shrink-0 rounded-sm overflow-hidden border border-[#2A2E35]">
              <Image
                src={chef.image}
                alt={chef.name}
                fill
                sizes="(max-width: 768px) 192px, 224px"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#131518] via-transparent to-transparent opacity-60" />
            </div>

            {/* Chef Information */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                  {chef.role}
                </span>
                <h3 className="font-serif text-3xl text-white font-light mt-1 mb-3">
                  {chef.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed mb-4">
                  {chef.bio}
                </p>
                <div className="relative pl-6 border-l-2 border-[#D4AF37] italic font-serif text-sm sm:text-base text-[#F3E5AB] my-4">
                  <Quote className="w-4 h-4 text-[#D4AF37]/50 absolute -left-2 -top-1" />
                  “{chef.quote}”
                </div>
              </div>

              {/* Accolades */}
              <div className="mt-4 pt-4 border-t border-[#1F232B] space-y-1.5">
                {chef.awards.map((award, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-gray-400">
                    <Award className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                    <span>{award}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Master Sommelier Spotlight (Takes 5 cols) */}
          <div className="lg:col-span-5 bg-[#131518] border border-[#23272F] rounded-sm p-6 sm:p-8 flex flex-col justify-between h-full">
            <div>
              <div className="relative w-full aspect-[16/10] rounded-sm overflow-hidden border border-[#2A2E35] mb-6">
                <Image
                  src={sommelier.image}
                  alt={sommelier.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#131518] via-transparent to-transparent opacity-70" />
              </div>

              <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                {sommelier.role}
              </span>
              <h3 className="font-serif text-2xl text-white font-light mt-1 mb-2">
                {sommelier.name}
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed mb-6">
                {sommelier.bio}
              </p>
            </div>

            <div className="p-4 bg-[#181B21] border border-[#23272F] rounded-sm text-xs text-[#F3E5AB]">
              <span className="text-white font-medium block mb-1">Subterranean Cellar Program</span>
              Over 1,800 low-intervention, biodynamic producers curated directly from Burgundy, Piedmont, Wachau, and California.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
