"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import SectionTitle from "@/components/common/SectionTitle";
import EmptyState from "@/components/common/EmptyState";
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import QuantitySelector from "@/components/food/QuantitySelector";
import {
  Trash2,
  ArrowRight,
  ShoppingBag,
  Sparkles,
  CheckCircle2,
  Clock,
  MapPin,
  Utensils,
  CreditCard,
  Tag,
} from "lucide-react";
import { createOrder } from "@/lib/db";

export default function CartPage() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal,
    deliveryFee,
    tax,
    total,
  } = useCart();

  // Order options
  const [orderType, setOrderType] = useState<"dine_in" | "delivery">("dine_in");
  const [tipPercentage, setTipPercentage] = useState<number>(15);
  const [promoCode, setPromoCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [promoError, setPromoError] = useState("");

  // Checkout modal states
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [tableNumber, setTableNumber] = useState("Table 12 (Salon)");
  const [guestName, setGuestName] = useState("Julian Mercier");
  const [guestPhone, setGuestPhone] = useState("+44 7700 900142");
  const [deliveryAddress, setDeliveryAddress] = useState("14 Berkeley Square, London");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "AURELIA10" || promoCode.trim().toUpperCase() === "VIP") {
      setAppliedDiscount(subtotal * 0.1);
      setPromoError("");
    } else {
      setPromoError("Invalid code. Try 'AURELIA10'");
    }
  };

  const calculatedTip = Math.round((subtotal * (tipPercentage / 100)) * 100) / 100;
  const effectiveDelivery = orderType === "delivery" ? deliveryFee : 0;
  const finalTotal = Math.max(0, subtotal - appliedDiscount + effectiveDelivery + tax + calculatedTip);

  const [placedOrderNumber, setPlacedOrderNumber] = useState("AUR-9042");

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);
    const orderItems = items.map((i) => ({
      dishName: i.item.name,
      quantity: i.quantity,
      price: i.item.price,
    }));

    const result = await createOrder({
      customerName: guestName,
      customerPhone: guestPhone,
      items: orderItems,
      totalAmount: finalTotal,
      orderType: orderType,
      tableNumber: orderType === "dine_in" ? tableNumber : undefined,
      deliveryAddress: orderType === "delivery" ? deliveryAddress : undefined,
    });

    setIsSubmitting(false);
    setPlacedOrderNumber(result.orderNumber);
    setIsOrderPlaced(true);
    clearCart();
  };

  return (
    <div className="pt-28 pb-24 min-h-screen bg-[#0B0C0E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Your Gastronomic Selection"
          title="Culinary Tasting Cart"
          subtitle="Review and refine your chosen courses before transmission to the hearth brigade."
          align="center"
        />

        {items.length === 0 && !isOrderPlaced ? (
          <EmptyState
            icon={<ShoppingBag className="w-8 h-8" />}
            title="Your Order is Currently Empty"
            description="You have not yet selected any dishes or cellar pairings. Explore our seasonal offerings to begin your journey."
            actionText="Discover The Menu"
            actionHref="/menu"
          />
        ) : isOrderPlaced ? (
          <div className="max-w-xl mx-auto bg-[#131518] border border-[#D4AF37]/50 p-8 sm:p-10 rounded-sm text-center">
            <div className="w-16 h-16 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] mx-auto mb-6 shadow-[0_0_25px_rgba(212,175,55,0.4)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block mb-2">
              Transmission Confirmed
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-light mb-4">
              Bon Appétit!
            </h2>
            <p className="text-sm text-gray-300 font-light leading-relaxed mb-6">
              Your order <strong className="text-[#F3E5AB]">#{placedOrderNumber}</strong> has been accepted by Executive Chef Marcus Vance’s kitchen brigade.
            </p>

            <div className="bg-[#1A1D23] p-4 rounded-sm border border-[#23272F] text-xs text-left space-y-2 mb-8">
              <div className="flex justify-between text-gray-400">
                <span>Guest:</span>
                <span className="text-white font-medium">{guestName}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Service Type:</span>
                <span className="text-[#D4AF37] uppercase font-medium">
                  {orderType === "dine_in" ? `Dine-In (${tableNumber})` : "White-Glove Delivery"}
                </span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Estimated Time:</span>
                <span className="text-white font-medium">25–35 minutes</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/menu" className="flex-1">
                <Button variant="gold" size="md" className="w-full">
                  Order More Dishes
                </Button>
              </Link>
              <Link href="/admin/orders" className="flex-1">
                <Button variant="outline" size="md" className="w-full">
                  View in Admin Dashboard
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Column: Cart Items List (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#1F232B] text-xs text-gray-400">
                <span>{totalItems} items in selection</span>
                <button
                  onClick={clearCart}
                  className="hover:text-red-400 transition-colors"
                >
                  Clear All
                </button>
              </div>

              {items.map((cartItem) => (
                <div
                  key={cartItem.item.id}
                  className="bg-[#131518] border border-[#23272F] rounded-sm p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-center justify-between transition-all hover:border-[#2A2E35]"
                >
                  {/* Dish Thumbnail */}
                  <div className="relative w-full sm:w-24 h-24 rounded-sm overflow-hidden shrink-0 border border-[#23272F] bg-[#1A1D23]">
                    <Image
                      src={cartItem.item.image}
                      alt={cartItem.item.name}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 text-center sm:text-left">
                    <Link
                      href={`/menu/${cartItem.item.id}`}
                      className="font-serif text-lg text-white hover:text-[#D4AF37] transition-colors"
                    >
                      {cartItem.item.name}
                    </Link>
                    <span className="block text-xs text-[#D4AF37] mt-0.5">
                      £{cartItem.item.price.toFixed(2)} each
                    </span>

                    {/* Customizations tags */}
                    {cartItem.selectedOptions && Object.keys(cartItem.selectedOptions).length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2 justify-center sm:justify-start">
                        {Object.entries(cartItem.selectedOptions).map(([key, val]) => (
                          <span
                            key={key}
                            className="text-[10px] bg-[#1A1D23] px-2 py-0.5 rounded text-gray-300 border border-white/5"
                          >
                            {val}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Quantity and Actions */}
                  <div className="flex items-center gap-4">
                    <QuantitySelector
                      quantity={cartItem.quantity}
                      onIncrement={() => updateQuantity(cartItem.item.id, cartItem.quantity + 1)}
                      onDecrement={() => updateQuantity(cartItem.item.id, cartItem.quantity - 1)}
                      size="sm"
                    />

                    <span className="font-serif text-lg text-white min-w-[65px] text-right font-medium">
                      £{(cartItem.item.price * cartItem.quantity).toFixed(2)}
                    </span>

                    <button
                      onClick={() => removeFromCart(cartItem.item.id)}
                      className="text-gray-500 hover:text-red-400 p-1.5 transition-colors"
                      title="Remove from cart"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column: Order Summary & Checkout (5 cols) */}
            <div className="lg:col-span-5 bg-[#131518] border border-[#23272F] p-6 sm:p-8 rounded-sm">
              <h3 className="font-serif text-2xl text-white font-light mb-6 pb-4 border-b border-[#1F232B]">
                Order Summary
              </h3>

              {/* Service Type Switcher */}
              <div className="mb-6">
                <span className="text-xs uppercase tracking-wider text-gray-400 block mb-2">
                  Service Style
                </span>
                <div className="grid grid-cols-2 gap-2 p-1 bg-[#0E1013] border border-[#23272F] rounded-sm">
                  <button
                    type="button"
                    onClick={() => setOrderType("dine_in")}
                    className={`py-2 text-xs uppercase tracking-wider font-medium rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                      orderType === "dine_in"
                        ? "bg-[#D4AF37] text-[#0B0C0E] font-semibold"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <Utensils className="w-3.5 h-3.5" />
                    <span>Dine-In</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType("delivery")}
                    className={`py-2 text-xs uppercase tracking-wider font-medium rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                      orderType === "delivery"
                        ? "bg-[#D4AF37] text-[#0B0C0E] font-semibold"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Delivery</span>
                  </button>
                </div>
              </div>

              {/* Gratuity / Sommelier Tip */}
              <div className="mb-6">
                <span className="text-xs uppercase tracking-wider text-gray-400 block mb-2">
                  Kitchen & Sommelier Gratuity
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {[10, 15, 20, 0].map((pct) => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => setTipPercentage(pct)}
                      className={`py-1.5 text-xs rounded border transition-colors cursor-pointer ${
                        tipPercentage === pct
                          ? "border-[#D4AF37] bg-[#D4AF37]/10 text-white"
                          : "border-[#23272F] text-gray-400 hover:text-white"
                      }`}
                    >
                      {pct === 0 ? "None" : `${pct}%`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="mb-6">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Promo (try AURELIA10)"
                      className="w-full bg-[#1A1D23] border border-[#23272F] pl-9 pr-3 py-2 rounded-sm text-xs text-white uppercase placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <Button variant="dark" size="sm">
                    Apply
                  </Button>
                </div>
                {promoError && (
                  <p className="text-[11px] text-red-400 mt-1">{promoError}</p>
                )}
                {appliedDiscount > 0 && (
                  <p className="text-[11px] text-[#D4AF37] mt-1">
                    10% VIP Privilege applied!
                  </p>
                )}
              </form>

              {/* Cost Calculations */}
              <div className="space-y-3 text-xs sm:text-sm text-gray-300 pt-4 border-t border-[#1F232B] mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>£{subtotal.toFixed(2)}</span>
                </div>

                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-[#D4AF37]">
                    <span>VIP Privilege</span>
                    <span>-£{appliedDiscount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>
                    {orderType === "delivery" ? "White-Glove Delivery" : "Table Reservation Charge"}
                  </span>
                  <span>{effectiveDelivery > 0 ? `£${effectiveDelivery.toFixed(2)}` : "Complimentary"}</span>
                </div>

                <div className="flex justify-between">
                  <span>Gratuity ({tipPercentage}%)</span>
                  <span>£{calculatedTip.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Estimated VAT (10%)</span>
                  <span>£{tax.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-base sm:text-lg font-serif text-white pt-3 border-t border-[#1F232B] font-medium">
                  <span>Estimated Total</span>
                  <span className="text-[#F3E5AB]">£{finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <Button
                variant="gold"
                size="lg"
                className="w-full"
                onClick={() => setIsCheckoutModalOpen(true)}
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        )}

        {/* Mock Checkout Modal */}
        <Modal
          isOpen={isCheckoutModalOpen}
          onClose={() => setIsCheckoutModalOpen(false)}
          title="Confirm Culinary Order"
          subtitle="Review details for table service or private residence delivery."
        >
          <div className="space-y-4 pt-2">
            <div>
              <label className="text-xs uppercase tracking-wider text-gray-400 block mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full bg-[#1A1D23] border border-[#2A2E35] px-3.5 py-2.5 rounded-sm text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-gray-400 block mb-1.5">
                Mobile Number
              </label>
              <input
                type="tel"
                value={guestPhone}
                onChange={(e) => setGuestPhone(e.target.value)}
                className="w-full bg-[#1A1D23] border border-[#2A2E35] px-3.5 py-2.5 rounded-sm text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            {orderType === "dine_in" ? (
              <div>
                <label className="text-xs uppercase tracking-wider text-gray-400 block mb-1.5">
                  Table Allocation
                </label>
                <select
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  className="w-full bg-[#1A1D23] border border-[#2A2E35] px-3.5 py-2.5 rounded-sm text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="Table 12 (Salon)">Table 12 (Main Dining Salon)</option>
                  <option value="Table 04 (Window)">Table 04 (Grosvenor Square Window)</option>
                  <option value="Counter 02 (Chef Stage)">Counter 02 (Chef Stage Experience)</option>
                  <option value="Vault 01 (Cellar)">Vault 01 (Private Wine Cellar)</option>
                </select>
              </div>
            ) : (
              <div>
                <label className="text-xs uppercase tracking-wider text-gray-400 block mb-1.5">
                  Delivery Address (Mayfair / Central London)
                </label>
                <textarea
                  rows={2}
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full bg-[#1A1D23] border border-[#2A2E35] px-3.5 py-2.5 rounded-sm text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            )}

            <div>
              <label className="text-xs uppercase tracking-wider text-gray-400 block mb-1.5">
                Settlement Method (Simulation)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 bg-[#1A1D23] border border-[#D4AF37] rounded-sm text-xs text-white flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#D4AF37]" />
                  <span>Amex Centurion / Visa</span>
                </div>
                <div className="p-3 bg-[#1A1D23] border border-[#2A2E35] rounded-sm text-xs text-gray-400 flex items-center gap-2">
                  <span>Room / Account Billing</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#1F232B] flex items-center justify-between text-sm">
              <span className="text-gray-400">Total Settlement:</span>
              <span className="font-serif text-2xl text-[#F3E5AB]">
                £{finalTotal.toFixed(2)}
              </span>
            </div>

            <div className="pt-2">
              <Button
                variant="gold"
                size="lg"
                className="w-full"
                isLoading={isSubmitting}
                onClick={handlePlaceOrder}
              >
                Authorize & Transmit Order
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
