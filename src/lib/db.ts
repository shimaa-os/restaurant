import { supabase } from "./supabase";
import { foodItems as mockFoodItems, categories as mockCategories } from "@/data/menuData";
import { mockOrders, mockReservations, mockReviews, mockCustomers } from "@/data/adminData";
import { FoodItem, Order, ReservationData, Review, Customer } from "@/types";

// ==========================================
// MENU ITEMS
// ==========================================
export async function getMenuItems(): Promise<FoodItem[]> {
  if (!supabase) return mockFoodItems;

  try {
    const { data, error } = await supabase
      .from("menu_items")
      .select("*")
      .order("created_at", { ascending: true });

    if (error || !data || data.length === 0) {
      return mockFoodItems;
    }

    return data.map((d: any) => ({
      id: d.id,
      name: d.name,
      shortDescription: d.short_description,
      description: d.description,
      price: Number(d.price),
      category: d.category_id || "mains",
      image: d.image,
      rating: Number(d.rating) || 5.0,
      reviewCount: d.review_count || 10,
      isChefSpecial: d.is_chef_special,
      isVegetarian: d.is_vegetarian,
      isGlutenFree: d.is_gluten_free,
      calories: d.calories,
      preparationTime: d.preparation_time,
      ingredients: d.ingredients || [],
      allergens: d.allergens || [],
      winePairing: d.wine_pairing,
      customizationOptions: d.customization_options || [],
    }));
  } catch (err) {
    console.warn("Falling back to local menu items:", err);
    return mockFoodItems;
  }
}

// ==========================================
// RESERVATIONS
// ==========================================
export async function createReservation(res: {
  fullName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  occasion?: string;
  seatingPreference: string;
  specialRequests?: string;
}): Promise<{ success: boolean; bookingRef: string }> {
  const bookingRef = `AUR-RES-${Math.floor(1000 + Math.random() * 9000)}`;

  if (supabase) {
    try {
      const { error } = await supabase.from("reservations").insert([
        {
          booking_ref: bookingRef,
          full_name: res.fullName,
          email: res.email,
          phone: res.phone,
          date: res.date,
          time: res.time,
          guests: res.guests,
          occasion: res.occasion,
          seating_preference: res.seatingPreference,
          special_requests: res.specialRequests,
          status: "confirmed",
        },
      ]);

      if (error) {
        console.warn("Supabase reservation insert error:", error);
      }
    } catch (e) {
      console.warn("Supabase reservation insert exception:", e);
    }
  }

  return { success: true, bookingRef };
}

export async function getReservations(): Promise<ReservationData[]> {
  if (!supabase) return mockReservations;

  try {
    const { data, error } = await supabase
      .from("reservations")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) return mockReservations;

    return data.map((d: any) => ({
      id: d.id,
      fullName: d.full_name,
      email: d.email,
      phone: d.phone,
      date: d.date,
      time: d.time,
      guests: d.guests,
      occasion: d.occasion,
      seatingPreference: d.seating_preference,
      specialRequests: d.special_requests,
      status: d.status,
      createdAt: new Date(d.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }));
  } catch {
    return mockReservations;
  }
}

// ==========================================
// ORDERS
// ==========================================
export async function createOrder(order: {
  customerName: string;
  customerPhone: string;
  items: { dishName: string; quantity: number; price: number }[];
  totalAmount: number;
  orderType: "dine_in" | "delivery";
  tableNumber?: string;
  deliveryAddress?: string;
}): Promise<{ success: boolean; orderNumber: string }> {
  const orderNumber = `AUR-${Math.floor(1000 + Math.random() * 9000)}`;

  if (supabase) {
    try {
      const { error } = await supabase.from("orders").insert([
        {
          order_number: orderNumber,
          customer_name: order.customerName,
          customer_phone: order.customerPhone,
          total_amount: order.totalAmount,
          order_type: order.orderType,
          table_number: order.tableNumber,
          delivery_address: order.deliveryAddress,
          items: order.items,
          status: "pending",
        },
      ]);

      if (error) {
        console.warn("Supabase order insert error:", error);
      }
    } catch (e) {
      console.warn("Supabase order insert exception:", e);
    }
  }

  return { success: true, orderNumber };
}

export async function getOrders(): Promise<Order[]> {
  if (!supabase) return mockOrders;

  try {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) return mockOrders;

    return data.map((d: any) => ({
      id: d.id,
      orderNumber: d.order_number,
      customerName: d.customer_name,
      customerPhone: d.customer_phone,
      items: d.items || [],
      totalAmount: Number(d.total_amount),
      status: d.status,
      orderType: d.order_type,
      tableNumber: d.table_number,
      deliveryAddress: d.delivery_address,
      createdAt: new Date(d.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }));
  } catch {
    return mockOrders;
  }
}

// ==========================================
// REVIEWS
// ==========================================
export async function getReviews(): Promise<Review[]> {
  if (!supabase) return mockReviews;

  try {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) return mockReviews;

    return data.map((d: any) => ({
      id: d.id,
      author: d.author,
      avatar: d.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      rating: d.rating,
      date: new Date(d.created_at).toLocaleDateString(),
      comment: d.comment,
      dishRecommended: d.dish_recommended,
      status: d.status,
      adminReply: d.admin_reply,
    }));
  } catch {
    return mockReviews;
  }
}
