import React from "react";
import Image from "next/image";
import { galleryImages } from "@/data/testimonialsData";
import SectionTitle from "@/components/common/SectionTitle";

export default function GallerySection() {
  return (
    <section className="py-24 bg-[#0B0C0E] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Visual Odyssey"
          title="The Aurelia Atmosphere"
          subtitle="Glimpses into our culinary theater, ambient dining salons, and cellar sanctuary."
          align="center"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((img, idx) => (
            <div
              key={idx}
              className="group relative aspect-[4/3] rounded-sm overflow-hidden bg-[#1A1D23] border border-[#23272F]"
            >
              <Image
                src={img.image}
                alt={img.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold block mb-1">
                  {img.category}
                </span>
                <h4 className="font-serif text-lg text-white font-light mb-1">
                  {img.title}
                </h4>
                <p className="text-xs text-gray-300 font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-1">
                  {img.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
