import type { Product } from "./product";
import type { User } from "./user";

export type OrderStatus =
  | "Pending"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled";

export type PaymentStatus =
  | "Pending"
  | "Paid"
  | "Failed"
  | "Refunded";

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

export interface PaymentInfo {
  status: PaymentStatus;
  method?: string;
  paymentId?: string;
  paidAt?: string;
}

export interface Order {
  _id: string;
  orderNumber: string;

  user: string | User;

  items: OrderItem[];

  shippingAddress: ShippingAddress;

  subtotal: number;
  shippingCharge: number;
  tax: number;
  discount: number;
  total: number;

  orderStatus: OrderStatus;

  payment: PaymentInfo;

  courier?: string;
  trackingNumber?: string;
  notes?: string;

  createdAt: string;
  updatedAt: string;
}