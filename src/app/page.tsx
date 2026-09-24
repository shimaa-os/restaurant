import React from "react";
import HeroSection from "@/components/home/HeroSection";
import FeaturedDishes from "@/components/home/FeaturedDishes";
import StoryPreview from "@/components/home/StoryPreview";
import ChefSection from "@/components/home/ChefSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import GallerySection from "@/components/home/GallerySection";
import LocationHoursSection from "@/components/home/LocationHoursSection";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Featured Dishes / Specialties */}
      <FeaturedDishes />

      {/* 3. About the Restaurant Story */}
      <StoryPreview />

      {/* 4. Executive Chef & Master Sommelier */}
      <ChefSection />

      {/* 5. Food & Ambiance Gallery */}
      <GallerySection />

      {/* 6. Customer & Critic Testimonials */}
      <TestimonialsSection />

      {/* 7. Opening Hours, Location & Map */}
      <LocationHoursSection />
    </div>
  );
}
