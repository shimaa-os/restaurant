# 🍷 AURELIA — Contemporary Gastronomy & Wine Bar

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://restaurant-frontend-iota-three.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ecf8e?style=for-the-badge&logo=supabase)](https://supabase.com/)

> **Live Website:** [https://restaurant-frontend-iota-three.vercel.app](https://restaurant-frontend-iota-three.vercel.app)  
> *A luxury, Michelin 3-star culinary atelier website inspired by open-hearth firecraft and biodynamic wine curation in Mayfair, London.*

---

## 🌟 Live Demo & Deployment

| Resource | Link |
|---|---|
| **🌐 Production Website** | [https://restaurant-frontend-iota-three.vercel.app](https://restaurant-frontend-iota-three.vercel.app) |
| **📦 GitHub Repository** | [https://github.com/shimaa-os/restaurant](https://github.com/shimaa-os/restaurant) |
| **⚡ Database Backend** | [Supabase PostgreSQL (Live Connected)](https://supabase.com) |
| **🚀 Hosting & CDN** | [Vercel Edge Network](https://vercel.com) |

---

## ✨ Features Overview

### 🍽️ 1. Guest Experience (Public Frontend)
- **Home (`/`)**: 
  - Sticky glassmorphic navigation header with cart counter.
  - Cinematic hero section with Michelin Guide 3-Stars accreditation and dual CTAs.
  - Featured signatures showcase (*Dry-Aged Côte de Boeuf, Hokkaido Scallop Crudo, Tagliolini al Tartufo, Valrhona Sphere*).
  - Editorial restaurant philosophy & hearth story.
  - Executive Chef Marcus Vance & Master Sommelier Elena Rostova profiles.
  - Curated atmosphere gallery (salons, wine vault, plating, mixology).
  - Critic reviews & verified accolades.
  - Opening hours, Mayfair location card, and dark interactive map.
  - Luxury footer with newsletter subscription.

- **Menu (`/menu`)**:
  - 7 Distinct Courses: **Starters, Main Courses, Pizza, Pasta, Burgers, Desserts, Drinks**.
  - Real-time search by dish title, tasting note, or ingredients.
  - Dietary filter pills: *Chef Signatures, Vegetarian, Gluten-Free*.
  - Sorting: *Recommended, Price: Low to High, Price: High to Low, Highest Rated*.
  - Quick Add to Cart with live toast feedback.

- **Food Details (`/menu/[id]`)**:
  - High-resolution hero food photography.
  - Comprehensive tasting profile, calories, preparation time, and allergen disclosures.
  - Sommelier wine pairing recommendation.
  - Interactive customizations (meat doneness, gourmet side selections, custom kitchen notes).
  - Dynamic price recalculation based on add-ons.
  - Related course recommendations.

- **Tasting Cart & Checkout (`/cart`)**:
  - Reactive cart management (quantity controls, removal, option summaries).
  - Service mode switcher: **Dine-In (Table Service)** vs. **White-Glove Delivery**.
  - Gratuity tip selector (10%, 15%, 20%, Custom).
  - VIP promo code validation (e.g. `AURELIA10` gives 10% privilege discount).
  - Transparent pricing breakdown: subtotal, service fee, VAT, tip, and total.
  - Checkout modal transmitting orders directly to Supabase with an animated confirmation screen.

- **Table Reservation (`/reservation`)**:
  - 3-step luxury booking system.
  - Party size selector (1 to 8+ guests).
  - Date picker & live service time slots (Lunch & Dinner).
  - Salon ambiance picker: *Main Dining Salon, Chef's Granite Stage, Glass Terrace, Private Wine Vault*.
  - Guest contact form with validation.
  - Generates instant booking confirmation ticket card (`AUR-RES-XXXX`) and persists to Supabase.

- **About Us (`/about`)**:
  - The 14-year founding journey and regenerative farm philosophy.
  - Four Core Pillars: *Primitive Fire Mastery, Heirloom Provenance, Warm Hospitality, Microscopic Artistry*.
  - Executive leadership bios.
  - Interactive milestone timeline (2012–2025).

- **Contact & Concierge (`/contact`)**:
  - Concierge, private dining, and press contact details.
  - Department inquiry form with immediate status response.
  - Service schedule and Mayfair location coordinates.

---

### 🔒 2. Management Console (`/admin`)
> *Hidden from public navigation and protected by a luxury PIN gate.*

- **Security Gate**: Requires the Master Passcode (**`8924`**) to unlock.
- **Console Overview (`/admin`)**: Revenue KPIs, table occupancy rates (94%), active orders, weekly revenue visual bar chart, and recent orders stream.
- **Service Orders (`/admin/orders`)**: Real-time pipeline with status filters (*Pending, Preparing, Ready, Delivered, Completed*), order items modal, and status advancement controls.
- **Menu Engineering (`/admin/menu`)**: Live dishes catalog, stock toggles, price editor, and "Add New Dish" creation modal.
- **Salon Reservations (`/admin/reservations`)**: Guest schedules, party sizes, table allocations, status actions (*Seat Table, Complete*), and direct booking modal.
- **VIP Guest Directory (`/admin/customers`)**: Lifetime expenditure, visit counters, loyalty tiers (*Diamond, Platinum, Gold*), and customer dossiers.
- **Patron Reviews (`/admin/reviews`)**: Salon ratings distribution and "Respond as GM" modal.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict mode, fully typed)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with custom luxury color tokens
- **Typography**: Google Fonts via `next/font`:
  - Serif Display: `Cormorant Garamond`
  - Sans Body: `Plus Jakarta Sans`
- **Icons**: [Lucide React](https://lucide.dev/)
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL with RLS)
- **Deployment**: [Vercel](https://vercel.com/) with global edge delivery

---

## 🚀 Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/shimaa-os/restaurant.git
   cd restaurant
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://azatiizniephvuawjqrm.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for production:**
   ```bash
   npm run build
   ```

---

## 📄 License

Crafted for **AURELIA Atelier Culinaire**. All rights reserved.
