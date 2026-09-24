import React from "react";
import Image from "next/image";
import Link from "next/link";
import { restaurantInfo } from "@/data/restaurantInfo";
import SectionTitle from "@/components/common/SectionTitle";
import Button from "@/components/common/Button";
import { Award, Sparkles, Flame, Compass, Heart, Users, Clock, ArrowRight } from "lucide-react";

export default function AboutPage() {
  const milestones = [
    {
      year: "2012",
      title: "The Genesis in Mayfair",
      description: "Founded by Marcus Vance as an intimate 24-seat atelier devoted to ember cooking and heirloom botanicals.",
    },
    {
      year: "2016",
      title: "First Michelin Recognition",
      description: "Awarded our first Michelin star for innovative seafood craft and open-flame technique.",
    },
    {
      year: "2021",
      title: "The Third Michelin Star",
      description: "Joined the rarest circle of gastronomy with 3 Michelin Stars and the Green Clover for biodynamic practices.",
    },
    {
      year: "2025",
      title: "The Subterranean Cellar & Beyond",
      description: "Unveiled our 1,800-bin subterranean wine vault, housing rare centuries-old single vineyard allocations.",
    },
  ];

  const values = [
    {
      icon: Flame,
      title: "Primitive Fire Mastery",
      description:
        "We reject artificial shortcuts. Every hot dish is touched by sweet holm oak, applewood, or white binchotan coals to impart deep, resonant smoke terroir.",
    },
    {
      icon: Compass,
      title: "Heirloom Provenance",
      description:
        "100% of our produce originates from organic biodynamic smallholders within a 90-mile radius, harvested hours before service.",
    },
    {
      icon: Heart,
      title: "Warm, Unobtrusive Grace",
      description:
        "Luxury without stiff pretension. Our front-of-house team balances royal discretion with heartfelt warmth and effortless conviviality.",
    },
    {
      icon: Sparkles,
      title: "Microscopic Artistry",
      description:
        "Each plate is an architectural composition balancing acidity, texture, temperature, and visual poetry.",
    },
  ];

  const team = [
    {
      name: restaurantInfo.chef.name,
      role: restaurantInfo.chef.role,
      bio: restaurantInfo.chef.bio,
      image: restaurantInfo.chef.image,
    },
    {
      name: restaurantInfo.sommelier.name,
      role: restaurantInfo.sommelier.role,
      bio: restaurantInfo.sommelier.bio,
      image: restaurantInfo.sommelier.image,
    },
    {
      name: "Antoine Laurent",
      role: "Head Pastry Sculptor",
      bio: "Former pastry maestro at Le Meurice, Antoine reconstructs classical French patisserie through temperature contrast and botanical infusions.",
      image: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <div className="pt-28 pb-24 min-h-screen bg-[#0B0C0E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Hero */}
        <SectionTitle
          eyebrow="Our Heritage & Philosophy"
          title="The Story of AURELIA"
          subtitle="A sanctuary where archaic hearth embers meet modern architectural fine dining in the heart of Mayfair."
          align="center"
        />

        {/* Hero Banner Image */}
        <div className="relative w-full aspect-[21/9] rounded-sm overflow-hidden border border-[#23272F] mb-20 shadow-2xl">
          <Image
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=85"
            alt="The Aurelia Dining Room"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-[#0B0C0E]/30 to-transparent" />
          <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 max-w-md">
            <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold block mb-1">
              Mayfair, London
            </span>
            <p className="font-serif text-2xl sm:text-3xl text-white font-light">
              Crafting sensory memories since 2012
            </p>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
          {restaurantInfo.stats.map((stat, i) => (
            <div
              key={i}
              className="bg-[#131518] border border-[#23272F] p-6 sm:p-8 rounded-sm text-center hover:border-[#D4AF37]/40 transition-colors"
            >
              <div className="font-serif text-4xl sm:text-5xl text-[#F3E5AB] font-light mb-2">
                {stat.value}
              </div>
              <div className="text-xs uppercase tracking-widest text-gray-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Narrative & Philosophy Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24">
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block">
              The Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-light leading-snug">
              Gastronomy as a Living Reverence for Nature
            </h2>
            <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed">
              At AURELIA, we believe that true luxury lies not in gratuitous ostentation, but in profound respect for raw ingredients. Our kitchen runs on ancestral hearths, where temperature is controlled by breath, timber, and the intuition of master cooks.
            </p>
            <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed">
              From our line-caught Cornish turbot delivered within six hours of coastal landing to micro-greens cultivated specifically for our sauces on our regenerative Kent farm, every morsel is rooted in transparent provenance.
            </p>
            <div className="pt-2">
              <Link href="/reservation">
                <Button variant="gold" size="md" icon={<Sparkles className="w-3.5 h-3.5" />}>
                  Experience The Tasting Menu
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-[#2A2E35]">
            <Image
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80"
              alt="Hearth Fire Plating"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* The 4 Values */}
        <div className="mb-24">
          <SectionTitle
            eyebrow="The Four Pillars"
            title="Our Core Tenets"
            subtitle="The enduring standards that guide our cuisine, wine program, and guest stewardship."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#131518] border border-[#23272F] p-6 sm:p-8 rounded-sm hover:border-[#D4AF37]/50 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-sm bg-[#1A1D23] border border-[#2A2E35] flex items-center justify-center text-[#D4AF37] mb-5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-xl text-white font-light mb-3">
                      {val.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Culinary Leadership Profiles */}
        <div className="mb-24">
          <SectionTitle
            eyebrow="Leadership Brigade"
            title="Masters of the Craft"
            subtitle="Meet the visionaries behind the culinary direction, cellar curation, and patisserie."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <div
                key={idx}
                className="bg-[#131518] border border-[#23272F] rounded-sm overflow-hidden flex flex-col group hover:border-[#D4AF37]/40 transition-all"
              >
                <div className="relative w-full aspect-[4/5] bg-[#1A1D23] overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#131518] via-transparent to-transparent" />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold block mb-1">
                      {member.role}
                    </span>
                    <h3 className="font-serif text-2xl text-white font-light mb-3">
                      {member.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Milestone Timeline */}
        <div className="max-w-4xl mx-auto">
          <SectionTitle
            eyebrow="Milestones"
            title="A Decade of Evolution"
            align="center"
          />

          <div className="space-y-8 relative before:absolute before:inset-0 before:left-1/2 before:-translate-x-1/2 before:w-[1px] before:bg-[#23272F] hidden sm:block">
            {milestones.map((m, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className={`relative flex items-center justify-between ${
                    isEven ? "flex-row-reverse" : ""
                  }`}
                >
                  <div className="w-5/12 bg-[#131518] border border-[#23272F] p-6 rounded-sm hover:border-[#D4AF37]/40 transition-colors">
                    <span className="font-serif text-2xl text-[#D4AF37] font-semibold block mb-1">
                      {m.year}
                    </span>
                    <h4 className="font-serif text-lg text-white font-light mb-2">
                      {m.title}
                    </h4>
                    <p className="text-xs text-gray-400 leading-relaxed font-light">
                      {m.description}
                    </p>
                  </div>

                  <div className="w-4 h-4 rounded-full bg-[#0B0C0E] border-2 border-[#D4AF37] z-10 shadow-[0_0_10px_rgba(212,175,55,0.6)]" />

                  <div className="w-5/12" />
                </div>
              );
            })}
          </div>

          {/* Mobile simple view for milestones */}
          <div className="space-y-4 sm:hidden">
            {milestones.map((m, idx) => (
              <div key={idx} className="bg-[#131518] border border-[#23272F] p-5 rounded-sm">
                <span className="font-serif text-xl text-[#D4AF37] font-bold block mb-1">
                  {m.year}
                </span>
                <h4 className="font-serif text-base text-white font-light mb-1">
                  {m.title}
                </h4>
                <p className="text-xs text-gray-400 font-light">
                  {m.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
