import type { Product } from "./product";
import type { User } from "./user";

export type OrderStatus =
  | "Pending"
  | "Confirmed"
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

/*
|--------------------------------------------------------------------------
| Order Shipping Address
|--------------------------------------------------------------------------
*/

export interface ShippingAddress {
  fullName: string;

  email: string;

  phone: string;

  address: string;

  city: string;

  state: string;

  pincode: string;

  country: string;
}

/*
|--------------------------------------------------------------------------
| Checkout Request Shipping Address
|--------------------------------------------------------------------------
*/

export interface CreateShippingAddress {
  fullName: string;

  email: string;

  phone: string;

  address: string;

  city: string;

  state: string;

  pincode: string;
}

/*
|--------------------------------------------------------------------------
| Payment
|--------------------------------------------------------------------------
*/

export interface PaymentInfo {
  status: PaymentStatus;

  method?: string;

  paymentId?: string;

  gatewayOrderId?: string;

  gatewayPaymentId?: string;

  paidAt?: string;
}

/*
|--------------------------------------------------------------------------
| Coupon
|--------------------------------------------------------------------------
*/

export interface AppliedCoupon {
  code: string;

  type: "percentage" | "fixed";

  value: number;
}

/*
|--------------------------------------------------------------------------
| Order
|--------------------------------------------------------------------------
*/

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

  coupon?: AppliedCoupon;

  total: number;

  orderStatus: OrderStatus;

  payment: PaymentInfo;

  courier?: string;

  trackingNumber?: string;

  notes?: string;

  createdAt: string;

  updatedAt: string;
}