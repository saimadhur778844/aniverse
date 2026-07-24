import api from "./api";

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
}

export interface OrderItem {
  product: string;
  quantity: number;
}

export interface CreateOrderPayload {
  items: OrderItem[];
  shippingAddress: ShippingAddress;
}

export interface CreateOrderResponse {
  success: boolean;
  order: {
    _id: string;
    total: number;
    orderStatus: string;
    payment: {
      status: string;
    };
  };
}

export const createOrder = async (
  payload: CreateOrderPayload
): Promise<CreateOrderResponse> => {
  const { data } = await api.post("/orders", payload);
  return data;
};