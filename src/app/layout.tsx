import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Toast from "@/components/common/Toast";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AURELIA | Modern Culinary Atelier & Fine Dining",
  description: "Experience modern gastronomy, seasonal fire-crafted dishes, and master sommelier pairings at AURELIA.",
  keywords: ["fine dining", "modern restaurant", "Michelin star", "artisan cuisine", "Aurelia restaurant"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable} scroll-smooth dark`}>
      <body className="min-h-screen bg-[#0B0C0E] text-[#E8E9ED] font-sans antialiased selection:bg-[#D4AF37]/30 selection:text-[#FFF] flex flex-col">
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toast />
        </CartProvider>
      </body>
    </html>
  );
}
