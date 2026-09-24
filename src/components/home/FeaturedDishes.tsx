import React from "react";
import Link from "next/link";
import { foodItems } from "@/data/menuData";
import SectionTitle from "@/components/common/SectionTitle";
import FoodCard from "@/components/food/FoodCard";
import Button from "@/components/common/Button";
import { ArrowRight } from "lucide-react";

export default function FeaturedDishes() {
  // Select top 4 signature chef specials
  const featured = foodItems.filter((i) => i.isChefSpecial).slice(0, 4);

  return (
    <section className="py-24 bg-[#0B0C0E] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Culinary Signatures"
          title="Masterpieces of the Hearth"
          subtitle="A preview of our most celebrated dishes, balancing rustic smoke with razor-sharp modern refinement."
          align="center"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link href="/menu">
            <Button
              variant="outline"
              size="lg"
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
            >
              Discover The Complete 7-Course Menu
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
