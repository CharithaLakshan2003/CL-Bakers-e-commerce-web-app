// ─── Enums ───────────────────────────────────────────────────────────────────
export type Role = 'VISITOR' | 'CUSTOMER' | 'BAKER' | 'ADMIN';
export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'BAKING' | 'READY_FOR_PICKUP' | 'DELIVERED' | 'COMPLETED' | 'CANCELLED' | 'REFUNDED';
export type DeliveryMethod = 'PICKUP' | 'DELIVERY';
export type DiscountType = 'PERCENT' | 'FIXED';
export type CakeRequestStatus = 'PENDING' | 'QUOTED' | 'APPROVED' | 'REJECTED';
export type Category = 'bread' | 'pastry' | 'cake' | 'savory' | 'gluten-free';
export type Allergen = 'gluten' | 'dairy' | 'nuts' | 'eggs' | 'soy' | 'sesame';
export type SortOption = 'relevance' | 'price-asc' | 'price-desc' | 'newest' | 'rating';

// ─── User ─────────────────────────────────────────────────────────────────────
export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  phone?: string;
  birthday?: string;
  loyaltyPoints: number;
  emailVerified?: string | Date;
  createdAt: string;
  image?: string;
}

// ─── Address ──────────────────────────────────────────────────────────────────
export interface Address {
  id: string;
  userId: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  isDefaultShipping: boolean;
  isDefaultBilling: boolean;
}

// ─── Product ──────────────────────────────────────────────────────────────────
export interface NutritionalInfo {
  calories: number;
  protein: string;
  carbs: string;
  fat: string;
  fiber: string;
  sugar: string;
  sodium: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  comparePrice?: number;
  stock: number;
  category: Category;
  images: string[];
  allergens: Allergen[];
  nutritionalInfo: NutritionalInfo;
  isActive: boolean;
  isTodaySpecial: boolean;
  seoTitle?: string;
  seoDesc?: string;
  rating: number;
  reviewCount: number;
  badges?: ('new' | 'sale' | 'low-stock' | 'special')[];
  dietary?: ('vegetarian' | 'vegan' | 'gluten-free' | 'nut-free')[];
  createdAt: string;
}

// ─── Cart ─────────────────────────────────────────────────────────────────────
export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  tax: number;
  shippingFee: number;
  discount: number;
  total: number;
  couponCode?: string;
}

// ─── Order ────────────────────────────────────────────────────────────────────
export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  priceAtTime: number;
}

export interface Order {
  id: string;
  userId: string;
  status: OrderStatus;
  total: number;
  subtotal: number;
  tax: number;
  shippingFee: number;
  discount: number;
  couponCode?: string;
  deliveryMethod: DeliveryMethod;
  deliveryAddress?: Address;
  pickupBranch?: string;
  pickupTimeSlot?: string;
  specialInstructions?: string;
  paymentIntentId?: string;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

// ─── Review ───────────────────────────────────────────────────────────────────
export interface Review {
  id: string;
  userId: string;
  userName: string;
  userImage?: string;
  productId: string;
  rating: number;
  comment: string;
  images?: string[];
  verifiedPurchase: boolean;
  createdAt: string;
}

// ─── Coupon ───────────────────────────────────────────────────────────────────
export interface Coupon {
  id: string;
  code: string;
  discountType: DiscountType;
  discountValue: number;
  minOrderAmount: number;
  maxUsage: number;
  usedCount: number;
  expiresAt: string;
  isActive: boolean;
}

// ─── Custom Cake Request ──────────────────────────────────────────────────────
export interface CustomCakeRequest {
  id?: string;
  userId?: string;
  cakeType: string;
  size: string;
  servings: number;
  flavor: string;
  filling: string;
  frostingType: string;
  frostingColor: string;
  designText?: string;
  designImages?: string[];
  eventDate: string;
  deliveryMethod: DeliveryMethod;
  budget: string;
  status?: CakeRequestStatus;
}

// ─── Analytics ───────────────────────────────────────────────────────────────
export interface AnalyticsData {
  todayRevenue: number;
  todayOrders: number;
  newCustomers: number;
  lowStockItems: number;
  weeklyRevenue: { day: string; revenue: number }[];
  topProducts: { name: string; sales: number; revenue: number }[];
}

// ─── Filter Store ─────────────────────────────────────────────────────────────
export interface FilterState {
  categories: Category[];
  priceRange: [number, number];
  dietary: string[];
  minRating: number;
  inStockOnly: boolean;
  sortBy: SortOption;
  searchQuery: string;
}
