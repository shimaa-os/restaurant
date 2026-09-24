import React from "react";
import Image from "next/image";
import { testimonials } from "@/data/testimonialsData";
import SectionTitle from "@/components/common/SectionTitle";
import { Star, Quote } from "lucide-react";

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-[#0E1013] border-t border-[#1F232B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Critical Acclaim"
          title="Echoes of the Dining Salon"
          subtitle="Reflections from international culinary inspectors, sommeliers, and patrons of discerning taste."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-[#131518] border border-[#23272F] p-8 rounded-sm relative flex flex-col justify-between hover:border-[#D4AF37]/40 transition-all duration-300 group"
            >
              <Quote className="w-8 h-8 text-[#D4AF37]/20 absolute top-6 right-6 group-hover:text-[#D4AF37]/40 transition-colors" />

              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]"
                    />
                  ))}
                </div>

                {/* Comment */}
                <p className="font-serif italic text-base sm:text-lg text-gray-200 font-light leading-relaxed mb-6">
                  “{t.comment}”
                </p>
              </div>

              {/* Author Row */}
              <div className="flex items-center gap-4 pt-6 border-t border-[#1F232B]">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#D4AF37]/30 shrink-0">
                  <Image
                    src={t.avatar}
                    alt={t.author}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-sans font-medium text-sm text-white">
                    {t.author}
                  </h4>
                  <p className="text-xs text-gray-400">
                    {t.role} {t.outlet && <span className="text-[#D4AF37]">• {t.outlet}</span>}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
