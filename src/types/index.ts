export interface FoodItem {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  category: 'starters' | 'mains' | 'pizza' | 'pasta' | 'burgers' | 'desserts' | 'drinks';
  image: string;
  gallery?: string[];
  rating: number;
  reviewCount: number;
  isChefSpecial?: boolean;
  isVegetarian?: boolean;
  isGlutenFree?: boolean;
  calories?: number;
  preparationTime?: string;
  ingredients: string[];
  allergens?: string[];
  winePairing?: string;
  customizationOptions?: {
    name: string;
    required?: boolean;
    options: { label: string; extraPrice?: number }[];
  }[];
}

export interface CartItem {
  item: FoodItem;
  quantity: number;
  selectedOptions?: Record<string, string>;
  specialInstructions?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  iconName: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  outlet?: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface ReservationData {
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  occasion?: string;
  seatingPreference: 'main' | 'counter' | 'terrace' | 'cellar';
  specialRequests?: string;
  status?: 'confirmed' | 'seated' | 'completed' | 'cancelled';
  createdAt?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  items: {
    dishName: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status: 'pending' | 'preparing' | 'ready' | 'out_for_delivery' | 'completed' | 'cancelled';
  orderType: 'dine_in' | 'takeaway' | 'delivery';
  tableNumber?: string;
  deliveryAddress?: string;
  createdAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  loyaltyTier: 'Gold' | 'Platinum' | 'Diamond';
  lastVisit: string;
  favoriteDish: string;
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  dishRecommended?: string;
  status: 'published' | 'pending' | 'flagged';
  adminReply?: string;
}
