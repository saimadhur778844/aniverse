import type { Product } from "./product";
import type { User } from "./user";

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type PaymentStatus =
  | "pending"
  | "paid"
  | "failed"
  | "refunded";

export interface OrderItem {
  product: string | Product;
  name: string;
  image?: string;
  quantity: number;
  price: number;
}

export interface ShippingAddress {
  name: string;
  address: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
  phone?: string;
}

export interface Order {
  /**
   * MongoDB ObjectId
   */
  _id: string;

  /**
   * Human-readable order number.
   * Example: ANV-20260729-0001
   */
  orderNumber?: string;

  /**
   * Customer
   */
  user: string | User;

  /**
   * Ordered products
   */
  items: OrderItem[];

  /**
   * Shipping destination
   */
  shippingAddress: ShippingAddress;

  /**
   * Pricing
   */
  subtotal: number;
  shippingCost?: number;
  total: number;

  /**
   * Order lifecycle
   */
  status: OrderStatus;

  /**
   * Payment
   */
  paymentStatus?: PaymentStatus;
  paymentMethod?: string;
  paymentId?: string;

  /**
   * Courier / Tracking
   */
  courier?: string;
  trackingNumber?: string;

  /**
   * Customer/Admin Notes
   */
  notes?: string;

  /**
   * Timestamps
   */
  createdAt?: string;
  updatedAt?: string;
}